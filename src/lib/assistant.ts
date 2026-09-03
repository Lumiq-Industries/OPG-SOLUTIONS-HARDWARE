/**
 * Store assistant — OpenAI (ChatGPT) primary, Anthropic fallback, rule-based last resort.
 */

import { CLAUDE_CATALOG, CATEGORY_SUMMARY } from "./products";
import { site } from "./site";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY ?? "";
const OPENAI_MODEL = process.env.OPENAI_MODEL ?? "gpt-4o-mini";
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY ?? "";
const CLAUDE_MODEL = process.env.CLAUDE_MODEL ?? "claude-sonnet-4-20250514";

const STORE_SYSTEM = `You are the OPG Solutions shopping assistant — a premium hardware, building materials and home improvement store in Phiphidi / Masakona, Limpopo, South Africa.

Help customers find products across Electrical, Plumbing, Paint, Hardware & Tools, Tiles & Bathrooms, and Building Materials.

Store model:
- In-stock items: available for immediate purchase
- On-demand items: samples/catalogues → quotation → order → delivery

Contact: ${site.email} | ${site.phones.join(" | ")}
Location: ${site.location}
Tagline: ${site.tagline}

Categories:
${CATEGORY_SUMMARY}

Product catalog:
${CLAUDE_CATALOG}

Be professional, warm, and concise (under 120 words). Recommend specific products by name and price in ZAR. For on-demand items, explain the quote process.`;

type ChatMessage = { role: "user" | "assistant"; content: string };

async function openAIReply(messages: ChatMessage[]): Promise<string> {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      max_tokens: 500,
      temperature: 0.6,
      messages: [{ role: "system", content: STORE_SYSTEM }, ...messages],
    }),
  });

  if (!res.ok) throw new Error(await res.text());
  const data = await res.json();
  return data.choices?.[0]?.message?.content?.trim() ?? "";
}

async function claudeReply(messages: ChatMessage[]): Promise<string> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: CLAUDE_MODEL,
      max_tokens: 500,
      system: STORE_SYSTEM,
      messages,
    }),
  });

  if (!res.ok) throw new Error(await res.text());
  const data = await res.json();
  const block = data.content?.find((b: { type: string }) => b.type === "text");
  return block?.text?.trim() ?? "";
}

function fallbackReply(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("tile") || lower.includes("bathroom"))
    return "Our Tiles & Bathroom range includes Hardbody floor tiles and complete bathroom solutions. Many items are on-demand — we prepare a quotation after samples or catalogue selection.";
  if (lower.includes("drill") || lower.includes("tool"))
    return "Our 18V Drill Kit (R1,500) and 46-Piece Bit Set (R550) are in stock. Browse Hardware & Tools for full tool sets and safety gear.";
  if (lower.includes("deliver") || lower.includes("location"))
    return `We're at ${site.location}. Delivery is available — call ${site.phones[0]} or email ${site.email}.`;
  return `Welcome to OPG Solutions! Browse 40+ products across Electrical, Plumbing, Paint, Hardware, Tiles and Building Materials. How can I help?`;
}

export function getAssistantProvider(): "openai" | "anthropic" | "fallback" {
  if (OPENAI_API_KEY) return "openai";
  if (ANTHROPIC_API_KEY) return "anthropic";
  return "fallback";
}

export async function getStoreAssistantReply(
  query: string,
  history: { role: string; content: string }[] = []
): Promise<string> {
  const messages: ChatMessage[] = [
    ...history.slice(-6).map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    })),
    { role: "user", content: query },
  ];

  try {
    if (OPENAI_API_KEY) return (await openAIReply(messages)) || fallbackReply(query);
    if (ANTHROPIC_API_KEY) return (await claudeReply(messages)) || fallbackReply(query);
  } catch {
    /* use fallback */
  }

  return fallbackReply(query);
}
