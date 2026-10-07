import React, { useState, useEffect } from "react";
import { MapPin, Phone, Clock, ExternalLink, MessageSquare, Compass, Accessibility, Wine } from "lucide-react";

interface SpaceStatus {
  isOpen: boolean;
  statusLabel: string;
  detail: string;
}

/**
 * Calcula el estado de apertura en tiempo real para Palermo Hollywood, Buenos Aires (ART / UTC-3).
 */
function getSpaceStatus(spaceId: "salon" | "patio"): SpaceStatus {
  try {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Argentina/Buenos_Aires",
      hour12: false,
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
    });
    const parts = formatter.formatToParts(now);
    let weekdayStr = "";
    let hour = 0;
    let minute = 0;
    for (const part of parts) {
      if (part.type === "weekday") weekdayStr = part.value;
      if (part.type === "hour") hour = parseInt(part.value, 10);
      if (part.type === "minute") minute = parseInt(part.value, 10);
    }
    const dayMap: Record<string, number> = {
      Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
    };
    const day = dayMap[weekdayStr] ?? now.getDay();
    const currentDecimal = hour + minute / 60;

    // Lunes: Cerrado por descanso
    if (day === 1) {
      return { isOpen: false, statusLabel: "Cerrado hoy", detail: "Descanso semanal · Abre martes 09:00 hs" };
    }

    if (spaceId === "salon") {
      // Salón General: Mar a Dom de 09:00 a 01:00 hs del día siguiente
      // Abierto si >= 9 o < 1 (madrugada)
      if (currentDecimal >= 9 || currentDecimal < 1) {
        return { isOpen: true, statusLabel: "Abierto ahora", detail: "Cierra a la 01:00 hs" };
      }
      return {
        isOpen: false,
        statusLabel: "Cerrado ahora",
        detail: currentDecimal < 9 ? "Abre hoy a las 09:00 hs" : "Abre mañana a las 09:00 hs",
      };
    }

    // Patio Interior & Bar: Mar a Sáb de 18:00 a 01:00 hs
    if (day >= 2 && day <= 6) {
      if (currentDecimal >= 18 || currentDecimal < 1) {
        return { isOpen: true, statusLabel: "Abierto ahora", detail: "Cierra a la 01:00 hs" };
      }
      return {
        isOpen: false,
        statusLabel: "Cerrado ahora",
        detail: currentDecimal < 18 ? "Abre hoy a las 18:00 hs" : "Abre mañana a las 18:00 hs",
      };
    }
    // Domingos en patio
    if (currentDecimal >= 18 || currentDecimal < 1) {
      return { isOpen: true, statusLabel: "Abierto ahora", detail: "Cierra a la 01:00 hs" };
    }
    return {
      isOpen: false,
      statusLabel: "Cerrado ahora",
      detail: currentDecimal < 18 ? "Abre hoy a las 18:00 hs" : "Abre martes a las 18:00 hs",
    };
  } catch {
    return { isOpen: true, statusLabel: "Abierto ahora", detail: "Servicio de Salón & Bar" };
  }
}

