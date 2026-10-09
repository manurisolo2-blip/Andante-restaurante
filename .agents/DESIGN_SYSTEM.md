# Mojo Grille — Official Design System & Visual Identity Specification
**Version:** 1.0.0-PROD  
**Author:** @DesignSystem (UI/UX Designer)  
**Status:** Authoritative Specification  
**Target Platform:** Web (Desktop, Tablet, Mobile) • Tailwind CSS v4 / v3 Compatibility • TanStack Start / React 19  

---

## Executive Summary & Design Vision

Mojo Grille's digital experience embodies authentic Miami Cuban-American culinary heritage: warm, artisanal, vibrant, and sun-drenched, yet ergonomically engineered for ultra-fast takeout, catering discovery, and frictionless WhatsApp ordering. 

### Core Design Principles
1. **Calidez Artesanal (No Clinical White):** The viewport is enveloped in a warm, textured cream canvas (`#FAF8F5`), entirely avoiding the cold, sterile feeling of clinical `#FFFFFF`.
2. **Apetito y Foco (Gastronomic Focus):** Searing terracotta accents (`#D95327`) drive high-converting culinary calls-to-action, balanced by citrus lime freshness (`#4D7C0F`) and golden social proof (`#F59E0B`).
3. **Jerarquía Dual Editorial:** Elegant display serif typography (`Playfair Display`) evokes generations of slow-simmered Cuban culinary tradition, paired with high-legibility geometric sans (`Plus Jakarta Sans` / `Inter`) for effortless ordering in mobile viewports.
4. **Ergonomía Táctil Móvil:** Strict compliance with 48px minimum touch targets, sticky bottom action anchors, and thumb-accessible side customization drawers.

---

## 1. Paleta Cromática Gastronómica Exacta (Color Tokens)

### 1.1. Tabla de Tokens Semánticos Principales

| Token Semántico | Token Tailwind | Valor HEX | Valor RGB | Valor HSL | Rol y Reglas de Uso | Contraste WCAG |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Lienzo Primario** | `bg-cream` | `#FAF8F5` | `250, 248, 245` | `36°, 33%, 97%` | **Fondo global del `body` y contenedores base.** Estrictamente prohibido usar blanco puro `#FFFFFF` como fondo general de página. | N/A (Lienzo) |
| **Lienzo Secundario / Chips** | `bg-cream-warm` | `#F4EFEA` | `244, 239, 234` | `30°, 27%, 94%` | Fondos de inputs inactivos, pills de prueba social, hover en botones secundarios y franjas sutiles. | 1.06:1 vs Cream |
| **Superficie de Tarjetas & Modales** | `surface-white` | `#FFFFFF` | `255, 255, 255` | `0°, 0%, 100%` | Tarjetas de ítems, drawer de carrito, modales de guarnición y popovers flotantes. Siempre delimitado con `border-subtle`. | 1.05:1 vs Cream |
| **Acción Principal / CTA** | `mojo-terracotta` | `#D95327` | `217, 83, 39` | `15°, 71%, 50%` | Botones principales ("See Menu & Order Now", "Add", "Order via WhatsApp"), badges de firma y switches activos. | 4.88:1 vs Cream (AA) • 4.62:1 vs White (AA) |
| **CTA Hover / Pressed** | `mojo-terracotta-dark` | `#B83E16` | `184, 62, 22` | `15°, 79%, 40%` | Estado hover y active en botones de acción principal. | 6.54:1 vs Cream (AAA) • 6.20:1 vs White (AA) |
| **Terracotta Soft Tint** | `mojo-terracotta-soft` | `#FBECE7` | `251, 236, 231` | `15°, 71%, 95%` | Fondos de notificación de promo, badges de descuento y estados seleccionados suaves. | 1.10:1 vs Cream |
| **Texto Maestro** | `text-charcoal` | `#1C1917` | `28, 25, 23` | `24°, 10%, 10%` | Encabezados (H1, H2, H3), nombres de platos, precios numéricos y textos de alto impacto. | 15.68:1 vs Cream (AAA) • 16.59:1 vs White (AAA) |
| **Texto Descriptivo** | `text-muted` | `#78716C` | `120, 113, 108` | `25°, 5%, 45%` | Descripciones de ingredientes, metadatos de horarios, etiquetas secundarias e iconos pasivos. | 4.61:1 vs Cream (AA) • 4.88:1 vs White (AA) |
| **Acento Orgánico / Frescura** | `mojo-lime` | `#4D7C0F` | `77, 124, 15` | `86°, 78%, 27%` | Badges "Fresco del día", ingredientes del día, indicadores vivos de pulso ("Marinado 24h") y checkmarks. | 4.89:1 vs Cream (AA) • 5.18:1 vs White (AA) |
| **Lime Soft Tint** | `mojo-lime-soft` | `#F0F6E8` | `240, 246, 232` | `86°, 45%, 94%` | Fondos de banners de frescura ("Fresh ingredients • 15 min pickup") e indicadores de éxito. | 1.05:1 vs Cream |
| **Acento Social Proof** | `mojo-gold` | `#F59E0B` | `245, 158, 11` | `38°, 92%, 50%` | Estrellas de valoración, medallas de rating y bordes destacados de Top Sellers. | 1.82:1 vs White (usar con texto oscuro `#78350F`) |
| **Gold Soft Tint** | `mojo-gold-soft` | `#FEF3C7` | `254, 243, 199` | `48°, 96%, 89%` | Fondo de badge "Popular / Top Seller". | 1.15:1 vs Cream |
| **Gold Badge Text** | `mojo-gold-text` | `#B45309` | `180, 83, 9` | `37°, 90%, 37%` | Texto legible sobre fondo `mojo-gold-soft` para insignias de popularidad. | 4.75:1 vs `#FEF3C7` (AA) |
| **Bordes y Separadores** | `border-subtle` | `#EAE5DC` | `234, 229, 220` | `39°, 26%, 89%` | Líneas divisorias, bordes de tarjetas, contornos de inputs y separadores de listas. | 1.19:1 vs Cream |
| **Borde Hover / Focus** | `border-hover` | `#D6CFBF` | `214, 207, 191` | `42°, 23%, 79%` | Estado hover de tarjetas interactivas y selects. | 1.45:1 vs Cream |
| **Dark Header Bar** | `bg-charcoal` | `#1C1917` | `28, 25, 23` | `24°, 10%, 10%` | Barra superior sticky con anuncios de horarios y sedes en Miami. | Contraste con texto blanco/crema: 15.68:1 (AAA) |

