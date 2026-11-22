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
  Terminal,
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
        "Using 3-second audio samples to clone voices of executives or family members for unauthorized bank transfers, CEO fraud, and emergency scams.",
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
        "Autonomous LLM agents weaponized to execute vulnerability discovery, spear-phishing campaigns at scale, or jailbroken via indirect prompt injections.",
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
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/30 via-[#070b14] to-[#070b14] border border-purple-500/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-500/10 border border-purple-500/30 text-purple-300 text-[10px] font-mono font-bold uppercase tracking-wider">
              <Cpu className="w-3.5 h-3.5 text-purple-400" />
              <span>NEXT-GEN AI JURISPRUDENCE</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              AI-Related Cybercrimes & Emerging Threat Legislation
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              As generative models and autonomous agents scale, traditional 20th-century computer crime statutes fall short. Analyze how international statutory frameworks are evolving to address deepfakes, synthetic voice extortion, offensive autonomous malware, and foundational model liability.
            </p>
          </div>

          <button
            onClick={() =>
              onTriggerAIPrompt(
                "Provide a comprehensive comparative analysis of global deepfake criminal laws between the EU, USA, India, and China."
              )
            }
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white shadow-lg shadow-purple-500/20 active:scale-95 transition-all shrink-0 border border-purple-400/30"
          >
            <Terminal className="w-3.5 h-3.5 text-purple-200" />
            <span>GENERATE AI LAW DOSSIER</span>
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
                  ? "bg-purple-950/40 border-purple-500/80 shadow-lg shadow-purple-950/50"
                  : "bg-[#080d1a] border-slate-800 hover:border-slate-700"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className={`p-2 rounded-lg ${
                    isSelected
                      ? "bg-purple-500 text-white shadow-md shadow-purple-500/30"
                      : "bg-slate-900 text-purple-400 border border-slate-800"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-xs sm:text-sm text-white leading-tight">
                  {threat.title}
                </h3>
              </div>
              <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
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
          <div className="p-5 rounded-xl bg-[#080d1a] border border-slate-800">
            <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <span className="text-purple-400 font-mono">[STATUTORY PRECEDENTS]</span> {current.title}
            </h3>
            <p className="text-xs text-slate-300 mb-4">{current.description}</p>
            <div className="space-y-2">
              {current.keyStatutes.map((statute, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5 font-mono"
                >
                  <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="font-sans text-xs">{statute}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })()}

      {/* Country AI Status Table */}
      <div className="p-5 rounded-xl bg-[#080d1a] border border-slate-800">
        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 font-mono">
          <Cpu className="w-4 h-4 text-cyan-400" />
          <span className="uppercase tracking-wider">Jurisdictional AI Legislation Matrix</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase font-mono tracking-wider text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Jurisdiction</th>
                <th className="py-3 px-4">Statutory Status</th>
                <th className="py-3 px-4">Key Regulation / Act</th>
                <th className="py-3 px-4">Targeted Synthetic Offenses</th>
                <th className="py-3 px-4 text-right">Intel Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {countries.map((c) => (
                <tr key={c.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-3 px-4 font-sans font-bold text-white flex items-center gap-2">
                    <span className="text-lg filter drop-shadow">{c.flag}</span>
                    <span>{c.country}</span>
                    <span className="text-[10px] font-mono text-slate-500">[{c.code}]</span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                        c.aiCybercrime.status === "enacted"
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                          : c.aiCybercrime.status === "pending"
                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {c.aiCybercrime.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-sans text-slate-300 max-w-xs truncate text-xs">
                    {c.aiCybercrime.actName}
                  </td>
                  <td className="py-3 px-4 font-sans text-slate-400 max-w-md">
                    <div className="flex flex-wrap gap-1">
                      {c.aiCybercrime.coveredOffenses.map((offense, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-mono bg-slate-950 text-slate-300 px-1.5 py-0.5 rounded border border-slate-800"
                        >
                          {offense}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right font-mono">
                    <button
                      onClick={() =>
                        onTriggerAIPrompt(
                          `Detail the AI cybercrime laws and deepfake penalties in ${c.country} (${c.aiCybercrime.actName}).`
                        )
                      }
                      className="text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-1 hover:underline text-xs"
                    >
                      <span>QUERY</span>
                      <Terminal className="w-3 h-3" />
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
