"use client";

import React, { useState } from "react";
import { CountryCyberLaw } from "@/data/countries";
import {
  Cpu,
  ShieldCheck,
  Eye,
  Mic,
  Bot,
  Database,
  Sparkles,
} from "lucide-react";

interface AICybercrimesViewProps {
  countries: CountryCyberLaw[];
  onTriggerAIPrompt: (prompt: string) => void;
}

export const AICybercrimesView: React.FC<AICybercrimesViewProps> = ({
  countries,
  onTriggerAIPrompt,
}) => {
  const [selectedThreat, setSelectedThreat] = useState<string>("deepfakes");

  const threatCategories = [
    {
      id: "deepfakes",
      title: "Deepfake Impersonation & Harassment",
      icon: Eye,
      description:
        "Generation and dissemination of non-consensual sexually explicit imagery, political disinformation, and synthetic identity cloning.",
      keyStatutes: [
        "EU: EU AI Act Art. 50 (Mandatory watermark disclosure) & Art. 5 (Banned biometric manipulation)",
        "USA: DEFIANCE Act (Senate passed 2024 - $150k damages) + State Penal Codes (CA AB 602, TX SB 751)",
        "UK: Online Safety Act 2023 (Criminal offense for creating/sharing intimate deepfakes, up to 2 yrs)",
        "UAE: Federal Decree-Law No. 34 Art. 44 (Imprisonment + up to AED 500,000 fine)",
        "Singapore: Elections (Integrity of Online Advertising) Act 2024 (Outlawed candidate deepfakes)",
      ],
    },
    {
      id: "voice-cloning",
      title: "AI Voice Cloning & Financial Extortion",
      icon: Mic,
      description:
        "Using short audio samples to clone voices of executives or relatives for fraudulent fund transfers, CEO fraud, and emergency extortion.",
      keyStatutes: [
        "USA: FCC Declaratory Ruling 2024 (Outlawing AI voice-cloning robocalls under TCPA) + Wire Fraud (18 U.S.C. § 1343)",
        "India: IT Act Sec 66D (Cheating by personation) + BNS Sec 318 (Cheating and criminal breach of trust)",
        "China: Deep Synthesis Provisions 2023 (Mandatory real-name verification and audible watermark)",
      ],
    },
    {
      id: "autonomous-agents",
      title: "Autonomous Offensive Agents & Prompt Injection",
      icon: Bot,
      description:
        "Autonomous models deployed for automated vulnerability discovery, spear-phishing campaigns at scale, or manipulated via prompt injection.",
      keyStatutes: [
        "EU: NIS2 Directive Art. 21 + EU AI Act (GPAI systemic risk containment & cybersecurity testing)",
        "USA: CFAA (18 U.S.C. § 1030) (Exceeding authorized access via synthetic automation)",
        "Estonia: Kratt Autonomous AI Framework (Strict civil liability for autonomous agent actions)",
      ],
    },
    {
      id: "model-poisoning",
      title: "Model Poisoning & Training Data Theft",
      icon: Database,
      description:
        "Injecting malicious backdoors into foundational training sets, unconsented scraping of biometric data, and model inversion attacks extracting private weights.",
      keyStatutes: [
        "EU: GDPR Article 32 (Data security breaches) & EU AI Act training data transparency rules",
        "China: Data Security Law (Core State Data export restrictions on foundation models)",
        "Canada: Bill C-27 AIDA (Severe corporate penalties for using deceptively biased training data)",
      ],
    },
  ];

  return (
    <div className="space-y-6 font-sans">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-white border border-[#EAE5DB] shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#F4EFE6] text-[#7C4A27] border border-[#EAE5DB] text-[10px] font-semibold uppercase tracking-wider">
              <Cpu className="w-3.5 h-3.5 text-[#7C4A27]" />
              <span>Next-Gen AI Jurisprudence</span>
            </div>
            <h2 className="text-xl font-bold text-[#1C1917] tracking-tight">
              AI-Related Cybercrimes & Emerging Threat Legislation
            </h2>
            <p className="text-xs text-[#78716C] max-w-3xl leading-relaxed">
              As generative AI and autonomous systems scale, traditional computer crime statutes are being tested. Explore how international legal frameworks are adapting to penalize deepfakes, voice cloning fraud, autonomous malware, and model training liabilities.
            </p>
          </div>

          <button
            onClick={() =>
              onTriggerAIPrompt(
                "Provide a comprehensive comparative analysis of global deepfake criminal laws between the EU, USA, India, and China."
              )
            }
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-[#7C4A27] hover:bg-[#63391C] text-white shadow-sm transition-all shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate AI Law Dossier</span>
          </button>
        </div>
      </div>

      {/* 4 Threat Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {threatCategories.map((threat) => {
          const Icon = threat.icon;
          const isSelected = selectedThreat === threat.id;
          return (
            <div
              key={threat.id}
              onClick={() => setSelectedThreat(threat.id)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                isSelected
                  ? "bg-[#FAF7F2] border-[#7C4A27] shadow-sm"
                  : "bg-white border-[#EAE5DB] hover:border-[#D6CEBF]"
              }`}
            >
              <div className="flex items-center gap-2.5 mb-2">
                <div
                  className={`p-2 rounded-lg ${
                    isSelected
                      ? "bg-[#7C4A27] text-white"
                      : "bg-[#F4EFE6] text-[#7C4A27]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-xs text-[#1C1917] leading-tight">
                  {threat.title}
                </h3>
              </div>
              <p className="text-xs text-[#78716C] line-clamp-3 leading-relaxed">
                {threat.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Selected Threat Deep Dive */}
      {(() => {
        const current = threatCategories.find((t) => t.id === selectedThreat);
        if (!current) return null;
        return (
          <div className="p-5 rounded-xl bg-white border border-[#EAE5DB] shadow-sm">
            <h3 className="text-sm font-bold text-[#1C1917] mb-1.5 flex items-center gap-2">
              <span className="text-[#7C4A27]">Statutory Precedents:</span> {current.title}
            </h3>
            <p className="text-xs text-[#78716C] mb-3">{current.description}</p>
            <div className="space-y-2">
              {current.keyStatutes.map((statute, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-[#FAF7F2] border border-[#EAE5DB] text-xs text-[#1C1917] flex items-start gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-[#7C4A27] shrink-0 mt-0.5" />
                  <span className="text-xs">{statute}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })()}

      {/* Country AI Status Table */}
      <div className="p-5 rounded-xl bg-white border border-[#EAE5DB] shadow-sm">
        <h3 className="text-sm font-bold text-[#1C1917] mb-4 flex items-center gap-2">
          <Cpu className="w-4 h-4 text-[#7C4A27]" />
          <span>Global Matrix of AI Cyber Legislation</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#1C1917]">
            <thead className="bg-[#FAF7F2] text-[#78716C] uppercase font-mono tracking-wider text-[10px] border-b border-[#EAE5DB]">
              <tr>
                <th className="py-2.5 px-4">Jurisdiction</th>
                <th className="py-2.5 px-4">Statutory Status</th>
                <th className="py-2.5 px-4">Key AI Regulation / Bill</th>
                <th className="py-2.5 px-4">Targeted Offenses</th>
                <th className="py-2.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE5DB]/60">
              {countries.map((c) => (
                <tr key={c.id} className="hover:bg-[#FAF7F2]/50 transition-colors">
                  <td className="py-3 px-4 font-semibold text-[#1C1917] flex items-center gap-2">
                    <span className="text-lg">{c.flag}</span>
                    <span>{c.country}</span>
                    <span className="text-[10px] text-[#78716C] font-mono">({c.code})</span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
                        c.aiCybercrime.status === "enacted"
                          ? "bg-[#E8F0EC] text-[#2D5A43] border border-[#C2D6CC]"
                          : c.aiCybercrime.status === "pending"
                          ? "bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A]"
                          : "bg-[#F4EFE6] text-[#78716C]"
                      }`}
                    >
                      {c.aiCybercrime.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[#78716C] max-w-xs truncate">
                    {c.aiCybercrime.actName}
                  </td>
                  <td className="py-3 px-4 text-[#78716C] max-w-md">
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
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() =>
                        onTriggerAIPrompt(
                          `Detail the AI cybercrime laws and deepfake penalties in ${c.country} (${c.aiCybercrime.actName}).`
                        )
                      }
                      className="text-[#7C4A27] hover:underline font-medium text-xs inline-flex items-center gap-1"
                    >
                      <span>Analyze</span>
                      <Sparkles className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
