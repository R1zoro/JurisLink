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
}

interface ThreatLink {
  id: string;
  sourceId: string;
  sourceName: string;
  targetId: string;
  targetName: string;
  incidentType: string;
  statutoryContext: string;
}

// Strictly authentic world jurisdictions from our legal database
const JURISDICTION_NODES: JurisdictionNode[] = [
  { id: "us", name: "United States", code: "USA", lat: 38.9, lng: -77.0, strictness: 9.1, pendingCount: 2, breachWindow: "72h CIRCIA / 4d SEC" },
  { id: "in", name: "India", code: "IND", lat: 28.6, lng: 77.2, strictness: 8.4, pendingCount: 2, breachWindow: "6h CERT-In" },
  { id: "eu", name: "European Union", code: "EU", lat: 52.5, lng: 13.4, strictness: 9.3, pendingCount: 1, breachWindow: "24h Warning / 72h GDPR" },
  { id: "uk", name: "United Kingdom", code: "GBR", lat: 51.5, lng: -0.1, strictness: 8.7, pendingCount: 1, breachWindow: "72h UK GDPR" },
  { id: "sg", name: "Singapore", code: "SGP", lat: 1.35, lng: 103.8, strictness: 9.2, pendingCount: 1, breachWindow: "2h CII Incident" },
  { id: "cn", name: "China", code: "CHN", lat: 39.9, lng: 116.4, strictness: 9.6, pendingCount: 1, breachWindow: "Immediate / 8h CAC" },
  { id: "ae", name: "United Arab Emirates", code: "ARE", lat: 24.4, lng: 54.3, strictness: 9.0, pendingCount: 1, breachWindow: "72h Federal Council" },
  { id: "au", name: "Australia", code: "AUS", lat: -35.3, lng: 149.1, strictness: 8.8, pendingCount: 1, breachWindow: "12h Critical / 72h General" },
  { id: "ca", name: "Canada", code: "CAN", lat: 45.4, lng: -75.7, strictness: 8.2, pendingCount: 2, breachWindow: "As soon as feasible" },
  { id: "ee", name: "Estonia", code: "EST", lat: 59.4, lng: 24.7, strictness: 9.4, pendingCount: 1, breachWindow: "24h RIA Mandate" },
  { id: "jp", name: "Japan", code: "JPN", lat: 35.6, lng: 139.7, strictness: 8.5, pendingCount: 1, breachWindow: "3-5 Days PPC" },
  { id: "za", name: "South Africa", code: "ZAF", lat: -25.7, lng: 28.2, strictness: 8.0, pendingCount: 1, breachWindow: "As soon as possible" },
];

