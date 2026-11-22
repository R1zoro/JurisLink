"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { CountryCyberLaw } from "@/data/countries";
import {
  ShieldAlert,
  Flame,
  Radio,
  Layers,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  Activity,
  Crosshair,
  ExternalLink,
} from "lucide-react";

interface NodePosition {
  id: string;
  name: string;
  code: string;
  lat: number;
  lng: number;
  type: "jurisdiction" | "threat_origin";
  strictness?: number;
  pendingCount?: number;
}

interface AttackVector {
  id: string;
  source: string;
  sourceName: string;
  target: string;
  targetName: string;
  threatActor: string;
  attackType: string;
  statuteRef: string;
  severity: "critical" | "high" | "elevated";
  timestamp: string;
}

// Global Cyber Nodes (Equirectangular Lat/Lng Projection)
const CYBER_NODES: NodePosition[] = [
  { id: "us", name: "United States", code: "USA", lat: 38.9, lng: -77.0, type: "jurisdiction", strictness: 9.1, pendingCount: 2 },
  { id: "in", name: "India", code: "IND", lat: 28.6, lng: 77.2, type: "jurisdiction", strictness: 8.4, pendingCount: 2 },
  { id: "eu", name: "European Union", code: "EU", lat: 52.5, lng: 13.4, type: "jurisdiction", strictness: 9.3, pendingCount: 1 },
  { id: "uk", name: "United Kingdom", code: "GBR", lat: 51.5, lng: -0.1, type: "jurisdiction", strictness: 8.7, pendingCount: 1 },
  { id: "sg", name: "Singapore", code: "SGP", lat: 1.35, lng: 103.8, type: "jurisdiction", strictness: 9.2, pendingCount: 1 },
  { id: "cn", name: "China", code: "CHN", lat: 39.9, lng: 116.4, type: "jurisdiction", strictness: 9.6, pendingCount: 1 },
  { id: "ae", name: "United Arab Emirates", code: "ARE", lat: 24.4, lng: 54.3, type: "jurisdiction", strictness: 9.0, pendingCount: 1 },
  { id: "au", name: "Australia", code: "AUS", lat: -35.3, lng: 149.1, type: "jurisdiction", strictness: 8.8, pendingCount: 1 },
  { id: "ca", name: "Canada", code: "CAN", lat: 45.4, lng: -75.7, type: "jurisdiction", strictness: 8.2, pendingCount: 2 },
  { id: "ee", name: "Estonia", code: "EST", lat: 59.4, lng: 24.7, type: "jurisdiction", strictness: 9.4, pendingCount: 1 },
  { id: "jp", name: "Japan", code: "JPN", lat: 35.6, lng: 139.7, type: "jurisdiction", strictness: 8.5, pendingCount: 1 },
  { id: "za", name: "South Africa", code: "ZAF", lat: -25.7, lng: 28.2, type: "jurisdiction", strictness: 8.0, pendingCount: 1 },
  // Non-jurisdiction threat origins for realistic cross-border attack arcs
  { id: "origin_ru", name: "Eastern Bloc / APT28 Hub", code: "APT-E", lat: 55.7, lng: 37.6, type: "threat_origin" },
  { id: "origin_kp", name: "Lazarus Cluster", code: "APT-K", lat: 39.0, lng: 125.7, type: "threat_origin" },
  { id: "origin_ir", name: "Charming Kitten Hub", code: "APT-I", lat: 35.7, lng: 51.4, type: "threat_origin" },
  { id: "origin_ro", name: "Cyber Syndicate Haven", code: "R-NET", lat: 44.4, lng: 26.1, type: "threat_origin" },
];

