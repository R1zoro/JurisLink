"use client";

import React from "react";
import { CountryCyberLaw } from "@/data/countries";
import { Check, Plus, ArrowUpRight, Clock, ShieldAlert, Cpu } from "lucide-react";

interface CountryCardProps {
  country: CountryCyberLaw;
  isSelectedForCompare: boolean;
  onToggleCompare: (id: string) => void;
  onSelectCountry: (country: CountryCyberLaw) => void;
}

// Clean cross-platform country flag / badge styling to prevent Windows emoji fallback text glitches
const COUNTRY_BADGES: Record<string, { label: string; accent: string }> = {
  in: { label: "IND", accent: "bg-[#FF9933]/15 text-[#B45309] border-[#FF9933]/40" },
  us: { label: "USA", accent: "bg-[#1E3A8A]/10 text-[#1E3A8A] border-[#1E3A8A]/30" },
  eu: { label: "EU", accent: "bg-[#1E40AF]/10 text-[#1E40AF] border-[#1E40AF]/30" },
  uk: { label: "GBR", accent: "bg-[#991B1B]/10 text-[#991B1B] border-[#991B1B]/30" },
  sg: { label: "SGP", accent: "bg-[#DC2626]/10 text-[#DC2626] border-[#DC2626]/30" },
  cn: { label: "CHN", accent: "bg-[#B91C1C]/10 text-[#B91C1C] border-[#B91C1C]/30" },
  ae: { label: "ARE", accent: "bg-[#047857]/10 text-[#047857] border-[#047857]/30" },
  au: { label: "AUS", accent: "bg-[#0369A1]/10 text-[#0369A1] border-[#0369A1]/30" },
  ca: { label: "CAN", accent: "bg-[#DC2626]/10 text-[#DC2626] border-[#DC2626]/30" },
  ee: { label: "EST", accent: "bg-[#0284C7]/10 text-[#0284C7] border-[#0284C7]/30" },
  jp: { label: "JPN", accent: "bg-[#DC2626]/10 text-[#DC2626] border-[#DC2626]/30" },
  za: { label: "ZAF", accent: "bg-[#047857]/10 text-[#047857] border-[#047857]/30" },
};

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

  // Concise penalty format without sprawling caveats
  const getConcisePenalty = (fullPenalty: string) => {
    if (!fullPenalty) return "Statutory Maximum";
    if (fullPenalty.toLowerCase().includes("life")) return "Life Imprisonment";
    if (fullPenalty.toLowerCase().includes("20 year")) return "Up to 20 Years";
    if (fullPenalty.toLowerCase().includes("15 year")) return "Up to 15 Years";
    if (fullPenalty.toLowerCase().includes("10 year")) return "Up to 10 Years";
    if (fullPenalty.toLowerCase().includes("7 year")) return "Up to 7 Years";
    if (fullPenalty.toLowerCase().includes("5 year")) return "Up to 5 Years";
    if (fullPenalty.toLowerCase().includes("officer") || fullPenalty.toLowerCase().includes("ban")) return "Executive Disqualification";
    return fullPenalty.split("(")[0].trim();
  };

  const primaryStatute = country.primaryActs[0];
  const pendingCount = country.pendingOrDraftActs?.length || 0;
  const badgeInfo = COUNTRY_BADGES[country.id] || { label: country.code, accent: "bg-[#F4EFE6] text-[#78716C] border-[#EAE5DB]" };

  return (
    <div className="editorial-card p-5 flex flex-col justify-between font-sans bg-white border border-[#EAE5DB] rounded-xl hover:border-[#D6CEBF] transition-all shadow-sm">
      <div>
        {/* Header: Styled Country Badge, Title & Strictness */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <span
              className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-md border ${badgeInfo.accent}`}
            >
              {badgeInfo.label}
            </span>
            <div>
              <h3 className="text-base font-bold text-[#1C1917] tracking-tight leading-tight">
                {country.country}
              </h3>
              <span className="text-[11px] text-[#78716C]">
                {country.continent}
              </span>
            </div>
          </div>

          {/* Strictness Score Pill */}
          <div
            className={`px-2 py-0.5 rounded-lg border font-mono text-xs font-bold ${getStrictnessStyle(
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

        {/* Core Statute Title (Full, unclipped) */}
        <div className="mb-3.5 pb-3 border-b border-[#F4EFE6]">
          <span className="text-[10px] uppercase font-semibold tracking-wider text-[#78716C] block mb-1">
            Governing Statute
          </span>
          <div className="text-xs font-semibold text-[#1C1917] leading-snug">
            {primaryStatute?.title}
          </div>
        </div>

        {/* 2-Column Clean Metadata Grid (No clipping, generous room) */}
        <div className="grid grid-cols-2 gap-2.5 text-xs mb-3.5">
          <div className="p-2.5 rounded-lg bg-[#FAF7F2] border border-[#EAE5DB]/70">
            <span className="text-[#78716C] text-[10px] uppercase font-medium tracking-wider block mb-0.5">
              Max Penalty
            </span>
            <span className="font-semibold text-[#C2410C] text-[11px] block">
              {getConcisePenalty(primaryStatute?.maxPrison || "")}
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-[#FAF7F2] border border-[#EAE5DB]/70">
            <span className="text-[#78716C] text-[10px] uppercase font-medium tracking-wider block mb-0.5">
              Breach Notice
            </span>
            <span className="font-semibold text-[#1C1917] text-[11px] block truncate" title={country.breachReportingHours}>
              {country.breachReportingHours}
            </span>
          </div>
        </div>

        {/* AI Law & Legislative Pipeline Status */}
        <div className="space-y-1.5 text-xs mb-2">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[#78716C] text-[11px]">AI Legislation</span>
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

          <div className="flex items-center justify-between gap-2">
            <span className="text-[#78716C] text-[11px]">Legislative Pipeline</span>
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
      <div className="flex items-center gap-2 pt-3 border-t border-[#EAE5DB] mt-2">
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
