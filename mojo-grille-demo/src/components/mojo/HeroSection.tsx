import React, { useEffect, useRef, useState } from "react";
import { UtensilsCrossed, CalendarHeart, ArrowRight } from "lucide-react";
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
      className="relative z-10 w-full min-h-[92dvh] flex flex-col justify-center bg-transparent border-b border-brass/20 overflow-hidden"
    >
      {/* Descriptor editorial para lectores de pantalla y buscadores */}
      <p className="sr-only">
        Andante: Un viaje por el mundo a través del paladar. EL ARTE DE DESACELERAR EL RITMO URBANO. Tempo Andante (76–108 PPM). Cocina de autor, coctelería internacional y sesiones de jazz en vivo en PALERMO HOLLYWOOD.
      </p>

      {/* Fondo de vídeo estático con velo profundo de medianoche */}
      <HeroVideoBackground
        videoSrc="/assets/hero-kitchen-loop.mp4"
        posterSrc="/assets/mojo-bowl-ropa-vieja.jpg"
        opacity={0.25}
      />

      {/* Bloque Principal Hero: Disposición Asimétrica Editorial */}
      <div
        ref={contentRef}
        className={`relative z-10 pt-20 sm:pt-28 md:pt-36 pb-12 sm:pb-20 md:pb-28 ${animContainerClass}`}
      >
        <div className="relative mx-auto max-w-[1560px] w-full px-5 sm:px-8 lg:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            {/* Columna Principal: Tipografía Monumental en Romana Recta */}
            <div className="lg:col-span-8 flex flex-col items-start text-left space-y-6">
              
              {/* Badge Editorial de Tempo & Ubicación */}
              <div className={`inline-flex items-center gap-3 border border-brass/30 bg-surface/85 px-4 py-2 backdrop-blur-md ${animItemClass}`}>
                <span className="h-1.5 w-1.5 rounded-full bg-amber animate-pulse" aria-hidden="true" />
                <span className="font-sans text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-linen">
                  TEMPO ANDANTE (76–108 PPM) · ARÉVALO 1677, PALERMO HOLLYWOOD
                </span>
              </div>

              {/* Titular Display Asimétrico en Color Sólido */}
              <h1 className={`font-display text-4xl sm:text-6xl md:text-7xl lg:text-[clamp(3.4rem,6.2vw,6.5rem)] font-bold tracking-tight text-linen leading-[0.94] uppercase ${animItemClass}`}>
                EL ARTE DE <span className="text-brass">DESACELERAR</span> EL RITMO URBANO
              </h1>

              {/* Subtítulo Narrativo Sensorial */}
              <p className={`max-w-2xl font-sans text-base sm:text-lg md:text-xl text-mist leading-relaxed font-normal ${animItemClass}`}>
                Bistró contemporáneo y coctelería nocturna en Palermo Hollywood. Cocina de mercado de día, alta gastronomía estacional con{" "}
                <span className="text-linen font-medium underline decoration-amber decoration-1 underline-offset-4">
                  opciones Sin TACC certificadas
                </span>{" "}
                y sesiones acústicas de jazz en vivo al caer la noche.
              </p>

              {/* Llamadas a la Acción: Primaria en Latón, Secundaria en Superficie Marina */}
              <div className={`pt-4 sm:pt-6 flex flex-row flex-wrap items-center gap-3 sm:gap-4 ${animItemClass}`}>
                <button
                  type="button"
                  onClick={() => onReservationClick ? onReservationClick() : undefined}
                  className="inline-flex min-h-[50px] items-center justify-center gap-2.5 bg-brass px-7 sm:px-9 py-3.5 font-sans text-xs sm:text-sm font-bold uppercase tracking-wider text-canvas hover:bg-linen hover:text-canvas transition-colors select-none shadow-lg cursor-pointer border border-brass"
                >
                  <CalendarHeart className="h-4 w-4" aria-hidden="true" />
                  <span>RESERVAR MESA</span>
                </button>

                <MagneticButton
                  href={`#${menuAnchorId}`}
                  onClick={handleScrollToMenu}
                  className="group relative inline-flex min-h-[50px] items-center justify-center gap-2.5 bg-surface/90 px-6 sm:px-8 py-3.5 font-sans text-xs sm:text-sm font-bold uppercase tracking-wider text-linen hover:border-brass hover:text-brass transition-colors cursor-pointer select-none border border-brass/30 shadow-md backdrop-blur-md"
                >
                  <UtensilsCrossed className="h-4 w-4 text-amber transition-transform group-hover:rotate-12" aria-hidden="true" />
                  <span>CARTA &amp; MARIDAJES</span>
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </MagneticButton>
              </div>
            </div>

            {/* Columna Lateral: Ficha de Sala & Compás (Atmósfera Dark Luxury) */}
            <div className={`lg:col-span-4 border-l border-brass/20 pl-6 sm:pl-8 py-2 hidden lg:flex flex-col justify-between space-y-6 ${animItemClass}`}>
              <div className="space-y-3">
                <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-brass block">
                  HORARIOS DE SALA
                </span>
                <p className="font-sans text-xs text-mist leading-relaxed">
                  Mediodía: Martes a Domingo · 12:00 a 16:00 hs<br />
                  Noche &amp; Coctelería: Martes a Sábado · 19:30 a 02:00 hs
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-brass/15">
                <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-amber block">
                  CICLOS EN VIVO
                </span>
                <p className="font-sans text-xs text-linen/90 leading-relaxed">
                  Jazz en Salón Azul y Cava Histórica: Martes &amp; Jueves 21:00 hs con formación de trío acústico.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default HeroSection;
