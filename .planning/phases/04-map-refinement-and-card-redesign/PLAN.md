# Phase 4 Plan: Map Depth Refinement & Card UX Overhaul

## Review Findings & Core Problems
1. **Broken Country Flag Fallback (Stray "IN" / "US"):** In `CountryCard.tsx`, raw emoji flag characters render as raw uppercase country codes on Windows without color emoji support, creating an awkward floating "IN" / "US" label.
2. **Text Squeezing & Truncation:** Dense legal strings are squeezed into rigid single-line flex rows, cutting off vital text (`18 U.S.C. §...`, `death or criti...`).
3. **Map Experience Limitations:**
   - Restricted pan/zoom range.
   - Sparse threat links (only 6 hardcoded items).
   - Poor click UX: clicking a map node opens a full-screen modal that jars the user out of the map experience instead of providing in-map context.

---

## Detailed Tasks

### Task 1: Complete Redesign of Country Cards (`components/CountryCard.tsx`)
- **Fix Flag Rendering:** Replace raw emoji flags with an elegant, cross-platform country badge:
  - Clean ISO pill: `[IND]`, `[USA]`, `[GBR]`, etc., styled with subtle country accents.
- **Eliminate Rigid Striped Table Layout:**
  - Structure into a modern editorial card layout:
    - **Header:** Country name, Continent, ISO badge, and Strictness score (`8.4 / 10`).
    - **Primary Statute Callout:** Clean title without mid-symbol clipping.
    - **Spec Grid:** 2-column or clean spec strip for *Max Sentence*, *Breach Notice*, and *AI Cyber Law*.
    - **Pipeline Status:** Subtle, understated pill for pending gazette notifications.
    - **Action Buttons:** Polished `+ Compare` and `Dossier →`.

### Task 2: Advanced Map Refinement (`components/WorldLegalMap.tsx`)
- **Deep Zoom & Pan Range:**
  - Enable smooth mouse-wheel zoom (0.8x up to 4.5x) and drag-panning across continents.
  - Add auto-pan to clicked country node.
- **Rich 20+ Threat Taxonomy with Category Filters:**
  - Add threat type selector pills above the map:
    - `All Threats`
    - `Ransomware & Extortion`
    - `Critical Infrastructure APT`
    - `AI & Deepfake Scams`
    - `State Espionage`
    - `Supply Chain Zero-Days`
  - Threat arcs dynamically filter based on selected category.
- **In-Map Interactive Inspector Drawer:**
  - When clicking a country on the map, smoothly center on it and slide out an in-map **Country Inspector Card**:
    - Shows country strictness score and rating.
    - Shows inbound and outbound threat arcs connected to this country.
    - Shows governing statute and unnotified acts count.
    - 1-click actions: `Add to Compare` and `View Full Dossier`.
    - Keeps the user immersed in the map without forcing a full-screen modal.

---

## Verification Criteria
- [ ] No stray floating "IN" / "US" letters on country cards.
- [ ] No clipped statute titles or truncated sentences (`§...`, `criti...`).
- [ ] Map supports deep zoom, fluid panning, and threat category filtering.
- [ ] Clicking a country on the map opens an in-map inspector without jarring modal popups.
- [ ] Production build (`npm run build`) compiles with 0 errors.
- [ ] Code committed and pushed to GitHub.
