"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { SquareArrowOutUpRight } from "lucide-react";

function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}

// Universal Link component for seamless Next.js and Vite/React compatibility
interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
}

const Link = ({ href, children, ...props }: LinkProps) => {
  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
};

export type CardStackItem = {
  id: string | number;
  title: string;
  description?: string;
  imageSrc?: string;
  href?: string;
  ctaLabel?: string;
  tag?: string;
};

export type CardStackProps<T extends CardStackItem> = {
  items: T[];

  /** Selected index on mount */
  initialIndex?: number;

  /** How many cards are visible around the active (odd recommended) */
  maxVisible?: number;

  /** Card sizing */
  cardWidth?: number;
  cardHeight?: number;

  /** How much cards overlap each other (0..0.8). Higher = more overlap */
  overlap?: number;

  /** Total fan angle (deg). Higher = wider arc */
  spreadDeg?: number;

  /** 3D / depth feel */
  perspectivePx?: number;
  depthPx?: number;
  tiltXDeg?: number;

  /** Active emphasis */
  activeLiftPx?: number;
  activeScale?: number;
  inactiveScale?: number;

  /** Motion */
  springStiffness?: number;
  springDamping?: number;

  /** Behavior */
  loop?: boolean;
  autoAdvance?: boolean;
  intervalMs?: number;
  pauseOnHover?: boolean;

  /** UI */
  showDots?: boolean;
  className?: string;

  /** Hooks */
  onChangeIndex?: (index: number, item: T) => void;

  /** Custom renderer (optional) */
  renderCard?: (item: T, state: { active: boolean }) => React.ReactNode;
};

function wrapIndex(n: number, len: number) {
  if (len <= 0) return 0;
  return ((n % len) + len) % len;
}

/** Minimal signed offset from active index to i, with wrapping (for loop behavior). */
function signedOffset(i: number, active: number, len: number, loop: boolean) {
  const raw = i - active;
  if (!loop || len <= 1) return raw;

  // consider wrapped alternative
  const alt = raw > 0 ? raw - len : raw + len;
  return Math.abs(alt) < Math.abs(raw) ? alt : raw;
}

