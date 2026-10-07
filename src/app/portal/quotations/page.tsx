'use client';

import React, { useState } from 'react';
import { useLivRiseStore } from '@/lib/store';
import { useAuth } from '@/lib/auth-context';
import {
  FileCheck,
  CheckCircle2,
  XCircle,
  Printer,
  Calendar,
  Building,
  Shield,
  Layers,
  ArrowRight,
  Download,
  AlertCircle,
} from 'lucide-react';
import { LivRiseLogo } from '@/components/ui/LivRiseLogo';

export default function ClientQuotationsPage() {
  const { user } = useAuth();
  const { quotations, updateQuotationStatus } = useLivRiseStore();

  const [selectedQuotationId, setSelectedQuotationId] = useState<string>(
    quotations[0]?.id || ''
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const selectedQuotation =
    quotations.find((q) => q.id === selectedQuotationId) || quotations[0];

  const handleAccept = () => {
    if (!selectedQuotation) return;
    updateQuotationStatus(selectedQuotation.id, 'Accepted', `Accepted by ${user?.fullName || 'Client'}`);
    setToastMessage(`Quotation ${selectedQuotation.quotationNumber} accepted. Acceptance timestamp logged.`);
    setTimeout(() => setToastMessage(null), 5000);
  };

  const handleReject = () => {
    if (!selectedQuotation) return;
    updateQuotationStatus(selectedQuotation.id, 'Revision Requested', 'Client requested scope adjustment.');
    setToastMessage(`Revision requested for ${selectedQuotation.quotationNumber}. Team notified.`);
    setTimeout(() => setToastMessage(null), 5000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5 print:hidden">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-1">
            <Shield className="w-3.5 h-3.5" />
            <span>Official Commercial Estimates</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
            Engineering Quotations & Estimates
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Review detailed BOQ itemizations, architectural scopes, and sign off digitally.
          </p>
        </div>

        {selectedQuotation && (
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono font-medium text-white hover:bg-white/10 transition-colors self-start sm:self-auto"
          >
            <Printer className="w-4 h-4 text-amber-400" />
            <span>Print / PDF Document</span>
          </button>
        )}
      </div>

      {/* Toast Alert */}
      {toastMessage && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5 animate-in fade-in print:hidden">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Two-Column Layout: Selector & PDF Paper */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Quotations List Selector (Hidden on print) */}
        <div className="space-y-3 print:hidden">
          <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
            Issued Quotations ({quotations.length})
          </h3>

          <div className="space-y-2">
            {quotations.map((q) => {
              const isSelected = q.id === selectedQuotation?.id;
              return (
                <div
                  key={q.id}
                  onClick={() => setSelectedQuotationId(q.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-amber-400/10 border-amber-400/50 shadow-md shadow-amber-400/5'
                      : 'bg-[#0c1222] border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-amber-400 font-bold">
                      {q.quotationNumber}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        q.status === 'Accepted'
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : q.status === 'Sent'
                          ? 'bg-amber-500/10 text-amber-400'
                          : 'bg-white/5 text-zinc-400'
                      }`}
                    >
                      {q.status}
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-white mt-1.5">{q.serviceTitle}</h4>
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mt-2">
                    <span>Valid: {q.validUntil}</span>
                    <span className="text-white font-bold">₹{q.grandTotal.toLocaleString()}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Formal Quotation Document (Printable) */}
        <div className="lg:col-span-2">
          {selectedQuotation ? (
            <div className="p-6 sm:p-10 rounded-3xl bg-[#0c1222] border border-white/10 space-y-8 text-white print:bg-white print:text-black print:p-0 print:border-none shadow-2xl">
              {/* Document Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-white/10 print:border-black/20">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <LivRiseLogo size="sm" asLink={false} />
                  </div>
                  <div className="text-xs text-zinc-400 print:text-zinc-600 font-mono space-y-0.5">
                    <p>LivRise Infrastructure</p>
                    <p>Engineering • Architecture • Infrastructure</p>
                    <p>Contai & Kolkata, West Bengal, India</p>
                    <p>Email: livriseinfrastructure@gmail.com • Phone: +91 6296603868</p>
                  </div>
                </div>

                <div className="text-left sm:text-right space-y-1 font-mono text-xs">
                  <div className="text-amber-400 print:text-amber-700 font-bold text-sm">
                    COMMERCIAL ESTIMATE
                  </div>
                  <div className="text-white print:text-black font-semibold">
                    {selectedQuotation.quotationNumber}
                  </div>
                  <div className="text-zinc-400 print:text-zinc-600">
                    Date: {new Date(selectedQuotation.createdAt).toLocaleDateString()}
                  </div>
                  <div className="text-zinc-400 print:text-zinc-600">
                    Valid Until: {selectedQuotation.validUntil}
                  </div>
                  <div className="pt-1">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold ${
                        selectedQuotation.status === 'Accepted'
                          ? 'bg-emerald-500/20 text-emerald-400 print:text-emerald-700'
                          : 'bg-amber-400/20 text-amber-400 print:text-amber-700'
                      }`}
                    >
                      STATUS: {selectedQuotation.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Client & Project Information */}
              <div className="grid grid-cols-2 gap-4 text-xs font-mono bg-white/2 print:bg-zinc-100 p-4 rounded-2xl">
                <div>
                  <span className="text-zinc-500 block uppercase text-[10px]">Client Details:</span>
                  <p className="font-semibold text-white print:text-black mt-0.5">
                    {selectedQuotation.clientName}
                  </p>
                  <p className="text-zinc-400 print:text-zinc-700">{selectedQuotation.clientEmail || user?.email}</p>
                </div>
                <div>
                  <span className="text-zinc-500 block uppercase text-[10px]">Project Scope:</span>
                  <p className="font-semibold text-white print:text-black mt-0.5">
                    {selectedQuotation.projectName || selectedQuotation.serviceTitle}
                  </p>
                  <p className="text-zinc-400 print:text-zinc-700">Turnkey Technical Specification</p>
                </div>
              </div>

              {/* Items BOQ Breakdown Table */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 print:text-zinc-600">
                  Itemized Scope of Work
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="border-b border-white/10 print:border-black/20 text-zinc-400 print:text-zinc-600 font-mono">
                        <th className="py-2 pr-4">Description</th>
                        <th className="py-2 px-2 text-center">Unit</th>
                        <th className="py-2 px-2 text-right">Rate</th>
                        <th className="py-2 pl-4 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 print:divide-black/10">
                      {selectedQuotation.items?.map((item, i) => (
                        <tr key={i}>
                          <td className="py-3 pr-4">
                            <div className="font-medium text-white print:text-black">
                              {item.description}
                            </div>
                          </td>
                          <td className="py-3 px-2 text-center text-zinc-400 print:text-zinc-600 font-mono">
                            {item.quantity} {item.unit}
                          </td>
                          <td className="py-3 px-2 text-right text-zinc-400 print:text-zinc-600 font-mono">
                            ₹{item.unitPrice?.toLocaleString()}
                          </td>
                          <td className="py-3 pl-4 text-right font-mono font-semibold text-white print:text-black">
                            ₹{(item.amount || item.total || 0).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Totals Breakdown */}
              <div className="pt-4 border-t border-white/10 print:border-black/20 flex justify-end font-mono text-xs">
                <div className="w-64 space-y-2">
                  <div className="flex justify-between text-zinc-400 print:text-zinc-600">
                    <span>Subtotal:</span>
                    <span>₹{selectedQuotation.subtotal?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400 print:text-zinc-600">
                    <span>GST (18%):</span>
                    <span>₹{selectedQuotation.taxAmount?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-amber-400 print:text-amber-800 pt-2 border-t border-white/10 print:border-black/20">
                    <span>Total Estimate:</span>
                    <span>₹{selectedQuotation.grandTotal?.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Terms and Acceptance Footer */}
              <div className="pt-4 border-t border-white/10 print:border-black/20 space-y-2 text-[11px] text-zinc-400 print:text-zinc-600">
                <p className="font-mono font-semibold uppercase text-zinc-300 print:text-zinc-800">
                  Terms & Conditions:
                </p>
                <ul className="list-disc list-inside space-y-0.5">
                  <li>Payment milestone schedule: 20% advance upon contract sign-off, 40% on design approval, 40% on handover.</li>
                  <li>All structural designs adhere to Bureau of Indian Standards (IS 456:2000, IS 1893:2016).</li>
                  <li>Changes in architectural layout post client approval will be quoted under separate revision annexure.</li>
                </ul>
              </div>

              {/* Client Action Buttons (Hidden on Print) */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
                <div className="text-xs text-zinc-400">
                  {selectedQuotation.status === 'Accepted' ? (
                    <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      Digitally Signed & Accepted
                    </span>
                  ) : (
                    <span>Awaiting Client Sign-off</span>
                  )}
                </div>

                {selectedQuotation.status !== 'Accepted' && (
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handleReject}
                      className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-zinc-300 hover:bg-white/10 transition-colors"
                    >
                      Request Modification
                    </button>
                    <button
                      type="button"
                      onClick={handleAccept}
                      className="px-5 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/20"
                    >
                      Accept & Sign Digitally
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-12 text-center rounded-3xl bg-[#0c1222] border border-white/5">
              <FileCheck className="w-10 h-10 text-zinc-600 mx-auto mb-2" />
              <p className="text-sm text-zinc-400">No quotation selected.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
