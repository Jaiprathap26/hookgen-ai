import Header from "@/components/Header";
import PricingTable from "@/components/PricingTable";
import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Header />
      <main className="pt-28 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Start free. Upgrade when you need more. Cancel anytime.
            </p>
            <div className="mt-4 inline-block bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-1.5 text-orange-400 text-sm">
              🇮🇳 India pricing: Pro at ₹749/mo — 5× cheaper than Creatify
            </div>
          </div>

          <PricingTable />

          {/* FAQ */}
          <div className="mt-16 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white text-center mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: "Do I need a credit card for the free plan?",
                  a: "No. The free plan gives you 10 hook sets per day with zero signup required. Just paste your product and hit generate.",
                },
                {
                  q: "What's a 'hook set'?",
                  a: "One generation = 25 viral hooks + 3 full video scripts + 10 ad headlines + 5 CTAs. That's 43 pieces of copy per generation.",
                },
                {
                  q: "Can I cancel my subscription?",
                  a: "Yes, cancel anytime. You keep access until the end of your billing period.",
                },
                {
                  q: "What is India Mode?",
                  a: "India Mode generates hooks in Hinglish (Hindi-English mix), references Indian festivals, IPL, weddings, and uses WhatsApp-style CTAs. Pro/Agency only.",
                },
                {
                  q: "What does bulk CSV upload do?",
                  a: "Agency plan users can upload a CSV of up to 20 products and download all 500+ hooks as a single spreadsheet. Perfect for agencies.",
                },
              ].map(({ q, a }) => (
                <details
                  key={q}
                  className="bg-gray-800 border border-gray-700 rounded-xl p-5 group"
                >
                  <summary className="font-medium text-white cursor-pointer list-none flex items-center justify-between">
                    {q}
                    <span className="text-orange-400 group-open:rotate-180 transition-transform">
                      ▼
                    </span>
                  </summary>
                  <p className="mt-3 text-gray-400 text-sm leading-relaxed">{a}</p>
                </details>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/generate"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors shadow-lg shadow-orange-500/25"
            >
              Start Free — No Card Required →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
