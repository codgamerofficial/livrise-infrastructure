'use client';

import React from 'react';
import Link from 'next/link';
import { LivRiseLogo } from '@/components/brand/LivRiseLogo';
import { Phone, Mail, ArrowRight, Shield } from 'lucide-react';
import { useLivRiseStore } from '@/lib/store';
import { SITE_SETTINGS, getWhatsAppLink, getGmailComposeLink } from '@/lib/site-settings';

export function LivRiseFooter() {
  const currentYear = new Date().getFullYear();
  const { siteSettings = SITE_SETTINGS } = useLivRiseStore();

  const currentWhatsApp = siteSettings?.displayWhatsApp || SITE_SETTINGS.displayWhatsApp;
  const currentEmail = siteSettings?.contactEmail || SITE_SETTINGS.contactEmail;
  const currentWhatsAppUrl = siteSettings?.whatsappUrl || getWhatsAppLink();

  // Exactly matching Master Prompt Section 18:
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
    { label: 'Capabilities', href: '/capabilities' },
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'About Us', href: '/about' },
    { label: 'Insights & Guides', href: '/insights' },
    { label: 'Client Portal', href: '/app' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="bg-[#0B0B0D] border-t border-white/10 text-zinc-300 relative z-10 overflow-hidden transition-colors duration-200">
      {/* Decorative architectural blueprint accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 pt-16 pb-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand & Approved Contact Column */}
          <div className="lg:col-span-5 space-y-5">
            <LivRiseLogo size="lg" />

            <div className="space-y-1.5">
              <p className="text-xs uppercase tracking-widest font-bold text-[#E5B85C]">
                Engineering • Architecture • Infrastructure
              </p>
              <p className="text-sm text-zinc-400 font-normal leading-relaxed max-w-sm">
                Building Ideas Into Reality. Engineering precision, architectural excellence, and turnkey construction crafted for modern dream homes and visionary infrastructure.
              </p>
            </div>

            {/* Official Contact Coordinates */}
            <div className="pt-2 flex flex-col space-y-2 text-xs">
              <div className="flex items-center gap-2.5">
                <span className="text-zinc-500 font-mono uppercase text-[11px] w-20">
                  WhatsApp:
                </span>
                <a
                  href={currentWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#E5B85C] transition-colors font-semibold text-white"
                >
                  {currentWhatsApp}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="text-zinc-500 font-mono uppercase text-[11px] w-20">
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
                  className="hover:text-[#E5B85C] transition-colors font-semibold text-white break-all"
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600/20 border border-emerald-500/30 hover:bg-emerald-600/30 transition-all shadow-xs"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-zinc-200 bg-white/5 border border-white/15 hover:bg-white/10 hover:text-white transition-all shadow-xs"
              >
                <Mail className="w-3.5 h-3.5 text-[#E5B85C]" />
                <span>Email Us</span>
              </a>

              <Link
                href="/app"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-[#E5B85C] bg-amber-500/10 border border-amber-500/25 hover:bg-amber-500/20 transition-all shadow-xs"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Client Portal</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-xs uppercase tracking-widest font-bold text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 hover:text-[#E5B85C] transition-colors inline-block text-xs font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-xs uppercase tracking-widest font-bold text-white">
              Core Services
            </h4>
            <ul className="space-y-2 text-sm">
              {primaryServices.map((srv) => (
                <li key={srv.title}>
                  <Link
                    href={srv.href}
                    className="text-zinc-400 hover:text-[#E5B85C] transition-colors inline-flex items-center gap-2 text-xs font-medium"
                  >
                    <span>{srv.symbol}</span>
                    <span>{srv.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Luxury CTA Block */}
          <div className="lg:col-span-3 space-y-4">
            <div className="p-5 rounded-2xl bg-[#151518] border border-amber-500/25 space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#E5B85C] font-bold">
                START YOUR PROJECT
              </span>
              <h5 className="text-sm font-bold text-white leading-snug">
                Plan → Design → Approve → Build with LivRise
              </h5>
              <p className="text-xs text-zinc-400">
                Get architectural drawings, 3D renderings, and turnkey cost estimates.
              </p>
              <Link
                href="/start-project"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl gold-button text-xs font-bold uppercase tracking-wider shadow-md shadow-amber-500/25"
              >
                <span>Get Free Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {currentYear} LivRise Infrastructure. All rights reserved.</p>

          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="hover:text-zinc-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-zinc-300 transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/capabilities" className="hover:text-zinc-300 transition-colors">
              Capabilities
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
