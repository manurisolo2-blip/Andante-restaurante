import React, { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

export interface PreloaderProps {
  /**
   * Callback invocado inmediatamente al terminar de subir la cortina,
   * permitiendo desbloquear el scroll inercial e iniciar la entrada del Hero.
   */
  onComplete?: () => void;
  /**
   * Duración en segundos para la cuenta de 0% a 100%.
   * Por defecto 1.8 segundos según especificación editorial.
   */
  duration?: number;
}

/** Margen sobre la duración nominal tras el cual la cortina se retira sola. */
const FAILSAFE_GRACE_MS = 2500;

export function Preloader({ onComplete, duration = 1.8 }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const reducedMotion = useReducedMotion();

  // El callback vive en una ref para que su identidad (una arrow inline en el
  // padre) no vuelva a disparar el efecto y mate la animación en pleno vuelo.
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // El teardown corre una sola vez, venga de la animación, del failsafe o de
  // que la persona decida saltearlo.
  const finishedRef = useRef(false);
  const restoreOverflowRef = useRef<(() => void) | null>(null);

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;

    restoreOverflowRef.current?.();
    restoreOverflowRef.current = null;

    setIsVisible(false);
    onCompleteRef.current?.();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    // Bloquear scroll nativo e inercial de Lenis durante la precarga,
    // recordando el valor previo en vez de asumir uno.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const lenis = (window as unknown as { lenis?: { stop: () => void; start: () => void } })
      .lenis;
    lenis?.stop();

    restoreOverflowRef.current = () => {
      document.body.style.overflow = previousOverflow;
      lenis?.start();
    };

    // Sin animación vestibular: se muestra el 100% y se retira de inmediato.
    if (reducedMotion) {
      if (counterRef.current) counterRef.current.textContent = "100%";
      const raf = requestAnimationFrame(finish);
      return () => cancelAnimationFrame(raf);
    }

    const counter = { val: 0 };
    const tl = gsap.timeline();

    // 1. Conteo dinámico de 0% a 100%
    tl.to(counter, {
      val: 100,
      duration,
      ease: "power2.inOut",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = `${Math.round(counter.val)}%`;
        }
      },
    });

    // 2. Breve micro-pausa para percibir el 100% completo
    tl.to({}, { duration: 0.05 });

    // 3. Cortina de salida deslizándose hacia arriba
    if (containerRef.current) {
      tl.to(containerRef.current, {
        yPercent: -100,
        duration: 0.9,
        ease: "power4.inOut",
        onComplete: finish,
      });
    } else {
      tl.call(finish);
    }

    // Failsafe: si el reloj de animación nunca avanza (pestaña en segundo
    // plano, rAF congelado, GSAP caído), la cortina se retira igual en vez de
    // dejar el sitio invisible para siempre.
    const failsafe = setTimeout(
      finish,
      (duration + 0.95) * 1000 + FAILSAFE_GRACE_MS,
    );

    return () => {
      clearTimeout(failsafe);
      tl.kill();
      restoreOverflowRef.current?.();
      restoreOverflowRef.current = null;
    };
  }, [duration, reducedMotion, finish]);

  // Salida manual: nadie queda atrapado detrás de la cortina.
  useEffect(() => {
    if (!isVisible || typeof window === "undefined") return undefined;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") finish();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isVisible, finish]);

  if (!isVisible) {
    return null;
  }

  return (
    <aside
      ref={containerRef}
      role="status"
      aria-live="polite"
      aria-label="Cargando experiencia sensorial de Andante Restaurante Bar"
      data-loaded={false}
      onClick={finish}
      className="fixed inset-0 z-[9999] bg-canvas text-linen flex items-center justify-center p-6 md:p-12 overflow-hidden select-none will-change-transform shadow-none cursor-pointer"
    >
      {/* Centro Monumental: Contador Display + Titular Editorial Andante */}
      <div className="text-center flex flex-col items-center justify-center">
        <div className="overflow-hidden">
          <span
            ref={counterRef}
            className="block font-display text-[22vw] sm:text-[20vw] md:text-[18vw] font-bold leading-[0.8] tracking-tight tabular-nums text-linen select-none"
          >
            0%
          </span>
        </div>
        <p className="mt-6 sm:mt-8 font-sans text-sm md:text-base font-bold uppercase tracking-[0.25em] text-brass">
          AFINANDO EL TEMPO · 76–108 PPM · PALERMO HOLLYWOOD
        </p>
        <p className="mt-4 font-sans text-xs uppercase tracking-widest text-mist">
          Tocá o presioná Esc para ingresar
        </p>
      </div>
    </aside>
  );
}

export default Preloader;
