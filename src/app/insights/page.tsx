'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { LivRiseNavbar } from '@/components/layout/LivRiseNavbar';
import { LivRiseFooter } from '@/components/layout/LivRiseFooter';
import { ArrowRight, BookOpen, Sparkles } from 'lucide-react';
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
    <div className="min-h-screen flex flex-col bg-(--bg-primary) text-(--text-primary) transition-colors duration-200">
      <LivRiseNavbar />

      <main className="flex-1 pt-28 sm:pt-32 pb-24">
        {/* Header */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-10 lg:px-12 border-b border-(--border-subtle) text-center relative overflow-hidden">
          <div className="max-w-4xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-brand-indigo dark:text-brand-blue border border-indigo-500/20 text-xs font-bold uppercase tracking-widest">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Editorial & Guides</span>
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-(--text-primary)">
              Architecture & Building Insights
            </h1>

            <p className="text-sm sm:text-base text-(--text-secondary) max-w-2xl mx-auto leading-relaxed">
              Practical guides on floor plan drafting, 3D visualization, sustainable materials, and home construction management.
            </p>

            {/* Category Filter */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === cat
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

        {/* Articles Grid */}
        <section className="py-16 px-4 sm:px-6 md:px-10 lg:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredArticles.map((art, idx) => (
              <motion.div
                key={art.slug}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="rounded-3xl border border-(--border-subtle) bg-(--surface-primary) hover:border-brand-indigo/40 p-6 sm:p-8 space-y-4 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl p-2 rounded-2xl bg-(--surface-secondary) border border-(--border-subtle)">
                      {art.symbol}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-indigo-500/10 text-brand-indigo dark:text-brand-blue">
                      {art.category}
                    </span>
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-(--text-primary) group-hover:text-brand-indigo transition-colors leading-snug">
                      {art.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-(--text-secondary) mt-2 leading-relaxed line-clamp-3">
                      {art.summary}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-(--border-subtle) flex items-center justify-between text-xs text-(--text-muted)">
                  <span>{art.readTime} • {art.date}</span>
                  <Link
                    href="/start-project"
                    className="inline-flex items-center gap-1 font-bold text-brand-indigo dark:text-brand-blue group-hover:underline"
                  >
                    <span>Consult Team</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <LivRiseFooter />
    </div>
  );
}