export function CardStack<T extends CardStackItem>({
  items,
  initialIndex = 0,
  maxVisible = 7,

  cardWidth = 520,
  cardHeight = 320,

  overlap = 0.48,
  spreadDeg = 48,

  perspectivePx = 1100,
  depthPx = 140,
  tiltXDeg = 12,

  activeLiftPx = 22,
  activeScale = 1.03,
  inactiveScale = 0.94,

  springStiffness = 280,
  springDamping = 28,

  loop = true,
  autoAdvance = false,
  intervalMs = 2800,
  pauseOnHover = true,

  showDots = true,
  className,

  onChangeIndex,
  renderCard,
}: CardStackProps<T>) {
  const reduceMotion = useReducedMotion();
  const len = items.length;

  /**
   * Alto del escenario, medido a partir de la tarjeta más alta.
   *
   * Las tarjetas están posicionadas en absoluto, así que no empujan al padre:
   * si el escenario no mide, cualquier reseña larga se cortaría. En vez de
   * fijar un alto y recortar el texto, se observa cada tarjeta y el escenario
   * se ajusta a la más alta. `cardHeight` ya no limita la tarjeta: sólo sirve
   * de alto inicial mientras no hay medida, para que no haya un salto de
   * layout en el primer pintado.
   */
  const [stackHeight, setStackHeight] = React.useState<number | null>(null);
  const cardsRef = React.useRef(new Map<string | number, HTMLElement>());
  const observerRef = React.useRef<ResizeObserver | null>(null);

  const measure = React.useCallback(() => {
    let tallest = 0;
    cardsRef.current.forEach((el) => {
      // offsetHeight ignora el `scale` del transform, que es justo lo que
      // queremos: el alto de maquetación, no el visual de la tarjeta activa.
      if (el.offsetHeight > tallest) tallest = el.offsetHeight;
    });
    if (tallest <= 0) return;

    // Holgura. Las tarjetas se anclan a `bottom-0` y el escenario recorta, así
    // que ceñirlo al alto exacto de la más alta cortaría por arriba la tarjeta
    // activa, que se eleva `activeLiftPx` y escala `activeScale`; y por abajo
    // las del fondo, que bajan 10px por posición de distancia.
    const lift = activeLiftPx + Math.ceil(tallest * Math.max(0, activeScale - 1));
    const drop = Math.max(0, Math.floor(maxVisible / 2)) * 10;
    setStackHeight(tallest + lift + drop + 8);
  }, [activeLiftPx, activeScale, maxVisible]);

  const registerCard = React.useCallback(
    (id: string | number, el: HTMLElement | null) => {
      if (el) {
        cardsRef.current.set(id, el);
        observerRef.current?.observe(el);
      } else {
        const previous = cardsRef.current.get(id);
        if (previous) observerRef.current?.unobserve(previous);
        cardsRef.current.delete(id);
      }
    },
    [],
  );

  React.useEffect(() => {
    if (typeof ResizeObserver === "undefined") return undefined;
    const observer = new ResizeObserver(() => measure());
    observerRef.current = observer;
    cardsRef.current.forEach((el) => observer.observe(el));
    measure();
    return () => {
      observer.disconnect();
      observerRef.current = null;
    };
  }, [measure]);

  // Las fuentes de display cargan después del primer pintado y cambian el
  // alto del texto; sin esto el escenario se queda con la medida previa.
  React.useEffect(() => {
    if (typeof document === "undefined" || !document.fonts) return;
    void document.fonts.ready.then(() => measure());
  }, [measure]);

  const [active, setActive] = React.useState(() =>
    wrapIndex(initialIndex, len),
  );
  const [hovering, setHovering] = React.useState(false);

  // keep active in bounds if items change
  React.useEffect(() => {
    setActive((a) => wrapIndex(a, len));
  }, [len]);

  React.useEffect(() => {
    if (!len) return;
    const activeItem = items[active];
    if (activeItem) {
      onChangeIndex?.(active, activeItem);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const maxOffset = Math.max(0, Math.floor(maxVisible / 2));

  const cardSpacing = Math.max(10, Math.round(cardWidth * (1 - overlap)));
  const stepDeg = maxOffset > 0 ? spreadDeg / maxOffset : 0;

  const canGoPrev = loop || active > 0;
  const canGoNext = loop || active < len - 1;

  const prev = React.useCallback(() => {
    if (!len) return;
    if (!canGoPrev) return;
    setActive((a) => wrapIndex(a - 1, len));
  }, [canGoPrev, len]);

  const next = React.useCallback(() => {
    if (!len) return;
    if (!canGoNext) return;
    setActive((a) => wrapIndex(a + 1, len));
  }, [canGoNext, len]);

  // keyboard navigation (when container focused)
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  };

  // autoplay
  React.useEffect(() => {
    if (!autoAdvance) return;
    if (reduceMotion) return;
    if (!len) return;
    if (pauseOnHover && hovering) return;

    const id = window.setInterval(
      () => {
        if (loop || active < len - 1) next();
      },
      Math.max(700, intervalMs),
    );

    return () => window.clearInterval(id);
  }, [
    autoAdvance,
    intervalMs,
    hovering,
    pauseOnHover,
    reduceMotion,
    len,
    loop,
    active,
    next,
  ]);

  if (!len) return null;

  const activeItem = items[active];

  return (
    <div
      className={cn("w-full", className)}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Stage */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: stackHeight ?? Math.max(380, cardHeight + 80) }}
        tabIndex={0}
        onKeyDown={onKeyDown}
      >

        <div
          className="absolute inset-0 flex items-end justify-center"
          style={{
            perspective: `${perspectivePx}px`,
          }}
        >
          <AnimatePresence initial={false}>
            {items.map((item, i) => {
              const off = signedOffset(i, active, len, loop);
              const abs = Math.abs(off);
              const visible = abs <= maxOffset;

              // hide far-away cards cleanly
              if (!visible) return null;

              // fan geometry
              const rotateZ = off * stepDeg;
              const x = off * cardSpacing;
              const y = abs * 10; // subtle arc-down feel
              const z = -abs * depthPx;

              const isActive = off === 0;

              const scale = isActive ? activeScale : inactiveScale;
              const lift = isActive ? -activeLiftPx : 0;

              const rotateX = isActive ? 0 : tiltXDeg;

              const zIndex = 100 - abs;

              // drag only on the active card
              const dragProps = isActive
                ? {
                    drag: "x" as const,
                    dragConstraints: { left: 0, right: 0 },
                    dragElastic: 0.18,
                    onDragEnd: (
                      _e: PointerEvent,
                      info: { offset: { x: number }; velocity: { x: number } },
                    ) => {
                      if (reduceMotion) return;
                      const travel = info.offset.x;
                      const v = info.velocity.x;
                      const threshold = Math.min(160, cardWidth * 0.22);

                      // swipe logic
                      if (travel > threshold || v > 650) prev();
                      else if (travel < -threshold || v < -650) next();
                    },
                  }
                : {};

              // Sin redondeo, sin borde y sin sombra: la profundidad del mazo
              // la dan la perspectiva, la escala y el solapamiento, no una
              // elevación pintada. La tarjeta activa se distingue por su
              // escala y por estar delante, no por un anillo de color.
              return (
                <motion.div
                  key={item.id}
                  ref={(el) => registerCard(item.id, el)}
                  className={cn(
                    "absolute bottom-0",
                    "will-change-transform select-none",
                    isActive ? "cursor-grab active:cursor-grabbing" : "cursor-pointer",
                  )}
                  style={{
                    width: cardWidth,
                    maxWidth: "calc(100vw - 32px)",
                    zIndex,
                    transformStyle: "preserve-3d",
                  }}
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: y + 40,
                          x,
                          rotateZ,
                          rotateX,
                          scale,
                        }
                  }
                  animate={{
                    opacity: 1,
                    x,
                    y: y + lift,
                    rotateZ,
                    rotateX,
                    scale,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: springStiffness,
                    damping: springDamping,
                  }}
                  onClick={() => setActive(i)}
                  {...dragProps}
                >
                  <div
                    className="h-full w-full"
                    style={{
                      transform: `translateZ(${z}px)`,
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {renderCard ? (
                      renderCard(item, { active: isActive })
                    ) : (
                      <DefaultFanCard item={item} active={isActive} />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Dots navigation centered at bottom */}
      {showDots ? (
        <div className="mt-6 flex items-center justify-center gap-3">
          <div className="flex items-center gap-2">
            {items.map((it, idx) => {
              const on = idx === active;
              return (
                // El punto sigue midiendo 10px, pero el botón que lo contiene
                // ocupa los 44px de área táctil. Antes se pulsaba un objetivo
                // de 10x10 con el dedo.
                <button
                  key={it.id}
                  onClick={() => setActive(idx)}
                  className="grid h-11 w-11 place-items-center cursor-pointer"
                  aria-label={`Go to card ${idx + 1}: ${it.title}`}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "block h-2.5 w-2.5 rounded-full transition-all duration-200",
                      on
                        ? "bg-brass scale-125 shadow-sm"
                        : "bg-linen/25 hover:bg-linen/60",
                    )}
                  />
                </button>
              );
            })}
          </div>
          {activeItem?.href ? (
            <Link
              href={activeItem.href}
              target="_blank"
              rel="noreferrer"
              className="grid h-11 w-11 shrink-0 place-items-center text-brass hover:text-amber transition-colors"
              aria-label="Open review link"
            >
              <SquareArrowOutUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function DefaultFanCard({ item }: { item: CardStackItem; active: boolean }) {
  return (
    <div className="relative h-full w-full bg-surface border border-brass/25">
      {/* image */}
      <div className="absolute inset-0">
        {item.imageSrc ? (
          <img
            src={item.imageSrc}
            alt={item.title}
            className="h-full w-full object-cover"
            draggable={false}
            loading="eager"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-surface text-sm text-mist">
            No image
          </div>
        )}
      </div>

      {/* subtle gradient overlay at bottom for text readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface via-surface/80 to-transparent" />

      {/* content */}
      <div className="relative z-10 flex h-full flex-col justify-end p-5">
        <div className="truncate text-lg font-bold text-linen font-sans">
          {item.title}
        </div>
        {item.description ? (
          <div className="mt-1 line-clamp-2 text-sm text-mist font-sans">
            {item.description}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default CardStack;
