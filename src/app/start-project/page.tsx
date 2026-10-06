'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { LivRiseNavbar } from '@/components/layout/LivRiseNavbar';
import { LivRiseFooter } from '@/components/layout/LivRiseFooter';
import { useLivRiseStore } from '@/lib/store';
import { uploadProjectFile } from '@/lib/supabase';
import { Lead } from '@/types';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Phone,
  Upload,
  AlertCircle,
  Copy,
  ExternalLink,
  Loader2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// =========================================================================
// ONBOARDING OPTIONS
// =========================================================================
const BUILDING_TYPES = [
  { id: 'New Home', label: 'New Home', symbol: '🏠', desc: 'Bespoke residential villa, bungalow, or duplex' },
  { id: 'Commercial', label: 'Commercial', symbol: '🏢', desc: 'Office space, retail hub, or commercial studio' },
  { id: 'Renovation', label: 'Renovation', symbol: '🏗️', desc: 'Structural extension, remodeling, or interior makeover' },
  { id: 'Other', label: 'Other', symbol: '📐', desc: 'Specialized architectural or engineering development' },
];

const SERVICE_REQUIREMENTS = [
  { id: 'House Plan', label: 'House Plan', symbol: '📐', desc: 'Architectural floor plans & municipal sanction drawings' },
  { id: '3D Design', label: '3D Design', symbol: '🏠', desc: 'Photorealistic 3D exterior elevations & lighting' },
  { id: 'Interior', label: 'Interior Design', symbol: '🛋️', desc: 'Modular layouts, joinery, and spatial ergonomics' },
  { id: 'Construction', label: 'Construction', symbol: '🏗️', desc: 'Turnkey civil construction & on-site management' },
  { id: 'Complete Package', label: 'Complete Package', symbol: '✨', desc: 'Plan → 3D → Interior → Turnkey Build (All-in-one)' },
];

const BUDGET_OPTIONS = [
  'Under ₹25 Lakhs',
  '₹25 Lakhs - ₹50 Lakhs',
  '₹50 Lakhs - ₹1 Crore',
  '₹1 Crore - ₹3 Crores',
  '₹3 Crores+',
  'To Be Decided with Feasibility',
];

const TIMELINE_OPTIONS = [
  'Immediate (Within 30 Days)',
  '1 to 3 Months',
  '3 to 6 Months',
  '6 to 12 Months',
  'Concept / Planning Stage Only',
];

// Helper to normalize location and prevent duplicates like "Contai, West Bengal, West Bengal"
function getNormalizedLocation(city: string, state: string, country: string = 'India'): string {
  const c = city.trim();
  const s = state.trim();
  if (!c && !s) return 'Not specified';
  if (c && s && c.toLowerCase().includes(s.toLowerCase())) {
    return c;
  }
  const parts = [c, s].filter(Boolean);
  return parts.join(', ') || country;
}

// Helper to clean & normalize phone number
function normalizePhone(raw: string): string {
  if (!raw) return '';
  let cleaned = raw.trim().replace(/[\s\-\(\)]/g, '');
  if (cleaned.startsWith('0') && cleaned.length === 11) cleaned = cleaned.slice(1);
  if (cleaned.startsWith('+91')) {
    const digits = cleaned.slice(3).replace(/\D/g, '');
    return `+91${digits}`;
  }
  if (cleaned.startsWith('91') && cleaned.length === 12) {
    const digits = cleaned.slice(2).replace(/\D/g, '');
    return `+91${digits}`;
  }
  const digits = cleaned.replace(/\D/g, '');
  if (digits.length === 10) return `+91${digits}`;
  if (cleaned.startsWith('+')) return `+${digits}`;
  return digits ? `+91${digits}` : '';
}

