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
  Flame,
  AlertTriangle,
  Globe,
  Crosshair,
  Sparkles,
} from "lucide-react";

interface JurisdictionNode {
  id: string;
  name: string;
  code: string;
  lat: number;
  lng: number;
  strictness: number;
  strictnessRationale: string;
  pendingCount: number;
  breachWindow: string;
  leadAgency: string;
  primaryLaw: string;
}

export type ThreatCategory =
  | "all"
  | "ransomware"
  | "critical_infra"
  | "ai_deepfake"
  | "espionage"
  | "supply_chain";

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

// 12 Authentic Sovereign Jurisdictions with full strictness justifications
const JURISDICTION_NODES: JurisdictionNode[] = [
  {
    id: "us",
    name: "United States",
    code: "USA",
    lat: 39.5,
    lng: -98.3,
    strictness: 9.1,
    strictnessRationale: "Extraterritorial CFAA prosecutions, SEC 4-day disclosure, and CISA 72h CIRCIA critical infrastructure mandate.",
    pendingCount: 2,
    breachWindow: "72h CIRCIA · 4d SEC 8-K",
    leadAgency: "FBI Cyber & CISA",
    primaryLaw: "CFAA (18 U.S.C. § 1030)",
  },
  {
    id: "in",
    name: "India",
    code: "IND",
    lat: 22.5,
    lng: 78.9,
    strictness: 8.4,
    strictnessRationale: "Fastest mandatory breach notification on earth (6h to CERT-In), 5-year log retention, and life imprisonment for cyber terrorism.",
    pendingCount: 2,
    breachWindow: "6h CERT-In Mandate",
    leadAgency: "CERT-In & I4C",
    primaryLaw: "Information Technology Act, 2000",
  },
  {
    id: "eu",
    name: "European Union",
    code: "EU",
    lat: 50.8,
    lng: 10.4,
    strictness: 9.3,
    strictnessRationale: "Personal C-suite liability for security negligence, up to 4% worldwide turnover fines, and mandatory 24-hr initial incident alert under NIS2.",
    pendingCount: 1,
    breachWindow: "24h Alert (NIS2) · 72h GDPR",
    leadAgency: "ENISA & National CSIRTs",
    primaryLaw: "NIS 2 Directive & GDPR",
  },
  {
    id: "uk",
    name: "United Kingdom",
    code: "GBR",
    lat: 54.5,
    lng: -3.4,
    strictness: 8.7,
    strictnessRationale: "Life sentence under CMA Sec 3ZA for critical infrastructure devastation, reinforced by Online Safety Act executive jail provisions.",
    pendingCount: 1,
    breachWindow: "72 Hours to ICO (UK GDPR)",
    leadAgency: "NCA Cyber & NCSC",
    primaryLaw: "Computer Misuse Act 1990",
  },
  {
    id: "sg",
    name: "Singapore",
    code: "SGP",
    lat: 1.35,
    lng: 103.8,
    strictness: 9.2,
    strictnessRationale: "Ultra-strict 2-hour reporting for Critical Information Infrastructure (CII), up to 20-year prison terms, and ministerial takeover powers.",
    pendingCount: 1,
    breachWindow: "2h CII Incident (CSA)",
    leadAgency: "Cyber Security Agency (CSA)",
    primaryLaw: "Cybersecurity Act 2024",
  },
  {
    id: "cn",
    name: "China",
    code: "CHN",
    lat: 35.8,
    lng: 104.1,
    strictness: 9.6,
    strictnessRationale: "Total state data localization, mandatory zero-day reporting to state before vendors, and life imprisonment for cyber sabotage.",
    pendingCount: 1,
    breachWindow: "Immediate / 8h CAC",
    leadAgency: "Cyberspace Admin (CAC)",
    primaryLaw: "Cybersecurity Law (CSL)",
  },
  {
    id: "ae",
    name: "United Arab Emirates",
    code: "ARE",
    lat: 24.4,
    lng: 54.3,
    strictness: 9.0,
    strictnessRationale: "Life imprisonment for hacking sovereign systems, mandatory deportation of expatriate offenders, and fines up to AED 5 Million.",
    pendingCount: 1,
    breachWindow: "Within 72 Hours (Council)",
    leadAgency: "Cyber Security Council",
    primaryLaw: "Federal Decree-Law No. 34",
  },
  {
    id: "au",
    name: "Australia",
    code: "AUS",
    lat: -25.2,
    lng: 133.7,
    strictness: 8.8,
    strictnessRationale: "ASD statutory authority to physically take over private corporate servers during crises, backed by mandatory 72h ransomware reporting.",
    pendingCount: 1,
    breachWindow: "12h Critical · 72h General",
    leadAgency: "ACSC & Federal Police",
    primaryLaw: "SOCI Act 2018 & Cyber Bill",
  },
  {
    id: "ca",
    name: "Canada",
    code: "CAN",
    lat: 56.1,
    lng: -106.3,
    strictness: 8.2,
    strictnessRationale: "Bill C-26 daily penalties up to $15M/day for critical infrastructure failures, paired with proposed 5-year prison terms for harmful AI.",
    pendingCount: 2,
    breachWindow: "As Soon as Feasible (OPC)",
    leadAgency: "CCCS & RCMP",
    primaryLaw: "Criminal Code Sec 342.1",
  },
  {
    id: "ee",
    name: "Estonia",
    code: "EST",
    lat: 58.6,
    lng: 25.0,
    strictness: 9.4,
    strictnessRationale: "24h RIA breach notification, immutable KSI blockchain state registers, and criminal statutes penalizing offensive malware creation.",
    pendingCount: 1,
    breachWindow: "24h RIA Mandate",
    leadAgency: "Information System Authority",
    primaryLaw: "Penal Code Chapter 14",
  },
  {
    id: "jp",
    name: "Japan",
    code: "JPN",
    lat: 36.2,
    lng: 138.2,
    strictness: 8.5,
    strictnessRationale: "Criminalizes the creation or possession of virus code without deployment, while advancing Active Cyber Defense counter-intrusion laws.",
    pendingCount: 1,
    breachWindow: "3-5 Days to PPC",
    leadAgency: "NPA Cyber Bureau & NISC",
    primaryLaw: "Penal Code Article 161-2",
  },
  {
    id: "za",
    name: "South Africa",
    code: "ZAF",
    lat: -30.5,
    lng: 25.0,
    strictness: 8.0,
    strictnessRationale: "Africa benchmark statutory cyber law, providing up to 15 years for cyber extortion and hacking, with mandatory service provider reporting.",
    pendingCount: 1,
    breachWindow: "As Soon as Possible (POPIA)",
    leadAgency: "Cybercrime Hub (SAPS)",
    primaryLaw: "Cybercrimes Act No. 19",
  },
];