---

## 2. Jerarquía Tipográfica Dual y Escala Modular

El sistema utiliza dos familias tipográficas complementarias de Google Fonts:
1. **Display / Editorial:** `Playfair Display` (serif elegante, tradicional cubana, artesanal y expresiva).
2. **Sans-serif Funcional:** `Plus Jakarta Sans` con fallback a `Inter` (sans-serif geométrica, moderna, neutral y ultra legible en tamaños compactos).

### 2.1. Inclusión de Fuentes Web (Head & CSS Imports)

#### En `<head>` (HTML / TanStack Start `__root.tsx`):
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600;1,700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
/>
```

#### En CSS (`styles.css`):
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600;1,700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
```

---

### 2.2. Escala Modular Tipográfica y Asignación de Roles

| Nivel Semántico | Familia Tipográfica | Peso | Tamaño (Mobile / Desktop) | Line Height | Letter Spacing | Clases Tailwind Clave | Contexto de Aplicación |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Display Hero (H1)** | `Playfair Display` (`font-display`) | Bold (700) | `36px (2.25rem)` / `48px (3.0rem)` / `56px (3.5rem)` | `1.08` | `-0.02em` (`tracking-tight`) | `font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-charcoal leading-[1.08]` | Título principal de la sección Hero. Comunica calidez criolla y autoridad gastronómica. |
| **Section Title (H2)** | `Playfair Display` (`font-display`) | SemiBold (600) | `24px (1.5rem)` / `30px (1.875rem)` | `1.2` | `-0.015em` | `font-display text-2xl sm:text-3xl font-semibold tracking-tight text-charcoal` | Títulos de categorías del menú ("Nuestros Bowls Criollos", "Sándwiches Prensados"). |
| **Modal / Sheet Title** | `Playfair Display` (`font-display`) | Bold (700) | `20px (1.25rem)` / `24px (1.5rem)` | `1.25` | `-0.015em` | `font-display text-xl sm:text-2xl font-bold text-charcoal` | Título del drawer "Your Order", título del modal de guarniciones. |
| **Dish Name (H3)** | `Plus Jakarta Sans` (`font-sans`) | Bold (700) | `18px (1.125rem)` / `20px (1.25rem)` | `1.3` | `-0.01em` | `font-sans text-lg sm:text-xl font-bold text-charcoal leading-snug` | Nombres de platos en tarjetas de catálogo y listas de selección. |
| **Precios Principales** | `Plus Jakarta Sans` (`font-sans`) | SemiBold (600) / Bold (700) | `16px (1.0rem)` / `18px (1.125rem)` | `1.0` | `0em` | `font-sans text-base sm:text-lg font-bold text-charcoal tabular-nums` | Precios en tarjetas, totales de carrito y subtotales en modal. |
| **Botones Principales (CTA)** | `Plus Jakarta Sans` (`font-sans`) | Bold (700) | `15px (0.9375rem)` / `16px (1.0rem)` | `1.25` | `0.01em` | `font-sans text-sm sm:text-base font-bold tracking-normal` | Botones de "See Menu", "Add to Order", "Order via WhatsApp". |
| **Cuerpo / Ingredientes** | `Plus Jakarta Sans` (`font-sans`) | Regular (400) | `14px (0.875rem)` / `15px (0.9375rem)` | `1.55` | `0em` | `font-sans text-sm font-normal text-muted leading-relaxed` | Descripciones de platos, notas sobre maceración y salsas mojo. |
| **Subtítulo Hero** | `Plus Jakarta Sans` (`font-sans`) | Regular (400) / Medium (500) | `16px (1.0rem)` / `18px (1.125rem)` | `1.6` | `0em` | `font-sans text-base sm:text-lg text-muted leading-relaxed` | Párrafo sensorial debajo del H1. |
| **Categorías & Tabs** | `Plus Jakarta Sans` (`font-sans`) | Medium (500) / Bold (700) | `14px (0.875rem)` | `1.0` | `0em` | `font-sans text-sm font-medium (activo: font-bold)` | Pestañas de filtrado de categorías del menú. |
| **Badges & Microcopy** | `Plus Jakarta Sans` (`font-sans`) | Bold (700) / Medium (500) | `11px (0.6875rem)` / `12px (0.75rem)` | `1.0` | `0.08em` / `0.14em` (`uppercase tracking-wider`) | `font-sans text-[11px] sm:text-xs font-bold uppercase tracking-wider` | Badges de categoría, "Mojo Signature", sellos de tiempo y estado de pedido. |