export function ContactMapSection() {
  const [salonStatus, setSalonStatus] = useState<SpaceStatus>(() => getSpaceStatus("salon"));
  const [patioStatus, setPatioStatus] = useState<SpaceStatus>(() => getSpaceStatus("patio"));

  useEffect(() => {
    const updateStatuses = () => {
      setSalonStatus(getSpaceStatus("salon"));
      setPatioStatus(getSpaceStatus("patio"));
    };
    updateStatuses();
    const interval = setInterval(updateStatuses, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="contacto"
      aria-label="Ubicación en Palermo Hollywood, Espacios y Contacto Oficial"
      className="relative w-full bg-surface/50 border-t border-brass/15 py-16 sm:py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        
        {/* Cabecera Principal */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brass mb-3">
            <Compass className="h-4 w-4 text-amber" aria-hidden="true" />
            <span>PALERMO HOLLYWOOD · BUENOS AIRES, ARGENTINA</span>
          </div>
          <h2 className="font-display font-serif text-4xl sm:text-6xl font-bold uppercase tracking-tight text-linen leading-none">
            ESPACIOS &amp; CONTACTO DIRECTO
          </h2>
          <p className="mt-3 font-sans text-sm sm:text-base text-mist leading-relaxed">
            Arévalo 1677, C1414CQG, Palermo Hollywood (Comuna 14), Ciudad Autónoma de Buenos Aires.
          </p>
          <p className="mt-2 font-sans text-xs text-brass/80 font-medium tracking-wide">
            Aclaración territorial: Restaurante bar gastronómico ubicado en Palermo Hollywood, CABA (no confundir con comercios homónimos registrados en Córdoba o Río Tercero).
          </p>
        </div>

        {/* Tarjetas Comparativas de los Espacios Oficiales con Idéntica Simetría */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mb-14">
          
          {/* ========================================================= */}
          {/* TARJETA 1: SALÓN AZUL PRINCIPAL                           */}
          {/* ========================================================= */}
          <article className="border border-brass/25 bg-canvas/80 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-brass/60 hover:shadow-2xl hover:shadow-brass/5">
            <div>
              {/* Indicador en tiempo real de apertura */}
              <div className="flex items-center justify-between gap-2 border-b border-brass/15 pb-4 mb-5">
                <span className="font-sans text-[11px] font-black uppercase tracking-[0.2em] text-brass">
                  SALÓN PRINCIPAL
                </span>
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1 border text-xs font-bold uppercase tracking-wider ${
                    salonStatus.isOpen
                      ? "border-[#8DBE3D] bg-[#8DBE3D]/20 text-linen"
                      : "border-amber/40 bg-amber/15 text-amber"
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      salonStatus.isOpen ? "bg-[#8DBE3D] animate-pulse" : "bg-amber"
                    }`}
                  />
                  <span>
                    {salonStatus.statusLabel} · {salonStatus.detail}
                  </span>
                </div>
              </div>

              {/* Nombre y subtítulo */}
              <h3 className="font-serif font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-linen">
                Salón Azul Principal
              </h3>
              <p className="font-sans text-xs uppercase tracking-widest text-brass mt-1 mb-4 font-semibold">
                Atmósfera a Media Luz &amp; Jazz en Vivo
              </p>
              <p className="font-sans text-xs sm:text-sm text-mist leading-relaxed mb-6">
                Muros pintados íntegramente en color azul noche, claroscuro envolvente y arquitectura en varios niveles. Escenario de ciclos de jazz acústico en vivo los martes y jueves a las 21:00 hs.
              </p>

              {/* Dirección y Botón 'Cómo llegar' */}
              <div className="border border-brass/15 bg-surface/70 p-4 mb-5">
                <div className="flex items-start gap-2.5 text-linen mb-3">
                  <MapPin className="h-4 w-4 text-amber shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <span className="block font-sans text-xs font-bold uppercase tracking-wider text-mist">
                      Dirección Exacta
                    </span>
                    <span className="font-sans text-sm font-semibold text-linen">
                      Arévalo 1677, Palermo Hollywood, CABA
                    </span>
                  </div>
                </div>
                <a
                  href="https://maps.google.com/?q=Ar%C3%A9valo+1677,+Palermo+Hollywood,+Buenos+Aires"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex min-h-[48px] items-center justify-center gap-2 border border-brass/30 bg-canvas/80 px-4 py-2.5 font-sans text-xs font-bold uppercase tracking-wider text-brass hover:bg-brass hover:text-canvas transition-colors cursor-pointer select-none"
                  aria-label="Cómo llegar a Arévalo 1677 en Google Maps"
                >
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Cómo llegar · Google Maps</span>
                </a>
              </div>

              {/* Enlaces Telefónicos Funcionales (<a href="tel:..."> con min-h-[48px]) */}
              <div className="space-y-2 mb-5">
                <span className="block font-sans text-xs font-bold uppercase tracking-wider text-mist mb-1">
                  Atención Telefónica Directa
                </span>
                
                <a
                  href="tel:+541168673856"
                  className="flex min-h-[48px] items-center justify-between border border-brass/20 bg-surface/50 px-4 py-2.5 text-linen hover:border-brass hover:text-brass transition-colors"
                  aria-label="Llamar a línea Salón Azul al +54 11 6867-3856"
                >
                  <div className="flex items-center gap-2.5">
                    <Phone className="h-4 w-4 text-brass" aria-hidden="true" />
                    <span className="font-sans text-xs font-semibold">Línea Salón Azul</span>
                  </div>
                  <span className="font-sans text-xs sm:text-sm font-bold text-linen tabular-nums">
                    +54 11 6867-3856
                  </span>
                </a>

                <a
                  href="tel:+541168062589"
                  className="flex min-h-[48px] items-center justify-between border border-brass/20 bg-surface/50 px-4 py-2.5 text-linen hover:border-brass hover:text-brass transition-colors"
                  aria-label="Llamar a línea de reservas al +54 11 6806-2589"
                >
                  <div className="flex items-center gap-2.5">
                    <Phone className="h-4 w-4 text-amber" aria-hidden="true" />
                    <span className="font-sans text-xs font-semibold">Línea Reservas &amp; Cenas</span>
                  </div>
                  <span className="font-sans text-xs sm:text-sm font-bold text-linen tabular-nums">
                    +54 11 6806-2589
                  </span>
                </a>
              </div>

              {/* Horarios Desglosados */}
              <div className="border border-brass/15 bg-surface/40 p-4 mb-6">
                <div className="flex items-center gap-2 text-brass mb-2">
                  <Clock className="h-3.5 w-3.5 text-amber" aria-hidden="true" />
                  <span className="font-sans text-xs font-bold uppercase tracking-wider">
                    Horario de Salón &amp; Cafetería
                  </span>
                </div>
                <div className="space-y-1 font-sans text-xs text-mist">
                  <p className="flex justify-between">
                    <span>Martes a Domingo:</span>
                    <span className="font-semibold text-linen">09:00 a 01:00 hs</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Lunes:</span>
                    <span className="font-semibold text-amber">Cerrado por descanso</span>
                  </p>
                  <p className="flex justify-between pt-1 border-t border-brass/10">
                    <span>Ticket Estimado:</span>
                    <span className="font-semibold text-brass">$20.000 a $60.000 ARS</span>
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Inferior de Reserva en Salón Azul */}
            <a
              href="https://wa.me/5491168673856?text=Hola%20Andante%20Restaurante%20Bar%2C%20quisiera%20consultar%20disponibilidad%20para%20reservar%20una%20mesa%20en%20el%20Sal%C3%B3n%20Azul%20(Palermo%20Hollywood)."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex min-h-[48px] items-center justify-center gap-2.5 bg-brass px-6 py-3 font-sans text-xs font-bold uppercase tracking-widest text-canvas hover:bg-linen hover:text-canvas transition-colors border border-brass shadow-md select-none"
            >
              <MessageSquare className="h-4 w-4" aria-hidden="true" />
              <span>RESERVAR EN SALÓN AZUL</span>
            </a>
          </article>


          {/* ========================================================= */}
          {/* TARJETA 2: PATIO INTERIOR & BARRA CENTRAL                 */}
          {/* ========================================================= */}
          <article className="border border-brass/25 bg-canvas/80 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-brass/60 hover:shadow-2xl hover:shadow-brass/5">
            <div>
              {/* Indicador en tiempo real de apertura */}
              <div className="flex items-center justify-between gap-2 border-b border-brass/15 pb-4 mb-5">
                <span className="font-sans text-[11px] font-black uppercase tracking-[0.2em] text-brass">
                  PATIO &amp; BARRA DE AUTOR
                </span>
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1 border text-xs font-bold uppercase tracking-wider ${
                    patioStatus.isOpen
                      ? "border-[#8DBE3D] bg-[#8DBE3D]/20 text-linen"
                      : "border-amber/40 bg-amber/15 text-amber"
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      patioStatus.isOpen ? "bg-[#8DBE3D] animate-pulse" : "bg-amber"
                    }`}
                  />
                  <span>
                    {patioStatus.statusLabel} · {patioStatus.detail}
                  </span>
                </div>
              </div>

              {/* Nombre y subtítulo */}
              <h3 className="font-serif font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-linen">
                Patio Interior &amp; Barra
              </h3>
              <p className="font-sans text-xs uppercase tracking-widest text-brass mt-1 mb-4 font-semibold">
                Al Aire Libre &amp; Coctelería de Autor
              </p>
              <p className="font-sans text-xs sm:text-sm text-mist leading-relaxed mb-6">
                Área descubierta al aire libre rodeada de verde, ideal para noches templadas, catas de vino (Andante Wine Experience) y barra protagónica con coctelería diseñada por Santiago Contarino.
              </p>

              {/* Dirección y Botón 'Cómo llegar' */}
              <div className="border border-brass/15 bg-surface/70 p-4 mb-5">
                <div className="flex items-start gap-2.5 text-linen mb-3">
                  <MapPin className="h-4 w-4 text-amber shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <span className="block font-sans text-xs font-bold uppercase tracking-wider text-mist">
                      Dirección Exacta
                    </span>
                    <span className="font-sans text-sm font-semibold text-linen">
                      Arévalo 1677 (Patio Interior), Palermo Hollywood, CABA
                    </span>
                  </div>
                </div>
                <a
                  href="https://maps.google.com/?q=Ar%C3%A9valo+1677,+Palermo+Hollywood,+Buenos+Aires"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex min-h-[48px] items-center justify-center gap-2 border border-brass/30 bg-canvas/80 px-4 py-2.5 font-sans text-xs font-bold uppercase tracking-wider text-brass hover:bg-brass hover:text-canvas transition-colors cursor-pointer select-none"
                  aria-label="Cómo llegar a Arévalo 1677 en Google Maps"
                >
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Cómo llegar · Google Maps</span>
                </a>
              </div>

              {/* Enlaces Telefónicos Funcionales (<a href="tel:..."> con min-h-[48px]) */}
              <div className="space-y-2 mb-5">
                <span className="block font-sans text-xs font-bold uppercase tracking-wider text-mist mb-1">
                  Atención Telefónica Directa
                </span>
                
                <a
                  href="tel:+541168062589"
                  className="flex min-h-[48px] items-center justify-between border border-brass/20 bg-surface/50 px-4 py-2.5 text-linen hover:border-brass hover:text-brass transition-colors"
                  aria-label="Llamar a línea Patio y Barra al +54 11 6806-2589"
                >
                  <div className="flex items-center gap-2.5">
                    <Phone className="h-4 w-4 text-brass" aria-hidden="true" />
                    <span className="font-sans text-xs font-semibold">Línea Patio &amp; Barra</span>
                  </div>
                  <span className="font-sans text-xs sm:text-sm font-bold text-linen tabular-nums">
                    +54 11 6806-2589
                  </span>
                </a>

                <a
                  href="tel:+541168673856"
                  className="flex min-h-[48px] items-center justify-between border border-brass/20 bg-surface/50 px-4 py-2.5 text-linen hover:border-brass hover:text-brass transition-colors"
                  aria-label="Llamar a línea de eventos al +54 11 6867-3856"
                >
                  <div className="flex items-center gap-2.5">
                    <Wine className="h-4 w-4 text-amber" aria-hidden="true" />
                    <span className="font-sans text-xs font-semibold">Catas &amp; Eventos Privados</span>
                  </div>
                  <span className="font-sans text-xs sm:text-sm font-bold text-linen tabular-nums">
                    +54 11 6867-3856
                  </span>
                </a>
              </div>

              {/* Horarios Desglosados */}
              <div className="border border-brass/15 bg-surface/40 p-4 mb-6">
                <div className="flex items-center gap-2 text-brass mb-2">
                  <Clock className="h-3.5 w-3.5 text-amber" aria-hidden="true" />
                  <span className="font-sans text-xs font-bold uppercase tracking-wider">
                    Horario de Bar &amp; Cenas
                  </span>
                </div>
                <div className="space-y-1 font-sans text-xs text-mist">
                  <p className="flex justify-between">
                    <span>Martes a Sábado:</span>
                    <span className="font-semibold text-linen">18:00 a 01:00 hs</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Domingos:</span>
                    <span className="font-semibold text-linen">18:00 a 01:00 hs</span>
                  </p>
                  <p className="flex justify-between text-amber">
                    <span>Lunes:</span>
                    <span className="font-semibold">Cerrado por descanso</span>
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Inferior de Reserva en Patio & Barra */}
            <a
              href="https://wa.me/5491168062589?text=Hola%20Andante%20Restaurante%20Bar%2C%20quisiera%20consultar%20disponibilidad%20para%20el%20Patio%20Interior%20o%20la%20Barra%20(Palermo%20Hollywood)."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex min-h-[48px] items-center justify-center gap-2.5 bg-brass px-6 py-3 font-sans text-xs font-bold uppercase tracking-widest text-canvas hover:bg-linen hover:text-canvas transition-colors border border-brass shadow-md select-none"
            >
              <MessageSquare className="h-4 w-4" aria-hidden="true" />
              <span>RESERVAR EN PATIO &amp; BARRA</span>
            </a>
          </article>

        </div>

        {/* Módulo de Accesibilidad & Mapa Google Maps Embebido */}
        <div className="border border-brass/25 bg-canvas overflow-hidden">
          <div className="bg-canvas/90 px-5 py-4 border-b border-brass/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-sans">
            <div className="flex items-center gap-3">
              <span className="font-bold text-linen uppercase tracking-wider flex items-center gap-2">
                <MapPin className="h-4 w-4 text-brass" aria-hidden="true" />
                <span>ARÉVALO 1677, PALERMO HOLLYWOOD, CIUDAD AUTÓNOMA DE BUENOS AIRES</span>
              </span>
            </div>

            <div className="flex items-center gap-2 text-brass font-bold">
              <Accessibility className="h-4 w-4 text-amber" />
              <span className="text-[11px] uppercase tracking-wider">Ingreso adaptado con rampa para movilidad reducida</span>
            </div>
          </div>

          <div className="relative min-h-[360px] h-[380px] w-full">
            <iframe
              title="Ubicación oficial de Andante Restaurante Bar en Arévalo 1677, Palermo Hollywood, Buenos Aires"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.896791694297!2d-58.43940262348577!3d-34.581475772962164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb58a2d10c017%3A0x89e246e7fbe29f01!2sAr%C3%A9valo%201677%2C%20C1414CQG%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1710000000000!5m2!1ses!2sar"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "360px" }}
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

export default ContactMapSection;