// Curated live attack vectors linking threat actors to real statutory codes
const ATTACK_VECTORS_DATA: AttackVector[] = [
  {
    id: "att-1",
    source: "origin_ru",
    sourceName: "APT28 / Fancy Bear",
    target: "eu",
    targetName: "Germany (EU)",
    threatActor: "State-Sponsored APT",
    attackType: "Critical Infrastructure Grid Probe",
    statuteRef: "NIS2 Art. 21 / German StGB § 202a",
    severity: "critical",
    timestamp: "12:44:02",
  },
  {
    id: "att-2",
    source: "origin_kp",
    sourceName: "Lazarus Syndicate",
    target: "us",
    targetName: "United States",
    threatActor: "Lazarus Group",
    attackType: "Fintech Smart Contract Infiltration",
    statuteRef: "CFAA 18 U.S.C. § 1030(a)(4)",
    severity: "critical",
    timestamp: "12:44:06",
  },
  {
    id: "att-3",
    source: "origin_ro",
    sourceName: "LockBit Syndicate Hub",
    target: "in",
    targetName: "India",
    threatActor: "LockBit 3.0",
    attackType: "Double-Extortion Ransomware",
    statuteRef: "IT Act Sec 66 & BNS Sec 318",
    severity: "high",
    timestamp: "12:44:11",
  },
  {
    id: "att-4",
    source: "cn",
    sourceName: "Volt Typhoon Cluster",
    target: "au",
    targetName: "Australia",
    threatActor: "Volt Typhoon",
    attackType: "Living-off-the-Land (LotL) Port Scan",
    statuteRef: "Critical Infrastructure (SOCI) Act 2018",
    severity: "high",
    timestamp: "12:44:15",
  },
  {
    id: "att-5",
    source: "origin_ir",
    sourceName: "Charming Kitten Hub",
    target: "ae",
    targetName: "UAE",
    threatActor: "Charming Kitten",
    attackType: "Deepfake Executive Audio Phishing",
    statuteRef: "Federal Decree-Law No. 34 Art. 44",
    severity: "elevated",
    timestamp: "12:44:20",
  },
  {
    id: "att-6",
    source: "origin_ru",
    sourceName: "Sandworm Unit",
    target: "ee",
    targetName: "Estonia",
    threatActor: "Sandworm",
    attackType: "Distributed Denial of Service (DDoS)",
    statuteRef: "Estonian Penal Code § 207",
    severity: "critical",
    timestamp: "12:44:24",
  },
  {
    id: "att-7",
    source: "origin_ro",
    sourceName: "Scam Syndicate Hub",
    target: "sg",
    targetName: "Singapore",
    threatActor: "Darkgate Malware Group",
    attackType: "Zero-Day Exploit on Government Portal",
    statuteRef: "Computer Misuse Act Sec 4 (10 yrs)",
    severity: "high",
    timestamp: "12:44:29",
  },
  {
    id: "att-8",
    source: "origin_kp",
    sourceName: "Andariel Group",
    target: "jp",
    targetName: "Japan",
    threatActor: "Andariel Unit",
    attackType: "Defense Contractor Supply Chain Breach",
    statuteRef: "Penal Code Art. 161-2 & Active Defense Bill",
    severity: "high",
    timestamp: "12:44:35",
  },
];

interface TacticalWorldMapProps {
  countries: CountryCyberLaw[];
  selectedCompareIds: string[];
  onSelectCountry: (country: CountryCyberLaw) => void;
  onToggleCompare: (id: string) => void;
}

