"use client";

import { ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart-context";

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  return (
    <button
      type="button"
      onClick={() => addItem(product)}
      className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-wider text-black hover:bg-gold-dim transition"
    >
      <ShoppingBag className="h-4 w-4" />
      Add to Cart
    </button>
  );
}