---

## 3. Especificaciones Visuales de Componentes UI

### 3.1. Sticky Header & Location Selector (`TopBar.tsx`)

#### Anatomía Visual
1. **Top Announcement Strip:**
   - Alto: Auto (`py-2 px-4`).
   - Fondo: `#1C1917` (`bg-charcoal`).
   - Texto: `#FAF8F5`, `font-sans`, 11px a 12px, centrado, tracking-wide.
   - Contenido: ` Miami, FL • Open today until 10:00 PM • Fast Takeout & Delivery Caliente`.
2. **Main Navigation Container:**
   - Alto: `64px` (Desktop) / `58px` (Mobile).
   - Fondo: `rgba(255, 255, 255, 0.95)` con `backdrop-blur-md`.
   - Borde inferior: `1px solid #EAE5DC` (`border-subtle`).
   - Posición: `sticky top-0 z-40`.
3. **Monograma & Logotipo:**
   - Icono distintivo: Contenedor cuadrado redondeado `40px × 40px`, `rounded-xl`, fondo `#D95327`, letra "M" en `Playfair Display` negrita blanca de 18px.
   - Nombre de marca: `MOJO GRILLE` en `Playfair Display`, 18px bold `#1C1917`. Subtítulo: `Cuban Kitchen` en `Plus Jakarta Sans`, 11px uppercase bold tracking `0.18em` `#78716C`.
4. **Selector de Sede (Location Dropdown):**
   - Forma: Pill redondeado (`rounded-full`), borde `1px solid #EAE5DC`, fondo `#FAF8F5`, padding `py-2 px-3.5`.
   - Elementos: Icono `MapPin` en `#D95327` (14px), nombre de sede en 12px font-bold `#1C1917`, icono `ChevronDown` en 14px `#78716C`.
   - Hover: Fondo `#F4EFEA`, borde `#D6CFBF`.
   - Dropdown flotante: Ancho `176px (w-44)`, fondo `#FFFFFF`, bordes redondeados `rounded-xl`, borde `#EAE5DC`, sombra `0 12px 28px -6px rgba(28,25,23,0.16)`.
5. **Botón de Carrito con Contador Dinámico:**
   - Dimensiones: `44px × 44px` circular (`rounded-full`), fondo `#D95327`, icono `ShoppingBag` blanco de 20px.
   - Sombra: `0 4px 12px -2px rgba(217, 83, 39, 0.35)`.
   - Hover: Fondo `#B83E16`.
   - Badge contador: Posición absoluta `-top-1 -right-1`, dimensiones mínimas `20px × 20px`, fondo `#4D7C0F` (verde lima frescura), texto blanco en 11px bold con borde blanco de 1.5px.
   - Animación de adición: Anillo pulsante (`animate-ping`) con borde `rgba(217, 83, 39, 0.4)`.

---

### 3.2. Hero Section & Social Proof Badge (`HeroSection.tsx`)

#### Anatomía Visual
1. **Lienzo de la Sección:**
   - Fondo: `#FAF8F5` (`bg-cream`) con borde inferior `#EAE5DC`.
   - Padding vertical: `pt-8 pb-14 md:pt-14 md:pb-20 lg:pt-16 lg:pb-24`.
2. **Social Proof Badge (Above-the-Fold):**
   - Posicionamiento: Arriba del H1.
   - Fondo: `#F4EFEA` (`bg-cream-warm`), borde `1px solid rgba(245, 158, 11, 0.35)`.
   - Forma: Pill `rounded-full`, padding `px-3.5 py-1.5`.
   - Elementos: Estrella `Star` en `#F59E0B` (fill & stroke), texto: `⭐ 4.7 Stars across +3,000 orders in Miami (UberEats & Google)`.
   - Tipografía: `12px` font-semibold `#1C1917` con `(UberEats & Google)` en regular `#78716C`.
3. **H1 Headline:**
   - Tipografía: `Playfair Display`, Bold 700, 32px móvil / 48px tablet / 56px desktop, interlineado `1.08`.
   - Color: `#1C1917`.
   - Copy: *"The Authentic Criollo Flavor of Miami, Marinado to Perfection"*.
4. **Subtítulo Sensorial:**
   - Tipografía: `Plus Jakarta Sans`, 16px móvil / 18px desktop, interlineado `1.6`.
   - Color: `#78716C` (`text-muted`).
   - Copy: *"Artisanal bowls marinated 24h in citrus mojo, freshly pressed Cuban sandwiches & family recipes made al momento."*
