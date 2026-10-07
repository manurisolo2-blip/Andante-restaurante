import React, { useState } from "react";
import { Trees, Moon, Wine, ArrowRight } from "lucide-react";

export interface SpacesGallerySectionProps {
  onOpenReservation: (sectorTitle?: string) => void;
}

export function SpacesGallerySection({ onOpenReservation }: SpacesGallerySectionProps) {
  const [activeSpace, setActiveSpace] = useState<"salon" | "patio" | "cava">("salon");

  const spaces = [
    {
      id: "salon" as const,
      name: "Salón Azul Principal",
      subtitle: "A Media Luz & Clima Íntimo de Jazz",
      icon: Moon,
      tag: "AMBIENTE NOCTURNO · JAZZ EN VIVO",
      capacity: "Capacidad: 65 Comensales",
      description:
        "Muros bañados en azul noche profundo, iluminación de candelabros tenues y lámparas de latón. El epicentro de nuestra experiencia gastronómica nocturna con vista directa al escenario acústico.",
      features: [
        "Muros en azul noche profundo envolvente",
        "Mesas de roble y sillas tapizadas de alta costura",
        "Acústica diseñada para jazz en vivo sin saturación",
        "Servicio de barra de autor en salón",
      ],
      imageUrl: "/assets/mojo-bowl-ropa-vieja.jpg",
    },
    {
      id: "patio" as const,
      name: "Patio Interior al Aire Libre",
      subtitle: "Pulmón Verde & Cielo Abierto",
      icon: Trees,
      tag: "AL AIRE LIBRE · VEGETACIÓN & BRISA",
      capacity: "Capacidad: 50 Comensales",
      description:
        "Un oasis sereno en el corazón de Palermo Hollywood. Rodeado de vegetación nativa, árboles centenarios y guirnaldas de luz cálida. Ideal para almuerzos relajados, tardes de pastelería y noches estrelladas.",
      features: [
        "Amplio patio al aire libre con follaje y enredaderas",
        "Climatización estacional para confort todo el año",
        "Ambiente descontracturado con compás pausado",
        "Espacio pet friendly y acceso adaptado sin barreras",
      ],
      imageUrl: "/assets/mojo-cubano.jpg",
    },
    {
      id: "cava" as const,
      name: "Cava Privada & Guarda",
      subtitle: "Catas Exclusivas en el Subsuelo",
      icon: Wine,
      tag: "SUBSUELO HISTÓRICO · HASTA 14 COMENSALES",
      capacity: "Capacidad: 14 Comensales (Privado)",
      description:
        "Un espacio subterráneo climatizado que resguarda más de 120 etiquetas de bodegas boutique y vinos de corte de pequeños productores argentinos. Mesa comunal de madera maciza para reuniones íntimas y catas guiadas.",
      features: [
        "Temperatura y humedad controlada para vinos de guarda",
        "Mesa comunal de roble macizo para catas guiadas",
        "Privacidad absoluta para reuniones directivas o familiares",
        "Sommelier dedicado durante toda la experiencia",
      ],
      imageUrl: "/assets/mojo-catering.jpg",
    },
  ];

  const current = spaces.find((s) => s.id === activeSpace)!;

  return (
    <section
      id="espacios"
      aria-label="Espacios del Local"
      className="relative w-full bg-obsidian py-16 sm:py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        {/* Cabecera de la Sección */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brass mb-3">
            <span>ARQUITECTURA &amp; ATMÓSFERA</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-linen leading-none">
            ESPACIOS DE ANDANTE
          </h2>
          <p className="mt-4 font-sans text-base sm:text-lg text-mist leading-relaxed">
            Una casa histórica en Arévalo 1677 dividida en tres universos sensoriales: la intimidad del salón azul a media luz, la frescura de nuestro patio arbolado y el secreto de la cava subterránea.
          </p>
        </div>

        {/* Selector de Espacio */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-12">
          {spaces.map((sp) => {
            const Icon = sp.icon;
            const isSelected = activeSpace === sp.id;
            return (
              <button
                key={sp.id}
                type="button"
                onClick={() => setActiveSpace(sp.id)}
                className={`flex items-center gap-2.5 px-5 py-3 border font-sans text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  isSelected
                    ? "border-brass bg-surface text-brass shadow-lg shadow-brass/10"
                    : "border-brass/20 bg-canvas/60 text-mist hover:text-linen hover:border-brass/50"
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span>{sp.name}</span>
              </button>
            );
          })}
        </div>

        {/* Ficha Editorial del Espacio Activo */}
        <div className="border border-brass/25 bg-surface/70 grid grid-cols-1 lg:grid-cols-12 overflow-hidden shadow-2xl">
          {/* Información y detalles */}
          <div className="p-8 sm:p-12 lg:col-span-7 flex flex-col justify-between space-y-6">
            <div>
              <div className="inline-block border border-amber/30 bg-amber/10 px-3 py-1 font-sans text-[11px] font-bold uppercase tracking-widest text-amber mb-4">
                {current.tag}
              </div>

              <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-linen mb-2">
                {current.name}
              </h3>
              <p className="font-sans text-sm font-semibold uppercase tracking-wider text-brass mb-5">
                {current.subtitle} · {current.capacity}
              </p>

              <p className="font-sans text-base text-mist leading-relaxed mb-6">
                {current.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-brass/15">
                {current.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs font-sans text-linen/90">
                    <span className="h-1.5 w-1.5 rounded-full bg-brass mt-1.5 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6">
              <button
                type="button"
                onClick={() => onOpenReservation(current.name)}
                className="inline-flex items-center gap-2.5 rounded-none bg-brass px-7 py-3.5 font-sans text-xs sm:text-sm font-bold uppercase tracking-wider text-linen hover:bg-brass/90 transition-colors cursor-pointer select-none border border-brass shadow-md"
              >
                <span>RESERVAR MESA EN {current.name.toUpperCase()}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Imagen / Fondo Ilustrativo del Espacio */}
          <div className="relative min-h-[320px] lg:min-h-full lg:col-span-5 bg-canvas/90 overflow-hidden">
            <img
              src={current.imageUrl}
              alt={current.name}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover opacity-80 filter brightness-90 contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent lg:bg-gradient-to-r lg:from-surface lg:via-transparent lg:to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
