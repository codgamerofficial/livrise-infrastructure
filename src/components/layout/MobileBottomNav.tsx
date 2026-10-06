'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Compass,
  Briefcase,
  Info,
  Sparkles,
} from 'lucide-react';

export function MobileBottomNav() {
  const pathname = usePathname();

  const isClientPortal = pathname.startsWith('/app');
  const isAdminPortal = pathname.startsWith('/admin');

  // If inside client portal or admin portal, let their dedicated shells handle navigation
  if (isClientPortal || isAdminPortal) return null;

  // Public Mobile Bottom Nav (Per Master Prompt Section 14)
  // HOME, SERVICES, PROJECTS, ABOUT, QUOTE
  const publicItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Services', href: '/services', icon: Compass },
    { label: 'Projects', href: '/projects', icon: Briefcase },
    { label: 'About', href: '/about', icon: Info },
  ];

  return (
    <nav
      aria-label="Public Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-brand-obsidian/95 backdrop-blur-2xl border-t border-amber-500/20 pb-safe transition-all shadow-2xl"
    >
      <div className="grid grid-cols-5 h-16 max-w-md mx-auto items-center px-1">
        {publicItems.map((item) => {
          const isActive =
            item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center min-h-12 py-1 transition-all rounded-xl ${
                isActive
                  ? 'text-brand-gold-bright font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <div
                className={`p-1.5 rounded-xl transition-all ${
                  isActive
                    ? 'bg-amber-500/15 text-brand-gold-bright shadow-sm'
                    : 'text-current'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight font-medium">
                {item.label}
              </span>
            </Link>
          );
        })}

        {/* 5th Button: Start a Project / Get Free Quote */}
        {(() => {
          const isQuoteActive = pathname === '/start-project';
          return (
            <Link
              href="/start-project"
              className={`flex flex-col items-center justify-center min-h-12 py-1 transition-all rounded-xl ${
                isQuoteActive
                  ? 'text-brand-gold-bright font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <div
                className={`p-1.5 rounded-xl transition-all ${
                  isQuoteActive
                    ? 'gold-button scale-105 shadow-md shadow-amber-500/30'
                    : 'bg-amber-500/15 text-brand-gold-bright'
                }`}
              >
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight font-bold text-brand-gold-bright">
                Quote
              </span>
            </Link>
          );
        })()}
      </div>
    </nav>
  );
}
