'use client';

import React, { useState } from 'react';
import { useLivRiseStore } from '@/lib/store';
import { Quotation, QuotationItem } from '@/types';
import {
  FileCheck,
  Plus,
  Search,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  DollarSign,
  Send,
  Trash2,
} from 'lucide-react';

export default function AdminQuotationsPage() {
  const {
    quotations,
    clients,
    projects,
    createQuotation,
    updateQuotationStatus,
  } = useLivRiseStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<Quotation | null>(null);

  // Form State
  const [clientId, setClientId] = useState(clients[0]?.id || '');
  const [projectId, setProjectId] = useState(projects[0]?.id || '');
  const [validUntil, setValidUntil] = useState('2026-12-31');
  const [taxPercent, setTaxPercent] = useState(18); // GST 18%
  const [items, setItems] = useState<QuotationItem[]>([
    {
      id: 'itm-1',
      itemDescription: 'Structural Analysis & Dynamic STAAD.Pro Foundation Modeling',
      description: 'Structural Analysis & Dynamic STAAD.Pro Foundation Modeling',
      quantity: 1,
      unit: 'Lot',
      unitPrice: 280000,
      totalPrice: 280000,
      total: 280000,
    },
    {
      id: 'itm-2',
      itemDescription: 'Peer Review & Structural Vetting Certification',
      description: 'Peer Review & Structural Vetting Certification',
      quantity: 1,
      unit: 'Certification',
      unitPrice: 70000,
      totalPrice: 70000,
      total: 70000,
    },
  ]);

  const subtotal = items.reduce((acc, curr) => acc + (curr.total || curr.totalPrice), 0);
  const tax = Math.round((subtotal * taxPercent) / 100);
  const grandTotal = subtotal + tax;

  const handleAddItem = () => {
    const newItem: QuotationItem = {
      id: `itm-${Date.now()}`,
      itemDescription: 'Consultancy Service Item',
      description: 'Consultancy Service Item',
      quantity: 1,
      unit: 'Sq.Ft',
      unitPrice: 25000,
      totalPrice: 25000,
      total: 25000,
    };
    setItems([...items, newItem]);
  };

  const handleRemoveItem = (idx: number) => {
    setItems(items.filter((_, i) => i !== idx));
  };

  const handleItemChange = (
    index: number,
    field: keyof QuotationItem,
    value: string | number
  ) => {
    const updated = [...items];
    const current = { ...updated[index], [field]: value };
    if (field === 'description') {
      current.itemDescription = String(value);
    }
    if (field === 'quantity' || field === 'unitPrice') {
      const calc = Number(current.quantity) * Number(current.unitPrice);
      current.total = calc;
      current.totalPrice = calc;
    }
    updated[index] = current;
    setItems(updated);
  };

  const handleCreateQuotation = (e: React.FormEvent) => {
    e.preventDefault();
    const client = clients.find((c) => c.id === clientId);
    const project = projects.find((p) => p.id === projectId);

    const created = createQuotation({
      clientId,
      clientName: client?.companyName || 'Corporate Client',
      clientEmail: client?.email || 'client@livrise.com',
      projectId,
      projectName: project?.title || 'Engineering Consultancy',
      serviceTitle: 'Structural Engineering & Architectural Vetting',
      items,
      subtotal,
      discountAmount: 0,
      taxRatePercent: 18,
      taxAmount: tax,
      tax,
      grandTotal,
      currency: 'INR',
      validUntil,
      status: 'Sent',
      termsAndConditions: '50% advance along with work order issuance. 40% upon submission of preliminary structural drawings. 10% upon final municipal sanction approvals.',
      terms: [
        '50% advance along with work order issuance.',
        '40% upon submission of preliminary structural drawings and calculations.',
        '10% upon final municipal sanction approvals.',
      ],
      notes: 'Generated via LivRise Infrastructure Operations Console.',
    });
    setShowCreateModal(false);
  };

  const filteredQuotes = quotations.filter((q) => {
    const client = clients.find((c) => c.id === q.clientId);
    return (
      q.quotationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (client?.companyName && client.companyName.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white font-mono flex items-center gap-2">
            <FileCheck className="w-6 h-6 text-purple-400" />
            QUOTATIONS & BILL OF QUANTITIES
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Generate formal engineering estimates, structural scopes of work, and track digital client sign-off.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-purple-500 text-white hover:bg-purple-400 transition-colors shadow-lg shadow-purple-500/20"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Generate Formal Quotation</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
        <input
          type="text"
          placeholder="Search by quote number (INF-QT-...), client name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0c1222] border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-purple-400/50"
        />
      </div>

      {/* Quotations List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredQuotes.map((q) => {
          const client = clients.find((c) => c.id === q.clientId);
          const project = projects.find((p) => p.id === q.projectId);

          return (
            <div
              key={q.id}
              className="p-5 rounded-2xl bg-[#0c1222] border border-white/5 hover:border-purple-400/30 transition-all space-y-4 shadow-lg group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 font-bold">
                    {q.quotationNumber}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                      q.status === 'Accepted'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : q.status === 'Revision Requested'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : q.status === 'Sent'
                        ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                        : 'bg-white/5 text-slate-400'
                    }`}
                  >
                    {q.status}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                    {client?.companyName}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">{project?.title}</p>
                </div>

                <div className="p-3 rounded-xl bg-white/2 border border-white/5 space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400">Grand Total</span>
                    <span className="text-base font-bold text-white">
                      ₹{q.grandTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-slate-500">
                    <span>Valid until: {q.validUntil}</span>
                    <span>{q.items.length} Scope Items</span>
                  </div>
                </div>

                {q.clientNotes && (
                  <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300">
                    <span className="font-bold">Client Feedback: </span>
                    {q.clientNotes}
                  </div>
                )}
              </div>

              {/* Status Action Controls */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                <select
                  value={q.status}
                  onChange={(e) => updateQuotationStatus(q.id, e.target.value as any)}
                  className="bg-[#070b14] border border-white/10 rounded-lg px-2 py-1 text-[11px] text-purple-300 focus:outline-none"
                >
                  <option value="Draft">Draft</option>
                  <option value="Sent">Sent</option>
                  <option value="Viewed">Viewed</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Revision Requested">Revision Requested</option>
                  <option value="Rejected">Rejected</option>
                </select>

                <button
                  onClick={() => setSelectedQuote(q)}
                  className="text-slate-400 hover:text-white"
                >
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* CREATE QUOTATION MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#0c1222] border border-white/10 rounded-2xl p-6 max-w-2xl w-full space-y-5 shadow-2xl my-8">
            <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-purple-400" />
              Generate Formal Engineering BOQ Quotation
            </h3>

            <form onSubmit={handleCreateQuotation} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">
                    Select Client
                  </label>
                  <select
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#070b14] border border-white/10 text-white text-xs font-mono focus:outline-none"
                  >
                    {clients.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.companyName} ({c.clientCode})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">
                    Select Project
                  </label>
                  <select
                    value={projectId}
                    onChange={(e) => setProjectId(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#070b14] border border-white/10 text-white text-xs font-mono focus:outline-none"
                  >
                    {projects.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Items Table */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono text-slate-400">
                    Scope of Work & Deliverables
                  </label>
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="text-xs font-mono text-purple-400 hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Scope Item
                  </button>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {items.map((item, idx) => (
                    <div
                      key={item.id}
                      className="p-2.5 rounded-xl bg-[#070b14] border border-white/5 grid grid-cols-12 gap-2 items-center text-xs"
                    >
                      <input
                        type="text"
                        placeholder="Deliverable Description"
                        value={item.description}
                        onChange={(e) => handleItemChange(idx, 'description', e.target.value)}
                        className="col-span-6 p-1.5 rounded-lg bg-white/5 border border-white/10 text-white"
                      />
                      <input
                        type="number"
                        placeholder="Qty"
                        value={item.quantity}
                        onChange={(e) =>
                          handleItemChange(idx, 'quantity', Number(e.target.value))
                        }
                        className="col-span-2 p-1.5 rounded-lg bg-white/5 border border-white/10 text-white"
                      />
                      <input
                        type="number"
                        placeholder="Unit Price"
                        value={item.unitPrice}
                        onChange={(e) =>
                          handleItemChange(idx, 'unitPrice', Number(e.target.value))
                        }
                        className="col-span-3 p-1.5 rounded-lg bg-white/5 border border-white/10 text-white font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(idx)}
                        className="col-span-1 text-slate-500 hover:text-rose-400 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Financial Calculation */}
              <div className="p-3 rounded-xl bg-[#070b14] border border-white/5 space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal:</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>GST (18%):</span>
                  <span>₹{tax.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-1 border-t border-white/5">
                  <span>Grand Total:</span>
                  <span className="text-purple-400">₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 text-xs font-medium hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-purple-500 text-white text-xs font-bold hover:bg-purple-400"
                >
                  Publish & Transmit to Client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QUOTATION PREVIEW MODAL */}
      {selectedQuote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-[#0c1222] border border-white/10 rounded-2xl p-6 max-w-xl w-full space-y-4 shadow-2xl">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 font-bold">
                  {selectedQuote.quotationNumber}
                </span>
                <h3 className="text-base font-bold text-white mt-1">Itemized Deliverables & Scope</h3>
              </div>
              <button
                onClick={() => setSelectedQuote(null)}
                className="text-slate-400 hover:text-white text-xs"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-2">
              {selectedQuote.items.map((it) => (
                <div
                  key={it.id}
                  className="p-3 rounded-xl bg-white/2 border border-white/5 flex justify-between text-xs"
                >
                  <div>
                    <div className="font-bold text-white">{it.description || it.itemDescription}</div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      Qty: {it.quantity} {it.unit} @ ₹{it.unitPrice.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <div className="font-mono font-bold text-white">
                    ₹{(it.total || it.totalPrice || 0).toLocaleString('en-IN')}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-white/5 flex justify-between items-center text-xs font-mono">
              <span className="text-slate-400">Total Billed:</span>
              <span className="text-base font-bold text-purple-400">
                ₹{selectedQuote.grandTotal.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
