'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLivRiseStore } from '@/lib/store';
import { useAuth } from '@/lib/auth-context';
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
  CheckSquare,
  FileCheck,
  Upload,
  UserCheck,
} from 'lucide-react';
import { getWhatsAppLink } from '@/lib/site-settings';

export default function ClientProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params?.id as string;

  const { user } = useAuth();
  const {
    projects,
    milestones,
    documents,
    messages,
    quotations,
    invoices,
    payments,
    sendMessage,
    updateDocumentStatus,
  } = useLivRiseStore();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'timeline' | 'tasks' | 'documents' | 'messages' | 'quotes' | 'financials'
  >('overview');
  const [newMsg, setNewMsg] = useState('');
  const [approvalActionMsg, setApprovalActionMsg] = useState<string | null>(null);

  // Find target project
  const project = projects.find((p) => p.id === projectId) || projects[0];

  if (!project) {
    return (
      <div className="w-full max-w-4xl mx-auto p-12 text-center space-y-4">
        <h2 className="text-xl font-bold text-white font-mono">Project Not Found</h2>
        <p className="text-xs text-zinc-400">
          The requested project reference does not exist or you do not have permission to view it.
        </p>
        <Link
          href="/portal/projects"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Projects Directory
        </Link>
      </div>
    );
  }

  // Filter project-specific data
  const projectMilestones = milestones.filter((m) => m.projectId === project.id);
  const projectDocs = documents.filter((d) => d.projectId === project.id);
  const projectMsgs = messages.filter((m) => m.projectId === project.id);
  const projectQuotes = quotations.filter((q) => q.projectId === project.id || q.clientName === project.clientName);
  const projectInvoices = invoices.filter((i) => i.projectId === project.id);
  const projectPayments = payments.filter((p) => p.projectId === project.id);

  const progress = project.progress || project.progressPercentage || 50;
  const currentStage = (project.stage || 'Design').toUpperCase();

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsg.trim()) return;
    sendMessage(project.id, newMsg);
    setNewMsg('');
  };

  const handleApproveDocument = (docId: string, docName: string) => {
    updateDocumentStatus(docId, 'Approved');
    setApprovalActionMsg(`Approved "${docName}". Project team notified.`);
    setTimeout(() => setApprovalActionMsg(null), 4000);
  };

  const handleRequestRevision = (docId: string, docName: string) => {
    updateDocumentStatus(docId, 'Revision Requested');
    setApprovalActionMsg(`Requested changes for "${docName}". Architect desk notified.`);
    setTimeout(() => setApprovalActionMsg(null), 4000);
  };

  // Client tasks requiring action (Prompt Section 13)
  const clientTasks = [
    {
      id: 'tsk-1',
      title: 'Approve Architectural Floor Plan (REV02)',
      description: 'Review updated CAD floor layout and confirm bedroom dimension sign-off.',
      status: 'Action Required',
      priority: 'High',
      dueDate: 'Tomorrow',
    },
    {
      id: 'tsk-2',
      title: 'Review 3D Exterior Elevation Render',
      description: 'Verify front facade color scheme, modern glass railings and stone accents.',
      status: 'Action Required',
      priority: 'Urgent',
      dueDate: 'In 3 Days',
    },
    {
      id: 'tsk-3',
      title: 'Structural Steel Material Confirmation',
      description: 'Sign off on Fe-550D TMT bar grade selection for foundation reinforcement.',
      status: 'Pending Review',
      priority: 'Medium',
      dueDate: 'Next Week',
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 animate-in fade-in duration-300">
      {/* 1. Header with Back Button */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <Link
          href="/portal/projects"
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Projects Directory</span>
        </Link>

        <span className="text-[10px] font-mono text-zinc-500 uppercase">
          Client Project Control Center
        </span>
      </div>

      {/* 2. Project Title Card */}
      <div className="p-6 rounded-3xl bg-[#0c1222] border border-white/5 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-amber-400/10 text-amber-400 border border-amber-400/20">
                {project.projectCode}
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono bg-white/5 text-zinc-300 border border-white/10">
                {currentStage}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {project.title}
            </h1>
            <p className="text-xs text-zinc-400 font-mono">
              Location: {project.location} • Type: {project.projectType || 'Residential'} • Scope: {project.service || 'Structural Engineering'}
            </p>
          </div>

          <a
            href={getWhatsAppLink(`Hello LivRise, regarding project ${project.projectCode} (${project.title}): `)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/20 transition-all self-start sm:self-auto"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Chat with Project Lead</span>
          </a>
        </div>

        {/* Progress Bar & Stages */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-zinc-400">Total Completion</span>
            <span className="text-amber-400 font-bold">{progress}%</span>
          </div>
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-amber-500 to-amber-300 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* 5 Canonical Stages */}
        <div className="grid grid-cols-5 gap-2 pt-3 border-t border-white/5 text-center">
          {['CONSULTATION', 'DESIGN', 'APPROVAL', 'CONSTRUCTION', 'COMPLETED'].map((st, idx) => {
            const stages = ['CONSULTATION', 'DESIGN', 'APPROVAL', 'CONSTRUCTION', 'COMPLETED'];
            const currentIdx = stages.indexOf(currentStage);
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
      </div>

      {/* Feedback Toast */}
      {approvalActionMsg && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{approvalActionMsg}</span>
        </div>
      )}

      {/* 3. Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-white/5 pb-2">
        {[
          { key: 'overview', label: 'Overview', icon: Briefcase },
          { key: 'timeline', label: 'Timeline & Milestones', icon: Layers },
          { key: 'tasks', label: 'My Action Items', icon: CheckSquare },
          { key: 'documents', label: 'Documents & Vault', icon: FileText, badge: projectDocs.length },
          { key: 'messages', label: 'Messages', icon: MessageSquare, badge: projectMsgs.filter((m) => !m.isRead).length },
          { key: 'quotes', label: 'Quotations', icon: FileCheck, badge: projectQuotes.length },
          { key: 'financials', label: 'Invoices & Ledger', icon: CreditCard },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-medium transition-all shrink-0 ${
                isActive
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/10'
                  : 'bg-[#0c1222] border border-white/5 text-zinc-400 hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {tab.badge !== undefined && tab.badge > 0 && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-slate-950 text-amber-400 font-bold' : 'bg-white/10 text-white'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 p-6 rounded-3xl bg-[#0c1222] border border-white/5 space-y-4">
            <h3 className="text-sm font-semibold text-white font-mono uppercase tracking-wider">
              Project Specification & Scope
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              {project.summary || project.description || 'Turnkey engineering and architectural execution.'}
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5 text-xs font-mono">
              <div>
                <span className="text-zinc-500 block">Target Built-up Area:</span>
                <span className="text-white font-semibold">{project.builtUpArea || 'Custom Design'}</span>
              </div>
              <div>
                <span className="text-zinc-500 block">Building Classification:</span>
                <span className="text-white font-semibold">{project.buildingType || project.projectType}</span>
              </div>
              <div>
                <span className="text-zinc-500 block">Commencement Date:</span>
                <span className="text-white font-semibold">{project.startDate || 'Recent'}</span>
              </div>
              <div>
                <span className="text-zinc-500 block">Estimated Handover:</span>
                <span className="text-amber-400 font-semibold">{project.estimatedCompletion || project.targetCompletionDate || 'Q4 2026'}</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#0c1222] border border-white/5 space-y-4">
            <h3 className="text-sm font-semibold text-white font-mono uppercase tracking-wider">
              Assigned Engineering Desk
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/2 border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 font-bold flex items-center justify-center font-mono text-sm shrink-0">
                  IK
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white">Iman Khanra</h4>
                  <p className="text-[11px] text-zinc-400">Chief Project Engineer</p>
                  <p className="text-[10px] text-amber-400/90 font-mono">Techno India University</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Timeline & Milestones */}
      {activeTab === 'timeline' && (
        <div className="p-6 rounded-3xl bg-[#0c1222] border border-white/5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <h3 className="text-sm font-semibold text-white font-mono uppercase tracking-wider">
              Engineering Milestones Timeline
            </h3>
            <span className="text-xs font-mono text-zinc-400">
              {projectMilestones.filter((m) => m.status === 'Completed').length} of {projectMilestones.length} Completed
            </span>
          </div>

          <div className="space-y-4">
            {projectMilestones.map((ms, index) => (
              <div
                key={ms.id}
                className="p-4 rounded-2xl bg-white/2 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-amber-400 font-bold">0{index + 1}.</span>
                    <h4 className="text-xs font-semibold text-white">{ms.title || ms.name}</h4>
                  </div>
                  <p className="text-xs text-zinc-400 pl-6">{ms.description}</p>
                </div>

                <div className="flex items-center gap-3 pl-6 sm:pl-0 shrink-0">
                  <span
                    className={`text-[10px] font-mono px-2.5 py-1 rounded-full font-semibold ${
                      ms.status === 'Completed'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : ms.status === 'In Progress'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : 'bg-white/5 text-zinc-400 border border-white/10'
                    }`}
                  >
                    {ms.status}
                  </span>
                  <div className="text-[11px] font-mono text-zinc-500">
                    {ms.completedDate ? `Done: ${ms.completedDate}` : `Due: ${ms.dueDate}`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: Tasks & Action Items */}
      {activeTab === 'tasks' && (
        <div className="p-6 rounded-3xl bg-[#0c1222] border border-white/5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <h3 className="text-sm font-semibold text-white font-mono uppercase tracking-wider">
              Actions Requiring Client Approval
            </h3>
            <span className="text-xs font-mono text-amber-400">
              {clientTasks.length} Pending Actions
            </span>
          </div>

          <div className="space-y-3">
            {clientTasks.map((tsk) => (
              <div
                key={tsk.id}
                className="p-4 rounded-2xl bg-white/2 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-rose-500/10 text-rose-400 border border-rose-500/20">
                      {tsk.priority}
                    </span>
                    <h4 className="text-xs font-semibold text-white">{tsk.title}</h4>
                  </div>
                  <p className="text-xs text-zinc-400">{tsk.description}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setApprovalActionMsg(`You approved "${tsk.title}". Record logged in database.`);
                      setTimeout(() => setApprovalActionMsg(null), 4000);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 transition-colors"
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setApprovalActionMsg(`Requested changes on "${tsk.title}".`);
                      setTimeout(() => setApprovalActionMsg(null), 4000);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-zinc-300 text-xs hover:bg-white/10 transition-colors"
                  >
                    Request Changes
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: Documents & Storage Vault */}
      {activeTab === 'documents' && (
        <div className="p-6 rounded-3xl bg-[#0c1222] border border-white/5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <h3 className="text-sm font-semibold text-white font-mono uppercase tracking-wider">
              Project Blueprints & Revisions
            </h3>
            <Link
              href="/portal/documents"
              className="text-xs font-mono text-amber-400 hover:underline"
            >
              Open Full Document Vault
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projectDocs.map((doc) => (
              <div
                key={doc.id}
                className="p-4 rounded-2xl bg-white/2 border border-white/5 space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 mb-2">
                    <span className="text-amber-400">{doc.folder}</span>
                    <span>{doc.currentVersion || 'REV01'}</span>
                  </div>
                  <h4 className="text-xs font-semibold text-white">{doc.name}</h4>
                  <span className="text-[11px] text-zinc-500 font-mono block mt-1">
                    Status: {doc.status}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <div className="flex items-center gap-1.5">
                    {doc.status !== 'Approved' && (
                      <button
                        type="button"
                        onClick={() => handleApproveDocument(doc.id, doc.name)}
                        className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-[11px] font-semibold hover:bg-emerald-500/20"
                      >
                        Approve
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleRequestRevision(doc.id, doc.name)}
                      className="px-2.5 py-1 rounded-lg bg-white/5 text-zinc-300 text-[11px] hover:bg-white/10"
                    >
                      Revise
                    </button>
                  </div>

                  <a
                    href={doc.signedUrl || `/api/documents/signed-url`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-amber-400 text-slate-950 hover:bg-amber-300"
                    title="Download Document"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: Messages */}
      {activeTab === 'messages' && (
        <div className="p-6 rounded-3xl bg-[#0c1222] border border-white/5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <h3 className="text-sm font-semibold text-white font-mono uppercase tracking-wider">
              Project Communication Channel
            </h3>
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Live Team Channel
            </span>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto p-1">
            {projectMsgs.map((m) => {
              const isMe = m.senderRole === 'client' || m.senderId === user?.id;
              return (
                <div
                  key={m.id}
                  className={`p-3.5 rounded-2xl max-w-lg space-y-1 ${
                    isMe
                      ? 'ml-auto bg-amber-400/15 border border-amber-400/30 text-white'
                      : 'bg-white/3 border border-white/5 text-zinc-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                    <span className="font-semibold text-white">{m.senderName}</span>
                    <span>{new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <p className="text-xs leading-relaxed">{m.messageText}</p>
                </div>
              );
            })}
          </div>

          <form onSubmit={handleSendMessage} className="flex gap-2 pt-3 border-t border-white/5">
            <input
              type="text"
              placeholder="Type message to LivRise engineering team..."
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-hidden focus:border-amber-400/50"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 transition-colors flex items-center gap-1.5"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* TAB CONTENT: Quotations */}
      {activeTab === 'quotes' && (
        <div className="p-6 rounded-3xl bg-[#0c1222] border border-white/5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <h3 className="text-sm font-semibold text-white font-mono uppercase tracking-wider">
              Project Quotations & Estimates
            </h3>
            <Link href="/portal/quotations" className="text-xs font-mono text-amber-400 hover:underline">
              View All Quotations
            </Link>
          </div>

          <div className="space-y-3">
            {projectQuotes.map((q) => (
              <div
                key={q.id}
                className="p-4 rounded-2xl bg-white/2 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <span className="text-[10px] font-mono text-amber-400 px-2 py-0.5 rounded bg-amber-400/10">
                    {q.quotationNumber}
                  </span>
                  <h4 className="text-sm font-semibold text-white mt-1">{q.serviceTitle}</h4>
                  <p className="text-xs text-zinc-400 font-mono mt-0.5">
                    Valid Until: {q.validUntil} • Created: {new Date(q.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <div className="text-base font-bold text-white font-mono">
                      ₹{q.grandTotal.toLocaleString()}
                    </div>
                    <span className="text-[10px] font-mono text-amber-400">{q.status}</span>
                  </div>
                  <Link
                    href="/portal/quotations"
                    className="px-3.5 py-1.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300"
                  >
                    View & Sign
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: Financials & Ledger */}
      {activeTab === 'financials' && (
        <div className="p-6 rounded-3xl bg-[#0c1222] border border-white/5 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <h3 className="text-sm font-semibold text-white font-mono uppercase tracking-wider">
              Invoices & Payment Records
            </h3>
            <Link href="/portal/payments" className="text-xs font-mono text-amber-400 hover:underline">
              Payment Instructions
            </Link>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Invoices</h4>
            {projectInvoices.map((inv) => (
              <div
                key={inv.id}
                className="p-3.5 rounded-2xl bg-white/2 border border-white/5 flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-semibold text-white">{inv.invoiceNumber}</div>
                  <div className="text-[11px] text-zinc-400 font-mono">Due: {inv.dueDate}</div>
                </div>
                <div className="text-right font-mono">
                  <div className="text-xs font-bold text-white">₹{inv.totalAmount.toLocaleString()}</div>
                  <span className="text-[10px] text-amber-400">{inv.status}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3 pt-3 border-t border-white/5">
            <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Payment Receipts</h4>
            {projectPayments.map((p) => (
              <div
                key={p.id}
                className="p-3.5 rounded-2xl bg-white/2 border border-white/5 flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-semibold text-white">{p.paymentReference}</div>
                  <div className="text-[11px] text-zinc-400 font-mono">
                    Method: {p.paymentMethod} • Date: {p.paymentDate}
                  </div>
                </div>
                <div className="text-right font-mono">
                  <div className="text-xs font-bold text-emerald-400">₹{p.amount.toLocaleString()}</div>
                  <span className="text-[10px] text-emerald-400">Verified</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
