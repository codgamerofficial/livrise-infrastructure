'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { LivRiseNavbar } from '@/components/layout/LivRiseNavbar';
import { LivRiseFooter } from '@/components/layout/LivRiseFooter';
import { ArrowLeft, ArrowRight, ChevronRight, FileText, CheckCircle2 } from 'lucide-react';

interface InsightDetailProps {
  params: Promise<{ slug: string }>;
}

const INSIGHTS_MAP: Record<string, {
  title: string;
  category: string;
  date: string;
  readTime: string;
  summary: string;
  keyTakeaway: string;
  sections: { heading: string; body: string }[];
}> = {
  'designing-resilient-structural-systems': {
    title: 'Designing Resilient Structural Systems for Dynamic Lateral Seismic Loads',
    category: 'Engineering',
    date: 'October 2026',
    readTime: '6 min read',
    summary:
      'A technical analysis of shear wall configuration, soft-storey mitigation, and ductility detailing in reinforced concrete high-rises.',
    keyTakeaway:
      'Symmetric structural layouts and continuous vertical load paths significantly reduce torsional irregularity during dynamic seismic ground motion.',
    sections: [
      {
        heading: '1. Lateral Load Envelopes and Base Overturning',
        body: 'Tall and slender edifices experience severe horizontal shear stresses during dynamic seismic events. Beyond 15 storeys, ductility detailing must satisfy non-linear drift criteria rather than purely elastic stress limits.',
      },
      {
        heading: '2. Computational Response Spectra & P-Delta Effects',
        body: 'Three-dimensional finite element modeling enables structural engineers to simulate modal mass participation and second-order P-Delta displacements accurately, preventing unexpected hinge formations in lower-storey columns.',
      },
      {
        heading: '3. Good-for-Construction Detailing Protocols',
        body: 'Proper confinement rebar, ductile cross-ties, and mechanical couplers at critical lap zones guarantee that structural members absorb dynamic energy without catastrophic brittle shear failures.',
      },
    ],
  },
  'bioclimatic-architecture-passive-cooling': {
    title: 'Bioclimatic Architecture: Integrating Passive Cooling and Natural Daylighting',
    category: 'Architecture',
    date: 'September 2026',
    readTime: '5 min read',
    summary:
      'Principles of building orientation, volumetric shading, and thermal envelope optimization to reduce lifecycle energy consumption.',
    keyTakeaway:
      'Strategic sun path orientation and cross-ventilation corridors reduce operational HVAC cooling loads by up to 28% without sacrificing interior comfort.',
    sections: [
      {
        heading: '1. Micro-Climatic Site Analysis',
        body: 'Designing an environmentally responsible building requires comprehensive mapping of diurnal solar radiation angles, prevailing wind vectors, and local humidity ranges before fixing building footprints.',
      },
      {
        heading: '2. Massing and Envelope Fenestration',
        body: 'Deep vertical louvers, projected overhangs, and high-performance double-glazed facades control glare and heat gain while preserving unobstructed views and comfortable natural daylight levels.',
      },
    ],
  },
  'digital-project-governance-telemetry': {
    title: 'Digital Project Governance: Replacing Paper Blueprints with Milestone Telemetry',
    category: 'Technology',
    date: 'September 2026',
    readTime: '4 min read',
    summary:
      'How centralized revision control and encrypted document vaults prevent contractor misinterpretation on critical construction sites.',
    keyTakeaway:
      'Eliminating out-of-date paper drawings through single-source digital document vaults reduces on-site contractor rework by over 30%.',
    sections: [
      {
        heading: '1. The Problem with Fragmented Paper Workflows',
        body: 'In traditional construction workflows, revisions between structural leads, architects, and MEP consultants frequently fail to reach field supervisors on time, causing costly structural deviations.',
      },
      {
        heading: '2. Synchronized Digital Telemetry',
        body: 'By maintaining an authoritative cloud-based vault with cryptographic revision tracking, all stakeholders work against identical, certified Good-for-Construction (GFC) sets.',
      },
    ],
  },
};

export default function InsightDetailPage({ params }: InsightDetailProps) {
  const resolvedParams = use(params);
  const article = INSIGHTS_MAP[resolvedParams.slug] || {
    title: resolvedParams.slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
    category: 'Engineering Research',
    date: 'October 2026',
    readTime: '5 min read',
    summary: 'Technical engineering and architectural methodology analysis authored by the LivRise Infrastructure practice.',
    keyTakeaway: 'Disciplined computational modeling and coordinated execution ensure long-term structural longevity.',
    sections: [
      {
        heading: '1. Technical Framework & Codal Context',
        body: 'Modern infrastructural projects demand rigorous adherence to both architectural vision and engineering performance standards.',
      },
      {
        heading: '2. Implementation & Field Quality Controls',
        body: 'Early interdisciplinary coordination guarantees that material specifications and structural assumptions match actual site constructability.',
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white selection:bg-white selection:text-black">
      <LivRiseNavbar />

      <main className="flex-1 pt-32 pb-24">
        <article className="max-w-4xl mx-auto px-6 md:px-12 lg:px-16 space-y-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
            <Link href="/insights" className="hover:text-white transition-colors">
              Insights
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            <span className="text-white truncate">{article.title}</span>
          </div>

          {/* Header */}
          <div className="space-y-4 border-b border-white/10 pb-8">
            <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono">
              <span className="text-[10px] uppercase tracking-widest font-semibold px-2.5 py-0.5 rounded bg-white/10 text-white">
                {article.category}
              </span>
              <span>{article.date}</span>
              <span>•</span>
              <span>{article.readTime}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white leading-tight">
              {article.title}
            </h1>

            <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed">
              {article.summary}
            </p>
          </div>

          {/* Key Takeaway Card */}
          <div className="liquid-glass border border-white/15 rounded-2xl p-6 sm:p-8 space-y-2">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-mono text-zinc-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Core Engineering Takeaway</span>
            </div>
            <p className="text-sm sm:text-base text-zinc-200 font-light leading-relaxed">
              {article.keyTakeaway}
            </p>
          </div>

          {/* Body Sections */}
          <div className="space-y-8 text-zinc-300 font-light text-base sm:text-lg leading-relaxed">
            {article.sections.map((sec, idx) => (
              <div key={idx} className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-medium text-white tracking-tight">
                  {sec.heading}
                </h2>
                <p>{sec.body}</p>
              </div>
            ))}
          </div>

          {/* Author Footnote */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-zinc-400 font-mono">
            <span>Authored by: LivRise Infrastructure Engineering Desk</span>
            <Link
              href="/insights"
              className="inline-flex items-center gap-1.5 text-white hover:text-zinc-300 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to all insights</span>
            </Link>
          </div>
        </article>
      </main>

      <LivRiseFooter />
    </div>
  );
}
