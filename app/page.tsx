import Link from "next/link";
import Header from "@/components/Header";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-1.5 text-orange-400 text-sm font-medium mb-6">
            🔥 5x cheaper than Creatify India — ₹749/mo vs ₹3,500/mo
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            Generate{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">
              Viral UGC Hooks
            </span>
            <br />
            in 30 Seconds
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            25 scroll-stopping hooks + 3 full ad scripts for TikTok, Instagram Reels &amp; Facebook
            — powered by Claude AI. Stop writing copy. Start testing it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/generate"
              className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 text-white font-bold px-8 py-4 rounded-2xl text-lg transition-all transform hover:scale-105"
            >
              Try Free — 10 Hook Sets/Day
            </Link>
            <Link
              href="/pricing"
              className="border border-gray-600 hover:border-orange-500 text-gray-300 hover:text-white font-semibold px-8 py-4 rounded-2xl text-lg transition-all"
            >
              See Pricing →
            </Link>
          </div>
          <p className="text-gray-500 text-sm mt-4">
            No credit card required · No signup needed · 10 free hook sets/day
          </p>
        </div>
      </section>

      {/* Live Demo Preview */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8">
            <div className="text-gray-400 text-sm mb-4 font-mono">
              Input: "GlowSerum Pro — Anti-aging serum | Women 28-45 | TikTok | Emotional"
            </div>
            <div className="space-y-3">
              {[
                "POV: I wasted ₹15,000 on skincare before finding this one serum...",
                "Dermatologists don't want you to know this costs ₹999",
                "I'm 42 and people think I'm 30. Here's my secret 👇",
                "My skin at 35 vs my skin at 40. The difference is ONE product.",
                "This serum cleared 8 years of damage in 60 days. Not clickbait.",
              ].map((hook, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-gray-800/50 rounded-xl p-4"
                >
                  <span className="text-orange-400 font-bold text-sm min-w-[28px]">
                    #{i + 1}
                  </span>
                  <span className="text-gray-200">{hook}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link
                href="/generate"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                Generate hooks for YOUR product →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything you need to launch faster
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "⚡",
                title: "25 Hooks in 30 Seconds",
                desc: "Claude AI generates scroll-stopping first-line hooks across every psychological trigger — curiosity, confession, bold claim, testimonial, PAB.",
              },
              {
                icon: "🎬",
                title: "Full UGC Video Scripts",
                desc: "3 complete 30-60 second scripts with Hook → Problem → Story → CTA structure. Ready to hand to any UGC creator.",
              },
              {
                icon: "🇮🇳",
                title: "India Mode (Hinglish)",
                desc: "One toggle adds Hinglish hooks, Diwali/IPL/wedding festival angles, and WhatsApp-style CTAs. Built for India-first brands.",
              },
              {
                icon: "📱",
                title: "Platform-Specific Output",
                desc: "TikTok, Instagram Reels, YouTube Shorts, Facebook, or All. Hooks are tuned for each platform's native style and audience.",
              },
              {
                icon: "🔗",
                title: "Shareable Score URLs",
                desc: "Every session gets a permanent link. Share your best hooks with teammates or post your score on Twitter to drive traffic.",
              },
              {
                icon: "📊",
                title: "Bulk CSV Upload (Agency)",
                desc: "Upload 20 products at once → download 500 hooks as a spreadsheet. Built for agencies running multiple client campaigns.",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-orange-500/50 transition-colors"
              >
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 px-4 bg-gray-900/50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Simple, honest pricing</h2>
          <p className="text-gray-400 mb-12">
            Start free. Upgrade when you need more.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Free",
                price: "$0",
                inr: "₹0",
                limit: "10 hook sets/day",
                features: ["25 hooks per set", "3 full scripts", "10 headlines + CTAs", "No signup needed"],
                cta: "Start Free",
                href: "/generate",
                highlight: false,
              },
              {
                name: "Pro",
                price: "$9",
                inr: "₹749",
                limit: "per month",
                features: ["Unlimited hook sets", "India Mode (Hinglish)", "WhatsApp Status scripts", "Shareable links", "A/B variant generator"],
                cta: "Get Pro",
                href: "/pricing",
                highlight: true,
              },
              {
                name: "Agency",
                price: "$29",
                inr: "₹2,499",
                limit: "per month",
                features: ["Everything in Pro", "Bulk CSV upload (20 products)", "500 hooks as spreadsheet", "Team access", "White-label output"],
                cta: "Get Agency",
                href: "/pricing",
                highlight: false,
              },
            ].map((tier, i) => (
              <div
                key={i}
                className={`rounded-2xl p-6 border ${
                  tier.highlight
                    ? "border-orange-500 bg-gradient-to-b from-orange-500/10 to-transparent"
                    : "border-gray-700 bg-gray-900"
                }`}
              >
                {tier.highlight && (
                  <div className="text-orange-400 text-xs font-bold uppercase tracking-wider mb-2">
                    Most Popular
                  </div>
                )}
                <div className="text-2xl font-extrabold mb-0.5">{tier.price}<span className="text-base font-normal text-gray-400"> /mo</span></div>
                <div className="text-gray-500 text-sm mb-1">{tier.inr}/mo</div>
                <div className="text-sm text-gray-400 mb-4">{tier.limit}</div>
                <div className="font-bold text-lg mb-4">{tier.name}</div>
                <ul className="text-sm text-gray-400 space-y-2 mb-6 text-left">
                  {tier.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2">
                      <span className="text-green-400">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={tier.href}
                  className={`block text-center py-3 rounded-xl font-semibold transition-colors ${
                    tier.highlight
                      ? "bg-orange-500 hover:bg-orange-400 text-white"
                      : "border border-gray-600 hover:border-orange-500 text-gray-300 hover:text-white"
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
          <p className="text-gray-500 text-sm mt-6">
            🇮🇳 vs Creatify India: ₹749/mo vs ₹3,500/mo — 5x cheaper, text-based, no video credits
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-800 text-center text-gray-500 text-sm">
        <p>HookGen.ai — Stop writing ad copy. Start testing it.</p>
        <p className="mt-2">
          <Link href="/generate" className="hover:text-orange-400 transition-colors">Generator</Link>
          {" · "}
          <Link href="/pricing" className="hover:text-orange-400 transition-colors">Pricing</Link>
        </p>
      </footer>
    </div>
  );
}
