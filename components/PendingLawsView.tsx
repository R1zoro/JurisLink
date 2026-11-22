"use client";

import React, { useState } from "react";
import { CountryCyberLaw } from "@/data/countries";
import {
  Clock,
  AlertTriangle,
  FileText,
  Sparkles,
  Filter,
  Terminal,
} from "lucide-react";

interface PendingLawsViewProps {
  countries: CountryCyberLaw[];
  onTriggerAIPrompt: (prompt: string) => void;
}

export const PendingLawsView: React.FC<PendingLawsViewProps> = ({
  countries,
  onTriggerAIPrompt,
}) => {
  const [filterType, setFilterType] = useState<"all" | "pending_notification" | "draft">("all");

  // Flatten pending or draft acts with country metadata
  const pendingItems = countries.flatMap((c) =>
    c.pendingOrDraftActs.map((act) => ({
      ...act,
      countryName: c.country,
      flag: c.flag,
      code: c.code,
      leadAgency: c.leadEnforcementAgency,
    }))
  );

  const filteredItems = pendingItems.filter((item) => {
    if (filterType === "all") return true;
    return item.status === filterType;
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Banner / Explainer */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/30 via-[#070b14] to-[#070b14] border border-amber-500/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] font-mono font-bold uppercase tracking-wider">
              <Clock className="w-3.5 h-3.5" />
              <span>LEGISLATIVE TRANSITION TELEMETRY</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Acts Available but NOT Notified / Draft Bills
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              In international cyber law, a critical gap exists between when a statute is passed by parliament and when it is formally <strong className="text-amber-300">notified in the official gazette</strong> with operative secondary rules. Monitor which jurisdictions have passed legislation, identify regulatory bottlenecks, and track upcoming enforcement dates.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex sm:flex-col items-center sm:items-end justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800 shrink-0 font-mono">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">Tracked Pipeline</span>
            <span className="text-xl font-bold text-amber-400">
              {pendingItems.length} STATUTES
            </span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-800/80 font-mono text-xs">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <button
            onClick={() => setFilterType("all")}
            className={`px-3 py-1 rounded-lg text-xs transition-colors ${
              filterType === "all"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            All Acts [{pendingItems.length}]
          </button>
          <button
            onClick={() => setFilterType("pending_notification")}
            className={`px-3 py-1 rounded-lg text-xs transition-colors ${
              filterType === "pending_notification"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            Awaiting Gazette Rules
          </button>
          <button
            onClick={() => setFilterType("draft")}
            className={`px-3 py-1 rounded-lg text-xs transition-colors ${
              filterType === "draft"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            Draft Bills & Consultations
          </button>
        </div>
      </div>

      {/* Grid of Pending Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-xl bg-[#080d1a] border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl filter drop-shadow">{item.flag}</span>
                  <div>
                    <h3 className="font-bold text-white text-sm sm:text-base leading-snug">
                      {item.title}
                    </h3>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wide">
                      {item.countryName} [{item.code}]
                    </span>
                  </div>
                </div>

                <span
                  className={`text-[9px] font-mono uppercase font-bold tracking-wider px-2 py-1 rounded shrink-0 ${
                    item.status === "pending_notification"
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                      : "bg-blue-500/20 text-blue-300 border border-blue-500/40"
                  }`}
                >
                  {item.status === "pending_notification"
                    ? "Pending Gazette Notice"
                    : "Draft Bill"}
                </span>
              </div>

              {/* Status Explanation / Blocker Details */}
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/90 mb-3 text-xs font-mono">
                <div className="flex items-center gap-1.5 font-bold text-amber-400 mb-1 text-[11px] uppercase tracking-wider">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Enforcement & Notification Obstacle</span>
                </div>
                <p className="text-slate-300 font-sans text-xs leading-relaxed">
                  {item.pendingNoticeDetails || item.summary}
                </p>
              </div>

              {/* Key Sections & Provisions */}
              <div className="space-y-1.5 mb-4 text-xs">
                <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">
                  Key Proposed Provisions:
                </span>
                {item.keySections.map((sec, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-slate-300 text-xs">
                    <span className="text-cyan-400 font-mono text-[11px] mt-0.5">•</span>
                    <span>{sec}</span>
                  </div>
                ))}
              </div>

              {/* Proposed Penalties */}
              <div className="grid grid-cols-2 gap-2 text-xs mb-4 font-mono">
                <div className="p-2 rounded bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 text-[9px] uppercase tracking-wider block">
                    Proposed Incarceration
                  </span>
                  <span className="text-rose-300 font-sans font-medium text-xs">{item.maxPrison}</span>
                </div>
                <div className="p-2 rounded bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 text-[9px] uppercase tracking-wider block">
                    Proposed Fines
                  </span>
                  <span className="text-amber-300 font-sans font-medium text-xs">{item.maxFine}</span>
                </div>
              </div>
            </div>

            {/* Quick Ask AI button */}
            <button
              onClick={() =>
                onTriggerAIPrompt(
                  `What is the current enforcement status and notification timeline of ${item.title} in ${item.countryName}?`
                )
              }
              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-mono font-semibold bg-slate-900 hover:bg-slate-800 text-cyan-300 hover:text-cyan-200 border border-slate-700/80 transition-colors"
            >
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>QUERY STATUTE TIMELINE VIA AI</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
