# ⚖️ JurisLink — Global Cyber Threat & Legal Strictness Matrix

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Groq](https://img.shields.io/badge/Groq-Llama--3.3--70B-orange)](https://groq.com/)
[![Tavily](https://img.shields.io/badge/Tavily-Web_Search_API-blue)](https://tavily.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**JurisLink** is a tactical cyber intelligence platform and comparative statutory matrix. It bridges the gap between active cross-border cyber threat campaigns (ransomware syndicates, state-sponsored APTs, data breaches) and the global legal frameworks that govern them.

---

## 🌟 Core Intelligence Capabilities

### 1. 🗺️ 2D Interactive Tactical Threat Map & Heatmap Engine
* **2D Scrollable & Pannable Vector Projection:** Freely explore the global cyber landscape with smooth pan, zoom, and node focus controls.
* **3D Parabolic Curved Attack Arcs:** Real-time animated vector arcs streaming between global nodes with flowing particle trails and target impact radar pulses.
* **Live Threat Telemetry Feed:** Real-time ticker linking active threat vectors directly to governing statutory codes (e.g., CFAA 18 U.S.C. § 1030, India IT Act Sec 66, EU NIS2 Directive).
* **Multi-Layer Heatmap Switch:** Toggle between *Live Attack Vectors*, *Statutory Strictness Heatmap* (visualizing penalty severity across nations), and *Pending Legislation Hotspots*.

### 2. ⚖️ Side-by-Side Jurisdictional Strictness Comparison
* Compare **2 to 3 nations simultaneously** across statutory penalty limits, mandatory breach reporting deadlines (e.g., India's 6-hour CERT-In rule vs. EU's 72-hour GDPR rule vs. Singapore's 2-hour CII mandate), and extraterritorial reach.
* Evaluates a **Strictness Index (1.0 to 10.0)** derived from incarceration severity, corporate turnover penalties, and enforcement vigor.
* Integrated **AI Jurisdictional Synthesis** generating instant comparative legal briefs.

### 3. ⏳ Acts Available but NOT Notified / Draft Bills Pipeline
* Dedicated legislative tracker for statutes passed by national parliaments that are **awaiting official gazette notification** or secondary administrative rules.
* Tracks pending enforcement timelines, regulatory bottlenecks, and draft bills (e.g., India DPDP Act secondary rules & Digital India Act draft, US DEFIANCE Act & CIRCIA NPRM, EU Cyber Resilience Act transitional timeline, Canada Bill C-26/C-27, Japan Active Cyber Defense).

### 4. 🤖 AI Cybercrime & Emerging Threat Governance
* Comprehensive statutory matrix tracking legal coverage across 4 modern threat categories:
  * **Non-Consensual Deepfakes & Impersonation:** (EU AI Act Art. 50, US DEFIANCE Act, UAE Decree-Law 34 Art. 44, UK Online Safety Act).
  * **AI Voice Cloning & Financial Extortion:** (FCC TCPA ban, India IT Act Sec 66D, China Deep Synthesis Provisions).
  * **Autonomous Offensive Agents & LLM Jailbreaks:** (Prompt injection liability, systemic risk tests under NIS2/EU AI Act).
  * **Model Poisoning & Training Data Scraping:** (Data sovereignty and algorithmic audit provisions).

### 5. 🔍 Real-Time AI Legal Intelligence (Groq + Tavily)
* Powered by **Groq Llama-3.3-70B** for zero-latency statutory synthesis.
* Integrated with **Tavily Web Search API** to retrieve real-time amendments, recent gazette notifications, and judicial precedents with active URL citations.

---

## 🛠️ Architecture & Tech Stack

* **Frontend:** Next.js 14 (App Router), React 18, Tailwind CSS, Lucide React icons.
* **Map Engine:** High-performance self-contained 2D vector canvas/SVG projection with parabolic Bezier math and particle animation loops (zero external map tile tokens required).
* **Backend:** Next.js Serverless API Routes (`/api/ai-research`).
* **AI Engine:** Groq SDK (`llama-3.3-70b-versatile`).
* **Web Grounding:** Tavily Search REST API (live legal research and web citations).

---

## 🚀 Cloud Deployment (Vercel)

Deploying **JurisLink** requires zero server configuration:

1. Import this repository into [Vercel](https://vercel.com).
2. Under **Project Settings $\rightarrow$ Environment Variables**, configure your keys:
   * `GROQ_API_KEY`: Your Groq API key
   * `TAVILY_API_KEY`: Your Tavily Search API key
3. Click **Deploy**. Vercel will build and launch the platform with global CDN acceleration and automated SSL.

---

## 📄 License
Released under the [MIT License](LICENSE).
