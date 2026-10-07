import { useEffect, useRef } from "react";
import { Minus, Plus, MapPin, ShoppingBag, X } from "lucide-react";
import { currency } from "@/data/menu";
import { useCart } from "./cart";
import { whatsappHref } from "./whatsapp";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { useBodyScrollLock } from "@/lib/useBodyScrollLock";

export function CartSheet() {
  const { lines, total, count, add, remove, clear, location, isOpen, closeCart } =
    useCart();
  const panelRef = useRef<HTMLElement>(null);

  useFocusTrap(panelRef, isOpen);
  useBodyScrollLock(isOpen);

  // Dismiss with Escape
  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/*
        El fondo era un <button> a pantalla completa: entraba en el recorrido
        del tabulador y se anunciaba antes que el propio diálogo. Cerrar con
        clic fuera lo sigue haciendo, pero el camino accesible para cerrar es
        el botón de la cabecera y la tecla Escape.
      */}
      <div
        aria-hidden="true"
        onClick={closeCart}
        className="absolute inset-0 bg-[#0E1726]/85 backdrop-blur-sm"
      />
      <aside
        ref={panelRef}
        role="dialog"
        aria-label="Tu Selección Andante"
        aria-modal="true"
        className="relative flex h-full w-full max-w-sm flex-col bg-surface border-l border-brass/25 shadow-2xl"
      >
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-brass/20 px-5 py-4">
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src="/assets/andante-isotipo.png"
              alt="Andante"
              className="h-7 w-7 object-contain rounded-full border border-brass/40 shrink-0"
            />
            <h2 className="truncate font-display text-2xl font-bold uppercase tracking-tight text-linen">Tu Selección</h2>
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Cerrar"
            className="tap-target grid h-8 w-8 shrink-0 place-items-center rounded-none text-linen transition-colors hover:bg-brass hover:text-canvas cursor-pointer border border-brass/20"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Selected Space Banner */}
        <div className="flex items-center justify-between gap-2 border-b border-brass/15 bg-canvas px-5 py-2.5">
          <div className="flex min-w-0 items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 shrink-0 text-brass" />
            <div className="min-w-0">
              <span className="font-bold text-linen">{location.name}</span>
              <span className="ml-1.5 hidden text-mist sm:inline">, {location.address.street}</span>
            </div>
          </div>
          <span className="shrink-0 rounded-none bg-surface border border-brass/30 px-2 py-0.5 font-sans text-sm sm:text-xs font-bold uppercase tracking-wider text-brass">
            Palermo
          </span>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {count === 0 ? (
            <div className="mt-12 text-center">
              <ShoppingBag className="mx-auto h-8 w-8 text-mist/60" />
              <p className="mt-3 font-sans text-sm text-mist">
                Tu orden está vacía. Explorá nuestra carta de bistró y coctelería.
              </p>
              <p className="mt-2 font-sans text-xs sm:text-sm font-bold uppercase tracking-wider text-brass">
                COCINA DE MERCADO · SIN TACC CERTIFICADO · JAZZ EN VIVO
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {lines.map((line) => (
                <li
                  key={line.key}
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 rounded-none bg-canvas border border-brass/15 p-3.5"
                >
                  <div className="min-w-0">
                    <p className="truncate font-sans text-sm font-bold text-linen">
                      {line.qty}× {line.name}
                    </p>
                    {line.sides.length > 0 && (
                      <p className="mt-1 font-sans text-sm sm:text-xs text-mist">
                        {line.sides.join(", ")}
                      </p>
                    )}
                    <p className="mt-1 font-sans text-sm font-semibold text-brass tabular-nums">
                      {currency(line.price * line.qty)}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1.5 self-center">
                    <button
                      type="button"
                      onClick={() => remove(line.key)}
                      aria-label={`Disminuir cantidad de ${line.name}`}
                      className="tap-target grid h-7 w-7 place-items-center rounded-none bg-surface border border-brass/25 text-linen transition-colors hover:bg-brass hover:text-canvas cursor-pointer"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="min-w-[18px] text-center font-sans text-xs font-bold text-linen">
                      {line.qty}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        add({
                          itemId: line.itemId,
                          name: line.name,
                          sides: line.sides,
                          price: line.price,
                        })
                      }
                      aria-label={`Aumentar cantidad de ${line.name}`}
                      className="tap-target grid h-7 w-7 place-items-center rounded-none bg-surface border border-brass/25 text-linen transition-colors hover:bg-brass hover:text-canvas cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="px-5 py-4 bg-canvas border-t border-brass/20">
          <div className="flex items-center justify-between font-sans text-sm font-semibold">
            <span className="text-mist">Total Estimado</span>
            <span className="text-base font-bold text-brass tabular-nums">{currency(total)}</span>
          </div>
          <a
            href={whatsappHref(location, lines, total)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 block rounded-none bg-brass px-6 py-3.5 text-center font-sans text-base font-bold uppercase tracking-wider text-canvas hover:bg-linen hover:text-canvas transition-colors cursor-pointer select-none shadow-none"
          >
            PEDIR / RESERVAR POR WHATSAPP
          </a>
          <p className="mt-2 text-center font-sans text-xs text-mist">
            Confirmación directa con el equipo de {location.name} (Arévalo 1677)
          </p>
          {count > 0 && (
            <button
              type="button"
              onClick={clear}
              className="mt-2 min-h-11 w-full py-2 font-sans text-sm font-semibold text-mist/70 transition-colors hover:text-linen cursor-pointer"
            >
              Vaciar Selección
            </button>
          )}
        </div>
      </aside>
    </div>
  );
}
