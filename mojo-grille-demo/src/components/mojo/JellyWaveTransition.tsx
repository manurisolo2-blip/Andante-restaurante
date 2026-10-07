import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

export interface JellyWaveTransitionProps {
  /** Color de la sección superior (HEX o clase CSS) */
  topColor: string;
  /** Color de la sección inferior (HEX o clase CSS) */
  bottomColor: string;
  /** Dirección de la onda: "down" (el color superior penetra en el inferior) o "up" (el color inferior asciende) */
  direction?: "down" | "up";
  /** Activar stickers flotantes artesanales de guarnición (cilantro, naranja agria) */
  showGarnish?: boolean;
  /** Clases CSS adicionales para el contenedor */
  className?: string;
}

// Trazados SVG con coordenadas que se extienden más allá de los bordes (-8 a 1544 horizontal, -4 a 224 vertical)
// para evitar cualquier línea o artefacto por subpixel rendering o antialiasing del navegador.
//
// Nota: la cobertura del hueco que abre la traslación NO se resuelve dentro del
// SVG. El elemento raíz <svg> recorta a su viewBox (overflow: hidden de la hoja
// de estilos del navegador), así que un <rect> de sangrado fuera del viewBox no
// se dibuja. Se usa una banda DOM (BLEED_PX) que viaja con el wrapper animado.
const DOWN_PATHS = {
  a: "M 1544 -4 L -8 -4 L -8 135 C 250 55, 450 180, 768 120 C 1080 60, 1320 170, 1544 100 Z",
  crest: "M -8 135 C 250 55, 450 180, 768 120 C 1080 60, 1320 170, 1544 100",
};

/**
 * Alto de la banda de sangrado, en px. Debe superar con holgura el
 * desplazamiento vertical máximo del wrapper (±32px) en cualquier breakpoint.
 */
const BLEED_PX = 240;

/**
 * Sobreancho del wrapper animado a cada lado, en px. El wrapper también se
 * desplaza en horizontal (±20px), así que tanto el SVG como la banda deben
 * sobresalir del contenedor más que ese recorrido; si midieran justo el 100%,
 * el desplazamiento destaparía el fondo del contenedor por un costado. El
 * `overflow-hidden` del contenedor recorta el sobrante.
 */
const BLEED_X_PX = 64;

const UP_PATHS = {
  a: "M 1544 224 L -8 224 L -8 85 C 250 165, 450 40, 768 100 C 1080 160, 1320 50, 1544 120 Z",
  crest: "M -8 85 C 250 165, 450 40, 768 100 C 1080 160, 1320 50, 1544 120",
};

export const JellyWaveTransition: React.FC<JellyWaveTransitionProps> = ({
  topColor,
  bottomColor,
  direction = "down",
  showGarnish = false,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

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

  // Parallax reactivo para los stickers de guarnición
  const stickerYRaw = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    isDown ? [-22, 16, -12] : [22, -16, 12]
  );
  const stickerY = useSpring(stickerYRaw, { stiffness: 140, damping: 24 });

  const stickerRotateRaw = useTransform(
    scrollYProgress,
    [0, 1],
    isDown ? [-8, 14] : [8, -14]
  );
  const stickerRotate = useSpring(stickerRotateRaw, { stiffness: 140, damping: 24 });

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
          width: `calc(100% + ${BLEED_X_PX * 2}px)`,
          marginLeft: -BLEED_X_PX,
          transformOrigin: isDown ? "top center" : "bottom center",
          ...(reducedMotion ? {} : { y, scaleY, x }),
        }}
        className="relative h-full will-change-transform"
      >
        {/*
          Banda de sangrado: vive DENTRO del wrapper animado, así se traslada
          junto al SVG y tapa el fondo del contenedor que la traslación deja al
          descubierto (una línea del color de la sección destino). Se extiende
          hacia el borde por el que se puede abrir la costura: arriba cuando la
          onda baja, abajo cuando sube.
        */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 ${isDown ? "bottom-full" : "top-full"}`}
          style={{ height: BLEED_PX, backgroundColor: waveFill }}
        />

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

          {/*
            La ondulación se hace con transformaciones, no morfeando `d`.

            Antes eran fotogramas clave sobre el atributo `d`. Framer no
            interpola de forma fiable entre esas cadenas de path: en cada
            fotograma escribía d="undefined" y el navegador lo rechazaba con
            "Expected moveto path command", seis errores de consola por carga
            y un reparseo del path en cada frame.

            Un escalado vertical mínimo alrededor del borde inferior, desfasado
            del balanceo horizontal, da la misma sensación de gelatina y sale
            gratis: el compositor lo resuelve sin tocar la geometría.
          */}
          <motion.path
            d={paths.a}
            style={{ transformOrigin: "50% 100%" }}
            {...(reducedMotion
              ? {}
              : {
                  animate: { scaleY: [1, 1.07, 0.95, 1], x: [0, -14, 10, 0] },
                  transition: {
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut" as const,
                  },
                })}
            fill={waveFill}
          />

          {/* Sutil realce de latón cálido / oro atenuado sobre la cresta de la onda */}
          <motion.path
            d={paths.crest}
            fill="none"
            stroke="#C9A86A"
            strokeOpacity={0.25}
            strokeWidth={1.5}
            vectorEffect="non-scaling-stroke"
            style={{ transformOrigin: "50% 100%" }}
            {...(reducedMotion
              ? {}
              : {
                  animate: { scaleY: [1, 1.07, 0.95, 1], x: [0, -14, 10, 0] },
                  transition: {
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut" as const,
                  },
                })}
          />
        </svg>
      </motion.div>
    </div>
  );
};

export default JellyWaveTransition;
