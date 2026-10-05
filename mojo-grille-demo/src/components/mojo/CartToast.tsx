import { CheckCircle2, X } from "lucide-react";
import { useCart } from "./cart";

/**
 * Transient "added to your order" confirmation.
 *
 * Rendered permanently so the exit transition can play; visibility is driven
 * purely by the presence of `toast` in the cart context. "View" opens the
 * single cart drawer (CartSheet).
 *
 * Sits just below the fixed header (--header-h). At top-5 it covered the bag
 * and menu buttons for as long as it was up, which is exactly when someone
 * wants to open the order; on a phone it also ran flush to the left edge.
 */
export function CartToast() {
  const { toast, dismissToast, openCart } = useCart();

  return (
    <div
      className={`fixed top-[calc(var(--header-h)+0.75rem)] left-4 right-4 sm:left-auto sm:right-5 z-60 sm:max-w-sm rounded-none bg-surface border border-brass/30 text-linen p-4 flex items-center justify-between gap-3 select-none shadow-2xl transition-all duration-300 ease-out transform ${
        toast
          ? "translate-y-0 opacity-100 scale-100 pointer-events-auto"
          : "-translate-y-6 opacity-0 scale-95 pointer-events-none"
      }`}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-none bg-brass text-canvas">
          <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="text-left">
          <p className="font-sans text-sm font-bold text-linen">
            {toast?.message || "¡Agregado a tu selección!"}
          </p>
          <p className="font-sans text-xs text-mist line-clamp-1">
            {toast?.itemName}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => {
            dismissToast();
            openCart();
          }}
          tabIndex={toast ? 0 : -1}
          className="h-11 shrink-0 rounded-none bg-brass px-3 py-1 font-sans text-sm sm:text-xs font-bold uppercase tracking-wider text-canvas hover:bg-linen hover:text-canvas transition-colors cursor-pointer"
        >
          Ver
        </button>
        <button
          type="button"
          onClick={dismissToast}
          tabIndex={toast ? 0 : -1}
          className="tap-target text-mist hover:text-linen p-1 cursor-pointer"
          aria-label="Descartar notificación"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

export default CartToast;
