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
      className="relative w-full bg-canvas py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-brass/10"
    >
      <div className="mx-auto max-w-[1600px] w-full">
        {/* Cabecera Editorial de la Sección */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-brass mb-3">
            <Sparkles className="h-4 w-4 text-amber" aria-hidden="true" />
            <span>CHEF EJECUTIVO PABLO AROMA · HEAD BARTENDER SANTIAGO CONTARINO</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-linen leading-none">
            FILOSOFÍA CULINARIA &amp; ESPÍRITU ANDANTE
          </h2>
          <p className="mt-4 font-sans text-base sm:text-lg text-mist leading-relaxed">
            Un compás moderado en Palermo Hollywood (76–108 PPM) donde la alta cocina cosmopolita, la coctelería clásica de autor y los ensambles acústicos de jazz convergen en una pausa sensorial única.
          </p>
        </div>

        {/* 3 Pilares Fundamentales en Tarjetas Dark Luxury */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Pilar 1: Cocina de Mercado & Técnica Clásica */}
          <article className="group relative border border-brass/20 bg-surface/80 p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 hover:border-brass hover:shadow-2xl hover:shadow-brass/5">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-none border border-brass/30 bg-canvas text-brass mb-6">
                <UtensilsCrossed className="h-6 w-6 text-amber" aria-hidden="true" />
              </div>
              <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-amber block mb-2">
                CHEF PABLO AROMA (EX NICKY HARRISON)
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-linen mb-4 group-hover:text-brass transition-colors">
                Cocina Cosmopolita &amp; Técnica
              </h3>
              <p className="font-sans text-sm text-mist leading-relaxed">
                Recetas de Francia, Italia, Corea y Tailandia adaptadas con maestría al paladar porteño. Masas madre de fermentación lenta, reducciones glaseadas de cocción prolongada y cortes seleccionados a las brasas.
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-brass/15">
              <span className="font-sans text-xs font-semibold text-linen/80 uppercase tracking-wider block">
                Especialidad: Ravioli di Ossobuco &amp; Bife Madurado
              </span>
            </div>
          </article>

          {/* Pilar 2: Coctelería de Autor & Cava Subterránea */}
          <article className="group relative border border-brass/20 bg-surface/80 p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 hover:border-brass hover:shadow-2xl hover:shadow-brass/5">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-none border border-brass/30 bg-canvas text-brass mb-6">
                <Wine className="h-6 w-6 text-amber" aria-hidden="true" />
              </div>
              <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-amber block mb-2">
                HEAD BARTENDER SANTIAGO CONTARINO
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-linen mb-4 group-hover:text-brass transition-colors">
                Coctelería de Autor &amp; Cava
              </h3>
              <p className="font-sans text-sm text-mist leading-relaxed">
                Diseño de barra protagónica con reinterpretaciones botánicas y clásicos porteños: Paper Plate, Vermouth Julep y Pisco Sour. Nuestra cava subterránea atesora más de 120 etiquetas de bodegas boutique.
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-brass/15">
              <span className="font-sans text-xs font-semibold text-linen/80 uppercase tracking-wider block">
                Insignia: Paper Plate con Amargo Obrero
              </span>
            </div>
          </article>

          {/* Pilar 3: Inclusión Sin TACC & Sesiones de Jazz */}
          <article className="group relative border border-brass/20 bg-surface/80 p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 hover:border-brass hover:shadow-2xl hover:shadow-brass/5">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-none border border-brass/30 bg-canvas text-brass mb-6">
                <Sparkles className="h-6 w-6 text-amber" aria-hidden="true" />
              </div>
              <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-amber block mb-2">
                100% LIBRE DE GLUTEN &amp; ACÚSTICA VIVA
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-linen mb-4 group-hover:text-brass transition-colors">
                Opciones Sin TACC &amp; Jazz
              </h3>
              <p className="font-sans text-sm text-mist leading-relaxed">
                Platos libres de gluten elaborados con riguroso protocolo (como los ñoquis coreanos de harina de arroz en dashi de setas). Muros en azul noche y acústica diseñada para disfrutar ensambles de jazz en vivo sin estridencias.
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-brass/15">
              <span className="font-sans text-xs font-semibold text-linen/80 uppercase tracking-wider block">
                Música en Vivo: Martes &amp; Jueves 21:00 hs
              </span>
            </div>
          </article>
        </div>

        {/* Botones de Navegación Rápida */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#menu"
            onClick={handleScrollToMenu}
            className="inline-flex min-h-11 items-center gap-2.5 rounded-none bg-brass px-8 py-3.5 font-sans text-sm font-bold uppercase tracking-wider text-linen hover:bg-brass/90 transition-colors cursor-pointer select-none border border-brass shadow-md"
          >
            <span>Explorar Carta Digital</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={() => onOpenReservation ? onOpenReservation() : undefined}
            className="inline-flex min-h-11 items-center gap-2.5 rounded-none bg-surface border border-brass/35 px-8 py-3.5 font-sans text-sm font-bold uppercase tracking-wider text-linen hover:border-brass hover:text-brass transition-colors cursor-pointer select-none"
          >
            <CalendarHeart className="h-4 w-4 text-amber" aria-hidden="true" />
            <span>Reservar Mesa en Salón o Patio</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default CulinaryConceptSection;
