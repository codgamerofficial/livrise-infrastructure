'use client';

import React, { useState } from 'react';
import { useLivRiseStore } from '@/lib/store';
import {
  User,
  Mail,
  Phone,
  Building,
  Shield,
  Bell,
  Lock,
  LogOut,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';

export default function ClientProfilePage() {
  const { currentUser, switchRole, projects, documents } = useLivRiseStore();

  const [notificationPreferences, setNotificationPreferences] = useState({
    emailAlerts: true,
    whatsappUpdates: true,
    drawingsPublished: true,
    invoicesGenerated: true,
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const togglePref = (key: keyof typeof notificationPreferences) => {
    setNotificationPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-1">
          <span>Account & Preferences</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
          Client Profile
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Manage your contact credentials, project access, and notification telemetry.
        </p>
      </div>

      {/* Profile Overview Card */}
      <div className="arch-card p-6 rounded-3xl border border-white/10 bg-black/60 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black font-bold text-2xl shadow-xl shadow-amber-500/10 shrink-0">
            {currentUser.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white tracking-tight">
              {currentUser.name}
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">{currentUser.email}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-zinc-300 border border-white/10">
                ROLE: {currentUser.role.toUpperCase()}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                CODE: {currentUser.clientCode || 'LIV-CL-2026-0001'}
              </span>
            </div>
          </div>
        </div>

        {/* Quick stats */}
        <div className="flex sm:flex-col justify-around sm:justify-center border-t sm:border-t-0 sm:border-l border-white/10 pt-4 sm:pt-0 sm:pl-6 gap-3 text-left">
          <div>
            <span className="text-[10px] font-mono text-zinc-500 uppercase block">Projects</span>
            <span className="text-sm font-semibold text-white font-mono">{projects.length} Active</span>
          </div>
          <div>
            <span className="text-[10px] font-mono text-zinc-500 uppercase block">Drawings</span>
            <span className="text-sm font-semibold text-white font-mono">{documents.length} Files</span>
          </div>
        </div>
      </div>

      {/* Role Switcher Demo Console */}
      <div className="liquid-glass p-5 rounded-3xl border border-amber-500/20 bg-amber-950/10 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-semibold text-white">Ecosystem Role Switcher</h3>
          </div>
          <span className="text-[10px] font-mono text-amber-400/80 uppercase">
            Active: {currentUser.role}
          </span>
        </div>
        <p className="text-xs text-zinc-400 leading-relaxed">
          Switch role to test the authenticated mobile app experience from both the Client viewpoint and the Admin operations viewpoint.
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          <button
            type="button"
            onClick={() => switchRole('client')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              currentUser.role === 'client'
                ? 'bg-white text-black shadow-md'
                : 'bg-white/10 text-zinc-300 hover:text-white'
            }`}
          >
            Client Experience
          </button>
          <button
            type="button"
            onClick={() => switchRole('super_admin')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              currentUser.role === 'super_admin' || currentUser.role === 'admin'
                ? 'bg-amber-400 text-black shadow-md'
                : 'bg-white/10 text-zinc-300 hover:text-white'
            }`}
          >
            Admin Experience
          </button>
          <Link
            href="/admin"
            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 transition-all inline-flex items-center gap-1.5"
          >
            <span>Open Admin Console</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="liquid-glass p-6 rounded-3xl border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-purple-400" />
            <h3 className="text-sm font-semibold text-white">Notification Preferences</h3>
          </div>
          {savedSuccess && (
            <span className="text-xs text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Saved</span>
            </span>
          )}
        </div>

        <div className="divide-y divide-white/10 text-xs">
          <div className="py-3 flex items-center justify-between">
            <div>
              <span className="text-white font-medium block">WhatsApp Project Notifications</span>
              <span className="text-[11px] text-zinc-400">Receive real-time alerts when drawings are uploaded</span>
            </div>
            <button
              type="button"
              onClick={() => togglePref('whatsappUpdates')}
              className={`w-11 h-6 rounded-full transition-colors relative ${
                notificationPreferences.whatsappUpdates ? 'bg-amber-400' : 'bg-zinc-800'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-black transition-transform absolute top-1 ${
                  notificationPreferences.whatsappUpdates ? 'left-6' : 'left-1'
                }`}
              />
            </button>
          </div>

          <div className="py-3 flex items-center justify-between">
            <div>
              <span className="text-white font-medium block">Email Transmittals & Reports</span>
              <span className="text-[11px] text-zinc-400">Official dispatch of revision packages and BOQs</span>
            </div>
            <button
              type="button"
              onClick={() => togglePref('emailAlerts')}
              className={`w-11 h-6 rounded-full transition-colors relative ${
                notificationPreferences.emailAlerts ? 'bg-amber-400' : 'bg-zinc-800'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-black transition-transform absolute top-1 ${
                  notificationPreferences.emailAlerts ? 'left-6' : 'left-1'
                }`}
              />
            </button>
          </div>

          <div className="py-3 flex items-center justify-between">
            <div>
              <span className="text-white font-medium block">Invoice & Milestone Billing</span>
              <span className="text-[11px] text-zinc-400">Instant notification when a milestone certificate is issued</span>
            </div>
            <button
              type="button"
              onClick={() => togglePref('invoicesGenerated')}
              className={`w-11 h-6 rounded-full transition-colors relative ${
                notificationPreferences.invoicesGenerated ? 'bg-amber-400' : 'bg-zinc-800'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-black transition-transform absolute top-1 ${
                  notificationPreferences.invoicesGenerated ? 'left-6' : 'left-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Session & Logout */}
      <div className="p-4 rounded-2xl liquid-glass border border-white/10 flex items-center justify-between text-xs">
        <div>
          <span className="text-white font-medium block">Portal Session</span>
          <span className="text-[11px] text-zinc-400">Signed in on LivRise Infrastructure Platform</span>
        </div>

        <Link
          href="/"
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white text-white hover:text-black transition-all font-semibold"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Exit to Website</span>
        </Link>
      </div>
    </div>
  );
}
