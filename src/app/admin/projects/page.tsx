'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLivRiseStore } from '@/lib/store';
import {
  FolderKanban,
  Search,
  Building,
  MapPin,
  Clock,
  CheckCircle2,
  Calendar,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

export default function AdminProjectsPage() {
  const { projects, clients } = useLivRiseStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.projectCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'ALL' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white font-mono flex items-center gap-2">
            <FolderKanban className="w-6 h-6 text-sky-400" />
            ENGINEERING PROJECT OPERATIONS
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Active project controls, structural deliverables, client milestones and execution telemetry.
          </p>
        </div>

        <Link
          href="/admin/leads"
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-sky-400 text-slate-950 hover:bg-sky-300 transition-colors"
        >
          <span>Initiate from Lead Pipeline</span>
        </Link>
      </div>

      {/* Search & Category Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
          <input
            type="text"
            placeholder="Search projects by code (INF-PRJ-...), title, location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0c1222] border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-sky-400/50"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3.5 py-2.5 rounded-xl bg-[#0c1222] border border-white/10 text-white text-xs font-mono focus:outline-none"
        >
          <option value="ALL">All Categories</option>
          <option value="Residential">Residential</option>
          <option value="Commercial">Commercial</option>
          <option value="Infrastructure">Infrastructure</option>
          <option value="Industrial">Industrial</option>
          <option value="Government">Government</option>
        </select>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProjects.map((project) => {
          const client = clients.find((c) => c.id === project.clientId);

          return (
            <div
              key={project.id}
              className="p-5 rounded-2xl bg-[#0c1222] border border-white/5 hover:border-sky-400/30 transition-all space-y-4 shadow-lg group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 font-bold">
                    {project.projectCode}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      project.status === 'In Progress'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Client: {client?.companyName || 'Corporate Client'}
                  </p>
                </div>

                <div className="text-[11px] text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>{project.location}</span> • <span>{project.builtUpArea}</span>
                </div>

                {/* Progress bar */}
                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-slate-400">Execution Progress</span>
                    <span className="text-sky-400 font-bold">{project.progress || project.progressPercentage}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-sky-400 rounded-full transition-all duration-500"
                      style={{ width: `${project.progress || project.progressPercentage}%` }}
                    />
                  </div>
                </div>

                {/* Scope badges */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {(project.services || project.servicesRendered || []).slice(0, 3).map((srv: string) => (
                    <span
                      key={srv}
                      className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-slate-300"
                    >
                      {srv}
                    </span>
                  ))}
                  {(project.services || project.servicesRendered || []).length > 3 && (
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-slate-500">
                      +{(project.services || project.servicesRendered || []).length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Footer */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-500">
                  Target: {project.targetCompletion || project.estimatedCompletion}
                </span>
                <Link
                  href={`/admin/projects/${project.id}`}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-sky-400/10 text-sky-300 hover:bg-sky-400 hover:text-slate-950 transition-all font-mono"
                >
                  <span>Control Center</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