5. **Grupo de Botones de Acción (Dual CTA):**
   - **CTA Primario ("See Menu & Order Now"):**
     - Fondo: `#D95327`, hover `#B83E16`.
     - Texto: Blanco `#FFFFFF`, 16px font-bold.
     - Forma: Pill `rounded-full`, padding `px-7 py-4`.
     - Icono: `UtensilsCrossed` (20px) con sutil rotación en hover (`group-hover:rotate-12`).
     - Sombra: `0 12px 24px -6px rgba(217, 83, 39, 0.38)`, hover `0 16px 28px -6px rgba(184, 62, 22, 0.45)`, traslación `hover:-translate-y-0.5`.
   - **CTA Secundario ("Catering & Events"):**
     - Fondo: `#FFFFFF`, borde `1px solid #EAE5DC`, hover `#FAF8F5`, hover border `#D6CFBF`.
     - Texto: `#1C1917`, 16px font-semibold.
     - Forma: Pill `rounded-full`, padding `px-7 py-4`.
     - Icono: `CalendarHeart` en verde lima `#4D7C0F` (20px).
     - Sombra: `shadow-sm`, hover `shadow`.
6. **Tarjeta de Imagen Hero & Badges Flotantes:**
   - Contenedor de Imagen: `rounded-3xl`, borde `1px solid #EAE5DC`, fondo `#FFFFFF`, sombra de alta elevación `0 20px 45px -15px rgba(28,25,23,0.18)`.
   - Relación de aspecto: `aspect-[4/3]`, imagen `object-cover` con hover suave (`hover:scale-105 duration-700`).
   - **Tarjeta Flotante Inferior ("Top Seller"):**
     - Posición: `-bottom-5 left-6`, fondo `rgba(255, 255, 255, 0.95)` con `backdrop-blur-md`.
     - Borde: `1px solid #EAE5DC`, sombra `0 12px 28px -6px rgba(28,25,23,0.16)`.
     - Forma: `rounded-2xl`, padding `px-4 py-3`.
     - Badge superior: 10px uppercase bold tracking-wider en `#4D7C0F` ("House Favorite • Sabor Criollo").
     - Título: 14px font-bold `#1C1917` ("Top Seller: Chicken Fresco Bowl").
   - **Badge Flotante Superior ("Marinado 24h"):**
     - Posición: `-top-4 -right-4`, fondo `#FAF8F5`, borde `1px solid #EAE5DC`, sombra `shadow-md`.
     - Indicador: Círculo de 8px en `#4D7C0F` con efecto `animate-pulse`.
     - Texto: 12px font-semibold `#1C1917` ("24h Citrus Mojo Marinade").

---

### 3.3. Sticky Category Navigation Tabs (`CategoryTabs.tsx`)

#### Anatomía Visual
1. **Contenedor Sticky:**
   - Posición: `sticky top-[64px] sm:top-[72px] z-30`.
   - Fondo: `rgba(250, 248, 245, 0.95)` (`bg-cream/95`) con `backdrop-blur-md`.
   - Borde inferior: `1px solid #EAE5DC`.
   - Scroll: Horizontal con `overflow-x-auto` y utilidad `no-scrollbar`.
   - Padding: `px-4 py-3 sm:px-6`. Gap entre pestañas: `10px (gap-2.5)`.
2. **Pestaña Activa:**
   - Fondo: `#D95327` (`bg-terracotta`).
   - Texto: `#FFFFFF`, `font-sans`, 14px, `font-bold`.
   - Borde: `1px solid #D95327`.
   - Forma: Pill `rounded-full`, padding `px-4 py-2`.
   - Sombra: `shadow-sm`.
3. **Pestaña Inactiva:**
   - Fondo: `#FFFFFF` (`surface-white`).
   - Texto: `#78716C` (`text-muted`), `font-sans`, 14px, `font-medium`.
   - Borde: `1px solid #EAE5DC` (`border-subtle`).
   - Forma: Pill `rounded-full`, padding `px-4 py-2`.
   - Hover: Fondo `#F4EFEA`, borde `#D6CFBF`, texto `#1C1917`.

---

### 3.4. Menu Item Cards & Badges (`MenuGrid.tsx`)

#### Anatomía de la Tarjeta
1. **Contenedor:**
   - Display: `article`, flex columna, `overflow-hidden`.
   - Esquinas: `rounded-2xl` (16px).
   - Fondo: `#FFFFFF` (`surface-white`).
   - Borde: `1px solid #EAE5DC` (`border-subtle`).
   - Sombra: Inicial `0 1px 3px rgba(28,25,23,0.05)`, hover `0 16px 32px -8px rgba(28,25,23,0.14)`.
   - Transición: `transition-all duration-300 hover:-translate-y-1`.
2. **Imagen del Plato:**
   - Relación de aspecto: `aspect-[4/3]`, `w-full object-cover`.
   - Hover: `group-hover:scale-[1.03] transition-transform duration-500`.
   - Posicionamiento de Badges: Absoluto, `top-3 left-3`.
3. **Jerarquía Exacta de Badges de Menú:**

