"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function ProductGallery({
  images,
  name,
  badge,
}: {
  images: string[];
  name: string;
  badge?: string;
}) {
  const [active, setActive] = useState(0);
  const gallery = images.length > 0 ? images : [];

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
        <Image
          src={gallery[active] ?? gallery[0]}
          alt={name}
          fill
          className="object-contain p-6"
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        {badge && (
          <span className="absolute top-4 left-4 rounded-full bg-gold px-4 py-1.5 text-xs font-bold uppercase text-black">
            {badge}
          </span>
        )}
      </div>

      {gallery.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {gallery.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border bg-white/[0.03] transition",
                active === i ? "border-gold" : "border-white/10 hover:border-white/25"
              )}
            >
              <Image src={src} alt="" fill className="object-contain p-2" sizes="80px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
