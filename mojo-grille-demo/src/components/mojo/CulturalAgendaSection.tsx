import React from "react";
import { Music, Wine, Sparkles, Calendar, Clock, ArrowRight } from "lucide-react";

export interface CulturalAgendaSectionProps {
  onOpenReservation: (eventTitle?: string) => void;
}

export function CulturalAgendaSection({ onOpenReservation }: CulturalAgendaSectionProps) {
  const events = [
    {
      id: "jazz-nights",
      title: "Jazz Nights · Ciclos Acústicos en Vivo",
      tag: "MARTES & JUEVES · 21:00 HS",
      icon: Music,
      description:
        "Trío acústico en vivo con saxo tenor, contrabajo y batería con escobillas. Sonido natural sin estridencias para acompañar una cena íntima en el Salón Azul a media luz.",
      details: "Apertura de sala: 20:00 hs · Show: 21:00 hs · Sin costo adicional sobre el cubierto",
      cta: "Reservar Noche de Jazz",
    },
    {
      id: "musique-cuisine",
      title: "Musique & Cuisine · Cena Maridada",
      tag: "CADA DOS SEMANAS · VIERNES",
      icon: Sparkles,
      description:
        "Menú de pasos diseñado por el chef ejecutivo Pablo Aroma en sincronía sensorial con sets musicales en vivo y cócteles de autor creados por Santiago Contarino.",
      details: "5 Pasos de autor · Maridaje de alta gama · Alianzas de experiencias exclusivas",
      cta: "Reservar Cena Maridada",
    },
    {
      id: "wine-experience",
      title: "Andante Wine Experience · Catas en Cava",
      tag: "SÁBADOS · 19:30 HS",
      icon: Wine,
      description:
        "Catas guiadas por sommelier y ferias itinerantes de bodegas independientes y boutique de Argentina en nuestra cava subterránea de guarda.",
      details: "Cava Subsuelo (Capacidad máx. 14 comensales) · Charcutería & quesos de guarda",
      cta: "Reservar Cata en Cava",
    },
  ];

  return (
    <section
      id="agenda-cultural"
      aria-label="Música en Vivo y Agenda Cultural"
      className="relative w-full bg-surface py-16 sm:py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        {/* Cabecera Editorial */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brass mb-3">
            <Music className="h-4 w-4 text-amber" aria-hidden="true" />
            <span>AGENDA CULTURAL &amp; MÚSICA EN VIVO</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-linen leading-none">
            EL JAZZ EN COMPÁS HUMANO
          </h2>
          <p className="mt-4 font-sans text-base sm:text-lg text-mist leading-relaxed">
            Música acústica en vivo a volumen de conversación, cenas maridadas de autor y catas guiadas en Palermo Hollywood.
          </p>
        </div>

        {/* Retícula de Cartelera */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {events.map((event) => {
            const Icon = event.icon;
            return (
              <article
                key={event.id}
                className="group relative flex flex-col justify-between border border-brass/20 bg-canvas/80 p-6 sm:p-8 transition-all duration-300 hover:border-brass hover:shadow-2xl hover:shadow-brass/5"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-sans text-[11px] font-bold uppercase tracking-widest text-amber border border-amber/30 bg-amber/10 px-2.5 py-1">
                      {event.tag}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center border border-brass/30 bg-surface text-brass group-hover:scale-105 transition-transform">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                  </div>

                  <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-linen mb-3 group-hover:text-brass transition-colors">
                    {event.title}
                  </h3>

                  <p className="font-sans text-sm text-mist leading-relaxed mb-4">
                    {event.description}
                  </p>

                  <p className="font-sans text-xs text-linen/75 border-l-2 border-brass/40 pl-3 mb-6">
                    {event.details}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenReservation(event.title)}
                  className="w-full rounded-none border border-brass bg-transparent py-3 px-4 font-sans text-xs font-bold uppercase tracking-wider text-brass hover:bg-brass hover:text-canvas transition-colors cursor-pointer flex items-center justify-center gap-2 group/btn"
                >
                  <span>{event.cta}</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" aria-hidden="true" />
                </button>
              </article>
            );
          })}
        </div>

        {/* Nota al pie de agenda */}
        <div className="mt-12 text-center">
          <p className="font-sans text-xs uppercase tracking-widest text-mist">
            Arévalo 1677, Palermo Hollywood · Entrada libre para comensales con reserva previa
          </p>
        </div>
      </div>
    </section>
  );
}
