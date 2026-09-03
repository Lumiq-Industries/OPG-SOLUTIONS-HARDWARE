"use client";

import { X, Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { formatPrice, cn } from "@/lib/utils";

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, total, clearCart } = useCart();

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={closeCart}
        aria-hidden
      />
      <aside
        className={cn(
          "fixed top-0 right-0 z-[70] h-full w-full max-w-md border-l border-white/10 bg-[#0a0a0a] transition-transform duration-300 flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <h2 className="font-serif text-xl text-white">Your Cart</h2>
          <button type="button" onClick={closeCart} className="text-white/60 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <p className="text-center text-white/40 py-12">Your cart is empty</p>
          ) : (
            <ul className="space-y-4">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="flex gap-4 rounded-xl border border-white/10 p-3">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                    <Image src={product.image} alt={product.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white text-sm line-clamp-2">{product.name}</p>
                    <p className="text-gold text-sm mt-1">{formatPrice(product.price)}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="h-7 w-7 flex items-center justify-center rounded border border-white/10 text-white/60"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="text-sm text-white w-6 text-center">{quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="h-7 w-7 flex items-center justify-center rounded border border-white/10 text-white/60"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeItem(product.id)}
                        className="ml-auto text-white/40 hover:text-red-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-white/10 p-6 space-y-4">
            <div className="flex justify-between text-white">
              <span className="text-white/60">Subtotal</span>
              <span className="font-semibold">{formatPrice(total)}</span>
            </div>
            <a
              href={`https://wa.me/27829415728?text=${encodeURIComponent(`Hi OPG Solutions, I'd like to enquire about my cart (Total: R${total}).`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-full bg-gold py-4 text-center text-sm font-semibold uppercase tracking-wider text-black hover:bg-gold-dim transition"
            >
              Enquire via WhatsApp
            </a>
            <button
              type="button"
              onClick={clearCart}
              className="w-full text-xs text-white/40 hover:text-white transition"
            >
              Clear cart
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
