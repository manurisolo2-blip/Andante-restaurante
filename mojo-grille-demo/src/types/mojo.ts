import { z } from "zod";

/**
 * ============================================================================
 * Mojo Grille — Centralized Domain Contracts & Type Definitions
 * ============================================================================
 * Authoritative TypeScript interfaces and runtime Zod validation schemas
 * for the Mojo Grille platform redesign.
 */

// ----------------------------------------------------------------------------
// 1. Location Contracts
// ----------------------------------------------------------------------------

export const LOCATION_IDS = ["little-havana", "brickell", "doral"] as const;
export type LocationId = (typeof LOCATION_IDS)[number];

export const LocationIdSchema = z.enum(["little-havana", "brickell", "doral"]);

export interface LocationAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  fullAddress: string;
}

export const LocationAddressSchema = z.object({
  street: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().length(2, "State must be 2-letter code (e.g. FL)"),
  zipCode: z.string().min(5, "Valid postal code required"),
  fullAddress: z.string().min(1, "Formatted full address is required"),
});

export interface LocationCoordinates {
  latitude: number;
  longitude: number;
}

export const LocationCoordinatesSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
});

export interface Location {
  id: LocationId;
  name: string;
  slug: string;
  phone: string; // E.164 formatted: "+1-305-555-0123"
  phoneRaw: string; // Digits only for wa.me/tel links: "13055550123"
  address: LocationAddress;
  coordinates?: LocationCoordinates;
  hours: string; // e.g. "Mon to Sun 11:00 AM to 10:00 PM"
  isPrimary?: boolean;
}

export const LocationSchema = z.object({
  id: LocationIdSchema,
  name: z.string().min(1, "Location name is required"),
  slug: z.string().min(1, "Location slug is required"),
  phone: z.string().min(1, "Formatted phone number is required"),
  phoneRaw: z.string().regex(/^\d{10,15}$/, "Raw phone must be digits (10-15 chars)"),
  address: LocationAddressSchema,
  coordinates: LocationCoordinatesSchema.optional(),
  hours: z.string().min(1, "Operating hours string is required"),
  isPrimary: z.boolean().optional(),
});

// ----------------------------------------------------------------------------
// 2. Category & Badge Contracts
// ----------------------------------------------------------------------------

export const CATEGORY_IDS = [
  "entradas",
  "principales",
  "postres",
  "barra",
  "cafeteria",
  "favoritos",
  "bowls",
  "sandwiches",
  "sides",
  "bebidas",
  "catering",
] as const;
export type CategoryId = (typeof CATEGORY_IDS)[number];

export const CategoryIdSchema = z.enum([
  "entradas",
  "principales",
  "postres",
  "barra",
  "cafeteria",
  "favoritos",
  "bowls",
  "sandwiches",
  "sides",
  "bebidas",
  "catering",
]);

export interface Category {
  id: CategoryId;
  label: string;
  description?: string;
}

export const CategorySchema = z.object({
  id: CategoryIdSchema,
  label: z.string().min(1, "Category label is required"),
  description: z.string().optional(),
});

export const BADGE_TYPES = [
  "Firma Andante",
  "Sin TACC",
  "Vegetariano",
  "Coctelería de Autor",
  "De Estación",
  "Chef Pablo Aroma",
  "Santiago Contarino",
  "Mojo Signature",
  "Popular",
  "Top Seller",
  "Fresco del día",
] as const;
export type BadgeType = (typeof BADGE_TYPES)[number];

export const BadgeTypeSchema = z.enum([
  "Firma Andante",
  "Sin TACC",
  "Vegetariano",
  "Coctelería de Autor",
  "De Estación",
  "Chef Pablo Aroma",
  "Santiago Contarino",
  "Mojo Signature",
  "Popular",
  "Top Seller",
  "Fresco del día",
]);

// ----------------------------------------------------------------------------
// 3. Side Option & Menu Item Contracts
// ----------------------------------------------------------------------------

export interface SideOption {
  id: string; // "moro" | "tostones" | "yuca" | "maduros"
  name: string;
  price: number;
  isIncluded?: boolean;
}