export default function StartProjectPage() {
  const { registerBackendLead } = useLivRiseStore();

  const [step, setStep] = useState(1);
  const totalSteps = 7;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(false);
  const [copiedRef, setCopiedRef] = useState(false);

  const [submittedEnquiry, setSubmittedEnquiry] = useState<{
    referenceId: string;
    whatsappUrl: string;
    whatsappMessage: string;
    lead?: Lead;
  } | null>(null);

  // Form State
  // Step 1: What are you building?
  const [buildingType, setBuildingType] = useState('New Home');

  // Step 2: What do you need?
  const [selectedServices, setSelectedServices] = useState<string[]>(['Complete Package']);

  // Step 3: Location
  const [city, setCity] = useState('');
  const [state, setState] = useState('West Bengal');
  const [country] = useState('India');
  const [pinCode, setPinCode] = useState('');

  // Step 4: Budget
  const [budget, setBudget] = useState('Under ₹25 Lakhs');

  // Step 5: Timeline
  const [timeline, setTimeline] = useState('1 to 3 Months');

  // Step 6: Contact Details & Notes
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [description, setDescription] = useState('');

  // Files
  const [rawFiles, setRawFiles] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: string }[]>([]);

  // Monitor network connectivity
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const toggleService = (srv: string) => {
    if (srv === 'Complete Package') {
      setSelectedServices(['Complete Package']);
      return;
    }
    const filtered = selectedServices.filter((s) => s !== 'Complete Package');
    if (filtered.includes(srv)) {
      if (filtered.length > 1) {
        setSelectedServices(filtered.filter((s) => s !== srv));
      }
    } else {
      setSelectedServices([...filtered, srv]);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      setRawFiles((prev) => [...prev, f]);
      setUploadedFiles((prev) => [
        ...prev,
        { name: f.name, size: `${(f.size / (1024 * 1024)).toFixed(2)} MB` },
      ]);
    }
  };

  // Step validations
  const handleNextStep = () => {
    setSubmissionError(null);
    if (step === 3 && !city.trim()) {
      setSubmissionError('Please provide your project city or district.');
      return;
    }
    if (step === 6) {
      if (!fullName.trim() || fullName.length < 2) {
        setSubmissionError('Please enter your full name (at least 2 characters).');
        return;
      }
      const digits = phone.replace(/\D/g, '');
      if (!phone.trim() || digits.length < 7) {
        setSubmissionError('Please enter a valid phone number (at least 7 digits).');
        return;
      }
      if (!email.trim() || !email.includes('@')) {
        setSubmissionError('Please enter a valid email address.');
        return;
      }
    }
    setStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const handlePrevStep = () => {
    setSubmissionError(null);
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isSubmitting) return;

    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      setIsOffline(true);
      setSubmissionError('You’re offline. Reconnect to the internet and try submitting again.');
      return;
    }

    if (!fullName.trim() || !phone.trim() || !email.trim()) {
      setSubmissionError('Please provide your name, phone and email in Step 6.');
      setStep(6);
      return;
    }

    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      // 1. Upload files to Supabase Storage if user selected any
      const docAttachments: { name: string; size: string; path?: string; url?: string }[] = [];
      for (const file of rawFiles) {
        try {
          const res = await uploadProjectFile(file, 'enquiries');
          docAttachments.push({
            name: res.name || file.name,
            size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
            path: res.path,
            url: res.path,
          });
        } catch {
          docAttachments.push({
            name: file.name,
            size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
          });
        }
      }

      // 2. Submit to backend API route (Server validation & Supabase save)
      const briefDescription =
        description.trim() ||
        `${buildingType} project in ${city || 'West Bengal'} requiring ${selectedServices.join(', ')}.`;

      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          phone: normalizePhone(phone) || phone,
          companyName: company || undefined,
          serviceRequired: selectedServices.join(', '),
          servicesRequested: selectedServices,
          projectType: buildingType,
          country,
          state,
          city,
          pinCode,
          estimatedBudget: budget,
          expectedStartDate: timeline,
          requirements: briefDescription,
          uploadedFiles: docAttachments.length > 0 ? docAttachments : uploadedFiles,
          source: 'Website Start Project',
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setIsSubmitting(false);
        setSubmissionError(
          result.error ||
            "We couldn't save your enquiry right now. Your information has not been submitted. Please try again."
        );
        return;
      }

      // 3. Sync CRM lead in store
      if (result.lead) {
        registerBackendLead(result.lead);
      }

      // 4. Update state to show Success Screen
      setSubmittedEnquiry({
        referenceId: result.referenceId,
        whatsappUrl: result.whatsappUrl,
        whatsappMessage: result.whatsappMessage,
        lead: result.lead,
      });
      setIsSubmitting(false);
    } catch (err) {
      console.error('[StartProject] Submission exception:', err);
      setIsSubmitting(false);
      setSubmissionError(
        "We couldn't save your enquiry right now. Your information has not been submitted. Please try again."
      );
    }
  };

  const copyRefId = () => {
    if (submittedEnquiry?.referenceId) {
      navigator.clipboard.writeText(submittedEnquiry.referenceId);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
    }
  };

  const displayLocation = getNormalizedLocation(city, state, country);
  const normalizedUserPhone = normalizePhone(phone) || phone;

  return (
    <div className="min-h-screen flex flex-col bg-(--bg-primary) text-(--text-primary) transition-colors duration-200">
      <LivRiseNavbar />

      {/* Main container with safe area bottom padding to avoid mobile collisions */}
      <main className="flex-1 pt-24 sm:pt-28 pb-[calc(11rem+env(safe-area-inset-bottom,0px))] md:pb-20 px-4 sm:px-6 md:px-10 lg:px-12 flex flex-col justify-center">
        <div className="max-w-2xl mx-auto w-full">
          {/* ===================================================================
              SUCCESS SCREEN (Per Master Prompt Section 20, 21, 51)
              =================================================================== */}
          {submittedEnquiry ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl border border-emerald-500/30 bg-(--surface-primary) p-6 sm:p-10 shadow-2xl shadow-emerald-500/10 text-center space-y-6"
            >
              <div className="w-16 h-16 rounded-3xl bg-linear-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30 text-3xl">
                ✨
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                  Enquiry Submitted
                </span>
                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-(--text-primary)">
                  PROJECT ENQUIRY SUBMITTED
                </h1>
                <p className="text-xs sm:text-sm text-(--text-secondary) max-w-md mx-auto">
                  Your project enquiry has been successfully registered.
                </p>
              </div>

              {/* Reference ID Pill */}
              <div className="p-4 rounded-2xl bg-(--surface-secondary) border border-(--border-subtle) flex items-center justify-between max-w-sm mx-auto shadow-inner">
                <div className="text-left">
                  <div className="text-[10px] font-mono text-(--text-muted) uppercase font-bold tracking-wider">
                    REFERENCE
                  </div>
                  <div className="font-mono font-extrabold text-base sm:text-lg text-brand-indigo dark:text-brand-blue">
                    {submittedEnquiry.referenceId}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={copyRefId}
                  className="px-3 py-1.5 rounded-lg border border-(--border-subtle) bg-(--surface-primary) hover:bg-(--surface-secondary) text-xs font-semibold flex items-center gap-1.5 transition-colors active:scale-95"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedRef ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              {/* Ready to send WhatsApp notice */}
              <div className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 max-w-sm mx-auto text-xs text-(--text-secondary)">
                Your project details are ready to send to LivRise on WhatsApp.
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2 max-w-sm mx-auto">
                <a
                  href={submittedEnquiry.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-linear-to-r from-emerald-500 to-teal-600 text-white font-bold text-sm shadow-xl shadow-emerald-500/25 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-wider"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  <span>Open WhatsApp & Send Details</span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                </a>

                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/app"
                    className="flex items-center justify-center gap-1.5 p-3 rounded-xl border border-(--border-subtle) bg-(--surface-secondary) hover:bg-(--surface-primary) text-xs font-semibold text-(--text-primary) transition-all"
                  >
                    <span>View Application</span>
                  </Link>

                  <Link
                    href="/"
                    className="flex items-center justify-center gap-1.5 p-3 rounded-xl border border-(--border-subtle) bg-(--surface-secondary) hover:bg-(--surface-primary) text-xs font-semibold text-(--text-primary) transition-all"
                  >
                    <span>Return Home</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ) : (
            /* ===================================================================
                7-STEP ONBOARDING SHELL
                =================================================================== */
            <div className="rounded-3xl border border-(--border-subtle) bg-(--surface-primary) p-5 sm:p-8 md:p-10 shadow-2xl shadow-brand-indigo/5 space-y-6 sm:space-y-8">
              {/* Progress Header */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-(--text-muted)">
                  <span className="text-brand-indigo dark:text-brand-blue uppercase tracking-wider">
                    STEP {step} OF {totalSteps}
                  </span>
                  <span className="uppercase tracking-wider">
                    {step === 7 ? '100% COMPLETE' : `${Math.round((step / totalSteps) * 100)}% COMPLETE`}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 rounded-full bg-(--surface-secondary) overflow-hidden">
                  <div
                    className="h-full bg-linear-to-r from-brand-indigo to-brand-blue transition-all duration-300 rounded-full"
                    style={{ width: `${(step / totalSteps) * 100}%` }}
                  />
                </div>
              </div>

              {/* Error Alert Card (With Retry and WhatsApp option per Prompt Section 17 & 18) */}
              {submissionError && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="p-4 sm:p-5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-(--text-primary) space-y-3 shadow-lg shadow-rose-500/5"
                >
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-rose-600 dark:text-rose-400">
                        {isOffline ? "You're offline" : "Couldn't submit your project"}
                      </h4>
                      <p className="text-xs text-(--text-secondary) leading-relaxed">
                        {isOffline
                          ? 'Reconnect to the internet and try submitting again.'
                          : "We couldn't save your enquiry right now. Your information has not been submitted. Please try again."}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1 pl-8">
                    <button
                      type="button"
                      onClick={() => handleSubmit()}
                      disabled={isSubmitting}
                      className="px-4 py-2 rounded-xl bg-rose-500 text-white text-xs font-bold shadow-md hover:bg-rose-600 active:scale-95 transition-all uppercase tracking-wider"
                    >
                      Try Again
                    </button>
                    <a
                      href="https://wa.me/916296603868"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl border border-(--border-subtle) bg-(--surface-primary) hover:bg-(--surface-secondary) text-xs font-semibold text-(--text-primary) flex items-center gap-1.5 transition-all"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Contact LivRise</span>
                    </a>
                  </div>
                </motion.div>
              )}

              {/* =================================================================
                  STEP CONTENT
                  ================================================================= */}
              <AnimatePresence mode="wait">
                {/* STEP 1: What are you building? */}
                {step === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                  >
                    <div className="space-y-1">
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-(--text-primary)">
                        What are you building?
                      </h2>
                      <p className="text-xs sm:text-sm text-(--text-secondary)">
                        Select the primary classification of your construction or design project.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {BUILDING_TYPES.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setBuildingType(item.id)}
                          className={`p-4 rounded-2xl border text-left flex items-start gap-3.5 transition-all ${
                            buildingType === item.id
                              ? 'border-brand-indigo bg-brand-indigo/10 text-(--text-primary) shadow-md shadow-brand-indigo/10 scale-[1.02]'
                              : 'border-(--border-subtle) bg-(--surface-secondary) hover:border-(--border-strong) text-(--text-secondary)'
                          }`}
                        >
                          <span className="text-3xl p-2 rounded-xl bg-(--surface-primary) border border-(--border-subtle) shrink-0">
                            {item.symbol}
                          </span>
                          <div>
                            <div className="font-bold text-sm text-(--text-primary)">
                              {item.label}
                            </div>
                            <div className="text-xs text-(--text-secondary) mt-0.5">
                              {item.desc}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: What do you need? */}
                {step === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                  >
                    <div className="space-y-1">
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-(--text-primary)">
                        What do you need?
                      </h2>
                      <p className="text-xs sm:text-sm text-(--text-secondary)">
                        Pick one or multiple practices for your project scope.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-2.5">
                      {SERVICE_REQUIREMENTS.map((srv) => {
                        const isSelected = selectedServices.includes(srv.id);

                        return (
                          <button
                            key={srv.id}
                            type="button"
                            onClick={() => toggleService(srv.id)}
                            className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                              isSelected
                                ? 'border-brand-indigo bg-brand-indigo/10 text-(--text-primary) shadow-sm'
                                : 'border-(--border-subtle) bg-(--surface-secondary) hover:border-(--border-strong) text-(--text-secondary)'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-2xl p-1.5 rounded-xl bg-(--surface-primary) border border-(--border-subtle)">
                                {srv.symbol}
                              </span>
                              <div>
                                <div className="font-bold text-sm text-(--text-primary)">
                                  {srv.label}
                                </div>
                                <div className="text-xs text-(--text-secondary)">
                                  {srv.desc}
                                </div>
                              </div>
                            </div>

                            <div
                              className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
                                isSelected
                                  ? 'bg-brand-indigo border-brand-indigo text-white'
                                  : 'border-(--border-strong) bg-transparent'
                              }`}
                            >
                              {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: Project Location */}
                {step === 3 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                  >
                    <div className="space-y-1">
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-(--text-primary)">
                        Where is your project located?
                      </h2>
                      <p className="text-xs sm:text-sm text-(--text-secondary)">
                        Location allows us to verify municipal bylaws and logistical parameters.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-(--text-secondary) mb-1.5">
                          City / District *
                        </label>
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="e.g. Contai, Kolkata, Siliguri"
                          className="w-full px-4 py-3 rounded-xl border border-(--border-subtle) bg-(--surface-secondary) text-sm text-(--text-primary) focus:outline-none focus:border-brand-indigo"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-(--text-secondary) mb-1.5">
                          State
                        </label>
                        <input
                          type="text"
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          placeholder="e.g. West Bengal"
                          className="w-full px-4 py-3 rounded-xl border border-(--border-subtle) bg-(--surface-secondary) text-sm text-(--text-primary) focus:outline-none focus:border-brand-indigo"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-(--text-secondary) mb-1.5">
                          Pin Code (Optional)
                        </label>
                        <input
                          type="text"
                          value={pinCode}
                          onChange={(e) => setPinCode(e.target.value)}
                          placeholder="e.g. 721401"
                          className="w-full px-4 py-3 rounded-xl border border-(--border-subtle) bg-(--surface-secondary) text-sm text-(--text-primary) focus:outline-none focus:border-brand-indigo"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-(--text-secondary) mb-1.5">
                          Country
                        </label>
                        <input
                          type="text"
                          value={country}
                          disabled
                          className="w-full px-4 py-3 rounded-xl border border-(--border-subtle) bg-(--surface-secondary)/50 text-sm text-(--text-muted) cursor-not-allowed"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: Budget */}
                {step === 4 && (
                  <motion.div
                    key="step-4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                  >
                    <div className="space-y-1">
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-(--text-primary)">
                        What is your estimated budget?
                      </h2>
                      <p className="text-xs sm:text-sm text-(--text-secondary)">
                        Helps us propose optimal materials, elevation finishes and room layouts.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {BUDGET_OPTIONS.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setBudget(opt)}
                          className={`p-4 rounded-2xl border text-left transition-all ${
                            budget === opt
                              ? 'border-brand-indigo bg-brand-indigo/10 text-brand-indigo dark:text-brand-blue font-bold shadow-sm'
                              : 'border-(--border-subtle) bg-(--surface-secondary) text-(--text-secondary) hover:border-(--border-strong)'
                          }`}
                        >
                          <div className="text-sm font-semibold">{opt}</div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* STEP 5: Timeline */}
                {step === 5 && (
                  <motion.div
                    key="step-5"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                  >
                    <div className="space-y-1">
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-(--text-primary)">
                        When do you want to begin?
                      </h2>
                      <p className="text-xs sm:text-sm text-(--text-secondary)">
                        Allows our engineering staff to allocate drafting and site management schedules.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-2.5">
                      {TIMELINE_OPTIONS.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setTimeline(opt)}
                          className={`p-4 rounded-2xl border text-left transition-all ${
                            timeline === opt
                              ? 'border-brand-indigo bg-brand-indigo/10 text-brand-indigo dark:text-brand-blue font-bold shadow-sm'
                              : 'border-(--border-subtle) bg-(--surface-secondary) text-(--text-secondary) hover:border-(--border-strong)'
                          }`}
                        >
                          <div className="text-sm font-semibold">{opt}</div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* STEP 6: Contact details */}
                {step === 6 && (
                  <motion.div
                    key="step-6"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                  >
                    <div className="space-y-1">
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-(--text-primary)">
                        Your Contact Information
                      </h2>
                      <p className="text-xs sm:text-sm text-(--text-secondary)">
                        Our lead architect will coordinate your preliminary consultation.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-(--text-secondary) mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Saswata Dey"
                          className="w-full px-4 py-3 rounded-xl border border-(--border-subtle) bg-(--surface-secondary) text-sm text-(--text-primary) focus:outline-none focus:border-brand-indigo"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-(--text-secondary) mb-1.5">
                          Phone / WhatsApp Number *
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. +91 73192 80024"
                          className="w-full px-4 py-3 rounded-xl border border-(--border-subtle) bg-(--surface-secondary) text-sm text-(--text-primary) focus:outline-none focus:border-brand-indigo"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-(--text-secondary) mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. saswatadey700@gmail.com"
                          className="w-full px-4 py-3 rounded-xl border border-(--border-subtle) bg-(--surface-secondary) text-sm text-(--text-primary) focus:outline-none focus:border-brand-indigo"
                        />
                      </div>

                      {buildingType === 'Commercial' && (
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold text-(--text-secondary) mb-1.5">
                            Company / Enterprise Name (Optional)
                          </label>
                          <input
                            type="text"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            placeholder="e.g. LivRise Enterprises"
                            className="w-full px-4 py-3 rounded-xl border border-(--border-subtle) bg-(--surface-secondary) text-sm text-(--text-primary) focus:outline-none focus:border-brand-indigo"
                          />
                        </div>
                      )}

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-(--text-secondary) mb-1.5">
                          Project Description / Plot Details (Optional)
                        </label>
                        <textarea
                          rows={3}
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="e.g. Plot size 2400 sq.ft, planning residential home in Contai..."
                          className="w-full px-4 py-3 rounded-xl border border-(--border-subtle) bg-(--surface-secondary) text-sm text-(--text-primary) focus:outline-none focus:border-brand-indigo"
                        />
                      </div>

                      {/* Optional Sketch / File Upload */}
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-(--text-secondary) mb-1.5">
                          Attach Hand Sketch or Plot Document (Optional)
                        </label>
                        <label className="border border-dashed border-(--border-strong) rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer hover:border-brand-indigo transition-colors bg-(--surface-secondary)/50">
                          <Upload className="w-5 h-5 text-(--text-muted) mb-1" />
                          <span className="text-xs text-(--text-secondary) font-medium">
                            Click to upload hand sketch or PDF
                          </span>
                          <input
                            type="file"
                            onChange={handleFileUpload}
                            className="hidden"
                            accept=".pdf,.png,.jpg,.jpeg,.dwg"
                          />
                        </label>

                        {uploadedFiles.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {uploadedFiles.map((f, i) => (
                              <div
                                key={i}
                                className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1.5"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>{f.name} ({f.size})</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 7: Review & Submit (Per Master Prompt Section 7, 8, 9, 10) */}
                {step === 7 && (
                  <motion.div
                    key="step-7"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                  >
                    <div className="space-y-1.5">
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-(--text-primary)">
                        Review Your Project
                      </h2>
                      <p className="text-xs sm:text-sm text-(--text-secondary)">
                        Check your details before submitting your project enquiry.
                      </p>
                    </div>

                    {/* Clean Mobile Review Card (Per Master Prompt Section 8 & 10) */}
                    <div className="rounded-2xl border border-(--border-subtle) bg-(--surface-secondary)/70 p-4 sm:p-6 space-y-3.5 shadow-inner">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 border-b border-(--border-subtle) gap-1">
                        <span className="text-xs sm:text-sm font-medium text-(--text-muted)">
                          Building Type
                        </span>
                        <span className="text-sm sm:text-base font-bold text-(--text-primary) wrap-break-word">
                          {buildingType}
                        </span>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 border-b border-(--border-subtle) gap-1">
                        <span className="text-xs sm:text-sm font-medium text-(--text-muted)">
                          Services
                        </span>
                        <span className="text-sm sm:text-base font-bold text-brand-indigo dark:text-brand-blue wrap-break-word">
                          {selectedServices.join(', ')}
                        </span>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 border-b border-(--border-subtle) gap-1">
                        <span className="text-xs sm:text-sm font-medium text-(--text-muted)">
                          Location
                        </span>
                        <span className="text-sm sm:text-base font-bold text-(--text-primary) wrap-break-word">
                          {displayLocation}
                        </span>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 border-b border-(--border-subtle) gap-1">
                        <span className="text-xs sm:text-sm font-medium text-(--text-muted)">
                          Budget
                        </span>
                        <span className="text-sm sm:text-base font-bold text-(--text-primary) wrap-break-word">
                          {budget}
                        </span>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 border-b border-(--border-subtle) gap-1">
                        <span className="text-xs sm:text-sm font-medium text-(--text-muted)">
                          Timeline
                        </span>
                        <span className="text-sm sm:text-base font-bold text-(--text-primary) wrap-break-word">
                          {timeline}
                        </span>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 border-b border-(--border-subtle) gap-1">
                        <span className="text-xs sm:text-sm font-medium text-(--text-muted)">
                          Contact
                        </span>
                        <span className="text-sm sm:text-base font-bold text-(--text-primary) wrap-break-word">
                          {fullName ? `${fullName} (${normalizedUserPhone})` : normalizedUserPhone || 'Not specified'}
                        </span>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 gap-1">
                        <span className="text-xs sm:text-sm font-medium text-(--text-muted)">
                          Email
                        </span>
                        <span className="text-sm sm:text-base font-bold text-(--text-primary) break-all">
                          {email || 'Not specified'}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Desktop In-Card Action Buttons (Hidden on mobile) */}
              <div className="hidden md:flex items-center justify-between pt-6 border-t border-(--border-subtle)">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-(--border-subtle) bg-(--surface-secondary) hover:bg-(--surface-primary) text-xs font-semibold text-(--text-primary) transition-all active:scale-95 disabled:opacity-50"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div />
                )}

                {step < totalSteps ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-brand-indigo to-brand-blue text-white text-xs font-bold hover:shadow-lg hover:shadow-brand-indigo/30 active:scale-95 transition-all uppercase tracking-wider"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleSubmit()}
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-linear-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold hover:shadow-lg hover:shadow-emerald-500/30 active:scale-95 transition-all uppercase tracking-wider disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>SUBMITTING...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Confirm & Submit</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* =========================================================================
          STICKY MOBILE ACTION BAR (Per Master Prompt Section 11, 13, 14, 15)
          Sitting safely ABOVE bottom navigation (fixed bottom-16 on mobile)
          ========================================================================= */}
      {!submittedEnquiry && (
        <div className="md:hidden fixed bottom-[calc(4rem+env(safe-area-inset-bottom,0px))] left-0 right-0 z-40 bg-(--surface-primary)/95 backdrop-blur-xl border-t border-(--border-subtle) px-4 py-2.5 shadow-2xl transition-all">
          <div className="max-w-md mx-auto flex items-center justify-between gap-3">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                disabled={isSubmitting}
                className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-(--border-subtle) bg-(--surface-secondary) hover:bg-(--surface-primary) text-xs font-bold text-(--text-primary) transition-all active:scale-95 disabled:opacity-50"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {step < totalSteps ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-linear-to-r from-brand-indigo to-brand-blue text-white text-xs font-bold shadow-md shadow-brand-indigo/25 active:scale-95 transition-all uppercase tracking-wider"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleSubmit()}
                disabled={isSubmitting}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-linear-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold shadow-md shadow-emerald-500/25 active:scale-95 transition-all uppercase tracking-wider disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>SUBMITTING...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Confirm & Submit</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      )}

      <LivRiseFooter />
    </div>
  );
}
