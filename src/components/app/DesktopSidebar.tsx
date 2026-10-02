'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LivRiseLogo } from '@/components/ui/LivRiseLogo';
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
    <aside className="hidden md:flex flex-col w-64 lg:w-72 shrink-0 border-r border-white/10 bg-black/95 backdrop-blur-2xl min-h-screen p-5 justify-between">
      {/* Top: Logo & Nav Links */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <Link href="/app" className="flex items-center">
            <LivRiseLogo size="md" />
          </Link>
          <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
            Portal
          </span>
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
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-white text-black font-semibold shadow-md shadow-white/5'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? 'text-black' : 'text-zinc-400'
                    }`}
                  />
                  <span>{link.label}</span>
                </div>

                {link.badge !== undefined && link.badge > 0 && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-black text-white'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
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
      <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
        {(currentUser.role === 'admin' || currentUser.role === 'super_admin') && (
          <Link
            href="/admin"
            className="flex items-center justify-between p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 hover:bg-amber-500/20 transition-all text-xs font-medium"
          >
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-400" />
              <span>Admin Operations</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </Link>
        )}

        <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black font-bold text-xs shrink-0">
              {currentUser.name.charAt(0)}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-medium text-white truncate">
                {currentUser.name}
              </span>
              <span className="text-[10px] font-mono text-zinc-400 truncate">
                {currentUser.role.toUpperCase()}
              </span>
            </div>
          </div>

          <Link
            href="/"
            title="Public Website"
            className="text-zinc-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
