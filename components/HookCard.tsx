"use client";

import { useState } from "react";

interface HookCardProps {
  hook: string;
  index: number;
  onVariant?: (hook: string) => void;
}

export default function HookCard({ hook, index, onVariant }: HookCardProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(hook);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 hover:border-orange-500/50 transition-colors group animate-fade-in">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-mono text-orange-400 bg-orange-400/10 px-2 py-0.5 rounded">
            #{String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {onVariant && (
            <button
              onClick={() => onVariant(hook)}
              className="text-xs text-gray-400 hover:text-orange-400 transition-colors px-2 py-1 rounded border border-gray-600 hover:border-orange-400"
            >
              A/B
            </button>
          )}
          <button
            onClick={copy}
            className="text-xs text-gray-400 hover:text-white transition-colors px-2 py-1 rounded border border-gray-600 hover:border-white"
          >
            {copied ? "✓ Copied" : "Copy"}
          </button>
        </div>
      </div>
      <p className="mt-2 text-white text-sm leading-relaxed">{hook}</p>
    </div>
  );
}
