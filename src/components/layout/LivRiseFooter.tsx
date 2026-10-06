'use client';

import React from 'react';
import Link from 'next/link';
import { LivRiseLogo } from '@/components/ui/LivRiseLogo';
import { ArrowRight, Phone, Mail, Sparkles, Shield } from 'lucide-react';
import { useLivRiseStore } from '@/lib/store';
import { SITE_SETTINGS, getWhatsAppLink, getGmailComposeLink } from '@/lib/site-settings';

export function LivRiseFooter() {
  const currentYear = new Date().getFullYear();
  const { siteSettings = SITE_SETTINGS } = useLivRiseStore();

  const currentWhatsApp = siteSettings?.displayWhatsApp || SITE_SETTINGS.displayWhatsApp;
  const currentEmail = siteSettings?.contactEmail || SITE_SETTINGS.contactEmail;
  const currentWhatsAppUrl = siteSettings?.whatsappUrl || getWhatsAppLink();

  // Exactly matching Master Prompt Section 13:
  const primaryServices = [
    { title: 'House Plan', href: '/services/house-plan', symbol: '📐' },
    { title: '3D Elevation', href: '/services/3d-elevation', symbol: '🏠' },
    { title: 'Interior Design', href: '/services/interior-design', symbol: '🛋️' },
    { title: 'Construction', href: '/services/construction', symbol: '🏗️' },
  ];

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Projects', href: '/projects' },
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'About Us', href: '/about' },
    { label: 'Insights & Guides', href: '/insights' },
    { label: 'Client Portal', href: '/app' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="bg-(--surface-primary) border-t border-(--border-subtle) text-(--text-secondary) relative z-10 overflow-hidden transition-colors duration-200">
      {/* Decorative ambient background subtle light */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-linear-to-br from-brand-indigo/10 via-brand-blue/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 pt-16 pb-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-(--border-subtle)">
          {/* Brand & Approved Contact Column */}
          <div className="lg:col-span-5 space-y-5">
            <LivRiseLogo size="lg" />

            <div className="space-y-1.5">
              <p className="text-xs uppercase tracking-widest font-bold text-brand-indigo dark:text-brand-blue">
                Engineering • Architecture • Infrastructure
              </p>
              <p className="text-sm text-(--text-secondary) font-normal leading-relaxed max-w-sm">
                Building Ideas Into Reality. An anime-inspired, colorful digital experience bringing architectural planning, photorealistic 3D visualization, and turnkey construction to life.
              </p>
            </div>

            {/* Official Contact Coordinates */}
            <div className="pt-2 flex flex-col space-y-2 text-xs">
              <div className="flex items-center gap-2.5">
                <span className="text-(--text-muted) font-mono uppercase text-[11px] w-20">
                  WhatsApp:
                </span>
                <a
                  href={currentWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-500 transition-colors font-semibold text-(--text-primary)"
                >
                  {currentWhatsApp}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="text-(--text-muted) font-mono uppercase text-[11px] w-20">
                  Email:
                </span>
                <a
                  href={getGmailComposeLink(
                    siteSettings?.defaultEmailSubject,
                    siteSettings?.defaultEmailBody,
                    currentEmail
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open Gmail Compose"
                  className="hover:text-brand-indigo dark:hover:text-brand-blue transition-colors font-semibold text-(--text-primary) break-all"
                >
                  {currentEmail}
                </a>
              </div>
            </div>

            {/* Clickable Quick Action Buttons */}
            <div className="pt-3 flex flex-wrap items-center gap-2.5">
              <a
                href={currentWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 hover:bg-emerald-500/20 transition-all shadow-xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>WhatsApp Us</span>
              </a>

              <a
                href={getGmailComposeLink(
                  'Project Consultation Enquiry',
                  'Hello LivRise team, I would like to enquire about...',
                  currentEmail
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-brand-indigo dark:text-brand-blue bg-indigo-500/10 border border-indigo-500/25 hover:bg-indigo-500/20 transition-all shadow-xs"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email Us</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-xs uppercase tracking-widest font-bold text-(--text-primary)">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-(--text-secondary) hover:text-brand-indigo dark:hover:text-brand-blue transition-colors inline-block text-xs font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Services */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-xs uppercase tracking-widest font-bold text-(--text-primary)">
              Core Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              {primaryServices.map((service) => (
                <li key={service.title}>
                  <Link
                    href={service.href}
                    className="text-(--text-secondary) hover:text-brand-indigo dark:hover:text-brand-blue transition-colors inline-flex items-center gap-1.5 text-xs font-medium"
                  >
                    <span>{service.symbol}</span>
                    <span>{service.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Start a Project & Client Access */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs uppercase tracking-widest font-bold text-(--text-primary)">
              Build Your Home
            </h4>
            <p className="text-xs text-(--text-secondary) leading-relaxed">
              Ready to turn your vision into an approved house plan, 3D visualization, or turnkey home?
            </p>

            <div className="space-y-2.5 pt-1">
              <Link
                href="/start-project"
                className="w-full bg-linear-to-r from-brand-indigo to-brand-blue text-white py-2.5 px-4 rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-brand-indigo/30 transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Get Free Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <div className="flex items-center gap-2 pt-1">
                <Link
                  href="/app"
                  className="flex-1 border border-(--border-subtle) bg-(--surface-secondary) text-(--text-secondary) hover:text-(--text-primary) py-2 px-3 rounded-xl text-[11px] text-center font-semibold transition-all inline-flex items-center justify-center gap-1"
                >
                  <Shield className="w-3 h-3" />
                  <span>Portal</span>
                </Link>

                <Link
                  href="/admin"
                  className="flex-1 border border-(--border-subtle) bg-(--surface-secondary) text-(--text-muted) hover:text-(--text-primary) py-2 px-3 rounded-xl text-[11px] text-center font-medium transition-all"
                >
                  Admin
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-(--text-muted)">
          <div>
            © {currentYear} {siteSettings?.companyName || SITE_SETTINGS.companyName}. All rights reserved. {siteSettings?.tagline || SITE_SETTINGS.tagline}
          </div>

          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-(--text-primary) transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-(--text-primary) transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-(--text-primary) transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
