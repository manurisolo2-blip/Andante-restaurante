import React, { useState, useEffect } from "react";
import { MapPin, Phone, Clock, ExternalLink, MessageSquare, Compass, ShieldCheck } from "lucide-react";

interface SedeStatus {
  isOpen: boolean;
  statusLabel: string;
  detail: string;
}

/**
 * Calcula el estado de apertura en tiempo real para las sedes de Bogotá (UTC-5).
 */
function getSedeStatus(sedeId: "candelaria" | "macarena"): SedeStatus {
  try {
    const now = new Date();
    // Obtener día y hora en zona horaria America/Bogota
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Bogota",
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

    if (sedeId === "candelaria") {
      // Lun a Sáb: 12:00 a 23:00; Dom: 12:00 a 18:00
      if (day >= 1 && day <= 6) {
        if (currentDecimal >= 12 && currentDecimal < 23) {
          return { isOpen: true, statusLabel: "Abierto ahora", detail: "Cierra a las 23:00 hs" };
        }
        return {
          isOpen: false,
          statusLabel: "Cerrado ahora",
          detail: currentDecimal < 12 ? "Abre hoy a las 12:00 hs" : "Abre mañana a las 12:00 hs",
        };
      }
      // Domingo
      if (currentDecimal >= 12 && currentDecimal < 18) {
        return { isOpen: true, statusLabel: "Abierto ahora", detail: "Cierra a las 18:00 hs" };
      }
      return {
        isOpen: false,
        statusLabel: "Cerrado ahora",
        detail: currentDecimal < 12 ? "Abre hoy a las 12:00 hs" : "Abre lunes a las 12:00 hs",
      };
    }

    // Sede La Macarena: Mar a Sáb 12:00 a 23:00; Dom 12:00 a 17:00; Lunes cerrado
    if (day === 1) {
      return { isOpen: false, statusLabel: "Cerrado hoy", detail: "Descanso del personal · Abre martes 12:00 hs" };
    }
    if (day >= 2 && day <= 6) {
      if (currentDecimal >= 12 && currentDecimal < 23) {
        return { isOpen: true, statusLabel: "Abierto ahora", detail: "Cierra a las 23:00 hs" };
      }
      return {
        isOpen: false,
        statusLabel: "Cerrado ahora",
        detail: currentDecimal < 12 ? "Abre hoy a las 12:00 hs" : "Abre mañana a las 12:00 hs",
      };
    }
    // Domingo
    if (currentDecimal >= 12 && currentDecimal < 17) {
      return { isOpen: true, statusLabel: "Abierto ahora", detail: "Cierra a las 17:00 hs" };
    }
    return {
      isOpen: false,
      statusLabel: "Cerrado ahora",
      detail: currentDecimal < 12 ? "Abre hoy a las 12:00 hs" : "Abre martes a las 12:00 hs",
    };
  } catch {
    return { isOpen: true, statusLabel: "Abierto ahora", detail: "Horario de almuerzo y cena" };
  }
}

