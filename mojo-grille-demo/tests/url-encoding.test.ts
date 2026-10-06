import assert from "node:assert/strict";
import { whatsappHref, formatWhatsAppMessage, buildWhatsAppCheckout } from "../src/components/mojo/whatsapp.js";
import { LOCATIONS } from "../src/data/locations.js";
import { menu, sideOptions } from "../src/data/menu.js";
import type { CartLine } from "../src/types/mojo.js";

/**
 * Challenger Test Suite: URL Encoding Robustness
 * Verifies that WhatsApp checkout links strictly adhere to URL specifications,
 * safely percent-encode emojis, Spanish diacritics, multi-line formatting, and spaces,
 * and guarantee 100% round-trip lossless decoding.
 */

console.log("=== [TEST SUITE 3] WhatsApp Link & URL Encoding Robustness ===");

// 1. Basic URL Schema & Format
console.log("  [3.1] Testing URL structure and protocol validation...");
const basicLines: CartLine[] = [
  {
    key: "ropa-vieja::moro",
    itemId: "ropa-vieja-bowl",
    name: "Ropa Vieja Bowl",
    sides: ["Arroz Moro"],
    price: 16.95,
    qty: 1,
  },
];

const basicUrl = whatsappHref("little-havana", basicLines, 16.95);
const urlRegex = /^https:\/\/wa\.me\/\d{10,15}\?text=[^ \t\r\n]+$/;
assert.match(basicUrl, urlRegex, "URL must adhere strictly to https://wa.me/{phoneRaw}?text={encoded}");
assert.ok(!basicUrl.includes(" "), "URL must NOT contain raw unencoded whitespace");
assert.ok(!basicUrl.includes("\n"), "URL must NOT contain raw unencoded newlines");
console.log("  ✓ URL complies strictly with wa.me schema and contains no raw spaces or newlines.");

// 2. Spanish Diacritics and Accents Verification
console.log("  [3.2] Testing Spanish accents and authentic Miami Spanglish copy...");
const spanishTestLines: CartLine[] = [
  {
    key: "lechon-asado::maduros",
    itemId: "lechon-asado-bowl",
    name: "Lechón Asado al Mojo Criollo",
    sides: ["Sweet Plátanos Maduros", "Yuca con Mojo de Ajo"],
    price: 15.95 + 1.75 + 2.0,
    qty: 2,
  },
  {
    key: "pan-con-lechon::",
    itemId: "pan-con-lechon",
    name: "Pan con Lechón al Mojo",
    sides: [],
    price: 13.95,
    qty: 1,
  },
  {
    key: "flan-abuela::",
    itemId: "flan-tradicional",
    name: "Flan Tradicional de la Abuela con Almíbar",
    sides: [],
    price: 6.5,
    qty: 3,
  },
];

const spanishUrl = whatsappHref("brickell", spanishTestLines, 72.85);

// Verify encoded representations are present in the URL query
assert.ok(spanishUrl.includes("%C3%B3"), "Must contain encoded 'ó' (%C3%B3) from Lechón");
assert.ok(spanishUrl.includes("%C3%A1"), "Must contain encoded 'á' (%C3%A1) from Plátanos");
assert.ok(spanishUrl.includes("%C3%AD"), "Must contain encoded 'í' (%C3%AD) from Criollo/Almíbar");

// Test full accent set (á, é, í, ó, ú, ñ, Á, É, Í, Ó, Ú, Ñ, ¡, ¿)
const pangramLines: CartLine[] = [
  {
    key: "pangram::",
    itemId: "custom-test",
    name: "¡Sabor Criollo! Lechón, Ñame, Café & Azúcar para el Niño",
    sides: ["¿Desea más limón?", "Plátano maduro al sartén"],
    price: 25.0,
    qty: 1,
  },
];

const pangramUrl = whatsappHref("doral", pangramLines, 25.0);
const parsedPangramUrl = new URL(pangramUrl);
const roundtripPangram = parsedPangramUrl.searchParams.get("text")!;

assert.ok(roundtripPangram.includes("¡Sabor Criollo!"));
assert.ok(roundtripPangram.includes("Lechón"));
assert.ok(roundtripPangram.includes("Ñame"));
assert.ok(roundtripPangram.includes("Café"));
assert.ok(roundtripPangram.includes("Azúcar"));
assert.ok(roundtripPangram.includes("Niño"));
assert.ok(roundtripPangram.includes("¿Desea más limón?"));
assert.ok(roundtripPangram.includes("Plátano maduro al sartén"));
assert.ok(roundtripPangram.includes("Muchas gracias!"));
console.log("  ✓ All Spanish diacritics (á, é, í, ó, ú, ñ, ¡, ¿) encode and decode losslessly.");

// 3. Emojis and Multibyte Unicode Characters
console.log("  [3.3] Testing emoji encoding integrity...");
const emojiLines: CartLine[] = [
  {
    key: "emoji-item::",
    itemId: "emoji-bowl",
    name: "🔥 Signature Bowl 🥗",
    sides: ["🥟 Crispy Tostones", "🥤 Cold Materva", "🎉 Party Mojo"],
    price: 20.0,
    qty: 2,
  },
];

