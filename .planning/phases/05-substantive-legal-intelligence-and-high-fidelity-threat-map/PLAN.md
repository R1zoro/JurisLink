# Phase 5 Plan: Substantive Legal Intelligence & High-Fidelity 3D-Arc Threat Map

## Context & User Problem Statement
1. **Groq Model 404 Error:** `/api/ai-research` fails with `The model llama-3.3-70b-versatile does not exist or you do not have access to it.`
   - *Root Cause:* Model `llama-3.3-70b-versatile` is not available on this API key, and older Llama models (`llama-3.1-70b-versatile`, `llama3-70b-8192`) were decommissioned by Groq.
   - *Tested Live Solution:* `openai/gpt-oss-120b` and `qwen/qwen3.8-27b` are verified active and return HTTP 200 with high-grade legal analysis.
2. **Card Information Presentation & Lack of Reasoning (`media_1795380640352_51dfd9d7.png`):**
   - The user noted: *"see the screenshot, it has whatsoever no reasoning like 'Dossier' AI legalisation 'Enacted' and 9.3/10 what is the use of even of this? please research and expand, when you complete your research then again start a research and question yourself if the information present is even useful."*
   - Cards present superficial attributes ("9.3 / 10", "AI Legislation: ENACTED") without explaining *why* the score was awarded, *what* the AI law actually mandates, or *which* bills are pending. Text was also clipped with `...` (`72 Hours (GDPR) / 24 Hours E...`).
3. **Map Fidelity & Interactivity:**
   - The user noted: *"the Map was what I said to refine heavily and you have made almost no change there"*
   - The previous map used a rough hand-drawn SVG silhouette without true continental geographic fidelity, flat 2D lines instead of 3D parabolic curves with ground-traces, and lacked rich interactive responsiveness.

---

## Technical Architecture & Implementation Steps

### Step 1: Resilient Multi-Model Failover for Groq Legal AI (`app/api/ai-research/route.ts`)
- Replace hardcoded single model with an automatic failover list:
  ```typescript
  const CANDIDATE_MODELS = [
    "openai/gpt-oss-120b",
    "qwen/qwen3.8-27b",
    "openai/gpt-oss-20b"
  ];
  ```
- Implement retry loop that cascades through candidate models if any model returns 404, 400, or rate limits.
- Return response with zero user-facing 404 errors.

### Step 2: Deep Legal Intelligence Data Schema (`data/countries.ts`)
Expand `CountryCyberLaw` with substantive, actionable legal fields:
1. `strictnessRationale`: Explicit 1-2 sentence legal explanation of the score (e.g. EU 9.3: *"Strictest globally due to personal C-suite liability for non-compliance, up to 4% worldwide turnover fines under GDPR, and mandatory 24-hr initial incident alert under NIS2."*).
2. `strictnessBreakdown`: Structured rubric points (e.g. Incarceration Severity, Corporate Turnover Penalties, Breach Disclosure Urgency, Extraterritorial Jurisdiction).
3. `aiGovernanceSummary`: Substantive summary of what the AI law actually enforces (e.g. EU: *"EU AI Act (2024): Bans subliminal manipulation and social scoring; mandates cryptographic deepfake watermarks; penalties up to €35M / 7% turnover."*).
4. `pipelineHighlight`: Concrete title and practical impact of pending legislation (e.g. EU: *"Cyber Resilience Act (CRA): Mandates CE cybersecurity marking and SBOM for commercial software; phased enforcement 2024-2027."*).
5. Comprehensive updates across all 12 sovereign jurisdictions (USA, India, EU, UK, Singapore, China, UAE, Australia, Canada, Estonia, Japan, South Africa).

### Step 3: Complete Redesign of Country Cards (`components/CountryCard.tsx`)
- **Strictness Score with Explanatory Rationale:**
  - Display score pill (`9.3 / 10` · `VERY HIGH STRICTNESS`).
  - Directly beneath the score, display the **Legal Strictness Rationale** box explaining the statutory mechanisms driving the score.
- **AI Cybercrime with Substantive Legal Mandate:**
  - Replace bare "ENACTED" / "PENDING BILL" chip with a dedicated section showing the statute name and what it actually regulates (e.g. deepfake bans, AI watermarking, biometric limits).
- **Legislative Pipeline (Pending Acts):**
  - Explicitly display the pending bill title and its upcoming legal obligations, not just a count.
- **Zero Ellipsis / Text Clipping:**
  - Format breach disclosure window cleanly (e.g. `24h Early Alert (NIS2) · 72h Full Notice (GDPR)`) with auto-wrapping typography.
- **Action Buttons:**
  - Change ambiguous `Dossier ↗` to `Full Legal Dossier`, with a clear tooltip and direct click to open the expanded statutory dossier modal.

### Step 4: World-Class 3D-Arc Threat Map Engine (`components/WorldLegalMap.tsx`)
1. **High-Fidelity Continental Geography:**
   - Accurate, detailed vector paths for all global landmasses (North America, South America, Europe, Africa, Asia, Oceania, major island arcs).
   - Rendered in warm editorial palette (parchment/cream `#FBF9F5`, landmasses `#EBE5DB`, borders `#D4CBBF`, subtle latitude/longitude graticules `#EAE5DB`).
2. **True 3D Parabolic Threat Vector Curves:**
   - **Ground-Trace Shadow Line:** Dashed baseline along the map plane.
   - **3D Parabolic Elevated Arc:** Quadratic Bezier curve arching vertically above the plane with height proportional to distance.
   - **Dynamic Color & Gradient:** From source (`#7C4A27`) to altitude peak (`#C2410C`) to target.
   - **Animated Missile Tracer & Radar Impact Rings:** Animated pulse particle traveling along the 3D curve with expanding shockwave rings upon destination impact.
3. **Smooth Scroll & Pan Experience:**
   - Mouse wheel zoom with centered coordinate tracking (0.8x to 5.0x).
   - Click-and-drag panning across continents with visual inertia.
   - Floating zoom controls: `+` (Zoom In), `-` (Zoom Out), `Reset View`, and dynamic zoom indicator (e.g., `1.8x`).
4. **Interactive Modes & Filtering:**
   - **Threat Arcs Mode:** Categorized across Ransomware, Critical Infrastructure APTs, AI Deepfakes, State Espionage, and Supply Chain.
   - **Strictness Heatmap Mode:** Regional glow and aura calibrated to statutory severity.
   - **Pending Hotspots Mode:** Pulsing indicators for jurisdictions with active unnotified bills.
5. **In-Map Contextual Intelligence Inspector Drawer:**
   - Clicking any country smoothly centers on it and slides out an in-map dossier drawer displaying strictness reasoning, active cross-border threats, governing laws, and direct links to Compare or view the Full Dossier.

---

## Verification Plan
1. **Groq Legal AI Test:** Run query via `/api/ai-research` to verify it succeeds with `openai/gpt-oss-120b` or `qwen/qwen3.8-27b` without 404.
2. **Card Visual & UX Audit:** Verify cards render full strictness rationale, substantive AI law rules, pending bill titles, and have zero text truncation with `...`.
3. **Map Refinement Audit:** Verify high-fidelity continental outlines, fluid mouse-wheel zoom/pan, 3D arcing threat curves with ground shadows, animated packet pulses, and seamless in-map inspector click UX.
4. **Build Verification:** Run `npm run build` to confirm zero TypeScript and Next.js compilation errors.
