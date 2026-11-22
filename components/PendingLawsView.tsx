"use client";

import React, { useState } from "react";
import { CountryCyberLaw } from "@/data/countries";
import { Clock, AlertTriangle, Filter, Sparkles } from "lucide-react";

interface PendingLawsViewProps {
  countries: CountryCyberLaw[];
  onTriggerAIPrompt: (prompt: string) => void;
}

export const PendingLawsView: React.FC<PendingLawsViewProps> = ({
  countries,
  onTriggerAIPrompt,
}) => {
  const [filterType, setFilterType] = useState<"all" | "pending_notification" | "draft">("all");

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
      <div className="p-6 rounded-2xl bg-white border border-[#EAE5DB] shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A] text-[10px] font-semibold uppercase tracking-wider">
              <Clock className="w-3.5 h-3.5" />
              <span>Legislative Transition Tracker</span>
            </div>
            <h2 className="text-xl font-bold text-[#1C1917] tracking-tight">
              Acts Available but NOT Notified / Draft Bills
            </h2>
            <p className="text-xs text-[#78716C] max-w-3xl leading-relaxed">
              In international cyber law, a critical gap often occurs between when a statute is passed by parliament and when it is formally <strong className="text-[#1C1917]">notified in the official gazette</strong> with secondary implementation rules. Track which nations have enacted bills awaiting notification, regulatory bottlenecks, and upcoming compliance dates.
            </p>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end justify-between p-3 rounded-xl bg-[#FAF7F2] border border-[#EAE5DB] shrink-0 font-mono">
            <span className="text-[10px] text-[#78716C] uppercase tracking-wider">Tracked Pipeline</span>
            <span className="text-lg font-bold text-[#B45309]">
              {pendingItems.length} Statutes
            </span>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-2 mt-5 pt-4 border-t border-[#EAE5DB] text-xs">
          <Filter className="w-3.5 h-3.5 text-[#78716C]" />
          <button
            onClick={() => setFilterType("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filterType === "all"
                ? "bg-[#7C4A27] text-white shadow-sm"
                : "bg-[#FAF7F2] text-[#78716C] hover:text-[#1C1917] border border-[#EAE5DB]"
            }`}
          >
            All Acts ({pendingItems.length})
          </button>
          <button
            onClick={() => setFilterType("pending_notification")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filterType === "pending_notification"
                ? "bg-[#7C4A27] text-white shadow-sm"
                : "bg-[#FAF7F2] text-[#78716C] hover:text-[#1C1917] border border-[#EAE5DB]"
            }`}
          >
            Awaiting Gazette Notification
          </button>
          <button
            onClick={() => setFilterType("draft")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filterType === "draft"
                ? "bg-[#7C4A27] text-white shadow-sm"
                : "bg-[#FAF7F2] text-[#78716C] hover:text-[#1C1917] border border-[#EAE5DB]"
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
            className="editorial-card p-5 flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{item.flag}</span>
                  <div>
                    <h3 className="font-bold text-[#1C1917] text-sm leading-snug">
                      {item.title}
                    </h3>
                    <span className="text-xs text-[#78716C]">
                      {item.countryName} ({item.code})
                    </span>
                  </div>
                </div>

                <span
                  className={`text-[9px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded shrink-0 border ${
                    item.status === "pending_notification"
                      ? "bg-[#FEF3C7] text-[#B45309] border-[#FDE68A]"
                      : "bg-[#F4EFE6] text-[#78716C] border-[#EAE5DB]"
                  }`}
                >
                  {item.status === "pending_notification"
                    ? "Pending Gazette"
                    : "Draft Bill"}
                </span>
              </div>

              {/* Status Details */}
              <div className="p-3 rounded-lg bg-[#FAF7F2] border border-[#EAE5DB] mb-3 text-xs">
                <div className="flex items-center gap-1.5 font-semibold text-[#B45309] mb-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Enforcement & Notification Obstacle</span>
                </div>
                <p className="text-[#1C1917] leading-relaxed">
                  {item.pendingNoticeDetails || item.summary}
                </p>
              </div>

              {/* Key Provisions */}
              <div className="space-y-1 mb-4 text-xs">
                <span className="text-[10px] uppercase tracking-wider text-[#78716C] block font-semibold">
                  Key Proposed Provisions:
                </span>
                {item.keySections.map((sec, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 text-[#78716C]">
                    <span className="text-[#7C4A27] font-bold">•</span>
                    <span>{sec}</span>
                  </div>
                ))}
              </div>

              {/* Proposed Penalties */}
              <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                <div className="p-2 rounded bg-[#FAF7F2] border border-[#EAE5DB]">
                  <span className="text-[#78716C] text-[9px] uppercase tracking-wider block">
                    Proposed Incarceration
                  </span>
                  <span className="text-[#C2410C] font-medium">{item.maxPrison}</span>
                </div>
                <div className="p-2 rounded bg-[#FAF7F2] border border-[#EAE5DB]">
                  <span className="text-[#78716C] text-[9px] uppercase tracking-wider block">
                    Proposed Fines
                  </span>
                  <span className="text-[#B45309] font-medium">{item.maxFine}</span>
                </div>
              </div>
            </div>

            {/* Ask AI button */}
            <button
              onClick={() =>
                onTriggerAIPrompt(
                  `What is the current enforcement status and notification timeline of ${item.title} in ${item.countryName}?`
                )
              }
              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold bg-[#FAF7F2] hover:bg-[#F3EFE6] text-[#7C4A27] border border-[#EAE5DB] transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Query Statute Status via AI</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