export function ContactMapSection() {
  const [candelariaStatus, setCandelariaStatus] = useState<SedeStatus>(() => getSedeStatus("candelaria"));
  const [macarenaStatus, setMacarenaStatus] = useState<SedeStatus>(() => getSedeStatus("macarena"));
  const [selectedMapSede, setSelectedMapSede] = useState<"candelaria" | "macarena">("candelaria");

  useEffect(() => {
    const updateStatuses = () => {
      setCandelariaStatus(getSedeStatus("candelaria"));
      setMacarenaStatus(getSedeStatus("macarena"));
    };
    updateStatuses();
    const interval = setInterval(updateStatuses, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="contacto"
      aria-label="Sedes Oficiales en Bogotá, Horarios y Contacto"
      className="relative w-full bg-surface/50 border-t border-brass/15 py-16 sm:py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        
        {/* Cabecera Principal */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brass mb-3">
            <Compass className="h-4 w-4 text-amber" aria-hidden="true" />
            <span>PRESENCIA EN BOGOTÁ · ALTA COCINA ITALIANA &amp; DE AUTOR</span>
          </div>
          <h2 className="font-display font-serif text-4xl sm:text-6xl font-bold uppercase tracking-tight text-linen leading-none">
            NUESTRAS SEDES &amp; CONTACTO
          </h2>
          <p className="mt-3 font-sans text-base text-mist leading-relaxed">
            Dos enclaves gastronómicos concebidos con idéntico rigor culinario y atmósfera íntima: el encanto colonial de La Candelaria y la vanguardia bohemia de La Macarena.
          </p>
        </div>

        {/* Tarjetas Comparativas de Sedes con Idéntica Simetría */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mb-14">
          
          {/* ========================================================= */}
          {/* TARJETA 1: SEDE LA CANDELARIA                             */}
          {/* ========================================================= */}
          <article className="border border-brass/25 bg-canvas/80 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-brass/60 hover:shadow-2xl hover:shadow-brass/5">
            <div>
              {/* Indicador en tiempo real de apertura */}
              <div className="flex items-center justify-between gap-2 border-b border-brass/15 pb-4 mb-5">
                <span className="font-sans text-[11px] font-black uppercase tracking-[0.2em] text-brass">
                  SEDE PATRIMONIAL
                </span>
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1 border text-xs font-bold uppercase tracking-wider ${
                    candelariaStatus.isOpen
                      ? "border-olive-green bg-olive-green/20 text-linen"
                      : "border-amber/40 bg-amber/15 text-amber"
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      candelariaStatus.isOpen ? "bg-olive-green animate-pulse" : "bg-amber"
                    }`}
                  />
                  <span>
                    {candelariaStatus.statusLabel} · {candelariaStatus.detail}
                  </span>
                </div>
              </div>

              {/* Nombre y subtítulo */}
              <h3 className="font-serif font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-linen">
                Sede La Candelaria
              </h3>
              <p className="font-sans text-xs uppercase tracking-widest text-brass mt-1 mb-4 font-semibold">
                Centro Histórico · Bogotá
              </p>
              <p className="font-sans text-xs sm:text-sm text-mist leading-relaxed mb-6">
                Casona republicana restaurada con techos altos de madera noble, patio andaluz y salón a media luz ambientado con jazz acústico.
              </p>

              {/* Dirección y Botón 'Cómo llegar' */}
              <div className="border border-brass/15 bg-surface/70 p-4 mb-5">
                <div className="flex items-start gap-2.5 text-linen mb-3">
                  <MapPin className="h-4 w-4 text-amber shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <span className="block font-sans text-xs font-bold uppercase tracking-wider text-mist">
                      Dirección Física
                    </span>
                    <span className="font-sans text-sm font-semibold text-linen">
                      Calle 11 # 2-78, La Candelaria, Bogotá
                    </span>
                  </div>
                </div>
                <a
                  href="https://maps.google.com/?q=Calle+11+%23+2-78,+La+Candelaria,+Bogota,+Colombia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex min-h-[48px] items-center justify-center gap-2 border border-brass/30 bg-canvas/80 px-4 py-2.5 font-sans text-xs font-bold uppercase tracking-wider text-brass hover:bg-brass hover:text-canvas transition-colors cursor-pointer select-none"
                  aria-label="Cómo llegar a Sede La Candelaria en Google Maps"
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
                  href="tel:+5713412345"
                  className="flex min-h-[48px] items-center justify-between border border-brass/20 bg-surface/50 px-4 py-2.5 text-linen hover:border-brass hover:text-brass transition-colors"
                  aria-label="Llamar al teléfono fijo de Sede La Candelaria al +57 1 341-2345"
                >
                  <div className="flex items-center gap-2.5">
                    <Phone className="h-4 w-4 text-brass" aria-hidden="true" />
                    <span className="font-sans text-xs font-semibold">Línea Fija Recepción</span>
                  </div>
                  <span className="font-sans text-xs sm:text-sm font-bold text-linen tabular-nums">
                    +57 (1) 341-2345
                  </span>
                </a>

                <a
                  href="tel:+573105551234"
                  className="flex min-h-[48px] items-center justify-between border border-brass/20 bg-surface/50 px-4 py-2.5 text-linen hover:border-brass hover:text-brass transition-colors"
                  aria-label="Llamar al móvil de reservas de Sede La Candelaria al +57 310 555-1234"
                >
                  <div className="flex items-center gap-2.5">
                    <Phone className="h-4 w-4 text-amber" aria-hidden="true" />
                    <span className="font-sans text-xs font-semibold">Móvil &amp; Reservas</span>
                  </div>
                  <span className="font-sans text-xs sm:text-sm font-bold text-linen tabular-nums">
                    +57 310 555-1234
                  </span>
                </a>
              </div>

              {/* Horarios Desglosados */}
              <div className="border border-brass/15 bg-surface/40 p-4 mb-6">
                <div className="flex items-center gap-2 text-brass mb-2">
                  <Clock className="h-3.5 w-3.5 text-amber" aria-hidden="true" />
                  <span className="font-sans text-xs font-bold uppercase tracking-wider">
                    Horarios de Atención
                  </span>
                </div>
                <div className="space-y-1 font-sans text-xs text-mist">
                  <p className="flex justify-between">
                    <span>Lunes a Sábado:</span>
                    <span className="font-semibold text-linen">12:00 a 23:00 hs</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Domingos &amp; Festivos:</span>
                    <span className="font-semibold text-linen">12:00 a 18:00 hs</span>
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Inferior de Reserva en Candelaria */}
            <a
              href="https://wa.me/573105551234?text=Hola%20Andante%20Restaurante%2C%20quisiera%20reservar%20una%20mesa%20en%20Sede%20La%20Candelaria."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex min-h-[48px] items-center justify-center gap-2.5 bg-brass px-6 py-3 font-sans text-xs font-bold uppercase tracking-widest text-canvas hover:bg-linen hover:text-canvas transition-colors border border-brass shadow-md select-none"
            >
              <MessageSquare className="h-4 w-4" aria-hidden="true" />
              <span>RESERVAR EN LA CANDELARIA</span>
            </a>
          </article>


          {/* ========================================================= */}
          {/* TARJETA 2: SEDE LA MACARENA                               */}
          {/* ========================================================= */}
          <article className="border border-brass/25 bg-canvas/80 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-brass/60 hover:shadow-2xl hover:shadow-brass/5">
            <div>
              {/* Indicador en tiempo real de apertura */}
              <div className="flex items-center justify-between gap-2 border-b border-brass/15 pb-4 mb-5">
                <span className="font-sans text-[11px] font-black uppercase tracking-[0.2em] text-brass">
                  SEDE BOHEMIA
                </span>
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1 border text-xs font-bold uppercase tracking-wider ${
                    macarenaStatus.isOpen
                      ? "border-olive-green bg-olive-green/20 text-linen"
                      : "border-amber/40 bg-amber/15 text-amber"
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      macarenaStatus.isOpen ? "bg-olive-green animate-pulse" : "bg-amber"
                    }`}
                  />
                  <span>
                    {macarenaStatus.statusLabel} · {macarenaStatus.detail}
                  </span>
                </div>
              </div>

              {/* Nombre y subtítulo */}
              <h3 className="font-serif font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-linen">
                Sede La Macarena
              </h3>
              <p className="font-sans text-xs uppercase tracking-widest text-brass mt-1 mb-4 font-semibold">
                Distrito Gastronómico · Bogotá
              </p>
              <p className="font-sans text-xs sm:text-sm text-mist leading-relaxed mb-6">
                Rincón bohemio con amplia barra de coctelería de autor, cavas a la vista y salón íntimo para maridajes y sobremesas prolongadas.
              </p>

              {/* Dirección y Botón 'Cómo llegar' */}
              <div className="border border-brass/15 bg-surface/70 p-4 mb-5">
                <div className="flex items-start gap-2.5 text-linen mb-3">
                  <MapPin className="h-4 w-4 text-amber shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <span className="block font-sans text-xs font-bold uppercase tracking-wider text-mist">
                      Dirección Física
                    </span>
                    <span className="font-sans text-sm font-semibold text-linen">
                      Carrera 4A # 26B-22, La Macarena, Bogotá
                    </span>
                  </div>
                </div>
                <a
                  href="https://maps.google.com/?q=Carrera+4A+%23+26B-22,+La+Macarena,+Bogota,+Colombia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex min-h-[48px] items-center justify-center gap-2 border border-brass/30 bg-canvas/80 px-4 py-2.5 font-sans text-xs font-bold uppercase tracking-wider text-brass hover:bg-brass hover:text-canvas transition-colors cursor-pointer select-none"
                  aria-label="Cómo llegar a Sede La Macarena en Google Maps"
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
                  href="tel:+5712865432"
                  className="flex min-h-[48px] items-center justify-between border border-brass/20 bg-surface/50 px-4 py-2.5 text-linen hover:border-brass hover:text-brass transition-colors"
                  aria-label="Llamar al teléfono fijo de Sede La Macarena al +57 1 286-5432"
                >
                  <div className="flex items-center gap-2.5">
                    <Phone className="h-4 w-4 text-brass" aria-hidden="true" />
                    <span className="font-sans text-xs font-semibold">Línea Fija Recepción</span>
                  </div>
                  <span className="font-sans text-xs sm:text-sm font-bold text-linen tabular-nums">
                    +57 (1) 286-5432
                  </span>
                </a>

                <a
                  href="tel:+573208885678"
                  className="flex min-h-[48px] items-center justify-between border border-brass/20 bg-surface/50 px-4 py-2.5 text-linen hover:border-brass hover:text-brass transition-colors"
                  aria-label="Llamar al móvil de reservas de Sede La Macarena al +57 320 888-5678"
                >
                  <div className="flex items-center gap-2.5">
                    <Phone className="h-4 w-4 text-amber" aria-hidden="true" />
                    <span className="font-sans text-xs font-semibold">Móvil &amp; Reservas</span>
                  </div>
                  <span className="font-sans text-xs sm:text-sm font-bold text-linen tabular-nums">
                    +57 320 888-5678
                  </span>
                </a>
              </div>

              {/* Horarios Desglosados */}
              <div className="border border-brass/15 bg-surface/40 p-4 mb-6">
                <div className="flex items-center gap-2 text-brass mb-2">
                  <Clock className="h-3.5 w-3.5 text-amber" aria-hidden="true" />
                  <span className="font-sans text-xs font-bold uppercase tracking-wider">
                    Horarios de Atención
                  </span>
                </div>
                <div className="space-y-1 font-sans text-xs text-mist">
                  <p className="flex justify-between">
                    <span>Martes a Sábado:</span>
                    <span className="font-semibold text-linen">12:00 a 23:00 hs</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Domingos &amp; Festivos:</span>
                    <span className="font-semibold text-linen">12:00 a 17:00 hs</span>
                  </p>
                  <p className="flex justify-between text-amber">
                    <span>Lunes:</span>
                    <span className="font-semibold">Cerrado por descanso</span>
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Inferior de Reserva en Macarena */}
            <a
              href="https://wa.me/573208885678?text=Hola%20Andante%20Restaurante%2C%20quisiera%20reservar%20una%20mesa%20en%20Sede%20La%20Macarena."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex min-h-[48px] items-center justify-center gap-2.5 bg-brass px-6 py-3 font-sans text-xs font-bold uppercase tracking-widest text-canvas hover:bg-linen hover:text-canvas transition-colors border border-brass shadow-md select-none"
            >
              <MessageSquare className="h-4 w-4" aria-hidden="true" />
              <span>RESERVAR EN LA MACARENA</span>
            </a>
          </article>

        </div>

        {/* Mapa Interactivo con Selector de Sede */}
        <div className="border border-brass/25 bg-canvas overflow-hidden">
          <div className="bg-canvas/90 px-5 py-4 border-b border-brass/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-sans">
            <div className="flex items-center gap-3">
              <span className="font-bold text-linen uppercase tracking-wider flex items-center gap-2">
                <MapPin className="h-4 w-4 text-brass" aria-hidden="true" />
                <span>MAPA DE LOCALIZACIÓN BOGOTÁ</span>
              </span>
            </div>

            {/* Pestañas para alternar sede en el mapa */}
            <div className="inline-flex border border-brass/30 p-1 bg-surface/60">
              <button
                type="button"
                onClick={() => setSelectedMapSede("candelaria")}
                className={`px-3 py-1.5 font-sans text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  selectedMapSede === "candelaria"
                    ? "bg-brass text-canvas"
                    : "text-mist hover:text-linen"
                }`}
              >
                La Candelaria
              </button>
              <button
                type="button"
                onClick={() => setSelectedMapSede("macarena")}
                className={`px-3 py-1.5 font-sans text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  selectedMapSede === "macarena"
                    ? "bg-brass text-canvas"
                    : "text-mist hover:text-linen"
                }`}
              >
                La Macarena
              </button>
            </div>
          </div>

          <div className="relative min-h-[360px] h-[380px] w-full">
            <iframe
              title={`Ubicación de Andante Restaurante Bar - ${selectedMapSede === "candelaria" ? "Sede La Candelaria" : "Sede La Macarena"}`}
              src={
                selectedMapSede === "candelaria"
                  ? "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.993444452134!2d-74.0722359!3d4.5976523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f99a19c5c93cb%3A0x6b24a3501cb6a620!2sLa%20Candelaria%2C%20Bogot%C3%A1!5e0!3m2!1ses!2sco!4v1710000000000!5m2!1ses!2sco"
                  : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.882194512967!2d-74.0664532!3d4.6148352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f99a6d7083c79%3A0x86134a6523a76352!2sLa%20Macarena%2C%20Bogot%C3%A1!5e0!3m2!1ses!2sco!4v1710000000000!5m2!1ses!2sco"
              }
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
