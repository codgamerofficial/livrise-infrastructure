'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLivRiseStore } from '@/lib/store';
import { LivRiseLogo } from '@/components/ui/LivRiseLogo';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
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
    <div className="min-h-screen bg-[#0B0B0D] text-[#F5F5F3] flex flex-col md:flex-row transition-colors duration-200">
      {/* Desktop Admin Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-[#0B0B0D] border-r border-zinc-800 shrink-0 justify-between">
        <div>
          {/* Logo Header */}
          <div className="h-16 flex items-center justify-between px-5 border-b border-zinc-800">
            <Link href="/" className="block">
              <LivRiseLogo size="sm" asLink={false} />
            </Link>
            <div className="flex items-center gap-1.5">
              <ThemeToggle />
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-[#151518] text-[#E5B85C] font-bold border border-[#C9963E]/30">
                ADMIN
              </span>
            </div>
          </div>

          {/* Admin User Badge */}
          <div className="p-3 mx-3 my-3 rounded-2xl bg-[#151518] border border-zinc-800 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#E5B85C] text-black font-bold flex items-center justify-center font-mono text-xs">
              {currentUser.name.charAt(0)}
            </div>
            <div className="truncate text-xs">
              <p className="font-bold text-white truncate">{currentUser.name}</p>
              <p className="text-[10px] text-[#E5B85C] font-mono font-semibold">
                {currentUser.role.toUpperCase()}
              </p>
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
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#E5B85C] text-black font-bold shadow-md shadow-amber-500/20'
                      : 'text-zinc-400 hover:text-white hover:bg-[#151518]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && item.badge > 0 ? (
                    <span className="w-4 h-4 rounded-full bg-black text-[#E5B85C] font-mono text-[9px] flex items-center justify-center font-bold">
                      {item.badge}
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-zinc-800 space-y-2">
          <Link
            href="/app"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-[#E5B85C] bg-[#151518] border border-[#C9963E]/30 hover:bg-[#202124] transition-all"
          >
            <div className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5" />
              <span>Switch to Client Portal</span>
            </div>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs text-zinc-500 hover:text-white hover:bg-[#151518] transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Public Website</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0">
        {/* Mobile Header */}
        <header className="md:hidden h-14 bg-[#0B0B0D] border-b border-zinc-800 flex items-center justify-between px-4 sticky top-0 z-30 pt-safe">
          <Link href="/admin" className="block">
            <LivRiseLogo size="sm" asLink={false} />
          </Link>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/app"
              className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-lg bg-[#151518] text-[#E5B85C] border border-[#C9963E]/30"
            >
              Client View
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-white bg-[#151518] border border-zinc-800"
              aria-label="Toggle admin menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </header>

        {/* Mobile Drawer Overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-[#0B0B0D]/95 backdrop-blur-2xl p-5 pt-20 overflow-y-auto space-y-3 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <span className="text-xs font-mono font-bold text-[#E5B85C] uppercase">
                Admin Navigation Menu
              </span>
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
                    className={`flex items-center justify-between p-3 rounded-xl text-xs font-semibold ${
                      isActive
                        ? 'bg-[#E5B85C] text-black font-bold'
                        : 'text-zinc-400 hover:bg-[#151518]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && item.badge > 0 ? (
                      <span className="w-4 h-4 rounded-full bg-black text-[#E5B85C] font-mono text-[9px] flex items-center justify-center font-bold">
                        {item.badge}
                      </span>
                    ) : null}
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Child Page Content Container */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto bg-[#0B0B0D]">
          {children}
        </main>
      </div>
    </div>
  );
}
