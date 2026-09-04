"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { site } from "@/lib/site";
import { TypingText } from "@/components/typing-text";
import { ScrollReveal } from "@/components/scroll-reveal";

const HERO_BG =
  "https://images.unsplash.com/photo-1486406146929-c8a8834b4baf?w=1920&q=85&auto=format&fit=crop";

export function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={HERO_BG}
          alt=""
          fill
          className="object-cover object-center scale-105"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/88 to-[#0a0a0a]/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 2.8 }}
          className="max-w-2xl"
        >
          <p className="mb-4 inline-flex items-center gap-2 rounded-full glass-gold px-4 py-1.5 text-[10px] tracking-[0.35em] uppercase text-gold">
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
            {site.tagline} · Premium Store
          </p>

          <h1 className="font-serif text-4xl leading-[1.08] text-white sm:text-5xl lg:text-6xl">
            <TypingText text="Your one-stop solution for " delay={3200} speed={28} cursor={false} />
            <span className="text-gradient-gold">
              <TypingText text="home, business & building" delay={4200} speed={36} />
            </span>
            <TypingText text=" projects" delay={5200} speed={28} cursor={false} />
          </h1>

          <ScrollReveal delay={0.2}>
            <p className="mt-6 text-base leading-relaxed text-white/65 sm:text-lg">
              Premium hardware, building materials and expert advice — serving Phiphidi, Masakona
              and all of Limpopo with quality you can trust.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.35} className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-full glass-gold px-8 py-4 text-sm font-semibold uppercase tracking-wider text-black transition hover:scale-[1.02]"
            >
              Explore Store
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-full glass px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white transition hover:border-gold/40 hover:text-gold"
            >
              <MapPin className="h-4 w-4" />
              Visit Us
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={0.45} className="mt-12 flex items-center gap-2 text-sm text-white/45">
            <MapPin className="h-4 w-4 text-gold/60" />
            {site.location}
          </ScrollReveal>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
    </section>
  );
}
