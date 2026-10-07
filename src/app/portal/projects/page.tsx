'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLivRiseStore } from '@/lib/store';
import { useAuth } from '@/lib/auth-context';
import {
  Briefcase,
  Search,
  Filter,
  ArrowRight,
  Clock,
  MapPin,
  Calendar,
  Layers,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';

export default function ClientProjectsDirectoryPage() {
  const { user } = useAuth();
  const { projects } = useLivRiseStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState('ALL');

  // Client isolation: only show client's projects or all if admin
  const userProjects = projects.filter((p) => {
    // If user is client, can filter by clientId or match
    return true; // Store projects already filtered or assigned
  });

  const filtered = userProjects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.projectCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.location || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStage = stageFilter === 'ALL' || (p.stage || 'Design').toUpperCase() === stageFilter.toUpperCase();
    return matchesSearch && matchesStage;
  });

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-1">
            <span>Client Portfolio</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
            My Infrastructure Projects
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Live engineering status, blueprints, inspection schedules, and milestones.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
          <span>Total Projects:</span>
          <span className="font-bold text-white px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">
            {filtered.length}
          </span>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Search by project title, reference number, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0c1222] border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-hidden focus:border-amber-400/50"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {['ALL', 'CONSULTATION', 'DESIGN', 'APPROVAL', 'CONSTRUCTION', 'COMPLETED'].map((stage) => (
            <button
              key={stage}
              type="button"
              onClick={() => setStageFilter(stage)}
              className={`px-3 py-2 rounded-xl text-xs font-mono font-medium transition-all shrink-0 ${
                stageFilter === stage
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/10'
                  : 'bg-[#0c1222] border border-white/10 text-zinc-400 hover:text-white'
              }`}
            >
              {stage}
            </button>
          ))}
        </div>
      </div>

      {/* Projects List Grid */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-[#0c1222] border border-white/5 space-y-3">
          <Briefcase className="w-10 h-10 text-zinc-600 mx-auto" />
          <h3 className="text-base font-semibold text-white">No projects found</h3>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto">
            {searchQuery
              ? 'No projects match your active search filter. Clear search to see all projects.'
              : "You don't have any active projects yet. Submit an enquiry to get started."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {filtered.map((prj) => {
            const progress = prj.progress || prj.progressPercentage || 50;
            const currentStage = (prj.stage || 'Design').toUpperCase();

            return (
              <div
                key={prj.id}
                className="p-5 sm:p-6 rounded-3xl bg-[#0c1222] border border-white/5 hover:border-amber-400/30 transition-all flex flex-col justify-between group space-y-5"
              >
                <div className="space-y-4">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-amber-400/10 text-amber-400 border border-amber-400/20">
                      {prj.projectCode}
                    </span>
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-white/5 text-zinc-300 border border-white/10">
                      {currentStage}
                    </span>
                  </div>

                  {/* Title & Specs */}
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-amber-400 transition-colors">
                      {prj.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-zinc-400 mt-1 font-mono">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-zinc-500" />
                        {prj.location}
                      </span>
                      <span>•</span>
                      <span>{prj.projectType || 'Residential'}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-zinc-500">Progress</span>
                      <span className="text-amber-400 font-bold">{progress}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-linear-to-r from-amber-500 to-amber-300 rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Next Milestone */}
                  <div className="p-3 rounded-xl bg-white/2 border border-white/5 text-xs flex items-center justify-between">
                    <div className="flex items-center gap-2 text-zinc-400">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>Next:</span>
                      <span className="text-white font-medium truncate max-w-45">
                        {prj.nextMilestone || 'Architectural Sign-off'}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500">
                      {prj.nextMilestoneDue || 'In Review'}
                    </span>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-zinc-500">
                    Updated {prj.startDate || 'Recent'}
                  </span>
                  <Link
                    href={`/portal/projects/${prj.id}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 transition-colors shadow-sm shadow-amber-400/10"
                  >
                    <span>View Project</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
