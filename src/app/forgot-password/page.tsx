'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { LivRiseLogo } from '@/components/ui/LivRiseLogo';
import { Mail, ArrowLeft, CheckCircle2, Shield } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-[#070b14] flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-3">
          <Link href="/" className="inline-block mx-auto">
            <LivRiseLogo size="md" />
          </Link>
          <h1 className="text-2xl font-bold text-white font-mono">Password Recovery</h1>
          <p className="text-xs text-slate-400">
            Enter your authorized email to receive a secure password reset link.
          </p>
        </div>

        <div className="bg-[#0b101e] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-5">
          {sent ? (
            <div className="py-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="text-base font-bold text-white">Reset Link Dispatched</h2>
              <p className="text-xs text-slate-300">
                If an account exists for <span className="text-amber-400">{email}</span>, you will receive instructions shortly.
              </p>
              <Link
                href="/login"
                className="inline-block pt-2 text-xs font-mono text-amber-400 hover:underline"
              >
                Return to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Registered Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                  <input
                    type="email"
                    required
                    placeholder="e.g. client@livrise.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#070b14] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-amber-400/50"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/20"
              >
                Send Password Reset Link
              </button>

              <div className="text-center pt-2">
                <Link
                  href="/login"
                  className="text-xs font-mono text-slate-400 hover:text-white flex items-center justify-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
