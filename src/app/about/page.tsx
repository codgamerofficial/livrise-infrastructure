'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LivRiseNavbar } from '@/components/layout/LivRiseNavbar';
import { LivRiseFooter } from '@/components/layout/LivRiseFooter';
import { TeamSection } from '@/components/team/TeamSection';
import {
  Compass,
  ArrowRight,
  Sparkles,
  Layers,
  DraftingCompass,
  HardHat,
  Building,
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

  const workflowSteps = [
    {
      step: '01',
      title: 'Spatial Discovery & Site Analysis',
      desc: 'Detailed site dimension analysis, soil condition reviews, and alignment with municipal setbacks and homeowner living requirements.',
      icon: Compass,
    },
    {
      step: '02',
      title: '2D Blueprints & Photorealistic 3D',
      desc: 'Architectural drafting of floor layouts, structural elevations, and immersive 3D exterior renders so you inspect your home before building.',
      icon: DraftingCompass,
    },
    {
      step: '03',
      title: 'Structural & Civil Engineering',
      desc: 'Rigorous calculation of foundation loads, RCC column grids, structural integrity checks, and statutory compliance drawings.',
      icon: Layers,
    },
    {
      step: '04',
      title: 'Turnkey On-Site Execution',
      desc: 'Milestone-governed on-site execution, scheduled civil inspections, material quality verification, and transparent delivery.',
      icon: HardHat,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-brand-obsidian text-[#F5F5F3] selection:bg-brand-gold selection:text-black">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Organization',
                '@id': 'https://livrise.com/#organization',
                name: 'LivRise Infrastructure',
                url: 'https://livrise.com',
                description:
                  'Engineering precision, modern architecture, and turnkey construction crafted for modern dream homes and visionary infrastructure.',
              },
              {
                '@type': 'Person',
                '@id': 'https://livrise.com/about/#iman-khanra',
                name: 'Iman Khanra',
                jobTitle: 'Civil Engineering',
                worksFor: {
                  '@type': 'Organization',
                  name: 'LivRise Infrastructure',
                },
                alumniOf: [
                  {
                    '@type': 'EducationalOrganization',
                    name: 'Techno India University',
                  },
                  {
                    '@type': 'EducationalOrganization',
                    name: 'Contai Polytechnic',
                  },
                ],
              },
            ],
          }),
        }}
      />

      <LivRiseNavbar />

      <main className="flex-1 pt-28 sm:pt-32 pb-24">
        {/* ===================================================================
            1. HERO SECTION (About LivRise)
            =================================================================== */}
        <section className="relative py-16 sm:py-24 px-4 sm:px-6 md:px-10 lg:px-12 border-b border-zinc-800 overflow-hidden text-center bg-brand-obsidian">
          <div className="absolute inset-0 blueprint-grid opacity-25 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-4xl mx-auto space-y-4 relative z-10">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-charcoal border border-brand-gold/30 text-brand-gold-bright text-xs font-semibold tracking-widest uppercase">
              <Compass className="w-3.5 h-3.5 text-brand-gold-bright" />
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
            2. OUR VISION & PHILOSOPHY
            =================================================================== */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-10 lg:px-12 border-b border-zinc-800 bg-brand-charcoal">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-gold-bright">
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
                <div className="absolute inset-0 bg-linear-to-t from-brand-charcoal via-transparent to-transparent opacity-60" />
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            3. OUR APPROACH & GUIDING PRINCIPLES
            =================================================================== */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-10 lg:px-12 border-b border-zinc-800 bg-brand-obsidian">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-gold-bright">
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
                  className="rounded-2xl border border-zinc-800 bg-brand-charcoal p-6 space-y-4 shadow-xl hover:border-brand-gold-bright/40 transition-all"
                >
                  <span className="text-2xl p-2.5 rounded-xl bg-brand-graphite border border-zinc-700/60 inline-block">
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

        {/* ===================================================================
            4. THE LIVRISE TEAM / OUR PEOPLE (Featuring Iman Khanra)
            =================================================================== */}
        <TeamSection />

        {/* ===================================================================
            5. HOW WE WORK (Step-by-Step Architectural & Engineering Delivery)
            =================================================================== */}
        <section className="py-20 sm:py-28 px-4 sm:px-6 md:px-10 lg:px-12 border-b border-zinc-800 bg-brand-charcoal relative overflow-hidden">
          <div className="absolute inset-0 blueprint-grid opacity-15 pointer-events-none" />

          <div className="max-w-7xl mx-auto space-y-14 relative z-10">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-obsidian border border-brand-gold/30 text-brand-gold-bright text-xs font-semibold uppercase tracking-widest">
                <Building className="w-3.5 h-3.5 text-brand-gold-bright" />
                <span>How We Work</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                A Structured Path from <span className="gold-gradient-text">Concept to Completion</span>
              </h2>

              <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto">
                We combine architectural creativity with civil engineering rigor through four transparent execution phases.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {workflowSteps.map((wf) => {
                const Icon = wf.icon;
                return (
                  <div
                    key={wf.step}
                    className="rounded-2xl border border-zinc-800 bg-brand-obsidian p-6 sm:p-7 space-y-4 hover:border-brand-gold/40 hover:bg-brand-graphite transition-all shadow-lg relative group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-brand-gold/15 text-brand-gold-bright border border-brand-gold/30">
                        PHASE {wf.step}
                      </span>
                      <Icon className="w-5 h-5 text-zinc-500 group-hover:text-brand-gold-bright transition-colors" />
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-brand-gold-champagne transition-colors">
                      {wf.title}
                    </h3>

                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {wf.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===================================================================
            6. FINAL CONTACT CTA (Have a Project in Mind?)
            =================================================================== */}
        <section className="py-20 sm:py-28 px-4 sm:px-6 md:px-10 lg:px-12 bg-brand-obsidian text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl mx-auto space-y-6 relative z-10">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-gold-bright">
              Have a project in mind?
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Let&apos;s Build Your Vision with{' '}
              <span className="gold-gradient-text">Engineering Excellence</span>
            </h2>

            <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed">
              Whether you need customized architectural blueprints, 3D exterior renders, or turnkey civil construction, LivRise Infrastructure is ready to assist.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/start-project"
                className="gold-button inline-flex items-center gap-2 px-8 py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider shadow-xl shadow-amber-500/20"
              >
                <Sparkles className="w-4 h-4" />
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-300 bg-brand-charcoal border border-zinc-700 hover:text-white hover:border-zinc-500 transition-all"
              >
                <span>Contact Office</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <LivRiseFooter />
    </div>
  );
}
