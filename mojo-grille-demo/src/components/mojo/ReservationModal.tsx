import React, { useState, useEffect, useRef } from "react";
import { X, Calendar, Clock, Users, MapPin, AlertCircle, Sparkles, Building2, UtensilsCrossed, Check } from "lucide-react";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { useBodyScrollLock } from "@/lib/useBodyScrollLock";

export interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultEventTitle?: string | undefined;
}

export function ReservationModal({
  isOpen,
  onClose,
  defaultEventTitle,
}: ReservationModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  useFocusTrap(modalRef, isOpen);
  useBodyScrollLock(isOpen);

  const [activeTab, setActiveTab] = useState<"mesa" | "eventos">("mesa");

  // Formulario Mesa
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState<"almuerzo" | "merienda" | "cena">("cena");
  const [guests, setGuests] = useState("2");
  const [sector, setSector] = useState<"salon-azul" | "patio">("salon-azul");
  const [dietary, setDietary] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [formError, setFormError] = useState("");

  // Formulario Eventos Corporativos
  const [eventType, setEventType] = useState("Corporativo / Jornada Empresarial");
  const [eventGuests, setEventGuests] = useState("20");
  const [eventDate, setEventDate] = useState("");
  const [eventNotes, setEventNotes] = useState("");
  const [eventContact, setEventContact] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleMesaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) {
      setFormError("Por favor selecciona una fecha.");
      return;
    }
    // Validación de lunes cerrado
    const selectedDay = new Date(date + "T12:00:00").getDay();
    if (selectedDay === 1) { // 1 = Lunes
      setFormError("Andante permanece cerrado los lunes. Por favor elija de martes a domingo.");
      return;
    }
    if (!dietary.trim()) {
      setFormError("Por favor indica las restricciones alimentarias o aclara 'Ninguna'.");
      return;
    }
    if (!name.trim()) {
      setFormError("Por favor ingresa tu nombre completo.");
      return;
    }

    setFormError("");

    const sectorLabel = sector === "salon-azul" ? "Salón Azul (Interior / Jazz)" : "Patio Interior al Aire Libre";
    const slotLabel =
      timeSlot === "almuerzo"
        ? "Almuerzo (12:00 a 15:30 hs)"
        : timeSlot === "merienda"
        ? "Merienda / Cafetería (16:00 a 19:30 hs)"
        : "Cena & Ciclo de Jazz (20:00 a 00:30 hs)";

    const message = [
      "Hola Andante Restaurante Bar! Deseo solicitar una reserva de mesa:",
      defaultEventTitle ? `• Experiencia / Ciclo: ${defaultEventTitle}` : null,
      `• Nombre: ${name.trim()}`,
      phone ? `• Teléfono: ${phone.trim()}` : null,
      `• Fecha: ${date}`,
      `• Franja Horaria: ${slotLabel}`,
      `• Comensales: ${guests} personas`,
      `• Sector Preferido: ${sectorLabel}`,
      `• Restricciones Alimentarias / Alergias: ${dietary.trim()}`,
      "Muchas gracias! Aguardo confirmación.",
    ]
      .filter(Boolean)
      .join("\n");

    const phoneTarget = sector === "salon-azul" ? "5491168673856" : "5491168062589";
    const url = `https://wa.me/${phoneTarget}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    onClose();
  };

  const handleEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventDate) {
      setFormError("Por favor indica la fecha estimada para el evento.");
      return;
    }
    if (!eventContact.trim()) {
      setFormError("Por favor indica tu nombre o empresa de contacto.");
      return;
    }

    setFormError("");

    const message = [
      "Hola Andante Restaurante Bar! Quisiera solicitar una cotización para un evento privado / corporativo:",
      `• Contacto / Empresa: ${eventContact.trim()}`,
      `• Tipo de Evento: ${eventType}`,
      `• Fecha Estimada: ${eventDate}`,
      `• Cantidad Estimada de Personas: ${eventGuests}`,
      eventNotes.trim() ? `• Detalles / Requerimientos: ${eventNotes.trim()}` : null,
      "Arévalo 1677, Palermo Hollywood.",
      "Muchas gracias! Aguardo su propuesta gastronómica y de barra.",
    ]
      .filter(Boolean)
      .join("\n");

    const url = `https://wa.me/5491168673856?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-reservation-title"
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-canvas/85 backdrop-blur-md"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl overflow-hidden rounded-none border border-brass/30 bg-surface shadow-2xl text-linen my-8"
      >
        {/* Cabecera del Modal */}
        <div className="flex items-center justify-between border-b border-brass/20 bg-canvas/60 px-6 py-5">
          <div className="flex items-center gap-3">
            <img
              src="/assets/andante-isotipo.png"
              alt="Andante Isotipo"
              className="h-9 w-9 object-contain rounded-full border border-brass/40 bg-surface"
            />
            <div>
              <h2
                id="modal-reservation-title"
                className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-linen"
              >
                Reservas &amp; Eventos Privados
              </h2>
              <p className="font-sans text-xs text-mist">
                Andante · Arévalo 1677, Palermo Hollywood
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar ventana de reservas"
            className="rounded-none p-2 text-mist hover:text-linen hover:bg-canvas transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Selector de Pestañas: Mesa vs Eventos */}
        <div className="grid grid-cols-2 border-b border-brass/15 bg-canvas/40 text-center font-sans text-xs font-bold uppercase tracking-wider">
          <button
            type="button"
            onClick={() => {
              setActiveTab("mesa");
              setFormError("");
            }}
            className={`py-3 px-4 border-b-2 transition-colors cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === "mesa"
                ? "border-brass text-brass bg-surface"
                : "border-transparent text-mist hover:text-linen"
            }`}
          >
            <UtensilsCrossed className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Reservar Mesa</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("eventos");
              setFormError("");
            }}
            className={`py-3 px-4 border-b-2 transition-colors cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === "eventos"
                ? "border-brass text-brass bg-surface"
                : "border-transparent text-mist hover:text-linen"
            }`}
          >
            <Building2 className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Eventos Privados</span>
          </button>
        </div>

        {/* Mensaje de error / validación */}
        {formError && (
          <div className="mx-6 mt-4 flex items-center gap-2 border border-red-500/40 bg-red-950/40 px-4 py-2.5 text-xs text-red-200">
            <AlertCircle className="h-4 w-4 shrink-0 text-red-400" aria-hidden="true" />
            <span>{formError}</span>
          </div>
        )}

        {/* CONTENIDO TAB 1: RESERVA DE MESA */}
        {activeTab === "mesa" ? (
          <form onSubmit={handleMesaSubmit} className="p-6 space-y-4">
            {defaultEventTitle && (
              <div className="border border-amber/30 bg-amber/10 px-4 py-2.5 text-xs text-amber font-sans">
                <span className="font-bold">Sesión seleccionada:</span> {defaultEventTitle}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-sans text-xs font-bold uppercase tracking-wider text-mist mb-1">
                  Fecha *
                </label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full bg-canvas border border-brass/25 px-3 py-2.5 text-sm text-linen focus:border-brass focus:outline-none"
                  />
                </div>
                <span className="text-[11px] text-mist/70 mt-0.5 block">
                  Martes a Domingo (Lunes cerrado)
                </span>
              </div>

              <div>
                <label className="block font-sans text-xs font-bold uppercase tracking-wider text-mist mb-1">
                  Franja Horaria *
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value as "almuerzo" | "merienda" | "cena")}
                  className="w-full bg-canvas border border-brass/25 px-3 py-2.5 text-sm text-linen focus:border-brass focus:outline-none"
                >
                  <option value="cena">Cena &amp; Jazz (20:00 a 00:30 hs)</option>
                  <option value="almuerzo">Almuerzo (12:00 a 15:30 hs)</option>
                  <option value="merienda">Merienda / Café (16:00 a 19:30 hs)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-sans text-xs font-bold uppercase tracking-wider text-mist mb-1">
                  Comensales *
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full bg-canvas border border-brass/25 px-3 py-2.5 text-sm text-linen focus:border-brass focus:outline-none"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((num) => (
                    <option key={num} value={num.toString()}>
                      {num} {num === 1 ? "persona" : "personas"}
                    </option>
                  ))}
                  <option value="+12">Más de 12 personas (Grupo)</option>
                </select>
              </div>

              <div>
                <label className="block font-sans text-xs font-bold uppercase tracking-wider text-mist mb-1">
                  Sector Preferido *
                </label>
                <select
                  value={sector}
                  onChange={(e) => setSector(e.target.value as "salon-azul" | "patio")}
                  className="w-full bg-canvas border border-brass/25 px-3 py-2.5 text-sm text-linen focus:border-brass focus:outline-none"
                >
                  <option value="salon-azul">Salón Azul (Muros noche &amp; Jazz en vivo)</option>
                  <option value="patio">Patio Interior (Al aire libre &amp; verde)</option>
                </select>
              </div>
            </div>

            {/* Campo OBLIGATORIO: Restricciones alimentarias y alergias */}
            <div>
              <label className="block font-sans text-xs font-bold uppercase tracking-wider text-mist mb-1">
                Restricciones Alimentarias / Alergias * (Obligatorio)
              </label>
              <input
                type="text"
                required
                placeholder="Ej: Celíaco / Sin TACC, Vegetariano, Vegano, Alergia a nueces o 'Ninguna'"
                value={dietary}
                onChange={(e) => setDietary(e.target.value)}
                className="w-full bg-canvas border border-brass/25 px-3 py-2.5 text-sm text-linen placeholder:text-mist/50 focus:border-brass focus:outline-none"
              />
              <span className="text-[11px] text-amber/90 mt-0.5 block">
                Nuestra cocina adapta pasos Sin TACC garantizados y opciones vegetarianas.
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-sans text-xs font-bold uppercase tracking-wider text-mist mb-1">
                  Nombre y Apellido *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Tu nombre completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-canvas border border-brass/25 px-3 py-2.5 text-sm text-linen placeholder:text-mist/50 focus:border-brass focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-sans text-xs font-bold uppercase tracking-wider text-mist mb-1">
                  Teléfono / WhatsApp
                </label>
                <input
                  type="tel"
                  placeholder="+54 11 ..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-canvas border border-brass/25 px-3 py-2.5 text-sm text-linen placeholder:text-mist/50 focus:border-brass focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full rounded-none bg-brass py-3.5 px-6 font-sans text-xs sm:text-sm font-bold uppercase tracking-wider text-canvas hover:bg-linen transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Check className="h-4 w-4" aria-hidden="true" />
                <span>SOLICITAR RESERVA VÍA WHATSAPP (+54 11 6867-3856)</span>
              </button>
              <p className="mt-2 text-center text-[11px] text-mist">
                Te responderemos al instante para confirmar la disponibilidad de tu mesa.
              </p>
            </div>
          </form>
        ) : (
          /* CONTENIDO TAB 2: EVENTOS PRIVADOS Y CORPORATIVOS */
          <form onSubmit={handleEventSubmit} className="p-6 space-y-4">
            <div className="border border-brass/20 bg-canvas/40 p-3 text-xs text-linen/90 leading-relaxed">
              Ofrecemos el salón azul completo, el patio interior o nuestra cava histórica para cenas de fin de año, catas guiadas, reuniones de directorio y celebraciones exclusivas.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-sans text-xs font-bold uppercase tracking-wider text-mist mb-1">
                  Nombre / Empresa *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Nombre de contacto o razón social"
                  value={eventContact}
                  onChange={(e) => setEventContact(e.target.value)}
                  className="w-full bg-canvas border border-brass/25 px-3 py-2.5 text-sm text-linen placeholder:text-mist/50 focus:border-brass focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-sans text-xs font-bold uppercase tracking-wider text-mist mb-1">
                  Tipo de Evento *
                </label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full bg-canvas border border-brass/25 px-3 py-2.5 text-sm text-linen focus:border-brass focus:outline-none"
                >
                  <option value="Corporativo / Jornada Empresarial">Corporativo / Jornada Empresarial</option>
                  <option value="Cata Exclusiva en Cava Subsuelo">Cata Exclusiva en Cava Subsuelo (Hasta 14 pers.)</option>
                  <option value="Cena Maridada con Jazz en Vivo">Cena Maridada con Jazz en Vivo</option>
                  <option value="Celebración / Cumpleaños Exclusivo">Celebración / Cumpleaños Exclusivo</option>
                  <option value="Alquiler Completo de Salón & Patio">Alquiler Completo de Salón &amp; Patio</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-sans text-xs font-bold uppercase tracking-wider text-mist mb-1">
                  Fecha Estimada *
                </label>
                <input
                  type="date"
                  required
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full bg-canvas border border-brass/25 px-3 py-2.5 text-sm text-linen focus:border-brass focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-sans text-xs font-bold uppercase tracking-wider text-mist mb-1">
                  Cantidad Estimada de Personas
                </label>
                <input
                  type="text"
                  placeholder="Ej: 15 a 40 invitados"
                  value={eventGuests}
                  onChange={(e) => setEventGuests(e.target.value)}
                  className="w-full bg-canvas border border-brass/25 px-3 py-2.5 text-sm text-linen placeholder:text-mist/50 focus:border-brass focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-sans text-xs font-bold uppercase tracking-wider text-mist mb-1">
                Requerimientos Gastronómicos / Técnicos
              </label>
              <textarea
                rows={3}
                placeholder="Menú por pasos de Pablo Aroma, barra libre de cócteles de autor de Santiago Contarino, proyector/pantalla, música en vivo..."
                value={eventNotes}
                onChange={(e) => setEventNotes(e.target.value)}
                className="w-full bg-canvas border border-brass/25 p-3 text-sm text-linen placeholder:text-mist/50 focus:border-brass focus:outline-none resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full rounded-none bg-brass py-3.5 px-6 font-sans text-xs sm:text-sm font-bold uppercase tracking-wider text-canvas hover:bg-linen transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Building2 className="h-4 w-4" aria-hidden="true" />
                <span>SOLICITAR COTIZACIÓN PERSONALIZADA</span>
              </button>
              <p className="mt-2 text-center text-[11px] text-mist">
                Atención corporativa personalizada por sommelier y equipo directivo de Andante.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
