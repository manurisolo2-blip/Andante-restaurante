import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone, CalendarHeart } from "lucide-react";
import { CartProvider } from "@/components/mojo/cart";
import { TopBar } from "@/components/mojo/TopBar";
import { HeroSection } from "@/components/mojo/HeroSection";
import { CravStyleMenuGrid } from "@/components/mojo/CravStyleMenuGrid";
import { QuickOrderModal } from "@/components/mojo/QuickOrderModal";
import { CulinaryConceptSection } from "@/components/mojo/CulinaryConceptSection";
import { GoogleReviewsSection } from "@/components/mojo/GoogleReviewsSection";
import { CulturalAgendaSection } from "@/components/mojo/CulturalAgendaSection";
import { SpacesGallerySection } from "@/components/mojo/SpacesGallerySection";
import { ReservationModal } from "@/components/mojo/ReservationModal";
import { EditorialFooter } from "@/components/mojo/EditorialFooter";
import { NoiseOverlay } from "@/components/mojo/NoiseOverlay";
import { JellyWaveTransition } from "@/components/mojo/JellyWaveTransition";
import { FloatingContactWidget } from "@/components/mojo/FloatingContactWidget";
import type { MenuItem } from "@/data/menu";

const title = "Andante Restaurante Bar | Alta Cocina Cosmopolita & Jazz en Palermo Hollywood";
const description =
  "Enclave gastronómico premium en Palermo Hollywood. Cocina de autor por el chef Pablo Aroma, barra de autor por Santiago Contarino y ciclos de jazz acústico en vivo en Arévalo 1677.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      {
        name: "keywords",
        content:
          "restaurante con jazz en vivo Palermo Hollywood, coctelería de autor, cocina de autor Buenos Aires, bistró Palermo Hollywood, Pablo Aroma, Santiago Contarino, menú Sin TACC CABA, Arévalo 1677, catas de vino Palermo",
      },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "restaurant" },
      { property: "og:url", content: "https://andantebar.com.ar/" },
      { property: "og:site_name", content: "Andante Restaurante Bar" },
      { property: "og:locale", content: "es_AR" },
      { property: "og:locale:alternate", content: "en_US" },
      { property: "og:image", content: "https://andantebar.com.ar/og-image.jpg" },
      {
        property: "og:image:alt",
        content: "Andante Restaurante Bar - Alta Cocina Cosmopolita en Palermo Hollywood",
      },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: "https://andantebar.com.ar/og-image.jpg" },
      { name: "twitter:image:alt", content: "Andante Restaurante Bar Palermo Hollywood" },
    ],
    links: [{ rel: "canonical", href: "https://andantebar.com.ar/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <CartProvider>
      <IndexContent />
    </CartProvider>
  );
}

/**
 * Page body. Lives inside CartProvider so every cart surface (TopBar counter,
 * drawer, mobile bar, toast) reads and writes the exact same cart state.
 */
