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
      className="relative z-10 w-full h-full min-h-screen flex flex-col justify-center bg-transparent"
    >
      {/* Descriptor editorial para lectores de pantalla y buscadores */}
      <p className="sr-only">
        Andante: Un viaje por el mundo a través del paladar. EL ARTE DE DESACELERAR EL RITMO URBANO. Tempo Andante (76–108 PPM). Cocina de autor, coctelería internacional y sesiones de jazz en vivo en PALERMO HOLLYWOOD.
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
        className={`relative z-10 pt-20 sm:pt-28 md:pt-32 pb-10 sm:pb-16 md:pb-24 ${animContainerClass}`}
      >
        <div className="relative mx-auto max-w-[1600px] w-full px-4 sm:px-6 lg:px-8">
          
          {/* Encabezado Monumental Centrado */}
          <div className="flex flex-col items-center text-center space-y-6 max-w-7xl mx-auto">
            {/* Titular Central con Efecto Spotlight HoverHighlightText */}
            <div className={`w-full max-w-7xl mx-auto flex justify-center overflow-x-clip ${animItemClass}`}>
              <HoverHighlightText
                as="h1"
                text="ANDANTE: UN VIAJE POR EL MUNDO A TRAVÉS DEL PALADAR"
                baseClassName="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[clamp(3.2rem,6.8vw,6.8rem)] font-black uppercase tracking-tight text-linen leading-[0.92] text-center"
                highlightClassName="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[clamp(3.2rem,6.8vw,6.8rem)] font-black uppercase tracking-tight text-brass leading-[0.92] text-center"
                strokeColor="#C9A86A"
                strokeWidth={1.5}
                spotlightRadius={220}
                spotlightSoftness={0.84}
                enableGlow
              />
            </div>

            {/* Subtítulo Narrativo Editorial */}
            <p className={`max-w-4xl text-balance font-sans text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-mist text-center font-normal ${animItemClass}`}>
              Cocina de autor, coctelería internacional y sesiones de jazz en vivo en Palermo Hollywood. Técnicas de alta escuela fusionadas con sabores de Asia, Europa y Latinoamérica con{" "}
              <span className="font-bold underline decoration-amber decoration-[2px] underline-offset-4 text-linen">
                opciones Sin TACC garantizadas
              </span>.
            </p>

            {/* Botones de Llamada a la Acción: RESERVAR MESA y VER CARTA */}
            <div className={`pt-6 sm:pt-8 flex flex-col items-center justify-center gap-4 sm:flex-row ${animItemClass}`}>
              <button
                type="button"
                onClick={() => onReservationClick ? onReservationClick() : undefined}
                className="inline-flex items-center justify-center gap-2.5 rounded-none bg-brass px-9 py-4 font-sans text-sm sm:text-base font-bold uppercase tracking-wider text-linen hover:bg-brass/90 transition-colors select-none shadow-lg cursor-pointer border border-brass"
              >
                <CalendarHeart className="h-4 w-4" aria-hidden="true" />
                <span>RESERVAR MESA</span>
              </button>

              <MagneticButton
                href={`#${menuAnchorId}`}
                onClick={handleScrollToMenu}
                className="group relative inline-flex items-center justify-center gap-3 rounded-none bg-surface px-8 py-4 font-sans text-sm sm:text-base font-bold uppercase tracking-wider text-linen hover:border-brass hover:text-brass transition-colors cursor-pointer select-none border border-brass/35 shadow-md"
              >
                <UtensilsCrossed className="h-4 w-4 transition-transform group-hover:rotate-12" aria-hidden="true" />
                <span>VER CARTA</span>
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </MagneticButton>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default HeroSection;
