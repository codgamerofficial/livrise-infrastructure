'use client';

import React from 'react';
import Link from 'next/link';
import { WifiOff, RefreshCw, Home, ArrowLeft } from 'lucide-react';
import { LivRiseLogo } from '@/components/ui/LivRiseLogo';

export default function OfflinePage() {
  const handleRetry = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-between p-6 md:p-12 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-75 h-75 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Top Bar with Brand */}
      <header className="relative z-10 w-full max-w-md flex items-center justify-between pt-safe">
        <LivRiseLogo size="md" />
        <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full bg-zinc-800/80 border border-zinc-700/60 text-zinc-400">
          Offline Mode
        </span>
      </header>

      {/* Center Offline Card */}
      <main className="relative z-10 w-full max-w-sm flex flex-col items-center text-center my-auto py-8">
        <div className="w-16 h-16 rounded-2xl liquid-glass border border-white/15 flex items-center justify-center mb-6 shadow-2xl shadow-black/80">
          <WifiOff className="w-8 h-8 text-amber-400/90" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-light tracking-tight text-white mb-3">
          You&apos;re Offline
        </h1>

        <p className="text-sm text-zinc-400 leading-relaxed mb-8 max-w-xs">
          Some features may be unavailable until you&apos;re connected to the internet. We&apos;ll restore your live updates as soon as connectivity returns.
        </p>

        {/* Action Buttons */}
        <div className="w-full flex flex-col gap-3">
          <button
            type="button"
            onClick={handleRetry}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-white text-black font-medium text-sm hover:bg-zinc-100 transition-colors shadow-lg shadow-white/5 active:scale-[0.99]"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl liquid-glass border border-white/10 text-zinc-300 font-medium text-sm hover:text-white hover:border-white/20 transition-all active:scale-[0.99]"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
        </div>
      </main>

      {/* Bottom info */}
      <footer className="relative z-10 text-xs text-zinc-600 font-mono tracking-wider text-center pb-safe">
        LIVRISE INFRASTRUCTURE • DIGITAL PLATFORM
      </footer>
    </div>
  );
}
