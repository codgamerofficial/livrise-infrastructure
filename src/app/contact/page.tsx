'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { LivRiseNavbar } from '@/components/layout/LivRiseNavbar';
import { LivRiseFooter } from '@/components/layout/LivRiseFooter';
import { useLivRiseStore } from '@/lib/store';
import { SITE_SETTINGS, getWhatsAppLink, getGmailComposeLink } from '@/lib/site-settings';
import {
  Mail,
  Send,
  CheckCircle2,
  ArrowRight,
  Phone,
  Sparkles,
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
    <div className="min-h-screen flex flex-col bg-(--bg-primary) text-(--text-primary) transition-colors duration-200">
      <LivRiseNavbar />

      <main className="flex-1 pt-28 sm:pt-32 pb-24">
        {/* Header */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-10 lg:px-12 border-b border-(--border-subtle) text-center relative overflow-hidden">
          <div className="max-w-4xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-brand-indigo dark:text-brand-blue border border-indigo-500/20 text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official Coordinates</span>
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-(--text-primary)">
              Direct Architectural Desk
            </h1>

            <p className="text-sm sm:text-base text-(--text-secondary) max-w-2xl mx-auto leading-relaxed">
              Connect directly with LivRise Infrastructure for house plans, 3D exterior elevations, interior layout schemes, and turnkey civil execution.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 px-4 sm:px-6 md:px-10 lg:px-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Official Contact Coordinates */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-3xl border border-(--border-subtle) bg-(--surface-primary) p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-widest text-brand-indigo font-bold block">
                    Verified Coordinates
                  </span>
                  <h2 className="text-2xl font-extrabold text-(--text-primary)">
                    {siteSettings?.companyName || SITE_SETTINGS.companyName}
                  </h2>
                  <p className="text-xs font-semibold text-(--text-muted) uppercase tracking-wider">
                    {siteSettings?.descriptor || SITE_SETTINGS.descriptor}
                  </p>
                  <p className="text-xs text-(--text-secondary) italic">
                    &ldquo;{siteSettings?.tagline || SITE_SETTINGS.tagline}&rdquo;
                  </p>
                </div>

                <div className="space-y-4 pt-2 border-t border-(--border-subtle) text-xs">
                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-(--surface-secondary) border border-(--border-subtle)">
                    <div>
                      <div className="font-mono text-[10px] text-(--text-muted) uppercase">
                        Official WhatsApp
                      </div>
                      <div className="font-bold text-sm text-(--text-primary) mt-0.5">
                        {currentWhatsApp}
                      </div>
                    </div>
                    <a
                      href={currentWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-500 text-white font-bold text-xs shadow-xs hover:bg-emerald-600 transition-colors"
                    >
                      Chat
                    </a>
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-(--surface-secondary) border border-(--border-subtle)">
                    <div>
                      <div className="font-mono text-[10px] text-(--text-muted) uppercase">
                        Email Address
                      </div>
                      <div className="font-bold text-xs text-(--text-primary) mt-0.5 break-all">
                        {currentEmail}
                      </div>
                    </div>
                    <a
                      href={currentGmailComposeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-xl bg-brand-indigo text-white font-bold text-xs shadow-xs hover:bg-[#4F46E5] transition-colors"
                    >
                      Compose
                    </a>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-(--text-secondary) space-y-1">
                  <div className="font-bold text-brand-indigo dark:text-brand-blue">
                    Looking for a free project quote?
                  </div>
                  <div>
                    Use our interactive 7-step app onboarding to receive an instant reference ID and customized dossier.
                  </div>
                  <Link
                    href="/start-project"
                    className="inline-flex items-center gap-1 text-brand-indigo dark:text-brand-blue font-bold mt-1 hover:underline"
                  >
                    <span>Start Project Flow</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column: Direct Message Form */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-(--border-subtle) bg-(--surface-primary) p-6 sm:p-8 shadow-xl">
                {submitted ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-(--text-primary)">
                      Message Dispatched!
                    </h3>
                    <p className="text-xs sm:text-sm text-(--text-secondary) max-w-md mx-auto">
                      Thank you for contacting LivRise Infrastructure. Our engineering coordinator will respond promptly via your specified channels.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="px-5 py-2.5 rounded-xl bg-brand-indigo text-white text-xs font-bold"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="text-xl font-extrabold text-(--text-primary)">
                        Send a Direct Message
                      </h3>
                      <p className="text-xs text-(--text-secondary)">
                        Fill in your brief to connect with our design desk.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div>
                        <label className="block text-xs font-bold text-(--text-secondary) mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-(--border-subtle) bg-(--surface-secondary) text-xs text-(--text-primary) focus:outline-none focus:border-brand-indigo"
                          placeholder="Your name"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-(--text-secondary) mb-1">
                          Phone / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-(--border-subtle) bg-(--surface-secondary) text-xs text-(--text-primary) focus:outline-none focus:border-brand-indigo"
                          placeholder="+91 ..."
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-(--text-secondary) mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-(--border-subtle) bg-(--surface-secondary) text-xs text-(--text-primary) focus:outline-none focus:border-brand-indigo"
                          placeholder="name@example.com"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-(--text-secondary) mb-1">
                          Project Brief / Requirements *
                        </label>
                        <textarea
                          rows={4}
                          required
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-(--border-subtle) bg-(--surface-secondary) text-xs text-(--text-primary) focus:outline-none focus:border-brand-indigo"
                          placeholder="Describe your site location, plot size, or building requirements..."
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-xl bg-linear-to-r from-brand-indigo to-brand-blue text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
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
