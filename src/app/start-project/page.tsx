'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { LivRiseNavbar } from '@/components/layout/LivRiseNavbar';
import { LivRiseFooter } from '@/components/layout/LivRiseFooter';
import { useLivRiseStore } from '@/lib/store';
import { SITE_SETTINGS, getWhatsAppLink, getMailtoLink, getGmailComposeLink } from '@/lib/site-settings';
import {
  Mail,
  Compass,
  Layers,
  Building,
  CheckSquare,
  ShieldCheck,
  FileText,
  Upload,
  User,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Calendar,
  DollarSign,
  MapPin,
  HelpCircle,
  FileCheck,
} from 'lucide-react';

const SERVICE_OPTIONS = [
  { id: 'Architecture', label: 'Architecture', icon: Compass, desc: 'Spatial massing, volumetric design, layouts and municipal sanction drawings.' },
  { id: 'Structural Engineering', label: 'Structural Engineering', icon: Layers, desc: 'Non-linear dynamic modeling, RCC and steel framing, foundation engineering.' },
  { id: 'Infrastructure', label: 'Infrastructure', icon: Building, desc: 'Road geometry, stormwater hydrology, drainage networks, and civil grading.' },
  { id: 'Project Management', label: 'Project Management', icon: CheckSquare, desc: 'CPM scheduling, milestone verification, technical audit, and contractor oversight.' },
  { id: 'Consultancy', label: 'Consultancy', icon: ShieldCheck, desc: 'Independent second opinion, statutory vetting, cost estimation, and peer review.' },
  { id: 'Other', label: 'Other', icon: HelpCircle, desc: 'Custom multidisciplinary or specialized engineering scope.' },
];

const PROJECT_TYPE_OPTIONS = [
  'Residential Villa / Bungalow',
  'Multi-Storey Residential Tower',
  'Commercial Office Complex',
  'Retail Hub / Mall',
  'Industrial Warehouse / Factory',
  'Highway Bridge / Infrastructure Corridor',
  'Institutional / Educational Campus',
  'Hospitality / Luxury Resort',
  'Urban Development Master Plan',
  'Public Works Asset',
  'Other Custom Facility',
];

const BUDGET_OPTIONS = [
  'Under ₹50 Lakhs',
  '₹50 Lakhs - ₹2 Crores',
  '₹2 Crores - ₹10 Crores',
  '₹10 Crores - ₹50 Crores',
  '₹50 Crores+',
  'To Be Formulated with Engineering Feasibility',
];

const TIMELINE_OPTIONS = [
  'Immediate (Within 30 Days)',
  '1 to 3 Months',
  '3 to 6 Months',
  '6 to 12 Months',
  'Concept / Feasibility Stage Only',
];

