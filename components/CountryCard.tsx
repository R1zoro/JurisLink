"use client";

import React from "react";
import { CountryCyberLaw } from "@/data/countries";
import { Check, Plus, ArrowUpRight } from "lucide-react";

interface CountryCardProps {
  country: CountryCyberLaw;
  isSelectedForCompare: boolean;
  onToggleCompare: (id: string) => void;
  onSelectCountry: (country: CountryCyberLaw) => void;
}

export const CountryCard: React.FC<CountryCardProps> = ({
  country,
  isSelectedForCompare,
  onToggleCompare,
  onSelectCountry,
}) => {
  const getStrictnessStyle = (score: number) => {
    if (score >= 9.2) return "text-[#C2410C] bg-[#FFEDD5] border-[#FED7AA]";
    if (score >= 8.7) return "text-[#B45309] bg-[#FEF3C7] border-[#FDE68A]";
    return "text-[#7C4A27] bg-[#F5F2EB] border-[#EAE5DB]";
  };

  const getScoreBarColor = (score: number) => {
    if (score >= 9.2) return "bg-[#C2410C]";
    if (score >= 8.7) return "bg-[#B45309]";
    return "bg-[#7C4A27]";
  };

  const primaryStatute = country.primaryActs[0];
  const pendingCount = country.pendingOrDraftActs?.length || 0;

  return (
    <div className="editorial-card p-5 flex flex-col justify-between font-sans bg-white border border-[#EAE5DB] rounded-xl hover:border-[#D6CEBF] transition-all shadow-sm">
      <div>
        {/* Header: Flag, Name, Region & Strictness Score */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl select-none" role="img" aria-label={country.country}>
              {country.flag}
            </span>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-base font-bold text-[#1C1917] tracking-tight">
                  {country.country}
                </h3>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#F4EFE6] text-[#78716C] font-semibold">
                  {country.code}
                </span>
              </div>
              <span className="text-xs text-[#78716C]">
                {country.continent}
              </span>
            </div>
          </div>

          {/* Strictness Score Badge */}
          <div
            className={`px-2.5 py-1 rounded-lg border font-mono text-xs font-bold ${getStrictnessStyle(
              country.strictnessScore
            )}`}
          >
            <span>{country.strictnessScore.toFixed(1)} / 10</span>
          </div>
        </div>

        {/* Minimalist Score Bar */}
        <div className="w-full bg-[#F4EFE6] h-1 rounded-full overflow-hidden mb-4">
          <div
            className={`h-full rounded-full transition-all duration-300 ${getScoreBarColor(country.strictnessScore)}`}
            style={{ width: `${(country.strictnessScore / 10) * 100}%` }}
          />
        </div>

        {/* Concise Spec Rows (No inner fragmented boxes, no clipped text) */}
        <div className="space-y-2.5 text-xs mb-4">
          {/* Primary Law */}
          <div className="flex items-start justify-between gap-2 pb-2 border-b border-[#F4EFE6]">
            <span className="text-[#78716C] font-medium shrink-0">Primary Statute</span>
            <span className="text-[#1C1917] font-medium text-right line-clamp-1" title={primaryStatute?.title}>
              {primaryStatute?.title}
            </span>
          </div>

          {/* Maximum Incarceration */}
          <div className="flex items-center justify-between gap-2 pb-2 border-b border-[#F4EFE6]">
            <span className="text-[#78716C] font-medium shrink-0">Max Sentence</span>
            <span className="text-[#C2410C] font-semibold text-right truncate">
              {primaryStatute?.maxPrison}
            </span>
          </div>

          {/* Breach Notice Window */}
          <div className="flex items-center justify-between gap-2 pb-2 border-b border-[#F4EFE6]">
            <span className="text-[#78716C] font-medium shrink-0">Breach Window</span>
            <span className="text-[#1C1917] font-semibold text-right">
              {country.breachReportingHours}
            </span>
          </div>

          {/* AI Legislation Status */}
          <div className="flex items-center justify-between gap-2 pb-2 border-b border-[#F4EFE6]">
            <span className="text-[#78716C] font-medium shrink-0">AI Cyber Law</span>
            <span
              className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded ${
                country.aiCybercrime.status === "enacted"
                  ? "bg-[#E8F0EC] text-[#2D5A43] border border-[#C2D6CC]"
                  : country.aiCybercrime.status === "pending"
                  ? "bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A]"
                  : "bg-[#F4EFE6] text-[#78716C]"
              }`}
            >
              {country.aiCybercrime.status === "enacted"
                ? "Enacted"
                : country.aiCybercrime.status === "pending"
                ? "Pending Bill"
                : "General Statutes"}
            </span>
          </div>

          {/* Legislative Pipeline Status */}
          <div className="flex items-center justify-between gap-2 pt-0.5">
            <span className="text-[#78716C] font-medium shrink-0">Legislative Pipeline</span>
            {pendingCount > 0 ? (
              <span className="text-[11px] font-medium text-[#B45309] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B45309]" />
                <span>{pendingCount} {pendingCount === 1 ? "Bill" : "Bills"} Awaiting Gazette</span>
              </span>
            ) : (
              <span className="text-[11px] text-[#78716C]">Fully Notified</span>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-3 border-t border-[#EAE5DB]">
        <button
          onClick={() => onToggleCompare(country.id)}
          className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
            isSelectedForCompare
              ? "bg-[#7C4A27] text-white shadow-sm"
              : "bg-[#FAF7F2] hover:bg-[#F3EFE6] text-[#1C1917] border border-[#EAE5DB]"
          }`}
        >
          {isSelectedForCompare ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Comparing</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5 text-[#7C4A27]" />
              <span>Compare</span>
            </>
          )}
        </button>

        <button
          onClick={() => onSelectCountry(country)}
          className="flex items-center justify-center gap-1 px-3.5 py-2 rounded-lg text-xs font-medium bg-[#FAF7F2] hover:bg-[#F3EFE6] text-[#78716C] hover:text-[#1C1917] border border-[#EAE5DB] transition-colors"
          title="Inspect statutory dossier"
        >
          <span>Dossier</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
