import { useState, useEffect } from "react";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { currency } from "@/data/menu";
import { useCart } from "./cart";
import { whatsappHref } from "./whatsapp";

export function MobileActionBar({ onOpenCart }: { onOpenCart: () => void }) {
  const { count, total, lines, location } = useCart();
  const [isVisible, setIsVisible] = useState(false);

  // Aparece al hacer scroll más allá del Hero (~240px)
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setIsVisible(scrollY > 240);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const whatsappUrl = whatsappHref(location, lines, total);

  return (
    // inert mientras está oculta: el contenedor desactiva los punteros, pero la
    // tarjeta interior los reactiva, así que la barra invisible seguía
    // recibiendo toques en el borde inferior y el foco del tabulador.
    <div
      inert={!isVisible}
      className={`fixed inset-x-0 bottom-0 z-40 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:hidden transition-all duration-500 ease-out transform pointer-events-none ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0"
      }`}
    >
      <div className="pointer-events-auto flex items-center justify-between gap-3 rounded-none bg-surface border border-brass/30 p-3 pl-4 text-linen shadow-2xl">
        {/*
          Lado Izquierdo: Contador y Total Acumulado.
        */}
        <button
          type="button"
          className="flex items-center gap-3 cursor-pointer select-none text-left"
          onClick={onOpenCart}
          aria-label={
            count > 0
              ? `Abrir pedido, ${count} ${count === 1 ? "plato" : "platos"}, ${currency(total)}`
              : "Abrir pedido, vacío"
          }
        >
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center">
            <ShoppingBag className="h-5 w-5 text-brass" aria-hidden="true" />
            <span
              aria-hidden="true"
              className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-none bg-brass px-1 font-sans text-xs font-black text-canvas"
            >
              {count}
            </span>
          </div>

          <div aria-hidden="true" className="flex flex-col text-left">
            <span className="font-sans text-sm sm:text-xs font-bold uppercase tracking-wider text-mist">
              {count > 0 ? `${count} ${count === 1 ? "ítem" : "ítems"}` : "Tu Selección"}
            </span>
            <span className="font-display text-lg font-bold tracking-tight text-brass leading-tight">
              {count > 0 ? currency(total) : "$0.00"}
            </span>
          </div>
        </button>

        {/* Lado Derecho: botón latón con texto en canvas */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Pedir o reservar por WhatsApp"
          className="group flex min-h-11 items-center justify-center gap-2 rounded-none bg-brass px-5 py-3 font-sans text-sm font-bold uppercase tracking-wider text-canvas shadow-none transition-colors duration-150 hover:bg-linen hover:text-canvas"
        >
          <span>Pedir / Reservar</span>
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </a>
      </div>
    </div>
  );
}

export default MobileActionBar;
