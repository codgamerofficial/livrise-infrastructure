'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
  pageKey?: string;
}

export function PageTransition({
  children,
  className = '',
  pageKey,
}: PageTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pageKey}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className={`w-full flex-1 ${className}`}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
