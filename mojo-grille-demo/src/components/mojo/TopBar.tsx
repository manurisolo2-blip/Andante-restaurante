import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { ChevronDown, MapPin, Menu, X, User, Phone, ArrowRight } from "lucide-react";
import { LatinMarketBagIcon } from "./LatinMarketBagIcon";
import { useCart } from "./cart";
import { AuthSwitch } from "../ui/auth-switch";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { useBodyScrollLock } from "@/lib/useBodyScrollLock";

export function AndanteAstrolabe({ className = "h-8 w-8 text-[#C9A86A]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Doble anillo concéntrico oficial */}
      <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 2" opacity="0.6" />
      <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="50" cy="50" r="26" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
      
      {/* 4 vértices cardinales en diamante (Rosa de los vientos / astrolabio) */}
      <polygon points="50,4 53,38 50,34 47,38" fill="currentColor" />
      <polygon points="50,96 53,62 50,66 47,62" fill="currentColor" />
      <polygon points="96,50 62,53 66,50 62,47" fill="currentColor" />
      <polygon points="4,50 38,53 34,50 38,47" fill="currentColor" />
      
      {/* Vértices diagonales secundarios */}
      <polygon points="76,24 58,42 56,40 58,38" fill="currentColor" opacity="0.5" />
      <polygon points="24,76 42,58 40,56 38,58" fill="currentColor" opacity="0.5" />
      <polygon points="76,76 58,58 60,56 58,54" fill="currentColor" opacity="0.5" />
      <polygon points="24,24 42,42 40,44 42,46" fill="currentColor" opacity="0.5" />

      {/* Monograma central 'A' de ANDANTE */}
      <circle cx="50" cy="50" r="14" fill="#0E1726" stroke="currentColor" strokeWidth="1" />
      <text x="50" y="55" textAnchor="middle" fill="currentColor" fontSize="12" fontFamily="serif" fontStyle="italic" fontWeight="bold">A</text>
    </svg>
  );
}

export interface TopBarProps {
  onOpenCart: () => void;
  onOpenReservation?: () => void;
}