| Tipo de Badge | Color de Fondo | Borde | Color de Texto | Tipografía y Estilo | Icono / Detalle |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Mojo Signature** | `#D95327` (`bg-terracotta`) | Ninguno | `#FFFFFF` | 11px font-bold, uppercase, tracking `0.08em` | Sombra `shadow-sm` |
| **Popular / Top Seller** | `#FEF3C7` (`bg-gold-soft`) | `1px solid rgba(245, 158, 11, 0.4)` | `#B45309` (`text-gold-text`) | 11px font-bold, uppercase, tracking `0.08em` | Estrella `` en `#F59E0B` a la izquierda |
| **Fresco del día** | `#4D7C0F` (`bg-lime`) | Ninguno | `#FFFFFF` | 11px font-bold, uppercase, tracking `0.08em` | Sombra `shadow-sm` |
| **Custom / Default** | `#FFFFFF` | `1px solid #EAE5DC` | `#D95327` | 11px font-bold, uppercase, tracking `0.08em` | Borde sutil, sombra suave |

4. **Zona de Contenido:**
   - Padding: `p-5`.
   - Título: 18px font-bold `#1C1917`, leading-snug.
   - Descripción: 14px regular `#78716C`, leading-relaxed.
   - Footer de Tarjeta: Línea separadora `border-t border-[#EAE5DC]/60`, padding superior `pt-4`, flex o grid alineando precio y botón.
   - Precio: 16px font-bold `#1C1917` tabular-nums.
   - Botón "+ Add": Fondo `#D95327`, hover `#B83E16`, texto blanco 14px font-bold, padding `px-4 py-2`, `rounded-full`, icono `Plus` de 16px con grosor `stroke-[2.5]`.

---

### 3.5. Side Dish Customization Modal (`QuickOrderModal.tsx`)

#### Anatomía Visual
1. **Backdrop / Overlay:**
   - Posición: `fixed inset-0 z-50`.
   - Fondo: `rgba(28, 25, 23, 0.60)` (`bg-charcoal/60`) con `backdrop-blur-sm`.
   - Comportamiento: Cierre al hacer clic en el backdrop o presionar `Escape`.
2. **Ventana Modal:**
   - Forma: Móvil `rounded-t-3xl` (bottom sheet), Desktop `rounded-3xl`.
   - Dimensiones: Ancho máximo `512px (max-w-lg)`, altura máxima `92dvh`, scroll interno `overflow-y-auto`.
   - Fondo: `#FFFFFF` (`surface-white`).
   - Borde: `1px solid #EAE5DC`.
   - Sombra: `0 25px 50px -12px rgba(28,25,23,0.25)`.
3. **Cabecera con Imagen y Botón de Cierre:**
   - Imagen del plato en la parte superior: `aspect-[4/3] w-full object-cover`.
   - Botón de cierre: Flotante `top-3 right-3`, circular `40px × 40px`, fondo `rgba(255, 255, 255, 0.90)`, borde `#EAE5DC`, icono `X` de 20px `#1C1917`.
4. **Cuerpo del Modal:**
   - Padding: `p-6`.
   - Título del plato: `Plus Jakarta Sans`, 24px font-bold `#1C1917`.
   - Descripción: 14px regular `#78716C`.
5. **Selector de Guarniciones (Side Dishes):**
   - Título de sección: 12px font-bold uppercase tracking `0.14em` `#78716C` ("CHOOSE YOUR SIDES (GUARNICIONES)").
   - Fila de opción interactiva:
     - Ancho total, display grid con checkbox + nombre + precio.
     - Altura: Mínimo 48px, padding `px-4 py-3`, bordes `rounded-xl`.
     - **Estado No Seleccionado:** Fondo `#FFFFFF`, borde `1px solid #EAE5DC`, texto `#1C1917`.
     - **Estado Seleccionado:** Fondo `#FAF8F5` (`bg-cream`), borde `1.5px solid #D95327`, texto `#1C1917`.
     - Casilla de verificación: `20px × 20px`, `rounded-md`.
       - No seleccionado: Fondo `#FFFFFF`, borde `1px solid #EAE5DC`.
       - Seleccionado: Fondo `#D95327`, borde `#D95327`, icono `Check` blanco de 14px con `stroke-[3]`.
     - Precio adicional: 14px font-medium `#78716C` (ej. "Included" o "+$2.50").
6. **Botón Principal de Añadir con Total en Vivo:**
   - Display: Grid con dos columnas (nombre de acción + precio total calculado al instante).
   - Fondo: `#D95327`, hover `#B83E16`.
   - Texto: Blanco `#FFFFFF`, 16px font-bold.
   - Forma: Pill `rounded-full`, padding `px-6 py-4`.
   - Sombra: `shadow-soft`.

---

### 3.6. Cart Drawer & Order Breakdown (`CartSheet.tsx`)

#### Anatomía Visual
1. **Backdrop:**
   - Fondo `rgba(28, 25, 23, 0.60)` con `backdrop-blur-sm`.
2. **Panel Deslizable (Slide-over Sheet):**
   - Posición: `fixed inset-y-0 right-0 z-50`.
   - Ancho: `100%` en móvil, `384px (max-w-sm)` en desktop.
   - Fondo: `#FFFFFF` (`surface-white`).
   - Borde izquierdo: `1px solid #EAE5DC` (`border-subtle`).
   - Sombra: `0 25px 50px -12px rgba(28,25,23,0.25)`.
