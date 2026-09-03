import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Droplets, Grid3X3, Layers, Paintbrush, Wrench, Zap } from "lucide-react";
import { categories } from "@/lib/products";

const iconMap = {
  zap: Zap,
  droplets: Droplets,
  paintbrush: Paintbrush,
  wrench: Wrench,
  grid: Grid3X3,
  layers: Layers,
};

export function CategoriesSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-xl">
          <p className="text-xs tracking-[0.35em] uppercase text-gold mb-3">Shop by Category</p>
          <h2 className="font-serif text-3xl text-white sm:text-4xl">
            Everything you need, beautifully organised
          </h2>
          <p className="mt-4 text-white/50 leading-relaxed">
            Six dedicated departments — calm layouts, clear navigation, and products placed
            exactly where you expect them.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon as keyof typeof iconMap] ?? Wrench;
            return (
              <Link
                key={cat.slug}
                href={`/shop/${cat.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-card transition hover:border-gold/30"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
                </div>
                <div className="relative p-6 -mt-16">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 border border-gold/20">
                    <Icon className="h-5 w-5 text-gold" />
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-serif text-xl text-white">{cat.name}</h3>
                      <p className="mt-1 text-sm text-white/50 line-clamp-2">{cat.description}</p>
                      <span
                        className={`mt-3 inline-block text-[10px] uppercase tracking-wider px-2 py-1 rounded-full ${
                          cat.availability === "in-stock"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : cat.availability === "on-demand"
                              ? "bg-gold/10 text-gold border border-gold/20"
                              : "bg-white/5 text-white/50 border border-white/10"
                        }`}
                      >
                        {cat.availability === "in-stock" ? "In Stock" : cat.availability === "on-demand" ? "On Demand" : "Mixed"}
                      </span>
                    </div>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-white/30 transition group-hover:text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
