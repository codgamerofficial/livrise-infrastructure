import React from 'react';
import Link from 'next/link';

interface LivRiseLogoProps {
  className?: string;
  showSubtitle?: boolean;
  size?: 'sm' | 'md' | 'lg';
  asLink?: boolean;
}

export function LivRiseLogo({
  className = '',
  showSubtitle = true,
  size = 'md',
  asLink = true,
}: LivRiseLogoProps) {
  const sizeClasses = {
    sm: {
      brand: 'text-xl tracking-tight',
      sub: 'text-[9px] tracking-[0.24em]',
      mark: 'w-6 h-6',
    },
    md: {
      brand: 'text-2xl font-semibold tracking-tight',
      sub: 'text-[10px] tracking-[0.28em] font-medium text-zinc-400',
      mark: 'w-7 h-7',
    },
    lg: {
      brand: 'text-3xl font-bold tracking-tight',
      sub: 'text-xs tracking-[0.32em] font-medium text-zinc-400',
      mark: 'w-9 h-9',
    },
  }[size];

  const content = (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Architectural Geometric Monogram Mark */}
      <div className={`relative flex items-center justify-center rounded-lg bg-white/10 border border-white/20 backdrop-blur-md ${sizeClasses.mark}`}>
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-4/5 h-4/5"
        >
          {/* L & R interlocking architectural geometric lines */}
          <path
            d="M8 8V24H18"
            stroke="white"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 14L24 24"
            stroke="white"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <path
            d="M14 8H20C22.2091 8 24 9.79086 24 12C24 14.2091 22.2091 16 20 16H14"
            stroke="white"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Brand Wordmark */}
      <div className="flex flex-col leading-none">
        <span className={`text-white font-sans ${sizeClasses.brand}`}>
          LIVRISE
        </span>
        {showSubtitle && (
          <span className={`uppercase font-sans mt-0.5 ${sizeClasses.sub}`}>
            Infrastructure
          </span>
        )}
      </div>
    </div>
  );

  if (asLink) {
    return (
      <Link href="/" className="focus:outline-none group">
        {content}
      </Link>
    );
  }

  return content;
}
