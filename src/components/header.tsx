"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Search, ShoppingBag, X, Phone } from "lucide-react";
import { OPGLogo } from "@/components/preloader";
import { useCart } from "@/lib/cart-context";
import { categories } from "@/lib/products";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const { count, openCart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <div className="bg-gold text-black text-center py-2 text-xs tracking-wider uppercase">
        <div className="announcement-track whitespace-nowrap inline-flex">
          <span className="mx-8">Quality Products · Great Prices · Expert Advice · Delivery Available</span>
          <span className="mx-8">Quality Products · Great Prices · Expert Advice · Delivery Available</span>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 glass">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="shrink-0" onClick={() => setMobileOpen(false)}>
            <OPGLogo size="sm" showTagline={false} showDivider={false} />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/shop" className="text-sm text-white/70 hover:text-gold transition">
              Shop All
            </Link>
            {categories.slice(0, 4).map((c) => (
              <Link
                key={c.slug}
                href={`/shop/${c.slug}`}
                className="text-sm text-white/70 hover:text-gold transition"
              >
                {c.name.split(" ")[0]}
              </Link>
            ))}
            <Link href="/#about" className="text-sm text-white/70 hover:text-gold transition">
              Our Store
            </Link>
            <Link href="/#contact" className="text-sm text-white/70 hover:text-gold transition">
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/shop"
              className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 hover:border-gold/40 hover:text-gold transition"
              aria-label="Search products"
            >
              <Search className="h-4 w-4" />
            </Link>
            <a
              href={`tel:${site.phones[0].replace(/\s/g, "")}`}
              className="hidden md:flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 hover:border-gold/40 hover:text-gold transition"
              aria-label="Call us"
            >
              <Phone className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={openCart}
              className="relative h-10 w-10 flex items-center justify-center rounded-full border border-white/10 text-white/60 hover:border-gold/40 hover:text-gold transition"
              aria-label="Open cart"
            >
              <ShoppingBag className="h-4 w-4" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-black">
                  {count}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden h-10 w-10 flex items-center justify-center rounded-full border border-white/10 text-white"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div
          className={cn(
            "lg:hidden overflow-hidden border-t border-white/10 transition-all duration-300",
            mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <nav className="flex flex-col gap-1 px-4 py-4">
            <Link href="/shop" className="py-3 text-white/80" onClick={() => setMobileOpen(false)}>
              Shop All
            </Link>
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/shop/${c.slug}`}
                className="py-3 text-white/60"
                onClick={() => setMobileOpen(false)}
              >
                {c.name}
              </Link>
            ))}
            <Link href="/#contact" className="py-3 text-gold" onClick={() => setMobileOpen(false)}>
              Contact Us
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
