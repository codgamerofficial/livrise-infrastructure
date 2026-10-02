export type UserRole =
  | 'visitor'
  | 'lead'
  | 'client'
  | 'consultant'
  | 'project_manager'
  | 'admin'
  | 'super_admin';

export interface UserProfile {
  id: string;
  role: UserRole;
  fullName: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  companyName?: string;
  designation?: string;
  bio?: string;
  isActive: boolean;
}

export type LeadStatus =
  | 'New Leads'
  | 'Contacted'
  | 'Qualified'
  | 'Meeting'
  | 'Quotation'
  | 'Negotiation'
  | 'Won'
  | 'Lost'
  | 'Archived';

export interface Lead {
  id: string;
  enquiryNumber: string; // e.g. LIV-YYYY-XXXXX
  fullName: string;
  name?: string;
  companyName?: string;
  email: string;
  phone: string;
  preferredContactMethod: 'email' | 'phone' | 'whatsapp';
  serviceRequired: string;
  servicesRequested?: string[];
  projectType: string;
  country: string;
  state: string;
  city: string;
  pinCode: string;
  plotArea?: string;
  builtUpArea?: string;
  numberOfFloors?: string;
  currentStage?: string;
  estimatedBudget?: string;
  expectedStartDate?: string;
  requirements: string;
  status: LeadStatus;
  assignedTo?: string; // profileId
  assignedToName?: string;
  assignedStaff?: { id: string; name: string; assignedAt: string };
  location?: { country: string; state: string; city: string; pinCode: string };
  details?: { plotArea?: string; builtUpArea?: string; floors?: string; currentStage?: string; estimatedBudget?: string; expectedStartDate?: string };
  notes?: { id: string; author: string; content: string; createdAt: string }[];
  estimatedValue?: number;
  source: string;
  createdAt: string;
  updatedAt: string;
  uploadedFiles?: { name: string; size: string; type: string; url: string }[];
}

export interface LeadNote {
  id: string;
  leadId: string;
  authorId: string;
  authorName: string;
  note: string;
  createdAt: string;
}

export interface LeadActivity {
  id: string;
  leadId: string;
  actorId: string;
  actorName: string;
  activityType: 'status_change' | 'note_added' | 'assigned' | 'meeting_scheduled' | 'quotation_sent' | 'converted';
  description: string;
  createdAt: string;
}

export interface Client {
  id: string;
  clientCode: string; // e.g. LIV-CL-2026-0012
  profileId: string;
  fullName: string;
  email: string;
  phone: string;
  companyName?: string;
  gstNumber?: string;
  billingAddress: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
  activeProjectsCount: number;
  totalSpent: number;
  createdAt: string;
  primaryContact?: { name: string; email: string; phone: string; designation: string; city: string; state: string };
}

export type ProjectStatus =
  | 'Planning'
  | 'Site Analysis'
  | 'Concept'
  | 'Architecture'
  | 'Structural'
  | 'Review'
  | 'Client Approval'
  | 'Execution'
  | 'In Progress'
  | 'Completed';

export type MilestoneStatus =
  | 'Completed'
  | 'In Progress'
  | 'Upcoming'
  | 'Blocked'
  | 'Delayed';

export interface Milestone {
  id: string;
  projectId: string;
  name: string;
  description: string;
  status: MilestoneStatus;
  ownerName: string;
  owner?: string;
  startDate: string;
  dueDate: string;
  progressPercentage: number;
  progress?: number;
  displayOrder: number;
}

export interface ProjectTask {
  id: string;
  milestoneId: string;
  projectId: string;
  title: string;
  status: 'Todo' | 'In Progress' | 'Review' | 'Done';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  assignedToName: string;
  dueDate: string;
}

export interface Project {
  id: string;
  projectCode: string; // e.g. INF-PRJ-2026-004
  title: string;
  slug: string;
  clientId: string;
  clientName: string;
  category: 'Residential' | 'Commercial' | 'Industrial' | 'Infrastructure' | 'Government' | 'Institutional' | 'Research' | 'Award Winning';
  location: string;
  city: string;
  state: string;
  year: number;
  builtUpArea: string;
  buildingType: string;
  servicesRendered: string[];
  services?: string[];
  summary: string;
  challenge?: string;
  solution?: string;
  engineeringApproach?: string;
  status: ProjectStatus;
  progressPercentage: number;
  progress?: number;
  nextMilestone?: string;
  nextMilestoneDue?: string;
  startDate: string;
  estimatedCompletion: string;
  targetCompletion?: string;
  coverImageUrl: string;
  galleryImages: string[];
  drawings?: { name: string; rev: string; date: string; url: string }[];
  isFeatured: boolean;
  isPublicPortfolio: boolean;
}

export interface ProjectDocument {
  id: string;
  projectId: string;
  projectName: string;
  folder: 'Architecture' | 'Structural' | 'Drawings' | 'Reports' | 'Estimation' | 'Contracts' | 'Approvals' | 'Invoices' | 'Other';
  name: string;
  title?: string;
  fileName?: string;
  description?: string;
  currentVersion: string; // e.g. REV03
  version?: string;
  category?: string;
  storagePath: string;
  fileSizeBytes: number;
  fileSize?: string;
  fileType?: string;
  fileUrl?: string;
  fileExtension: string;
  status: 'Draft' | 'Under Review' | 'Approved' | 'Rejected' | 'Archived';
  uploadedBy: string;
  uploadedAt: string;
  isClientAccessible: boolean;
  isClientVisible?: boolean;
}

