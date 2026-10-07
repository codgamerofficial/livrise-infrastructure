'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLivRiseStore } from '@/lib/store';
import { useAuth } from '@/lib/auth-context';
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
  LogOut,
  Loader2,
  Lock,
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, supabaseUser, isLoading, isAdmin, signOut } = useAuth();
  const { leads, messages } = useLivRiseStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !supabaseUser) {
      router.push('/login?redirect=/admin');
    }
  }, [isLoading, supabaseUser, router]);

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-obsidian flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 rounded-2xl bg-brand-charcoal border border-brand-gold/30 flex items-center justify-center text-brand-gold-bright shadow-xl mb-4 animate-pulse">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
        <p className="text-xs font-mono tracking-widest text-zinc-400 uppercase">
          Verifying Operations Credentials...
        </p>
      </div>
    );
  }

  // RBAC Access Control Guard: Prevent Clients from Accessing Admin Routes
  if (supabaseUser && !isAdmin) {
    return (
      <div className="min-h-screen bg-brand-obsidian flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-3xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-5 shadow-2xl">
          <Lock className="w-8 h-8" />
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-white font-mono uppercase tracking-wider">
          Access Restricted
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-md mt-2 leading-relaxed">
          The LivRise Operations Console is restricted to internal engineers, administrators, and project managers. Your account is recognized as an external Client account.
        </p>
        <div className="flex items-center gap-3 mt-6">
          <Link
            href="/portal"
            className="px-5 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/20"
          >
            Go to Client Portal
          </Link>
          <button
            type="button"
            onClick={() => signOut()}
            className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white text-xs font-mono transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-obsidian text-[#F5F5F3] flex flex-col md:flex-row transition-colors duration-200">
      {/* Desktop Admin Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-brand-obsidian border-r border-zinc-800 shrink-0 justify-between">
        <div>
          {/* Logo Header */}
          <div className="h-16 flex items-center justify-between px-5 border-b border-zinc-800">
            <Link href="/" className="block">
              <LivRiseLogo size="sm" asLink={false} />
            </Link>
            <div className="flex items-center gap-1.5">
              <ThemeToggle />
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-brand-charcoal text-brand-gold-bright font-bold border border-brand-gold/30">
                ADMIN
              </span>
            </div>
          </div>

          {/* Admin User Badge */}
          <div className="p-3 mx-3 my-3 rounded-2xl bg-brand-charcoal border border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-brand-gold-bright text-black font-bold flex items-center justify-center font-mono text-xs shrink-0">
                {(user?.fullName || 'A').charAt(0)}
              </div>
              <div className="truncate text-xs">
                <p className="font-bold text-white truncate">{user?.fullName || 'LivRise Admin'}</p>
                <p className="text-[10px] text-brand-gold-bright font-mono font-semibold uppercase">
                  {user?.role || 'ADMIN'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => signOut()}
              title="Sign Out"
              className="text-zinc-500 hover:text-rose-400 p-1 rounded-lg transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
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
                      ? 'bg-brand-gold-bright text-black font-bold shadow-md shadow-amber-500/20'
                      : 'text-zinc-400 hover:text-white hover:bg-brand-charcoal'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && item.badge > 0 ? (
                    <span className="w-4 h-4 rounded-full bg-black text-brand-gold-bright font-mono text-[9px] flex items-center justify-center font-bold">
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
            href="/portal"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-brand-gold-bright bg-brand-charcoal border border-brand-gold/30 hover:bg-brand-graphite transition-all"
          >
            <div className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5" />
              <span>Switch to Client Portal</span>
            </div>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs text-zinc-500 hover:text-white hover:bg-brand-charcoal transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Public Website</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0">
        {/* Mobile Header */}
        <header className="md:hidden h-14 bg-brand-obsidian border-b border-zinc-800 flex items-center justify-between px-4 sticky top-0 z-30 pt-safe">
          <Link href="/admin" className="block">
            <LivRiseLogo size="sm" asLink={false} />
          </Link>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/app"
              className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-lg bg-brand-charcoal text-brand-gold-bright border border-brand-gold/30"
            >
              Client View
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-white bg-brand-charcoal border border-zinc-800"
              aria-label="Toggle admin menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </header>

        {/* Mobile Drawer Overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-brand-obsidian/95 backdrop-blur-2xl p-5 pt-20 overflow-y-auto space-y-3 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <span className="text-xs font-mono font-bold text-brand-gold-bright uppercase">
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
                        ? 'bg-brand-gold-bright text-black font-bold'
                        : 'text-zinc-400 hover:bg-brand-charcoal'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && item.badge > 0 ? (
                      <span className="w-4 h-4 rounded-full bg-black text-brand-gold-bright font-mono text-[9px] flex items-center justify-center font-bold">
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
        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto bg-brand-obsidian">
          {children}
        </main>
      </div>
    </div>
  );
}
