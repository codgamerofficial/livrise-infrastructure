'use client';

import React from 'react';
import Link from 'next/link';
import { LivRiseNavbar } from '@/components/layout/LivRiseNavbar';
import { LivRiseFooter } from '@/components/layout/LivRiseFooter';
import {
  Compass,
  Layers,
  Building,
  Calculator,
  Grid,
  Activity,
  HardHat,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { motion } from 'framer-motion';

const CAPABILITIES = [
  {
    title: 'Architecture & Master Planning',
    desc: 'Volumetric massing, spatial planning, statutory municipal sanction drawings, and contextual environmental orientation.',
    icon: Compass,
    slug: 'house-plan',
    tier: 'Core Architecture',
  },
  {
    title: 'Structural Engineering',
    desc: 'Reinforced concrete frames (RCC), structural steel systems, foundation piling schemes, and dynamic seismic resilience.',
    icon: Layers,
    slug: 'construction',
    tier: 'Structural Engineering',
  },
  {
    title: 'Civil & Infrastructure Planning',
    desc: 'Road alignments, stormwater drainage networks, utility distribution corridors, and civil site grading.',
    icon: Building,
    slug: 'construction',
    tier: 'Civil Works',
  },
  {
    title: 'Finite Element Analysis (FEA)',
    desc: 'Advanced non-linear FEA, lateral drift calculations, thermal stress gradients, and mesh convergence simulations.',
    icon: Activity,
    slug: 'construction',
    tier: 'Computational Physics',
  },
  {
    title: 'Dynamic Seismic Engineering',
    desc: 'Response spectrum modeling, IS 1893 seismic compliance, shear wall ductility detailing, and base shear optimization.',
    icon: Layers,
    slug: 'construction',
    tier: 'Codal Mechanics',
  },
  {
    title: '3D Elevation & Visualization',
    desc: 'Photorealistic exterior 4K renders, daylight study, evening architectural lighting simulation, and cladding specifications.',
    icon: Sparkles,
    slug: '3d-elevation',
    tier: 'Visualization',
  },
  {
    title: 'Interior Design & Joinery',
    desc: 'Bespoke modular layouts, reflected ceiling plans (RCP), furniture ergonomics, and material mood boards.',
    icon: Grid,
    slug: 'interior-design',
    tier: 'Spatial Design',
  },
  {
    title: 'Itemized BOQ & Cost Estimation',
    desc: 'Detailed itemized bill of quantities (BOQ), market rate analysis, value engineering, and financial feasibility modeling.',
    icon: Calculator,
    slug: 'house-plan',
    tier: 'Cost Governance',
  },
  {
    title: 'Turnkey Project Execution',
    desc: 'Critical path scheduling (CPM), contractor technical oversight, on-site quality testing, and handover governance.',
    icon: HardHat,
    slug: 'construction',
    tier: 'Execution',
  },
];

export default function CapabilitiesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-obsidian text-[#F5F5F3] selection:bg-brand-gold selection:text-black">
      <LivRiseNavbar />

      <main className="flex-1 pt-28 sm:pt-32 pb-24">
        {/* Header Hero */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-10 lg:px-12 border-b border-zinc-800 text-center relative overflow-hidden bg-brand-obsidian">
          <div className="absolute inset-0 blueprint-grid opacity-25 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-4xl mx-auto space-y-4 relative z-10">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-charcoal border border-brand-gold/30 text-brand-gold-bright text-xs font-semibold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold-bright" />
              <span>Technical & Disciplinary Rigor</span>
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Engineering & Architecture <span className="gold-gradient-text">Capabilities</span>
            </h1>

            <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Finite Element Analysis, Seismic Modeling, Bespoke Architecture, and Turnkey Civil Execution united under LivRise Infrastructure.
            </p>

            <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/start-project"
                className="gold-button px-8 py-3.5 rounded-xl text-xs sm:text-sm uppercase tracking-wider"
              >
                Start a Project
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3.5 rounded-xl bg-brand-graphite text-zinc-200 border border-zinc-700 hover:border-zinc-500 font-bold text-xs sm:text-sm transition-all"
              >
                Contact Engineering Desk
              </Link>
            </div>
          </div>
        </section>

        {/* Capabilities Grid */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-10 lg:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CAPABILITIES.map((cap, idx) => {
              const Icon = cap.icon;
              return (
                <motion.div
                  key={cap.title}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.04 }}
                  className="rounded-2xl border border-zinc-800 bg-brand-charcoal hover:border-brand-gold-bright/50 p-6 flex flex-col justify-between group shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-11 h-11 rounded-xl bg-brand-graphite border border-zinc-700/60 flex items-center justify-center text-brand-gold-bright group-hover:scale-105 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-brand-obsidian text-zinc-400 border border-zinc-800">
                        {cap.tier}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-brand-gold-bright transition-colors">
                        {cap.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
                        {cap.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-3 border-t border-zinc-800/80">
                    <Link
                      href={`/services/${cap.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-gold-bright group-hover:underline"
                    >
                      <span>Explore Practice</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      </main>

      <LivRiseFooter />
    </div>
  );
}
