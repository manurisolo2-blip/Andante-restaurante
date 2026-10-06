import { useRef, useState, type KeyboardEvent } from "react";
import { Plus, Check, Filter, Sparkles, Wine, Utensils } from "lucide-react";
import { useCart } from "./cart";
import { categories, menu, type MenuItem, type CategoryId } from "@/data/menu";

export interface CravStyleMenuGridProps {
  onSelect?: (item: MenuItem) => void;
}

type DietaryFilter = "all" | "gluten-free" | "vegetarian";

export function CravStyleMenuGrid({ onSelect }: CravStyleMenuGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>("entradas");
  const [dietaryFilter, setDietaryFilter] = useState<DietaryFilter>("all");
  const [clickedItemId, setClickedItemId] = useState<string | null>(null);

  const cart = useCart();
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
      const catId = categories[nextIndex]?.id;
      if (catId) {
        setSelectedCategory(catId);
      }
    }
  };

  // Filtrado reactivo por categoría y filtros visuales (Sin TACC / Vegetariano)
  const categoryItems = menu.filter((item) => item.category === selectedCategory);
  const filteredItems = categoryItems.filter((item) => {
    if (dietaryFilter === "gluten-free") {
      return item.isGlutenFree === true;
    }
    if (dietaryFilter === "vegetarian") {
      return item.isVegetarian === true;
    }
    return true;
  });

  const handleQuickAdd = (item: MenuItem) => {
    setClickedItemId(item.id);
    setTimeout(() => setClickedItemId(null), 1200);

    if (item.sidesAllowed && onSelect) {
      onSelect(item);
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
    <section id="carta-digital" className="relative w-full bg-transparent py-14 sm:py-20 overflow-hidden">
      <div className="relative mx-auto max-w-[1600px] w-full px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado Editorial Monumental */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brass mb-3">
            <Utensils className="h-4 w-4 text-amber" aria-hidden="true" />
            <span>CARTA DIGITAL INTERACTIVA · PALERMO HOLLYWOOD</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-linen leading-none">
            UN VIAJE POR EL MUNDO <span className="text-brass">A TRAVÉS DEL PALADAR</span>
          </h2>
          <p className="mt-4 font-sans text-base text-mist leading-relaxed max-w-2xl mx-auto">
            Alta cocina cosmopolita liderada por el chef ejecutivo Pablo Aroma y barra de autor dirigida por Santiago Contarino. Opciones Sin TACC garantizadas y materias primas nobles de estación.
          </p>
        </div>

        {/* 1. Pestañas Dinámicas de Categoría */}
        <div className="sticky top-[var(--header-h)] z-30 mb-8 py-3 bg-canvas/90 backdrop-blur-md border-y border-brass/15">
          <div
            ref={tablistRef}
            role="tablist"
            aria-label="Categorías de la Carta"
            className="no-scrollbar flex items-center justify-start sm:justify-center gap-2 overflow-x-auto p-1 max-w-5xl mx-auto"
          >
            {categories.map((category, index) => {
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
                  className={`relative flex min-h-11 shrink-0 items-center rounded-none px-5 py-2.5 font-sans text-xs uppercase font-bold tracking-wider transition-colors duration-200 focus:outline-none select-none cursor-pointer border ${
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
          <div className="flex items-center justify-center gap-2 pt-3">
            <span className="font-sans text-[11px] font-bold uppercase tracking-widest text-mist mr-1 flex items-center gap-1">
              <Filter className="h-3 w-3 text-amber" aria-hidden="true" />
              <span>Filtrar:</span>
            </span>
            <button
              type="button"
              onClick={() => setDietaryFilter("all")}
              className={`px-3 py-1 text-xs font-sans font-bold uppercase tracking-wider rounded-none transition-colors cursor-pointer border ${
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
              className={`px-3 py-1 text-xs font-sans font-bold uppercase tracking-wider rounded-none transition-colors cursor-pointer border ${
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
              className={`px-3 py-1 text-xs font-sans font-bold uppercase tracking-wider rounded-none transition-colors cursor-pointer border ${
                dietaryFilter === "vegetarian"
                  ? "border-emerald-500 text-emerald-400 bg-emerald-950/20"
                  : "border-brass/20 text-mist hover:text-emerald-400"
              }`}
            >
              Vegetarianos ({categoryItems.filter((i) => i.isVegetarian).length})
            </button>
          </div>
        </div>

        {/* Banner contextual de autor según pestaña */}
        {selectedCategory === "barra" && (
          <div className="mb-10 max-w-4xl mx-auto border border-brass/30 bg-surface/80 p-5 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center border border-brass text-brass shrink-0 bg-canvas">
              <Wine className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="text-left">
              <h4 className="font-display text-base font-bold uppercase tracking-wider text-brass">
                Barra de Autor &amp; Bodegas Boutique · Dirección de Santiago Contarino
              </h4>
              <p className="font-sans text-xs text-mist leading-relaxed">
                Coctelería clásica reinterpretada con botánicos locales, bitters caseros y cuidada selección de etiquetas y vinos de corte de pequeños productores argentinos.
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
              <h4 className="font-display text-base font-bold uppercase tracking-wider text-brass">
                Pastelería Artesanal &amp; Panadería de Masa Madre · Chef Ejecutivo Pablo Aroma (ex Nicky Harrison)
              </h4>
              <p className="font-sans text-xs text-mist leading-relaxed">
                Precisión técnica de pastelería volcada a la fermentación lenta de 48 horas, medialunas artesanales y la célebre Torta Vasca (San Sebastián).
              </p>
            </div>
          </div>
        )}

        {/* Retícula de Platos */}
        <div
          id="menu-grid-panel"
          role="tabpanel"
          aria-labelledby={`tab-${selectedCategory}`}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {filteredItems.map((item) => {
            const isAdded = clickedItemId === item.id;

            return (
              <article
                key={item.id}
                className="group relative flex flex-col justify-between border border-brass/20 bg-surface/70 transition-all duration-300 hover:border-brass hover:shadow-2xl hover:shadow-brass/5"
              >
                <div>
                  {/* Imagen y botón de visualización */}
                  <div className="relative aspect-video w-full overflow-hidden bg-canvas">
                    <button
                      type="button"
                      onClick={() => onSelect?.(item)}
                      aria-label={`View details for ${item.name}`}
                      className="w-full h-full text-left cursor-pointer focus:outline-none"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                      />
                    </button>
                    {item.badge && (
                      <span className="absolute top-3 left-3 bg-canvas/90 border border-brass/40 px-2.5 py-1 text-[11px] font-sans font-bold uppercase tracking-wider text-brass backdrop-blur-sm pointer-events-none">
                        {item.badge}
                      </span>
                    )}
                    {item.isGlutenFree && (
                      <span className="absolute top-3 right-3 bg-amber/90 px-2 py-0.5 text-[10px] font-sans font-black uppercase tracking-wider text-canvas pointer-events-none">
                        Sin TACC
                      </span>
                    )}
                  </div>

                  {/* Cuerpo de la Tarjeta */}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-linen group-hover:text-brass transition-colors">
                        {item.name}
                      </h3>
                      <span className="font-display text-2xl font-bold text-brass shrink-0 tabular-nums">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>

                    <p className="font-sans text-xs sm:text-sm text-mist leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {item.pairing && (
                      <p className="font-sans text-[11px] text-amber border-l-2 border-amber/40 pl-2.5 py-0.5 mb-2">
                        {item.pairing}
                      </p>
                    )}

                    {item.chefNotes && (
                      <p className="font-sans text-[11px] text-linen/70 italic border-l-2 border-brass/30 pl-2.5 py-0.5">
                        Nota del Chef: {item.chefNotes}
                      </p>
                    )}
                  </div>
                </div>

                {/* Pie de Acción */}
                <div className="p-6 pt-0 border-t border-brass/10 mt-4 flex items-center justify-between gap-3">
                  <span className="text-[11px] font-sans text-mist uppercase tracking-wider">
                    {item.sidesAllowed ? "Personalizable" : "Listo al compás"}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleQuickAdd(item)}
                    aria-label={`Add ${item.name} to order`}
                    className={`inline-flex min-h-11 items-center gap-2 rounded-none px-5 py-2.5 font-sans text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer select-none border ${
                      isAdded
                        ? "bg-amber text-canvas border-amber"
                        : "bg-brass text-canvas border-brass hover:bg-linen"
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="h-4 w-4 stroke-[3]" aria-hidden="true" />
                        <span>AGREGADO</span>
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4 stroke-[3]" aria-hidden="true" />
                        <span>{item.sidesAllowed ? "PERSONALIZAR" : "AGREGAR"}</span>
                      </>
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16 border border-brass/15 bg-surface/40">
            <p className="font-sans text-base text-mist">
              No se encontraron platos para el filtro seleccionado.
            </p>
            <button
              type="button"
              onClick={() => setDietaryFilter("all")}
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
