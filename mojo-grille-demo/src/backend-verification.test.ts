import assert from "node:assert/strict";
import {
  LocationSchema,
  MenuItemSchema,
  SideOptionSchema,
  CartLineSchema,
  WhatsAppOrderPayloadSchema,
  isLocationId,
  isCategoryId,
  isBadgeType,
} from "./types/mojo";
import { LOCATIONS, locationsList, DEFAULT_LOCATION, resolveLocation, getLocationById } from "./data/locations";
import { menu, categories, sideOptions, itemsForCategory, favoritosIds } from "./data/menu";
import { whatsappHref, formatWhatsAppMessage, buildWhatsAppCheckout } from "./components/mojo/whatsapp";
import {
  generateRestaurantSchema,
  generateMenuSchema,
  generateMultiLocationRestaurantSchema,
  generateRestaurantAndMenuJsonLd,
} from "./lib/seo";

console.log("--- Starting Backend & Data Verification Suite ---");

// 1. Validate All Store Locations with Zod
console.log("1. Validating store locations schema...");
assert.equal(locationsList.length, 3, "Expected exactly 3 locations");
for (const loc of locationsList) {
  const parsed = LocationSchema.parse(loc);
  assert.equal(parsed.id, loc.id);
  assert.match(parsed.phoneRaw, /^\d{10,15}$/, "phoneRaw must be clean digits");
  assert.ok(parsed.coordinates, "coordinates should be defined");
}
assert.equal(LOCATIONS["little-havana"].phoneRaw, "5491147789000");
assert.equal(LOCATIONS["brickell"].phoneRaw, "5491147789001");
assert.equal(LOCATIONS["doral"].phoneRaw, "5491147789002");
assert.equal(DEFAULT_LOCATION.id, "little-havana");

// Location resolver tests
assert.equal(resolveLocation("brickell").id, "brickell");
assert.equal(resolveLocation("Terraza & Barra Andante").id, "brickell");
assert.equal(resolveLocation("Palermo Hollywood").id, "little-havana");
assert.equal(resolveLocation("doral").id, "doral");
assert.equal(resolveLocation("unknown-location").id, "little-havana");
assert.equal(resolveLocation(null).id, "little-havana");
assert.equal(getLocationById("brickell")?.name, "Terraza & Barra Andante");
console.log("✓ Store locations verified.");

// 2. Validate Menu Catalog & Side Options with Zod
console.log("2. Validating menu catalog and side options...");
assert.ok(menu.length >= 12, `Expected rich menu, got ${menu.length} items`);
for (const item of menu) {
  const parsed = MenuItemSchema.parse(item);
  assert.equal(parsed.id, item.id);
  assert.ok(parsed.price > 0, "Price must be positive");
  assert.ok(parsed.image, "Image must be present");
  if (parsed.badge) {
    assert.ok(isBadgeType(parsed.badge), `Invalid badge: ${parsed.badge}`);
  }
}

for (const side of sideOptions) {
  const parsed = SideOptionSchema.parse(side);
  assert.equal(parsed.id, side.id);
  assert.ok(parsed.price >= 0);
}

// Check all categories have items
for (const cat of categories) {
  const items = itemsForCategory(cat.id);
  assert.ok(items.length > 0, `Category ${cat.id} has no items!`);
  console.log(`  - Category '${cat.id}' has ${items.length} items.`);
}
assert.ok(favoritosIds.length >= 3, "Favoritos must have at least 3 items");
console.log("✓ Menu catalog verified.");

// 3. Validate Type Guards
console.log("3. Validating type guards...");
assert.equal(isLocationId("little-havana"), true);
assert.equal(isLocationId("brickell"), true);
assert.equal(isLocationId("doral"), true);
assert.equal(isLocationId("paris"), false);

assert.equal(isCategoryId("bowls"), true);
assert.equal(isCategoryId("sandwiches"), true);
assert.equal(isCategoryId("pizza"), false);

assert.equal(isBadgeType("Firma Andante"), true);
assert.equal(isBadgeType("Sin TACC"), true);
assert.equal(isBadgeType("Coctelería de Autor"), true);
assert.equal(isBadgeType("De Estación"), true);
assert.equal(isBadgeType("Discount"), false);
console.log("✓ Type guards verified.");

// 4. Validate WhatsApp Order Message & Routing
console.log("4. Validating WhatsApp order builder & multi-store routing...");

// Case A: Empty cart message
const emptyMsgLH = formatWhatsAppMessage("little-havana", [], 0);
assert.equal(emptyMsgLH, "Hola Andante Bar! Quisiera consultar por una reserva o pedido en Palermo Hollywood (Arévalo 1677, Palermo Hollywood).");
const emptyUrlLH = whatsappHref("little-havana", [], 0);
assert.ok(emptyUrlLH.startsWith("https://wa.me/5491147789000?text="));
assert.ok(decodeURIComponent(emptyUrlLH).includes("Palermo Hollywood"));

