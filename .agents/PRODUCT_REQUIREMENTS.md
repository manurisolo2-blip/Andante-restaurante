# Mojo Grille — Technical Product Requirements & Acceptance Criteria
**Document ID:** PRD-MOJO-2026-01  
**Author:** `@ProductLead` (Product Owner)  
**Status:** Approved for Technical Architecture (`@TechLead`) and Engineering (`@FrontendDev` / `@BackendDev`)  
**Target Repository:** `c:/PaginasWeb/MojoGrille/mojo-grille-demo`  
**Reference Documents:** `c:/PaginasWeb/MojoGrille/GEMINI.md`, `c:/PaginasWeb/MojoGrille/.agents/ORIGINAL_REQUEST.md`  
**Version:** 1.0.0 (Production-Ready Specification)

---

## 1. Executive Summary & Product Vision

Mojo Grille represents the next generation of digital dining for Miami's authentic Cuban-American culinary scene. Taking inspiration from the traditional "ventanita" and elevating it into a high-converting, modern digital experience (surpassing the current `mojogrille.com`), the platform combines:
- A warm, tactile **gastronomic design system** anchored on cream, terracotta, lime, and gold tokens (eliminating harsh clinical whites).
- An authentic **Miami Spanglish voice** that celebrates 24-hour citrus mojo marinades, criollo sofritos, and hot cafecitos.
- An intuitive **interactive menu with side dish customization** (Arroz Moro, Tostones, Yuca con Mojo, Maduros).
- A seamless **frictionless WhatsApp checkout flow** that encodes location, items, custom sides, and totals into an instant mobile-order conversation.

---

## 2. Specification Discovery Matrix

