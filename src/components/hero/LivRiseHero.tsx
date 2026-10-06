'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LivRiseNavbar } from '@/components/layout/LivRiseNavbar';
import {
  ArrowRight,
  Compass,
  CheckCircle2,
  Layers,
  Sparkles,
  Shield,
  Eye,
  Building2,
  Hammer,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function LivRiseHero() {
  // Visual transformation stages (Idea -> Plan -> Design -> Build) per Master Prompt Section 17
  const [activeStage, setActiveStage] = useState<number>(3); // Default to completed dream home

  const stages = [
    {
      id: 0,
      step: '01',
      title: 'Idea',
      subtitle: 'Spatial Vision',
      desc: 'Plot analysis, family requirements, and preliminary architectural zoning.',
      icon: Compass,
      image: '/images/anime/architectural-sketch.png',
      badge: 'Concept Stage',
    },
    {
      id: 1,
      step: '02',
      title: 'Plan',
      subtitle: 'Architectural Blueprint',
      desc: 'Precision floor plans, Vastu alignment, and municipal sanction drawings.',
      icon: Layers,
      image: '/images/anime/concept-cantilever.jpg',
      badge: 'Sanction Drawings',
    },
    {
      id: 2,
      step: '03',
      title: 'Design',
      subtitle: '3D Elevation & Interior',
      desc: 'Photorealistic 4K elevation modeling, lighting simulation, and material palettes.',
      icon: Eye,
      image: '/images/anime/anime-villa-dusk.jpg',
      badge: '4K Visualization',
    },
    {
      id: 3,
      step: '04',
      title: 'Build',
      subtitle: 'Turnkey Reality',
      desc: 'On-site engineering supervision, premium civil construction, and keys handover.',
      icon: Hammer,
      image: '/images/anime/anime-dream-home.png',
      badge: 'Finished Reality',
    },
  ];

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-[#0B0B0D] blueprint-grid">
      {/* Subtle luxury ambient gold and platinum architectural lighting */}
      <div className="absolute top-12 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-amber-500/10 via-amber-600/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-gradient-to-br from-zinc-700/10 via-amber-500/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Floating Header */}
      <LivRiseNavbar />

      {/* Hero Main Content */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 pt-28 sm:pt-32 pb-16 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-12">
          {/* ===============================================================
              LEFT COLUMN: HEADLINE, SUBTEXT & LUXURY CTAS
              =============================================================== */}
          <div className="lg:col-span-6 space-y-6">
            {/* Top Badge: Architectural Excellence */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-amber-500/30 text-[#E5B85C] text-xs font-semibold shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-[#E5B85C] animate-pulse" />
              <span>Engineering • Architecture • Infrastructure</span>
              <span className="text-zinc-500">•</span>
              <span className="text-zinc-300">LivRise</span>
            </motion.div>

            {/* Main Headline (Per Master Prompt Section 16) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-1.5"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#F5F5F3] leading-[1.08] font-sans">
                BUILD YOUR <br />
                <span className="gold-gradient-text">DREAM HOME</span> <br />
                WITH LIVRISE
              </h1>
            </motion.div>

            {/* Supporting Text (Per Master Prompt Section 16) */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-zinc-300 font-medium tracking-wide max-w-lg leading-relaxed"
            >
              House Plan • 3D Design • Interior • Construction
            </motion.p>

            {/* Architectural Visual Journey: IDEA -> PLAN -> DESIGN -> BUILD */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex items-center gap-1.5 sm:gap-2 text-xs font-semibold text-zinc-400"
            >
              <span className="px-2.5 py-1 rounded-lg bg-[#151518] border border-amber-500/25 text-[#E5B85C]">
                Idea
              </span>
              <span className="text-zinc-600">→</span>
              <span className="px-2.5 py-1 rounded-lg bg-[#151518] border border-white/10 text-zinc-300">
                Plan
              </span>
              <span className="text-zinc-600">→</span>
              <span className="px-2.5 py-1 rounded-lg bg-[#151518] border border-white/10 text-zinc-300">
                Design
              </span>
              <span className="text-zinc-600">→</span>
              <span className="px-2.5 py-1 rounded-lg bg-[#151518] border border-amber-500/30 text-[#E5B85C] font-bold">
                Build
              </span>
            </motion.div>

            {/* CTAs matching Master Prompt Section 16 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              {/* Primary CTA: GET FREE QUOTE (Gold Gradient) */}
              <Link
                href="/start-project"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl gold-button text-sm tracking-wider uppercase shadow-xl shadow-amber-500/25 group"
              >
                <span>Get Free Quote</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              {/* Secondary CTA: Explore Services */}
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 text-zinc-200 hover:text-white text-sm font-semibold transition-all duration-200"
              >
                <Building2 className="w-4 h-4 text-[#E5B85C]" />
                <span>Explore Services</span>
              </Link>
            </motion.div>

            {/* Trust Pill Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-2 flex items-center gap-4 sm:gap-6 text-xs text-zinc-400"
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#E5B85C]" />
                <span>Vastu Compliant</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#E5B85C]" />
                <span>Municipal Approval</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#E5B85C]" />
                <span>Turnkey Guarantee</span>
              </div>
            </motion.div>
          </div>

          {/* ===============================================================
              RIGHT COLUMN: ARCHITECTURAL 3D VISUALIZATION & STAGES
              =============================================================== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-6 relative"
          >
            {/* Main Architectural Showcase Card */}
            <div className="relative rounded-3xl overflow-hidden border border-amber-500/25 bg-[#151518] shadow-2xl shadow-black/80">
              {/* Display Active Stage Image */}
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-[#0B0B0D]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStage}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.45 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={stages[activeStage].image}
                      alt={stages[activeStage].subtitle}
                      fill
                      priority
                      className="object-cover object-center"
                    />
                    {/* Architectural gradient overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-transparent to-black/30" />
                  </motion.div>
                </AnimatePresence>

                {/* Top Badge Overlay */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-black/75 backdrop-blur-md border border-amber-500/30 text-[#E5B85C]">
                    {stages[activeStage].badge}
                  </span>
                </div>

                {/* Watermark: Official LR Monogram */}
                <div className="absolute top-4 right-4 z-20 opacity-80 hover:opacity-100 transition-opacity">
                  <div className="w-10 h-10 rounded-xl overflow-hidden border border-amber-500/30 bg-black/60 backdrop-blur-md p-1">
                    <Image
                      src="/brand/livrise-monogram.png"
                      alt="LivRise LR Mark"
                      width={40}
                      height={40}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-4 left-4 right-4 z-20 p-3.5 rounded-2xl bg-[#0B0B0D]/85 backdrop-blur-md border border-white/10 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white text-sm">
                      {stages[activeStage].subtitle}
                    </span>
                    <span className="text-[#E5B85C] font-mono font-bold">
                      STAGE {stages[activeStage].step}/04
                    </span>
                  </div>
                  <p className="text-xs text-zinc-300 line-clamp-2">
                    {stages[activeStage].desc}
                  </p>
                </div>
              </div>

              {/* Architectural Stage Switcher Tabs (Idea -> Plan -> Design -> Build) */}
              <div className="p-3 bg-[#0B0B0D] border-t border-white/10 grid grid-cols-4 gap-2">
                {stages.map((stg) => {
                  const isActive = activeStage === stg.id;
                  const Icon = stg.icon;

                  return (
                    <button
                      key={stg.id}
                      type="button"
                      onClick={() => setActiveStage(stg.id)}
                      className={`p-2 sm:p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                        isActive
                          ? 'border-amber-500/50 bg-amber-500/15 text-white shadow-sm'
                          : 'border-white/5 bg-white/5 text-zinc-400 hover:text-white hover:border-white/15'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#E5B85C]' : 'text-zinc-500'}`} />
                      <span className="text-[10px] sm:text-xs font-bold leading-none tracking-tight">
                        {stg.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
