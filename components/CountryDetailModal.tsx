"use client";

import React from "react";
import { CountryCyberLaw } from "@/data/countries";
import {
  X,
  ShieldAlert,
  Clock,
  Globe,
  BookOpen,
  AlertTriangle,
  Cpu,
  Sparkles,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#1C1917]/50 backdrop-blur-sm overflow-y-auto font-sans">
      <div className="relative w-full max-w-3xl bg-white border border-[#EAE5DB] rounded-2xl shadow-xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EAE5DB] bg-[#FAF7F2]">
          <div className="flex items-center gap-3">
            <span className="text-3xl select-none">{country.flag}</span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-[#1C1917] tracking-tight">{country.country}</h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F4EFE6] text-[#7C4A27] font-semibold">
                  {country.code}
                </span>
                <span className="text-xs text-[#78716C]">
                  {country.continent}
                </span>
              </div>
              <p className="text-xs text-[#78716C] mt-0.5">
                Lead Authority: {country.leadEnforcementAgency}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#78716C] hover:text-[#1C1917] hover:bg-[#F4EFE6] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 bg-[#FBF9F5]">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-white border border-[#EAE5DB] shadow-sm">
              <span className="text-[#78716C] text-[10px] uppercase tracking-wider block mb-0.5 font-medium">Strictness Index</span>
              <span className="text-base font-bold font-mono text-[#7C4A27]">
                {country.strictnessScore.toFixed(1)} / 10
              </span>
              <span className="text-[10px] text-[#78716C] block uppercase font-medium">
                {country.strictnessRating}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white border border-[#EAE5DB] shadow-sm">
              <span className="text-[#78716C] text-[10px] uppercase tracking-wider block mb-0.5 font-medium">Breach Mandate</span>
              <div className="flex items-center gap-1 font-semibold text-[#1C1917]">
                <Clock className="w-3.5 h-3.5 text-[#7C4A27] shrink-0" />
                <span className="truncate">{country.breachReportingHours}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white border border-[#EAE5DB] shadow-sm">
              <span className="text-[#78716C] text-[10px] uppercase tracking-wider block mb-0.5 font-medium">Extraterritoriality</span>
              <div className="flex items-center gap-1 font-semibold text-[#2D5A43]">
                <Globe className="w-3.5 h-3.5" />
                <span>{country.extraterritorialReach ? "Global Scope" : "Domestic"}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white border border-[#EAE5DB] shadow-sm">
              <span className="text-[#78716C] text-[10px] uppercase tracking-wider block mb-0.5 font-medium">AI Legislation</span>
              <div className="flex items-center gap-1 font-semibold text-[#7C4A27]">
                <Cpu className="w-3.5 h-3.5" />
                <span className="capitalize">{country.aiCybercrime.status}</span>
              </div>
            </div>
          </div>

          {/* Key Strategic Highlights */}
          <div className="p-4 rounded-xl bg-white border border-[#EAE5DB] shadow-sm">
            <h4 className="text-xs font-semibold text-[#1C1917] uppercase tracking-wider mb-2">
              Jurisdictional Highlights
            </h4>
            <ul className="space-y-1.5 text-xs text-[#78716C]">
              {country.keyHighlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#7C4A27] font-bold">•</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Primary Enacted Statutes */}
          <div>
            <h4 className="text-xs font-semibold text-[#1C1917] mb-3 flex items-center gap-1.5 uppercase tracking-wider">
              <BookOpen className="w-4 h-4 text-[#7C4A27]" />
              <span>Enacted Statutes & Statutory Penalties</span>
            </h4>
            <div className="space-y-3">
              {country.primaryActs.map((act) => (
                <div
                  key={act.id}
                  className="p-4 rounded-xl bg-white border border-[#EAE5DB] shadow-sm"
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h5 className="font-bold text-[#1C1917] text-xs sm:text-sm">
                      {act.title}
                    </h5>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#E8F0EC] text-[#2D5A43] border border-[#C2D6CC]">
                      Enacted {act.enactedYear}
                    </span>
                  </div>
                  <p className="text-xs text-[#78716C] mb-3 leading-relaxed">{act.summary}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-3">
                    <div className="p-2 rounded bg-[#FAF7F2] border border-[#EAE5DB]">
                      <span className="text-[#78716C] text-[10px] uppercase tracking-wider block">
                        Maximum Incarceration
                      </span>
                      <span className="text-[#C2410C] font-semibold">{act.maxPrison}</span>
                    </div>
                    <div className="p-2 rounded bg-[#FAF7F2] border border-[#EAE5DB]">
                      <span className="text-[#78716C] text-[10px] uppercase tracking-wider block">
                        Financial Penalties
                      </span>
                      <span className="text-[#B45309] font-semibold">{act.maxFine}</span>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs">
                    <span className="text-[#1C1917] font-medium text-[11px] block">
                      Key Provisions:
                    </span>
                    {act.keySections.map((sec, idx) => (
                      <div key={idx} className="text-[#78716C] text-xs flex gap-2">
                        <span className="text-[#7C4A27] font-bold">-</span>
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
              <h4 className="text-xs font-semibold text-[#B45309] mb-3 flex items-center gap-1.5 uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-[#B45309]" />
                <span>Acts Available but NOT Notified / Draft Bills</span>
              </h4>
              <div className="space-y-3">
                {country.pendingOrDraftActs.map((act) => (
                  <div
                    key={act.id}
                    className="p-4 rounded-xl bg-[#FEF3C7]/40 border border-[#FDE68A]"
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <h5 className="font-bold text-[#1C1917] text-xs sm:text-sm">
                        {act.title}
                      </h5>
                      <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A]">
                        {act.status.replace("_", " ")}
                      </span>
                    </div>
                    <p className="text-xs text-[#78716C] mb-2 leading-relaxed">
                      {act.pendingNoticeDetails || act.summary}
                    </p>
                    <div className="text-[11px] text-[#78716C]">
                      <strong className="text-[#1C1917]">Proposed Penalties: </strong>
                      {act.maxPrison} | {act.maxFine}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Legislation Section */}
          <div className="p-4 rounded-xl bg-white border border-[#EAE5DB] shadow-sm">
            <h4 className="text-xs font-semibold text-[#1C1917] mb-1.5 flex items-center gap-1.5 uppercase tracking-wider">
              <Cpu className="w-4 h-4 text-[#7C4A27]" />
              <span>AI Cybercrime & Deepfake Governance</span>
            </h4>
            <p className="text-xs text-[#78716C] mb-3 leading-relaxed">{country.aiCybercrime.summary}</p>
            <div className="flex flex-wrap gap-1.5">
              {country.aiCybercrime.coveredOffenses.map((offense, idx) => (
                <span
                  key={idx}
                  className="text-[11px] px-2 py-0.5 rounded bg-[#FAF7F2] text-[#78716C] border border-[#EAE5DB]"
                >
                  {offense}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-[#EAE5DB] bg-[#FAF7F2] flex items-center justify-between">
          <button
            onClick={() => {
              onAddToCompare(country.id);
              onClose();
            }}
            className="px-4 py-2 rounded-lg text-xs font-semibold bg-white hover:bg-[#F5F2EB] text-[#1C1917] border border-[#EAE5DB] transition-colors"
          >
            + Add to Comparison
          </button>

          <button
            onClick={() => {
              onTriggerAIPrompt(
                `Provide an exhaustive breakdown of cybercrime enforcement, court penalties, and cross-border extradition treaties for ${country.country}.`
              );
              onClose();
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-[#7C4A27] hover:bg-[#63391C] text-white shadow-sm transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Query via AI</span>
          </button>
        </div>
      </div>
    </div>
  );
};
