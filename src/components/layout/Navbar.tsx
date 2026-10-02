'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLivRiseStore } from '@/lib/store';
import { LivRiseLogo } from '@/components/ui/LivRiseLogo';
import {
  Menu,
  X,
  ArrowRight,
  Shield,
  LayoutDashboard,
  Bell,
  Briefcase,
  Layers,
  Award,
  Users,
  Compass,
  Mail,
} from 'lucide-react';

interface NavbarProps {
  onOpenEnquiry?: () => void;
}

export function Navbar({ onOpenEnquiry }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser, notifications } = useLivRiseStore();

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const navLinks = [
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Projects', href: '/projects' },
    { label: 'Awards', href: '/awards' },
    { label: 'Team', href: '/team' },
    { label: 'Insights', href: '/insights' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#090d16]/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group focus:outline-none">
          <LivRiseLogo size="md" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-amber-400 bg-amber-400/10 border border-amber-400/20'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden md:flex items-center gap-3">

          {/* Admin link if Admin/PM */}
          {(currentUser.role === 'super_admin' || currentUser.role === 'admin' || currentUser.role === 'project_manager') && (
            <Link
              href="/admin"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold text-amber-300 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 transition-colors"
            >
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span>Admin Console</span>
            </Link>
          )}

          {/* Notifications indicator */}
          <Link
            href="/admin"
            className="relative p-2 rounded-md text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400 ring-2 ring-[#090d16]" />
            )}
          </Link>

          {/* Primary CTA: Start a Project */}
          <button
            onClick={onOpenEnquiry}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-linear-to-r from-[#d4af37] via-[#c5a059] to-[#b38f45] text-slate-950 shadow-md shadow-amber-500/10 hover:shadow-amber-500/25 hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenEnquiry}
            className="px-3 py-1.5 rounded text-xs font-bold bg-[#c5a059] text-slate-950"
          >
            Start Project
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0c1220] border-b border-white/10 px-4 pt-3 pb-6 space-y-3">
          <div className="pb-3 border-b border-white/10">
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs font-semibold text-amber-300 w-full"
            >
              <Shield className="w-4 h-4 text-amber-400" />
              <span>Admin Console</span>
            </Link>
          </div>

          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === link.href
                    ? 'text-amber-400 bg-amber-400/10'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenEnquiry) onOpenEnquiry();
              }}
              className="w-full py-2.5 rounded-lg text-sm font-bold bg-linear-to-r from-[#d4af37] to-[#c5a059] text-slate-950 flex items-center justify-center gap-2"
            >
              <span>Start Your Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