export default function StartProjectPage() {
  const { submitEnquiry, siteSettings = SITE_SETTINGS } = useLivRiseStore();

  const [step, setStep] = useState(1);
  const [submittedEnquiryNumber, setSubmittedEnquiryNumber] = useState<string | null>(null);

  // Form State
  const [selectedServices, setSelectedServices] = useState<string[]>(['Structural Engineering']);
  const [projectType, setProjectType] = useState<string>('Commercial Office Complex');
  const [country, setCountry] = useState('India');
  const [state, setState] = useState('West Bengal');
  const [city, setCity] = useState('');
  const [pinCode, setPinCode] = useState('');

  const [requirements, setRequirements] = useState('');
  const [builtUpArea, setBuiltUpArea] = useState('');
  const [floors, setFloors] = useState('');
  const [currentStage, setCurrentStage] = useState('Concept / Planning Stage');

  const [budget, setBudget] = useState('₹2 Crores - ₹10 Crores');
  const [timeline, setTimeline] = useState('1 to 3 Months');

  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: string }[]>([]);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [contactMethod, setContactMethod] = useState<'email' | 'phone' | 'whatsapp'>('email');

  const toggleService = (srv: string) => {
    if (selectedServices.includes(srv)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== srv));
      }
    } else {
      setSelectedServices([...selectedServices, srv]);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      setUploadedFiles((prev) => [
        ...prev,
        { name: f.name, size: `${(f.size / (1024 * 1024)).toFixed(2)} MB` },
      ]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const createdLead = submitEnquiry({
      fullName,
      email,
      phone,
      companyName: company,
      preferredContactMethod: contactMethod,
      serviceRequired: selectedServices.join(', '),
      servicesRequested: selectedServices,
      projectType,
      country,
      state,
      city,
      pinCode,
      builtUpArea,
      numberOfFloors: floors,
      currentStage,
      estimatedBudget: budget,
      expectedStartDate: timeline,
      requirements,
      source: 'LivRise Smart Project Enquiry',
      location: { country, state, city, pinCode },
      details: {
        builtUpArea,
        floors,
        currentStage,
        estimatedBudget: budget,
        expectedStartDate: timeline,
      },
    });

    setSubmittedEnquiryNumber(createdLead.enquiryNumber);

    // Dispatch transactional email notification via backend API route (does NOT open client mailto)
    try {
      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          enquiryNumber: createdLead.enquiryNumber,
          fullName,
          email,
          phone,
          companyName: company,
          serviceRequired: selectedServices.join(', '),
          projectType,
          city,
          state,
          estimatedBudget: budget,
          expectedStartDate: timeline,
          requirements,
          source: 'LivRise Smart Project Enquiry',
        }),
      }).catch((err) => console.error('[StartProject] Notification dispatch error:', err));
    } catch (err) {
      console.error('[StartProject] Notification dispatch error:', err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white selection:bg-white selection:text-black">
      <LivRiseNavbar />

      <main className="flex-1 pt-32 pb-24 px-6 md:px-12 lg:px-16">
        <div className="max-w-4xl mx-auto space-y-10">
          {/* Header */}
          <div className="space-y-3 text-center md:text-left">
            <span className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-medium block">
              Project Enquiry & Scoping
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white">
              Start a Project
            </h1>
            <p className="text-sm md:text-base text-zinc-400 font-light max-w-2xl">
              Submit your engineering, architectural, or infrastructure specifications. Your submission receives an official tracking reference and a lead consultant review.
            </p>
          </div>

          {/* Submitted Success Screen */}
          {submittedEnquiryNumber ? (
            <div className="liquid-glass border border-white/20 rounded-3xl p-8 sm:p-12 text-center space-y-8 shadow-2xl animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-zinc-400 font-mono">
                  Enquiry Successfully Registered
                </span>
                <h2 className="text-2xl sm:text-3xl font-medium text-white">
                  Reference Dossier: <span className="font-mono text-white underline">{submittedEnquiryNumber}</span>
                </h2>
              </div>

              <p className="text-sm text-zinc-300 max-w-lg mx-auto font-light leading-relaxed">
                Thank you, <strong className="text-white font-medium">{fullName}</strong>. Your project brief has been indexed in the LivRise Infrastructure Operations Console. Our engineering lead will review your parameters and reach out within 24 business hours.
              </p>

              {/* SECTION 7: Need to discuss your project directly? */}
              <div className="pt-6 border-t border-white/10 max-w-lg mx-auto space-y-4">
                <p className="text-xs uppercase font-mono tracking-widest text-amber-300 font-semibold">
                  Need to discuss your project directly?
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* WhatsApp Us */}
                  <a
                    href={siteSettings?.whatsappUrl || getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-center flex flex-col items-center justify-center gap-1.5 transition-all group"
                  >
                    <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.074-2.121-.527-1.745-.734-2.852-2.545-2.937-2.66-.086-.115-.705-.939-.705-1.791 0-.853.447-1.272.607-1.446.16-.174.349-.217.465-.217.117 0 .233.002.334.007.106.005.249-.04.39.298.144.348.491 1.199.534 1.286.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.303c-.087.087-.178.182-.076.357.101.174.453.748.971 1.21.668.595 1.232.78 1.406.867.174.086.275.072.376-.044.102-.115.434-.506.55-.679.115-.174.231-.145.39-.087.159.058 1.009.477 1.182.564.173.086.289.13.332.202.043.072.043.419-.101.824z" />
                      </svg>
                      <span>WhatsApp Us</span>
                    </span>
                    <span className="text-sm font-bold text-white group-hover:text-emerald-300">
                      {siteSettings?.displayWhatsApp || '+91 6296603868'}
                    </span>
                  </a>

                  {/* Email Us */}
                  <a
                    href={getGmailComposeLink(
                      `Project Enquiry: ${submittedEnquiryNumber}`,
                      `Hello LivRise Infrastructure,\n\nI have submitted project enquiry ${submittedEnquiryNumber} and would like to discuss it directly.\n\nRegards,\n${fullName}`,
                      siteSettings?.contactEmail || 'livriseinfrastructure@gmail.com'
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-center flex flex-col items-center justify-center gap-1.5 transition-all group"
                  >
                    <span className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                      <Mail className="w-4 h-4 text-zinc-400 group-hover:text-amber-300" />
                      <span>Email Us</span>
                    </span>
                    <span className="text-xs font-medium text-white break-all">
                      {siteSettings?.contactEmail || 'livriseinfrastructure@gmail.com'}
                    </span>
                  </a>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/"
                  className="w-full sm:w-auto bg-white text-black px-7 py-3 rounded-lg text-sm font-semibold hover:bg-zinc-100 transition-colors"
                >
                  Return to Homepage
                </Link>

                <Link
                  href="/contact"
                  className="w-full sm:w-auto liquid-glass border border-white/20 text-white px-7 py-3 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors"
                >
                  Contact Technical Desk
                </Link>
              </div>
            </div>
          ) : (
            /* Multi-Step Intake Card */
            <div className="liquid-glass border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
              {/* Step Indicator Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-6">
                <div>
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                    Step {step} of 7
                  </span>
                  <h3 className="text-xl font-medium text-white mt-1">
                    {step === 1 && 'What are you looking for?'}
                    {step === 2 && 'Project Classification'}
                    {step === 3 && 'Location Coordinates'}
                    {step === 4 && 'Project Requirements & Dimensions'}
                    {step === 5 && 'Budget & Timeline Parameters'}
                    {step === 6 && 'Technical Documents & Uploads'}
                    {step === 7 && 'Your Contact Details'}
                  </h3>
                </div>

                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                    <div
                      key={num}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        num === step
                          ? 'w-6 bg-white'
                          : num < step
                          ? 'w-3 bg-zinc-400'
                          : 'w-2 bg-white/10'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* STEP 1: What are you looking for? */}
                {step === 1 && (
                  <div className="space-y-4">
                    <p className="text-xs text-zinc-400">
                      Select all primary engineering and planning disciplines required for your engagement:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {SERVICE_OPTIONS.map((srv) => {
                        const Icon = srv.icon;
                        const isSelected = selectedServices.includes(srv.id);
                        return (
                          <button
                            key={srv.id}
                            type="button"
                            onClick={() => toggleService(srv.id)}
                            className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-white/15 border-white text-white shadow-lg shadow-white/5'
                                : 'bg-black/40 border-white/10 text-zinc-400 hover:border-white/20 hover:text-white'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-zinc-400'}`} />
                              <div
                                className={`w-4 h-4 rounded border flex items-center justify-center ${
                                  isSelected ? 'bg-white border-white text-black' : 'border-white/20'
                                }`}
                              >
                                {isSelected && <span className="text-[10px] font-bold">✓</span>}
                              </div>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-white">{srv.label}</h4>
                              <p className="text-[11px] text-zinc-400 mt-1 font-light leading-relaxed">
                                {srv.desc}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 2: Project type */}
                {step === 2 && (
                  <div className="space-y-4">
                    <p className="text-xs text-zinc-400">
                      Select the primary classification of the asset or development:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {PROJECT_TYPE_OPTIONS.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setProjectType(type)}
                          className={`p-4 rounded-xl border text-left text-sm font-medium transition-all cursor-pointer ${
                            projectType === type
                              ? 'bg-white text-black border-white'
                              : 'bg-black/40 border-white/10 text-zinc-300 hover:border-white/25 hover:text-white'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 3: Location */}
                {step === 3 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">
                        Country
                      </label>
                      <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white transition-colors"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">
                        State / Province
                      </label>
                      <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white transition-colors"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">
                        City / District
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Kolkata, Mumbai, Bangalore"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white transition-colors"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">
                        Postal / PIN Code
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 700001"
                        value={pinCode}
                        onChange={(e) => setPinCode(e.target.value)}
                        className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white transition-colors"
                      />
                    </div>
                  </div>
                )}

                {/* STEP 4: Project requirements */}
                {step === 4 && (
                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">
                        Project Brief & Technical Specifications
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Provide details on project scope, intended usage, structural challenges, architectural style, or codal requirements..."
                        value={requirements}
                        onChange={(e) => setRequirements(e.target.value)}
                        className="w-full bg-black/60 border border-white/15 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-white transition-colors"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">
                          Approx. Built-Up Area
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 25,000 Sq.Ft."
                          value={builtUpArea}
                          onChange={(e) => setBuiltUpArea(e.target.value)}
                          className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">
                          Number of Floors
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. G+12 Storeys"
                          value={floors}
                          onChange={(e) => setFloors(e.target.value)}
                          className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">
                          Current Stage
                        </label>
                        <select
                          value={currentStage}
                          onChange={(e) => setCurrentStage(e.target.value)}
                          className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white transition-colors cursor-pointer"
                        >
                          <option value="Concept / Planning Stage" className="bg-zinc-900 text-white">Concept / Planning Stage</option>
                          <option value="Architectural Drawings Available" className="bg-zinc-900 text-white">Architectural Drawings Available</option>
                          <option value="Structural Vetting Required" className="bg-zinc-900 text-white">Structural Vetting Required</option>
                          <option value="Municipal Sanction Pending" className="bg-zinc-900 text-white">Municipal Sanction Pending</option>
                          <option value="Construction Ready / Site Mobilization" className="bg-zinc-900 text-white">Construction Ready</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 5: Budget and timeline */}
                {step === 5 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-3">
                        Estimated Capital Budget Envelope
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {BUDGET_OPTIONS.map((b) => (
                          <button
                            key={b}
                            type="button"
                            onClick={() => setBudget(b)}
                            className={`p-3.5 rounded-xl border text-left text-sm font-medium transition-all cursor-pointer ${
                              budget === b
                                ? 'bg-white text-black border-white'
                                : 'bg-black/40 border-white/10 text-zinc-300 hover:border-white/25'
                            }`}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-3">
                        Target Engagement Timeline
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {TIMELINE_OPTIONS.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setTimeline(t)}
                            className={`p-3.5 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer ${
                              timeline === t
                                ? 'bg-white text-black border-white'
                                : 'bg-black/40 border-white/10 text-zinc-300 hover:border-white/25'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 6: Upload files */}
                {step === 6 && (
                  <div className="space-y-5">
                    <p className="text-xs text-zinc-400">
                      Upload any available site topography surveys, architectural layouts, structural briefs, or reference drawings (PDF, DWG, images up to 50MB):
                    </p>

                    <label className="border-2 border-dashed border-white/20 hover:border-white/40 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer bg-black/40 hover:bg-white/5 transition-all text-center">
                      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white">
                        <Upload className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-sm font-medium text-white block">
                          Click to select files or drag and drop
                        </span>
                        <span className="text-xs text-zinc-400 block mt-1">
                          CAD Drawings, Architectural PDFs, Structural Calculations, Site Photos
                        </span>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                    </label>

                    {uploadedFiles.length > 0 && (
                      <div className="space-y-2">
                        <span className="text-xs uppercase tracking-wider text-zinc-400">
                          Selected Documents ({uploadedFiles.length})
                        </span>
                        <div className="space-y-1.5">
                          {uploadedFiles.map((file, idx) => (
                            <div
                              key={idx}
                              className="liquid-glass border border-white/15 px-4 py-2.5 rounded-xl flex items-center justify-between text-xs"
                            >
                              <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4 text-zinc-400" />
                                <span className="font-medium text-white">{file.name}</span>
                              </div>
                              <span className="font-mono text-zinc-500">{file.size}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* STEP 7: Contact details */}
                {step === 7 && (
                  <div className="space-y-5">
                    <p className="text-xs text-zinc-400">
                      Please enter your contact details. An official tracking reference and consultation schedule will be sent to your email.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          placeholder="Your Full Name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white transition-colors"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          placeholder="name@company.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white transition-colors"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">
                          Phone / Mobile *
                        </label>
                        <input
                          type="tel"
                          placeholder="+91 98000 00000"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white transition-colors"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">
                          Company / Organization
                        </label>
                        <input
                          type="text"
                          placeholder="Company Name (Optional)"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">
                        Preferred Contact Method
                      </label>
                      <div className="flex gap-4">
                        {(['email', 'phone', 'whatsapp'] as const).map((method) => (
                          <label key={method} className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer">
                            <input
                              type="radio"
                              name="contactMethod"
                              checked={contactMethod === method}
                              onChange={() => setContactMethod(method)}
                              className="accent-white"
                            />
                            <span className="capitalize">{method}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Form Controls */}
                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="liquid-glass border border-white/15 px-5 py-2.5 rounded-lg text-xs font-medium text-white hover:bg-white/10 transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Previous</span>
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < 7 ? (
                    <button
                      type="button"
                      onClick={() => setStep(step + 1)}
                      className="bg-white text-black px-6 py-2.5 rounded-lg text-xs font-semibold hover:bg-zinc-100 transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <span>Continue</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!fullName || !email || !phone}
                      className="bg-white text-black disabled:opacity-50 disabled:cursor-not-allowed px-7 py-3 rounded-lg text-sm font-semibold hover:bg-zinc-100 transition-colors flex items-center gap-2 cursor-pointer shadow-lg shadow-white/10"
                    >
                      <span>Submit & Generate Dossier ID</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}
        </div>
      </main>

      <LivRiseFooter />
    </div>
  );
}
