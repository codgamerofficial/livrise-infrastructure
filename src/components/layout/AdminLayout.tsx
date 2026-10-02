'use client';

import React from 'react';
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
  Award,
  Globe,
  LogOut,
  ExternalLink,
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const { currentUser, switchRole, leads } = useLivRiseStore();

  const newLeadsCount = leads.filter((l) => l.status === 'New Leads').length;

  const navItems = [
    { label: 'Executive Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Lead CRM & Pipeline', href: '/admin/leads', icon: Users, badge: newLeadsCount },
    { label: 'Clients Registry', href: '/admin/clients', icon: Users },
    { label: 'Project Operations', href: '/admin/projects', icon: FolderKanban },
    { label: 'Quotations Management', href: '/admin/quotations', icon: FileCheck },
    { label: 'Invoices & Billing', href: '/admin/invoices', icon: Receipt },
    { label: 'Payments Ledger', href: '/admin/payments', icon: Receipt },
    { label: 'Document Vault', href: '/admin/documents', icon: FileText },
    { label: 'CMS Content Studio', href: '/admin/cms', icon: Layers },
    { label: 'Business Analytics', href: '/admin/analytics', icon: BarChart3 },
    { label: 'Security Audit Logs', href: '/admin/audit-logs', icon: History },
    { label: 'System Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#070b14] flex flex-col md:flex-row text-slate-100">
      {/* Admin Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-[#0a0f1d] border-r border-white/5 shrink-0 justify-between">
        <div>
          {/* Logo Header */}
          <div className="h-20 flex items-center justify-between px-6 border-b border-white/5">
            <Link href="/" className="block">
              <LivRiseLogo size="sm" />
            </Link>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
              OPS
            </span>
          </div>

          {/* Admin User Badge */}
          <div className="p-4 mx-3 my-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-400 text-slate-950 font-bold flex items-center justify-center font-mono">
              IK
            </div>
            <div className="truncate text-xs">
              <p className="font-bold text-white truncate">{currentUser.name}</p>
              <p className="text-[10px] text-amber-400 font-mono">CEO / Super Admin</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 space-y-1 overflow-y-auto max-h-[calc(100vh-17rem)]">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/20'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && item.badge > 0 ? (
                    <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-mono text-[10px] flex items-center justify-center font-bold">
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
            href="/"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Live Site</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="md:hidden h-16 bg-[#0a0f1d] border-b border-white/5 flex items-center justify-between px-4 sticky top-0 z-30">
          <Link href="/" className="block">
            <LivRiseLogo size="sm" />
          </Link>
          <span className="text-xs font-bold text-amber-400 font-mono">Operations Console</span>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-8">
          {children}
        </div>
      </div>
    </div>
  );
}
