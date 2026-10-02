'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { LivRiseNavbar } from '@/components/layout/LivRiseNavbar';
import { LivRiseFooter } from '@/components/layout/LivRiseFooter';
import { useLivRiseStore } from '@/lib/store';
import { SITE_SETTINGS, getWhatsAppLink, getGmailComposeLink } from '@/lib/site-settings';
import { EmailContactButton } from '@/components/ui/EmailContactButton';
import {
  Mail,
  Send,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

export default function ContactPage() {
  const { submitEnquiry, siteSettings = SITE_SETTINGS } = useLivRiseStore();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: 'Commercial',
    location: '',
    message: '',
    budget: '',
    timeline: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.message) return;

    setIsSubmitting(true);

    // 1. Save enquiry to database/store
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

    // 2. Dispatch transactional email notification via backend API route (does NOT open client mailto)
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
      // 3. Show success confirmation
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
    <div className="min-h-screen flex flex-col bg-black text-white selection:bg-white selection:text-black">
      <LivRiseNavbar />

      <main className="flex-1 pt-32 pb-24">
        {/* Header */}
        <section className="py-20 px-6 md:px-12 lg:px-16 border-b border-white/10 bg-black text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-medium block">
              Direct Contact & Engineering Desk
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white leading-tight">
              Let&apos;s build what&apos;s next.
            </h1>
            <p className="text-sm md:text-base text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed">
              Connect directly with LivRise Infrastructure for structural engineering, architectural planning, and infrastructure consultation.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 px-6 md:px-12 lg:px-16">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Official Contact Section */}
            <div className="lg:col-span-5 space-y-6">
              <div className="liquid-glass border border-white/15 rounded-3xl p-8 sm:p-10 space-y-8 shadow-2xl relative overflow-hidden">
                {/* Accent glow */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

                {/* Company & Positioning */}
                <div className="space-y-3">
                  <span className="text-[11px] uppercase tracking-widest text-zinc-400 font-mono block">
                    Official Contact
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                    {siteSettings?.companyName || SITE_SETTINGS.companyName}
                  </h2>
                  <p className="text-xs uppercase tracking-wider text-amber-300/90 font-medium">
                    {siteSettings?.descriptor || SITE_SETTINGS.descriptor}
                  </p>
                  <p className="text-sm text-zinc-300 font-light italic">
                    &ldquo;{siteSettings?.tagline || SITE_SETTINGS.tagline}&rdquo;
                  </p>
                </div>

                {/* Approved Coordinates */}
                <div className="space-y-5 pt-4 border-t border-white/10 text-sm">
                  {/* WhatsApp */}
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.074-2.121-.527-1.745-.734-2.852-2.545-2.937-2.66-.086-.115-.705-.939-.705-1.791 0-.853.447-1.272.607-1.446.16-.174.349-.217.465-.217.117 0 .233.002.334.007.106.005.249-.04.39.298.144.348.491 1.199.534 1.286.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.303c-.087.087-.178.182-.076.357.101.174.453.748.971 1.21.668.595 1.232.78 1.406.867.174.086.275.072.376-.044.102-.115.434-.506.55-.679.115-.174.231-.145.39-.087.159.058 1.009.477 1.182.564.173.086.289.13.332.202.043.072.043.419-.101.824z" />
                      </svg>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs uppercase font-mono tracking-wider text-zinc-400 block">
                        WhatsApp
                      </span>
                      <a
                        href={currentWhatsAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-white hover:text-emerald-400 transition-colors text-base flex items-center gap-1.5"
                      >
                        <span>{currentWhatsApp}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-white/10 border border-white/15 text-white shrink-0">
                      <Mail className="w-5 h-5 text-zinc-300" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs uppercase font-mono tracking-wider text-zinc-400 block">
                        Email
                      </span>
                      <a
                        href={currentGmailComposeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Open Gmail Compose"
                        className="font-medium text-white hover:text-amber-300 transition-colors text-base flex items-center gap-1.5 break-all group/email"
                      >
                        <span>{currentEmail}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-zinc-400 group-hover/email:text-amber-300 shrink-0" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                  <a
                    href={currentWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 px-5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40"
                  >
                    <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.074-2.121-.527-1.745-.734-2.852-2.545-2.937-2.66-.086-.115-.705-.939-.705-1.791 0-.853.447-1.272.607-1.446.16-.174.349-.217.465-.217.117 0 .233.002.334.007.106.005.249-.04.39.298.144.348.491 1.199.534 1.286.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.303c-.087.087-.178.182-.076.357.101.174.453.748.971 1.21.668.595 1.232.78 1.406.867.174.086.275.072.376-.044.102-.115.434-.506.55-.679.115-.174.231-.145.39-.087.159.058 1.009.477 1.182.564.173.086.289.13.332.202.043.072.043.419-.101.824z" />
                    </svg>
                    <span>WhatsApp Us</span>
                  </a>

                  {/* Reusable EmailContactButton opening Gmail Compose */}
                  <EmailContactButton
                    label="Email Us"
                    variant="outline"
                    className="w-full py-3 justify-center text-sm"
                    showFallbackCopy
                  />

                  <Link
                    href="/start-project"
                    className="w-full bg-white text-black py-3 px-5 rounded-xl text-sm font-semibold hover:bg-zinc-100 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-white/10"
                  >
                    <span>Start a Project</span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7">
              <div className="liquid-glass border border-white/15 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6">
                <div className="border-b border-white/10 pb-5">
                  <h3 className="text-xl font-normal text-white tracking-tight">
                    Start a Conversation
                  </h3>
                  <p className="text-xs text-zinc-400 font-light mt-1">
                    Fill out the parameters below to initiate an engineering consultation.
                  </p>
                </div>

                {submitted ? (
                  /* Section 8 & 10 Approved Success State */
                  <div className="py-12 text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-2xl font-medium text-white">
                        Thank you for contacting LivRise Infrastructure.
                      </h4>
                      <p className="text-sm text-zinc-300 max-w-md mx-auto font-light leading-relaxed">
                        Our team will review your enquiry and get back to you.
                      </p>
                    </div>

                    {/* Direct Contact Buttons (WhatsApp Us & Email Us via Gmail Compose) */}
                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-sm mx-auto">
                      <a
                        href={currentWhatsAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 px-6 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2"
                      >
                        <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.074-2.121-.527-1.745-.734-2.852-2.545-2.937-2.66-.086-.115-.705-.939-.705-1.791 0-.853.447-1.272.607-1.446.16-.174.349-.217.465-.217.117 0 .233.002.334.007.106.005.249-.04.39.298.144.348.491 1.199.534 1.286.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.303c-.087.087-.178.182-.076.357.101.174.453.748.971 1.21.668.595 1.232.78 1.406.867.174.086.275.072.376-.044.102-.115.434-.506.55-.679.115-.174.231-.145.39-.087.159.058 1.009.477 1.182.564.173.086.289.13.332.202.043.072.043.419-.101.824z" />
                        </svg>
                        <span>WhatsApp Us</span>
                      </a>

                      <EmailContactButton
                        label="Email Us"
                        variant="glass"
                        className="w-full sm:w-auto py-2.5 px-6"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="text-xs text-zinc-400 hover:text-white underline cursor-pointer pt-2 block mx-auto"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">
                          Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your Name"
                          className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@company.com"
                          className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98000 00000"
                          className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">
                          Company
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="Company / Firm (Optional)"
                          className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">
                          Project Type
                        </label>
                        <select
                          value={formData.projectType}
                          onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                          className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white transition-colors cursor-pointer"
                        >
                          <option value="Commercial" className="bg-zinc-900 text-white">Commercial Complex / Office</option>
                          <option value="Residential" className="bg-zinc-900 text-white">Residential Housing / Villa</option>
                          <option value="Industrial" className="bg-zinc-900 text-white">Industrial Plant / Warehouse</option>
                          <option value="Infrastructure" className="bg-zinc-900 text-white">Civil Infrastructure / Bridge</option>
                          <option value="Institutional" className="bg-zinc-900 text-white">Institutional / Campus</option>
                          <option value="Hospitality" className="bg-zinc-900 text-white">Hospitality / Resort</option>
                          <option value="Other" className="bg-zinc-900 text-white">Other Special Scope</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">
                          Location
                        </label>
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          placeholder="City, State"
                          className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">
                          Estimated Budget (Optional)
                        </label>
                        <input
                          type="text"
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          placeholder="e.g. ₹2 Crores - ₹5 Crores"
                          className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">
                          Timeline (Optional)
                        </label>
                        <input
                          type="text"
                          value={formData.timeline}
                          onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                          placeholder="e.g. Next 3 Months"
                          className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">
                        Message & Project Scope *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about the project, site constraints, and required engineering services..."
                        className="w-full bg-black/60 border border-white/15 rounded-xl p-3.5 text-xs text-white focus:outline-none focus:border-white transition-colors"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-white text-black py-3 rounded-xl text-xs font-semibold hover:bg-zinc-100 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-white/10 disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isSubmitting ? 'Dispatching Enquiry...' : 'Start a Conversation'}</span>
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
