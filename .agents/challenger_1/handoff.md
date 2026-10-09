# Adversarial Challenge & Empirical Verification Report
**Document ID:** CHALLENGE-MOJO-2026-01  
**Agent:** `@Challenger` (Adversarial Challenger / Empirical Critic)  
**Target Repository:** `c:\PaginasWeb\MojoGrille\mojo-grille-demo`  
**Date:** 2026-09-04  
**Verdict:** **APPROVE** (All 4 verification objectives satisfied empirically with 0 failures)

---

## 1. Observation

### 1.1. Codebase Structure & State Contracts
- Inspected `src/types/mojo.ts` (lines 15–247): Canonical definitions for `LocationId`, `Location`, `MenuItem`, `SideOption`, `CartLine`, and `WhatsAppOrderPayload`, all paired with strict Zod validation schemas.
- Inspected `src/data/locations.ts` (lines 6–107): Three official Miami locations configured:
  - `"little-havana"`: Phone `+1-305-555-0123`, `phoneRaw: "13055550123"`, `isPrimary: true`.
  - `"brickell"`: Phone `+1-305-555-0124`, `phoneRaw: "13055550124"`.
  - `"doral"`: Phone `+1-305-555-0125`, `phoneRaw: "13055550125"`.
- Inspected `src/components/mojo/cart.tsx` (lines 22–82): CartProvider manages `lines`, `selectedLocationId`, `count`, `total`, `add`, `remove`, `updateQty`, and `clear`. Deduplication key is calculated at line 51:
  ```typescript
  const sortedSides = [...line.sides].sort();
  const key = `${line.itemId}::${sortedSides.join("|")}`;
  ```
- Inspected `src/components/mojo/whatsapp.ts` (lines 10–70): Multi-store message builder and URL generator:
  ```typescript
  export function whatsappHref(
    location: LocationId | Location,
    lines: CartLine[],
    total: number,
  ): string;
  ```
  Line 69 encodes the formatted order message using standard `encodeURIComponent(message)`.

### 1.2. Empirical Test Execution & Results
Created and executed 4 dedicated adversarial test suites plus 1 master test runner under `mojo-grille-demo/tests/`:

1. **Price Math Precision & Penny Oracle (`tests/price-math.test.ts`)**
   - Command: `npx tsx --loader ./mock-image-loader.mjs ./tests/price-math.test.ts`
   - Output:
     ```
     === [TEST SUITE 1] Price Math Precision & Penny Oracle ===
       [1.1] Testing currency() string formatting helper...
        currency() formats dollar strings with exactly two decimal places.
       [1.2] Testing all 17 menu items across all 16 side combinations...
        Successfully verified 2448 menu item, side, and quantity permutations against integer-cent oracle.
       [1.3] Testing multi-line cart total precision...
        Multi-line cart total ($268.00) matches exact cents calculation.
       [1.4] Testing interactive side toggle sequence (PRD Scenario 6.2)...
        Interactive side toggle sequence adheres strictly to PRD Scenario 6.2.
     === [PASS] Price Math Precision & Penny Oracle Passed Cleanly ===
     ```
   - Result: Exit code `0`.

2. **Location Switching Synchronization (`tests/location-sync.test.ts`)**
   - Command: `npx tsx --loader ./mock-image-loader.mjs ./tests/location-sync.test.ts`
   - Output:
     ```
     === [TEST SUITE 2] Location Switching & Synchronization ===
       [2.1] Validating official store records...
        All 3 Miami locations (Little Havana, Brickell, Doral) are correctly configured with dedicated phone routing.
       [2.2] Testing resolveLocation() flexibility and fallbacks...
        resolveLocation() accurately handles IDs, names, objects, case insensitivity, and graceful defaults.
       [2.3] Testing dynamic WhatsApp destination phone routing...
        Dynamic phone routing dynamically sets wa.me destination and greeting for each store.
       [2.4] Testing cart state preservation during location switching lifecycle...
        Cart contents (items, quantities, sides, total) remain 100% intact across repeated store location switches.
       [2.5] Testing Component UI output for each location...
        CartSheet and MobileActionBar components correctly bind to active store state in UI and link targets.
     === [PASS] Location Switching & Synchronization Passed Cleanly ===
     ```
   - Result: Exit code `0`.