### 2.1 Features Discovered
| # | Category | Feature | Description | Inputs | Outputs | Error Behavior | Discovered Via |
|---|----------|---------|-------------|--------|---------|----------------|----------------|
| F01 | Design Tokens | Global Cream Canvas | Renders the entire application background with warm cream `#FAF8F5`, avoiding clinical white. | CSS class `bg-cream`, `--color-background: #FAF8F5` | Uniform warm canvas with paper grain texture | Fallback to `#FAF8F5` if token fails | `GEMINI.md §4.1`, `ORIGINAL_REQUEST.md R1` |
| F02 | Design Tokens | Card & Modal Surfaces | Surfaces for menu cards, modals, and drawers use `#FFFFFF` with `#EAE5DC` border. | CSS class `surface-white`, `border-subtle` | High-contrast visual containment | Fallback to `bg-white border-border` | `GEMINI.md §4.1`, `styles.css` |
| F03 | Typography | Dual Typography Hierarchy | Editorial serif (`Playfair Display`) for H1/H2; functional sans (`Plus Jakarta Sans`/`Inter`) for H3/body/prices. | Font families loaded in `<head>` via Google Fonts | Scaled modular headings and readable body | Fallback to `Georgia, serif` and `sans-serif` | `GEMINI.md §4.2`, `ORIGINAL_REQUEST.md R2` |
| F04 | Navigation | Location Switcher | Dropdown in sticky TopBar allowing selection of Miami store locations (Little Havana, Brickell, Doral). | User click on location dropdown | Updated active location state, persistent in header | Default to "Little Havana" if unselected | `ORIGINAL_REQUEST.md R4`, `TopBar.tsx` |
| F05 | Navigation | Sticky TopBar & Cart Indicator | Fixed top header displaying brand logo, location switcher, and interactive bag trigger with item counter badge. | Cart context state (`count`) | Persistent header at `z-40`, badge count > 0 with pulse | Shows icon without count when `count === 0` | `ORIGINAL_REQUEST.md R4`, `TopBar.tsx` |
| F06 | Hero | Social Proof Badge | Above-the-fold badge displaying verified customer reviews across Miami delivery platforms. | Static rating data (4.7 Stars, +3,000 orders) | Interactive badge with gold star icon | Always visible above H1 title | `ORIGINAL_REQUEST.md R3`, `HeroSection.tsx` |
| F07 | Hero | Dual CTA & Smooth Scroll | Primary CTA "See Menu & Order Now" scrolls smoothly to `#menu`; secondary CTA links to `#catering`. | User click on CTA buttons | Smooth scroll to target anchor or opens phone dialer | Direct navigation if smooth scroll unsupported | `ORIGINAL_REQUEST.md R4`, `HeroSection.tsx` |
| F08 | Menu | Sticky Category Navigation | Horizontal scrollable tabs with category pills ("Favoritos", "Bowls", "Sandwiches", "Sides", "Bebidas", "Catering"). | User click on category pill | Active pill styled in `#D95327`; filters menu grid | Defaults to "favoritos" | `ORIGINAL_REQUEST.md R4`, `CategoryTabs.tsx` |
| F09 | Menu | Menu Catalog Cards | Responsive grid displaying photo, title, bilingual description, price, badge, and action button. | Array of `MenuItem` objects | Structured cards with hover lift effect | Truncates text gracefully, fallback image | `GEMINI.md §4.1`, `MenuGrid.tsx` |
| F10 | Menu | Badge Styling by Type | Color-coded badges: "Mojo Signature" (terracotta), "Popular"/"Top Seller" (gold), "Fresco del día" (lime). | `item.badge` property | Pill badge absolute-positioned on card photo | Render no badge if `badge` is undefined | `GEMINI.md §4.1`, `MenuGrid.tsx` |
| F11 | Customization | Side Customization Modal | Dialog opened on dish click allowing multi-select toggle of sides (Arroz Moro, Tostones, Yuca, Maduros). | User click on card or "Add" button | Slide-up modal on mobile, centered dialog on desktop | Accessible close via ESC or backdrop click | `ORIGINAL_REQUEST.md R4`, `QuickOrderModal.tsx` |
| F12 | Customization | Real-Time Price Recalculation | Dynamically updates the total unit price as paid sides are toggled on/off. | Base price + sum of selected side prices | Updated CTA label e.g., "Add to Order • $18.45" | Never allows price below base price | `ORIGINAL_REQUEST.md R4`, `QuickOrderModal.tsx` |
| F13 | Cart | Slide-Out Cart Drawer | Side drawer showing itemized breakdown, quantities, selected sides, subtotal, and checkout button. | Cart state (`lines`, `total`, `count`) | Slide-out overlay from right edge | Empty state message when `count === 0` | `ORIGINAL_REQUEST.md R4`, `CartSheet.tsx` |
| F14 | Cart | Cart Line Deduplication | Groups items with identical ID and identical combination of selected sides into single line with quantity increment. | New item payload (`itemId`, `sides`) | Increments `qty` for matching item+sides; creates new line otherwise | Case-insensitive side comparison | `cart.tsx` |
| F15 | Checkout | WhatsApp Order Generator | Generates a direct `https://wa.me/...` URL with formatted message including location, items, sides, and grand total. | `lines`, `total`, `location` | URL-encoded checkout link opening WhatsApp Web/App | Default greeting if cart is empty | `ORIGINAL_REQUEST.md R4`, `whatsapp.ts` |
| F16 | Mobile | Persistent Bottom Action Bar | Sticky bottom bar on mobile (<768px) showing cart icon, item count badge, subtotal, and WhatsApp checkout CTA. | Viewport `< 768px`, cart state | Fixed bottom bar respecting safe area insets | Hidden on tablet and desktop (`md:hidden`) | `ORIGINAL_REQUEST.md R4`, `MobileActionBar.tsx` |
| F17 | SEO | Structured Data (Schema.org) | JSON-LD schema describing Restaurant, branches, Menu, and offerings for Google Rich Results. | Static metadata in `<head>` | Injected `<script type="application/ld+json">` | Validates with Google Schema Validator | `ORIGINAL_REQUEST.md R3`, `__root.tsx` |
| F18 | SEO | OpenGraph & Twitter Cards | Meta tags for rich social media sharing previews on WhatsApp, iMessage, Facebook, and Twitter. | Page title, description, OG image URL | Valid OpenGraph tags in HTML head | Fallback to default brand preview | `ORIGINAL_REQUEST.md R3`, `__root.tsx` |
| F19 | Technical | Zero-Error Compilation | Vite, TanStack Router, and Nitro compile with 0 TypeScript/ESLint warnings or errors. | `npm run build` | Clean `.output/` bundle with SSR worker | Build aborts on type mismatch or syntax error | `ORIGINAL_REQUEST.md Acceptance Criteria` |

---

