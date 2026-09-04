"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { formatPrice, cn } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const isQuote = product.price === 0;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl glass-card transition hover:border-gold/25">
      <Link href={`/product/${product.slug}`} className="relative aspect-square overflow-hidden bg-white/[0.03]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className={cn(
            "transition duration-500 group-hover:scale-105",
            product.image.startsWith("/products/") ? "object-cover" : "object-contain p-4"
          )}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-black">
            {product.badge}
          </span>
        )}
        <span
          className={cn(
            "absolute top-3 right-3 rounded-full px-2.5 py-1 text-[10px] uppercase tracking-wider border",
            product.availability === "in-stock"
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
              : "bg-gold/10 text-gold border-gold/20"
          )}
        >
          {product.availability === "in-stock" ? "In Stock" : "On Demand"}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[10px] uppercase tracking-wider text-white/40">{product.category}</p>
        <Link href={`/product/${product.slug}`}>
          <h3 className="mt-1 font-serif text-lg text-white transition group-hover:text-gold line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <p className="mt-2 text-sm text-white/50 line-clamp-2 flex-1">{product.description}</p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div>
            {isQuote ? (
              <p className="text-sm font-medium text-gold">Request Quote</p>
            ) : (
              <div className="flex items-baseline gap-2">
                <p className="font-semibold text-white">{formatPrice(product.price)}</p>
                {product.compareAtPrice && (
                  <p className="text-sm text-white/40 line-through">
                    {formatPrice(product.compareAtPrice)}
                  </p>
                )}
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => !isQuote && addItem(product)}
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition",
              isQuote
                ? "border-gold/30 text-gold hover:bg-gold/10"
                : "border-white/10 text-white/60 hover:border-gold hover:bg-gold hover:text-black"
            )}
            aria-label={isQuote ? "Request quote" : "Add to cart"}
          >
            <ShoppingBag className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
}
