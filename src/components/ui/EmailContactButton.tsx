'use client';

import React, { useState } from 'react';
import { Mail, ExternalLink, Check, Copy } from 'lucide-react';
import { SITE_SETTINGS, getGmailComposeLink, getMailtoLink } from '@/lib/site-settings';
import { useLivRiseStore } from '@/lib/store';

export interface EmailContactButtonProps {
  label?: string;
  subject?: string;
  body?: string;
  variant?: 'primary' | 'secondary' | 'glass' | 'outline' | 'ghost' | 'icon';
  className?: string;
  email?: string;
  showIcon?: boolean;
  iconPosition?: 'left' | 'right';
  showDirectEmailLabel?: boolean;
  showFallbackCopy?: boolean;
}

export function EmailContactButton({
  label = 'Email Us',
  subject,
  body,
  variant = 'glass',
  className = '',
  email,
  showIcon = true,
  iconPosition = 'left',
  showDirectEmailLabel = false,
  showFallbackCopy = false,
}: EmailContactButtonProps) {
  const { siteSettings } = useLivRiseStore();
  const [copied, setCopied] = useState(false);

  const activeEmail = email ?? siteSettings?.contactEmail ?? SITE_SETTINGS.contactEmail;
  const activeSubject = subject ?? siteSettings?.defaultEmailSubject ?? SITE_SETTINGS.defaultEmailSubject;
  const activeBody = body ?? siteSettings?.defaultEmailBody ?? SITE_SETTINGS.defaultEmailBody;

  const gmailUrl = getGmailComposeLink(activeSubject, activeBody, activeEmail);
  const mailtoUrl = getMailtoLink(activeSubject, activeBody, activeEmail);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(activeEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-white text-black hover:bg-zinc-100 font-semibold shadow-md shadow-white/10';
      case 'secondary':
        return 'bg-white/10 text-white hover:bg-white/20 font-medium border border-white/15';
      case 'outline':
        return 'liquid-glass border border-white/20 text-white hover:bg-white hover:text-black font-semibold';
      case 'ghost':
        return 'text-zinc-300 hover:text-white font-medium bg-transparent';
      case 'icon':
        return 'p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10';
      case 'glass':
      default:
        return 'liquid-glass border border-white/20 text-white hover:border-white/40 font-medium hover:bg-white/10';
    }
  };

  if (variant === 'icon') {
    return (
      <a
        href={gmailUrl}
        target="_blank"
        rel="noopener noreferrer"
        title={`Compose email to ${activeEmail} (Gmail)`}
        aria-label={`Email ${activeEmail}`}
        className={`inline-flex items-center justify-center transition-all ${getVariantStyles()} ${className}`}
      >
        <Mail className="w-4 h-4 shrink-0" />
      </a>
    );
  }

  return (
    <div className="inline-flex items-center gap-1.5 group/email-wrapper">
      <a
        href={gmailUrl}
        target="_blank"
        rel="noopener noreferrer"
        title={`Open Gmail Compose to ${activeEmail}`}
        className={`inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs transition-all duration-200 ${getVariantStyles()} ${className}`}
      >
        {showIcon && iconPosition === 'left' && <Mail className="w-3.5 h-3.5 shrink-0" />}
        <span>{showDirectEmailLabel ? activeEmail : label}</span>
        {showIcon && iconPosition === 'right' && <Mail className="w-3.5 h-3.5 shrink-0" />}
        <ExternalLink className="w-3 h-3 text-zinc-400 group-hover:text-current transition-colors opacity-70" />
      </a>

      {showFallbackCopy && (
        <button
          type="button"
          onClick={handleCopy}
          title={copied ? 'Copied to clipboard!' : `Copy ${activeEmail}`}
          className="p-2 rounded-xl liquid-glass border border-white/15 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Copy email address"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      )}
    </div>
  );
}