### 2.2 Edge Cases Discovered
| # | Feature | Input / Scenario | Observed / Required Behavior |
|---|---------|------------------|------------------------------|
| E01 | Side Customization | User selects multiple premium sides (e.g., Tostones +$1.50 + Yuca +$2.00) and then unchecks one. | The extra sum recalculates instantly: base price + $3.50 drops to base price + $1.50 without screen flicker or lag. |
| E02 | Side Customization | Dish with `sidesAllowed: false` (e.g., Tostones con Mojo or Cafecito) is selected. | Modal displays informational badge "Freshly prepared al momento with authentic Miami ingredients" without side selection checkboxes. |
| E03 | Side Customization | User presses `Escape` key while modal is open. | Modal closes immediately, returning focus to the invoking button, leaving cart unmodified. |
| E04 | Cart State | Adding the same dish with different side selections (e.g., Ropa Vieja Bowl with Moro vs Ropa Vieja Bowl with Yuca). | Generates two distinct cart lines because the unique key combines `itemId` and sorted sides (`${id}::${sides.sort().join('|')}`). |
| E05 | Cart State | Adding the same dish with identical sides in different order (e.g. Moro + Maduros vs Maduros + Moro). | Keys match due to sorting, incrementing the existing cart line quantity to `2` rather than creating a duplicate. |
| E06 | WhatsApp Checkout | Cart contains 0 items and user clicks "Order via WhatsApp" in empty drawer or mobile bar. | WhatsApp opens with friendly initial contact message: `"Hello Mojo Grille! I'd like to place an order from your [Location] store."` |
| E07 | WhatsApp Checkout | Location switcher is changed from "Little Havana" to "Brickell" after items are in the cart. | WhatsApp message dynamically reflects `"Location: Brickell"` in the generated text without resetting cart contents. |
| E08 | Mobile Action Bar | Mobile device has bottom navigation notch/home indicator (iOS Safari / Chrome). | Action bar utilizes `pb-[max(0.75rem,env(safe-area-inset-bottom))]` to prevent clipping with OS gestures. |
| E09 | Category Tabs | Mobile viewport with 6 categories overflowing horizontal width. | Category container supports smooth horizontal touch drag (`overflow-x-auto`) with hidden scrollbars (`no-scrollbar`). |
| E10 | Viewport Resize | User transitions from desktop (1280px) to mobile (375px) with cart drawer open. | Drawer stays constrained to screen width (`w-full max-w-sm`), backdrop covers entire viewport, mobile bar stays underneath. |

---

## 3. Product Architecture & Prioritization (MVP vs Enhancements)

```
┌────────────────────────────────────────────────────────────────────────┐
│                          MOJO GRILLE MVP LAUNCH                        │
│                                                                        │
│  [US-01] Design System & Warm Cream Canvas Tokens                      │
│  [US-02] Sticky Top Bar with Location Switcher & Cart Counter          │
│  [US-03] Miami Cuban Hero Banner & Social Proof Badge                  │
│  [US-04] Sticky Category Navigation with Smooth Scroll                 │
│  [US-05] Menu Catalog Cards with Badges & Sensory Descriptions         │
│  [US-06] Side Customization Modal with Real-time Price Calc            │
│  [US-07] Slide-out Cart Drawer with Line Management                    │
│  [US-08] Direct WhatsApp Checkout with Location & Line Breakdown       │
│  [US-09] Mobile-Optimized Bottom Quick-Action Bar                      │
│  [US-10] Clean Compilation (Vite + TanStack + Nitro = 0 Errors)        │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        POST-MVP ENHANCEMENTS                           │
│                                                                        │
│  [US-11] Full Schema.org Multi-Location Restaurant JSON-LD             │
│  [US-12] Dedicated Catering Inquiry Modal with Guest Count Calculator   │
│  [US-13] Dietary & Allergen Quick-Filtering (Gluten-Free, Veggie)      │
│  [US-14] Miami Verified Customer Review Testimonial Wall               │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Prioritized User Stories & Verifiable Acceptance Criteria

---

### [MVP] US-01: Gastronomic Design System & Canvas Tokens
**As a** customer visiting Mojo Grille online,  
**I want** to experience a warm, artisanal visual aesthetic inspired by Cuban culinary heritage,  
**So that** the website feels inviting, appetizing, and distinct from generic clinical white storefronts.

#### Acceptance Criteria

##### Scenario 1.1: Global background color enforcement
- **Given** any page of the Mojo Grille web application,
- **When** the DOM is rendered and CSS computed styles are inspected on `body` and `<main>`,
- **Then** the computed `background-color` MUST equal `#FAF8F5` (`--color-cream`),
- **And** pure clinical white (`#FFFFFF`) MUST NOT be used as the root or canvas background.

##### Scenario 1.2: Surface and card contrast
- **Given** any menu card, cart drawer, or modal element,
- **When** the element is rendered against the global canvas,
- **Then** the element background MUST be `#FFFFFF` (`surface-white`),
- **And** the border MUST be `#EAE5DC` (`border-subtle`).

##### Scenario 1.3: Brand color palette tokens
- **Given** primary interactive CTA elements (buttons, active pills),
- **When** rendered in default, hover, or active states,
- **Then** default background MUST be `#D95327` (`mojo-terracotta`) with text `#FFFFFF`,
- **And** hover background MUST be `#B83E16` (`mojo-terracotta-dark`).

