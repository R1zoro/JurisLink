"use client";

import React from "react";
import { CountryCyberLaw } from "@/data/countries";
import {
  Scale,
  X,
  ShieldAlert,
  Clock,
  Globe,
  AlertTriangle,
  Cpu,
  Sparkles,
  CheckCircle,
  Building2,
} from "lucide-react";

interface ComparisonModalProps {
  countries: CountryCyberLaw[];
  allCountries: CountryCyberLaw[];
  onClose: () => void;
  onRemoveCountry: (id: string) => void;
  onAddCountry: (id: string) => void;
  onTriggerAICompare: (countryNames: string[]) => void;
}

export const ComparisonModal: React.FC<ComparisonModalProps> = ({
  countries,
  allCountries,
  onClose,
  onRemoveCountry,
  onAddCountry,
  onTriggerAICompare,
}) => {
  const availableToAdd = allCountries.filter(
    (c) => !countries.some((selected) => selected.id === c.id)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Side-by-Side Cyber Law & Strictness Comparison
              </h2>
              <p className="text-xs text-slate-400">
                Comparative analysis of statutory penalties, reporting mandates, and pending acts
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {countries.length >= 2 && (
              <button
                onClick={() =>
                  onTriggerAICompare(countries.map((c) => c.country))
                }
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white shadow-md shadow-cyan-500/20 active:scale-95 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
                <span>AI Jurisdictional Synthesis</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          {/* Country Selection Header Bar */}
          {countries.length < 3 && (
            <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl bg-slate-950/50 border border-slate-800 text-xs">
              <span className="text-slate-400 font-medium">Add to compare:</span>
              {availableToAdd.slice(0, 6).map((c) => (
                <button
                  key={c.id}
                  onClick={() => onAddCountry(c.id)}
                  className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-cyan-900/40 text-slate-300 hover:text-cyan-300 border border-slate-700 transition-colors"
                >
                  + {c.flag} {c.country}
                </button>
              ))}
            </div>
          )}

          {countries.length === 0 ? (
            <div className="py-16 text-center text-slate-400">
              <Scale className="w-12 h-12 mx-auto text-slate-600 mb-3" />
              <p className="text-base font-semibold text-slate-300">
                No countries selected for comparison.
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Select 2 or 3 countries from the matrix to view side-by-side legal strictness.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              {/* Responsive Grid Table */}
              <div
                className="grid gap-4 min-w-[650px]"
                style={{
                  gridTemplateColumns: `repeat(${countries.length}, minmax(0, 1fr))`,
                }}
              >
                {/* Column for each selected country */}
                {countries.map((c) => (
                  <div
                    key={c.id}
                    className="flex flex-col bg-slate-950/60 rounded-xl border border-slate-800 p-4 relative"
                  >
                    {/* Remove button */}
                    <button
                      onClick={() => onRemoveCountry(c.id)}
                      className="absolute top-3 right-3 p-1 rounded-md text-slate-500 hover:text-rose-400 hover:bg-slate-800"
                      title="Remove from comparison"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    {/* Country Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl">{c.flag}</span>
                      <div>
                        <h3 className="font-bold text-white text-base">{c.country}</h3>
                        <span className="text-xs text-slate-400">{c.continent}</span>
                      </div>
                    </div>

                    {/* Section 1: Strictness Index */}
                    <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 mb-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                          <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
                          Strictness Score
                        </span>
                        <span className="text-sm font-bold font-mono text-cyan-400">
                          {c.strictnessScore.toFixed(1)} / 10
                        </span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-1">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-rose-500"
                          style={{ width: `${(c.strictnessScore / 10) * 100}%` }}
                        />
                      </div>
                      <span className="text-[11px] font-semibold text-slate-300">
                        Rating: {c.strictnessRating}
                      </span>
                    </div>

                    {/* Section 2: Statutory Penalty Limits */}
                    <div className="space-y-3 mb-4 text-xs">
                      <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80">
                        <span className="text-slate-400 font-medium block mb-1">
                          Max Incarceration
                        </span>
                        <span className="font-semibold text-rose-300">
                          {c.primaryActs[0]?.maxPrison || "Statutory maximums apply"}
                        </span>
                      </div>

                      <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80">
                        <span className="text-slate-400 font-medium block mb-1">
                          Max Fines & Turnover Penalties
                        </span>
                        <span className="font-semibold text-amber-300">
                          {c.primaryActs[0]?.maxFine || "Civil damages"}
                        </span>
                      </div>

                      <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80">
                        <span className="text-slate-400 font-medium block mb-1">
                          Breach Reporting Window
                        </span>
                        <div className="flex items-center gap-1.5 font-semibold text-cyan-300">
                          <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>{c.breachReportingHours}</span>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80">
                        <span className="text-slate-400 font-medium block mb-1">
                          Extraterritorial Jurisdiction
                        </span>
                        <div className="flex items-center gap-1.5 font-semibold">
                          <Globe className="w-3.5 h-3.5 text-blue-400" />
                          <span
                            className={
                              c.extraterritorialReach
                                ? "text-emerald-400"
                                : "text-slate-400"
                            }
                          >
                            {c.extraterritorialReach
                              ? "Yes (Active cross-border reach)"
                              : "Domestic only"}
                          </span>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80">
                        <span className="text-slate-400 font-medium block mb-1">
                          Lead Enforcement Agency
                        </span>
                        <div className="flex items-center gap-1.5 text-slate-300 font-medium">
                          <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="line-clamp-1">{c.leadEnforcementAgency}</span>
                        </div>
                      </div>
                    </div>

                    {/* Section 3: AI Cybercrime Coverage */}
                    <div className="p-3 rounded-lg bg-purple-950/20 border border-purple-800/40 mb-4 text-xs">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-purple-300 flex items-center gap-1.5">
                          <Cpu className="w-3.5 h-3.5" />
                          AI Law Coverage
                        </span>
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            c.aiCybercrime.status === "enacted"
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                              : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                          }`}
                        >
                          {c.aiCybercrime.status.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-slate-300 mb-2 leading-relaxed">
                        {c.aiCybercrime.summary}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {c.aiCybercrime.coveredOffenses.map((offense, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] bg-purple-900/40 text-purple-200 px-2 py-0.5 rounded border border-purple-800/60"
                          >
                            {offense}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Section 4: Available but NOT Notified / Draft Bills */}
                    <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-800/40 text-xs">
                      <div className="flex items-center gap-1.5 font-bold text-amber-300 mb-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                        <span>Pending / Unnotified Acts</span>
                      </div>
                      {c.pendingOrDraftActs.length > 0 ? (
                        <div className="space-y-2">
                          {c.pendingOrDraftActs.map((act) => (
                            <div
                              key={act.id}
                              className="p-2 rounded bg-slate-900/80 border border-slate-800"
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-semibold text-slate-200">
                                  {act.title}
                                </span>
                                <span className="text-[9px] uppercase px-1 rounded bg-amber-500/20 text-amber-300 font-bold">
                                  {act.status.replace("_", " ")}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-400">
                                {act.pendingNoticeDetails || act.summary}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-slate-400 italic text-[11px]">
                          No pending gazette notifications currently recorded.
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
