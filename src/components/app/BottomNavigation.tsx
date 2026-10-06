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
  const { messages } = useLivRiseStore();

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
      label: 'Profile',
      href: '/app/profile',
      icon: User,
      exact: false,
    },
  ];

  return (
    <nav
      aria-label="App Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-(--surface-primary)/90 backdrop-blur-xl border-t border-(--border-subtle) pb-safe shadow-lg transition-colors duration-200"
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
                  ? 'text-brand-indigo dark:text-brand-blue'
                  : 'text-(--text-muted) hover:text-(--text-primary)'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? 'scale-110 text-brand-indigo dark:text-brand-blue' : ''
                  }`}
                />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 min-w-4 h-4 px-1 rounded-full bg-brand-indigo text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
                    {item.badge}
                  </span>
                )}
              </div>

              <span
                className={`text-[10px] mt-0.5 tracking-tight transition-colors ${
                  isActive ? 'font-bold text-brand-indigo dark:text-brand-blue' : 'font-medium'
                }`}
              >
                {item.label}
              </span>

              {/* Active dot indicator */}
              {isActive && (
                <div className="absolute bottom-1 w-1 h-1 rounded-full bg-brand-indigo dark:bg-brand-blue" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