##### Scenario 1.4: Dual typography system
- **Given** any level-1 (`<h1>`) or level-2 (`<h2>`) heading,
- **When** computed in the browser,
- **Then** `font-family` MUST evaluate to `"Playfair Display", Georgia, serif`,
- **And** for level-3 (`<h3>`) headings, paragraphs, prices, and badges, `font-family` MUST evaluate to `"Plus Jakarta Sans", "Inter", sans-serif`.

---

### [MVP] US-02: Sticky Header with Location Switcher & Cart Counter
**As an** online patron,  
**I want** a persistent top navigation bar that shows my nearest location and cart status,  
**So that** I know where my food will be prepared and can quickly access my bag at any time.

#### Acceptance Criteria

##### Scenario 2.1: Sticky behavior on scroll
- **Given** the user is viewing the homepage,
- **When** the user scrolls down past the hero section,
- **Then** the header MUST remain pinned to the top of the viewport (`sticky top-0 z-40`),
- **And** it MUST feature a backdrop blur (`backdrop-blur-md`) with semi-transparent background (`bg-white/95`).

##### Scenario 2.2: Location selector interaction
- **Given** the top navigation bar is visible,
- **When** the user clicks on the location button showing `"Little Havana"`,
- **Then** a dropdown menu MUST open displaying `"Little Havana"`, `"Brickell"`, and `"Doral"`,
- **When** the user clicks `"Brickell"`,
- **Then** the dropdown MUST close, the button text MUST update to `"Brickell"`, and the selected location MUST be stored in application state.

##### Scenario 2.3: Cart counter indicator
- **Given** the cart is initially empty (`count = 0`),
- **When** the top bar is rendered,
- **Then** the cart bag button MUST show the shopping bag icon without a numeric badge.
- **When** an item is added to the cart (`count = 1`),
- **Then** a badge with background `#4D7C0F` (`mojo-lime`) and bold white text `"1"` MUST appear on the top-right corner of the button,
- **And** a ping animation ring MUST briefly trigger.

##### Scenario 2.4: Cart drawer trigger
- **Given** the user is on any part of the page,
- **When** the user clicks the shopping bag button in the top bar,
- **Then** the slide-out cart drawer MUST open smoothly from the right side of the screen.

---

### [MVP] US-03: Miami Cuban Hero Banner & Social Proof Badge
**As a** first-time visitor,  
**I want** to see an authentic, appetizing hero banner with local Miami social proof,  
**So that** I feel immediate confidence in Mojo Grille’s culinary quality and speed.

#### Acceptance Criteria

##### Scenario 3.1: Social proof badge placement & content
- **Given** the hero section renders above the fold,
- **When** the user inspects the top of the hero container,
- **Then** a social proof badge MUST be positioned directly above the H1 title,
- **And** the badge MUST display the exact text: `"⭐ 4.7 Stars across +3,000 orders in Miami (UberEats & Google)"`,
- **And** the star icon MUST be colored `#F59E0B` (`mojo-gold`).

##### Scenario 3.2: Hero H1 typography and Miami copy
- **Given** the hero content area,
- **When** rendered,
- **Then** the H1 tag MUST contain: `"The Authentic Criollo Flavor of Miami, Marinado to Perfection"`,
- **And** the font MUST be `Playfair Display` with responsive sizes (36px on mobile up to 60px on desktop, `font-bold text-[#1C1917]`).

##### Scenario 3.3: Smooth scroll CTA action
- **Given** the primary hero CTA button `"See Menu & Order Now"`,
- **When** the user clicks the button,
- **Then** the browser MUST smoothly scroll to the `#menu` anchor without an abrupt page jump,
- **And** the top of the menu category tabs MUST align below the sticky top bar (`scroll-mt-32`).

##### Scenario 3.4: Floating dish badge highlight
- **Given** the hero photographic dish display,
- **When** rendered on desktop or mobile,
- **Then** a floating card MUST highlight `"Top Seller: Chicken Fresco Bowl"` with label `"House Favorite • Sabor Criollo"`,
- **And** a secondary pill MUST read `"24h Citrus Mojo Marinade"`.

---

### [MVP] US-04: Sticky Category Navigation Tabs
**As a** hungry diner browsing the menu,  
**I want** quick-filter category tabs that stay accessible while I scroll,  
**So that** I can easily jump between Bowls, Cubano Sandwiches, Sides, and Drinks.

#### Acceptance Criteria

##### Scenario 4.1: Available categories
- **Given** the category tab bar,
- **When** rendered,
- **Then** it MUST display exactly 6 categories:
  1. `" Must-Tries / Favoritos"` (ID: `favoritos`)
  2. `" Bowls Criollos"` (ID: `bowls`)
  3. `" Pressed Cubano Sandwiches"` (ID: `sandwiches`)
  4. `" Pa' Picar / Sides"` (ID: `sides`)
  5. `" Cafecito & Drinks"` (ID: `bebidas`)
  6. `" Party Catering"` (ID: `catering`)

