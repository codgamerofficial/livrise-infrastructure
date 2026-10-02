'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Briefcase,
  MessageSquare,
  FileText,
  User,
} from 'lucide-react';
import { useLivRiseStore } from '@/lib/store';

export function BottomNavigation() {
  const pathname = usePathname();
  const { messages, documents } = useLivRiseStore();

  const unreadMessagesCount = messages.filter((m) => !m.isRead).length;

  const navItems = [
    {
      label: 'Home',
      href: '/app',
      icon: Home,
      exact: true,
    },
    {
      label: 'Projects',
      href: '/app/projects',
      icon: Briefcase,
      exact: false,
    },
    {
      label: 'Messages',
      href: '/app/messages',
      icon: MessageSquare,
      badge: unreadMessagesCount > 0 ? unreadMessagesCount : undefined,
      exact: false,
    },
    {
      label: 'Documents',
      href: '/app/documents',
      icon: FileText,
      exact: false,
    },
    {
      label: 'Me',
      href: '/app/profile',
      icon: User,
      exact: false,
    },
  ];

  return (
    <nav
      aria-label="App Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-xl border-t border-white/10 pb-safe shadow-[0_-4px_24px_rgba(0,0,0,0.8)]"
    >
      <div className="flex items-center justify-around h-14 px-2">
        {navItems.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`relative flex flex-col items-center justify-center flex-1 h-full py-1 transition-all touch-target ${
                isActive
                  ? 'text-white'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? 'scale-110 text-amber-400' : ''
                  }`}
                />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 min-w-[16px] h-4 px-1 rounded-full bg-amber-500 text-black text-[9px] font-bold flex items-center justify-center shadow-sm">
                    {item.badge}
                  </span>
                )}
              </div>

              <span
                className={`text-[10px] mt-0.5 tracking-tight transition-colors ${
                  isActive ? 'font-semibold text-white' : 'font-normal'
                }`}
              >
                {item.label}
              </span>

              {/* Active dot indicator */}
              {isActive && (
                <div className="absolute bottom-1 w-1 h-1 rounded-full bg-amber-400" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
