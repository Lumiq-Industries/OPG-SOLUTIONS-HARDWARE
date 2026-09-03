import { products, categories } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

export const metadata = {
  title: "Shop All — OPG Solutions",
  description: "Browse electrical, plumbing, paint, hardware, tiles and building materials.",
};

export default function ShopPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <p className="text-xs tracking-[0.35em] uppercase text-gold mb-3">Full Catalogue</p>
          <h1 className="font-serif text-4xl text-white">Shop All Products</h1>
          <p className="mt-4 text-white/50 max-w-xl">
            Calm, organised browsing across every department. In-stock items ready now — on-demand
            items available via quotation.
          </p>
        </div>

        <div className="mb-10 flex flex-wrap gap-2">
          {categories.map((c) => (
            <a
              key={c.slug}
              href={`/shop/${c.slug}`}
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/60 hover:border-gold/40 hover:text-gold transition"
            >
              {c.name}
            </a>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
