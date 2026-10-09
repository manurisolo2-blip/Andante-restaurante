import React from "react";
import { UtensilsCrossed, Wine, Sparkles, ArrowRight, CalendarHeart } from "lucide-react";

export interface CulinaryConceptSectionProps {
  onOpenReservation?: () => void;
}

export function CulinaryConceptSection({ onOpenReservation }: CulinaryConceptSectionProps) {
  const handleScrollToMenu = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const menuEl = document.getElementById("menu");
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      aria-label="Concepto Culinario y Equipo de Andante"
      className="relative w-full bg-canvas py-20 sm:py-28 px-5 sm:px-8 lg:px-12 border-b border-brass/15"
    >
      <div className="mx-auto max-w-[1560px] w-full">
        {/* Cabecera Editorial Asimétrica */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16 sm:mb-20 pb-8 border-b border-brass/20">
          <div className="max-w-2xl">
            <span className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-brass block mb-3">
              FILOSOFÍA DE SALA &amp; COCINA
            </span>
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-linen leading-[0.95]">
              ALQUIMIA DE ESTACIÓN &amp; <span className="text-brass">COMPÁS</span> HUMANO
            </h2>
          </div>
          <p className="max-w-md font-sans text-sm sm:text-base text-mist leading-relaxed font-normal">
            Andante nace para interrumpir la prisa de Palermo Hollywood. Alta cocina de mercado, vermutería artesanal y sesiones acústicas bajo un tempo sosegado de 76 a 108 pulsos por minuto.
          </p>
        </div>

        {/* Estructura Asimétrica Editorial (Díptico Asimétrico 7/5) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Bloque Principal (7 cols): La Cocina de Pablo Aroma */}
          <article className="lg:col-span-7 bg-surface/75 border border-brass/25 p-8 sm:p-12 flex flex-col justify-between shadow-2xl relative overflow-hidden backdrop-blur-md">
            <div>
              <div className="flex items-center justify-between pb-6 mb-8 border-b border-brass/15">
                <span className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-amber">
                  DIRECCIÓN GASTRONÓMICA
                </span>
                <span className="font-sans text-xs text-mist font-medium">
                  Chef Ejecutivo Pablo Aroma
                </span>
              </div>

              <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-linen mb-6 leading-tight">
                Cocina Cosmopolita, Memoria Porteña &amp; Fuego
              </h3>

              <div className="space-y-4 font-sans text-sm sm:text-base text-mist leading-relaxed">
                <p>
                  Técnicas de alta escuela europea y fermentaciones asiáticas adaptadas a los productos más nobles del mercado local. Reducciones glaseadas de 36 horas, masas madre de centeno y cortes seleccionados sellados sobre leña dura de quebracho blanco.
                </p>
                <p>
                  Cada plato dialoga con el ritmo de la sobremesa, buscando texturas untuosas y contrastes herbales que perduren en la memoria del comensal.
                </p>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-brass/15 flex flex-wrap items-center justify-between gap-4">
              <span className="font-sans text-xs font-semibold text-brass uppercase tracking-wider">
                Platos de Culto: Ravioli di Ossobuco · Bife Madurado 45 Días
              </span>
              <a
                href="#menu"
                onClick={handleScrollToMenu}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-linen hover:text-brass transition-colors"
              >
                <span>Ver Platos Principales</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </article>

          {/* Columna Derecha (5 cols): Dos Módulos Escalonados */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            
            {/* Módulo Superior: Coctelería de Autor & Cava Subterránea */}
            <article className="bg-surface/60 border border-brass/20 p-7 sm:p-9 flex flex-col justify-between backdrop-blur-sm">
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-brass/15">
                  <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-amber">
                    BARRA &amp; BODEGA
                  </span>
                  <span className="font-sans text-xs text-mist font-medium">
                    Santiago Contarino
                  </span>
                </div>

                <h4 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-linen mb-3">
                  Coctelería Botánica &amp; Cava de Guarda
                </h4>

                <p className="font-sans text-xs sm:text-sm text-mist leading-relaxed">
                  Reinterpretaciones sobrias de aperitivos clásicos y destilados añejos. Nuestra cava en el subsuelo alberga más de 120 etiquetas de productores independientes de Salta, Mendoza y la Patagonia.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-brass/10 flex items-center justify-between">
                <span className="font-sans text-xs font-medium text-linen/90">
                  Firma: Paper Plate con Amargo Obrero &amp; Vermouth Artesanal
                </span>
              </div>
            </article>

            {/* Módulo Inferior: Protocolo Sin TACC & Ciclo de Jazz */}
            <article className="bg-surface/60 border border-brass/20 p-7 sm:p-9 flex flex-col justify-between backdrop-blur-sm">
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-brass/15">
                  <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-amber">
                    INCLUSIÓN &amp; AMBIENTE
                  </span>
                  <span className="font-sans text-xs text-mist font-medium">
                    Cocina Certificada
                  </span>
                </div>

                <h4 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-linen mb-3">
                  Rigor Sin TACC &amp; Acústica Pura
                </h4>

                <p className="font-sans text-xs sm:text-sm text-mist leading-relaxed">
                  Cocina con línea protegida libre de gluten sin resignar alta gastronomía (como nuestros ñoquis de arroz tostado en dashi de hongos). Sala con tratamiento acústico para gozar del jazz acústico a volumen humano.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-brass/10 flex items-center justify-between">
                <span className="font-sans text-xs font-medium text-brass">
                  Música en Vivo: Martes &amp; Jueves 21:00 hs
                </span>
              </div>
            </article>

          </div>

        </div>

        {/* Acciones de Sala y Reserva */}
        <div className="mt-14 sm:mt-18 pt-8 border-t border-brass/15 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-brass" aria-hidden="true" />
            <p className="font-sans text-xs sm:text-sm text-mist uppercase tracking-wider font-semibold">
              Arévalo 1677, Palermo Hollywood · Salón Central, Patio &amp; Cava Privada
            </p>
          </div>

          <div className="flex flex-row flex-wrap items-center gap-3 w-full sm:w-auto">
            <a
              href="#menu"
              onClick={handleScrollToMenu}
              className="flex-1 sm:flex-none inline-flex min-h-[46px] items-center justify-center gap-2 bg-brass px-6 py-3 font-sans text-xs sm:text-sm font-bold uppercase tracking-wider text-canvas hover:bg-linen hover:text-canvas transition-colors select-none text-center"
            >
              <span>Explorar Menú</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={() => onOpenReservation ? onOpenReservation() : undefined}
              className="flex-1 sm:flex-none inline-flex min-h-[46px] items-center justify-center gap-2 bg-surface border border-brass/35 px-6 py-3 font-sans text-xs sm:text-sm font-bold uppercase tracking-wider text-linen hover:border-brass hover:text-brass transition-colors cursor-pointer select-none text-center"
            >
              <CalendarHeart className="h-4 w-4 text-amber" aria-hidden="true" />
              <span>Reservar Salón</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CulinaryConceptSection;
