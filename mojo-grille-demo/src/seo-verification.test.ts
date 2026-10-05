import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  generateRestaurantSchema,
  generateMenuSchema,
  generateMultiLocationRestaurantSchema,
  generateRestaurantAndMenuJsonLd,
  generateFullStructuredDataGraph,
} from "./lib/seo";
import { LOCATIONS, locationsList } from "./data/locations";
import { categories, menu } from "./data/menu";

console.log("--- Starting SEO, Schema.org & Copywriting Verification Suite ---");

// 1. Validate Schema.org Restaurant for all 3 Andante Palermo spaces
console.log("1. Validating Restaurant schemas for Salón Central, Terraza, and Cava...");
for (const loc of locationsList) {
  const schema = generateRestaurantSchema(loc);
  assert.equal(schema["@context"], "https://schema.org");
  assert.equal(schema["@type"], "Restaurant");
  assert.equal(schema.name, `Andante Restaurante Bar - ${loc.name}`);
  assert.equal(schema.telephone, loc.phone);
  assert.equal(schema.priceRange, "$$$");
  assert.deepEqual(schema.servesCuisine, ["Bistró Contemporáneo", "Cocina de Mercado", "Opciones Sin TACC", "Coctelería de Autor"]);
  assert.equal(schema.address.streetAddress, loc.address.street);
  assert.equal(schema.address.addressRegion, "BA");
  assert.equal(schema.address.addressCountry, "AR");
  assert.ok(schema.geo.latitude < -34 && schema.geo.latitude > -35);
  assert.ok(schema.geo.longitude < -58 && schema.geo.longitude > -59);
  assert.equal(schema.aggregateRating.ratingValue, "4.9");
  assert.equal(schema.aggregateRating.reviewCount, "1280");
  assert.equal(schema.potentialAction["@type"], "OrderAction");
  assert.equal(schema.potentialAction.target.urlTemplate, "https://andantebar.com.ar/#menu");
  console.log(`  ✓ Location '${loc.name}' schema verified.`);
}

// 2. Validate Schema.org Menu schema
console.log("2. Validating Menu schema and item catalog...");
const menuSchema = generateMenuSchema(categories, menu);
assert.equal(menuSchema["@context"], "https://schema.org");
assert.equal(menuSchema["@type"], "Menu");
assert.ok(menuSchema.hasMenuSection.length >= 5, "Expected at least 5 menu sections");

for (const section of menuSchema.hasMenuSection) {
  assert.equal(section["@type"], "MenuSection");
  assert.ok(section.name.length > 0);
  assert.ok(section.hasMenuItem.length > 0, `Section '${section.name}' has no items`);
  for (const item of section.hasMenuItem) {
    assert.equal(item["@type"], "MenuItem");
    assert.ok(item.name.length > 0);
    assert.ok(item.description.length > 0);
    assert.equal(item.offers["@type"], "Offer");
    assert.equal(item.offers.priceCurrency, "USD");
    assert.ok(parseFloat(item.offers.price) > 0);
  }
}
console.log("  ✓ Menu schema and all sections/offers verified.");

// 3. Validate Multi-Location and Full Graph
console.log("3. Validating Multi-Location graph and comprehensive graph...");
const multiLoc = generateMultiLocationRestaurantSchema();
assert.equal(multiLoc["@context"], "https://schema.org");
assert.equal(multiLoc["@graph"].length, 3);

const fullGraph = generateFullStructuredDataGraph(locationsList, categories, menu);
assert.equal(fullGraph["@context"], "https://schema.org");
assert.ok(Array.isArray(fullGraph["@graph"]));
assert.equal(fullGraph["@graph"].length, 4, "Should have 3 restaurants + 1 menu in graph");

const serialized = JSON.stringify(fullGraph);
const roundTrip = JSON.parse(serialized);
assert.equal(roundTrip["@graph"].length, 4);
console.log("  ✓ Full structured data graph verified.");

// 4. Validate public/robots.txt
console.log("4. Validating public/robots.txt...");
const robotsPath = path.resolve(process.cwd(), "public/robots.txt");
assert.ok(fs.existsSync(robotsPath), "robots.txt must exist in public/");
const robotsContent = fs.readFileSync(robotsPath, "utf-8");
assert.ok(robotsContent.includes("User-agent: *"));
assert.ok(robotsContent.includes("Allow: /"));
assert.ok(robotsContent.includes("Sitemap: https://andantebar.com.ar/sitemap.xml"));
console.log("  ✓ robots.txt verified.");

