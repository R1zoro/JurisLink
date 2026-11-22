# Phase 1 Plan: Tactical 2D Plane Map, UI Overhaul & Deployment Hardening

## Context & Objectives
The user provided critical feedback on:
1. **README & Academic Context:** The previous README read like a generic open-source setup guide telling users to put keys in `.env`. It must be rewritten as an academic submission report for Semester 7 Cybercrime Mini Project evaluators.
2. **UI Aesthetic (Anti-"AI Slop"):** Transform the design into a high-end cybersecurity intelligence dashboard inspired by CrowdStrike Falcon, Palantir Gotham, and Cloudflare Radar. Remove cartoonish/emoji overload and implement tactical HUD elements, technical monospace data tags, crisp micro-borders, and refined typography.
3. **2D Scrollable Tactical Plane Map with 3D/Curved Attack Arcs & Heatmap Switch:**
   - Implement an interactive 2D scrollable/draggable world plane map.
   - Render animated 3D curved parabolic Bezier attack arcs between source and target countries representing real cybercrime campaigns (ransomware, APTs, botnets).
   - Display a live threat telemetry ticker linking attack vectors to specific national statutes (e.g. CFAA § 1030, IT Act Sec 66, NIS2).
   - Add a Heatmap toggle switch (`Attack Arcs` vs `Legal Strictness Heatmap` vs `Pending Legislation Hotspots`).
   - Enable country click-to-focus on the map to inspect its tactical legal dossier.
4. **Cloud Deployment & Key Security:** Ensure API keys are injected via Vercel dashboard environment variables without ever committing them to GitHub, with graceful fallbacks so the app never crashes.

---

## Detailed Task Breakdown

### Task 1: 2D Interactive Scrollable World Plane Map Component (`components/TacticalWorldMap.tsx`)
- Build a performant, dependency-free interactive vector canvas / SVG 2D plane projection map.
- Features:
  - Drag-to-pan & zoom controls (scrollable / draggable on both desktop and mobile touch).
  - Geographic node coordinates for world nations (USA, UK, Germany, India, Singapore, China, UAE, Australia, Canada, Estonia, Japan, South Africa, etc.).
  - **Animated 3D Curved Attack Arcs:** Render parabolic Bezier curves with flowing particle pulses from attacker nodes to target nodes (e.g. Moscow/Beijing/Tehran $\rightarrow$ Washington/London/Berlin/New Delhi/Singapore).
  - **Target Impact Radar Pulses:** Expanding ripples on target node impact.
  - **Live Threat Telemetry Feed:** Real-time ticker at the bottom of the map linking attack vectors to legal statutes.
  - **Heatmap Layer Switch:**
    - Mode A: *Live Cyber Attack Arcs (Vector Trails)*
    - Mode B: *Statutory Strictness Heatmap (Color Intensity based on Statutory Severity & Penalties)*
    - Mode C: *Unnotified & Pending Legislation Hotspots*
  - **Clickable Country Nodes:** Clicking a node focuses that country and opens its legal dossier HUD.

### Task 2: High-End Cyber Command HUD UI Overhaul
- Update `app/globals.css`, `components/Navbar.tsx`, `components/CountryCard.tsx`, `components/ComparisonModal.tsx`, `components/PendingLawsView.tsx`, and `components/AICybercrimesView.tsx`.
- Replace basic cards with tactical HUD panels:
  - Monospace indicators (`JetBrains Mono` / technical codes: `LAT/LONG`, `STATUTORY_CODE`, `SEVERITY_INDEX`).
  - Corner HUD brackets (`[+]`, `[-]`, technical border cuts).
  - Clean data density, removing emoji spam.
  - Sleek dark theme: obsidian (`#030712`), deep navy slate (`#0b0f19`), cyber cyan (`#00f0ff`), crimson alert (`#f43f5e`), warning amber (`#f59e0b`).
  - Seamless integration of the Tactical World Map into the homepage as the primary hero command center!

### Task 3: Academic README & Vercel Deployment Hardening
- Rewrite `README.md` into an academic submission report for Semester 7 Cybercrime & Cyber Law evaluation:
  - Project Overview & Academic Problem Statement.
  - Technical Architecture (Next.js 14, Vector Canvas Map, Groq Llama-3.3-70B, Tavily Search API).
  - Comparative Legal Methodology & Strictness Index Formula.
  - Real-Time Attack Map & Telemetry Integration.
  - Live Deployment Guide (Vercel deployment with environment variable configuration).
- Test production build (`npm run build`) to ensure 100% clean compilation.
- Commit and push all updates to GitHub (`https://github.com/R1zoro/JurisLink.git`).

---

## Verification Criteria
- [ ] 2D world plane map is scrollable, pannable, and responsive on mobile & desktop.
- [ ] Animated curved attack arcs stream between global nodes with particle trails and impact rings.
- [ ] Heatmap switch successfully toggles between Attack Vectors and Legal Strictness Heatmap modes.
- [ ] UI looks like an enterprise cybersecurity platform (anti-AI-slop, clean HUD typography, tactical borders).
- [ ] README is an academic showcase suitable for university submission.
- [ ] `npm run build` succeeds with zero errors.
- [ ] Git commit and push succeeds.
