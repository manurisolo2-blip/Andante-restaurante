import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export interface JellyWaveTransitionProps {
  /** Color de la sección superior (HEX o clase CSS) */
  topColor: string;
  /** Color de la sección inferior (HEX o clase CSS) */
  bottomColor: string;
  /** Dirección de la onda: "down" (el color superior penetra en el inferior) o "up" (el color inferior asciende) */
  direction?: "down" | "up";
  /** Clases CSS adicionales para el contenedor */
  className?: string;
}

// Trazados SVG con coordenadas que se extienden más allá de los bordes (-8 a 1544 horizontal, -4 a 224 vertical)
// para evitar cualquier línea o artefacto por subpixel rendering o antialiasing del navegador.
const DOWN_PATHS = {
  a: "M 1544 -4 L -8 -4 L -8 135 C 250 55, 450 180, 768 120 C 1080 60, 1320 170, 1544 100 Z",
  b: "M 1544 -4 L -8 -4 L -8 115 C 250 85, 450 150, 768 135 C 1080 85, 1320 145, 1544 120 Z",
  c: "M 1544 -4 L -8 -4 L -8 145 C 250 35, 450 195, 768 105 C 1080 45, 1320 185, 1544 85 Z",
};

const UP_PATHS = {
  a: "M 1544 224 L -8 224 L -8 85 C 250 165, 450 40, 768 100 C 1080 160, 1320 50, 1544 120 Z",
  b: "M 1544 224 L -8 224 L -8 105 C 250 135, 450 70, 768 85 C 1080 135, 1320 75, 1544 100 Z",
  c: "M 1544 224 L -8 224 L -8 75 C 250 185, 450 25, 768 115 C 1080 175, 1320 35, 1544 135 Z",
};

export const JellyWaveTransition: React.FC<JellyWaveTransitionProps> = ({
  topColor,
  bottomColor,
  direction = "down",
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const isDown = direction === "down";
  const paths = isDown ? DOWN_PATHS : UP_PATHS;

  // Si es "down", el fondo del contenedor es bottomColor y la onda rellena la parte superior con topColor.
  // Si es "up", el fondo del contenedor es topColor y la onda rellena la parte inferior con bottomColor.
  const containerBg = isDown ? bottomColor : topColor;
  const waveFill = isDown ? topColor : bottomColor;

  // Seguimiento reactivo del scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Animación física de bajada o subida al hacer scroll:
  // Si direction === "down", la onda baja de -32px a +32px
  // Si direction === "up", la onda sube de +32px a -32px
  const yRaw = useTransform(
    scrollYProgress,
    [0, 1],
    isDown ? [-32, 32] : [32, -32]
  );
  const y = useSpring(yRaw, { stiffness: 130, damping: 26, mass: 0.75 });

  // Expansión / oleaje dinámico de la onda al entrar en pantalla
  const scaleYRaw = useTransform(scrollYProgress, [0, 0.5, 1], [0.88, 1.25, 0.9]);
  const scaleY = useSpring(scaleYRaw, { stiffness: 130, damping: 26, mass: 0.75 });

  // Desplazamiento horizontal de marea
  const xRaw = useTransform(
    scrollYProgress,
    [0, 1],
    isDown ? [-20, 20] : [20, -20]
  );
  const x = useSpring(xRaw, { stiffness: 130, damping: 26, mass: 0.75 });

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`relative w-full overflow-hidden select-none pointer-events-none leading-none -my-px z-20 ${className}`}
      style={{ backgroundColor: containerBg }}
    >
      {/* Contenedor animado al scroll con física de subida/bajada y oleaje elástico */}
      <motion.div
        style={{
          y,
          scaleY,
          x,
          transformOrigin: isDown ? "top center" : "bottom center",
        }}
        className="w-full h-full will-change-transform"
      >
        <svg
          viewBox="0 0 1536 220"
          preserveAspectRatio="none"
          className="block w-full h-16 sm:h-24 md:h-32 lg:h-36 pointer-events-none"
        >
          {/* Rectángulos de sangrado (Bleed rects) para garantizar cobertura total sin hendiduras */}
          {isDown ? (
            <rect x="-64" y="-80" width="1664" height="85" fill={waveFill} />
          ) : (
            <rect x="-64" y="215" width="1664" height="85" fill={waveFill} />
          )}

          <motion.path
            d={paths.a}
            animate={{
              d: [paths.a, paths.b, paths.c, paths.a],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            fill={waveFill}
          />
        </svg>
      </motion.div>
    </div>
  );
};

export default JellyWaveTransition;
