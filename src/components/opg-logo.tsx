"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const LOGO_GOLD = "#C5A059";
const LOGO_WHITE = "#FFFFFF";

function LogoRoof({ animated }: { animated: boolean }) {
  if (animated) {
    return (
      <motion.g
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: [0, -4, 0] }}
        transition={{
          opacity: { duration: 0.5, ease: "easeOut" },
          y: { duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 1.2 },
        }}
      >
        <motion.path
          d="M120 28 L44 92 L120 92 Z"
          fill={LOGO_GOLD}
          stroke={LOGO_GOLD}
          strokeWidth="2"
          strokeLinejoin="round"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: 1, pathLength: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        />
        <motion.path
          d="M120 28 L196 92 L120 92 Z"
          fill={LOGO_WHITE}
          stroke={LOGO_WHITE}
          strokeWidth="2"
          strokeLinejoin="round"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: 1, pathLength: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
        />
        <path
          d="M120 28 L44 92 M120 28 L196 92"
          stroke={LOGO_WHITE}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <motion.rect
          x="56"
          y="58"
          width="12"
          height="22"
          rx="1"
          fill={LOGO_GOLD}
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.85 }}
          style={{ transformOrigin: "62px 72px" }}
        />
      </motion.g>
    );
  }

  return (
    <g>
      <path d="M120 28 L44 92 L120 92 Z" fill={LOGO_GOLD} stroke={LOGO_GOLD} strokeWidth="2" strokeLinejoin="round" />
      <path d="M120 28 L196 92 L120 92 Z" fill={LOGO_WHITE} stroke={LOGO_WHITE} strokeWidth="2" strokeLinejoin="round" />
      <path
        d="M120 28 L44 92 M120 28 L196 92"
        stroke={LOGO_WHITE}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="56" y="58" width="12" height="22" rx="1" fill={LOGO_GOLD} />
    </g>
  );
}

function LogoText({
  animated,
  showTagline,
  showDivider,
}: {
  animated: boolean;
  showTagline: boolean;
  showDivider: boolean;
}) {
  const textProps = (delay: number) =>
    animated
      ? {
          initial: { opacity: 0, y: 8 } as const,
          animate: { opacity: 1, y: 0 } as const,
          transition: { duration: 0.55, ease: "easeOut" as const, delay },
        }
      : {};

  const Text = animated ? motion.text : "text";

  return (
    <>
      <Text
        x="120"
        y="138"
        textAnchor="middle"
        fill={LOGO_WHITE}
        fontSize="52"
        fontWeight="700"
        fontFamily="var(--font-dm-sans), Arial, sans-serif"
        letterSpacing="6"
        {...textProps(0.95)}
      >
        OPG
      </Text>

      <Text
        x="120"
        y="168"
        textAnchor="middle"
        fill={LOGO_GOLD}
        fontSize="14"
        fontWeight="600"
        fontFamily="var(--font-dm-sans), Arial, sans-serif"
        letterSpacing="8"
        {...textProps(1.15)}
      >
        SOLUTIONS
      </Text>

      {showTagline && (
        <Text
          x="120"
          y="196"
          textAnchor="middle"
          fill={LOGO_WHITE}
          fontSize="9"
          fontWeight="500"
          fontFamily="var(--font-dm-sans), Arial, sans-serif"
          letterSpacing="4"
          {...textProps(1.35)}
        >
          BUILDING BETTER TOGETHER
        </Text>
      )}

      {showDivider && (
        <>
          {animated ? (
            <>
              <motion.line
                x1="72"
                y1="228"
                x2="168"
                y2="228"
                stroke={LOGO_WHITE}
                strokeWidth="1"
                strokeOpacity="0.35"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.5 }}
              />
              <motion.rect
                x="116"
                y="226"
                width="8"
                height="4"
                rx="1"
                fill={LOGO_GOLD}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1.85 }}
              />
            </>
          ) : (
            <>
              <line x1="72" y1="228" x2="168" y2="228" stroke={LOGO_WHITE} strokeWidth="1" strokeOpacity="0.35" />
              <rect x="116" y="226" width="8" height="4" rx="1" fill={LOGO_GOLD} />
            </>
          )}
        </>
      )}
    </>
  );
}

export function OPGLogo({
  className,
  size = "md",
  align = "center",
  animated = false,
  showTagline = true,
  showDivider = true,
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
  align?: "center" | "start";
  animated?: boolean;
  showTagline?: boolean;
  showDivider?: boolean;
}) {
  const widths = { sm: 96, md: 140, lg: 220 };
  const width = widths[size];
  const height = showTagline && showDivider ? width * 1.35 : width * 0.95;

  return (
    <div
      className={cn(
        "inline-flex",
        align === "start" ? "justify-start" : "justify-center",
        className
      )}
      aria-label="OPG Solutions"
    >
      <svg
        width={width}
        height={height}
        viewBox="0 0 240 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-hidden
      >
        <LogoRoof animated={animated} />
        <LogoText animated={animated} showTagline={showTagline} showDivider={showDivider} />
      </svg>
    </div>
  );
}
