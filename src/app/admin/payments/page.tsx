'use client';

import React, { useState } from 'react';
import { useLivRiseStore } from '@/lib/store';
import {
  Receipt,
  Search,
  CheckCircle,
  Building,
  CreditCard,
  Calendar,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';

export default function AdminPaymentsPage() {
  const { payments, clients, invoices } = useLivRiseStore();
  const [searchQuery, setSearchQuery] = useState('');

  const totalSettled = payments
    .filter((p) => p.status === 'Successful')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const filteredPayments = payments.filter((p) => {
    const client = clients.find((c) => c.id === p.clientId);
    return (
      p.paymentReference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (client?.companyName && client.companyName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.paymentMethod.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white font-mono flex items-center gap-2">
            <Receipt className="w-6 h-6 text-emerald-400" />
            PAYMENTS & SETTLEMENTS LEDGER
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Provider-agnostic treasury ledger, bank reconciliation, and verified transaction receipts.
          </p>
        </div>

        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-right">
          <span className="text-[10px] font-mono text-emerald-400 block uppercase">
            Total Capital Settled
          </span>
          <span className="text-lg font-bold font-mono text-white">
            ₹{totalSettled.toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
        <input
          type="text"
          placeholder="Search by transaction reference (TXN-...), client name, payment mode..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0c1222] border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-emerald-400/50"
        />
      </div>

      {/* Ledger Table */}
      <div className="bg-[#0c1222] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0a0f1d] border-b border-white/5 font-mono text-slate-400 uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4">Transaction Ref</th>
                <th className="py-3 px-4">Client Account</th>
                <th className="py-3 px-4">Invoice #</th>
                <th className="py-3 px-4">Gateway / Mode</th>
                <th className="py-3 px-4">Settlement Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {filteredPayments.map((p) => {
                const client = clients.find((c) => c.id === p.clientId);
                const invoice = invoices.find((i) => i.id === p.invoiceId);

                return (
                  <tr key={p.id} className="hover:bg-white/2 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-emerald-400">
                      {p.paymentReference}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white">{client?.companyName}</div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        {client?.clientCode}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-300">
                      {invoice?.invoiceNumber || 'Milestone Retainer'}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px]">
                      <span className="text-white font-medium">{p.paymentMethod}</span>
                      <span className="block text-[10px] text-slate-500">{p.gateway}</span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-400">{p.paidAt}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-white text-sm">
                      ₹{p.amount.toLocaleString('en-IN')}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
