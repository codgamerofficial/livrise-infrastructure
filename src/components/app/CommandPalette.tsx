'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  Briefcase,
  FileText,
  MessageSquare,
  CreditCard,
  Plus,
  Shield,
  X,
  ArrowRight,
} from 'lucide-react';
import { useLivRiseStore } from '@/lib/store';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const { projects, documents, invoices } = useLivRiseStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Trigger open handled by parent
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredProjects = projects.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase())
  );

  const filteredDocuments = documents.filter((d) =>
    (d.name || d.title || '').toLowerCase().includes(query.toLowerCase()) ||
    d.folder.toLowerCase().includes(query.toLowerCase())
  );

  const filteredInvoices = invoices.filter((i) =>
    i.invoiceNumber.toLowerCase().includes(query.toLowerCase()) ||
    i.clientName.toLowerCase().includes(query.toLowerCase())
  );

  const navigateTo = (url: string) => {
    onClose();
    router.push(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-150"
      />

      {/* Palette Container */}
      <div className="relative z-10 w-full max-w-xl liquid-glass border border-white/20 rounded-2xl shadow-2xl bg-black/95 overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Search Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10 gap-3">
          <Search className="w-5 h-5 text-zinc-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, documents, invoices, or type a command..."
            className="w-full bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4">
          {/* Quick Actions */}
          {query === '' && (
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 px-3 py-1">
                Quick Shortcuts
              </div>
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => navigateTo('/app/projects')}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-zinc-300 hover:text-white hover:bg-white/5 transition-all"
                >
                  <span className="flex items-center gap-2.5">
                    <Briefcase className="w-4 h-4 text-amber-400" />
                    <span>View All Active Projects</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-50" />
                </button>

                <button
                  type="button"
                  onClick={() => navigateTo('/app/messages')}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-zinc-300 hover:text-white hover:bg-white/5 transition-all"
                >
                  <span className="flex items-center gap-2.5">
                    <MessageSquare className="w-4 h-4 text-purple-400" />
                    <span>Open Project Messages</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-50" />
                </button>

                <button
                  type="button"
                  onClick={() => navigateTo('/app/documents')}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-zinc-300 hover:text-white hover:bg-white/5 transition-all"
                >
                  <span className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-blue-400" />
                    <span>Browse Drawings & Vault</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-50" />
                </button>

                <button
                  type="button"
                  onClick={() => navigateTo('/admin')}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-amber-300 hover:text-amber-200 hover:bg-amber-500/10 transition-all"
                >
                  <span className="flex items-center gap-2.5">
                    <Shield className="w-4 h-4 text-amber-400" />
                    <span>Admin Operations Console</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-50" />
                </button>
              </div>
            </div>
          )}

          {/* Project Matches */}
          {filteredProjects.length > 0 && (
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 px-3 py-1">
                Projects ({filteredProjects.length})
              </div>
              <div className="space-y-1">
                {filteredProjects.slice(0, 4).map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => navigateTo(`/app/projects/${p.id}`)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-zinc-200 hover:text-white hover:bg-white/10 transition-all text-left"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Briefcase className="w-4 h-4 text-amber-400 shrink-0" />
                      <span className="truncate">{p.title}</span>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-400 ml-2 shrink-0">
                      {p.progress || p.progressPercentage}%
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Document Matches */}
          {filteredDocuments.length > 0 && (
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 px-3 py-1">
                Documents ({filteredDocuments.length})
              </div>
              <div className="space-y-1">
                {filteredDocuments.slice(0, 3).map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => navigateTo('/app/documents')}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-zinc-200 hover:text-white hover:bg-white/10 transition-all text-left"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <FileText className="w-4 h-4 text-blue-400 shrink-0" />
                      <span className="truncate">{d.name || d.title}</span>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-400 ml-2 shrink-0">
                      {d.folder}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Invoice Matches */}
          {filteredInvoices.length > 0 && (
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 px-3 py-1">
                Invoices ({filteredInvoices.length})
              </div>
              <div className="space-y-1">
                {filteredInvoices.slice(0, 3).map((inv) => (
                  <button
                    key={inv.id}
                    type="button"
                    onClick={() => navigateTo('/app/payments')}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-zinc-200 hover:text-white hover:bg-white/10 transition-all text-left"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <CreditCard className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="truncate">{inv.invoiceNumber} — {inv.currency} {inv.totalAmount.toLocaleString()}</span>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-400 ml-2 shrink-0">
                      {inv.status}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {query !== '' && filteredProjects.length === 0 && filteredDocuments.length === 0 && filteredInvoices.length === 0 && (
            <div className="py-8 text-center text-xs text-zinc-500">
              No matching results found for &quot;{query}&quot;
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-white/5 border-t border-white/10 flex items-center justify-between text-[11px] text-zinc-500">
          <span>Navigate with mouse or arrow keys</span>
          <span className="font-mono">ESC to close</span>
        </div>
      </div>
    </div>
  );
}
