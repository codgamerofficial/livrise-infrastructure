'use client';

import React, { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LivRiseNavbar } from '@/components/layout/LivRiseNavbar';
import { LivRiseFooter } from '@/components/layout/LivRiseFooter';
import { useLivRiseStore } from '@/lib/store';
import {
  MapPin,
  Calendar,
  Building,
  CheckCircle2,
  Layers,
  ArrowRight,
  ChevronRight,
  FileCheck2,
  Compass,
} from 'lucide-react';

interface ProjectDetailProps {
  params: Promise<{ slug: string }>;
}

export default function ProjectDetailPage({ params }: ProjectDetailProps) {
  const resolvedParams = use(params);
  const { projects } = useLivRiseStore();

  const project = projects.find((p) => p.slug === resolvedParams.slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col justify-between">
        <LivRiseNavbar />
        <div className="max-w-md mx-auto text-center py-40 space-y-4 px-6">
          <h1 className="text-2xl font-normal">Project Case Study Not Found</h1>
          <p className="text-zinc-400 text-sm font-light">
            The project you are looking for has not yet been published or is under technical review.
          </p>
          <Link
            href="/projects"
            className="inline-block px-5 py-2.5 bg-white text-black font-semibold rounded-lg text-xs"
          >
            Return to Project Directory
          </Link>
        </div>
        <LivRiseFooter />
      </div>
    );
  }

  const related = projects.filter((p) => p.category === project.category && p.id !== project.id);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white selection:bg-white selection:text-black">
      <LivRiseNavbar />

      <main className="flex-1 pt-32 pb-24">
        {/* ===================================================================
            HERO IMAGE & PROJECT HEADER
            =================================================================== */}
        <section className="relative py-16 px-6 md:px-12 lg:px-16 border-b border-white/10 bg-black">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
              <Link href="/projects" className="hover:text-white transition-colors">
                Projects
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
              <span className="text-white">{project.title}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded bg-white/10 border border-white/15 text-white">
                    {project.category}
                  </span>
                  <span className="text-xs text-zinc-400 font-mono flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{project.location}</span>
                  </span>
                  <span className="text-xs text-zinc-400 font-mono flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{project.year}</span>
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white leading-tight">
                  {project.title}
                </h1>
              </div>

              <div className="lg:col-span-4 flex lg:justify-end">
                <Link
                  href="/start-project"
                  className="bg-white text-black px-6 py-3 rounded-lg text-xs font-semibold hover:bg-zinc-100 transition-colors flex items-center gap-2"
                >
                  <span>Commission Similar Scope</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative h-96 sm:h-120 lg:h-135 w-full rounded-2xl overflow-hidden border border-white/15">
              <Image
                src={project.coverImageUrl}
                alt={project.title}
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />
            </div>
          </div>
        </section>

        {/* ===================================================================
            OVERVIEW, CHALLENGE & APPROACH
            =================================================================== */}
        <section className="py-20 px-6 md:px-12 lg:px-16 border-b border-white/10 bg-black/95">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4 space-y-6">
              <div className="liquid-glass border border-white/10 rounded-2xl p-7 space-y-4">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                  Technical Specifications
                </h3>
                <div className="space-y-3 text-xs text-zinc-300 font-light">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-zinc-500">Built-Up Area:</span>
                    <span className="font-mono text-white">{project.builtUpArea}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-zinc-500">Building Type:</span>
                    <span className="text-white">{project.buildingType}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-zinc-500">Status:</span>
                    <span className="text-emerald-400 font-medium">{project.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Year of Commission:</span>
                    <span className="font-mono text-white">{project.year}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-10">
              <div className="space-y-3">
                <h2 className="text-2xl font-normal text-white tracking-tight">Overview</h2>
                <p className="text-zinc-300 font-light text-base leading-relaxed">
                  {project.summary}
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-normal text-white tracking-tight">The Engineering Challenge</h3>
                <p className="text-zinc-400 font-light text-sm sm:text-base leading-relaxed">
                  Balancing strict architectural proportions with heavy structural load transfers, seismic resilience, and precise constructability tolerances on site.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-normal text-white tracking-tight">Integrated Delivery Approach</h3>
                <p className="text-zinc-400 font-light text-sm sm:text-base leading-relaxed">
                  Through three-dimensional finite element modeling and coordinated multidisciplinary review, the engineering desk resolved all structural clash points prior to Good-for-Construction drawing issuance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            CTA
            =================================================================== */}
        <section className="py-24 px-6 md:px-12 lg:px-16 text-center bg-black">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl font-normal text-white tracking-tight">
              Planning a similar development?
            </h2>
            <p className="text-sm text-zinc-400 font-light max-w-xl mx-auto leading-relaxed">
              Submit your project brief to receive an initial engineering feasibility evaluation from our technical desk.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/start-project"
                className="bg-white text-black px-8 py-3 rounded-lg text-sm font-semibold hover:bg-zinc-100 transition-colors"
              >
                Start a Project
              </Link>
              <Link
                href="/projects"
                className="liquid-glass border border-white/15 text-white px-8 py-3 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors"
              >
                Back to Directory
              </Link>
            </div>
          </div>
        </section>
      </main>

      <LivRiseFooter />
    </div>
  );
}
