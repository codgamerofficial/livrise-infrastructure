'use client';

import React from 'react';
import Link from 'next/link';
import { useLivRiseStore } from '@/lib/store';
import {
  Bell,
  CheckCircle2,
  FileText,
  CreditCard,
  MessageSquare,
  Clock,
  Layers,
  ArrowRight,
} from 'lucide-react';

export default function ClientNotificationsPage() {
  const { notifications, markNotificationAsRead } = useLivRiseStore();

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'quotation':
      case 'document':
        return FileText;
      case 'invoice':
      case 'payment':
        return CreditCard;
      case 'message':
        return MessageSquare;
      default:
        return Bell;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-1">
            <span>Real-time Telemetry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
            Notification Center
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Official project milestone updates, document sign-off alerts, and billing releases.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="text-zinc-400">Unread:</span>
          <span className="px-2.5 py-1 rounded-lg bg-amber-400/10 text-amber-400 font-bold border border-amber-400/20">
            {unreadCount}
          </span>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-[#0c1222] border border-white/5 space-y-2">
            <Bell className="w-8 h-8 text-zinc-600 mx-auto" />
            <p className="text-sm text-zinc-400">You are all caught up! No notifications.</p>
          </div>
        ) : (
          notifications.map((item) => {
            const Icon = getIcon(item.type);
            return (
              <div
                key={item.id}
                onClick={() => markNotificationAsRead(item.id)}
                className={`p-4 sm:p-5 rounded-2xl border transition-all flex items-start justify-between gap-4 cursor-pointer ${
                  !item.isRead
                    ? 'bg-amber-400/4 border-amber-400/30'
                    : 'bg-[#0c1222] border-white/5 hover:border-white/10'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`p-2.5 rounded-xl shrink-0 ${
                      !item.isRead ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-white/5 text-zinc-400'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs font-semibold text-white">{item.title}</h3>
                      {!item.isRead && (
                        <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">{item.message}</p>
                    <span className="text-[10px] font-mono text-zinc-500 block pt-1">
                      {new Date(item.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>

                {item.linkUrl && (
                  <Link
                    href={item.linkUrl.replace('/app', '/portal')}
                    className="p-2 rounded-xl bg-white/5 text-zinc-400 hover:text-white shrink-0"
                    title="Open Related Feature"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
