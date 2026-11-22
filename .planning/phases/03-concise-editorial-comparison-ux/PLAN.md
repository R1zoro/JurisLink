# Phase 3 Plan: Concise Editorial Comparison & Card UX Overhaul

## Context & User Feedback
The user confirmed the warm beige/cream/brown color scheme and the refined world map are right on target, but identified major UX flaws in the card layout and comparison view:
1. **Cluttered Country Cards (`media_1795367829876_ade7b759.png`):** The cards currently feature truncated text (`6 Hours (CERT-In Ma...`), fragmented inner boxes, and a large, jarring yellow warning box (`[!] Digital Personal Data Protection... [UNNOTIFIED]`) that consumes 30% of the card and creates visual noise.
2. **Cluttered Comparison View (`media_1795367819230_e5e1ef78.jpg`):** The side-by-side comparison screen is a vertical stack of repetitive nested boxes ("AI Law Status", "Unnotified & Pending Acts") with dense paragraphs and oversized yellow containers, making side-by-side scanning cumbersome.
3. **Core UX Goal:** Adopt **progressive disclosure** and an **editorial comparison matrix table** (inspired by Apple, Stripe, and modern legal directories). Provide high-level, scannable specs in cards and comparison views, moving dense paragraphs into the dedicated Dossier modal.

---

## Detailed Tasks

### Task 1: Redesign Country Cards (`components/CountryCard.tsx`)
- **Eliminate:** The fragmented inner boxes, truncated text, and the oversized yellow warning banner.
- **Implement:** A clean, scannable editorial spec card:
  - Header: Flag, Country Name, ISO Code, and strictness score badge (`8.4 / 10`).
  - Score Bar: Subtle, refined cognac bar.
  - Clean Spec List (No nested boxes, no truncated text):
    - **Primary Statute:** e.g., *Information Technology Act, 2000*
    - **Maximum Sentence:** e.g., *Life Imprisonment (Cyber Terrorism)*
    - **Breach Notice:** e.g., *6 Hours (CERT-In)*
    - **AI Governance:** Clean status tag (`Enacted` / `Pending Bill`)
    - **Legislative Pipeline:** Elegant indicator (e.g., `2 Unnotified Bills Pending` with subtle ochre dot, not a giant yellow box)
  - Actions: Crisp `+ Compare` and `Dossier →` buttons with generous whitespace.

### Task 2: Overhaul Comparison Screen (`components/ComparisonModal.tsx`)
- **Eliminate:** The vertical stack of oversized warning cards and dense paragraphs.
- **Implement:** A true **Editorial Comparison Matrix Table** with fixed row categories:
  - **Header Row:** Flag, Country Name, ISO Code, and Strictness Gauge.
  - **Row 1 | Core Statute:** Primary law, enactment year, and key focus.
  - **Row 2 | Maximum Penalty:** Incarceration limit (e.g., *Life Imprisonment* vs. *20 Years*).
  - **Row 3 | Financial Sanctions:** Corporate fines & turnover penalties.
  - **Row 4 | Breach Reporting Window:** Mandatory incident disclosure timeframe.
  - **Row 5 | Extraterritorial Reach:** Cross-border enforcement scope.
  - **Row 6 | AI & Deepfake Governance:** Concise status + 1-sentence legal posture (clean, unboxed).
  - **Row 7 | Pending / Unnotified Acts:** Clean bulleted list with minimal status tags (`Gazette Pending` / `Draft`).
- **Result:** Users can easily scan horizontally and compare any metric across countries in seconds.

### Task 3: Clean up `PendingLawsView.tsx` & `AICybercrimesView.tsx`
- Ensure all views follow this unified, concise editorial pattern without jarring yellow warning containers or verbose walls of text.

---

## Verification Criteria
- [ ] No nested warning containers or truncated text on country cards.
- [ ] Side-by-side comparison screen is a true structured matrix table with aligned comparison rows.
- [ ] Color scheme remains beige, cream, sand, and cognac brown.
- [ ] Dense text moved to Dossier modal; cards and comparison table remain scannable.
- [ ] `npm run build` succeeds with zero errors.
- [ ] Code committed and pushed to GitHub.
