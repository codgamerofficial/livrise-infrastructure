'use client';

import Link from 'next/link';
import { LivRiseLogo } from '@/components/ui/LivRiseLogo';
import { Mail, Phone, MapPin, Shield, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { SEED_OFFICES } from '@/lib/seed-data';
import { getGmailComposeLink } from '@/lib/site-settings';

export function Footer() {
  return (
    <footer className="bg-[#060a12] border-t border-white/5 text-slate-400 text-sm">
      {/* Upper Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <LivRiseLogo size="md" asLink={false} />
            </Link>
            <p className="font-medium text-xs tracking-wider uppercase text-amber-400/90">
              Engineering • Architecture • Infrastructure
            </p>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Building Ideas Into Reality. A premier digital engineering, architectural consultancy, and infrastructure development enterprise headquartered in India.
            </p>

            <div className="pt-2 space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-300">Executive Leadership:</span>
                <span className="text-amber-300 font-medium">Iman Khanra</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <a
                  href={getGmailComposeLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  livriseinfrastructure@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <a href="https://wa.me/916296603868" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  +91 6296603868
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links: Services */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wider uppercase">Services</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/services/structural-engineering" className="hover:text-amber-300 transition-colors">
                  Structural Engineering
                </Link>
              </li>
              <li>
                <Link href="/services/architectural-planning" className="hover:text-amber-300 transition-colors">
                  Architectural Planning
                </Link>
              </li>
              <li>
                <Link href="/services/infrastructure-consultancy" className="hover:text-amber-300 transition-colors">
                  Infrastructure & Bridges
                </Link>
              </li>
              <li>
                <Link href="/services/retrofitting-stability" className="hover:text-amber-300 transition-colors">
                  Retrofitting & Stability
                </Link>
              </li>
              <li>
                <Link href="/services/3d-elevation-visualization" className="hover:text-amber-300 transition-colors">
                  3D Elevation & CGI
                </Link>
              </li>
              <li>
                <Link href="/services/project-management-estimation" className="hover:text-amber-300 transition-colors">
                  Estimation & PMC
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links: Platform & Corporate */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wider uppercase">Platform</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/portal" className="text-amber-400 hover:text-amber-300 flex items-center gap-1">
                  <span>Client Portal</span>
                  <Shield className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-slate-300 hover:text-white flex items-center gap-1">
                  <span>Admin Console</span>
                  <Shield className="w-3 h-3 text-slate-500" />
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-amber-300 transition-colors">
                  Portfolio Directory
                </Link>
              </li>
              <li>
                <Link href="/awards" className="hover:text-amber-300 transition-colors">
                  National Awards
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-amber-300 transition-colors">
                  Engineers & Advisors
                </Link>
              </li>
              <li>
                <Link href="/insights" className="hover:text-amber-300 transition-colors">
                  Engineering Insights
                </Link>
              </li>
            </ul>
          </div>

          {/* Registered Offices */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wider uppercase">Regional Offices</h4>
            <div className="space-y-4 text-xs">
              {SEED_OFFICES.map((off) => (
                <div key={off.id} className="border-l-2 border-amber-500/30 pl-3 space-y-1">
                  <p className="font-semibold text-slate-200">{off.region}</p>
                  <p className="text-slate-400 leading-snug">{off.address}, {off.city}, {off.state} - {off.pinCode}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 bg-[#04070d] py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} LivRise Infrastructure. All rights reserved.</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline-flex text-slate-400 items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 inline" />
              Building Ideas Into Reality.
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <Link href="/privacy" className="hover:text-slate-200 transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-slate-200 transition-colors">Terms of Service</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-slate-200 transition-colors">Contact Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
