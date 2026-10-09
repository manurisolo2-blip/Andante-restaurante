"use client";

import React from "react";
import { Star, ExternalLink, Quote } from "lucide-react";

export interface GoogleReviewItem {
  id: string;
  author: string;
  rating: number;
  dish: string;
  occasion: string;
  content: string;
  initials: string;
}

const GOOGLE_MAPS_URL =
  "https://maps.google.com/?q=Ar%C3%A9valo+1677,+Palermo+Hollywood,+Buenos+Aires";

const GOOGLE_REVIEWS: GoogleReviewItem[] = [
  {
    id: "review-1",
    author: "Mariana V.",
    rating: 5,
    dish: "Bife Madurado & Risotto Sin TACC",
    occasion: "Cena & Ciclo de Jazz",
    content:
      "El bife de chorizo madurado con manteca de salvia y el risotto de hongos silvestres sin TACC son una obra de arte. La acústica durante el ciclo de jazz es íntima y perfecta, sin estridencias.",
    initials: "MV",
  },
  {
    id: "review-2",
    author: "Santiago P.",
    rating: 5,
    dish: "Cóctel Compás 76 & Bocado Andante",
    occasion: "Barra de Autor",
    content:
      "Increíble que toda la propuesta gastronómica garantice opciones libres de gluten con este nivel de bistró contemporáneo. El cóctel 'Compás 76' es de lo mejor que probé en Palermo.",
    initials: "SP",
  },
  {
    id: "review-3",
    author: "Lucía Giménez",
    rating: 5,
    dish: "Flat White & Financier Sin TACC",
    occasion: "Cafetería de Especialidad",
    content:
      "La cafetería de especialidad a la mañana tiene una luz serena en Arévalo, y de noche la atmósfera íntima transforma el lugar por completo. El servicio es sosegado y atento.",
    initials: "LG",
  },
  {
    id: "review-4",
    author: "Esteban R.",
    rating: 5,
    dish: "Experiencia Cava Subsuelo",
    occasion: "Cata Privada de Vinos",
    content:
      "Reservamos la cava subsuelo para una cata de 10 personas. La selección del sommelier y la tabla de quesos de guarda fueron excepcionales. Un verdadero refugio en la ciudad.",
    initials: "ER",
  },
  {
    id: "review-5",
    author: "Camila Duarte",
    rating: 5,
    dish: "Pesca del Día & Burrata Cremosa",
    occasion: "Almuerzo de Mercado",
    content:
      "La pesca del día sellada a la plancha sobre puré de coliflor trufado y la burrata con higos asados superaron toda expectativa. Los postres artesanales completan una experiencia impecable.",
    initials: "CD",
  },
];

export function GoogleReviewsSection() {
  return (
    <section
      id="reviews"
      aria-label="Lo que dicen los comensales sobre Andante Restaurante Bar"
      className="relative w-full scroll-mt-[var(--header-h)] bg-canvas py-16 sm:py-24"
    >
      <div className="relative mx-auto max-w-[1600px] w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Columna Izquierda: Encabezado Editorial y Calificación Verificada */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 flex flex-col justify-between">
            <div>
              <span className="font-sans text-xs uppercase tracking-[0.25em] text-brass font-bold">
                HOSPITALIDAD &amp; CRÍTICA
              </span>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-linen leading-none mt-2">
                ECOS DE <span className="text-brass">NUESTRA MESA</span>
              </h2>
              <p className="mt-4 font-sans text-base text-mist leading-relaxed">
                Impresiones de quienes desaceleran su ritmo en Arévalo 1677. Cocina de mercado de día, coctelería de autor y ciclos de jazz acústico bajo luz tenue por la noche.
              </p>

              {/* Bloque de Calificación Google Maps */}
              <div className="mt-8 bg-surface border border-brass/25 p-6 sm:p-7">
                <div className="flex items-center gap-4">
                  <span className="font-display text-5xl sm:text-6xl font-black text-linen leading-none">
                    4.9
                  </span>
                  <div>
                    <div className="flex items-center gap-1 text-amber">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" aria-hidden="true" />
                      ))}
                    </div>
                    <span className="sr-only">Calificación promedio 4.9 de 5 estrellas</span>
                    <p className="font-sans text-sm font-bold text-linen mt-1">
                      Calificación promedio en Google Maps
                    </p>
                    <p className="font-sans text-xs text-mist">
                      340+ opiniones reales de comensales
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-brass/15 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center justify-center gap-2 bg-canvas hover:bg-brass text-linen hover:text-canvas border border-brass/40 text-xs font-bold uppercase tracking-wider px-5 py-2.5 transition-colors group cursor-pointer"
                  >
                    <span>LEER EN GOOGLE MAPS</span>
                    <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </a>
                  <span className="font-sans text-[11px] text-mist uppercase tracking-wider text-center sm:text-right">
                    Arévalo 1677 · Palermo Hollywood
                  </span>
                </div>
              </div>
            </div>

            {/* Cita Editorial de Manifiesto */}
            <div className="mt-8 pt-6 border-t border-brass/15 hidden lg:block">
              <p className="font-sans text-xs text-mist leading-relaxed italic">
                «Un compás moderado donde la cocina de autor y la acústica del jazz conviven sin apuro ni artificios.»
              </p>
              <span className="mt-2 block font-sans text-[11px] font-semibold text-brass uppercase tracking-wider">
                Andante Restaurante Bar · Buenos Aires
              </span>
            </div>
          </div>

          {/* Columna Derecha: Cuadrícula Editorial de Testimonios */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            {GOOGLE_REVIEWS.map((review, index) => {
              const isFirst = index === 0;
              return (
                <article
                  key={review.id}
                  className={`relative bg-surface border border-brass/20 p-6 sm:p-7 transition-colors hover:border-brass/45 ${
                    isFirst ? "border-l-4 border-l-brass" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="h-10 w-10 shrink-0 bg-canvas border border-brass/30 flex items-center justify-center font-sans font-bold text-xs uppercase text-brass"
                        aria-hidden="true"
                      >
                        {review.initials}
                      </div>
                      <div>
                        <h3 className="font-sans font-bold text-sm text-linen leading-tight">
                          {review.author}
                        </h3>
                        <p className="font-sans text-xs text-mist mt-0.5">
                          {review.occasion}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-0.5 text-amber shrink-0">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                      ))}
                      <span className="sr-only">Calificación 5 de 5 estrellas</span>
                    </div>
                  </div>

                  <blockquote className="font-sans text-sm sm:text-base text-linen/90 leading-relaxed italic">
                    "{review.content}"
                  </blockquote>

                  <div className="mt-5 pt-3.5 border-t border-brass/15 flex items-center justify-between text-xs">
                    <span className="font-sans font-bold uppercase tracking-wider text-brass">
                      {review.dish}
                    </span>
                    <span className="font-sans text-mist text-[11px] hidden sm:inline">
                      Opinión verificada
                    </span>
                  </div>
                </article>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

export default GoogleReviewsSection;
