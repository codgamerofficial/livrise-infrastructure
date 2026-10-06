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

  // Public Mobile Bottom Nav (Per Master Prompt Section 24)
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
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-(--surface-primary)/90 backdrop-blur-xl border-t border-(--border-subtle) pb-safe transition-all shadow-lg"
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
                  ? 'text-brand-indigo dark:text-brand-blue font-bold'
                  : 'text-(--text-muted) hover:text-(--text-primary)'
              }`}
            >
              <div
                className={`p-1.5 rounded-xl transition-all ${
                  isActive
                    ? 'bg-indigo-500/15 text-brand-indigo dark:text-brand-blue shadow-sm'
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
        <Link
          href="/start-project"
          className="flex flex-col items-center justify-center min-h-12 py-1 text-brand-indigo font-semibold transition-all group"
        >
          <div className="p-1.5 rounded-xl bg-linear-to-tr from-brand-indigo to-brand-blue text-white shadow-md shadow-brand-indigo/30 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight font-bold text-brand-indigo dark:text-brand-blue">
            Quote
          </span>
        </Link>
      </div>
    </nav>
  );
}
