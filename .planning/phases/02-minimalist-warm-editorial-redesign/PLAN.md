# Phase 2 Plan: Minimalist Editorial Redesign (Beige, Cream & Warm Brown) & Refined Map

## Context & User Feedback
The user provided critical feedback with screenshots:
1. **Harsh, basic color scheme ("AI slop"):** The neon cyan, bright orange, and dark black look like a cheap hacker movie UI with cluttered telemetry text ("LIVE THREAT VECTOR ENGINE", "GLOBAL APT TELEMETRY", fake hacker node labels).
2. **Preferred Aesthetic:** Transition to an elegant, minimalist, high-end editorial aesthetic featuring **beige, cream, sand, and warm brown/espresso** (inspired by top modern design studios, Stripe Press, ReadCV, and editorial law reviews).
3. **Map Refinement:** Replace blocky polygon shapes with a smooth, refined world vector map. Remove fake nodes (`APT-E`, `R-NET`, `APT-I`) and gaudy banners. Keep it clean, elegant, with thin, graceful arcs linking real nations and a clean Heatmap switch.
4. **README Cleanup:** Strip all badge icons and deployment instructions. Keep it concise: strictly what the app does and the tech stack.

---

## Detailed Tasks

### Task 1: Product-First, Minimalist README (`README.md`)
- Remove all badge shields, icons, and deployment guides.
- Keep strictly:
  - Project Title: `JurisLink`
  - Concise description of what the platform does.
  - Core features overview (Comparative Legal Strictness, Pending/Unnotified Acts Tracker, AI Cybercrime Governance, Grounded Legal Assistant).
  - Clean Tech Stack list.
  - License.

### Task 2: Warm Editorial Design System (`app/globals.css`, `tailwind.config.ts`)
- Replace the neon cyber palette with an editorial warm palette:
  - **Base Canvas:** Soft Warm Cream / Alabaster (`#FBF9F5` / `#F5F2EB`)
  - **Card / Surface:** Warm Crisp White (`#FFFFFF`) with refined Warm Sand borders (`#EAE5DB`)
  - **Text Primary:** Deep Espresso Charcoal (`#1C1917` / `#292524`)
  - **Text Muted:** Warm Stone / Taupe (`#78716C`)
  - **Primary Accent (Cognac / Warm Saddle Brown):** `#7C4A27` / `#8C5A3C`
  - **Pending / Warning (Warm Ochre / Amber):** `#B45309` / `#C27803`
  - **High Strictness / Alert (Warm Terracotta / Rust):** `#C2410C` / `#991B1B`
  - **Enacted / Verified (Muted Olive / Forest):** `#2D5A43`
- Typography: Clean, refined typographic hierarchy with generous whitespace, subtle borders, and zero clutter.

### Task 3: Refined Minimalist World Map (`components/TacticalWorldMap.tsx` $\rightarrow$ `components/WorldLegalMap.tsx`)
- Eliminate noisy banners ("LIVE THREAT VECTOR ENGINE", "GLOBAL APT TELEMETRY").
- Remove all fake threat nodes (`APT-E`, `R-NET`, `APT-I`). Plot **only real jurisdictions** from the dataset.
- Render smooth, detailed, elegant vector world continental geometry.
- Thin, delicate, warm terracotta/copper curved connection arcs between actual countries.
- Minimalist header: Clean title `Global Cyber Law & Cross-Border Vector Map` with a simple, understated switch: `[ Threat Connections ]` | `[ Strictness Heatmap ]` | `[ Pending Hotspots ]`.
- Clean, concise hover cards that show clear statutory metrics without sensory overload.

### Task 4: Minimalist Cards & Navigation Overhaul
- **Navigation (`components/Navbar.tsx`):** Understated editorial header with clean typography, no gaudy status bars or neon pills.
- **Country Card (`components/CountryCard.tsx`):** Clean, spacious cards with warm cream surfaces, subtle sand borders, clean typography, concise badge indicators, and refined action buttons.
- **Comparison Dossier (`components/ComparisonModal.tsx`):** Editorial split-screen comparison with clean typography, warm tones, and concise data tables.
- **Pending Laws & AI Views (`PendingLawsView.tsx`, `AICybercrimesView.tsx`):** Clean, readable editorial layouts highlighting unnotified gazette rules and AI legislation without clutter.
- **AI Assistant Drawer (`AIAssistantDrawer.tsx`):** Refined slide-over legal research assistant styled in warm tones with Groq and Tavily citations.

---

## Verification Criteria
- [ ] README is free of badges, icons, and deployment guides.
- [ ] Color scheme is warm editorial (beige, cream, sand, warm brown/espresso).
- [ ] Map is refined with smooth geometry, no fake nodes, and no noisy header banners.
- [ ] No neon / hacker sci-fi clutter. Clean, concise, readable information density.
- [ ] `npm run build` succeeds with zero errors.
- [ ] Clean git commit and push to GitHub.
