import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import {
  Search,
  Sun,
  Moon,
  Sparkles,
  ArrowLeft,
  CalendarHeart,
  MessageSquare,
  Clock,
  MapPin,
  Flame,
  Wheat,
  Leaf,
  Coffee,
  Wine,
  Utensils,
  Share2,
  Check,
} from "lucide-react";
import { FULL_MENU_ITEMS, FULL_MENU_CATEGORIES, type FullMenuItem } from "@/data/fullMenu";
import { ReservationModal } from "@/components/mojo/ReservationModal";
import { FloatingContactWidget } from "@/components/mojo/FloatingContactWidget";
import { EditorialFooter } from "@/components/mojo/EditorialFooter";
import { AndanteAstrolabe } from "@/components/mojo/TopBar";

const title = "Menú Completo | Andante Restaurante Bar - Arévalo 1677 Palermo";
const description =
  "Explorá la carta completa de Andante Restaurante Bar: desayunos, tostones, sandwiches, menú ejecutivo, principales al fuego, coctelería de autor y opciones Sin TACC garantizadas.";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "https://andantebar.com.ar/menu" },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  const [activeSection, setActiveSection] = useState<"todos" | "dia" | "noche">("todos");
  const [activeDietary, setActiveDietary] = useState<"todos" | "sintacc" | "vegetariano" | "picante">("todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [reservationOpen, setReservationOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filtrado reactivo en memoria
  const filteredItems = useMemo(() => {
    return FULL_MENU_ITEMS.filter((item) => {
      // Filtro de horario (Día vs Noche)
      if (activeSection === "dia" && item.section === "noche") return false;
      if (activeSection === "noche" && item.section === "dia") return false;

      // Filtro dietario
      if (activeDietary !== "todos") {
        if (!item.dietary || !item.dietary.includes(activeDietary)) return false;
      }

      // Filtro de búsqueda textual
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchName = item.name.toLowerCase().includes(query);
        const matchDesc = item.description?.toLowerCase().includes(query) ?? false;
        if (!matchName && !matchDesc) return false;
      }

      return true;
    });
  }, [activeSection, activeDietary, searchQuery]);

  // Agrupar items por categoría
  const groupedCategories = useMemo(() => {
    return FULL_MENU_CATEGORIES.map((cat) => {
      const items = filteredItems.filter((i) => i.category === cat.id);
      return {
        ...cat,
        items,
      };
    }).filter((cat) => cat.items.length > 0);
  }, [filteredItems]);

  const handleShareItem = (item: FullMenuItem) => {
    const text = `Te comparto de Andante Restaurante Bar: ${item.name} (${item.formattedPrice}). Arévalo 1677, Palermo. https://andantebar.com.ar/menu#${item.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-canvas text-linen antialiased selection:bg-brass selection:text-canvas">
      {/* 1. Barra Superior Editorial de Navegación */}
      <header className="sticky top-0 z-40 w-full border-b border-brass/25 bg-canvas/90 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-mist hover:text-brass transition-colors"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Volver a Inicio</span>
              <span className="sm:hidden">Inicio</span>
            </Link>

            <span className="text-brass/40 select-none">|</span>

            <div className="flex items-center gap-2">
              <AndanteAstrolabe className="h-5 w-5 text-brass" />
              <span className="font-display text-base sm:text-lg font-black uppercase tracking-wider text-linen">
                ANDANTE <span className="text-brass">MENÚ</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setReservationOpen(true)}
              className="inline-flex min-h-[40px] items-center justify-center gap-2 bg-brass px-4 sm:px-6 py-2 font-sans text-xs font-bold uppercase tracking-wider text-canvas hover:bg-linen transition-colors cursor-pointer select-none"
            >
              <CalendarHeart className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Reservar Mesa</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Hero Editorial Monumental de la Carta */}
      <section className="relative overflow-hidden border-b border-brass/20 bg-surface/40 py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          {/* Brújula / Coordenadas de la Carta Oficial */}
          <div className="inline-flex items-center gap-2 border border-brass/30 bg-surface/80 px-4 py-1.5 mb-6 text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-brass">
            <span>5 · 4 · 3 · 2 · 1 · NORTE · 0 · 1 · 2 · 3 · 4 · 5</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-linen leading-none mb-4">
            CARTA &amp; <span className="text-brass">REPERTORIO</span> GASTRONÓMICO
          </h1>

          <p className="mx-auto max-w-2xl font-sans text-sm sm:text-base text-mist leading-relaxed mb-6">
            Cocina contemporánea de mercado, cafetería de especialidad de día y coctelería de autor nocturna. Opciones Sin TACC garantizadas y sabores del mundo en compás humano.
          </p>

          <div className="inline-flex flex-wrap items-center justify-center gap-4 text-xs font-sans text-linen/80">
            <span className="inline-flex items-center gap-1.5 text-amber">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              Arévalo 1677 - Buenos Aires
            </span>
            <span className="text-brass/40 hidden sm:inline">·</span>
            <span className="inline-flex items-center gap-1.5 text-mist">
              <Clock className="h-3.5 w-3.5 text-brass" aria-hidden="true" />
              Mar a Sáb 09:30 a 01:30 hs · Dom 09:30 a 00 hs
            </span>
          </div>
        </div>
      </section>

      {/* 3. Selector de Horario (Día vs Noche vs Todo) & Filtros Interactivos */}
      <div className="sticky top-[57px] z-30 border-b border-brass/25 bg-canvas/95 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-4 shadow-xl">
        <div className="mx-auto max-w-7xl flex flex-col gap-4">
          {/* Fila 1: Turnos (Día vs Noche) & Búsqueda */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            {/* Pestañas de Turno */}
            <div className="inline-flex rounded-none border border-brass/30 bg-surface/70 p-1 self-start">
              <button
                type="button"
                onClick={() => setActiveSection("todos")}
                className={`px-4 py-2 font-sans text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeSection === "todos"
                    ? "bg-brass text-canvas shadow-sm"
                    : "text-mist hover:text-linen"
                }`}
              >
                <span>Toda la Carta</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSection("dia")}
                className={`inline-flex items-center gap-1.5 px-4 py-2 font-sans text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeSection === "dia"
                    ? "bg-brass text-canvas shadow-sm"
                    : "text-mist hover:text-linen"
                }`}
              >
                <Sun className="h-3.5 w-3.5 text-amber" aria-hidden="true" />
                <span>De Día (Hasta 19hs)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSection("noche")}
                className={`inline-flex items-center gap-1.5 px-4 py-2 font-sans text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeSection === "noche"
                    ? "bg-brass text-canvas shadow-sm"
                    : "text-mist hover:text-linen"
                }`}
              >
                <Moon className="h-3.5 w-3.5 text-brass" aria-hidden="true" />
                <span>De Noche (Desde 19hs)</span>
              </button>
            </div>

            {/* Buscador en Vivo */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brass" aria-hidden="true" />
              <input
                type="text"
                placeholder="Buscar plato, ingrediente o cóctel..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-surface border border-brass/25 pl-10 pr-4 py-2.5 text-xs text-linen placeholder:text-mist/60 focus:border-brass focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-mist hover:text-linen"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Fila 2: Filtros Dietarios Rápidos */}
          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-brass/15">
            <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-mist mr-1">
              Preferencias:
            </span>

            <button
              type="button"
              onClick={() => setActiveDietary("todos")}
              className={`px-3 py-1.5 text-xs font-sans font-bold uppercase tracking-wider border transition-colors cursor-pointer ${
                activeDietary === "todos"
                  ? "border-brass bg-surface text-brass"
                  : "border-brass/20 text-mist hover:text-linen"
              }`}
            >
              Todos
            </button>

            <button
              type="button"
              onClick={() => setActiveDietary("sintacc")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans font-bold uppercase tracking-wider border transition-colors cursor-pointer ${
                activeDietary === "sintacc"
                  ? "border-amber bg-amber/15 text-amber"
                  : "border-brass/20 text-mist hover:text-linen"
              }`}
            >
              <Wheat className="h-3.5 w-3.5 text-amber" aria-hidden="true" />
              <span>Sin TACC</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveDietary("vegetariano")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans font-bold uppercase tracking-wider border transition-colors cursor-pointer ${
                activeDietary === "vegetariano"
                  ? "border-emerald-500 bg-emerald-950/30 text-emerald-300"
                  : "border-brass/20 text-mist hover:text-linen"
              }`}
            >
              <Leaf className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
              <span>Vegetariano</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveDietary("picante")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans font-bold uppercase tracking-wider border transition-colors cursor-pointer ${
                activeDietary === "picante"
                  ? "border-red-500 bg-red-950/30 text-red-300"
                  : "border-brass/20 text-mist hover:text-linen"
              }`}
            >
              <Flame className="h-3.5 w-3.5 text-red-400" aria-hidden="true" />
              <span>Picante</span>
            </button>

            <span className="ml-auto text-xs font-sans text-mist">
              {filteredItems.length} {filteredItems.length === 1 ? "opción" : "opciones disponibles"}
            </span>
          </div>
        </div>
      </div>

      {/* 4. Módulos Destacados: Menú Ejecutivo & Brunch */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card Destacado 1: Menú Ejecutivo */}
          <div className="border border-brass/35 bg-surface/80 p-6 sm:p-7 relative overflow-hidden shadow-xl">
            <div className="inline-block border border-amber/30 bg-amber/10 px-2.5 py-0.5 font-sans text-[10px] font-black uppercase tracking-widest text-amber mb-3">
              LUNES A VIERNES · 12 A 15 HS
            </div>
            <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-linen mb-2">
              MENÚ EJECUTIVO
            </h3>
            <p className="font-sans text-xs text-mist leading-relaxed mb-4">
              Entrada de estación + Plato principal + Bebida sin alcohol + Café de especialidad por <strong className="text-brass">$20.000</strong> (o Principal + Bebida por <strong className="text-brass">$15.000</strong>).
            </p>
            <a
              href={`https://wa.me/5491168062589?text=${encodeURIComponent(
                "Hola Andante Bar, quisiera consultar por el Menú Ejecutivo de hoy en Arévalo 1677."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-wider text-brass hover:text-linen transition-colors"
            >
              <MessageSquare className="h-3.5 w-3.5 text-amber" aria-hidden="true" />
              <span>Consultar Ejecutivo del Día</span>
            </a>
          </div>

          {/* Card Destacado 2: Experiencias Brunch */}
          <div className="border border-brass/35 bg-surface/80 p-6 sm:p-7 relative overflow-hidden shadow-xl">
            <div className="inline-block border border-brass/40 bg-canvas/60 px-2.5 py-0.5 font-sans text-[10px] font-black uppercase tracking-widest text-brass mb-3">
              TODOS LOS DÍAS HASTA LAS 19 HS
            </div>
            <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-linen mb-2">
              BRUNCH PARA 2 Y 4
            </h3>
            <p className="font-sans text-xs text-mist leading-relaxed mb-4">
              Avocado toast, huevos revueltos, yogurt con granola, medialunas rellenas, torta del día, jarras de limonada y café para dos (<strong className="text-brass">$30.000</strong>) o cuatro (<strong className="text-brass">$55.000</strong>).
            </p>
            <a
              href={`https://wa.me/5491168062589?text=${encodeURIComponent(
                "Hola Andante Bar, quisiera reservar una mesa para disfrutar la Experiencia Brunch."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-wider text-brass hover:text-linen transition-colors"
            >
              <MessageSquare className="h-3.5 w-3.5 text-amber" aria-hidden="true" />
              <span>Pedir Brunch por WhatsApp</span>
            </a>
          </div>

          {/* Card Destacado 3: Coctelería & Cava */}
          <div className="border border-brass/35 bg-surface/80 p-6 sm:p-7 relative overflow-hidden shadow-xl">
            <div className="inline-block border border-amber/30 bg-amber/10 px-2.5 py-0.5 font-sans text-[10px] font-black uppercase tracking-widest text-amber mb-3">
              BARRA NOCTURNA &amp; CAVA
            </div>
            <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-linen mb-2">
              COCTELERÍA DE AUTOR
            </h3>
            <p className="font-sans text-xs text-mist leading-relaxed mb-4">
              Desde el emblemático Paper Plate y Stone God hasta el Coco Colada 2.0 y ponches en jarra para compartir durante nuestros ciclos de jazz en vivo.
            </p>
            <button
              type="button"
              onClick={() => setReservationOpen(true)}
              className="inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-wider text-brass hover:text-linen transition-colors cursor-pointer"
            >
              <CalendarHeart className="h-3.5 w-3.5 text-amber" aria-hidden="true" />
              <span>Reservar Noche de Jazz</span>
            </button>
          </div>
        </div>
      </section>

      {/* 5. Catálogo Completo por Categorías */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {groupedCategories.length === 0 ? (
          <div className="border border-brass/25 bg-surface p-12 text-center text-linen space-y-4">
            <p className="font-display text-2xl font-bold uppercase tracking-tight text-brass">
              No se encontraron platos
            </p>
            <p className="text-sm font-sans text-mist max-w-md mx-auto">
              No encontramos opciones que coincidan con "{searchQuery}" para los filtros seleccionados. Probá limpiando el buscador.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveDietary("todos");
                setActiveSection("todos");
              }}
              className="px-6 py-2.5 bg-brass text-canvas font-sans text-xs font-bold uppercase tracking-wider hover:bg-linen transition-colors"
            >
              Restablecer Filtros
            </button>
          </div>
        ) : (
          groupedCategories.map((category) => (
            <section
              key={category.id}
              id={category.id}
              className="scroll-mt-36 space-y-6"
            >
              {/* Encabezado de Categoría */}
              <div className="border-b border-brass/20 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {category.badge && (
                      <span className="font-sans text-[10px] font-black uppercase tracking-widest text-amber border border-amber/30 bg-amber/10 px-2 py-0.5">
                        {category.badge}
                      </span>
                    )}
                    <span className="font-sans text-xs font-bold uppercase tracking-widest text-brass">
                      {category.section === "dia" ? "Servicio de Día" : category.section === "noche" ? "Servicio de Noche" : "Todo el Día"}
                    </span>
                  </div>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-linen">
                    {category.title}
                  </h2>
                  {category.subtitle && (
                    <p className="font-sans text-xs sm:text-sm text-mist mt-1">
                      {category.subtitle}
                    </p>
                  )}
                </div>

                <span className="text-xs font-sans text-mist font-semibold">
                  {category.items.length} {category.items.length === 1 ? "plato" : "platos"}
                </span>
              </div>

              {/* Grilla de Platos de la Categoría */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {category.items.map((item) => (
                  <article
                    key={item.id}
                    id={item.id}
                    className="group relative flex flex-col justify-between border border-brass/20 bg-surface/70 p-5 sm:p-6 transition-all duration-300 hover:border-brass/70 hover:bg-surface hover:shadow-xl"
                  >
                    <div>
                      {/* Cabecera del Item: Nombre y Precio */}
                      <div className="flex items-start justify-between gap-3 mb-2.5">
                        <h3 className="font-display text-lg sm:text-xl font-bold uppercase tracking-tight text-linen group-hover:text-brass transition-colors leading-snug">
                          {item.name}
                        </h3>
                        <span className="font-sans text-base sm:text-lg font-black text-brass shrink-0">
                          {item.formattedPrice}
                        </span>
                      </div>

                      {/* Badges Dietarios y Distinciones */}
                      <div className="flex flex-wrap items-center gap-1.5 mb-3">
                        {item.isSignature && (
                          <span className="font-sans text-[10px] font-black uppercase tracking-widest text-brass border border-brass/40 bg-canvas/60 px-2 py-0.5">
                            DE AUTOR
                          </span>
                        )}
                        {item.dietary?.includes("sintacc") && (
                          <span className="inline-flex items-center gap-1 font-sans text-[10px] font-bold uppercase tracking-wider text-amber border border-amber/30 bg-amber/10 px-2 py-0.5">
                            <Wheat className="h-2.5 w-2.5" />
                            Sin TACC
                          </span>
                        )}
                        {item.dietary?.includes("vegetariano") && (
                          <span className="inline-flex items-center gap-1 font-sans text-[10px] font-bold uppercase tracking-wider text-emerald-300 border border-emerald-500/30 bg-emerald-950/30 px-2 py-0.5">
                            <Leaf className="h-2.5 w-2.5" />
                            Veggie
                          </span>
                        )}
                        {item.dietary?.includes("picante") && (
                          <span className="inline-flex items-center gap-1 font-sans text-[10px] font-bold uppercase tracking-wider text-red-300 border border-red-500/30 bg-red-950/30 px-2 py-0.5">
                            <Flame className="h-2.5 w-2.5" />
                            Picante
                          </span>
                        )}
                      </div>

                      {/* Descripción de Ingredientes */}
                      {item.description && (
                        <p className="font-sans text-xs sm:text-sm text-mist leading-relaxed mb-4">
                          {item.description}
                        </p>
                      )}
                    </div>

                    {/* Acciones del Item: Pedir por WhatsApp & Compartir */}
                    <div className="pt-3 border-t border-brass/10 flex items-center justify-between gap-2 mt-auto">
                      <a
                        href={`https://wa.me/5491168062589?text=${encodeURIComponent(
                          `Hola Andante Bar! Quisiera consultar o pedir el plato "${item.name}" (${item.formattedPrice}) de su menú.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Pedir ${item.name} por WhatsApp al +54 9 11 6806-2589`}
                        className="flex-1 inline-flex items-center justify-center gap-2 border border-brass/35 bg-canvas/60 py-2.5 px-3 font-sans text-xs font-bold uppercase tracking-wider text-linen hover:border-brass hover:text-brass hover:bg-canvas transition-all"
                      >
                        <MessageSquare className="h-3.5 w-3.5 text-amber" aria-hidden="true" />
                        <span>Consultar / Pedir</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => handleShareItem(item)}
                        aria-label={`Copiar enlace directo de ${item.name}`}
                        className="grid h-9 w-9 shrink-0 place-items-center border border-brass/20 bg-canvas/40 text-mist hover:text-linen hover:border-brass transition-colors cursor-pointer"
                        title="Copiar enlace del plato"
                      >
                        {copiedId === item.id ? (
                          <Check className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
                        ) : (
                          <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
                        )}
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))
        )}
      </main>

      {/* 6. Banner Inferior de Cierre: Visita a la Casa */}
      <section className="border-t border-brass/25 bg-surface py-14 px-4 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-3xl space-y-4">
          <AndanteAstrolabe className="h-10 w-10 text-brass mx-auto" />
          <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-tight text-linen leading-none">
            VIVÍ LA EXPERIENCIA EN ARÉVALO 1677
          </h2>
          <p className="font-sans text-sm sm:text-base text-mist max-w-xl mx-auto leading-relaxed">
            Te esperamos en Palermo Hollywood para disfrutar de nuestra carta en el Salón Azul a media luz, en el patio arbolado o en la cava subterránea de guarda.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setReservationOpen(true)}
              className="w-full sm:w-auto inline-flex min-h-[48px] items-center justify-center gap-2 bg-brass px-8 py-3 font-sans text-xs sm:text-sm font-bold uppercase tracking-wider text-canvas hover:bg-linen transition-colors cursor-pointer select-none"
            >
              <CalendarHeart className="h-4 w-4" aria-hidden="true" />
              <span>Reservar tu Mesa</span>
            </button>
            <a
              href="https://wa.me/5491168062589?text=Hola%20Andante%20Bar%2C%20quisiera%20consultar%20por%20una%20reserva%20o%20la%20carta."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex min-h-[48px] items-center justify-center gap-2 bg-canvas border border-brass/30 px-8 py-3 font-sans text-xs sm:text-sm font-bold uppercase tracking-wider text-linen hover:border-brass hover:text-brass transition-colors"
            >
              <MessageSquare className="h-4 w-4 text-amber" aria-hidden="true" />
              <span>WhatsApp: +54 9 11 6806-2589</span>
            </a>
          </div>
        </div>
      </section>

      {/* 7. Footer Editorial Oficial */}
      <EditorialFooter />

      {/* 8. Modales y Widgets */}
      <ReservationModal
        isOpen={reservationOpen}
        onClose={() => setReservationOpen(false)}
      />
      <FloatingContactWidget />
    </div>
  );
}

export default MenuPage;
