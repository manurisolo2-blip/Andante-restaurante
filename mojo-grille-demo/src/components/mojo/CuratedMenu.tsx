import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { Plus, Check, Soup, Drumstick, Salad, MessageSquare } from "lucide-react";
import { useCart } from "./cart";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { MagneticButton } from "./MagneticButton";
import { RebelChefBadge } from "./RebelChefBadge";

export interface CuratedMenuItem {
  id: string;
  name: string;
  price: number;
  protein?: string;
  feature: string;
  calories?: string;
  cookTime?: string;
  description: string;
  imageUrl: string;
  authorNote?: string;
  techSpecs?: string;
}

/*
 * Los id llevan el prefijo "plancha-" porque el carrito agrupa líneas por
 * `${itemId}::${guarniciones}`. El Chicken Fresco Bowl de esta sección
 * compartía id con el de la carta, con otro precio ($13.00 frente a $14.50):
 * añadir uno y luego el otro sin guarniciones sumaba cantidad a la primera
 * línea y cobraba la segunda unidad al precio equivocado.
 */
const CURATED_ITEMS: CuratedMenuItem[] = [
  {
    id: "plancha-mojo-pork-bowl",
    name: "Bife de Chorizo Madurado con Salvia",
    price: 16.95,
    feature: "28 Días Maduración",
    description:
      "Madurado en cámara propia, sellado a las brasas de quebracho con manteca noisette de salvia, papas rústicas a la provenzal y demi-glace artesanal (Sin TACC).",
    imageUrl: "/assets/mojo-bowl-ropa-vieja.jpg",
    authorNote: "brasas de quebracho & salvia fresca",
  },
  {
    id: "plancha-classic-cubano-press",
    name: "Magret de Pato con Puré de Kale & Membrillo",
    price: 18.5,
    feature: "Chef Pablo Aroma",
    description:
      "Pechuga de pato sellada a punto jugoso, puré sedoso de kale con manteca tostada, compota tibia de membrillo y reducción glaseada de su fondo de cocción.",
    imageUrl: "/assets/mojo-cubano.jpg",
    authorNote: "técnica francesa & membrillos dorados",
  },
  {
    id: "plancha-picadillo-meltadilla",
    name: "Ñoquis Estilo Coreano en Caldo Dashi",
    price: 15.5,
    feature: "100% Sin TACC",
    description:
      "Elaborados artesanalmente con harina de arroz, aptos celíacos, en caldo dashi profundo de setas shiitake, chauchas tiernas y verdeo fresco.",
    imageUrl: "/assets/mojo-cubano.jpg",
    authorNote: "fusión coreana & caldo aromático",
  },
  {
    id: "plancha-loaded-pork-tostones",
    name: "Pâté Trufado de Higaditos con Pan de Nuez",
    price: 11.5,
    feature: "Técnica Francesa",
    description:
      "Suave emulsión de higaditos de pollo perfumada con trufa negra, manteca noisette, oporto y tostadas de pan de nuez de masa madre de Pablo Aroma.",
    imageUrl: "/assets/mojo-tostones.jpg",
    authorNote: "textura aterciopelada & pan de masa madre",
  },
  {
    id: "plancha-chicken-fresco-bowl",
    name: "Paper Plate (Santiago Contarino Signature)",
    price: 9.5,
    feature: "Barra de Autor",
    description:
      "Bourbon whiskey, Aperol, Amargo Obrero autóctono y jugo fresco de limón. Cóctel insignia que rinde tributo a la identidad porteña.",
    imageUrl: "/assets/mojo-pollo-bowl.jpg",
    authorNote: "amargo obrero & bourbon de guarda",
  },
  {
    id: "plancha-pepper-steak-platter",
    name: "Torta Vasca (San Sebastián)",
    price: 8.5,
    feature: "Pablo Aroma Signature",
    description:
      "Tarta de queso horneada a alta temperatura con costra caramelizada y corazón cremoso e indulgente. Receta emblemática del chef pastelero.",
    imageUrl: "/assets/mojo-bowl-ropa-vieja.jpg",
    authorNote: "corazón fluido & caramelo tostado",
  },
];

