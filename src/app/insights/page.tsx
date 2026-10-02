'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { LivRiseNavbar } from '@/components/layout/LivRiseNavbar';
import { LivRiseFooter } from '@/components/layout/LivRiseFooter';
import { ArrowRight, ArrowUpRight, BookOpen, Layers } from 'lucide-react';

const CATEGORIES = [
  'All',
  'Engineering',
  'Architecture',
  'Infrastructure',
  'Construction',
  'Technology',
  'Sustainability',
  'Project Management',
];

const ARTICLES = [
  {
    title: 'Designing Resilient Structural Systems for Dynamic Lateral Seismic Loads',
    slug: 'designing-resilient-structural-systems',
    category: 'Engineering',
    date: 'October 2026',
    summary: 'A technical analysis of shear wall configuration, soft-storey mitigation, and ductility detailing in reinforced concrete high-rises.',
    readTime: '6 min read',
  },
  {
    title: 'Bioclimatic Architecture: Integrating Passive Cooling and Natural Daylighting',
    slug: 'bioclimatic-architecture-passive-cooling',
    category: 'Architecture',
    date: 'September 2026',
    summary: 'Principles of building orientation, volumetric shading, and thermal envelope optimization to reduce lifecycle energy consumption.',
    readTime: '5 min read',
  },
  {
    title: 'Digital Project Governance: Replacing Paper Blueprints with Milestone Telemetry',
    slug: 'digital-project-governance-telemetry',
    category: 'Technology',
    date: 'September 2026',
    summary: 'How centralized revision control and encrypted document vaults prevent contractor misinterpretation on critical construction sites.',
    readTime: '4 min read',
  },
  {
    title: 'Urban Stormwater Modeling and Reticulation Network Resilience',
    slug: 'urban-stormwater-modeling-resilience',
    category: 'Infrastructure',
    date: 'August 2026',
    summary: 'Applying hydraulic gradient calculations and intensity-duration-frequency (IDF) curves to master drainage layouts.',
    readTime: '7 min read',
  },
  {
    title: 'Value Engineering and Itemized BOQ Formulation in Capital Projects',
    slug: 'value-engineering-boq-formulation',
    category: 'Project Management',
    date: 'August 2026',
    summary: 'Methods for preventing capital cost inflation through disciplined quantity take-offs and market-calibrated rate analysis.',
    readTime: '5 min read',
  },
  {
    title: 'Constructability Audits: Pre-Concreting Quality Checkpoints',
    slug: 'constructability-audits-quality-checkpoints',
    category: 'Construction',
    date: 'July 2026',
    summary: 'Essential rebar congestion mitigation and formwork pressure verification protocols prior to mass concrete placement.',
    readTime: '5 min read',
  },
];

export default function InsightsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredArticles =
    selectedCategory === 'All'
      ? ARTICLES
      : ARTICLES.filter((a) => a.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="min-h-screen flex flex-col bg-black text-white selection:bg-white selection:text-black">
      <LivRiseNavbar />

      <main className="flex-1 pt-32 pb-24">
        {/* Header */}
        <section className="py-20 px-6 md:px-12 lg:px-16 border-b border-white/10 bg-black text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-medium block">
              Knowledge & Research
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white">
              Editorial & Technical Briefings
            </h1>
            <p className="text-sm md:text-base text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed">
              In-depth engineering papers, architectural principles, and infrastructure methodologies published by the LivRise technical desk.
            </p>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    selectedCategory === cat
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

        {/* Articles Grid */}
        <section className="py-16 px-6 md:px-12 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((art) => (
                <div
                  key={art.slug}
                  className="liquid-glass border border-white/10 hover:border-white/30 rounded-2xl p-8 flex flex-col justify-between group transition-all duration-300"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
                      <span className="text-[10px] uppercase tracking-widest font-semibold px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-white">
                        {art.category}
                      </span>
                      <span>{art.readTime}</span>
                    </div>

                    <h3 className="text-xl font-medium text-white group-hover:text-zinc-200 transition-colors pt-2 leading-snug">
                      {art.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                      {art.summary}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs text-zinc-500 font-mono">{art.date}</span>
                    <Link
                      href={`/insights/${art.slug}`}
                      className="text-xs font-medium text-white hover:text-zinc-300 flex items-center gap-1"
                    >
                      <span>Read Briefing</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
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