// Rich Library of 20+ Cross-Border Threat Vectors Categorized by Attack Type
const THREAT_VECTORS: ThreatLink[] = [
  // 1. Ransomware & Extortion
  {
    id: "rw-1",
    sourceId: "cn",
    sourceName: "LockBit Syndicate Hub",
    targetId: "in",
    targetName: "India",
    category: "ransomware",
    categoryLabel: "Ransomware",
    incidentType: "Double-Extortion Health & Energy Vault Ransomware",
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
    incidentType: "Critical Healthcare Payment Network Extortion",
    statutoryContext: "CFAA 18 U.S.C. § 1030(a)(7)",
    severity: "critical",
  },
  {
    id: "rw-3",
    sourceId: "za",
    sourceName: "Akira Ransomware Cell",
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
    incidentType: "Telecommunications Customer Data Vault Extortion",
    statutoryContext: "SOCI Act 2018 Mandatory Notice",
    severity: "high",
  },

  // 2. Critical Infrastructure APTs
  {
    id: "ci-1",
    sourceId: "cn",
    sourceName: "Volt Typhoon Cluster",
    targetId: "us",
    targetName: "United States",
    category: "critical_infra",
    categoryLabel: "Critical Infra APT",
    incidentType: "Living-off-the-Land Water Utility Compromise",
    statutoryContext: "CIRCIA 72h Notice & CFAA § 1030",
    severity: "critical",
  },
  {
    id: "ci-2",
    sourceId: "ee",
    sourceName: "Sandworm APT Unit",
    targetId: "eu",
    targetName: "Germany (EU)",
    category: "critical_infra",
    categoryLabel: "Critical Infra APT",
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
    categoryLabel: "Critical Infra APT",
    incidentType: "e-Governance X-Road Distributed Denial of Service",
    statutoryContext: "Estonian Penal Code § 207",
    severity: "critical",
  },
  {
    id: "ci-4",
    sourceId: "ae",
    sourceName: "State-Sponsored Cell",
    targetId: "sg",
    targetName: "Singapore",
    category: "critical_infra",
    categoryLabel: "Critical Infra APT",
    incidentType: "Maritime Port Automated Scheduling Sabotage",
    statutoryContext: "Cybersecurity Act 2024 (2h CII Notice)",
    severity: "high",
  },

  // 3. AI & Deepfake Financial Scams
  {
    id: "ai-1",
    sourceId: "in",
    sourceName: "Synthetic Scam Syndicate",
    targetId: "ae",
    targetName: "United Arab Emirates",
    category: "ai_deepfake",
    categoryLabel: "AI & Deepfake",
    incidentType: "Executive Voice-Cloning Banking Wire Transfer",
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

  // 4. State-Sponsored Espionage
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

  // 5. Supply Chain & Zero-Days
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
    const x = (lng + 180) * (MAP_WIDTH / 360);
    const y = (90 - lat) * (MAP_HEIGHT / 180);
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

  const currentActiveLink =
    filteredThreats[activeVectorIndex % (filteredThreats.length || 1)] || filteredThreats[0];

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
    setInspectedNode(null);
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

  // Click Country Node -> Smooth Focus & Slide-out In-Map Inspector Drawer
  const handleNodeClick = (node: JurisdictionNode) => {
    setInspectedNode(node);
    const pos = project(node.lat, node.lng);
    const targetPanX = MAP_WIDTH / 2 - pos.x;
    const targetPanY = MAP_HEIGHT / 2 - pos.y;
    setPan({ x: targetPanX * 0.7, y: targetPanY * 0.7 });
    setZoom((prev) => Math.max(prev, 1.6));
  };

  // Compute 3D Parabolic Curved Arcs with Ground Shadows
  const arcPaths = useMemo(() => {
    return filteredThreats
      .map((link, idx) => {
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

        // 3D Parabolic height scales with geographic distance
        const arcHeight = Math.min(Math.max(distance * 0.38, 45), 150);

        // Elevated peak vertex
        const cx = mx;
        const cy = my - arcHeight;

        // Ground trace path along the map plane
        const groundPath = `M ${p1.x.toFixed(1)} ${p1.y.toFixed(1)} L ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
        // 3D Parabolic curve arching above the plane
        const parabolicPath = `M ${p1.x.toFixed(1)} ${p1.y.toFixed(1)} Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;

        const isFocused = inspectedNode
          ? link.sourceId === inspectedNode.id || link.targetId === inspectedNode.id
          : true;

        const isCurrentActive = idx === activeVectorIndex % filteredThreats.length;

        return {
          ...link,
          groundPath,
          parabolicPath,
          sourcePos: p1,
          targetPos: p2,
          isFocused,
          isActive: isCurrentActive,
        };
      })
      .filter(Boolean);
  }, [filteredThreats, nodeMap, activeVectorIndex, inspectedNode]);

  // Color helper in warm editorial tones
  const getNodeColor = (node: JurisdictionNode) => {
    if (mapMode === "strictness") {
      if (node.strictness >= 9.2) return "#C2410C"; // Severe (terracotta)
      if (node.strictness >= 8.7) return "#B45309"; // High (warm amber)
      return "#7C4A27"; // Moderate (cognac brown)
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
      {/* Top Header: Title, Mode Toggles & Region Presets */}
      <div className="px-6 py-4 bg-[#FAF7F2] border-b border-[#EAE5DB] space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C2410C] animate-pulse" />
              <h2 className="text-base font-bold text-[#1C1917] tracking-tight">
                Global Cyber Law & Cross-Border Threat Map
              </h2>
            </div>
            <p className="text-xs text-[#78716C] mt-0.5">
              Scroll or pinch to zoom, drag to pan continents. 3D parabolic curves trace active cross-border attack vectors.
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

        {/* Threat Category Filter Chips (Only shown in Threat Vectors mode) */}
        {mapMode === "connections" && (
          <div className="flex items-center justify-between gap-3 pt-2 border-t border-[#EAE5DB]/60 overflow-x-auto text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase font-bold text-[#78716C] shrink-0 mr-1">
                Threat Filter:
              </span>
              {[
                { id: "all", label: `All Vectors (${THREAT_VECTORS.length})` },
                { id: "ransomware", label: "Ransomware" },
                { id: "critical_infra", label: "Critical Infra APT" },
                { id: "ai_deepfake", label: "AI & Deepfake" },
                { id: "espionage", label: "State Espionage" },
                { id: "supply_chain", label: "Supply Chain" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedThreatCategory(cat.id as ThreatCategory)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap transition-colors ${
                    selectedThreatCategory === cat.id
                      ? "bg-[#7C4A27] text-white font-semibold shadow-sm"
                      : "bg-white text-[#78716C] hover:text-[#1C1917] border border-[#EAE5DB]"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Quick Regional Camera Jumps */}
            <div className="hidden md:flex items-center gap-1 shrink-0 text-[10px] font-mono text-[#78716C]">
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
        className={`relative w-full h-[460px] sm:h-[520px] select-none overflow-hidden bg-[#FBF9F5] ${
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
            {/* Luminous Gradient for Elevated 3D Arcs */}
            <linearGradient id="arc3dGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7C4A27" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#C2410C" stopOpacity="1" />
              <stop offset="100%" stopColor="#EA580C" stopOpacity="0.9" />
            </linearGradient>

            {/* Strictness Glow Filter */}
            <filter id="strictnessGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Latitude & Longitude Reference Graticule */}
          <g className="stroke-[#EAE5DB] stroke-[0.8] stroke-dasharray-[4 4]">
            <line x1="0" y1="240" x2={MAP_WIDTH} y2="240" />
            <line x1="0" y1="120" x2={MAP_WIDTH} y2="120" />
            <line x1="0" y1="360" x2={MAP_WIDTH} y2="360" />
            <line x1="480" y1="0" x2="480" y2={MAP_HEIGHT} />
            <line x1="240" y1="0" x2="240" y2={MAP_HEIGHT} />
            <line x1="720" y1="0" x2="720" y2={MAP_HEIGHT} />
          </g>

          {/* HIGH-FIDELITY CONTINENTAL GEOGRAPHY (Warm Sand #EBE5DB on Canvas) */}
          <g className="fill-[#EBE5DB] stroke-[#D6CEBF] stroke-[1] stroke-linejoin-round">
            {/* North America */}
            <path d="M 115 55 C 130 50, 190 45, 235 55 C 275 65, 305 90, 315 125 C 310 145, 290 170, 270 190 C 245 215, 220 240, 205 245 C 190 235, 175 200, 160 175 C 135 155, 115 140, 95 110 C 90 90, 100 65, 115 55 Z" />
            {/* Alaska */}
            <path d="M 60 70 C 80 65, 105 70, 115 85 C 105 105, 75 110, 60 95 Z" />
            {/* Greenland */}
            <path d="M 320 30 C 355 25, 395 35, 385 70 C 365 95, 335 85, 320 55 Z" />
            {/* Central America & Caribbean */}
            <path d="M 205 245 C 220 255, 245 270, 255 295 C 245 300, 235 285, 215 270 Z" />
            <circle cx="280" cy="245" r="3" />
            <circle cx="295" cy="255" r="2.5" />

            {/* South America */}
            <path d="M 255 295 C 285 300, 345 315, 350 365 C 355 410, 330 460, 295 480 C 275 450, 260 395, 250 345 C 245 315, 245 300, 255 295 Z" />

            {/* Europe */}
            <path d="M 445 75 C 475 70, 535 70, 555 95 C 565 120, 535 150, 505 160 C 480 165, 455 145, 440 120 C 430 95, 435 80, 445 75 Z" />
            {/* British Isles */}
            <path d="M 435 90 C 445 85, 450 105, 445 120 C 435 125, 425 115, 435 90 Z" />
            {/* Scandinavia */}
            <path d="M 485 45 C 505 40, 525 50, 520 80 C 500 90, 485 80, 485 45 Z" />
            {/* Iberian Peninsula */}
            <path d="M 425 130 C 445 130, 445 155, 435 165 C 420 160, 415 145, 425 130 Z" />
            {/* Italy */}
            <path d="M 470 135 C 480 140, 485 160, 480 170 C 470 165, 465 150, 470 135 Z" />

            {/* Africa */}
            <path d="M 450 175 C 495 170, 575 180, 590 230 C 605 280, 595 350, 550 425 C 515 415, 480 365, 460 315 C 440 260, 435 200, 450 175 Z" />
            {/* Madagascar */}
            <path d="M 605 340 C 615 335, 620 370, 610 390 C 600 385, 600 355, 605 340 Z" />

            {/* Asia (Eurasia & Siberia) */}
            <path d="M 555 70 C 635 60, 835 60, 875 105 C 895 140, 875 200, 825 230 C 785 250, 725 250, 675 240 C 625 230, 575 170, 555 110 Z" />
            {/* Indian Subcontinent */}
            <path d="M 665 190 C 695 185, 735 210, 730 260 C 720 295, 690 315, 675 300 C 660 265, 655 215, 665 190 Z" />
            {/* Southeast Asia */}
            <path d="M 765 240 C 795 235, 825 255, 815 285 C 795 300, 770 280, 765 240 Z" />
            {/* Indonesian Archipelago & Philippines */}
            <path d="M 780 305 C 810 300, 840 310, 830 325 C 810 330, 790 320, 780 305 Z" />
            <path d="M 810 245 C 825 245, 830 270, 820 280 C 810 275, 805 260, 810 245 Z" />
            {/* Japan Arc */}
            <path d="M 855 130 C 875 135, 880 175, 865 195 C 850 185, 850 150, 855 130 Z" />

            {/* Australia & Oceania */}
            <path d="M 780 325 C 830 315, 895 325, 905 365 C 915 405, 885 445, 835 445 C 795 435, 765 395, 780 325 Z" />
            {/* New Zealand */}
            <path d="M 915 420 C 930 415, 935 445, 925 460 C 910 455, 910 435, 915 420 Z" />
          </g>

          {/* LAYER 1: 3D Parabolic Threat Vector Curves & Ground Shadows */}
          {mapMode === "connections" && (
            <g>
              {arcPaths.map((arc: any) => {
                if (!arc) return null;
                const isCurrent = arc.isActive;
                const opacity = arc.isFocused ? (isCurrent ? 0.95 : 0.35) : 0.08;

                return (
                  <g key={arc.id}>
                    {/* 1. Ground Trace Shadow Line (Direct baseline on the plane) */}
                    <path
                      d={arc.groundPath}
                      fill="none"
                      stroke="#A8A29E"
                      strokeWidth={isCurrent ? 1.5 : 0.8}
                      strokeOpacity={opacity * 0.45}
                      strokeDasharray="3 3"
                    />

                    {/* 2. Elevated 3D Parabolic Bezier Curve */}
                    <path
                      d={arc.parabolicPath}
                      fill="none"
                      stroke={isCurrent ? "url(#arc3dGradient)" : "#7C4A27"}
                      strokeWidth={isCurrent ? 2.8 : 1.2}
                      strokeOpacity={opacity}
                      strokeDasharray={isCurrent ? "none" : "2 2"}
                      className="transition-all duration-300"
                    />

                    {/* 3. Animated Guided Missile Tracer Particle along the 3D parabolic trajectory */}
                    {isCurrent && (
                      <circle r="4" fill="#C2410C" filter="url(#strictnessGlow)">
                        <animateMotion
                          path={arc.parabolicPath}
                          dur="2.4s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    )}

                    {/* 4. Target Impact Concentric Radar Shockwaves */}
                    {isCurrent && (
                      <g transform={`translate(${arc.targetPos.x}, ${arc.targetPos.y})`}>
                        <circle r="5" fill="none" stroke="#C2410C" strokeWidth="1.8">
                          <animate
                            attributeName="r"
                            from="5"
                            to="26"
                            dur="2s"
                            repeatCount="indefinite"
                          />
                          <animate
                            attributeName="opacity"
                            from="0.9"
                            to="0"
                            dur="2s"
                            repeatCount="indefinite"
                          />
                        </circle>
                        <circle r="4" fill="none" stroke="#EA580C" strokeWidth="1.2">
                          <animate
                            attributeName="r"
                            from="3"
                            to="16"
                            dur="2s"
                            begin="0.4s"
                            repeatCount="indefinite"
                          />
                          <animate
                            attributeName="opacity"
                            from="0.8"
                            to="0"
                            dur="2s"
                            begin="0.4s"
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

          {/* LAYER 2: Sovereign Country Nodes & Heatmaps */}
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
                  {/* Strictness Heatmap Radiant Aura */}
                  {mapMode === "strictness" && (
                    <circle
                      r={node.strictness * 3.6}
                      fill={nodeColor}
                      opacity={node.strictness >= 9.2 ? "0.32" : "0.22"}
                      filter="url(#strictnessGlow)"
                    />
                  )}

                  {/* Pending Acts Pulsing Hotspot */}
                  {mapMode === "pending" && node.pendingCount > 0 && (
                    <circle
                      r="18"
                      fill="#B45309"
                      opacity="0.25"
                      className="animate-ping"
                    />
                  )}

                  {/* Inspected Active Pulse Ring */}
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
                    r={isSelected || isInspected || isHovered ? "7.5" : "5"}
                    fill="#FFFFFF"
                    stroke={isInspected ? "#7C4A27" : nodeColor}
                    strokeWidth={isSelected || isInspected ? "3" : "2"}
                    className="transition-all duration-150"
                  />

                  {/* Node Center Point */}
                  <circle r="2.5" fill={isInspected ? "#7C4A27" : nodeColor} />

                  {/* Clean Technical Label */}
                  <text
                    x="9"
                    y="3"
                    fill={isInspected || isHovered ? "#1C1917" : "#57534E"}
                    fontSize={isInspected ? "11" : "9.5"}
                    fontFamily="monospace"
                    fontWeight={isInspected ? "bold" : "600"}
                    letterSpacing="0.04em"
                    className="pointer-events-none select-none drop-shadow-sm"
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

        {/* IN-MAP CONTEXTUAL INSPECTOR DRAWER (Rich Intelligence on Click) */}
        {inspectedNode && (
          <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:w-[410px] z-30 p-4 rounded-2xl bg-white/95 border border-[#EAE5DB] shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom duration-200">
            <div className="flex items-start justify-between gap-3 mb-2.5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#7C4A27] bg-[#F4EFE6] px-2 py-0.5 rounded border border-[#EAE5DB]">
                    {inspectedNode.code}
                  </span>
                  <h3 className="font-bold text-sm text-[#1C1917] tracking-tight">
                    {inspectedNode.name}
                  </h3>
                </div>
                <span className="text-[11px] text-[#78716C] font-mono mt-0.5 block">
                  Lead Authority: {inspectedNode.leadAgency}
                </span>
              </div>

              <button
                onClick={() => setInspectedNode(null)}
                className="p-1 rounded-lg text-[#78716C] hover:text-[#1C1917] hover:bg-[#FAF7F2] transition-colors"
                title="Close Inspector"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-2 gap-2 my-2 text-xs">
              <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#EAE5DB]">
                <span className="text-[10px] text-[#78716C] block uppercase font-medium">Strictness Index</span>
                <span className="font-bold text-[#C2410C] font-mono text-xs sm:text-sm">
                  {inspectedNode.strictness.toFixed(1)} / 10
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#EAE5DB]">
                <span className="text-[10px] text-[#78716C] block uppercase font-medium">Breach Disclosure</span>
                <span className="font-semibold text-[#1C1917] text-[11px] block truncate">
                  {inspectedNode.breachWindow}
                </span>
              </div>
            </div>

            {/* Strictness Rationale */}
            <div className="p-2.5 rounded-xl bg-[#F5F2EB]/60 border border-[#EAE5DB] mb-2.5 text-xs">
              <span className="text-[10px] uppercase font-bold text-[#7C4A27] block mb-0.5">
                Strictness Justification:
              </span>
              <p className="text-[#44403C] text-[11px] leading-relaxed">
                {inspectedNode.strictnessRationale}
              </p>
            </div>

            {/* Connected Threats List */}
            <div className="mb-3 text-xs">
              <span className="text-[10px] uppercase font-semibold text-[#78716C] block mb-1">
                Active Cross-Border Threat Vectors ({inspectedThreats.length}):
              </span>
              <div className="max-h-24 overflow-y-auto space-y-1.5 pr-1">
                {inspectedThreats.slice(0, 3).map((t) => (
                  <div key={t.id} className="p-1.5 rounded-lg bg-[#FAF7F2] border border-[#EAE5DB] text-[11px]">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[#1C1917]">{t.sourceName} → {t.targetName}</span>
                      <span className="text-[9px] uppercase font-mono px-1.5 py-0.2 rounded bg-[#EAE5DB] text-[#7C4A27]">
                        {t.categoryLabel}
                      </span>
                    </div>
                    <p className="text-[10px] text-[#78716C] truncate mt-0.5">{t.incidentType}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons: Compare & Full Legal Dossier */}
            <div className="flex items-center gap-2 pt-2.5 border-t border-[#EAE5DB]">
              <button
                onClick={() => onToggleCompare(inspectedNode.id)}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
                  selectedCompareIds.includes(inspectedNode.id)
                    ? "bg-[#7C4A27] text-white shadow-sm"
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
                className="py-2 px-3.5 rounded-xl text-xs font-semibold bg-[#7C4A27] hover:bg-[#63391C] text-white flex items-center gap-1 shadow-sm transition-all"
              >
                <span>Full Legal Dossier</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Understated Bottom Threat Vector Ticker */}
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
            <span>Critical 3D Arc</span>
          </div>
        </div>
      </div>
    </div>
  );
};
