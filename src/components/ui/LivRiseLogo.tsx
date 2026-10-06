'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface LivRiseLogoProps {
  className?: string;
  showSubtitle?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  asLink?: boolean;
  href?: string;
}

export function LivRiseLogo({
  className = '',
  showSubtitle = true,
  size = 'md',
  asLink = true,
  href = '/',
}: LivRiseLogoProps) {
  const sizeConfig = {
    sm: { monogram: 30, text: 'text-sm', sub: 'text-[8.5px]' },
    md: { monogram: 38, text: 'text-base', sub: 'text-[9.5px]' },
    lg: { monogram: 48, text: 'text-xl', sub: 'text-[11px]' },
    xl: { monogram: 60, text: 'text-2xl', sub: 'text-xs' },
  }[size];

  const content = (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 select-none group ${className}`}>
      {/* 3D Architectural Monogram from Official Source */}
      <div
        className="relative shrink-0 rounded-xl overflow-hidden shadow-lg border border-amber-500/30 bg-[#0B0B0D] transition-transform duration-300 group-hover:scale-105"
        style={{ width: sizeConfig.monogram, height: sizeConfig.monogram }}
      >
        <Image
          src="/brand/livrise-monogram.png"
          alt="LivRise LR Architectural Monogram"
          width={sizeConfig.monogram * 2}
          height={sizeConfig.monogram * 2}
          className="w-full h-full object-contain"
          priority
        />
        {/* Subtle architectural gold shimmer */}
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-transparent to-white/10 opacity-70 pointer-events-none" />
      </div>

      {/* Brand Wordmark */}
      <div className="flex flex-col leading-none">
        <div className={`font-extrabold tracking-tight ${sizeConfig.text} flex items-baseline`}>
          <span className="text-zinc-100 group-hover:text-white transition-colors">Liv</span>
          <span className="text-[#E5B85C] ml-0.5 group-hover:text-[#F2D39A] transition-colors">Rise</span>
        </div>
        {showSubtitle && (
          <span
            className={`uppercase tracking-[0.24em] font-semibold text-zinc-400 group-hover:text-zinc-300 mt-1 transition-colors ${sizeConfig.sub}`}
          >
            INFRASTRUCTURE
          </span>
        )}
      </div>
    </div>
  );

  if (asLink) {
    return (
      <Link href={href} className="focus:outline-none inline-block">
        {content}
      </Link>
    );
  }

  return content;
}

export function LivRiseMonogram({
  size = 40,
  className = '',
}: {
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={`relative shrink-0 rounded-xl overflow-hidden shadow-xl border border-amber-500/30 bg-[#0B0B0D] ${className}`}
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
    </div>
  );
}
