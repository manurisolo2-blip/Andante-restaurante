import React from "react";
import { Award, Trophy, Star, ShieldCheck, MapPin } from "lucide-react";

export function TrustStrip() {
  return (
    <section
      aria-label="Reconocimientos y Distinciones Gastronómicas"
      className="w-full border-y border-brass/25 bg-surface/90 backdrop-blur-md py-4 sm:py-5 px-4 sm:px-6 lg:px-8 shadow-2xl relative z-30"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-center">
          
          {/* 1. Distinción Central Destacada: Calificación y Opiniones */}
          <div className="flex items-center gap-3.5 border-b md:border-b-0 md:border-r border-brass/20 pb-3 md:pb-0 md:pr-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-brass/40 bg-canvas/80 text-brass shadow-sm">
              <Trophy className="h-5 w-5 text-amber" aria-hidden="true" />
            </div>
            <div>
              <p className="font-sans text-[10px] font-black uppercase tracking-[0.2em] text-brass">
                EXCELENCIA GASTRONÓMICA
              </p>
              <h3 className="font-serif font-display text-sm sm:text-base font-bold text-linen leading-snug">
                4,7 / 5 Estrellas · +2.100 Opiniones
              </h3>
              <p className="font-sans text-[11px] text-mist leading-tight mt-0.5">
                Alta Cocina, Coctelería de Autor &amp; Jazz en Vivo
              </p>
            </div>
          </div>

          {/* 2. Insignia Restaurant Guru */}
          <div className="flex items-center gap-3.5 border-b md:border-b-0 lg:border-r border-brass/20 pb-3 md:pb-0 lg:pr-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-brass/40 bg-canvas/80 text-brass shadow-sm">
              <Award className="h-5 w-5 text-brass" aria-hidden="true" />
            </div>
            <div>
              <p className="font-sans text-[10px] font-black uppercase tracking-[0.2em] text-brass">
                RESTAURANT GURU
              </p>
              <h3 className="font-serif font-display text-sm sm:text-base font-bold text-linen leading-snug">
                Recomendado Restaurant Guru 2024
              </h3>
              <p className="font-sans text-[11px] text-mist leading-tight mt-0.5">
                Sello de Calidad Culinaria en Palermo Hollywood
              </p>
            </div>
          </div>

          {/* 3. Insignia TripAdvisor */}
          <div className="flex items-center gap-3.5 border-b sm:border-b-0 md:border-r border-brass/20 pb-3 sm:pb-0 md:pr-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-brass/40 bg-canvas/80 text-brass shadow-sm">
              <Star className="h-5 w-5 fill-amber text-amber" aria-hidden="true" />
            </div>
            <div>
              <p className="font-sans text-[10px] font-black uppercase tracking-[0.2em] text-brass">
                TRIPADVISOR TRAVELLERS' CHOICE
              </p>
              <h3 className="font-serif font-display text-sm sm:text-base font-bold text-linen leading-snug">
                Travellers' Choice 2024
              </h3>
              <p className="font-sans text-[11px] text-mist leading-tight mt-0.5">
                Top 10% Restaurantes a Nivel Global
              </p>
            </div>
          </div>

          {/* 4. Ubicación Oficial Palermo Hollywood */}
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-brass/40 bg-canvas/80 text-brass shadow-sm">
              <MapPin className="h-5 w-5 text-amber" aria-hidden="true" />
            </div>
            <div>
              <p className="font-sans text-[10px] font-black uppercase tracking-[0.2em] text-brass">
                PALERMO HOLLYWOOD · CABA
              </p>
              <h3 className="font-serif font-display text-sm sm:text-base font-bold text-linen leading-snug">
                Arévalo 1677 · Buenos Aires
              </h3>
              <p className="font-sans text-[11px] text-mist leading-tight mt-0.5">
                Salón Azul, Patio al Aire Libre &amp; Gran Barra
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default TrustStrip;
