# HookGen.ai — Viral UGC Hook Generator

> "Generate 25 viral UGC hooks + 3 full ad scripts for any product in 30 seconds"

Claude AI powered. India Mode (Hinglish). Shareable URLs. 5x cheaper than Creatify India.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Jaiprathap26/hookgen-ai&env=ANTHROPIC_API_KEY,NEXTAUTH_URL,NEXTAUTH_SECRET,GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET,NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,STRIPE_SECRET_KEY,STRIPE_WEBHOOK_SECRET,STRIPE_PRO_PRICE_ID,STRIPE_AGENCY_PRICE_ID,DATABASE_URL,NEXT_PUBLIC_APP_URL&envDescription=API%20keys%20for%20HookGen.ai&project-name=hookgen-ai&repository-name=hookgen-ai)

## Features

- **25 Viral Hooks** in 30 seconds — curiosity gap, PAB, confession, bold claim, testimonial
- **3 Full UGC Video Scripts** (Hook → Problem → Story → CTA, 30-60 second format)
- **10 Ad Headlines** + **5 CTA Options** per generation
- **India Mode** 🇮🇳 — Hinglish hooks, Diwali/IPL/wedding festival angles, WhatsApp CTAs
- **WhatsApp Status Scripts** — additional output type
- **Shareable URLs** — `/hooks/[session-id]` for every generation
- **Free Tier** — 10 hook sets/day, no signup, IP-rate-limited
- **Pro** ($9/mo / ₹749) + **Agency** ($29/mo / ₹2,499) via Stripe

## Quick Deploy

### Option 1 — One-Click Vercel Deploy (5 minutes)
Click the "Deploy with Vercel" button above.

### Option 2 — CLI Deploy
```bash
git clone https://github.com/Jaiprathap26/hookgen-ai
cd hookgen-ai
npm install
cp .env.example .env.local
# Fill in .env.local
npx vercel --prod
```

## Required Environment Variables

| Variable | Description |
|----------|-------------|
| `ANTHROPIC_API_KEY` | Claude API key |
| `NEXTAUTH_URL` | Your Vercel URL (e.g. https://hookgen-ai.vercel.app) |
| `NEXTAUTH_SECRET` | Generate with: `openssl rand -base64 32` |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID (optional for social login) |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `STRIPE_PRO_PRICE_ID` | Pro tier — $9/mo |
| `STRIPE_AGENCY_PRICE_ID` | Agency tier — $29/mo |
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXT_PUBLIC_APP_URL` | Your Vercel URL |

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with live demo preview |
| `/generate` | Hook generation tool |
| `/pricing` | Pricing tiers |
| `/login` | Auth page |
| `/hooks/[session-id]` | Shareable hook set URL |

## Tech Stack

- Next.js 14 (App Router) + TypeScript + TailwindCSS
- Claude claude-sonnet-4-5 API
- NextAuth (Google OAuth or email)
- Stripe ($9/$29 subscription)
- PostgreSQL (Supabase or Railway)
- Vercel

## Pricing vs Competitors

| Product | Price |
|---------|-------|
| Creatify India | ₹3,500/mo |
| HookGen.ai Pro | ₹749/mo |
| HookGen.ai Agency | ₹2,499/mo |

5x cheaper. Text-based. No video credits. Works for any Indian brand.

---

Built by Amelia Forge for prathap's SaaS portfolio.
