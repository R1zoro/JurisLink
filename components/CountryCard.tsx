"use client";

import React from "react";
import { CountryCyberLaw } from "@/data/countries";
import { ShieldAlert, Clock, AlertTriangle, Cpu, Check, Plus, ExternalLink } from "lucide-react";

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
  const getStrictnessColor = (score: number) => {
    if (score >= 9.2) return "text-rose-400 bg-rose-500/10 border-rose-500/30";
    if (score >= 8.7) return "text-orange-400 bg-orange-500/10 border-orange-500/30";
    if (score >= 8.2) return "text-amber-400 bg-amber-500/10 border-amber-500/30";
    return "text-cyan-400 bg-cyan-500/10 border-cyan-500/30";
  };

  const getScoreBarColor = (score: number) => {
    if (score >= 9.2) return "bg-rose-500";
    if (score >= 8.7) return "bg-orange-500";
    if (score >= 8.2) return "bg-amber-500";
    return "bg-cyan-500";
  };

  return (
    <div className="group relative rounded-xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/50 transition-all duration-200 p-5 flex flex-col justify-between hover:shadow-xl hover:shadow-cyan-950/20 backdrop-blur-sm">
      {/* Top row: Flag, Name, Continent & Strictness Score */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl select-none" role="img" aria-label={country.country}>
              {country.flag}
            </span>
            <div>
              <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                {country.country}
                <span className="text-xs font-mono text-slate-400 font-normal">
                  ({country.code})
                </span>
              </h3>
              <span className="text-xs text-slate-400 font-medium">{country.continent}</span>
            </div>
          </div>

          {/* Strictness Score Pill */}
          <div
            className={`flex flex-col items-end px-2.5 py-1 rounded-lg border font-mono text-right ${getStrictnessColor(
              country.strictnessScore
            )}`}
          >
            <div className="flex items-center gap-1 font-bold text-sm">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>{country.strictnessScore.toFixed(1)}/10</span>
            </div>
            <span className="text-[10px] tracking-wide uppercase font-semibold">
              {country.strictnessRating}
            </span>
          </div>
        </div>

        {/* Progress bar visual for strictness */}
        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-4">
          <div
            className={`h-full rounded-full ${getScoreBarColor(country.strictnessScore)}`}
            style={{ width: `${(country.strictnessScore / 10) * 100}%` }}
          />
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs mb-4">
          <div className="p-2.5 rounded-lg bg-slate-800/50 border border-slate-800/80">
            <span className="text-slate-400 block text-[11px] mb-1">Breach Reporting</span>
            <div className="flex items-center gap-1.5 text-slate-200 font-medium truncate">
              <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="truncate">{country.breachReportingHours}</span>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-800/50 border border-slate-800/80">
            <span className="text-slate-400 block text-[11px] mb-1">AI Cyber Law</span>
            <div className="flex items-center gap-1.5 text-slate-200 font-medium">
              <Cpu className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span
                className={`text-[11px] px-1.5 py-0.5 rounded ${
                  country.aiCybercrime.status === "enacted"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : country.aiCybercrime.status === "pending"
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                    : "bg-slate-700 text-slate-300"
                }`}
              >
                {country.aiCybercrime.status === "enacted"
                  ? "Enacted"
                  : country.aiCybercrime.status === "pending"
                  ? "Pending Bill"
                  : "General Laws"}
              </span>
            </div>
          </div>
        </div>

        {/* Pending Legislation Alert Banner if available */}
        {country.pendingOrDraftActs && country.pendingOrDraftActs.length > 0 && (
          <div className="mb-4 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 truncate">
              <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
              <span className="truncate font-medium">
                {country.pendingOrDraftActs[0].title}
              </span>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-200 shrink-0">
              {country.pendingOrDraftActs[0].status === "pending_notification"
                ? "Not Notified"
                : "Draft"}
            </span>
          </div>
        )}

        {/* Primary Act Preview */}
        <div className="text-xs text-slate-400 mb-4 line-clamp-2">
          <strong className="text-slate-300">Key Statute: </strong>
          {country.primaryActs[0]?.title}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-3 border-t border-slate-800">
        <button
          onClick={() => onToggleCompare(country.id)}
          className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
            isSelectedForCompare
              ? "bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20"
              : "bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700"
          }`}
        >
          {isSelectedForCompare ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Selected</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5 text-cyan-400" />
              <span>Compare</span>
            </>
          )}
        </button>

        <button
          onClick={() => onSelectCountry(country)}
          className="flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-cyan-950/60 text-slate-300 hover:text-cyan-300 border border-slate-700 hover:border-cyan-500/40 transition-colors"
          title="Inspect full legal dossier"
        >
          <span>Dossier</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
