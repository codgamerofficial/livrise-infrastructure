'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLivRiseStore } from '@/lib/store';
import {
  Users,
  Search,
  Building,
  Mail,
  Phone,
  FolderKanban,
  Receipt,
  ExternalLink,
  ChevronRight,
  Shield,
  Plus,
} from 'lucide-react';

export default function AdminClientsPage() {
  const { clients, projects, invoices, payments } = useLivRiseStore();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredClients = clients.filter(
    (c) =>
      (c.companyName || c.fullName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.clientCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.primaryContact?.name || c.fullName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.primaryContact?.city || c.city || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white font-mono flex items-center gap-2">
            <Users className="w-6 h-6 text-amber-400" />
            ENTERPRISE CLIENTS REGISTRY
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Registered corporate clients, contracted accounts, portal access and billing telemetry.
          </p>
        </div>

        <Link
          href="/admin/leads"
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-amber-400 text-slate-950 hover:bg-amber-300 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Convert Lead to Client</span>
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
        <input
          type="text"
          placeholder="Search by client name, client code (INF-CL-...), contact person or city..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0c1222] border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-amber-400/50"
        />
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredClients.map((client) => {
          const clientProjects = projects.filter((p) => p.clientId === client.id);
          const clientInvoices = invoices.filter((i) => i.clientId === client.id);
          const clientTotalBilled = clientInvoices.reduce((a, b) => a + (b.total || b.totalAmount || 0), 0);

          return (
            <div
              key={client.id}
              className="p-5 rounded-2xl bg-[#0c1222] border border-white/5 hover:border-amber-400/30 transition-all space-y-4 shadow-lg group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
                    {client.clientCode}
                  </span>
                  <h3 className="text-base font-bold text-white mt-1.5 group-hover:text-amber-300 transition-colors">
                    {client.companyName || client.fullName}
                  </h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Active Account
                </span>
              </div>

              {/* Contact Info */}
              <div className="space-y-1.5 text-xs text-slate-400 border-t border-b border-white/5 py-3">
                <div className="flex items-center gap-2">
                  <span className="text-slate-200 font-medium">
                    {client.primaryContact?.name || client.fullName}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    ({client.primaryContact?.designation || 'Client Representative'})
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[11px]">
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  <span>{client.primaryContact?.email || client.email}</span>
                </div>
                <div className="flex items-center gap-2 text-[11px]">
                  <Phone className="w-3.5 h-3.5 text-slate-500" />
                  <span>{client.primaryContact?.phone || client.phone}</span>
                </div>
                <div className="text-[11px] text-slate-500">
                  📍 {client.primaryContact?.city || client.city}, {client.primaryContact?.state || client.state}
                </div>
              </div>

              {/* Projects & Billing Stats */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-white/2 border border-white/5">
                  <span className="text-[10px] text-slate-500 block">PROJECTS</span>
                  <span className="text-sm font-bold text-white mt-0.5 block">
                    {clientProjects.length} Contracted
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/2 border border-white/5">
                  <span className="text-[10px] text-slate-500 block">TOTAL BILLED</span>
                  <span className="text-sm font-bold text-amber-400 mt-0.5 block">
                    ₹{(clientTotalBilled / 100000).toFixed(2)}L
                  </span>
                </div>
              </div>

              {/* Client Projects List */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono text-slate-500 block">
                  ASSOCIATED PROJECTS
                </span>
                {clientProjects.map((p) => (
                  <Link
                    key={p.id}
                    href={`/admin/projects/${p.id}`}
                    className="flex items-center justify-between p-2 rounded-lg bg-white/2 hover:bg-white/5 text-[11px] text-slate-300 transition-colors"
                  >
                    <span className="truncate">{p.title}</span>
                    <ChevronRight className="w-3 h-3 text-slate-500 shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
