"use client";

import React from "react";
import { CountryCyberLaw } from "@/data/countries";
import {
  Scale,
  X,
  Sparkles,
} from "lucide-react";

interface ComparisonModalProps {
  countries: CountryCyberLaw[];
  allCountries: CountryCyberLaw[];
  onClose: () => void;
  onRemoveCountry: (id: string) => void;
  onAddCountry: (id: string) => void;
  onTriggerAICompare: (countryNames: string[]) => void;
}

export const ComparisonModal: React.FC<ComparisonModalProps> = ({
  countries,
  allCountries,
  onClose,
  onRemoveCountry,
  onAddCountry,
  onTriggerAICompare,
}) => {
  const availableToAdd = allCountries.filter(
    (c) => !countries.some((selected) => selected.id === c.id)
  );

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#1C1917]/50 backdrop-blur-sm overflow-y-auto font-sans">
      <div className="relative w-full max-w-6xl bg-white border border-[#EAE5DB] rounded-2xl shadow-xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EAE5DB] bg-[#FAF7F2]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#F4EFE6] text-[#7C4A27]">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-[#1C1917] tracking-tight">
                  Jurisdictional Comparison Matrix
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F4EFE6] text-[#7C4A27] border border-[#EAE5DB] font-semibold">
                  {countries.length} Selected
                </span>
              </div>
              <p className="text-xs text-[#78716C]">
                Side-by-side statutory analysis across penalties, breach reporting, AI governance, and unnotified acts
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {countries.length >= 2 && (
              <button
                onClick={() =>
                  onTriggerAICompare(countries.map((c) => c.country))
                }
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#7C4A27] hover:bg-[#63391C] text-white shadow-sm transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Comparative Brief</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#78716C] hover:text-[#1C1917] hover:bg-[#F4EFE6] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body: Aligned Horizontal Matrix Table */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 bg-[#FBF9F5]">
          {/* Quick Add Bar */}
          {countries.length < 3 && (
            <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl bg-white border border-[#EAE5DB] text-xs">
              <span className="text-[#78716C] font-medium">Add jurisdiction:</span>
              {availableToAdd.slice(0, 6).map((c) => (
                <button
                  key={c.id}
                  onClick={() => onAddCountry(c.id)}
                  className="px-2.5 py-1 rounded-md bg-[#FAF7F2] hover:bg-[#F3EFE6] text-[#1C1917] border border-[#EAE5DB] transition-colors flex items-center gap-1.5 text-xs"
                >
                  <span>+</span>
                  <span className="font-medium">{c.country}</span>
                  <span className="text-[10px] text-[#78716C] font-mono">({c.code})</span>
                </button>
              ))}
            </div>
          )}

          {countries.length === 0 ? (
            <div className="py-16 text-center text-[#78716C]">
              <Scale className="w-10 h-10 mx-auto text-[#A8A29E] mb-2" />
              <p className="text-sm font-medium text-[#1C1917]">
                No jurisdictions selected for comparison.
              </p>
              <p className="text-xs text-[#78716C] mt-1">
                Select 2 or 3 jurisdictions from the matrix to compare their statutory strictness side by side.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto bg-white border border-[#EAE5DB] rounded-xl shadow-sm">
              <table className="w-full text-left text-xs border-collapse">
                {/* Table Header: Country Cards */}
                <thead>
                  <tr className="border-b border-[#EAE5DB] bg-[#FAF7F2]">
                    <th className="p-4 w-44 font-semibold text-[#78716C] uppercase text-[10px] tracking-wider border-r border-[#EAE5DB]">
                      Criteria
                    </th>
                    {countries.map((c) => (
                      <th key={c.id} className="p-4 min-w-[240px] border-r border-[#EAE5DB] last:border-r-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <span className="text-2xl">{c.flag}</span>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold text-sm text-[#1C1917]">{c.country}</span>
                                <span className="text-[10px] font-mono px-1 rounded bg-[#F4EFE6] text-[#78716C]">
                                  {c.code}
                                </span>
                              </div>
                              <span className="text-xs text-[#78716C] font-normal">{c.continent}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => onRemoveCountry(c.id)}
                            className="p-1 text-[#78716C] hover:text-[#C2410C] hover:bg-[#F4EFE6] rounded transition-colors"
                            title="Remove"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#EAE5DB]">
                  {/* Row 1: Strictness Index */}
                  <tr>
                    <td className="p-3.5 font-semibold text-[#78716C] bg-[#FAF7F2]/50 border-r border-[#EAE5DB] align-middle">
                      Strictness Index
                    </td>
                    {countries.map((c) => (
                      <td key={c.id} className="p-3.5 border-r border-[#EAE5DB] last:border-r-0 align-middle">
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className={`px-2 py-0.5 rounded text-xs font-mono font-bold border ${getStrictnessStyle(c.strictnessScore)}`}>
                            {c.strictnessScore.toFixed(1)} / 10
                          </span>
                          <span className="text-[11px] font-medium text-[#78716C]">{c.strictnessRating}</span>
                        </div>
                        <div className="w-full bg-[#F4EFE6] h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${getScoreBarColor(c.strictnessScore)}`}
                            style={{ width: `${(c.strictnessScore / 10) * 100}%` }}
                          />
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Row 2: Primary Governing Statute */}
                  <tr>
                    <td className="p-3.5 font-semibold text-[#78716C] bg-[#FAF7F2]/50 border-r border-[#EAE5DB] align-top">
                      Primary Statute
                    </td>
                    {countries.map((c) => (
                      <td key={c.id} className="p-3.5 border-r border-[#EAE5DB] last:border-r-0 align-top">
                        <div className="font-semibold text-[#1C1917] mb-1">
                          {c.primaryActs[0]?.title}
                        </div>
                        <p className="text-[#78716C] text-[11px] leading-relaxed">
                          {c.primaryActs[0]?.summary}
                        </p>
                      </td>
                    ))}
                  </tr>

                  {/* Row 3: Maximum Incarceration */}
                  <tr>
                    <td className="p-3.5 font-semibold text-[#78716C] bg-[#FAF7F2]/50 border-r border-[#EAE5DB] align-middle">
                      Max Incarceration
                    </td>
                    {countries.map((c) => (
                      <td key={c.id} className="p-3.5 border-r border-[#EAE5DB] last:border-r-0 align-middle font-semibold text-[#C2410C]">
                        {c.primaryActs[0]?.maxPrison || "Statutory maximums apply"}
                      </td>
                    ))}
                  </tr>

                  {/* Row 4: Financial Penalties */}
                  <tr>
                    <td className="p-3.5 font-semibold text-[#78716C] bg-[#FAF7F2]/50 border-r border-[#EAE5DB] align-middle">
                      Financial Penalties
                    </td>
                    {countries.map((c) => (
                      <td key={c.id} className="p-3.5 border-r border-[#EAE5DB] last:border-r-0 align-middle font-medium text-[#B45309]">
                        {c.primaryActs[0]?.maxFine || "Civil damages"}
                      </td>
                    ))}
                  </tr>

                  {/* Row 5: Breach Reporting Deadline */}
                  <tr>
                    <td className="p-3.5 font-semibold text-[#78716C] bg-[#FAF7F2]/50 border-r border-[#EAE5DB] align-middle">
                      Breach Notice Window
                    </td>
                    {countries.map((c) => (
                      <td key={c.id} className="p-3.5 border-r border-[#EAE5DB] last:border-r-0 align-middle font-semibold text-[#1C1917]">
                        {c.breachReportingHours}
                      </td>
                    ))}
                  </tr>

                  {/* Row 6: AI Cybercrime Legislation */}
                  <tr>
                    <td className="p-3.5 font-semibold text-[#78716C] bg-[#FAF7F2]/50 border-r border-[#EAE5DB] align-top">
                      AI & Deepfake Law
                    </td>
                    {countries.map((c) => (
                      <td key={c.id} className="p-3.5 border-r border-[#EAE5DB] last:border-r-0 align-top">
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <span
                            className={`text-[9px] font-semibold uppercase px-2 py-0.5 rounded border ${
                              c.aiCybercrime.status === "enacted"
                                ? "bg-[#E8F0EC] text-[#2D5A43] border-[#C2D6CC]"
                                : c.aiCybercrime.status === "pending"
                                ? "bg-[#FEF3C7] text-[#B45309] border-[#FDE68A]"
                                : "bg-[#F4EFE6] text-[#78716C] border-[#EAE5DB]"
                            }`}
                          >
                            {c.aiCybercrime.status === "enacted"
                              ? "Enacted Law"
                              : c.aiCybercrime.status === "pending"
                              ? "Pending Bill"
                              : "General Statutes"}
                          </span>
                          <span className="font-semibold text-xs text-[#1C1917] truncate">
                            {c.aiCybercrime.actName}
                          </span>
                        </div>
                        <p className="text-[#78716C] text-[11px] leading-relaxed mb-2">
                          {c.aiCybercrime.summary}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {c.aiCybercrime.coveredOffenses.map((offense, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] bg-[#FAF7F2] text-[#78716C] px-1.5 py-0.5 rounded border border-[#EAE5DB]"
                            >
                              {offense}
                            </span>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Row 7: Pending & Unnotified Acts (Clean, unboxed bullet list) */}
                  <tr>
                    <td className="p-3.5 font-semibold text-[#78716C] bg-[#FAF7F2]/50 border-r border-[#EAE5DB] align-top">
                      Pending & Unnotified Acts
                    </td>
                    {countries.map((c) => (
                      <td key={c.id} className="p-3.5 border-r border-[#EAE5DB] last:border-r-0 align-top">
                        {c.pendingOrDraftActs && c.pendingOrDraftActs.length > 0 ? (
                          <div className="space-y-2">
                            {c.pendingOrDraftActs.map((act) => (
                              <div key={act.id} className="text-xs">
                                <div className="flex items-center gap-1.5 mb-0.5">
                                  <span className="font-semibold text-[#1C1917]">{act.title}</span>
                                  <span className="text-[9px] uppercase px-1.5 py-0.2 rounded font-bold bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A] shrink-0">
                                    {act.status === "pending_notification" ? "Unnotified" : "Draft"}
                                  </span>
                                </div>
                                <p className="text-[11px] text-[#78716C] leading-relaxed">
                                  {act.pendingNoticeDetails || act.summary}
                                </p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span className="text-[11px] text-[#78716C] italic">
                            All governing statutes fully notified
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Row 8: Extraterritoriality & Lead Authority */}
                  <tr>
                    <td className="p-3.5 font-semibold text-[#78716C] bg-[#FAF7F2]/50 border-r border-[#EAE5DB] align-middle">
                      Enforcement Agency
                    </td>
                    {countries.map((c) => (
                      <td key={c.id} className="p-3.5 border-r border-[#EAE5DB] last:border-r-0 align-middle">
                        <div className="font-medium text-[#1C1917] mb-0.5">
                          {c.leadEnforcementAgency}
                        </div>
                        <span className="text-[11px] text-[#2D5A43] font-medium">
                          {c.extraterritorialReach ? "Active Extraterritorial Jurisdiction" : "Domestic Jurisdiction"}
                        </span>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
