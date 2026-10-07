'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AppShell } from '@/components/app/AppShell';
import { useAuth } from '@/lib/auth-context';
import { Shield, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function ClientPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, supabaseUser, isLoading, isAdmin } = useAuth();

  useEffect(() => {
    if (!isLoading && !supabaseUser) {
      const target = pathname || '/portal';
      router.push(`/login?redirect=${encodeURIComponent(target)}`);
    }
  }, [isLoading, supabaseUser, router, pathname]);

  if (isLoading || !supabaseUser) {
    return (
      <div className="min-h-screen bg-brand-obsidian flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 rounded-2xl bg-brand-charcoal border border-brand-gold/30 flex items-center justify-center text-brand-gold-bright shadow-xl mb-4 animate-pulse">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
        <p className="text-xs font-mono tracking-widest text-zinc-400 uppercase">
          {isLoading ? 'Verifying Client Session...' : 'Redirecting to Client Login...'}
        </p>
      </div>
    );
  }

  return (
    <AppShell>
      {/* Admin Preview Mode Alert Banner */}
      {isAdmin && (
        <div className="bg-amber-400/10 border-b border-amber-400/20 px-4 py-2 flex items-center justify-between text-xs text-amber-300">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-amber-400" />
            <span className="font-semibold">
              Admin Preview Mode: Viewing Client Portal as {user?.fullName || user?.email}
            </span>
          </div>
          <Link
            href="/admin"
            className="flex items-center gap-1 font-mono text-[11px] font-bold text-amber-400 hover:text-amber-300 underline"
          >
            <span>Back to Operations Console</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
      {children}
    </AppShell>
  );
}
