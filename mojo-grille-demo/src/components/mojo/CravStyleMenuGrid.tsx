import { useRef, useState, type KeyboardEvent } from "react";
import { Plus, Check, ArrowRight } from "lucide-react";
import { useCart } from "./cart";
import { isBadgeType, isCategoryId } from "@/types/mojo";
import { type MenuItem } from "@/data/menu";

import chickenImg from "@/assets/mojo-pollo-bowl.jpg";
import cubanImg from "@/assets/mojo-cubano.jpg";
import porkImg from "@/assets/mojo-bowl-ropa-vieja.jpg";
import tostonesImg from "@/assets/mojo-tostones.jpg";
import cafecitoImg from "@/assets/mojo-cafecito.jpg";

export type CategoryFilter = "favorites" | "bowls" | "sandwiches" | "sides" | "drinks";

export interface CategoryTabItem {
  id: CategoryFilter;
  label: string;
}

export interface CravMenuItem {
  id: string;
  name: string;
  category: "bowls" | "sandwiches" | "sides" | "drinks";
  isFavorite?: boolean;
  price: number;
  description: string;
  imageUrl: string;
  badgeType: "signature" | "fresh" | "top_seller";
  badgeText: string;
  sidesAllowed?: boolean;
}

const CATEGORIES: CategoryTabItem[] = [
  { id: "favorites", label: "Favoritos" },
  { id: "bowls", label: "Cocina de Mercado" },
  { id: "sandwiches", label: "Bistró de Autor" },
  { id: "sides", label: "Entradas & Guarniciones" },
  { id: "drinks", label: "Café & Coctelería" },
];

const CRAV_MENU_ITEMS: CravMenuItem[] = [
  {
    id: "chicken-fresco-bowl",
    name: "Pesca del Día a la Plancha con Puré de Coliflor",
    category: "bowls",
    isFavorite: true,
    price: 15.5,
    description:
      "Pesca fresca de anzuelo sellada a fuego vivo, puré aterciopelado de coliflor asada, crocante de alcaparras baby y emulsión cítrica.",
    imageUrl: chickenImg,
    badgeType: "fresh",
    badgeText: "Sin TACC Garantizado",
    sidesAllowed: true,
  },
  {
    id: "traditional-pressed-cuban",
    name: "Sándwich Andante de Panceta & Gruyère",
    category: "sandwiches",
    isFavorite: true,
    price: 14.95,
    description:
      "Panceta confitada 8h a baja temperatura, queso gruyère fundido, mostaza en grano y pepinillos en pan crujiente dorado a la manteca.",
    imageUrl: cubanImg,
    badgeType: "top_seller",
    badgeText: "Firma Andante",
    sidesAllowed: true,
  },
  {
    id: "mojo-pulled-pork-bowl",
    name: "Bife de Chorizo Madurado con Salvia",
    category: "bowls",
    isFavorite: true,
    price: 16.95,
    description:
      "Madurado durante 28 días, sellado a las brasas con manteca noisette de salvia, milhojas de papa crocante y demi-glace artesanal.",
    imageUrl: porkImg,
    badgeType: "signature",
    badgeText: "Firma Andante",
    sidesAllowed: true,
  },
  {
    id: "ropa-vieja-bowl",
    name: "Risotto de Hongos Silvestres & Trufa Negra",
    category: "bowls",
    isFavorite: false,
    price: 15.95,
    description:
      "Arroz carnaroli al dente, gírgolas de mercado, manteca noisette, queso parmesano estacionado 24 meses y gotas de trufa negra.",
    imageUrl: porkImg,
    badgeType: "signature",
    badgeText: "100% Sin TACC",
    sidesAllowed: true,
  },
  {
    id: "yuca-frita-mojo",
    name: "Burrata Cremosa de Tandil & Higos Asados",
    category: "sides",
    isFavorite: true,
    price: 7.5,
    description:
      "Burrata fresca con tomates reliquia confitados, higos asados al horno de leña, pesto de albahaca fresca y pistachos tostados.",
    imageUrl: tostonesImg,
    badgeType: "fresh",
    badgeText: "Sin TACC",
    sidesAllowed: false,
  },
  {
    id: "tostones-crunch",
    name: "Croquetas de Jamón Ibérico & Alioli",
    category: "sides",
    isFavorite: false,
    price: 6.95,
    description:
      "Cuatro piezas doradas de bechamel sedosa con jamón de bellota, fritas al momento y acompañadas de alioli de ajo asado.",
    imageUrl: tostonesImg,
    badgeType: "top_seller",
    badgeText: "Popular",
    sidesAllowed: false,
  },
  {
    id: "cafecito-cubano-colada",
    name: "Espresso Doble de Especialidad (Huila)",
    category: "drinks",
    isFavorite: true,
    price: 3.5,
    description:
      "Granos de origen único tostados artesanalmente. Extracción precisa en máquina espresso con notas a chocolate amargo y avellanas.",
    imageUrl: cafecitoImg,
    badgeType: "signature",
    badgeText: "Firma Andante",
    sidesAllowed: false,
  },
  {
    id: "guayaba-lemonade",
    name: "Cóctel de Autor 'Compás 76' (Bourbon & Cacao)",
    category: "drinks",
    isFavorite: false,
    price: 9.5,
    description:
      "Bourbon añejo infusionado con nibs de cacao criollo, vermut rosso artesanal, bitter aromático y aceite esencial de naranja flameada.",
    imageUrl: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
    badgeType: "top_seller",
    badgeText: "Coctelería de Autor",
    sidesAllowed: false,
  },
];

