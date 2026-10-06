'use client';

import React, { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LivRiseNavbar } from '@/components/layout/LivRiseNavbar';
import { LivRiseFooter } from '@/components/layout/LivRiseFooter';
import { useLivRiseStore } from '@/lib/store';
import {
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  FileCheck2,
  Sparkles,
  Home,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface ServiceDetailProps {
  params: Promise<{ slug: string }>;
}

function ServiceHeroImage({ src, alt }: { src?: string; alt: string }) {
  const [imgSrc, setImgSrc] = React.useState(src || '/images/anime/anime-dream-home.png');

  return (
    <div className="relative h-72 sm:h-96 w-full rounded-3xl overflow-hidden border border-(--border-subtle) shadow-xl bg-slate-900">
      <Image
        src={imgSrc}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 100vw, 42vw"
        className="object-cover"
        priority
        onError={() => setImgSrc('/images/anime/anime-dream-home.png')}
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
    </div>
  );
}

export default function ServiceDetailPage({ params }: ServiceDetailProps) {
  const resolvedParams = use(params);
  const { services } = useLivRiseStore();

  const service = services.find((s) => s.slug === resolvedParams.slug);

  if (!service) {
    return (
      <div className="min-h-screen bg-(--bg-primary) text-(--text-primary) flex flex-col justify-between">
        <LivRiseNavbar />
        <div className="max-w-md mx-auto text-center py-40 space-y-4 px-6">
          <h1 className="text-2xl font-bold">Service Not Found</h1>
          <p className="text-(--text-secondary) text-sm">
            The requested practice does not exist or has been relocated.
          </p>
          <Link
            href="/services"
            className="inline-block px-5 py-2.5 bg-brand-indigo text-white font-bold rounded-xl text-xs"
          >
            Return to Services Directory
          </Link>
        </div>
        <LivRiseFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-(--bg-primary) text-(--text-primary) transition-colors duration-200">
      <LivRiseNavbar />

      <main className="flex-1 pt-28 sm:pt-32 pb-24">
        {/* ===================================================================
            HERO SECTION
            =================================================================== */}
        <section className="relative py-16 sm:py-20 px-4 sm:px-6 md:px-10 lg:px-12 border-b border-(--border-subtle) overflow-hidden">
          {/* Subtle ambient light glow */}
          <div className="absolute top-0 right-1/4 w-125 h-75 bg-linear-to-br from-indigo-500/10 to-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto space-y-8 relative z-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-(--text-muted) font-mono">
              <Link href="/services" className="hover:text-(--text-primary) transition-colors">
                Services
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-brand-indigo dark:text-brand-blue font-bold">{service.title}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-brand-indigo dark:text-brand-blue border border-indigo-500/20 text-xs font-bold uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{service.category} Practice</span>
                </span>

                <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-(--text-primary) leading-tight">
                  {service.title}
                </h1>

                <p className="text-base sm:text-lg text-(--text-secondary) font-medium leading-relaxed">
                  {service.headline}
                </p>

                <div className="pt-2 flex flex-wrap gap-3">
                  <Link
                    href="/start-project"
                    className="bg-linear-to-r from-brand-indigo to-brand-blue text-white px-7 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider hover:shadow-lg hover:shadow-brand-indigo/30 transition-all flex items-center gap-2"
                  >
                    <span>Get Free Quote for {service.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <a
                    href="#capabilities"
                    className="border border-(--border-strong) bg-(--surface-primary) px-6 py-3.5 rounded-2xl text-xs font-semibold text-(--text-primary) hover:bg-(--surface-secondary) transition-all"
                  >
                    View Scope
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5">
                <ServiceHeroImage src={service.coverImage} alt={service.title} />
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            OVERVIEW
            =================================================================== */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-10 lg:px-12 border-b border-(--border-subtle) bg-(--surface-secondary)/40">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-4 space-y-2">
              <span className="text-xs uppercase tracking-widest text-brand-indigo font-bold block">
                Practice Overview
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-(--text-primary) tracking-tight">
                Discipline Summary
              </h2>
            </div>
            <div className="lg:col-span-8 text-(--text-secondary) font-normal text-sm sm:text-base leading-relaxed space-y-4">
              <p>{service.description}</p>
            </div>
          </div>
        </section>

        {/* ===================================================================
            CAPABILITIES
            =================================================================== */}
        <section
          id="capabilities"
          className="py-16 sm:py-20 px-4 sm:px-6 md:px-10 lg:px-12 border-b border-(--border-subtle)"
        >
          <div className="max-w-7xl mx-auto space-y-10">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-brand-indigo font-bold block">
                Practice Scope
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-(--text-primary) tracking-tight">
                Core Capabilities & Deliverables
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {service.capabilities.map((cap) => (
                <div
                  key={cap}
                  className="rounded-2xl border border-(--border-subtle) bg-(--surface-primary) p-5 flex items-start gap-3.5 shadow-xs hover:border-brand-indigo/40 transition-colors"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-(--text-primary) font-medium leading-relaxed">
                    {cap}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================================
            PROCESS WORKFLOW
            =================================================================== */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-10 lg:px-12 border-b border-(--border-subtle) bg-(--surface-secondary)/40">
          <div className="max-w-7xl mx-auto space-y-10">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-brand-indigo font-bold block">
                Methodology
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-(--text-primary) tracking-tight">
                Execution Workflow
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {service.processSteps.map((step) => (
                <div
                  key={step.step}
                  className="rounded-2xl border border-(--border-subtle) bg-(--surface-primary) p-6 space-y-3 shadow-xs"
                >
                  <span className="text-xl font-mono font-black text-brand-indigo block">
                    0{step.step}
                  </span>
                  <h3 className="text-base font-bold text-(--text-primary)">
                    {step.title}
                  </h3>
                  <p className="text-xs text-(--text-secondary) leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================================
            DELIVERABLES & SECTORS
            =================================================================== */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-10 lg:px-12 border-b border-(--border-subtle)">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Deliverables */}
            <div className="rounded-3xl border border-(--border-subtle) bg-(--surface-primary) p-6 sm:p-8 space-y-5 shadow-xs">
              <h3 className="text-xl font-bold text-(--text-primary) tracking-tight">
                Included Deliverables
              </h3>
              <div className="space-y-3">
                {service.deliverables.map((deliv) => (
                  <div key={deliv} className="flex items-start gap-3 text-xs sm:text-sm text-(--text-secondary)">
                    <FileCheck2 className="w-4 h-4 text-brand-indigo shrink-0 mt-0.5" />
                    <span className="text-(--text-primary) font-medium">{deliv}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Target Sectors */}
            <div className="rounded-3xl border border-(--border-subtle) bg-(--surface-primary) p-6 sm:p-8 space-y-5 shadow-xs">
              <h3 className="text-xl font-bold text-(--text-primary) tracking-tight">
                Suitable For
              </h3>
              <div className="flex flex-wrap gap-2">
                {service.targetIndustries.map((ind) => (
                  <span
                    key={ind}
                    className="px-3.5 py-1.5 rounded-xl bg-(--surface-secondary) border border-(--border-subtle) text-xs text-(--text-secondary) font-medium"
                  >
                    {ind}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            FINAL CTA
            =================================================================== */}
        <section className="py-20 px-4 sm:px-6 md:px-10 lg:px-12 text-center">
          <div className="max-w-3xl mx-auto space-y-5 rounded-3xl p-8 sm:p-12 bg-linear-to-r from-brand-indigo to-brand-blue text-white shadow-xl">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Ready to begin your {service.title.toLowerCase()}?
            </h2>
            <p className="text-xs sm:text-base text-white/90 max-w-xl mx-auto">
              Tell us your requirements to receive a structured consultation, timeline, and quote.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/start-project"
                className="bg-white text-brand-dark px-7 py-3 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-zinc-100 transition-colors"
              >
                Get Free Quote
              </Link>
              <Link
                href="/contact"
                className="bg-white/15 text-white border border-white/25 px-7 py-3 rounded-xl text-xs font-semibold hover:bg-white/25 transition-colors"
              >
                Contact Team
              </Link>
            </div>
          </div>
        </section>
      </main>

      <LivRiseFooter />
    </div>
  );
}
