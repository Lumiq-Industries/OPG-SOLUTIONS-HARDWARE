import { NextResponse } from "next/server";
import { getAssistantProvider, getStoreAssistantReply } from "@/lib/assistant";

export async function GET() {
  return NextResponse.json({ provider: getAssistantProvider() });
}

export async function POST(request: Request) {
  try {
    const { message, history } = await request.json();
    if (!message?.trim()) {
      return NextResponse.json({ error: "Message required" }, { status: 400 });
    }
    const reply = await getStoreAssistantReply(message, history ?? []);
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json(
      {
        reply:
          "Sorry, something went wrong. Please contact info@opgsolutions.co.za or call 082 941 5728.",
      },
      { status: 500 }
    );
  }
}
