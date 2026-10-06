'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LivRiseNavbar } from '@/components/layout/LivRiseNavbar';
import { LivRiseFooter } from '@/components/layout/LivRiseFooter';
import { useLivRiseStore } from '@/lib/store';
import { Search, MapPin, ArrowRight, Sparkles, FolderOpen } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const { projects } = useLivRiseStore();

  const filters = [
    'All',
    'Architecture',
    'Structural',
    'Residential',
    'Commercial',
    'Infrastructure',
  ];

  const filteredProjects = projects.filter((p) => {
    const matchesCategory =
      selectedFilter === 'All' ||
      p.category.toLowerCase() === selectedFilter.toLowerCase() ||
      p.buildingType?.toLowerCase().includes(selectedFilter.toLowerCase());

    const matchesQuery =
      searchQuery.trim() === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesQuery;
  });

  return (
    <div className="min-h-screen flex flex-col bg-(--bg-primary) text-(--text-primary) transition-colors duration-200">
      <LivRiseNavbar />

      <main className="flex-1 pt-28 sm:pt-32 pb-24">
        {/* Header */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-10 lg:px-12 border-b border-(--border-subtle) text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-75 bg-linear-to-r from-amber-500/10 via-indigo-500/10 to-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-4xl mx-auto space-y-4 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-bold uppercase tracking-widest">
              <FolderOpen className="w-3.5 h-3.5" />
              <span>Architectural Showcase</span>
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-(--text-primary)">
              Project Directory
            </h1>

            <p className="text-sm sm:text-base text-(--text-secondary) max-w-2xl mx-auto leading-relaxed">
              Explore residential blueprints, photorealistic 3D elevations, and executed civil structures delivered by LivRise Infrastructure.
            </p>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
              {filters.map((flt) => (
                <button
                  key={flt}
                  type="button"
                  onClick={() => setSelectedFilter(flt)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedFilter === flt
                      ? 'bg-linear-to-r from-brand-indigo to-brand-blue text-white shadow-md shadow-brand-indigo/25 scale-105'
                      : 'bg-(--surface-primary) border border-(--border-subtle) text-(--text-secondary) hover:text-(--text-primary) hover:border-(--border-strong)'
                  }`}
                >
                  {flt}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Projects List */}
        <section className="py-16 px-4 sm:px-6 md:px-10 lg:px-12">
          <div className="max-w-7xl mx-auto">
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((p, idx) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="rounded-3xl border border-(--border-subtle) bg-(--surface-primary) hover:border-brand-indigo/40 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
                  >
                    <div className="relative h-60 w-full overflow-hidden bg-slate-900">
                      <Image
                        src={p.coverImageUrl || p.galleryImages?.[0] || '/images/anime/anime-dream-home.png'}
                        alt={p.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/20" />
                      <div className="absolute top-4 left-4">
                        <span className="text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white border border-white/20">
                          {p.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center gap-1.5 text-xs text-(--text-muted) font-medium">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{p.location}</span>
                        </div>
                        <h3 className="text-xl font-bold text-(--text-primary) group-hover:text-brand-indigo transition-colors mt-1">
                          {p.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-(--text-secondary) mt-2 line-clamp-3 leading-relaxed">
                          {p.summary}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-(--border-subtle) flex items-center justify-between">
                        <Link
                          href={`/projects/${p.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-indigo dark:text-brand-blue group-hover:underline"
                        >
                          <span>Case Study Dossier</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="p-8 sm:p-14 rounded-3xl border border-dashed border-(--border-strong) bg-(--surface-primary) text-center max-w-lg mx-auto space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto">
                  <Sparkles className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-(--text-primary)">
                    Projects Are Being Prepared
                  </h3>
                  <p className="text-xs sm:text-sm text-(--text-secondary)">
                    We are currently assembling case studies and approved architectural sets for this category.
                  </p>
                </div>
                <Link
                  href="/start-project"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-indigo text-white text-xs font-bold hover:bg-[#4F46E5] transition-all"
                >
                  <span>Register a New Project</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>

      <LivRiseFooter />
    </div>
  );
}
