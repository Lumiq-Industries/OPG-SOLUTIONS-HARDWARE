"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { categories, products } from "@/lib/products";

function titleFromPath(pathname: string): string {
  if (pathname === "/") return "Home";
  if (pathname === "/shop") return "Shop All";

  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] === "shop" && parts[1]) {
    const cat = categories.find((c) => c.slug === parts[1]);
    return cat?.name ?? parts[1].replace(/-/g, " ");
  }
  if (parts[0] === "product" && parts[1]) {
    const product = products.find((p) => p.slug === parts[1]);
    return product?.name ?? "Product";
  }
  return "OPG Solutions";
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<"splash" | "content">("splash");
  const title = titleFromPath(pathname);

  useEffect(() => {
    if (reduceMotion) {
      setPhase("content");
      return;
    }
    setPhase("splash");
    const timer = setTimeout(() => setPhase("content"), 850);
    return () => clearTimeout(timer);
  }, [pathname, reduceMotion]);

  return (
    <>
      <AnimatePresence mode="wait">
        {phase === "splash" && !reduceMotion && (
          <motion.div
            key={pathname}
            className="fixed inset-0 z-[200] flex items-center justify-center glass-splash"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 1.02 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="text-center px-6"
            >
              <p className="text-[10px] uppercase tracking-[0.4em] text-gold/80 mb-3">OPG Solutions</p>
              <h2 className="font-serif text-3xl sm:text-4xl text-white">{title}</h2>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        key={`content-${pathname}`}
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
