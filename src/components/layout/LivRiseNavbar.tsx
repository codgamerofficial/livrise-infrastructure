'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LivRiseLogo } from '@/components/brand/LivRiseLogo';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import {
  Menu,
  X,
  ArrowRight,
  Shield,
  Phone,
  Compass,
  Briefcase,
  Layers,
  Sparkles,
  Info,
  BookOpen,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getWhatsAppLink } from '@/lib/site-settings';

export function LivRiseNavbar() {
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

  // Desktop Links per Master Prompt Section 11:
  // About, Services, Projects, Capabilities, Insights
  const desktopLinks = [
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Projects', href: '/projects' },
    { label: 'Capabilities', href: '/capabilities' },
    { label: 'Insights', href: '/insights' },
  ];

  // Mobile menu items
  const mobileNavItems = [
    { label: 'Home', href: '/', icon: Compass, desc: 'Return to start' },
    { label: 'Services', href: '/services', icon: Layers, desc: 'House Plan, 3D Design, Interior, Build' },
    { label: 'Projects', href: '/projects', icon: Briefcase, desc: 'Real architectural executions' },
    { label: 'Capabilities', href: '/capabilities', icon: Sparkles, desc: 'Engineering & technical analysis' },
    { label: 'How It Works', href: '/#how-it-works', icon: Layers, desc: 'Consultation to handover' },
    { label: 'About', href: '/about', icon: Info, desc: 'Our architecture & engineering firm' },
    { label: 'Insights', href: '/insights', icon: BookOpen, desc: 'Construction trends & guides' },
    { label: 'Contact', href: '/contact', icon: Phone, desc: 'Direct consultation' },
    { label: 'Client Portal', href: '/portal', icon: Shield, desc: 'Track your live project & files' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full px-4 sm:px-6 md:px-10 lg:px-12 ${
          isScrolled ? 'pt-2.5 pb-2.5' : 'pt-4 sm:pt-5 pb-2'
        }`}
      >
        <nav
          className={`max-w-7xl mx-auto rounded-2xl flex items-center justify-between transition-all duration-300 px-4 sm:px-6 py-2.5 border ${
            isScrolled
              ? 'bg-brand-obsidian/90 backdrop-blur-xl border-amber-500/20 shadow-2xl shadow-black/60'
              : 'bg-brand-obsidian/75 backdrop-blur-lg border-white/10'
          }`}
        >
          {/* Left: Master LR Logo */}
          <div className="flex items-center">
            <LivRiseLogo size={isScrolled ? 'sm' : 'md'} />
          </div>

          {/* Center: Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm">
            {desktopLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (!link.href.startsWith('/#') && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`transition-all duration-200 font-medium relative py-1 text-xs xl:text-sm tracking-wide ${
                    isActive
                      ? 'text-brand-gold-bright font-semibold'
                      : 'text-zinc-300 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-brand-gold to-brand-gold-bright rounded-full" />
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
              href="/portal"
              className="hidden sm:inline-flex text-xs font-semibold px-3 py-2 rounded-xl border border-white/15 bg-white/5 text-zinc-200 hover:text-white hover:bg-white/10 transition-all items-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5 text-brand-gold-bright" />
              <span>Client Portal</span>
            </Link>

            {/* Contact Link */}
            <Link
              href="/contact"
              className="hidden md:inline-flex text-xs font-semibold px-3 py-2 rounded-xl text-zinc-300 hover:text-white transition-colors"
            >
              <span>Contact</span>
            </Link>

            {/* Master CTA: START A PROJECT (Gold Gradient) */}
            <Link
              href="/start-project"
              className="hidden sm:inline-flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl gold-button uppercase tracking-wider group"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl border border-white/15 bg-white/5 text-white hover:bg-white/10 transition-colors focus:outline-none"
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-40 bg-brand-obsidian/95 backdrop-blur-2xl flex flex-col pt-24 pb-20 px-4 overflow-y-auto"
          >
            <div className="max-w-md mx-auto w-full space-y-4">
              <div className="flex items-center justify-between px-2 pb-2 border-b border-white/10">
                <span className="text-xs uppercase tracking-widest font-bold text-brand-gold-bright">
                  LivRise Architecture
                </span>
                <span className="text-[11px] text-zinc-400 font-mono">
                  Engineering • Design
                </span>
              </div>

              {/* Navigation Cards */}
              <div className="grid grid-cols-1 gap-2 pt-1">
                {mobileNavItems.map((item, idx) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.03 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3.5 p-3 rounded-2xl border transition-all ${
                          isActive
                            ? 'bg-amber-500/10 border-amber-500/30 text-white'
                            : 'bg-brand-charcoal border-white/10 text-zinc-300 hover:text-white hover:border-white/20'
                        }`}
                      >
                        <div className="w-9 h-9 rounded-xl bg-black/60 border border-white/10 flex items-center justify-center shrink-0">
                          <Icon className={`w-4 h-4 ${isActive ? 'text-brand-gold-bright' : 'text-zinc-300'}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-sm text-white">
                            {item.label}
                          </div>
                          <div className="text-xs text-zinc-400 truncate">
                            {item.desc}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-zinc-500" />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Mobile CTA */}
              <div className="pt-3 space-y-2.5">
                <Link
                  href="/start-project"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 p-3.5 rounded-2xl gold-button uppercase tracking-wider text-sm shadow-xl shadow-amber-500/20"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Start a Project</span>
                </Link>

                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/app"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl border border-white/15 bg-white/5 text-zinc-200 text-xs font-semibold"
                  >
                    <Shield className="w-3.5 h-3.5 text-brand-gold-bright" />
                    <span>Client Portal</span>
                  </Link>

                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-semibold"
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
