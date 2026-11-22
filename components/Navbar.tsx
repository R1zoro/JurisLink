"use client";

import React, { useState } from "react";
import { Shield, Scale, Clock, Cpu, Bot, Menu, X, Globe, Sparkles } from "lucide-react";

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
    { id: "matrix", label: "Global Matrix", icon: Globe },
    {
      id: "compare",
      label: `Compare ${selectedCompareCount > 0 ? `(${selectedCompareCount})` : ""}`,
      icon: Scale,
    },
    { id: "pending", label: "Pending & Draft Laws", icon: Clock },
    { id: "ai", label: "AI Cybercrimes", icon: Cpu },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#080c14]/90 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveTab("matrix")}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                  Juris<span className="text-cyan-400">Link</span>
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-800/60 hidden sm:inline-block">
                  Cybercrime Lexis
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono hidden md:block">
                Global Cyber Law & Enforcement Matrix
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-sm"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-cyan-400" : "text-slate-400"}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* AI Assistant CTA & Mobile Toggle */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenAssistant}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/30 active:scale-95 transition-all"
            >
              <Sparkles className="w-4 h-4 text-cyan-200 animate-pulse" />
              <span>AI Legal Assistant</span>
            </button>

            {/* Mobile Hamburger Button */}
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
        <div className="lg:hidden bg-[#0c121e] border-b border-slate-800 px-4 pt-3 pb-4 space-y-2">
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
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30"
                    : "text-slate-300 hover:bg-slate-800/70"
                }`}
              >
                <div className="flex items-center gap-3">
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
