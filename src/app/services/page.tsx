'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LivRiseNavbar } from '@/components/layout/LivRiseNavbar';
import { LivRiseFooter } from '@/components/layout/LivRiseFooter';
import { useLivRiseStore } from '@/lib/store';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

function ServiceCardImage({ src, alt, category }: { src?: string; alt: string; category: string }) {
  const [imgSrc, setImgSrc] = useState(src || '/images/anime/anime-dream-home.png');

  return (
    <div className="relative h-56 w-full overflow-hidden bg-slate-900">
      <Image
        src={imgSrc}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover group-hover:scale-105 transition-transform duration-500"
        onError={() => setImgSrc('/images/anime/anime-dream-home.png')}
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/20" />
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <span className="text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white border border-white/20">
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
    <div className="min-h-screen flex flex-col bg-(--bg-primary) text-(--text-primary) transition-colors duration-200">
      <LivRiseNavbar />

      <main className="flex-1 pt-28 sm:pt-32 pb-24">
        {/* Header Banner */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-10 lg:px-12 border-b border-(--border-subtle) text-center relative overflow-hidden">
          {/* Decorative ambient gradient */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-75 bg-linear-to-r from-indigo-500/10 via-sky-500/10 to-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-4xl mx-auto space-y-4 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-brand-indigo dark:text-brand-blue border border-indigo-500/20 text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Architectural & Engineering Practices</span>
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-(--text-primary)">
              Integrated Project Delivery
            </h1>

            <p className="text-sm sm:text-base text-(--text-secondary) max-w-2xl mx-auto leading-relaxed">
              From bespoke residential floor plans and 3D exterior elevations to full turnkey civil construction and municipal statutory sanction drawings.
            </p>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFilterCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    filterCategory === cat
                      ? 'bg-linear-to-r from-brand-indigo to-brand-blue text-white shadow-md shadow-brand-indigo/25 scale-105'
                      : 'bg-(--surface-primary) border border-(--border-subtle) text-(--text-secondary) hover:text-(--text-primary) hover:border-(--border-strong)'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 px-4 sm:px-6 md:px-10 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((srv, idx) => (
                <motion.div
                  key={srv.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="rounded-3xl border border-(--border-subtle) bg-(--surface-primary) hover:border-brand-indigo/40 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
                >
                  <ServiceCardImage src={srv.coverImage} alt={srv.title} category={srv.category} />

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-(--text-primary) group-hover:text-brand-indigo transition-colors">
                        {srv.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-(--text-secondary) mt-2 leading-relaxed line-clamp-3">
                        {srv.summary}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-(--border-subtle) flex items-center justify-between">
                      <Link
                        href={`/services/${srv.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-indigo dark:text-brand-blue group-hover:underline"
                      >
                        <span>View Practice Scope</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </Link>

                      <Link
                        href="/start-project"
                        className="px-3 py-1.5 rounded-lg bg-(--surface-secondary) hover:bg-brand-indigo text-(--text-secondary) hover:text-white text-[11px] font-semibold transition-colors"
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
