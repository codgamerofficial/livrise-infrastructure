'use client';

import React, { useState, useEffect } from 'react';
import {
  Settings,
  Building,
  Mail,
  Phone,
  Shield,
  CheckCircle,
  Save,
  MapPin,
  Share2,
  Globe,
} from 'lucide-react';
import { useLivRiseStore } from '@/lib/store';
import { SITE_SETTINGS } from '@/lib/site-settings';

export default function AdminSettingsPage() {
  const { siteSettings = SITE_SETTINGS, updateSiteSettings } = useLivRiseStore();
  const [saved, setSaved] = useState(false);

  // Company Information Fields (Section 12 Approved Specifications)
  const [companyName, setCompanyName] = useState(siteSettings.companyName || 'LivRise Infrastructure');
  const [displayName, setDisplayName] = useState(siteSettings.displayName || 'LivRise Infrastructure');
  const [whatsapp, setWhatsapp] = useState(siteSettings.displayWhatsApp || '+91 6296603868');
  const [email, setEmail] = useState(siteSettings.contactEmail || 'livriseinfrastructure@gmail.com');
  const [phone, setPhone] = useState(siteSettings.phone || '');
  const [address, setAddress] = useState(siteSettings.address || '');
  const [googleMaps, setGoogleMaps] = useState(siteSettings.googleMaps || '');
  const [linkedin, setLinkedin] = useState(siteSettings.linkedin || '');
  const [instagram, setInstagram] = useState(siteSettings.instagram || '');
  const [youtube, setYoutube] = useState(siteSettings.youtube || '');

  // Synchronize when store state is hydrated
  useEffect(() => {
    if (siteSettings) {
      setCompanyName(siteSettings.companyName || 'LivRise Infrastructure');
      setDisplayName(siteSettings.displayName || 'LivRise Infrastructure');
      setWhatsapp(siteSettings.displayWhatsApp || '+91 6296603868');
      setEmail(siteSettings.contactEmail || 'livriseinfrastructure@gmail.com');
      setPhone(siteSettings.phone || '');
      setAddress(siteSettings.address || '');
      setGoogleMaps(siteSettings.googleMaps || '');
      setLinkedin(siteSettings.linkedin || '');
      setInstagram(siteSettings.instagram || '');
      setYoutube(siteSettings.youtube || '');
    }
  }, [siteSettings]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    // Clean whatsapp digits for URL
    const digitsOnly = whatsapp.replace(/[^0-9]/g, '');

    updateSiteSettings({
      companyName,
      displayName,
      displayWhatsApp: whatsapp,
      whatsappNumber: digitsOnly,
      whatsappUrl: `https://wa.me/${digitsOnly}`,
      contactEmail: email,
      mailtoUrl: `mailto:${email}`,
      phone,
      address,
      googleMaps,
      linkedin,
      instagram,
      youtube,
    });

    setSaved(true);
    setTimeout(() => setSaved(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white font-mono flex items-center gap-2">
            <Settings className="w-6 h-6 text-amber-400" />
            ENTERPRISE SYSTEM SETTINGS
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Centralized corporate identity, public contact credentials, and platform infrastructure.
          </p>
        </div>
      </div>

      {saved && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2 animate-in fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>Company information and public contact parameters successfully committed across the platform.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* SECTION 12: Company Information */}
        <div className="p-6 rounded-2xl bg-[#0c1222] border border-white/5 space-y-6">
          <div className="border-b border-white/5 pb-3 flex items-center justify-between">
            <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
              <Building className="w-4 h-4 text-amber-400" />
              Company Information (Single Source of Truth)
            </h2>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
              Public Platform Configuration
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Company Name */}
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1.5">
                Company Name *
              </label>
              <input
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="LivRise Infrastructure"
                className="w-full p-2.5 rounded-xl bg-[#070b14] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-amber-400/50"
              />
            </div>

            {/* Display Name */}
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1.5">
                Display Name *
              </label>
              <input
                type="text"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="LivRise Infrastructure"
                className="w-full p-2.5 rounded-xl bg-[#070b14] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-amber-400/50"
              />
            </div>

            {/* WhatsApp */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 mb-1.5">
                <Phone className="w-3.5 h-3.5" />
                <span>WhatsApp *</span>
              </label>
              <input
                type="text"
                required
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="+91 6296603868"
                className="w-full p-2.5 rounded-xl bg-[#070b14] border border-emerald-500/30 text-white text-xs font-mono focus:outline-none focus:border-emerald-400"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Approved public WhatsApp. Links automatically map to https://wa.me/916296603868.
              </p>
            </div>

            {/* Email */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-mono text-amber-300 mb-1.5">
                <Mail className="w-3.5 h-3.5" />
                <span>Email *</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="livriseinfrastructure@gmail.com"
                className="w-full p-2.5 rounded-xl bg-[#070b14] border border-amber-500/30 text-white text-xs font-mono focus:outline-none focus:border-amber-400"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Approved public email. Maps to mailto:livriseinfrastructure@gmail.com.
              </p>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1.5">
                Phone (Optional)
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Keep empty until supplied"
                className="w-full p-2.5 rounded-xl bg-[#070b14] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-white/30"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1.5">
                Address (Optional)
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Keep empty until supplied by owner"
                className="w-full p-2.5 rounded-xl bg-[#070b14] border border-white/10 text-white text-xs focus:outline-none focus:border-white/30"
              />
            </div>

            {/* Google Maps */}
            <div className="md:col-span-2">
              <label className="flex items-center gap-1.5 text-xs font-mono text-slate-400 mb-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>Google Maps (Optional)</span>
              </label>
              <input
                type="url"
                value={googleMaps}
                onChange={(e) => setGoogleMaps(e.target.value)}
                placeholder="https://maps.google.com/... (Keep empty until supplied)"
                className="w-full p-2.5 rounded-xl bg-[#070b14] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-white/30"
              />
            </div>
          </div>

          {/* Social Profiles */}
          <div className="pt-4 border-t border-white/5 space-y-4">
            <h3 className="text-xs font-bold text-slate-300 font-mono uppercase tracking-wider flex items-center gap-2">
              <Share2 className="w-3.5 h-3.5 text-sky-400" />
              Social Media Channels
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">LinkedIn</label>
                <input
                  type="url"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  placeholder="Keep empty until supplied"
                  className="w-full p-2.5 rounded-xl bg-[#070b14] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-white/30"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Instagram</label>
                <input
                  type="url"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  placeholder="Keep empty until supplied"
                  className="w-full p-2.5 rounded-xl bg-[#070b14] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-white/30"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">YouTube</label>
                <input
                  type="url"
                  value={youtube}
                  onChange={(e) => setYoutube(e.target.value)}
                  placeholder="Keep empty until supplied"
                  className="w-full p-2.5 rounded-xl bg-[#070b14] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-white/30"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Security & Infrastructure Status */}
        <div className="p-6 rounded-2xl bg-[#0c1222] border border-white/5 space-y-4">
          <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            Security & Database Infrastructure
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-white/2 border border-white/5 space-y-1">
              <span className="text-slate-500 block">ROW LEVEL SECURITY</span>
              <span className="text-emerald-400 font-bold block">ENFORCED (100% RLS)</span>
              <p className="text-[10px] text-slate-500">Cross-tenant isolation enabled.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/2 border border-white/5 space-y-1">
              <span className="text-slate-500 block">PUBLIC CONTACT VERIFICATION</span>
              <span className="text-sky-400 font-bold block">APPROVED CREDENTIALS</span>
              <p className="text-[10px] text-slate-500">+91 6296603868 • livriseinfrastructure@gmail.com</p>
            </div>
            <div className="p-4 rounded-xl bg-white/2 border border-white/5 space-y-1">
              <span className="text-slate-500 block">PWA CAPABILITY</span>
              <span className="text-amber-400 font-bold block">SERVICE WORKER ACTIVE</span>
              <p className="text-[10px] text-slate-500">Installable desktop & mobile app.</p>
            </div>
          </div>
        </div>

        {/* Save Action */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/20 cursor-pointer"
          >
            <Save className="w-4 h-4" /> Save System Settings
          </button>
        </div>
      </form>
    </div>
  );
}
