"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { CountryCyberLaw } from "@/data/countries";
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Scale,
  Clock,
  ArrowRight,
  ShieldAlert,
  X,
  Radio,
  ExternalLink,
  Layers,
  Filter,
} from "lucide-react";

interface JurisdictionNode {
  id: string;
  name: string;
  code: string;
  lat: number;
  lng: number;
  strictness: number;
  pendingCount: number;
  breachWindow: string;
  leadAgency: string;
  primaryLaw: string;
}

export type ThreatCategory = "all" | "ransomware" | "critical_infra" | "ai_deepfake" | "espionage" | "supply_chain";

interface ThreatLink {
  id: string;
  sourceId: string;
  sourceName: string;
  targetId: string;
  targetName: string;
  category: ThreatCategory;
  categoryLabel: string;
  incidentType: string;
  statutoryContext: string;
  severity: "critical" | "high" | "elevated";
}

// 12 Authentic Sovereign Jurisdictions
const JURISDICTION_NODES: JurisdictionNode[] = [
  { id: "us", name: "United States", code: "USA", lat: 38.9, lng: -77.0, strictness: 9.1, pendingCount: 2, breachWindow: "72h CIRCIA / 4d SEC", leadAgency: "FBI Cyber & CISA", primaryLaw: "CFAA (18 U.S.C. § 1030)" },
  { id: "in", name: "India", code: "IND", lat: 28.6, lng: 77.2, strictness: 8.4, pendingCount: 2, breachWindow: "6h CERT-In", leadAgency: "CERT-In & I4C", primaryLaw: "Information Technology Act, 2000" },
  { id: "eu", name: "European Union", code: "EU", lat: 52.5, lng: 13.4, strictness: 9.3, pendingCount: 1, breachWindow: "24h Warning / 72h GDPR", leadAgency: "ENISA & National CSIRTs", primaryLaw: "NIS 2 Directive & GDPR" },
  { id: "uk", name: "United Kingdom", code: "GBR", lat: 51.5, lng: -0.1, strictness: 8.7, pendingCount: 1, breachWindow: "72h UK GDPR", leadAgency: "NCA Cyber & NCSC", primaryLaw: "Computer Misuse Act 1990" },
  { id: "sg", name: "Singapore", code: "SGP", lat: 1.35, lng: 103.8, strictness: 9.2, pendingCount: 1, breachWindow: "2h CII Incident", leadAgency: "Cyber Security Agency (CSA)", primaryLaw: "Cybersecurity Act 2024" },
  { id: "cn", name: "China", code: "CHN", lat: 39.9, lng: 116.4, strictness: 9.6, pendingCount: 1, breachWindow: "Immediate / 8h CAC", leadAgency: "Cyberspace Admin (CAC)", primaryLaw: "Cybersecurity Law (CSL)" },
  { id: "ae", name: "United Arab Emirates", code: "ARE", lat: 24.4, lng: 54.3, strictness: 9.0, pendingCount: 1, breachWindow: "72h Federal Council", leadAgency: "Cyber Security Council", primaryLaw: "Federal Decree-Law No. 34" },
  { id: "au", name: "Australia", code: "AUS", lat: -35.3, lng: 149.1, strictness: 8.8, pendingCount: 1, breachWindow: "12h Critical / 72h General", leadAgency: "ACSC & Federal Police", primaryLaw: "SOCI Act 2018 & Cyber Bill" },
  { id: "ca", name: "Canada", code: "CAN", lat: 45.4, lng: -75.7, strictness: 8.2, pendingCount: 2, breachWindow: "As soon as feasible", leadAgency: "CCCS & RCMP", primaryLaw: "Criminal Code Sec 342.1" },
  { id: "ee", name: "Estonia", code: "EST", lat: 59.4, lng: 24.7, strictness: 9.4, pendingCount: 1, breachWindow: "24h RIA Mandate", leadAgency: "Information System Authority", primaryLaw: "Penal Code Chapter 14" },
  { id: "jp", name: "Japan", code: "JPN", lat: 35.6, lng: 139.7, strictness: 8.5, pendingCount: 1, breachWindow: "3-5 Days PPC", leadAgency: "NPA Cyber Bureau & NISC", primaryLaw: "Penal Code Article 161-2" },
  { id: "za", name: "South Africa", code: "ZAF", lat: -25.7, lng: 28.2, strictness: 8.0, pendingCount: 1, breachWindow: "As soon as possible", leadAgency: "Cybercrime Hub (SAPS)", primaryLaw: "Cybercrimes Act No. 19" },
];

