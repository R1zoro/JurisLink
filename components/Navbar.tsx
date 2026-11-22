"use client";

import React, { useState } from "react";
import { Scale, Clock, Cpu, Menu, X, Globe, Sparkles } from "lucide-react";

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
    { id: "pending", label: "Pending & Draft Acts", icon: Clock },
    { id: "ai", label: "AI Cybercrimes", icon: Cpu },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#EAE5DB] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveTab("matrix")}
          >
            <div className="w-8 h-8 rounded-lg bg-[#7C4A27] text-white flex items-center justify-center font-serif font-bold text-base shadow-sm">
              J
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-[#1C1917] tracking-tight">
                  Juris<span className="text-[#7C4A27]">Link</span>
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[#F4EFE6] text-[#7C4A27] border border-[#EAE5DB] hidden sm:inline-block font-semibold">
                  Global Cyber Law
                </span>
              </div>
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
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? "bg-[#F4EFE6] text-[#7C4A27] font-semibold"
                      : "text-[#78716C] hover:text-[#1C1917] hover:bg-[#FAF7F2]"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#7C4A27]" : "text-[#78716C]"}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* AI Assistant Button & Mobile Hamburger */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenAssistant}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#7C4A27] hover:bg-[#63391C] text-white shadow-sm transition-all active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F5F2EB]" />
              <span>AI Legal Assistant</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#78716C] hover:text-[#1C1917] hover:bg-[#F4EFE6]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2] border-b border-[#EAE5DB] px-4 pt-3 pb-4 space-y-1.5">
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
                className={`w-full flex items-center justify-between px-3.5 py-2 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-[#F4EFE6] text-[#7C4A27] font-semibold"
                    : "text-[#78716C] hover:bg-[#F3EFE6]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-[#7C4A27]" />
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