function IndexContent() {
  const [selected, setSelected] = useState<MenuItem | null>(null);
  const [isLoaded] = useState(true);

  // Estado del Modal de Reservas y Eventos
  const [reservationOpen, setReservationOpen] = useState(false);
  const [reservationEvent, setReservationEvent] = useState<string | undefined>(undefined);

  const handleOpenReservation = (eventTitle?: string) => {
    setReservationEvent(eventTitle);
    setReservationOpen(true);
  };

  // Refresco de ScrollTrigger al completar la carga de todas las imágenes del DOM
  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.refresh();

    const images = Array.from(document.querySelectorAll("img"));
    let loadedCount = 0;
    const totalImages = images.length;

    const handleImageComplete = () => {
      loadedCount++;
      if (loadedCount >= totalImages) {
        ScrollTrigger.refresh();
      }
    };

    if (totalImages === 0) {
      ScrollTrigger.refresh();
    } else {
      images.forEach((img) => {
        if (img.complete) {
          handleImageComplete();
        } else {
          img.addEventListener("load", handleImageComplete, { once: true });
          img.addEventListener("error", handleImageComplete, { once: true });
        }
      });
    }

    const handleWindowLoad = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("load", handleWindowLoad);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 450);

    return () => {
      window.removeEventListener("load", handleWindowLoad);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {/* Textura de grano de papel artesanal editorial */}
      <NoiseOverlay />

      <div className="min-h-dvh bg-canvas text-linen">
        <TopBar
          onOpenReservation={() => handleOpenReservation()}
        />
        <main className="bg-transparent">
          {/* Contenedor Hero Sticky (Efecto Cortina Dark Luxury) */}
          <div className="sticky top-0 h-[100dvh] w-full z-10 overflow-hidden">
            <HeroSection
              menuAnchorId="menu"
              cateringHref="#agenda-cultural"
              onReservationClick={() => handleOpenReservation()}
              shouldAnimateIn={isLoaded}
            />
          </div>

          <div className="relative z-20 bg-canvas shadow-[0_-30px_60px_rgba(0,0,0,0.85)] border-t border-brass/25">
            {/* Concepto Culinario & Filosofía de Marca (Pablo Aroma & Santiago Contarino) */}
            <div id="concepto-culinario">
              <CulinaryConceptSection onOpenReservation={() => handleOpenReservation()} />
            </div>

            {/* Transición 1: Canvas Índigo -> Púrpura Nocturno (Carta Digital) */}
            <JellyWaveTransition
              topColor="#0E1726"
              bottomColor="#16121C"
              direction="down"
            />

            {/* Carta Digital Interactiva (Pestañas Dinámicas & Filtros Sin TACC / Vegetariano) */}
            <section id="menu" className="scroll-mt-[var(--header-h)] bg-night-purple">
              <CravStyleMenuGrid onSelect={setSelected} />
            </section>

            {/* Transición 3: Púrpura Nocturno -> Superficie Marina (Agenda Cultural) */}
            <JellyWaveTransition
              topColor="#16121C"
              bottomColor="#162238"
              direction="down"
            />

            {/* Música en Vivo & Agenda Cultural (Jazz Nights, Musique & Cuisine, Catas) */}
            <CulturalAgendaSection onOpenReservation={handleOpenReservation} />

            {/* Transición 4: Superficie Marina -> Obsidiana Ébano (Espacios de Andante) */}
            <JellyWaveTransition
              topColor="#162238"
              bottomColor="#181513"
              direction="up"
            />

            {/* Espacios del Local (Salón Azul, Patio Interior al Aire Libre, Cava Subsuelo) */}
            <SpacesGallerySection onOpenReservation={handleOpenReservation} />

            {/* Transición 5: Obsidiana Ébano -> Canvas Índigo (Reseñas & Ecos) */}
            <JellyWaveTransition
              topColor="#181513"
              bottomColor="#0E1726"
              direction="down"
            />

            {/* Testimonios y Reseñas de comensales en Palermo Hollywood */}
            <GoogleReviewsSection />

            {/* Ancla para Reservas */}
            <div id="reservas" className="scroll-mt-[var(--header-h)]" />

            {/* Transición 6: Canvas Índigo -> Púrpura Nocturno (Catering & Celebraciones) */}
            <JellyWaveTransition
              topColor="#0E1726"
              bottomColor="#16121C"
              direction="up"
            />

            {/* Módulo de Eventos Corporativos & Catering Exclusivo */}
            <section
              id="catering"
              className="scroll-mt-[var(--header-h)] bg-night-purple px-4 py-16 sm:px-6 lg:px-8"
            >
              <div className="mx-auto max-w-4xl text-center">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brass mb-3">
                  <CalendarHeart className="h-4 w-4 text-amber" aria-hidden="true" />
                  <span>CELEBRACIONES PRIVADAS &amp; EVENTOS CORPORATIVOS</span>
                </div>
                <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight uppercase text-linen leading-none">
                  EXPERIENCIAS A MEDIDA EN PALERMO
                </h2>
                <p className="mx-auto mt-4 max-w-2xl font-sans text-base text-linen/80 leading-relaxed">
                  Cierres de salón completo, jornadas corporativas, catas guiadas por sommelier en la cava histórica y cenas de pasos de alta cocina firmadas por Pablo Aroma y Santiago Contarino.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => handleOpenReservation("Evento Corporativo / Celebración Privada")}
                    className="w-full sm:w-auto inline-flex min-h-11 items-center justify-center gap-2.5 rounded-none bg-brass px-6 sm:px-8 py-3.5 sm:py-4 font-sans text-xs sm:text-base font-bold uppercase tracking-wider text-canvas hover:bg-linen hover:text-canvas transition-colors cursor-pointer select-none border border-brass shadow-lg text-center"
                  >
                    <CalendarHeart className="h-4 w-4" aria-hidden="true" />
                    <span>COTIZAR EVENTO PRIVADO</span>
                  </button>
                  <a
                    href="https://wa.me/5491168673856?text=Hola%20Andante%20Bar%2C%20quisiera%20consultar%20por%20eventos%20privados%20y%20catering."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex min-h-11 items-center justify-center gap-2.5 rounded-none bg-surface border border-brass/35 px-6 sm:px-8 py-3.5 sm:py-4 font-sans text-xs sm:text-base font-bold uppercase tracking-wider text-linen hover:border-brass hover:text-brass transition-colors cursor-pointer select-none text-center"
                  >
                    <Phone className="h-4 w-4 text-amber" aria-hidden="true" />
                    <span>CONSULTA DIRECTA: +54 11 6867-3856</span>
                  </a>
                </div>
                <p className="mt-4 font-sans text-xs sm:text-sm font-semibold text-mist uppercase tracking-wider">
                  Arévalo 1677, Palermo Hollywood · Salón Azul, Patio Arbolado &amp; Cava Subsuelo
                </p>
              </div>
            </section>

            {/* Transición 7: Púrpura Nocturno -> Superficie Marina (Editorial Footer) */}
            <JellyWaveTransition
              topColor="#16121C"
              bottomColor="#162238"
              direction="down"
            />

            {/* Anclas de Sede & Contacto (redirigen al footer editorial) */}
            <div id="sedes" className="scroll-mt-[var(--header-h)]" />
            <div id="contacto" className="scroll-mt-[var(--header-h)]" />

            {/* Editorial Footer de Alto Impacto Dark Luxury */}
            <EditorialFooter />
          </div>
        </main>

        <QuickOrderModal item={selected} onClose={() => setSelected(null)} />
        <ReservationModal
          isOpen={reservationOpen}
          onClose={() => setReservationOpen(false)}
          defaultEventTitle={reservationEvent}
        />
        <FloatingContactWidget />
      </div>
    </>
  );
}
