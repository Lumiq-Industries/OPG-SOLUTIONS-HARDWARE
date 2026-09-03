import { Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { OPGLogo } from "@/components/preloader";

export function ContactSection() {
  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-3xl border border-white/10 bg-card overflow-hidden">
          <div className="grid lg:grid-cols-2">
            <div className="p-8 sm:p-12 lg:p-16">
              <p className="text-xs tracking-[0.35em] uppercase text-gold mb-3">Get In Touch</p>
              <h2 className="font-serif text-3xl text-white sm:text-4xl mb-6">
                Visit our store or reach out anytime
              </h2>
              <p className="text-white/50 leading-relaxed mb-10">
                Expert advice, friendly service, and delivery across Limpopo. We&apos;re here to
                help with every home, business and building project.
              </p>

              <div className="space-y-6">
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-4 text-white/70 hover:text-gold transition group"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 border border-gold/20 group-hover:bg-gold/20">
                    <Mail className="h-5 w-5 text-gold" />
                  </div>
                  <span>{site.email}</span>
                </a>
                {site.phones.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-4 text-white/70 hover:text-gold transition group"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 border border-gold/20 group-hover:bg-gold/20">
                      <Phone className="h-5 w-5 text-gold" />
                    </div>
                    <span>{phone}</span>
                  </a>
                ))}
                <div className="flex items-start gap-4 text-white/70">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold/10 border border-gold/20">
                    <MapPin className="h-5 w-5 text-gold" />
                  </div>
                  <span>{site.location}</span>
                </div>
              </div>

              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-wider text-black transition hover:bg-gold-dim"
              >
                Chat on WhatsApp
              </a>
            </div>

            <div className="relative min-h-[320px] bg-[#0a0a0a] flex items-center justify-center p-12 border-t lg:border-t-0 lg:border-l border-white/10">
              <OPGLogo size="lg" />
              <p className="absolute bottom-8 left-0 right-0 text-center text-xs tracking-[0.3em] uppercase text-white/30">
                Thank you for supporting local business
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
