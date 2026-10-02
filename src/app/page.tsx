'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LivRiseHero } from '@/components/hero/LivRiseHero';
import { LivRiseFooter } from '@/components/layout/LivRiseFooter';
import { EmailContactButton } from '@/components/ui/EmailContactButton';
import { useLivRiseStore } from '@/lib/store';
import {
  ArrowRight,
  Layers,
  Compass,
  Building,
  CheckSquare,
  ShieldCheck,
  Calculator,
  HardHat,
  Activity,
  ChevronRight,
  Sparkles,
  ArrowUpRight,
  Grid,
  Cpu,
  Workflow,
  Eye,
  FileCheck2,
} from 'lucide-react';

export default function HomePage() {
  const { services, projects } = useLivRiseStore();
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [activeShowcaseTab, setActiveShowcaseTab] = useState<'architecture' | 'structural' | 'infrastructure' | 'render'>('architecture');

  const capabilities = [
    {
      title: 'Architecture',
      desc: 'Volumetric massing, spatial planning, statutory municipal drawings, and contextual environmental orientation.',
      icon: Compass,
      slug: 'architecture',
    },
    {
      title: 'Structural Engineering',
      desc: 'Reinforced concrete frames, structural steel systems, foundation piling schemes, and dynamic seismic resilience.',
      icon: Layers,
      slug: 'structural-engineering',
    },
    {
      title: 'Infrastructure',
      desc: 'Road alignments, stormwater drainage networks, utility distribution corridors, and civil site grading.',
      icon: Building,
      slug: 'infrastructure',
    },
    {
      title: 'Project Management',
      desc: 'Critical path scheduling (CPM), contractor technical oversight, quality audits, and milestone governance.',
      icon: CheckSquare,
      slug: 'project-management',
    },
    {
      title: 'Technical Consultancy',
      desc: 'Independent second-opinion vetting, peer reviews, statutory interpretations, and structural safety audits.',
      icon: ShieldCheck,
      slug: 'structural-engineering',
    },
    {
      title: 'Estimation & Cost Consultancy',
      desc: 'Detailed itemized bill of quantities (BOQ), rate analysis, value engineering, and financial feasibility modeling.',
      icon: Calculator,
      slug: 'estimation-cost-consultancy',
    },
    {
      title: 'Interior & Spatial Design',
      desc: 'Space planning, reflected ceiling plans (RCP), bespoke millwork detailing, and acoustic comfort planning.',
      icon: Grid,
      slug: 'interior-spatial-design',
    },
    {
      title: 'Engineering Analysis',
      desc: 'High-level computational finite element modeling (FEA), high-rise lateral drift, and thermal stress calculations.',
      icon: Activity,
      slug: 'engineering-analysis',
    },
    {
      title: 'Retrofitting & Rehabilitation',
      desc: 'Non-destructive testing (NDT), carbon fiber (CFRP) wrapping, column jacketing, and structural life extension.',
      icon: HardHat,
      slug: 'retrofitting-rehabilitation',
    },
  ];

  const projectFilters = [
    'All',
    'Architecture',
    'Structural',
    'Infrastructure',
    'Residential',
    'Commercial',
    'Industrial',
    'Institutional',
  ];

  const filteredProjects =
    selectedFilter === 'All'
      ? projects
      : projects.filter(
          (p) =>
            p.category.toLowerCase() === selectedFilter.toLowerCase() ||
            p.buildingType?.toLowerCase().includes(selectedFilter.toLowerCase())
        );

  const approachSteps = [
    {
      num: '01',
      title: 'Understand',
      desc: 'Comprehensive brief analysis, site boundary verification, geotechnical data review, and regulatory parameters.',
    },
    {
      num: '02',
      title: 'Plan',
      desc: 'Master zoning, density allocation, circulation hierarchy, and milestone timeline formulation.',
    },
    {
      num: '03',
      title: 'Design',
      desc: 'Schematic architectural layouts, spatial ergonomics, bioclimatic orientation, and 3D volumetric massing.',
    },
    {
      num: '04',
      title: 'Engineer',
      desc: 'Computational finite element analysis, member sizing, codal stress compliance, and foundation detailing.',
    },
    {
      num: '05',
      title: 'Deliver',
      desc: 'Good-for-Construction (GFC) drawings, contractor technical coordination, and on-site quality assurance audits.',
    },
    {
      num: '06',
      title: 'Evolve',
      desc: 'As-built verification, operational handover dossiers, and long-term structural integrity management.',
    },
  ];

  const sectors = [
    { name: 'Residential', desc: 'Villas, multi-storey housing, and apartment towers.' },
    { name: 'Commercial', desc: 'Corporate headquarters, office complexes, and retail centers.' },
    { name: 'Industrial', desc: 'Pre-engineered steel plants, logistics hubs, and manufacturing facilities.' },
    { name: 'Infrastructure', desc: 'Arterial bridges, drainage corridors, and municipal utilities.' },
    { name: 'Institutional', desc: 'University campuses, research labs, and civic educational institutions.' },
    { name: 'Hospitality', desc: 'Resorts, boutique hotels, and recreational facilities.' },
    { name: 'Urban Development', desc: 'Integrated township layouts, public plazas, and community master plans.' },
    { name: 'Public Works', desc: 'Government infrastructure, utility networks, and municipal assets.' },
  ];

  const insightsArticles = [
    {
      title: 'Designing Resilient Structural Systems for Dynamic Lateral Seismic Loads',
      category: 'Engineering',
      summary: 'A technical analysis of shear wall configuration and ductility detailing in reinforced concrete high-rises.',
      slug: 'designing-resilient-structural-systems',
      date: 'October 2026',
    },
    {
      title: 'Bioclimatic Architecture: Integrating Passive Cooling and Natural Daylighting',
      category: 'Architecture',
      summary: 'Principles of massing orientation and thermal envelope design to minimize building lifecycle operational energy.',
      slug: 'bioclimatic-architecture-passive-cooling',
      date: 'September 2026',
    },
    {
      title: 'Digital Project Governance: Replacing Paper Blueprints with Milestone Telemetry',
      category: 'Technology',
      summary: 'How unified digital document vaults and revision control prevent costly on-site contractor misinterpretations.',
      slug: 'digital-project-governance-telemetry',
      date: 'September 2026',
    },
  ];

  return (
    <div className="flex-1 flex flex-col bg-black text-white selection:bg-white selection:text-black">
      {/* ===================================================================
          HERO SECTION — APPROVED FULLSCREEN CINEMATIC VISUAL LANGUAGE
          =================================================================== */}
      <LivRiseHero />

      {/* ===================================================================
          01 INTRODUCTION — SPLIT-SCREEN EDITORIAL STATEMENT
          =================================================================== */}
      <section className="relative py-24 lg:py-32 px-6 md:px-12 lg:px-16 border-b border-white/10 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Large Editorial Statement */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-medium block">
                01 / Introduction
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.12]">
                Engineering ideas into places that matter.
              </h2>
              <div className="w-16 h-px bg-white/30" />
            </div>

            {/* Right Column: Factual-Neutral Positioning Overview */}
            <div className="lg:col-span-5 space-y-6 text-zinc-300 font-light text-base md:text-lg leading-relaxed pt-2">
              <p>
                LivRise Infrastructure brings engineering, architecture and infrastructure together through an integrated approach to planning, design and project delivery.
              </p>
              <p className="text-sm md:text-base text-zinc-400">
                We combine computational structural mechanics with architectural finesse and disciplined site governance, ensuring that complex technical drawings translate seamlessly into built reality without communication gaps or schedule drift.
              </p>
              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-zinc-300 transition-colors group"
                >
                  <span>Read About Our Practice</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          02 CAPABILITIES — LARGE EDITORIAL CARDS
          =================================================================== */}
      <section id="capabilities" className="relative py-24 lg:py-32 px-6 md:px-12 lg:px-16 border-b border-white/10 bg-black/95">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-medium block">
                02 / Capabilities
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white">
                Integrated Technical Disciplines
              </h2>
            </div>
            <p className="text-sm text-zinc-400 max-w-md font-light">
              Comprehensive planning, structural calculation, and engineering governance under one collaborative roof.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, idx) => {
              const IconComp = cap.icon;
              return (
                <div
                  key={cap.title}
                  className="liquid-glass border border-white/10 hover:border-white/30 rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-zinc-500">
                        0{idx + 1}
                      </span>
                      <IconComp className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-xl font-medium text-white tracking-tight pt-2">
                      {cap.title}
                    </h3>
                    <p className="text-sm text-zinc-400 font-light leading-relaxed">
                      {cap.desc}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
                    <Link
                      href={`/services/${cap.slug}`}
                      className="text-xs font-medium text-zinc-300 group-hover:text-white flex items-center gap-1.5 transition-colors"
                    >
                      <span>Explore Scope</span>
                      <ChevronRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================================================================
          03 SERVICES — FULL 10-SERVICE SHOWCASE
          =================================================================== */}
      <section id="services" className="relative py-24 lg:py-32 px-6 md:px-12 lg:px-16 border-b border-white/10 bg-black">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-medium block">
                03 / Services
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white">
                Full-Lifecycle Project Scope
              </h2>
            </div>
            <Link
              href="/services"
              className="text-sm font-medium text-zinc-300 hover:text-white flex items-center gap-2 group transition-colors"
            >
              <span>View All 10 Services</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 6).map((srv) => (
              <div
                key={srv.id}
                className="liquid-glass border border-white/10 hover:border-white/30 rounded-2xl overflow-hidden flex flex-col justify-between group transition-all duration-300"
              >
                <div className="relative h-48 w-full overflow-hidden bg-zinc-900">
                  <Image
                    src={srv.coverImage}
                    alt={srv.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
                  <span className="absolute top-4 left-4 text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded bg-black/80 backdrop-blur-md text-white border border-white/15">
                    {srv.category}
                  </span>
                </div>

                <div className="p-7 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-xl font-medium text-white group-hover:text-zinc-200 transition-colors">
                      {srv.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 mt-2.5 font-light leading-relaxed line-clamp-3">
                      {srv.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <Link
                      href={`/services/${srv.slug}`}
                      className="text-xs font-medium text-zinc-300 hover:text-white flex items-center gap-1"
                    >
                      <span>Specifications</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>

                    <Link
                      href="/start-project"
                      className="text-xs font-semibold text-white px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white hover:text-black transition-all"
                    >
                      Enquire
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================
          04 PROJECTS — LARGE EDITORIAL GRID (CLEAN CURATED STATE)
          =================================================================== */}
      <section id="projects" className="relative py-24 lg:py-32 px-6 md:px-12 lg:px-16 border-b border-white/10 bg-black/95">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-medium block">
                04 / Projects
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white">
                Project Showcase
              </h2>
            </div>
            <Link
              href="/projects"
              className="text-sm font-medium text-zinc-300 hover:text-white flex items-center gap-2 group transition-colors"
            >
              <span>Explore Portfolio</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {projectFilters.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setSelectedFilter(tab)}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                  selectedFilter === tab
                    ? 'bg-white text-black'
                    : 'liquid-glass border border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Conditional Rendering: Real Projects or Curated State */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredProjects.map((prj) => (
                <div
                  key={prj.id}
                  className="liquid-glass border border-white/10 hover:border-white/30 rounded-2xl overflow-hidden group flex flex-col justify-between transition-all"
                >
                  <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-zinc-900">
                    <Image
                      src={prj.coverImageUrl}
                      alt={prj.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="text-xs font-semibold px-3 py-1 rounded bg-black/80 text-white border border-white/20 backdrop-blur-md">
                        {prj.category}
                      </span>
                      <span className="text-xs font-mono px-2.5 py-1 rounded bg-black/60 text-zinc-300 backdrop-blur-md">
                        {prj.year}
                      </span>
                    </div>
                  </div>

                  <div className="p-8 space-y-4">
                    <div className="text-xs text-zinc-400">
                      <span>{prj.location}</span>
                    </div>
                    <h3 className="text-xl font-medium text-white group-hover:text-zinc-200 transition-colors">
                      {prj.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 line-clamp-2 leading-relaxed font-light">
                      {prj.summary}
                    </p>
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <span className="text-xs font-mono text-zinc-400">{prj.builtUpArea}</span>
                      <Link
                        href={`/projects/${prj.slug}`}
                        className="text-xs font-medium text-white hover:text-zinc-300 flex items-center gap-1"
                      >
                        <span>Case Study</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* REQUIRED EDITORIAL CURATED EMPTY STATE */
            <div className="liquid-glass border border-white/15 rounded-3xl p-12 md:p-16 text-center max-w-3xl mx-auto space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 text-white flex items-center justify-center mx-auto">
                <FileCheck2 className="w-7 h-7 text-zinc-300" />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl md:text-3xl font-normal text-white tracking-tight">
                  Projects are currently being curated.
                </h3>
                <p className="text-sm md:text-base text-zinc-400 font-light leading-relaxed max-w-xl mx-auto">
                  Our portfolio of structural, architectural and infrastructure project showcases is being reviewed and verified for publication. Case studies, drawings, and engineering specifications will be released from the operations console.
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/start-project"
                  className="bg-white text-black px-7 py-3 rounded-lg text-sm font-medium hover:bg-zinc-100 transition-colors"
                >
                  Start Your Project
                </Link>
                <Link
                  href="/contact"
                  className="liquid-glass border border-white/15 text-white px-7 py-3 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors"
                >
                  Speak with an Engineer
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ===================================================================
          05 APPROACH — EDITORIAL 6-STEP PROCESS TIMELINE
          =================================================================== */}
      <section className="relative py-24 lg:py-32 px-6 md:px-12 lg:px-16 border-b border-white/10 bg-black">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-medium block">
              05 / Approach
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white">
              The Methodical Path from Brief to Build
            </h2>
            <p className="text-sm text-zinc-400 font-light leading-relaxed">
              Every engagement follows an unbroken continuity of engineering rigor, design clarity, and digital project governance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {approachSteps.map((step) => (
              <div
                key={step.num}
                className="liquid-glass border border-white/10 rounded-2xl p-8 space-y-5 hover:border-white/30 transition-all duration-300"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-2xl font-mono font-light text-white">
                    {step.num}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-semibold">
                    Phase {step.num}
                  </span>
                </div>
                <h3 className="text-xl font-medium text-white tracking-tight">
                  {step.title}
                </h3>
                <p className="text-sm text-zinc-400 font-light leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================
          06 SECTORS — AREAS WE SERVE
          =================================================================== */}
      <section className="relative py-24 lg:py-32 px-6 md:px-12 lg:px-16 border-b border-white/10 bg-black/95">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-medium block">
                06 / Sectors
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white">
                Areas We Serve
              </h2>
            </div>
            <p className="text-sm text-zinc-400 max-w-md font-light">
              Cross-disciplinary planning and engineering solutions tailored to distinct sector challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sectors.map((sec) => (
              <div
                key={sec.name}
                className="liquid-glass border border-white/10 hover:border-white/30 rounded-2xl p-7 space-y-3 transition-all duration-300 group hover:-translate-y-1"
              >
                <h3 className="text-lg font-medium text-white group-hover:text-zinc-200 transition-colors">
                  {sec.name}
                </h3>
                <p className="text-xs text-zinc-400 font-light leading-relaxed">
                  {sec.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================
          07 ENGINEERING / ARCHITECTURE SHOWCASE — FROM CONCEPT TO REALITY
          =================================================================== */}
      <section className="relative py-24 lg:py-32 px-6 md:px-12 lg:px-16 border-b border-white/10 bg-black">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-medium block">
                07 / Showcase
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white">
                From concept to reality.
              </h2>
            </div>

            {/* Showcase View Switcher */}
            <div className="flex items-center gap-2 overflow-x-auto">
              {[
                { id: 'architecture', label: 'Architectural Plan' },
                { id: 'structural', label: 'Structural Model' },
                { id: 'infrastructure', label: 'Infrastructure Corridor' },
                { id: 'render', label: 'Spatial Visualization' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveShowcaseTab(tab.id as typeof activeShowcaseTab)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                    activeShowcaseTab === tab.id
                      ? 'bg-white text-black'
                      : 'liquid-glass border border-white/10 text-zinc-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Cinematic Display Card */}
          <div className="liquid-glass border border-white/15 rounded-3xl overflow-hidden shadow-2xl">
            <div className="relative h-96 sm:h-120 lg:h-135 w-full bg-zinc-950">
              {activeShowcaseTab === 'architecture' && (
                <Image
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop"
                  alt="Architectural Design and Spatial Massing"
                  fill
                  className="object-cover"
                />
              )}
              {activeShowcaseTab === 'structural' && (
                <Image
                  src="https://images.unsplash.com/photo-1541888946425-d0fbb186156f?q=80&w=1600&auto=format&fit=crop"
                  alt="Computational Structural Mechanics & Framing"
                  fill
                  className="object-cover"
                />
              )}
              {activeShowcaseTab === 'infrastructure' && (
                <Image
                  src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1600&auto=format&fit=crop"
                  alt="Civil Infrastructure Planning and Reticulation"
                  fill
                  className="object-cover"
                />
              )}
              {activeShowcaseTab === 'render' && (
                <Image
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop"
                  alt="Final Built Reality and Spatial Elevation"
                  fill
                  className="object-cover"
                />
              )}

              {/* Technical Telemetry Floating Overlay */}
              <div className="absolute bottom-6 left-6 right-6 md:right-auto md:max-w-md liquid-glass border border-white/20 p-5 rounded-xl backdrop-blur-xl space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <span>DISCIPLINE COORDINATION</span>
                  <span className="text-white">GFC COMPLIANT</span>
                </div>
                <h4 className="text-base font-medium text-white">
                  {activeShowcaseTab === 'architecture' && 'Volumetric Massing & Sanction Coordination'}
                  {activeShowcaseTab === 'structural' && 'Dynamic Finite Element Response Spectrum'}
                  {activeShowcaseTab === 'infrastructure' && 'Integrated Subsurface Utility Corridors'}
                  {activeShowcaseTab === 'render' && 'Photorealistic Spatial Elevation'}
                </h4>
                <p className="text-xs text-zinc-400 font-light leading-relaxed">
                  Rigorous parametric drafting, codal validation, and cross-functional engineering verification prior to site mobilization.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          08 INSIGHTS — EDITORIAL TECHNICAL BRIEFINGS
          =================================================================== */}
      <section className="relative py-24 lg:py-32 px-6 md:px-12 lg:px-16 border-b border-white/10 bg-black/95">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-medium block">
                08 / Insights
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white">
                Technical Editorial & Briefings
              </h2>
            </div>
            <Link
              href="/insights"
              className="text-sm font-medium text-zinc-300 hover:text-white flex items-center gap-2 group transition-colors"
            >
              <span>Explore All Insights</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {insightsArticles.map((article) => (
              <div
                key={article.slug}
                className="liquid-glass border border-white/10 hover:border-white/30 rounded-2xl p-8 flex flex-col justify-between group transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
                    <span className="text-[10px] uppercase tracking-widest font-semibold px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-white">
                      {article.category}
                    </span>
                    <span>{article.date}</span>
                  </div>

                  <h3 className="text-lg font-medium text-white group-hover:text-zinc-200 transition-colors pt-2 leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-zinc-400 font-light leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                  <Link
                    href={`/insights/${article.slug}`}
                    className="text-xs font-medium text-white hover:text-zinc-300 flex items-center gap-1"
                  >
                    <span>Read Technical Paper</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================
          09 CONTACT CTA — "LET'S BUILD WHAT'S NEXT."
          =================================================================== */}
      <section className="relative py-28 lg:py-36 px-6 md:px-12 lg:px-16 border-b border-white/10 bg-black text-center overflow-hidden">
        {/* Subtle ambient blur */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/3 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          <span className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-medium block">
            09 / Conversion
          </span>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white leading-tight">
            Let&apos;s build what&apos;s next.
          </h2>

          <p className="text-base sm:text-lg text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed">
            Whether planning a new structural development, architectural master scheme, or infrastructure network, LivRise Infrastructure brings engineering rigor and lifecycle transparency to your vision.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/start-project"
              className="w-full sm:w-auto bg-white text-black px-8 py-3.5 rounded-lg text-sm font-semibold hover:bg-zinc-100 transition-colors shadow-xl shadow-white/10 flex items-center justify-center gap-2"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <EmailContactButton
              label="Email LivRise"
              variant="outline"
              subject="Project Enquiry — LivRise Infrastructure"
              body="Hello LivRise Infrastructure,&#10;&#10;I would like to discuss a project.&#10;&#10;Regards,"
              className="w-full sm:w-auto px-8 py-3.5"
            />

            <Link
              href="/contact"
              className="w-full sm:w-auto liquid-glass liquid-glass-btn border border-white/20 text-white px-8 py-3.5 rounded-lg text-sm font-medium hover:bg-white hover:text-black transition-all"
            >
              Contact Technical Desk
            </Link>
          </div>
        </div>
      </section>

      {/* ===================================================================
          10 FOOTER — LIVRISE INFRASTRUCTURE
          =================================================================== */}
      <LivRiseFooter />
    </div>
  );
}
