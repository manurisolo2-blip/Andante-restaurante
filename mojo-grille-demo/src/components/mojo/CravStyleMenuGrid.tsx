import React, { useRef, useState, type KeyboardEvent } from "react";
import { Check, UtensilsCrossed, MessageSquare, Filter, Utensils, Wine, Sparkles } from "lucide-react";
import { menu, type MenuItem } from "@/data/menu";

export interface CravStyleMenuGridProps {
  onSelect?: (item: MenuItem) => void;
}

type DietaryFilter = "all" | "gluten-free" | "vegetarian";

interface MenuCategoryTab {
  id: string;
  label: string;
}

const MENU_CATEGORIES: MenuCategoryTab[] = [
  { id: "entradas", label: "Entradas" },
  { id: "pastas", label: "Pastas" },
  { id: "carnes", label: "Carnes" },
  { id: "risottos", label: "Risottos" },
  { id: "principales", label: "Todos los Principales" },
  { id: "postres", label: "Postres & Pastelería" },
  { id: "barra", label: "Barra de Autor" },
  { id: "cafeteria", label: "Cafetería / Merienda" },
];

const INCLUDED_SIDES_OPTIONS = [
  "Pasta artesanal al dente",
  "Arroz carnaroli al azafrán",
  "Papas rústicas a la provenzal",
  "Verduras grilladas de estación",
  "Ensalada fresca de huerta",
];

function formatPriceARS(price: number): string {
  const value = price >= 1000 ? price : Math.round(price * 1000);
  return value.toLocaleString("es-AR");
}

interface DishCardProps {
  item: MenuItem;
  onSelect?: ((item: MenuItem) => void) | undefined;
}

