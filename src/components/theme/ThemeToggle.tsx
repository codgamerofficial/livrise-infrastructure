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
      className={`relative p-2.5 rounded-xl transition-all duration-300 cursor-pointer ${
        resolvedTheme === 'dark'
          ? 'bg-[#151518] text-[#E5B85C] border border-[#202124] hover:border-amber-500/40 shadow-md shadow-black/50'
          : 'bg-white text-zinc-800 border border-zinc-200 hover:border-amber-500/50 shadow-sm hover:shadow'
      } ${className}`}
      title={resolvedTheme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
    >
      <div className="w-4 h-4 flex items-center justify-center transition-transform duration-300 hover:rotate-45">
        {resolvedTheme === 'dark' ? (
          <Moon className="w-4 h-4 fill-amber-400/20 text-[#E5B85C]" />
        ) : (
          <Sun className="w-4 h-4 fill-amber-400/30 text-amber-600" />
        )}
      </div>
    </button>
  );
}
