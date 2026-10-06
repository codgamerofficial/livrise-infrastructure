'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LivRiseLogo } from '@/components/ui/LivRiseLogo';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import {
  Home,
  Briefcase,
  MessageSquare,
  FileText,
  CreditCard,
  Bell,
  User,
  Shield,
  ExternalLink,
  LogOut,
} from 'lucide-react';
import { useLivRiseStore } from '@/lib/store';

export function DesktopSidebar() {
  const pathname = usePathname();
  const { currentUser, messages, notifications, projects } = useLivRiseStore();

  const unreadMessagesCount = messages.filter((m) => !m.isRead).length;
  const unreadNotifsCount = notifications.filter((n) => !n.isRead).length;
  const activeProjectsCount = projects.filter((p) => p.status !== 'Completed').length;

  const links = [
    { label: 'Overview', href: '/app', icon: Home, exact: true },
    {
      label: 'Projects',
      href: '/app/projects',
      icon: Briefcase,
      badge: activeProjectsCount > 0 ? activeProjectsCount : undefined,
      exact: false,
    },
    {
      label: 'Messages',
      href: '/app/messages',
      icon: MessageSquare,
      badge: unreadMessagesCount > 0 ? unreadMessagesCount : undefined,
      exact: false,
    },
    { label: 'Documents', href: '/app/documents', icon: FileText, exact: false },
    { label: 'Invoices & Payments', href: '/app/payments', icon: CreditCard, exact: false },
    {
      label: 'Notifications',
      href: '/app/notifications',
      icon: Bell,
      badge: unreadNotifsCount > 0 ? unreadNotifsCount : undefined,
      exact: false,
    },
    { label: 'Profile & Settings', href: '/app/profile', icon: User, exact: false },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 lg:w-72 shrink-0 border-r border-(--border-subtle) bg-(--surface-primary) backdrop-blur-2xl min-h-screen p-5 justify-between transition-colors duration-200">
      {/* Top: Logo & Nav Links */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between pb-4 border-b border-(--border-subtle)">
          <Link href="/app" className="flex items-center">
            <LivRiseLogo size="md" asLink={false} />
          </Link>
          <div className="flex items-center gap-1.5">
            <ThemeToggle />
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/10 text-brand-indigo dark:text-brand-blue border border-indigo-500/20">
              Portal
            </span>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="flex flex-col gap-1.5" aria-label="Portal desktop menu">
          {links.map((link) => {
            const isActive = link.exact
              ? pathname === link.href
              : pathname === link.href || pathname.startsWith(`${link.href}/`);
            const Icon = link.icon;

            return (
              <Link
                key={link.label}
                href={link.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-linear-to-r from-brand-indigo to-brand-blue text-white shadow-md shadow-brand-indigo/25'
                    : 'text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--surface-secondary)'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? 'text-white' : 'text-(--text-muted)'
                    }`}
                  />
                  <span>{link.label}</span>
                </div>

                {link.badge !== undefined && link.badge > 0 && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-white text-brand-indigo'
                        : 'bg-indigo-500/15 text-brand-indigo dark:text-brand-blue border border-indigo-500/30'
                    }`}
                  >
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom: Client Profile Card & Admin Switcher */}
      <div className="flex flex-col gap-3 pt-4 border-t border-(--border-subtle)">
        {(currentUser.role === 'admin' || currentUser.role === 'super_admin') && (
          <Link
            href="/admin"
            className="flex items-center justify-between p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-brand-indigo dark:text-brand-blue hover:bg-indigo-500/20 transition-all text-xs font-semibold"
          >
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Admin Operations</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </Link>
        )}

        <div className="flex items-center justify-between p-3 rounded-2xl bg-(--surface-secondary) border border-(--border-subtle)">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-linear-to-tr from-brand-indigo to-brand-blue flex items-center justify-center text-white font-bold text-xs shrink-0">
              {currentUser.name.charAt(0)}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-(--text-primary) truncate">
                {currentUser.name}
              </span>
              <span className="text-[10px] font-mono text-(--text-muted) truncate uppercase">
                {currentUser.role}
              </span>
            </div>
          </div>

          <Link
            href="/"
            title="Return to Public Website"
            className="text-(--text-muted) hover:text-(--text-primary) p-1.5 rounded-lg hover:bg-(--surface-primary) transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
