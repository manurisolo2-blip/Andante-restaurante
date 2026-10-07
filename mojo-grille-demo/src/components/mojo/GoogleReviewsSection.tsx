"use client";

import React from "react";
import { Star, ExternalLink } from "lucide-react";
import { CardStack, type CardStackItem } from "@/components/ui/card-stack";

export interface GoogleReviewItem extends CardStackItem {
  author: string;
  rating: number;
  dish: string;
  content: string;
  initials: string;
  avatarClass: string;
}

const GOOGLE_MAPS_URL =
  "https://maps.google.com/?q=Ar%C3%A9valo+1677,+Palermo+Hollywood,+Buenos+Aires";

const GOOGLE_REVIEWS: GoogleReviewItem[] = [
  {
    id: "review-1",
    title: "Mariana V.",
    description:
      "El bife de chorizo madurado con manteca de salvia y el risotto de hongos silvestres sin TACC son una obra de arte. La acústica durante el ciclo de jazz es íntima y perfecta.",
    imageSrc: "/assets/mojo-bowl-ropa-vieja.jpg",
    href: GOOGLE_MAPS_URL,
    author: "Mariana V.",
    rating: 5,
    dish: "Bife Madurado & Risotto Sin TACC",
    content:
      "El bife de chorizo madurado con manteca de salvia y el risotto de hongos silvestres sin TACC son una obra de arte. La acústica durante el ciclo de jazz es íntima y perfecta.",
    initials: "MV",
    avatarClass: "bg-brass text-canvas",
  },
  {
    id: "review-2",
    title: "Santiago P.",
    description:
      "Increíble que toda la propuesta gastronómica garantice opciones libres de gluten con este nivel de bistró contemporáneo. El cóctel 'Compás 76' es de los mejores de Palermo.",
    imageSrc: "/assets/mojo-cafecito.jpg",
    href: GOOGLE_MAPS_URL,
    author: "Santiago P.",
    rating: 5,
    dish: "Cóctel Compás 76 & Bocado Andante",
    content:
      "Increíble que toda la propuesta gastronómica garantice opciones libres de gluten con este nivel de bistró contemporáneo. El cóctel 'Compás 76' es de los mejores de Palermo.",
    initials: "SP",
    avatarClass: "bg-amber text-linen",
  },
  {
    id: "review-3",
    title: "Lucía Giménez",
    description:
      "La cafetería de especialidad a la mañana tiene una luz serena en Arévalo, y de noche la atmósfera Dark Luxury se transforma por completo. El servicio es sosegado y atento.",
    imageSrc: "/assets/mojo-cafecito.jpg",
    href: GOOGLE_MAPS_URL,
    author: "Lucía Giménez",
    rating: 5,
    dish: "Flat White & Financier Sin TACC",
    content:
      "La cafetería de especialidad a la mañana tiene una luz serena en Arévalo, y de noche la atmósfera Dark Luxury se transforma por completo. El servicio es sosegado y atento.",
    initials: "LG",
    avatarClass: "bg-surface text-brass border border-brass/40",
  },
  {
    id: "review-4",
    title: "Esteban R.",
    description:
      "Reservamos la cava subsuelo para una cata de 10 personas. La selección del sommelier y la tabla de quesos de guarda fueron excepcionales. Un verdadero refugio en la ciudad.",
    imageSrc: "/assets/mojo-catering.jpg",
    href: GOOGLE_MAPS_URL,
    author: "Esteban R.",
    rating: 5,
    dish: "Experiencia Cava Subsuelo",
    content:
      "Reservamos la cava subsuelo para una cata de 10 personas. La selección del sommelier y la tabla de quesos de guarda fueron excepcionales. Un verdadero refugio en la ciudad.",
    initials: "ER",
    avatarClass: "bg-brass text-canvas",
  },
  {
    id: "review-5",
    title: "Camila Duarte",
    description:
      "La pesca del día sellada a la plancha sobre puré de coliflor trufado y la burrata con higos asados superaron toda expectativa. Los postres artesanales son sublimes.",
    imageSrc: "/assets/mojo-pollo-bowl.jpg",
    href: GOOGLE_MAPS_URL,
    author: "Camila Duarte",
    rating: 5,
    dish: "Pesca del Día & Burrata Cremosa",
    content:
      "La pesca del día sellada a la plancha sobre puré de coliflor trufado y la burrata con higos asados superaron toda expectativa. Los postres artesanales son sublimes.",
    initials: "CD",
    avatarClass: "bg-amber text-linen",
  },
];

