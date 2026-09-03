import Link from "next/link";
import { OPGLogo } from "@/components/preloader";
import { categories } from "@/lib/products";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050505] pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <OPGLogo size="sm" align="start" showTagline showDivider={false} />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-white/40 mb-4">Shop</p>
            <ul className="space-y-2">
              <li>
                <Link href="/shop" className="text-sm text-white/60 hover:text-gold transition">
                  All Products
                </Link>
              </li>
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/shop/${c.slug}`}
                    className="text-sm text-white/60 hover:text-gold transition"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-white/40 mb-4">Contact</p>
            <ul className="space-y-2 text-sm text-white/60">
              <li>{site.email}</li>
              {site.phones.map((p) => (
                <li key={p}>{p}</li>
              ))}
              <li>{site.location}</li>
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-white/40 mb-4">Hours</p>
            <p className="text-sm text-white/60 leading-relaxed">
              Mon – Fri: 7:30 AM – 5:30 PM
              <br />
              Sat: 8:00 AM – 2:00 PM
              <br />
              Sun: Closed
            </p>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-4 text-xs text-white/30">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>Designed by LUMIQ INDUSTRIES · VILATECH × Infini Colon</p>
        </div>
      </div>
    </footer>
  );
}
