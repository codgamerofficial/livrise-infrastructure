'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLivRiseStore } from '@/lib/store';
import { Lead, LeadStatus } from '@/types';
import {
  Users,
  Search,
  Filter,
  Plus,
  ArrowRight,
  UserCheck,
  Calendar,
  Building,
  MapPin,
  FileText,
  CheckCircle,
  Phone,
  Mail,
  MoreVertical,
  MessageSquare,
} from 'lucide-react';
import { getWhatsAppLink } from '@/lib/site-settings';

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

export default function AdminLeadsPage() {
  const {
    leads,
    updateLeadStatus,
    assignLead,
    addLeadNote,
    convertLeadToClientAndProject,
  } = useLivRiseStore();

  const [activeTab, setActiveTab] = useState<'kanban' | 'table'>('kanban');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [assignModalLead, setAssignModalLead] = useState<Lead | null>(null);
  const [staffName, setStaffName] = useState('Lead Project Manager');
  const [convertedInfo, setConvertedInfo] = useState<string | null>(null);

  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      (l.name || l.fullName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.enquiryNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.projectType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (l.location?.city || l.city || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'ALL' || l.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleAssign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignModalLead) return;
    assignLead(assignModalLead.id, 'usr-pm-1', staffName);
    setAssignModalLead(null);
  };

  const handleConvert = (leadId: string) => {
    const res = convertLeadToClientAndProject(leadId);
    setConvertedInfo(
      `Successfully converted to Client: "${res.client.companyName}" (${res.client.clientCode}) and created Project: "${res.project.title}" (${res.project.projectCode})!`
    );
    setTimeout(() => setConvertedInfo(null), 6000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white font-mono flex items-center gap-2">
            <Users className="w-6 h-6 text-amber-400" />
            LEAD CRM & PIPELINE STAGES
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Track and convert technical inquiries into active engineering and architecture projects.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-[#0c1222] border border-white/10 rounded-xl p-1 flex">
            <button
              onClick={() => setActiveTab('kanban')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                activeTab === 'kanban'
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Kanban View
            </button>
            <button
              onClick={() => setActiveTab('table')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                activeTab === 'table'
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Registry Table
            </button>
          </div>
        </div>
      </div>

      {/* Success Notification Banner */}
      {convertedInfo && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-3">
          <CheckCircle className="w-5 h-5 shrink-0 text-emerald-400" />
          <span>{convertedInfo}</span>
        </div>
      )}

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
          <input
            type="text"
            placeholder="Search leads by enquiry #, client name, city or project type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0c1222] border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-amber-400/50"
          />
        </div>

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-3.5 py-2.5 rounded-xl bg-[#0c1222] border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400/50 font-mono"
        >
          <option value="ALL">All Stages ({leads.length})</option>
          {PIPELINE_COLUMNS.map((col) => (
            <option key={col} value={col}>
              {col} ({leads.filter((l) => l.status === col).length})
            </option>
          ))}
        </select>
      </div>

      {/* KANBAN VIEW */}
      {activeTab === 'kanban' ? (
        <div className="flex gap-4 overflow-x-auto pb-6 min-h-150">
          {PIPELINE_COLUMNS.map((column) => {
            const columnLeads = filteredLeads.filter((l) => l.status === column);
            return (
              <div
                key={column}
                className="w-80 shrink-0 bg-[#0a0f1d] border border-white/5 rounded-2xl flex flex-col max-h-187.5"
              >
                {/* Column Header */}
                <div className="p-3.5 border-b border-white/5 flex items-center justify-between sticky top-0 bg-[#0a0f1d] rounded-t-2xl z-10">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                      {column}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-white/5 text-slate-400 font-bold">
                      {columnLeads.length}
                    </span>
                  </div>
                </div>

                {/* Cards Container */}
                <div className="p-3 space-y-3 overflow-y-auto flex-1">
                  {columnLeads.length === 0 ? (
                    <div className="py-8 text-center text-[11px] font-mono text-slate-600 border border-dashed border-white/5 rounded-xl">
                      Empty Stage
                    </div>
                  ) : (
                    columnLeads.map((lead) => (
                      <div
                        key={lead.id}
                        className="p-4 rounded-xl bg-[#0e1526] border border-white/10 hover:border-amber-400/40 transition-all space-y-3 group shadow-md"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20">
                            {lead.enquiryNumber}
                          </span>
                          <span className="text-[10px] font-mono text-slate-500">
                            {lead.createdAt}
                          </span>
                        </div>

                        <div>
                          <Link
                            href={`/admin/leads/${lead.id}`}
                            className="text-xs font-bold text-white hover:text-amber-400 transition-colors block"
                          >
                            {lead.name || lead.fullName}
                          </Link>
                          <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                            <Building className="w-3 h-3 text-slate-500" />
                            {lead.projectType} • {lead.details?.builtUpArea || lead.builtUpArea || 'Design Scope'}
                          </p>
                        </div>

                        <div className="text-[11px] text-slate-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-500" />
                          {lead.location?.city || lead.city}, {lead.location?.state || lead.state}
                        </div>

                        {/* Services Requested Badges */}
                        <div className="flex flex-wrap gap-1">
                          {(lead.servicesRequested || [lead.serviceRequired]).slice(0, 2).map((srv: string) => (
                            <span
                              key={srv}
                              className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-slate-300"
                            >
                              {srv}
                            </span>
                          ))}
                          {(lead.servicesRequested?.length || 1) > 2 && (
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-slate-500">
                              +{(lead.servicesRequested?.length || 1) - 2}
                            </span>
                          )}
                        </div>

                        {/* Assignee & Footer Actions */}
                        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px]">
                          {lead.assignedStaff?.name || lead.assignedToName ? (
                            <span className="text-[10px] font-mono text-slate-400 truncate max-w-30">
                              👤 {(lead.assignedStaff?.name || lead.assignedToName || '').split(' ')[0]}
                            </span>
                          ) : (
                            <button
                              onClick={() => setAssignModalLead(lead)}
                              className="text-[10px] font-mono text-amber-400 hover:underline flex items-center gap-1"
                            >
                              <UserCheck className="w-3 h-3" /> Assign
                            </button>
                          )}

                          <div className="flex items-center gap-1.5">
                            {/* WhatsApp Quick Link */}
                            <a
                              href={getWhatsAppLink(`Hello ${lead.name || lead.fullName}, this is LivRise Infrastructure regarding your project enquiry (${lead.enquiryNumber}). How can our engineering team assist you today?`)}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Chat with Lead on WhatsApp"
                              className="p-1 rounded bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/25 transition-colors"
                            >
                              <MessageSquare className="w-3 h-3" />
                            </a>

                            {/* Advance Stage button */}
                            {column !== 'Won' && column !== 'Lost' && (
                              <button
                                onClick={() => {
                                  const idx = PIPELINE_COLUMNS.indexOf(column);
                                  if (idx < PIPELINE_COLUMNS.length - 1) {
                                    updateLeadStatus(lead.id, PIPELINE_COLUMNS[idx + 1]);
                                  }
                                }}
                                title="Advance to Next Stage"
                                className="p-1 rounded bg-white/5 hover:bg-amber-400 hover:text-slate-950 text-slate-400 transition-colors"
                              >
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            )}

                            {/* Convert to Client and Project */}
                            {(column === 'Won' || column === 'Qualified') && (
                              <button
                                onClick={() => handleConvert(lead.id)}
                                title="Convert to Active Client & Project"
                                className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-colors"
                              >
                                Convert
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* TABLE VIEW */
        <div className="bg-[#0c1222] border border-white/5 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0a0f1d] border-b border-white/5 font-mono text-slate-400 uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-4">Enquiry #</th>
                  <th className="py-3 px-4">Client / Prospect</th>
                  <th className="py-3 px-4">Type & Scope</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Stage</th>
                  <th className="py-3 px-4">Assigned To</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-white/2 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-amber-400">
                      {lead.enquiryNumber}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white">{lead.name || lead.fullName}</div>
                      <div className="text-[11px] text-slate-500 font-mono flex items-center gap-2">
                        <span>{lead.email}</span> • <span>{lead.phone}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="text-white">{lead.projectType}</div>
                      <div className="text-[10px] text-slate-500">
                        {lead.details?.builtUpArea || lead.builtUpArea || 'Site Area'} • {lead.details?.estimatedBudget || lead.estimatedBudget || 'Est. Budget'}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      {lead.location?.city || lead.city}, {lead.location?.state || lead.state}
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        value={lead.status}
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadStatus)}
                        className="bg-[#070b14] border border-white/10 rounded-lg px-2 py-1 text-[11px] font-mono text-amber-300 focus:outline-none"
                      >
                        {PIPELINE_COLUMNS.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px]">
                      {lead.assignedStaff?.name || lead.assignedToName ? (
                        <span className="text-slate-300">👤 {lead.assignedStaff?.name || lead.assignedToName}</span>
                      ) : (
                        <button
                          onClick={() => setAssignModalLead(lead)}
                          className="text-amber-400 hover:underline"
                        >
                          + Assign Staff
                        </button>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-1.5">
                      <a
                        href={getWhatsAppLink(`Hello ${lead.name || lead.fullName}, this is LivRise Infrastructure regarding your project enquiry (${lead.enquiryNumber}).`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 text-[11px] font-mono"
                        title="Chat on WhatsApp"
                      >
                        WhatsApp
                      </a>
                      <Link
                        href={`/admin/leads/${lead.id}`}
                        className="inline-block px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-white text-[11px]"
                      >
                        Dossier
                      </Link>
                      {(lead.status === 'Won' || lead.status === 'Qualified') && (
                        <button
                          onClick={() => handleConvert(lead.id)}
                          className="px-2.5 py-1 rounded bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 text-[11px]"
                        >
                          Convert
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Assign Staff Modal */}
      {assignModalLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-[#0c1222] border border-white/10 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white font-mono">
              Assign Staff to Lead {assignModalLead.enquiryNumber}
            </h3>
            <p className="text-xs text-slate-400">
              Assign responsible director or project manager to conduct technical assessment and initial scoping.
            </p>

            <form onSubmit={handleAssign} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Designated Staff / Consultant
                </label>
                <select
                  value={staffName}
                  onChange={(e) => setStaffName(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#070b14] border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400/50"
                >
                  <option value="Lead Project Manager">Lead Project Manager</option>
                  <option value="Senior Structural Consultant">Senior Structural Consultant</option>
                  <option value="Architectural Lead">Architectural Lead</option>
                  <option value="Iman Khanra (CEO)">Iman Khanra (CEO)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setAssignModalLead(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 text-xs font-medium hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 text-xs font-bold hover:bg-amber-300"
                >
                  Confirm Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
