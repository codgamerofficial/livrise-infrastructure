'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { useLivRiseStore } from '@/lib/store';
import { LivRiseLogo } from '@/components/brand/LivRiseLogo';
import { Lock, Mail, ArrowRight, ShieldCheck, UserCheck, Loader2 } from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectParam = searchParams.get('redirect');
  const { signIn, isLoading } = useAuth();
  const { switchRole } = useLivRiseStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await signIn(email.trim(), password);
      if (!res.success) {
        setError(res.error || 'Invalid email or password. Please verify credentials.');
        setSubmitting(false);
        return;
      }

      // Synchronize role state
      if (res.role) {
        switchRole(res.role);
      }

      // Route based on role and redirect param
      if (res.role === 'client') {
        if (redirectParam && redirectParam.startsWith('/portal')) {
          router.push(redirectParam);
        } else {
          router.push('/portal');
        }
      } else {
        if (redirectParam && (redirectParam.startsWith('/admin') || redirectParam.startsWith('/portal'))) {
          router.push(redirectParam);
        } else {
          router.push('/admin');
        }
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleQuickFill = (fillEmail: string, fillPass: string) => {
    setEmail(fillEmail);
    setPassword(fillPass);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-brand-obsidian flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 blueprint-grid relative select-none">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <div className="inline-block mx-auto">
          <LivRiseLogo size="md" href="/" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          LivRise Digital Portal
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400">
          Client Workspace & Engineering Operations Desk
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-brand-charcoal py-8 px-6 shadow-2xl rounded-3xl border border-brand-gold/30 sm:px-10 space-y-6">
          {error && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs leading-relaxed">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="name@livrise.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-brand-obsidian border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-white text-sm focus:border-brand-gold-bright focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                  Password
                </label>
                <Link href="/forgot-password" className="text-xs text-brand-gold-bright hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-brand-obsidian border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-white text-sm focus:border-brand-gold-bright focus:outline-none transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting || isLoading}
              className="w-full py-3.5 rounded-xl gold-button text-xs font-bold uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Platform</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick-Fill Live Verified Credentials */}
          <div className="pt-4 border-t border-zinc-800 space-y-2.5">
            <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider block text-center">
              Quick-Fill Verified Live Credentials:
            </span>

            <div className="grid grid-cols-1 gap-2">
              <button
                type="button"
                onClick={() => handleQuickFill('admin@livriseinfrastructure.com', 'LivRiseAdmin@2026')}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-brand-obsidian hover:bg-brand-graphite border border-brand-gold/30 text-xs text-brand-gold-bright font-medium transition-colors text-left"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-brand-gold-bright" />
                  <span>Admin & Operations Console</span>
                </div>
                <span className="text-[10px] font-mono text-zinc-400">admin@ →</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickFill('client@livriseinfrastructure.com', 'LivRiseClient@2026')}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-brand-obsidian hover:bg-brand-graphite border border-zinc-800 text-xs text-zinc-200 font-medium transition-colors text-left"
              >
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-emerald-400" />
                  <span>Client & Homeowner Portal</span>
                </div>
                <span className="text-[10px] font-mono text-zinc-400">client@ →</span>
              </button>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-zinc-400">
          Return to{' '}
          <Link href="/" className="text-brand-gold-bright hover:underline">
            LivRise Homepage
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-brand-obsidian flex flex-col justify-center items-center p-4">
          <Loader2 className="w-8 h-8 animate-spin text-brand-gold-bright" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
