'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LivRiseNavbar } from '@/components/layout/LivRiseNavbar';
import {
  ArrowRight,
  Sparkles,
  Compass,
  CheckCircle2,
  Layers,
  Home,
  Eye,
  Shield,
  Palette,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function LivRiseHero() {
  // Visual transformation stages (Idea -> Blueprint -> 3D -> Finished Reality)
  const [activeStage, setActiveStage] = useState<number>(2); // Default to finished dream home

  const stages = [
    {
      id: 0,
      label: '01. Sketch & Layout',
      shortLabel: 'Sketch',
      tag: 'Idea & Spatial Plan',
      badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/25',
      image: '/images/anime/architectural-sketch.png',
      alt: 'Architectural watercolor sketch of modern residential villa',
      description: 'Custom floor plans, spatial massing, and municipal sanction-ready layouts.',
    },
    {
      id: 1,
      label: '02. Blueprint & Concept',
      shortLabel: 'Blueprint',
      tag: '3D Geometry & Elevation',
      badgeColor: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/25',
      image: '/images/anime/concept-cantilever.jpg',
      alt: 'Architectural structural blueprint and cantilevered concept',
      description: 'Engineering coordination, 3D volumetric modeling, and material specs.',
    },
    {
      id: 2,
      label: '03. Finished Dream Home',
      shortLabel: 'Reality',
      tag: 'Turnkey Reality',
      badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25',
      image: '/images/anime/anime-dream-home.png',
      alt: 'Completed anime-inspired modern dream home in vibrant sunlight',
      description: 'Precision civil execution, luxury interior finishes, and handover.',
    },
  ];

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-(--bg-primary) anime-grid">
      {/* Decorative ambient glowing anime gradient orbs */}
      <div className="absolute top-12 left-1/4 w-125 h-125 bg-linear-to-tr from-brand-indigo/15 via-brand-blue/15 to-brand-cyan/10 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse duration-1000" />
      <div className="absolute bottom-10 right-10 w-112.5 h-112.5 bg-linear-to-br from-brand-pink/15 via-brand-yellow/10 to-brand-mint/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Floating Pill Header */}
      <LivRiseNavbar />

      {/* Hero Main Content */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 pt-28 sm:pt-32 pb-16 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-12">
          {/* ===============================================================
              LEFT COLUMN: HEADLINE, SUBTEXT & APP-LIKE CTAS
              =============================================================== */}
          <div className="lg:col-span-6 space-y-6">
            {/* Top Pill: Anime Architecture Visual Statement */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-linear-to-r from-indigo-500/10 via-sky-500/10 to-cyan-500/10 border border-indigo-500/20 text-brand-indigo dark:text-brand-blue text-xs font-semibold shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 animate-spin duration-3000" />
              <span>Anime × Architecture × Construction</span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-indigo" />
              <span className="text-(--text-secondary)">LivRise Experience</span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-2"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-(--text-primary) leading-[1.1] font-sans">
                BUILD YOUR <br />
                <span className="anime-gradient-text">DREAM HOME</span> <br />
                WITH LIVRISE
              </h1>
            </motion.div>

            {/* Supporting Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-(--text-secondary) font-medium tracking-wide max-w-lg leading-relaxed"
            >
              House Plan • 3D Design • Interior • Construction
            </motion.p>

            {/* Brand Journey Statement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex items-center gap-2 text-xs font-semibold text-(--text-muted)"
            >
              <span className="px-2.5 py-1 rounded-lg bg-(--surface-secondary) border border-(--border-subtle) text-brand-indigo dark:text-brand-blue">
                Imagine It
              </span>
              <span>→</span>
              <span className="px-2.5 py-1 rounded-lg bg-(--surface-secondary) border border-(--border-subtle) text-sky-500">
                Design It
              </span>
              <span>→</span>
              <span className="px-2.5 py-1 rounded-lg bg-(--surface-secondary) border border-(--border-subtle) text-emerald-500">
                We&apos;ll Build It
              </span>
            </motion.div>

            {/* CTAs matching Master Prompt Section 06 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              {/* Primary CTA: GET FREE QUOTE */}
              <Link
                href="/start-project"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-linear-to-r from-brand-indigo via-[#4F46E5] to-brand-blue text-white font-bold text-sm tracking-wider uppercase shadow-lg shadow-brand-indigo/30 hover:shadow-xl hover:shadow-brand-indigo/45 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200 group"
              >
                <span>Get Free Quote</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              {/* Secondary CTA: EXPLORE SERVICES */}
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-(--surface-primary) border border-(--border-strong) text-(--text-primary) font-semibold text-sm hover:bg-(--surface-secondary) hover:border-brand-indigo/40 transition-all duration-200 shadow-sm"
              >
                <Compass className="w-4 h-4 text-brand-indigo" />
                <span>Explore Services</span>
              </a>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-4 flex flex-wrap items-center gap-4 text-xs text-(--text-secondary)"
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Verified Sanction Drawings</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                <span>Photorealistic 3D Renders</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-sky-500" />
                <span>End-to-End Build Guarantee</span>
              </div>
            </motion.div>
          </div>

          {/* ===============================================================
              RIGHT COLUMN: INTERACTIVE VISUAL STORYTELLING SHOWCASE
              (Idea -> Sketch -> Blueprint -> 3D Model -> Dream Home)
              =============================================================== */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative rounded-3xl p-3 sm:p-4 bg-(--surface-primary)/80 backdrop-blur-xl border border-(--border-subtle) shadow-2xl shadow-brand-indigo/10 overflow-hidden"
            >
              {/* Header inside the showcase card */}
              <div className="flex items-center justify-between pb-3 px-1 border-b border-(--border-subtle)">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-brand-coral" />
                  <span className="w-3 h-3 rounded-full bg-brand-yellow" />
                  <span className="w-3 h-3 rounded-full bg-brand-mint" />
                  <span className="text-xs font-mono font-medium text-(--text-muted) ml-2">
                    LIVRISE VIRTUAL STUDIO
                  </span>
                </div>
                <div className="text-xs font-semibold text-brand-indigo flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Idea → Design → Reality</span>
                </div>
              </div>

              {/* Stage Selector Tabs */}
              <div className="grid grid-cols-3 gap-1.5 p-1 my-3 bg-(--surface-secondary) rounded-2xl border border-(--border-subtle)">
                {stages.map((stg) => (
                  <button
                    key={stg.id}
                    type="button"
                    onClick={() => setActiveStage(stg.id)}
                    className={`py-2 px-2 rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 ${
                      activeStage === stg.id
                        ? 'bg-(--surface-primary) text-brand-indigo shadow-sm border border-(--border-subtle) scale-[1.02]'
                        : 'text-(--text-secondary) hover:text-(--text-primary)'
                    }`}
                  >
                    <span>{stg.shortLabel}</span>
                  </button>
                ))}
              </div>

              {/* Main Visual Display Frame */}
              <div className="relative aspect-16/11 w-full rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStage}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={stages[activeStage].image}
                      alt={stages[activeStage].alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                      priority
                      className="object-cover"
                    />

                    {/* Gradient overlay for readability */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

                    {/* Stage Label Badge */}
                    <div className="absolute top-3 left-3">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold border backdrop-blur-md shadow-md ${stages[activeStage].badgeColor} bg-black/50 text-white`}
                      >
                        <Eye className="w-3 h-3" />
                        {stages[activeStage].tag}
                      </span>
                    </div>

                    {/* Bottom Caption */}
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="font-bold text-sm tracking-tight">
                        {stages[activeStage].label}
                      </div>
                      <div className="text-xs text-zinc-200 font-light mt-0.5 line-clamp-2">
                        {stages[activeStage].description}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom Interactive Strip */}
              <div className="pt-3 px-1 flex items-center justify-between text-xs text-(--text-secondary)">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="font-medium text-(--text-primary)">
                    Original Architectural Aesthetic
                  </span>
                </div>

                <Link
                  href="/start-project"
                  className="font-bold text-brand-indigo dark:text-brand-blue hover:underline flex items-center gap-1"
                >
                  <span>Build This</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
