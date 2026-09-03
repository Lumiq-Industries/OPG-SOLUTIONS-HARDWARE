"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { site } from "@/lib/site";

const HERO_BG =
  "https://images.unsplash.com/photo-1486406146929-c8a8834b4baf?w=1920&q=85&auto=format&fit=crop";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={HERO_BG}
          alt=""
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/92 to-[#0a0a0a]/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 2.8 }}
          className="max-w-2xl"
        >
          <p className="mb-4 text-xs tracking-[0.35em] uppercase text-gold">
            {site.tagline}
          </p>
          <h1 className="font-serif text-4xl leading-[1.1] text-white sm:text-5xl lg:text-6xl">
            Your one-stop solution for{" "}
            <span className="text-gradient-gold">home, business & building</span> projects
          </h1>
          <p className="mt-6 text-base leading-relaxed text-white/60 sm:text-lg">
            Premium hardware, building materials and expert advice — serving Phiphidi, Masakona
            and all of Limpopo with quality you can trust.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-wider text-black transition hover:bg-gold-dim"
            >
              Explore Store
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white transition hover:border-gold/50 hover:text-gold"
            >
              <MapPin className="h-4 w-4" />
              Visit Us
            </Link>
          </div>

          <div className="mt-12 flex items-center gap-2 text-sm text-white/40">
            <MapPin className="h-4 w-4 text-gold/60" />
            {site.location}
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    </section>
  );
}
