"use client";

import React from "react";
import { CountryCyberLaw } from "@/data/countries";
import { ShieldAlert, Clock, AlertTriangle, Cpu, Check, Plus, ArrowUpRight, Scale } from "lucide-react";

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
    if (score >= 9.2) return "text-rose-400 bg-rose-950/40 border-rose-500/40";
    if (score >= 8.7) return "text-orange-400 bg-orange-950/40 border-orange-500/40";
    if (score >= 8.2) return "text-amber-400 bg-amber-950/40 border-amber-500/40";
    return "text-cyan-400 bg-cyan-950/40 border-cyan-500/40";
  };

  const getScoreBarGradient = (score: number) => {
    if (score >= 9.2) return "bg-gradient-to-r from-orange-500 to-rose-500";
    if (score >= 8.7) return "bg-gradient-to-r from-amber-500 to-orange-500";
    if (score >= 8.2) return "bg-gradient-to-r from-cyan-500 to-amber-500";
    return "bg-gradient-to-r from-blue-500 to-cyan-500";
  };

  return (
    <div className="group relative rounded-xl bg-[#090d19]/90 border border-slate-800 hover:border-cyan-500/60 transition-all duration-200 p-5 flex flex-col justify-between hover:shadow-xl hover:shadow-cyan-950/30 backdrop-blur-md">
      {/* Top row: Flag, Name, Region & Strictness Score */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl select-none filter drop-shadow">
              {country.flag}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors tracking-tight">
                  {country.country}
                </h3>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-semibold">
                  {country.code}
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-400 tracking-wide uppercase">
                {country.continent}
              </span>
            </div>
          </div>

          {/* Strictness Score Badge */}
          <div
            className={`flex flex-col items-end px-2.5 py-1 rounded-lg border font-mono text-right ${getStrictnessStyle(
              country.strictnessScore
            )}`}
          >
            <div className="flex items-center gap-1 font-extrabold text-xs">
              <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
              <span>{country.strictnessScore.toFixed(1)}/10</span>
            </div>
            <span className="text-[9px] tracking-wider uppercase font-bold">
              {country.strictnessRating} STRICTNESS
            </span>
          </div>
        </div>

        {/* Progress Bar Gauge */}
        <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden mb-4 border border-slate-800/80">
          <div
            className={`h-full rounded-full transition-all duration-500 ${getScoreBarGradient(country.strictnessScore)}`}
            style={{ width: `${(country.strictnessScore / 10) * 100}%` }}
          />
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs mb-3.5">
          <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80">
            <span className="text-slate-400 font-mono text-[10px] block uppercase tracking-wider mb-0.5">
              Breach Mandate
            </span>
            <div className="flex items-center gap-1.5 text-slate-200 font-medium truncate">
              <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="truncate font-mono text-[11px]">{country.breachReportingHours}</span>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80">
            <span className="text-slate-400 font-mono text-[10px] block uppercase tracking-wider mb-0.5">
              AI Cybercrime Law
            </span>
            <div className="flex items-center gap-1.5 text-slate-200 font-medium">
              <Cpu className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span
                className={`text-[10px] font-mono font-bold uppercase px-1.5 py-0.2 rounded ${
                  country.aiCybercrime.status === "enacted"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : country.aiCybercrime.status === "pending"
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                    : "bg-slate-800 text-slate-400"
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

        {/* Pending Legislation Banner if available */}
        {country.pendingOrDraftActs && country.pendingOrDraftActs.length > 0 && (
          <div className="mb-3.5 px-3 py-2 rounded-lg bg-amber-950/20 border border-amber-500/30 text-amber-300 text-xs flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 truncate">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-amber-400" />
              <span className="truncate font-mono text-[11px]">
                {country.pendingOrDraftActs[0].title}
              </span>
            </div>
            <span className="text-[9px] uppercase font-mono font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-200 shrink-0">
              {country.pendingOrDraftActs[0].status === "pending_notification"
                ? "Unnotified"
                : "Draft"}
            </span>
          </div>
        )}

        {/* Primary Statute Preview */}
        <div className="text-[11px] text-slate-400 mb-3.5 line-clamp-2 leading-relaxed">
          <strong className="text-slate-300 font-mono">STATUTE: </strong>
          {country.primaryActs[0]?.title}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-3 border-t border-slate-800/80">
        <button
          onClick={() => onToggleCompare(country.id)}
          className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono font-semibold transition-all ${
            isSelectedForCompare
              ? "bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20"
              : "bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80"
          }`}
        >
          {isSelectedForCompare ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>COMPARING</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5 text-cyan-400" />
              <span>COMPARE</span>
            </>
          )}
        </button>

        <button
          onClick={() => onSelectCountry(country)}
          className="flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-xs font-mono font-medium bg-slate-900/90 hover:bg-cyan-950/70 text-slate-300 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/50 transition-colors"
          title="Inspect statutory dossier"
        >
          <span>DOSSIER</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
