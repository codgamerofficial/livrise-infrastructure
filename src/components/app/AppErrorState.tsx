'use client';

import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

interface AppErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function AppErrorState({
  title = 'Something went wrong',
  message = 'An unexpected error occurred while loading this section. Please try again.',
  onRetry,
  className = '',
}: AppErrorStateProps) {
  return (
    <div
      className={`w-full py-12 px-6 flex flex-col items-center justify-center text-center liquid-glass rounded-2xl border border-red-500/20 bg-red-950/10 ${className}`}
    >
      <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mb-4">
        <AlertTriangle className="w-6 h-6" />
      </div>

      <h3 className="text-base font-medium text-white mb-1.5 tracking-tight">
        {title}
      </h3>

      <p className="text-xs sm:text-sm text-zinc-400 max-w-sm leading-relaxed mb-6">
        {message}
      </p>

      <div className="flex items-center gap-3">
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-colors shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
        )}

        <Link
          href="/app"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl liquid-glass border border-white/10 text-xs font-medium text-zinc-300 hover:text-white transition-colors"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Portal Home</span>
        </Link>
      </div>
    </div>
  );
}
