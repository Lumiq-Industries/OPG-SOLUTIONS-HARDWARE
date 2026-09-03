import Image from "next/image";

import { storeModel } from "@/lib/site";

import { ArrowRight } from "lucide-react";



const STORE_MODEL_IMAGE =

  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=85&auto=format&fit=crop";



export function StoreModelSection() {

  return (

    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">

          <div>

            <p className="text-xs tracking-[0.35em] uppercase text-gold mb-3">Our Model</p>

            <h2 className="font-serif text-3xl text-white sm:text-4xl mb-6">

              Two ways to shop — both effortless

            </h2>



            <div className="space-y-8">

              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">

                <h3 className="font-serif text-xl text-white">{storeModel.inStock.title}</h3>

                <p className="mt-2 text-sm text-white/60 leading-relaxed">

                  {storeModel.inStock.description}

                </p>

                <div className="mt-4 flex flex-wrap gap-2">

                  {storeModel.inStock.categories.map((c) => (

                    <span

                      key={c}

                      className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400"

                    >

                      {c}

                    </span>

                  ))}

                </div>

              </div>



              <div className="rounded-2xl border border-gold/20 bg-gold/5 p-6">

                <h3 className="font-serif text-xl text-white">{storeModel.onDemand.title}</h3>

                <p className="mt-2 text-sm text-white/60 leading-relaxed">

                  {storeModel.onDemand.description}

                </p>

                <div className="mt-4 flex flex-wrap gap-2">

                  {storeModel.onDemand.categories.map((c) => (

                    <span

                      key={c}

                      className="rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-xs text-gold"

                    >

                      {c}

                    </span>

                  ))}

                </div>

                <div className="mt-6 flex items-center gap-2 flex-wrap">

                  {storeModel.onDemand.steps.map((step, i) => (

                    <span key={step} className="flex items-center gap-2 text-xs text-white/50">

                      {i > 0 && <ArrowRight className="h-3 w-3 text-gold/50" />}

                      {step}

                    </span>

                  ))}

                </div>

              </div>

            </div>

          </div>



          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10">

            <Image

              src={STORE_MODEL_IMAGE}

              alt="Building and construction project"

              fill

              className="object-cover object-center"

              sizes="(max-width: 1024px) 100vw, 50vw"

            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent" />

          </div>

        </div>

      </div>

    </section>

  );

}

