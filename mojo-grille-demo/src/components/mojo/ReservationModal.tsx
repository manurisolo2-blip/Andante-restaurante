import React, { useState, useEffect, useRef } from "react";
import { X, Calendar, Clock, Users, MapPin, AlertCircle, UtensilsCrossed, Check } from "lucide-react";
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

  // Formulario Mesa
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState<"almuerzo" | "merienda" | "cena">("cena");
  const [guests, setGuests] = useState("2");
  const [sector, setSector] = useState<"salon" | "patio">("salon");
  const [dietary, setDietary] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [formError, setFormError] = useState("");

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

    const sectorLabel = sector === "salon" ? "Salón Principal" : "Patio al Aire Libre";
    const slotLabel =
      timeSlot === "almuerzo"
        ? "Almuerzo (12:00 a 16:00 hs)"
        : timeSlot === "merienda"
        ? "Merienda / Café de Especialidad (16:00 a 19:30 hs)"
        : "Cena & Coctelería (20:00 a 01:00 hs)";

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

    const phoneTarget = "5491168062589";
    const url = `https://wa.me/${phoneTarget}?text=${encodeURIComponent(message)}`;
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
        className="relative w-full max-w-xl overflow-hidden rounded-none border border-brass/30 bg-surface shadow-2xl text-linen my-8"
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
                Reserva tu Mesa
              </h2>
              <div className="flex items-center gap-1.5 font-sans text-xs text-mist mt-0.5">
                <MapPin className="h-3 w-3 text-amber shrink-0" aria-hidden="true" />
                <span>Arévalo 1677 - Buenos Aires</span>
              </div>
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

        {/* Resumen de Horarios */}
        <div className="bg-canvas/30 px-6 py-2.5 border-b border-brass/10 flex items-center justify-between text-[11px] text-mist font-sans">
          <div className="flex items-center gap-1.5">
            <Clock className="h-3 w-3 text-amber" aria-hidden="true" />
            <span>Mar a Sáb 09:30 a 01:30 hs · Dom 09:30 a 00 hs</span>
          </div>
          <span className="text-amber/90 font-medium">Lunes cerrado</span>
        </div>

        {/* Mensaje de error / validación */}
        {formError && (
          <div className="mx-6 mt-4 flex items-center gap-2 border border-red-500/40 bg-red-950/40 px-4 py-2.5 text-xs text-red-200">
            <AlertCircle className="h-4 w-4 shrink-0 text-red-400" aria-hidden="true" />
            <span>{formError}</span>
          </div>
        )}

        {/* CONTENIDO FORMULARIO DE RESERVA */}
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
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="w-full bg-canvas border border-brass/25 px-3 py-2.5 text-sm text-linen focus:border-brass focus:outline-none"
              />
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
                <option value="cena">Cena &amp; Noche (20:00 a 01:00 hs)</option>
                <option value="almuerzo">Almuerzo (12:00 a 16:00 hs)</option>
                <option value="merienda">Merienda &amp; Café (16:00 a 19:30 hs)</option>
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
                <option value="+12">Más de 12 personas</option>
              </select>
            </div>

            <div>
              <label className="block font-sans text-xs font-bold uppercase tracking-wider text-mist mb-1">
                Sector Preferido *
              </label>
              <select
                value={sector}
                onChange={(e) => setSector(e.target.value as "salon" | "patio")}
                className="w-full bg-canvas border border-brass/25 px-3 py-2.5 text-sm text-linen focus:border-brass focus:outline-none"
              >
                <option value="salon">Salón Principal</option>
                <option value="patio">Patio al Aire Libre</option>
              </select>
            </div>
          </div>

          {/* Campo OBLIGATORIO: Restricciones alimentarias y alergias */}
          <div>
            <label className="block font-sans text-xs font-bold uppercase tracking-wider text-mist mb-1">
              Restricciones Alimentarias / Alergias *
            </label>
            <input
              type="text"
              required
              placeholder="Ej: Celíaco / Sin TACC, Vegetariano, Vegano, o 'Ninguna'"
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
                Teléfono de Contacto
              </label>
              <input
                type="tel"
                placeholder="+54 9 11 ..."
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
              <span>SOLICITAR RESERVA VÍA WHATSAPP (+54 9 11 6806-2589)</span>
            </button>
            <p className="mt-2 text-center text-[11px] text-mist">
              Te confirmaremos la reserva de tu mesa al instante por WhatsApp.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReservationModal;