##### Scenario 4.2: Category selection & active styling
- **Given** the default category is `"favoritos"`,
- **When** the user clicks `" Pressed Cubano Sandwiches"`,
- **Then** the `"sandwiches"` pill MUST become active with background `#D95327`, text `#FFFFFF`, and shadow,
- **And** previous active pill MUST revert to white background with `#78716C` text,
- **And** the menu grid below MUST immediately display only items categorized as `sandwiches` (e.g., El Cubano Prensado).

##### Scenario 4.3: Sticky behavior below header
- **Given** the user scrolls through long menu sections,
- **When** the category bar reaches the top bar,
- **Then** it MUST stick just below the header (`top-[73px]` on mobile, `top-[77px]` on desktop),
- **And** horizontal scrolling on mobile MUST allow swiping between pills with no visible ugly scrollbars (`no-scrollbar`).

---

### [MVP] US-05: Menu Catalog Cards with Badges & Sensory Descriptions
**As a** customer choosing food,  
**I want** rich visual cards showing photos, ingredients, prices, and distinction badges,  
**So that** I can quickly identify signature items and choose what to order.

#### Acceptance Criteria

##### Scenario 5.1: Card visual elements
- **Given** any menu item in the grid (e.g. `"Ropa Vieja Bowl"`),
- **When** displayed on screen,
- **Then** the card MUST show:
  1. A 4:3 high-definition food photograph with subtle hover zoom (`group-hover:scale-[1.03]`).
  2. Dish name in bold charcoal (`text-[#1C1917]`, 18px-20px).
  3. Sensory description in muted gray (`text-[#78716C]`, 14px-15px).
  4. Formatted price (e.g., `"$16.95"`).
  5. An `"Add"` / `"Personalizar"` action button with a plus icon.

##### Scenario 5.2: Distinctive badge styling
- **Given** items with badges defined,
- **When** rendered in the grid,
- **Then**:
  - If badge is `"Mojo Signature"`, background MUST be solid `#D95327` (`mojo-terracotta`) with white text.
  - If badge is `"Popular"` or `"Top Seller"`, background MUST be soft amber `#FEF3C7` with amber border `#F59E0B/40`, dark amber text `#B45309`, and gold star ``.
  - If badge is `"Fresco del día"`, background MUST be `#4D7C0F` (`mojo-lime`) with white text.

##### Scenario 5.3: Card interaction
- **Given** a user viewing the menu,
- **When** the user clicks anywhere on the dish photo, dish title, or the `"Add"` button,
- **Then** the Quick Order Modal MUST open for that specific item.

---

### [MVP] US-06: Side Dish Customization Modal with Dynamic Price Recalculation
**As a** customer ordering a Cuban bowl or sandwich,  
**I want** to customize my included and premium sides (Arroz Moro, Tostones, Yuca, Maduros),  
**So that** my meal is prepared to my taste and I see the exact updated total before adding to my bag.

#### Acceptance Criteria

##### Scenario 6.1: Side dish options display
- **Given** a dish with `sidesAllowed: true` (e.g., `"Ropa Vieja Bowl"` at `$16.95`),
- **When** the customization modal opens,
- **Then** it MUST display 4 side choices:
  1. `"Arroz Moro (Black beans & rice)"` — labeled `"Included"` (`$0.00`)
  2. `"Crispy Tostones con Mojo"` — labeled `"+$1.50"`
  3. `"Yuca con Mojo de Ajo"` — labeled `"+$2.00"`
  4. `"Sweet Plátanos Maduros"` — labeled `"+$1.75"`

##### Scenario 6.2: Real-time price updating on side toggle
- **Given** the base price is `$16.95` and no sides are initially selected,
- **When** the user clicks `"Arroz Moro"`,
- **Then** total price MUST remain `$16.95`,
- **When** the user additionally clicks `"Crispy Tostones con Mojo"`,
- **Then** the modal button text MUST immediately update to `"Add to Order • $18.45"`,
- **When** the user additionally clicks `"Yuca con Mojo de Ajo"`,
- **Then** the modal button text MUST immediately update to `"Add to Order • $20.45"`,
- **When** the user clicks `"Crispy Tostones con Mojo"` again (deselection),
- **Then** the total MUST immediately drop to `"$18.95"`.

##### Scenario 6.3: Multi-select visual state
- **Given** side options in the modal,
- **When** an option is selected,
- **Then** its container border MUST become `#D95327`, background `#FAF8F5`, and the checkbox box MUST show a terracotta fill with white checkmark (`Check`),
- **When** unselected, it MUST return to border `#EAE5DC` and white background.

