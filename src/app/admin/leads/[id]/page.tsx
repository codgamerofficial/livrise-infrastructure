'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useLivRiseStore } from '@/lib/store';
import { LeadStatus } from '@/types';
import { buildAdminClientWhatsAppUrl } from '@/lib/whatsapp-service';
import {
  Building,
  FileText,
  ArrowLeft,
  CheckCircle,
  Send,
  MessageSquare,
  Paperclip,
} from 'lucide-react';

const PIPELINE_COLUMNS: LeadStatus[] = [
  'New Leads',
  'Contacted',
  'Qualified',
  'Meeting',
  'Quotation',
  'Negotiation',
  'Won',
  'Lost',
];

export default function AdminLeadDetailPage() {
  const params = useParams();
  const leadId = params?.id as string;

  const {
    leads,
    updateLeadStatus,
    addLeadNote,
    convertLeadToClientAndProject,
  } = useLivRiseStore();

  const lead = leads.find((l) => l.id === leadId);

  const [newNote, setNewNote] = useState('');
  const [conversionMessage, setConversionMessage] = useState<string | null>(null);

  if (!lead) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-white font-mono">Lead Record Not Found</h2>
        <p className="text-xs text-slate-400">The requested inquiry identifier does not exist.</p>
        <Link
          href="/admin/leads"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Lead Pipeline
        </Link>
      </div>
    );
  }

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    addLeadNote(lead.id, newNote.trim());
    setNewNote('');
  };

  const handleConvert = () => {
    const res = convertLeadToClientAndProject(lead.id);
    setConversionMessage(
      `Successfully converted to Client: "${res.client.companyName}" (${res.client.clientCode}) & Project: "${res.project.title}"!`
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/leads"
            className="p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white font-mono">
                {lead.name}
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
                {lead.enquiryNumber}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Received on {lead.createdAt} • Contact: {lead.email} • {lead.phone}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400">Status:</span>
            <select
              value={lead.status}
              onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadStatus)}
              className="px-3 py-1.5 rounded-xl bg-[#0c1222] border border-white/10 text-amber-300 font-mono text-xs focus:outline-none focus:border-amber-400/50"
            >
              {PIPELINE_COLUMNS.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          <a
            href={buildAdminClientWhatsAppUrl({
              clientName: lead.fullName || lead.name || 'Client',
              clientPhone: lead.phone,
              referenceId: lead.referenceId || lead.enquiryNumber,
            })}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold transition-all shadow-sm"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.074-2.121-.527-1.745-.734-2.852-2.545-2.937-2.66-.086-.115-.705-.939-.705-1.791 0-.853.447-1.272.607-1.446.16-.174.349-.217.465-.217.117 0 .233.002.334.007.106.005.249-.04.39.298.144.348.491 1.199.534 1.286.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.303c-.087.087-.178.182-.076.357.101.174.453.748.971 1.21.668.595 1.232.78 1.406.867.174.086.275.072.376-.044.102-.115.434-.506.55-.679.115-.174.231-.145.39-.087.159.058 1.009.477 1.182.564.173.086.289.13.332.202.043.072.043.419-.101.824z" />
            </svg>
            <span>WhatsApp Client</span>
          </a>

          <button
            onClick={handleConvert}
            className="px-3.5 py-1.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors shadow-md"
          >
            Convert to Client & Project
          </button>
        </div>
      </div>

      {/* Conversion Banner */}
      {conversionMessage && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>{conversionMessage}</span>
          </div>
          <Link
            href="/admin/projects"
            className="px-3 py-1 rounded bg-emerald-500 text-slate-950 font-bold text-[11px]"
          >
            Open Projects
          </Link>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Lead Details & Requirements */}
        <div className="lg:col-span-2 space-y-6">
          {/* Engineering Specifications Card */}
          <div className="p-6 rounded-2xl bg-[#0c1222] border border-white/5 space-y-4">
            <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
              <Building className="w-4 h-4 text-amber-400" />
              Technical Scoping & Project Metrics
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-3 rounded-xl bg-white/2 border border-white/5">
                <span className="text-[10px] font-mono text-slate-500 block">PROJECT TYPE</span>
                <span className="text-xs font-bold text-white mt-1 block">{lead.projectType}</span>
              </div>
              <div className="p-3 rounded-xl bg-white/2 border border-white/5">
                <span className="text-[10px] font-mono text-slate-500 block">BUILT-UP AREA</span>
                <span className="text-xs font-bold text-white mt-1 block">
                  {lead.details?.builtUpArea || lead.builtUpArea || '25,000 Sq.Ft.'}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white/2 border border-white/5">
                <span className="text-[10px] font-mono text-slate-500 block">PLOT AREA</span>
                <span className="text-xs font-bold text-white mt-1 block">
                  {lead.details?.plotArea || lead.plotArea || '10,000 Sq.Ft.'}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white/2 border border-white/5">
                <span className="text-[10px] font-mono text-slate-500 block">STOREYS / FLOORS</span>
                <span className="text-xs font-bold text-white mt-1 block">
                  {lead.details?.floors || lead.numberOfFloors || 'G+4 Storeys'}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white/2 border border-white/5">
                <span className="text-[10px] font-mono text-slate-500 block">ESTIMATED BUDGET</span>
                <span className="text-xs font-bold text-white mt-1 block">
                  {lead.details?.estimatedBudget || lead.estimatedBudget || '₹50 Lakhs - ₹2 Cr'}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white/2 border border-white/5">
                <span className="text-[10px] font-mono text-slate-500 block">LOCATION</span>
                <span className="text-xs font-bold text-white mt-1 block">
                  {lead.location?.city || lead.city}, {lead.location?.state || lead.state}
                </span>
              </div>
            </div>

            {/* Scope requested */}
            <div className="pt-2">
              <span className="text-[10px] font-mono text-slate-500 block mb-1.5">
                SERVICES IN SCOPE
              </span>
              <div className="flex flex-wrap gap-1.5">
                {(lead.servicesRequested || [lead.serviceRequired]).map((srv) => (
                  <span
                    key={srv}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white/5 border border-white/10 text-amber-300"
                  >
                    {srv}
                  </span>
                ))}
              </div>
            </div>

            {/* Requirement Text */}
            <div className="pt-3 border-t border-white/5">
              <span className="text-[10px] font-mono text-slate-500 block mb-1">
                CLIENT WRITTEN BRIEF
              </span>
              <p className="text-xs text-slate-300 leading-relaxed bg-[#070b14] p-3.5 rounded-xl border border-white/5">
                {lead.requirements}
              </p>
            </div>
          </div>

          {/* Uploaded Documents */}
          <div className="p-6 rounded-2xl bg-[#0c1222] border border-white/5 space-y-4">
            <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
              <Paperclip className="w-4 h-4 text-sky-400" />
              Attached Drawings & Documents ({lead.uploadedFiles?.length || 0})
            </h2>

            {lead.uploadedFiles && lead.uploadedFiles.length > 0 ? (
              <div className="space-y-2">
                {lead.uploadedFiles.map((file, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white/2 border border-white/5 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-amber-400" />
                      <div>
                        <div className="text-xs font-bold text-white">{file.name}</div>
                        <div className="text-[10px] font-mono text-slate-500">{file.size}</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-1 rounded">
                      Verified Upload
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">No preliminary drawings attached with this inquiry.</p>
            )}
          </div>
        </div>

        {/* Right Col: Timeline & Notes */}
        <div className="space-y-6">
          {/* Assigned Consultant */}
          <div className="p-5 rounded-2xl bg-[#0c1222] border border-white/5 space-y-3">
            <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Assigned Engineering Staff
            </h3>
            {lead.assignedStaff ? (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs">
                <p className="font-bold text-white">{lead.assignedStaff.name}</p>
                <p className="text-[11px] font-mono text-amber-400 mt-0.5">
                  Assigned on: {lead.assignedStaff.assignedAt}
                </p>
              </div>
            ) : (
              <p className="text-xs text-slate-500">Unassigned lead.</p>
            )}
          </div>

          {/* Activity Notes & Timeline */}
          <div className="p-5 rounded-2xl bg-[#0c1222] border border-white/5 space-y-4">
            <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-purple-400" />
              Activity Notes & Follow-ups
            </h3>

            {/* Note Input */}
            <form onSubmit={handleAddNote} className="space-y-2">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                rows={2}
                placeholder="Add meeting notes, call log, or client update..."
                className="w-full p-2.5 rounded-xl bg-[#070b14] border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-amber-400/50"
              />
              <button
                type="submit"
                className="w-full py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 transition-colors flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" /> Post Activity Note
              </button>
            </form>

            {/* Timeline Notes */}
            <div className="space-y-3 pt-3 border-t border-white/5">
              {lead.notes && lead.notes.length > 0 ? (
                lead.notes.map((note) => (
                  <div key={note.id} className="p-3 rounded-xl bg-white/2 border border-white/5 space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                      <span className="text-slate-300 font-bold">{note.author}</span>
                      <span>{note.createdAt}</span>
                    </div>
                    <p className="text-xs text-slate-300">{note.content}</p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500 italic">No notes logged yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