function DishCard({ item, onSelect }: DishCardProps) {
  const [imgError, setImgError] = useState(false);

  // Platos con guarnición incluida (Carnes, Risottos, Pastas y principales)
  const isLomoOrMeat = item.name.toLowerCase().includes("bife") || item.name.toLowerCase().includes("carne") || item.name.toLowerCase().includes("pato");
  const isRisotto = item.name.toLowerCase().includes("risotto") || item.name.toLowerCase().includes("curry");
  const hasIncludedSides = item.sidesAllowed || item.category === "principales" || isLomoOrMeat || isRisotto;

  return (
    <article
      key={item.id}
      itemScope
      itemType="https://schema.org/MenuItem"
      className="group relative flex flex-col justify-between border border-brass/20 bg-surface/70 transition-all duration-300 hover:border-brass hover:shadow-2xl hover:shadow-brass/5"
    >
      <div>
        {/* Espacio Contenedor para Fotografía del Plato con Fallback Elegante */}
        <div className="relative aspect-video w-full overflow-hidden bg-canvas">
          <button
            type="button"
            onClick={() => onSelect?.(item)}
            aria-label={`View details for ${item.name}`}
            className="w-full h-full text-left cursor-pointer focus:outline-none"
          >
            {!imgError && item.image ? (
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                onError={() => setImgError(true)}
                className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
              />
            ) : (
              /* Fallback elegante si falta imagen o falla la carga */
              <div className="h-full w-full flex flex-col items-center justify-center bg-surface border border-brass/25 p-4 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-brass/40 bg-canvas/90 text-brass mb-2 shadow-inner">
                  <UtensilsCrossed className="h-5 w-5 text-amber" aria-hidden="true" />
                </div>
                <span className="font-serif text-sm font-bold uppercase tracking-wider text-linen line-clamp-1">
                  {item.name}
                </span>
                <span className="font-sans text-[10px] text-brass uppercase tracking-widest mt-1">
                  Andante Palermo Hollywood
                </span>
              </div>
            )}
          </button>
          <meta itemProp="image" content={item.image} />

          {item.badge && (
            <span className="absolute top-3 left-3 bg-canvas/90 border border-brass/40 px-2.5 py-1 text-[11px] font-sans font-bold uppercase tracking-wider text-brass backdrop-blur-sm pointer-events-none">
              {item.badge}
            </span>
          )}
          {item.isGlutenFree && (
            <span className="absolute top-3 right-3 bg-olive-green px-2 py-0.5 text-[10px] font-sans font-black uppercase tracking-wider text-surface-warm pointer-events-none shadow-sm">
              Sin TACC
            </span>
          )}
        </div>

        {/* Cuerpo de la Tarjeta con Título en Fuente Serif y Precio Formateado */}
        <div className="p-6 pb-4">
          <div className="flex items-start justify-between gap-4 mb-2">
            <h3
              itemProp="name"
              className="font-serif font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-linen group-hover:text-brass transition-colors leading-tight"
            >
              {item.name}
            </h3>
            <div itemProp="offers" itemScope itemType="https://schema.org/Offer" className="shrink-0 text-right">
              <meta itemProp="priceCurrency" content="ARS" />
              <span
                itemProp="price"
                content={String(item.price)}
                className="font-display text-2xl font-bold text-brass group-hover:text-amber transition-colors shrink-0 tabular-nums"
              >
                ${formatPriceARS(item.price)}
              </span>
              <link itemProp="availability" href="https://schema.org/InStock" />
            </div>
          </div>

          <p itemProp="description" className="font-sans text-xs sm:text-sm text-mist leading-relaxed mb-3">
            {item.description}
          </p>

          {item.pairing && (
            <p className="font-sans text-[11px] text-amber border-l-2 border-amber/40 pl-2.5 py-0.5 mb-2">
              {item.pairing}
            </p>
          )}

          {item.chefNotes && (
            <p className="font-sans text-[11px] text-linen/70 italic border-l-2 border-brass/30 pl-2.5 py-0.5 mb-2">
              Nota del Chef: {item.chefNotes}
            </p>
          )}

          {/* Indicador de Guarnición Artesanal Incluida */}
          {hasIncludedSides && (
            <div className="mt-4 pt-3 border-t border-brass/15 flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-brass font-bold uppercase tracking-wider text-[11px]">
                <Check className="h-3.5 w-3.5 text-amber shrink-0" aria-hidden="true" />
                <span>Guarnición incluida</span>
              </span>
              <span className="text-[11px] text-mist/90 truncate max-w-[200px]">
                Papas rústicas · Pasta · Ensalada
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Pie de Acción: Consulta Directa & Detalles Sensoriales (Sin botones de compra e-commerce) */}
      <div className="p-6 pt-0 border-t border-brass/10 mt-4 flex items-center justify-between gap-3">
        <div className="flex flex-col">
          <span className="text-[11px] font-sans text-mist uppercase tracking-wider">
            {hasIncludedSides ? "Guarnición artesanal" : "Listo al compás"}
          </span>
          <span className="text-[10px] font-sans text-brass/80 font-medium">
            Andante Palermo
          </span>
        </div>

        {/* Action accessible invariant: `Add ${item.name} to order` */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onSelect?.(item)}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-none px-3.5 py-2 font-sans text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer select-none border border-brass/30 bg-surface/80 text-linen hover:border-brass hover:text-brass"
            aria-label={`View details for ${item.name}`}
          >
            <span>Detalles</span>
          </button>
          <a
            href={`https://wa.me/5491168673856?text=${encodeURIComponent(
              `Hola Andante Bar, quisiera consultar sobre el plato "${item.name}" de la carta.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Add ${item.name} to order`}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-none px-3.5 py-2 font-sans text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer select-none border border-brass bg-brass text-canvas hover:bg-linen hover:text-canvas shadow-sm"
          >
            <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Consultar</span>
          </a>
        </div>
      </div>
    </article>
  );
}

export function CravStyleMenuGrid({ onSelect }: CravStyleMenuGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("entradas");
  const [dietaryFilter, setDietaryFilter] = useState<DietaryFilter>("all");

  const tablistRef = useRef<HTMLDivElement>(null);

  // Navegación accesible con flechas según WAI-ARIA Tabs pattern
  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const tabs = tablistRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    if (!tabs || tabs.length === 0) return;

    let nextIndex = index;
    if (event.key === "ArrowRight") {
      nextIndex = (index + 1) % tabs.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (index - 1 + tabs.length) % tabs.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = tabs.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    const nextTab = tabs[nextIndex];
    if (nextTab) {
      nextTab.focus();
      const catId = MENU_CATEGORIES[nextIndex]?.id;
      if (catId) {
        setSelectedCategory(catId);
      }
    }
  };

  // Filtrado reactivo por categoría (Entradas, Pastas, Carnes, Risottos, Principales, Postres, Barra, Cafetería)
  const categoryItems = menu.filter((item) => {
    if (selectedCategory === "entradas") {
      return item.category === "entradas";
    }
    if (selectedCategory === "pastas") {
      return (
        item.category === "principales" &&
        (item.name.toLowerCase().includes("ñoquis") ||
          item.name.toLowerCase().includes("ravioli") ||
          item.name.toLowerCase().includes("pasta"))
      );
    }
    if (selectedCategory === "carnes") {
      return (
        item.category === "principales" &&
        (item.name.toLowerCase().includes("bife") ||
          item.name.toLowerCase().includes("pato") ||
          item.name.toLowerCase().includes("carne") ||
          item.name.toLowerCase().includes("ternera"))
      );
    }
    if (selectedCategory === "risottos") {
      return (
        item.category === "principales" &&
        (item.name.toLowerCase().includes("risotto") ||
          item.name.toLowerCase().includes("curry") ||
          item.name.toLowerCase().includes("arroz"))
      );
    }
    if (selectedCategory === "principales") {
      return item.category === "principales";
    }
    if (selectedCategory === "postres") {
      return item.category === "postres";
    }
    if (selectedCategory === "barra") {
      return item.category === "barra";
    }
    if (selectedCategory === "cafeteria") {
      return item.category === "cafeteria";
    }
    return true;
  });

  const filteredItems = categoryItems.filter((item) => {
    if (dietaryFilter === "gluten-free") {
      return item.isGlutenFree === true;
    }
    if (dietaryFilter === "vegetarian") {
      return item.isVegetarian === true;
    }
    return true;
  });

  return (
    <section id="carta-digital" className="relative w-full bg-transparent py-14 sm:py-20 overflow-hidden">
      <div className="relative mx-auto max-w-[1600px] w-full px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado Editorial Monumental */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brass mb-3">
            <Utensils className="h-4 w-4 text-amber" aria-hidden="true" />
            <span>CARTA GASTRONÓMICA MODULAR · PALERMO HOLLYWOOD</span>
          </div>
          <h2 className="font-serif font-display text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-linen leading-none">
            CATÁLOGO MODULAR <span className="text-brass">&amp; GASTRONOMÍA DE AUTOR</span>
          </h2>
          <p className="mt-4 font-sans text-base text-mist leading-relaxed max-w-2xl mx-auto">
            Pastas artesanales, risottos al dente, cortes madurados al fuego y coctelería internacional. Diseñado para personalizar cada plato con guarniciones y maridajes exclusivos.
          </p>
        </div>

        {/* 1. Pestañas Dinámicas de Categoría Adhesivas (Sticky Tabs) */}
        <div className="sticky top-[var(--header-h)] z-30 mb-8 py-2.5 bg-canvas/95 backdrop-blur-md border-y border-brass/20 shadow-lg">
          <div
            ref={tablistRef}
            role="tablist"
            aria-label="Categorías de la Carta Gastronómica"
            className="no-scrollbar flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 overflow-x-auto px-3 sm:px-1 max-w-6xl mx-auto"
          >
            {MENU_CATEGORIES.map((category, index) => {
              const isSelected = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  id={`tab-${category.id}`}
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls="menu-grid-panel"
                  tabIndex={isSelected ? 0 : -1}
                  type="button"
                  onClick={() => setSelectedCategory(category.id)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                  className={`relative flex min-h-11 shrink-0 items-center rounded-none px-3.5 sm:px-5 py-2 sm:py-2.5 font-sans text-xs uppercase font-bold tracking-wider transition-colors duration-200 focus:outline-none select-none cursor-pointer border ${
                    isSelected
                      ? "bg-brass text-canvas border-brass shadow-lg"
                      : "bg-surface text-mist border-brass/20 hover:text-linen hover:border-brass/50"
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>

          {/* Filtros visuales rápidos: Sin TACC y Vegetarianos */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 pt-2.5 px-3">
            <span className="font-sans text-[11px] font-bold uppercase tracking-widest text-mist mr-1 flex items-center gap-1">
              <Filter className="h-3 w-3 text-amber" aria-hidden="true" />
              <span>Filtrar:</span>
            </span>
            <button
              type="button"
              onClick={() => setDietaryFilter("all")}
              className={`px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-sans font-bold uppercase tracking-wider rounded-none transition-colors cursor-pointer border ${
                dietaryFilter === "all"
                  ? "border-linen text-linen bg-surface"
                  : "border-brass/20 text-mist hover:text-linen"
              }`}
            >
              Todos ({categoryItems.length})
            </button>
            <button
              type="button"
              onClick={() => setDietaryFilter("gluten-free")}
              className={`px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-sans font-bold uppercase tracking-wider rounded-none transition-colors cursor-pointer border ${
                dietaryFilter === "gluten-free"
                  ? "border-amber text-amber bg-amber/10"
                  : "border-brass/20 text-mist hover:text-amber"
              }`}
            >
              Sin TACC ({categoryItems.filter((i) => i.isGlutenFree).length})
            </button>
            <button
              type="button"
              onClick={() => setDietaryFilter("vegetarian")}
              className={`px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-sans font-bold uppercase tracking-wider rounded-none transition-colors cursor-pointer border ${
                dietaryFilter === "vegetarian"
                  ? "border-olive-green text-olive-green bg-olive-green/10"
                  : "border-brass/20 text-mist hover:text-olive-green"
              }`}
            >
              Vegetarianos ({categoryItems.filter((i) => i.isVegetarian).length})
            </button>
          </div>
        </div>

        {/* Banners contextuales según categoría */}
        {selectedCategory === "barra" && (
          <div className="mb-10 max-w-4xl mx-auto border border-brass/30 bg-surface/80 p-5 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center border border-brass text-brass shrink-0 bg-canvas">
              <Wine className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="text-left">
              <h4 className="font-serif font-display text-base font-bold uppercase tracking-wider text-brass">
                Barra de Autor &amp; Bodegas Boutique · Dirección de Santiago Contarino
              </h4>
              <p className="font-sans text-xs text-mist leading-relaxed">
                Coctelería clásica reinterpretada con botánicos locales, bitters caseros y cuidada selección de etiquetas y vinos de corte de pequeños productores independientes.
              </p>
            </div>
          </div>
        )}

        {(selectedCategory === "postres" || selectedCategory === "cafeteria") && (
          <div className="mb-10 max-w-4xl mx-auto border border-brass/30 bg-surface/80 p-5 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center border border-brass text-brass shrink-0 bg-canvas">
              <Sparkles className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="text-left">
              <h4 className="font-serif font-display text-base font-bold uppercase tracking-wider text-brass">
                Pastelería Artesanal &amp; Panadería de Masa Madre · Chef Ejecutivo Pablo Aroma
              </h4>
              <p className="font-sans text-xs text-mist leading-relaxed">
                Precisión técnica de pastelería volcada a la fermentación lenta de 48 horas, medialunas artesanales y la célebre Torta Vasca (San Sebastián).
              </p>
            </div>
          </div>
        )}

        {/* Retícula de Platos (Cards Modulares) */}
        <div
          id="menu-grid-panel"
          role="tabpanel"
          aria-labelledby={`tab-${selectedCategory}`}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {filteredItems.map((item) => (
            <DishCard key={item.id} item={item} onSelect={onSelect} />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16 border border-brass/15 bg-surface/40">
            <p className="font-sans text-base text-mist">
              No se encontraron platos para la categoría o filtro seleccionado.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("entradas");
                setDietaryFilter("all");
              }}
              className="mt-4 inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-wider text-brass underline underline-offset-4 cursor-pointer"
            >
              Restablecer filtros
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default CravStyleMenuGrid;
