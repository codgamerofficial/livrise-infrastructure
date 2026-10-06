import React from 'react';
import Link from 'next/link';

interface LivRiseLogoProps {
  className?: string;
  showSubtitle?: boolean;
  size?: 'sm' | 'md' | 'lg';
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
  const sizeClasses = {
    sm: {
      brand: 'text-lg font-bold tracking-tight',
      sub: 'text-[9px] tracking-[0.2em] font-semibold',
      mark: 'w-7 h-7 rounded-lg',
      icon: 'w-4 h-4',
    },
    md: {
      brand: 'text-xl font-bold tracking-tight',
      sub: 'text-[10px] tracking-[0.24em] font-semibold',
      mark: 'w-8 h-8 rounded-xl',
      icon: 'w-5 h-5',
    },
    lg: {
      brand: 'text-2xl font-extrabold tracking-tight',
      sub: 'text-[11px] tracking-[0.28em] font-semibold',
      mark: 'w-10 h-10 rounded-2xl',
      icon: 'w-6 h-6',
    },
  }[size];

  const content = (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Anime Architectural Geometric Monogram Mark */}
      <div
        className={`relative flex items-center justify-center bg-linear-to-tr from-brand-indigo via-brand-blue to-brand-cyan shadow-md shadow-brand-indigo/25 border border-white/20 transition-transform group-hover:scale-105 ${sizeClasses.mark}`}
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={sizeClasses.icon}
        >
          {/* L & R interlocking architectural geometric lines */}
          <path
            d="M8 8V24H18"
            stroke="white"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 14L24 24"
            stroke="white"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <path
            d="M14 8H20C22.2091 8 24 9.79086 24 12C24 14.2091 22.2091 16 20 16H14"
            stroke="white"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Brand Wordmark */}
      <div className="flex flex-col leading-none">
        <span
          className={`font-sans tracking-tight text-(--text-primary) group-hover:text-brand-indigo transition-colors ${sizeClasses.brand}`}
        >
          LIVRISE
        </span>
        {showSubtitle && (
          <span
            className={`uppercase font-sans mt-0.5 text-(--text-muted) ${sizeClasses.sub}`}
          >
            Infrastructure
          </span>
        )}
      </div>
    </div>
  );

  if (asLink) {
    return (
      <Link href={href} className="focus:outline-none group inline-block">
        {content}
      </Link>
    );
  }

  return content;
}
