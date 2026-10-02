'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LivRiseNavbar } from '@/components/layout/LivRiseNavbar';
import { LivRiseFooter } from '@/components/layout/LivRiseFooter';
import { useLivRiseStore } from '@/lib/store';
import { Search, MapPin, ArrowRight, FileCheck2 } from 'lucide-react';

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const { projects } = useLivRiseStore();

  const filters = [
    'All',
    'Architecture',
    'Structural',
    'Infrastructure',
    'Residential',
    'Commercial',
    'Industrial',
    'Institutional',
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
    <div className="min-h-screen flex flex-col bg-black text-white selection:bg-white selection:text-black">
      <LivRiseNavbar />

      <main className="flex-1 pt-32 pb-24">
        {/* Header */}
        <section className="py-20 px-6 md:px-12 lg:px-16 border-b border-white/10 bg-black text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-medium block">
              Portfolio & Case Studies
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white">
              Project Directory
            </h1>
            <p className="text-sm md:text-base text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed">
              Explore delivered and ongoing engineering milestones. Structural designs, architectural schemes, and civil infrastructure documentation.
            </p>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
              {filters.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setSelectedFilter(tab)}
                  className={`px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    selectedFilter === tab
                      ? 'bg-white text-black'
                      : 'liquid-glass border border-white/10 text-zinc-300 hover:text-white hover:border-white/20'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Project Grid or Curated Empty State */}
        <section className="py-16 px-6 md:px-12 lg:px-16">
          <div className="max-w-7xl mx-auto">
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredProjects.map((prj) => (
                  <div
                    key={prj.id}
                    className="liquid-glass border border-white/10 hover:border-white/30 rounded-2xl overflow-hidden group flex flex-col justify-between transition-all"
                  >
                    <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-zinc-900">
                      <Image
                        src={prj.coverImageUrl}
                        alt={prj.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="text-xs font-semibold px-3 py-1 rounded bg-black/80 text-white border border-white/20 backdrop-blur-md">
                          {prj.category}
                        </span>
                        <span className="text-xs font-mono px-2.5 py-1 rounded bg-black/60 text-zinc-300 backdrop-blur-md">
                          {prj.year}
                        </span>
                      </div>
                    </div>

                    <div className="p-8 space-y-4">
                      <div className="flex items-center gap-2 text-xs text-zinc-400">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{prj.location}</span>
                      </div>

                      <h3 className="text-xl font-medium text-white group-hover:text-zinc-200 transition-colors">
                        {prj.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-zinc-400 line-clamp-2 leading-relaxed font-light">
                        {prj.summary}
                      </p>

                      <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                        <span className="text-xs font-mono text-zinc-400">{prj.builtUpArea}</span>
                        <Link
                          href={`/projects/${prj.slug}`}
                          className="text-xs font-medium text-white hover:text-zinc-300 flex items-center gap-1"
                        >
                          <span>Case Study</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="liquid-glass border border-white/15 rounded-3xl p-12 md:p-16 text-center max-w-3xl mx-auto space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 text-white flex items-center justify-center mx-auto">
                  <FileCheck2 className="w-7 h-7 text-zinc-300" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl md:text-3xl font-normal text-white tracking-tight">
                    Projects are currently being curated.
                  </h3>
                  <p className="text-sm md:text-base text-zinc-400 font-light leading-relaxed max-w-xl mx-auto">
                    Verified project showcases, architectural drawings, and computational finite element models are being cataloged by the LivRise Infrastructure engineering team.
                  </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/start-project"
                    className="bg-white text-black px-7 py-3 rounded-lg text-sm font-semibold hover:bg-zinc-100 transition-colors"
                  >
                    Start a Project
                  </Link>
                  <Link
                    href="/contact"
                    className="liquid-glass border border-white/15 text-white px-7 py-3 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors"
                  >
                    Contact Technical Desk
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <LivRiseFooter />
    </div>
  );
}
