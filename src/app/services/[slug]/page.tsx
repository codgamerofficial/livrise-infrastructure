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
  Compass,
} from 'lucide-react';

interface ServiceDetailProps {
  params: Promise<{ slug: string }>;
}

function ServiceHeroImage({ src, alt }: { src?: string; alt: string }) {
  const [imgSrc, setImgSrc] = React.useState(src || '/images/anime/anime-dream-home.png');

  return (
    <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl bg-black">
      <Image
        src={imgSrc}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 100vw, 42vw"
        className="object-cover opacity-85"
        priority
        onError={() => setImgSrc('/brand/livrise-logo-primary.png')}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#151518] via-transparent to-transparent opacity-80" />
    </div>
  );
}

export default function ServiceDetailPage({ params }: ServiceDetailProps) {
  const resolvedParams = use(params);
  const { services } = useLivRiseStore();

  const service = services.find((s) => s.slug === resolvedParams.slug);

  if (!service) {
    return (
      <div className="min-h-screen bg-[#0B0B0D] text-[#F5F5F3] flex flex-col justify-between">
        <LivRiseNavbar />
        <div className="max-w-md mx-auto text-center py-40 space-y-4 px-6">
          <h1 className="text-2xl font-bold text-white">Service Not Found</h1>
          <p className="text-zinc-400 text-sm">
            The requested practice does not exist or has been relocated.
          </p>
          <Link
            href="/services"
            className="gold-button inline-block px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider"
          >
            Return to Services Directory
          </Link>
        </div>
        <LivRiseFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0B0D] text-[#F5F5F3] selection:bg-[#C9963E] selection:text-black">
      <LivRiseNavbar />

      <main className="flex-1 pt-28 sm:pt-32 pb-24">
        {/* ===================================================================
            HERO SECTION
            =================================================================== */}
        <section className="relative py-16 sm:py-24 px-4 sm:px-6 md:px-10 lg:px-12 border-b border-zinc-800 overflow-hidden bg-[#0B0B0D]">
          <div className="absolute inset-0 blueprint-grid opacity-25 pointer-events-none" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C9963E]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto space-y-8 relative z-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono">
              <Link href="/services" className="hover:text-[#E5B85C] transition-colors">
                Services
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
              <span className="text-[#E5B85C] font-bold">{service.title}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-5">
                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#151518] border border-[#C9963E]/30 text-[#E5B85C] text-xs font-semibold tracking-widest uppercase">
                  <Compass className="w-3.5 h-3.5 text-[#E5B85C]" />
                  <span>{service.category} Discipline</span>
                </span>

                <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
                  {service.title}
                </h1>

                <p className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed">
                  {service.headline}
                </p>

                <div className="pt-2 flex flex-wrap gap-4">
                  <Link
                    href="/start-project"
                    className="gold-button px-7 py-3.5 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center gap-2"
                  >
                    <span>Get Free Quote for {service.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <a
                    href="#capabilities"
                    className="border border-zinc-700 bg-[#202124] px-6 py-3.5 rounded-xl text-xs font-bold text-zinc-200 hover:border-[#E5B85C] transition-all"
                  >
                    View Practice Scope
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
        <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-10 lg:px-12 border-b border-zinc-800 bg-[#151518]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-4 space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#E5B85C] font-mono font-bold block">
                Discipline Overview
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Architectural Summary
              </h2>
            </div>
            <div className="lg:col-span-8 text-zinc-300 font-normal text-sm sm:text-base leading-relaxed space-y-4">
              <p>{service.description}</p>
            </div>
          </div>
        </section>

        {/* ===================================================================
            CAPABILITIES
            =================================================================== */}
        <section
          id="capabilities"
          className="py-16 sm:py-24 px-4 sm:px-6 md:px-10 lg:px-12 border-b border-zinc-800 bg-[#0B0B0D]"
        >
          <div className="max-w-7xl mx-auto space-y-10">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#E5B85C] font-mono font-bold block">
                Practice Scope
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Core Capabilities & Deliverables
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {service.capabilities.map((cap) => (
                <div
                  key={cap}
                  className="rounded-2xl border border-zinc-800 bg-[#151518] p-5 flex items-start gap-3.5 hover:border-[#E5B85C]/40 transition-colors shadow-lg"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#E5B85C] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-zinc-200 font-medium leading-relaxed">
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
        <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-10 lg:px-12 border-b border-zinc-800 bg-[#151518]">
          <div className="max-w-7xl mx-auto space-y-10">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#E5B85C] font-mono font-bold block">
                Methodology
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Execution Workflow
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {service.processSteps.map((step) => (
                <div
                  key={step.step}
                  className="rounded-2xl border border-zinc-800 bg-[#0B0B0D] p-6 space-y-3 shadow-lg"
                >
                  <span className="text-xl font-mono font-black text-[#E5B85C] block">
                    0{step.step}
                  </span>
                  <h3 className="text-base font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
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
        <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-10 lg:px-12 border-b border-zinc-800 bg-[#0B0B0D]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Deliverables */}
            <div className="rounded-2xl border border-zinc-800 bg-[#151518] p-6 sm:p-8 space-y-5 shadow-xl">
              <h3 className="text-xl font-bold text-white tracking-tight">
                Included Deliverables
              </h3>
              <div className="space-y-3">
                {service.deliverables.map((deliv) => (
                  <div key={deliv} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                    <FileCheck2 className="w-4 h-4 text-[#E5B85C] shrink-0 mt-0.5" />
                    <span className="font-medium">{deliv}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Target Sectors */}
            <div className="rounded-2xl border border-zinc-800 bg-[#151518] p-6 sm:p-8 space-y-5 shadow-xl">
              <h3 className="text-xl font-bold text-white tracking-tight">
                Suitable Project Types
              </h3>
              <div className="flex flex-wrap gap-2">
                {service.targetIndustries.map((ind) => (
                  <span
                    key={ind}
                    className="px-3.5 py-1.5 rounded-xl bg-[#202124] border border-zinc-700/80 text-xs text-zinc-300 font-medium"
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
        <section className="py-24 px-4 sm:px-6 md:px-10 lg:px-12 text-center bg-[#0B0B0D]">
          <div className="max-w-3xl mx-auto space-y-5 rounded-3xl p-8 sm:p-14 border border-[#C9963E]/30 bg-[#151518] shadow-2xl">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Ready to begin your <span className="gold-gradient-text">{service.title.toLowerCase()}?</span>
            </h2>
            <p className="text-xs sm:text-base text-zinc-400 max-w-xl mx-auto">
              Share your project requirements to receive a structured consultation, timeline, and quote.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/start-project"
                className="gold-button px-8 py-3.5 rounded-xl text-xs sm:text-sm uppercase tracking-wider"
              >
                Get Free Quote
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3.5 rounded-xl bg-[#202124] text-zinc-200 border border-zinc-700 hover:border-zinc-500 font-bold text-xs sm:text-sm transition-all"
              >
                Contact LivRise
              </Link>
            </div>
          </div>
        </section>
      </main>

      <LivRiseFooter />
    </div>
  );
}
