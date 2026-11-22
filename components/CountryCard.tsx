"use client";

import React from "react";
import { CountryCyberLaw } from "@/data/countries";
import { Check, Plus, ArrowUpRight, ShieldAlert, Cpu, AlertTriangle, BookOpen, Clock } from "lucide-react";

interface CountryCardProps {
  country: CountryCyberLaw;
  isSelectedForCompare: boolean;
  onToggleCompare: (id: string) => void;
  onSelectCountry: (country: CountryCyberLaw) => void;
}

// Clean cross-platform country flag / badge styling
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

  const primaryStatute = country.primaryActs[0];
  const badgeInfo = COUNTRY_BADGES[country.id] || {
    label: country.code,
    accent: "bg-[#F4EFE6] text-[#78716C] border-[#EAE5DB]",
  };

  return (
    <div className="editorial-card p-5 flex flex-col justify-between font-sans bg-white border border-[#EAE5DB] rounded-2xl hover:border-[#D6CEBF] transition-all shadow-sm">
      <div className="space-y-3.5">
        {/* Header: Styled Country Badge, Title & Strictness Score */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span
              className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-md border ${badgeInfo.accent}`}
            >
              {badgeInfo.label}
            </span>
            <div>
              <h3 className="text-base font-bold text-[#1C1917] tracking-tight leading-snug">
                {country.country}
              </h3>
              <span className="text-[11px] text-[#78716C]">
                {country.continent} • Lead: {country.leadEnforcementAgency.split("&")[0].trim()}
              </span>
            </div>
          </div>

          {/* Strictness Score Pill */}
          <div
            className={`px-2.5 py-1 rounded-lg border font-mono text-xs font-bold shrink-0 text-right ${getStrictnessStyle(
              country.strictnessScore
            )}`}
            title={`Strictness Index: ${country.strictnessScore}/10 (${country.strictnessRating})`}
          >
            <div>{country.strictnessScore.toFixed(1)} / 10</div>
            <div className="text-[9px] uppercase tracking-wider font-semibold opacity-85">
              {country.strictnessRating}
            </div>
          </div>
        </div>

        {/* Minimalist Score Bar */}
        <div className="w-full bg-[#F4EFE6] h-1.5 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${getScoreBarColor(
              country.strictnessScore
            )}`}
            style={{ width: `${(country.strictnessScore / 10) * 100}%` }}
          />
        </div>

        {/* SUBSTANTIVE REASONING: Strictness Rationale Callout */}
        <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EAE5DB] text-xs">
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#7C4A27] mb-1">
            <ShieldAlert className="w-3.5 h-3.5 text-[#7C4A27]" />
            <span>Strictness Rationale</span>
          </div>
          <p className="text-[#44403C] text-[11px] leading-relaxed">
            {country.strictnessRationale}
          </p>
        </div>

        {/* Core Governing Statute (Full, unclipped) */}
        <div>
          <span className="text-[10px] uppercase font-semibold tracking-wider text-[#78716C] block mb-0.5">
            Primary Governing Statute
          </span>
          <div className="text-xs font-bold text-[#1C1917] leading-snug">
            {primaryStatute?.title}
          </div>
        </div>

        {/* 2-Column Penalty & Breach Notice Specs (Zero Ellipsis Clipping) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 rounded-lg bg-[#FAF7F2] border border-[#EAE5DB]/80 flex flex-col justify-between">
            <span className="text-[#78716C] text-[10px] uppercase font-medium tracking-wider mb-0.5">
              Statutory Maximum
            </span>
            <span className="font-bold text-[#C2410C] text-[11px] leading-snug">
              {primaryStatute?.maxPrison}
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-[#FAF7F2] border border-[#EAE5DB]/80 flex flex-col justify-between">
            <span className="text-[#78716C] text-[10px] uppercase font-medium tracking-wider mb-0.5">
              Breach Disclosure
            </span>
            <span className="font-semibold text-[#1C1917] text-[11px] leading-snug">
              {country.conciseBreachMandate || country.breachReportingHours}
            </span>
          </div>
        </div>

        {/* AI CYBERCRIME GOVERNANCE: Substantive Rule Callout */}
        <div className="p-3 rounded-xl bg-[#F5F2EB]/70 border border-[#EAE5DB] text-xs space-y-1">
          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#7C4A27]">
              <Cpu className="w-3.5 h-3.5 text-[#7C4A27]" />
              <span>AI & Deepfake Governance</span>
            </span>
            <span
              className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded ${
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
                : "General Criminal Law"}
            </span>
          </div>
          <p className="text-[#57534E] text-[11px] leading-relaxed">
            {country.aiGovernanceSummary}
          </p>
        </div>

        {/* LEGISLATIVE PIPELINE (Active Unnotified / Draft Bills) */}
        {country.pipelineHighlight && (
          <div className="p-2.5 rounded-lg bg-[#FEF3C7]/40 border border-[#FDE68A] text-xs">
            <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#B45309] mb-0.5">
              <AlertTriangle className="w-3 h-3 text-[#B45309]" />
              <span>Legislative Pipeline (Pending Gazette)</span>
            </div>
            <p className="text-[#78350F] text-[11px] leading-relaxed">
              {country.pipelineHighlight}
            </p>
          </div>
        )}
      </div>

      {/* Action Buttons: Compare & Full Dossier */}
      <div className="flex items-center gap-2 pt-4 border-t border-[#EAE5DB] mt-4">
        <button
          onClick={() => onToggleCompare(country.id)}
          className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
            isSelectedForCompare
              ? "bg-[#7C4A27] text-white shadow-sm"
              : "bg-[#FAF7F2] hover:bg-[#F3EFE6] text-[#1C1917] border border-[#EAE5DB]"
          }`}
          title={isSelectedForCompare ? "Remove from comparison" : "Add to comparison (up to 3)"}
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
          className="flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#FAF7F2] hover:bg-[#F3EFE6] text-[#7C4A27] hover:text-[#5B3419] border border-[#EAE5DB] transition-colors"
          title="Open complete statutory dossier with section breakdown and precedents"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Full Legal Dossier</span>
          <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
        </button>
      </div>
    </div>
  );
};
