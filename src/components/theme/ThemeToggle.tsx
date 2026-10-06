'use client';

import React from 'react';
import { useTheme } from './ThemeProvider';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { resolvedTheme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={`relative p-2.5 rounded-full transition-all duration-300 cursor-pointer ${
        resolvedTheme === 'dark'
          ? 'bg-indigo-950/60 text-amber-300 border border-indigo-700/50 hover:bg-indigo-900/80 shadow-md shadow-indigo-950/30'
          : 'bg-white/80 text-indigo-600 border border-indigo-100 hover:bg-white hover:text-indigo-700 shadow-sm hover:shadow'
      } ${className}`}
      title={resolvedTheme === 'dark' ? 'Switch to Pastel Daylight' : 'Switch to Neon Anime Night'}
    >
      <div className="w-4 h-4 flex items-center justify-center transition-transform duration-300 hover:rotate-45">
        {resolvedTheme === 'dark' ? (
          <Moon className="w-4 h-4 fill-amber-300/20" />
        ) : (
          <Sun className="w-4 h-4 fill-amber-400/30 text-amber-500" />
        )}
      </div>
    </button>
  );
}