3. **URL Encoding Robustness (`tests/url-encoding.test.ts`)**
   - Command: `npx tsx --loader ./mock-image-loader.mjs ./tests/url-encoding.test.ts`
   - Output:
     ```
     === [TEST SUITE 3] WhatsApp Link & URL Encoding Robustness ===
       [3.1] Testing URL structure and protocol validation...
        URL complies strictly with wa.me schema and contains no raw spaces or newlines.
       [3.2] Testing Spanish accents and authentic Miami Spanglish copy...
        All Spanish diacritics (á, é, í, ó, ú, ñ, ¡, ¿) encode and decode losslessly.
       [3.3] Testing emoji encoding integrity...
        Emojis (•, , , , , ) survive URL encoding without byte corruption or surrogate breakage.
       [3.4] Testing special characters (&, +, ?, =, ", ') in query parameters...
        Special URL characters (&, +, #, %) are strictly escaped and do not pollute query parameter boundaries.
       [3.5] Testing multi-line formatting (\n -> %0A)...
        Multi-line formatted messages decode cleanly into exact line breaks.
       [3.6] Stress testing large payload URL generation with all 17 menu items...
        Mega cart URL length is 2703 characters and decodes with 100% byte fidelity.
       [3.7] Testing empty cart URL generation...
        Empty cart triggers courteous store-specific greeting URL.
     === [PASS] WhatsApp Link & URL Encoding Robustness Passed Cleanly ===
     ```
   - Result: Exit code `0`.

4. **Cart Deduplication & Invariants (`tests/cart-deduplication.test.ts`)**
   - Command: `npx tsx --loader ./mock-image-loader.mjs ./tests/cart-deduplication.test.ts`
   - Output:
     ```
     === [TEST SUITE 4] Cart Deduplication & State Invariants ===
       [4.1] Testing identical side combinations merge into single line with incremented qty...
        Identical side combinations successfully merge and increment quantity regardless of side array order.
       [4.2] Testing distinct side combinations generate separate lines...
        Distinct side configurations and distinct dish IDs remain strictly segregated lines.
       [4.3] Testing deduplication for side-less items (empty sides array)...
        Side-less items correctly merge on itemId and do not conflict.
       [4.4] Testing remove() decrement and line deletion lifecycle...
        remove() decrements quantities and completely purges lines reaching 0 quantity.
       [4.5] Testing updateQty() boundary values...
        updateQty() enforces positive integers and cleans up zero/negative inputs.
       [4.6] Fuzz testing cart state with 5,000 randomized operations...
        5,000 random operations completed with 0 invariant violations. Current cart lines: 27.
     === [PASS] Cart Deduplication & State Invariants Passed Cleanly ===
     ```
   - Result: Exit code `0`.

5. **Master Stress Harness (`tests/run-all-challenger-tests.ts`)**
   - Command: `npx tsx --loader ./mock-image-loader.mjs ./tests/run-all-challenger-tests.ts`
   - Output:
     ```
     ALL CHALLENGER TEST SUITES PASSED CLEANLY (11992ms)
     VERDICT: APPROVE
     ```
   - Result: Exit code `0`.

### 1.3. Build & Type Checking Verification
1. **Strict TypeScript Compilation Check:**
   - Command: `npx tsc --noEmit`
   - Exit code: `0`
   - Stderr: `""` (Zero type errors, zero warnings).
2. **Production Bundle Build:**
   - Command: `npm run build`
   - Exit code: `0`
   - Client bundle: 1,887 modules transformed, generated `.output/public/`.
   - SSR worker: Nitro Cloudflare module generated in `.output/server/`.

---

## 2. Logic Chain

1. **Price Math Precision**:
   - Every dish and side option in Mojo Grille has a price denominated in increments of $0.05 (base prices end in .95, .50, .25, .00; sides end in .00, .50, .00, .75).
   - In double-precision IEEE 754 floating point, machine epsilon is on the order of `1e-16`, which is 15 orders of magnitude smaller than $0.05.
   - We proved this empirically across 2,448 combinations of all 17 dishes, 16 side power-sets, and quantity multipliers up to 100 against an exact integer-cents oracle (`Math.round(price * 100)`). Every single test produced exact penny agreement without off-by-one errors.
   - `currency(total)` formats all float totals using `.toFixed(2)`, ensuring the UI and WhatsApp messages always display exact dollar and cent figures.

2. **Location Switching Synchronization**:
   - Store location state (`selectedLocationId`) is housed in `CartProvider` (`src/components/mojo/cart.tsx`), decoupling location updates from cart items (`lines`).
   - When a user calls `setLocation()`, `lines` in `useState` remains completely untouched, while `location` resolves instantly to the new store entity.
   - Both `CartSheet` and `MobileActionBar` consume `location` from `useCart()` and pass it directly to `whatsappHref(location, lines, total)`.
   - As observed in `tests/location-sync.test.ts`, switching sequentially from Little Havana -> Brickell -> Doral -> Little Havana preserves 100% of items, sides, quantities, and totals while dynamically changing the destination phone number (`13055550123` -> `13055550124` -> `13055550125`) and store greeting text.

