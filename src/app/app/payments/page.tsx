'use client';

import React, { useState } from 'react';
import { useLivRiseStore } from '@/lib/store';
import {
  CreditCard,
  Download,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Receipt,
  ExternalLink,
} from 'lucide-react';
import { AppEmptyState } from '@/components/app/AppEmptyState';
import { MobileBottomSheet } from '@/components/app/MobileBottomSheet';

export default function ClientPaymentsPage() {
  const { invoices, payments, recordPayment, currentUser } = useLivRiseStore();
  const [selectedInvoice, setSelectedInvoice] = useState<(typeof invoices)[0] | null>(null);
  const [isPayOpen, setIsPayOpen] = useState(false);
  const [payAmount, setPayAmount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState('UPI / Net Banking');
  const [paySuccess, setPaySuccess] = useState(false);

  // Compute financial metrics
  const totalBilled = invoices.reduce((acc, inv) => acc + inv.totalAmount, 0);
  const totalPaid = invoices.reduce((acc, inv) => acc + (inv.amountPaid || 0), 0);
  const balanceDue = invoices.reduce((acc, inv) => acc + (inv.balanceDue || 0), 0);

  const handleOpenPay = (inv: (typeof invoices)[0]) => {
    setSelectedInvoice(inv);
    setPayAmount(inv.balanceDue || inv.totalAmount);
    setIsPayOpen(true);
  };

  const handleConfirmPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInvoice || payAmount <= 0) return;

    recordPayment({
      invoiceId: selectedInvoice.id,
      invoiceNumber: selectedInvoice.invoiceNumber,
      projectId: selectedInvoice.projectId,
      projectName: selectedInvoice.projectName,
      clientId: selectedInvoice.clientId,
      clientName: selectedInvoice.clientName,
      amount: payAmount,
      currency: selectedInvoice.currency || 'INR',
      paymentMethod,
      status: 'Successful',
      paymentDate: new Date().toISOString().split('T')[0],
      transactionId: `TXN-${Date.now()}`,
    });

    setPaySuccess(true);
    setTimeout(() => {
      setPaySuccess(false);
      setIsPayOpen(false);
      setSelectedInvoice(null);
    }, 1800);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-1">
          <span>Billing & Financial Schedules</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
          Invoices & Payments
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Itemized tax invoices, stage release schedules, and verified digital receipts.
        </p>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl liquid-glass border border-white/10">
          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
            Total Invoiced
          </span>
          <span className="text-xl sm:text-2xl font-bold font-mono text-white block mt-1">
            INR {totalBilled.toLocaleString()}
          </span>
          <span className="text-[11px] text-zinc-500 mt-1 block">
            Across {invoices.length} billing cycle{invoices.length === 1 ? '' : 's'}
          </span>
        </div>

        <div className="p-5 rounded-2xl liquid-glass border border-emerald-500/20 bg-emerald-950/10">
          <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block">
            Total Paid
          </span>
          <span className="text-xl sm:text-2xl font-bold font-mono text-emerald-300 block mt-1">
            INR {totalPaid.toLocaleString()}
          </span>
          <span className="text-[11px] text-emerald-500/70 mt-1 block">
            Reconciled & verified
          </span>
        </div>

        <div className="p-5 rounded-2xl liquid-glass border border-amber-500/20 bg-amber-950/10">
          <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block">
            Balance Due
          </span>
          <span className="text-xl sm:text-2xl font-bold font-mono text-amber-300 block mt-1">
            INR {balanceDue.toLocaleString()}
          </span>
          <span className="text-[11px] text-amber-500/70 mt-1 block">
            {balanceDue > 0 ? 'Pending stage releases' : 'All accounts settled'}
          </span>
        </div>
      </div>

      {/* Invoices List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-white tracking-tight">Tax Invoices</h2>
          <span className="text-xs font-mono text-zinc-500">{invoices.length} Invoices</span>
        </div>

        {invoices.length > 0 ? (
          <div className="space-y-3">
            {invoices.map((inv) => {
              const isPaid = inv.status === 'Paid';
              return (
                <div
                  key={inv.id}
                  className="arch-card p-5 rounded-3xl border border-white/10 bg-black/60 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5">
                      <span className="font-semibold text-white text-base">
                        {inv.invoiceNumber}
                      </span>
                      <span
                        className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full ${
                          isPaid
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}
                      >
                        {inv.status}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-400">
                      Project: {inv.projectName || 'LivRise Infrastructure'} • Due on: {inv.dueDate}
                    </p>

                    <div className="text-[11px] text-zinc-500">
                      Payment Terms: {inv.paymentTerms}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between md:justify-end gap-4 pt-3 md:pt-0 border-t md:border-t-0 border-white/10">
                    <div className="text-left md:text-right">
                      <div className="text-[10px] font-mono text-zinc-400 uppercase">
                        Invoice Total
                      </div>
                      <div className="text-lg font-bold font-mono text-white">
                        {inv.currency} {inv.totalAmount.toLocaleString()}
                      </div>
                      {!isPaid && (
                        <div className="text-[10px] text-amber-400 font-mono">
                          Due: {inv.currency} {inv.balanceDue.toLocaleString()}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => alert(`Downloading verified PDF for ${inv.invoiceNumber}`)}
                        className="p-2.5 rounded-xl bg-white/10 hover:bg-white text-zinc-300 hover:text-black transition-colors"
                        title="Download Tax Invoice"
                      >
                        <Download className="w-4 h-4" />
                      </button>

                      {!isPaid && (
                        <button
                          type="button"
                          onClick={() => handleOpenPay(inv)}
                          className="px-4 py-2 rounded-xl bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors shadow-sm"
                        >
                          Pay Online
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <AppEmptyState
            icon={CreditCard}
            title="No invoices available"
            description="Your milestone invoices will be published here upon stage completion."
          />
        )}
      </div>

      {/* Payment History Records */}
      {payments.length > 0 && (
        <div className="space-y-3 pt-4">
          <h3 className="text-sm font-semibold text-white tracking-tight">Recent Payment Receipts</h3>
          <div className="space-y-2">
            {payments.map((p) => (
              <div
                key={p.id}
                className="p-3.5 rounded-2xl liquid-glass border border-white/10 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                    <Receipt className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-white font-medium">{p.paymentReference}</div>
                    <div className="text-[10px] text-zinc-400 font-mono">
                      Invoice: {p.invoiceNumber} • {p.paymentMethod}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-mono font-bold text-emerald-400">
                    + {p.currency} {p.amount.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-zinc-500 font-mono">
                    {p.paymentDate || p.paidAt || '2026'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pay Modal Sheet */}
      <MobileBottomSheet
        isOpen={isPayOpen}
        onClose={() => setIsPayOpen(false)}
        title="Complete Milestone Payment"
      >
        {paySuccess ? (
          <div className="py-8 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-semibold text-white">Payment Recorded</h4>
            <p className="text-xs text-zinc-400 mt-1 max-w-xs">
              Transaction reference has been generated and your invoice balance updated.
            </p>
          </div>
        ) : (
          <form onSubmit={handleConfirmPayment} className="space-y-4">
            <div>
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">
                Invoice Details
              </span>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-zinc-300">
                <div className="flex justify-between">
                  <span>Invoice:</span>
                  <span className="font-semibold text-white">{selectedInvoice?.invoiceNumber}</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span>Balance Due:</span>
                  <span className="font-mono text-amber-400 font-bold">
                    {selectedInvoice?.currency} {selectedInvoice?.balanceDue.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                Payment Amount (INR)
              </label>
              <input
                type="number"
                required
                min={1}
                max={selectedInvoice?.balanceDue || 10000000}
                value={payAmount}
                onChange={(e) => setPayAmount(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-mono focus:border-amber-400/50 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                Payment Method
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:border-amber-400/50 focus:outline-none"
              >
                <option value="UPI / QR Code">UPI (GPay / PhonePe / Paytm)</option>
                <option value="NEFT / RTGS Bank Transfer">NEFT / RTGS Corporate Account</option>
                <option value="Credit / Debit Card">Credit / Debit Card</option>
                <option value="Net Banking">Net Banking</option>
              </select>
            </div>

            <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/5 text-[11px] text-zinc-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Payments are processed with 256-bit banking grade encryption.</span>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsPayOpen(false)}
                className="px-4 py-2 text-xs text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors shadow-sm"
              >
                Authorize Payment
              </button>
            </div>
          </form>
        )}
      </MobileBottomSheet>
    </div>
  );
}
