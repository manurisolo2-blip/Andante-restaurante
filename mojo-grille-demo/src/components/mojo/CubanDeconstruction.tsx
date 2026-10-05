import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { InkStamp } from "./InkStamp";

interface IngredientCalloutProps {
  name: string;
  detail: string;
  side?: "left" | "right";
  /**
   * Anclaje horizontal a medida, en clases de Tailwind.
   *
   * El anclaje por defecto está calculado sobre el borde de la caja de la
   * imagen, que es igual para las cinco capas. Pero cada webp ocupa un ancho
   * distinto dentro de esa caja: los pepinillos son una tira estrecha que no
   * llega al borde, así que con el anclaje común su ficha quedaba a 180px del
   * ingrediente mientras las demás rondaban los 40. Esta prop existe para
   * corregir esa capa sin desalinear el resto.
   */
  anchorClassName?: string;
}

/** Anclaje por defecto: pega la ficha al borde de la caja de la imagen. */
const ANCHOR_RIGHT = "left-[68%] sm:left-[73%] md:left-[86%] lg:left-[83%] xl:left-[80%]";
const ANCHOR_LEFT = "right-[68%] sm:right-[73%] md:right-[86%] lg:right-[83%] xl:right-[80%]";

function IngredientCallout({
  name,
  detail,
  side = "right",
  anchorClassName,
}: IngredientCalloutProps) {
  const isLeft = side === "left";
  const anchor = anchorClassName ?? (isLeft ? ANCHOR_LEFT : ANCHOR_RIGHT);

  return (
    <div
      className={`ingredient-callout ${
        isLeft ? "ingredient-callout-left" : "ingredient-callout-right"
      } absolute ${anchor} top-1/2 -translate-y-1/2 flex items-center gap-1 sm:gap-1.5 pointer-events-auto select-none opacity-0 will-change-transform z-30`}
    >
      {isLeft ? (
        <>
          {/* Ficha Tipográfica Izquierda (Alineada a la derecha) */}
          <div className="flex flex-col text-right items-end max-w-[110px] sm:max-w-[155px] md:max-w-[200px] lg:max-w-[240px]">
            <span className="font-display text-sm sm:text-base md:text-xl lg:text-2xl font-black uppercase tracking-tight text-charcoal-ink leading-tight">
              {name}
            </span>
            <span className="font-sans text-sm md:text-sm lg:text-base font-bold uppercase tracking-wider text-charcoal-ink/75 leading-tight mt-0.5 sm:mt-1">
              {detail}
            </span>
          </div>

          {/* Flecha y Conector Izquierdo apuntando al sándwich (derecha) */}
          <div className="flex items-center shrink-0">
            <span
              className="h-[2px] w-3 sm:w-4 md:w-6 lg:w-8 xl:w-10 bg-brand-fire inline-block shrink-0 opacity-95"
              aria-hidden="true"
            />
            {/* Punta de Flecha Directa al Plato */}
            <svg
              className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-brand-fire fill-current -ml-0.5 shrink-0"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M5 3l14 9-14 9V3z" />
            </svg>
          </div>
        </>
      ) : (
        <>
          {/* Flecha y Conector Derecho apuntando al sándwich (izquierda) */}
          <div className="flex items-center shrink-0">
            {/* Punta de Flecha Directa al Plato */}
            <svg
              className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-brand-fire fill-current -mr-0.5 shrink-0 rotate-180"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M5 3l14 9-14 9V3z" />
            </svg>
            <span
              className="h-[2px] w-3 sm:w-4 md:w-6 lg:w-8 xl:w-10 bg-brand-fire inline-block shrink-0 opacity-95"
              aria-hidden="true"
            />
          </div>

          {/* Ficha Tipográfica Derecha (Alineada a la izquierda) */}
          <div className="flex flex-col text-left items-start max-w-[110px] sm:max-w-[155px] md:max-w-[200px] lg:max-w-[240px]">
            <span className="font-display text-sm sm:text-base md:text-xl lg:text-2xl font-black uppercase tracking-tight text-charcoal-ink leading-tight">
              {name}
            </span>
            <span className="font-sans text-sm md:text-sm lg:text-base font-bold uppercase tracking-wider text-charcoal-ink/75 leading-tight mt-0.5 sm:mt-1">
              {detail}
            </span>
          </div>
        </>
      )}
    </div>
  );
}

