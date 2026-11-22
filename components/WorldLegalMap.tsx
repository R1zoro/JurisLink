"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { CountryCyberLaw } from "@/data/countries";
import { WORLD_MAP_PATHS } from "@/data/worldMapPaths";
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Scale,
  Clock,
  ArrowRight,
  Shield,
  X,
  Radio,
  Flame,
  AlertTriangle,
  Globe,
  Crosshair,
  Sparkles,
  Cpu,
  BookOpen,
} from "lucide-react";

export type ThreatCategory =
  | "all"
  | "ransomware"
  | "critical_infra"
  | "ai_deepfake"
  | "ddos"
  | "espionage"
  | "supply_chain";

export interface ThreatLink {
  id: string;
  sourceId: string;
  sourceName: string;
  targetId: string;
  targetName: string;
  category: ThreatCategory;
  categoryLabel: string;
  color: string;
  incidentType: string;
  protocolTag: string;
  statutoryContext: string;
  severity: "critical" | "high" | "elevated";
}

// 12 Sovereign Nodes with exact geographic pin coordinates (in 960x480 equirectangular space)
// x = (lng + 180) * (960 / 360), y = (90 - lat) * (480 / 180)
const JURISDICTION_PINS: Record<
  string,
  { name: string; code: string; lat: number; lng: number; x: number; y: number }
> = {
  us: { name: "United States", code: "USA", lat: 39.5, lng: -98.35, x: 217.7, y: 134.7 },
  in: { name: "India", code: "IND", lat: 22.5, lng: 78.9, x: 690.4, y: 180.0 },
  eu: { name: "European Union", code: "EU", lat: 50.8, lng: 10.4, x: 507.7, y: 104.5 },
  uk: { name: "United Kingdom", code: "GBR", lat: 54.5, lng: -3.4, x: 470.9, y: 94.7 },
  sg: { name: "Singapore", code: "SGP", lat: 1.35, lng: 103.8, x: 756.8, y: 236.4 },
  cn: { name: "China", code: "CHN", lat: 35.8, lng: 104.1, x: 757.6, y: 144.5 },
  ae: { name: "United Arab Emirates", code: "ARE", lat: 24.4, lng: 54.3, x: 624.8, y: 174.9 },
  au: { name: "Australia", code: "AUS", lat: -25.2, lng: 133.7, x: 836.5, y: 307.2 },
  ca: { name: "Canada", code: "CAN", lat: 56.1, lng: -106.3, x: 196.5, y: 90.4 },
  ee: { name: "Estonia", code: "EST", lat: 58.6, lng: 25.0, x: 546.7, y: 83.7 },
  jp: { name: "Japan", code: "JPN", lat: 36.2, lng: 138.2, x: 848.5, y: 143.5 },
  za: { name: "South Africa", code: "ZAF", lat: -30.5, lng: 25.0, x: 546.7, y: 321.3 },
};

