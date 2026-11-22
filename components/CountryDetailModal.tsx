"use client";

import React from "react";
import { CountryCyberLaw } from "@/data/countries";
import {
  X,
  ShieldAlert,
  Clock,
  Globe,
  Building2,
  BookOpen,
  AlertTriangle,
  Cpu,
  Terminal,
} from "lucide-react";

interface CountryDetailModalProps {
  country: CountryCyberLaw | null;
  onClose: () => void;
  onAddToCompare: (id: string) => void;
  onTriggerAIPrompt: (prompt: string) => void;
}

export const CountryDetailModal: React.FC<CountryDetailModalProps> = ({
  country,
  onClose,
  onAddToCompare,
  onTriggerAIPrompt,
}) => {
  if (!country) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto font-sans">
      <div className="relative w-full max-w-3xl bg-[#060a14] border border-slate-800 rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#090d18]">
          <div className="flex items-center gap-3">
            <span className="text-3xl filter drop-shadow">{country.flag}</span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-tight">{country.country}</h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-bold">
                  {country.code}
                </span>
                <span className="text-[11px] font-mono text-slate-400 uppercase">
                  {country.continent}
                </span>
              </div>
              <p className="text-[11px] font-mono text-slate-400">
                Lead Authority: {country.leadEnforcementAgency}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 text-[10px] uppercase tracking-wider block mb-0.5">Strictness Index</span>
              <span className="text-base font-bold text-cyan-400">
                {country.strictnessScore.toFixed(1)} / 10
              </span>
              <span className="text-[9px] text-slate-500 block uppercase font-bold">
                {country.strictnessRating}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 text-[10px] uppercase tracking-wider block mb-0.5">Breach Mandate</span>
              <div className="flex items-center gap-1 font-semibold text-cyan-300">
                <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="truncate">{country.breachReportingHours}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 text-[10px] uppercase tracking-wider block mb-0.5">Extraterritoriality</span>
              <div className="flex items-center gap-1 font-semibold text-emerald-400">
                <Globe className="w-3.5 h-3.5" />
                <span>{country.extraterritorialReach ? "Global Scope" : "Domestic"}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 text-[10px] uppercase tracking-wider block mb-0.5">AI Legislation</span>
              <div className="flex items-center gap-1 font-semibold text-purple-400">
                <Cpu className="w-3.5 h-3.5" />
                <span className="capitalize">{country.aiCybercrime.status}</span>
              </div>
            </div>
          </div>

          {/* Key Strategic Highlights */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Jurisdictional Threat & Enforcement Highlights
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300 font-sans">
              {country.keyHighlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-cyan-400 font-mono font-bold">•</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Primary Enacted Statutes */}
          <div>
            <h4 className="text-xs font-mono font-bold text-white mb-3 flex items-center gap-2 uppercase tracking-wider">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>Enacted Statutes & Statutory Penalties</span>
            </h4>
            <div className="space-y-3">
              {country.primaryActs.map((act) => (
                <div
                  key={act.id}
                  className="p-4 rounded-xl bg-[#080d1a] border border-slate-800"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h5 className="font-bold text-slate-200 text-xs sm:text-sm">
                      {act.title}
                    </h5>
                    <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 uppercase">
                      Enacted {act.enactedYear}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mb-3 leading-relaxed">{act.summary}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-3 font-mono">
                    <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                      <span className="text-slate-400 text-[9px] uppercase tracking-wider block mb-0.5">
                        Maximum Incarceration
                      </span>
                      <span className="text-rose-300 font-sans font-medium text-xs">{act.maxPrison}</span>
                    </div>
                    <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                      <span className="text-slate-400 text-[9px] uppercase tracking-wider block mb-0.5">
                        Maximum Financial Penalties
                      </span>
                      <span className="text-amber-300 font-sans font-medium text-xs">{act.maxFine}</span>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs">
                    <span className="text-slate-400 font-mono text-[10px] uppercase tracking-wider block">
                      Key Codified Sections:
                    </span>
                    {act.keySections.map((sec, idx) => (
                      <div key={idx} className="text-slate-300 text-xs flex gap-2">
                        <span className="text-cyan-400 font-mono">-</span>
                        <span>{sec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending or Draft Acts */}
          {country.pendingOrDraftActs && country.pendingOrDraftActs.length > 0 && (
            <div>
              <h4 className="text-xs font-mono font-bold text-amber-300 mb-3 flex items-center gap-2 uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Acts Available but NOT Notified / Draft Bills</span>
              </h4>
              <div className="space-y-3">
                {country.pendingOrDraftActs.map((act) => (
                  <div
                    key={act.id}
                    className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h5 className="font-bold text-amber-200 text-xs sm:text-sm">
                        {act.title}
                      </h5>
                      <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                        {act.status.replace("_", " ")}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mb-2 leading-relaxed">
                      {act.pendingNoticeDetails || act.summary}
                    </p>
                    <div className="text-[11px] font-mono text-slate-400">
                      <strong className="text-amber-300">PROPOSED TERMS: </strong>
                      {act.maxPrison} | {act.maxFine}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Legislation Section */}
          <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/30">
            <h4 className="text-xs font-mono font-bold text-purple-300 mb-2 flex items-center gap-2 uppercase tracking-wider">
              <Cpu className="w-4 h-4 text-purple-400" />
              <span>AI Cybercrime & Deepfake Governance</span>
            </h4>
            <p className="text-xs text-slate-300 mb-3 leading-relaxed">{country.aiCybercrime.summary}</p>
            <div className="flex flex-wrap gap-1.5 font-mono">
              {country.aiCybercrime.coveredOffenses.map((offense, idx) => (
                <span
                  key={idx}
                  className="text-[10px] px-2 py-0.5 rounded bg-purple-900/50 text-purple-200 border border-purple-700/50"
                >
                  {offense}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-slate-800 bg-[#090d18] flex items-center justify-between">
          <button
            onClick={() => {
              onAddToCompare(country.id);
              onClose();
            }}
            className="px-4 py-2 rounded-lg text-xs font-mono font-semibold bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 transition-colors"
          >
            + ADD TO VERSUS MATRIX
          </button>

          <button
            onClick={() => {
              onTriggerAIPrompt(
                `Provide an exhaustive breakdown of cybercrime enforcement, court penalties, and cross-border extradition treaties for ${country.country}.`
              );
              onClose();
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-mono font-bold bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-md shadow-cyan-500/20 transition-all border border-cyan-400/30"
          >
            <Terminal className="w-3.5 h-3.5 text-cyan-200" />
            <span>AI DEEP-DIVE: {country.code}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