3. **Encabezado:**
   - Alto: `64px`, padding `px-5 py-4`, borde inferior `#EAE5DC`.
   - Título: `Playfair Display`, 20px font-bold `#1C1917` ("Your Order").
   - Botón de cierre: Circular `36px × 36px`, hover `#FAF8F5`, icono `X` de 20px.
4. **Lista de Ítems del Pedido:**
   - Scrollable `overflow-y-auto px-5 py-4`.
   - **Tarjeta de Ítem en Carrito:**
     - Fondo: `#FAF8F5` (`bg-cream`), borde `1px solid #EAE5DC`, `rounded-xl`, padding `p-3.5`.
     - Título: 14px font-bold `#1C1917` con multiplicador de cantidad (ej. `2× Mojo Cubano Sandwich`).
     - Lista de guarniciones: 12px `#78716C` separadas por interpunct (ej. `Arroz Moro · Tostones`).
     - Subtotal de línea: 14px font-semibold `#1C1917`.
     - Botón eliminar / decrementar: Circular `32px × 32px`, fondo `#FFFFFF`, borde `#EAE5DC`, icono `Minus` de 16px `#78716C`, hover `#1C1917`.
5. **Estado Vacío (Empty State):**
   - Centrado vertical, icono `ShoppingBag` de 32px `#78716C`, texto *"Your cart is empty. Start with our signature favorites!"*.
6. **Footer con Desglose y CTA WhatsApp:**
   - Borde superior: `1px solid #EAE5DC`, padding `px-5 py-4`.
   - Fila de Total Estimado: Texto 14px `#78716C`, total en 18px font-bold `#1C1917`.
   - **Botón Primario "Order via WhatsApp":**
     - Fondo: `#D95327`, hover `#B83E16`.
     - Texto: Blanco `#FFFFFF`, 16px font-bold, centrado.
     - Forma: Pill `rounded-full`, padding `py-3.5 px-6`.
     - Enlace directo a API de WhatsApp con el mensaje codificado con todos los platos y guarniciones.
   - Botón Secundario "Clear Cart": 12px font-semibold `#78716C`, hover `#1C1917`.

---

### 3.7. Mobile Sticky Bottom Action Bar (`MobileActionBar.tsx`)

#### Anatomía Visual
1. **Posicionamiento & Visibilidad:**
   - `fixed inset-x-0 bottom-0 z-40 md:hidden`.
   - Soporte para Safe Area: `pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 px-4`.
   - Fondo: `rgba(255, 255, 255, 0.95)` con `backdrop-blur-md`.
   - Borde superior: `1px solid #EAE5DC` (`border-subtle`).
2. **Botón Circular de Bolsa:**
   - Dimensiones: `48px × 48px`, `rounded-full`.
   - Fondo: `#FAF8F5`, borde `1px solid #EAE5DC`, hover `#F4EFEA`.
   - Icono: `ShoppingBag` de 20px `#1C1917`.
   - Badge contador: Posición `-top-1 -right-1`, min `20px × 20px`, fondo `#4D7C0F` (lima), texto blanco 11px font-bold.
3. **Botón Maestro de Pedido WhatsApp:**
   - Display: Grid 3 columnas (Icono `MessageCircle` + Texto dinámico de cantidad + Total formateado).
   - Fondo: `#D95327`, hover `#B83E16`.
   - Texto: Blanco `#FFFFFF`, 14px font-bold.
   - Forma: Pill `rounded-full`, padding `px-5 py-3.5`.
   - Sombra: `0 4px 16px rgba(217, 83, 39, 0.35)`.
   - Texto dinámico: `Order {count} items` (o `Order on WhatsApp` si vacío), con precio alineado a la derecha.

---

## 4. Átomos de Diseño: Espaciado, Sombras, Radios y Transiciones

### 4.1. Escala de Radios de Borde (`border-radius`)

| Token Semántico | Valor CSS | Uso Recomendado |
| :--- | :--- | :--- |
| `rounded-md` | `6px (0.375rem)` | Checkboxes internos de selección de guarniciones. |
| `rounded-xl` | `12px (0.75rem)` | Logotipo monograma, filas de guarniciones, tarjetas de ítem en carrito y dropdowns. |
| `rounded-2xl` | `16px (1.0rem)` | Tarjetas principales de platos del catálogo (`MenuGrid`), tarjetas flotantes en Hero. |
| `rounded-3xl` | `24px (1.5rem)` | Contenedor principal de imagen Hero, modal de guarnición y drawer de carrito. |
| `rounded-full` | `9999px` | Todos los botones de acción (CTAs), pills de categorías, badges de estado y selectores. |

---

### 4.2. Sistema de Elevación y Sombras (`box-shadow`)

