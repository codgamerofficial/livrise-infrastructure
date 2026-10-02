'use client';

import React from 'react';
import { LivRiseNavbar } from '@/components/layout/LivRiseNavbar';
import { LivRiseFooter } from '@/components/layout/LivRiseFooter';
import { ShieldCheck, Lock, FileText } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white selection:bg-white selection:text-black">
      <LivRiseNavbar />

      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-16 space-y-10">
          <div className="border-b border-white/10 pb-6 space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-medium block">
              Legal & Data Protection
            </span>
            <h1 className="text-3xl sm:text-4xl font-normal tracking-tight text-white">
              LivRise Privacy Policy
            </h1>
            <p className="text-xs text-zinc-400 font-mono">
              Governs LivRise Infrastructure Engineering & Architecture Platform
            </p>
          </div>

          <div className="space-y-8 text-sm text-zinc-300 leading-relaxed font-light">
            <section className="liquid-glass border border-white/10 rounded-2xl p-7 space-y-3">
              <h2 className="text-base font-medium text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-white" />
                1. Commitment to Technical Data Confidentiality
              </h2>
              <p>
                At LivRise Infrastructure, accessible from <strong className="text-white">https://livrise.in</strong>, the confidentiality of client engineering specifications, architectural drawings, structural calculations, and financial documentation is paramount.
              </p>
            </section>

            <section className="liquid-glass border border-white/10 rounded-2xl p-7 space-y-3">
              <h2 className="text-base font-medium text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-white" />
                2. Information Collection and Storage
              </h2>
              <p>
                When you initiate a project enquiry or utilize our digital services, we collect project parameters including plot dimensions, soil surveys, municipal requirements, and contact identifiers. All private engineering documents uploaded to the platform are secured with strict access controls and encrypted storage.
              </p>
            </section>

            <section className="liquid-glass border border-white/10 rounded-2xl p-7 space-y-3">
              <h2 className="text-base font-medium text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-white" />
                3. Non-Disclosure of Proprietary Drawings
              </h2>
              <p>
                Architectural schematics, structural finite element calculation models, and Bill of Quantities (BOQ) files belonging to a client will never be published, transferred, or made accessible to third parties or other clients without explicit written consent.
              </p>
            </section>
          </div>
        </div>
      </main>

      <LivRiseFooter />
    </div>
  );
}
