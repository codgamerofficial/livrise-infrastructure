'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLivRiseStore } from '@/lib/store';
import { LivRiseLogo } from '@/components/ui/LivRiseLogo';
import { UserRole } from '@/types';
import { Lock, Mail, ArrowRight, ShieldCheck, Briefcase } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { switchRole } = useLivRiseStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (email.toLowerCase().includes('consultant') || email.toLowerCase().includes('pm')) {
      switchRole('project_manager');
      router.push('/admin');
    } else {
      switchRole('super_admin');
      router.push('/admin');
    }
  };

  const handleQuickLogin = (role: UserRole) => {
    switchRole(role);
    router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-[#090d16] flex flex-col justify-center py-12 sm:px-6 lg:px-8 blueprint-grid relative">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <Link href="/" className="inline-block mx-auto">
          <LivRiseLogo size="md" asLink={false} />
        </Link>
        <h2 className="text-2xl font-extrabold text-white">Access Digital Platform</h2>
        <p className="text-xs text-slate-400">Engineering Operations & Admin Workspace</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[#0e1424] py-8 px-6 shadow-2xl rounded-2xl border border-white/10 sm:px-10 space-y-6">
          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-xs">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Corporate Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-white text-sm focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Password
                </label>
                <Link href="/forgot-password" className="text-xs text-amber-400 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-white text-sm focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-linear-to-r from-[#d4af37] to-[#c5a059] text-slate-950 font-bold text-sm hover:brightness-110 shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Sign In to Platform</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Access Profiles for Review / Demo */}
          <div className="pt-4 border-t border-white/10 space-y-3">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block text-center">
              Quick Role Simulation Logins:
            </span>

            <div className="grid grid-cols-1 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin('super_admin')}
                className="w-full flex items-center justify-between p-2.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-xs text-amber-300 font-medium transition-colors text-left"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>CEO & Admin (Iman Khanra)</span>
                </div>
                <span className="text-[10px] font-mono text-amber-400/80">Admin Console →</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('project_manager')}
                className="w-full flex items-center justify-between p-2.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-xs text-blue-300 font-medium transition-colors text-left"
              >
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  <span>Operations Lead (Project Manager)</span>
                </div>
                <span className="text-[10px] font-mono text-blue-400/80">Engineering Ops →</span>
              </button>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          Return to{' '}
          <Link href="/" className="text-amber-400 hover:underline">
            LivRise Homepage
          </Link>
        </p>
      </div>
    </div>
  );
}
