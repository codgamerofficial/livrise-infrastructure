'use client';

import React from 'react';

interface SafeAreaProps {
  children: React.ReactNode;
  top?: boolean;
  bottom?: boolean;
  className?: string;
}

export function SafeArea({
  children,
  top = true,
  bottom = true,
  className = '',
}: SafeAreaProps) {
  return (
    <div
      className={`w-full ${top ? 'pt-safe' : ''} ${bottom ? 'pb-safe' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
