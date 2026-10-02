'use client';

import React from 'react';
import { MobileBottomSheet } from './MobileBottomSheet';
import {
  FolderUp,
  MessageSquare,
  FileText,
  Briefcase,
  PhoneCall,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';
import { useLivRiseStore } from '@/lib/store';

interface MobileActionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadClick?: () => void;
}

export function MobileActionSheet({
  isOpen,
  onClose,
  onUploadClick,
}: MobileActionSheetProps) {
  const { siteSettings } = useLivRiseStore();

  const handleActionClick = (cb?: () => void) => {
    onClose();
    if (cb) cb();
  };

  return (
    <MobileBottomSheet isOpen={isOpen} onClose={onClose} title="Quick Actions">
      <div className="grid grid-cols-2 gap-3">
        <Link
          href="/app/projects"
          onClick={() => handleActionClick()}
          className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-amber-500/30 transition-all text-center group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
            <Briefcase className="w-5 h-5" />
          </div>
          <span className="text-xs font-medium text-white">Active Projects</span>
        </Link>

        <button
          type="button"
          onClick={() => handleActionClick(onUploadClick)}
          className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-amber-500/30 transition-all text-center group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
            <FolderUp className="w-5 h-5" />
          </div>
          <span className="text-xs font-medium text-white">Upload Drawing</span>
        </button>

        <Link
          href="/app/messages"
          onClick={() => handleActionClick()}
          className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-amber-500/30 transition-all text-center group"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform">
            <MessageSquare className="w-5 h-5" />
          </div>
          <span className="text-xs font-medium text-white">Message Team</span>
        </Link>

        <Link
          href="/app/payments"
          onClick={() => handleActionClick()}
          className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-amber-500/30 transition-all text-center group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
            <FileText className="w-5 h-5" />
          </div>
          <span className="text-xs font-medium text-white">View Invoices</span>
        </Link>
      </div>

      {/* Direct Contact Bar */}
      <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-2">
        <a
          href={siteSettings?.whatsappUrl || 'https://wa.me/916296603868'}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-medium hover:bg-emerald-500/20 transition-all"
        >
          <span className="flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-emerald-400" />
            <span>Chat on WhatsApp ({siteSettings?.displayWhatsApp || '+91 6296603868'})</span>
          </span>
          <ExternalLink className="w-3.5 h-3.5 opacity-70" />
        </a>

        <a
          href="tel:+916296603868"
          className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 text-zinc-300 text-xs font-medium hover:bg-white/10 transition-all"
        >
          <span className="flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-zinc-400" />
            <span>Call Executive Desk</span>
          </span>
          <span className="text-[10px] font-mono text-zinc-400">Direct</span>
        </a>
      </div>
    </MobileBottomSheet>
  );
}
