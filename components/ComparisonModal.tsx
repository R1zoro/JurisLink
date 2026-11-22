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
  Building2,
  Terminal,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto font-sans">
      <div className="relative w-full max-w-6xl bg-[#060a14] border border-slate-800 rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/90 bg-[#090d18]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white tracking-tight">
                  Versus Statutory & Strictness Matrix
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                  {countries.length} JURISDICTIONS
                </span>
              </div>
              <p className="text-[11px] font-mono text-slate-400">
                Direct comparative analysis of statutory penalties, reporting mandates, and pending acts
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {countries.length >= 2 && (
              <button
                onClick={() =>
                  onTriggerAICompare(countries.map((c) => c.country))
                }
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-md shadow-cyan-500/20 active:scale-95 transition-all border border-cyan-400/30"
              >
                <Terminal className="w-3.5 h-3.5 text-cyan-200" />
                <span>AI COMPARATIVE BRIEF</span>
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
            <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs font-mono">
              <span className="text-slate-400 text-[11px] uppercase tracking-wider">
                Select Jurisdiction to Compare:
              </span>
              {availableToAdd.slice(0, 6).map((c) => (
                <button
                  key={c.id}
                  onClick={() => onAddCountry(c.id)}
                  className="px-2.5 py-1 rounded bg-slate-900 hover:bg-cyan-950 text-slate-300 hover:text-cyan-300 border border-slate-700/80 transition-colors flex items-center gap-1.5 text-xs"
                >
                  <span>+</span>
                  <span className="font-sans font-bold">{c.country}</span>
                  <span className="text-[10px] text-slate-500">[{c.code}]</span>
                </button>
              ))}
            </div>
          )}

          {countries.length === 0 ? (
            <div className="py-16 text-center text-slate-500 font-mono">
              <Scale className="w-10 h-10 mx-auto text-slate-700 mb-2" />
              <p className="text-xs uppercase tracking-wider text-slate-400">
                No jurisdictions currently staged for comparison.
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                Select 2 or 3 jurisdictions from the global matrix to evaluate side-by-side strictness.
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
                    className="flex flex-col bg-[#080d1a] rounded-xl border border-slate-800 p-4 relative"
                  >
                    {/* Remove button */}
                    <button
                      onClick={() => onRemoveCountry(c.id)}
                      className="absolute top-3 right-3 p-1 rounded-md text-slate-500 hover:text-rose-400 hover:bg-slate-900"
                      title="Remove from comparison"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    {/* Country Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl filter drop-shadow">{c.flag}</span>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-bold text-white text-base tracking-tight">
                            {c.country}
                          </h3>
                          <span className="text-[10px] font-mono px-1 rounded bg-slate-800 text-slate-300">
                            {c.code}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wide">
                          {c.continent}
                        </span>
                      </div>
                    </div>

                    {/* Section 1: Strictness Index */}
                    <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 mb-4 font-mono">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[11px] text-slate-400 flex items-center gap-1 uppercase tracking-wider">
                          <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
                          Strictness Score
                        </span>
                        <span className="text-sm font-bold text-cyan-400">
                          {c.strictnessScore.toFixed(1)} / 10
                        </span>
                      </div>
                      <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden mb-1 border border-slate-800">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 via-amber-500 to-rose-500"
                          style={{ width: `${(c.strictnessScore / 10) * 100}%` }}
                        />
                      </div>
                      <span className="text-[10px] uppercase font-bold text-slate-300">
                        CLASSIFICATION: {c.strictnessRating}
                      </span>
                    </div>

                    {/* Section 2: Statutory Penalty Limits */}
                    <div className="space-y-2.5 mb-4 text-xs font-mono">
                      <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                        <span className="text-slate-400 text-[10px] uppercase tracking-wider block mb-0.5">
                          Maximum Incarceration
                        </span>
                        <span className="font-sans font-semibold text-rose-300">
                          {c.primaryActs[0]?.maxPrison || "Statutory maximums apply"}
                        </span>
                      </div>

                      <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                        <span className="text-slate-400 text-[10px] uppercase tracking-wider block mb-0.5">
                          Financial Penalties & Turnover Fines
                        </span>
                        <span className="font-sans font-semibold text-amber-300">
                          {c.primaryActs[0]?.maxFine || "Civil damages"}
                        </span>
                      </div>

                      <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                        <span className="text-slate-400 text-[10px] uppercase tracking-wider block mb-0.5">
                          Mandatory Breach Window
                        </span>
                        <div className="flex items-center gap-1.5 font-semibold text-cyan-300">
                          <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>{c.breachReportingHours}</span>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                        <span className="text-slate-400 text-[10px] uppercase tracking-wider block mb-0.5">
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
                              ? "Active Cross-Border Scope"
                              : "Domestic Only"}
                          </span>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                        <span className="text-slate-400 text-[10px] uppercase tracking-wider block mb-0.5">
                          Lead Enforcement Authority
                        </span>
                        <div className="flex items-center gap-1.5 text-slate-300 font-sans font-medium">
                          <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="line-clamp-1">{c.leadEnforcementAgency}</span>
                        </div>
                      </div>
                    </div>

                    {/* Section 3: AI Cybercrime Coverage */}
                    <div className="p-3 rounded-lg bg-purple-950/20 border border-purple-800/40 mb-4 text-xs">
                      <div className="flex items-center justify-between mb-1.5 font-mono">
                        <span className="font-bold text-purple-300 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
                          <Cpu className="w-3.5 h-3.5" />
                          AI Law Status
                        </span>
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase ${
                            c.aiCybercrime.status === "enacted"
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                              : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                          }`}
                        >
                          {c.aiCybercrime.status}
                        </span>
                      </div>
                      <p className="text-slate-300 mb-2 leading-relaxed text-[11px]">
                        {c.aiCybercrime.summary}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {c.aiCybercrime.coveredOffenses.map((offense, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-mono bg-purple-900/40 text-purple-200 px-1.5 py-0.5 rounded border border-purple-800/60"
                          >
                            {offense}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Section 4: Available but NOT Notified / Draft Bills */}
                    <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-800/40 text-xs">
                      <div className="flex items-center gap-1.5 font-mono font-bold text-amber-300 mb-1.5 text-[11px] uppercase tracking-wider">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                        <span>Unnotified & Pending Acts</span>
                      </div>
                      {c.pendingOrDraftActs.length > 0 ? (
                        <div className="space-y-2">
                          {c.pendingOrDraftActs.map((act) => (
                            <div
                              key={act.id}
                              className="p-2 rounded bg-slate-950 border border-slate-800"
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-semibold text-slate-200 text-[11px]">
                                  {act.title}
                                </span>
                                <span className="text-[9px] font-mono uppercase px-1 rounded bg-amber-500/20 text-amber-300 font-bold">
                                  {act.status.replace("_", " ")}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-400 leading-relaxed">
                                {act.pendingNoticeDetails || act.summary}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-slate-500 italic text-[11px] font-mono">
                          No pending gazette notifications recorded.
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