/**
 * Reparto del collage sobre una retícula de 6 columnas.
 *
 * El número de platos cambia con la pestaña (favoritos 5, bowls 3, cubanos 1,
 * pa' picar 2, bebidas 2), así que un patrón fijo dejaría filas a medias. Este
 * reparto consume los platos en bloques que siempre suman 6 columnas por fila,
 * y cuando quedan pocos ensancha los últimos para que ninguno se quede solo
 * ocupando un tercio con dos huecos al lado.
 *
 * El ritmo base 4-2-2-2-2 es lo que rompe la sensación de plantilla: una pieza
 * grande abre, y debajo tres estrechas de proporciones distintas.
 */
const SPAN_CLASS: Record<number, string> = {
  2: "lg:col-span-2",
  3: "lg:col-span-3",
  4: "lg:col-span-4",
  6: "lg:col-span-6",
};

interface BentoCell {
  span: number;
  ratio: string;
  /** Piezas de media anchura o más: llevan el texto en fila, no apilado. */
  wide: boolean;
}

function ratioFor(span: number, index: number): string {
  // El primer valor es el de móvil, donde la pieza ocupa el ancho completo:
  // una proporción de 21/9 ahí dejaba la foto en una franja de 147px. Las
  // proporciones apaisadas del collage entran sólo a partir de lg, que es
  // cuando la pieza vuelve a ser una columna estrecha.
  if (span === 6) return "aspect-[4/3] lg:aspect-[21/9]";
  if (span === 4) return "aspect-square lg:aspect-[16/10]";
  if (span === 3) return "aspect-[4/3]";
  // Las estrechas alternan retrato y cuadrado para que no se lean como una fila.
  return index % 2 === 0 ? "aspect-[3/4]" : "aspect-square";
}

function bentoLayout(count: number): BentoCell[] {
  const spans: number[] = [];
  let i = 0;
  while (i < count) {
    const left = count - i;
    if (left >= 5) {
      spans.push(4, 2, 2, 2, 2);
      i += 5;
    } else if (left === 4) {
      spans.push(4, 2, 3, 3);
      i += 4;
    } else if (left === 3) {
      spans.push(4, 2, 6);
      i += 3;
    } else if (left === 2) {
      spans.push(4, 2);
      i += 2;
    } else {
      spans.push(6);
      i += 1;
    }
  }
  return spans.map((span, index) => ({
    span,
    ratio: ratioFor(span, index),
    wide: span >= 4,
  }));
}

/**
 * Convierte una fila del catálogo local a `MenuItem` validando los campos
 * acotados en vez de castearlos a ciegas: una categoría o un badge fuera del
 * dominio se descartan en lugar de propagar un MenuItem inválido.
 */
function toMenuItem(item: CravMenuItem): MenuItem {
  return {
    id: item.id,
    name: item.name,
    category: isCategoryId(item.category) ? item.category : "favoritos",
    price: item.price,
    description: item.description,
    image: item.imageUrl,
    badge: isBadgeType(item.badgeText) ? item.badgeText : undefined,
    sidesAllowed: Boolean(item.sidesAllowed),
  };
}

