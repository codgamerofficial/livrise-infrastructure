'use client';

import React from 'react';
import { LucideIcon, Inbox } from 'lucide-react';
import Link from 'next/link';

interface AppEmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  className?: string;
}

export function AppEmptyState({
  icon: Icon = Inbox,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  className = '',
}: AppEmptyStateProps) {
  return (
    <div
      className={`w-full py-12 px-6 flex flex-col items-center justify-center text-center liquid-glass rounded-2xl border border-white/10 ${className}`}
    >
      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 mb-4 shadow-inner">
        <Icon className="w-6 h-6 text-zinc-400" />
      </div>

      <h3 className="text-base font-medium text-white mb-1.5 tracking-tight">
        {title}
      </h3>

      <p className="text-xs sm:text-sm text-zinc-400 max-w-sm leading-relaxed mb-5">
        {description}
      </p>

      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-colors shadow-sm"
        >
          {actionLabel}
        </Link>
      )}

      {actionLabel && !actionHref && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-colors shadow-sm"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
