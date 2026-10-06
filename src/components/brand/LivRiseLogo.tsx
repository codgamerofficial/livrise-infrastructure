'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface LivRiseLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'monogram' | 'compact';
  href?: string;
}

export function LivRiseLogo({
  className = '',
  size = 'md',
  variant = 'full',
  href = '/',
}: LivRiseLogoProps) {
  // Dimension definitions
  const dimensions = {
    sm: { monogram: 34, fullW: 140, fullH: 36, text: 'text-sm' },
    md: { monogram: 42, fullW: 175, fullH: 45, text: 'text-base' },
    lg: { monogram: 56, fullW: 220, fullH: 56, text: 'text-xl' },
    xl: { monogram: 72, fullW: 280, fullH: 72, text: 'text-2xl' },
  }[size];

  const content = (
    <div className={`flex items-center gap-2.5 sm:gap-3 group select-none ${className}`}>
      {/* 3D Architectural LR Monogram */}
      <div
        className="relative shrink-0 rounded-xl overflow-hidden shadow-md shadow-black/40 group-hover:scale-105 transition-transform duration-300 border border-amber-500/20 bg-[#0B0B0D]"
        style={{ width: dimensions.monogram, height: dimensions.monogram }}
      >
        <Image
          src="/brand/livrise-monogram.png"
          alt="LivRise LR Architectural Monogram"
          width={dimensions.monogram * 2}
          height={dimensions.monogram * 2}
          className="w-full h-full object-contain"
          priority
        />
        {/* Subtle architectural gold shimmer overlay */}
        <div className="absolute inset-0 bg-linear-to-tr from-amber-500/10 via-transparent to-white/10 opacity-60 pointer-events-none" />
      </div>

      {variant !== 'monogram' && (
        <div className="flex flex-col justify-center leading-none">
          {/* Wordmark: "Liv" in silver, "Rise" in warm gold */}
          <div className="flex items-baseline tracking-tight font-extrabold text-[#F5F5F3]">
            <span className="text-zinc-200">Liv</span>
            <span className="text-brand-gold-bright ml-0.5">Rise</span>
          </div>

          {/* Subtitle: "INFRASTRUCTURE" with wide architectural tracking */}
          <span className="text-[9px] sm:text-[10px] tracking-[0.26em] text-zinc-400 font-semibold uppercase mt-1">
            INFRASTRUCTURE
          </span>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center focus:outline-none">
        {content}
      </Link>
    );
  }

  return content;
}

/**
 * Standalone Architectural Monogram Icon Component
 */
export function LivRiseMonogram({
  size = 48,
  className = '',
}: {
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={`relative shrink-0 rounded-2xl overflow-hidden shadow-xl border border-amber-500/25 bg-brand-obsidian ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/brand/livrise-monogram.png"
        alt="LivRise Monogram"
        width={size * 2}
        height={size * 2}
        className="w-full h-full object-contain"
        priority
      />
      <div className="absolute inset-0 bg-linear-to-tr from-amber-500/15 via-transparent to-white/10 pointer-events-none" />
    </div>
  );
}
