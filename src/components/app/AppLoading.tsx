'use client';

import React from 'react';
import { LivRiseLogo } from '@/components/ui/LivRiseLogo';

interface AppLoadingProps {
  label?: string;
  fullScreen?: boolean;
}

export function AppLoading({
  label = 'Loading workspace...',
  fullScreen = false,
}: AppLoadingProps) {
  const containerClass = fullScreen
    ? 'fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center'
    : 'w-full py-16 flex flex-col items-center justify-center';

  return (
    <div className={containerClass}>
      <div className="relative flex flex-col items-center gap-4">
        {/* Pulsing architectural glow */}
        <div className="relative">
          <div className="w-14 h-14 rounded-2xl liquid-glass border border-white/20 flex items-center justify-center shadow-2xl shadow-amber-500/10">
            <LivRiseLogo size="sm" asLink={false} showSubtitle={false} />
          </div>
          <div className="absolute -inset-1.5 rounded-2xl bg-amber-500/20 blur-sm animate-pulse -z-10" />
        </div>

        {/* Text */}
        <div className="flex flex-col items-center gap-1.5 text-center">
          <span className="text-xs uppercase tracking-widest font-mono text-zinc-400">
            LivRise Engine
          </span>
          <span className="text-sm font-light text-zinc-200">
            {label}
          </span>
        </div>

        {/* Subtle loading bar */}
        <div className="w-36 h-0.5 bg-zinc-800 rounded-full overflow-hidden mt-1">
          <div className="w-full h-full bg-gradient-to-r from-amber-500 via-white to-amber-500 animate-[shimmer_1.5s_infinite]" />
        </div>
      </div>
    </div>
  );
}
