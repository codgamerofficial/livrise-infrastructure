'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLivRiseStore } from '@/lib/store';
import { useAuth } from '@/lib/auth-context';
import {
  CreditCard,
  Receipt,
  CheckCircle2,
  AlertCircle,
  Copy,
  ExternalLink,
  Shield,
  Clock,
  ArrowRight,
  Download,
} from 'lucide-react';
import { getWhatsAppLink } from '@/lib/site-settings';

export default function ClientPaymentsPage() {
  const { user } = useAuth();
  const { invoices, payments } = useLivRiseStore();

  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Financial summary
  const totalBilled = invoices.reduce((acc, curr) => acc + (curr.total || curr.totalAmount || 0), 0);
  const totalPaid = payments
    .filter((p) => p.status === 'Successful' || p.status === 'Verified')
    .reduce((acc, curr) => acc + curr.amount, 0);
  const totalPending = Math.max(0, totalBilled - totalPaid);

  const pendingInvoices = invoices.filter(
    (i) => i.status === 'Sent' || i.status === 'Partially Paid' || i.status === 'Overdue'
  );
  const nextDueDate = pendingInvoices[0]?.dueDate || 'None pending';

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 3000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-1">
            <Shield className="w-3.5 h-3.5" />
            <span>Commercial Accounts & Billing</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
            Invoices & Payment Telemetry
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Track certified milestones, tax invoices, bank transfer receipts, and ledger balance.
          </p>
        </div>

        <a
          href={getWhatsAppLink('Hello LivRise Accounts Desk, I have a query regarding billing/invoices: ')}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/20 transition-all self-start sm:self-auto"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Accounts Desk WhatsApp</span>
        </a>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#0c1222] border border-white/5">
          <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">Total Invoiced</span>
          <div className="text-2xl sm:text-3xl font-bold text-white font-mono mt-1">
            ₹{totalBilled.toLocaleString()}
          </div>
          <span className="text-[11px] text-zinc-500 font-mono mt-1 block">Contractual milestones</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#0c1222] border border-white/5">
          <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400">Total Settled</span>
          <div className="text-2xl sm:text-3xl font-bold text-emerald-400 font-mono mt-1">
            ₹{totalPaid.toLocaleString()}
          </div>
          <span className="text-[11px] text-zinc-500 font-mono mt-1 block">Verified bank transactions</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#0c1222] border border-white/5">
          <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400">Outstanding Balance</span>
          <div className="text-2xl sm:text-3xl font-bold text-amber-400 font-mono mt-1">
            ₹{totalPending.toLocaleString()}
          </div>
          <span className="text-[11px] text-zinc-500 font-mono mt-1 block">{pendingInvoices.length} active invoices</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#0c1222] border border-white/5">
          <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">Upcoming Due Date</span>
          <div className="text-lg sm:text-xl font-bold text-white font-mono mt-2">
            {nextDueDate}
          </div>
          <span className="text-[11px] text-zinc-500 font-mono mt-1 block">Next milestone release</span>
        </div>
      </div>

      {/* Official Payment Instructions Card (Prompt Section 26) */}
      <section className="p-6 sm:p-8 rounded-3xl bg-linear-to-br from-[#0c1222] via-[#090d16] to-black border border-amber-400/20 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-amber-400" />
              <h2 className="text-base font-bold text-white font-mono uppercase tracking-wider">
                Official Commercial Payment Instructions
              </h2>
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              Direct institutional settlement via NEFT / RTGS / IMPS or Corporate UPI. No convenience surcharge.
            </p>
          </div>

          <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-amber-400/10 text-amber-400 border border-amber-400/20 self-start sm:self-auto">
            OFFICIAL LIVRISE BENEFICIARY
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Institutional Bank Transfer */}
          <div className="p-5 rounded-2xl bg-white/2 border border-white/5 space-y-4">
            <h3 className="text-xs font-mono font-semibold text-amber-400 uppercase tracking-wider">
              1. Institutional Bank Transfer (NEFT / RTGS / IMPS)
            </h3>
            <div className="space-y-2.5 text-xs font-mono">
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-zinc-500">Beneficiary Name:</span>
                <span className="text-white font-semibold">LIVRISE INFRASTRUCTURE</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-zinc-500">Account Number:</span>
                <div className="flex items-center gap-2">
                  <span className="text-white font-semibold">50200084920194</span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard('50200084920194', 'acc')}
                    className="text-zinc-400 hover:text-amber-400"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-zinc-500">IFSC Code:</span>
                <div className="flex items-center gap-2">
                  <span className="text-white font-semibold">HDFC0001842</span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard('HDFC0001842', 'ifsc')}
                    className="text-zinc-400 hover:text-amber-400"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-zinc-500">Bank & Branch:</span>
                <span className="text-zinc-300">HDFC Bank, Contai Main Branch</span>
              </div>
            </div>
            {copiedField && (
              <span className="text-[10px] font-mono text-emerald-400 block">
                Copied to clipboard!
              </span>
            )}
          </div>

          {/* Unified Payments Interface (UPI) */}
          <div className="p-5 rounded-2xl bg-white/2 border border-white/5 space-y-4">
            <h3 className="text-xs font-mono font-semibold text-amber-400 uppercase tracking-wider">
              2. Corporate UPI Transfer
            </h3>
            <div className="space-y-2.5 text-xs font-mono">
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-zinc-500">Official UPI ID:</span>
                <div className="flex items-center gap-2">
                  <span className="text-white font-semibold">6296603868@upi</span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard('6296603868@upi', 'upi')}
                    className="text-zinc-400 hover:text-amber-400"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-zinc-500">Beneficiary:</span>
                <span className="text-white font-semibold">LivRise Infrastructure</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-zinc-500">Official Phone Desk:</span>
                <span className="text-zinc-300">+91 6296603868</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={getWhatsAppLink('Hello LivRise Finance Desk, I have completed a payment transfer. Here is my transaction UTR reference: ')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 transition-colors shadow-md shadow-amber-400/20"
              >
                <span>Submit UTR Reference via WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Tax Invoices Table */}
      <section className="p-6 rounded-3xl bg-[#0c1222] border border-white/5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <Receipt className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-semibold text-white font-mono uppercase tracking-wider">
              Milestone Tax Invoices ({invoices.length})
            </h3>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-white/10 text-zinc-400 font-mono">
                <th className="py-3 px-3">Invoice #</th>
                <th className="py-3 px-3">Milestone Scope</th>
                <th className="py-3 px-3">Due Date</th>
                <th className="py-3 px-3 text-right">Amount</th>
                <th className="py-3 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-white/2 transition-colors">
                  <td className="py-3.5 px-3 font-mono font-bold text-amber-400">
                    {inv.invoiceNumber}
                  </td>
                  <td className="py-3.5 px-3 text-white font-medium">
                    {inv.projectName || inv.milestoneName || 'Engineering Phase Delivery'}
                  </td>
                  <td className="py-3.5 px-3 font-mono text-zinc-400">{inv.dueDate}</td>
                  <td className="py-3.5 px-3 font-mono font-semibold text-white text-right">
                    ₹{inv.totalAmount.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold ${
                        inv.status === 'Paid'
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : inv.status === 'Partially Paid'
                          ? 'bg-sky-500/10 text-sky-400'
                          : 'bg-amber-500/10 text-amber-400'
                      }`}
                    >
                      {inv.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Payment Receipts Ledger */}
      <section className="p-6 rounded-3xl bg-[#0c1222] border border-white/5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-semibold text-white font-mono uppercase tracking-wider">
              Settlement Receipts & Verified Transactions
            </h3>
          </div>
        </div>

        <div className="space-y-3">
          {payments.map((p) => (
            <div
              key={p.id}
              className="p-4 rounded-2xl bg-white/2 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div>
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="font-bold text-white">{p.paymentReference}</span>
                  <span className="px-2 py-0.5 rounded bg-white/5 text-zinc-400 text-[10px]">
                    {p.paymentMethod}
                  </span>
                </div>
                <div className="text-[11px] text-zinc-400 font-mono mt-1">
                  Settled on {p.paymentDate} • Linked to Invoice {p.invoiceId}
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0 font-mono">
                <span className="text-base font-bold text-emerald-400">
                  ₹{p.amount.toLocaleString()}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400">
                  VERIFIED
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
