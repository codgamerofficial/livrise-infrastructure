'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export function LivRiseSplashScreen() {
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    // Show splash once per session
    const hasSeenSplash = sessionStorage.getItem('livrise_splash_seen');
    if (!hasSeenSplash) {
      setShowSplash(true);
      const timer = setTimeout(() => {
        setShowSplash(false);
        sessionStorage.setItem('livrise_splash_seen', 'true');
      }, 1600);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0B0B0D] text-white select-none pointer-events-none"
        >
          {/* Subtle blueprint grid overlay */}
          <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" />

          {/* Central Logo & Architectural Reveal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center space-y-4 relative z-10"
          >
            {/* LR Monogram */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-[#E5B85C]/40 bg-[#151518] shadow-2xl p-2">
              <Image
                src="/brand/livrise-monogram.png"
                alt="LivRise Monogram"
                width={160}
                height={160}
                className="w-full h-full object-contain"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#C9963E]/20 via-transparent to-white/10" />
            </div>

            {/* Wordmark */}
            <div className="space-y-1">
              <div className="flex items-baseline justify-center text-2xl sm:text-3xl font-extrabold tracking-tight">
                <span className="text-zinc-100">Liv</span>
                <span className="text-[#E5B85C] ml-0.5">Rise</span>
              </div>
              <div className="text-[10px] sm:text-[11px] font-mono tracking-[0.28em] text-zinc-400 font-semibold uppercase">
                INFRASTRUCTURE
              </div>
            </div>

            {/* Gold architectural drawing line */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 140, opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.6, ease: 'easeOut' }}
              className="h-[1.5px] bg-gradient-to-r from-transparent via-[#E5B85C] to-transparent my-2"
            />

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="text-[9px] sm:text-[10px] font-mono tracking-widest text-zinc-500 uppercase"
            >
              ENGINEERING • ARCHITECTURE • INFRASTRUCTURE
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
