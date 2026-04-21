import Anthropic from "@anthropic-ai/sdk";

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export const SYSTEM_PROMPT = `You are an elite performance marketer and UGC ad copywriter. You specialize in writing viral hooks and scripts for TikTok, Instagram Reels, and social media video ads that stop the scroll and drive conversions. Your hooks are raw, authentic, and feel like real user-generated content — not polished corporate marketing.

When generating content in India Mode (Hinglish), naturally mix Hindi and English, reference Indian festivals (Diwali, IPL, weddings, Holi), use WhatsApp-style CTAs, and make cultural references that resonate with Indian audiences.`;

export interface GenerateParams {
  productName: string;
  productDescription: string;
  audience: string;
  platform: string;
  tone: string;
  indiaMode?: boolean;
}

export interface GenerateResult {
  hooks: string[];
  scripts: { hook: string; problem: string; story: string; cta: string }[];
  headlines: string[];
  ctas: string[];
  whatsappScripts?: string[];
}

export function buildPrompt(params: GenerateParams): string {
  const indiaModeNote = params.indiaMode
    ? `\n\nIMPORTANT: India Mode is ON. Generate all content in Hinglish (natural Hindi-English mix). Reference Indian culture: Diwali, IPL, weddings, chai, WhatsApp. Use WhatsApp-style CTAs ("Send us a WhatsApp", "DM karo"). Make it feel native to Indian social media.`
    : "";

  return `Product: ${params.productName}
Description: ${params.productDescription}
Target Audience: ${params.audience}
Platform: ${params.platform}
Tone: ${params.tone}${indiaModeNote}

Generate the following in valid JSON format only (no markdown, no explanation — pure JSON):

{
  "hooks": [
    "Hook 1 text",
    "Hook 2 text",
    ... (25 total)
  ],
  "scripts": [
    {
      "hook": "First 2-3 seconds — punchy opener",
      "problem": "Relate to audience pain point",
      "story": "Show product solving it — authentic, specific",
      "cta": "Clear single action"
    },
    ... (3 total)
  ],
  "headlines": [
    "Headline 1",
    ... (10 total)
  ],
  "ctas": [
    "CTA 1",
    ... (5 total)
  ]${
    params.indiaMode
      ? `,
  "whatsappScripts": [
    "30-second WhatsApp status script 1",
    "30-second WhatsApp status script 2",
    "30-second WhatsApp status script 3"
  ]`
      : ""
  }
}

Make everything feel authentic, human, and platform-native. No corporate language. Each hook must be under 15 words. Scripts should be 30-60 second format.`;
}
