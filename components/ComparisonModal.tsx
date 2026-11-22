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
  Building2,
  Sparkles,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#1C1917]/50 backdrop-blur-sm overflow-y-auto font-sans">
      <div className="relative w-full max-w-6xl bg-white border border-[#EAE5DB] rounded-2xl shadow-xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EAE5DB] bg-[#FAF7F2]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#F4EFE6] text-[#7C4A27]">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-[#1C1917] tracking-tight">
                  Side-by-Side Legal Strictness Comparison
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F4EFE6] text-[#7C4A27] border border-[#EAE5DB] font-semibold">
                  {countries.length} Jurisdictions
                </span>
              </div>
              <p className="text-xs text-[#78716C]">
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
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#7C4A27] hover:bg-[#63391C] text-white shadow-sm transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Jurisdictional Synthesis</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#78716C] hover:text-[#1C1917] hover:bg-[#F4EFE6] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 bg-[#FBF9F5]">
          {/* Country Selection Header Bar */}
          {countries.length < 3 && (
            <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl bg-white border border-[#EAE5DB] text-xs">
              <span className="text-[#78716C] font-medium">Add to compare:</span>
              {availableToAdd.slice(0, 6).map((c) => (
                <button
                  key={c.id}
                  onClick={() => onAddCountry(c.id)}
                  className="px-2.5 py-1 rounded-md bg-[#FAF7F2] hover:bg-[#F3EFE6] text-[#1C1917] border border-[#EAE5DB] transition-colors flex items-center gap-1.5"
                >
                  <span>+</span>
                  <span className="font-medium">{c.country}</span>
                  <span className="text-[10px] text-[#78716C] font-mono">({c.code})</span>
                </button>
              ))}
            </div>
          )}

          {countries.length === 0 ? (
            <div className="py-16 text-center text-[#78716C]">
              <Scale className="w-10 h-10 mx-auto text-[#A8A29E] mb-2" />
              <p className="text-sm font-medium text-[#1C1917]">
                No jurisdictions currently staged for comparison.
              </p>
              <p className="text-xs text-[#78716C] mt-1">
                Select 2 or 3 jurisdictions from the global matrix to evaluate side-by-side strictness.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <div
                className="grid gap-4 min-w-[650px]"
                style={{
                  gridTemplateColumns: `repeat(${countries.length}, minmax(0, 1fr))`,
                }}
              >
                {countries.map((c) => (
                  <div
                    key={c.id}
                    className="flex flex-col bg-white rounded-xl border border-[#EAE5DB] p-5 relative shadow-sm"
                  >
                    {/* Remove button */}
                    <button
                      onClick={() => onRemoveCountry(c.id)}
                      className="absolute top-3 right-3 p-1 rounded-md text-[#78716C] hover:text-[#C2410C] hover:bg-[#FAF7F2]"
                      title="Remove from comparison"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    {/* Country Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">{c.flag}</span>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-bold text-[#1C1917] text-base tracking-tight">
                            {c.country}
                          </h3>
                          <span className="text-[10px] font-mono px-1 rounded bg-[#F4EFE6] text-[#78716C]">
                            {c.code}
                          </span>
                        </div>
                        <span className="text-xs text-[#78716C]">
                          {c.continent}
                        </span>
                      </div>
                    </div>

                    {/* Section 1: Strictness Index */}
                    <div className="p-3.5 rounded-lg bg-[#FAF7F2] border border-[#EAE5DB] mb-4">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs text-[#78716C] flex items-center gap-1 font-medium">
                          <ShieldAlert className="w-3.5 h-3.5 text-[#7C4A27]" />
                          Strictness Score
                        </span>
                        <span className="text-sm font-bold font-mono text-[#7C4A27]">
                          {c.strictnessScore.toFixed(1)} / 10
                        </span>
                      </div>
                      <div className="w-full bg-[#EAE5DB] h-1.5 rounded-full overflow-hidden mb-1.5">
                        <div
                          className="h-full bg-[#7C4A27] rounded-full"
                          style={{ width: `${(c.strictnessScore / 10) * 100}%` }}
                        />
                      </div>
                      <span className="text-[11px] font-medium text-[#78716C]">
                        Rating: {c.strictnessRating}
                      </span>
                    </div>

                    {/* Section 2: Statutory Penalties */}
                    <div className="space-y-2.5 mb-4 text-xs">
                      <div className="p-2.5 rounded-lg bg-[#FAF7F2] border border-[#EAE5DB]">
                        <span className="text-[#78716C] text-[10px] uppercase tracking-wider block mb-0.5 font-medium">
                          Maximum Incarceration
                        </span>
                        <span className="font-semibold text-[#C2410C]">
                          {c.primaryActs[0]?.maxPrison || "Statutory maximums apply"}
                        </span>
                      </div>

                      <div className="p-2.5 rounded-lg bg-[#FAF7F2] border border-[#EAE5DB]">
                        <span className="text-[#78716C] text-[10px] uppercase tracking-wider block mb-0.5 font-medium">
                          Financial Penalties & Fines
                        </span>
                        <span className="font-semibold text-[#B45309]">
                          {c.primaryActs[0]?.maxFine || "Civil damages"}
                        </span>
                      </div>

                      <div className="p-2.5 rounded-lg bg-[#FAF7F2] border border-[#EAE5DB]">
                        <span className="text-[#78716C] text-[10px] uppercase tracking-wider block mb-0.5 font-medium">
                          Mandatory Breach Notice
                        </span>
                        <div className="flex items-center gap-1.5 font-semibold text-[#1C1917]">
                          <Clock className="w-3.5 h-3.5 text-[#7C4A27] shrink-0" />
                          <span>{c.breachReportingHours}</span>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-lg bg-[#FAF7F2] border border-[#EAE5DB]">
                        <span className="text-[#78716C] text-[10px] uppercase tracking-wider block mb-0.5 font-medium">
                          Extraterritorial Reach
                        </span>
                        <div className="flex items-center gap-1.5 font-semibold">
                          <Globe className="w-3.5 h-3.5 text-[#7C4A27]" />
                          <span
                            className={
                              c.extraterritorialReach
                                ? "text-[#2D5A43]"
                                : "text-[#78716C]"
                            }
                          >
                            {c.extraterritorialReach
                              ? "Active Cross-Border Scope"
                              : "Domestic Only"}
                          </span>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-lg bg-[#FAF7F2] border border-[#EAE5DB]">
                        <span className="text-[#78716C] text-[10px] uppercase tracking-wider block mb-0.5 font-medium">
                          Lead Enforcement Authority
                        </span>
                        <div className="flex items-center gap-1.5 text-[#1C1917] font-medium">
                          <Building2 className="w-3.5 h-3.5 text-[#78716C] shrink-0" />
                          <span className="line-clamp-1">{c.leadEnforcementAgency}</span>
                        </div>
                      </div>
                    </div>

                    {/* Section 3: AI Cybercrime Coverage */}
                    <div className="p-3 rounded-lg bg-[#FAF7F2] border border-[#EAE5DB] mb-4 text-xs">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-[#1C1917] flex items-center gap-1.5 text-xs">
                          <Cpu className="w-3.5 h-3.5 text-[#7C4A27]" />
                          AI Law Status
                        </span>
                        <span
                          className={`text-[10px] font-semibold px-1.5 py-0.2 rounded uppercase ${
                            c.aiCybercrime.status === "enacted"
                              ? "bg-[#E8F0EC] text-[#2D5A43] border border-[#C2D6CC]"
                              : "bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A]"
                          }`}
                        >
                          {c.aiCybercrime.status}
                        </span>
                      </div>
                      <p className="text-[#78716C] mb-2 leading-relaxed text-xs">
                        {c.aiCybercrime.summary}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {c.aiCybercrime.coveredOffenses.map((offense, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] bg-white text-[#78716C] px-1.5 py-0.5 rounded border border-[#EAE5DB]"
                          >
                            {offense}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Section 4: Pending / Draft Acts */}
                    <div className="p-3 rounded-lg bg-[#FEF3C7]/40 border border-[#FDE68A] text-xs">
                      <div className="flex items-center gap-1.5 font-bold text-[#B45309] mb-1.5 text-xs">
                        <AlertTriangle className="w-3.5 h-3.5 text-[#B45309]" />
                        <span>Unnotified & Pending Acts</span>
                      </div>
                      {c.pendingOrDraftActs.length > 0 ? (
                        <div className="space-y-2">
                          {c.pendingOrDraftActs.map((act) => (
                            <div
                              key={act.id}
                              className="p-2 rounded bg-white border border-[#EAE5DB]"
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-semibold text-[#1C1917] text-xs">
                                  {act.title}
                                </span>
                                <span className="text-[9px] font-mono uppercase px-1 rounded bg-[#FEF3C7] text-[#B45309] font-bold">
                                  {act.status.replace("_", " ")}
                                </span>
                              </div>
                              <p className="text-[11px] text-[#78716C] leading-relaxed">
                                {act.pendingNoticeDetails || act.summary}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-[#78716C] italic text-xs">
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
