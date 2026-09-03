import { Star, Tag, Users, Truck } from "lucide-react";
import { valueProps } from "@/lib/site";

const icons = { star: Star, tag: Tag, users: Users, truck: Truck };

export function ValuePropsBar() {
  return (
    <section className="border-y border-white/10 bg-[#0f0f0f] py-12 px-4">
      <div className="mx-auto max-w-7xl grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {valueProps.map((prop) => {
          const Icon = icons[prop.icon as keyof typeof icons];
          return (
            <div key={prop.title} className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold/10 border border-gold/20">
                <Icon className="h-5 w-5 text-gold" />
              </div>
              <div>
                <p className="font-semibold text-white text-sm uppercase tracking-wider">
                  {prop.title}
                </p>
                <p className="mt-1 text-sm text-white/50">{prop.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