##### Scenario 6.4: Submission to cart
- **Given** the user has configured the sides and total is `$18.45`,
- **When** the user clicks `"Add to Order"`,
- **Then** the item MUST be added to the cart context with its selected sides and combined price,
- **And** the modal MUST immediately close.

##### Scenario 6.5: Dishes without sides
- **Given** an item with `sidesAllowed: false` (e.g., `"Cafecito & Pastelito de Guayaba"` or `"Tostones con Mojo"`),
- **When** the modal opens,
- **Then** it MUST NOT show side checkboxes,
- **And** it MUST display: `"Freshly prepared al momento with authentic Miami ingredients."`,
- **And** the button MUST show `"Add to Order • $5.95"`.

---

### [MVP] US-07: Slide-Out Cart Drawer & State Management
**As a** customer ready to review my order,  
**I want** a slide-out drawer showing my selected dishes, custom sides, quantities, and total,  
**So that** I can adjust quantities, remove items, or proceed to checkout.

#### Acceptance Criteria

##### Scenario 7.1: Cart line presentation
- **Given** the cart drawer is opened with items,
- **When** rendered,
- **Then** each line item MUST display:
  - Quantity and dish name (e.g., `"1× Ropa Vieja Bowl"`).
  - Selected side list separated by bullet or middle dot (e.g., `"Arroz Moro (Black beans & rice) · Crispy Tostones con Mojo"`).
  - Calculated line total (`price * qty`).
  - A removal button (`Minus` icon).

##### Scenario 7.2: Quantity decrement & line removal
- **Given** a line item with quantity `2`,
- **When** the user clicks the `Minus` button,
- **Then** the quantity MUST decrement to `1` and total price MUST recalculate.
- **When** the user clicks the `Minus` button on an item with quantity `1`,
- **Then** that line item MUST be removed entirely from the cart,
- **And** the overall cart counter in top bar and mobile bar MUST decrement.

##### Scenario 7.3: Grouping identical items with identical sides
- **Given** the cart already has `1× Ropa Vieja Bowl` with `Arroz Moro`,
- **When** the user opens the modal again and adds another `Ropa Vieja Bowl` with `Arroz Moro`,
- **Then** the existing line MUST increment to `2× Ropa Vieja Bowl` ($33.90),
- **And** NO second duplicate line should appear.
- **When** the user adds `Ropa Vieja Bowl` with `Yuca con Mojo`,
- **Then** a NEW line MUST appear for the distinct side combination.

##### Scenario 7.4: Empty cart state
- **Given** the cart has `0` items,
- **When** the cart drawer is opened,
- **Then** it MUST display the shopping bag icon and message: `"Your cart is empty. Start with our signature favorites!"`,
- **And** the "Clear Cart" button MUST NOT be visible.

##### Scenario 7.5: Clear Cart action
- **Given** the cart has multiple items,
- **When** the user clicks `"Clear Cart"`,
- **Then** all items MUST be removed, count reset to `0`, total reset to `$0.00`, and empty state displayed.

---

### [MVP] US-08: Direct WhatsApp Checkout with Location & Itemized Message
**As an** online customer,  
**I want** to click "Order via WhatsApp" and have a formatted order message generated,  
**So that** Mojo Grille receives my store location, order breakdown, and total in a ready-to-send WhatsApp message.

#### Acceptance Criteria

##### Scenario 8.1: Encoded message with items & location
- **Given** the user selected location `"Brickell"` in the top bar,
- **And** the cart contains:
  - `1× Ropa Vieja Bowl` with sides `Arroz Moro (Black beans & rice), Crispy Tostones con Mojo` ($18.45)
  - `2× El Cubano Prensado` with sides `Sweet Plátanos Maduros` ($33.40)
- **And** estimated total is `$51.85`,
- **When** the user clicks `"Order via WhatsApp"` in the drawer or mobile bar,
- **Then** the browser MUST open a new tab targeting `https://wa.me/13055550123?text=...`,
- **And** the decoded message MUST contain:
  1. Greeting and selected location: `"Hello Mojo Grille! I'd like to order from your Brickell store:"` (or include `"Location: Brickell"`).
  2. Each line with item quantity, dish name, and sides:
     - `• 1× Ropa Vieja Bowl (Arroz Moro (Black beans & rice), Crispy Tostones con Mojo) — $18.45`
     - `• 2× El Cubano Prensado (Sweet Plátanos Maduros) — $33.40`
  3. Estimated Total: `"Estimated Total: $51.85"`
  4. Closing courtesy: `"Muchas gracias!"`

