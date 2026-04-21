"use client";

import { useState } from "react";

const PLATFORMS = ["TikTok", "Instagram Reels", "YouTube Shorts", "Facebook", "All"];
const TONES = ["Funny", "Emotional", "Problem-Agitate-Solve", "Curiosity", "Bold Claim"];

interface GenerateFormProps {
  onResult: (result: unknown) => void;
  onLoading: (loading: boolean) => void;
}

export default function GenerateForm({ onResult, onLoading }: GenerateFormProps) {
  const [form, setForm] = useState({
    productName: "",
    productDescription: "",
    audience: "",
    platform: "TikTok",
    tone: "Problem-Agitate-Solve",
    indiaMode: false,
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.productName.trim() || !form.productDescription.trim() || !form.audience.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    onLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 429) {
          setError(
            data.message ||
              "Daily limit reached. Upgrade to Pro ($9/mo) for unlimited generation."
          );
        } else {
          setError(data.error || "Generation failed. Please try again.");
        }
        return;
      }

      onResult(data.data);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      onLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">
          Product Name <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={form.productName}
          onChange={(e) => setForm({ ...form, productName: e.target.value })}
          placeholder="e.g. GlowSerum Pro"
          className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-colors"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">
          Product Description <span className="text-red-400">*</span>
        </label>
        <textarea
          value={form.productDescription}
          onChange={(e) =>
            setForm({ ...form, productDescription: e.target.value })
          }
          placeholder="2-3 sentences: what it does, key benefit, what makes it different..."
          rows={3}
          className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-colors resize-none"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">
          Target Audience <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={form.audience}
          onChange={(e) => setForm({ ...form, audience: e.target.value })}
          placeholder="e.g. women 25-40 interested in skincare and anti-aging"
          className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-colors"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            Platform
          </label>
          <select
            value={form.platform}
            onChange={(e) => setForm({ ...form, platform: e.target.value })}
            className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-orange-500 focus:outline-none transition-colors"
          >
            {PLATFORMS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            Tone
          </label>
          <select
            value={form.tone}
            onChange={(e) => setForm({ ...form, tone: e.target.value })}
            className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-orange-500 focus:outline-none transition-colors"
          >
            {TONES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* India Mode Toggle */}
      <div className="flex items-center justify-between bg-gray-800 border border-gray-700 rounded-xl px-4 py-3">
        <div>
          <p className="text-sm font-medium text-white">🇮🇳 India Mode</p>
          <p className="text-xs text-gray-400">
            Generates in Hinglish, references Indian culture & WhatsApp CTAs
          </p>
        </div>
        <button
          type="button"
          onClick={() => setForm({ ...form, indiaMode: !form.indiaMode })}
          className={`relative w-12 h-6 rounded-full transition-colors ${
            form.indiaMode ? "bg-orange-500" : "bg-gray-600"
          }`}
        >
          <span
            className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
              form.indiaMode ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
          {error}
          {error.includes("limit") && (
            <a href="/pricing" className="underline ml-1 font-medium">
              Upgrade →
            </a>
          )}
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl text-lg transition-colors shadow-lg shadow-orange-500/25"
      >
        Generate 25 Hooks + Scripts →
      </button>

      <p className="text-center text-xs text-gray-500">
        10 free generations/day · No signup required
      </p>
    </form>
  );
}
