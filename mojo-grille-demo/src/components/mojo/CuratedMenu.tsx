import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { Plus } from "lucide-react";
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
      "Madurado en cámara propia, sellado a las brasas con manteca noisette de salvia, milhojas de papa crocante y demi-glace artesanal (Sin TACC).",
    imageUrl: "/assets/mojo-bowl-ropa-vieja.jpg",
    authorNote: "brasas de quebracho & salvia fresca",
  },
  {
    id: "plancha-classic-cubano-press",
    name: "Bocado Andante de Gruyère & Panceta",
    price: 14.95,
    feature: "Panceta 8 Horas",
    description:
      "Panceta confitada a baja temperatura, queso gruyère fundido, mostaza en grano a la antigua y pan de masa madre dorado a la manteca.",
    imageUrl: "/assets/mojo-cubano.jpg",
    authorNote: "costra crocante & queso fundido",
  },
  {
    id: "plancha-picadillo-meltadilla",
    name: "Carpaccio de Lomo Curado & Focaccia",
    price: 17.5,
    feature: "Lomo de Pastura",
    description:
      "Finas láminas de lomo curado en sal marina y hierbas, reducción de balsámico añejo, escamas de sardo y focaccia artesanal sin TACC.",
    imageUrl: "/assets/mojo-cubano.jpg",
    authorNote: "alcaparras fritas & rúcula salvaje",
  },
  {
    id: "plancha-loaded-pork-tostones",
    name: "Burrata de Tandil & Higos Asados",
    price: 13.5,
    feature: "Origen Tandil",
    description:
      "Burrata fresca con corazón de crema, variedad de tomates reliquia, higos asados al horno de leña, pesto de albahaca y pistachos tostados.",
    imageUrl: "/assets/mojo-tostones.jpg",
    authorNote: "pesto fresco & frutos secos",
  },
  {
    id: "plancha-chicken-fresco-bowl",
    name: "Pesca del Día a la Plancha & Coliflor",
    price: 15.5,
    feature: "Pesca de Anzuelo",
    description:
      "Pesca fresca de estación sellada al punto justo, puré aterciopelado de coliflor asada, crocante de alcaparras baby y emulsión de limón confitado.",
    imageUrl: "/assets/mojo-pollo-bowl.jpg",
    authorNote: "fuego vivo & puré aterciopelado",
  },
  {
    id: "plancha-pepper-steak-platter",
    name: "Risotto de Hongos Silvestres & Trufa",
    price: 15.95,
    feature: "Carnaroli al Dente",
    description:
      "Gírgolas y portobellos de mercado salteados, manteca noisette, queso parmesano estacionado 24 meses y perfume de trufa negra fresca.",
    imageUrl: "/assets/mojo-bowl-ropa-vieja.jpg",
    authorNote: "plato insignia de noche & jazz",
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
      className="relative scroll-mt-[var(--header-h)] bg-leaf-green py-16 sm:py-24 overflow-hidden"
    >
      {/* Miniatura Fotográfica Flotante al Cursor (Solo Desktop) */}
      <div
        ref={previewRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-50 hidden lg:flex flex-col overflow-hidden rounded-none bg-charcoal-ink opacity-0 w-80 h-52 select-none will-change-transform"
        style={{ transform: "translate3d(-9999px, -9999px, 0)" }}
      >
        <div className="relative h-full w-full overflow-hidden bg-charcoal-ink">
          <img
            src={activeItem.imageUrl}
            alt={activeItem.name}
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-ink/90 via-transparent to-charcoal-ink/30" />
          
          {/* Metadato superior de previsualización */}
          <div className="absolute top-2.5 left-3 flex items-center">
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-charcoal-ink bg-mojo-citrus px-2 py-0.5">
              100% FRESH, MADE AL MOMENTO
            </span>
          </div>

          {/* Nombre y etiqueta de autor inferior */}
          <div className="absolute bottom-2.5 left-3 right-3 flex flex-col leading-tight">
            <span className="font-display text-lg uppercase tracking-tight text-cream-bg font-black">
              {activeItem.name}
            </span>
            <span className="font-sans font-bold uppercase text-xs tracking-wider text-mojo-citrus">
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
          className="font-display text-4xl sm:text-6xl lg:text-7xl leading-none text-cream-bg/70 tabular-nums shrink-0"
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
      {featured ? (
        <div className="mx-auto max-w-[1600px] w-full px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
          <div className="relative w-full overflow-hidden aspect-[4/3] sm:aspect-[2/1] lg:aspect-[21/9]">
            <img
              src={featured.imageUrl}
              alt={featured.name}
              loading="lazy"
              className="h-full w-full object-cover object-center"
            />
          </div>

          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
            <div className="lg:max-w-[58%]">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-sans text-sm sm:text-xs font-bold uppercase tracking-[0.2em] text-cream-bg">
                  Plato de la casa
                </span>
                <RebelChefBadge />
              </div>
              <h3 className="mt-2 font-display text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-cream-bg leading-none">
                {featured.name}
              </h3>
              <p className="mt-4 font-sans text-base sm:text-lg text-cream-bg leading-relaxed">
                {featured.description}
              </p>
            </div>

            <div className="flex items-end gap-6 shrink-0">
              <span className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-cream-bg tabular-nums leading-none">
                ${featured.price.toFixed(2)}
              </span>
              <MagneticButton
                as="button"
                type="button"
                onClick={() => handleAddToCart(featured)}
                className="h-12 px-6 font-sans font-bold uppercase tracking-wider text-sm bg-cream-bg text-leaf-green hover:bg-charcoal-ink hover:text-cream-bg transition-colors duration-200 rounded-none flex items-center justify-center gap-2 cursor-pointer shrink-0 select-none"
                aria-label={`Add ${featured.name} to order for $${featured.price.toFixed(2)}`}
              >
                <Plus className="h-4 w-4 stroke-[3]" aria-hidden="true" />
                <span>GRAB THIS BOWL</span>
              </MagneticButton>
            </div>
          </div>
        </div>
      ) : null}

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
              className="md:border-b md:border-cream-bg/20 pb-8 md:py-8 px-0 md:px-6 flex flex-col md:flex-row md:items-center justify-between group transition-colors duration-300 md:hover:bg-black/15 relative gap-4 md:gap-6"
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
                  <h3 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-cream-bg group-hover:text-mojo-citrus transition-colors duration-200 leading-none">
                    {item.name}
                  </h3>
                </div>
                <span className="font-sans text-sm font-bold uppercase tracking-wider text-cream-bg mt-0.5 leading-snug">
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
                <p className="font-sans text-base text-cream-bg">
                  {item.description}
                </p>
              </div>

              {/* Centro: Descripción sensorial criolla (En escritorio) */}
              <div className="hidden md:flex items-center lg:w-[32%] px-2">
                <p className="font-sans text-base text-cream-bg leading-relaxed text-left line-clamp-2">
                  {item.description}
                </p>
              </div>

              {/* Derecha: Precio en gran escala y botón de corte limpio con anchos balanceados y alineación uniforme */}
              <div className="flex items-center justify-between md:justify-end gap-3 sm:gap-6 w-full md:w-[30%] shrink-0 mt-1 md:mt-0">
                <span className="text-left md:text-right font-display text-2xl sm:text-4xl font-bold tracking-tight text-cream-bg group-hover:text-mojo-citrus transition-colors duration-200 shrink-0 tabular-nums">
                  ${item.price.toFixed(2)}
                </span>
                <MagneticButton
                  as="button"
                  type="button"
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    handleAddToCart(item);
                  }}
                  className="flex-1 sm:flex-none sm:w-48 h-11 px-3 sm:px-4 font-sans font-bold uppercase tracking-wider text-sm bg-cream-bg text-leaf-green hover:bg-charcoal-ink hover:text-cream-bg transition-colors duration-200 rounded-none flex items-center justify-center gap-1.5 cursor-pointer shrink-0 select-none"
                  aria-label={`Add ${item.name} to order for $${item.price.toFixed(2)}`}
                >
                  <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[3]" aria-hidden="true" />
                  <span className="truncate">
                    {item.id.includes("bowl")
                      ? "GRAB THIS BOWL"
                      : item.id.includes("tostones")
                        ? "ORDER HOT"
                        : "FROM THE PLANCHA"}
                  </span>
                </MagneticButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CuratedMenu;