export function GoogleReviewsSection() {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section
      id="reviews"
      aria-label="Lo que dicen los comensales sobre Andante Restaurante Bar"
      className="relative w-full scroll-mt-[var(--header-h)] bg-canvas border-t border-brass/15 py-16 sm:py-24 overflow-hidden"
    >
      <div className="relative mx-auto max-w-[1600px] w-full px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado Principal de Reseñas */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 sm:mb-14">
          <div className="max-w-2xl">
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-brass font-bold">
              HOSPITALIDAD &amp; EXPERIENCIA
            </span>
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-linen leading-none mt-1">
              ECOS DE <span className="text-brass">PALERMO</span> HOLLYWOOD
            </h2>
            <p className="mt-3 font-sans text-base text-mist leading-relaxed">
              Testimonios de quienes desaceleran su ritmo en Andante. Cocina de mercado de día, coctelería de autor y ciclos de jazz en vivo bajo luz tenue por la noche.
            </p>
          </div>

          {/* Tarjeta Resumen de Calificación Google */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6 shrink-0">
            <div className="flex items-center gap-3.5">
              <span className="font-display text-5xl sm:text-6xl font-black text-linen leading-none">
                4.9
              </span>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-ochre-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" aria-hidden="true" />
                  ))}
                </div>
                <span className="sr-only">Calificación promedio 4.9 de 5 estrellas</span>
                <span className="font-sans text-sm font-bold text-linen mt-1">
                  +1,280 opiniones verificadas
                </span>
                <span className="font-sans text-xs text-mist uppercase tracking-wider">
                  Google Maps · Palermo Hollywood
                </span>
              </div>
            </div>

            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 bg-surface hover:bg-brass text-linen hover:text-canvas border border-brass/40 text-xs font-bold uppercase tracking-wider px-5 py-2.5 transition-colors group cursor-pointer shadow-md"
            >
              <span>VER EN MAPS</span>
              <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* 3D CardStack Integrado */}
        <div className="relative w-full py-4 overflow-hidden">
          <CardStack
            items={GOOGLE_REVIEWS}
            initialIndex={0}
            cardWidth={isMobile ? (typeof window !== "undefined" ? Math.min(320, window.innerWidth - 36) : 320) : 560}
            cardHeight={isMobile ? 310 : 340}
            overlap={isMobile ? 0.62 : 0.44}
            spreadDeg={isMobile ? 14 : 36}
            perspectivePx={1200}
            depthPx={isMobile ? 40 : 110}
            tiltXDeg={isMobile ? 4 : 8}
            activeScale={1.03}
            inactiveScale={0.93}
            autoAdvance={false}
            pauseOnHover={true}
            showDots={true}
            renderCard={(item) => {
              const review = item as GoogleReviewItem;
              return (
                <div className="relative w-full bg-surface border border-brass/25 flex flex-col gap-5 p-6 shadow-2xl">
                  {/* Imagen de Fondo del Plato con opacidad sutil */}
                  <div className="absolute inset-0 overflow-hidden">
                    {review.imageSrc ? (
                      <img
                        src={review.imageSrc}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover opacity-20"
                        draggable={false}
                      />
                    ) : null}
                  </div>

                  {/* Gradiente para Legibilidad Óptima en Dark Luxury */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface via-surface/85 to-surface/60" />

                  {/* Cabecera de la Tarjeta */}
                  <div className="relative z-10 flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-11 w-11 rounded-full overflow-hidden shrink-0 flex items-center justify-center">
                        <span
                          aria-hidden="true"
                          className={`h-full w-full ${review.avatarClass} flex items-center justify-center font-sans font-bold text-sm uppercase`}
                        >
                          {review.initials}
                        </span>
                      </div>
                      <div>
                        <div className="font-sans font-bold text-sm text-linen leading-tight">
                          {review.author}
                        </div>
                        <p className="font-sans text-xs font-medium text-mist mt-0.5">
                          Comensal verificado · Palermo Hollywood
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end">
                      <span className="sr-only">{review.rating} de 5 estrellas</span>
                      <div className="flex items-center gap-0.5 text-ochre-gold">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Contenido de la Reseña */}
                  <div className="relative z-10 flex-1 flex flex-col justify-between">
                    <p className="font-sans text-sm md:text-base text-linen/90 leading-relaxed italic">
                      "{review.content}"
                    </p>

                    <div className="pt-3 border-t border-brass/15 mt-3 flex items-center justify-between">
                      <span className="font-sans text-xs font-bold uppercase tracking-wider text-brass">
                        {review.dish}
                      </span>
                      <span className="font-sans text-[11px] text-mist font-medium">
                        Arévalo 1677
                      </span>
                    </div>
                  </div>
                </div>
              );
            }}
          />
        </div>
      </div>
    </section>
  );
}

export default GoogleReviewsSection;
