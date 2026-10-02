'use client';

import React from 'react';
import { useLivRiseStore } from '@/lib/store';
import {
  BarChart3,
  TrendingUp,
  Users,
  Eye,
  FileCheck,
  Building,
  MapPin,
  ArrowUpRight,
  PieChart,
} from 'lucide-react';

export default function AdminAnalyticsPage() {
  const { leads, projects, services, quotations, invoices } = useLivRiseStore();

  const totalLeads = leads.length;
  const wonLeads = leads.filter((l) => l.status === 'Won').length;
  const conversionRate = totalLeads > 0 ? Math.round((wonLeads / totalLeads) * 100) : 0;

  // Breakdown by project type
  const projectTypes = ['Residential', 'Commercial', 'Infrastructure', 'Industrial', 'Government'];
  const typeCounts = projectTypes.map((type) => ({
    type,
    count: leads.filter((l) => l.projectType === type).length,
  }));

  // Geographic distribution
  const locations = [
    { city: 'Metropolitan Tier-1 Cities', count: 42, pct: '38%' },
    { city: 'Tier-2 Growth Corridors', count: 31, pct: '28%' },
    { city: 'Industrial / Infrastructure Zones', count: 22, pct: '20%' },
    { city: 'Other Regions (Pan-India)', count: 15, pct: '14%' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-white/5">
        <h1 className="text-2xl font-bold tracking-tight text-white font-mono flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-indigo-400" />
          BUSINESS TELEMETRY & STRATEGIC ANALYTICS
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Engineering demand distribution, market geographic spread, and lead-to-won conversion performance.
        </p>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#0c1222] border border-white/5 space-y-2">
          <div className="text-xs font-mono text-slate-400 flex items-center justify-between">
            <span>CONVERSION RATE</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-bold font-mono text-white">{conversionRate}%</div>
          <p className="text-[11px] text-emerald-400 font-mono">
            {wonLeads} won of {totalLeads} total inquiries
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#0c1222] border border-white/5 space-y-2">
          <div className="text-xs font-mono text-slate-400 flex items-center justify-between">
            <span>ACTIVE CLIENT RATIO</span>
            <Users className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-bold font-mono text-white">94.2%</div>
          <p className="text-[11px] text-slate-400 font-mono">Repeat business index</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#0c1222] border border-white/5 space-y-2">
          <div className="text-xs font-mono text-slate-400 flex items-center justify-between">
            <span>AVG QUOTE CYCLE</span>
            <FileCheck className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-bold font-mono text-white">4.2 Days</div>
          <p className="text-[11px] text-purple-400 font-mono">Enquiry to formal BOQ</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#0c1222] border border-white/5 space-y-2">
          <div className="text-xs font-mono text-slate-400 flex items-center justify-between">
            <span>ENGINEERING SCOPE</span>
            <Building className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-xl font-bold font-mono text-white">Active Operations</div>
          <p className="text-[11px] text-sky-400 font-mono">Managed from LivRise Admin Console</p>
        </div>
      </div>

      {/* Grid: Service Demand & Geographic Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Engineering Sector Demand */}
        <div className="p-6 rounded-2xl bg-[#0c1222] border border-white/5 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
              <PieChart className="w-4 h-4 text-amber-400" />
              Sector Demand Distribution
            </h2>
            <span className="text-[10px] font-mono text-slate-400">All Pipeline Data</span>
          </div>

          <div className="space-y-3">
            {typeCounts.map((item) => {
              const pct = totalLeads > 0 ? Math.round((item.count / totalLeads) * 100) : 0;
              return (
                <div key={item.type} className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300">{item.type}</span>
                    <span className="text-amber-400 font-bold">
                      {item.count} projects ({pct}%)
                    </span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(pct, 10)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Geographic Presence */}
        <div className="p-6 rounded-2xl bg-[#0c1222] border border-white/5 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-sky-400" />
              Regional Project Concentration
            </h2>
            <span className="text-[10px] font-mono text-slate-400">Pan-India Distribution</span>
          </div>

          <div className="space-y-3">
            {locations.map((loc) => (
              <div
                key={loc.city}
                className="p-3.5 rounded-xl bg-white/2 border border-white/5 flex items-center justify-between"
              >
                <div>
                  <span className="text-xs font-bold text-white block">{loc.city}</span>
                  <span className="text-[11px] text-slate-500 font-mono">
                    {loc.count} Active & Completed Projects
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-sky-400 bg-sky-500/10 px-2 py-1 rounded border border-sky-500/20">
                  {loc.pct}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