##### Scenario 8.2: Empty cart fallback message
- **Given** the cart is empty and user clicks the WhatsApp button,
- **When** WhatsApp is opened,
- **Then** the message text MUST be: `"Hello Mojo Grille! I'd like to place an order from your [Location] store."`

##### Scenario 8.3: URL safety and encoding
- **Given** dish names, sides, and emojis contain spaces, ampersands, or accented characters,
- **When** generating the link,
- **Then** the query parameter MUST be encoded using `encodeURIComponent` to prevent broken links or truncated messages.

---

### [MVP] US-09: Mobile-Optimized Persistent Bottom Quick-Action Bar
**As a** mobile user browsing on my smartphone,  
**I want** an ergonomic fixed bottom bar that displays my order total and a quick checkout button,  
**So that** I can order with one thumb without having to scroll back to the top.

#### Acceptance Criteria

##### Scenario 9.1: Visibility on mobile only
- **Given** a viewport width `< 768px` (mobile),
- **When** the page renders,
- **Then** the bottom quick-action bar MUST be visible and fixed at the bottom (`fixed inset-x-0 bottom-0 z-40`),
- **When** viewport width is `>= 768px` (tablet and desktop),
- **Then** the bottom quick-action bar MUST be hidden (`md:hidden`).

##### Scenario 9.2: Mobile bar layout & safe area insets
- **Given** the bottom bar on modern iOS or Android devices,
- **When** rendered,
- **Then** it MUST apply `pb-[max(0.75rem,env(safe-area-inset-bottom))]` to avoid overlapping the home bar gesture area,
- **And** the page container MUST include `pb-24` on mobile to prevent content from being obscured behind the sticky bar.

##### Scenario 9.3: Real-time synchronization
- **Given** the user adds an item or modifies the cart,
- **When** the cart state changes,
- **Then** the mobile bag counter badge MUST immediately update,
- **And** the CTA button label MUST update:
  - If `count === 0`: `"Order on WhatsApp"` and `"Online"`.
  - If `count === 1`: `"Order 1 item"` and formatted total (e.g. `"$16.95"`).
  - If `count > 1`: `"Order X items"` and formatted total (e.g. `"$34.90"`).

##### Scenario 9.4: Direct action triggers
- **Given** the mobile action bar,
- **When** the user taps the bag icon button,
- **Then** the cart drawer MUST open.
- **When** the user taps the main CTA button (`Order X items`),
- **Then** it MUST directly trigger the WhatsApp checkout link in a new tab.

---

### [MVP] US-10: Clean Compilation & Technical Quality Standards
**As a** DevOps engineer and technical lead,  
**I want** all TypeScript, Vite, TanStack Router, and Nitro code to compile cleanly,  
**So that** production builds and deployments in Cloudflare/Nitro run without runtime exceptions or build failures.

#### Acceptance Criteria

##### Scenario 10.1: Build command execution
- **Given** the `c:/PaginasWeb/MojoGrille/mojo-grille-demo` project,
- **When** executing `npm run build`,
- **Then** the build MUST exit with code `0`,
- **And** Vite client build MUST succeed with 0 errors,
- **And** Vite SSR build MUST succeed with 0 errors,
- **And** Nitro worker generation MUST succeed with 0 errors.

##### Scenario 10.2: TypeScript strictness
- **Given** the codebase under `src/`,
- **When** TypeScript compiles with `tsc --noEmit`,
- **Then** there MUST be 0 type errors, no `any` abuse, and all component props MUST satisfy their defined TypeScript interfaces.

---

### [Enhancement] US-11: SEO Metadata & Schema.org Restaurant/Menu JSON-LD
**As a** marketing specialist and local Miami resident searching Google,  
**I want** rich structured data for Mojo Grille in search engine results,  
**So that** Google shows rich snippets with star ratings, menu items, address, and operating hours.

#### Acceptance Criteria

##### Scenario 11.1: Meta and OpenGraph tags
- **Given** the HTML document head in `__root.tsx`,
- **When** inspected,
- **Then** `<title>` MUST equal `"Mojo Grille | Authentic Cuban Kitchen & Bowls in Miami"`,
- **And** `<meta name="description">` MUST describe citrus mojo, bowls, pressed sandwiches, and delivery,
- **And** `og:title`, `og:description`, `og:type="restaurant"`, and `theme-color="#D95327"` MUST be present.

##### Scenario 11.2: Schema.org Restaurant structured data
- **Given** search engine crawlers parsing the homepage,
- **When** reading structured data,
- **Then** a `<script type="application/ld+json">` tag MUST contain a valid Schema.org `@type: "Restaurant"`,
- **And** include:
  - `"name": "Mojo Grille"`
  - `"servesCuisine": ["Cuban", "Caribbean", "Latin American"]`
  - `"priceRange": "$$"`
  - `"telephone": "+1-305-555-0123"`
  - `"address"` with Street `"1234 SW 8th St"`, City `"Miami"`, Region `"FL"`, PostalCode `"33135"`
  - `"aggregateRating"` with ratingValue `4.7` and reviewCount `3000`.

