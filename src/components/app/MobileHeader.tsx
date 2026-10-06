'use client';

import React from 'react';
import Link from 'next/link';
import { LivRiseLogo } from '@/components/ui/LivRiseLogo';
import { Bell, Search, Plus, Shield } from 'lucide-react';
import { useLivRiseStore } from '@/lib/store';

interface MobileHeaderProps {
  title?: string;
  onOpenActionSheet?: () => void;
  onOpenSearch?: () => void;
}

export function MobileHeader({
  title,
  onOpenActionSheet,
  onOpenSearch,
}: MobileHeaderProps) {
  const { notifications, currentUser } = useLivRiseStore();
  const unreadNotifs = notifications.filter((n) => !n.isRead).length;

  return (
    <header className="md:hidden sticky top-0 left-0 right-0 z-30 bg-black/85 backdrop-blur-xl border-b border-white/10 pt-safe px-4 py-2.5 transition-all">
      <div className="flex items-center justify-between h-11">
        {/* Left: Logo or Page Title */}
        <div className="flex items-center gap-3">
          {title ? (
            <h1 className="text-base font-semibold text-white tracking-tight truncate max-w-50">
              {title}
            </h1>
          ) : (
            <Link href="/app" className="flex items-center">
              <LivRiseLogo size="sm" asLink={false} />
            </Link>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Quick Action Trigger */}
          {onOpenActionSheet && (
            <button
              type="button"
              onClick={onOpenActionSheet}
              aria-label="Quick Actions"
              className="w-8 h-8 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white hover:bg-white/20 active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4 text-amber-400" />
            </button>
          )}

          {/* Search Trigger */}
          {onOpenSearch && (
            <button
              type="button"
              onClick={onOpenSearch}
              aria-label="Search"
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
            >
              <Search className="w-4 h-4" />
            </button>
          )}

          {/* Notification Bell */}
          <Link
            href="/app/notifications"
            aria-label="Notifications"
            className="relative w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
          >
            <Bell className="w-4 h-4" />
            {unreadNotifs > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400 ring-2 ring-black" />
            )}
          </Link>

          {/* If user is admin/super_admin, quick link to admin switch */}
          {(currentUser.role === 'admin' || currentUser.role === 'super_admin') && (
            <Link
              href="/admin"
              aria-label="Switch to Admin Console"
              className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400 hover:bg-amber-500/20 active:scale-95 transition-all"
              title="Admin Console"
            >
              <Shield className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
