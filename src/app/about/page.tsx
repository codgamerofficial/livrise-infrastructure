'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LivRiseNavbar } from '@/components/layout/LivRiseNavbar';
import { LivRiseFooter } from '@/components/layout/LivRiseFooter';
import {
  Compass,
  ArrowRight,
  ShieldCheck,
  Award,
  Users,
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const values = [
    {
      title: 'Architectural Vision',
      desc: 'We treat every home as a bespoke architectural creation—blending spatial harmony, natural illumination, and luxurious living spaces.',
      symbol: '🏛️',
    },
    {
      title: 'Engineering Precision',
      desc: 'Every structural frame, RCC column, and foundation plan is anchored in rigorous computational analysis and statutory building codes.',
      symbol: '📐',
    },
    {
      title: 'Process Clarity',
      desc: 'Transparent milestones, 3D visualization before construction, and clear communication from first sketch to final key handover.',
      symbol: '🤝',
    },
    {
      title: 'Turnkey Excellence',
      desc: 'We bridge design intent and on-site reality through structured contractor oversight, material quality checks, and scheduled site audits.',
      symbol: '🏗️',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0B0D] text-[#F5F5F3] selection:bg-[#C9963E] selection:text-black">
      <LivRiseNavbar />

      <main className="flex-1 pt-28 sm:pt-32 pb-24">
        {/* ===================================================================
            HERO SECTION
            =================================================================== */}
        <section className="relative py-16 sm:py-24 px-4 sm:px-6 md:px-10 lg:px-12 border-b border-zinc-800 overflow-hidden text-center bg-[#0B0B0D]">
          <div className="absolute inset-0 blueprint-grid opacity-25 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#C9963E]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-4xl mx-auto space-y-4 relative z-10">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#151518] border border-[#C9963E]/30 text-[#E5B85C] text-xs font-semibold tracking-widest uppercase">
              <Compass className="w-3.5 h-3.5 text-[#E5B85C]" />
              <span>About LivRise Infrastructure</span>
            </span>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Building Ideas Into <span className="gold-gradient-text">Reality.</span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed font-normal">
              LivRise Infrastructure brings modern architectural floor plans, photorealistic 3D elevations, interior aesthetics, and turnkey construction together into a seamless, client-first digital experience.
            </p>
          </div>
        </section>

        {/* ===================================================================
            STORY & PHILOSOPHY
            =================================================================== */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-10 lg:px-12 border-b border-zinc-800 bg-[#151518]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E5B85C]">
                Our Philosophy
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                Where engineering precision, modern architecture, and turnkey construction unite.
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Traditional construction often feels opaque, fragmented, and stressful. At LivRise, we envisioned an integrated architectural platform where homeowners can imagine their home, visualize it in photorealistic detail, inspect clear dimensioned blueprints, and watch it rise into reality with absolute confidence.
              </p>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Whether you are building your first independent home, designing an urban villa, or developing a commercial landmark, LivRise provides the engineering backbone and artistic flair to realize your vision.
              </p>

              <div className="pt-2">
                <Link
                  href="/start-project"
                  className="gold-button inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-xs uppercase tracking-wider"
                >
                  <span>Start Your Home Journey</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-16/11 w-full rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl bg-black">
                <Image
                  src="/images/anime/anime-dream-home.png"
                  alt="LivRise architectural dream home visual"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#151518] via-transparent to-transparent opacity-60" />
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            CORE VALUES (4 Cards)
            =================================================================== */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-10 lg:px-12 bg-[#0B0B0D]">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E5B85C]">
                Guiding Principles
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                What Guides Every LivRise Blueprint
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((val) => (
                <div
                  key={val.title}
                  className="rounded-2xl border border-zinc-800 bg-[#151518] p-6 space-y-4 shadow-xl hover:border-[#E5B85C]/40 transition-all"
                >
                  <span className="text-2xl p-2.5 rounded-xl bg-[#202124] border border-zinc-700/60 inline-block">
                    {val.symbol}
                  </span>
                  <h3 className="text-base font-bold text-white">
                    {val.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
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
