import { currency } from "@/data/menu";
import { resolveLocation } from "@/data/locations";
import type { CartLine, Location, LocationId, WhatsAppOrderPayload } from "@/types/mojo";

/**
 * Genera el mensaje de pedido y reservas formateado para WhatsApp.
 * Incorpora la sede seleccionada en Palermo Hollywood (Arévalo 1677),
 * desglose de platos, maridajes/guarniciones seleccionadas, precios y cortesía.
 */
export function formatWhatsAppMessage(
  locationInput: LocationId | Location | string,
  lines: CartLine[],
  total: number,
): string {
  const loc = resolveLocation(locationInput);

  if (lines.length === 0) {
    return `Hola Andante Bar! Quisiera consultar por una reserva o pedido en ${loc.name} (Arévalo 1677, Palermo Hollywood).`;
  }

  const itemLines = lines.map((l) => {
    const sidesText = l.sides.length > 0 ? ` (${l.sides.join(", ")})` : "";
    return `• ${l.qty}× ${l.name}${sidesText} — ${currency(l.price * l.qty)}`;
  });

  return [
    `Hola Andante Bar! Deseo solicitar el siguiente pedido / reserva para ${loc.name}:`,
    ...itemLines,
    `Total Estimado: ${currency(total)}`,
    "Muchas gracias!",
  ].join("\n");
}

/**
 * Construye el enlace wa.me para checkout y reservas.
 *
 * Firmas soportadas:
 * 1. `whatsappHref(location, lines, total)`
 * 2. `whatsappHref(lines, total)`
 */
export function whatsappHref(
  location: LocationId | Location,
  lines: CartLine[],
  total: number,
): string;
export function whatsappHref(lines: CartLine[], total: number): string;
export function whatsappHref(
  arg1: LocationId | Location | CartLine[],
  arg2?: CartLine[] | number,
  arg3?: number,
): string {
  let location: Location;
  let lines: CartLine[];
  let total: number;

  if (Array.isArray(arg1)) {
    location = resolveLocation();
    lines = arg1;
    total = typeof arg2 === "number" ? arg2 : 0;
  } else {
    location = resolveLocation(arg1);
    lines = Array.isArray(arg2) ? arg2 : [];
    total = typeof arg3 === "number" ? arg3 : 0;
  }

  const message = formatWhatsAppMessage(location, lines, total);
  return `https://wa.me/${location.phoneRaw}?text=${encodeURIComponent(message)}`;
}

/**
 * Helper para construir el checkout de WhatsApp desde un payload validado.
 */
export function buildWhatsAppCheckout(payload: WhatsAppOrderPayload): {
  url: string;
  phone: string;
  message: string;
} {
  const loc = resolveLocation(payload.location);
  const message = formatWhatsAppMessage(loc, payload.lines, payload.total);
  const url = `https://wa.me/${loc.phoneRaw}?text=${encodeURIComponent(message)}`;

  return {
    url,
    phone: loc.phone,
    message,
  };
}
