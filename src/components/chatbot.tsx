"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { cn } from "@/lib/utils";

type Message = { role: "user" | "assistant"; content: string };
type Provider = "openai" | "anthropic" | "fallback";

const providerLabel: Record<Provider, string> = {
  openai: "Powered by ChatGPT",
  anthropic: "Powered by Claude",
  fallback: "Quick answers · add OpenAI key for full AI",
};

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [provider, setProvider] = useState<Provider>("openai");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Welcome to OPG Solutions! I can help you find electrical, plumbing, paint, hardware, tiles and building materials. What are you looking for today?",
    },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/chat")
      .then((r) => r.json())
      .then((d) => setProvider(d.provider ?? "fallback"))
      .catch(() => setProvider("fallback"));
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    const userMsg: Message = { role: "user", content: text };
    setMessages((m) => [...m, userMsg]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: messages.slice(-6),
        }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: "Sorry, I'm having trouble connecting. Please call 082 941 5728 or email info@opgsolutions.co.za.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition",
          open ? "bg-white text-black" : "bg-gold text-black hover:bg-gold-dim"
        )}
        aria-label="Open shopping assistant"
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </button>

      <div
        className={cn(
          "fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] max-w-sm rounded-2xl border border-white/10 bg-[#111] shadow-2xl transition-all duration-300 flex flex-col overflow-hidden",
          open ? "opacity-100 translate-y-0 pointer-events-auto h-[420px]" : "opacity-0 translate-y-4 pointer-events-none h-0"
        )}
      >
        <div className="border-b border-white/10 px-4 py-3 bg-[#0a0a0a]">
          <p className="text-sm font-semibold text-white">OPG Assistant</p>
          <p className="text-[10px] text-gold uppercase tracking-wider">
            {providerLabel[provider]}
          </p>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-none">
          {messages.map((m, i) => (
            <div
              key={i}
              className={cn(
                "rounded-xl px-3 py-2 text-sm max-w-[90%]",
                m.role === "user"
                  ? "ml-auto bg-gold text-black"
                  : "bg-white/5 text-white/80 border border-white/10"
              )}
            >
              {m.content}
            </div>
          ))}
          {loading && (
            <div className="rounded-xl px-3 py-2 text-sm bg-white/5 text-white/40 w-16">
              …
            </div>
          )}
          <div ref={bottomRef} />
        </div>
        <div className="border-t border-white/10 p-3 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Ask about products…"
            className="flex-1 rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-gold/40"
          />
          <button
            type="button"
            onClick={send}
            disabled={loading}
            className="h-10 w-10 flex items-center justify-center rounded-lg bg-gold text-black disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </>
  );
}
