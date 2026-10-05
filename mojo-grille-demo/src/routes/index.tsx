import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone } from "lucide-react";
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
import { EditorialFooter } from "@/components/mojo/EditorialFooter";
import { NoiseOverlay } from "@/components/mojo/NoiseOverlay";
import { JellyWaveTransition } from "@/components/mojo/JellyWaveTransition";
import type { MenuItem } from "@/data/menu";

const title = "Andante Restaurante Bar | Bistró Contemporáneo & Coctelería en Palermo Hollywood";
const description =
  "Bistró contemporáneo, cafetería de especialidad, alta gastronomía estacional con opciones Sin TACC garantizadas, coctelería de autor y ciclos de jazz en Palermo Hollywood, Buenos Aires.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      {
        name: "keywords",
        content:
          "Andante Restaurante Bar, bistró Palermo Hollywood, restaurante Arévalo 1677, cafetería de especialidad CABA, menú Sin TACC CABA, coctelería de autor Buenos Aires, jazz en vivo Palermo, cava de vinos Palermo",
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
        content: "Andante Restaurante Bar - Bistró Contemporáneo en Palermo Hollywood",
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
        <TopBar onOpenCart={openCart} />
        <main className="bg-transparent pb-20 md:pb-0">
          {/* Contenedor del Hero con pin/sticky: el hero se queda fijo y el fondo inferior sube tapándolo */}
          <div className="relative h-[200dvh]">
            <div className="sticky top-0 h-dvh w-full overflow-hidden z-10">
              <HeroSection
                menuAnchorId="menu"
                cateringHref="#catering"
                shouldAnimateIn={isLoaded}
              />
            </div>
          </div>

          {/*
            El fondo inferior que sube y tapa el hero con atmósfera Dark Luxury.
          */}
          <div className="relative z-20 -mt-[100dvh] bg-canvas shadow-[0_-24px_50px_rgba(0,0,0,0.5)]">
            {/* Anatomía Gastronómica · Compás Andante */}
            <CubanDeconstruction />

            {/* Transición 1: Canvas Índigo -> Superficie Marino Profundo */}
            <JellyWaveTransition
              topColor="#0E1726"
              bottomColor="#162238"
              direction="down"
            />

            {/* Selección de Estación · Al Fuego (Sección Superficie) */}
            <CuratedMenu />

            {/* Transición 2: Superficie Marino Profundo -> Canvas Índigo */}
            <JellyWaveTransition
              topColor="#162238"
              bottomColor="#0E1726"
              direction="up"
            />

            <section id="menu" className="scroll-mt-[var(--header-h)]">
              <CravStyleMenuGrid onSelect={setSelected} />
            </section>

            {/* Testimonios y Reseñas de comensales en Palermo Hollywood */}
            <GoogleReviewsSection />

            <section
              id="catering"
              className="scroll-mt-[var(--header-h)] bg-surface/50 border-y border-brass/15 px-4 py-16 sm:px-6 lg:px-8"
            >
              <div className="mx-auto max-w-4xl text-center">
                <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight uppercase text-linen leading-none">
                  EXPERIENCIAS PRIVADAS, CATAS EN CAVA Y CICLOS DE JAZZ
                </h2>
                <p className="mx-auto mt-4 max-w-2xl font-sans text-base text-linen/80 leading-relaxed">
                  Eventos corporativos a medida, catas guiadas por sommelier en nuestra cava subterránea y celebraciones exclusivas con gastronomía de estación y coctelería de autor.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <a
                    href="https://wa.me/5491147789000?text=Hola%20Andante%20Bar%2C%20quisiera%20consultar%20por%20experiencias%20privadas%20y%20eventos."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2.5 rounded-none bg-brass px-8 py-4 font-sans text-sm sm:text-base font-bold uppercase tracking-wider text-canvas hover:bg-linen hover:text-canvas transition-colors cursor-pointer select-none"
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    <span>CONSULTAR POR EXPERIENCIAS: +54 11 4778-9000</span>
                  </a>
                </div>
                <p className="mt-4 font-sans text-sm font-semibold text-mist uppercase tracking-wider">
                  Arévalo 1677, Palermo Hollywood · Salón Central, Terraza Arbolada &amp; Cava Subsuelo
                </p>
              </div>
            </section>

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
        <CartSheet />
        <CartToast />
        <MobileActionBar onOpenCart={openCart} />
      </div>
    </>
  );
}
