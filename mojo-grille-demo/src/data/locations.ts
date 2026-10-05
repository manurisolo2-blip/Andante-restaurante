import type { Location, LocationId } from "@/types/mojo";

/**
 * Andante Restaurante Bar — Espacios y Sedes Oficiales en Palermo Hollywood.
 * Arévalo 1677, Palermo Hollywood, Ciudad Autónoma de Buenos Aires, Argentina.
 */
export const LOCATIONS: Record<LocationId, Location> = {
  "little-havana": {
    id: "little-havana",
    name: "Palermo Hollywood",
    slug: "palermo-hollywood",
    phone: "+54 11 4778-9000",
    phoneRaw: "5491147789000",
    address: {
      street: "Arévalo 1677",
      city: "Palermo Hollywood, CABA",
      state: "BA",
      zipCode: "C1414",
      fullAddress: "Arévalo 1677, Palermo Hollywood, C1414 CABA, Argentina",
    },
    coordinates: {
      latitude: -34.5815,
      longitude: -58.4372,
    },
    hours: "Mar a Dom 09:00 a 01:00 hs (Cocina de mercado & Jazz)",
    isPrimary: true,
  },
  brickell: {
    id: "brickell",
    name: "Terraza & Barra Andante",
    slug: "terraza-andante",
    phone: "+54 11 4778-9001",
    phoneRaw: "5491147789001",
    address: {
      street: "Arévalo 1677 (Terraza Jardín)",
      city: "Palermo Hollywood, CABA",
      state: "BA",
      zipCode: "C1414",
      fullAddress: "Arévalo 1677, Terraza Andante, Palermo Hollywood, Argentina",
    },
    coordinates: {
      latitude: -34.5815,
      longitude: -58.4372,
    },
    hours: "Mar a Dom 18:00 a 02:00 hs (Coctelería & Acústico)",
    isPrimary: false,
  },
  doral: {
    id: "doral",
    name: "Cava Privada & Jazz",
    slug: "cava-jazz",
    phone: "+54 11 4778-9002",
    phoneRaw: "5491147789002",
    address: {
      street: "Arévalo 1677 (Cava Subsuelo)",
      city: "Palermo Hollywood, CABA",
      state: "BA",
      zipCode: "C1414",
      fullAddress: "Arévalo 1677, Cava Privada, Palermo Hollywood, Argentina",
    },
    coordinates: {
      latitude: -34.5815,
      longitude: -58.4372,
    },
    hours: "Jue a Dom 20:00 a 02:00 hs (Ciclos de Jazz & Catas)",
    isPrimary: false,
  },
};

export const locationsList: readonly Location[] = [
  LOCATIONS["little-havana"],
  LOCATIONS["brickell"],
  LOCATIONS["doral"],
];

export const DEFAULT_LOCATION_ID: LocationId = "little-havana";
export const DEFAULT_LOCATION: Location = LOCATIONS[DEFAULT_LOCATION_ID];

/**
 * Resolves a location input (Location object, LocationId, or display name)
 * to a validated Location entity. Falls back to DEFAULT_LOCATION.
 */
export function resolveLocation(input?: LocationId | Location | string | null): Location {
  if (!input) return DEFAULT_LOCATION;

  if (
    typeof input === "object" &&
    input !== null &&
    "id" in input &&
    typeof input.id === "string" &&
    Object.hasOwn(LOCATIONS, input.id)
  ) {
    return input;
  }

  if (typeof input === "string") {
    // Exact ID match with prototype pollution safety
    if (Object.hasOwn(LOCATIONS, input)) {
      return LOCATIONS[input as LocationId];
    }
    // Slugified match (e.g. "Little Havana" -> "little-havana")
    const slug = input.toLowerCase().trim().replace(/\s+/g, "-");
    if (Object.hasOwn(LOCATIONS, slug)) {
      return LOCATIONS[slug as LocationId];
    }
    // Case-insensitive name or slug match
    const byMatch = locationsList.find(
      (l) =>
        l.name.toLowerCase() === input.toLowerCase().trim() ||
        l.slug.toLowerCase() === input.toLowerCase().trim() ||
        l.slug === slug,
    );
    if (byMatch) return byMatch;
  }

  return DEFAULT_LOCATION;
}

export function getLocationById(id: LocationId): Location | undefined {
  return Object.hasOwn(LOCATIONS, id) ? LOCATIONS[id] : undefined;
}

