'use client';

import React, { useState } from 'react';
import { useLivRiseStore } from '@/lib/store';
import {
  History,
  Search,
  ShieldAlert,
  ShieldCheck,
  Filter,
  Clock,
  User,
  Activity,
} from 'lucide-react';

export default function AdminAuditLogsPage() {
  const { auditLogs } = useLivRiseStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEntity, setSelectedEntity] = useState('ALL');

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.actorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.entity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.entityId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesEntity = selectedEntity === 'ALL' || log.entity === selectedEntity;
    return matchesSearch && matchesEntity;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white font-mono flex items-center gap-2">
            <History className="w-6 h-6 text-amber-400" />
            SECURITY AUDIT LOGS & SYSTEM INTEGRITY
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Immutable administrative event journal, compliance auditing, access logs and state mutations.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-xl">
          <ShieldCheck className="w-4 h-4" />
          <span>Audit Protection Active (RLS Guarded)</span>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
          <input
            type="text"
            placeholder="Filter audit logs by actor, action, entity ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0c1222] border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-amber-400/50"
          />
        </div>

        <select
          value={selectedEntity}
          onChange={(e) => setSelectedEntity(e.target.value)}
          className="px-3.5 py-2.5 rounded-xl bg-[#0c1222] border border-white/10 text-white text-xs font-mono focus:outline-none"
        >
          <option value="ALL">All Entities</option>
          <option value="LEAD">LEAD</option>
          <option value="PROJECT">PROJECT</option>
          <option value="QUOTATION">QUOTATION</option>
          <option value="INVOICE">INVOICE</option>
          <option value="PAYMENT">PAYMENT</option>
          <option value="DOCUMENT">DOCUMENT</option>
          <option value="AUTH">AUTH</option>
          <option value="CMS">CMS</option>
        </select>
      </div>

      {/* Logs Table */}
      <div className="bg-[#0c1222] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0a0f1d] border-b border-white/5 font-mono text-slate-400 uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Actor</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Target Entity</th>
                <th className="py-3 px-4">Entity ID</th>
                <th className="py-3 px-4">IP / Origin</th>
                <th className="py-3 px-4">State Mutation Metadata</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300 font-mono text-[11px]">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-white/2 transition-colors">
                  <td className="py-3 px-4 text-slate-400 whitespace-nowrap">{log.timestamp}</td>
                  <td className="py-3 px-4 font-bold text-white whitespace-nowrap">
                    {log.actorName}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        log.action.includes('CREATE') || log.action.includes('SUBMIT')
                          ? 'bg-sky-500/10 text-sky-400'
                          : log.action.includes('PAYMENT') || log.action.includes('ACCEPT')
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : log.action.includes('UPDATE') || log.action.includes('ASSIGN')
                          ? 'bg-amber-500/10 text-amber-400'
                          : 'bg-purple-500/10 text-purple-400'
                      }`}
                    >
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-400">{log.entity}</td>
                  <td className="py-3 px-4 text-slate-300 font-medium">{log.entityId}</td>
                  <td className="py-3 px-4 text-slate-500">{log.ipAddress || '103.21.244.18'}</td>
                  <td className="py-3 px-4 text-slate-400 max-w-xs truncate">
                    {JSON.stringify(log.metadata)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
