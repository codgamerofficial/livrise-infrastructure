'use client';

import React from 'react';
import Link from 'next/link';
import { LivRiseLogo } from '@/components/ui/LivRiseLogo';
import { ArrowRight, Mail } from 'lucide-react';
import { useLivRiseStore } from '@/lib/store';
import { SITE_SETTINGS, getWhatsAppLink, getMailtoLink, getGmailComposeLink } from '@/lib/site-settings';
import { EmailContactButton } from '@/components/ui/EmailContactButton';

export function LivRiseFooter() {
  const currentYear = new Date().getFullYear();
  const { siteSettings = SITE_SETTINGS } = useLivRiseStore();

  const currentWhatsApp = siteSettings?.displayWhatsApp || SITE_SETTINGS.displayWhatsApp;
  const currentEmail = siteSettings?.contactEmail || SITE_SETTINGS.contactEmail;
  const currentWhatsAppUrl = siteSettings?.whatsappUrl || getWhatsAppLink();
  const currentMailtoUrl = siteSettings?.mailtoUrl || getMailtoLink();

  const servicesList = [
    { title: 'Architecture', href: '/services/architecture' },
    { title: 'Structural Engineering', href: '/services/structural-engineering' },
    { title: 'Infrastructure', href: '/services/infrastructure' },
    { title: 'Master Planning', href: '/services/master-planning' },
    { title: 'Project Management', href: '/services/project-management' },
    { title: 'Estimation & Costing', href: '/services/estimation-cost-consultancy' },
    { title: 'Engineering Analysis', href: '/services/engineering-analysis' },
    { title: 'Retrofitting & Rehabilitation', href: '/services/retrofitting-rehabilitation' },
  ];

  const quickLinks = [
    { label: 'About LivRise', href: '/about' },
    { label: 'All Services', href: '/services' },
    { label: 'Project Directory', href: '/projects' },
    { label: 'Editorial Insights', href: '/insights' },
    { label: 'Start a Project', href: '/start-project' },
    { label: 'Contact Us', href: '/contact' },
  ];

  return (
    <footer className="bg-black border-t border-white/10 text-zinc-300 relative z-10 overflow-hidden">
      {/* Subtle architectural ambient background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-white/2 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-16 pb-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-14 border-b border-white/10">
          {/* Brand & Approved Contact Column */}
          <div className="lg:col-span-4 space-y-5">
            <LivRiseLogo size="lg" />

            <div className="space-y-1">
              <p className="text-xs uppercase tracking-widest text-amber-300/90 font-medium">
                {siteSettings?.descriptor || SITE_SETTINGS.descriptor}
              </p>
              <p className="text-sm text-zinc-400 font-light leading-relaxed max-w-sm">
                Engineering, architecture and infrastructure brought together through a modern project delivery experience. Building Ideas Into Reality.
              </p>
            </div>

            {/* Official Contact Coordinates */}
            <div className="pt-2 flex flex-col space-y-3 text-xs text-zinc-300">
              <div className="flex items-center gap-2.5">
                <span className="text-zinc-500 font-mono uppercase text-[11px] w-20">WhatsApp:</span>
                <a
                  href={currentWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors font-medium text-white"
                >
                  {currentWhatsApp}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="text-zinc-500 font-mono uppercase text-[11px] w-20">Email:</span>
                <a
                  href={getGmailComposeLink(
                    siteSettings?.defaultEmailSubject,
                    siteSettings?.defaultEmailBody,
                    currentEmail
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open Gmail Compose"
                  className="hover:text-amber-300 transition-colors font-medium text-white break-all"
                >
                  {currentEmail}
                </a>
              </div>
            </div>

            {/* Clickable Actions */}
            <div className="pt-3 flex flex-wrap items-center gap-3">
              <a
                href={currentWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold text-emerald-300 bg-emerald-500/10 border border-emerald-500/25 hover:bg-emerald-500/20 transition-all"
              >
                <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.074-2.121-.527-1.745-.734-2.852-2.545-2.937-2.66-.086-.115-.705-.939-.705-1.791 0-.853.447-1.272.607-1.446.16-.174.349-.217.465-.217.117 0 .233.002.334.007.106.005.249-.04.39.298.144.348.491 1.199.534 1.286.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.303c-.087.087-.178.182-.076.357.101.174.453.748.971 1.21.668.595 1.232.78 1.406.867.174.086.275.072.376-.044.102-.115.434-.506.55-.679.115-.174.231-.145.39-.087.159.058 1.009.477 1.182.564.173.086.289.13.332.202.043.072.043.419-.101.824z" />
                </svg>
                <span>WhatsApp Us</span>
              </a>

              <EmailContactButton
                label="Email Us"
                variant="glass"
                className="py-2 px-3.5 text-xs font-semibold"
                showFallbackCopy
              />
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-white">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 hover:text-white transition-colors inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Services */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-white">
              Core Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              {servicesList.slice(0, 6).map((service) => (
                <li key={service.title}>
                  <Link
                    href={service.href}
                    className="text-zinc-400 hover:text-white transition-colors inline-block"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform Access & CTA */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-white">
              Project Delivery
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Submit your engineering or architectural specifications to receive a formal consultation schedule and tracking dossier.
            </p>

            <div className="space-y-2 pt-2">
              <Link
                href="/start-project"
                className="w-full bg-white text-black py-2.5 px-4 rounded-lg text-xs font-semibold hover:bg-zinc-100 transition-colors flex items-center justify-center gap-2"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <div className="pt-1">
                <Link
                  href="/admin"
                  className="liquid-glass border border-white/10 hover:border-white/30 text-zinc-300 hover:text-white py-2 px-3 rounded-lg text-[11px] text-center font-medium transition-all block w-full"
                >
                  Admin Console
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-light">
          <div>
            © {currentYear} {siteSettings?.companyName || SITE_SETTINGS.companyName}. All rights reserved. {siteSettings?.tagline || SITE_SETTINGS.tagline}
          </div>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-zinc-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-zinc-300 transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-zinc-300 transition-colors">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
