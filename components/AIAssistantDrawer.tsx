"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  X,
  Send,
  Globe,
  ExternalLink,
  Bot,
  User,
  Loader2,
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  sources?: Array<{ title: string; url: string }>;
  timestamp: string;
}

interface AIAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
  onClearInitialPrompt?: () => void;
}

export const AIAssistantDrawer: React.FC<AIAssistantDrawerProps> = ({
  isOpen,
  onClose,
  initialPrompt,
  onClearInitialPrompt,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "JurisLink Legal Research Assistant initialized. Grounded by Groq Llama-3.3-70B and real-time Tavily Web Search. Query comparative statutory penalties, draft legislation, or emerging AI cybercrime jurisprudence.",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [inputQuery, setInputQuery] = useState("");
  const [includeWebSearch, setIncludeWebSearch] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (initialPrompt && isOpen) {
      handleSend(initialPrompt);
      if (onClearInitialPrompt) onClearInitialPrompt();
    }
  }, [initialPrompt, isOpen]);

  const presetQueries = [
    "Compare US CFAA vs UK Computer Misuse Act penalties",
    "What is the notification status of India's DPDP Act rules?",
    "How does the EU AI Act penalize non-consensual deepfakes?",
    "Which country has the shortest mandatory breach reporting window?",
  ];

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = {
      role: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInputQuery("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai-research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: textToSend,
          includeWebSearch,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate AI legal analysis.");
      }

      const assistantMsg: Message = {
        role: "assistant",
        content: data.answer,
        sources: data.sources || [],
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `⚠️ Error: ${err.message || "Failed to connect to the intelligence engine."}`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#1C1917]/50 backdrop-blur-sm flex justify-end font-sans">
      <div className="w-full max-w-2xl bg-white border-l border-[#EAE5DB] h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="p-4 border-b border-[#EAE5DB] bg-[#FAF7F2] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#7C4A27] text-white flex items-center justify-center font-serif font-bold text-sm shadow-sm">
              AI
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#1C1917] flex items-center gap-2">
                Legal Research Assistant
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F4EFE6] text-[#7C4A27] border border-[#EAE5DB]">
                  Groq + Tavily
                </span>
              </h2>
              <p className="text-xs text-[#78716C]">
                Real-time comparative analysis & web-grounded legal citations
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

        {/* Live Search Toggle Bar */}
        <div className="px-4 py-2.5 bg-[#FAF7F2] border-b border-[#EAE5DB] flex items-center justify-between text-xs">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={includeWebSearch}
              onChange={(e) => setIncludeWebSearch(e.target.checked)}
              className="rounded border-[#D6CEBF] text-[#7C4A27] focus:ring-0"
            />
            <Globe className="w-3.5 h-3.5 text-[#7C4A27]" />
            <span className="text-[#1C1917] font-medium text-xs">
              Live Web Grounding (Tavily API)
            </span>
          </label>
          <span className="text-[11px] text-[#78716C] hidden sm:inline">
            Searches recent legislative gazettes
          </span>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FBF9F5]">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex gap-3 ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.role === "assistant" && (
                <div className="w-7 h-7 rounded-lg bg-white border border-[#EAE5DB] flex items-center justify-center shrink-0 text-[#7C4A27] mt-1 shadow-sm">
                  <Bot className="w-3.5 h-3.5" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed ${
                  msg.role === "user"
                    ? "bg-[#7C4A27] text-white rounded-tr-none shadow-sm"
                    : "bg-white border border-[#EAE5DB] text-[#1C1917] rounded-tl-none shadow-sm"
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.content}</div>

                {/* Sources / Citations */}
                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-[#EAE5DB]">
                    <span className="text-[10px] font-semibold text-[#78716C] uppercase tracking-wider block mb-1.5">
                      Grounding Citations:
                    </span>
                    <div className="space-y-1">
                      {msg.sources.map((s, idx) => (
                        <a
                          key={idx}
                          href={s.url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 text-[11px] text-[#7C4A27] hover:underline truncate"
                        >
                          <ExternalLink className="w-3 h-3 shrink-0" />
                          <span className="truncate">{s.title || s.url}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                <div
                  className={`text-[9px] mt-2 font-mono ${
                    msg.role === "user" ? "text-white/70" : "text-[#78716C]"
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>

              {msg.role === "user" && (
                <div className="w-7 h-7 rounded-lg bg-[#FAF7F2] border border-[#EAE5DB] flex items-center justify-center shrink-0 text-[#1C1917] mt-1">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-2.5 items-center text-[#78716C] text-xs">
              <Loader2 className="w-4 h-4 animate-spin text-[#7C4A27]" />
              <div className="p-3 rounded-xl bg-white border border-[#EAE5DB] shadow-sm">
                Searching web and analyzing comparative statutes with Groq...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Query Pills */}
        <div className="px-4 py-2 border-t border-[#EAE5DB] bg-[#FAF7F2] overflow-x-auto whitespace-nowrap">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] uppercase font-semibold text-[#78716C] shrink-0">
              Suggestions:
            </span>
            {presetQueries.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(preset)}
                className="px-2.5 py-1 rounded-full bg-white hover:bg-[#F3EFE6] text-[#1C1917] text-[11px] border border-[#EAE5DB] shrink-0 transition-colors"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-[#EAE5DB] bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Query statutory strictness, breach rules, or pending acts..."
              className="flex-1 bg-[#FAF7F2] border border-[#EAE5DB] rounded-xl px-4 py-2.5 text-xs text-[#1C1917] placeholder-[#78716C] focus:outline-none focus:border-[#7C4A27] transition-colors"
            />
            <button
              type="submit"
              disabled={isLoading || !inputQuery.trim()}
              className="p-2.5 rounded-xl bg-[#7C4A27] text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#63391C] transition-all shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
