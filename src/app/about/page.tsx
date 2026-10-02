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
  Workflow,
  Cpu,
  Target,
  Sparkles,
  GraduationCap,
  Award,
} from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      title: 'Integrity of Calculation',
      desc: 'Every structural frame, foundation depth, and material specification is anchored in rigorous mathematical mechanics and verified national building codes.',
    },
    {
      title: 'Clarity & Transparency',
      desc: 'We replace opaque engineering practices with accessible digital milestone tracking, clear revision histories, and open communication.',
    },
    {
      title: 'Contextual Innovation',
      desc: 'Our architectural and civil designs respect environmental topographies, local climate zones, and long-term asset lifecycle economics.',
    },
    {
      title: 'Accountability in Execution',
      desc: 'We bridge design intent and on-site reality through structured constructability reviews, quality audits, and contractor alignment.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-black text-white selection:bg-white selection:text-black">
      <LivRiseNavbar />

      <main className="flex-1 pt-32">
        {/* ===================================================================
            1. BRAND INTRODUCTION & EDITORIAL HERO
            =================================================================== */}
        <section className="relative py-20 lg:py-28 px-6 md:px-12 lg:px-16 border-b border-white/10 bg-black overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/2 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-5xl mx-auto space-y-6 text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-medium block">
              About LivRise Infrastructure
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white leading-tight">
              Engineering, architecture and infrastructure brought together.
            </h1>
            <p className="text-base sm:text-lg text-zinc-300 font-light max-w-3xl mx-auto leading-relaxed">
              LivRise Infrastructure brings engineering, architecture and infrastructure together through an integrated approach to planning, design and project delivery. Building Ideas Into Reality.
            </p>
          </div>
        </section>

        {/* ===================================================================
            2. VISION & MISSION (FACTUAL-NEUTRAL POSITIONING)
            =================================================================== */}
        <section className="py-24 px-6 md:px-12 lg:px-16 border-b border-white/10 bg-black/95">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="liquid-glass border border-white/10 rounded-2xl p-8 sm:p-10 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
                <Target className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-medium text-white tracking-tight">Our Vision</h2>
              <p className="text-sm sm:text-base text-zinc-400 font-light leading-relaxed">
                To establish an integrated engineering standard where structural resilience, architectural beauty, and civil infrastructure coalesce into high-performance built environments.
              </p>
            </div>

            <div className="liquid-glass border border-white/10 rounded-2xl p-8 sm:p-10 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
                <Workflow className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-medium text-white tracking-tight">Our Mission</h2>
              <p className="text-sm sm:text-base text-zinc-400 font-light leading-relaxed">
                To deliver verifiable engineering solutions that eliminate contractor misinterpretation, reduce lifecycle waste, and guarantee structural safety from initial concept through Good-for-Construction detailing.
              </p>
            </div>
          </div>
        </section>

        {/* ===================================================================
            3. INTEGRATED DISCIPLINES
            =================================================================== */}
        <section className="py-24 px-6 md:px-12 lg:px-16 border-b border-white/10 bg-black">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-medium block">
                Practice Pillars
              </span>
              <h2 className="text-3xl sm:text-4xl font-normal text-white tracking-tight">
                Three Unified Disciplines
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="liquid-glass border border-white/10 rounded-2xl p-8 space-y-4">
                <Compass className="w-6 h-6 text-zinc-300" />
                <h3 className="text-xl font-medium text-white">Architecture</h3>
                <p className="text-sm text-zinc-400 font-light leading-relaxed">
                  Translating spatial briefs into harmonious volumetric forms with bioclimatic orientation, efficient circulation, and complete statutory sanction compliance.
                </p>
              </div>

              <div className="liquid-glass border border-white/10 rounded-2xl p-8 space-y-4">
                <Layers className="w-6 h-6 text-zinc-300" />
                <h3 className="text-xl font-medium text-white">Structural Engineering</h3>
                <p className="text-sm text-zinc-400 font-light leading-relaxed">
                  Finite element dynamic response spectrum modeling, foundation piling design, shear wall configuration, and seismic resilience conforming strictly to national codes.
                </p>
              </div>

              <div className="liquid-glass border border-white/10 rounded-2xl p-8 space-y-4">
                <Building className="w-6 h-6 text-zinc-300" />
                <h3 className="text-xl font-medium text-white">Infrastructure</h3>
                <p className="text-sm text-zinc-400 font-light leading-relaxed">
                  Hydraulic network modeling, arterial road geometries, stormwater retention networks, utility distribution corridors, and civil site grading optimization.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            4. VALUES & GOVERNANCE
            =================================================================== */}
        <section className="py-24 px-6 md:px-12 lg:px-16 border-b border-white/10 bg-black/95">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-medium block">
                Foundational Principles
              </span>
              <h2 className="text-3xl sm:text-4xl font-normal text-white tracking-tight">
                Operating Values
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="liquid-glass border border-white/10 rounded-2xl p-7 space-y-3"
                >
                  <h3 className="text-base font-medium text-white">{v.title}</h3>
                  <p className="text-xs text-zinc-400 font-light leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================================
            5. LEADERSHIP & TECHNICAL DIRECTION
            =================================================================== */}
        <section className="py-24 px-6 md:px-12 lg:px-16 border-b border-white/10 bg-[#070b14]">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-medium block">
                Technical Governance & Vision
              </span>
              <h2 className="text-3xl sm:text-4xl font-normal text-white tracking-tight">
                Leadership
              </h2>
            </div>

            <div className="liquid-glass border border-white/10 rounded-3xl p-8 sm:p-12 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
                {/* Photo & Profile Column */}
                <div className="lg:col-span-4 space-y-6">
                  {/* Photo Container */}
                  <div className="relative aspect-3/4 w-full rounded-2xl overflow-hidden border border-white/15 bg-zinc-950 shadow-2xl group">
                    <Image
                      src="/images/iman-khanra.jpg"
                      alt="Iman Khanra — Founder & Principal Director, LivRise Infrastructure"
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                      priority
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60" />
                    <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 text-center">
                      <span className="text-[10px] font-mono tracking-wider text-amber-300 font-semibold uppercase block">
                        Founder & Principal Director
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-center lg:text-left">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      Iman Khanra
                    </h3>
                    <p className="text-xs text-zinc-400 font-mono">
                      Civil Engineering & Infrastructure Direction
                    </p>
                  </div>
                </div>

                {/* Academic Credentials & Technical Philosophy Column */}
                <div className="lg:col-span-8 space-y-8 lg:border-l lg:border-white/10 lg:pl-10">
                  {/* Academic Credentials */}
                  <div className="space-y-4">
                    <span className="text-xs uppercase tracking-[0.2em] text-zinc-400 font-semibold block">
                      Academic Background & Credentials
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3.5">
                        <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shrink-0 mt-0.5">
                          <GraduationCap className="w-5 h-5 text-amber-400" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-white">Bachelor of Technology (B.Tech)</p>
                          <p className="text-xs text-amber-300 font-medium mt-0.5">Civil Engineering</p>
                          <p className="text-[11px] text-zinc-400 font-mono mt-0.5">Techno India University</p>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3.5">
                        <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shrink-0 mt-0.5">
                          <GraduationCap className="w-5 h-5 text-amber-400" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-white">Diploma in Engineering</p>
                          <p className="text-xs text-amber-300 font-medium mt-0.5">Civil Engineering</p>
                          <p className="text-[11px] text-zinc-400 font-mono mt-0.5">Contai Polytechnic</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Technical Philosophy & Narrative */}
                  <div className="space-y-4">
                    <span className="text-xs uppercase tracking-[0.2em] text-zinc-400 font-semibold block">
                      Technical Foundation & Vision
                    </span>
                    <div className="space-y-4 text-sm text-zinc-300 font-light leading-relaxed">
                      <p>
                        Iman Khanra leads LivRise Infrastructure with a solid foundation in civil engineering and structural mechanics. Having graduated with a Diploma in Civil Engineering from Contai Polytechnic and a Bachelor of Technology (B.Tech) in Civil Engineering from Techno India University, his technical background bridges academic structural rigor with practical field construction realities.
                      </p>
                      <p>
                        Under his direction, LivRise Infrastructure brings engineering, architecture, and infrastructure together through an integrated approach to planning, design vetting, and project delivery. Every proposal, structural calculation, and drawing set is evaluated for safety, cost-efficiency, and constructability—turning complex client ideas into enduring physical reality.
                      </p>
                    </div>
                  </div>

                  {/* Core Disciplines */}
                  <div className="pt-2">
                    <span className="text-xs uppercase tracking-wider text-zinc-400 font-semibold block mb-3">
                      Core Areas of Practice
                    </span>
                    <div className="flex flex-wrap gap-2 text-xs font-mono">
                      {[
                        'Civil Engineering',
                        'Structural Mechanics',
                        'Infrastructure Planning',
                        'Construction Methodology',
                        'Drawing Sanctions & Compliance',
                      ].map((item) => (
                        <span
                          key={item}
                          className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-zinc-300"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            6. TECHNOLOGY & PLATFORM
            =================================================================== */}
        <section className="py-24 px-6 md:px-12 lg:px-16 border-b border-white/10 bg-black">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-medium block">
                Digital Engineering Platform
              </span>
              <h2 className="text-3xl sm:text-4xl font-normal text-white tracking-tight leading-tight">
                Modern Project Delivery with Live Telemetry
              </h2>
              <p className="text-sm text-zinc-400 font-light leading-relaxed">
                LivRise Infrastructure bridges design studios and physical job sites. Through our digital engineering platform and centralized document vault, clients and contractors inspect revision-controlled drawing packages, verify milestone sign-offs, and track payment schedules with complete transparency.
              </p>
              <div className="pt-2">
                <Link
                  href="/start-project"
                  className="inline-flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-lg text-xs font-semibold hover:bg-zinc-100 transition-colors"
                >
                  <span>Start a Project</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="liquid-glass border border-white/15 rounded-3xl p-8 space-y-6">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400 border-b border-white/10 pb-4">
                  <span>SYSTEM CAPABILITIES</span>
                  <span className="text-white">ENCRYPTED & VAULTED</span>
                </div>
                <div className="space-y-4 text-xs font-light text-zinc-300">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Revision-controlled Good-for-Construction (GFC) drawing repository.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Real-time milestone progress tracking with stage sign-offs.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Encrypted document access, signed URLs, and audit logging.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Integrated quotation, invoicing, and project communication trails.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <LivRiseFooter />
    </div>
  );
}
