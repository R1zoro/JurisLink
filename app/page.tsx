"use client";

import React, { useState, useMemo } from "react";
import { COUNTRIES_DATA, CountryCyberLaw } from "@/data/countries";
import { Navbar } from "@/components/Navbar";
import { CountryCard } from "@/components/CountryCard";
import { WorldLegalMap } from "@/components/WorldLegalMap";
import { ComparisonModal } from "@/components/ComparisonModal";
import { PendingLawsView } from "@/components/PendingLawsView";
import { AICybercrimesView } from "@/components/AICybercrimesView";
import { AIAssistantDrawer } from "@/components/AIAssistantDrawer";
import { CountryDetailModal } from "@/components/CountryDetailModal";
import {
  Search,
  Scale,
  Filter,
  AlertTriangle,
  ArrowRight,
  LayoutGrid,
  Table as TableIcon,
  BookOpen,
  Check,
  Plus,
} from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<
    "matrix" | "compare" | "pending" | "ai" | "assistant"
  >("matrix");

  const [layoutView, setLayoutView] = useState<"grid" | "table">("grid");
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
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#1C1917] font-sans">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedCompareCount={selectedCompareIds.length}
        onOpenAssistant={() => setIsAssistantOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {/* Render Tab 1: Global Matrix */}
        {activeTab === "matrix" && (
          <div className="space-y-6">
            {/* Top Interactive 2D World Map */}
            <section aria-label="Interactive World Map">
              <WorldLegalMap
                countries={COUNTRIES_DATA}
                selectedCompareIds={selectedCompareIds}
                onSelectCountry={(c) => setInspectCountry(c)}
                onToggleCompare={toggleCompare}
              />
            </section>

            {/* Filter and Search Bar */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-4 rounded-xl bg-white border border-[#EAE5DB] shadow-sm">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#78716C] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by country, statute (CFAA, IT Act, NIS2, BNS), or agency..."
                  className="w-full bg-[#FAF7F2] border border-[#EAE5DB] rounded-lg pl-10 pr-4 py-2 text-xs text-[#1C1917] placeholder-[#78716C] focus:outline-none focus:border-[#7C4A27] transition-colors"
                />
              </div>

              {/* Continent Filter Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
                {continents.map((cont) => (
                  <button
                    key={cont}
                    onClick={() => setSelectedContinent(cont)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                      selectedContinent === cont
                        ? "bg-[#7C4A27] text-white shadow-sm"
                        : "bg-[#FAF7F2] text-[#78716C] hover:text-[#1C1917] border border-[#EAE5DB]"
                    }`}
                  >
                    {cont}
                  </button>
                ))}
              </div>

              {/* Pending Acts Filter Toggle & View Switcher */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPendingOnly(!pendingOnly)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    pendingOnly
                      ? "bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A] shadow-sm"
                      : "bg-[#FAF7F2] text-[#78716C] hover:text-[#1C1917] border border-[#EAE5DB]"
                  }`}
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-[#B45309]" />
                  <span>Pending Bills Only</span>
                </button>

                {/* Grid vs Table View Switcher */}
                <div className="flex items-center p-0.5 rounded-lg bg-[#FAF7F2] border border-[#EAE5DB]">
                  <button
                    onClick={() => setLayoutView("grid")}
                    className={`p-1.5 rounded-md transition-all ${
                      layoutView === "grid"
                        ? "bg-white text-[#7C4A27] shadow-sm"
                        : "text-[#78716C] hover:text-[#1C1917]"
                    }`}
                    title="Executive Cards Grid View"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setLayoutView("table")}
                    className={`p-1.5 rounded-md transition-all ${
                      layoutView === "table"
                        ? "bg-white text-[#7C4A27] shadow-sm"
                        : "text-[#78716C] hover:text-[#1C1917]"
                    }`}
                    title="Executive Consolidated Table View"
                  >
                    <TableIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* View Mode 1: Country Cards Grid */}
            {layoutView === "grid" && (
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
            )}

            {/* View Mode 2: Executive Consolidated Table View */}
            {layoutView === "table" && (
              <div className="bg-white rounded-2xl border border-[#EAE5DB] shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#FAF7F2] border-b border-[#EAE5DB] text-[#78716C] uppercase font-bold text-[10px] tracking-wider">
                        <th className="py-3 px-4">Jurisdiction</th>
                        <th className="py-3 px-3">Strictness</th>
                        <th className="py-3 px-4">Core Legal Verdict</th>
                        <th className="py-3 px-3">Notice Window</th>
                        <th className="py-3 px-3">Max Sentence</th>
                        <th className="py-3 px-3">AI Law</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F4EFE6]">
                      {filteredCountries.map((c) => {
                        const isComparing = selectedCompareIds.includes(c.id);
                        return (
                          <tr
                            key={c.id}
                            className="hover:bg-[#FAF7F2]/60 transition-colors cursor-pointer"
                            onClick={() => setInspectCountry(c)}
                          >
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#F4EFE6] text-[#7C4A27] border border-[#EAE5DB]">
                                  {c.code}
                                </span>
                                <div>
                                  <div className="font-bold text-[#1C1917]">{c.country}</div>
                                  <div className="text-[10px] text-[#78716C]">{c.continent}</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-3 whitespace-nowrap">
                              <span className="font-mono font-bold text-[#C2410C]">
                                {c.strictnessScore.toFixed(1)} / 10
                              </span>
                              <div className="text-[9px] uppercase font-semibold text-[#78716C]">
                                {c.strictnessRating}
                              </div>
                            </td>
                            <td className="py-3 px-4 text-[#44403C] max-w-sm">
                              <p className="line-clamp-2 leading-relaxed">
                                {c.executiveVerdict}
                              </p>
                            </td>
                            <td className="py-3 px-3 font-semibold text-[#1C1917] whitespace-nowrap">
                              {c.breachPill}
                            </td>
                            <td className="py-3 px-3 font-semibold text-[#C2410C] whitespace-nowrap">
                              {c.penaltyPill}
                            </td>
                            <td className="py-3 px-3 whitespace-nowrap">
                              <span
                                className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                                  c.aiCybercrime.status === "enacted"
                                    ? "bg-[#E8F0EC] text-[#2D5A43] border border-[#C2D6CC]"
                                    : "bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A]"
                                }`}
                              >
                                {c.aiLawPill}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => toggleCompare(c.id)}
                                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                                    isComparing
                                      ? "bg-[#7C4A27] text-white"
                                      : "bg-[#FAF7F2] hover:bg-[#F3EFE6] text-[#1C1917] border border-[#EAE5DB]"
                                  }`}
                                >
                                  {isComparing ? "Comparing" : "+ Compare"}
                                </button>
                                <button
                                  onClick={() => setInspectCountry(c)}
                                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#FAF7F2] hover:bg-[#F3EFE6] text-[#7C4A27] border border-[#EAE5DB]"
                                >
                                  Dossier
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {filteredCountries.length === 0 && (
              <div className="py-16 text-center text-[#78716C] bg-white rounded-2xl border border-dashed border-[#EAE5DB]">
                <Filter className="w-8 h-8 mx-auto mb-2 text-[#A8A29E]" />
                <p className="text-xs uppercase tracking-wider text-[#1C1917]">
                  No jurisdictions match current filter.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedContinent("All");
                    setPendingOnly(false);
                  }}
                  className="mt-2 text-xs text-[#7C4A27] hover:underline"
                >
                  Reset all filters
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

      {/* Floating Bottom Comparison Dock */}
      {selectedCompareIds.length > 0 && activeTab !== "compare" && (
        <aside
          aria-label="Selected comparison jurisdictions"
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 w-[95%] max-w-lg bg-white/95 border border-[#EAE5DB] rounded-2xl shadow-lg p-3 backdrop-blur-md flex items-center justify-between gap-3 font-sans"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#F4EFE6] text-[#7C4A27]">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-[#1C1917]">
                  Versus Compare
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#F4EFE6] text-[#7C4A27] font-semibold border border-[#EAE5DB]">
                  {selectedCompareIds.length}/3
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                {selectedCompareCountries.map((c) => (
                  <span key={c.id} className="text-xs text-[#78716C] font-mono" title={c.country}>
                    {c.code}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedCompareIds([])}
              className="text-xs text-[#78716C] hover:text-[#1C1917] px-2 py-1"
            >
              Clear
            </button>
            <button
              onClick={() => setActiveTab("compare")}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#7C4A27] hover:bg-[#63391C] text-white shadow-sm transition-all"
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

      {/* Minimalist Editorial Footer */}
      <footer className="mt-auto border-t border-[#EAE5DB] bg-[#FAF7F2] py-6 text-xs text-[#78716C]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#1C1917]">JurisLink</span>
            <span>—</span>
            <span>Global Cybercrime Law & Statutory Strictness Platform</span>
          </div>
          <div className="flex items-center gap-4 text-[#78716C]">
            <span>Next.js 14</span>
            <span>•</span>
            <span className="text-[#7C4A27]">Groq Neural Inference & Tavily Grounded</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
