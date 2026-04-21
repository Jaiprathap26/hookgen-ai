"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import GenerateForm from "@/components/GenerateForm";
import HookCard from "@/components/HookCard";
import ScriptCard from "@/components/ScriptCard";

interface GenerateResult {
  hooks: string[];
  scripts: { hook: string; problem: string; story: string; cta: string }[];
  headlines: string[];
  ctas: string[];
  whatsappScripts?: string[];
}

type TabKey = "hooks" | "scripts" | "headlines" | "ctas" | "whatsapp";

export default function GeneratePage() {
  const [result, setResult] = useState<GenerateResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>("hooks");
  const [copiedAll, setCopiedAll] = useState(false);

  const handleResult = (data: unknown) => {
    setResult(data as GenerateResult);
    setActiveTab("hooks");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const copyAllHooks = async () => {
    if (!result) return;
    const text = result.hooks.map((h, i) => `Hook #${i + 1}: ${h}`).join("\n\n");
    await navigator.clipboard.writeText(text);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const tabs: { key: TabKey; label: string; count?: number }[] = [
    { key: "hooks", label: "🎯 Hooks", count: result?.hooks?.length },
    { key: "scripts", label: "🎬 Scripts", count: result?.scripts?.length },
    { key: "headlines", label: "📰 Headlines", count: result?.headlines?.length },
    { key: "ctas", label: "🔥 CTAs", count: result?.ctas?.length },
    ...(result?.whatsappScripts
      ? [{ key: "whatsapp" as TabKey, label: "💬 WhatsApp", count: result.whatsappScripts.length }]
      : []),
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      <Header />
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-white mb-2">
              Generate Viral UGC Hooks
            </h1>
            <p className="text-gray-400">
              Fill in your product details → get 25 hooks + 3 scripts in 30 seconds
            </p>
          </div>

          {loading && (
            <div className="text-center py-16">
              <div className="inline-block w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-gray-400">Generating your hooks & scripts...</p>
              <p className="text-gray-600 text-sm mt-1">Usually takes 10-20 seconds</p>
            </div>
          )}

          {!loading && !result && (
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-8">
              <GenerateForm onResult={handleResult} onLoading={setLoading} />
            </div>
          )}

          {!loading && result && (
            <div className="space-y-6 animate-slide-up">
              {/* Success banner */}
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl px-5 py-3 flex items-center justify-between">
                <span className="text-green-400 font-medium text-sm">
                  ✓ Generated {result.hooks.length} hooks + {result.scripts.length} scripts
                </span>
                <button
                  onClick={() => setResult(null)}
                  className="text-xs text-gray-400 hover:text-white transition-colors"
                >
                  Generate again →
                </button>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                      activeTab === tab.key
                        ? "bg-orange-500 text-white"
                        : "bg-gray-800 text-gray-400 hover:text-white"
                    }`}
                  >
                    {tab.label} {tab.count !== undefined && `(${tab.count})`}
                  </button>
                ))}
              </div>

              {/* Hooks Tab */}
              {activeTab === "hooks" && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="font-semibold text-white">
                      25 Viral Hooks
                    </h2>
                    <button
                      onClick={copyAllHooks}
                      className="text-sm text-gray-400 hover:text-white transition-colors border border-gray-600 hover:border-white px-3 py-1.5 rounded-lg"
                    >
                      {copiedAll ? "✓ Copied all" : "Copy all hooks"}
                    </button>
                  </div>
                  <div className="grid gap-3">
                    {result.hooks.map((hook, i) => (
                      <HookCard key={i} hook={hook} index={i} />
                    ))}
                  </div>
                </div>
              )}

              {/* Scripts Tab */}
              {activeTab === "scripts" && (
                <div>
                  <h2 className="font-semibold text-white mb-4">
                    3 Full UGC Video Scripts
                  </h2>
                  <div className="space-y-4">
                    {result.scripts.map((script, i) => (
                      <ScriptCard key={i} script={script} index={i} />
                    ))}
                  </div>
                </div>
              )}

              {/* Headlines Tab */}
              {activeTab === "headlines" && (
                <div>
                  <h2 className="font-semibold text-white mb-4">
                    10 Ad Headlines
                  </h2>
                  <div className="grid gap-3">
                    {result.headlines.map((headline, i) => (
                      <div
                        key={i}
                        className="bg-gray-800 border border-gray-700 rounded-xl p-4 flex items-start justify-between gap-3 group hover:border-orange-500/40 transition-colors"
                      >
                        <span className="text-xs text-orange-400 font-mono shrink-0">
                          #{String(i + 1).padStart(2, "0")}
                        </span>
                        <p className="text-white text-sm flex-1">{headline}</p>
                        <button
                          onClick={() => navigator.clipboard.writeText(headline)}
                          className="text-xs text-gray-500 hover:text-white opacity-0 group-hover:opacity-100 transition-all border border-gray-600 hover:border-white px-2 py-1 rounded shrink-0"
                        >
                          Copy
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTAs Tab */}
              {activeTab === "ctas" && (
                <div>
                  <h2 className="font-semibold text-white mb-4">
                    5 CTA Options
                  </h2>
                  <div className="grid gap-3">
                    {result.ctas.map((cta, i) => (
                      <div
                        key={i}
                        className="bg-gray-800 border border-gray-700 rounded-xl p-4 flex items-center justify-between gap-3 group hover:border-orange-500/40 transition-colors"
                      >
                        <p className="text-white text-sm">{cta}</p>
                        <button
                          onClick={() => navigator.clipboard.writeText(cta)}
                          className="text-xs text-gray-500 hover:text-white opacity-0 group-hover:opacity-100 transition-all border border-gray-600 hover:border-white px-2 py-1 rounded shrink-0"
                        >
                          Copy
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* WhatsApp Scripts Tab */}
              {activeTab === "whatsapp" && result.whatsappScripts && (
                <div>
                  <h2 className="font-semibold text-white mb-4">
                    WhatsApp Status Scripts
                  </h2>
                  <div className="grid gap-4">
                    {result.whatsappScripts.map((script, i) => (
                      <div
                        key={i}
                        className="bg-gray-800 border border-gray-700 rounded-xl p-5"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs text-green-400 font-medium">
                            WhatsApp Script #{i + 1}
                          </span>
                          <button
                            onClick={() => navigator.clipboard.writeText(script)}
                            className="text-xs text-gray-400 hover:text-white border border-gray-600 hover:border-white px-2 py-1 rounded transition-colors"
                          >
                            Copy
                          </button>
                        </div>
                        <p className="text-gray-200 text-sm whitespace-pre-wrap">
                          {script}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Upgrade CTA */}
              <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-2xl p-6 text-center">
                <p className="text-white font-semibold mb-1">
                  Need unlimited hooks? Upgrade to Pro
                </p>
                <p className="text-gray-400 text-sm mb-4">
                  $9/mo (₹749/mo) · Unlimited generations · Batch CSV export · 5× cheaper than Creatify India
                </p>
                <Link
                  href="/pricing"
                  className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-2.5 rounded-xl transition-colors"
                >
                  See Pricing →
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
