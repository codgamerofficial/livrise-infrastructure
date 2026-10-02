'use client';

import React from 'react';
import Link from 'next/link';
import { LivRiseNavbar } from '@/components/layout/LivRiseNavbar';
import { LivRiseFooter } from '@/components/layout/LivRiseFooter';
import { EmailContactButton } from '@/components/ui/EmailContactButton';
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

const CAPABILITIES = [
  {
    title: 'Architecture',
    desc: 'Volumetric massing, spatial planning, statutory municipal drawings, and contextual environmental orientation.',
    icon: Compass,
    slug: 'architecture',
    tier: 'Core Discipline',
  },
  {
    title: 'Structural Engineering',
    desc: 'Reinforced concrete frames, structural steel systems, foundation piling schemes, and dynamic seismic resilience.',
    icon: Layers,
    slug: 'structural-engineering',
    tier: 'Core Discipline',
  },
  {
    title: 'Infrastructure',
    desc: 'Road alignments, stormwater drainage networks, utility distribution corridors, and civil site grading.',
    icon: Building,
    slug: 'infrastructure',
    tier: 'Core Discipline',
  },
  {
    title: 'Project Management',
    desc: 'Critical path scheduling (CPM), contractor technical oversight, quality audits, and milestone governance.',
    icon: CheckSquare,
    slug: 'project-management',
    tier: 'Lifecycle Governance',
  },
  {
    title: 'Technical Consultancy',
    desc: 'Independent second-opinion vetting, peer reviews, statutory interpretations, and structural safety audits.',
    icon: ShieldCheck,
    slug: 'structural-engineering',
    tier: 'Advisory & Peer Review',
  },
  {
    title: 'Estimation & Cost Consultancy',
    desc: 'Detailed itemized bill of quantities (BOQ), rate analysis, value engineering, and financial feasibility modeling.',
    icon: Calculator,
    slug: 'estimation-cost-consultancy',
    tier: 'Commercial Feasibility',
  },
  {
    title: 'Interior & Spatial Design',
    desc: 'Space planning, reflected ceiling plans (RCP), bespoke millwork detailing, and acoustic comfort planning.',
    icon: Grid,
    slug: 'interior-spatial-design',
    tier: 'Spatial Architecture',
  },
  {
    title: 'Engineering Analysis',
    desc: 'High-level computational finite element modeling (FEA), high-rise lateral drift, and thermal stress calculations.',
    icon: Activity,
    slug: 'engineering-analysis',
    tier: 'Computational Physics',
  },
  {
    title: 'Retrofitting & Rehabilitation',
    desc: 'Non-destructive testing (NDT), carbon fiber (CFRP) wrapping, column jacketing, and structural life extension.',
    icon: HardHat,
    slug: 'retrofitting-rehabilitation',
    tier: 'Asset Longevity',
  },
];

export default function CapabilitiesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white selection:bg-white selection:text-black">
      <LivRiseNavbar />

      <main className="flex-1 pt-32 pb-24">
        {/* Header Hero */}
        <section className="py-20 px-6 md:px-12 lg:px-16 border-b border-white/10 relative overflow-hidden bg-black text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-medium block">
              Disciplinary Rigor
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white">
              Engineering & Architectural Capabilities
            </h1>
            <p className="text-sm md:text-base text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed">
              Every project undertaken by LivRise Infrastructure benefits from integrated cross-disciplinary validation, codal compliance, and precision lifecycle execution.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/start-project"
                className="bg-white text-black px-6 py-2.5 rounded-lg text-xs font-semibold hover:bg-zinc-100 transition-colors"
              >
                Initiate Project Brief
              </Link>
              <EmailContactButton
                label="Email Technical Lead"
                variant="outline"
                className="py-2.5 px-6 text-xs"
              />
            </div>
          </div>
        </section>

        {/* Capabilities Grid */}
        <section className="py-20 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {CAPABILITIES.map((cap) => {
              const Icon = cap.icon;
              return (
                <div
                  key={cap.title}
                  className="liquid-glass border border-white/10 hover:border-white/30 rounded-2xl p-7 flex flex-col justify-between group transition-all duration-300"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5 text-zinc-300" />
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 px-2 py-0.5 rounded bg-white/5 border border-white/10">
                        {cap.tier}
                      </span>
                    </div>

                    <h3 className="text-lg font-medium text-white group-hover:text-zinc-200 transition-colors">
                      {cap.title}
                    </h3>

                    <p className="text-xs text-zinc-400 font-light leading-relaxed">
                      {cap.desc}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                    <Link
                      href={`/services/${cap.slug}`}
                      className="text-xs font-medium text-white hover:text-zinc-300 flex items-center gap-1.5 group/link"
                    >
                      <span>Explore Practice</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-link-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-16 px-6 md:px-12 lg:px-16 max-w-5xl mx-auto text-center border-t border-white/10">
          <div className="liquid-glass border border-white/15 rounded-3xl p-8 sm:p-12 space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center mx-auto text-white">
              <Sparkles className="w-6 h-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-normal text-white">
              Need multidisciplinary engineering oversight?
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto font-light leading-relaxed">
              From statutory municipal sanctions to advanced non-linear structural finite element modeling, our engineering desk is ready to review your parameters.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/start-project"
                className="w-full sm:w-auto bg-white text-black px-7 py-3 rounded-lg text-xs font-semibold hover:bg-zinc-100 transition-colors"
              >
                Start a Project
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto liquid-glass border border-white/20 text-white px-7 py-3 rounded-lg text-xs font-medium hover:bg-white/10 transition-colors"
              >
                Contact Technical Desk
              </Link>
            </div>
          </div>
        </section>
      </main>

      <LivRiseFooter />
    </div>
  );
}
