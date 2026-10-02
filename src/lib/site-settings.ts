/**
 * LIVRISE INFRASTRUCTURE — CENTRALIZED SITE SETTINGS
 * Single source of truth for public-facing contact information,
 * brand descriptors, and official external action endpoints.
 */

export interface SiteSettings {
  companyName: string;
  displayName: string;
  descriptor: string;
  tagline: string;
  whatsappNumber: string; // Sanitized digits for URLs (no spaces, dashes, or plus in wa.me)
  displayWhatsApp: string; // Beautifully formatted for UI presentation
  whatsappUrl: string; // Official wa.me endpoint
  whatsappDefaultMessage: string; // Pre-filled discussion prompt
  contactEmail: string; // Official contact email
  mailtoUrl: string; // mailto: link
  gmailComposeUrl: string; // Primary browser fallback endpoint
  defaultEmailSubject: string; // Default subject for enquiry emails
  defaultEmailBody: string; // Default message template
  phone: string; // Empty until officially supplied
  address: string; // Empty until officially supplied
  googleMaps: string; // Empty until officially supplied
  linkedin: string; // Empty until officially supplied
  instagram: string; // Empty until officially supplied
  youtube: string; // Empty until officially supplied
}

export const SITE_SETTINGS: SiteSettings = {
  companyName: 'LivRise Infrastructure',
  displayName: 'LivRise Infrastructure',
  descriptor: 'Engineering • Architecture • Infrastructure',
  tagline: 'Building Ideas Into Reality.',
  whatsappNumber: '916296603868',
  displayWhatsApp: '+91 6296603868',
  whatsappUrl: 'https://wa.me/916296603868',
  whatsappDefaultMessage: 'Hello LivRise Infrastructure, I would like to discuss a project.',
  contactEmail: 'livriseinfrastructure@gmail.com',
  mailtoUrl: 'mailto:livriseinfrastructure@gmail.com',
  gmailComposeUrl: 'https://mail.google.com/mail/?view=cm&fs=1&to=livriseinfrastructure@gmail.com',
  defaultEmailSubject: 'Project Enquiry — LivRise Infrastructure',
  defaultEmailBody: `Hello LivRise Infrastructure,\n\nI would like to discuss a project.\n\nRegards,`,
  phone: '',
  address: '',
  googleMaps: '',
  linkedin: '',
  instagram: '',
  youtube: '',
};

/**
 * Builds a valid WhatsApp deep-link with an optional custom pre-filled message.
 * Strict URL formatting: https://wa.me/916296603868 (no spaces, brackets or hyphens)
 */
export function getWhatsAppLink(message?: string): string {
  const number = SITE_SETTINGS.whatsappNumber.replace(/[^0-9]/g, '');
  const text = message ?? SITE_SETTINGS.whatsappDefaultMessage;
  if (!text) {
    return `https://wa.me/${number}`;
  }
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

/**
 * Builds a robust Gmail Compose URL for reliable browser-based email composing.
 * Primary web fallback that bypasses OS mail client dependency issues.
 * https://mail.google.com/mail/?view=cm&fs=1&to=livriseinfrastructure@gmail.com
 */
export function getGmailComposeLink(subject?: string, body?: string, email?: string): string {
  const targetEmail = email ?? SITE_SETTINGS.contactEmail;
  const baseUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(targetEmail)}`;
  const params: string[] = [];
  
  const finalSubject = subject !== undefined ? subject : SITE_SETTINGS.defaultEmailSubject;
  const finalBody = body !== undefined ? body : SITE_SETTINGS.defaultEmailBody;

  if (finalSubject) params.push(`su=${encodeURIComponent(finalSubject)}`);
  if (finalBody) params.push(`body=${encodeURIComponent(finalBody)}`);

  if (params.length > 0) {
    return `${baseUrl}&${params.join('&')}`;
  }
  return baseUrl;
}

/**
 * Builds an official mailto link.
 */
export function getMailtoLink(subject?: string, body?: string, email?: string): string {
  const targetEmail = email ?? SITE_SETTINGS.contactEmail;
  const params: string[] = [];
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  if (params.length > 0) {
    return `mailto:${targetEmail}?${params.join('&')}`;
  }
  return `mailto:${targetEmail}`;
}
