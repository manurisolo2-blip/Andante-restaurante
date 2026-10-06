import React, { useId, useState, useRef, useEffect } from "react";
import { ArrowUp, MapPin, Clock, Sparkles, Heart } from "lucide-react";
import gsap from "gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

export interface EditorialFooterProps {
  onOpenCart?: () => void;
}

const FOOTER_LINKS = [
  { href: "#top", label: "Inicio · Filosofía" },
  { href: "#carta-digital", label: "Carta Digital Interactiva" },
  { href: "#agenda-cultural", label: "Música en Vivo & Agenda Cultural" },
  { href: "#espacios", label: "Espacios: Salón Azul & Patio" },
  { href: "#contacto", label: "Ubicación, Mapa & Horarios" },
] as const;

export function EditorialFooter({ onOpenCart }: EditorialFooterProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const backToTopRef = useRef<HTMLButtonElement>(null);
  const emailFieldId = useId();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const btn = backToTopRef.current;
    if (!btn || typeof window === "undefined") return;
    if (reducedMotion) {
      gsap.set(btn, { x: 0, y: 0 });
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.hypot(deltaX, deltaY);

      if (distance < 80) {
        gsap.to(btn, {
          x: deltaX * 0.35,
          y: deltaY * 0.35,
          duration: 0.25,
          ease: "power2.out",
          overwrite: "auto",
        });
      } else {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.45,
          ease: "elastic.out(1, 0.4)",
          overwrite: "auto",
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.45,
        ease: "elastic.out(1, 0.4)",
        overwrite: "auto",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    btn.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      btn.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [reducedMotion]);

  const handleScrollToTop = () => {
    if (typeof window === "undefined") return;

    const windowWithLenis = window as unknown as {
      lenis?: { scrollTo: (target: number | string, opts?: { duration?: number }) => void };
    };

    if (windowWithLenis.lenis?.scrollTo) {
      windowWithLenis.lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
  };

  return (
    <footer
      aria-label="Pie de página editorial de Andante Restaurante Bar"
      className="relative bg-surface text-linen overflow-hidden pt-16 sm:pt-20 border-t border-brass/25"
    >
      <div className="mx-auto max-w-[1600px] w-full px-4 sm:px-6 lg:px-8">
        
        {/* 1. Marca de agua superior */}
        <div className="w-full border-b border-brass/20 pb-10 sm:pb-14 overflow-hidden">
          <div
            aria-hidden="true"
            className="text-[min(14vw,13rem)] font-display uppercase tracking-widest text-brass/20 leading-none select-none text-center sm:text-left"
          >
            ANDANTE
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between mt-3 text-xs sm:text-sm font-sans uppercase tracking-widest text-mist">
            <p className="font-semibold text-linen">
              BISTRÓ CONTEMPORÁNEO &amp; COCTELERÍA NOCTURNA · PALERMO HOLLYWOOD
            </p>
            <p className="font-sans font-bold uppercase tracking-[0.18em] text-brass mt-1 sm:mt-0">
              ARÉVALO 1677 · TEMPO 76–108 PPM · SIN TACC GARANTIZADO
            </p>
          </div>
        </div>

        {/* 2. Grilla de Información (3 Columnas) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 py-12 sm:py-16 border-b border-brass/20">
        
          {/* Columna 1: Horarios y Ubicación */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2 text-brass">
              <MapPin className="h-4 w-4" />
              <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-brass">
                Sede &amp; Horarios
              </h3>
            </div>

            <div className="space-y-1 font-sans text-base text-linen">
              <p className="font-bold text-base text-linen">Andante Restaurante Bar</p>
              <a
                href="https://maps.google.com/?q=Ar%C3%A9valo+1677,+Palermo+Hollywood,+Buenos+Aires"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center hover:text-brass hover:underline transition-colors cursor-pointer text-sm"
                aria-label="Ver Arévalo 1677 en Google Maps"
              >
                Arévalo 1677, Palermo Hollywood, C1414CQG, Buenos Aires
              </a>
              <p className="text-xs text-mist">Salón Azul · Patio Interior · Cava Privada</p>
              <p className="text-xs text-brass font-bold pt-1">
                Tel: +54 11 6867-3856 / +54 11 6806-2589
              </p>
            </div>

            <div className="pt-2 border-t border-brass/20 space-y-1 font-sans text-xs sm:text-sm text-mist leading-relaxed">
              <div className="flex items-center gap-1.5 font-bold text-linen">
                <Clock className="h-3.5 w-3.5 text-brass" aria-hidden="true" />
                <span>Horarios Oficiales:</span>
              </div>
              <p>Salón General: Mar a Dom 09:00 a 01:00 hs (Lunes cerrado)</p>
              <p>Bar &amp; Cenas: Mar a Sáb 18:00 a 01:00 hs</p>
              <p>Jazz Acústico: Mar y Jue 21:00 hs</p>
              <p className="pt-1 text-brass font-semibold">
                Instagram: <a href="https://www.instagram.com/somos.andante" target="_blank" rel="noopener noreferrer" className="underline hover:text-linen">@somos.andante</a>
              </p>
            </div>
          </div>

          {/* Columna 2: Enlaces de Navegación Rápida */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2 text-brass">
              <Sparkles className="h-4 w-4" />
              <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-brass">
                Navegación
              </h3>
            </div>

            <ul className="space-y-2.5 font-sans text-sm font-semibold text-linen">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex min-h-11 items-center hover:text-brass hover:underline hover:translate-x-1 transition-all duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={onOpenCart}
                  className="inline-flex min-h-11 items-center gap-1.5 hover:text-brass hover:underline hover:translate-x-1 transition-all duration-200 cursor-pointer text-left"
                >
                  Ver tu Orden o Reserva
                </button>
              </li>
            </ul>
          </div>

          {/* Columna 3: Registro a Novedades de Jazz & Catas */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-brass">
              Sobremesa &amp; Ciclos de Jazz
            </h3>
            <p className="font-sans text-sm text-mist leading-relaxed">
              Recibe avisos exclusivos sobre nuevas fechas de música en vivo, ingresos de bodega estacionales y catas privadas en nuestra cava subterránea.
            </p>

            {subscribed ? (
              <div
                role="status"
                aria-live="polite"
                className="py-3 px-4 bg-canvas border border-brass/40 text-brass font-sans text-sm font-bold flex items-center gap-2"
              >
                <Heart className="h-4 w-4 fill-brass" />
                <span>Gracias por unirte al compás de Andante.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <label htmlFor={emailFieldId} className="sr-only">
                  Correo electrónico para novedades
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    id={emailFieldId}
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    className="bg-canvas border border-brass/30 px-4 py-3 text-linen placeholder:text-mist/50 text-sm focus:outline-none focus:border-brass flex-1"
                  />
                  <button
                    type="submit"
                    className="bg-brass text-canvas hover:bg-amber hover:text-linen font-sans text-xs uppercase tracking-wider font-bold px-5 py-3 transition-colors cursor-pointer shrink-0"
                  >
                    SUSCRIBIRSE
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* 3. Barra Inferior Legal & Volver Arriba */}
        <div className="py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-mist">
          <p>© {new Date().getFullYear()} Andante Restaurante Bar. Arévalo 1677, Palermo Hollywood, CABA, Argentina.</p>
          <div className="flex items-center gap-6">
            <button
              ref={backToTopRef}
              type="button"
              onClick={handleScrollToTop}
              className="inline-flex items-center gap-1.5 text-brass hover:text-amber transition-colors font-bold uppercase tracking-wider cursor-pointer select-none"
              aria-label="Volver arriba de la página"
            >
              <span>VOLVER ARRIBA</span>
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default EditorialFooter;
