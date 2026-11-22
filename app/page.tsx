"use client";

import React, { useState, useMemo } from "react";
import { COUNTRIES_DATA, CountryCyberLaw } from "@/data/countries";
import { Navbar } from "@/components/Navbar";
import { CountryCard } from "@/components/CountryCard";
import { TacticalWorldMap } from "@/components/TacticalWorldMap";
import { ComparisonModal } from "@/components/ComparisonModal";
import { PendingLawsView } from "@/components/PendingLawsView";
import { AICybercrimesView } from "@/components/AICybercrimesView";
import { AIAssistantDrawer } from "@/components/AIAssistantDrawer";
import { CountryDetailModal } from "@/components/CountryDetailModal";
import {
  Search,
  Scale,
  Shield,
  Filter,
  AlertTriangle,
  ArrowRight,
  Activity,
  Layers,
  Radio,
} from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<
    "matrix" | "compare" | "pending" | "ai" | "assistant"
  >("matrix");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContinent, setSelectedContinent] = useState<string>("All");
  const [pendingOnly, setPendingOnly] = useState(false);
  const [selectedCompareIds, setSelectedCompareIds] = useState<string[]>([
    "in",
    "us",
  ]);
  const [inspectCountry, setInspectCountry] = useState<CountryCyberLaw | null>(
    null
  );
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [assistantPrompt, setAssistantPrompt] = useState("");

  const continents = [
    "All",
    "Asia-Pacific",
    "Europe",
    "North America",
    "Middle East",
    "Africa",
  ];

  // Filtering Logic
  const filteredCountries = useMemo(() => {
    return COUNTRIES_DATA.filter((country) => {
      const matchesSearch =
        country.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        country.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        country.leadEnforcementAgency
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        country.primaryActs.some((act) =>
          act.title.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        country.pendingOrDraftActs.some((act) =>
          act.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesContinent =
        selectedContinent === "All" || country.continent === selectedContinent;

      const matchesPending =
        !pendingOnly ||
        (country.pendingOrDraftActs && country.pendingOrDraftActs.length > 0);

      return matchesSearch && matchesContinent && matchesPending;
    });
  }, [searchQuery, selectedContinent, pendingOnly]);

  const toggleCompare = (id: string) => {
    setSelectedCompareIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        if (prev.length >= 3) {
          alert("You can compare up to 3 countries simultaneously.");
          return prev;
        }
        return [...prev, id];
      }
    });
  };

  const removeCompare = (id: string) => {
    setSelectedCompareIds((prev) => prev.filter((item) => item !== id));
  };

  const addCompare = (id: string) => {
    if (selectedCompareIds.length < 3 && !selectedCompareIds.includes(id)) {
      setSelectedCompareIds((prev) => [...prev, id]);
    }
  };

  const selectedCompareCountries = useMemo(() => {
    return COUNTRIES_DATA.filter((c) => selectedCompareIds.includes(c.id));
  }, [selectedCompareIds]);

  const triggerAIPrompt = (promptText: string) => {
    setAssistantPrompt(promptText);
    setIsAssistantOpen(true);
  };

  const triggerAICompare = (countryNames: string[]) => {
    const prompt = `Conduct an exhaustive comparative analysis between ${countryNames.join(
      " and "
    )} regarding cybercrime statutes, maximum prison sentences, financial penalties, mandatory breach notification deadlines, and pending draft legislation.`;
    triggerAIPrompt(prompt);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#030712] text-slate-100 font-sans">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedCompareCount={selectedCompareIds.length}
        onOpenAssistant={() => setIsAssistantOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {/* Render Tab 1: Global Threat & Legal Matrix */}
        {activeTab === "matrix" && (
          <div className="space-y-6">
            {/* Top Interactive 2D Tactical World Map & Threat Engine */}
            <section aria-label="Interactive Threat Map">
              <TacticalWorldMap
                countries={COUNTRIES_DATA}
                selectedCompareIds={selectedCompareIds}
                onSelectCountry={(c) => setInspectCountry(c)}
                onToggleCompare={toggleCompare}
              />
            </section>

            {/* Tactical Search & Filter Control Bar */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-4 rounded-xl bg-[#090d19]/80 border border-slate-800 backdrop-blur-md">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by jurisdiction, statute (CFAA, IT Act, NIS2, BNS), or agency..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              {/* Continent Filter Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
                {continents.map((cont) => (
                  <button
                    key={cont}
                    onClick={() => setSelectedContinent(cont)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-colors ${
                      selectedContinent === cont
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                        : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                    }`}
                  >
                    {cont}
                  </button>
                ))}
              </div>

              {/* Pending Acts Filter Toggle */}
              <button
                onClick={() => setPendingOnly(!pendingOnly)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold whitespace-nowrap transition-all ${
                  pendingOnly
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-md shadow-amber-950/20"
                    : "bg-slate-950 text-slate-400 hover:text-amber-400 border border-slate-800"
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span>UNNOTIFIED BILLS ONLY</span>
              </button>
            </div>

            {/* Country Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredCountries.map((country) => (
                <CountryCard
                  key={country.id}
                  country={country}
                  isSelectedForCompare={selectedCompareIds.includes(country.id)}
                  onToggleCompare={toggleCompare}
                  onSelectCountry={(c) => setInspectCountry(c)}
                />
              ))}
            </div>

            {filteredCountries.length === 0 && (
              <div className="py-16 text-center text-slate-500 bg-slate-950/40 rounded-2xl border border-dashed border-slate-800 font-mono">
                <Filter className="w-8 h-8 mx-auto mb-2 text-slate-600" />
                <p className="text-xs uppercase tracking-wider">
                  No jurisdictions match current telemetry filter.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedContinent("All");
                    setPendingOnly(false);
                  }}
                  className="mt-2 text-xs text-cyan-400 hover:underline uppercase"
                >
                  [ Reset Filters ]
                </button>
              </div>
            )}
          </div>
        )}

        {/* Render Tab 2: Compare View */}
        {activeTab === "compare" && (
          <div className="space-y-4">
            <ComparisonModal
              countries={selectedCompareCountries}
              allCountries={COUNTRIES_DATA}
              onClose={() => setActiveTab("matrix")}
              onRemoveCountry={removeCompare}
              onAddCountry={addCompare}
              onTriggerAICompare={triggerAICompare}
            />
          </div>
        )}

        {/* Render Tab 3: Legislative Pipeline View */}
        {activeTab === "pending" && (
          <PendingLawsView
            countries={COUNTRIES_DATA}
            onTriggerAIPrompt={triggerAIPrompt}
          />
        )}

        {/* Render Tab 4: AI Cybercrimes View */}
        {activeTab === "ai" && (
          <AICybercrimesView
            countries={COUNTRIES_DATA}
            onTriggerAIPrompt={triggerAIPrompt}
          />
        )}
      </main>

      {/* Floating Bottom Comparison HUD Dock */}
      {selectedCompareIds.length > 0 && activeTab !== "compare" && (
        <aside
          aria-label="Selected comparison jurisdictions"
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 w-[95%] max-w-xl bg-[#090d19]/95 border border-cyan-500/50 rounded-2xl shadow-2xl shadow-cyan-950/50 p-3 backdrop-blur-md flex items-center justify-between gap-3 font-mono"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white tracking-wide uppercase">
                  Versus Compare
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  {selectedCompareIds.length}/3 SELECTED
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                {selectedCompareCountries.map((c) => (
                  <span key={c.id} className="text-xs text-slate-300 font-semibold" title={c.country}>
                    [{c.code}]
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedCompareIds([])}
              className="text-[11px] text-slate-400 hover:text-slate-200 px-2 py-1"
            >
              Clear
            </button>
            <button
              onClick={() => setActiveTab("compare")}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-md shadow-cyan-500/20 active:scale-95 transition-all"
            >
              <span>Side-by-Side View</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </aside>
      )}

      {/* Country Detail Modal */}
      <CountryDetailModal
        country={inspectCountry}
        onClose={() => setInspectCountry(null)}
        onAddToCompare={addCompare}
        onTriggerAIPrompt={triggerAIPrompt}
      />

      {/* AI Assistant Drawer */}
      <AIAssistantDrawer
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        initialPrompt={assistantPrompt}
        onClearInitialPrompt={() => setAssistantPrompt("")}
      />

      {/* Tactical Footer */}
      <footer className="mt-auto border-t border-slate-900 bg-[#02050c] py-6 text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-400 tracking-wider">JURISLINK</span>
            <span>—</span>
            <span>Global Cyber Threat & Legal Strictness Matrix</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Next.js 14 Engine</span>
            <span>•</span>
            <span className="text-cyan-400">Groq Llama-3.3 + Tavily Search</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
