'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLivRiseStore } from '@/lib/store';
import {
  ArrowLeft,
  Briefcase,
  Layers,
  Clock,
  CheckCircle2,
  Calendar,
  FileText,
  MessageSquare,
  CreditCard,
  Send,
  Download,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { getWhatsAppLink } from '@/lib/site-settings';
import { AppEmptyState } from '@/components/app/AppEmptyState';

export default function ClientProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params?.id as string;

  const {
    projects,
    milestones,
    documents,
    messages,
    invoices,
    sendMessage,
    currentUser,
  } = useLivRiseStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'documents' | 'messages' | 'payments'>('overview');
  const [newMsg, setNewMsg] = useState('');

  // Find project
  const project = projects.find((p) => p.id === projectId) || projects[0];

  if (!project) {
    return (
      <div className="p-8">
        <AppEmptyState
          icon={Briefcase}
          title="Project not found"
          description="The requested project could not be found or you do not have permission to view it."
          actionLabel="Back to Projects"
          actionHref="/app/projects"
        />
      </div>
    );
  }

  // Filter project-specific data
  const projectMilestones = milestones.filter((m) => m.projectId === project.id);
  const projectDocuments = documents.filter((d) => d.projectId === project.id);
  const projectMessages = messages.filter((m) => m.projectId === project.id);
  const projectInvoices = invoices.filter((i) => i.projectId === project.id);

  const progress = project.progress || project.progressPercentage || 68;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsg.trim()) return;
    sendMessage(project.id, newMsg);
    setNewMsg('');
  };

  // Standard engineering lifecycle stages
  const defaultStages = [
    { name: 'Planning & Site Analysis', status: 'completed' },
    { name: 'Concept & Massing', status: 'completed' },
    { name: 'Structural & Architectural Design', status: 'completed' },
    { name: 'Statutory & Client Approval', status: 'current' },
    { name: 'Site Execution & Foundation', status: 'upcoming' },
    { name: 'Final Inspection & Commissioning', status: 'upcoming' },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-5 animate-in fade-in duration-300">
      {/* 1. App-style Navigation Back Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <button
          type="button"
          onClick={() => router.push('/app/projects')}
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Projects Directory</span>
        </button>

        <span className="text-[10px] font-mono text-zinc-500 uppercase">
          ID: {project.projectCode}
        </span>
      </div>

      {/* 2. Hero Project Title & Status Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-white/10 text-zinc-300">
              {project.category}
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              {project.status}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
            {project.title}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
            {project.location} • {project.builtUpArea || 'Site Delivery'}
          </p>
        </div>

        {/* Progress gauge */}
        <div className="flex items-center gap-4 self-start md:self-auto p-3 rounded-2xl bg-white/5 border border-white/10">
          <div className="text-right">
            <span className="text-[10px] font-mono text-zinc-400 uppercase block">
              Cumulative Progress
            </span>
            <span className="text-lg font-bold text-white font-mono">
              {progress}%
            </span>
          </div>
          <div className="w-12 h-12 rounded-full border-2 border-white/10 flex items-center justify-center relative">
            <span className="text-xs font-mono font-bold text-amber-400">{progress}%</span>
            <div
              className="absolute inset-0 rounded-full border-2 border-amber-400 border-t-transparent animate-[spin_6s_linear_infinite]"
              style={{ opacity: 0.7 }}
            />
          </div>
        </div>
      </div>

      {/* 3. Swipeable / Clickable Tabs */}
      <div className="flex items-center gap-1.5 border-b border-white/10 overflow-x-auto no-scrollbar pt-2">
        {[
          { key: 'overview', label: 'Overview', icon: Briefcase },
          { key: 'timeline', label: 'Timeline', icon: Clock },
          { key: 'documents', label: `Documents (${projectDocuments.length})`, icon: FileText },
          { key: 'messages', label: `Messages (${projectMessages.length})`, icon: MessageSquare },
          { key: 'payments', label: `Payments (${projectInvoices.length})`, icon: CreditCard },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium border-b-2 transition-all whitespace-nowrap ${
                isActive
                  ? 'border-amber-400 text-white font-semibold'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-zinc-500'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 4. Tab Contents */}
      {/* TAB: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Milestone highlight cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl liquid-glass border border-white/10">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                Next Stage Due
              </span>
              <span className="text-sm font-semibold text-white block mt-1">
                {project.nextMilestone || 'Statutory Approval'}
              </span>
              <span className="text-[11px] text-zinc-400 mt-1 block">
                Target: {project.nextMilestoneDue || project.targetCompletion || 'Q3 2026'}
              </span>
            </div>

            <div className="p-4 rounded-2xl liquid-glass border border-white/10">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                Lead Engineer
              </span>
              <span className="text-sm font-semibold text-white block mt-1">
                LivRise Executive Desk
              </span>
              <span className="text-[11px] text-zinc-400 mt-1 block">
                Engineering & Regulatory Lead
              </span>
            </div>

            <div className="p-4 rounded-2xl liquid-glass border border-white/10">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                Scope of Work
              </span>
              <span className="text-sm font-semibold text-white block mt-1 truncate">
                {project.servicesRendered?.join(', ') || 'Architecture & Engineering'}
              </span>
              <span className="text-[11px] text-zinc-400 mt-1 block">
                Codal & Municipal Compliance
              </span>
            </div>
          </div>

          {/* Project Summary */}
          <div className="liquid-glass p-6 rounded-3xl border border-white/10 space-y-3">
            <h3 className="text-sm font-semibold text-white">Project Scope & Summary</h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {project.summary ||
                'Comprehensive structural engineering, architectural drawings, and milestone delivery managed under the LivRise Infrastructure platform.'}
            </p>

            {project.engineeringApproach && (
              <div className="pt-3 border-t border-white/10">
                <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-1">
                  Engineering Methodology
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {project.engineeringApproach}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB: TIMELINE */}
      {activeTab === 'timeline' && (
        <div className="liquid-glass p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6 animate-in fade-in duration-200">
          <div>
            <h3 className="text-base font-semibold text-white">Project Progression Timeline</h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Verified stages from concept through statutory signoffs and physical handover.
            </p>
          </div>

          <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
            {defaultStages.map((stage, idx) => {
              const isCompleted = stage.status === 'completed';
              const isCurrent = stage.status === 'current';

              return (
                <div key={stage.name} className="relative group">
                  {/* Indicator Icon */}
                  <div
                    className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                      isCompleted
                        ? 'bg-emerald-500 text-black font-bold'
                        : isCurrent
                        ? 'bg-amber-400 text-black font-bold ring-4 ring-amber-400/20 animate-pulse'
                        : 'bg-zinc-800 border border-zinc-700 text-zinc-500'
                    }`}
                  >
                    {isCompleted ? '✓' : isCurrent ? '●' : '○'}
                  </div>

                  {/* Stage Details */}
                  <div className="pl-3">
                    <div className="flex items-center gap-2">
                      <h4
                        className={`text-sm tracking-tight ${
                          isCompleted
                            ? 'font-medium text-white'
                            : isCurrent
                            ? 'font-semibold text-amber-300'
                            : 'font-normal text-zinc-500'
                        }`}
                      >
                        {stage.name}
                      </h4>
                      {isCurrent && (
                        <span className="text-[9px] uppercase font-mono px-2 py-0.5 rounded bg-amber-400/20 text-amber-300">
                          Active Stage
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-400 mt-1">
                      {isCompleted
                        ? 'Completed and approved by engineering desk.'
                        : isCurrent
                        ? 'Currently under technical review and client concurrence.'
                        : 'Scheduled following current milestone completion.'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB: DOCUMENTS */}
      {activeTab === 'documents' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">Project Drawings & Contracts</h3>
            <span className="text-xs text-zinc-400 font-mono">
              {projectDocuments.length} File{projectDocuments.length === 1 ? '' : 's'}
            </span>
          </div>

          {projectDocuments.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {projectDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="p-4 rounded-2xl liquid-glass border border-white/10 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center shrink-0 uppercase font-mono text-xs font-bold">
                      {doc.fileExtension || 'PDF'}
                    </div>
                    <div className="min-w-0">
                      <div className="text-white font-medium truncate">
                        {doc.name || doc.title}
                      </div>
                      <div className="text-[10px] text-zinc-400 font-mono mt-0.5">
                        {doc.folder} • {doc.currentVersion}
                      </div>
                    </div>
                  </div>

                  <a
                    href={`#download-${doc.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      alert(`Initiating verified download for: ${doc.name || doc.title}`);
                    }}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white text-zinc-300 hover:text-black transition-colors shrink-0"
                    title="Download File"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <AppEmptyState
              icon={FileText}
              title="No documents published for this project yet"
              description="Engineering plans and municipal drawings will appear here once released by the team."
            />
          )}
        </div>
      )}

      {/* TAB: MESSAGES */}
      {activeTab === 'messages' && (
        <div className="liquid-glass rounded-3xl border border-white/10 flex flex-col h-[520px] overflow-hidden animate-in fade-in duration-200">
          {/* Header */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-semibold text-white">Engineering Project Chat</span>
            </div>
            <span className="text-[10px] font-mono text-zinc-400">LivRise Direct Channel</span>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {projectMessages.length > 0 ? (
              projectMessages.map((msg) => {
                const isMe = msg.senderId === currentUser.id;
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono text-zinc-400">
                        {msg.senderName}
                      </span>
                      <span className="text-[9px] text-zinc-500 font-mono">
                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div
                      className={`max-w-[85%] sm:max-w-md p-3.5 rounded-2xl text-xs leading-relaxed ${
                        isMe
                          ? 'bg-amber-500/20 border border-amber-500/30 text-white rounded-tr-none'
                          : 'bg-white/10 border border-white/10 text-zinc-200 rounded-tl-none'
                      }`}
                    >
                      {msg.messageText}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-zinc-500">
                Start the conversation with your assigned project engineer below.
              </div>
            )}
          </div>

          {/* Input form */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 border-t border-white/10 flex items-center gap-2 bg-black/60"
          >
            <input
              type="text"
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              placeholder="Type message or query for the project team..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-amber-400/50"
            />
            <button
              type="submit"
              className="p-2.5 rounded-xl bg-white text-black hover:bg-zinc-200 transition-colors shrink-0"
              aria-label="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* TAB: PAYMENTS */}
      {activeTab === 'payments' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">Project Invoices & Receipts</h3>
            <Link href="/app/payments" className="text-xs text-amber-400 hover:underline">
              All Invoices →
            </Link>
          </div>

          {projectInvoices.length > 0 ? (
            <div className="space-y-3">
              {projectInvoices.map((inv) => (
                <div
                  key={inv.id}
                  className="p-4 rounded-2xl liquid-glass border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">{inv.invoiceNumber}</span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                          inv.status === 'Paid'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}
                      >
                        {inv.status}
                      </span>
                    </div>
                    <div className="text-[11px] text-zinc-400 mt-1">
                      Due: {inv.dueDate} • Terms: {inv.paymentTerms}
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-2 sm:pt-0">
                    <div className="text-right">
                      <span className="text-[10px] font-mono text-zinc-400 uppercase block">Total</span>
                      <span className="font-mono font-bold text-white text-sm">
                        {inv.currency} {inv.totalAmount.toLocaleString()}
                      </span>
                    </div>

                    <Link
                      href="/app/payments"
                      className="px-3.5 py-1.5 rounded-xl bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <AppEmptyState
              icon={CreditCard}
              title="No invoices for this project"
              description="All financial schedules and stage receipts will appear here once generated."
            />
          )}
        </div>
      )}
    </div>
  );
}