const emojiUrl = whatsappHref("little-havana", emojiLines, 40.0);
assert.ok(!emojiUrl.includes(" "), "No unencoded space");
const parsedEmojiUrl = new URL(emojiUrl);
const roundtripEmojiText = parsedEmojiUrl.searchParams.get("text")!;

assert.ok(roundtripEmojiText.includes("• 2× 🔥 Signature Bowl 🥗 (🥟 Crispy Tostones, 🥤 Cold Materva, 🎉 Party Mojo) — $40.00"));
console.log("  ✓ Emojis (•, 🔥, 🥗, 🥟, 🥤, 🎉) survive URL encoding without byte corruption or surrogate breakage.");

// 4. Special URI Character Safety: Ampersands, Plus, Slashes, Quotes
console.log("  [3.4] Testing special characters (&, +, ?, =, \", ') in query parameters...");
const specialLines: CartLine[] = [
  {
    key: "ampersand::",
    itemId: "cafecito-pastelito",
    name: "Cafecito & Pastelito de Guayaba + Queso (Special 100% Authentic #1)",
    sides: ["Arroz Moro (Black beans & rice)"],
    price: 5.95,
    qty: 1,
  },
];

const specialUrl = whatsappHref("brickell", specialLines, 5.95);
const parsedSpecialUrl = new URL(specialUrl);

// Crucial: & and + must NOT be split into multiple URL query parameters
const searchParamKeys = Array.from(parsedSpecialUrl.searchParams.keys());
assert.equal(searchParamKeys.length, 1, "There must only be ONE query parameter: 'text'");
assert.equal(searchParamKeys[0], "text");

const decodedSpecial = parsedSpecialUrl.searchParams.get("text")!;
assert.ok(decodedSpecial.includes("Cafecito & Pastelito"));
assert.ok(decodedSpecial.includes("beans & rice"));
assert.ok(decodedSpecial.includes("+ Queso"));
assert.ok(decodedSpecial.includes("100% Authentic #1"));
console.log("  ✓ Special URL characters (&, +, #, %) are strictly escaped and do not pollute query parameter boundaries.");

// 5. Multi-line Formatting and Line Breaks
console.log("  [3.5] Testing multi-line formatting (\\n -> %0A)...");
const multiLines: CartLine[] = [
  { key: "item1::", itemId: "1", name: "Dish One", sides: [], price: 10, qty: 1 },
  { key: "item2::", itemId: "2", name: "Dish Two", sides: ["Side A"], price: 15, qty: 2 },
];
const multiUrl = whatsappHref("doral", multiLines, 40);
assert.ok(multiUrl.includes("%0A"), "Newlines must be encoded as %0A");
assert.ok(!multiUrl.includes("\n"), "Must NOT contain literal raw LF");
assert.ok(!multiUrl.includes("\r"), "Must NOT contain literal raw CR");

const decodedMulti = new URL(multiUrl).searchParams.get("text")!;
const linesArray = decodedMulti.split("\n");
assert.equal(linesArray.length, 5, "Formatted message should have exactly 5 lines (header, 2 items, total, footer)");
assert.equal(linesArray[0], "Hola Andante Bar! Deseo solicitar el siguiente pedido / reserva para Cava Privada & Jazz:");
assert.equal(linesArray[1], "• 1× Dish One — $10.00");
assert.equal(linesArray[2], "• 2× Dish Two (Side A) — $30.00");
assert.equal(linesArray[3], "Total Estimado: $40.00");
assert.equal(linesArray[4], "Muchas gracias!");
console.log("  ✓ Multi-line formatted messages decode cleanly into exact line breaks.");

// 6. Stress Test: Mega Cart with All 17 Dishes
console.log("  [3.6] Stress testing large payload URL generation with all 17 menu items...");
const megaCartLines: CartLine[] = menu.map((m, idx) => ({
  key: `${m.id}::all`,
  itemId: m.id,
  name: m.name,
  sides: m.sidesAllowed ? sideOptions.map((s) => s.name) : [],
  price: m.price + (m.sidesAllowed ? 5.25 : 0),
  qty: (idx % 3) + 1,
}));

const megaTotal = megaCartLines.reduce((sum, l) => sum + l.qty * l.price, 0);
const megaUrl = whatsappHref("little-havana", megaCartLines, megaTotal);

assert.match(megaUrl, urlRegex);
const megaDecoded = new URL(megaUrl).searchParams.get("text")!;
assert.equal(megaDecoded, formatWhatsAppMessage("little-havana", megaCartLines, megaTotal));
console.log(`  ✓ Mega cart URL length is ${megaUrl.length} characters and decodes with 100% byte fidelity.`);

// 7. Empty Cart Fallback URL
console.log("  [3.7] Testing empty cart URL generation...");
const emptyUrl = whatsappHref("brickell", [], 0);
assert.ok(emptyUrl.includes("https://wa.me/5491168062589?text="));
const decodedEmpty = new URL(emptyUrl).searchParams.get("text")!;
assert.equal(decodedEmpty, "Hola Andante Bar! Quisiera consultar por una reserva o pedido en Patio Interior al Aire Libre (Arévalo 1677, Palermo Hollywood).");
console.log("  ✓ Empty cart triggers courteous store-specific greeting URL.");

console.log("=== [PASS] WhatsApp Link & URL Encoding Robustness Passed Cleanly ===\n");
