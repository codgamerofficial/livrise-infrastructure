'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LivRiseLogo } from '@/components/ui/LivRiseLogo';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import {
  Menu,
  X,
  ArrowRight,
  Shield,
  Sparkles,
  Phone,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getWhatsAppLink } from '@/lib/site-settings';

interface LivRiseNavbarProps {
  onOpenEnquiry?: () => void;
}

export function LivRiseNavbar({ onOpenEnquiry }: LivRiseNavbarProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Exactly matching Master Prompt Section 10:
  // Home, Services, Projects, How It Works, About, Insights
  const desktopLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Projects', href: '/projects' },
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'About', href: '/about' },
    { label: 'Insights', href: '/insights' },
  ];

  // Mobile navigation cards
  const mobileCards = [
    {
      label: 'Home',
      href: '/',
      symbol: '🏠',
      desc: 'Return to dream home universe',
      gradient: 'from-indigo-500/10 to-sky-500/10 border-indigo-500/20 text-indigo-500',
    },
    {
      label: 'Services',
      href: '/services',
      symbol: '📐',
      desc: 'Plan, 3D Design, Interior, Build',
      gradient: 'from-sky-500/10 to-cyan-500/10 border-sky-500/20 text-sky-500',
    },
    {
      label: 'Projects',
      href: '/projects',
      symbol: '🏗️',
      desc: 'Real architectural executions',
      gradient: 'from-amber-500/10 to-orange-500/10 border-amber-500/20 text-amber-500',
    },
    {
      label: 'How It Works',
      href: '/#how-it-works',
      symbol: '✨',
      desc: 'Consultation to finished home',
      gradient: 'from-purple-500/10 to-pink-500/10 border-purple-500/20 text-purple-500',
    },
    {
      label: 'About',
      href: '/about',
      symbol: '👋',
      desc: 'Our architectural design studio',
      gradient: 'from-emerald-500/10 to-teal-500/10 border-emerald-500/20 text-emerald-500',
    },
    {
      label: 'Insights',
      href: '/insights',
      symbol: '💡',
      desc: 'Design guides & building trends',
      gradient: 'from-rose-500/10 to-pink-500/10 border-rose-500/20 text-rose-500',
    },
    {
      label: 'Contact',
      href: '/contact',
      symbol: '📞',
      desc: 'Direct consultation coordinates',
      gradient: 'from-cyan-500/10 to-blue-500/10 border-cyan-500/20 text-cyan-500',
    },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full px-4 sm:px-6 md:px-10 lg:px-12 ${
          isScrolled ? 'pt-2.5 pb-2.5' : 'pt-5 pb-2'
        }`}
      >
        <nav
          className={`max-w-7xl mx-auto rounded-2xl flex items-center justify-between transition-all duration-300 px-4 sm:px-5 py-2.5 border ${
            isScrolled
              ? 'bg-(--surface-primary)/90 backdrop-blur-xl border-(--border-subtle) shadow-xl shadow-brand-indigo/5'
              : 'bg-(--surface-primary)/70 backdrop-blur-lg border-(--border-subtle)'
          }`}
        >
          {/* Left: Brand Logo */}
          <div className="flex items-center">
            <LivRiseLogo size={isScrolled ? 'sm' : 'md'} />
          </div>

          {/* Center: Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm">
            {desktopLinks.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname === link.href ||
                    (!link.href.startsWith('/#') && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`transition-all duration-200 font-medium relative py-1 ${
                    isActive
                      ? 'text-brand-indigo dark:text-brand-blue font-semibold'
                      : 'text-(--text-secondary) hover:text-(--text-primary)'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-brand-indigo to-brand-blue rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* Client Portal Link */}
            <Link
              href="/app"
              className="hidden sm:inline-flex text-xs font-semibold px-3 py-2 rounded-xl border border-indigo-500/25 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/20 transition-all items-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Client Portal</span>
            </Link>

            {/* Master CTA: GET FREE QUOTE */}
            <Link
              href="/start-project"
              className="hidden md:inline-flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl bg-linear-to-r from-brand-indigo via-[#4F46E5] to-brand-blue text-white shadow-md shadow-brand-indigo/25 hover:shadow-lg hover:shadow-brand-indigo/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 uppercase tracking-wider group"
            >
              <span>Get Free Quote</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl border border-(--border-subtle) bg-(--surface-primary) text-(--text-primary) hover:bg-(--surface-secondary) transition-colors focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* =====================================================================
          MOBILE FULLSCREEN APP MENU (Framer Motion)
          ===================================================================== */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-40 bg-(--bg-primary)/95 backdrop-blur-2xl flex flex-col pt-24 pb-20 px-4 overflow-y-auto"
          >
            <div className="max-w-md mx-auto w-full space-y-4">
              <div className="flex items-center justify-between px-2 pb-1 border-b border-(--border-subtle)">
                <span className="text-xs uppercase tracking-widest font-bold text-brand-indigo">
                  Navigation Menu
                </span>
                <span className="text-xs text-(--text-muted)">
                  Anime × Architecture
                </span>
              </div>

              {/* Colorful Navigation Cards */}
              <div className="grid grid-cols-1 gap-2.5 pt-1">
                {mobileCards.map((card, idx) => (
                  <motion.div
                    key={card.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                  >
                    <Link
                      href={card.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3.5 p-3 rounded-2xl border bg-linear-to-r ${card.gradient} transition-transform active:scale-[0.98] shadow-sm`}
                    >
                      <div className="text-2xl shrink-0 w-10 h-10 rounded-xl bg-(--surface-primary) flex items-center justify-center shadow-xs">
                        {card.symbol}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-sm text-(--text-primary)">
                          {card.label}
                        </div>
                        <div className="text-xs text-(--text-secondary) truncate">
                          {card.desc}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-(--text-muted)" />
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Mobile CTA */}
              <div className="pt-3 space-y-2.5">
                <Link
                  href="/start-project"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-linear-to-r from-brand-indigo via-[#4F46E5] to-brand-blue text-white font-bold text-sm shadow-lg shadow-brand-indigo/30 active:scale-[0.98] transition-transform uppercase tracking-wider"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Get Free Quote</span>
                </Link>

                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/app"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl border border-indigo-500/25 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-semibold"
                  >
                    <Shield className="w-3.5 h-3.5" />
                    <span>Client Portal</span>
                  </Link>

                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl border border-emerald-500/25 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
