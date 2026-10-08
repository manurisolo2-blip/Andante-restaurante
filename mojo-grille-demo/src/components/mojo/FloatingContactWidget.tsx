import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, Phone, X, ChevronRight, Clock, MapPin } from "lucide-react";

export function FloatingContactWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Cerrar con tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Mensajes preconfigurados para WhatsApp con números oficiales argentinos
  const whatsappSalonUrl = `https://wa.me/5491168673856?text=${encodeURIComponent(
    "Hola Andante Restaurante Bar, quisiera consultar disponibilidad para reservar una mesa en el Salón Azul (Palermo Hollywood). Número de personas: [Indicar cantidad] - Fecha y hora: [Indicar fecha y hora]."
  )}`;

  const whatsappPatioUrl = `https://wa.me/5491168062589?text=${encodeURIComponent(
    "Hola Andante Restaurante Bar, quisiera consultar disponibilidad para reservar una mesa en el Patio Interior (Palermo Hollywood). Número de personas: [Indicar cantidad] - Fecha y hora: [Indicar fecha y hora]."
  )}`;

  return (
    <>
      {/* Telón de fondo para cerrar al hacer clic afuera en móviles y desktop */}
      {isOpen && (
        <div
          role="presentation"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-canvas/60 backdrop-blur-xs transition-opacity duration-300"
        />
      )}

      {/* Contenedor Flotante Unificado (Thumb-Zone: esquina inferior derecha con fácil alcance en móviles y desktop) */}
      <div
        ref={menuRef}
        className="fixed right-4 sm:right-6 bottom-5 sm:bottom-6 z-50 flex flex-col items-end select-none"
      >
        {/* Menú Rápido Desplegable (Modal Flotante) */}
        {isOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Canales de atención directa y reservas"
            className="mb-3 w-[min(calc(100vw-2rem),360px)] border border-brass/35 bg-surface text-linen p-5 shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
          >
            {/* Cabecera del Menú */}
            <div className="flex items-start justify-between border-b border-brass/20 pb-3 mb-4">
              <div>
                <span className="font-sans text-[10px] font-black uppercase tracking-[0.2em] text-brass">
                  ATENCIÓN INMEDIATA · PALERMO HOLLYWOOD
                </span>
                <h3 className="font-serif font-display text-lg font-bold text-linen mt-0.5">
                  Contacto &amp; Reservas
                </h3>
                <p className="font-sans text-[11px] text-mist">
                  Arévalo 1677, CABA · Salón Azul &amp; Patio
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Cerrar opciones de contacto"
                className="grid h-8 w-8 place-items-center border border-brass/20 bg-canvas/60 text-mist hover:text-linen hover:border-brass transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Opción A: Reservar por WhatsApp */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-brass">
                  <MessageSquare className="h-4 w-4 text-amber" aria-hidden="true" />
                  <span className="font-sans text-xs font-bold uppercase tracking-wider text-linen">
                    Reservar por WhatsApp
                  </span>
                </div>
                <p className="font-sans text-[11px] text-mist leading-snug">
                  Mensaje preconfigurado para consultar espacio, fecha y comensales:
                </p>

                {/* Sub-opción Salón Azul */}
                <a
                  href={whatsappSalonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Reservar por WhatsApp en Salón Azul al +54 9 11 6867-3856"
                  className="group flex min-h-[48px] items-center justify-between border border-brass/25 bg-canvas/80 px-4 py-3 hover:border-brass hover:bg-canvas transition-all"
                >
                  <div className="flex flex-col text-left">
                    <span className="font-sans text-xs font-bold text-linen group-hover:text-brass transition-colors">
                      WhatsApp · Salón Azul
                    </span>
                    <span className="font-sans text-[10px] text-mist">
                      +54 9 11 6867-3856 · Jazz &amp; Cenas
                    </span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-brass group-hover:translate-x-1 transition-transform" />
                </a>

                {/* Sub-opción Patio Interior & Barra */}
                <a
                  href={whatsappPatioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Reservar por WhatsApp en Patio y Barra al +54 9 11 6806-2589"
                  className="group flex min-h-[48px] items-center justify-between border border-brass/25 bg-canvas/80 px-4 py-3 hover:border-brass hover:bg-canvas transition-all"
                >
                  <div className="flex flex-col text-left">
                    <span className="font-sans text-xs font-bold text-linen group-hover:text-brass transition-colors">
                      WhatsApp · Patio &amp; Barra
                    </span>
                    <span className="font-sans text-[10px] text-mist">
                      +54 9 11 6806-2589 · Aire Libre &amp; Cócteles
                    </span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-brass group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Opción B: Llamar al Restaurante */}
              <div className="space-y-2 pt-2 border-t border-brass/15">
                <div className="flex items-center gap-2 text-brass">
                  <Phone className="h-4 w-4 text-amber" aria-hidden="true" />
                  <span className="font-sans text-xs font-bold uppercase tracking-wider text-linen">
                    Llamar al Restaurante
                  </span>
                </div>
                <p className="font-sans text-[11px] text-mist leading-snug">
                  Líneas telefónicas directas de recepción:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <a
                    href="tel:+541168673856"
                    aria-label="Llamar a recepción Salón Azul al +54 11 6867-3856"
                    className="flex min-h-[48px] flex-col justify-center border border-brass/20 bg-canvas/80 px-3 py-2 text-left hover:border-brass transition-colors"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-mist">
                      Salón Azul
                    </span>
                    <span className="font-sans text-xs font-bold text-brass">
                      +54 11 6867-3856
                    </span>
                  </a>

                  <a
                    href="tel:+541168062589"
                    aria-label="Llamar a línea Patio y Barra al +54 11 6806-2589"
                    className="flex min-h-[48px] flex-col justify-center border border-brass/20 bg-canvas/80 px-3 py-2 text-left hover:border-brass transition-colors"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-mist">
                      Patio &amp; Barra
                    </span>
                    <span className="font-sans text-xs font-bold text-brass">
                      +54 11 6806-2589
                    </span>
                  </a>
                </div>
              </div>

              {/* Indicador de Horario */}
              <div className="flex items-center gap-2 pt-2 text-[11px] text-mist border-t border-brass/10">
                <Clock className="h-3.5 w-3.5 text-amber shrink-0" aria-hidden="true" />
                <span>Mar a Dom 09:00 a 01:00 hs (Lunes cerrado)</span>
              </div>
            </div>
          </div>
        )}

        {/* Botón Flotante Fijo Principal (Thumb-Zone FAB) */}
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          aria-label={isOpen ? "Cerrar menú de contacto y reservas" : "Abrir menú de contacto rápido y reservas por WhatsApp o teléfono"}
          className={`group flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full border-2 shadow-2xl transition-all duration-300 cursor-pointer select-none ${
            isOpen
              ? "bg-canvas border-brass text-brass rotate-90 scale-100"
              : "bg-brass border-canvas text-canvas hover:bg-linen hover:text-canvas hover:scale-105 shadow-brass/30"
          }`}
        >
          {isOpen ? (
            <X className="h-6 w-6 stroke-[2.5]" aria-hidden="true" />
          ) : (
            <div className="relative flex items-center justify-center">
              <MessageSquare className="h-6 w-6 sm:h-7 sm:w-7 stroke-[2.2]" aria-hidden="true" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-amber" />
              </span>
            </div>
          )}
        </button>
      </div>
    </>
  );
}

export default FloatingContactWidget;
