'use client';

import React, { useState } from 'react';
import { useLivRiseStore } from '@/lib/store';
import { Invoice, InvoiceItem } from '@/types';
import {
  Receipt,
  Plus,
  Search,
  CheckCircle,
  AlertTriangle,
  Clock,
  DollarSign,
  Send,
  Trash2,
} from 'lucide-react';

export default function AdminInvoicesPage() {
  const { invoices, clients, projects, createInvoice, recordPayment } = useLivRiseStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [recordPaymentInvoice, setRecordPaymentInvoice] = useState<Invoice | null>(null);
  const [paymentAmount, setPaymentAmount] = useState<number>(100000);
  const [paymentMethod, setPaymentMethod] = useState<'NEFT' | 'RTGS' | 'UPI' | 'Cheque'>('NEFT');

  // New Invoice Form
  const [clientId, setClientId] = useState(clients[0]?.id || '');
  const [projectId, setProjectId] = useState(projects[0]?.id || '');
  const [dueDate, setDueDate] = useState('2026-11-15');
  const [items, setItems] = useState<InvoiceItem[]>([
    {
      id: 'inv-item-1',
      description: 'Milestone 2 Completion: G+14 Structural Framing Models & Drawing Set',
      quantity: 1,
      unit: 'Lot',
      unitPrice: 200000,
      totalPrice: 200000,
      total: 200000,
    },
  ]);

  const subtotal = items.reduce((acc, curr) => acc + (curr.total || curr.totalPrice || 0), 0);
  const tax = Math.round((subtotal * 18) / 100);
  const total = subtotal + tax;

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    const client = clients.find((c) => c.id === clientId);
    const project = projects.find((p) => p.id === projectId);

    createInvoice({
      clientId,
      clientName: client?.companyName || client?.fullName || 'Corporate Client',
      clientEmail: client?.email || 'billing@client.com',
      projectId,
      projectName: project?.title || 'Engineering Project',
      items,
      subtotal,
      taxAmount: tax,
      tax,
      discountAmount: 0,
      totalAmount: total,
      total,
      amountPaid: 0,
      balanceDue: total,
      currency: 'INR',
      issueDate: new Date().toISOString().split('T')[0],
      dueDate,
      status: 'Sent',
      paymentTerms: 'Due upon receipt of revised structural drawing package.',
    });
    setShowCreateModal(false);
  };

  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recordPaymentInvoice) return;
    const client = clients.find((c) => c.id === recordPaymentInvoice.clientId);

    recordPayment({
      invoiceId: recordPaymentInvoice.id,
      invoiceNumber: recordPaymentInvoice.invoiceNumber,
      projectId: recordPaymentInvoice.projectId,
      clientId: recordPaymentInvoice.clientId,
      clientName: client?.companyName || client?.fullName || 'Client Account',
      amount: Number(paymentAmount),
      currency: 'INR',
      paymentMethod,
      gateway: 'Direct Bank Settlement (HDFC Current A/C)',
      status: 'Successful',
      paymentDate: new Date().toISOString().split('T')[0],
      notes: `Manual verification by Finance Desk for ${recordPaymentInvoice.invoiceNumber}`,
    });
    setRecordPaymentInvoice(null);
  };

  const filteredInvoices = invoices.filter((i) => {
    const client = clients.find((c) => c.id === i.clientId);
    return (
      i.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (client?.companyName && client.companyName.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white font-mono flex items-center gap-2">
            <Receipt className="w-6 h-6 text-emerald-400" />
            ENTERPRISE INVOICES & BILLING
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Generate milestone-based tax invoices, manage receivables, and verify client bank wire transfers.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Raise New Tax Invoice</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
        <input
          type="text"
          placeholder="Search by invoice number (INF-INV-...), client name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0c1222] border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-emerald-400/50"
        />
      </div>

      {/* Invoices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredInvoices.map((inv) => {
          const client = clients.find((c) => c.id === inv.clientId);
          const project = projects.find((p) => p.id === inv.projectId);

          return (
            <div
              key={inv.id}
              className="p-5 rounded-2xl bg-[#0c1222] border border-white/5 hover:border-emerald-400/30 transition-all space-y-4 shadow-lg flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                    {inv.invoiceNumber}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                      inv.status === 'Paid'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : inv.status === 'Partially Paid'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}
                  >
                    {inv.status}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white">{client?.companyName}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{project?.title}</p>
                </div>

                <div className="p-3 rounded-xl bg-white/2 border border-white/5 space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400">Total Due</span>
                    <span className="text-base font-bold text-white">
                      ₹{(inv.total || inv.totalAmount || 0).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-slate-500">
                    <span>Due Date: {inv.dueDate}</span>
                    <span>GST (18%): ₹{(inv.tax || inv.taxAmount || 0).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                {inv.status !== 'Paid' ? (
                  <button
                    onClick={() => {
                      setRecordPaymentInvoice(inv);
                      setPaymentAmount(inv.total || inv.totalAmount || 0);
                    }}
                    className="w-full py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500 text-emerald-300 hover:text-slate-950 font-mono text-xs font-bold transition-all text-center"
                  >
                    Record Payment Receipt
                  </button>
                ) : (
                  <div className="w-full py-1 text-center text-xs font-mono text-emerald-400 flex items-center justify-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5" /> Fully Settled
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* CREATE INVOICE MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-[#0c1222] border border-white/10 rounded-2xl p-6 max-w-xl w-full space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
              <Receipt className="w-5 h-5 text-emerald-400" />
              Raise Milestone Tax Invoice
            </h3>

            <form onSubmit={handleCreateInvoice} className="space-y-4">
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
                        {c.companyName}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Due Date</label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#070b14] border border-white/10 text-white text-xs font-mono focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Deliverable Description
                </label>
                <input
                  type="text"
                  value={items[0]?.description || ''}
                  onChange={(e) =>
                    setItems([
                      {
                        ...items[0],
                        description: e.target.value,
                      },
                    ])
                  }
                  className="w-full p-2.5 rounded-xl bg-[#070b14] border border-white/10 text-white text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Base Amount (Excl. 18% GST)
                </label>
                <input
                  type="number"
                  value={items[0]?.unitPrice || 0}
                  onChange={(e) =>
                    setItems([
                      {
                        ...items[0],
                        unitPrice: Number(e.target.value),
                        total: Number(e.target.value),
                      },
                    ])
                  }
                  className="w-full p-2.5 rounded-xl bg-[#070b14] border border-white/10 text-white text-xs font-mono focus:outline-none"
                />
              </div>

              <div className="p-3 rounded-xl bg-[#070b14] border border-white/5 space-y-1 text-xs font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal:</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>GST (18%):</span>
                  <span>₹{tax.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-1 border-t border-white/5">
                  <span>Invoice Total:</span>
                  <span className="text-emerald-400">₹{total.toLocaleString('en-IN')}</span>
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
                  className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold hover:bg-emerald-400"
                >
                  Dispatch Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* RECORD PAYMENT RECEIPT MODAL */}
      {recordPaymentInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-[#0c1222] border border-white/10 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white font-mono">
              Record Bank Wire / Payment for {recordPaymentInvoice.invoiceNumber}
            </h3>

            <form onSubmit={handleRecordPayment} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Received Amount (₹)
                </label>
                <input
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-[#070b14] border border-white/10 text-white text-xs font-mono focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Payment Mode
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl bg-[#070b14] border border-white/10 text-white text-xs font-mono focus:outline-none"
                >
                  <option value="NEFT">NEFT Direct Bank Wire</option>
                  <option value="RTGS">RTGS High-Value Transfer</option>
                  <option value="UPI">Corporate UPI QR</option>
                  <option value="Cheque">Account Payee Cheque</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRecordPaymentInvoice(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 text-xs font-medium hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold hover:bg-emerald-400"
                >
                  Commit Receipt to Ledger
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
