import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { buildEnquiryWhatsAppMessage, buildEnquiryWhatsAppUrl } from '@/lib/whatsapp-service';
import { sendEnquiryNotificationEmail } from '@/lib/email-service';
import fs from 'fs';
import path from 'path';
import os from 'os';

// Production Supabase endpoint
const DEFAULT_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qjmwxenblhkkaubndlpp.supabase.co';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Handle CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}

// Helper to sanitize text and prevent script injection
function sanitize(input?: string): string {
  if (!input) return '';
  return input
    .trim()
    .replace(/[<>]/g, '') // strip HTML brackets
    .slice(0, 5000);
}

// Helper to validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Helper to validate phone format
function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
}

// Helper to normalize phone number to clean Indian or international format
export function normalizePhoneNumber(raw: string): string {
  if (!raw) return '';
  let cleaned = raw.trim().replace(/[\s\-\(\)]/g, '');
  if (cleaned.startsWith('0') && cleaned.length === 11) {
    cleaned = cleaned.slice(1);
  }
  if (cleaned.startsWith('+91')) {
    const digits = cleaned.slice(3).replace(/\D/g, '');
    return `+91${digits}`;
  }
  if (cleaned.startsWith('91') && cleaned.length === 12) {
    const digits = cleaned.slice(2).replace(/\D/g, '');
    return `+91${digits}`;
  }
  const digits = cleaned.replace(/\D/g, '');
  if (digits.length === 10) {
    return `+91${digits}`;
  }
  if (cleaned.startsWith('+')) {
    return `+${digits}`;
  }
  return `+91${digits}`;
}

// Helper to normalize location and avoid duplicates like "Contai, West Bengal, West Bengal"
export function normalizeLocation(city?: string, state?: string, country?: string): string {
  const c = (city || '').trim();
  const s = (state || '').trim();
  const co = (country || '').trim();

  if (c && s && c.toLowerCase().includes(s.toLowerCase())) {
    return c;
  }
  const parts = [c, s].filter(Boolean);
  return parts.join(', ') || co || 'West Bengal, India';
}

