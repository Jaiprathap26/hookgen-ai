"use client";

import { PLANS } from "@/lib/stripe";
import Link from "next/link";

export default function PricingTable() {
  const plans = [
    {
      key: "free",
      plan: PLANS.free,
      cta: "Start Free",
      ctaLink: "/generate",
      highlighted: false,
    },
    {
      key: "pro",
      plan: PLANS.pro,
      cta: "Get Pro",
      ctaLink: "/api/checkout?plan=pro",
      highlighted: true,
    },
    {
      key: "agency",
      plan: PLANS.agency,
      cta: "Get Agency",
      ctaLink: "/api/checkout?plan=agency",
      highlighted: false,
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
      {plans.map(({ key, plan, cta, ctaLink, highlighted }) => (
        <div
          key={key}
          className={`relative rounded-2xl border p-6 flex flex-col ${
            highlighted
              ? "border-orange-500 bg-orange-500/5 shadow-xl shadow-orange-500/10"
              : "border-gray-700 bg-gray-800/50"
          }`}
        >
          {highlighted && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                MOST POPULAR
              </span>
            </div>
          )}

          <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
            <div className="flex items-end gap-1 mb-1">
              <span className="text-4xl font-bold text-white">
                ${plan.price}
              </span>
              {plan.price > 0 && (
                <span className="text-gray-400 mb-1">/mo</span>
              )}
            </div>
            {plan.price > 0 && (
              <p className="text-sm text-gray-400">
                ₹{plan.priceInr}/mo for India
              </p>
            )}
            {plan.price === 0 && (
              <p className="text-sm text-gray-400">No credit card required</p>
            )}
          </div>

          <ul className="space-y-2.5 mb-8 flex-1">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-sm">
                <svg
                  className="w-4 h-4 text-green-400 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>

          <Link
            href={ctaLink}
            className={`w-full text-center py-3 rounded-xl font-semibold transition-colors ${
              highlighted
                ? "bg-orange-500 hover:bg-orange-600 text-white"
                : "bg-gray-700 hover:bg-gray-600 text-white"
            }`}
          >
            {cta}
          </Link>
        </div>
      ))}
    </div>
  );
}
