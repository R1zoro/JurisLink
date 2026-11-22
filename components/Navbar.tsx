"use client";

import React, { useState } from "react";
import { Shield, Scale, Clock, Cpu, Bot, Menu, X, Activity, Sparkles, Terminal } from "lucide-react";

interface NavbarProps {
  activeTab: "matrix" | "compare" | "pending" | "ai" | "assistant";
  setActiveTab: (tab: "matrix" | "compare" | "pending" | "ai" | "assistant") => void;
  selectedCompareCount: number;
  onOpenAssistant: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  selectedCompareCount,
  onOpenAssistant,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "matrix", label: "Threat & Legal Matrix", icon: Activity },
    {
      id: "compare",
      label: `Versus Compare ${selectedCompareCount > 0 ? `[${selectedCompareCount}]` : ""}`,
      icon: Scale,
    },
    { id: "pending", label: "Legislative Pipeline", icon: Clock },
    { id: "ai", label: "AI Cybercrimes", icon: Cpu },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#050812]/95 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Tactical Status */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveTab("matrix")}
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 flex items-center justify-center border border-cyan-500/40 shadow-lg shadow-cyan-500/10 group-hover:scale-105 transition-transform">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-extrabold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                  JURIS<span className="text-cyan-400">LINK</span>
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 hidden sm:inline-block">
                  v2.4 TELEMETRY
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono hidden md:flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                GLOBAL CYBERCRIME & STATUTE INTELLIGENCE
              </p>
            </div>
          </div>

          {/* Tactical Navigation Pills */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-slate-950/70 p-1 rounded-xl border border-slate-800/80">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium tracking-wide transition-all ${
                    isActive
                      ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-sm"
                      : "text-slate-400 hover:text-white hover:bg-slate-900"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-cyan-400" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* AI Intelligence Drawer Button & Mobile Menu */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenAssistant}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-md shadow-cyan-500/20 active:scale-95 transition-all border border-cyan-400/30"
            >
              <Terminal className="w-3.5 h-3.5 text-cyan-200" />
              <span>AI INTEL ASSISTANT</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#070b14] border-b border-slate-800 px-4 pt-3 pb-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as any);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-mono font-medium transition-colors ${
                  isActive
                    ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/40"
                    : "text-slate-300 hover:bg-slate-900"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-cyan-400" />
                  <span>{item.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
