'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LivRiseLogo } from '@/components/ui/LivRiseLogo';
import { Menu, X, ArrowRight, Shield } from 'lucide-react';
import { useLivRiseStore } from '@/lib/store';
import { getGmailComposeLink } from '@/lib/site-settings';

interface LivRiseNavbarProps {
  onOpenEnquiry?: () => void;
}

export function LivRiseNavbar({ onOpenEnquiry }: LivRiseNavbarProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser, siteSettings } = useLivRiseStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
  }

  const navLinks = [
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Projects', href: '/projects' },
    { label: 'Capabilities', href: '/#capabilities' },
    { label: 'Insights', href: '/insights' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full px-4 sm:px-6 md:px-12 lg:px-16 ${
        isScrolled ? 'pt-2.5 pb-2 bg-black/40 backdrop-blur-md' : 'pt-6'
      }`}
    >
      <nav
        className={`liquid-glass rounded-xl mx-auto flex items-center justify-between transition-all duration-300 ${
          isScrolled
            ? 'px-4 py-2 border border-white/20 bg-black/75 shadow-2xl shadow-black/80 backdrop-blur-xl'
            : 'px-4 sm:px-6 py-2.5 border border-white/10'
        }`}
      >
        {/* Left: Brand Logo */}
        <div className="flex items-center">
          <LivRiseLogo size={isScrolled ? 'sm' : 'md'} />
        </div>

        {/* Center: Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-7 xl:gap-8 text-sm">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== '/' && !link.href.startsWith('/#') && pathname.startsWith(link.href));
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`transition-colors duration-200 font-medium ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-zinc-300 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Desktop Contact link */}
          <Link
            href="/contact"
            className="hidden md:inline-flex text-sm font-medium text-zinc-300 hover:text-white transition-colors px-3 py-1.5"
          >
            Contact
          </Link>

          {/* Mobile WhatsApp Action Button */}
          <a
            href={siteSettings?.whatsappUrl || 'https://wa.me/916296603868'}
            target="_blank"
            rel="noopener noreferrer"
            className="md:hidden inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 hover:bg-emerald-500/20 transition-all"
            aria-label="Chat on WhatsApp"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.074-2.121-.527-1.745-.734-2.852-2.545-2.937-2.66-.086-.115-.705-.939-.705-1.791 0-.853.447-1.272.607-1.446.16-.174.349-.217.465-.217.117 0 .233.002.334.007.106.005.249-.04.39.298.144.348.491 1.199.534 1.286.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.303c-.087.087-.178.182-.076.357.101.174.453.748.971 1.21.668.595 1.232.78 1.406.867.174.086.275.072.376-.044.102-.115.434-.506.55-.679.115-.174.231-.145.39-.087.159.058 1.009.477 1.182.564.173.086.289.13.332.202.043.072.043.419-.101.824z" />
            </svg>
            <span>WhatsApp</span>
          </a>

          {/* Start a Project Primary CTA */}
          <Link
            href="/start-project"
            className="bg-white text-black px-3.5 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-zinc-100 transition-colors duration-200 whitespace-nowrap shadow-sm shadow-white/10 flex items-center gap-1.5"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-3.5 h-3.5 hidden sm:inline" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-zinc-300 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2.5 rounded-2xl liquid-glass border border-white/20 p-5 shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-3 py-2 rounded-lg text-base font-medium text-zinc-200 hover:text-white hover:bg-white/10 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/contact"
              className="px-3 py-2 rounded-lg text-base font-medium text-zinc-200 hover:text-white hover:bg-white/10 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>

            {/* Direct Official Contact Cards inside Mobile Drawer */}
            <div className="py-2.5 px-3 rounded-xl bg-white/5 border border-white/10 space-y-2 text-xs">
              <a
                href={siteSettings?.whatsappUrl || 'https://wa.me/916296603868'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between text-emerald-400 hover:text-emerald-300 font-medium"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.074-2.121-.527-1.745-.734-2.852-2.545-2.937-2.66-.086-.115-.705-.939-.705-1.791 0-.853.447-1.272.607-1.446.16-.174.349-.217.465-.217.117 0 .233.002.334.007.106.005.249-.04.39.298.144.348.491 1.199.534 1.286.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.303c-.087.087-.178.182-.076.357.101.174.453.748.971 1.21.668.595 1.232.78 1.406.867.174.086.275.072.376-.044.102-.115.434-.506.55-.679.115-.174.231-.145.39-.087.159.058 1.009.477 1.182.564.173.086.289.13.332.202.043.072.043.419-.101.824z" />
                  </svg>
                  <span>WhatsApp: {siteSettings?.displayWhatsApp || '+91 6296603868'}</span>
                </span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                  Chat
                </span>
              </a>

              <a
                href={getGmailComposeLink(
                  siteSettings?.defaultEmailSubject,
                  siteSettings?.defaultEmailBody,
                  siteSettings?.contactEmail
                )}
                target="_blank"
                rel="noopener noreferrer"
                title="Open Gmail Compose"
                className="flex items-center justify-between text-zinc-300 hover:text-white font-medium"
              >
                <span className="truncate pr-2">Email: {siteSettings?.contactEmail || 'livriseinfrastructure@gmail.com'}</span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-white/10 text-zinc-300 shrink-0">
                  Write
                </span>
              </a>
            </div>

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <Link
                href="/start-project"
                className="w-full text-center bg-white text-black py-2.5 rounded-lg text-sm font-semibold hover:bg-zinc-100 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Start a Project
              </Link>

              <div className="pt-1">
                <Link
                  href="/admin"
                  className="flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium text-amber-300 bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 w-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Shield className="w-3.5 h-3.5 text-amber-400" />
                  <span>Admin Console</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
