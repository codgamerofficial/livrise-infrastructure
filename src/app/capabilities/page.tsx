'use client';

import React from 'react';
import Link from 'next/link';
import { LivRiseNavbar } from '@/components/layout/LivRiseNavbar';
import { LivRiseFooter } from '@/components/layout/LivRiseFooter';
import {
  Compass,
  Layers,
  Building,
  CheckSquare,
  ShieldCheck,
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
    color: 'text-indigo-500 bg-indigo-500/10',
  },
  {
    title: 'Structural Engineering',
    desc: 'Reinforced concrete frames (RCC), structural steel systems, foundation piling schemes, and dynamic seismic resilience.',
    icon: Layers,
    slug: 'construction',
    tier: 'Structural Engineering',
    color: 'text-sky-500 bg-sky-500/10',
  },
  {
    title: 'Civil & Infrastructure Planning',
    desc: 'Road alignments, stormwater drainage networks, utility distribution corridors, and civil site grading.',
    icon: Building,
    slug: 'construction',
    tier: 'Civil Works',
    color: 'text-emerald-500 bg-emerald-500/10',
  },
  {
    title: 'Finite Element Analysis (FEA)',
    desc: 'Advanced non-linear FEA, lateral drift calculations, thermal stress gradients, and mesh convergence simulations.',
    icon: Activity,
    slug: 'construction',
    tier: 'Computational Physics',
    color: 'text-purple-500 bg-purple-500/10',
  },
  {
    title: 'Dynamic Seismic Engineering',
    desc: 'Response spectrum modeling, IS 1893 seismic compliance, shear wall ductility detailing, and base shear optimization.',
    icon: Layers,
    slug: 'construction',
    tier: 'Codal Mechanics',
    color: 'text-amber-500 bg-amber-500/10',
  },
  {
    title: '3D Elevation & Visualization',
    desc: 'Photorealistic exterior 4K renders, daylight study, evening architectural lighting simulation, and cladding specifications.',
    icon: Sparkles,
    slug: '3d-elevation',
    tier: 'Visualization',
    color: 'text-cyan-500 bg-cyan-500/10',
  },
  {
    title: 'Interior Design & Joinery',
    desc: 'Bespoke modular layouts, reflected ceiling plans (RCP), furniture ergonomics, and material mood boards.',
    icon: Grid,
    slug: 'interior-design',
    tier: 'Spatial Design',
    color: 'text-pink-500 bg-pink-500/10',
  },
  {
    title: 'Itemized BOQ & Cost Estimation',
    desc: 'Detailed itemized bill of quantities (BOQ), market rate analysis, value engineering, and financial feasibility modeling.',
    icon: Calculator,
    slug: 'house-plan',
    tier: 'Cost Governance',
    color: 'text-rose-500 bg-rose-500/10',
  },
  {
    title: 'Turnkey Project Execution',
    desc: 'Critical path scheduling (CPM), contractor technical oversight, on-site quality testing, and handover governance.',
    icon: HardHat,
    slug: 'construction',
    tier: 'Execution',
    color: 'text-teal-500 bg-teal-500/10',
  },
];

export default function CapabilitiesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-(--bg-primary) text-(--text-primary) transition-colors duration-200">
      <LivRiseNavbar />

      <main className="flex-1 pt-28 sm:pt-32 pb-24">
        {/* Header Hero */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-10 lg:px-12 border-b border-(--border-subtle) text-center relative overflow-hidden">
          <div className="max-w-4xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-brand-indigo dark:text-brand-blue border border-indigo-500/20 text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Technical & Disciplinary Rigor</span>
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-(--text-primary)">
              Engineering & Architecture Capabilities
            </h1>

            <p className="text-sm sm:text-base text-(--text-secondary) max-w-2xl mx-auto leading-relaxed">
              Finite Element Analysis, Seismic Modeling, Bespoke Architecture, and Turnkey Civil Execution united under LivRise Infrastructure.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/start-project"
                className="bg-linear-to-r from-brand-indigo to-brand-blue text-white px-7 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider hover:shadow-lg transition-all"
              >
                Start a Project
              </Link>
              <Link
                href="/contact"
                className="border border-(--border-strong) bg-(--surface-primary) px-6 py-3 rounded-2xl text-xs font-semibold text-(--text-primary) hover:bg-(--surface-secondary) transition-all"
              >
                Contact Engineering Desk
              </Link>
            </div>
          </div>
        </section>

        {/* Capabilities Grid */}
        <section className="py-16 px-4 sm:px-6 md:px-10 lg:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CAPABILITIES.map((cap, idx) => {
              const Icon = cap.icon;
              return (
                <motion.div
                  key={cap.title}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.04 }}
                  className="rounded-3xl border border-(--border-subtle) bg-(--surface-primary) hover:border-brand-indigo/40 p-6 flex flex-col justify-between group shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`p-3 rounded-2xl ${cap.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-(--surface-secondary) text-(--text-muted) border border-(--border-subtle)">
                        {cap.tier}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-(--text-primary) group-hover:text-brand-indigo transition-colors">
                        {cap.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-(--text-secondary) mt-2 leading-relaxed">
                        {cap.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-3 border-t border-(--border-subtle)">
                    <Link
                      href={`/services/${cap.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-indigo dark:text-brand-blue group-hover:underline"
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