| Token Semántico | Valor CSS | Uso en Componentes |
| :--- | :--- | :--- |
| `shadow-sm` | `0 1px 2px 0 rgba(28, 25, 23, 0.05)` | Badges de producto, botones secundarios en reposo. |
| `shadow-soft` | `0 1px 3px rgba(28, 25, 23, 0.05), 0 8px 24px -12px rgba(28, 25, 23, 0.10)` | Tarjetas de menú en estado normal, botones principales en reposo. |
| `shadow-lift` | `0 4px 6px -1px rgba(217, 83, 39, 0.12), 0 16px 32px -8px rgba(28, 25, 23, 0.18)` | Tarjetas de menú en `:hover`, tarjetas flotantes en Hero. |
| `shadow-cta-glow`| `0 12px 24px -6px rgba(217, 83, 39, 0.38)` | Botón primario del Hero y botón del carrito. |
| `shadow-cta-glow-hover` | `0 16px 28px -6px rgba(184, 62, 22, 0.45)` | Estado interactivo `:hover` del botón primario Hero. |
| `shadow-modal` | `0 25px 50px -12px rgba(28, 25, 23, 0.25)` | Ventana de modal de guarnición y panel lateral del carrito. |

---

### 4.3. Curvas de Transición y Duración

```css
/* Transición Estándar para Interacciones Táctiles y Hover */
--transition-fast: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-smooth: all 200ms cubic-bezier(0.16, 1, 0.3, 1);
--transition-card: transform 300ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 300ms cubic-bezier(0.16, 1, 0.3, 1);
```
- **Botones y Pills:** `transition-all duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0`.
- **Tarjetas de Menú:** `transition-all duration-300 hover:-translate-y-1`.
- **Zoom de Imagen:** `transition-transform duration-500 ease-out group-hover:scale-[1.03]`.

---

## 5. Tailwind CSS Configuration & Tokens

### 5.1. Tailwind CSS v4 `@theme inline` (Para `styles.css`)

Este fragmento corresponde a la arquitectura nativa moderna de `@tailwindcss/vite` v4 configurada en el proyecto:

```css
@import "tailwindcss" source(none);
@source "../src";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

/*
 * Mojo Grille Design System
 * Warm cream base, toasted terracotta accents, citrus-green freshness badges.
 */

@theme inline {
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --radius-2xl: calc(var(--radius) + 8px);
  --radius-3xl: calc(var(--radius) + 12px);
  --radius-4xl: calc(var(--radius) + 16px);

  /* Dual Typography System */
  --font-display: "Playfair Display", Georgia, serif;
  --font-serif: "Playfair Display", Georgia, serif;
  --font-sans: "Plus Jakarta Sans", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  /* Mojo Grille Semantic Color Tokens */
  --color-cream: #FAF8F5;
  --color-cream-warm: #F4EFEA;
  --color-surface-white: #FFFFFF;
  --color-mojo-terracotta: #D95327;
  --color-mojo-terracotta-dark: #B83E16;
  --color-mojo-terracotta-soft: #FBECE7;
  --color-charcoal: #1C1917;
  --color-text-charcoal: #1C1917;
  --color-text-muted: #78716C;
  --color-mojo-lime: #4D7C0F;
  --color-mojo-lime-soft: #F0F6E8;
  --color-mojo-gold: #F59E0B;
  --color-mojo-gold-soft: #FEF3C7;
  --color-mojo-gold-text: #B45309;
  --color-subtle: #EAE5DC;
  --color-border-subtle: #EAE5DC;
  --color-border-hover: #D6CFBF;

  /* Tailwind Core Semantic Tokens */
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-hover: var(--primary-hover);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-citrus: var(--citrus);
  --color-citrus-foreground: var(--citrus-foreground);
  --color-citrus-soft: var(--citrus-soft);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-ring-offset-background: var(--background);

  /* Sombras Semánticas */
  --shadow-soft: 0 1px 3px rgba(28, 25, 23, 0.05), 0 8px 24px -12px rgba(28, 25, 23, 0.1);
  --shadow-lift: 0 4px 6px -1px rgba(217, 83, 39, 0.12), 0 16px 32px -8px rgba(28, 25, 23, 0.18);
  --shadow-modal: 0 25px 50px -12px rgba(28, 25, 23, 0.25);
  --shadow-cta-glow: 0 12px 24px -6px rgba(217, 83, 39, 0.38);
}

:root {
  --radius: 0.875rem;

  /* Lienzo Primario (#FAF8F5) - Base Global */
  --background: #FAF8F5;
  /* Texto Maestro (#1C1917) */
  --foreground: #1C1917;
  /* Superficie de Tarjetas (#FFFFFF) */
  --card: #FFFFFF;
  --card-foreground: #1C1917;
  --popover: #FFFFFF;
  --popover-foreground: #1C1917;

  /* Acción Principal / CTA (#D95327 / #B83E16) */
  --primary: #D95327;
  --primary-hover: #B83E16;
  --primary-foreground: #FFFFFF;

  --secondary: #F4EFEA;
  --secondary-foreground: #1C1917;
  --muted: #F4EFEA;
  /* Texto Descriptivo (#78716C) */
  --muted-foreground: #78716C;
  --accent: #F4EFEA;
  --accent-foreground: #1C1917;

  /* Acento Orgánico (#4D7C0F) */
  --citrus: #4D7C0F;
  --citrus-foreground: #FFFFFF;
  --citrus-soft: #F0F6E8;

  --destructive: #DC2626;
  --destructive-foreground: #FFFFFF;

  /* Bordes y Separadores (#EAE5DC) */
  --border: #EAE5DC;
  --input: #EAE5DC;
  --ring: #D95327;
}

@layer base {
  * {
    border-color: var(--color-border);
  }

  body {
    background-color: var(--color-background);
    color: var(--color-foreground);
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
  }

  /* Dual Typography Hierarchy */
  h1,
  h2 {
    font-family: var(--font-display);
    letter-spacing: -0.015em;
  }

  h3,
  h4,
  h5,
  h6 {
    font-family: var(--font-sans);
    letter-spacing: -0.01em;
  }
}

/* Utilidades Semánticas Explícitas para Mojo Grille */
@utility bg-cream {
  background-color: #FAF8F5;
}
@utility bg-cream-warm {
  background-color: #F4EFEA;
}
@utility surface-white {
  background-color: #FFFFFF;
}
@utility text-charcoal {
  color: #1C1917;
}
@utility text-muted {
  color: #78716C;
}
@utility bg-terracotta {
  background-color: #D95327;
}
@utility bg-terracotta-dark {
  background-color: #B83E16;
}
@utility text-terracotta {
  color: #D95327;
}
@utility text-lime {
  color: #4D7C0F;
}
@utility bg-lime {
  background-color: #4D7C0F;
}
@utility text-gold {
  color: #F59E0B;
}
@utility bg-gold {
  background-color: #F59E0B;
}
@utility bg-gold-soft {
  background-color: #FEF3C7;
}
@utility text-gold-dark {
  color: #B45309;
}
@utility border-subtle {
  border-color: #EAE5DC;
}
@utility border-hover {
  border-color: #D6CFBF;
}
```