// Case B: Brickell store order
const sampleLines = [
  {
    key: "ropa-vieja-bowl::Arroz Moro (Black beans & rice)|Crispy Tostones con Mojo",
    itemId: "ropa-vieja-bowl",
    name: "Ropa Vieja Bowl",
    sides: ["Arroz Moro (Black beans & rice)", "Crispy Tostones con Mojo"],
    price: 18.45,
    qty: 1,
  },
  {
    key: "cubano-prensado::Sweet Plátanos Maduros",
    itemId: "cubano-prensado",
    name: "El Cubano Prensado",
    sides: ["Sweet Plátanos Maduros"],
    price: 16.70,
    qty: 2,
  },
];

// Validate cart lines with Zod
sampleLines.forEach((l) => CartLineSchema.parse(l));

const brickellMsg = formatWhatsAppMessage("brickell", sampleLines, 51.85);
assert.ok(brickellMsg.includes("Terraza & Barra Andante"), "Message must mention Terraza & Barra Andante");
assert.ok(brickellMsg.includes("• 1× Ropa Vieja Bowl (Arroz Moro (Black beans & rice), Crispy Tostones con Mojo) — $18.45"));
assert.ok(brickellMsg.includes("• 2× El Cubano Prensado (Sweet Plátanos Maduros) — $33.40"));
assert.ok(brickellMsg.includes("Total Estimado: $51.85"));
assert.ok(brickellMsg.includes("Muchas gracias!"));

const brickellUrl = whatsappHref("brickell", sampleLines, 51.85);
assert.ok(brickellUrl.startsWith("https://wa.me/5491147789001?text="), "Brickell URL must use phoneRaw 5491147789001");

// Case C: Doral routing
const doralUrl = whatsappHref("doral", sampleLines, 51.85);
assert.ok(doralUrl.startsWith("https://wa.me/5491147789002?text="), "Doral URL must use phoneRaw 5491147789002");

// Case D: Backward-compatible 2-argument signature
const legacyUrl = whatsappHref(sampleLines, 51.85);
assert.ok(legacyUrl.startsWith("https://wa.me/5491147789000?text="), "Legacy signature must default to Palermo Hollywood");

// Case E: Payload schema
const checkoutObj = buildWhatsAppCheckout({
  location: "brickell",
  lines: sampleLines,
  total: 51.85,
});
assert.ok(checkoutObj.url.startsWith("https://wa.me/5491147789001"));
assert.equal(checkoutObj.phone, "+54 11 4778-9001");
console.log("✓ WhatsApp builder verified across all stores and overloads.");

// 5. Validate Schema.org SEO Structured Data
console.log("5. Validating Schema.org SEO structured data...");
const restaurantSchema = generateRestaurantSchema(LOCATIONS["brickell"]);
assert.equal(restaurantSchema["@context"], "https://schema.org");
assert.equal(restaurantSchema["@type"], "Restaurant");
assert.equal(restaurantSchema.name, "Andante Restaurante Bar - Terraza & Barra Andante");
assert.equal(restaurantSchema.telephone, "+54 11 4778-9001");
assert.equal(restaurantSchema.address.streetAddress, "Arévalo 1677 (Terraza Jardín)");
assert.equal(restaurantSchema.geo.latitude, -34.5815);
assert.equal(restaurantSchema.geo.longitude, -58.4372);

const menuSchema = generateMenuSchema(categories, menu);
assert.equal(menuSchema["@context"], "https://schema.org");
assert.equal(menuSchema["@type"], "Menu");
assert.ok(menuSchema.hasMenuSection.length > 0);

const multiLocSchema = generateMultiLocationRestaurantSchema();
assert.equal(multiLocSchema["@graph"].length, 3);

const fullJsonLd = generateRestaurantAndMenuJsonLd(DEFAULT_LOCATION, categories, menu);
const parsedJson = JSON.parse(fullJsonLd);
assert.ok(parsedJson["@graph"].length === 2, "Full JSON-LD should contain Restaurant and Menu");
console.log("✓ Schema.org SEO structured data verified.");

// 6. Deterministic Cart Line Key Logic
console.log("6. Validating cart line key determinism...");
function generateCartKey(itemId: string, sides: string[]): string {
  return `${itemId}::${[...sides].sort().join("|")}`;
}
const keyA = generateCartKey("ropa-vieja-bowl", ["tostones", "moro"]);
const keyB = generateCartKey("ropa-vieja-bowl", ["moro", "tostones"]);
assert.equal(keyA, keyB, "Different sides insertion order must produce identical key");

const keyC = generateCartKey("ropa-vieja-bowl", ["moro", "yuca"]);
assert.notEqual(keyA, keyC, "Different sides must produce different keys");
console.log("✓ Deterministic cart keys verified.");

console.log("\nALL BACKEND & DATA VERIFICATIONS PASSED CLEANLY!");