export const SideOptionSchema = z.object({
  id: z.string().min(1, "Side ID is required"),
  name: z.string().min(1, "Side name is required"),
  price: z.number().nonnegative("Price cannot be negative"),
  isIncluded: z.boolean().optional(),
});

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: CategoryId;
  badge?: BadgeType | undefined;
  sidesAllowed: boolean;
  featured?: boolean | undefined;
  isGlutenFree?: boolean | undefined;
  isVegetarian?: boolean | undefined;
  chefNotes?: string | undefined;
  pairing?: string | undefined;
}

export const MenuItemSchema = z.object({
  id: z.string().min(1, "Menu item ID is required"),
  name: z.string().min(1, "Dish name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().positive("Price must be greater than zero"),
  image: z.string().min(1, "Image URL or asset import is required"),
  category: CategoryIdSchema,
  badge: BadgeTypeSchema.optional(),
  sidesAllowed: z.boolean(),
  featured: z.boolean().optional(),
  isGlutenFree: z.boolean().optional(),
  isVegetarian: z.boolean().optional(),
  chefNotes: z.string().optional(),
  pairing: z.string().optional(),
});

// ----------------------------------------------------------------------------
// 4. Cart Line & Application State Contracts
// ----------------------------------------------------------------------------

export interface CartLine {
  /**
   * Deterministic deduplication key:
   * Format: `${itemId}::${[...sides].sort().join('|')}`
   */
  key: string;
  itemId: string;
  name: string;
  sides: string[];
  price: number; // Unit price including chosen sides
  qty: number; // Positive integer >= 1
}

export const CartLineSchema = z.object({
  key: z.string().min(1, "Cart line key is required"),
  itemId: z.string().min(1, "Item ID is required"),
  name: z.string().min(1, "Item name is required"),
  sides: z.array(z.string()),
  price: z.number().positive("Line price must be positive"),
  qty: z.number().int().positive("Quantity must be at least 1"),
});

export type AddCartItemInput = Omit<CartLine, "key" | "qty">;

export const AddCartItemInputSchema = CartLineSchema.omit({
  key: true,
  qty: true,
});

export interface CartState {
  lines: CartLine[];
  count: number;
  total: number;
  selectedLocation: LocationId;
  location: Location;
}

/**
 * Transient "added to your order" confirmation surfaced after `add()`.
 */
export interface CartToastNotification {
  id: string;
  message: string;
  itemName: string;
}

export interface CartContextType extends CartState {
  availableLocations: readonly Location[];
  setLocation: (locationId: LocationId) => void;
  add: (line: AddCartItemInput) => void;
  remove: (key: string) => void;
  clear: () => void;
  updateQty: (key: string, qty: number) => void;

  // Cart drawer UI state (single source of truth for every cart surface)
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  // Transient add-to-cart confirmation
  toast: CartToastNotification | null;
  dismissToast: () => void;
}

// ----------------------------------------------------------------------------
// 5. WhatsApp Checkout & Order Payload Contracts
// ----------------------------------------------------------------------------

export interface WhatsAppOrderPayload {
  location: LocationId | Location;
  lines: CartLine[];
  total: number;
  customerName?: string;
  customerNotes?: string;
}

export const WhatsAppOrderPayloadSchema = z.object({
  location: z.union([LocationIdSchema, LocationSchema]),
  lines: z.array(CartLineSchema),
  total: z.number().nonnegative("Total cannot be negative"),
  customerName: z.string().optional(),
  customerNotes: z.string().optional(),
});

// ----------------------------------------------------------------------------
// 6. Runtime Type Guards
// ----------------------------------------------------------------------------

export function isLocationId(id: unknown): id is LocationId {
  return typeof id === "string" && (LOCATION_IDS as readonly string[]).includes(id);
}

export function isCategoryId(id: unknown): id is CategoryId {
  return typeof id === "string" && (CATEGORY_IDS as readonly string[]).includes(id);
}

export function isBadgeType(badge: unknown): badge is BadgeType {
  return typeof badge === "string" && (BADGE_TYPES as readonly string[]).includes(badge);
}