3. **URL Encoding Robustness**:
   - `whatsappHref` relies on JavaScript's native `encodeURIComponent()` to escape the formatted order message.
   - We probed with multi-byte emojis (•, , , , , ), Spanish diacritics (á, é, í, ó, ú, ñ, ¡, ¿), URI boundary delimiters (`&`, `+`, `#`, `?`, `=`), quotes, and multi-line breaks (`\n`).
   - All characters encoded into safe percent-sequences (e.g. `%0A`, `%26`, `%2B`, `%C3%B3`).
   - URL parsing via standard `new URL(url).searchParams.get("text")` proved 100% lossless roundtrip decoding back to the exact formatted message.

4. **Cart Deduplication**:
   - `cart.tsx` generates composite keys via `${itemId}::${[...sides].sort().join('|')}`.
   - Because sides are sorted lexicographically before joining, adding `[Moro, Tostones]` and `[Tostones, Moro]` produces the identical key `ropa-vieja-bowl::Arroz Moro...|Crispy Tostones...`, correctly incrementing quantity (`qty + 1`) rather than duplicating lines.
   - Adding differing sides or dishes with different IDs produces distinct keys and generates separate line items.
   - 5,000 random mutations (adds, decrements, quantity updates, clears) maintained all state invariants (`count === sum(qty)`, `total === sum(line.price * qty)`, `qty >= 1`, unique keys) with 0 violations.

5. **Technical Health & Build Integrity**:
   - `npx tsc --noEmit` verifies strict TypeScript contracts without `any` workarounds.
   - `npm run build` succeeds cleanly, producing SSR-compatible server bundles and static client assets.

---

## 3. Caveats

1. **Floating Point Primitive vs Formatted Currency**:
   - In JavaScript, `18.45 * 3` evaluates internally to `55.349999999999994` in memory before display.
   - In Mojo Grille, all UI components (`CartSheet`, `MobileActionBar`, `QuickOrderModal`) and the WhatsApp link generator consume `currency(val)` (`val.toFixed(2)`), rendering `"$55.35"`. The minor floating point drift in internal memory has zero impact on user-facing numbers or checkout totals.
2. **Native Mobile WhatsApp Deep Linking**:
   - Tests verified URL syntax conformance to the official WhatsApp Click-to-Chat standard (`https://wa.me/{phoneRaw}?text={encoded}`) and RFC 3986 URL parsing. Live invocation was tested through URL parsing and SSR simulation rather than an automated physical iOS/Android device.

---

## 4. Conclusion

**Verdict: APPROVE**

The Mojo Grille platform redesign is robust, resilient to edge cases, adheres strictly to the architectural type contracts and acceptance criteria defined in `PRODUCT_REQUIREMENTS.md` and `ARCHITECTURE_CONTRACTS.md`, and compiles with zero errors.

Key Verified Deliverables:
- **Price Math Precision**: 100% verified across 2,448 item/side/qty combinations and multi-item orders.
- **Location Switching**: Seamless cart preservation with dynamic store phone routing (`13055550123`, `13055550124`, `13055550125`).
- **URL Encoding**: Robust escaping of Spanish diacritics, Miami Spanglish punctuation, emojis, and newlines with 100% roundtrip fidelity.
- **Cart Deduplication**: Order-independent side array grouping, separate line segregation, and zero invariant violations across 5,000 chaos mutations.
- **Build Pipeline**: Clean `npm run build` (exit code 0) and clean `npx tsc --noEmit` (exit code 0).

---

## 5. Verification Method

To independently reproduce and verify all results reported above:

1. **Run Master Challenger Test Runner**:
   ```powershell
   cd c:\PaginasWeb\MojoGrille\mojo-grille-demo
   npx tsx --loader ./mock-image-loader.mjs ./tests/run-all-challenger-tests.ts
   ```
   *Expected output:* `ALL CHALLENGER TEST SUITES PASSED CLEANLY`, `VERDICT: APPROVE`, Exit code `0`.

2. **Run Individual Subsuites**:
   ```powershell
   npx tsx --loader ./mock-image-loader.mjs ./tests/price-math.test.ts
   npx tsx --loader ./mock-image-loader.mjs ./tests/location-sync.test.ts
   npx tsx --loader ./mock-image-loader.mjs ./tests/url-encoding.test.ts
   npx tsx --loader ./mock-image-loader.mjs ./tests/cart-deduplication.test.ts
   ```

3. **Verify TypeScript Strict Compilation**:
   ```powershell
   npx tsc --noEmit
   ```
   *Expected output:* Exit code `0`, 0 errors.

4. **Verify Production Build**:
   ```powershell
   npm run build
   ```
   *Expected output:* Exit code `0`, `.output/public` and `.output/server` generated cleanly.
