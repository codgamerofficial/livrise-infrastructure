'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { LivRiseNavbar } from '@/components/layout/LivRiseNavbar';
import { LivRiseFooter } from '@/components/layout/LivRiseFooter';
import { useLivRiseStore } from '@/lib/store';
import { SITE_SETTINGS, getWhatsAppLink, getGmailComposeLink } from '@/lib/site-settings';
import {
  Send,
  CheckCircle2,
  ArrowRight,
  Phone,
  Mail,
  Compass,
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const { submitEnquiry, siteSettings = SITE_SETTINGS } = useLivRiseStore();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: 'New Home',
    location: '',
    message: '',
    budget: '',
    timeline: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.message) return;

    setIsSubmitting(true);

    const createdLead = submitEnquiry({
      fullName: formData.name,
      email: formData.email,
      phone: formData.phone,
      companyName: formData.company,
      preferredContactMethod: 'whatsapp',
      serviceRequired: 'Technical Consultation',
      projectType: formData.projectType,
      country: 'India',
      state: '',
      city: formData.location || '',
      pinCode: '',
      estimatedBudget: formData.budget,
      expectedStartDate: formData.timeline,
      requirements: formData.message,
      source: 'LivRise Contact Form',
    });

    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          enquiryNumber: createdLead.enquiryNumber,
          fullName: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          projectType: formData.projectType,
          location: formData.location,
          message: formData.message,
          budget: formData.budget,
          timeline: formData.timeline,
          source: 'LivRise Contact Form',
        }),
      });
    } catch (err) {
      console.error('[ContactPage] Notification dispatch error:', err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  const currentWhatsApp = siteSettings?.displayWhatsApp || SITE_SETTINGS.displayWhatsApp;
  const currentEmail = siteSettings?.contactEmail || SITE_SETTINGS.contactEmail;
  const currentWhatsAppUrl = siteSettings?.whatsappUrl || getWhatsAppLink();
  const currentGmailComposeUrl = getGmailComposeLink(
    siteSettings?.defaultEmailSubject,
    siteSettings?.defaultEmailBody,
    currentEmail
  );

  return (
    <div className="min-h-screen flex flex-col bg-brand-obsidian text-[#F5F5F3] selection:bg-brand-gold selection:text-black">
      <LivRiseNavbar />

      <main className="flex-1 pt-28 sm:pt-32 pb-24">
        {/* Header */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-10 lg:px-12 border-b border-zinc-800 text-center relative overflow-hidden bg-brand-obsidian">
          <div className="absolute inset-0 blueprint-grid opacity-25 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-4xl mx-auto space-y-4 relative z-10">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-charcoal border border-brand-gold/30 text-brand-gold-bright text-xs font-semibold tracking-widest uppercase">
              <Compass className="w-3.5 h-3.5 text-brand-gold-bright" />
              <span>Official Coordinates</span>
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Direct Architectural <span className="gold-gradient-text">Desk</span>
            </h1>

            <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Connect directly with LivRise Infrastructure for house plans, 3D exterior elevations, interior layout schemes, and turnkey civil execution.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-10 lg:px-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Official Contact Coordinates */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-2xl border border-zinc-800 bg-brand-charcoal p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-gold-bright block">
                    Verified Coordinates
                  </span>
                  <h2 className="text-2xl font-extrabold text-white">
                    {siteSettings?.companyName || SITE_SETTINGS.companyName}
                  </h2>
                  <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    {siteSettings?.descriptor || SITE_SETTINGS.descriptor}
                  </p>
                  <p className="text-xs text-zinc-500 italic">
                    &ldquo;{siteSettings?.tagline || SITE_SETTINGS.tagline}&rdquo;
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-zinc-800 text-xs">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-brand-obsidian border border-zinc-800">
                    <div>
                      <div className="font-mono text-[10px] text-zinc-500 uppercase">
                        Official WhatsApp
                      </div>
                      <div className="font-bold text-sm text-white mt-0.5">
                        {currentWhatsApp}
                      </div>
                    </div>
                    <a
                      href={currentWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-lg bg-brand-graphite hover:bg-brand-gold-bright text-zinc-200 hover:text-black border border-zinc-700 hover:border-brand-gold-bright font-bold text-xs transition-all flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5 text-brand-gold-bright" />
                      <span>Chat</span>
                    </a>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-brand-obsidian border border-zinc-800">
                    <div>
                      <div className="font-mono text-[10px] text-zinc-500 uppercase">
                        Email Address
                      </div>
                      <div className="font-bold text-xs text-white mt-0.5 break-all">
                        {currentEmail}
                      </div>
                    </div>
                    <a
                      href={currentGmailComposeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-lg bg-brand-graphite hover:bg-brand-gold-bright text-zinc-200 hover:text-black border border-zinc-700 hover:border-brand-gold-bright font-bold text-xs transition-all flex items-center gap-1.5"
                    >
                      <Mail className="w-3.5 h-3.5 text-brand-gold-bright" />
                      <span>Compose</span>
                    </a>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-brand-graphite border border-brand-gold/30 text-xs text-zinc-300 space-y-1">
                  <div className="font-bold text-brand-gold-bright">
                    Looking for a free project quote?
                  </div>
                  <div>
                    Use our interactive 7-step app onboarding to receive an instant reference ID and customized dossier.
                  </div>
                  <Link
                    href="/start-project"
                    className="inline-flex items-center gap-1 text-brand-gold-bright font-bold mt-1.5 hover:underline"
                  >
                    <span>Start Project Flow</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column: Direct Message Form */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-zinc-800 bg-brand-charcoal p-6 sm:p-8 shadow-xl">
                {submitted ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-brand-graphite border border-brand-gold-bright/40 text-brand-gold-bright flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      Message Dispatched!
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
                      Thank you for contacting LivRise Infrastructure. Our engineering coordinator will respond promptly via your specified channels.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="gold-button px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="text-xl font-extrabold text-white">
                        Send a Direct Message
                      </h3>
                      <p className="text-xs text-zinc-400">
                        Fill in your brief to connect with our design desk.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div>
                        <label className="block text-xs font-bold text-zinc-300 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-zinc-700 bg-brand-obsidian text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-brand-gold-bright"
                          placeholder="Your name"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-zinc-300 mb-1">
                          Phone / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-zinc-700 bg-brand-obsidian text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-brand-gold-bright"
                          placeholder="+91 ..."
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-zinc-300 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-zinc-700 bg-brand-obsidian text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-brand-gold-bright"
                          placeholder="name@example.com"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-zinc-300 mb-1">
                          Project Brief / Requirements *
                        </label>
                        <textarea
                          rows={4}
                          required
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-zinc-700 bg-brand-obsidian text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-brand-gold-bright"
                          placeholder="Describe your site location, plot size, or building requirements..."
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="gold-button w-full py-3.5 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <LivRiseFooter />
    </div>
  );
}