export interface QuotationItem {
  id: string;
  itemDescription: string;
  description?: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
  total?: number;
}

export interface Quotation {
  id: string;
  quotationNumber: string; // e.g. INF-QT-2026-0104
  clientId: string;
  clientName: string;
  clientEmail: string;
  projectId?: string;
  projectName?: string;
  serviceTitle: string;
  items: QuotationItem[];
  subtotal: number;
  discountAmount: number;
  taxRatePercent: number;
  taxAmount: number;
  tax?: number;
  grandTotal: number;
  currency: string;
  validUntil: string;
  termsAndConditions: string;
  terms?: string[];
  notes?: string;
  status: 'Draft' | 'Sent' | 'Viewed' | 'Revision Requested' | 'Accepted' | 'Rejected' | 'Expired';
  clientActionNote?: string;
  clientNotes?: string;
  acceptedAt?: string;
  createdAt: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
  total?: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string; // e.g. INF-INV-2026-0042
  clientId: string;
  clientName: string;
  clientEmail: string;
  projectId?: string;
  projectName?: string;
  quotationNumber?: string;
  items: InvoiceItem[];
  subtotal: number;
  taxAmount: number;
  tax?: number;
  discountAmount: number;
  totalAmount: number;
  total?: number;
  amountPaid: number;
  balanceDue: number;
  currency: string;
  issueDate: string;
  dueDate: string;
  status: 'Draft' | 'Sent' | 'Partially Paid' | 'Paid' | 'Overdue' | 'Cancelled';
  paymentTerms: string;
  notes?: string;
  createdAt: string;
}

export interface PaymentRecord {
  id: string;
  paymentReference: string; // e.g. PAY-2026-0038
  invoiceId: string;
  invoiceNumber: string;
  projectId?: string;
  projectName?: string;
  clientId: string;
  clientName: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  gateway?: string;
  transactionId?: string;
  status: 'Pending' | 'Processing' | 'Successful' | 'Failed' | 'Refunded';
  paymentDate: string;
  paidAt?: string;
  notes?: string;
}

export interface ProjectMessage {
  id: string;
  projectId: string;
  senderId: string;
  senderName: string;
  senderRole: string;
  messageText: string;
  attachments?: { name: string; url: string; size: string }[];
  isRead: boolean;
  createdAt: string;
}

export interface Meeting {
  id: string;
  title: string;
  projectId: string;
  projectName: string;
  clientId: string;
  clientName: string;
  organizerName: string;
  meetingDate: string;
  startTime: string;
  endTime: string;
  meetingType: 'Virtual (Google Meet / Zoom)' | 'On-Site Inspection' | 'In-Person Office';
  meetingUrl?: string;
  agenda: string;
  notes?: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
}

export interface NotificationItem {
  id: string;
  recipientRole: string; // 'client' | 'admin' | 'all'
  recipientId?: string;
  title: string;
  message: string;
  linkUrl?: string;
  type: 'enquiry' | 'lead_assigned' | 'quotation' | 'invoice' | 'payment' | 'milestone' | 'message' | 'meeting';
  isRead: boolean;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  actorName: string;
  actorEmail: string;
  action: string;
  entity: string;
  entityId: string;
  metadata?: Record<string, unknown>;
  ipAddress: string;
  timestamp: string;
}

export type DocumentCategory =
  | 'Architecture'
  | 'Structural'
  | 'Drawings'
  | 'Reports'
  | 'Estimation'
  | 'Contracts'
  | 'Approvals'
  | 'Invoices'
  | 'Other';

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  department: 'Executive Leadership' | 'Structural Engineering' | 'Architectural Design' | 'Advisory Board';
  photoUrl: string;
  biography: string;
  education?: string;
  experienceYears: string;
  experience?: string;
  expertise: string[];
  socialLinks?: { linkedin?: string; twitter?: string; email?: string };
}

export interface AwardItem {
  id: string;
  title: string;
  year: number;
  organization: string;
  position: string;
  projectName: string;
  description: string;
  imageUrl?: string;
  certificateUrl?: string;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  clientDesignation: string;
  clientCompany?: string;
  content: string;
  rating: number;
  projectReference: string;
  isVerified: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  category: 'Engineering' | 'Architecture' | 'Infrastructure' | 'Specialized & R&D';
  summary: string;
  shortDescription?: string;
  headline: string;
  description: string;
  capabilities: string[];
  processSteps: { step: number; title: string; desc: string }[];
  deliverables: string[];
  targetIndustries: string[];
  faqs: { q: string; a: string }[];
  icon: string;
  coverImage: string;
  isFeatured: boolean;
}

export interface SiteStatistic {
  id: string;
  key: string;
  label: string;
  valueDisplay: string;
  numericValue: number;
  description: string;
  isVerified: boolean;
}

export interface OfficeLocation {
  id: string;
  title: string;
  region: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
  country: string;
  phone: string;
  email: string;
  isHeadquarters: boolean;
}
