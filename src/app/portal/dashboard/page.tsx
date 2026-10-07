'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLivRiseStore } from '@/lib/store';
import { useAuth } from '@/lib/auth-context';
import {
  Briefcase,
  FileText,
  MessageSquare,
  CreditCard,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Calendar,
  Layers,
  FileCheck,
} from 'lucide-react';
import { getWhatsAppLink } from '@/lib/site-settings';

export default function ClientDashboardPage() {
  const { user } = useAuth();
  const {
    projects,
    milestones,
    documents,
    messages,
    quotations,
    invoices,
    updateDocumentStatus,
  } = useLivRiseStore();

  const [greeting, setGreeting] = useState('Welcome back');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 17) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  const clientName = user?.fullName || 'Valued Client';
  const clientFirstName = clientName.split(' ')[0] || 'Client';

  // Real client project (first active project or default)
  const activeProjects = projects.filter((p) => p.status !== 'Completed');
  const activeProject = activeProjects[0] || projects[0];

  // Real milestones for active project
  const projectMilestones = activeProject
    ? milestones.filter((m) => m.projectId === activeProject.id)
    : milestones;
  const currentMilestone =
    projectMilestones.find((m) => m.status === 'In Progress') ||
    projectMilestones.find((m) => m.status === 'Upcoming') || {
      name: 'Preliminary Architectural Drafting',
      title: 'Preliminary Architectural Drafting',
      dueDate: 'In Review',
      stage: 'Design',
    };

  // Pending Actions for the Client (approvals, reviews)
  const pendingDocs = documents.filter(
    (d) => d.status === 'Under Review' || d.status === 'Revision Requested' || (d.status as string) === 'Review'
  );
  const pendingQuotes = quotations.filter((q) => q.status === 'Sent' || q.status === 'Draft');
  const pendingActionsCount = pendingDocs.length + pendingQuotes.length;

  // Real financials
  const pendingInvoices = invoices.filter(
    (i) => i.status === 'Sent' || i.status === 'Partially Paid' || i.status === 'Overdue'
  );
  const totalOutstanding = pendingInvoices.reduce((acc, curr) => acc + (curr.balanceDue || curr.totalAmount || 0), 0);

  // Unread messages
  const unreadMessages = messages.filter((m) => !m.isRead);
  const recentDocs = documents.slice(0, 4);

  // Derive progress
  const progressPct = activeProject?.progress || activeProject?.progressPercentage || 45;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* 1. Header Greeting Section */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Digital Infrastructure Desk</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white tracking-tight">
            {greeting}, <span className="font-semibold text-white">{clientFirstName}</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Real-time project telemetry, engineering revisions, and milestone status.
          </p>
        </div>

        {/* Quick WhatsApp Support Desk */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <a
            href={getWhatsAppLink(`Hello LivRise Infrastructure, this is ${clientName}. I would like an update on my project.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-medium hover:bg-emerald-500/20 transition-all shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>WhatsApp Project Desk</span>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </a>
        </div>
      </section>

      {/* 2. Outstanding Payment Alert (If applicable) */}
      {pendingInvoices.length > 0 && (
        <aside
          aria-label="Pending Payment Notification"
          className="liquid-glass border border-amber-500/30 bg-amber-500/10 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg shadow-amber-500/5"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-semibold text-white">
                Pending Invoice: {pendingInvoices[0].invoiceNumber}
              </div>
              <div className="text-[11px] text-zinc-300">
                Amount: {pendingInvoices[0].currency} {pendingInvoices[0].balanceDue.toLocaleString()} • Due on {pendingInvoices[0].dueDate}
              </div>
            </div>
          </div>
          <Link
            href="/portal/payments"
            className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 text-xs font-bold hover:bg-amber-300 transition-colors shrink-0 shadow-sm"
          >
            Review Payment Instructions
          </Link>
        </aside>
      )}

      {/* 3. Primary KPI Metric Cards (Prompt Section 09) */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Card 1: ACTIVE PROJECTS */}
        <Link
          href="/portal/projects"
          className="p-4 sm:p-5 rounded-2xl bg-[#0c1222] border border-white/5 hover:border-amber-400/30 transition-all flex flex-col justify-between group"
        >
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider">Active Projects</span>
            <Briefcase className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono">
              {activeProjects.length}
            </div>
            <div className="text-[11px] text-zinc-400 mt-1 flex items-center gap-1">
              <span>{activeProject?.title || 'Residential Infrastructure'}</span>
            </div>
          </div>
        </Link>

        {/* Card 2: NEXT MILESTONE */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#0c1222] border border-white/5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider">Next Milestone</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <div className="text-sm sm:text-base font-semibold text-white truncate">
              {currentMilestone.title || currentMilestone.name}
            </div>
            <div className="text-[11px] text-amber-400/90 mt-1 flex items-center gap-1 font-mono">
              <Calendar className="w-3 h-3" />
              <span>Target: {currentMilestone.dueDate}</span>
            </div>
          </div>
        </div>

        {/* Card 3: PENDING ACTIONS */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#0c1222] border border-white/5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider">Pending Actions</span>
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono">
              {pendingActionsCount}
            </div>
            <div className="text-[11px] text-zinc-400 mt-1">
              {pendingActionsCount > 0 ? 'Document & quote sign-offs ready' : 'All approvals up to date'}
            </div>
          </div>
        </div>

        {/* Card 4: OUTSTANDING AMOUNT */}
        <Link
          href="/portal/payments"
          className="p-4 sm:p-5 rounded-2xl bg-[#0c1222] border border-white/5 hover:border-amber-400/30 transition-all flex flex-col justify-between group"
        >
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider">Outstanding Amount</span>
            <CreditCard className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono">
              ₹{totalOutstanding.toLocaleString()}
            </div>
            <div className="text-[11px] text-zinc-400 mt-1">
              {pendingInvoices.length} pending invoice{pendingInvoices.length === 1 ? '' : 's'}
            </div>
          </div>
        </Link>
      </section>

      {/* 4. Active Project Telemetry & Milestone Progress */}
      {activeProject && (
        <section className="p-5 sm:p-6 rounded-3xl bg-[#0c1222] border border-white/5 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-400/10 text-amber-400 border border-amber-400/20">
                  {activeProject.projectCode}
                </span>
                <span className="text-xs text-zinc-400 font-mono">
                  {activeProject.projectType || activeProject.category || 'Infrastructure'}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mt-1">
                {activeProject.title}
              </h2>
            </div>

            <Link
              href={`/portal/projects/${activeProject.id}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-white hover:bg-white/10 transition-colors self-start sm:self-auto"
            >
              <span>Full Project Details</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Progress Bar & Lifecycle Stage */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-400">Execution Progress</span>
              <span className="text-amber-400 font-bold">{progressPct}%</span>
            </div>
            <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-linear-to-r from-amber-500 to-amber-300 rounded-full transition-all duration-500 shadow-sm shadow-amber-500/50"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          {/* Canonical Project Stages (Section 11) */}
          <div className="grid grid-cols-5 gap-2 pt-2 border-t border-white/5 text-center">
            {['CONSULTATION', 'DESIGN', 'APPROVAL', 'CONSTRUCTION', 'COMPLETED'].map((st, idx) => {
              const currentStageName = (activeProject.stage || 'Design').toUpperCase();
              const stages = ['CONSULTATION', 'DESIGN', 'APPROVAL', 'CONSTRUCTION', 'COMPLETED'];
              const currentIdx = stages.indexOf(currentStageName);
              const isPast = idx < currentIdx;
              const isCurrent = idx === currentIdx;

              return (
                <div key={st} className="space-y-1">
                  <div
                    className={`h-1.5 rounded-full ${
                      isPast
                        ? 'bg-emerald-400'
                        : isCurrent
                        ? 'bg-amber-400 animate-pulse'
                        : 'bg-white/10'
                    }`}
                  />
                  <span
                    className={`text-[9px] sm:text-[10px] font-mono block truncate ${
                      isCurrent
                        ? 'text-amber-400 font-bold'
                        : isPast
                        ? 'text-emerald-400'
                        : 'text-zinc-500'
                    }`}
                  >
                    {st}
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 5. Two-Column Operations Grid: Recent Milestones & Unread Messages */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Upcoming Milestones */}
        <div className="p-5 sm:p-6 rounded-3xl bg-[#0c1222] border border-white/5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-semibold text-white font-mono uppercase tracking-wider">
                Upcoming Milestones
              </h3>
            </div>
            <Link
              href={`/portal/projects/${activeProject?.id || 'prj-1'}?tab=timeline`}
              className="text-xs text-amber-400 hover:underline font-mono"
            >
              View Timeline
            </Link>
          </div>

          <div className="space-y-3">
            {projectMilestones.slice(0, 4).map((ms) => (
              <div
                key={ms.id}
                className="p-3 rounded-2xl bg-white/2 border border-white/5 flex items-start justify-between gap-3"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${
                        ms.status === 'Completed'
                          ? 'bg-emerald-400'
                          : ms.status === 'In Progress'
                          ? 'bg-amber-400'
                          : 'bg-zinc-600'
                      }`}
                    />
                    <h4 className="text-xs font-medium text-white truncate">{ms.title || ms.name}</h4>
                  </div>
                  <p className="text-[11px] text-zinc-400 line-clamp-1 pl-4">
                    {ms.description || 'Deliverable checkpoint.'}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                      ms.status === 'Completed'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : ms.status === 'In Progress'
                        ? 'bg-amber-500/10 text-amber-400'
                        : 'bg-white/5 text-zinc-400'
                    }`}
                  >
                    {ms.status}
                  </span>
                  <div className="text-[10px] font-mono text-zinc-500 mt-1">Due {ms.dueDate}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Messages & Communication */}
        <div className="p-5 sm:p-6 rounded-3xl bg-[#0c1222] border border-white/5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-semibold text-white font-mono uppercase tracking-wider">
                Engineering Desk Messages
              </h3>
            </div>
            <Link href="/portal/messages" className="text-xs text-amber-400 hover:underline font-mono">
              Open Chat Hub
            </Link>
          </div>

          <div className="space-y-3">
            {messages.slice(0, 3).map((msg) => (
              <div
                key={msg.id}
                className="p-3.5 rounded-2xl bg-white/2 border border-white/5 space-y-1.5"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white">{msg.senderName}</span>
                  <span className="text-[10px] font-mono text-zinc-500">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">{msg.messageText}</p>
              </div>
            ))}

            <Link
              href="/portal/messages"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-white hover:bg-white/10 transition-colors mt-2"
            >
              <span>Reply to LivRise Project Team</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Recent Documents & Vault Checkpoint */}
      <section className="p-5 sm:p-6 rounded-3xl bg-[#0c1222] border border-white/5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-semibold text-white font-mono uppercase tracking-wider">
              Recent Engineering Documents & Blueprints
            </h3>
          </div>
          <Link href="/portal/documents" className="text-xs text-amber-400 hover:underline font-mono">
            Document Vault
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {recentDocs.map((doc) => (
            <div
              key={doc.id}
              className="p-4 rounded-2xl bg-white/2 border border-white/5 hover:border-amber-400/20 transition-all space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-amber-400 px-2 py-0.5 rounded-md bg-amber-400/10">
                    {doc.folder || 'Drawings'}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">
                    {doc.currentVersion || 'REV01'}
                  </span>
                </div>
                <h4 className="text-xs font-medium text-white truncate" title={doc.name}>
                  {doc.name}
                </h4>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px]">
                <span className="text-zinc-500 font-mono">
                  {Math.round((doc.fileSizeBytes || 2400000) / 1024 / 1024)} MB
                </span>
                <Link
                  href="/portal/documents"
                  className="text-amber-400 font-semibold hover:underline"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