// 18 Diverse Threat Vectors across 6 Distinct Threat Categories
const GLOBAL_THREAT_VECTORS: ThreatLink[] = [
  // 1. 🔴 Ransomware & Extortion (#DC2626)
  {
    id: "rw-1",
    sourceId: "cn",
    sourceName: "LockBit Syndicate",
    targetId: "in",
    targetName: "India",
    category: "ransomware",
    categoryLabel: "Ransomware",
    color: "#DC2626",
    incidentType: "Double-Extortion Health Sector & Hospital Vault Attack",
    protocolTag: "SMBv3 / CVE-2024-3094",
    statutoryContext: "IT Act Sec 66 & BNS Sec 318",
    severity: "critical",
  },
  {
    id: "rw-2",
    sourceId: "eu",
    sourceName: "BlackCat/ALPHV Cell",
    targetId: "us",
    targetName: "United States",
    category: "ransomware",
    categoryLabel: "Ransomware",
    color: "#DC2626",
    incidentType: "Critical Healthcare Payment Processing Clearing Extortion",
    protocolTag: "RDP Tunnel / Cobalt Strike",
    statutoryContext: "CFAA 18 U.S.C. § 1030(a)(7)",
    severity: "critical",
  },
  {
    id: "rw-3",
    sourceId: "za",
    sourceName: "Akira Cyber Syndicate",
    targetId: "uk",
    targetName: "United Kingdom",
    category: "ransomware",
    categoryLabel: "Ransomware",
    color: "#DC2626",
    incidentType: "Municipal Government Database Encryption & Exfiltration",
    protocolTag: "VPN Gateway Zero-Day",
    statutoryContext: "Computer Misuse Act Sec 3",
    severity: "high",
  },
  {
    id: "rw-4",
    sourceId: "ca",
    sourceName: "Medusa Extortion Ring",
    targetId: "au",
    targetName: "Australia",
    category: "ransomware",
    categoryLabel: "Ransomware",
    color: "#DC2626",
    incidentType: "Telecommunications Customer Data Vault Breach",
    protocolTag: "Cloud API Token Abuse",
    statutoryContext: "SOCI Act 2018 Mandatory Notice",
    severity: "high",
  },

  // 2. 🟠 Critical Infrastructure APT (#EA580C)
  {
    id: "ci-1",
    sourceId: "cn",
    sourceName: "Volt Typhoon APT",
    targetId: "us",
    targetName: "United States",
    category: "critical_infra",
    categoryLabel: "Critical Infra APT",
    color: "#EA580C",
    incidentType: "Living-off-the-Land Water Utility SCADA Infiltration",
    protocolTag: "SOHO Router Proxy Mesh",
    statutoryContext: "CIRCIA 72h Notice / CFAA § 1030",
    severity: "critical",
  },
  {
    id: "ci-2",
    sourceId: "ee",
    sourceName: "Sandworm Unit",
    targetId: "eu",
    targetName: "European Union",
    category: "critical_infra",
    categoryLabel: "Critical Infra APT",
    color: "#EA580C",
    incidentType: "High-Voltage Power Transmission Substation Malware",
    protocolTag: "IEC-60870-5-104 Protocol",
    statutoryContext: "EU NIS2 Directive Art. 21",
    severity: "critical",
  },
  {
    id: "ci-3",
    sourceId: "cn",
    sourceName: "APT28 / Fancy Bear",
    targetId: "ee",
    targetName: "Estonia",
    category: "critical_infra",
    categoryLabel: "Critical Infra APT",
    color: "#EA580C",
    incidentType: "e-Governance X-Road Distributed Flood & Spoofing",
    protocolTag: "Encrypted DNS Tunneling",
    statutoryContext: "Estonian Penal Code § 207",
    severity: "critical",
  },
  {
    id: "ci-4",
    sourceId: "ae",
    sourceName: "State Cyber Cell",
    targetId: "sg",
    targetName: "Singapore",
    category: "critical_infra",
    categoryLabel: "Critical Infra APT",
    color: "#EA580C",
    incidentType: "Maritime Port Automated Container Scheduling Sabotage",
    protocolTag: "Industrial OT Modbus",
    statutoryContext: "Cybersecurity Act 2024 (2h CII)",
    severity: "high",
  },

  // 3. 🟣 AI Deepfake & Financial Wire Fraud (#9333EA)
  {
    id: "ai-1",
    sourceId: "in",
    sourceName: "Synthetic Media Syndicate",
    targetId: "ae",
    targetName: "United Arab Emirates",
    category: "ai_deepfake",
    categoryLabel: "AI & Deepfake",
    color: "#9333EA",
    incidentType: "Executive Voice-Cloning Banking Wire Transfer ($12M USD)",
    protocolTag: "Voice Latent Diffusion",
    statutoryContext: "Decree-Law No. 34 Art. 44",
    severity: "high",
  },
  {
    id: "ai-2",
    sourceId: "uk",
    sourceName: "AI Botnet Ring",
    targetId: "sg",
    targetName: "Singapore",
    category: "ai_deepfake",
    categoryLabel: "AI & Deepfake",
    color: "#9333EA",
    incidentType: "Synthetic Biometric Identity KYC Liveness Bypass",
    protocolTag: "Real-Time Face Morphing",
    statutoryContext: "IMDA Generative AI Directives",
    severity: "high",
  },
  {
    id: "ai-3",
    sourceId: "us",
    sourceName: "Synthetic Audio Cell",
    targetId: "ca",
    targetName: "Canada",
    category: "ai_deepfake",
    categoryLabel: "AI & Deepfake",
    color: "#9333EA",
    incidentType: "AI Voice Emulation Family Extortion & Kidnapping Hoax",
    protocolTag: "Neural Audio Synthesis",
    statutoryContext: "Criminal Code Sec 342.1 & Bill C-27",
    severity: "high",
  },
  {
    id: "ai-4",
    sourceId: "jp",
    sourceName: "Adversarial AI Actors",
    targetId: "us",
    targetName: "United States",
    category: "ai_deepfake",
    categoryLabel: "AI & Deepfake",
    color: "#9333EA",
    incidentType: "Autonomous LLM Jailbreak & Corporate Vault Exfiltration",
    protocolTag: "Indirect Prompt Injection",
    statutoryContext: "CFAA Exceeding Authorized Access",
    severity: "elevated",
  },

  // 4. 🔵 DDoS & Volumetric Floods (#0284C7)
  {
    id: "ddos-1",
    sourceId: "cn",
    sourceName: "Mirai IoT Botnet",
    targetId: "sg",
    targetName: "Singapore",
    category: "ddos",
    categoryLabel: "DDoS Floods",
    color: "#0284C7",
    incidentType: "1.8 Tbps Volumetric Gateway Flood Targeting Financial Clearing",
    protocolTag: "UDP / NTP Amplification",
    statutoryContext: "Cybersecurity Act 2024",
    severity: "high",
  },
  {
    id: "ddos-2",
    sourceId: "us",
    sourceName: "DarkGate Amplification",
    targetId: "uk",
    targetName: "United Kingdom",
    category: "ddos",
    categoryLabel: "DDoS Floods",
    color: "#0284C7",
    incidentType: "Government Public Service Portal Distributed Outage",
    protocolTag: "HTTPS POST Flood",
    statutoryContext: "Computer Misuse Act Sec 3",
    severity: "high",
  },

  // 5. 🟡 State-Sponsored Espionage (#D97706)
  {
    id: "esp-1",
    sourceId: "cn",
    sourceName: "Lazarus Cluster",
    targetId: "jp",
    targetName: "Japan",
    category: "espionage",
    categoryLabel: "State Espionage",
    color: "#D97706",
    incidentType: "Cryptocurrency Exchange Cold-Storage Vault Infiltration",
    protocolTag: "Custom DLL Sideloading",
    statutoryContext: "Penal Code Art. 161-2 & Active Defense",
    severity: "critical",
  },
  {
    id: "esp-2",
    sourceId: "ae",
    sourceName: "Charming Kitten Hub",
    targetId: "eu",
    targetName: "European Union",
    category: "espionage",
    categoryLabel: "State Espionage",
    color: "#D97706",
    incidentType: "Diplomatic Mission Cloud Communications Credential Harvest",
    protocolTag: "OAuth Phishing Token Steal",
    statutoryContext: "NIS2 Art. 21 / German StGB § 202a",
    severity: "high",
  },
  {
    id: "esp-3",
    sourceId: "cn",
    sourceName: "RedDelta Espionage Unit",
    targetId: "in",
    targetName: "India",
    category: "espionage",
    categoryLabel: "State Espionage",
    color: "#D97706",
    incidentType: "National Power Load Dispatch Center Cyber Reconnaissance",
    protocolTag: "ShadowPad Backdoor",
    statutoryContext: "IT Act Sec 66F (Cyber Terrorism)",
    severity: "critical",
  },

  // 6. 🟢 Supply Chain Zero-Days (#16A34A)
  {
    id: "sc-1",
    sourceId: "au",
    sourceName: "Cl0p Exploit Group",
    targetId: "ca",
    targetName: "Canada",
    category: "supply_chain",
    categoryLabel: "Supply Chain",
    color: "#16A34A",
    incidentType: "Zero-Day Managed File Transfer Enterprise Data Theft",
    protocolTag: "SQLi / Zero-Day Web Shell",
    statutoryContext: "Bill C-26 Critical Systems Protection",
    severity: "critical",
  },
  {
    id: "sc-2",
    sourceId: "eu",
    sourceName: "XZ Utils Backdoor Cell",
    targetId: "us",
    targetName: "United States",
    category: "supply_chain",
    categoryLabel: "Supply Chain",
    color: "#16A34A",
    incidentType: "Open-Source Upstream SSH Daemon Compromise Attempt",
    protocolTag: "Compromised Liblzma Build",
    statutoryContext: "CFAA 18 U.S.C. § 1030(a)(5)",
    severity: "critical",
  },
];

