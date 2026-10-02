'use client';

import React, { useState, useRef } from 'react';
import { RefreshCw } from 'lucide-react';

interface PullToRefreshProps {
  onRefresh: () => Promise<void> | void;
  children: React.ReactNode;
}

export function PullToRefresh({ onRefresh, children }: PullToRefreshProps) {
  const [pullY, setPullY] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const touchStartY = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (window.scrollY === 0) {
      touchStartY.current = e.touches[0].clientY;
    } else {
      touchStartY.current = 0;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartY.current === 0 || isRefreshing) return;
    const currentY = e.touches[0].clientY;
    const diff = currentY - touchStartY.current;
    if (diff > 0 && window.scrollY === 0) {
      // Apply dampening
      setPullY(Math.min(diff * 0.4, 70));
    }
  };

  const handleTouchEnd = async () => {
    if (pullY > 50 && !isRefreshing) {
      setIsRefreshing(true);
      setPullY(50);
      try {
        await Promise.resolve(onRefresh());
      } finally {
        setTimeout(() => {
          setIsRefreshing(false);
          setPullY(0);
        }, 500);
      }
    } else {
      setPullY(0);
    }
    touchStartY.current = 0;
  };

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full flex-1"
    >
      {/* Pull indicator */}
      {pullY > 0 && (
        <div
          style={{ height: `${pullY}px` }}
          className="w-full flex items-center justify-center overflow-hidden transition-all duration-150"
        >
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
            <RefreshCw
              className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`}
            />
            <span>{isRefreshing ? 'Syncing...' : 'Pull to refresh'}</span>
          </div>
        </div>
      )}

      {children}
    </div>
  );
}
