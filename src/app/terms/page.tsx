'use client';

import React from 'react';
import { LivRiseNavbar } from '@/components/layout/LivRiseNavbar';
import { LivRiseFooter } from '@/components/layout/LivRiseFooter';
import { FileCheck, Shield, AlertTriangle } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white selection:bg-white selection:text-black">
      <LivRiseNavbar />

      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-16 space-y-10">
          <div className="border-b border-white/10 pb-6 space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-medium block">
              Legal Agreement
            </span>
            <h1 className="text-3xl sm:text-4xl font-normal tracking-tight text-white">
              Terms of Consulting & Service
            </h1>
            <p className="text-xs text-zinc-400 font-mono">
              Governing All LivRise Infrastructure Engineering & Architecture Engagements
            </p>
          </div>

          <div className="space-y-8 text-sm text-zinc-300 leading-relaxed font-light">
            <section className="liquid-glass border border-white/10 rounded-2xl p-7 space-y-3">
              <h2 className="text-base font-medium text-white flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-white" />
                1. Scope of Engineering Consultation
              </h2>
              <p>
                LivRise Infrastructure provides architectural design, structural engineering analysis, civil infrastructure planning, and project management consultancy. All calculation books and Good-for-Construction (GFC) drawing packages conform strictly to relevant national and international building standards as specified in formal client engagement agreements.
              </p>
            </section>

            <section className="liquid-glass border border-white/10 rounded-2xl p-7 space-y-3">
              <h2 className="text-base font-medium text-white flex items-center gap-2">
                <Shield className="w-4 h-4 text-white" />
                2. Quotations, Milestone Releases & Acceptance
              </h2>
              <p>
                Quotations issued by LivRise Infrastructure specify itemized rates, taxes, and validity periods. Client electronic acceptance of a quotation constitutes a binding service order. Milestone payments must be released in accordance with agreed schedules prior to subsequent design tier deliveries.
              </p>
            </section>

            <section className="liquid-glass border border-white/10 rounded-2xl p-7 space-y-3">
              <h2 className="text-base font-medium text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-white" />
                3. Site Vetting & Soil Mechanics Verification
              </h2>
              <p>
                Structural designs are predicated upon authentic geotechnical soil investigation reports provided by certified testing laboratories. LivRise Infrastructure is not liable for structural discrepancies arising from unnotified changes to site ground conditions or unauthorized contractor deviations from issued GFC drawings without written engineering signoff.
              </p>
            </section>
          </div>
        </div>
      </main>

      <LivRiseFooter />
    </div>
  );
}
