import React, { useEffect, useRef, useState } from "react";
import { UtensilsCrossed, CalendarHeart, Star, ArrowRight } from "lucide-react";
import { MagneticButton } from "./MagneticButton";
import { HoverHighlightText } from "@/components/ui/hover-highlight-text";
import { HeroVideoBackground } from "./HeroVideoBackground";
import { useReducedMotion } from "@/lib/useReducedMotion";

export interface HeroSectionProps {
  onOrderClick?: () => void;
  onReservationClick?: () => void;
  menuAnchorId?: string;
  cateringHref?: string;
  /**
   * Triggers the cinematic entrance animation for Hero headline and CTAs.
   */
  shouldAnimateIn?: boolean;
}

export function HeroSection({
  onOrderClick,
  onReservationClick,
  menuAnchorId = "menu",
  cateringHref = "#catering",
  shouldAnimateIn = true,
}: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [animReady, setAnimReady] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    // Si shouldAnimateIn es false (esperando preloader), no mostramos animación aún
    if (!shouldAnimateIn) {
      return undefined;
    }
    // Sin movimiento vestibular no hay por qué escalonar la entrada.
    if (reducedMotion) {
      setAnimReady(true);
      return undefined;
    }
    const timer = setTimeout(() => setAnimReady(true), 150);
    return () => clearTimeout(timer);
  }, [shouldAnimateIn, reducedMotion]);

  const handleScrollToMenu = (e: React.MouseEvent<HTMLElement>) => {
    const target = document.getElementById(menuAnchorId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    onOrderClick?.();
  };

  // Clases dinámicas de entrada. Con prefers-reduced-motion se sustituye el
  // desplazamiento por un fundido corto (nunca traslación ni escalonado).
  const animContainerClass = reducedMotion
    ? animReady
      ? "opacity-100 transition-opacity duration-200 ease-out"
      : "opacity-0"
    : animReady
      ? "opacity-100 translate-y-0 transition-all duration-700 ease-out"
      : "opacity-0 translate-y-6";

  const animItemClass = reducedMotion
    ? animReady
      ? "opacity-100 transition-opacity duration-200 ease-out"
      : "opacity-0"
    : animReady
      ? "opacity-100 translate-y-0 transition-all duration-500 delay-200 ease-out"
      : "opacity-0 translate-y-4";

  return (
    <section
      ref={sectionRef}
      id="top"
      aria-label="Andante Restaurante Bar - Palermo Hollywood"
      className="relative z-10 w-full h-full min-h-dvh flex flex-col justify-center bg-transparent"
    >
      {/* Descriptor editorial para lectores de pantalla y buscadores */}
      <p className="sr-only">
        Andante: Un viaje por el mundo a través del paladar. Cocina de autor, coctelería internacional y sesiones de jazz en vivo en Palermo Hollywood.
      </p>

      {/* Fondo de vídeo estático con velo profundo de medianoche */}
      <HeroVideoBackground
        videoSrc="/assets/hero-kitchen-loop.mp4"
        posterSrc="/assets/mojo-bowl-ropa-vieja.jpg"
        opacity={0.3}
      />

      {/* Bloque Principal Hero */}
      <div
        ref={contentRef}
        className={`relative z-10 pt-20 sm:pt-24 md:pt-28 pb-12 md:pb-20 ${animContainerClass}`}
      >
        <div className="relative mx-auto max-w-[1600px] w-full px-4 sm:px-6 lg:px-8">
          {/* Disposición Dividida (Split Layout) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Columna Izquierda: Copy Editorial & Llamados a la Acción */}
            <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
              {/* Prueba social y tempo musical */}
              <div
                className={`inline-flex items-center gap-2.5 ${animItemClass}`}
              >
                <Star
                  className="h-4 w-4 shrink-0 fill-amber text-amber"
                  aria-hidden="true"
                />
                <span className="font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.14em] sm:tracking-[0.2em] text-brass">
                  TEMPO ANDANTE (76–108 PPM) · EL ARTE DE DESACELERAR EL RITMO URBANO · PALERMO HOLLYWOOD
                </span>
              </div>

              {/* Titular Editorial Elegante */}
              <div className={`w-full overflow-x-clip ${animItemClass}`}>
                <HoverHighlightText
                  as="h1"
                  text="COCINA DE AUTOR E INSPIRACIÓN ITALIANA EN BOGOTÁ"
                  baseClassName="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[clamp(2.75rem,4.4vw,4.8rem)] font-black uppercase tracking-tight text-linen leading-[0.93] text-left"
                  highlightClassName="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[clamp(2.75rem,4.4vw,4.8rem)] font-black uppercase tracking-tight text-brass leading-[0.93] text-left"
                  strokeColor="#C9A86A"
                  strokeWidth={1.5}
                  spotlightRadius={220}
                  spotlightSoftness={0.84}
                  enableGlow
                />
              </div>

              {/* Subtítulo Breve Sensorial */}
              <p className={`max-w-xl text-balance font-sans text-base sm:text-lg md:text-xl leading-relaxed text-mist font-normal ${animItemClass}`}>
                Técnicas clásicas de alta escuela, pastas artesanales y cocciones al fuego lento fusionadas con ingredientes de estación. Una atmósfera nocturna a media luz con{" "}
                <span className="font-bold underline decoration-amber decoration-[2px] underline-offset-4 text-linen">
                  opciones Sin TACC garantizadas
                </span>{" "}
                y sesiones de jazz acústico en vivo.
              </p>

              {/* Botones con Clara Jerarquía: Primario Sólido (Ver la Carta) y Secundario con Borde Sutil (Reservar Mesa) */}
              <div className={`pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto ${animItemClass}`}>
                {/* 1. Botón Primario Sólido */}
                <MagneticButton
                  href={`#${menuAnchorId}`}
                  onClick={handleScrollToMenu}
                  className="group relative inline-flex min-h-[48px] items-center justify-center gap-3 rounded-none bg-brass px-8 py-3.5 font-sans text-xs sm:text-sm font-bold uppercase tracking-widest text-canvas hover:bg-linen hover:text-canvas transition-colors select-none shadow-xl cursor-pointer border border-brass"
                >
                  <UtensilsCrossed className="h-4 w-4 transition-transform group-hover:rotate-12" aria-hidden="true" />
                  <span>Ver la Carta</span>
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </MagneticButton>

                {/* 2. Botón Secundario con Borde Sutil */}
                <button
                  type="button"
                  onClick={() => onReservationClick ? onReservationClick() : undefined}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-none bg-transparent px-8 py-3.5 font-sans text-xs sm:text-sm font-bold uppercase tracking-widest text-linen hover:border-brass hover:text-brass transition-colors select-none cursor-pointer border border-brass/40 shadow-sm"
                >
                  <CalendarHeart className="h-4 w-4 text-amber" aria-hidden="true" />
                  <span>Reservar Mesa</span>
                </button>
              </div>
            </div>

            {/* Columna Derecha: Protagonista Visual Gastronómico */}
            <div className={`lg:col-span-5 relative w-full ${animItemClass}`}>
              <div className="relative border border-brass/30 bg-surface/80 p-2 sm:p-3 shadow-2xl backdrop-blur-sm group overflow-hidden">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-canvas">
                  <img
                    src="/assets/mojo-bowl-ropa-vieja.jpg"
                    alt="Plato Emblema de Alta Cocina Andante"
                    loading="eager"
                    className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-canvas/90 via-transparent to-transparent opacity-75" />
                </div>

                {/* Badge Flotante Editorial */}
                <div className="absolute bottom-5 left-5 right-5 border border-brass/40 bg-canvas/95 p-4 backdrop-blur-md shadow-xl">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-sans text-[11px] font-bold uppercase tracking-widest text-brass">
                      PASTAS &amp; BRASAS DE AUTOR
                    </span>
                    <span className="font-sans text-[10px] font-black uppercase tracking-wider text-canvas bg-amber px-2 py-0.5">
                      Sin TACC
                    </span>
                  </div>
                  <p className="font-display text-base sm:text-lg font-bold uppercase tracking-tight text-linen leading-snug">
                    Técnica Italiana &amp; Armonía Sensorial
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
