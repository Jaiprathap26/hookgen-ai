import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export const PLANS = {
  free: {
    name: "Free",
    price: 0,
    priceInr: 0,
    hookSetsPerDay: 10,
    features: ["10 hook sets/day", "No signup required", "All 4 output types"],
    stripePriceId: null,
  },
  pro: {
    name: "Pro",
    price: 9,
    priceInr: 749,
    hookSetsPerDay: Infinity,
    features: [
      "Unlimited hook sets",
      "Batch CSV export",
      "India Mode",
      "A/B variant generator",
      "Priority generation",
    ],
    stripePriceId: process.env.STRIPE_PRO_PRICE_ID,
  },
  agency: {
    name: "Agency",
    price: 29,
    priceInr: 2499,
    hookSetsPerDay: Infinity,
    features: [
      "Everything in Pro",
      "Team access",
      "White-label exports",
      "Bulk CSV upload (20 products)",
      "500 hooks as spreadsheet",
      "API access",
    ],
    stripePriceId: process.env.STRIPE_AGENCY_PRICE_ID,
  },
} as const;

export type PlanKey = keyof typeof PLANS;

export async function createCheckoutSession(
  planKey: "pro" | "agency",
  userId: string,
  userEmail: string
) {
  const plan = PLANS[planKey];
  if (!plan.stripePriceId) throw new Error("Invalid plan");

  return stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    customer_email: userEmail,
    line_items: [{ price: plan.stripePriceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?cancelled=true`,
    metadata: { userId, plan: planKey },
  });
}
