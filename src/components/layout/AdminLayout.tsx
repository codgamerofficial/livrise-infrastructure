'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLivRiseStore } from '@/lib/store';
import { LivRiseLogo } from '@/components/ui/LivRiseLogo';
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  FileCheck,
  Receipt,
  FileText,
  BarChart3,
  Settings,
  History,
  Shield,
  Layers,
  MessageSquare,
  CheckSquare,
  ExternalLink,
  Menu,
  X,
  CreditCard,
  UserCheck,
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const { currentUser, leads, messages } = useLivRiseStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const newLeadsCount = leads.filter((l) => l.status === 'New Leads').length;
  const unreadMessagesCount = messages.filter((m) => !m.isRead).length;

  const navItems = [
    { label: 'Executive Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Lead CRM & Pipeline', href: '/admin/leads', icon: Users, badge: newLeadsCount },
    { label: 'Clients Registry', href: '/admin/clients', icon: UserCheck },
    { label: 'Project Operations', href: '/admin/projects', icon: FolderKanban },
    { label: 'Tasks & Milestones', href: '/admin/tasks', icon: CheckSquare },
    { label: 'Messaging Hub', href: '/admin/messages', icon: MessageSquare, badge: unreadMessagesCount },
    { label: 'Quotations Management', href: '/admin/quotations', icon: FileCheck },
    { label: 'Invoices & Billing', href: '/admin/invoices', icon: Receipt },
    { label: 'Payments Ledger', href: '/admin/payments', icon: CreditCard },
    { label: 'Document Vault', href: '/admin/documents', icon: FileText },
    { label: 'Technical Team', href: '/admin/team', icon: Users },
    { label: 'CMS Content Studio', href: '/admin/cms', icon: Layers },
    { label: 'Business Analytics', href: '/admin/analytics', icon: BarChart3 },
    { label: 'Security Audit Logs', href: '/admin/audit-logs', icon: History },
    { label: 'System Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#070b14] flex flex-col md:flex-row text-slate-100">
      {/* Desktop Admin Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-[#0a0f1d] border-r border-white/5 shrink-0 justify-between">
        <div>
          {/* Logo Header */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-white/5">
            <Link href="/" className="block">
              <LivRiseLogo size="sm" />
            </Link>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
              ADMIN
            </span>
          </div>

          {/* Admin User Badge */}
          <div className="p-3 mx-3 my-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 font-bold flex items-center justify-center font-mono text-xs">
              {currentUser.name.charAt(0)}
            </div>
            <div className="truncate text-xs">
              <p className="font-bold text-white truncate">{currentUser.name}</p>
              <p className="text-[10px] text-amber-400 font-mono">{currentUser.role.toUpperCase()}</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 space-y-1 overflow-y-auto max-h-[calc(100vh-17rem)]" aria-label="Admin Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/20'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && item.badge > 0 ? (
                    <span className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 font-mono text-[9px] flex items-center justify-center font-bold">
                      {item.badge}
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-white/5 space-y-2">
          <Link
            href="/app"
            className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-amber-300 bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 transition-all"
          >
            <div className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5" />
              <span>Switch to Client Portal</span>
            </div>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Public Website</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0">
        {/* Mobile Header */}
        <header className="md:hidden h-14 bg-[#0a0f1d] border-b border-white/10 flex items-center justify-between px-4 sticky top-0 z-30 pt-safe">
          <Link href="/admin" className="block">
            <LivRiseLogo size="sm" />
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/app"
              className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20"
            >
              Client View
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white bg-white/5 border border-white/10"
              aria-label="Toggle admin menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </header>

        {/* Mobile Drawer Overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-black/95 p-5 pt-20 overflow-y-auto space-y-3 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-mono text-amber-400 uppercase">Admin Navigation Menu</span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between p-3 rounded-xl text-xs font-medium ${
                      isActive
                        ? 'bg-amber-400 text-black font-bold'
                        : 'text-zinc-300 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && item.badge > 0 ? (
                      <span className="w-4 h-4 rounded-full bg-amber-500 text-black font-mono text-[9px] flex items-center justify-center font-bold">
                        {item.badge}
                      </span>
                    ) : null}
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Page Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-8">
          {children}
        </div>
      </div>

      {/* Mobile Admin Quick Bottom Navigation */}
      <nav
        aria-label="Admin mobile quick navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#0a0f1d]/95 backdrop-blur-xl border-t border-white/10 flex items-center justify-around h-14 pb-safe"
      >
        <Link
          href="/admin"
          className={`flex flex-col items-center justify-center flex-1 py-1 text-[10px] ${
            pathname === '/admin' ? 'text-amber-400 font-bold' : 'text-zinc-400'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Dashboard</span>
        </Link>

        <Link
          href="/admin/leads"
          className={`flex flex-col items-center justify-center flex-1 py-1 text-[10px] ${
            pathname.startsWith('/admin/leads') ? 'text-amber-400 font-bold' : 'text-zinc-400'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Leads</span>
        </Link>

        <Link
          href="/admin/projects"
          className={`flex flex-col items-center justify-center flex-1 py-1 text-[10px] ${
            pathname.startsWith('/admin/projects') ? 'text-amber-400 font-bold' : 'text-zinc-400'
          }`}
        >
          <FolderKanban className="w-4 h-4" />
          <span>Projects</span>
        </Link>

        <Link
          href="/admin/invoices"
          className={`flex flex-col items-center justify-center flex-1 py-1 text-[10px] ${
            pathname.startsWith('/admin/invoices') ? 'text-amber-400 font-bold' : 'text-zinc-400'
          }`}
        >
          <Receipt className="w-4 h-4" />
          <span>Invoices</span>
        </Link>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="flex flex-col items-center justify-center flex-1 py-1 text-[10px] text-zinc-400"
        >
          <Menu className="w-4 h-4" />
          <span>More</span>
        </button>
      </nav>
    </div>
  );
}