export function CuratedMenu() {
  const { add } = useCart();
  const [activeItem, setActiveItem] = useState<CuratedMenuItem>(CURATED_ITEMS[0]!);
  const [isHovering, setIsHovering] = useState(false);

  const previewRef = useRef<HTMLDivElement>(null);
  const xTo = useRef<((value: number) => void) | null>(null);
  const yTo = useRef<((value: number) => void) | null>(null);
  const reducedMotion = useReducedMotion();

  const featured = CURATED_ITEMS[0];
  const listItems = CURATED_ITEMS.slice(1);

  // Estado interactivo para el Menú del Día ($46.300) tipo Bento Grid
  const [selectedEntrada, setSelectedEntrada] = useState<string>("Zuppa di Pomodoro Asado");
  const [selectedProteina, setSelectedProteina] = useState<string>("Carne de Res al Malbec");
  const [selectedAcomp, setSelectedAcomp] = useState<string[]>([
    "Papas rústicas a la provenzal",
    "Ensalada fresca de huerta",
  ]);
  const [bentoAdded, setBentoAdded] = useState(false);

  const handleToggleAcomp = (option: string) => {
    if (selectedAcomp.includes(option)) {
      if (selectedAcomp.length > 1) {
        setSelectedAcomp(selectedAcomp.filter((o) => o !== option));
      }
    } else {
      if (selectedAcomp.length < 2) {
        setSelectedAcomp([...selectedAcomp, option]);
      } else {
        setSelectedAcomp([selectedAcomp[0]!, option]);
      }
    }
  };

  const handleAddMenuDelDia = () => {
    setBentoAdded(true);
    setTimeout(() => setBentoAdded(false), 1500);
    add({
      itemId: "plancha-mojo-pork-bowl",
      name: "Menú del Día Andante ($46.300)",
      price: 46300,
      sides: [
        `Entrada: ${selectedEntrada}`,
        `Proteína: ${selectedProteina}`,
        `Guarniciones: ${selectedAcomp.join(" & ")}`,
        "Pan de masa madre",
        "Mantequilla de hierbas",
        "Bebida del día",
      ],
    });
  };

  useEffect(() => {
    if (!previewRef.current || typeof window === "undefined") return;

    // La miniatura de 320x220 persiguiendo al cursor es movimiento no
    // solicitado: con prefers-reduced-motion no se engancha el seguimiento.
    if (reducedMotion) {
      xTo.current = null;
      yTo.current = null;
      gsap.set(previewRef.current, { autoAlpha: 0 });
      return;
    }

    // quickTo para seguimiento fluido del cursor a 60fps sin tirones
    xTo.current = gsap.quickTo(previewRef.current, "x", { duration: 0.35, ease: "power3.out" });
    yTo.current = gsap.quickTo(previewRef.current, "y", { duration: 0.35, ease: "power3.out" });
  }, [reducedMotion]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (xTo.current && yTo.current) {
      const previewWidth = 320;
      const previewHeight = 220;
      let targetX = e.clientX + 28;
      // Invertir posición si el cursor está cerca del borde derecho del viewport
      if (typeof window !== "undefined" && targetX + previewWidth > window.innerWidth - 24) {
        targetX = e.clientX - previewWidth - 28;
      }
      const targetY = e.clientY - previewHeight / 2;

      xTo.current(targetX);
      yTo.current(targetY);
    }
  };

  const handleRowMouseEnter = (item: CuratedMenuItem, e: React.MouseEvent) => {
    setActiveItem(item);
    if (reducedMotion) return;
    if (previewRef.current) {
      if (!isHovering) {
        const previewWidth = 320;
        const previewHeight = 220;
        let startX = e.clientX + 28;
        if (typeof window !== "undefined" && startX + previewWidth > window.innerWidth - 24) {
          startX = e.clientX - previewWidth - 28;
        }
        const startY = e.clientY - previewHeight / 2;
        gsap.set(previewRef.current, { x: startX, y: startY });
      }
      setIsHovering(true);
      gsap.to(previewRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.25,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  };

  const handleMouseLeaveList = () => {
    setIsHovering(false);
    if (previewRef.current) {
      gsap.to(previewRef.current, {
        opacity: 0,
        scale: 0.88,
        duration: 0.25,
        ease: "power2.in",
        overwrite: "auto",
      });
    }
  };

  const handleAddToCart = (item: CuratedMenuItem) => {
    add({
      itemId: item.id,
      name: item.name,
      price: item.price,
      sides: [],
    });
  };

  return (
    <section
      id="curated-menu"
      aria-label="Hot Plancha Selection - Mojo Grille Signature Dishes"
      className="relative scroll-mt-[var(--header-h)] bg-espresso-deep py-16 sm:py-24 overflow-hidden"
    >
      {/* Miniatura Fotográfica Flotante al Cursor (Solo Desktop) */}
      <div
        ref={previewRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-50 hidden lg:flex flex-col overflow-hidden rounded-none bg-surface border border-brass/30 opacity-0 w-80 h-52 select-none will-change-transform"
        style={{ transform: "translate3d(-9999px, -9999px, 0)" }}
      >
        <div className="relative h-full w-full overflow-hidden bg-surface">
          <img
            src={activeItem.imageUrl}
            alt={activeItem.name}
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-surface/40" />
          
          {/* Metadato superior de previsualización */}
          <div className="absolute top-2.5 left-3 flex items-center">
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-canvas bg-brass px-2 py-0.5">
              COCINA DE MERCADO · AL MOMENTO
            </span>
          </div>

          {/* Nombre y etiqueta de autor inferior */}
          <div className="absolute bottom-2.5 left-3 right-3 flex flex-col leading-tight">
            <span className="font-display text-lg uppercase tracking-tight text-linen font-black">
              {activeItem.name}
            </span>
            <span className="font-sans font-bold uppercase text-xs tracking-wider text-brass">
              {activeItem.authorNote}
            </span>
          </div>
        </div>
      </div>

      {/*
        Encabezado alineado a la izquierda, no centrado: las tres secciones de
        foto seguidas abrían las tres con un titular centrado y se leían como
        la misma plantilla repetida.
      */}
      <div className="mx-auto max-w-[1600px] w-full px-4 sm:px-6 lg:px-8 mb-10 sm:mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
        <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-linen leading-none">
          SELECCIÓN DE ESTACIÓN · AL FUEGO
        </h2>
        <p className="mt-2 sm:mt-3 font-sans text-sm font-bold uppercase tracking-[0.18em] text-brass">
          COCINA DE MERCADO · TEMPO PAUSADO 76–108 PPM
        </p>
        </div>
        <span
          aria-hidden="true"
          className="font-display text-4xl sm:text-6xl lg:text-7xl leading-none text-brass/70 tabular-nums shrink-0"
        >
          {String(CURATED_ITEMS.length).padStart(2, "0")}
        </span>
      </div>

      {/*
        Plato destacado a sangre. El resto de la sección es un listado de filas
        donde la fotografía sólo aparecía como miniatura al pasar el cursor, así
        que en escritorio esta sección no enseñaba comida. El primer plato pasa
        a abrir con imagen grande y el texto repartido a los lados, y los otros
        cinco siguen como listado: dos densidades distintas dentro de la misma
        sección en vez de seis filas iguales.
      */}
      {/*
        Menú del Día ($46.300) — Tarjeta Destacada tipo Bento Grid con Desglose de 3 Pasos
      */}
      <div className="mx-auto max-w-[1600px] w-full px-4 sm:px-6 lg:px-8 mb-14 sm:mb-20">
        <article
          itemScope
          itemType="https://schema.org/MenuItem"
          className="relative border border-brass/30 bg-surface/90 backdrop-blur-md shadow-2xl p-6 sm:p-8 md:p-10"
        >
          {/* Header del Bento Grid */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-brass/20">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="font-sans text-[11px] font-black uppercase tracking-[0.22em] text-canvas bg-amber px-3 py-1">
                  IL MENÙ DEL GIORNO · PROPUESTA EJECUTIVA
                </span>
                <span className="font-sans text-xs font-bold uppercase tracking-wider text-brass">
                  Lunes a Viernes · 12:00 a 16:00 hs
                </span>
              </div>
              <h3
                itemProp="name"
                className="font-serif font-display text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-linen leading-none"
              >
                Menú del Día Andante
              </h3>
              <p
                itemProp="description"
                className="mt-3 font-sans text-sm sm:text-base text-mist max-w-2xl leading-relaxed"
              >
                Experiencia en tres tiempos de cocina contemporánea y de mercado. Incluye panadería artesanal de masa madre de Pablo Aroma, mantequilla de hierbas y bebida de la casa.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 shrink-0">
              <div itemProp="offers" itemScope itemType="https://schema.org/Offer" className="text-left lg:text-right">
                <meta itemProp="priceCurrency" content="COP" />
                <span
                  itemProp="price"
                  content="46300"
                  className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-brass tabular-nums leading-none"
                >
                  $46.300
                </span>
                <span className="block font-sans text-[11px] uppercase tracking-wider text-mist mt-1 font-semibold">
                  Precio final por comensal
                </span>
                <link itemProp="availability" href="https://schema.org/InStock" />
              </div>

              {/* Badges claros de cortesías incluidas */}
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-canvas/90 border border-brass/35 text-brass text-[11px] font-bold uppercase tracking-wider">
                  <Check className="h-3.5 w-3.5 text-amber" aria-hidden="true" />
                  Pan de Masa Madre
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-canvas/90 border border-brass/35 text-brass text-[11px] font-bold uppercase tracking-wider">
                  <Check className="h-3.5 w-3.5 text-amber" aria-hidden="true" />
                  Mantequilla de Hierbas
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-canvas/90 border border-brass/35 text-brass text-[11px] font-bold uppercase tracking-wider">
                  <Check className="h-3.5 w-3.5 text-amber" aria-hidden="true" />
                  Bebida del Día
                </span>
              </div>
            </div>
          </div>

          {/* Retícula Bento Grid de 3 Pasos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
            
            {/* Bento Celda 1: Paso 1 - Entrada / Sopa del Día */}
            <div className="flex flex-col justify-between border border-brass/20 bg-canvas/60 p-5 sm:p-6 transition-all duration-300 hover:border-brass/50">
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2 text-brass">
                    <Soup className="h-4 w-4 text-amber" aria-hidden="true" />
                    <span className="font-sans text-xs font-bold uppercase tracking-[0.18em]">
                      PASO 1 · ENTRADA
                    </span>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-canvas bg-brass px-2 py-0.5">
                    1 Opción
                  </span>
                </div>
                <h4 className="font-serif font-display text-xl font-bold uppercase tracking-tight text-linen mb-2">
                  Entrada o Sopa del Día
                </h4>
                <p className="font-sans text-xs text-mist leading-relaxed mb-4">
                  Apertura reconfortante elaborada en cocción lenta con ingredientes frescos de la huerta.
                </p>

                <div className="space-y-2.5">
                  {[
                    {
                      id: "sopa-pomodoro",
                      name: "Zuppa di Pomodoro Asado",
                      desc: "Tomates confitados, albahaca fresca y croutons de masa madre.",
                    },
                    {
                      id: "ensalada-estacion",
                      name: "Insalata di Stagione",
                      desc: "Hojas verdes, peras doradas al vino blanco y vinagreta cítrica.",
                    },
                  ].map((entrada) => {
                    const isSelected = selectedEntrada === entrada.name;
                    return (
                      <button
                        key={entrada.id}
                        type="button"
                        onClick={() => setSelectedEntrada(entrada.name)}
                        className={`w-full text-left p-3.5 border transition-all cursor-pointer flex items-start gap-3 ${
                          isSelected
                            ? "bg-surface border-brass text-linen shadow-md"
                            : "bg-surface/40 border-brass/15 text-mist hover:text-linen hover:border-brass/30"
                        }`}
                      >
                        <span
                          className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border ${
                            isSelected ? "border-amber bg-amber text-linen" : "border-brass/40 bg-canvas text-linen"
                          }`}
                        >
                          {isSelected && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                        </span>
                        <div>
                          <p className="font-sans text-xs font-bold uppercase tracking-wider text-linen">
                            {entrada.name}
                          </p>
                          <p className="font-sans text-[11px] text-mist mt-0.5 leading-snug">
                            {entrada.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bento Celda 2: Paso 2 - Selección de Proteína */}
            <div className="flex flex-col justify-between border border-brass/20 bg-canvas/60 p-5 sm:p-6 transition-all duration-300 hover:border-brass/50">
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2 text-brass">
                    <Drumstick className="h-4 w-4 text-amber" aria-hidden="true" />
                    <span className="font-sans text-xs font-bold uppercase tracking-[0.18em]">
                      PASO 2 · PROTEÍNA
                    </span>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-linen bg-brass px-2 py-0.5">
                    1 Opción
                  </span>
                </div>
                <h4 className="font-serif font-display text-xl font-bold uppercase tracking-tight text-linen mb-2">
                  Selección de Proteína
                </h4>
                <p className="font-sans text-xs text-mist leading-relaxed mb-4">
                  Cortes nobles y pesca fresca preparados al momento a las brasas o braseados.
                </p>

                <div className="space-y-2.5">
                  {[
                    {
                      id: "carne-braseada",
                      name: "Carne de Res al Malbec",
                      desc: "Braseada 8 horas en vino tinto, vegetales glaseados y demi-glace.",
                    },
                    {
                      id: "pollo-limon",
                      name: "Pechuga de Pollo al Limón & Romero",
                      desc: "Sellada a la plancha, marinada con hierbas frescas y manteca noisette.",
                    },
                    {
                      id: "pesca-dia",
                      name: "Pesca del Día a la Plancha",
                      desc: "Filete fresco con emulsión tibia de cítricos y alcaparras fritas.",
                    },
                  ].map((prot) => {
                    const isSelected = selectedProteina === prot.name;
                    return (
                      <button
                        key={prot.id}
                        type="button"
                        onClick={() => setSelectedProteina(prot.name)}
                        className={`w-full text-left p-3.5 border transition-all cursor-pointer flex items-start gap-3 ${
                          isSelected
                            ? "bg-surface border-brass text-linen shadow-md"
                            : "bg-surface/40 border-brass/15 text-mist hover:text-linen hover:border-brass/30"
                        }`}
                      >
                        <span
                          className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border ${
                            isSelected ? "border-amber bg-amber text-linen" : "border-brass/40 bg-canvas text-linen"
                          }`}
                        >
                          {isSelected && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                        </span>
                        <div>
                          <p className="font-sans text-xs font-bold uppercase tracking-wider text-linen">
                            {prot.name}
                          </p>
                          <p className="font-sans text-[11px] text-mist mt-0.5 leading-snug">
                            {prot.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bento Celda 3: Paso 3 - Selección de Dos Acompañamientos */}
            <div className="flex flex-col justify-between border border-brass/20 bg-canvas/60 p-5 sm:p-6 transition-all duration-300 hover:border-brass/50 md:col-span-2 lg:col-span-1">
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2 text-brass">
                    <Salad className="h-4 w-4 text-amber" aria-hidden="true" />
                    <span className="font-sans text-xs font-bold uppercase tracking-[0.18em]">
                      PASO 3 · GUARNICIONES
                    </span>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-linen bg-amber px-2 py-0.5">
                    Elegir 2 ({selectedAcomp.length}/2)
                  </span>
                </div>
                <h4 className="font-serif font-display text-xl font-bold uppercase tracking-tight text-linen mb-2">
                  Dos Acompañamientos
                </h4>
                <p className="font-sans text-xs text-mist leading-relaxed mb-4">
                  Elige 2 guarniciones preparadas en el día para acompañar tu proteína.
                </p>

                <div className="space-y-2">
                  {[
                    "Ensalada fresca de huerta",
                    "Papas rústicas a la provenzal",
                    "Yuca dorada al vapor",
                    "Plátano maduro al horno",
                    "Arroz carnaroli perfumado",
                  ].map((sideName) => {
                    const isSelected = selectedAcomp.includes(sideName);
                    return (
                      <button
                        key={sideName}
                        type="button"
                        onClick={() => handleToggleAcomp(sideName)}
                        className={`w-full text-left px-3.5 py-2.5 border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                          isSelected
                            ? "bg-surface border-brass text-linen shadow-sm"
                            : "bg-surface/30 border-brass/10 text-mist hover:text-linen hover:border-brass/30"
                        }`}
                      >
                        <span className="font-sans text-xs font-bold tracking-wide">
                          {sideName}
                        </span>
                        <span
                          className={`grid h-4 w-4 shrink-0 place-items-center border ${
                            isSelected ? "border-amber bg-amber text-linen" : "border-brass/40 bg-canvas text-linen"
                          }`}
                        >
                          {isSelected && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>

          {/* Barra de Resumen Interactivo & Acción de Compra */}
          <div className="mt-8 pt-6 border-t border-brass/20 flex flex-col md:flex-row md:items-center justify-between gap-5 bg-surface/70 p-5">
            <div className="flex flex-col gap-1">
              <span className="font-sans text-[11px] font-black uppercase tracking-widest text-brass">
                TU SELECCIÓN PERSONALIZADA DEL MENÚ DEL DÍA:
              </span>
              <p className="font-sans text-xs sm:text-sm text-linen font-medium">
                <span className="text-amber font-bold">{selectedEntrada}</span> +{" "}
                <span className="text-amber font-bold">{selectedProteina}</span> +{" "}
                <span className="text-amber font-bold">{selectedAcomp.join(" & ")}</span>
              </p>
              <p className="font-sans text-[11px] text-mist">
                Incluye pan artesanal de masa madre, mantequilla de hierbas y bebida de la casa.
              </p>
            </div>

            <a
              href={`https://wa.me/5491168673856?text=${encodeURIComponent(
                `Hola Andante Bar, quisiera consultar por el Menú del Día ($46.300). Entrada: ${selectedEntrada}, Principal: ${selectedProteina}, Guarniciones: ${selectedAcomp.join(" y ")}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Consultar disponibilidad del Menú del Día por WhatsApp"
              className="inline-flex min-h-[48px] items-center justify-center gap-3 rounded-none bg-brass px-7 py-3.5 font-sans text-xs sm:text-sm font-bold uppercase tracking-widest text-canvas hover:bg-linen hover:text-canvas transition-colors cursor-pointer select-none border border-brass shadow-xl shrink-0"
            >
              <MessageSquare className="h-4 w-4" aria-hidden="true" />
              <span>CONSULTAR DISPONIBILIDAD</span>
            </a>
          </div>
        </article>
      </div>

      {/* Listado Dividido Horizontal (Split Rows) */}
      <div
        className="mx-auto max-w-[1600px] w-full px-4 sm:px-6 lg:px-8"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeaveList}
      >
        <div className="w-full bg-transparent flex flex-col gap-10 md:gap-0">
          {listItems.map((item) => (
            <div
              key={item.id}
              onMouseEnter={(e) => handleRowMouseEnter(item, e)}
              className="md:border-b md:border-brass/15 pb-8 md:py-8 px-0 md:px-6 flex flex-col md:flex-row md:items-center justify-between group transition-colors duration-300 md:hover:bg-canvas/40 relative gap-4 md:gap-6"
            >
              {/*
                La fila ya no añade al carrito al hacer clic. Era un <div
                onClick> sin role ni tabIndex: inalcanzable con teclado, y un
                clic en cualquier hueco de la fila metía el plato en el pedido
                sin confirmación. El botón dedicado de la derecha ya hace eso, y
                es un control real.
              */}
              {/* Izquierda: Nombre del plato font-display + Badge Rebelde de Chef (Item 01) + Subtítulo con mayor grosor */}
              <div className="flex flex-col gap-1.5 lg:w-[40%]">
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                  <h3 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-linen group-hover:text-brass transition-colors duration-200 leading-none">
                    {item.name}
                  </h3>
                </div>
                <span className="font-sans text-sm font-bold uppercase tracking-wider text-brass mt-0.5 leading-snug">
                  {item.authorNote}
                </span>
              </div>

              {/*
                En móvil la foto manda: era una miniatura de 64px, lo único
                que se veía del plato en toda la sección, porque la
                previsualización al cursor es exclusiva de escritorio.
              */}
              <div className="md:hidden flex flex-col gap-3">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full aspect-[4/3] object-cover object-center"
                  loading="lazy"
                />
                <p className="font-sans text-base text-mist">
                  {item.description}
                </p>
              </div>

              {/* Centro: Descripción sensorial criolla (En escritorio) */}
              <div className="hidden md:flex items-center lg:w-[32%] px-2">
                <p className="font-sans text-base text-mist leading-relaxed text-left line-clamp-2">
                  {item.description}
                </p>
              </div>

              {/* Derecha: Precio en gran escala y botón de corte limpio con anchos balanceados y alineación uniforme */}
              <div className="flex items-center justify-between md:justify-end gap-3 sm:gap-6 w-full md:w-[30%] shrink-0 mt-1 md:mt-0">
                <span className="text-left md:text-right font-display text-2xl sm:text-4xl font-bold tracking-tight text-brass group-hover:text-amber transition-colors duration-200 shrink-0 tabular-nums">
                  ${item.price.toFixed(2)}
                </span>
                <a
                  href={`https://wa.me/5491168673856?text=${encodeURIComponent(
                    `Hola Andante Bar, quisiera consultar sobre el plato "${item.name}" de la selección al fuego.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none sm:w-44 h-11 px-3 sm:px-4 font-sans font-bold uppercase tracking-wider text-xs sm:text-sm bg-surface border border-brass/40 text-linen hover:border-brass hover:text-brass transition-colors duration-200 rounded-none flex items-center justify-center gap-2 cursor-pointer shrink-0 select-none shadow-md"
                  aria-label={`Consultar sobre ${item.name} por WhatsApp`}
                >
                  <MessageSquare className="h-3.5 w-3.5 text-amber" aria-hidden="true" />
                  <span className="truncate">CONSULTAR</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CuratedMenu;
