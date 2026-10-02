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
  ShieldCheck,
  Layers,
  HelpCircle,
  FileCheck2,
  ArrowLeft,
  Building,
} from 'lucide-react';

interface ServiceDetailProps {
  params: Promise<{ slug: string }>;
}

export default function ServiceDetailPage({ params }: ServiceDetailProps) {
  const resolvedParams = use(params);
  const { services, projects } = useLivRiseStore();

  const service = services.find((s) => s.slug === resolvedParams.slug);

  if (!service) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col justify-between">
        <LivRiseNavbar />
        <div className="max-w-md mx-auto text-center py-40 space-y-4 px-6">
          <h1 className="text-2xl font-normal">Service Not Found</h1>
          <p className="text-zinc-400 text-sm">The requested engineering practice does not exist or has been relocated.</p>
          <Link href="/services" className="inline-block px-5 py-2.5 bg-white text-black font-semibold rounded-lg text-xs">
            Return to Services Directory
          </Link>
        </div>
        <LivRiseFooter />
      </div>
    );
  }

  const relatedProjects = projects.filter((p) =>
    p.servicesRendered.some((s) => s.toLowerCase().includes(service.title.toLowerCase().split(' ')[0]))
  );

  return (
    <div className="min-h-screen flex flex-col bg-black text-white selection:bg-white selection:text-black">
      <LivRiseNavbar />

      <main className="flex-1 pt-32 pb-24">
        {/* ===================================================================
            HERO SECTION
            =================================================================== */}
        <section className="relative py-20 px-6 md:px-12 lg:px-16 border-b border-white/10 bg-black">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
              <Link href="/services" className="hover:text-white transition-colors">
                Services
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
              <span className="text-white">{service.title}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-5">
                <span className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-medium block">
                  {service.category} Discipline
                </span>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white leading-tight">
                  {service.title}
                </h1>
                <p className="text-lg text-zinc-300 font-light leading-relaxed">
                  {service.headline}
                </p>
                <div className="pt-2 flex flex-wrap gap-4">
                  <Link
                    href="/start-project"
                    className="bg-white text-black px-7 py-3 rounded-lg text-sm font-semibold hover:bg-zinc-100 transition-colors flex items-center gap-2"
                  >
                    <span>Enquire About {service.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <a
                    href="#capabilities"
                    className="liquid-glass border border-white/15 px-6 py-3 rounded-lg text-sm font-medium text-white hover:bg-white/10 transition-colors"
                  >
                    View Scope
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden border border-white/15 liquid-glass">
                  <Image
                    src={service.coverImage}
                    alt={service.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            OVERVIEW
            =================================================================== */}
        <section className="py-20 px-6 md:px-12 lg:px-16 border-b border-white/10 bg-black/95">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4 space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-medium block">
                Technical Overview
              </span>
              <h2 className="text-2xl sm:text-3xl font-normal text-white tracking-tight">
                Discipline Summary
              </h2>
            </div>
            <div className="lg:col-span-8 text-zinc-300 font-light text-base sm:text-lg leading-relaxed space-y-4">
              <p>{service.description}</p>
            </div>
          </div>
        </section>

        {/* ===================================================================
            CAPABILITIES
            =================================================================== */}
        <section id="capabilities" className="py-20 px-6 md:px-12 lg:px-16 border-b border-white/10 bg-black">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-medium block">
                Practice Scope
              </span>
              <h2 className="text-2xl sm:text-3xl font-normal text-white tracking-tight">
                Core Capabilities & Engineering Modules
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.capabilities.map((cap) => (
                <div
                  key={cap}
                  className="liquid-glass border border-white/10 rounded-2xl p-6 flex items-start gap-4"
                >
                  <CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" />
                  <span className="text-sm text-zinc-200 font-light leading-relaxed">{cap}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================================
            PROCESS
            =================================================================== */}
        <section className="py-20 px-6 md:px-12 lg:px-16 border-b border-white/10 bg-black/95">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-medium block">
                Methodology
              </span>
              <h2 className="text-2xl sm:text-3xl font-normal text-white tracking-tight">
                Execution Workflow
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.processSteps.map((step) => (
                <div
                  key={step.step}
                  className="liquid-glass border border-white/10 rounded-2xl p-7 space-y-4"
                >
                  <span className="text-2xl font-mono text-zinc-500 block">
                    0{step.step}
                  </span>
                  <h3 className="text-base font-medium text-white">{step.title}</h3>
                  <p className="text-xs text-zinc-400 font-light leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================================
            DELIVERABLES & SECTORS
            =================================================================== */}
        <section className="py-20 px-6 md:px-12 lg:px-16 border-b border-white/10 bg-black">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Deliverables */}
            <div className="liquid-glass border border-white/10 rounded-2xl p-8 space-y-6">
              <h3 className="text-xl font-medium text-white tracking-tight">
                Contractual Deliverables
              </h3>
              <div className="space-y-3">
                {service.deliverables.map((deliv) => (
                  <div key={deliv} className="flex items-start gap-3 text-sm text-zinc-300 font-light">
                    <FileCheck2 className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                    <span>{deliv}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Relevant Sectors */}
            <div className="liquid-glass border border-white/10 rounded-2xl p-8 space-y-6">
              <h3 className="text-xl font-medium text-white tracking-tight">
                Relevant Asset Classes
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {service.targetIndustries.map((ind) => (
                  <span
                    key={ind}
                    className="px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-zinc-300 font-light"
                  >
                    {ind}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            FAQ
            =================================================================== */}
        {service.faqs && service.faqs.length > 0 && (
          <section className="py-20 px-6 md:px-12 lg:px-16 border-b border-white/10 bg-black/95">
            <div className="max-w-4xl mx-auto space-y-10">
              <div className="space-y-3 text-center">
                <span className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-medium block">
                  Frequently Answered
                </span>
                <h2 className="text-2xl sm:text-3xl font-normal text-white tracking-tight">
                  Technical Clarifications
                </h2>
              </div>

              <div className="space-y-4">
                {service.faqs.map((faq, idx) => (
                  <div key={idx} className="liquid-glass border border-white/10 rounded-xl p-6 space-y-2">
                    <h4 className="text-sm sm:text-base font-medium text-white">{faq.q}</h4>
                    <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ===================================================================
            CTA SECTION
            =================================================================== */}
        <section className="py-24 px-6 md:px-12 lg:px-16 text-center bg-black">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl font-normal text-white tracking-tight">
              Ready to scope your {service.title.toLowerCase()} requirements?
            </h2>
            <p className="text-sm text-zinc-400 font-light max-w-xl mx-auto leading-relaxed">
              Submit your project brief to receive a structured technical breakdown, schedule, and fee proposal from our engineering desk.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/start-project"
                className="bg-white text-black px-8 py-3 rounded-lg text-sm font-semibold hover:bg-zinc-100 transition-colors"
              >
                Start a Project
              </Link>
              <Link
                href="/contact"
                className="liquid-glass border border-white/15 text-white px-8 py-3 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <LivRiseFooter />
    </div>
  );
}
