"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { CartProvider } from "@/lib/cart-context";
import { PreloaderGate } from "@/components/preloader";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const CartDrawer = dynamic(() => import("@/components/cart-drawer").then((m) => m.CartDrawer), {
  ssr: false,
});
const Chatbot = dynamic(() => import("@/components/chatbot").then((m) => m.Chatbot), {
  ssr: false,
});

export function StoreShell({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  const handleComplete = useCallback(() => setReady(true), []);

  return (
    <CartProvider>
      <PreloaderGate onComplete={handleComplete}>
        <Header />
        <main>{children}</main>
        <Footer />
        {ready && (
          <>
            <CartDrawer />
            <Chatbot />
          </>
        )}
      </PreloaderGate>
    </CartProvider>
  );
}
