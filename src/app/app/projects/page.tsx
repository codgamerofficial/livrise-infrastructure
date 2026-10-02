'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLivRiseStore } from '@/lib/store';
import {
  Briefcase,
  Search,
  Filter,
  ArrowRight,
  Clock,
  CheckCircle2,
  Calendar,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { AppEmptyState } from '@/components/app/AppEmptyState';

export default function ClientProjectsPage() {
  const { projects } = useLivRiseStore();
  const [filter, setFilter] = useState<'All' | 'In Progress' | 'Completed' | 'Planning'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projects.filter((p) => {
    const matchesFilter =
      filter === 'All'
        ? true
        : filter === 'In Progress'
        ? p.status === 'In Progress' || p.status === 'Execution' || p.status === 'Structural' || p.status === 'Architecture'
        : filter === 'Completed'
        ? p.status === 'Completed'
        : p.status === 'Planning' || p.status === 'Concept' || p.status === 'Site Analysis';

    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-1">
            <span>Portfolio & Sites</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
            Active Projects
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Track structural phases, architectural drawings, and milestones in real-time.
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-amber-400/50"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {(['All', 'In Progress', 'Planning', 'Completed'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
              filter === tab
                ? 'bg-white text-black font-semibold shadow-md'
                : 'bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Projects List / Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {filteredProjects.map((project) => {
            const progress = project.progress || project.progressPercentage || 60;
            return (
              <div
                key={project.id}
                className="arch-card p-5 sm:p-6 rounded-3xl border border-white/10 bg-black/60 flex flex-col justify-between group hover:border-amber-500/30 transition-all"
              >
                <div>
                  {/* Category and Status */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-white/10 text-zinc-300 border border-white/10">
                      {project.category}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      {project.status}
                    </span>
                  </div>

                  {/* Title & Location */}
                  <h3 className="text-lg sm:text-xl font-normal text-white tracking-tight mb-1 group-hover:text-amber-200 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mb-4">
                    {project.location} • {project.builtUpArea || 'Site Development'}
                  </p>

                  {/* Progress Bar */}
                  <div className="space-y-1 mb-5">
                    <div className="flex justify-between text-[11px] font-mono text-zinc-400">
                      <span>Project Progress</span>
                      <span className="text-white font-semibold">{progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${progress}%` }}
                        className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full"
                      />
                    </div>
                  </div>

                  {/* Meta Details */}
                  <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-white/5 border border-white/5 text-[11px] mb-4">
                    <div>
                      <span className="text-zinc-500 block">Start Date</span>
                      <span className="text-zinc-200 font-medium">{project.startDate}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block">Target Completion</span>
                      <span className="text-zinc-200 font-medium">
                        {project.estimatedCompletion || project.targetCompletion || 'Q4 2026'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Action footer */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-zinc-500">
                    {project.projectCode}
                  </span>
                  <Link
                    href={`/app/projects/${project.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white hover:text-black text-white text-xs font-semibold transition-all"
                  >
                    <span>View Project</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <AppEmptyState
          icon={Briefcase}
          title="No projects match this filter"
          description="Try adjusting your search criteria or switch filter tabs to view other project scopes."
          actionLabel="Clear Filter"
          onAction={() => {
            setFilter('All');
            setSearchQuery('');
          }}
        />
      )}
    </div>
  );
}
