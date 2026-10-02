'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface MobileBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxHeight?: string;
}

export function MobileBottomSheet({
  isOpen,
  onClose,
  title,
  children,
  maxHeight = 'max-h-[85vh]',
}: MobileBottomSheetProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Sheet Modal Container */}
          <motion.div
            initial={{ y: '100%', opacity: 0.9 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0.9 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className={`relative z-10 w-full sm:max-w-lg liquid-glass border-t sm:border border-white/20 sm:rounded-3xl rounded-t-3xl shadow-2xl bg-black/90 flex flex-col ${maxHeight} pb-safe`}
          >
            {/* Drag handle for mobile */}
            <div className="w-full flex justify-center pt-3 pb-1 cursor-grab active:cursor-grabbing">
              <div className="w-12 h-1.5 rounded-full bg-zinc-600/70" />
            </div>

            {/* Header */}
            {title && (
              <div className="flex items-center justify-between px-6 py-3 border-b border-white/10">
                <h3 className="text-base font-semibold text-white tracking-tight">
                  {title}
                </h3>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Scrollable Content */}
            <div className="p-6 overflow-y-auto flex-1">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