export function CubanDeconstruction() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const topBreadRef = useRef<HTMLDivElement>(null);
  const picklesRef = useRef<HTMLDivElement>(null);
  const cheeseRef = useRef<HTMLDivElement>(null);
  const mojoPorkRef = useRef<HTMLDivElement>(null);
  const bottomBreadRef = useRef<HTMLDivElement>(null);

  const loadedImagesCountRef = useRef(0);
  const TOTAL_LAYERS = 5;

  const handleLayerImageLoad = () => {
    loadedImagesCountRef.current += 1;
    if (loadedImagesCountRef.current >= TOTAL_LAYERS) {
      ScrollTrigger.refresh();
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.matchMedia({
      // 1. Escritorio (min-width: 1024px): Sándwich 100% UNIDO de inicio, se deconstruye monumental al scroll
      "(min-width: 1024px)": function () {
        // Inicializar sándwich completamente UNIDO (ensamblado apretado)
        gsap.set(topBreadRef.current, { y: -52, rotate: 0 });
        gsap.set(picklesRef.current, { y: -26, rotate: 0 });
        gsap.set(cheeseRef.current, { y: -6, rotate: 0 });
        gsap.set(mojoPorkRef.current, { y: 16, rotate: 0 });
        gsap.set(bottomBreadRef.current, { y: 46, rotate: 0 });
        gsap.set(".ingredient-callout-right", { opacity: 0, x: -20 });
        gsap.set(".ingredient-callout-left", { opacity: 0, x: 20 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            pin: pinRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.2,
          },
        });

        tl.to(
          topBreadRef.current,
          {
            y: -270,
            rotate: -2,
            ease: "power1.out",
          },
          0
        )
          .to(
            picklesRef.current,
            {
              y: -135,
              rotate: 2,
              ease: "power1.out",
            },
            0
          )
          .to(
            cheeseRef.current,
            {
              y: 0,
              rotate: -0.5,
              ease: "power1.out",
            },
            0
          )
          .to(
            mojoPorkRef.current,
            {
              y: 135,
              rotate: 1.5,
              ease: "power1.out",
            },
            0
          )
          .to(
            bottomBreadRef.current,
            {
              y: 270,
              rotate: -1.5,
              ease: "power1.out",
            },
            0
          )
          .to(
            ".ingredient-callout-right",
            {
              opacity: 1,
              x: 0,
              stagger: 0.03,
              ease: "power1.out",
            },
            0.08
          )
          .to(
            ".ingredient-callout-left",
            {
              opacity: 1,
              x: 0,
              stagger: 0.03,
              ease: "power1.out",
            },
            0.08
          );

        return () => {
          tl.kill();
        };
      },

      // 2. Tabletas (min-width: 640px) and (max-width: 1023px): Separación intermedia
      "(min-width: 640px) and (max-width: 1023px)": function () {
        gsap.set(topBreadRef.current, { y: -36, rotate: 0 });
        gsap.set(picklesRef.current, { y: -18, rotate: 0 });
        gsap.set(cheeseRef.current, { y: -4, rotate: 0 });
        gsap.set(mojoPorkRef.current, { y: 12, rotate: 0 });
        gsap.set(bottomBreadRef.current, { y: 32, rotate: 0 });
        gsap.set(".ingredient-callout-right", { opacity: 0, x: -15 });
        gsap.set(".ingredient-callout-left", { opacity: 0, x: 15 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            pin: pinRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.2,
          },
        });

        tl.to(
          topBreadRef.current,
          {
            y: -175,
            rotate: -1.5,
            ease: "power1.out",
          },
          0
        )
          .to(
            picklesRef.current,
            {
              y: -88,
              rotate: 1.5,
              ease: "power1.out",
            },
            0
          )
          .to(
            cheeseRef.current,
            {
              y: 0,
              ease: "power1.out",
            },
            0
          )
          .to(
            mojoPorkRef.current,
            {
              y: 88,
              rotate: 1,
              ease: "power1.out",
            },
            0
          )
          .to(
            bottomBreadRef.current,
            {
              y: 175,
              rotate: -1,
              ease: "power1.out",
            },
            0
          )
          .to(
            ".ingredient-callout-right",
            {
              opacity: 1,
              x: 0,
              stagger: 0.03,
              ease: "power1.out",
            },
            0.08
          )
          .to(
            ".ingredient-callout-left",
            {
              opacity: 1,
              x: 0,
              stagger: 0.03,
              ease: "power1.out",
            },
            0.08
          );

        return () => {
          tl.kill();
        };
      },

      // 3. Celulares Móviles (max-width: 639px): Recorridos ajustados para evitar colisiones y desbordes
      "(max-width: 639px)": function () {
        gsap.set(topBreadRef.current, { y: -20, rotate: 0 });
        gsap.set(picklesRef.current, { y: -10, rotate: 0 });
        gsap.set(cheeseRef.current, { y: -2, rotate: 0 });
        gsap.set(mojoPorkRef.current, { y: 6, rotate: 0 });
        gsap.set(bottomBreadRef.current, { y: 18, rotate: 0 });
        gsap.set(".ingredient-callout-right", { opacity: 0, x: 8 });
        gsap.set(".ingredient-callout-left", { opacity: 0, x: -8 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            pin: pinRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.1,
          },
        });

        tl.to(
          topBreadRef.current,
          {
            y: -110,
            rotate: -1,
            ease: "power1.out",
          },
          0
        )
          .to(
            picklesRef.current,
            {
              y: -55,
              rotate: 1,
              ease: "power1.out",
            },
            0
          )
          .to(
            cheeseRef.current,
            {
              y: 0,
              ease: "power1.out",
            },
            0
          )
          .to(
            mojoPorkRef.current,
            {
              y: 55,
              rotate: 0.8,
              ease: "power1.out",
            },
            0
          )
          .to(
            bottomBreadRef.current,
            {
              y: 110,
              rotate: -0.8,
              ease: "power1.out",
            },
            0
          )
          .to(
            ".ingredient-callout-right",
            {
              opacity: 1,
              x: 0,
              stagger: 0.02,
              ease: "power1.out",
            },
            0.05
          )
          .to(
            ".ingredient-callout-left",
            {
              opacity: 1,
              x: 0,
              stagger: 0.02,
              ease: "power1.out",
            },
            0.05
          );

        return () => {
          tl.kill();
        };
      },
    });

    // Listener de carga de ventana para refrescar ScrollTrigger
    const handleWindowLoad = () => {
      ScrollTrigger.refresh();
    };

    if (document.readyState === "complete") {
      ScrollTrigger.refresh();
    } else {
      window.addEventListener("load", handleWindowLoad);
    }

    const timer1 = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    const timer2 = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 800);

    // Se captura el nodo ahora: para cuando corra el cleanup, containerRef.current
    // puede haber cambiado y los ScrollTrigger de este montaje no se matarían.
    const container = containerRef.current;

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener("load", handleWindowLoad);
      ScrollTrigger.clearMatchMedia();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === container) {
          t.kill();
        }
      });
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="cuban-deconstruction"
      aria-label="Deconstrucción Sensorial del Bocado Andante"
      className="relative h-[180vh] bg-transparent overflow-x-clip"
    >
      <div
        ref={pinRef}
        className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-visible px-4 sm:px-8 relative"
      >
        {/* Tipografía Monumental Marca de Agua (Watermark) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden z-0 select-none opacity-40"
        >
          <span className="font-display text-[24vw] font-black uppercase tracking-tight text-linen/5 leading-none select-none">
            ANDANTE
          </span>
        </div>

        {/* Sello de Tinta Real Artesanal */}
        <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 z-30 hidden md:inline-flex">
          <InkStamp size={135} />
        </div>

        {/* Encabezado Superior de Sección */}
        <div className="absolute top-3 sm:top-8 left-0 right-0 text-center px-4 pointer-events-none z-10">
          <span className="font-sans text-xs uppercase tracking-[0.25em] text-brass font-bold">
            COMPÁS 76 PPM · ALQUIMIA DE MERCADO
          </span>
          <h2 className="font-display text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-linen mt-0.5 sm:mt-1 leading-none">
            ANATOMÍA GASTRONÓMICA
          </h2>
        </div>

        {/* Contenedor central del plato monumental y unificado */}
        <div className="relative w-full max-w-[1700px] px-2 sm:px-6 md:px-12 flex items-center justify-center pt-2 sm:pt-8">
          <div className="relative w-full max-w-[390px] h-[460px] sm:max-w-[540px] sm:h-[600px] md:max-w-[740px] md:h-[680px] lg:max-w-[960px] lg:h-[760px] xl:max-w-[1100px] xl:h-[820px] flex items-center justify-center overflow-visible mx-auto">
            {/* Sombra de Contacto Dinámica en el Piso */}
            <div
              className="absolute -bottom-6 sm:-bottom-14 w-[85%] max-w-[750px] h-6 sm:h-12 rounded-[100%] bg-charcoal-ink/20 blur-2xl pointer-events-none animate-sandwich-shadow"
              aria-hidden="true"
            />

            {/* Envoltorio Flotante Suave */}
            <div className="relative w-full h-full flex items-center justify-center animate-sandwich-float will-change-transform">
              {/* Capa 1: Tapa superior de masa madre tostada (DERECHA) */}
              <div
                ref={topBreadRef}
                className="absolute inset-0 flex items-center justify-center will-change-transform z-50 pointer-events-none overflow-visible"
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src="/sandwich/01-top-bread.webp"
                    alt="Pan artesanal de masa madre dorado a la manteca"
                    width={2816}
                    height={1536}
                    loading="eager"
                    onLoad={handleLayerImageLoad}
                    className="w-full max-w-[160px] sm:max-w-[280px] md:max-w-[700px] lg:max-w-[900px] xl:max-w-[1020px] max-h-[90px] sm:max-h-[160px] md:max-h-[290px] lg:max-h-[360px] xl:max-h-[400px] object-contain select-none drop-shadow-xl"
                  />
                  <IngredientCallout
                    name="MASA MADRE TOSTADA"
                    detail="Dorado en Manteca de Salvia"
                    side="right"
                  />
                </div>
              </div>

              {/* Capa 2: Pepinillos encurtidos y mostaza antigua (IZQUIERDA) */}
              <div
                ref={picklesRef}
                className="absolute inset-0 flex items-center justify-center will-change-transform z-40 pointer-events-none overflow-visible"
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src="/sandwich/02-pickles.webp"
                    alt="Encurtidos artesanales y mostaza antigua en grano"
                    width={2816}
                    height={1536}
                    loading="eager"
                    onLoad={handleLayerImageLoad}
                    className="w-full max-w-[150px] sm:max-w-[260px] md:max-w-[660px] lg:max-w-[850px] xl:max-w-[970px] max-h-[90px] sm:max-h-[160px] md:max-h-[290px] lg:max-h-[360px] xl:max-h-[400px] object-contain select-none drop-shadow-xl"
                  />
                  <IngredientCallout
                    name="ENCURTIDOS DE ESTACIÓN"
                    detail="Mostaza Antigua & Pepinillos"
                    side="left"
                    anchorClassName="right-[57%] sm:right-[62%] md:right-[75%] lg:right-[70%] xl:right-[69%]"
                  />
                </div>
              </div>

              {/* Capa 3: Queso gruyère fundido (DERECHA) */}
              <div
                ref={cheeseRef}
                className="absolute inset-0 flex items-center justify-center will-change-transform z-30 pointer-events-none overflow-visible"
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src="/sandwich/03-melted-cheese.webp"
                    alt="Queso gruyère artesanal fundido"
                    width={2816}
                    height={1536}
                    loading="eager"
                    onLoad={handleLayerImageLoad}
                    className="w-full max-w-[160px] sm:max-w-[280px] md:max-w-[700px] lg:max-w-[900px] xl:max-w-[1020px] max-h-[90px] sm:max-h-[160px] md:max-h-[290px] lg:max-h-[360px] xl:max-h-[400px] object-contain select-none drop-shadow-xl"
                  />
                  <IngredientCallout
                    name="QUESO GRUYÈRE FUNDIDO"
                    detail="Fundido al Compás Exacto"
                    side="right"
                  />
                </div>
              </div>

              {/* Capa 4: Panceta braseada 8 horas (IZQUIERDA) */}
              <div
                ref={mojoPorkRef}
                className="absolute inset-0 flex items-center justify-center will-change-transform z-20 pointer-events-none overflow-visible"
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src="/sandwich/04-mojo-pork.webp"
                    alt="Panceta de pastura braseada a baja temperatura"
                    width={2816}
                    height={1536}
                    loading="eager"
                    onLoad={handleLayerImageLoad}
                    className="w-full max-w-[160px] sm:max-w-[280px] md:max-w-[700px] lg:max-w-[900px] xl:max-w-[1020px] max-h-[90px] sm:max-h-[160px] md:max-h-[290px] lg:max-h-[360px] xl:max-h-[400px] object-contain select-none drop-shadow-xl"
                  />
                  <IngredientCallout
                    name="PANCETA BRASEADA 8H"
                    detail="Cocción Lenta a Fuego Pausado"
                    side="left"
                  />
                </div>
              </div>

              {/* Capa 5: Base crujiente artesanal (DERECHA) */}
              <div
                ref={bottomBreadRef}
                className="absolute inset-0 flex items-center justify-center will-change-transform z-10 pointer-events-none overflow-visible"
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src="/sandwich/05-bottom-bread.webp"
                    alt="Base crujiente de pan artesanal"
                    width={2816}
                    height={1536}
                    loading="eager"
                    onLoad={handleLayerImageLoad}
                    className="w-full max-w-[160px] sm:max-w-[280px] md:max-w-[700px] lg:max-w-[900px] xl:max-w-[1020px] max-h-[90px] sm:max-h-[160px] md:max-h-[290px] lg:max-h-[360px] xl:max-h-[400px] object-contain select-none drop-shadow-xl"
                  />
                  <IngredientCallout
                    name="BASE CRUJIENTE ARTESANAL"
                    detail="100% Sin TACC Garantizado"
                    side="right"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Botón Flotante para Ordenar el Cubano en Inglés */}
        <div className="absolute bottom-4 right-4 sm:bottom-10 sm:right-10 z-30 flex items-center">
          <a
            href="#curated-menu"
            className="bg-charcoal-ink hover:bg-brand-fire text-cream-bg hover:text-charcoal-ink min-h-11 py-2.5 px-4 sm:py-3 sm:px-6 text-sm sm:text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2.5 sm:gap-3 rounded-none cursor-pointer group shadow-none"
          >
            <span className="flex items-center gap-2">
              <span>ORDER LIVE-FIRE</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </span>
            <span className="h-3 w-px bg-cream-bg/30" />
            <span className="font-sans text-sm sm:text-xs font-black tracking-tight text-cream-bg">
              $12.95
            </span>
          </a>
        </div>

        {/* Indicador de scroll (visible solo en tablet/desktop para no solapar controles en móviles) */}
        <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 hidden sm:flex items-center gap-2 text-cream-bg font-sans text-xs sm:text-sm tracking-wider uppercase font-bold pointer-events-none bg-charcoal-ink px-4 py-1.5">
          <span className="animate-bounce text-brand-fire">↓</span>
          <span>Scroll to deconstruct · Scroll up to assemble</span>
        </div>
      </div>
    </section>
  );
}

export default CubanDeconstruction;
