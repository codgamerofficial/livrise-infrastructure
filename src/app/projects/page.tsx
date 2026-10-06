'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LivRiseNavbar } from '@/components/layout/LivRiseNavbar';
import { LivRiseFooter } from '@/components/layout/LivRiseFooter';
import { useLivRiseStore } from '@/lib/store';
import { MapPin, ArrowRight, FolderOpen, Compass } from 'lucide-react';
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
    <div className="min-h-screen flex flex-col bg-[#0B0B0D] text-[#F5F5F3] selection:bg-[#C9963E] selection:text-black">
      <LivRiseNavbar />

      <main className="flex-1 pt-28 sm:pt-32 pb-24">
        {/* Header */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-10 lg:px-12 border-b border-zinc-800 text-center relative overflow-hidden bg-[#0B0B0D]">
          <div className="absolute inset-0 blueprint-grid opacity-25 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#C9963E]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-4xl mx-auto space-y-4 relative z-10">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#151518] border border-[#C9963E]/30 text-[#E5B85C] text-xs font-semibold tracking-widest uppercase">
              <FolderOpen className="w-3.5 h-3.5 text-[#E5B85C]" />
              <span>Architectural Showcase</span>
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Project <span className="gold-gradient-text">Directory</span>
            </h1>

            <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Explore residential blueprints, photorealistic 3D elevations, and executed civil structures delivered by LivRise Infrastructure.
            </p>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
              {filters.map((flt) => (
                <button
                  key={flt}
                  type="button"
                  onClick={() => setSelectedFilter(flt)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedFilter === flt
                      ? 'gold-button shadow-md'
                      : 'bg-[#151518] border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                  }`}
                >
                  {flt}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Projects List */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-10 lg:px-12">
          <div className="max-w-7xl mx-auto">
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((p, idx) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="rounded-2xl border border-zinc-800 bg-[#151518] hover:border-[#E5B85C]/50 shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group hover:-translate-y-1"
                  >
                    <div className="relative h-60 w-full overflow-hidden bg-black/80">
                      <Image
                        src={p.coverImageUrl || p.galleryImages?.[0] || '/images/anime/anime-dream-home.png'}
                        alt={p.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#151518] via-transparent to-black/30" />
                      <div className="absolute top-4 left-4">
                        <span className="text-[10px] font-mono uppercase tracking-widest font-bold px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-[#E5B85C] border border-[#C9963E]/30">
                          {p.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-[#E5B85C]" />
                          <span>{p.location}</span>
                        </div>
                        <h3 className="text-lg font-bold text-white group-hover:text-[#E5B85C] transition-colors mt-1">
                          {p.title}
                        </h3>
                        <p className="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                          {p.summary}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                        <Link
                          href={`/projects/${p.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E5B85C] group-hover:underline"
                        >
                          <span>Case Study</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="p-8 sm:p-14 rounded-2xl border border-dashed border-zinc-800 bg-[#151518] text-center max-w-xl mx-auto space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#202124] border border-[#E5B85C]/30 text-[#E5B85C] flex items-center justify-center mx-auto">
                  <FolderOpen className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white">
                    Projects Are Being Prepared
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    Our latest client residential blueprints, 3D exterior elevations, and ongoing civil sites are being curated for this showcase.
                  </p>
                </div>
                <Link
                  href="/start-project"
                  className="gold-button inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider"
                >
                  <span>Register Your Project</span>
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
