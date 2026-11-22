# JurisLink — Development Roadmap

## Phase Overview

### Phase 1: Tactical UI Overhaul & 2D Scrollable Threat Map Engine (CURRENT)
- **Goal:** Replace basic template styling with an enterprise-grade cybersecurity command HUD; implement interactive 2D scrollable/pannable world plane map with animated 3D curved attack arcs, real-time threat telemetry ticker, and multi-mode heatmap toggle.
- **Plans:**
  - `01-01-tactical-plane-map-engine.md`: Build interactive 2D Canvas/SVG world map with zoom/pan, animated Bezier curved attack arcs connecting global nodes, and Heatmap layer switch (Attack Vectors vs Legal Strictness Heatmap).
  - `01-02-cyber-command-hud-ui.md`: Overhaul entire UI layout, typography, cards, comparison view, and modals to match high-end cybersecurity intelligence systems (CrowdStrike/Palantir aesthetic).
  - `01-03-readme-and-deployment-hardening.md`: Overhaul README for academic evaluation; ensure graceful fallback and cloud environment variable injection for Vercel deployment.
