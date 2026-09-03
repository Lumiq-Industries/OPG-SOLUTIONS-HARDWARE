import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { StoreShell } from "@/components/store-shell";
import { site } from "@/lib/site";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${site.name} — Home, Business & Building Projects`,
  description: site.headline,
  keywords: [
    "hardware store Limpopo",
    "building materials South Africa",
    "OPG Solutions",
    "electrical plumbing paint tiles",
  ],
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.headline,
    type: "website",
    locale: "en_ZA",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="antialiased">
        <div className="grain" aria-hidden="true" />
        <StoreShell>{children}</StoreShell>
      </body>
    </html>
  );
}
