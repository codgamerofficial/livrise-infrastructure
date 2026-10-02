'use client';

import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isStandalone] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true
    );
  });

  useEffect(() => {
    if (isStandalone) return;

    // Check if previously dismissed within the last 7 days
    const dismissedAt = localStorage.getItem('livrise_pwa_dismissed');
    if (dismissedAt) {
      const elapsed = Date.now() - parseInt(dismissedAt, 10);
      if (elapsed < 7 * 24 * 60 * 60 * 1000) {
        return;
      }
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Wait a few seconds so the prompt is not aggressive on first paint
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
      return () => clearTimeout(timer);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // If deferredPrompt is not supported (e.g. iOS Safari), show instruction toast
      alert('To install LivRise Infrastructure on your device, tap Share and then "Add to Home Screen".');
      setShowPrompt(false);
      return;
    }

    deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === 'accepted') {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('livrise_pwa_dismissed', Date.now().toString());
  };

  if (!showPrompt || isStandalone) {
    return null;
  }

  return (
    <aside
      aria-label="Install LivRise Application"
      className="fixed bottom-20 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="liquid-glass border border-white/20 p-4 sm:p-5 rounded-2xl shadow-2xl backdrop-blur-xl bg-black/85 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
              <Smartphone className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white tracking-tight">
                Take LivRise with you
              </h3>
              <p className="text-xs text-zinc-300">
                Install the LivRise app for a faster project experience.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleDismiss}
            className="text-zinc-400 hover:text-white p-1 rounded-lg transition-colors"
            aria-label="Dismiss prompt"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center justify-end gap-2 pt-1 border-t border-white/10">
          <button
            type="button"
            onClick={handleDismiss}
            className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-zinc-400 hover:text-white transition-colors"
          >
            Not Now
          </button>
          <button
            type="button"
            onClick={handleInstallClick}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold bg-white text-black hover:bg-zinc-200 transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Install</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
