'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLivRiseStore } from '@/lib/store';
import {
  Users,
  FolderKanban,
  FileCheck,
  Receipt,
  TrendingUp,
  AlertCircle,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  Building,
  CheckCircle2,
  Calendar,
  Layers,
  ChevronRight,
  Plus,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const {
    leads,
    projects,
    clients,
    quotations,
    invoices,
    payments,
    milestones,
    updateLeadStatus,
  } = useLivRiseStore();

  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === 'New Leads').length;
  const activeProjects = projects.filter((p) => p.status === 'In Progress').length;
  const pendingQuotations = quotations.filter(
    (q) => q.status === 'Draft' || q.status === 'Sent' || q.status === 'Revision Requested'
  ).length;

  const totalBilled = invoices.reduce((acc, curr) => acc + (curr.total || curr.totalAmount || 0), 0);
  const totalReceived = payments
    .filter((p) => p.status === 'Successful')
    .reduce((acc, curr) => acc + curr.amount, 0);
  const outstandingAmount = totalBilled - totalReceived;

  // Upcoming Milestones
  const upcomingMilestones = milestones
    .filter((m) => m.status === 'In Progress' || m.status === 'Upcoming')
    .slice(0, 4);

  // Recent Leads
  const recentLeads = [...leads].reverse().slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-white font-mono">
              EXECUTIVE OPERATIONS OVERVIEW
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              LIVE SYSTEM
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Real-time pipeline, financial telemetry, active engineering deliverables and milestone health.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/leads"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-amber-400 text-slate-950 hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/20"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Manage Pipeline</span>
          </Link>
          <Link
            href="/admin/quotations"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>New Quotation</span>
          </Link>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total & New Leads */}
        <div className="p-5 rounded-2xl bg-[#0c1222] border border-white/5 relative overflow-hidden group hover:border-amber-400/30 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-3">
            <span>LEAD PIPELINE</span>
            <Users className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-bold text-white font-mono tracking-tight">
            {totalLeads}
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-amber-400 font-mono font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
              {newLeads} Action Required
            </span>
            <Link href="/admin/leads" className="text-slate-400 hover:text-white flex items-center">
              View <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Active Projects */}
        <div className="p-5 rounded-2xl bg-[#0c1222] border border-white/5 relative overflow-hidden group hover:border-sky-400/30 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-3">
            <span>ACTIVE PROJECTS</span>
            <FolderKanban className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-3xl font-bold text-white font-mono tracking-tight">
            {activeProjects}
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-slate-400 font-mono">
              {projects.length} Total Registered
            </span>
            <Link href="/admin/projects" className="text-slate-400 hover:text-white flex items-center">
              View <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Pending Quotations */}
        <div className="p-5 rounded-2xl bg-[#0c1222] border border-white/5 relative overflow-hidden group hover:border-purple-400/30 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-3">
            <span>PENDING QUOTATIONS</span>
            <FileCheck className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-bold text-white font-mono tracking-tight">
            {pendingQuotations}
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-purple-400 font-mono">
              {quotations.filter((q) => q.status === 'Accepted').length} Accepted
            </span>
            <Link href="/admin/quotations" className="text-slate-400 hover:text-white flex items-center">
              View <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Outstanding Receivables */}
        <div className="p-5 rounded-2xl bg-[#0c1222] border border-white/5 relative overflow-hidden group hover:border-emerald-400/30 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-3">
            <span>OUTSTANDING REVENUE</span>
            <Receipt className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-bold text-white font-mono tracking-tight">
            ₹{(outstandingAmount / 100000).toFixed(2)}L
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-emerald-400 font-mono">
              ₹{(totalReceived / 100000).toFixed(2)}L Received
            </span>
            <Link href="/admin/invoices" className="text-slate-400 hover:text-white flex items-center">
              Ledger <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Grid: Lead Funnel & Milestone Operations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CRM Pipeline Health & Funnel */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#0c1222] border border-white/5 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white font-mono flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-amber-400" />
                PIPELINE STAGES & FUNNEL TELEMETRY
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Conversion distribution from new enquiry to won contracts
              </p>
            </div>
            <Link
              href="/admin/leads"
              className="text-xs font-mono text-amber-400 hover:underline flex items-center gap-1"
            >
              Open Kanban <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Funnel Distribution Bars */}
          <div className="space-y-3">
            {[
              { label: 'New Leads', count: leads.filter((l) => l.status === 'New Leads').length, color: 'bg-amber-400' },
              { label: 'Contacted', count: leads.filter((l) => l.status === 'Contacted').length, color: 'bg-sky-400' },
              { label: 'Qualified', count: leads.filter((l) => l.status === 'Qualified').length, color: 'bg-indigo-400' },
              { label: 'Meeting Scheduled', count: leads.filter((l) => l.status === 'Meeting').length, color: 'bg-purple-400' },
              { label: 'Quotation Raised', count: leads.filter((l) => l.status === 'Quotation').length, color: 'bg-pink-400' },
              { label: 'Won / Converted', count: leads.filter((l) => l.status === 'Won').length, color: 'bg-emerald-400' },
            ].map((stage) => {
              const pct = totalLeads > 0 ? Math.round((stage.count / totalLeads) * 100) : 0;
              return (
                <div key={stage.label} className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300">{stage.label}</span>
                    <span className="text-slate-400 font-bold">
                      {stage.count} ({pct}%)
                    </span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${stage.color} rounded-full transition-all duration-500`}
                      style={{ width: `${Math.max(pct, stage.count > 0 ? 8 : 0)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Recent Inbound Enquiries Table */}
          <div className="pt-4 border-t border-white/5">
            <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
              Latest Inbound Project Enquiries
            </h3>
            <div className="space-y-2.5">
              {recentLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="p-3.5 rounded-xl bg-white/2 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/4 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{lead.name || lead.fullName}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        {lead.enquiryNumber}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-slate-400">
                        {lead.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">
                      {lead.projectType} • {lead.requirements.slice(0, 55)}...
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    {lead.status === 'New Leads' && (
                      <button
                        onClick={() => updateLeadStatus(lead.id, 'Contacted')}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-amber-400 text-slate-950 hover:bg-amber-300 transition-colors"
                      >
                        Mark Contacted
                      </button>
                    )}
                    <Link
                      href={`/admin/leads/${lead.id}`}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white/5 text-slate-300 hover:bg-white/10 transition-colors"
                    >
                      View Dossier
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Milestone Critical Path & Operations */}
        <div className="p-6 rounded-2xl bg-[#0c1222] border border-white/5 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white font-mono flex items-center gap-2">
              <Clock className="w-4 h-4 text-sky-400" />
              UPCOMING MILESTONES
            </h2>
            <Link
              href="/admin/projects"
              className="text-xs font-mono text-sky-400 hover:underline"
            >
              All Projects
            </Link>
          </div>

          <div className="space-y-3">
            {upcomingMilestones.map((m) => (
              <div
                key={m.id}
                className="p-3.5 rounded-xl bg-white/2 border border-white/5 space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-bold text-white">{m.name}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                      m.status === 'In Progress'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : 'bg-white/5 text-slate-400'
                    }`}
                  >
                    {m.status}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-1">{m.description}</p>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1 border-t border-white/5">
                  <span>Owner: {m.owner || m.ownerName}</span>
                  <span>Due: {m.dueDate}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick System Links */}
          <div className="pt-4 border-t border-white/5 space-y-2">
            <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
              Fast Administrative Routes
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <Link
                href="/admin/documents"
                className="p-2.5 rounded-xl bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 flex items-center justify-between transition-colors"
              >
                <span>Drawings Vault</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </Link>
              <Link
                href="/admin/cms"
                className="p-2.5 rounded-xl bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 flex items-center justify-between transition-colors"
              >
                <span>CMS Studio</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </Link>
              <Link
                href="/admin/invoices"
                className="p-2.5 rounded-xl bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 flex items-center justify-between transition-colors"
              >
                <span>Invoices</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </Link>
              <Link
                href="/admin/audit-logs"
                className="p-2.5 rounded-xl bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 flex items-center justify-between transition-colors"
              >
                <span>Audit Logs</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
