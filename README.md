# ⚖️ JurisLink — Global Cybercrime Law & Enforcement Matrix

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Groq](https://img.shields.io/badge/Groq-Llama--3.3--70B-orange)](https://groq.com/)
[![Tavily](https://img.shields.io/badge/Tavily-Web_Search_API-blue)](https://tavily.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**JurisLink** is a mobile-first, cybersecurity-themed intelligence platform and comparative statutory matrix designed for legal scholars, cybersecurity researchers, and students. It provides multi-jurisdictional comparisons of cybercrime statutes, penal codes, strictness indices, **acts passed but awaiting official gazette notification**, and emerging **AI-related cybercrime legislation**.

Developed as a **Semester 7 Cybercrime & Cyber Law Mini Project**.

---

## 🌟 Key Features

### 1. 🌐 Comprehensive Global Cyber Law Repository
* Detailed statutory dossiers across **10+ major world jurisdictions** (India, United States, European Union, United Kingdom, Singapore, China, United Arab Emirates, Australia, Canada, Estonia, Japan, South Africa).
* Highlights primary enacted statutes (e.g., USA CFAA, India IT Act & BNS, UK Computer Misuse Act, Singapore Cybersecurity Act, China CSL/DSL).
* Details statutory maximum incarceration (e.g., Life Imprisonment for Cyber Terrorism), turnover-based corporate penalties, and lead enforcement authorities (FBI, CERT-In, CSA, ENISA, etc.).

### 2. ⚖️ Side-by-Side Strictness Comparison Engine
* Direct side-by-side comparative analysis of 2 to 3 chosen countries simultaneously.
* **Strictness Score (1.0 to 10.0)** evaluated across four pillars:
  1. Statutory penalty severity and incarceration duration.
  2. Mandatory breach notification window (e.g., India's 6-hour CERT-In rule vs EU's 72-hour GDPR rule vs Singapore's 2-hour CII mandate).
  3. Extraterritorial reach and international mutual legal assistance.
  4. AI & deepfake governance readiness.
* One-click **"AI Jurisdictional Synthesis"** button generating dynamic comparative legal briefs.

### 3. ⏳ Acts Available but NOT Notified / Draft Bills Tracker
* Specifically addresses the legislative gap where statutes are enacted or passed by parliaments but **not yet notified in the official gazette** or lack secondary operational rules.
* **Tracked Examples:**
  * **India:** Digital Personal Data Protection (DPDP) Act 2023 secondary notification rules + Digital India Act (DIA) draft.
  * **United States:** DEFIANCE Act 2024 (passed Senate, awaiting enactment) + CIRCIA Notice of Proposed Rulemaking (NPRM).
  * **European Union:** Cyber Resilience Act (CRA) 36-month transitional grace period (2024–2027).
  * **United Kingdom:** Computer Misuse Act Modernization & Cyber Security Bill.
  * **Canada:** Bill C-26 (ARCS) & Bill C-27 (Artificial Intelligence and Data Act - AIDA).
  * **Japan:** Active Cyber Defense (ACD) pre-emptive intrusion authorization.
  * **South Africa:** Unpromulgated Chapter 6 structures of the Cybercrimes Act.

### 4. 🤖 AI-Related Cybercrimes & Emerging Threats Hub
* Dedicated analysis of 4 modern cyber threat pillars:
  1. **Non-Consensual Deepfakes & Impersonation:** (EU AI Act Art. 50, US DEFIANCE Act, UAE Decree-Law 34 Art. 44, UK Online Safety Act).
  2. **Voice Cloning & Financial Extortion:** (FCC TCPA ban, India IT Act Sec 66D, China Deep Synthesis Provisions).
  3. **Autonomous Offensive Agents & LLM Jailbreaks:** (Prompt injection liability, systemic risk tests under NIS2/EU AI Act).
  4. **Model Poisoning & Training Data Scraping:** (Data sovereignty and algorithmic audit provisions).

### 5. 🔍 Real-Time AI Legal Assistant (Groq + Tavily)
* Powered by **Groq Llama-3.3-70B** for ultra-fast, zero-latency inference.
* Integrated with **Tavily Web Search API** to retrieve real-time amendments, recent gazette notifications, and judicial precedents with active URL citations.

---

## 🛠️ Architecture & Tech Stack

* **Frontend:** Next.js 14 (App Router), React 18, Tailwind CSS, Lucide React icons.
* **Backend:** Next.js Serverless API Routes (`/api/ai-research`).
* **AI Engine:** Groq SDK (`llama-3.3-70b-versatile`).
* **Web Grounding:** Tavily Search REST API (live web search & citation retrieval).
* **Styling & Aesthetics:** Custom tactical cyber dark-mode (`#070a12`), glassmorphism cards, responsive mobile drawer, and dynamic strictness gauges.

---

## 🚀 Easy 1-Click Deployment (Vercel)

Deploying **JurisLink** takes under 2 minutes:

1. Push this repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: complete JurisLink platform"
   git push -u origin main
   ```
2. Log in to [Vercel](https://vercel.com) and click **"Add New Project"** $\rightarrow$ select `JurisLink`.
3. In the **Environment Variables** section, add your keys:
   * `GROQ_API_KEY`: `your_groq_api_key`
   * `TAVILY_API_KEY`: `your_tavily_api_key`
4. Click **Deploy**. Vercel will build and provide your live `https://jurislink.vercel.app` URL with automated SSL and global CDN!

---

## 💻 Local Development Setup

### Prerequisites
* Node.js v18+ or v20+
* npm or pnpm

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/R1zoro/JurisLink.git
   cd JurisLink
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory:
   ```env
   GROQ_API_KEY=your_groq_api_key
   TAVILY_API_KEY=your_tavily_api_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 👥 Academic Viva & Evaluation Notes

* **What makes JurisLink unique?** Unlike UNCTAD or UNODC databases that offer dense, text-only tables, JurisLink features interactive strictness scoring, side-by-side comparative dossier generation, explicit tracking of pending/unnotified bills, and an LLM legal researcher grounded in live search.
* **Why Groq + Tavily?** Groq provides LPUs (Language Processing Units) capable of generating 300+ tokens/second with Llama-3.3-70B, while Tavily is purpose-built for AI agents to filter noise and retrieve authoritative legal excerpts.

---

## 📄 License
Released under the [MIT License](LICENSE).
