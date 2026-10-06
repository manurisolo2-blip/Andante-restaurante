import React from "react";
import { MapPin, Phone, Clock, Instagram, Accessibility, MessageSquare, ExternalLink } from "lucide-react";

export function ContactMapSection() {
  return (
    <section
      id="contacto"
      aria-label="Ubicación, Horarios y Contacto"
      className="relative w-full bg-surface/50 border-t border-brass/15 py-16 sm:py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        {/* Cabecera */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brass mb-3">
            <MapPin className="h-4 w-4 text-amber" aria-hidden="true" />
            <span>VISITANOS EN PALERMO HOLLYWOOD</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-bold uppercase tracking-tight text-linen leading-none">
            UBICACIÓN &amp; CONTACTO
          </h2>
          <p className="mt-3 font-sans text-base text-mist leading-relaxed">
            Arévalo 1677, entre El Salvador y Honduras · Ciudad Autónoma de Buenos Aires.
          </p>
        </div>

        {/* Retícula de Contacto + Mapa */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Bloque Izquierdo: Horarios, Teléfonos, Redes y Accesibilidad */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            {/* Horarios */}
            <div className="border border-brass/20 bg-canvas/80 p-6">
              <div className="flex items-center gap-3 text-brass mb-3">
                <Clock className="h-5 w-5 text-amber" aria-hidden="true" />
                <h3 className="font-display text-lg font-bold uppercase tracking-wider text-linen">
                  Horarios de Atención
                </h3>
              </div>
              <ul className="space-y-2 font-sans text-xs sm:text-sm text-linen/90">
                <li className="flex justify-between border-b border-brass/10 pb-1.5">
                  <span className="text-mist">Horario General de Salón:</span>
                  <span className="font-bold text-linen">Mar a Dom 09:00 a 01:00 hs</span>
                </li>
                <li className="flex justify-between border-b border-brass/10 pb-1.5">
                  <span className="text-mist">Bar &amp; Cenas:</span>
                  <span className="font-bold text-linen">Mar a Sáb 18:00 a 01:00 hs</span>
                </li>
                <li className="flex justify-between border-b border-brass/10 pb-1.5">
                  <span className="text-mist">Lunes:</span>
                  <span className="font-bold text-amber">Cerrado por descanso</span>
                </li>
                <li className="flex justify-between pt-1">
                  <span className="text-mist">Ciclos de Jazz:</span>
                  <span className="font-bold text-brass">Mar y Jue desde las 21:00 hs</span>
                </li>
              </ul>
            </div>

            {/* Teléfonos y WhatsApp Directo */}
            <div className="border border-brass/20 bg-canvas/80 p-6 space-y-4">
              <div className="flex items-center gap-3 text-brass">
                <Phone className="h-5 w-5 text-amber" aria-hidden="true" />
                <h3 className="font-display text-lg font-bold uppercase tracking-wider text-linen">
                  Teléfonos &amp; WhatsApp
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="https://wa.me/5491168673856?text=Hola%20Andante%20Bar%2C%20quisiera%20consultar%20por%20una%20reserva%20o%20evento."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col p-3 border border-brass/25 bg-surface hover:border-brass transition-colors"
                >
                  <span className="text-[11px] font-bold uppercase tracking-wider text-mist">Línea Salón Azul</span>
                  <span className="font-sans text-sm font-bold text-brass">+54 11 6867-3856</span>
                </a>
                <a
                  href="https://wa.me/5491168062589?text=Hola%20Andante%20Bar%2C%20quisiera%20consultar%20por%20el%20patio%20o%20barra."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col p-3 border border-brass/25 bg-surface hover:border-brass transition-colors"
                >
                  <span className="text-[11px] font-bold uppercase tracking-wider text-mist">Línea Patio &amp; Barra</span>
                  <span className="font-sans text-sm font-bold text-brass">+54 11 6806-2589</span>
                </a>
              </div>
              <div className="pt-1">
                <a
                  href="https://wa.me/5491168673856?text=Hola%20Andante%20Restaurante%20Bar%2C%20quisiera%20consultar%20disponibilidad."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-none bg-brass py-3 px-4 font-sans text-xs font-bold uppercase tracking-wider text-canvas hover:bg-linen hover:text-canvas transition-colors"
                >
                  <MessageSquare className="h-4 w-4" aria-hidden="true" />
                  <span>CONSULTAS RÁPIDAS VÍA WHATSAPP</span>
                </a>
              </div>
            </div>

            {/* Redes e Indicador de Accesibilidad */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/somos.andante"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 border border-brass/20 bg-canvas/80 p-4 hover:border-brass transition-colors group"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-none bg-surface border border-brass/30 text-brass group-hover:scale-105 transition-transform">
                  <Instagram className="h-4 w-4" aria-hidden="true" />
                </div>
                <div>
                  <span className="block font-sans text-[11px] font-bold uppercase tracking-wider text-mist">Instagram Oficial</span>
                  <span className="font-sans text-sm font-bold text-linen group-hover:text-brass transition-colors">@somos.andante</span>
                </div>
              </a>

              {/* Accesibilidad WCAG AA / Rampa */}
              <div className="flex items-center gap-3 border border-brass/20 bg-canvas/80 p-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-none bg-surface border border-amber/40 text-amber shrink-0">
                  <Accessibility className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <span className="block font-sans text-[11px] font-bold uppercase tracking-wider text-amber">Accesibilidad Total</span>
                  <span className="font-sans text-xs text-mist leading-tight block">Rampa y acceso adaptado para movilidad reducida</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bloque Derecho: Mapa Interactivo de Google Maps */}
          <div className="lg:col-span-7 border border-brass/25 overflow-hidden relative min-h-[380px] bg-canvas flex flex-col">
            <div className="bg-canvas/90 px-4 py-3 border-b border-brass/15 flex items-center justify-between text-xs font-sans">
              <span className="font-bold text-linen uppercase tracking-wider flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-brass" aria-hidden="true" />
                <span>Arévalo 1677, Palermo Hollywood, C1414CQG, Buenos Aires</span>
              </span>
              <a
                href="https://maps.google.com/?q=Arévalo+1677,+Palermo+Hollywood,+Buenos+Aires"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brass hover:text-linen inline-flex items-center gap-1 font-bold"
              >
                <span>Abrir en Maps</span>
                <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </a>
            </div>
            <iframe
              title="Ubicación de Andante Restaurante Bar en Palermo Hollywood"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.896791694297!2d-58.43940262348577!3d-34.581475772962164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb58a2d10c017%3A0x89e246e7fbe29f01!2sAr%C3%A9valo%201677%2C%20C1414CQG%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1710000000000!5m2!1ses!2sar"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "360px", flex: 1 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="filter contrast-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
