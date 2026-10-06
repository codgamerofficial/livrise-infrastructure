'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { LivRiseNavbar } from '@/components/layout/LivRiseNavbar';
import { LivRiseFooter } from '@/components/layout/LivRiseFooter';
import { ArrowRight, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const CATEGORIES = [
  'All',
  'Architecture',
  'Home Design',
  'Construction',
  '3D Visualization',
  'Engineering',
];

const ARTICLES = [
  {
    title: 'The Modern Dream Home: Harmonizing Natural Sunlight with Open Floor Plans',
    slug: 'modern-dream-home-sunlight-floor-plans',
    category: 'Architecture',
    date: 'October 2026',
    summary: 'How thoughtful room zoning, large glass fenestrations, and cross-ventilation transform everyday living comfort.',
    readTime: '5 min read',
    symbol: '☀️',
  },
  {
    title: 'Why Photorealistic 3D Elevation Saves Cost Before Breaking Ground',
    slug: 'photorealistic-3d-elevation-cost-savings',
    category: '3D Visualization',
    date: 'October 2026',
    summary: 'Visualizing exterior textures, paint tones, and boundary walls beforehand eliminates costly on-site demolition and redesign.',
    readTime: '4 min read',
    symbol: '🏠',
  },
  {
    title: 'Vastu & Bioclimatic Orientation: A Practical Homeowner Guide',
    slug: 'vastu-bioclimatic-orientation-guide',
    category: 'Home Design',
    date: 'September 2026',
    summary: 'Blending ancient orientation principles with contemporary architectural aesthetics for positive spatial energy.',
    readTime: '6 min read',
    symbol: '🧭',
  },
  {
    title: 'From Floor Plan to Turnkey Handover: What Every Home Builder Must Know',
    slug: 'floor-plan-to-turnkey-handover-guide',
    category: 'Construction',
    date: 'September 2026',
    summary: 'A step-by-step checklist of municipal sanction sets, foundation curing, civil milestones, and interior finishing.',
    readTime: '7 min read',
    symbol: '🏗️',
  },
];

export default function InsightsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredArticles =
    selectedCategory === 'All'
      ? ARTICLES
      : ARTICLES.filter((a) => a.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="min-h-screen flex flex-col bg-brand-obsidian text-[#F5F5F3] selection:bg-brand-gold selection:text-black">
      <LivRiseNavbar />

      <main className="flex-1 pt-28 sm:pt-32 pb-24">
        {/* Header */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-10 lg:px-12 border-b border-zinc-800 text-center relative overflow-hidden bg-brand-obsidian">
          <div className="absolute inset-0 blueprint-grid opacity-25 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-4xl mx-auto space-y-4 relative z-10">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-charcoal border border-brand-gold/30 text-brand-gold-bright text-xs font-semibold tracking-widest uppercase">
              <BookOpen className="w-3.5 h-3.5 text-brand-gold-bright" />
              <span>Editorial & Guides</span>
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Architecture & Building <span className="gold-gradient-text">Insights</span>
            </h1>

            <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Practical guides on floor plan drafting, 3D visualization, sustainable materials, and home construction management.
            </p>

            {/* Category Filter */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'gold-button shadow-md'
                      : 'bg-brand-charcoal border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Articles List */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-10 lg:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredArticles.map((art, idx) => (
              <motion.article
                key={art.slug}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="rounded-2xl border border-zinc-800 bg-brand-charcoal hover:border-brand-gold-bright/50 p-6 sm:p-8 flex flex-col justify-between shadow-xl transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl p-2.5 rounded-xl bg-brand-graphite border border-zinc-700/60 inline-block">
                      {art.symbol}
                    </span>
                    <div className="text-[11px] font-mono font-medium text-zinc-500 flex items-center gap-2">
                      <span>{art.date}</span>
                      <span>•</span>
                      <span>{art.readTime}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-gold-bright">
                      {art.category}
                    </span>
                    <h2 className="text-xl font-bold text-white group-hover:text-brand-gold-bright transition-colors mt-1">
                      {art.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-zinc-400 mt-2.5 leading-relaxed">
                      {art.summary}
                    </p>
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-zinc-800/80 flex items-center justify-between">
                  <Link
                    href={`/start-project`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-gold-bright group-hover:underline"
                  >
                    <span>Consult on this topic</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      </main>

      <LivRiseFooter />
    </div>
  );
}
