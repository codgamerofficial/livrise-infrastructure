'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useLivRiseStore } from '@/lib/store';
import { Milestone } from '@/types';
import {
  FolderKanban,
  ArrowLeft,
  Building,
  MapPin,
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Upload,
  FileText,
  Users,
  Receipt,
  Plus,
} from 'lucide-react';

export default function AdminProjectControlCenter() {
  const params = useParams();
  const projectId = params?.id as string;

  const {
    projects,
    clients,
    milestones,
    documents,
    invoices,
    quotations,
    updateMilestone,
    uploadDocument,
  } = useLivRiseStore();

  const project = projects.find((p) => p.id === projectId);
  const client = clients.find((c) => c.id === project?.clientId);

  const projectMilestones = milestones.filter((m) => m.projectId === projectId);
  const projectDocs = documents.filter((d) => d.projectId === projectId);
  const projectInvoices = invoices.filter((i) => i.projectId === projectId);

  const [activeTab, setActiveTab] = useState<'milestones' | 'documents' | 'financials'>('milestones');
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);
  const [editStatus, setEditStatus] = useState<Milestone['status']>('In Progress');
  const [editProgress, setEditProgress] = useState<number>(50);

  if (!project) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-white font-mono">Project Not Found</h2>
        <Link
          href="/admin/projects"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-400 text-slate-950 font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Project Operations
        </Link>
      </div>
    );
  }

  const handleUpdateMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMilestone) return;
    updateMilestone(selectedMilestone.id, editStatus, editProgress);
    setSelectedMilestone(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects"
            className="p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white font-mono">{project.title}</h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-sky-500/10 text-sky-400 border border-sky-500/20 font-bold">
                {project.projectCode}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Client: {client?.companyName} • Location: {project.location} • Area: {project.builtUpArea}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="p-2.5 rounded-xl bg-[#0c1222] border border-white/5 flex items-center gap-3">
            <span className="text-slate-400">Project Progress:</span>
            <span className="text-sky-400 font-bold text-sm">
              {project.progress || project.progressPercentage}%
            </span>
          </div>
          <span className="px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
            {project.status}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/5 gap-2">
        {[
          { key: 'milestones', label: 'Milestones & Timeline', count: projectMilestones.length },
          { key: 'documents', label: 'Project Vault & Drawings', count: projectDocs.length },
          { key: 'financials', label: 'Invoices & Quotations', count: projectInvoices.length },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as 'milestones' | 'documents' | 'financials')}
            className={`pb-3 px-4 text-xs font-mono font-medium border-b-2 flex items-center gap-2 transition-all ${
              activeTab === tab.key
                ? 'border-sky-400 text-sky-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <span>{tab.label}</span>
            <span className="px-1.5 py-0.2 rounded bg-white/5 text-[10px]">{tab.count}</span>
          </button>
        ))}
      </div>

      {/* TAB CONTENT: MILESTONES */}
      {activeTab === 'milestones' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-400 font-mono">
              Phased architectural & structural execution lifecycle. Click any milestone to update progress.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projectMilestones.map((m, idx) => (
              <div
                key={m.id}
                className="p-5 rounded-2xl bg-[#0c1222] border border-white/5 hover:border-sky-400/30 transition-all space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-white/5 text-slate-400 font-mono text-[10px] flex items-center justify-center font-bold">
                      {idx + 1}
                    </span>
                    <h3 className="text-sm font-bold text-white">{m.name}</h3>
                  </div>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                      m.status === 'Completed'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : m.status === 'In Progress'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : m.status === 'Blocked' || m.status === 'Delayed'
                        ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        : 'bg-white/5 text-slate-400'
                    }`}
                  >
                    {m.status}
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">{m.description}</p>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-slate-500">Progress</span>
                    <span className="text-sky-400 font-bold">{m.progress || m.progressPercentage}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        m.status === 'Completed' ? 'bg-emerald-400' : 'bg-sky-400'
                      }`}
                      style={{ width: `${m.progress || m.progressPercentage}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-2 border-t border-white/5">
                  <span>Owner: {m.owner || m.ownerName}</span>
                  <span>Due: {m.dueDate}</span>
                </div>

                <button
                  onClick={() => {
                    setSelectedMilestone(m);
                    setEditStatus(m.status);
                    setEditProgress(m.progress || m.progressPercentage);
                  }}
                  className="w-full py-1.5 rounded-lg text-xs font-mono font-medium bg-white/5 hover:bg-sky-400 hover:text-slate-950 transition-colors text-slate-300"
                >
                  Update Milestone State
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: DOCUMENTS */}
      {activeTab === 'documents' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-400 font-mono">
              Drawing revisions, calculations, and client-accessible engineering deliverables.
            </p>
            <Link
              href="/admin/documents"
              className="px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-amber-400 text-slate-950 hover:bg-amber-300 transition-colors"
            >
              Open Global Document Vault
            </Link>
          </div>

          <div className="space-y-2">
            {projectDocs.map((doc) => (
              <div
                key={doc.id}
                className="p-4 rounded-xl bg-[#0c1222] border border-white/5 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-sky-400" />
                  <div>
                    <div className="text-xs font-bold text-white">{doc.title || doc.name}</div>
                    <div className="text-[11px] text-slate-500 font-mono">
                      {doc.fileName || doc.storagePath || doc.name} • {doc.category || doc.folder} • {doc.fileSize || `${Math.round((doc.fileSizeBytes || 3000000) / 1024 / 1024)} MB`} • Uploaded by {doc.uploadedBy}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 font-bold">
                    {doc.version || doc.currentVersion}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      (doc.isClientVisible ?? doc.isClientAccessible)
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'bg-rose-500/10 text-rose-400'
                    }`}
                  >
                    {(doc.isClientVisible ?? doc.isClientAccessible) ? 'Client Visible' : 'Internal Only'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: FINANCIALS */}
      {activeTab === 'financials' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projectInvoices.map((inv) => (
              <div
                key={inv.id}
                className="p-5 rounded-2xl bg-[#0c1222] border border-white/5 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
                      {inv.invoiceNumber}
                    </span>
                    <h4 className="text-xs font-bold text-white mt-1">Due: {inv.dueDate}</h4>
                  </div>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                      inv.status === 'Paid'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'bg-amber-500/10 text-amber-400'
                    }`}
                  >
                    {inv.status}
                  </span>
                </div>

                <div className="text-xl font-bold font-mono text-white">
                  ₹{(inv.total || inv.totalAmount || 0).toLocaleString('en-IN')}
                </div>

                <div className="pt-2 border-t border-white/5 text-[11px] text-slate-400">
                  {inv.items.length} line item(s) invoiced.
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: Update Milestone */}
      {selectedMilestone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-[#0c1222] border border-white/10 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white font-mono">
              Update Milestone: {selectedMilestone.name}
            </h3>

            <form onSubmit={handleUpdateMilestone} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Status</label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as Milestone['status'])}
                  className="w-full p-2.5 rounded-xl bg-[#070b14] border border-white/10 text-white text-xs font-mono focus:outline-none"
                >
                  <option value="Upcoming">Upcoming</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Blocked">Blocked</option>
                  <option value="Delayed">Delayed</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
                  <span>Execution Completion</span>
                  <span className="text-sky-400 font-bold">{editProgress}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={editProgress}
                  onChange={(e) => setEditProgress(Number(e.target.value))}
                  className="w-full accent-sky-400"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedMilestone(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 text-xs font-medium hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-sky-400 text-slate-950 text-xs font-bold hover:bg-sky-300"
                >
                  Save Telemetry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
