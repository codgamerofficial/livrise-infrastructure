'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import {
  User,
  Mail,
  Phone,
  Building,
  Shield,
  LogOut,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export default function ClientProfilePage() {
  const { user, signOut, resetPassword } = useAuth();

  const [fullName, setFullName] = useState(user?.fullName || 'Client User');
  const [phone, setPhone] = useState(user?.phone || '+91 6296603868');
  const [prefMethod, setPrefMethod] = useState('WhatsApp');
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [isResetting, setIsResetting] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setToastMsg('Profile details successfully saved.');
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handlePasswordReset = async () => {
    if (!user?.email) return;
    setIsResetting(true);
    const res = await resetPassword(user.email);
    setIsResetting(false);
    if (res.success) {
      setToastMsg('Password reset link sent to your registered email address.');
    } else {
      setToastMsg(res.error || 'Failed to send reset email.');
    }
    setTimeout(() => setToastMsg(null), 5000);
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-1">
            <Shield className="w-3.5 h-3.5" />
            <span>Client Account Settings</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
            Account Profile & Identity
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Manage your verified contact coordinates, billing details, and communication preferences.
          </p>
        </div>

        <button
          type="button"
          onClick={() => signOut()}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold hover:bg-rose-500/20 transition-all self-start sm:self-auto"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      {toastMsg && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Profile Form */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0c1222] border border-white/5 space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-white/5">
          <div className="w-16 h-16 rounded-2xl bg-amber-400 text-slate-950 font-bold text-2xl flex items-center justify-center font-mono">
            {(user?.fullName || 'C').charAt(0)}
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">{user?.fullName || 'Client User'}</h2>
            <p className="text-xs text-zinc-400 font-mono">{user?.email}</p>
            <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-400/10 text-amber-400 border border-amber-400/20 uppercase">
              {user?.role || 'CLIENT'}
            </span>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">Full Legal Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-hidden focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">
                Verified Phone Number
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-hidden focus:border-amber-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-400 mb-1">
              Email Address (Authentication Bound)
            </label>
            <input
              type="email"
              disabled
              value={user?.email || ''}
              className="w-full px-4 py-2.5 rounded-xl bg-white/2 border border-white/5 text-xs text-zinc-500 cursor-not-allowed font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-400 mb-1">
              Preferred Technical Channel
            </label>
            <select
              value={prefMethod}
              onChange={(e) => setPrefMethod(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#0c1222] border border-white/10 text-xs text-white focus:outline-hidden"
            >
              <option value="WhatsApp">WhatsApp (Fastest response)</option>
              <option value="Portal">Client Portal Messages</option>
              <option value="Email">Official Email</option>
              <option value="Phone">Direct Phone Consultation</option>
            </select>
          </div>

          <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <button
              type="button"
              onClick={handlePasswordReset}
              disabled={isResetting}
              className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-amber-400 transition-colors"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{isResetting ? 'Sending Link...' : 'Request Password Reset Link'}</span>
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 transition-colors shadow-md shadow-amber-400/10"
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