---

### [Enhancement] US-12: Party Catering Inquiry Section & Direct Dial
**As a** corporate event coordinator or family party host,  
**I want** a dedicated catering section with phone dial and package details,  
**So that** I can book catering platters (Bandejas Familiares) with 48 hours notice.

#### Acceptance Criteria

##### Scenario 12.1: Catering section content
- **Given** the user scrolls to `#catering`,
- **When** viewing the section,
- **Then** it MUST highlight family-style bandejas, live pressed Cubano stations, and hot cafecitos for offices, weddings, and quinces,
- **And** a direct CTA button with icon MUST link to `tel:+13055550123`.

---

## 5. Technical Gap Analysis & Action Items for Downstream Agents

Based on code auditing of `c:/PaginasWeb/MojoGrille/mojo-grille-demo`:

1. **WhatsApp Location Parameter Gap (`@BackendDev` / `@FrontendDev` action):**
   - *Current state:* `whatsappHref(lines, total)` in `whatsapp.ts` does not receive the selected location from `TopBar.tsx` / application state.
   - *Requirement:* Update `whatsappHref` to accept `location: string`, and pass the active location from state to both `CartSheet.tsx` and `MobileActionBar.tsx`.

2. **Design Tokens in Tailwind v4 (`@DesignSystem` action):**
   - *Current state:* `styles.css` has defined tokens, but some inline classes use raw hexes (e.g. `bg-[#D95327]`, `bg-[#FAF8F5]`).
   - *Requirement:* Ensure all components map cleanly to semantic token classes (`bg-cream`, `surface-white`, `mojo-terracotta`, `text-charcoal`, `text-muted`, `mojo-lime`, `mojo-gold`, `border-subtle`).

3. **Schema.org Injection (`@ContentSEO` action):**
   - *Current state:* OpenGraph tags exist in `__root.tsx` and `index.tsx`, but `<script type="application/ld+json">` is missing for Restaurant/Menu schema.
   - *Requirement:* Inject complete Schema.org JSON-LD in `__root.tsx` or `index.tsx`.

---

## 6. Verification & Quality Assurance Traceability Matrix

| Requirement ID | User Story | Component Target | Primary QA Verification Step |
| :--- | :--- | :--- | :--- |
| **R1 Design System** | US-01 | `styles.css`, `index.tsx` | Inspect computed background color on `body` (must be `#FAF8F5`), verify no white background on main canvas. |
| **R2 Typography** | US-01, US-03 | `styles.css`, `HeroSection.tsx` | Confirm `Playfair Display` on H1/H2 and `Plus Jakarta Sans`/`Inter` on H3/body/buttons. |
| **R3 Copy & SEO** | US-03, US-11 | `HeroSection.tsx`, `__root.tsx` | Verify social proof badge string: `"⭐ 4.7 Stars across +3,000 orders in Miami (UberEats & Google)"` and OG tags. |
| **R4 Header & Location** | US-02 | `TopBar.tsx` | Click location switcher, select "Brickell", verify state updates and persists. |
| **R4 Category Tabs** | US-04 | `CategoryTabs.tsx` | Click each of the 6 tabs; confirm filter updates menu grid and active pill turns terracotta. |
| **R4 Menu Cards & Badges** | US-05 | `MenuGrid.tsx` | Check badges: Mojo Signature (terracotta), Popular/Top Seller (gold), Fresco del día (lime). |
| **R4 Side Customization** | US-06 | `QuickOrderModal.tsx` | Open Ropa Vieja ($16.95), select Tostones (+$1.50); check button displays $18.45. |
| **R4 Cart Drawer** | US-07 | `CartSheet.tsx`, `cart.tsx` | Add items, check line grouping, decrement quantity, clear cart; test drawer animation. |
| **R4 WhatsApp Checkout** | US-08 | `whatsapp.ts`, `CartSheet.tsx` | Click "Order via WhatsApp", inspect generated URL for encoded location, dishes, sides, and total. |
| **R4 Mobile Action Bar** | US-09 | `MobileActionBar.tsx` | Emulate iPhone/Android viewport (<768px), verify sticky bottom bar, safe-area padding, and live sync. |
| **Technical Acceptance** | US-10 | `package.json`, Vite build | Execute `npm run build` in `mojo-grille-demo`; assert 0 TypeScript, Vite, and Nitro errors. |

---

*End of Specification — Prepared by `@ProductLead` for Mojo Grille Multi-Agent Engineering.*
