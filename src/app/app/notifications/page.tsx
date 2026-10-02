'use client';

import React, { useState } from 'react';
import { useLivRiseStore } from '@/lib/store';
import {
  Bell,
  CheckCircle2,
  FileText,
  CreditCard,
  MessageSquare,
  Clock,
  ArrowRight,
  Shield,
} from 'lucide-react';
import Link from 'next/link';
import { AppEmptyState } from '@/components/app/AppEmptyState';

export default function ClientNotificationsPage() {
  const { notifications, markNotificationAsRead } = useLivRiseStore();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filteredNotifs = filter === 'unread'
    ? notifications.filter((n) => !n.isRead)
    : notifications;

  const getIcon = (type: string) => {
    switch (type) {
      case 'invoice':
      case 'payment':
        return <CreditCard className="w-4 h-4 text-emerald-400" />;
      case 'message':
        return <MessageSquare className="w-4 h-4 text-purple-400" />;
      case 'milestone':
        return <Clock className="w-4 h-4 text-amber-400" />;
      default:
        return <FileText className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-1">
            <span>Notification Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
            Activity & Alerts
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Real-time transmittals, milestone certifications, and engineering updates.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
              filter === 'all'
                ? 'bg-white text-black font-semibold'
                : 'bg-white/5 text-zinc-400 hover:text-white'
            }`}
          >
            All ({notifications.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('unread')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
              filter === 'unread'
                ? 'bg-white text-black font-semibold'
                : 'bg-white/5 text-zinc-400 hover:text-white'
            }`}
          >
            Unread ({notifications.filter((n) => !n.isRead).length})
          </button>
        </div>
      </div>

      {/* Notifications list */}
      {filteredNotifs.length > 0 ? (
        <div className="space-y-3">
          {filteredNotifs.map((notif) => (
            <div
              key={notif.id}
              onClick={() => markNotificationAsRead(notif.id)}
              className={`p-4 sm:p-5 rounded-2xl liquid-glass border transition-all flex items-start justify-between gap-4 cursor-pointer ${
                notif.isRead
                  ? 'border-white/5 bg-black/40 opacity-75'
                  : 'border-amber-500/30 bg-amber-950/10'
              }`}
            >
              <div className="flex items-start gap-3.5 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                  {getIcon(notif.type)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-white tracking-tight">
                      {notif.title}
                    </h3>
                    {!notif.isRead && (
                      <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                    {notif.message}
                  </p>
                  <span className="text-[10px] font-mono text-zinc-500 mt-2 block">
                    {new Date(notif.createdAt).toLocaleDateString([], {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>

              {notif.linkUrl && (
                <Link
                  href={notif.linkUrl.startsWith('/admin') ? '/app' : notif.linkUrl}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white text-zinc-300 hover:text-black transition-colors shrink-0"
                  title="View Item"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          ))}
        </div>
      ) : (
        <AppEmptyState
          icon={Bell}
          title="No notifications to display"
          description="You're all caught up! Updates regarding milestone deliveries and invoices will appear here."
        />
      )}
    </div>
  );
}
