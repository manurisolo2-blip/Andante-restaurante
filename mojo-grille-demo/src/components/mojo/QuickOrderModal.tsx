import { useEffect, useRef, useState } from "react";
import { Check, X } from "lucide-react";
import { currency, sideOptions, type MenuItem } from "@/data/menu";
import { useCart } from "./cart";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { useBodyScrollLock } from "@/lib/useBodyScrollLock";

export function QuickOrderModal({
  item,
  onClose,
}: {
  item: MenuItem | null;
  onClose: () => void;
}) {
  const { add } = useCart();
  const [sides, setSides] = useState<string[]>([]);
  const panelRef = useRef<HTMLDivElement>(null);

  useFocusTrap(panelRef, item !== null);
  useBodyScrollLock(item !== null);

  useEffect(() => {
    setSides([]);
  }, [item?.id]);

  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [item, onClose]);

  if (!item) return null;

  const extras = sideOptions
    .filter((s) => sides.includes(s.id))
    .reduce((sum, s) => sum + s.price, 0);
  const total = item.price + extras;

  const toggle = (id: string) =>
    setSides((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-dish-title"
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
    >
      {/* Fondo decorativo con backdrop blur oscuro */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-[#0E1726]/85 backdrop-blur-sm"
      />
      <div
        ref={panelRef}
        className="relative max-h-[92dvh] w-full max-w-lg overflow-y-auto rounded-none bg-surface border border-brass/25 shadow-2xl sm:rounded-none"
      >
        <div className="relative">
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            width={1024}
            height={768}
            className="aspect-4/3 w-full object-cover"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-none bg-surface/90 text-linen border border-brass/20 transition-colors hover:bg-brass hover:text-canvas cursor-pointer"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between gap-3">
            <h3 id="modal-dish-title" className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-linen leading-none">
              {item.name}
            </h3>
            {item.badge && (
              <span className="shrink-0 font-sans text-xs font-bold uppercase tracking-wider text-amber border border-amber/30 px-2 py-0.5">
                {item.badge}
              </span>
            )}
          </div>
          <p className="mt-3 font-sans text-base leading-relaxed text-linen/80">
            {item.description}
          </p>

          {item.sidesAllowed ? (
            <>
              <p className="mt-6 font-sans text-sm sm:text-xs font-bold uppercase tracking-widest text-brass border-b border-brass/20 pb-2">
                PERSONALIZÁ TU PLATO · GUARNICIONES &amp; MARIDAJE
              </p>
              <ul className="mt-3 space-y-2">
                {sideOptions.map((side) => {
                  const selected = sides.includes(side.id);
                  return (
                    <li key={side.id}>
                      <button
                        type="button"
                        onClick={() => toggle(side.id)}
                        aria-pressed={selected}
                        className={
                          "grid min-h-11 w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-none px-4 py-3 text-left font-sans transition-colors cursor-pointer border " +
                          (selected
                            ? "bg-canvas text-linen font-bold border-brass/50"
                            : "text-linen/80 hover:bg-canvas/50 border-brass/10")
                        }
                      >
                        <span
                          className={
                            "grid h-5 w-5 shrink-0 place-items-center rounded-none transition-colors border " +
                            (selected
                              ? "bg-brass text-canvas border-brass"
                              : "bg-canvas border-brass/30")
                          }
                        >
                          {selected && <Check className="h-3.5 w-3.5 stroke-[3]" aria-hidden="true" />}
                        </span>
                        <span className="min-w-0 truncate text-sm font-semibold text-linen">
                          {side.name}
                        </span>
                        <span className="shrink-0 font-sans text-sm font-bold text-brass tabular-nums">
                          {side.price === 0 ? "INCLUIDO" : `+${currency(side.price)}`}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </>
          ) : (
            <p className="mt-6 rounded-none bg-brass/10 border border-brass/20 px-4 py-3 font-sans text-sm font-bold uppercase tracking-wider text-brass">
              100% ARTESANAL · ELABORACIÓN AL MOMENTO (PALERMO HOLLYWOOD)
            </p>
          )}

          <button
            type="button"
            onClick={() => {
              add({
                itemId: item.id,
                name: item.name,
                sides: sideOptions.filter((s) => sides.includes(s.id)).map((s) => s.name),
                price: total,
              });
              onClose();
            }}
            className="mt-6 flex w-full items-center justify-between gap-2 rounded-none bg-brass px-6 py-4 font-sans text-sm sm:text-base font-bold uppercase tracking-wider text-canvas hover:bg-linen hover:text-canvas transition-colors cursor-pointer select-none shadow-none"
          >
            <span className="truncate">AGREGAR A MI PEDIDO</span>
            <span className="shrink-0 font-display text-xl tabular-nums">{currency(total)}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
