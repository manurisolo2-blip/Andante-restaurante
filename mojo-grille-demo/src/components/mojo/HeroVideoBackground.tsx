import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/useReducedMotion";

type NetworkInformation = {
  saveData?: boolean;
  effectiveType?: string;
};

/**
 * El bucle del hero es decoración pura: el mensaje vive en el titular. Si la
 * conexión pide ahorrar datos o va a rastras no compensa gastar megas, y se
 * queda el fotograma fijo. Safari y Firefox no exponen la API; ahí no
 * penalizamos y damos por buena la conexión.
 */
function connectionAllowsVideo(): boolean {
  if (typeof navigator === "undefined") return false;
  const connection = (navigator as Navigator & { connection?: NetworkInformation })
    .connection;
  if (!connection) return true;
  if (connection.saveData) return false;
  return connection.effectiveType !== "slow-2g" && connection.effectiveType !== "2g";
}

export interface HeroVideoBackgroundProps {
  /**
   * Bucle autoalojado. El CSP del sitio es `default-src 'self'` sin `media-src`
   * propio (ver `public/_headers`), así que un origen externo lo bloquearía el
   * navegador: el archivo tiene que salir de `public/`.
   */
  videoSrc?: string;
  /** Fotograma de respaldo. Se pinta siempre primero y es el fallback definitivo. */
  posterSrc: string;
  /**
   * Opacidad de la imagen bajo el velo crema. Se ajusta a 0.45 para dar
   * transparencia y permitir apreciar el vídeo y textura de fondo con claridad.
   */
  opacity?: number;
}

/**
 * Fondo del hero: bucle ambiental de cocina que reacciona al scroll con
 * parallax, un punto de escala y un velo crema que cierra según sale de
 * pantalla. No hay scrub de fotogramas a propósito: el CTA vive en el hero y
 * fijar la sección para ganar recorrido lo empujaría fuera de la primera
 * pantalla.
 */
export function HeroVideoBackground({
  videoSrc,
  posterSrc,
  opacity = 0.45,
}: HeroVideoBackgroundProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const reducedMotion = useReducedMotion();

  // Arranca en false en servidor y en el primer render de cliente: el HTML
  // hidratado coincide y nadie descarga vídeo antes de saber si le conviene.
  const [videoEligible, setVideoEligible] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    if (!videoSrc || reducedMotion || videoFailed) {
      setVideoEligible(false);
      return;
    }
    setVideoEligible(connectionAllowsVideo());
  }, [videoSrc, reducedMotion, videoFailed]);

  // Reproducción sólo mientras el hero está en pantalla y la pestaña visible.
  // Un bucle corriendo detrás de diez secciones sólo gasta batería.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoEligible) return undefined;

    // El autoplay puede rechazarse (política del navegador, batería baja). No
    // es un error recuperable: el póster ya está debajo y el hero se ve igual.
    const tryPlay = () => {
      void video.play().catch(() => {});
    };

    // El elemento puede alcanzar estado pintable antes de que React enganche su
    // handler (vídeo servido desde caché), y entonces `canplay` no llega nunca.
    // Por eso se consulta `readyState` a mano además de escuchar. Con
    // HAVE_CURRENT_DATA ya hay fotograma que mostrar.
    let announced = false;
    const markReady = () => {
      if (announced || video.readyState < 2) return;
      announced = true;
      setVideoReady(true);
      // El vídeo cambia lo que ocupa el hero; sin refresco los triggers de las
      // secciones siguientes quedan desplazados.
      ScrollTrigger.refresh();
    };
    markReady();
    video.addEventListener("loadeddata", markReady);
    video.addEventListener("canplay", markReady);

    const heroSection = document.getElementById("top");
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[entries.length - 1];
        if (!entry) return;
        if (entry.isIntersecting && !document.hidden) {
          tryPlay();
        } else {
          video.pause();
        }
      },
      { threshold: 0.01 },
    );
    if (heroSection) {
      observer.observe(heroSection);
    } else {
      observer.observe(video);
    }

    const handleVisibility = () => {
      if (document.hidden) {
        video.pause();
      } else {
        if (typeof window !== "undefined" && window.scrollY <= window.innerHeight) {
          tryPlay();
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const handleScroll = () => {
      if (typeof window === "undefined") return;
      if (window.scrollY > window.innerHeight) {
        if (!video.paused) {
          video.pause();
        }
      } else {
        if (video.paused && !document.hidden) {
          tryPlay();
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      video.removeEventListener("loadeddata", markReady);
      video.removeEventListener("canplay", markReady);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("scroll", handleScroll);
      video.pause();
    };
  }, [videoEligible]);

  // El fondo se mantiene estático en el viewport (sin parallax) para que
  // la parte inferior de la página suba y cubra el vídeo como una cortina.
  useEffect(() => {
    const media = mediaRef.current;
    if (!media) return undefined;
    gsap.set(media, { yPercent: 0, scale: 1 });
  }, []);

  return (
    <div
      ref={rootRef}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/*
        Capa de medios estática fija al viewport: no se desplaza con el scroll.
      */}
      <div
        ref={mediaRef}
        className="absolute inset-0 h-full w-full"
      >
        <img
          src={posterSrc}
          alt=""
          aria-hidden="true"
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ease-out"
          style={{ opacity: videoReady ? 0 : opacity }}
        />

        {videoEligible && !videoFailed ? (
          <video
            ref={videoRef}
            src={videoSrc}
            poster={posterSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            tabIndex={-1}
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ease-out"
            style={{ opacity: videoReady ? opacity : 0 }}
            onError={() => {
              setVideoFailed(true);
              setVideoReady(false);
            }}
          />
        ) : null}
      </div>

      {/*
        Velo crema. No es decorativo: es lo que garantiza que el titular se
        lea sobre un vídeo cuyos fotogramas no controlamos.

        El peor caso es un fotograma negro al 45% de opacidad sobre la crema,
        que deja el fondo en #85827C. Con el titular en charcoal-ink opaco eso
        da 4.88:1, sin margen. El punto más flojo de este degradado es el 25%
        del centro, que sube el fondo a #A09C95 y el titular a 6.84:1.

        Bajar cualquiera de estas paradas por debajo de 0.25 vuelve a dejar el
        hero por debajo de AA en los fotogramas oscuros del bucle.
      */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream-bg/35 via-cream-bg/25 to-cream-bg/45" />
    </div>
  );
}

export default HeroVideoBackground;
