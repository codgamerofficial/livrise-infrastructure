'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLivRiseStore } from '@/lib/store';
import {
  Briefcase,
  FileText,
  MessageSquare,
  CreditCard,
  Phone,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { getWhatsAppLink } from '@/lib/site-settings';

export default function ClientHomePage() {
  const { currentUser, projects, documents, messages, invoices, siteSettings } = useLivRiseStore();

  const [greeting, setGreeting] = useState('Welcome back');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 17) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  // Find user's active project (or first project in store)
  const activeProject = projects.find((p) => p.status !== 'Completed') || projects[0];
  const pendingInvoices = invoices.filter((i) => i.status === 'Sent' || i.status === 'Partially Paid' || i.status === 'Overdue');
  const unreadMessages = messages.filter((m) => !m.isRead);
  const recentDocs = documents.slice(0, 3);

  // Derive progress
  const progressPct = activeProject?.progress || activeProject?.progressPercentage || 68;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* 1. Header Greeting Section */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Digital Infrastructure Desk</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white tracking-tight">
            {greeting}, <span className="font-normal text-white">{currentUser.name.split(' ')[0] || 'Client'}</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Real-time project telemetry, engineering revisions, and milestone status.
          </p>
        </div>

        {/* Quick status pill */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <a
            href={getWhatsAppLink(`Hello LivRise, this is ${currentUser.name}. I have a query about my project.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-medium hover:bg-emerald-500/20 transition-all"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>WhatsApp Project Desk</span>
          </a>
        </div>
      </section>

      {/* 2. Outstanding Payment Alert (If applicable) */}
      {pendingInvoices.length > 0 && (
        <aside
          aria-label="Pending Payment Notification"
          className="liquid-glass border border-amber-500/30 bg-amber-500/10 p-4 rounded-2xl flex items-center justify-between gap-4 shadow-lg shadow-amber-500/5"
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
            href="/app/payments"
            className="px-3.5 py-1.5 rounded-lg bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-colors shrink-0 shadow-sm"
          >
            View Invoice
          </Link>
        </aside>
      )}

      {/* 3. ACTIVE PROJECT APP CARD (Mobile-first hero) */}
      {activeProject ? (
        <section aria-label="Active Project">
          <div className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2.5 flex items-center justify-between">
            <span>Active Project</span>
            <Link
              href="/app/projects"
              className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="arch-card p-5 sm:p-7 rounded-3xl border border-white/15 bg-gradient-to-b from-white/[0.07] to-transparent relative overflow-hidden group">
            {/* Background architectural glow */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative z-10 flex flex-col gap-5">
              {/* Project title and badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-white/10 text-zinc-300 border border-white/10">
                    {activeProject.category}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-normal text-white mt-1.5 tracking-tight">
                    {activeProject.title}
                  </h2>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    {activeProject.location} • Scope: {activeProject.servicesRendered?.join(', ') || 'Architecture & Engineering'}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/15 text-amber-300 border border-amber-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                    {activeProject.status}
                  </span>
                  <span className="text-sm font-bold text-white font-mono">
                    {progressPct}%
                  </span>
                </div>
              </div>

              {/* Visual Progress Bar */}
              <div className="space-y-1.5">
                <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden p-0.5">
                  <div
                    style={{ width: `${progressPct}%` }}
                    className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-white rounded-full transition-all duration-500"
                  />
                </div>
                <div className="flex justify-between text-[11px] text-zinc-400 font-mono">
                  <span>Planning</span>
                  <span>Design</span>
                  <span>Execution</span>
                  <span>Completion</span>
                </div>
              </div>

              {/* Next Milestone & Target Date Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                      Next Milestone
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-white block mt-0.5">
                      {activeProject.nextMilestone || 'Structural Review & Statutory Vetting'}
                    </span>
                    <span className="text-[10px] text-zinc-400">
                      Due: {activeProject.nextMilestoneDue || activeProject.targetCompletion || 'Q3 2026'}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                      Assigned Lead
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-white block mt-0.5">
                      LivRise Engineering Lead
                    </span>
                    <span className="text-[10px] text-zinc-400">
                      Target Completion: {activeProject.estimatedCompletion || activeProject.targetCompletion || 'Dec 2026'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action row */}
              <div className="flex items-center justify-between pt-1 border-t border-white/10">
                <Link
                  href={`/app/projects/${activeProject.id}`}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-white hover:text-amber-300 transition-colors"
                >
                  <span>Open Interactive Timeline & Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <span className="text-[10px] font-mono text-zinc-500">
                  {activeProject.projectCode}
                </span>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section aria-label="Active Project">
          <div className="liquid-glass p-8 rounded-3xl border border-white/10 text-center">
            <Briefcase className="w-10 h-10 text-zinc-500 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-white">No projects published yet</h3>
            <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">
              Your assigned infrastructure schemes and architecture files will appear here once commissioned.
            </p>
          </div>
        </section>
      )}

      {/* 4. QUICK ACTIONS GRID */}
      <section aria-label="Quick Actions">
        <div className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2.5">
          Quick Actions
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <Link
            href="/app/documents"
            className="p-4 rounded-2xl liquid-glass border border-white/10 hover:border-amber-500/30 hover:bg-white/10 transition-all flex flex-col items-center text-center group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-2 group-hover:scale-105 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-white">Documents</span>
            <span className="text-[10px] text-zinc-400 mt-0.5">Drawings & Plans</span>
          </Link>

          <Link
            href="/app/messages"
            className="p-4 rounded-2xl liquid-glass border border-white/10 hover:border-amber-500/30 hover:bg-white/10 transition-all flex flex-col items-center text-center group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-2 group-hover:scale-105 transition-transform relative">
              <MessageSquare className="w-5 h-5" />
              {unreadMessages.length > 0 && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400" />
              )}
            </div>
            <span className="text-xs font-semibold text-white">Message Team</span>
            <span className="text-[10px] text-zinc-400 mt-0.5">Direct Channel</span>
          </Link>

          <Link
            href="/app/payments"
            className="p-4 rounded-2xl liquid-glass border border-white/10 hover:border-amber-500/30 hover:bg-white/10 transition-all flex flex-col items-center text-center group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-2 group-hover:scale-105 transition-transform">
              <CreditCard className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-white">View Invoices</span>
            <span className="text-[10px] text-zinc-400 mt-0.5">Billing & Receipts</span>
          </Link>

          <Link
            href="/app/projects"
            className="p-4 rounded-2xl liquid-glass border border-white/10 hover:border-amber-500/30 hover:bg-white/10 transition-all flex flex-col items-center text-center group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-2 group-hover:scale-105 transition-transform">
              <Briefcase className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-white">All Projects</span>
            <span className="text-[10px] text-zinc-400 mt-0.5">Timeline Status</span>
          </Link>
        </div>
      </section>

      {/* 5. RECENT DOCUMENTS & TELEMETRY */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6" aria-label="Recent Documents & Communication">
        {/* Recent Documents */}
        <div className="liquid-glass p-5 sm:p-6 rounded-3xl border border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-400" />
                <h3 className="text-sm font-semibold text-white">Recent Documents</h3>
              </div>
              <Link
                href="/app/documents"
                className="text-xs text-zinc-400 hover:text-white transition-colors"
              >
                Vault
              </Link>
            </div>

            <div className="space-y-2.5">
              {recentDocs.length > 0 ? (
                recentDocs.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-white/15 transition-all text-xs"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-300 flex items-center justify-center shrink-0 uppercase font-mono text-[10px]">
                        {doc.fileExtension || 'PDF'}
                      </div>
                      <div className="min-w-0">
                        <div className="text-white font-medium truncate">
                          {doc.name || doc.title}
                        </div>
                        <div className="text-[10px] text-zinc-400 font-mono">
                          {doc.folder} • {doc.currentVersion}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono shrink-0">
                      {doc.status}
                    </span>
                  </div>
                ))
              ) : (
                <div className="py-6 text-center text-xs text-zinc-500">
                  No documents published yet.
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 mt-2 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400">
            <span>Secure Storage</span>
            <Link href="/app/documents" className="text-amber-400 hover:underline">
              Access Full Archive →
            </Link>
          </div>
        </div>

        {/* Real-time Project Communication Widget */}
        <div className="liquid-glass p-5 sm:p-6 rounded-3xl border border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-purple-400" />
                <h3 className="text-sm font-semibold text-white">Project Conversation</h3>
              </div>
              <Link
                href="/app/messages"
                className="text-xs text-zinc-400 hover:text-white transition-colors"
              >
                Open Chat
              </Link>
            </div>

            <div className="space-y-3">
              {messages.slice(-2).map((m) => (
                <div
                  key={m.id}
                  className="p-3 rounded-2xl bg-white/5 border border-white/5 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white">{m.senderName}</span>
                    <span className="text-[10px] font-mono text-zinc-500">
                      {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-zinc-300 line-clamp-2">
                    {m.messageText}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-2 border-t border-white/10 flex items-center justify-between">
            <Link
              href="/app/messages"
              className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-medium text-center transition-all"
            >
              Reply to Engineering Team
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Official Contact Support Bar */}
      <section className="p-4 sm:p-5 rounded-2xl liquid-glass border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-zinc-400">
        <div>
          <span className="font-semibold text-white">Need immediate assistance with drawings or site questions?</span>
          <p className="text-[11px] text-zinc-400 mt-0.5">
            Your dedicated project manager is reachable on WhatsApp and direct line.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href={siteSettings?.whatsappUrl || 'https://wa.me/916296603868'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 hover:bg-emerald-500/20 font-medium"
          >
            <span>WhatsApp</span>
          </a>
          <a
            href="tel:+916296603868"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20 font-medium"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call Desk</span>
          </a>
        </div>
      </section>
    </div>
  );
}