export const TacticalWorldMap: React.FC<TacticalWorldMapProps> = ({
  countries,
  selectedCompareIds,
  onSelectCountry,
  onToggleCompare,
}) => {
  // Map Layer Mode
  const [mapMode, setMapMode] = useState<"vectors" | "strictness" | "pending">("vectors");

  // Pan and Zoom Transform State
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Active highlighted attack vector in real-time
  const [activeVectorIndex, setActiveVectorIndex] = useState(0);
  const [hoveredNode, setHoveredNode] = useState<NodePosition | null>(null);

  const mapContainerRef = useRef<HTMLDivElement>(null);

  // SVG coordinate dimensions
  const MAP_WIDTH = 1000;
  const MAP_HEIGHT = 500;

  // Project lat/lng to Equirectangular SVG coordinates
  const project = (lat: number, lng: number) => {
    const x = ((lng + 180) * (MAP_WIDTH / 360));
    const y = ((90 - lat) * (MAP_HEIGHT / 180));
    return { x, y };
  };

  // Cycle through live attack vectors
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveVectorIndex((prev) => (prev + 1) % ATTACK_VECTORS_DATA.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const currentVector = ATTACK_VECTORS_DATA[activeVectorIndex];

  // Mouse drag handlers for panning
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

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Zoom controls
  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.3, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.3, 0.8));
  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Node Map lookup
  const nodeMap = useMemo(() => {
    const map = new Map<string, NodePosition>();
    CYBER_NODES.forEach((node) => map.set(node.id, node));
    return map;
  }, []);

  // Compute 3D curved parabolic Bezier arc paths
  const arcPaths = useMemo(() => {
    return ATTACK_VECTORS_DATA.map((vec, idx) => {
      const sourceNode = nodeMap.get(vec.source);
      const targetNode = nodeMap.get(vec.target);
      if (!sourceNode || !targetNode) return null;

      const p1 = project(sourceNode.lat, sourceNode.lng);
      const p2 = project(targetNode.lat, targetNode.lng);

      // Midpoint
      const mx = (p1.x + p2.x) / 2;
      const my = (p1.y + p2.y) / 2;

      // Parabolic Arc height factor based on horizontal distance
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const arcHeight = Math.min(distance * 0.4, 120);

      // 3D elevated parabolic control point
      const cx = mx;
      const cy = my - arcHeight;

      const pathString = `M ${p1.x.toFixed(1)} ${p1.y.toFixed(1)} Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;

      return {
        ...vec,
        pathString,
        sourcePos: p1,
        targetPos: p2,
        isActive: idx === activeVectorIndex,
      };
    }).filter(Boolean);
  }, [nodeMap, activeVectorIndex]);

  // Color helper for Strictness Heatmap Mode
  const getNodeColor = (node: NodePosition) => {
    if (mapMode === "strictness") {
      if (!node.strictness) return "#475569";
      if (node.strictness >= 9.2) return "#f43f5e"; // Crimson (Very High)
      if (node.strictness >= 8.8) return "#fb923c"; // Orange (High)
      if (node.strictness >= 8.3) return "#facc15"; // Amber
      return "#06b6d4"; // Cyan
    }
    if (mapMode === "pending") {
      return (node.pendingCount && node.pendingCount > 0) ? "#f59e0b" : "#334155";
    }
    // Default vectors mode
    return node.type === "threat_origin" ? "#ef4444" : "#00f0ff";
  };

  const handleNodeClick = (node: NodePosition) => {
    if (node.type === "threat_origin") return;
    const country = countries.find((c) => c.id === node.id);
    if (country) {
      onSelectCountry(country);
    }
  };

  return (
    <div className="relative rounded-2xl bg-[#050811] border border-slate-800/90 shadow-2xl overflow-hidden font-sans">
      {/* Top Tactical HUD Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 bg-[#090d19]/90 border-b border-slate-800/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-cyan-400">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className="font-bold tracking-wider uppercase">Live Threat Vector Engine</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>GLOBAL APT TELEMETRY</span>
          </div>
        </div>

        {/* Heatmap Layer Switch Controls */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs">
          <button
            onClick={() => setMapMode("vectors")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
              mapMode === "vectors"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Attack Arcs</span>
          </button>

          <button
            onClick={() => setMapMode("strictness")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
              mapMode === "strictness"
                ? "bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Strictness Heatmap</span>
          </button>

          <button
            onClick={() => setMapMode("pending")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
              mapMode === "pending"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Pending Hotspots</span>
          </button>
        </div>
      </div>

      {/* Map Viewport Area (Scrollable / Draggable 2D Plane) */}
      <div
        ref={mapContainerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={`relative w-full h-[440px] sm:h-[500px] select-none overflow-hidden ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{
          background: "radial-gradient(ellipse at 50% 50%, #0c1326 0%, #060913 100%)",
        }}
      >
        {/* Subtle Radar Scanline Grid Background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Floating Pan/Zoom Tactical HUD Controls */}
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-1.5 bg-slate-950/80 border border-slate-800 p-1.5 rounded-xl backdrop-blur-md">
          <button
            onClick={handleZoomIn}
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleReset}
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title="Reset View"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* SVG Tactical 2D Plane Canvas */}
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
            {/* Glowing filter for attack arcs */}
            <filter id="cyber-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Linear gradient along arcs */}
            <linearGradient id="arc-gradient-red" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#f97316" stopOpacity="1" />
              <stop offset="100%" stopColor="#00f0ff" stopOpacity="0.9" />
            </linearGradient>

            <linearGradient id="arc-gradient-cyan" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {/* Stylized Continental Landmass Outlines (2D Plate Carrée) */}
          <g className="opacity-25 fill-slate-800 stroke-slate-700/60 stroke-[0.8]">
            {/* North America */}
            <path d="M 120 70 L 260 70 L 310 120 L 250 180 L 210 240 L 170 210 L 110 140 Z" />
            {/* South America */}
            <path d="M 270 260 L 350 280 L 340 370 L 300 450 L 260 360 Z" />
            {/* Europe */}
            <path d="M 460 80 L 580 80 L 590 150 L 500 170 L 450 130 Z" />
            {/* Africa */}
            <path d="M 470 180 L 590 190 L 610 320 L 540 430 L 480 340 L 450 240 Z" />
            {/* Asia */}
            <path d="M 590 70 L 880 70 L 890 220 L 780 270 L 680 260 L 600 160 Z" />
            {/* Australia */}
            <path d="M 790 320 L 920 320 L 910 420 L 800 410 Z" />
            {/* Japan Arc */}
            <path d="M 870 140 L 895 160 L 880 200 Z" />
            {/* UK & Ireland */}
            <path d="M 465 110 L 490 110 L 485 140 L 465 135 Z" />
          </g>

          {/* Latitude & Longitude HUD Reference Lines */}
          <g className="stroke-slate-800/40 stroke-[0.5] stroke-dasharray-[4 4]">
            <line x1="0" y1="250" x2="1000" y2="250" /> {/* Equator */}
            <line x1="0" y1="125" x2="1000" y2="125" /> {/* 45° N */}
            <line x1="0" y1="375" x2="1000" y2="375" /> {/* 45° S */}
            <line x1="500" y1="0" x2="500" y2="500" /> {/* Prime Meridian */}
          </g>

          {/* LAYER 1: Animated 3D Parabolic Curved Attack Arcs */}
          {mapMode === "vectors" && (
            <g>
              {arcPaths.map((arc: any) => {
                if (!arc) return null;
                const isCurrent = arc.isActive;

                return (
                  <g key={arc.id}>
                    {/* Background faint trajectory trace */}
                    <path
                      d={arc.pathString}
                      fill="none"
                      stroke={isCurrent ? "#f43f5e" : "#00f0ff"}
                      strokeWidth={isCurrent ? 2.5 : 1}
                      strokeOpacity={isCurrent ? 0.9 : 0.25}
                      strokeDasharray={isCurrent ? "none" : "3 3"}
                      filter={isCurrent ? "url(#cyber-glow)" : undefined}
                    />

                    {/* Active moving projectile particle along the Bezier curve */}
                    {isCurrent && (
                      <circle r="4.5" fill="#ffffff" filter="url(#cyber-glow)">
                        <animateMotion
                          path={arc.pathString}
                          dur="2.4s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    )}

                    {/* Target Impact Radar Wave Pulse */}
                    {isCurrent && (
                      <g
                        transform={`translate(${arc.targetPos.x}, ${arc.targetPos.y})`}
                      >
                        <circle
                          r="6"
                          fill="none"
                          stroke="#f43f5e"
                          strokeWidth="2"
                          opacity="0.9"
                        >
                          <animate
                            attributeName="r"
                            from="4"
                            to="28"
                            dur="1.8s"
                            repeatCount="indefinite"
                          />
                          <animate
                            attributeName="opacity"
                            from="0.9"
                            to="0"
                            dur="1.8s"
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

          {/* LAYER 2: Country / Cyber Nodes */}
          <g>
            {CYBER_NODES.map((node) => {
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
                  {/* Heatmap aura in strictness/pending mode */}
                  {mapMode === "strictness" && node.strictness && (
                    <circle
                      r={node.strictness * 3.5}
                      fill={nodeColor}
                      opacity="0.2"
                      className="animate-pulse"
                    />
                  )}

                  {mapMode === "pending" && node.pendingCount && node.pendingCount > 0 && (
                    <circle
                      r="22"
                      fill="#f59e0b"
                      opacity="0.25"
                      className="animate-ping"
                    />
                  )}

                  {/* Node Outer Ring */}
                  <circle
                    r={isSelected || isHovered ? "8" : "5"}
                    fill="#030712"
                    stroke={nodeColor}
                    strokeWidth={isSelected ? "3" : "1.8"}
                    filter="url(#cyber-glow)"
                    className="transition-all duration-200"
                  />

                  {/* Center Dot */}
                  <circle r="2.5" fill={nodeColor} />

                  {/* Node Technical Label */}
                  <text
                    x="10"
                    y="4"
                    fill={isSelected || isHovered ? "#ffffff" : "#94a3b8"}
                    fontSize={isSelected || isHovered ? "11" : "9"}
                    fontFamily="monospace"
                    fontWeight="bold"
                    letterSpacing="0.05em"
                    className="pointer-events-none select-none transition-all"
                  >
                    {node.code}
                    {mapMode === "strictness" && node.strictness && (
                      <tspan fill="#f43f5e" dx="4">
                        [{node.strictness.toFixed(1)}]
                      </tspan>
                    )}
                    {mapMode === "pending" && node.pendingCount && (
                      <tspan fill="#f59e0b" dx="4">
                        [{node.pendingCount} BILLS]
                      </tspan>
                    )}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>

        {/* Hover Dossier Popover Tooltip */}
        {hoveredNode && (
          <div
            className="absolute bottom-4 left-4 z-30 p-3 rounded-xl bg-slate-950/95 border border-cyan-500/40 shadow-xl max-w-xs backdrop-blur-md pointer-events-none"
          >
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="font-bold text-white text-xs">
                {hoveredNode.name}
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-cyan-300">
                {hoveredNode.code}
              </span>
            </div>
            {hoveredNode.strictness && (
              <div className="text-[11px] font-mono text-slate-300 flex items-center justify-between">
                <span className="text-slate-400">Strictness Index:</span>
                <span className="font-bold text-rose-400">
                  {hoveredNode.strictness.toFixed(1)} / 10
                </span>
              </div>
            )}
            <div className="text-[10px] text-cyan-400 mt-1 font-sans">
              Click to inspect statutory dossier →
            </div>
          </div>
        )}
      </div>

      {/* Bottom Live Threat Telemetry Event Ticker */}
      <div className="px-5 py-3 bg-[#080c16] border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5 truncate max-w-3xl">
          <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30 text-[10px] font-mono font-bold uppercase tracking-wider shrink-0">
            INCIDENT {currentVector.timestamp}
          </span>
          <div className="truncate font-mono text-slate-300">
            <strong className="text-white">{currentVector.threatActor}</strong>{" "}
            <span className="text-rose-400">→</span>{" "}
            <strong className="text-cyan-300">{currentVector.targetName}</strong>:{" "}
            <span className="text-slate-400">{currentVector.attackType}</span> |{" "}
            <span className="text-amber-400 font-semibold">{currentVector.statuteRef}</span>
          </div>
        </div>

        {/* Quick HUD Legends */}
        <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400 shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>Jurisdiction</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span>Threat Node</span>
          </div>
        </div>
      </div>
    </div>
  );
};
