"use client";

import React, { useState } from "react";
import { CountryCyberLaw } from "@/data/countries";
import {
  Clock,
  AlertTriangle,
  FileText,
  Sparkles,
  ArrowRight,
  Filter,
  CheckCircle2,
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
    <div className="space-y-6">
      {/* Banner / Explainer */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
              <Clock className="w-3.5 h-3.5" />
              <span>Legislative Transition Tracker</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Acts Available but Not Notified / Draft Bills
            </h2>
            <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
              In international cyber law, there is often a critical gap between when a statute is
              passed by parliament and when it is formally <strong className="text-amber-300">notified in the official gazette</strong> with operative secondary rules. Track which nations have cyber statutes ready, what is delaying enforcement, and upcoming penalties.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex sm:flex-col items-center sm:items-end justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800 shrink-0">
            <span className="text-xs text-slate-400">Total Tracked</span>
            <span className="text-2xl font-bold font-mono text-amber-400">
              {pendingItems.length} Statutes
            </span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-800/80">
          <Filter className="w-4 h-4 text-slate-400" />
          <button
            onClick={() => setFilterType("all")}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
              filterType === "all"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                : "bg-slate-800/60 text-slate-400 hover:text-white"
            }`}
          >
            All Acts ({pendingItems.length})
          </button>
          <button
            onClick={() => setFilterType("pending_notification")}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
              filterType === "pending_notification"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                : "bg-slate-800/60 text-slate-400 hover:text-white"
            }`}
          >
            Passed but Awaiting Notification (Gazette Rules)
          </button>
          <button
            onClick={() => setFilterType("draft")}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
              filterType === "draft"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                : "bg-slate-800/60 text-slate-400 hover:text-white"
            }`}
          >
            Draft Bills & Public Consultations
          </button>
        </div>
      </div>

      {/* Grid of Pending Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{item.flag}</span>
                  <div>
                    <h3 className="font-bold text-white text-base leading-snug">
                      {item.title}
                    </h3>
                    <span className="text-xs text-slate-400 font-medium">
                      {item.countryName} ({item.code})
                    </span>
                  </div>
                </div>

                <span
                  className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-md shrink-0 ${
                    item.status === "pending_notification"
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                      : "bg-blue-500/20 text-blue-300 border border-blue-500/40"
                  }`}
                >
                  {item.status === "pending_notification"
                    ? "Pending Gazette Notification"
                    : "Draft Bill"}
                </span>
              </div>

              {/* Status Explanation / Blocker Details */}
              <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 mb-3 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-amber-400 mb-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Notification & Enforcement Status</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {item.pendingNoticeDetails || item.summary}
                </p>
              </div>

              {/* Key Sections & Provisions */}
              <div className="space-y-1.5 mb-4 text-xs">
                <span className="font-semibold text-slate-400 block text-[11px]">
                  Key Provisions & Intended Scope:
                </span>
                {item.keySections.map((sec, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-slate-300">
                    <span className="text-cyan-400 font-mono text-[11px] mt-0.5">•</span>
                    <span>{sec}</span>
                  </div>
                ))}
              </div>

              {/* Proposed Penalties */}
              <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                <div className="p-2 rounded bg-slate-800/40 border border-slate-800">
                  <span className="text-slate-400 text-[10px] block">Proposed Max Prison</span>
                  <span className="text-rose-300 font-medium">{item.maxPrison}</span>
                </div>
                <div className="p-2 rounded bg-slate-800/40 border border-slate-800">
                  <span className="text-slate-400 text-[10px] block">Proposed Financial Fines</span>
                  <span className="text-amber-300 font-medium">{item.maxFine}</span>
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
              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-cyan-200 border border-slate-700 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Ask AI Legal Intelligence on this Bill</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
