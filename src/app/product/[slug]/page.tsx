import { notFound } from "next/navigation";

import Link from "next/link";

import { ArrowLeft } from "lucide-react";

import { getProductBySlug, products } from "@/lib/products";

import { formatPrice } from "@/lib/utils";

import { AddToCartButton } from "@/components/add-to-cart-button";

import { ProductGallery } from "@/components/product-gallery";



export function generateStaticParams() {

  return products.map((p) => ({ slug: p.slug }));

}



export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {

  const { slug } = await params;

  const product = getProductBySlug(slug);

  if (!product) return { title: "Product — OPG Solutions" };

  return { title: `${product.name} — OPG Solutions`, description: product.description };

}



export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {

  const { slug } = await params;

  const product = getProductBySlug(slug);

  if (!product) notFound();



  const isQuote = product.price === 0;

  const gallery = product.images?.length ? product.images : [product.image];



  return (

    <div className="py-12 px-4 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">

        <Link

          href={`/shop/${product.categorySlug}`}

          className="inline-flex items-center gap-2 text-sm text-gold mb-8 hover:text-white transition"

        >

          <ArrowLeft className="h-4 w-4" />

          Back to {product.category}

        </Link>



        <div className="grid gap-12 lg:grid-cols-2">

          <ProductGallery images={gallery} name={product.name} badge={product.badge} />



          <div>

            <p className="text-xs uppercase tracking-wider text-white/40">{product.category}</p>

            <h1 className="mt-2 font-serif text-3xl sm:text-4xl text-white">{product.name}</h1>



            <div className="mt-4 flex items-center gap-3">

              <span

                className={`rounded-full px-3 py-1 text-xs uppercase tracking-wider border ${

                  product.availability === "in-stock"

                    ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/10"

                    : "border-gold/30 text-gold bg-gold/10"

                }`}

              >

                {product.availability === "in-stock" ? "In Stock" : "On Demand — Quote Required"}

              </span>

              <span className="text-sm text-white/40">SKU: {product.sku}</span>

            </div>



            <div className="mt-6">

              {isQuote ? (

                <p className="font-serif text-2xl text-gold">Price on Request</p>

              ) : (

                <div className="flex items-baseline gap-3">

                  <p className="font-serif text-3xl text-white">{formatPrice(product.price)}</p>

                  {product.compareAtPrice && (

                    <p className="text-lg text-white/40 line-through">

                      {formatPrice(product.compareAtPrice)}

                    </p>

                  )}

                </div>

              )}

            </div>



            <p className="mt-6 text-white/60 leading-relaxed">

              {product.longDescription ?? product.description}

            </p>



            <div className="mt-10 flex flex-wrap gap-4">

              {isQuote ? (

                <a

                  href="/#contact"

                  className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-wider text-black"

                >

                  Request Quote

                </a>

              ) : (

                <AddToCartButton product={product} />

              )}

              <a

                href={`https://wa.me/27829415728?text=${encodeURIComponent(`Hi, I'm interested in ${product.name} (${product.sku})`)}`}

                target="_blank"

                rel="noopener noreferrer"

                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white hover:border-gold/50 transition"

              >

                WhatsApp Enquiry

              </a>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

