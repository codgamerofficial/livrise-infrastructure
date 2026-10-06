'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LivRiseNavbar } from '@/components/layout/LivRiseNavbar';
import { LivRiseFooter } from '@/components/layout/LivRiseFooter';
import {
  Compass,
  Layers,
  Building,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Award,
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const values = [
    {
      title: 'Architectural Imagination',
      desc: 'We treat every home as a work of art—blending modern aesthetics, natural sunlight, and spatial elegance into custom living spaces.',
      symbol: '✨',
    },
    {
      title: 'Engineering Precision',
      desc: 'Every structural frame, RCC column, and foundation plan is anchored in rigorous computational analysis and statutory building codes.',
      symbol: '📐',
    },
    {
      title: 'Clarity & Transparency',
      desc: 'Transparent milestones, 3D visualization before construction, and clear communication from first sketch to final key handover.',
      symbol: '🤝',
    },
    {
      title: 'On-Time Execution',
      desc: 'We bridge design intent and on-site reality through structured contractor oversight, material quality checks, and scheduled site audits.',
      symbol: '🏗️',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-(--bg-primary) text-(--text-primary) transition-colors duration-200">
      <LivRiseNavbar />

      <main className="flex-1 pt-28 sm:pt-32 pb-24">
        {/* ===================================================================
            HERO SECTION
            =================================================================== */}
        <section className="relative py-16 sm:py-24 px-4 sm:px-6 md:px-10 lg:px-12 border-b border-(--border-subtle) overflow-hidden text-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-75 bg-linear-to-r from-indigo-500/10 via-sky-500/10 to-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-4xl mx-auto space-y-4 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-brand-indigo dark:text-brand-blue border border-indigo-500/20 text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>About LivRise Infrastructure</span>
            </span>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-(--text-primary) leading-tight">
              Building Ideas Into Reality.
            </h1>

            <p className="text-base sm:text-lg text-(--text-secondary) max-w-2xl mx-auto leading-relaxed font-normal">
              LivRise Infrastructure brings modern architectural floor plans, photorealistic 3D elevations, interior aesthetics, and turnkey construction together into a vibrant, client-first digital experience.
            </p>
          </div>
        </section>

        {/* ===================================================================
            STORY & PHILOSOPHY
            =================================================================== */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-10 lg:px-12 border-b border-(--border-subtle)">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-indigo">
                Our Philosophy
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-(--text-primary)">
                An anime world where architecture, design and construction unite.
              </h2>
              <p className="text-xs sm:text-sm text-(--text-secondary) leading-relaxed">
                Traditional construction often feels opaque, fragmented, and stressful. At LivRise, we envisioned an architectural studio where homeowners can imagine their home, visualize it in photorealistic detail, inspect clear dimensioned blueprints, and watch it rise into reality with zero confusion.
              </p>
              <p className="text-xs sm:text-sm text-(--text-secondary) leading-relaxed">
                Whether you are building your first independent home, designing an urban villa, or developing a commercial landmark, LivRise provides the engineering backbone and artistic flair to realize your vision.
              </p>

              <div className="pt-2">
                <Link
                  href="/start-project"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-linear-to-r from-brand-indigo to-brand-blue text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
                >
                  <span>Start Your Home Journey</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-16/11 w-full rounded-3xl overflow-hidden border border-(--border-subtle) shadow-xl bg-slate-900">
                <Image
                  src="/images/anime/anime-dream-home.png"
                  alt="LivRise architectural dream home visual"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            CORE VALUES (4 Cards)
            =================================================================== */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-10 lg:px-12">
          <div className="max-w-7xl mx-auto space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-indigo">
                Guiding Principles
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-(--text-primary)">
                What Guides Every LivRise Blueprint
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((val) => (
                <div
                  key={val.title}
                  className="rounded-3xl border border-(--border-subtle) bg-(--surface-primary) p-6 space-y-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <span className="text-3xl p-2 rounded-2xl bg-(--surface-secondary) border border-(--border-subtle) inline-block">
                    {val.symbol}
                  </span>
                  <h3 className="text-base font-bold text-(--text-primary)">
                    {val.title}
                  </h3>
                  <p className="text-xs text-(--text-secondary) leading-relaxed">
                    {val.desc}
                  </p>
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
