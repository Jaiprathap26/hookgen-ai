import { NextRequest, NextResponse } from "next/server";
import { anthropic, buildPrompt, GenerateParams } from "@/lib/claude";
import { checkIpLimit } from "@/lib/auth";

export const runtime = "edge";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      productName,
      productDescription,
      audience,
      platform,
      tone,
      indiaMode,
    } = body as GenerateParams;

    // Validate inputs
    if (!productName || !productDescription || !audience || !platform || !tone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Rate limiting — IP-based for anonymous users
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const allowed = checkIpLimit(ip);
    if (!allowed) {
      return NextResponse.json(
        {
          error: "Daily limit reached",
          message:
            "You've used all 10 free hook sets today. Upgrade to Pro ($9/mo) for unlimited generation.",
          upgradeUrl: "/pricing",
        },
        { status: 429 }
      );
    }

    const prompt = buildPrompt({
      productName,
      productDescription,
      audience,
      platform,
      tone,
      indiaMode: indiaMode === true,
    });

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 4096,
      system:
        "You are an elite UGC ad copywriter. Always respond with valid JSON only — no markdown, no explanation.",
      messages: [{ role: "user", content: prompt }],
    });

    const content = message.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response type from Claude");
    }

    // Parse and validate JSON response
    let result;
    try {
      result = JSON.parse(content.text);
    } catch {
      // Try to extract JSON from response if Claude added any text
      const jsonMatch = content.text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        result = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Failed to parse Claude response as JSON");
      }
    }

    return NextResponse.json({
      success: true,
      data: result,
      meta: {
        productName,
        platform,
        tone,
        indiaMode: indiaMode === true,
        generatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Generate error:", error);
    const message =
      error instanceof Error ? error.message : "Generation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
