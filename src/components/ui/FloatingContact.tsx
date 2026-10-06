'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mail, ArrowRight, MessageCircle, X } from 'lucide-react';
import { useLivRiseStore } from '@/lib/store';
import { SITE_SETTINGS, getGmailComposeLink } from '@/lib/site-settings';

export function FloatingContact() {
  const pathname = usePathname();
  const { siteSettings = SITE_SETTINGS } = useLivRiseStore();
  const [isOpen, setIsOpen] = useState(false);

  // Do not show on internal admin console to avoid interfering with productivity
  if (pathname.startsWith('/admin')) {
    return null;
  }

  const whatsappUrl = siteSettings?.whatsappUrl || SITE_SETTINGS.whatsappUrl;
  const contactEmail = siteSettings?.contactEmail || SITE_SETTINGS.contactEmail;
  const displayWhatsApp = siteSettings?.displayWhatsApp || SITE_SETTINGS.displayWhatsApp;
  const gmailUrl = getGmailComposeLink(
    siteSettings?.defaultEmailSubject,
    siteSettings?.defaultEmailBody,
    contactEmail
  );

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end gap-2.5 print:hidden select-none">
      {/* Expanded Quick Action Panel */}
      {isOpen && (
        <div className="border border-(--border-subtle) rounded-2xl p-3.5 shadow-2xl backdrop-blur-2xl bg-(--surface-primary)/95 flex flex-col gap-2 min-w-60 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-(--border-subtle) px-1">
            <span className="text-[11px] uppercase tracking-wider text-(--text-muted) font-mono font-bold">
              Quick Connect
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-(--text-muted) hover:text-(--text-primary) p-0.5 rounded transition-colors"
              aria-label="Close contact menu"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* WhatsApp Direct Action */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-3 px-3 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold transition-all group"
          >
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 fill-current shrink-0 text-emerald-500" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.074-2.121-.527-1.745-.734-2.852-2.545-2.937-2.66-.086-.115-.705-.939-.705-1.791 0-.853.447-1.272.607-1.446.16-.174.349-.217.465-.217.117 0 .233.002.334.007.106.005.249-.04.39.298.144.348.491 1.199.534 1.286.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.303c-.087.087-.178.182-.076.357.101.174.453.748.971 1.21.668.595 1.232.78 1.406.867.174.086.275.072.376-.044.102-.115.434-.506.55-.679.115-.174.231-.145.39-.087.159.058 1.009.477 1.182.564.173.086.289.13.332.202.043.072.043.419-.101.824z" />
              </svg>
              <span>WhatsApp</span>
            </div>
            <span className="text-[10px] font-mono opacity-80">{displayWhatsApp}</span>
          </a>

          {/* Email Direct Action */}
          <a
            href={gmailUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Open Gmail Compose"
            className="flex items-center justify-between gap-3 px-3 py-2 rounded-xl bg-(--surface-secondary) hover:bg-(--surface-secondary)/80 border border-(--border-subtle) text-(--text-primary) text-xs font-semibold transition-all group"
          >
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-brand-indigo dark:text-brand-blue" />
              <span>Email</span>
            </div>
            <span className="text-[10px] font-mono text-(--text-muted) truncate max-w-28">
              {contactEmail}
            </span>
          </a>

          {/* Start Project Link */}
          <Link
            href="/start-project"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-linear-to-r from-brand-indigo to-brand-blue text-white text-xs font-bold transition-all shadow-xs"
          >
            <span>Get Free Quote</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-2xl bg-linear-to-tr from-brand-indigo to-brand-blue text-white shadow-xl shadow-brand-indigo/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-all focus:outline-none"
        aria-label="Toggle contact menu"
      >
        {isOpen ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
      </button>
    </div>
  );
}