// Cross-border cyber incident connections between real sovereign jurisdictions
const CROSS_BORDER_LINKS: ThreatLink[] = [
  {
    id: "link-1",
    sourceId: "cn",
    sourceName: "China",
    targetId: "us",
    targetName: "United States",
    incidentType: "Critical Infrastructure Telemetry Breach",
    statutoryContext: "CFAA 18 U.S.C. § 1030 & CIRCIA",
  },
  {
    id: "link-2",
    sourceId: "eu",
    sourceName: "European Union",
    targetId: "in",
    targetName: "India",
    incidentType: "Cross-Border Financial Ransomware Incursion",
    statutoryContext: "IT Act Sec 66 & BNS Sec 318",
  },
  {
    id: "link-3",
    sourceId: "us",
    sourceName: "United States",
    targetId: "uk",
    targetName: "United Kingdom",
    incidentType: "Health Sector Cloud Exfiltration",
    statutoryContext: "UK Computer Misuse Act Sec 3",
  },
  {
    id: "link-4",
    sourceId: "sg",
    sourceName: "Singapore",
    targetId: "au",
    targetName: "Australia",
    incidentType: "Supply Chain Software Dependency Compromise",
    statutoryContext: "SOCI Act 2018 & CSA Sec 8A",
  },
  {
    id: "link-5",
    sourceId: "jp",
    sourceName: "Japan",
    targetId: "ee",
    targetName: "Estonia",
    incidentType: "Maritime Logistics DDoS & Data Impairment",
    statutoryContext: "Estonian Penal Code § 207",
  },
  {
    id: "link-6",
    sourceId: "ae",
    sourceName: "United Arab Emirates",
    targetId: "sg",
    targetName: "Singapore",
    incidentType: "Synthetic Media Executive Impersonation",
    statutoryContext: "Decree-Law 34 & IMDA Directives",
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
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hoveredNode, setHoveredNode] = useState<JurisdictionNode | null>(null);
  const [activeLinkIndex, setActiveLinkIndex] = useState(0);

  const MAP_WIDTH = 960;
  const MAP_HEIGHT = 480;

  // Equirectangular projection
  const project = (lat: number, lng: number) => {
    const x = ((lng + 180) * (MAP_WIDTH / 360));
    const y = ((90 - lat) * (MAP_HEIGHT / 180));
    return { x, y };
  };

  // Cycle through active connections
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveLinkIndex((prev) => (prev + 1) % CROSS_BORDER_LINKS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const currentLink = CROSS_BORDER_LINKS[activeLinkIndex];

  // Pan handlers
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

  // Zoom controls
  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 2.8));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.85));
  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Node Map lookup
  const nodeMap = useMemo(() => {
    const map = new Map<string, JurisdictionNode>();
    JURISDICTION_NODES.forEach((node) => map.set(node.id, node));
    return map;
  }, []);

  // Compute curved connection arcs
  const arcPaths = useMemo(() => {
    return CROSS_BORDER_LINKS.map((link, idx) => {
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
      const arcHeight = Math.min(distance * 0.35, 110);

      const cx = mx;
      const cy = my - arcHeight;
      const pathString = `M ${p1.x.toFixed(1)} ${p1.y.toFixed(1)} Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;

      return {
        ...link,
        pathString,
        sourcePos: p1,
        targetPos: p2,
        isActive: idx === activeLinkIndex,
      };
    }).filter(Boolean);
  }, [nodeMap, activeLinkIndex]);

  // Color helper in warm editorial tones
  const getNodeColor = (node: JurisdictionNode) => {
    if (mapMode === "strictness") {
      if (node.strictness >= 9.2) return "#C2410C"; // Terracotta
      if (node.strictness >= 8.7) return "#B45309"; // Ochre
      return "#7C4A27"; // Cognac
    }
    if (mapMode === "pending") {
      return node.pendingCount > 0 ? "#B45309" : "#A8A29E";
    }
    return "#7C4A27";
  };

  const handleNodeClick = (node: JurisdictionNode) => {
    const country = countries.find((c) => c.id === node.id);
    if (country) onSelectCountry(country);
  };

  return (
    <div className="rounded-2xl bg-white border border-[#EAE5DB] shadow-sm overflow-hidden font-sans">
      {/* Refined Minimalist Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-6 py-4 bg-[#FAF7F2] border-b border-[#EAE5DB]">
        <div>
          <h2 className="text-sm font-semibold text-[#1C1917] tracking-tight">
            Global Cyber Law & Cross-Border Vector Map
          </h2>
          <p className="text-xs text-[#78716C] mt-0.5">
            Interactive geographic projection of statutory frameworks, strictness density, and unnotified acts
          </p>
        </div>

        {/* Minimalist Switch Controls */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-white border border-[#EAE5DB] text-xs">
          <button
            onClick={() => setMapMode("connections")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              mapMode === "connections"
                ? "bg-[#7C4A27] text-white shadow-sm"
                : "text-[#78716C] hover:text-[#1C1917]"
            }`}
          >
            Threat Links
          </button>

          <button
            onClick={() => setMapMode("strictness")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              mapMode === "strictness"
                ? "bg-[#7C4A27] text-white shadow-sm"
                : "text-[#78716C] hover:text-[#1C1917]"
            }`}
          >
            Strictness Heatmap
          </button>

          <button
            onClick={() => setMapMode("pending")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              mapMode === "pending"
                ? "bg-[#7C4A27] text-white shadow-sm"
                : "text-[#78716C] hover:text-[#1C1917]"
            }`}
          >
            Pending Acts
          </button>
        </div>
      </div>

      {/* Map Canvas Viewport */}
      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={`relative w-full h-[400px] sm:h-[460px] select-none overflow-hidden bg-[#FBF9F5] ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        {/* Understated Zoom / Pan Controls */}
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-1 bg-white/95 border border-[#EAE5DB] p-1 rounded-lg shadow-sm">
          <button
            onClick={handleZoomIn}
            className="p-1.5 rounded text-[#78716C] hover:text-[#1C1917] hover:bg-[#F5F2EB] transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-1.5 rounded text-[#78716C] hover:text-[#1C1917] hover:bg-[#F5F2EB] transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 rounded text-[#78716C] hover:text-[#1C1917] hover:bg-[#F5F2EB] transition-colors"
            title="Reset View"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
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
            {/* North America */}
            <path d="M 120 70 C 140 65, 230 65, 260 75 C 290 85, 320 120, 310 145 C 300 165, 260 190, 240 220 C 220 245, 195 240, 185 210 C 170 170, 140 160, 115 130 C 100 110, 105 80, 120 70 Z" />
            {/* Greenland */}
            <path d="M 330 35 C 370 30, 400 45, 385 75 C 365 95, 335 85, 330 60 Z" />
            {/* South America */}
            <path d="M 260 250 C 290 255, 340 270, 345 320 C 350 370, 330 420, 300 455 C 280 435, 265 380, 255 330 C 245 285, 245 260, 260 250 Z" />
            {/* Europe */}
            <path d="M 450 75 C 480 70, 545 70, 560 95 C 570 120, 540 155, 510 165 C 485 170, 460 150, 445 125 C 435 100, 440 85, 450 75 Z" />
            {/* Scandinavia */}
            <path d="M 495 50 C 515 45, 535 55, 530 85 C 510 95, 495 85, 495 50 Z" />
            {/* United Kingdom & Ireland */}
            <path d="M 450 100 C 465 95, 470 115, 465 130 C 455 135, 445 125, 450 100 Z" />
            {/* Africa */}
            <path d="M 455 175 C 500 170, 580 180, 595 230 C 610 280, 600 350, 555 425 C 520 415, 485 365, 465 315 C 445 260, 440 200, 455 175 Z" />
            {/* Madagascar */}
            <path d="M 605 340 C 615 335, 620 370, 610 390 C 600 385, 600 355, 605 340 Z" />
            {/* Asia Mainland */}
            <path d="M 570 70 C 640 60, 840 60, 870 105 C 890 140, 870 200, 820 230 C 780 250, 720 250, 670 240 C 620 230, 580 170, 570 120 Z" />
            {/* Indian Subcontinent */}
            <path d="M 670 195 C 700 190, 740 215, 735 265 C 725 300, 695 320, 680 305 C 665 270, 660 220, 670 195 Z" />
            {/* Southeast Asia Archipelago */}
            <path d="M 770 245 C 800 240, 830 260, 820 290 C 800 305, 775 285, 770 245 Z" />
            {/* Japan */}
            <path d="M 855 130 C 875 135, 880 175, 865 195 C 850 185, 850 150, 855 130 Z" />
            {/* Australia */}
            <path d="M 780 315 C 830 305, 895 315, 905 355 C 915 395, 885 435, 835 435 C 795 425, 765 385, 780 315 Z" />
            {/* New Zealand */}
            <path d="M 920 415 C 935 410, 940 440, 930 455 C 915 450, 915 430, 920 415 Z" />
          </g>

          {/* LAYER 1: Delicate Curved Cross-Border Threat Arcs */}
          {mapMode === "connections" && (
            <g>
              {arcPaths.map((arc: any) => {
                if (!arc) return null;
                const isCurrent = arc.isActive;

                return (
                  <g key={arc.id}>
                    {/* Background graceful trace */}
                    <path
                      d={arc.pathString}
                      fill="none"
                      stroke={isCurrent ? "#C2410C" : "#7C4A27"}
                      strokeWidth={isCurrent ? 2 : 1}
                      strokeOpacity={isCurrent ? 0.9 : 0.25}
                      strokeDasharray={isCurrent ? "none" : "3 3"}
                    />

                    {/* Smooth moving subtle node */}
                    {isCurrent && (
                      <circle r="3.5" fill="#C2410C">
                        <animateMotion
                          path={arc.pathString}
                          dur="2.8s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    )}

                    {/* Target subtle pulse */}
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

          {/* LAYER 2: Country Jurisdictions */}
          <g>
            {JURISDICTION_NODES.map((node) => {
              const pos = project(node.lat, node.lng);
              const isSelected = selectedCompareIds.includes(node.id);
              const isHovered = hoveredNode?.id === node.id;
              const nodeColor = getNodeColor(node);

              return (
                <g
                  key={node.id}
                  transform={`translate(${pos.x}, ${pos.y})`}
                  className="cursor-pointer group"
                  onClick={() => handleNodeClick(node)}
                  onMouseEnter={() => setHoveredNode(node)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  {/* Strictness Heatmap Halo */}
                  {mapMode === "strictness" && (
                    <circle
                      r={node.strictness * 2.8}
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

                  {/* Node Outer Ring */}
                  <circle
                    r={isSelected || isHovered ? "7" : "4.5"}
                    fill="#FFFFFF"
                    stroke={nodeColor}
                    strokeWidth={isSelected ? "2.5" : "1.8"}
                    className="transition-all duration-150"
                  />

                  {/* Node Center */}
                  <circle r="2" fill={nodeColor} />

                  {/* Clean Technical Code Label */}
                  <text
                    x="8"
                    y="3"
                    fill={isSelected || isHovered ? "#1C1917" : "#57534E"}
                    fontSize={isSelected || isHovered ? "11" : "9"}
                    fontFamily="monospace"
                    fontWeight="600"
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

        {/* Hover Tooltip in Warm Cream/White */}
        {hoveredNode && (
          <div className="absolute bottom-4 left-4 z-30 p-3 rounded-xl bg-white border border-[#EAE5DB] shadow-md max-w-xs pointer-events-none animate-in fade-in duration-100">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="font-semibold text-[#1C1917] text-xs">
                {hoveredNode.name}
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#F5F2EB] text-[#7C4A27] font-bold">
                {hoveredNode.code}
              </span>
            </div>
            <div className="text-[11px] text-[#78716C] flex items-center justify-between font-mono">
              <span>Strictness Score:</span>
              <span className="font-bold text-[#C2410C]">{hoveredNode.strictness.toFixed(1)} / 10</span>
            </div>
            <div className="text-[11px] text-[#78716C] flex items-center justify-between font-mono mt-0.5">
              <span>Breach Notice:</span>
              <span className="text-[#1C1917]">{hoveredNode.breachWindow}</span>
            </div>
            <div className="text-[10px] text-[#7C4A27] font-medium mt-1.5 flex items-center gap-1">
              <span>Inspect statutory dossier</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        )}
      </div>

      {/* Understated Bottom Ticker */}
      <div className="px-6 py-3 bg-[#FAF7F2] border-t border-[#EAE5DB] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 truncate text-[#78716C]">
          <span className="text-[10px] font-mono uppercase font-bold text-[#7C4A27] bg-[#F3EFE6] px-2 py-0.5 rounded border border-[#EAE5DB]">
            Cross-Border Vector
          </span>
          <div className="truncate text-xs">
            <strong className="text-[#1C1917]">{currentLink.sourceName}</strong>
            <span className="text-[#C2410C] mx-1">→</span>
            <strong className="text-[#1C1917]">{currentLink.targetName}</strong>:{" "}
            <span>{currentLink.incidentType}</span>{" "}
            <span className="text-[#78716C] font-mono">({currentLink.statutoryContext})</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-[#78716C] font-mono shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#7C4A27]" />
            <span>Jurisdiction</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#C2410C]" />
            <span>High Strictness</span>
          </div>
        </div>
      </div>
    </div>
  );
};