interface WorldLegalMapProps {
  countries: CountryCyberLaw[];
  selectedCompareIds: string[];
  onSelectCountry: (country: CountryCyberLaw) => void;
  onToggleCompare: (id: string) => void;
}

export const WorldLegalMap: React.FC<WorldLegalMapProps> = ({
  countries,
  selectedCompareIds,
  onSelectCountry,
  onToggleCompare,
}) => {
  const [mapMode, setMapMode] = useState<"connections" | "strictness" | "pending">("connections");
  const [selectedThreatCategory, setSelectedThreatCategory] = useState<ThreatCategory>("all");

  // Deep Zoom and Pan states
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // In-Map Inspector Drawer state (Clean, tactile UX)
  const [inspectedCountryId, setInspectedCountryId] = useState<string | null>(null);
  const [hoveredCountryId, setHoveredCountryId] = useState<string | null>(null);

  // Live Threat Telemetry Event Log (rotates every 3 seconds)
  const [telemetryEvents, setTelemetryEvents] = useState<ThreatLink[]>([]);

  const mapContainerRef = useRef<HTMLDivElement>(null);

  const MAP_WIDTH = 960;
  const MAP_HEIGHT = 480;

  // Country lookup map by id
  const countryDataMap = useMemo(() => {
    const map = new Map<string, CountryCyberLaw>();
    countries.forEach((c) => map.set(c.id, c));
    return map;
  }, [countries]);

  // Filter threats by selected category
  const filteredThreats = useMemo(() => {
    if (selectedThreatCategory === "all") return GLOBAL_THREAT_VECTORS;
    return GLOBAL_THREAT_VECTORS.filter((t) => t.category === selectedThreatCategory);
  }, [selectedThreatCategory]);

  // Live Telemetry Event Stream rotation
  useEffect(() => {
    setTelemetryEvents(GLOBAL_THREAT_VECTORS.slice(0, 5));
    const interval = setInterval(() => {
      setTelemetryEvents((prev) => {
        const nextIdx = Math.floor(Math.random() * GLOBAL_THREAT_VECTORS.length);
        const nextItem = GLOBAL_THREAT_VECTORS[nextIdx];
        const filtered = prev.filter((item) => item.id !== nextItem.id);
        return [nextItem, ...filtered].slice(0, 5);
      });
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Pan Handlers with smooth inertia tracking
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  // Deep Zoom controls
  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.4, 5.0));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.4, 0.8));
  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setInspectedCountryId(null);
  };

  // Preset continental camera focuses
  const focusContinent = (region: "world" | "americas" | "europe" | "apac" | "mideast" | "africa") => {
    if (region === "world") {
      setZoom(1);
      setPan({ x: 0, y: 0 });
    } else if (region === "americas") {
      setZoom(1.8);
      setPan({ x: 260, y: -40 });
    } else if (region === "europe") {
      setZoom(2.4);
      setPan({ x: -140, y: 60 });
    } else if (region === "apac") {
      setZoom(1.9);
      setPan({ x: -440, y: -60 });
    } else if (region === "mideast") {
      setZoom(2.6);
      setPan({ x: -300, y: 30 });
    } else if (region === "africa") {
      setZoom(2.0);
      setPan({ x: -120, y: -140 });
    }
  };

  // Mouse Wheel Deep Zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.15 : 0.85;
    setZoom((prev) => Math.min(Math.max(prev * zoomFactor, 0.8), 5.0));
  };

  // Click Country -> Smooth Focus & Slide-out In-Map Inspector Drawer
  const handleCountryClick = (jurisdictionId: string) => {
    setInspectedCountryId(jurisdictionId);
    const pin = JURISDICTION_PINS[jurisdictionId];
    if (pin) {
      const targetPanX = MAP_WIDTH / 2 - pin.x;
      const targetPanY = MAP_HEIGHT / 2 - pin.y;
      setPan({ x: targetPanX * 0.7, y: targetPanY * 0.7 });
      setZoom((prev) => Math.max(prev, 1.7));
    }
  };

  // Compute 3D Parabolic Curved Arcs with Ground Shadows for SIMULTANEOUS active streams
  const activeArcs = useMemo(() => {
    return filteredThreats
      .map((link, idx) => {
        const sourcePin = JURISDICTION_PINS[link.sourceId];
        const targetPin = JURISDICTION_PINS[link.targetId];
        if (!sourcePin || !targetPin) return null;

        const p1 = { x: sourcePin.x, y: sourcePin.y };
        const p2 = { x: targetPin.x, y: targetPin.y };

        const mx = (p1.x + p2.x) / 2;
        const my = (p1.y + p2.y) / 2;
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // 3D Parabolic altitude scales with geographic distance
        const arcHeight = Math.min(Math.max(distance * 0.38, 40), 160);

        // Elevated peak vertex
        const cx = mx;
        const cy = my - arcHeight;

        // Ground trace path along the map plane
        const groundPath = `M ${p1.x.toFixed(1)} ${p1.y.toFixed(1)} L ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
        // Elevated 3D parabolic trajectory
        const parabolicPath = `M ${p1.x.toFixed(1)} ${p1.y.toFixed(1)} Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;

        // Animation duration varies slightly so multiple missiles travel asynchronously!
        const duration = (2.0 + (idx % 4) * 0.4).toFixed(1) + "s";

        const isFocused = inspectedCountryId
          ? link.sourceId === inspectedCountryId || link.targetId === inspectedCountryId
          : true;

        return {
          ...link,
          groundPath,
          parabolicPath,
          sourcePos: p1,
          targetPos: p2,
          isFocused,
          duration,
        };
      })
      .filter(Boolean);
  }, [filteredThreats, inspectedCountryId]);

  // Color helper for Strictness Heatmap mode
  const getCountryFill = (jurisdictionId: string | null) => {
    if (!jurisdictionId) return "#E8E2D6"; // Neutral landmass
    const country = countryDataMap.get(jurisdictionId);
    if (!country) return "#E8E2D6";

    if (mapMode === "strictness") {
      if (country.strictnessScore >= 9.2) return "#F97316"; // Severe terracotta
      if (country.strictnessScore >= 8.7) return "#FBBF24"; // High amber
      return "#D97706"; // Moderate cognac
    }

    if (mapMode === "pending") {
      return country.pendingOrDraftActs && country.pendingOrDraftActs.length > 0
        ? "#FDE68A"
        : "#E8E2D6";
    }

    // Default connection mode
    if (inspectedCountryId === jurisdictionId) return "#D6CEBF";
    if (hoveredCountryId === jurisdictionId) return "#DFD7CA";
    return "#E8E2D6";
  };

  const inspectedCountry = inspectedCountryId ? countryDataMap.get(inspectedCountryId) : null;
  const inspectedThreats = useMemo(() => {
    if (!inspectedCountryId) return [];
    return GLOBAL_THREAT_VECTORS.filter(
      (t) => t.sourceId === inspectedCountryId || t.targetId === inspectedCountryId
    );
  }, [inspectedCountryId]);

  return (
    <div className="rounded-2xl bg-white border border-[#EAE5DB] shadow-sm overflow-hidden font-sans">
      {/* Top Controls Header: Mode Switchers, Threat Category Filters & Continental Focus */}
      <div className="px-6 py-4 bg-[#FAF7F2] border-b border-[#EAE5DB] space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626] animate-pulse" />
              <h2 className="text-base font-bold text-[#1C1917] tracking-tight">
                Global Cyber Law & Cross-Border Threat Map
              </h2>
            </div>
            <p className="text-xs text-[#78716C] mt-0.5">
              177 sovereign nations with live cross-border cyber threat streams. Hover or click any nation to inspect legal posture.
            </p>
          </div>

          {/* Primary View Modes */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-white border border-[#EAE5DB] text-xs">
            <button
              onClick={() => setMapMode("connections")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                mapMode === "connections"
                  ? "bg-[#7C4A27] text-white shadow-sm"
                  : "text-[#78716C] hover:text-[#1C1917]"
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
              <span>3D Threat Arcs</span>
            </button>

            <button
              onClick={() => setMapMode("strictness")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                mapMode === "strictness"
                  ? "bg-[#7C4A27] text-white shadow-sm"
                  : "text-[#78716C] hover:text-[#1C1917]"
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Strictness Heatmap</span>
            </button>

            <button
              onClick={() => setMapMode("pending")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                mapMode === "pending"
                  ? "bg-[#7C4A27] text-white shadow-sm"
                  : "text-[#78716C] hover:text-[#1C1917]"
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-[#B45309]" />
              <span>Pending Acts</span>
            </button>
          </div>
        </div>

        {/* Threat Category Filter Chips (Active when in Threat Vectors mode) */}
        {mapMode === "connections" && (
          <div className="flex items-center justify-between gap-3 pt-2 border-t border-[#EAE5DB]/60 overflow-x-auto text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase font-bold text-[#78716C] shrink-0 mr-1">
                Filter Threat Class:
              </span>
              {[
                { id: "all", label: `All Attacks (${GLOBAL_THREAT_VECTORS.length})`, color: "#7C4A27" },
                { id: "ransomware", label: "🔴 Ransomware", color: "#DC2626" },
                { id: "critical_infra", label: "🟠 Critical Infra APT", color: "#EA580C" },
                { id: "ai_deepfake", label: "🟣 AI & Deepfake", color: "#9333EA" },
                { id: "ddos", label: "🔵 DDoS Floods", color: "#0284C7" },
                { id: "espionage", label: "🟡 State Espionage", color: "#D97706" },
                { id: "supply_chain", label: "🟢 Supply Chain", color: "#16A34A" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedThreatCategory(cat.id as ThreatCategory)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all ${
                    selectedThreatCategory === cat.id
                      ? "bg-[#7C4A27] text-white shadow-sm"
                      : "bg-white text-[#78716C] hover:text-[#1C1917] border border-[#EAE5DB]"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Continental Camera Focus Shortcuts */}
            <div className="hidden lg:flex items-center gap-1 shrink-0 text-[10px] font-mono text-[#78716C]">
              <span className="mr-1 uppercase font-bold">Focus:</span>
              <button onClick={() => focusContinent("world")} className="px-1.5 py-0.5 rounded hover:bg-[#F3EFE6]">Global</button>
              <button onClick={() => focusContinent("americas")} className="px-1.5 py-0.5 rounded hover:bg-[#F3EFE6]">Americas</button>
              <button onClick={() => focusContinent("europe")} className="px-1.5 py-0.5 rounded hover:bg-[#F3EFE6]">Europe</button>
              <button onClick={() => focusContinent("apac")} className="px-1.5 py-0.5 rounded hover:bg-[#F3EFE6]">APAC</button>
              <button onClick={() => focusContinent("mideast")} className="px-1.5 py-0.5 rounded hover:bg-[#F3EFE6]">Mid-East</button>
              <button onClick={() => focusContinent("africa")} className="px-1.5 py-0.5 rounded hover:bg-[#F3EFE6]">Africa</button>
            </div>
          </div>
        )}
      </div>

      {/* Map Canvas Viewport with Deep Zoom and Pan */}
      <div
        ref={mapContainerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        className={`relative w-full h-[480px] sm:h-[540px] select-none overflow-hidden bg-[#FBF9F5] ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        {/* Floating Zoom / Pan Controls & Zoom Level Indicator */}
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-1 bg-white/95 border border-[#EAE5DB] p-1.5 rounded-xl shadow-md">
          <button
            onClick={handleZoomIn}
            className="p-1.5 rounded-lg text-[#78716C] hover:text-[#1C1917] hover:bg-[#F5F2EB] transition-colors"
            title="Zoom In (or use mouse scroll wheel)"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-1.5 rounded-lg text-[#78716C] hover:text-[#1C1917] hover:bg-[#F5F2EB] transition-colors"
            title="Zoom Out (or use mouse scroll wheel)"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg text-[#78716C] hover:text-[#1C1917] hover:bg-[#F5F2EB] transition-colors"
            title="Reset Map View"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <div className="px-1 text-center font-mono text-[10px] text-[#78716C] border-t border-[#EAE5DB] pt-1">
            {zoom.toFixed(1)}x
          </div>
        </div>

        {/* SVG World Map Canvas */}
        <svg
          viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
          className="w-full h-full"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: "center center",
            transition: isDragging ? "none" : "transform 0.15s ease-out",
          }}
        >
          <defs>
            <filter id="vectorGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Latitude & Longitude Reference Graticules */}
          <g className="stroke-[#EAE5DB] stroke-[0.8] stroke-dasharray-[4 4]">
            <line x1="0" y1="240" x2={MAP_WIDTH} y2="240" />
            <line x1="0" y1="120" x2={MAP_WIDTH} y2="120" />
            <line x1="0" y1="360" x2={MAP_WIDTH} y2="360" />
            <line x1="480" y1="0" x2="480" y2={MAP_HEIGHT} />
            <line x1="240" y1="0" x2="240" y2={MAP_HEIGHT} />
            <line x1="720" y1="0" x2="720" y2={MAP_HEIGHT} />
          </g>

          {/* LAYER 1: AUTHENTIC NATURAL EARTH 177 SOVEREIGN COUNTRIES */}
          <g className="stroke-[#D1C7B7] stroke-[0.6] stroke-linejoin-round">
            {WORLD_MAP_PATHS.map((countryPath) => {
              const jurId = countryPath.jurisdictionId;
              const isHovered = jurId && hoveredCountryId === jurId;
              const isInspected = jurId && inspectedCountryId === jurId;
              const fill = getCountryFill(jurId);

              return (
                <path
                  key={countryPath.id}
                  d={countryPath.path}
                  fill={fill}
                  className={`transition-colors duration-150 ${
                    jurId ? "cursor-pointer" : "cursor-default pointer-events-none"
                  }`}
                  stroke={isInspected ? "#7C4A27" : isHovered ? "#A8A29E" : "#D1C7B7"}
                  strokeWidth={isInspected ? "1.5" : isHovered ? "1" : "0.6"}
                  onMouseEnter={() => {
                    if (jurId) setHoveredCountryId(jurId);
                  }}
                  onMouseLeave={() => {
                    if (jurId) setHoveredCountryId(null);
                  }}
                  onClick={(e) => {
                    if (jurId) {
                      e.stopPropagation();
                      handleCountryClick(jurId);
                    }
                  }}
                />
              );
            })}
          </g>

          {/* LAYER 2: 3D PARABOLIC THREAT VECTOR CURVES & ANIMATED PACKET STREAMS */}
          {mapMode === "connections" && (
            <g>
              {activeArcs.map((arc: any) => {
                if (!arc) return null;
                const opacity = arc.isFocused ? 0.95 : 0.15;

                return (
                  <g key={arc.id}>
                    {/* Ground trace shadow along the map plane */}
                    <path
                      d={arc.groundPath}
                      fill="none"
                      stroke="#A8A29E"
                      strokeWidth="0.8"
                      strokeOpacity={opacity * 0.4}
                      strokeDasharray="3 3"
                    />

                    {/* Elevated 3D parabolic Bezier curve */}
                    <path
                      d={arc.parabolicPath}
                      fill="none"
                      stroke={arc.color}
                      strokeWidth={arc.isFocused ? 2.4 : 1.2}
                      strokeOpacity={opacity}
                      strokeDasharray={arc.isFocused ? "none" : "2 2"}
                      className="transition-all duration-300"
                    />

                    {/* Animated Traveling Packet Tracer along 3D Parabolic Curve */}
                    {arc.isFocused && (
                      <circle r="3.5" fill={arc.color} filter="url(#vectorGlow)">
                        <animateMotion
                          path={arc.parabolicPath}
                          dur={arc.duration}
                          repeatCount="indefinite"
                        />
                      </circle>
                    )}

                    {/* Target Impact Concentric Radar Shockwave */}
                    {arc.isFocused && (
                      <g transform={`translate(${arc.targetPos.x}, ${arc.targetPos.y})`}>
                        <circle r="4" fill="none" stroke={arc.color} strokeWidth="1.5">
                          <animate
                            attributeName="r"
                            from="4"
                            to="24"
                            dur={arc.duration}
                            repeatCount="indefinite"
                          />
                          <animate
                            attributeName="opacity"
                            from="0.9"
                            to="0"
                            dur={arc.duration}
                            repeatCount="indefinite"
                          />
                        </circle>
                      </g>
                    )}
                  </g>
                );
              })}
            </g>
          )}

          {/* LAYER 3: SOVEREIGN JURISDICTION PINS */}
          <g>
            {Object.entries(JURISDICTION_PINS).map(([id, pin]) => {
              const country = countryDataMap.get(id);
              const isSelected = selectedCompareIds.includes(id);
              const isInspected = inspectedCountryId === id;
              const isHovered = hoveredCountryId === id;

              return (
                <g
                  key={id}
                  transform={`translate(${pin.x}, ${pin.y})`}
                  className="cursor-pointer group"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCountryClick(id);
                  }}
                  onMouseEnter={() => setHoveredCountryId(id)}
                  onMouseLeave={() => setHoveredCountryId(null)}
                >
                  {/* Strictness Heatmap Aura */}
                  {mapMode === "strictness" && country && (
                    <circle
                      r={country.strictnessScore * 3.2}
                      fill="#EA580C"
                      opacity="0.25"
                      filter="url(#vectorGlow)"
                    />
                  )}

                  {/* Inspected Pulse Halo */}
                  {isInspected && (
                    <circle
                      r="16"
                      fill="none"
                      stroke="#7C4A27"
                      strokeWidth="2"
                      opacity="0.6"
                      className="animate-ping"
                    />
                  )}

                  {/* Outer Pin Circle */}
                  <circle
                    r={isSelected || isInspected || isHovered ? "7" : "4.8"}
                    fill="#FFFFFF"
                    stroke={isInspected ? "#7C4A27" : "#C2410C"}
                    strokeWidth={isSelected || isInspected ? "3" : "2"}
                    className="transition-all duration-150 shadow-sm"
                  />

                  {/* Pin Center */}
                  <circle r="2.2" fill={isInspected ? "#7C4A27" : "#C2410C"} />

                  {/* Technical ISO Code Label */}
                  <text
                    x="8"
                    y="3"
                    fill={isInspected || isHovered ? "#1C1917" : "#57534E"}
                    fontSize={isInspected ? "11" : "9.5"}
                    fontFamily="monospace"
                    fontWeight={isInspected ? "bold" : "600"}
                    letterSpacing="0.04em"
                    className="pointer-events-none select-none drop-shadow-sm"
                  >
                    {pin.code}
                    {mapMode === "strictness" && country && (
                      <tspan fill="#C2410C" dx="3">
                        {country.strictnessScore.toFixed(1)}
                      </tspan>
                    )}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>

        {/* IN-MAP CONTEXTUAL INSPECTOR DRAWER (Clean, Tactile, Scannable) */}
        {inspectedCountry && (
          <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:w-[420px] z-30 p-4 rounded-2xl bg-white/95 border border-[#EAE5DB] shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom duration-200">
            <div className="flex items-start justify-between gap-3 mb-2.5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#7C4A27] bg-[#F4EFE6] px-2 py-0.5 rounded border border-[#EAE5DB]">
                  {inspectedCountry.code}
                </span>
                <div>
                  <h3 className="font-bold text-sm text-[#1C1917] tracking-tight">
                    {inspectedCountry.country}
                  </h3>
                  <span className="text-[10px] text-[#78716C] block">
                    Lead Authority: {inspectedCountry.leadEnforcementAgency}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setInspectedCountryId(null)}
                className="p-1 rounded-lg text-[#78716C] hover:text-[#1C1917] hover:bg-[#FAF7F2] transition-colors"
                title="Close Inspector"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Plain-English 1-Sentence Hero Verdict */}
            <p className="text-xs text-[#292524] font-medium leading-relaxed my-2 py-1.5 px-2.5 rounded-lg bg-[#FAF7F2] border border-[#EAE5DB]">
              &ldquo;{inspectedCountry.executiveVerdict}&rdquo;
            </p>

            {/* Quick 3-Pillar Spec Strip */}
            <div className="grid grid-cols-3 gap-2 my-2 text-xs">
              <div className="p-2 rounded-lg bg-[#FAF7F2] border border-[#EAE5DB]">
                <span className="text-[9px] uppercase font-bold text-[#78716C] block">Notice</span>
                <span className="font-bold text-[#1C1917] text-[11px] truncate block">{inspectedCountry.breachPill}</span>
              </div>
              <div className="p-2 rounded-lg bg-[#FAF7F2] border border-[#EAE5DB]">
                <span className="text-[9px] uppercase font-bold text-[#78716C] block">Max Jail</span>
                <span className="font-bold text-[#C2410C] text-[11px] truncate block">{inspectedCountry.penaltyPill}</span>
              </div>
              <div className="p-2 rounded-lg bg-[#FAF7F2] border border-[#EAE5DB]">
                <span className="text-[9px] uppercase font-bold text-[#78716C] block">AI Law</span>
                <span className="font-bold text-[#1C1917] text-[11px] truncate block">{inspectedCountry.aiLawPill}</span>
              </div>
            </div>

            {/* Connected Active Threat Vectors */}
            <div className="mb-3 text-xs">
              <span className="text-[10px] uppercase font-semibold text-[#78716C] block mb-1">
                Active Cross-Border Threat Arcs ({inspectedThreats.length}):
              </span>
              <div className="max-h-24 overflow-y-auto space-y-1.5 pr-1">
                {inspectedThreats.slice(0, 3).map((t) => (
                  <div key={t.id} className="p-1.5 rounded-lg bg-[#FAF7F2] border border-[#EAE5DB] text-[11px]">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[#1C1917]">{t.sourceName} → {t.targetName}</span>
                      <span
                        className="text-[9px] uppercase font-mono px-1.5 py-0.2 rounded font-bold text-white"
                        style={{ backgroundColor: t.color }}
                      >
                        {t.categoryLabel}
                      </span>
                    </div>
                    <p className="text-[10px] text-[#78716C] truncate mt-0.5">{t.incidentType}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons: Compare & Full Law Dossier */}
            <div className="flex items-center gap-2 pt-2.5 border-t border-[#EAE5DB]">
              <button
                onClick={() => onToggleCompare(inspectedCountry.id)}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
                  selectedCompareIds.includes(inspectedCountry.id)
                    ? "bg-[#7C4A27] text-white shadow-sm"
                    : "bg-[#FAF7F2] hover:bg-[#F3EFE6] text-[#1C1917] border border-[#EAE5DB]"
                }`}
              >
                {selectedCompareIds.includes(inspectedCountry.id) ? "Comparing" : "+ Compare"}
              </button>

              <button
                onClick={() => onSelectCountry(inspectedCountry)}
                className="py-2 px-3.5 rounded-xl text-xs font-semibold bg-[#7C4A27] hover:bg-[#63391C] text-white flex items-center gap-1 shadow-sm transition-all"
              >
                <span>Full Law Dossier</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* LIVE SOC THREAT TELEMETRY FEED (Real-Time Animated Event Ticker) */}
      <div className="px-6 py-3 bg-[#FAF7F2] border-t border-[#EAE5DB] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 truncate text-[#78716C] flex-1">
          <span className="flex items-center gap-1 text-[10px] font-mono uppercase font-bold text-white bg-[#C2410C] px-2 py-0.5 rounded shadow-sm shrink-0">
            <Radio className="w-3 h-3 animate-spin" />
            <span>LIVE SOC FEED</span>
          </span>

          {telemetryEvents.length > 0 && (
            <div className="truncate text-xs text-[#292524] flex items-center gap-1.5 animate-in fade-in duration-300">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: telemetryEvents[0].color }}
              />
              <strong className="text-[#1C1917]">{telemetryEvents[0].sourceName}</strong>
              <span className="text-[#C2410C]">→</span>
              <strong className="text-[#1C1917]">{telemetryEvents[0].targetName}</strong>:{" "}
              <span className="text-[#57534E]">{telemetryEvents[0].incidentType}</span>{" "}
              <span className="font-mono text-[10px] text-[#78716C] bg-white px-1.5 py-0.2 rounded border border-[#EAE5DB]">
                {telemetryEvents[0].protocolTag}
              </span>
            </div>
          )}
        </div>

        {/* Legend of Threat Colors */}
        <div className="flex items-center gap-3 text-[10px] font-mono text-[#78716C] shrink-0">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#DC2626]" />
            <span>Ransomware</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#EA580C]" />
            <span>APT</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#9333EA]" />
            <span>AI Scam</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#0284C7]" />
            <span>DDoS</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
            <span>Supply Chain</span>
          </div>
        </div>
      </div>
    </div>
  );
};