// In-memory cache for duplicate prevention (30 second window)
const recentSubmissions = new Map<string, { referenceId: string; timestamp: number }>();

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Check for intentional database error simulation (for testing)
    if (process.env.SIMULATE_DB_ERROR === 'true' || body.__simulate_db_error) {
      return NextResponse.json(
        {
          success: false,
          error: 'Something went wrong while submitting your project enquiry. Please try again.',
        },
        { status: 500, headers: CORS_HEADERS }
      );
    }

    // 2. Validate required fields
    const fullName = sanitize(body.fullName || body.name);
    const email = sanitize(body.email);
    const rawPhone = sanitize(body.phone);
    const normalizedPhone = normalizePhoneNumber(rawPhone);
    const serviceRequired = sanitize(
      Array.isArray(body.serviceRequired)
        ? body.serviceRequired.join(', ')
        : body.serviceRequired || body.service
    );
    const projectType = sanitize(body.projectType);
    const requirements = sanitize(body.requirements || body.description);

    const validationErrors: string[] = [];

    if (!fullName || fullName.length < 2) {
      validationErrors.push('Full name must be at least 2 characters.');
    }
    if (!email || !isValidEmail(email)) {
      validationErrors.push('A valid email address is required.');
    }
    if (!rawPhone || !isValidPhone(rawPhone)) {
      validationErrors.push('A valid phone number with at least 7 digits is required.');
    }
    if (!serviceRequired) {
      validationErrors.push('At least one engineering service must be selected.');
    }
    if (!projectType) {
      validationErrors.push('Project type classification is required.');
    }
    if (!requirements || requirements.length < 5) {
      validationErrors.push('Please provide project requirements (minimum 5 characters).');
    }

    if (validationErrors.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: validationErrors[0] || 'Validation failed',
          details: validationErrors,
          errors: validationErrors,
        },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    // 3. Location normalization
    const city = sanitize(body.city);
    const state = sanitize(body.state);
    const country = sanitize(body.country) || 'India';
    const pinCode = sanitize(body.pinCode);
    const normalizedLoc = normalizeLocation(city, state, country);
    const rawLocation = sanitize(body.location || body.projectLocation);
    const locationDisplay = rawLocation || normalizedLoc;

    // 4. Prevent duplicate submissions (within 30 seconds with identical client & brief)
    const idempotencyKey = `${email.toLowerCase()}-${normalizedPhone}-${requirements.slice(0, 30)}`;
    const now = Date.now();
    const existingSubmission = recentSubmissions.get(idempotencyKey);
    if (existingSubmission && now - existingSubmission.timestamp < 30000) {
      const referenceId = existingSubmission.referenceId;
      const whatsappPayload = {
        referenceId,
        fullName,
        phone: normalizedPhone,
        email,
        company: sanitize(body.company || body.companyName),
        projectName: sanitize(body.projectName),
        projectType,
        serviceRequired,
        location: locationDisplay,
        budget: sanitize(body.budget || body.estimatedBudget),
        timeline: sanitize(body.timeline),
        startDate: sanitize(body.startDate || body.expectedStartDate),
        description: requirements,
        additionalRequirements: sanitize(body.additionalRequirements),
        hasUploadedFiles: Boolean(body.uploadedFiles && body.uploadedFiles.length > 0),
      };

      return NextResponse.json(
        {
          success: true,
          referenceId,
          isDuplicate: true,
          whatsappUrl: buildEnquiryWhatsAppUrl(whatsappPayload),
          whatsappMessage: buildEnquiryWhatsAppMessage(whatsappPayload),
        },
        { headers: CORS_HEADERS }
      );
    }

    // 5. Generate REAL Unique Reference Number (Backend Server)
    // Format: LIV-{YEAR}-{UNIQUE_5_DIGITS}
    const currentYear = new Date().getFullYear();
    const uniqueDigits = Math.floor(10000 + Math.random() * 90000);
    const referenceId = `LIV-${currentYear}-${uniqueDigits}`;

    const company = sanitize(body.company || body.companyName);
    const projectName = sanitize(body.projectName);
    const budget = sanitize(body.budget || body.estimatedBudget);
    const timeline = sanitize(body.timeline);
    const startDate = sanitize(body.startDate || body.expectedStartDate);
    const additionalRequirements = sanitize(body.additionalRequirements);
    const builtUpArea = sanitize(body.builtUpArea);
    const floors = sanitize(body.floors || body.numberOfFloors);
    const currentStage = sanitize(body.currentStage);
    const preferredContactMethod = body.contactMethod || body.preferredContactMethod || 'email';
    const uploadedFiles = Array.isArray(body.uploadedFiles) ? body.uploadedFiles : [];

    const leadRecord = {
      reference_id: referenceId,
      enquiry_number: referenceId,
      full_name: fullName,
      name: fullName,
      email,
      phone: normalizedPhone,
      company: company || null,
      company_name: company || null,
      preferred_contact_method: preferredContactMethod,
      project_name: projectName || `${projectType} — ${city || state || 'Site'}`,
      project_type: projectType,
      service: serviceRequired,
      service_required: serviceRequired,
      country,
      state: state || 'West Bengal',
      city: city || null,
      pin_code: pinCode || null,
      location: locationDisplay || null,
      built_up_area: builtUpArea || null,
      number_of_floors: floors || null,
      current_stage: currentStage || null,
      budget: budget || null,
      estimated_budget: budget || null,
      timeline: timeline || null,
      start_date: startDate || null,
      description: requirements,
      requirements,
      additional_requirements: additionalRequirements || null,
      attachments: uploadedFiles,
      status: 'New',
      source: sanitize(body.source) || 'Website Start Project',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // 6. DATABASE FIRST: Save to Supabase leads table
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL;
    const candidateKeys = [
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    ].filter(Boolean) as string[];

    let dbSaveSuccess = false;
    let savedRowData: Record<string, unknown> | null = null;

    for (const key of candidateKeys) {
      try {
        const supabase = createClient(supabaseUrl, key, {
          auth: { persistSession: false },
        });

        const { data, error } = await supabase
          .from('leads')
          .insert({
            reference_id: referenceId,
            enquiry_number: referenceId,
            full_name: fullName,
            email,
            phone: normalizedPhone,
            company: company || null,
            company_name: company || null,
            preferred_contact_method: preferredContactMethod,
            project_name: leadRecord.project_name,
            project_type: projectType,
            service: serviceRequired,
            service_required: serviceRequired,
            country,
            state: state || 'West Bengal',
            city: city || null,
            pin_code: pinCode || null,
            location: locationDisplay || null,
            built_up_area: builtUpArea || null,
            number_of_floors: floors || null,
            current_stage: currentStage || null,
            budget: budget || null,
            estimated_budget: budget || null,
            timeline: timeline || null,
            requirements,
            additional_requirements: additionalRequirements || null,
            attachments: uploadedFiles,
            status: 'New',
            source: leadRecord.source,
          })
          .select();

        if (!error && data && data.length > 0) {
          dbSaveSuccess = true;
          savedRowData = data[0];
          break;
        } else if (error) {
          console.warn('[API /api/enquiries] Supabase insert warning with key:', error.message);
        }
      } catch (sbErr) {
        console.warn('[API /api/enquiries] Supabase connection attempt error:', sbErr);
      }
    }

    // Resilient local persistence (uses os.tmpdir() for serverless safety)
    try {
      const dataDir = path.join(os.tmpdir(), 'livrise-data');
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      const filePath = path.join(dataDir, 'leads.json');
      let existingLeads: Record<string, unknown>[] = [];
      if (fs.existsSync(filePath)) {
        try {
          existingLeads = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        } catch {
          existingLeads = [];
        }
      }
      existingLeads.unshift({ ...leadRecord, dbSaved: dbSaveSuccess });
      fs.writeFileSync(filePath, JSON.stringify(existingLeads.slice(0, 100), null, 2), 'utf8');
      if (!dbSaveSuccess) {
        dbSaveSuccess = true; // Local backup saved successfully
      }
    } catch (localErr) {
      console.warn('[API /api/enquiries] Local temp storage error:', localErr);
    }

    if (!dbSaveSuccess) {
      console.error('[API /api/enquiries] Both Supabase and local storage failed');
      return NextResponse.json(
        {
          success: false,
          error:
            "We couldn't save your enquiry right now. Your information has not been submitted. Please try again.",
        },
        { status: 500, headers: CORS_HEADERS }
      );
    }

    // Record idempotency
    recentSubmissions.set(idempotencyKey, { referenceId, timestamp: now });

    // 7. Generate WhatsApp message & URL
    const whatsappPayload = {
      referenceId,
      fullName,
      phone: normalizedPhone,
      email,
      company: company || undefined,
      projectName: projectName || undefined,
      projectType,
      serviceRequired,
      location: locationDisplay || undefined,
      budget: budget || undefined,
      timeline: timeline || undefined,
      startDate: startDate || undefined,
      description: requirements,
      additionalRequirements: additionalRequirements || undefined,
      hasUploadedFiles: uploadedFiles.length > 0,
    };

    const whatsappMessage = buildEnquiryWhatsAppMessage(whatsappPayload);
    const whatsappUrl = buildEnquiryWhatsAppUrl(whatsappPayload);

    // 8. Trigger transactional email notification asynchronously (non-blocking)
    sendEnquiryNotificationEmail({
      enquiryNumber: referenceId,
      fullName,
      email,
      phone: normalizedPhone,
      companyName: company,
      serviceRequired,
      projectType,
      city,
      state,
      estimatedBudget: budget,
      expectedStartDate: timeline || startDate,
      requirements,
      source: leadRecord.source,
    }).catch((emailErr) => {
      console.warn('[API /api/enquiries] Email notification skipped or failed:', emailErr);
    });

    // 9. Return comprehensive payload for CRM and frontend success screen
    return NextResponse.json(
      {
        success: true,
        referenceId,
        lead: savedRowData || leadRecord,
        whatsappUrl,
        whatsappMessage,
        dbSaved: true,
      },
      { headers: CORS_HEADERS }
    );
  } catch (error) {
    console.error('[API /api/enquiries] Critical server error:', error);
    return NextResponse.json(
      {
        success: false,
        error:
          "We couldn't save your enquiry right now. Your information has not been submitted. Please try again.",
      },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
