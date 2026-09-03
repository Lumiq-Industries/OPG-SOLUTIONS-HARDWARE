"use client";

import { motion } from "framer-motion";
import { OPGLogo } from "@/components/opg-logo";

export { OPGLogo } from "@/components/opg-logo";

export function PreloaderGate({
  children,
  onComplete,
}: {
  children: React.ReactNode;
  onComplete?: () => void;
}) {
  return (
    <>
      <motion.div
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0a]"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0, pointerEvents: "none" }}
        transition={{ delay: 2.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        onAnimationComplete={() => onComplete?.()}
        role="status"
        aria-label="Loading OPG Solutions"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <OPGLogo size="lg" animated />
        </motion.div>

        <motion.div
          className="mt-12 h-px w-32 overflow-hidden bg-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.div
            className="h-full bg-gold"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ delay: 1.4, duration: 1.1, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 0.6 }}
      >
        {children}
      </motion.div>
    </>
  );
}