// Rich Library of 20+ Cross-Border Threat Vectors Categorized by Attack Type
const THREAT_VECTORS: ThreatLink[] = [
  // Ransomware & Cyber Extortion
  {
    id: "rw-1",
    sourceId: "cn",
    sourceName: "LockBit Syndicate Hub",
    targetId: "in",
    targetName: "India",
    category: "ransomware",
    categoryLabel: "Ransomware",
    incidentType: "Double-Extortion Health Sector Ransomware",
    statutoryContext: "IT Act Sec 66 & BNS Sec 318",
    severity: "critical",
  },
  {
    id: "rw-2",
    sourceId: "eu",
    sourceName: "BlackCat/ALPHV Cluster",
    targetId: "us",
    targetName: "United States",
    category: "ransomware",
    categoryLabel: "Ransomware",
    incidentType: "Critical Pipeline & Energy Extortion",
    statutoryContext: "CFAA 18 U.S.C. § 1030(a)(7)",
    severity: "critical",
  },
  {
    id: "rw-3",
    sourceId: "za",
    sourceName: "Akira Ransomware Hub",
    targetId: "uk",
    targetName: "United Kingdom",
    category: "ransomware",
    categoryLabel: "Ransomware",
    incidentType: "Municipal Database Encryption & Exfiltration",
    statutoryContext: "Computer Misuse Act Sec 3",
    severity: "high",
  },
  {
    id: "rw-4",
    sourceId: "ca",
    sourceName: "Medusa Cyber Syndicate",
    targetId: "au",
    targetName: "Australia",
    category: "ransomware",
    categoryLabel: "Ransomware",
    incidentType: "Telecommunications Customer Vault Ransomware",
    statutoryContext: "SOCI Act 2018 Mandatory Notice",
    severity: "high",
  },

  // Critical Infrastructure APTs
  {
    id: "ci-1",
    sourceId: "cn",
    sourceName: "Volt Typhoon Cluster",
    targetId: "us",
    targetName: "United States",
    category: "critical_infra",
    categoryLabel: "Critical Infrastructure",
    incidentType: "Living-off-the-Land Water Utility Compromise",
    statutoryContext: "CIRCIA 72h Notice & CFAA § 1030",
    severity: "critical",
  },
  {
    id: "ci-2",
    sourceId: "ee",
    sourceName: "Sandworm Unit",
    targetId: "eu",
    targetName: "Germany (EU)",
    category: "critical_infra",
    categoryLabel: "Critical Infrastructure",
    incidentType: "Power Transmission Substation Disruptive Malware",
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
    categoryLabel: "Critical Infrastructure",
    incidentType: "e-Governance X-Road Denial of Service",
    statutoryContext: "Estonian Penal Code § 207",
    severity: "critical",
  },
  {
    id: "ci-4",
    sourceId: "ae",
    sourceName: "State-Sponsored Group",
    targetId: "sg",
    targetName: "Singapore",
    category: "critical_infra",
    categoryLabel: "Critical Infrastructure",
    incidentType: "Maritime Port Automated Scheduling Sabotage",
    statutoryContext: "Cybersecurity Act 2024 (2h CII Notice)",
    severity: "high",
  },

  // AI & Deepfake Financial Fraud
  {
    id: "ai-1",
    sourceId: "in",
    sourceName: "Synthetic Scam Syndicate",
    targetId: "ae",
    targetName: "United Arab Emirates",
    category: "ai_deepfake",
    categoryLabel: "AI & Deepfake",
    incidentType: "Deepfake Executive Voice Cloning Fund Wire",
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
    incidentType: "Synthetic Biometric Identity KYC Bypass",
    statutoryContext: "IMDA Generative AI Directives",
    severity: "high",
  },
  {
    id: "ai-3",
    sourceId: "us",
    sourceName: "Synthetic Media Group",
    targetId: "ca",
    targetName: "Canada",
    category: "ai_deepfake",
    categoryLabel: "AI & Deepfake",
    incidentType: "AI Voice Emulation Kidnapping Extortion",
    statutoryContext: "Criminal Code Sec 342.1 & Bill C-27",
    severity: "high",
  },
  {
    id: "ai-4",
    sourceId: "jp",
    sourceName: "Prompt Injection Actors",
    targetId: "us",
    targetName: "United States",
    category: "ai_deepfake",
    categoryLabel: "AI & Deepfake",
    incidentType: "Autonomous LLM Jailbreak & Corporate Exfiltration",
    statutoryContext: "CFAA Exceeding Authorized Access",
    severity: "elevated",
  },

  // State-Sponsored Espionage
  {
    id: "esp-1",
    sourceId: "cn",
    sourceName: "Lazarus Cluster",
    targetId: "jp",
    targetName: "Japan",
    category: "espionage",
    categoryLabel: "State Espionage",
    incidentType: "Cryptocurrency Clearing Vault Heist",
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
    incidentType: "Diplomatic Communications Credential Harvest",
    statutoryContext: "NIS2 Art. 21 / German StGB § 202a",
    severity: "high",
  },
  {
    id: "esp-3",
    sourceId: "us",
    sourceName: "Storm-0558 Actors",
    targetId: "uk",
    targetName: "United Kingdom",
    category: "espionage",
    categoryLabel: "State Espionage",
    incidentType: "Ministerial Cloud Exchange Token Forgery",
    statutoryContext: "UK Computer Misuse Act Sec 2",
    severity: "high",
  },
  {
    id: "esp-4",
    sourceId: "cn",
    sourceName: "RedDelta Espionage Unit",
    targetId: "in",
    targetName: "India",
    category: "espionage",
    categoryLabel: "State Espionage",
    incidentType: "National Power Load Dispatch Center Recon",
    statutoryContext: "IT Act Sec 66F (Cyber Terrorism)",
    severity: "critical",
  },

  // Supply Chain & Zero-Days
  {
    id: "sc-1",
    sourceId: "au",
    sourceName: "MOVEit Exploitation Group",
    targetId: "ca",
    targetName: "Canada",
    category: "supply_chain",
    categoryLabel: "Supply Chain",
    incidentType: "Zero-Day Managed File Transfer Infiltration",
    statutoryContext: "Bill C-26 Critical Systems Protection",
    severity: "critical",
  },
  {
    id: "sc-2",
    sourceId: "sg",
    sourceName: "DarkGate Malware Ring",
    targetId: "jp",
    targetName: "Japan",
    category: "supply_chain",
    categoryLabel: "Supply Chain",
    incidentType: "Third-Party Accounting SDK Poisoning",
    statutoryContext: "Penal Code Virus Possession Art. 168-2",
    severity: "high",
  },
  {
    id: "sc-3",
    sourceId: "eu",
    sourceName: "XZ Utils Backdoor Cluster",
    targetId: "us",
    targetName: "United States",
    category: "supply_chain",
    categoryLabel: "Supply Chain",
    incidentType: "Open-Source Upstream SSH Daemon Compromise",
    statutoryContext: "CFAA 18 U.S.C. § 1030(a)(5)",
    severity: "critical",
  },
  {
    id: "sc-4",
    sourceId: "in",
    sourceName: "Commercial Spyware Actors",
    targetId: "za",
    targetName: "South Africa",
    category: "supply_chain",
    categoryLabel: "Supply Chain",
    incidentType: "Zero-Click Mobile Baseband Surveillance Exploit",
    statutoryContext: "Cybercrimes Act No. 19 Interception",
    severity: "high",
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

  // In-Map Inspector Drawer state (Clean click UX!)
  const [inspectedNode, setInspectedNode] = useState<JurisdictionNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<JurisdictionNode | null>(null);
  const [activeVectorIndex, setActiveVectorIndex] = useState(0);

  const mapContainerRef = useRef<HTMLDivElement>(null);

  const MAP_WIDTH = 960;
  const MAP_HEIGHT = 480;

  // Equirectangular projection
  const project = (lat: number, lng: number) => {
    const x = ((lng + 180) * (MAP_WIDTH / 360));
    const y = ((90 - lat) * (MAP_HEIGHT / 180));
    return { x, y };
  };

  // Node Map lookup
  const nodeMap = useMemo(() => {
    const map = new Map<string, JurisdictionNode>();
    JURISDICTION_NODES.forEach((node) => map.set(node.id, node));
    return map;
  }, []);

  // Filter threats by selected category
  const filteredThreats = useMemo(() => {
    if (selectedThreatCategory === "all") return THREAT_VECTORS;
    return THREAT_VECTORS.filter((t) => t.category === selectedThreatCategory);
  }, [selectedThreatCategory]);

  // Cycle active highlighted threat link
  useEffect(() => {
    if (filteredThreats.length === 0) return;
    const timer = setInterval(() => {
      setActiveVectorIndex((prev) => (prev + 1) % filteredThreats.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [filteredThreats.length]);

  const currentActiveLink = filteredThreats[activeVectorIndex % (filteredThreats.length || 1)] || filteredThreats[0];

  // Pan Handlers with inertia tracking
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
  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.35, 4.5));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.35, 0.85));
  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setInspectedNode(null);
  };

  // Mouse Wheel Deep Zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.15 : 0.85;
    setZoom((prev) => Math.min(Math.max(prev * zoomFactor, 0.85), 4.5));
  };

  // Click Country Node -> Smooth Focus & Slide-out In-Map Inspector Drawer
  const handleNodeClick = (node: JurisdictionNode) => {
    setInspectedNode(node);
    // Smoothly pan map toward the selected node
    const pos = project(node.lat, node.lng);
    const targetPanX = (MAP_WIDTH / 2) - pos.x;
    const targetPanY = (MAP_HEIGHT / 2) - pos.y;
    setPan({ x: targetPanX * 0.6, y: targetPanY * 0.6 });
    setZoom((prev) => Math.max(prev, 1.4));
  };

  // Compute curved connection arcs
  const arcPaths = useMemo(() => {
    return filteredThreats.map((link, idx) => {
      const source = nodeMap.get(link.sourceId);
      const target = nodeMap.get(link.targetId);
      if (!source || !target) return null;

      const p1 = project(source.lat, source.lng);
      const p2 = project(target.lat, target.lng);

      const mx = (p1.x + p2.x) / 2;
      const my = (p1.y + p2.y) / 2;
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const arcHeight = Math.min(distance * 0.35, 120);

      const cx = mx;
      const cy = my - arcHeight;
      const pathString = `M ${p1.x.toFixed(1)} ${p1.y.toFixed(1)} Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;

      const isFocused = inspectedNode
        ? link.sourceId === inspectedNode.id || link.targetId === inspectedNode.id
        : true;

      const isCurrentActive = idx === (activeVectorIndex % filteredThreats.length);

      return {
        ...link,
        pathString,
        sourcePos: p1,
        targetPos: p2,
        isFocused,
        isActive: isCurrentActive,
      };
    }).filter(Boolean);
  }, [filteredThreats, nodeMap, activeVectorIndex, inspectedNode]);

  // Color helper in warm editorial tones
  const getNodeColor = (node: JurisdictionNode) => {
    if (mapMode === "strictness") {
      if (node.strictness >= 9.2) return "#C2410C";
      if (node.strictness >= 8.7) return "#B45309";
      return "#7C4A27";
    }
    if (mapMode === "pending") {
      return node.pendingCount > 0 ? "#B45309" : "#A8A29E";
    }
    return "#7C4A27";
  };

  // Connected threats for currently inspected country
  const inspectedThreats = useMemo(() => {
    if (!inspectedNode) return [];
    return THREAT_VECTORS.filter(
      (t) => t.sourceId === inspectedNode.id || t.targetId === inspectedNode.id
    );
  }, [inspectedNode]);

  return (
    <div className="rounded-2xl bg-white border border-[#EAE5DB] shadow-sm overflow-hidden font-sans">
      {/* Top Header: Title, Map Mode & Threat Filter Chips */}
      <div className="px-6 py-4 bg-[#FAF7F2] border-b border-[#EAE5DB] space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-[#1C1917] tracking-tight">
              Global Cyber Law & Cross-Border Vector Map
            </h2>
            <p className="text-xs text-[#78716C] mt-0.5">
              Scroll to zoom, drag to explore continents. Click any country to inspect active threat vectors and legal status.
            </p>
          </div>

          {/* Primary View Modes */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-white border border-[#EAE5DB] text-xs">
            <button
              onClick={() => setMapMode("connections")}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                mapMode === "connections"
                  ? "bg-[#7C4A27] text-white shadow-sm"
                  : "text-[#78716C] hover:text-[#1C1917]"
              }`}
            >
              Threat Vectors
            </button>

            <button
              onClick={() => setMapMode("strictness")}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                mapMode === "strictness"
                  ? "bg-[#7C4A27] text-white shadow-sm"
                  : "text-[#78716C] hover:text-[#1C1917]"
              }`}
            >
              Strictness Heatmap
            </button>

            <button
              onClick={() => setMapMode("pending")}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                mapMode === "pending"
                  ? "bg-[#7C4A27] text-white shadow-sm"
                  : "text-[#78716C] hover:text-[#1C1917]"
              }`}
            >
              Pending Acts
            </button>
          </div>
        </div>

        {/* Threat Category Filter Chips (Only shown in Threat Vectors mode) */}
        {mapMode === "connections" && (
          <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-[#EAE5DB]/60 text-xs">
            <span className="text-[10px] uppercase font-semibold text-[#78716C] shrink-0 mr-1">
              Threat Category:
            </span>
            {[
              { id: "all", label: `All (${THREAT_VECTORS.length})` },
              { id: "ransomware", label: "Ransomware" },
              { id: "critical_infra", label: "Critical Infra APT" },
              { id: "ai_deepfake", label: "AI & Deepfakes" },
              { id: "espionage", label: "State Espionage" },
              { id: "supply_chain", label: "Supply Chain" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedThreatCategory(cat.id as ThreatCategory)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap transition-colors ${
                  selectedThreatCategory === cat.id
                    ? "bg-[#7C4A27] text-white font-semibold"
                    : "bg-white text-[#78716C] hover:text-[#1C1917] border border-[#EAE5DB]"
                }`}
              >
                {cat.label}
              </button>
            ))}
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
        className={`relative w-full h-[440px] sm:h-[500px] select-none overflow-hidden bg-[#FBF9F5] ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        {/* Understated Zoom / Pan Controls & Zoom Level Indicator */}
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-1 bg-white/95 border border-[#EAE5DB] p-1 rounded-lg shadow-sm">
          <button
            onClick={handleZoomIn}
            className="p-1.5 rounded text-[#78716C] hover:text-[#1C1917] hover:bg-[#F5F2EB] transition-colors"
            title="Zoom In (or use mouse wheel)"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-1.5 rounded text-[#78716C] hover:text-[#1C1917] hover:bg-[#F5F2EB] transition-colors"
            title="Zoom Out (or use mouse wheel)"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 rounded text-[#78716C] hover:text-[#1C1917] hover:bg-[#F5F2EB] transition-colors"
            title="Reset Map View"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <div className="px-1 text-center font-mono text-[9px] text-[#78716C] border-t border-[#EAE5DB] pt-1">
            {zoom.toFixed(1)}x
          </div>
        </div>

        {/* SVG World Map */}
        <svg
          viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
          className="w-full h-full"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: "center center",
            transition: isDragging ? "none" : "transform 0.15s ease-out",
          }}
        >
          {/* Subtle Latitude Reference Grid */}
          <g className="stroke-[#EAE5DB] stroke-[0.8] stroke-dasharray-[4 4]">
            <line x1="0" y1="240" x2={MAP_WIDTH} y2="240" />
            <line x1="0" y1="120" x2={MAP_WIDTH} y2="120" />
            <line x1="0" y1="360" x2={MAP_WIDTH} y2="360" />
            <line x1="480" y1="0" x2="480" y2={MAP_HEIGHT} />
          </g>

          {/* Smooth, Detailed World Continents in Warm Neutral Sand */}
          <g className="fill-[#EBE5DB] stroke-[#DCD4C5] stroke-[1]">
            <path d="M 120 70 C 140 65, 230 65, 260 75 C 290 85, 320 120, 310 145 C 300 165, 260 190, 240 220 C 220 245, 195 240, 185 210 C 170 170, 140 160, 115 130 C 100 110, 105 80, 120 70 Z" />
            <path d="M 330 35 C 370 30, 400 45, 385 75 C 365 95, 335 85, 330 60 Z" />
            <path d="M 260 250 C 290 255, 340 270, 345 320 C 350 370, 330 420, 300 455 C 280 435, 265 380, 255 330 C 245 285, 245 260, 260 250 Z" />
            <path d="M 450 75 C 480 70, 545 70, 560 95 C 570 120, 540 155, 510 165 C 485 170, 460 150, 445 125 C 435 100, 440 85, 450 75 Z" />
            <path d="M 495 50 C 515 45, 535 55, 530 85 C 510 95, 495 85, 495 50 Z" />
            <path d="M 450 100 C 465 95, 470 115, 465 130 C 455 135, 445 125, 450 100 Z" />
            <path d="M 455 175 C 500 170, 580 180, 595 230 C 610 280, 600 350, 555 425 C 520 415, 485 365, 465 315 C 445 260, 440 200, 455 175 Z" />
            <path d="M 605 340 C 615 335, 620 370, 610 390 C 600 385, 600 355, 605 340 Z" />
            <path d="M 570 70 C 640 60, 840 60, 870 105 C 890 140, 870 200, 820 230 C 780 250, 720 250, 670 240 C 620 230, 580 170, 570 120 Z" />
            <path d="M 670 195 C 700 190, 740 215, 735 265 C 725 300, 695 320, 680 305 C 665 270, 660 220, 670 195 Z" />
            <path d="M 770 245 C 800 240, 830 260, 820 290 C 800 305, 775 285, 770 245 Z" />
            <path d="M 855 130 C 875 135, 880 175, 865 195 C 850 185, 850 150, 855 130 Z" />
            <path d="M 780 315 C 830 305, 895 315, 905 355 C 915 395, 885 435, 835 435 C 795 425, 765 385, 780 315 Z" />
            <path d="M 920 415 C 935 410, 940 440, 930 455 C 915 450, 915 430, 920 415 Z" />
          </g>

          {/* LAYER 1: Curved Threat Connection Arcs */}
          {mapMode === "connections" && (
            <g>
              {arcPaths.map((arc: any) => {
                if (!arc) return null;
                const isCurrent = arc.isActive;
                const opacity = arc.isFocused ? (isCurrent ? 0.95 : 0.4) : 0.1;

                return (
                  <g key={arc.id}>
                    <path
                      d={arc.pathString}
                      fill="none"
                      stroke={isCurrent ? "#C2410C" : "#7C4A27"}
                      strokeWidth={isCurrent ? 2.5 : 1.2}
                      strokeOpacity={opacity}
                      strokeDasharray={isCurrent ? "none" : "3 3"}
                    />

                    {isCurrent && (
                      <circle r="3.5" fill="#C2410C">
                        <animateMotion
                          path={arc.pathString}
                          dur="2.5s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    )}

                    {isCurrent && (
                      <circle
                        cx={arc.targetPos.x}
                        cy={arc.targetPos.y}
                        r="5"
                        fill="none"
                        stroke="#C2410C"
                        strokeWidth="1.5"
                      >
                        <animate
                          attributeName="r"
                          from="5"
                          to="22"
                          dur="1.8s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="opacity"
                          from="0.8"
                          to="0"
                          dur="1.8s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    )}
                  </g>
                );
              })}
            </g>
          )}

          {/* LAYER 2: Sovereign Country Nodes */}
          <g>
            {JURISDICTION_NODES.map((node) => {
              const pos = project(node.lat, node.lng);
              const isSelected = selectedCompareIds.includes(node.id);
              const isInspected = inspectedNode?.id === node.id;
              const isHovered = hoveredNode?.id === node.id;
              const nodeColor = getNodeColor(node);

              return (
                <g
                  key={node.id}
                  transform={`translate(${pos.x}, ${pos.y})`}
                  className="cursor-pointer group"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNodeClick(node);
                  }}
                  onMouseEnter={() => setHoveredNode(node)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  {/* Strictness Heatmap Aura */}
                  {mapMode === "strictness" && (
                    <circle
                      r={node.strictness * 3}
                      fill={nodeColor}
                      opacity="0.22"
                    />
                  )}

                  {/* Pending Acts Halo */}
                  {mapMode === "pending" && node.pendingCount > 0 && (
                    <circle
                      r="18"
                      fill="#B45309"
                      opacity="0.25"
                    />
                  )}

                  {/* Inspected Highlight Pulse */}
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

                  {/* Node Outer Ring */}
                  <circle
                    r={isSelected || isInspected || isHovered ? "7" : "4.5"}
                    fill="#FFFFFF"
                    stroke={isInspected ? "#7C4A27" : nodeColor}
                    strokeWidth={isSelected || isInspected ? "2.8" : "1.8"}
                    className="transition-all duration-150"
                  />

                  {/* Node Center */}
                  <circle r="2.2" fill={isInspected ? "#7C4A27" : nodeColor} />

                  {/* Clean Technical Label */}
                  <text
                    x="8"
                    y="3"
                    fill={isInspected || isHovered ? "#1C1917" : "#57534E"}
                    fontSize={isInspected ? "11" : "9"}
                    fontFamily="monospace"
                    fontWeight={isInspected ? "bold" : "600"}
                    letterSpacing="0.04em"
                    className="pointer-events-none select-none"
                  >
                    {node.code}
                    {mapMode === "strictness" && (
                      <tspan fill="#C2410C" dx="3">
                        {node.strictness.toFixed(1)}
                      </tspan>
                    )}
                    {mapMode === "pending" && node.pendingCount > 0 && (
                      <tspan fill="#B45309" dx="3">
                        +{node.pendingCount}
                      </tspan>
                    )}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>

        {/* IN-MAP CONTEXT INSPECTOR DRAWER (Smooth in-map click UX!) */}
        {inspectedNode && (
          <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:w-96 z-30 p-4 rounded-xl bg-white/95 border border-[#EAE5DB] shadow-xl backdrop-blur-md animate-in slide-in-from-bottom duration-200">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-xs font-bold text-[#7C4A27] bg-[#F4EFE6] px-1.5 py-0.2 rounded border border-[#EAE5DB]">
                    {inspectedNode.code}
                  </span>
                  <h3 className="font-bold text-sm text-[#1C1917] tracking-tight">
                    {inspectedNode.name}
                  </h3>
                </div>
                <span className="text-[11px] text-[#78716C] font-mono mt-0.5 block">
                  {inspectedNode.leadAgency}
                </span>
              </div>

              <button
                onClick={() => setInspectedNode(null)}
                className="p-1 rounded text-[#78716C] hover:text-[#1C1917] hover:bg-[#FAF7F2]"
                title="Close Inspector"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-2 gap-2 my-2.5 text-xs">
              <div className="p-2 rounded bg-[#FAF7F2] border border-[#EAE5DB]">
                <span className="text-[10px] text-[#78716C] block uppercase font-medium">Strictness</span>
                <span className="font-bold text-[#C2410C] font-mono">{inspectedNode.strictness.toFixed(1)} / 10</span>
              </div>
              <div className="p-2 rounded bg-[#FAF7F2] border border-[#EAE5DB]">
                <span className="text-[10px] text-[#78716C] block uppercase font-medium">Breach Notice</span>
                <span className="font-semibold text-[#1C1917] truncate block">{inspectedNode.breachWindow}</span>
              </div>
            </div>

            {/* Connected Threats List */}
            <div className="mb-3 text-xs">
              <span className="text-[10px] uppercase font-semibold text-[#78716C] block mb-1">
                Active Threat Links ({inspectedThreats.length}):
              </span>
              <div className="max-h-24 overflow-y-auto space-y-1.5 pr-1">
                {inspectedThreats.slice(0, 3).map((t) => (
                  <div key={t.id} className="p-1.5 rounded bg-[#FAF7F2] border border-[#EAE5DB] text-[11px]">
                    <span className="font-semibold text-[#1C1917]">{t.sourceName} → {t.targetName}</span>
                    <p className="text-[10px] text-[#78716C] truncate">{t.incidentType}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions: Compare & Open Full Dossier */}
            <div className="flex items-center gap-2 pt-2 border-t border-[#EAE5DB]">
              <button
                onClick={() => onToggleCompare(inspectedNode.id)}
                className={`flex-1 py-1.5 px-2.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedCompareIds.includes(inspectedNode.id)
                    ? "bg-[#7C4A27] text-white"
                    : "bg-[#FAF7F2] hover:bg-[#F3EFE6] text-[#1C1917] border border-[#EAE5DB]"
                }`}
              >
                {selectedCompareIds.includes(inspectedNode.id) ? "Comparing" : "+ Compare"}
              </button>

              <button
                onClick={() => {
                  const country = countries.find((c) => c.id === inspectedNode.id);
                  if (country) onSelectCountry(country);
                }}
                className="py-1.5 px-3 rounded-lg text-xs font-semibold bg-[#7C4A27] hover:bg-[#63391C] text-white flex items-center gap-1 shadow-sm transition-all"
              >
                <span>Full Dossier</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Understated Bottom Ticker */}
      <div className="px-6 py-3 bg-[#FAF7F2] border-t border-[#EAE5DB] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 truncate text-[#78716C]">
          <span className="text-[10px] font-mono uppercase font-bold text-[#7C4A27] bg-[#F3EFE6] px-2 py-0.5 rounded border border-[#EAE5DB]">
            {currentActiveLink?.categoryLabel || "Cross-Border Link"}
          </span>
          {currentActiveLink && (
            <div className="truncate text-xs">
              <strong className="text-[#1C1917]">{currentActiveLink.sourceName}</strong>
              <span className="text-[#C2410C] mx-1">→</span>
              <strong className="text-[#1C1917]">{currentActiveLink.targetName}</strong>:{" "}
              <span>{currentActiveLink.incidentType}</span>{" "}
              <span className="text-[#78716C] font-mono">({currentActiveLink.statutoryContext})</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 text-[11px] text-[#78716C] font-mono shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#7C4A27]" />
            <span>Jurisdiction</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#C2410C]" />
            <span>Critical Vector</span>
          </div>
        </div>
      </div>
    </div>
  );
};
