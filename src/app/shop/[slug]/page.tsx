import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getCategoryBySlug, getProductsByCategory, categories } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) return { title: "Category — OPG Solutions" };
  return { title: `${cat.name} — OPG Solutions`, description: cat.description };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const categoryProducts = getProductsByCategory(slug);

  return (
    <div>
      <div className="relative h-64 sm:h-80 overflow-hidden border-b border-white/10">
        <Image src={category.image} alt={category.name} fill className="object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto max-w-7xl w-full px-4 pb-10 sm:px-6 lg:px-8">
            <Link href="/shop" className="text-xs text-gold uppercase tracking-wider mb-3 inline-block">
              ← All Products
            </Link>
            <h1 className="font-serif text-4xl text-white">{category.name}</h1>
            <p className="mt-2 text-white/60 max-w-xl">{category.description}</p>
          </div>
        </div>
      </div>

      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-wrap gap-2">
            {category.highlights.map((h) => (
              <span
                key={h}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/50"
              >
                {h}
              </span>
            ))}
          </div>

          {categoryProducts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {categoryProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-gold/20 bg-gold/5 p-12 text-center">
              <p className="font-serif text-xl text-white">On-Demand Category</p>
              <p className="mt-2 text-white/50 max-w-md mx-auto">
                Browse samples in our showroom, then we&apos;ll prepare a quotation and arrange
                delivery. Contact us to get started.
              </p>
              <a
                href="/#contact"
                className="mt-6 inline-block rounded-full bg-gold px-8 py-3 text-sm font-semibold uppercase tracking-wider text-black"
              >
                Request Quote
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
