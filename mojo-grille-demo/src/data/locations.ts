import type { Location, LocationId } from "@/types/mojo";

/**
 * Andante Restaurante Bar — Espacios y Sedes Oficiales en Palermo Hollywood.
 * Arévalo 1677, Palermo Hollywood, Ciudad Autónoma de Buenos Aires, Argentina.
 */
export const LOCATIONS: Record<LocationId, Location> = {
  "little-havana": {
    id: "little-havana",
    name: "Salón Azul (Palermo Hollywood)",
    slug: "salon-azul",
    phone: "+54 11 6867-3856",
    phoneRaw: "5491168673856",
    address: {
      street: "Arévalo 1677",
      city: "Palermo Hollywood, CABA",
      state: "BA",
      zipCode: "C1414CQG",
      fullAddress: "Arévalo 1677, Palermo Hollywood, C1414CQG, Ciudad Autónoma de Buenos Aires, Argentina",
    },
    coordinates: {
      latitude: -34.5815,
      longitude: -58.4372,
    },
    hours: "Mar a Dom 09:00 a 01:00 hs (Lunes cerrado)",
    isPrimary: true,
  },
  brickell: {
    id: "brickell",
    name: "Patio Interior al Aire Libre",
    slug: "patio-interior",
    phone: "+54 11 6806-2589",
    phoneRaw: "5491168062589",
    address: {
      street: "Arévalo 1677 (Patio Interior)",
      city: "Palermo Hollywood, CABA",
      state: "BA",
      zipCode: "C1414CQG",
      fullAddress: "Arévalo 1677, Patio Interior, Palermo Hollywood, C1414CQG, Argentina",
    },
    coordinates: {
      latitude: -34.5815,
      longitude: -58.4372,
    },
    hours: "Mar a Sáb 18:00 a 01:00 hs (Bar & Cenas)",
    isPrimary: false,
  },
  doral: {
    id: "doral",
    name: "Cava Privada & Jazz",
    slug: "cava-jazz",
    phone: "+54 11 6867-3856",
    phoneRaw: "5491168673856",
    address: {
      street: "Arévalo 1677 (Cava Subsuelo)",
      city: "Palermo Hollywood, CABA",
      state: "BA",
      zipCode: "C1414CQG",
      fullAddress: "Arévalo 1677, Cava Privada, Palermo Hollywood, C1414CQG, Argentina",
    },
    coordinates: {
      latitude: -34.5815,
      longitude: -58.4372,
    },
    hours: "Mar y Jue 21:00 hs (Jazz Nights) · Catas Guiadas",
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
    const normalized = input.toLowerCase().trim();
    if (normalized.includes("palermo") || normalized.includes("azul") || normalized.includes("central") || normalized.includes("little-havana")) {
      return LOCATIONS["little-havana"];
    }
    if (normalized.includes("patio") || normalized.includes("terraza") || normalized.includes("brickell")) {
      return LOCATIONS["brickell"];
    }
    if (normalized.includes("cava") || normalized.includes("doral") || normalized.includes("jazz")) {
      return LOCATIONS["doral"];
    }
    // Slugified match
    const slug = normalized.replace(/\s+/g, "-");
    if (Object.hasOwn(LOCATIONS, slug)) {
      return LOCATIONS[slug as LocationId];
    }
    // Case-insensitive name or slug match
    const byMatch = locationsList.find(
      (l) =>
        l.name.toLowerCase() === normalized ||
        l.slug.toLowerCase() === normalized ||
        l.slug === slug,
    );
    if (byMatch) return byMatch;
  }

  return DEFAULT_LOCATION;
}

export function getLocationById(id: LocationId): Location | undefined {
  return Object.hasOwn(LOCATIONS, id) ? LOCATIONS[id] : undefined;
}