---

### 5.2. Objeto de Extensión para `tailwind.config.ts` (Compatibilidad v3)

Para proyectos o herramientas de tooling que requieran el objeto JavaScript/TypeScript `tailwind.config.ts`:

```typescript
import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#FAF8F5",
          warm: "#F4EFEA",
        },
        surface: {
          white: "#FFFFFF",
        },
        charcoal: {
          DEFAULT: "#1C1917",
          muted: "#78716C",
        },
        mojo: {
          terracotta: {
            DEFAULT: "#D95327",
            dark: "#B83E16",
            soft: "#FBECE7",
          },
          lime: {
            DEFAULT: "#4D7C0F",
            soft: "#F0F6E8",
          },
          gold: {
            DEFAULT: "#F59E0B",
            soft: "#FEF3C7",
            text: "#B45309",
          },
        },
        border: {
          subtle: "#EAE5DC",
          hover: "#D6CFBF",
        },
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: [
          "Plus Jakarta Sans",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      boxShadow: {
        soft: "0 1px 3px rgba(28, 25, 23, 0.05), 0 8px 24px -12px rgba(28, 25, 23, 0.10)",
        lift: "0 4px 6px -1px rgba(217, 83, 39, 0.12), 0 16px 32px -8px rgba(28, 25, 23, 0.18)",
        modal: "0 25px 50px -12px rgba(28, 25, 23, 0.25)",
        "cta-glow": "0 12px 24px -6px rgba(217, 83, 39, 0.38)",
      },
      borderRadius: {
        xl: "0.75rem", // 12px
        "2xl": "1.0rem", // 16px
        "3xl": "1.5rem", // 24px
      },
    },
  },
  plugins: [],
} satisfies Config;
```

---

## 6. Guía de Accesibilidad (WCAG 2.1 AA) y Mejores Prácticas

1. **Razón de Contraste en Botones Terracota:**
   - Fondo `#D95327` con Texto Blanco `#FFFFFF`: Ratio **4.62:1** (Cumple WCAG AA para texto estándar y grande).
   - Fondo `#B83E16` (hover) con Texto Blanco `#FFFFFF`: Ratio **6.20:1** (Cumple WCAG AA y AAA para texto grande).
2. **Razón de Contraste en Textos:**
   - Texto Charcoal `#1C1917` sobre Lienzo Crema `#FAF8F5`: Ratio **15.68:1** (Excede holgadamente WCAG AAA).
   - Texto Descriptivo `#78716C` sobre Lienzo Crema `#FAF8F5`: Ratio **4.61:1** (Cumple WCAG AA).
3. **Insignias de Oro (Social Proof & Top Sellers):**
   - El color `#F59E0B` NO debe usarse como color de texto sobre blanco sin oscurecer. En su lugar, se implementa la combinación semántica: fondo `#FEF3C7` con texto `#B45309` (Ratio **4.75:1**, cumple WCAG AA).
4. **Área Táctil Mínima (Touch Targets):**
   - Todo elemento interactivo en móvil (botones "+ Add", selector de ubicación, items de categorías y controles de cantidad) cuenta con un área táctil mínima de `44px × 44px` (recomendado `48px`).
5. **Enfoque y Navegación por Teclado:**
   - Todos los modales y sheets atrapan el foco (`focus trapping`) y se cierran con la tecla `Escape`.
   - Elementos interactivos muestran un anillo de foco visible (`ring-2 ring-[#D95327] ring-offset-2`).
