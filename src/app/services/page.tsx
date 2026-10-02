'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LivRiseNavbar } from '@/components/layout/LivRiseNavbar';
import { LivRiseFooter } from '@/components/layout/LivRiseFooter';
import { useLivRiseStore } from '@/lib/store';
import { ArrowRight, ChevronRight, Compass, Layers, Building, ShieldCheck } from 'lucide-react';

export default function ServicesPage() {
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const { services } = useLivRiseStore();

  const categories = ['All', 'Architecture', 'Engineering', 'Infrastructure', 'Specialized & R&D'];

  const filteredServices =
    filterCategory === 'All'
      ? services
      : services.filter((s) => s.category.toLowerCase().includes(filterCategory.toLowerCase()));

  return (
    <div className="min-h-screen flex flex-col bg-black text-white selection:bg-white selection:text-black">
      <LivRiseNavbar />

      <main className="flex-1 pt-32 pb-24">
        {/* Header Banner */}
        <section className="py-20 px-6 md:px-12 lg:px-16 border-b border-white/10 relative overflow-hidden bg-black text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-medium block">
              Capabilities & Practice Scope
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white">
              Engineering & Architectural Services
            </h1>
            <p className="text-sm md:text-base text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed">
              Full-spectrum structural modeling, architectural planning, civil infrastructure, and project governance under an integrated delivery framework.
            </p>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFilterCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    filterCategory === cat
                      ? 'bg-white text-black'
                      : 'liquid-glass border border-white/10 text-zinc-300 hover:text-white hover:border-white/20'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 px-6 md:px-12 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((srv, idx) => (
                <div
                  key={srv.id}
                  className="liquid-glass border border-white/10 hover:border-white/30 rounded-2xl overflow-hidden flex flex-col justify-between group transition-all duration-300"
                >
                  <div className="relative h-52 w-full overflow-hidden bg-zinc-900">
                    <Image
                      src={srv.coverImage}
                      alt={srv.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded bg-black/80 backdrop-blur-md text-white border border-white/15">
                        {srv.category}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-1 rounded bg-black/60 text-zinc-400 backdrop-blur-md">
                        0{idx + 1}
                      </span>
                    </div>
                  </div>

                  <div className="p-7 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="text-xl font-medium text-white group-hover:text-zinc-200 transition-colors">
                        {srv.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-400 mt-2.5 font-light leading-relaxed line-clamp-3">
                        {srv.summary}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <Link
                        href={`/services/${srv.slug}`}
                        className="text-xs font-medium text-zinc-300 hover:text-white flex items-center gap-1 group-hover:underline"
                      >
                        <span>Full Specifications</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>

                      <Link
                        href="/start-project"
                        className="text-xs font-semibold text-white px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white hover:text-black transition-all"
                      >
                        Enquire
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <LivRiseFooter />
    </div>
  );
}