export function CravStyleMenuGrid({
  onSelect,
}: {
  onSelect?: (item: MenuItem) => void;
}) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("favorites");
  const [clickedItemId, setClickedItemId] = useState<string | null>(null);
  const cart = useCart();
  const tablistRef = useRef<HTMLDivElement>(null);

  /**
   * Navegación por flechas del patrón ARIA de pestañas. Sin esto el tablist
   * anuncia "pestaña 1 de 5" y luego no responde a las teclas con las que un
   * usuario de lector de pantalla espera moverse entre ellas.
   *
   * Home y End saltan a los extremos; el recorrido es circular.
   */
  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const lastIndex = CATEGORIES.length - 1;
    let nextIndex: number | null = null;

    if (event.key === "ArrowRight") nextIndex = index === lastIndex ? 0 : index + 1;
    else if (event.key === "ArrowLeft") nextIndex = index === 0 ? lastIndex : index - 1;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = lastIndex;

    if (nextIndex === null) return;
    event.preventDefault();

    const next = CATEGORIES[nextIndex];
    if (!next) return;
    setSelectedCategory(next.id);
    tablistRef.current
      ?.querySelector<HTMLButtonElement>(`#tab-${next.id}`)
      ?.focus();
  };

  const filteredItems = CRAV_MENU_ITEMS.filter((item) => {
    if (selectedCategory === "favorites") {
      return item.isFavorite === true;
    }
    return item.category === selectedCategory;
  });

  const layout = bentoLayout(filteredItems.length);

  const handleQuickAdd = (item: CravMenuItem) => {
    setClickedItemId(item.id);
    setTimeout(() => setClickedItemId(null), 1200);

    if (item.sidesAllowed && onSelect) {
      onSelect({ ...toMenuItem(item), sidesAllowed: true });
    } else {
      cart.add({
        itemId: item.id,
        name: item.name,
        price: item.price,
        sides: [],
      });
    }
  };

  return (
    <section className="relative w-full bg-transparent py-10 sm:py-16 overflow-hidden">
      <div className="relative mx-auto max-w-[1600px] w-full px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado con tipografía monumental y acento editorial */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-charcoal-ink leading-none">
            SLOW ROASTED, SERVED <span className="text-brand-fire">AL MOMENTO</span>.
          </h2>
          <p className="mt-2 font-sans text-sm font-bold uppercase tracking-[0.18em] text-leaf-green">
            AUTHENTIC CRIOLLO FLAVORS, GENERATIONAL RECIPES
          </p>
          <p className="mt-3 font-sans text-base text-charcoal-ink/80 leading-relaxed max-w-2xl mx-auto">
            Prepared fresh in Little Havana, Brickell, and Doral with 24 hours of marinade in Seville sour orange, crushed garlic, and fresh oregano.
          </p>
        </div>

        {/* 1. Pestañas de Categorías con Retícula de Ángulo Recto (100% Unificado) */}
        {/*
          La barra se pega justo bajo la cabecera usando su alto medido
          (--header-h). Con valores fijos se desajustaba en cada breakpoint.
        */}
        <div className="sticky top-[var(--header-h)] z-30 mb-10 py-2.5 bg-cream-bg">
          <div
            ref={tablistRef}
            role="tablist"
            aria-label="Menu Categories"
            className="no-scrollbar flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto p-1 rounded-none bg-transparent max-w-4xl mx-auto"
          >
            {CATEGORIES.map((category, index) => {
              const isSelected = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  id={`tab-${category.id}`}
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls="menu-grid-panel"
                  // Foco itinerante: sólo la pestaña activa está en el
                  // recorrido del tabulador, el resto se alcanza con flechas.
                  tabIndex={isSelected ? 0 : -1}
                  type="button"
                  onClick={() => setSelectedCategory(category.id)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                  className={`relative flex min-h-11 shrink-0 items-center rounded-none px-5 py-2.5 font-sans text-sm sm:text-xs uppercase font-bold tracking-wider transition-colors duration-200 focus:outline-none select-none ${
                    isSelected
                      ? "bg-charcoal-ink text-cream-bg"
                      : "bg-transparent text-charcoal-ink hover:text-leaf-green hover:bg-charcoal-ink/5"
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>

        {/*
          2. Collage editorial. No es una retícula uniforme: cada plato recibe
          un ancho y una proporción distintos según su turno en el ritmo, y el
          bloque de texto cambia de disposición entre las piezas anchas
          (nombre y descripción a un lado, precio y acción al otro) y las
          estrechas (todo apilado). Ver `bentoLayout` para el reparto.
        */}
        <div
          id="menu-grid-panel"
          role="tabpanel"
          aria-labelledby={`tab-${selectedCategory}`}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-x-6 gap-y-12 sm:gap-x-8 sm:gap-y-14"
        >
          {filteredItems.map((item, index) => {
            const isAdded = clickedItemId === item.id;
            const cell = layout[index] ?? { span: 2, ratio: "aspect-square", wide: false };

            const priceBlock = (
              <div className="shrink-0">
                <span className="font-sans text-sm sm:text-xs font-bold uppercase tracking-wider text-charcoal-ink/60 block">
                  PRICE
                </span>
                <span className="font-display text-3xl font-black text-charcoal-ink tabular-nums">
                  ${item.price.toFixed(2)}
                </span>
              </div>
            );

            const addButton = (
              <button
                type="button"
                onClick={() => handleQuickAdd(item)}
                aria-label={
                  item.sidesAllowed
                    ? `Choose sides for ${item.name} and add to order`
                    : `Add ${item.name} to order`
                }
                className={`relative inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-none px-4 py-2.5 font-sans text-sm sm:text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer select-none ${
                  isAdded
                    ? "bg-leaf-green text-cream-bg"
                    : "bg-charcoal-ink text-cream-bg hover:bg-brand-fire hover:text-charcoal-ink"
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="h-4 w-4 stroke-[3]" aria-hidden="true" />
                    <span>ADDED</span>
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 stroke-[3]" aria-hidden="true" />
                    <span>{item.sidesAllowed ? "CHOOSE & ADD" : "ADD TO ORDER"}</span>
                  </>
                )}
              </button>
            );

            return (
              <article
                key={item.id}
                className={`group relative flex flex-col ${SPAN_CLASS[cell.span]} ${
                  cell.wide ? "sm:col-span-2" : ""
                }`}
              >
                {/*
                  La foto es un <button>: abrir la ficha con ingredientes y
                  guarniciones era imposible con teclado porque este es el
                  único acceso desde la pieza.
                */}
                <button
                  type="button"
                  onClick={() => onSelect?.(toMenuItem(item))}
                  aria-label={`View details for ${item.name}`}
                  className={`relative block w-full overflow-hidden rounded-none cursor-pointer ${cell.ratio}`}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    loading="lazy"
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                </button>

                {cell.wide ? (
                  <div className="mt-5 flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-10">
                    <div className="md:max-w-[62%]">
                      <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-charcoal-ink group-hover:text-brand-fire transition-colors leading-none">
                        {item.name}
                      </h3>
                      <p className="mt-3 font-sans text-base text-charcoal-ink/75 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex items-end gap-6">
                      {priceBlock}
                      {addButton}
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 flex flex-1 flex-col">
                    <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-charcoal-ink group-hover:text-brand-fire transition-colors leading-tight">
                      {item.name}
                    </h3>
                    <p className="mt-2 font-sans text-base text-charcoal-ink/75 line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>
                    <div className="mt-auto flex items-end justify-between gap-4 pt-5">
                      {priceBlock}
                      {addButton}
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {/* Bloque editorial de consulta personalizada */}
        <div className="mt-14 rounded-none bg-transparent p-6 sm:p-8 text-center">
          <p className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-charcoal-ink font-bold">
            NEED INGREDIENT DETAILS OR A CUSTOM ORDER?
          </p>
          <p className="mt-2 font-sans text-base text-charcoal-ink/80 max-w-xl mx-auto">
            Our team in Little Havana and Brickell is ready to answer questions and customize your order al momento.
          </p>
          <div className="mt-5">
            <a
              href={`https://wa.me/${cart.location.phoneRaw}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-none bg-brand-fire px-7 py-3.5 font-sans text-sm font-bold uppercase tracking-wider text-charcoal-ink hover:bg-charcoal-ink hover:text-cream-bg transition-colors cursor-pointer select-none"
            >
              <span>Inquire via WhatsApp</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

export default CravStyleMenuGrid;
