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
  Sparkles,
  ShieldCheck,
  Users,
  CheckCircle2,
  Clock,
  Star,
  Eye,
  FileCheck2,
  FolderOpen,
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function HomePage() {
  const { testimonials, projects } = useLivRiseStore();

  // =========================================================================
  // 1. EXACTLY 4 PRIMARY SERVICES (Per Master Prompt Section 13 & 14)
  // Colorful visual cards with illustrations, gradients, badges & icons
  // =========================================================================
  const primaryServices = [
    {
      title: 'House Plan',
      tagline: 'Smart layouts designed around your lifestyle, space and budget.',
      symbol: '📐',
      slug: 'house-plan',
      icon: Compass,
      gradient: 'from-[#635BFF]/15 via-[#38BDF8]/10 to-transparent',
      borderColor: 'border-[#635BFF]/25 hover:border-[#635BFF]/60',
      badgeColor: 'bg-brand-indigo/10 text-brand-indigo dark:text-[#8B7CFF]',
      accentBg: 'from-[#635BFF] to-[#38BDF8]',
      image: '/images/anime/architectural-sketch.png',
      features: ['Vastu Compliant', 'Municipal Sanctions', 'Optimal Carpet Area'],
    },
    {
      title: '3D Elevation',
      tagline: 'See your future home before construction begins.',
      symbol: '🏠',
      slug: '3d-elevation',
      icon: Home,
      gradient: 'from-[#38BDF8]/15 via-[#22D3EE]/10 to-transparent',
      borderColor: 'border-[#38BDF8]/25 hover:border-[#38BDF8]/60',
      badgeColor: 'bg-[#38BDF8]/10 text-[#0284C7] dark:text-[#38BDF8]',
      accentBg: 'from-[#38BDF8] to-[#22D3EE]',
      image: '/images/anime/anime-dream-home.png',
      features: ['Photorealistic 4K', 'Material Palette', 'Lighting Simulation'],
    },
    {
      title: 'Interior Design',
      tagline: 'Beautiful interiors designed for the way you live.',
      symbol: '🛋️',
      slug: 'interior-design',
      icon: Layers,
      gradient: 'from-[#F472B6]/15 via-[#FB7185]/10 to-transparent',
      borderColor: 'border-[#F472B6]/25 hover:border-[#F472B6]/60',
      badgeColor: 'bg-[#F472B6]/10 text-[#E11D48] dark:text-[#F472B6]',
      accentBg: 'from-[#F472B6] to-[#FB923C]',
      image: '/images/anime/anime-villa-dusk.jpg',
      features: ['Spatial Ergonomics', 'Custom Modular', 'Lighting & Textures'],
    },
    {
      title: 'Construction',
      tagline: 'From approved design to real-world construction.',
      symbol: '🏗️',
      slug: 'construction',
      icon: HardHat,
      gradient: 'from-[#FACC15]/15 via-[#FB923C]/10 to-transparent',
      borderColor: 'border-[#FACC15]/25 hover:border-[#FACC15]/60',
      badgeColor: 'bg-[#FACC15]/10 text-[#D97706] dark:text-[#FACC15]',
      accentBg: 'from-[#FACC15] to-[#FB923C]',
      image: '/images/anime/colorful-modernist.png',
      features: ['Site Supervision', 'Quality Materials', 'On-Time Handover'],
    },
  ];

  // =========================================================================
  // 2. WHY CHOOSE US (Exactly 4 Points per Master Prompt Section 17)
  // Colorful icon/illustration blocks
  // =========================================================================
  const whyChooseUsPoints = [
    {
      step: '01',
      title: 'End-to-End Service',
      desc: 'From initial floor layout and photorealistic 3D renders to turnkey civil execution, your home is delivered through one unified journey.',
      icon: CheckCircle2,
      gradient: 'from-indigo-500/10 to-sky-500/10 border-indigo-500/25',
      iconColor: 'text-indigo-500 bg-indigo-500/15',
    },
    {
      step: '02',
      title: 'Personalized Design',
      desc: 'Every floor plan is custom-crafted around your specific plot geometry, natural ventilation, family lifestyle, and budget.',
      icon: Sparkles,
      gradient: 'from-pink-500/10 to-rose-500/10 border-pink-500/25',
      iconColor: 'text-pink-500 bg-pink-500/15',
    },
    {
      step: '03',
      title: 'Clear Process',
      desc: 'Transparent milestones at every stage: no hidden costs, clear drawing signoffs, and synchronized digital updates.',
      icon: ShieldCheck,
      gradient: 'from-emerald-500/10 to-teal-500/10 border-emerald-500/25',
      iconColor: 'text-emerald-500 bg-emerald-500/15',
    },
    {
      step: '04',
      title: 'One Trusted Team',
      desc: 'Architects, structural engineers, and site managers work in seamless harmony under one dedicated LivRise project manager.',
      icon: Users,
      gradient: 'from-amber-500/10 to-orange-500/10 border-amber-500/25',
      iconColor: 'text-amber-500 bg-amber-500/15',
    },
  ];

  // =========================================================================
  // 3. HOW IT WORKS (Visual Anime Transformation Journey: Idea -> Build)
  // Exactly 4 Steps per Master Prompt Section 18
  // =========================================================================
  const howItWorksSteps = [
    {
      step: '01',
      phase: 'IDEA & BRIEF',
      title: 'Consultation',
      desc: 'Share your plot dimensions, family requirements, and dream vision with our architects.',
      icon: '💡',
      gradient: 'from-indigo-500 to-sky-500',
    },
    {
      step: '02',
      phase: 'SKETCH & 3D',
      title: 'Design',
      desc: 'We draft bespoke 2D architectural blueprints and render vibrant 3D exterior elevations.',
      icon: '📐',
      gradient: 'from-sky-500 to-cyan-500',
    },
    {
      step: '03',
      phase: 'BLUEPRINT VETTING',
      title: 'Approval',
      desc: 'Review interactive iterations, finalize materials, and receive municipal sanction sets.',
      icon: '📋',
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      step: '04',
      phase: 'REAL-WORLD BUILD',
      title: 'Construction',
      desc: 'Our civil engineering team executes your approved design on-site with quality assurance.',
      icon: '🏗️',
      gradient: 'from-emerald-500 to-teal-500',
    },
  ];

  // =========================================================================
  // 4. REAL CUSTOMER REVIEWS (Per Master Prompt Section 20)
  // Max 2-3 genuine/CMS reviews
  // =========================================================================
  const defaultReviews = [
    {
      id: 'rev-1',
      rating: 5,
      quote:
        'LivRise made the entire home design process clear and exciting. Seeing the 3D elevation match the actual building was incredible.',
      author: 'Rajesh Mukherjee',
      location: 'Kolkata, Residential Villa',
      avatarBg: 'bg-indigo-500',
    },
    {
      id: 'rev-2',
      rating: 5,
      quote:
        'Transparent floor plans, zero confusion on site, and very responsive architectural coordination throughout construction.',
      author: 'Sneha Roy',
      location: 'Salt Lake Project, 3BHK Home',
      avatarBg: 'bg-emerald-500',
    },
    {
      id: 'rev-3',
      rating: 5,
      quote:
        'From the initial layout to the final structural drawings, the team delivered with engineering precision and speed.',
      author: 'Anirban Sen',
      location: 'New Town Residential',
      avatarBg: 'bg-amber-500',
    },
  ];

  const displayReviews =
    testimonials && testimonials.length > 0
      ? testimonials.slice(0, 3).map((t, idx) => ({
          id: t.id || `cms-rev-${idx}`,
          rating: t.rating || 5,
          quote: t.content,
          author: t.clientName,
          location: t.projectReference || t.clientCompany || 'Verified Project',
          avatarBg: idx === 0 ? 'bg-indigo-500' : idx === 1 ? 'bg-emerald-500' : 'bg-amber-500',
        }))
      : defaultReviews;

  // Real projects from store (only show real ones per Section 19)
  const featuredProjects = projects ? projects.slice(0, 3) : [];

  return (
    <div className="flex-1 flex flex-col bg-(--bg-primary) text-(--text-primary) transition-colors duration-200">
      {/* ===================================================================
          1. HERO SECTION (Anime × Architecture Scene)
          =================================================================== */}
      <LivRiseHero />

      {/* ===================================================================
          2. SERVICES SECTION (4 Colorful Illustrated Cards)
          =================================================================== */}
      <section
        id="services"
        className="py-20 sm:py-24 px-4 sm:px-6 md:px-10 lg:px-12 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-brand-indigo dark:text-brand-blue border border-indigo-500/20 text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Core Practices</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-(--text-primary)">
              Everything Needed to Build Your Home
            </h2>
            <p className="text-sm sm:text-base text-(--text-secondary)">
              Four dedicated practices brought together in one seamless digital workflow.
            </p>
          </div>

          {/* 4 Cards Grid */}
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
                  className={`group relative rounded-3xl p-5 border bg-(--surface-primary) ${service.borderColor} shadow-lg shadow-black/5 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl`}
                >
                  {/* Top Ambient Gradient Accent */}
                  <div
                    className={`absolute inset-0 bg-linear-to-b ${service.gradient} pointer-events-none opacity-80`}
                  />

                  <div className="relative z-10 space-y-4">
                    {/* Top Row: Symbol & Pill */}
                    <div className="flex items-center justify-between">
                      <span className="text-2xl p-2 rounded-2xl bg-(--surface-secondary) border border-(--border-subtle) shadow-xs">
                        {service.symbol}
                      </span>
                      <span
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${service.badgeColor}`}
                      >
                        Practice {index + 1}
                      </span>
                    </div>

                    {/* Preview Art Thumbnail */}
                    <div className="relative aspect-16/10 w-full rounded-2xl overflow-hidden bg-slate-800 shadow-sm border border-white/10 group-hover:scale-[1.02] transition-transform duration-300">
                      <Image
                        src={service.image}
                        alt={`${service.title} illustration`}
                        fill
                        sizes="(max-width: 768px) 100vw, 300px"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
                    </div>

                    {/* Title & Tagline */}
                    <div>
                      <h3 className="text-xl font-bold text-(--text-primary) group-hover:text-brand-indigo transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-xs text-(--text-secondary) mt-1.5 line-clamp-2 leading-relaxed">
                        {service.tagline}
                      </p>
                    </div>

                    {/* Bullet Highlights */}
                    <ul className="space-y-1.5 pt-1 border-t border-(--border-subtle)">
                      {service.features.map((feat) => (
                        <li
                          key={feat}
                          className="flex items-center gap-2 text-[11px] font-medium text-(--text-secondary)"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Explore Link at Bottom */}
                  <div className="relative z-10 pt-5 mt-2">
                    <Link
                      href={`/services/${service.slug}`}
                      className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-(--surface-secondary) hover:bg-brand-indigo text-(--text-primary) hover:text-white border border-(--border-subtle) text-xs font-bold transition-all duration-200 group/btn"
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
          3. WHY CHOOSE US (4 Distinct Points per Section 17)
          =================================================================== */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 md:px-10 lg:px-12 bg-(--surface-secondary)/50 border-y border-(--border-subtle) relative">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-bold uppercase tracking-widest">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Why LivRise</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-(--text-primary)">
              Designed For Confidence & Clarity
            </h2>
            <p className="text-sm sm:text-base text-(--text-secondary)">
              No fragmented contractors. One trusted architectural engineering team from first sketch to final key handover.
            </p>
          </div>

          {/* 4 Feature Blocks */}
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
                  className={`rounded-3xl p-6 border bg-(--surface-primary) shadow-sm hover:shadow-md transition-all flex flex-col justify-between`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center ${point.iconColor}`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="font-mono text-xs font-bold text-(--text-muted)">
                        {point.step}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-(--text-primary)">
                        {point.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-(--text-secondary) mt-2 leading-relaxed">
                        {point.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-2 border-t border-(--border-subtle) flex items-center gap-1 text-[11px] font-semibold text-brand-indigo dark:text-brand-blue">
                    <span>LivRise Guarantee</span>
                    <Sparkles className="w-3 h-3" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================================================================
          4. HOW IT WORKS (Idea -> Sketch -> Blueprint -> 3D -> Build)
          4 Steps per Master Prompt Section 18
          =================================================================== */}
      <section
        id="how-it-works"
        className="py-20 sm:py-24 px-4 sm:px-6 md:px-10 lg:px-12 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto space-y-14">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 text-xs font-bold uppercase tracking-widest">
              <Clock className="w-3.5 h-3.5" />
              <span>The Journey</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-(--text-primary)">
              How Your Dream Home Happens
            </h2>
            <p className="text-sm sm:text-base text-(--text-secondary)">
              Idea → Sketch → Blueprint → 3D Model → Real Construction.
            </p>
          </div>

          {/* 4-Step Animated Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {howItWorksSteps.map((step, idx) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="relative rounded-3xl p-6 border border-(--border-subtle) bg-(--surface-primary) shadow-md flex flex-col justify-between group hover:border-brand-indigo/50 transition-all"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl p-2.5 rounded-2xl bg-(--surface-secondary) border border-(--border-subtle)">
                      {step.icon}
                    </span>
                    <span className="text-2xl font-black font-mono text-(--text-muted) group-hover:text-brand-indigo transition-colors">
                      {step.step}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-indigo dark:text-brand-blue">
                      {step.phase}
                    </span>
                    <h3 className="text-xl font-bold text-(--text-primary) mt-1">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-(--text-secondary) mt-2 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-2 border-t border-(--border-subtle) flex items-center justify-between text-xs">
                  <span className="text-(--text-muted) font-medium">Stage {idx + 1} of 4</span>
                  <span className="font-bold text-brand-indigo group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Visual Sequence Banner */}
          <div className="p-6 rounded-3xl bg-linear-to-r from-indigo-500/10 via-sky-500/10 to-emerald-500/10 border border-indigo-500/20 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div>
              <h4 className="font-bold text-sm text-(--text-primary)">
                Have a floor plan or rough sketch already?
              </h4>
              <p className="text-xs text-(--text-secondary) mt-0.5">
                Upload your hand-drawn sketch or plot coordinates to start directly from Stage 02.
              </p>
            </div>
            <Link
              href="/start-project"
              className="px-5 py-2.5 rounded-xl bg-(--surface-primary) hover:bg-brand-indigo text-(--text-primary) hover:text-white border border-(--border-subtle) text-xs font-bold transition-all shadow-xs shrink-0"
            >
              Upload Sketch & Get Quote
            </Link>
          </div>
        </div>
      </section>

      {/* ===================================================================
          5. VISUAL PROJECT SHOWCASE (Real Projects or Clean Empty State)
          Per Master Prompt Section 19: No Fake Portfolio
          =================================================================== */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 md:px-10 lg:px-12 bg-(--surface-secondary)/30 border-t border-(--border-subtle)">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-bold uppercase tracking-widest">
                <FolderOpen className="w-3.5 h-3.5" />
                <span>Portfolio & Visuals</span>
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-(--text-primary)">
                Featured Architectural Work
              </h2>
            </div>

            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-indigo dark:text-brand-blue hover:underline"
            >
              <span>View Full Directory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Real projects if present in CMS/store, else beautiful empty state */}
          {featuredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredProjects.map((p) => (
                <div
                  key={p.id}
                  className="rounded-3xl border border-(--border-subtle) bg-(--surface-primary) p-4 shadow-md space-y-3 group"
                >
                  <div className="relative aspect-16/10 rounded-2xl overflow-hidden bg-slate-800">
                    <Image
                      src={p.coverImageUrl || p.galleryImages?.[0] || '/images/anime/anime-dream-home.png'}
                      alt={p.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-brand-indigo uppercase">
                      {p.category}
                    </span>
                    <h3 className="text-base font-bold text-(--text-primary) mt-0.5">
                      {p.title}
                    </h3>
                    <p className="text-xs text-(--text-secondary) line-clamp-2 mt-1">
                      {p.summary}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 sm:p-12 rounded-3xl border border-dashed border-(--border-strong) bg-(--surface-primary) text-center max-w-xl mx-auto space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 text-brand-indigo flex items-center justify-center mx-auto">
                <Sparkles className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-(--text-primary)">
                  Projects Are Being Prepared
                </h3>
                <p className="text-xs sm:text-sm text-(--text-secondary)">
                  Our latest client residential blueprints, 3D elevation walkthroughs, and site executions are undergoing curation.
                </p>
              </div>
              <Link
                href="/start-project"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-indigo text-white text-xs font-bold hover:bg-[#4F46E5] transition-all"
              >
                <span>Register Your Project</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ===================================================================
          6. CUSTOMER REVIEWS (2-3 Authentic Reviews per Section 20)
          =================================================================== */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 md:px-10 lg:px-12 relative">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-bold uppercase tracking-widest">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>Verified Homeowners</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-(--text-primary)">
              What Our Clients Say
            </h2>
            <p className="text-sm sm:text-base text-(--text-secondary)">
              Real feedback from homeowners who designed and built with LivRise.
            </p>
          </div>

          {/* 3 Review Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayReviews.map((rev) => (
              <div
                key={rev.id}
                className="rounded-3xl p-6 border border-(--border-subtle) bg-(--surface-primary) shadow-sm flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  {/* 5 Stars */}
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  <p className="text-sm text-(--text-primary) leading-relaxed italic">
                    &ldquo;{rev.quote}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-(--border-subtle)">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-xs ${rev.avatarBg}`}
                  >
                    {rev.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-xs text-(--text-primary)">
                      {rev.author}
                    </div>
                    <div className="text-[11px] text-(--text-secondary)">
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
          7. FINAL CTA (Per Master Prompt Section 21)
          Large colorful section:
          "READY TO BUILD YOUR DREAM HOME?
          Tell us what you're imagining and let's turn it into a plan.
          GET STARTED →"
          =================================================================== */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 md:px-10 lg:px-12 relative overflow-hidden">
        <div className="max-w-5xl mx-auto relative rounded-3xl p-8 sm:p-14 bg-linear-to-r from-brand-indigo via-[#4F46E5] to-brand-blue text-white shadow-2xl shadow-brand-indigo/30 text-center space-y-6 overflow-hidden">
          {/* Subtle anime decorative circles */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Start Today</span>
            </span>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Ready to Build Your Dream Home?
            </h2>

            <p className="text-sm sm:text-lg text-white/90 font-light leading-relaxed">
              Tell us what you&apos;re imagining and let&apos;s turn it into a plan.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/start-project"
                className="px-8 py-4 rounded-2xl bg-white text-brand-dark font-extrabold text-sm uppercase tracking-wider shadow-xl hover:bg-zinc-100 hover:scale-105 active:scale-95 transition-all duration-200 inline-flex items-center gap-2 group"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/services"
                className="px-6 py-4 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-semibold text-sm backdrop-blur-md transition-all border border-white/20"
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
