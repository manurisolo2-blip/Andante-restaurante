import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone, CalendarHeart } from "lucide-react";
import { CartProvider, useCart } from "@/components/mojo/cart";
import { TopBar } from "@/components/mojo/TopBar";
import { HeroSection } from "@/components/mojo/HeroSection";
import { CravStyleMenuGrid } from "@/components/mojo/CravStyleMenuGrid";
import { QuickOrderModal } from "@/components/mojo/QuickOrderModal";
import { CartSheet } from "@/components/mojo/CartSheet";
import { CartToast } from "@/components/mojo/CartToast";
import { MobileActionBar } from "@/components/mojo/MobileActionBar";
import { Preloader } from "@/components/mojo/Preloader";
import { CubanDeconstruction } from "@/components/mojo/CubanDeconstruction";
import { CuratedMenu } from "@/components/mojo/CuratedMenu";
import { GoogleReviewsSection } from "@/components/mojo/GoogleReviewsSection";
import { CulturalAgendaSection } from "@/components/mojo/CulturalAgendaSection";
import { SpacesGallerySection } from "@/components/mojo/SpacesGallerySection";
import { ContactMapSection } from "@/components/mojo/ContactMapSection";
import { ReservationModal } from "@/components/mojo/ReservationModal";
import { EditorialFooter } from "@/components/mojo/EditorialFooter";
import { NoiseOverlay } from "@/components/mojo/NoiseOverlay";
import { JellyWaveTransition } from "@/components/mojo/JellyWaveTransition";
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
  const { openCart } = useCart();
  const [selected, setSelected] = useState<MenuItem | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

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
      {/* Editorial Preloader & Cinematic Curtain Exit */}
      <Preloader onComplete={() => setIsLoaded(true)} />

      {/* Textura de grano de papel artesanal editorial */}
      <NoiseOverlay />

      <div className="min-h-dvh bg-canvas text-linen">
        <TopBar
          onOpenCart={openCart}
          onOpenReservation={() => handleOpenReservation()}
        />
        <main className="bg-transparent pb-20 md:pb-0">
          {/* Contenedor del Hero con pin/sticky */}
          <div className="relative h-[200dvh]">
            <div className="sticky top-0 h-dvh w-full overflow-hidden z-10">
              <HeroSection
                menuAnchorId="menu"
                cateringHref="#agenda-cultural"
                onReservationClick={() => handleOpenReservation()}
                shouldAnimateIn={isLoaded}
              />
            </div>
          </div>

          {/*
            El fondo inferior que sube y tapa el hero con atmósfera Dark Luxury.
          */}
          <div className="relative z-20 -mt-[100dvh] bg-canvas shadow-[0_-24px_50px_rgba(0,0,0,0.5)]">
            {/* Concepto Culinario & Equipo · Chef Ejecutivo Pablo Aroma */}
            <div id="concepto-culinario">
              <CubanDeconstruction />
            </div>

            {/* Transición 1: Canvas Índigo -> Superficie Marino Profundo */}
            <JellyWaveTransition
              topColor="#0E1726"
              bottomColor="#162238"
              direction="down"
            />

            {/* Selección de Estación · Al Fuego (Sección Superficie) */}
            <div id="curated-menu">
              <CuratedMenu />
            </div>

            {/* Transición 2: Superficie Marino Profundo -> Canvas Índigo */}
            <JellyWaveTransition
              topColor="#162238"
              bottomColor="#0E1726"
              direction="up"
            />

            {/* Carta Digital Interactiva (Pestañas Dinámicas & Filtros Sin TACC / Vegetariano) */}
            <section id="menu" className="scroll-mt-[var(--header-h)]">
              <CravStyleMenuGrid onSelect={setSelected} />
            </section>

            {/* Música en Vivo & Agenda Cultural (Jazz Nights, Musique & Cuisine, Catas) */}
            <CulturalAgendaSection onOpenReservation={handleOpenReservation} />

            {/* Espacios del Local (Salón Azul, Patio Interior al Aire Libre, Cava Subsuelo) */}
            <SpacesGallerySection onOpenReservation={handleOpenReservation} />

            {/* Testimonios y Reseñas de comensales en Palermo Hollywood */}
            <GoogleReviewsSection />

            {/* Ancla para Reservas */}
            <div id="reservas" className="scroll-mt-[var(--header-h)]" />

            {/* Módulo de Eventos Corporativos & Catering Exclusivo */}
            <section
              id="catering"
              className="scroll-mt-[var(--header-h)] bg-surface/50 border-y border-brass/15 px-4 py-16 sm:px-6 lg:px-8"
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
                    className="inline-flex min-h-11 items-center gap-2.5 rounded-none bg-brass px-8 py-4 font-sans text-sm sm:text-base font-bold uppercase tracking-wider text-canvas hover:bg-linen hover:text-canvas transition-colors cursor-pointer select-none border border-brass shadow-lg"
                  >
                    <CalendarHeart className="h-4 w-4" aria-hidden="true" />
                    <span>COTIZAR EVENTO PRIVADO</span>
                  </button>
                  <a
                    href="https://wa.me/5491168673856?text=Hola%20Andante%20Bar%2C%20quisiera%20consultar%20por%20eventos%20privados%20y%20catering."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2.5 rounded-none bg-surface border border-brass/35 px-8 py-4 font-sans text-sm sm:text-base font-bold uppercase tracking-wider text-linen hover:border-brass hover:text-brass transition-colors cursor-pointer select-none"
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

            {/* Datos de Contacto, Mapa Interactivo de Google Maps & Horarios */}
            <ContactMapSection />

            {/* Transición hacia el Editorial Footer */}
            <JellyWaveTransition
              topColor="#0E1726"
              bottomColor="#0E1726"
              direction="down"
            />

            {/* Editorial Footer de Alto Impacto Dark Luxury */}
            <EditorialFooter onOpenCart={openCart} />
          </div>
        </main>

        <QuickOrderModal item={selected} onClose={() => setSelected(null)} />
        <ReservationModal
          isOpen={reservationOpen}
          onClose={() => setReservationOpen(false)}
          defaultEventTitle={reservationEvent}
        />
        <CartSheet />
        <CartToast />
        <MobileActionBar onOpenCart={openCart} />
      </div>
    </>
  );
}
