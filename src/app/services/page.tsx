'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LivRiseNavbar } from '@/components/layout/LivRiseNavbar';
import { LivRiseFooter } from '@/components/layout/LivRiseFooter';
import { useLivRiseStore } from '@/lib/store';
import { ArrowRight, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

function ServiceCardImage({ src, alt, category }: { src?: string; alt: string; category: string }) {
  const [imgSrc, setImgSrc] = useState(src || '/images/anime/anime-dream-home.png');

  return (
    <div className="relative h-56 w-full overflow-hidden bg-black/80">
      <Image
        src={imgSrc}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
        onError={() => setImgSrc('/brand/livrise-logo-primary.png')}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#151518] via-transparent to-black/30" />
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <span className="text-[10px] uppercase tracking-widest font-mono font-bold px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-[#E5B85C] border border-[#C9963E]/30">
          {category}
        </span>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const { services } = useLivRiseStore();

  const categories = ['All', 'Architecture', 'Engineering', 'Infrastructure', 'Specialized & R&D'];

  const filteredServices =
    filterCategory === 'All'
      ? services
      : services.filter((s) => s.category.toLowerCase().includes(filterCategory.toLowerCase()));

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0B0D] text-[#F5F5F3] selection:bg-[#C9963E] selection:text-black">
      <LivRiseNavbar />

      <main className="flex-1 pt-28 sm:pt-32 pb-24">
        {/* Header Banner */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-10 lg:px-12 border-b border-zinc-800 text-center relative overflow-hidden bg-[#0B0B0D]">
          {/* Subtle blueprint grid */}
          <div className="absolute inset-0 blueprint-grid opacity-25 pointer-events-none" />

          {/* Ambient Gold Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#C9963E]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-4xl mx-auto space-y-4 relative z-10">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#151518] border border-[#C9963E]/30 text-[#E5B85C] text-xs font-semibold tracking-widest uppercase">
              <Compass className="w-3.5 h-3.5 text-[#E5B85C]" />
              <span>Architectural & Engineering Disciplines</span>
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Integrated Project <span className="gold-gradient-text">Delivery</span>
            </h1>

            <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              From bespoke residential floor plans and 3D exterior elevations to full turnkey civil construction and municipal statutory sanction drawings.
            </p>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFilterCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    filterCategory === cat
                      ? 'gold-button shadow-md'
                      : 'bg-[#151518] border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-10 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((srv, idx) => (
                <motion.div
                  key={srv.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="rounded-2xl border border-zinc-800 bg-[#151518] hover:border-[#E5B85C]/50 shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group hover:-translate-y-1"
                >
                  <ServiceCardImage src={srv.coverImage} alt={srv.title} category={srv.category} />

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-[#E5B85C] transition-colors">
                        {srv.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed line-clamp-3">
                        {srv.summary}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                      <Link
                        href={`/services/${srv.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E5B85C] group-hover:underline"
                      >
                        <span>View Practice Scope</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </Link>

                      <Link
                        href="/start-project"
                        className="px-3.5 py-1.5 rounded-lg bg-[#202124] hover:bg-[#E5B85C] text-zinc-300 hover:text-black border border-zinc-700 hover:border-[#E5B85C] text-[11px] font-semibold transition-all"
                      >
                        Enquire
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <LivRiseFooter />
    </div>
  );
}
