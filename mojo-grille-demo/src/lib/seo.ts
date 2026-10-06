import type { Location, MenuItem, Category } from "@/types/mojo";
import { DEFAULT_LOCATION, locationsList } from "@/data/locations";

/**
 * Genera datos estructurados Schema.org Restaurant para Google Rich Results.
 * Andante Restaurante Bar — Palermo Hollywood, Buenos Aires, Argentina.
 */
export function generateRestaurantSchema(location: Location = DEFAULT_LOCATION) {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `https://andantebar.com.ar/#location-${location.id}`,
    name: `Andante Restaurante Bar - ${location.name}`,
    image: "https://andantebar.com.ar/og-image.jpg",
    url: "https://andantebar.com.ar",
    telephone: location.phone,
    priceRange: "$$$",
    servesCuisine: ["Alta Cocina Cosmopolita", "Bistró Contemporáneo", "Cocina de Mercado", "Opciones Sin TACC", "Coctelería de Autor"],
    founder: {
      "@type": "Person",
      "name": "Pablo Aroma",
      "jobTitle": "Chef Ejecutivo",
    },
    employee: [
      {
        "@type": "Person",
        "name": "Santiago Contarino",
        "jobTitle": "Head Bartender",
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: location.address.street,
      addressLocality: location.address.city,
      addressRegion: location.address.state,
      postalCode: location.address.zipCode,
      addressCountry: "AR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: location.coordinates?.latitude ?? -34.5815,
      longitude: location.coordinates?.longitude ?? -58.4372,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "09:00",
        closes: "01:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "1280",
      bestRating: "5",
      worstRating: "1",
    },
    potentialAction: {
      "@type": "OrderAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://andantebar.com.ar/#menu",
        inLanguage: "es-AR",
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
      deliveryMethod: "http://purl.org/goodrelations/v1#DeliveryModeOwnFleet",
    },
  };
}

/**
 * Genera datos estructurados Schema.org Menu para la carta de Andante.
 */
export function generateMenuSchema(categories: Category[], menu: MenuItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: "Carta Andante Restaurante Bar",
    hasMenuSection: categories
      .filter((cat) => cat.id !== "favoritos")
      .map((cat) => ({
        "@type": "MenuSection",
        name: cat.label,
        hasMenuItem: menu
          .filter((item) => item.category === cat.id)
          .map((item) => ({
            "@type": "MenuItem",
            name: item.name,
            description: item.description,
            offers: {
              "@type": "Offer",
              price: item.price.toFixed(2),
              priceCurrency: "USD",
            },
          })),
      })),
  };
}

/**
 * Genera grafo multi-sede / espacios para Andante en Palermo Hollywood.
 */
export function generateMultiLocationRestaurantSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": locationsList.map((loc) => generateRestaurantSchema(loc)),
  };
}

/**
 * Serializa los esquemas en JSON-LD para inyección directa en el documento.
 */
export function generateRestaurantAndMenuJsonLd(
  location: Location = DEFAULT_LOCATION,
  categoryList: Category[] = [],
  menuList: MenuItem[] = [],
): string {
  const restaurant = generateRestaurantSchema(location);
  if (categoryList.length === 0 || menuList.length === 0) {
    return JSON.stringify(restaurant);
  }

  const menu = generateMenuSchema(categoryList, menuList);
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [restaurant, menu],
  });
}

/**
 * Grafo completo con todas las áreas de servicio y la carta gastronómica.
 */
export function generateFullStructuredDataGraph(
  locations: readonly Location[] = locationsList,
  categoryList: Category[] = [],
  menuList: MenuItem[] = [],
) {
  const restaurantBranches = locations.map((loc) => generateRestaurantSchema(loc));
  const menuData =
    categoryList.length > 0 && menuList.length > 0
      ? generateMenuSchema(categoryList, menuList)
      : null;

  return {
    "@context": "https://schema.org",
    "@graph": menuData ? [...restaurantBranches, menuData] : restaurantBranches,
  };
}
