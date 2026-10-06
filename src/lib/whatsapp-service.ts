/**
 * LIVRISE INFRASTRUCTURE — WHATSAPP AUTOMATION SERVICE
 * Strictly formatted, URL-safe WhatsApp messaging workflows.
 * Destination: https://wa.me/916296603868
 */

export interface EnquiryWhatsAppPayload {
  referenceId: string;
  fullName: string;
  phone: string;
  email: string;
  company?: string;
  projectName?: string;
  projectType?: string;
  serviceRequired?: string;
  location?: string;
  budget?: string;
  timeline?: string;
  startDate?: string;
  description: string;
  additionalRequirements?: string;
  hasUploadedFiles?: boolean;
  submittedAt?: string;
}

/**
 * Generates the official LivRise WhatsApp enquiry notification message.
 * Strict rules:
 * - Omit any empty/falsy fields completely (no "undefined", "null", or blank labels).
 * - Proper separators and branding.
 */
export function buildEnquiryWhatsAppMessage(data: EnquiryWhatsAppPayload): string {
  const parts: string[] = [];

  // Header
  parts.push('NEW PROJECT ENQUIRY');
  parts.push('LIVRISE INFRASTRUCTURE');
  parts.push('');
  parts.push(`Reference:\n${data.referenceId.trim()}`);
  parts.push('');
  parts.push('━━━━━━━━━━━━━━━━');
  parts.push('');

  // CLIENT DETAILS
  const clientLines: string[] = [];
  if (data.fullName?.trim()) clientLines.push(`Name:\n${data.fullName.trim()}`);
  if (data.phone?.trim()) clientLines.push(`Phone:\n${data.phone.trim()}`);
  if (data.email?.trim()) clientLines.push(`Email:\n${data.email.trim()}`);
  if (data.company?.trim()) clientLines.push(`Company:\n${data.company.trim()}`);

  if (clientLines.length > 0) {
    parts.push('CLIENT DETAILS');
    parts.push('');
    parts.push(clientLines.join('\n\n'));
    parts.push('');
    parts.push('━━━━━━━━━━━━━━━━');
    parts.push('');
  }

  // PROJECT DETAILS
  const projectLines: string[] = [];
  if (data.projectName?.trim()) projectLines.push(`Project:\n${data.projectName.trim()}`);
  if (data.projectType?.trim()) projectLines.push(`Project Type:\n${data.projectType.trim()}`);
  if (data.serviceRequired?.trim()) projectLines.push(`Service Required:\n${data.serviceRequired.trim()}`);
  if (data.location?.trim()) projectLines.push(`Location:\n${data.location.trim()}`);
  if (data.budget?.trim()) projectLines.push(`Budget:\n${data.budget.trim()}`);
  if (data.timeline?.trim()) projectLines.push(`Timeline:\n${data.timeline.trim()}`);
  if (data.startDate?.trim()) projectLines.push(`Preferred Start:\n${data.startDate.trim()}`);

  if (projectLines.length > 0) {
    parts.push('PROJECT DETAILS');
    parts.push('');
    parts.push(projectLines.join('\n\n'));
    parts.push('');
    parts.push('━━━━━━━━━━━━━━━━');
    parts.push('');
  }

  // PROJECT REQUIREMENTS
  if (data.description?.trim()) {
    parts.push('PROJECT REQUIREMENTS');
    parts.push('');
    parts.push(data.description.trim());
    parts.push('');
    parts.push('━━━━━━━━━━━━━━━━');
    parts.push('');
  }

  // ADDITIONAL REQUIREMENTS / ATTACHMENTS
  const additionalItems: string[] = [];
  if (data.additionalRequirements?.trim()) {
    additionalItems.push(data.additionalRequirements.trim());
  }
  if (data.hasUploadedFiles) {
    additionalItems.push('Supporting documents were uploaded with this enquiry.');
  }

  if (additionalItems.length > 0) {
    parts.push('ADDITIONAL REQUIREMENTS');
    parts.push('');
    parts.push(additionalItems.join('\n\n'));
    parts.push('');
    parts.push('━━━━━━━━━━━━━━━━');
    parts.push('');
  }

  // SUBMITTED FOOTER
  const formattedTime = data.submittedAt || new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  parts.push(`Submitted:\n${formattedTime}`);
  parts.push('');
  parts.push(`Reference:\n${data.referenceId.trim()}`);
  parts.push('');
  parts.push('Please review this enquiry in the LivRise Infrastructure Operations Console.');
  parts.push('');
  parts.push('LivRise Infrastructure\nEngineering • Architecture • Infrastructure');

  return parts.join('\n');
}

/**
 * Builds the official wa.me pre-filled URL with URL-safe encoding.
 */
export function buildEnquiryWhatsAppUrl(data: EnquiryWhatsAppPayload): string {
  const message = buildEnquiryWhatsAppMessage(data);
  const encoded = encodeURIComponent(message);
  return `https://wa.me/916296603868?text=${encoded}`;
}

/**
 * Builds the Admin -> Client response WhatsApp URL.
 */
export function buildAdminClientWhatsAppUrl(params: {
  clientName: string;
  clientPhone: string;
  referenceId: string;
}): string {
  const cleanPhone = params.clientPhone.replace(/[^0-9]/g, '');
  // Ensure country code if missing 10-digit Indian mobile
  const formattedPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;

  const message = `Hello ${params.clientName},

Thank you for contacting LivRise Infrastructure.

We have received your project enquiry.

Reference:
${params.referenceId}

Our team will review your requirements and contact you.

Regards,
LivRise Infrastructure`;

  const encoded = encodeURIComponent(message);
  return `https://wa.me/${formattedPhone}?text=${encoded}`;
}
