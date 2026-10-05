import React, { useEffect, useRef, useState } from "react";
import { UtensilsCrossed, CalendarHeart, Star, ArrowRight } from "lucide-react";
import { MagneticButton } from "./MagneticButton";
import { HoverHighlightText } from "@/components/ui/hover-highlight-text";
import { HeroVideoBackground } from "./HeroVideoBackground";
import { useReducedMotion } from "@/lib/useReducedMotion";

export interface HeroSectionProps {
  onOrderClick?: () => void;
  menuAnchorId?: string;
  cateringHref?: string;
  /**
   * Triggers the cinematic entrance animation for Hero headline and CTAs.
   */
  shouldAnimateIn?: boolean;
}

export function HeroSection({
  onOrderClick,
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
    /*
      Sin select-none en el contenedor: colgado en el <section> impedía
      copiar el titular, el subtítulo y el "4.7 Stars". El bloqueo de
      selección sólo tiene sentido en los controles, y esos lo llevan por
      su cuenta.
    */
    <section
      ref={sectionRef}
      id="top"
      aria-label="Andante Restaurante Bar - Palermo Hollywood"
      className="relative z-10 w-full h-full min-h-dvh flex flex-col justify-center bg-transparent"
    >
      {/* Descriptor editorial para lectores de pantalla y buscadores */}
      <p className="sr-only">
        Bistró contemporáneo, cocina de mercado estacional, opciones Sin TACC garantizadas y coctelería con jazz en vivo en Palermo Hollywood.
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
          
          {/* Encabezado Monumental Centrado */}
          <div className="flex flex-col items-center text-center space-y-6 max-w-7xl mx-auto">
            {/* Prueba social y tempo musical */}
            <div
              className={`inline-flex items-center gap-2.5 ${animItemClass}`}
            >
              <Star
                className="h-4 w-4 shrink-0 fill-amber text-amber"
                aria-hidden="true"
              />
              <span className="font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.14em] sm:tracking-[0.2em] text-brass">
                TEMPO 76–108 PPM · PALERMO HOLLYWOOD · ARÉVALO 1677
              </span>
            </div>

            {/* Titular Central con Efecto Spotlight HoverHighlightText */}
            <div className={`w-full max-w-7xl mx-auto flex justify-center overflow-x-clip ${animItemClass}`}>
              <HoverHighlightText
                as="h1"
                text="EL ARTE DE DESACELERAR EL RITMO URBANO"
                baseClassName="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[clamp(3.8rem,8.5vw,8.5rem)] font-black uppercase tracking-tight text-linen leading-[0.88] text-center"
                highlightClassName="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[clamp(3.8rem,8.5vw,8.5rem)] font-black uppercase tracking-tight text-brass leading-[0.88] text-center"
                strokeColor="#C9A86A"
                strokeWidth={1.5}
                spotlightRadius={220}
                spotlightSoftness={0.84}
                enableGlow
              />
            </div>

            {/* Subtítulo Narrativo Editorial */}
            <p className={`max-w-4xl text-balance font-sans text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-mist text-center font-normal ${animItemClass}`}>
              Bistró contemporáneo y coctelería nocturna. Dualidad armónica: cafetería de especialidad y cocina de mercado de día; alta gastronomía estacional con{" "}
              <span className="font-bold underline decoration-amber decoration-[2px] underline-offset-4 text-linen">
                opciones Sin TACC garantizadas
              </span>{" "}
              y ciclos de jazz en vivo al caer la noche.
            </p>

            {/* Botones de Llamada a la Acción: EXPLORAR CARTA y RESERVAS */}
            <div className={`pt-6 sm:pt-8 flex flex-col items-center justify-center gap-4 sm:flex-row ${animItemClass}`}>
              <MagneticButton
                href={`#${menuAnchorId}`}
                onClick={handleScrollToMenu}
                className="group relative inline-flex items-center justify-center gap-3 rounded-none bg-brass px-9 py-4 font-sans text-sm sm:text-base font-bold uppercase tracking-wider text-canvas hover:bg-amber hover:text-linen transition-colors cursor-pointer select-none border border-brass shadow-lg"
              >
                <UtensilsCrossed className="h-4 w-4 transition-transform group-hover:rotate-12" aria-hidden="true" />
                <span>EXPLORAR CARTA</span>
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </MagneticButton>

              <a
                href={cateringHref}
                className="inline-flex items-center justify-center gap-2.5 rounded-none bg-surface border border-brass/35 px-8 py-4 font-sans text-sm sm:text-base font-bold uppercase tracking-wider text-linen hover:border-brass hover:text-brass transition-colors select-none shadow-md"
              >
                <CalendarHeart className="h-4 w-4 text-amber" aria-hidden="true" />
                <span>RESERVAR MESA · JAZZ</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default HeroSection;