export function TopBar({ onOpenCart, onOpenReservation }: TopBarProps) {
  const { count, location, setLocation, availableLocations } = useCart();

  const openingHours = (() => {
    const match = /(\d{1,2}:\d{2} [AP]M) to (\d{1,2}:\d{2} [AP]M)/.exec(location.hours);
    return match ? { opens: match[1], closes: match[2] } : null;
  })();
  const [open, setOpen] = useState(false);
  const [menuDrawerOpen, setMenuDrawerOpen] = useState(false);
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isPastHero, setIsPastHero] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const drawerRef = useRef<HTMLElement>(null);
  const accountModalRef = useRef<HTMLDivElement>(null);

  useFocusTrap(drawerRef, menuDrawerOpen);
  useFocusTrap(accountModalRef, accountModalOpen);
  useBodyScrollLock(menuDrawerOpen || accountModalOpen);

  const { scrollY } = useScroll();

  useEffect(() => {
    const header = headerRef.current;
    if (!header || typeof ResizeObserver === "undefined") return undefined;
    const root = document.documentElement;
    const publish = () => {
      root.style.setProperty("--header-h", `${Math.round(header.offsetHeight)}px`);
    };
    publish();
    const observer = new ResizeObserver(publish);
    observer.observe(header);
    return () => {
      observer.disconnect();
      root.style.removeProperty("--header-h");
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const checkPastHero = () => {
      const heroHeight = window.innerHeight;
      setIsPastHero(window.scrollY >= heroHeight - 80);
    };
    checkPastHero();
    window.addEventListener("resize", checkPastHero);
    return () => window.removeEventListener("resize", checkPastHero);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const heroHeight = typeof window !== "undefined" ? window.innerHeight : 800;
    const pastHero = latest >= heroHeight - 80;
    setIsPastHero(pastHero);

    if (latest <= 60 || menuDrawerOpen || accountModalOpen) {
      setIsVisible(true);
      return;
    }

    if (!pastHero) {
      setIsVisible(true);
      return;
    }

    const previous = scrollY.getPrevious() ?? 0;
    const diff = latest - previous;

    if (diff > 5) {
      setIsVisible(false);
      if (open) setOpen(false);
    } else if (diff < -5) {
      setIsVisible(true);
    }
  });

  useEffect(() => {
    if (menuDrawerOpen || accountModalOpen) {
      setIsVisible(true);
    }
  }, [menuDrawerOpen, accountModalOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (open) {
          setOpen(false);
        } else if (accountModalOpen) {
          setAccountModalOpen(false);
        } else if (menuDrawerOpen) {
          setMenuDrawerOpen(false);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, menuDrawerOpen, accountModalOpen]);

  return (
    <>
      <motion.header
        ref={headerRef}
        initial={false}
        animate={{ y: isVisible ? "0%" : "-100%" }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 will-change-transform transition-all duration-300 ${
          isPastHero
            ? "bg-[#0E1726]/90 backdrop-blur-xl border-b border-[#C9A86A]/20 shadow-[0_8px_32px_0_rgba(14,23,38,0.5)]"
            : "bg-transparent border-b border-transparent shadow-none"
        }`}
      >
        <div className="w-full">
          <nav className="mx-auto max-w-[1600px] w-full flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 py-3.5">
            {/* Extremo Izquierdo: Logo del restaurante */}
            <a
              href="#top"
              className="flex min-h-[48px] min-w-0 items-center gap-3 group cursor-pointer select-none"
              aria-label="Andante Restaurante Bar Home"
            >
              <img
                src="/assets/andante-isotipo.png"
                alt="Andante Isotipo"
                width={38}
                height={38}
                className="h-9 w-9 sm:h-10 sm:w-10 object-contain rounded-full border border-brass/40 shadow-sm transition-transform duration-500 group-hover:rotate-45"
              />
              <div className="flex flex-col">
                <span className="font-display text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-[0.15em] text-linen leading-none transition-colors group-hover:text-brass truncate">
                  ANDANTE
                </span>
                <span className="font-sans text-[9px] uppercase tracking-[0.25em] text-brass/90 font-semibold mt-0.5">
                  RESTAURANTE · BAR
                </span>
              </div>
            </a>

            {/* Centro: Enlaces de navegación limpios (Desktop) */}
            <div className="hidden lg:flex items-center gap-7">
              {[
                { label: "Inicio", href: "#top" },
                { label: "Menú", href: "#menu" },
                { label: "Sedes", href: "#espacios" },
                { label: "Eventos", href: "#agenda-cultural" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-sans text-xs uppercase tracking-[0.22em] font-bold text-linen/90 hover:text-brass transition-colors py-2 px-1 relative"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Extremo Derecho: Botón Destacado 'Reservar Mesa', Bolsa de Compra y Menú Móvil */}
            <div className="flex shrink-0 items-center gap-2.5 sm:gap-3">
              {/* Botón Destacado de Llamada a la Acción Primario */}
              <button
                type="button"
                onClick={() => {
                  if (onOpenReservation) onOpenReservation();
                  else {
                    const el = document.getElementById("reservas");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                    else setAccountModalOpen(true);
                  }
                }}
                className="hidden sm:inline-flex min-h-[48px] items-center justify-center rounded-none bg-brass px-5 sm:px-6 py-2.5 font-sans text-xs font-bold uppercase tracking-widest text-canvas hover:bg-linen hover:text-canvas transition-colors cursor-pointer select-none border border-brass shadow-md"
              >
                <span>Reservar Mesa</span>
              </button>

              {/* Bolsa de Compra / Pedido */}
              <button
                type="button"
                onClick={onOpenCart}
                aria-label={
                  count > 0
                    ? `Ver orden, ${count} ${count === 1 ? "ítem" : "ítems"}`
                    : "Ver orden, vacía"
                }
                className="relative grid h-12 w-12 min-h-[48px] min-w-[48px] place-items-center rounded-full bg-brass text-canvas transition-all hover:bg-amber hover:text-canvas active:scale-95 cursor-pointer select-none border border-brass/50 shadow-md"
              >
                <LatinMarketBagIcon className="h-5 w-5 stroke-[2.2] text-[#0E1726]" />
                {count > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full border border-canvas bg-amber px-1 font-sans text-xs font-black text-linen shadow-none">
                    {count}
                  </span>
                )}
              </button>

              {/* Menú Hamburguesa Accesible para Dispositivos Móviles (área táctil >= 48x48 px) */}
              <button
                type="button"
                onClick={() => setMenuDrawerOpen(true)}
                aria-label="Abrir menú de navegación"
                aria-expanded={menuDrawerOpen}
                className="lg:hidden flex h-12 w-12 min-h-[48px] min-w-[48px] items-center justify-center rounded-none bg-surface/80 border border-brass/30 text-linen hover:text-brass hover:border-brass transition-colors cursor-pointer select-none"
              >
                <Menu className="h-6 w-6 stroke-[2]" aria-hidden="true" />
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Menú Lateral Desplegable (Slide-over Drawer en Dark Luxury) */}
      <AnimatePresence>
        {menuDrawerOpen && (
          <div className="fixed inset-0 z-50">
            {/* Backdrop con desenfoque nocturno */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-[#0E1726]/75 backdrop-blur-sm"
              onClick={() => setMenuDrawerOpen(false)}
              aria-hidden="true"
            />

            {/* Panel Lateral Drawer en Azul Marino Profundo (#162238) */}
            <motion.aside
              ref={drawerRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 36 }}
              role="dialog"
              aria-modal="true"
              lang="es"
              aria-label="Menú de navegación y espacios"
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-none md:max-w-md bg-surface border-l border-brass/20 px-6 py-8 md:p-8 flex flex-col justify-between overflow-y-auto text-linen"
            >
              <div className="space-y-10 md:space-y-8">
                {/* Encabezado del Menú Drawer */}
                <div className="flex items-center justify-between border-b border-brass/15 pb-4">
                  <div className="flex items-center gap-2.5">
                    <img
                      src="/assets/andante-isotipo.png"
                      alt="Andante Isotipo"
                      width={28}
                      height={28}
                      className="h-7 w-7 object-contain rounded-full border border-brass/40"
                    />
                    <span className="font-display text-2xl sm:text-3xl font-black uppercase tracking-wider text-linen">
                      ANDANTE <span className="text-brass">BAR</span>
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMenuDrawerOpen(false)}
                    aria-label="Cerrar menú"
                    className="flex h-12 w-12 min-h-[48px] min-w-[48px] shrink-0 items-center justify-center rounded-none text-linen hover:text-brass transition-colors cursor-pointer border border-brass/20"
                  >
                    <X className="h-6 w-6 stroke-[2.2]" aria-hidden="true" />
                  </button>
                </div>

                {/* 1. NAVEGACIÓN PRINCIPAL */}
                <nav className="space-y-3">
                  <span className="font-sans text-xs font-black uppercase tracking-widest text-brass block mb-1">
                    NAVEGACIÓN
                  </span>
                  {[
                    { href: "#top", label: "Inicio" },
                    { href: "#menu", label: "Menú" },
                    { href: "#espacios", label: "Sedes" },
                    { href: "#agenda-cultural", label: "Eventos" },
                  ].map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuDrawerOpen(false)}
                      className="group flex min-h-[48px] items-center justify-between py-2 text-linen hover:text-brass transition-colors cursor-pointer border-b border-brass/10"
                    >
                      <span className="font-display text-2xl font-black uppercase tracking-tight">
                        {item.label}
                      </span>
                      <ArrowRight
                        className="h-5 w-5 shrink-0 text-brass opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                        aria-hidden="true"
                      />
                    </a>
                  ))}

                  {/* Botón Destacado Móvil: Reservar Mesa */}
                  <div className="pt-3">
                    <button
                      type="button"
                      onClick={() => {
                        setMenuDrawerOpen(false);
                        if (onOpenReservation) onOpenReservation();
                        else {
                          const el = document.getElementById("reservas");
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                          else setAccountModalOpen(true);
                        }
                      }}
                      className="w-full flex min-h-[48px] items-center justify-center rounded-none bg-brass px-6 py-3 font-sans text-xs font-bold uppercase tracking-widest text-canvas hover:bg-linen hover:text-canvas transition-colors cursor-pointer select-none border border-brass shadow-lg"
                    >
                      Reservar Mesa
                    </button>
                  </div>
                </nav>

                {/* 2. ESPACIOS ANDANTE · ARÉVALO 1677 */}
                <div className="space-y-3 pt-2 border-t border-brass/15">
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-xs font-black uppercase tracking-widest text-brass">
                      ESPACIOS · ARÉVALO 1677
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-sans text-xs font-bold text-amber">
                      <span aria-hidden="true" className="h-2 w-2 rounded-full bg-amber animate-pulse" />
                      Abierto hoy
                    </span>
                  </div>

                  {/* Selector interactivo de espacio */}
                  <div ref={dropdownRef} className="relative">
                    <button
                      type="button"
                      onClick={() => setOpen((v) => !v)}
                      aria-haspopup="listbox"
                      aria-expanded={open}
                      aria-label={`Seleccionar espacio, actualmente ${location.name}`}
                      className="flex min-h-11 items-center gap-2 font-display text-xl font-black uppercase tracking-tight text-linen hover:text-brass transition-colors cursor-pointer select-none"
                    >
                      <MapPin className="h-4 w-4 text-brass stroke-[2.2] shrink-0" />
                      <span>{location.name}</span>
                      <ChevronDown
                        className={`h-4 w-4 text-mist transition-transform shrink-0 ${
                          open ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {open && (
                      <ul
                        role="listbox"
                        aria-label="Espacios de Andante Restaurante Bar"
                        className="absolute left-0 right-0 top-full mt-2 py-2 bg-[#0E1726] border border-brass/30 z-50 space-y-1 shadow-2xl"
                      >
                        {availableLocations.map((loc) => (
                          <li key={loc.id} role="option" aria-selected={loc.id === location.id}>
                            <button
                              type="button"
                              onClick={() => {
                                setLocation(loc.id);
                                setOpen(false);
                              }}
                              className={`block min-h-11 w-full px-3 py-2 text-left font-sans text-xs uppercase tracking-wider font-bold transition-colors ${
                                loc.id === location.id
                                  ? "font-black text-brass bg-surface/50"
                                  : "text-linen hover:text-brass hover:bg-surface/30"
                              }`}
                            >
                              <div>{loc.name}</div>
                              <div className="text-[11px] text-mist font-normal">
                                {loc.address.street}
                              </div>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(location.address.fullAddress)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block font-sans text-xs text-mist hover:text-brass hover:underline transition-colors cursor-pointer"
                    aria-label={`Ver ${location.address.fullAddress} en Google Maps`}
                  >
                    {location.address.fullAddress}
                  </a>

                  <a
                    href={`tel:${location.phone.replace(/[^0-9+]/g, "")}`}
                    className="inline-flex min-h-11 items-center gap-1.5 text-brass font-bold text-xs uppercase tracking-wider hover:underline"
                  >
                    <Phone className="h-3 w-3" aria-hidden="true" />
                    <span>{location.phone}</span>
                  </a>
                </div>

                {/* 3. EXPERIENCIA & MEMBRESÍA ANDANTE */}
                <div className="space-y-1.5 pt-2 border-t border-brass/15">
                  <span className="font-sans text-xs font-black uppercase tracking-widest text-brass block">
                    MEMBRESÍA &amp; RESERVAS
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setMenuDrawerOpen(false);
                      setAccountModalOpen(true);
                    }}
                    className="group text-left cursor-pointer select-none"
                  >
                    <p className="flex items-center gap-2 font-display text-xl font-black uppercase tracking-tight text-linen group-hover:text-brass transition-colors">
                      ACCESO PREFERENCIAL A JAZZ
                      <ArrowRight className="h-5 w-5 shrink-0 text-brass" aria-hidden="true" />
                    </p>
                    <p className="font-sans text-xs text-mist mt-0.5">
                      Reservas anticipadas para ciclos de jazz en vivo y catas en cava.
                    </p>
                  </button>
                </div>
              </div>

              {/* Pie del Menú Drawer */}
              <div className="flex pt-6 items-center justify-between text-xs text-mist font-sans uppercase tracking-widest font-bold border-t border-brass/15">
                <span>Palermo Hollywood · CABA</span>
                <span className="text-brass">Tempo 76–108 PPM</span>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Apartado Dedicado de Cuenta / Reservas (Modal) */}
      <AnimatePresence>
        {accountModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-[#0E1726]/80 backdrop-blur-md"
              onClick={() => setAccountModalOpen(false)}
              aria-hidden="true"
            />

            <motion.div
              ref={accountModalRef}
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ type: "spring", stiffness: 450, damping: 32 }}
              role="dialog"
              aria-modal="true"
              lang="es"
              aria-label="Apartado de cuenta y reservas Andante"
              className="relative z-50 w-full max-w-3xl lg:max-w-4xl bg-surface border border-brass/30 my-auto overflow-hidden shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setAccountModalOpen(false)}
                aria-label="Cerrar apartado de reservas"
                className="absolute top-3.5 right-3.5 z-40 grid h-11 w-11 place-items-center text-linen hover:text-brass transition-colors cursor-pointer"
              >
                <X className="h-5 w-5 stroke-[2.2]" aria-hidden="true" />
              </button>

              <AuthSwitch onAuthSuccess={() => {}} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default TopBar;
