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
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2.5 print:hidden select-none">
      {/* Expanded Quick Action Panel */}
      {isOpen && (
        <div className="liquid-glass border border-white/20 rounded-2xl p-3.5 shadow-2xl backdrop-blur-2xl bg-black/85 flex flex-col gap-2 min-w-60 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-white/10 px-1">
            <span className="text-[11px] uppercase tracking-wider text-zinc-400 font-mono">
              Quick Connect
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-zinc-400 hover:text-white p-0.5 rounded transition-colors"
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
            className="flex items-center justify-between gap-3 px-3 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-medium transition-all group"
          >
            <div className="flex items-center gap-2.5">
              <svg className="w-4 h-4 fill-current shrink-0 text-emerald-400" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.074-2.121-.527-1.745-.734-2.852-2.545-2.937-2.66-.086-.115-.705-.939-.705-1.791 0-.853.447-1.272.607-1.446.16-.174.349-.217.465-.217.117 0 .233.002.334.007.106.005.249-.04.39.298.144.348.491 1.199.534 1.286.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.303c-.087.087-.178.182-.076.357.101.174.453.748.971 1.21.668.595 1.232.78 1.406.867.174.086.275.072.376-.044.102-.115.434-.506.55-.679.115-.174.231-.145.39-.087.159.058 1.009.477 1.182.564.173.086.289.13.332.202.043.072.043.419-.101.824z" />
              </svg>
              <span className="font-semibold">WhatsApp</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400/80">{displayWhatsApp}</span>
          </a>

          {/* Email Direct Action (Opens Gmail Compose in New Tab) */}
          <a
            href={gmailUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Open Gmail Compose"
            className="flex items-center justify-between gap-3 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-200 hover:text-white text-xs font-medium transition-all group"
          >
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-zinc-400 group-hover:text-amber-300 transition-colors" />
              <span>Email Us</span>
            </div>
            <span className="text-[10px] font-mono text-zinc-400 truncate max-w-27.5">{contactEmail}</span>
          </a>

          {/* Start Project Action */}
          <Link
            href="/start-project"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white text-black hover:bg-zinc-200 text-xs font-semibold transition-all mt-1 shadow-md shadow-white/10"
          >
            <span>Start Project</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* Floating Pill Trigger */}
      <div className="flex items-center gap-2">
        {/* Direct 1-tap WhatsApp button on mobile/desktop */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white pl-3.5 pr-4 py-2.5 rounded-full shadow-lg shadow-emerald-950/60 border border-emerald-400/30 transition-all hover:scale-105 active:scale-95 group"
          aria-label="Direct WhatsApp message"
        >
          <svg className="w-4 h-4 fill-current shrink-0 animate-pulse" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.074-2.121-.527-1.745-.734-2.852-2.545-2.937-2.66-.086-.115-.705-.939-.705-1.791 0-.853.447-1.272.607-1.446.16-.174.349-.217.465-.217.117 0 .233.002.334.007.106.005.249-.04.39.298.144.348.491 1.199.534 1.286.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.303c-.087.087-.178.182-.076.357.101.174.453.748.971 1.21.668.595 1.232.78 1.406.867.174.086.275.072.376-.044.102-.115.434-.506.55-.679.115-.174.231-.145.39-.087.159.058 1.009.477 1.182.564.173.086.289.13.332.202.043.072.043.419-.101.824z" />
          </svg>
          <span className="text-xs font-semibold tracking-wide">WhatsApp</span>
        </a>

        {/* Quick Menu Toggle */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`p-2.5 rounded-full border transition-all shadow-lg ${
            isOpen
              ? 'bg-white text-black border-white'
              : 'liquid-glass bg-black/80 border-white/20 text-zinc-300 hover:text-white hover:border-white/40'
          }`}
          aria-label="Toggle contact options"
        >
          {isOpen ? <X className="w-4 h-4" /> : <MessageCircle className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
