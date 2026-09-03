/**
 * Claude Commerce — Anthropic-powered shopping assistant for OPG Solutions
 */

import { products, CLAUDE_CATALOG, CATEGORY_SUMMARY } from "./products";
import { site } from "./site";

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY ?? "";
const CLAUDE_MODEL = process.env.CLAUDE_MODEL ?? "claude-sonnet-4-20250514";

function isConfigured() {
  return Boolean(ANTHROPIC_API_KEY);
}

async function claudeMessages(
  messages: { role: "user" | "assistant"; content: string }[],
  system: string,
  maxTokens = 500
) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: CLAUDE_MODEL,
      max_tokens: maxTokens,
      system,
      messages,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Claude API error: ${res.status} ${err}`);
  }

  const data = await res.json();
  const block = data.content?.find((b: { type: string }) => b.type === "text");
  return block?.text ?? "";
}

export async function getClaudeProductRecommendation(
  query: string,
  history: { role: string; content: string }[] = []
): Promise<string> {
  const system = `You are the OPG Solutions shopping assistant — a premium hardware, building materials and home improvement store in Phiphidi / Masakona, Limpopo, South Africa.

Help customers find products across Electrical, Plumbing, Paint, Hardware & Tools, Tiles & Bathrooms, and Building Materials.

Store model:
- In-stock items: available for immediate purchase
- On-demand items: samples/catalogues → quotation → order → delivery

Contact: ${site.email} | ${site.phones[0]}
Location: ${site.location}
Tagline: ${site.tagline}

Categories:
${CATEGORY_SUMMARY}

Product catalog:
${CLAUDE_CATALOG}

Be professional, warm, and concise (under 120 words). Recommend specific products. For on-demand items, explain the quote process. Prices are in ZAR.`;

  if (!isConfigured()) {
    return getFallbackReply(query);
  }

  try {
    const messages = [
      ...history.slice(-4).map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
      { role: "user" as const, content: query },
    ];
    return await claudeMessages(messages, system);
  } catch {
    return getFallbackReply(query);
  }
}

function getFallbackReply(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("tile") || lower.includes("bathroom"))
    return "Our Tiles & Bathroom range includes Hardbody floor tiles, vanities and complete bathroom sets. Many items are on-demand — visit our showroom for samples, and we'll prepare a quotation for delivery.";
  if (lower.includes("drill") || lower.includes("tool"))
    return "Our 18V Drill Kit (R1,500) is a bestseller, and the 46-Piece Bit Set (R550) is perfect for everyday jobs. Both are in stock and ready for collection or delivery.";
  if (lower.includes("paint"))
    return "Browse our Paint Centre for interior and exterior PVA, enamel, brushes, rollers and waterproofing. Our Exterior PVA 20L (R649) is popular for facades and walls.";
  if (lower.includes("electrical") || lower.includes("bulb"))
    return "We stock LED bulbs, switches, sockets, extension leads and conduit fittings. Our LED Bulb 4-Pack (R189) is in stock now.";
  if (lower.includes("deliver") || lower.includes("location"))
    return `We're located at ${site.location}. Delivery is available — fast and reliable. Call ${site.phones[0]} or email ${site.email} for a delivery quote.`;
  return `Welcome to OPG Solutions — your one-stop for home, business and building projects. Browse Electrical, Plumbing, Paint, Hardware, Tiles and Building Materials. How can I help you find what you need?`;
}

export function isClaudeConfigured() {
  return isConfigured();
}

export function getRecommendedProducts(ids: string[]) {
  return ids.map((id) => products.find((p) => p.id === id)).filter(Boolean);
}
