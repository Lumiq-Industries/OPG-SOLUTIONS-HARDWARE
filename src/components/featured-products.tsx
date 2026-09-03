import Link from "next/link";
import { getFeaturedProducts, products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

export function FeaturedProducts() {
  const featured = getFeaturedProducts();

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-surface/50">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.35em] uppercase text-gold mb-3">Curated Selection</p>
            <h2 className="font-serif text-3xl text-white sm:text-4xl">Featured Products</h2>
          </div>
          <Link
            href="/shop"
            className="text-sm text-gold hover:text-white transition uppercase tracking-wider"
          >
            View All →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        {products.length > featured.length && (
          <p className="mt-8 text-center text-sm text-white/40">
            Browse all{" "}
            <Link href="/shop" className="text-gold hover:text-white transition">
              {products.length} products in store
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}