// 5. Validate public/sitemap.xml
console.log("5. Validating public/sitemap.xml...");
const sitemapPath = path.resolve(process.cwd(), "public/sitemap.xml");
assert.ok(fs.existsSync(sitemapPath), "sitemap.xml must exist in public/");
const sitemapContent = fs.readFileSync(sitemapPath, "utf-8");
assert.ok(sitemapContent.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'));
assert.ok(sitemapContent.includes("<loc>https://andantebar.com.ar/</loc>"));
assert.ok(sitemapContent.includes("<loc>https://andantebar.com.ar/#menu</loc>"));
assert.ok(sitemapContent.includes("<loc>https://andantebar.com.ar/#catering</loc>"));
assert.ok(sitemapContent.includes("<loc>https://andantebar.com.ar/#location-palermo-hollywood</loc>"));
assert.ok(sitemapContent.includes("<loc>https://andantebar.com.ar/#location-terraza-andante</loc>"));
assert.ok(sitemapContent.includes("<loc>https://andantebar.com.ar/#location-cava-jazz</loc>"));
console.log("  ✓ sitemap.xml verified.");

// 6. Validate public/og-image.jpg
console.log("6. Validate public/og-image.jpg...");
const ogImagePath = path.resolve(process.cwd(), "public/og-image.jpg");
assert.ok(fs.existsSync(ogImagePath), "og-image.jpg must exist in public/");
const ogImageStats = fs.statSync(ogImagePath);
assert.ok(ogImageStats.size > 10000, "og-image.jpg must be a valid image asset");
console.log(`  ✓ og-image.jpg verified (${ogImageStats.size} bytes).`);

// 7. Validate Copywriting Requirements in Components
console.log("7. Validating Copywriting requirements in source files...");

const heroPath = path.resolve(process.cwd(), "src/components/mojo/HeroSection.tsx");
const heroContent = fs.readFileSync(heroPath, "utf-8");
assert.ok(
  heroContent.includes("EL ARTE DE DESACELERAR EL RITMO URBANO"),
  "Hero must contain Andante headline",
);
assert.ok(
  heroContent.includes("76–108 PPM"),
  "Hero must contain tempo 76–108 PPM",
);
assert.ok(
  heroContent.includes("PALERMO HOLLYWOOD"),
  "Hero must mention Palermo Hollywood",
);

const cartSheetPath = path.resolve(process.cwd(), "src/components/mojo/CartSheet.tsx");
const cartSheetContent = fs.readFileSync(cartSheetPath, "utf-8");
assert.ok(
  cartSheetContent.includes("Tu orden está vacía. Explorá nuestra carta de bistró y coctelería."),
  "CartSheet must contain required empty cart message",
);
assert.ok(
  cartSheetContent.includes("PEDIR / RESERVAR POR WHATSAPP"),
  "CartSheet must contain 'PEDIR / RESERVAR POR WHATSAPP' button",
);
assert.ok(
  cartSheetContent.includes("Confirmación directa con el equipo de"),
  "CartSheet must contain WhatsApp conversion confirmation hint",
);

const rootPath = path.resolve(process.cwd(), "src/routes/__root.tsx");
const rootContent = fs.readFileSync(rootPath, "utf-8");
assert.ok(rootContent.includes("generateRestaurantSchema"), "__root.tsx must import generateRestaurantSchema");
assert.ok(rootContent.includes("generateMenuSchema"), "__root.tsx must import generateMenuSchema");
assert.ok(rootContent.includes('application/ld+json'), "__root.tsx must contain JSON-LD script");
assert.ok(rootContent.includes("og:title"), "__root.tsx must contain og:title");
assert.ok(rootContent.includes("og:image"), "__root.tsx must contain og:image");
assert.ok(rootContent.includes("og:url"), "__root.tsx must contain og:url");
assert.ok(rootContent.includes("og:locale"), "__root.tsx must contain og:locale");
assert.ok(rootContent.includes("og:site_name"), "__root.tsx must contain og:site_name");
assert.ok(rootContent.includes("twitter:card"), "__root.tsx must contain twitter:card");
assert.ok(rootContent.includes("geo.region"), "__root.tsx must contain geo.region");

console.log("  ✓ Component and Route copywriting & metadata verified.");

console.log("\nALL SEO, SCHEMA.ORG & COPYWRITING VERIFICATIONS PASSED CLEANLY!");
