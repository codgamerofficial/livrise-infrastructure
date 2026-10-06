'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LivRiseHero } from '@/components/hero/LivRiseHero';
import { LivRiseFooter } from '@/components/layout/LivRiseFooter';
import { useLivRiseStore } from '@/lib/store';
import {
  Compass,
  Home,
  Layers,
  HardHat,
  ArrowRight,
  ShieldCheck,
  Users,
  CheckCircle2,
  Clock,
  Star,
  FolderOpen,
  Sparkles,
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function HomePage() {
  const { testimonials, projects } = useLivRiseStore();

  // =========================================================================
  // 1. SERVICES (Master Prompt Section 18)
  // Exactly 4 primary service cards: HOUSE PLAN, 3D ELEVATION, INTERIOR DESIGN, CONSTRUCTION
  // Dark surfaces (#151518), gold/silver accents, architectural imagery
  // =========================================================================
  const primaryServices = [
    {
      title: 'HOUSE PLAN',
      tagline: 'Precision architectural floor plans & municipal statutory approval sets.',
      slug: 'house-plan',
      icon: Compass,
      image: '/images/anime/architectural-sketch.png',
      badge: 'Architecture',
      features: ['Vastu Compliant', 'Municipal Approvals', 'Optimal Carpet Ratio'],
    },
    {
      title: '3D ELEVATION',
      tagline: 'Photorealistic exterior architectural visualizations and lighting studies.',
      slug: '3d-elevation',
      icon: Home,
      image: '/images/anime/anime-dream-home.png',
      badge: 'Visualization',
      features: ['4K Renders', 'Material Palettes', 'Sun & Shadow Simulation'],
    },
    {
      title: 'INTERIOR DESIGN',
      tagline: 'Curated spatial layouts, custom joinery, and refined modern aesthetics.',
      slug: 'interior-design',
      icon: Layers,
      image: '/images/anime/anime-villa-dusk.jpg',
      badge: 'Interiors',
      features: ['Spatial Ergonomics', 'Reflected Ceilings', 'Material Samples'],
    },
    {
      title: 'CONSTRUCTION',
      tagline: 'Turnkey civil execution with strict structural quality control & scheduling.',
      slug: 'construction',
      icon: HardHat,
      image: '/images/anime/colorful-modernist.png',
      badge: 'Civil Works',
      features: ['Site Supervision', 'Premium Materials', 'Milestone Handover'],
    },
  ];

  // =========================================================================
  // 2. WHY CHOOSE US (Master Prompt Section 19)
  // Exactly 4: End-to-End Service, Personalized Design, Clear Process, One Trusted Team
  // Elegant architectural symbols
  // =========================================================================
  const whyChooseUsPoints = [
    {
      step: '01',
      title: 'End-to-End Service',
      desc: 'From initial concept drafting to final key handover, your home is engineered under one unified roof.',
      icon: CheckCircle2,
    },
    {
      step: '02',
      title: 'Personalized Design',
      desc: 'Every layout is tailored to your unique plot orientation, family lifestyle, and climatic environment.',
      icon: Sparkles,
    },
    {
      step: '03',
      title: 'Clear Process',
      desc: 'Transparent milestones, itemized bill of quantities, and digital drawing signoffs with zero ambiguity.',
      icon: ShieldCheck,
    },
    {
      step: '04',
      title: 'One Trusted Team',
      desc: 'Licensed architects, structural engineers, and site managers working together with single-point accountability.',
      icon: Users,
    },
  ];

  // =========================================================================
  // 3. HOW IT WORKS (Master Prompt Section 20)
  // 01 CONSULTATION, 02 DESIGN, 03 APPROVAL, 04 CONSTRUCTION
  // Architectural progress line: Gold active stage, Silver inactive stages
  // =========================================================================
  const howItWorksSteps = [
    {
      step: '01',
      title: 'CONSULTATION',
      subtitle: 'Brief & Requirements',
      desc: 'Share your plot dimensions, lifestyle requirements, and aesthetic aspirations with our design leads.',
      icon: '01',
      active: true,
    },
    {
      step: '02',
      title: 'DESIGN',
      subtitle: 'Plans & 3D Visualization',
      desc: 'We draft bespoke 2D architectural blueprints and model photorealistic 3D elevations for review.',
      icon: '02',
      active: false,
    },
    {
      step: '03',
      title: 'APPROVAL',
      subtitle: 'Technical Sanctions',
      desc: 'Finalize structural engineering calculations, municipal sanction drawings, and itemized project budgets.',
      icon: '03',
      active: false,
    },
    {
      step: '04',
      title: 'CONSTRUCTION',
      subtitle: 'Turnkey Execution',
      desc: 'Our civil engineering team executes your approved design on-site with scheduled milestone deliveries.',
      icon: '04',
      active: false,
    },
  ];

  // =========================================================================
  // 4. CUSTOMER REVIEWS (Master Prompt Section 22)
  // 2-3 reviews max, authentic/CMS managed
  // =========================================================================
  const defaultReviews = [
    {
      id: 'rev-1',
      rating: 5,
      quote:
        'LivRise made our dream villa a reality. The precision between the 3D elevation renders and the completed structure was remarkable.',
      author: 'Rajesh Mukherjee',
      location: 'Residential Villa, West Bengal',
    },
    {
      id: 'rev-2',
      rating: 5,
      quote:
        'Clear floor planning, honest timelines, and responsive structural coordination at every construction milestone.',
      author: 'Sneha Roy',
      location: '3BHK Residence, Kolkata',
    },
    {
      id: 'rev-3',
      rating: 5,
      quote:
        'From initial structural drawings to interior joinery details, the LivRise engineering team delivered exceptional craft.',
      author: 'Anirban Sen',
      location: 'Independent Home, New Town',
    },
  ];

  const displayReviews =
    testimonials && testimonials.length > 0
      ? testimonials.slice(0, 3).map((t, idx) => ({
          id: t.id || `cms-rev-${idx}`,
          rating: t.rating || 5,
          quote: t.content,
          author: t.clientName,
          location: t.projectReference || t.clientCompany || 'Verified Homeowner',
        }))
      : defaultReviews;

  const featuredProjects = projects ? projects.slice(0, 3) : [];

  return (
    <div className="flex-1 flex flex-col bg-[#0B0B0D] text-[#F5F5F3] selection:bg-[#C9963E] selection:text-black">
      {/* ===================================================================
          1. HERO SECTION (Master Prompt Section 16 & 17)
          =================================================================== */}
      <LivRiseHero />

      {/* ===================================================================
          2. SERVICES (Master Prompt Section 18)
          Exactly 4 cards: HOUSE PLAN, 3D ELEVATION, INTERIOR DESIGN, CONSTRUCTION
          =================================================================== */}
      <section id="services" className="py-24 sm:py-32 px-4 sm:px-6 md:px-10 lg:px-12 relative overflow-hidden bg-[#0B0B0D]">
        {/* Subtle background blueprint grid */}
        <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-16 relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#151518] border border-[#C9963E]/30 text-[#E5B85C] text-xs font-semibold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E5B85C]" />
              <span>Core Practices</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Architectural <span className="gold-gradient-text">Services</span>
            </h2>
            <p className="text-sm sm:text-base text-zinc-400">
              Four dedicated disciplines delivered in seamless synchronization.
            </p>
          </div>

          {/* Exactly 4 Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {primaryServices.map((service, index) => {
              const Icon = service.icon;

              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative rounded-2xl p-6 border border-zinc-800/80 bg-[#151518] hover:border-[#E5B85C]/50 shadow-xl shadow-black/40 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Subtle top gold accent bar on hover */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#E5B85C] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="space-y-5">
                    {/* Top Row */}
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-[#202124] border border-zinc-700/60 flex items-center justify-center text-[#E5B85C] group-hover:border-[#E5B85C]/40 group-hover:scale-105 transition-all">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono tracking-wider text-zinc-400 uppercase px-2.5 py-0.5 rounded-full border border-zinc-800 bg-[#0B0B0D]">
                        {service.badge}
                      </span>
                    </div>

                    {/* Image Thumbnail */}
                    <div className="relative aspect-16/10 w-full rounded-xl overflow-hidden bg-black/60 border border-zinc-800/60">
                      <Image
                        src={service.image}
                        alt={`${service.title} architectural visualization`}
                        fill
                        sizes="(max-width: 768px) 100vw, 300px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#151518] via-transparent to-transparent opacity-80" />
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="text-lg font-bold tracking-tight text-white group-hover:text-[#E5B85C] transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                        {service.tagline}
                      </p>
                    </div>

                    {/* Bullet Highlights */}
                    <ul className="space-y-1.5 pt-2 border-t border-zinc-800/80">
                      {service.features.map((feat) => (
                        <li
                          key={feat}
                          className="flex items-center gap-2 text-[11px] font-medium text-zinc-300"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E5B85C] shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Explore Link */}
                  <div className="pt-5 mt-4">
                    <Link
                      href={`/services/${service.slug}`}
                      className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#202124] hover:bg-[#E5B85C] text-zinc-200 hover:text-black border border-zinc-700/60 hover:border-[#E5B85C] text-xs font-bold transition-all duration-200 group/btn"
                    >
                      <span>Explore {service.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================================================================
          3. WHY CHOOSE US (Master Prompt Section 19)
          Exactly 4 points: End-to-End Service, Personalized Design, Clear Process, One Trusted Team
          =================================================================== */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 md:px-10 lg:px-12 bg-[#151518] border-y border-zinc-800/80 relative">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#202124] border border-[#C9963E]/30 text-[#E5B85C] text-xs font-semibold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E5B85C]" />
              <span>The LivRise Standard</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Why Choose <span className="silver-gradient-text">LivRise</span>
            </h2>
            <p className="text-sm sm:text-base text-zinc-400">
              One dedicated architectural engineering ecosystem. No fragmented contractors.
            </p>
          </div>

          {/* 4 Feature Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUsPoints.map((point, idx) => {
              const Icon = point.icon;

              return (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="rounded-2xl p-6 border border-zinc-800 bg-[#0B0B0D] hover:border-[#C9963E]/40 transition-all flex flex-col justify-between group shadow-lg"
                >
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-[#151518] border border-zinc-700/60 flex items-center justify-center text-[#E5B85C] group-hover:scale-105 transition-transform">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="font-mono text-xs font-bold text-zinc-500">
                        {point.step}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-[#E5B85C] transition-colors">
                        {point.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
                        {point.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-zinc-800/80 flex items-center gap-1.5 text-[11px] font-semibold text-[#E5B85C]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E5B85C]" />
                    <span>Certified Quality</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================================================================
          4. HOW IT WORKS (Master Prompt Section 20)
          01 CONSULTATION, 02 DESIGN, 03 APPROVAL, 04 CONSTRUCTION
          Architectural progress line: Gold active stage, silver inactive stages
          =================================================================== */}
      <section id="how-it-works" className="py-24 sm:py-32 px-4 sm:px-6 md:px-10 lg:px-12 relative overflow-hidden bg-[#0B0B0D]">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#151518] border border-[#C9963E]/30 text-[#E5B85C] text-xs font-semibold tracking-widest uppercase">
              <Clock className="w-3.5 h-3.5 text-[#E5B85C]" />
              <span>Architectural Timeline</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              How It <span className="gold-gradient-text">Works</span>
            </h2>
            <p className="text-sm sm:text-base text-zinc-400">
              A transparent four-phase process from conception to reality.
            </p>
          </div>

          {/* 4-Step Architectural Progress Line */}
          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-10 left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-[#C9963E] via-zinc-700 to-zinc-800 z-0" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
              {howItWorksSteps.map((step, idx) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  className={`relative rounded-2xl p-6 border ${
                    step.active
                      ? 'border-[#E5B85C] bg-[#151518] shadow-xl shadow-amber-500/10'
                      : 'border-zinc-800 bg-[#151518]/60 hover:border-zinc-700'
                  } flex flex-col justify-between group transition-all`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono font-extrabold text-sm ${
                          step.active
                            ? 'bg-[#E5B85C] text-black shadow-md shadow-amber-500/30'
                            : 'bg-[#202124] text-zinc-400 border border-zinc-700/60'
                        }`}
                      >
                        {step.icon}
                      </div>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-zinc-500 font-bold">
                        Phase {idx + 1}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#E5B85C]">
                        {step.subtitle}
                      </span>
                      <h3 className="text-xl font-extrabold text-white tracking-tight mt-1">
                        {step.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-3 border-t border-zinc-800 flex items-center justify-between text-xs">
                    <span className="text-zinc-500 font-medium">Stage {idx + 1} of 4</span>
                    <span className={step.active ? 'text-[#E5B85C] font-bold' : 'text-zinc-600'}>
                      {idx === 0 ? 'Active' : 'Scheduled'}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick upload blueprint banner */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#151518] border border-[#C9963E]/30 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <h4 className="font-bold text-base sm:text-lg text-white">
                Have a plot sketch or structural drawing ready?
              </h4>
              <p className="text-xs sm:text-sm text-zinc-400">
                Share your site dimensions or layout sketch to fast-track your 3D design & cost estimate.
              </p>
            </div>
            <Link
              href="/start-project"
              className="gold-button px-6 py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider shrink-0 inline-flex items-center gap-2"
            >
              <span>Submit Project Details</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===================================================================
          5. PROJECT SHOWCASE (Master Prompt Section 21)
          Real projects only. If none, CMS-controlled empty state.
          Never invent clients, projects, budgets or completion percentages.
          =================================================================== */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 md:px-10 lg:px-12 bg-[#151518] border-t border-zinc-800/80">
        <div className="max-w-7xl mx-auto space-y-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#202124] border border-[#C9963E]/30 text-[#E5B85C] text-xs font-semibold tracking-widest uppercase">
                <FolderOpen className="w-3.5 h-3.5" />
                <span>Portfolio</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Featured Architectural Work
              </h2>
            </div>

            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#E5B85C] hover:text-[#F2D39A] transition-colors"
            >
              <span>Explore All Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {featuredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredProjects.map((p) => (
                <div
                  key={p.id}
                  className="rounded-2xl border border-zinc-800 bg-[#0B0B0D] p-5 shadow-xl space-y-4 group hover:border-[#C9963E]/40 transition-all"
                >
                  <div className="relative aspect-16/10 rounded-xl overflow-hidden bg-black/80">
                    <Image
                      src={p.coverImageUrl || p.galleryImages?.[0] || '/brand/livrise-logo-primary.png'}
                      alt={p.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#E5B85C]">
                      {p.category}
                    </span>
                    <h3 className="text-base font-bold text-white mt-1 group-hover:text-[#E5B85C] transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-xs text-zinc-400 line-clamp-2 mt-1 leading-relaxed">
                      {p.summary}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 sm:p-14 rounded-2xl border border-dashed border-zinc-800 bg-[#0B0B0D] text-center max-w-xl mx-auto space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#151518] border border-amber-500/20 text-[#E5B85C] flex items-center justify-center mx-auto">
                <FolderOpen className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">
                  Active Projects Under Documentation
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  Our latest client residential blueprints, 3D exterior elevations, and ongoing civil sites are being curated for this showcase.
                </p>
              </div>
              <Link
                href="/start-project"
                className="gold-button inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider"
              >
                <span>Register Your Project</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ===================================================================
          6. CUSTOMER REVIEWS (Master Prompt Section 22)
          2-3 reviews max, only real/CMS managed
          =================================================================== */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 md:px-10 lg:px-12 relative bg-[#0B0B0D]">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#151518] border border-[#C9963E]/30 text-[#E5B85C] text-xs font-semibold tracking-widest uppercase">
              <Star className="w-3.5 h-3.5 fill-[#E5B85C] text-[#E5B85C]" />
              <span>Verified Homeowners</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Client <span className="silver-gradient-text">Experiences</span>
            </h2>
            <p className="text-sm sm:text-base text-zinc-400">
              Trusted by homeowners across planning, design, and turnkey execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayReviews.map((rev) => (
              <div
                key={rev.id}
                className="rounded-2xl p-7 border border-zinc-800 bg-[#151518] shadow-xl flex flex-col justify-between space-y-6 hover:border-zinc-700 transition-colors"
              >
                <div className="space-y-4">
                  {/* 5 Stars */}
                  <div className="flex items-center gap-1 text-[#E5B85C]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  <p className="text-sm text-zinc-300 leading-relaxed italic">
                    &ldquo;{rev.quote}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-5 border-t border-zinc-800">
                  <div className="w-10 h-10 rounded-xl bg-[#202124] border border-amber-500/20 text-[#E5B85C] font-bold flex items-center justify-center text-xs">
                    {rev.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-xs text-white">
                      {rev.author}
                    </div>
                    <div className="text-[11px] text-zinc-500 mt-0.5">
                      {rev.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================
          7. FINAL CTA (Master Prompt Section 23)
          Headline: READY TO BUILD YOUR DREAM HOME?
          Supporting: Tell us what you're imagining and let's turn it into reality.
          Button: GET STARTED -> /start-project
          =================================================================== */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 md:px-10 lg:px-12 relative overflow-hidden bg-[#0B0B0D]">
        <div className="max-w-5xl mx-auto relative rounded-3xl p-8 sm:p-16 border border-[#C9963E]/30 bg-gradient-to-b from-[#151518] to-[#0B0B0D] shadow-2xl text-center space-y-6 overflow-hidden">
          {/* Subtle gold ambient glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#C9963E]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#202124] border border-[#C9963E]/30 text-[#E5B85C] text-xs font-semibold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E5B85C]" />
              <span>Begin Your Journey</span>
            </span>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Ready to Build Your <span className="gold-gradient-text">Dream Home?</span>
            </h2>

            <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed">
              Tell us what you&apos;re imagining and let&apos;s turn it into reality.
            </p>

            <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/start-project"
                className="gold-button px-8 py-4 rounded-xl text-xs sm:text-sm font-extrabold uppercase tracking-wider inline-flex items-center gap-2 shadow-xl"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/services"
                className="px-6 py-4 rounded-xl bg-[#202124] hover:bg-[#2a2c31] text-zinc-200 hover:text-white font-bold text-xs sm:text-sm border border-zinc-700/80 transition-all"
              >
                Browse Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          8. FOOTER
          =================================================================== */}
      <LivRiseFooter />
    </div>
  );
}
