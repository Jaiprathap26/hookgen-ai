"use client";

import { useState } from "react";

interface Script {
  hook: string;
  problem: string;
  story: string;
  cta: string;
}

interface ScriptCardProps {
  script: Script;
  index: number;
}

export default function ScriptCard({ script, index }: ScriptCardProps) {
  const [copied, setCopied] = useState(false);

  const fullScript = `[HOOK] ${script.hook}\n\n[PROBLEM] ${script.problem}\n\n[STORY/DEMO] ${script.story}\n\n[CTA] ${script.cta}`;

  const copy = async () => {
    await navigator.clipboard.writeText(fullScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold text-orange-400">
          Script #{index + 1}
        </span>
        <button
          onClick={copy}
          className="text-xs text-gray-400 hover:text-white transition-colors px-3 py-1.5 rounded border border-gray-600 hover:border-white"
        >
          {copied ? "✓ Copied all" : "Copy script"}
        </button>
      </div>

      <div className="space-y-3">
        <div className="bg-gray-900 rounded-lg p-3">
          <div className="text-xs font-mono text-orange-400 mb-1">[HOOK — first 2-3 seconds]</div>
          <p className="text-white text-sm">{script.hook}</p>
        </div>
        <div className="bg-gray-900 rounded-lg p-3">
          <div className="text-xs font-mono text-blue-400 mb-1">[PROBLEM]</div>
          <p className="text-gray-200 text-sm">{script.problem}</p>
        </div>
        <div className="bg-gray-900 rounded-lg p-3">
          <div className="text-xs font-mono text-green-400 mb-1">[STORY / DEMO]</div>
          <p className="text-gray-200 text-sm">{script.story}</p>
        </div>
        <div className="bg-gray-900 rounded-lg p-3">
          <div className="text-xs font-mono text-purple-400 mb-1">[CTA]</div>
          <p className="text-gray-200 text-sm">{script.cta}</p>
        </div>
      </div>
    </div>
  );
}
