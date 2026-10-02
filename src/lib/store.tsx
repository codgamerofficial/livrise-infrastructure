'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Lead,
  LeadStatus,
  Project,
  ProjectDocument,
  Quotation,
  Invoice,
  PaymentRecord,
  Milestone,
  ProjectMessage,
  Meeting,
  NotificationItem,
  AuditLog,
  Client,
  TeamMember,
  AwardItem,
  TestimonialItem,
  ServiceItem,
  SiteStatistic,
  UserRole,
} from '@/types';
import {
  SEED_LEADS,
  SEED_PROJECTS,
  SEED_CLIENTS,
  SEED_QUOTATIONS,
  SEED_INVOICES,
  SEED_PAYMENTS,
  SEED_DOCUMENTS,
  SEED_MILESTONES,
  SEED_MESSAGES,
  SEED_MEETINGS,
  SEED_NOTIFICATIONS,
  SEED_AUDIT_LOGS,
  SEED_TEAM,
  SEED_AWARDS,
  SEED_TESTIMONIALS,
  SEED_SERVICES,
  SEED_STATS,
} from './seed-data';
import { SiteSettings, SITE_SETTINGS } from './site-settings';

interface CurrentUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  clientCode?: string;
  clientId?: string;
}

export interface LivRiseStoreContextType {
  currentUser: CurrentUser;
  setCurrentUser: (user: CurrentUser) => void;
  switchRole: (role: UserRole) => void;

  leads: Lead[];
  projects: Project[];
  clients: Client[];
  quotations: Quotation[];
  invoices: Invoice[];
  payments: PaymentRecord[];
  documents: ProjectDocument[];
  milestones: Milestone[];
  messages: ProjectMessage[];
  meetings: Meeting[];
  notifications: NotificationItem[];
  auditLogs: AuditLog[];
  team: TeamMember[];
  awards: AwardItem[];
  testimonials: TestimonialItem[];
  services: ServiceItem[];
  statistics: SiteStatistic[];

  // Real backend workflow methods
  submitEnquiry: (enquiryData: Omit<Lead, 'id' | 'enquiryNumber' | 'status' | 'createdAt' | 'updatedAt'>) => Lead;
  updateLeadStatus: (leadId: string, status: LeadStatus) => void;
  assignLead: (leadId: string, staffId: string, staffName: string) => void;
  addLeadNote: (leadId: string, noteText: string) => void;
  convertLeadToClientAndProject: (leadId: string) => { client: Client; project: Project };

  createQuotation: (data: Omit<Quotation, 'id' | 'quotationNumber' | 'createdAt'>) => Quotation;
  updateQuotationStatus: (id: string, status: Quotation['status'], clientNote?: string) => void;

  createInvoice: (data: Omit<Invoice, 'id' | 'invoiceNumber' | 'createdAt'>) => Invoice;
  recordPayment: (data: Omit<PaymentRecord, 'id' | 'paymentReference'>) => PaymentRecord;

  uploadDocument: (doc: Omit<ProjectDocument, 'id' | 'uploadedAt'>) => ProjectDocument;
  updateDocumentStatus: (id: string, status: ProjectDocument['status']) => void;

  updateMilestone: (id: string, status: Milestone['status'], progress: number) => void;
  sendMessage: (projectId: string, text: string) => ProjectMessage;
  scheduleMeeting: (meeting: Omit<Meeting, 'id'>) => Meeting;

  markNotificationAsRead: (id: string) => void;
  updateStatistic: (id: string, newDisplay: string, numericVal: number) => void;

  // Centralized Site & Contact Settings (Single source of truth)
  siteSettings: SiteSettings;
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;
}

const LivRiseStoreContext = createContext<LivRiseStoreContextType | null>(null);

export const DEFAULT_USERS: Record<UserRole, CurrentUser> = {
  super_admin: {
    id: 'usr-admin-livrise',
    name: 'LivRise Executive Desk',
    email: 'admin@livriseinfrastructure.com',
    role: 'super_admin',
  },
  admin: {
    id: 'usr-admin-livrise',
    name: 'LivRise Operations Admin',
    email: 'admin@livriseinfrastructure.com',
    role: 'admin',
  },
  project_manager: {
    id: 'usr-pm-lead',
    name: 'Lead Project Manager',
    email: 'pm@livriseinfrastructure.com',
    role: 'project_manager',
  },
  consultant: {
    id: 'usr-cons-lead',
    name: 'Senior Structural Consultant',
    email: 'consultant@livriseinfrastructure.com',
    role: 'consultant',
  },
  client: {
    id: 'usr-client-demo',
    name: 'Corporate Client Representative',
    email: 'client@livriseinfrastructure.com',
    role: 'client',
    clientCode: 'LIV-CL-2026-0001',
    clientId: 'cl-demo-01',
  },
  lead: {
    id: 'usr-lead-demo',
    name: 'Prospective Client',
    email: 'lead@livriseinfrastructure.com',
    role: 'lead',
  },
  visitor: {
    id: 'usr-visitor-guest',
    name: 'Public Visitor',
    email: 'visitor@livriseinfrastructure.com',
    role: 'visitor',
  },
};

export function LivRiseStoreProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<CurrentUser>(DEFAULT_USERS.super_admin);

  // Core Collections
  const [leads, setLeads] = useState<Lead[]>(SEED_LEADS);
  const [projects, setProjects] = useState<Project[]>(SEED_PROJECTS);
  const [clients, setClients] = useState<Client[]>(SEED_CLIENTS);
  const [quotations, setQuotations] = useState<Quotation[]>(SEED_QUOTATIONS);
  const [invoices, setInvoices] = useState<Invoice[]>(SEED_INVOICES);
  const [payments, setPayments] = useState<PaymentRecord[]>(SEED_PAYMENTS);
  const [documents, setDocuments] = useState<ProjectDocument[]>(SEED_DOCUMENTS);
  const [milestones, setMilestones] = useState<Milestone[]>(SEED_MILESTONES);
  const [messages, setMessages] = useState<ProjectMessage[]>(SEED_MESSAGES);
  const [meetings, setMeetings] = useState<Meeting[]>(SEED_MEETINGS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(SEED_NOTIFICATIONS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(SEED_AUDIT_LOGS);

  // Content collections
  const [team] = useState<TeamMember[]>(SEED_TEAM);
  const [awards] = useState<AwardItem[]>(SEED_AWARDS);
  const [testimonials] = useState<TestimonialItem[]>(SEED_TESTIMONIALS);
  const [services] = useState<ServiceItem[]>(SEED_SERVICES);
  const [statistics, setStatistics] = useState<SiteStatistic[]>(SEED_STATS);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(SITE_SETTINGS);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const load = <T,>(key: string, fallback: T): T => {
        const item = localStorage.getItem(`livrise_${key}`);
        return item ? JSON.parse(item) : fallback;
      };

      setLeads(load('leads', SEED_LEADS));
      setProjects(load('projects', SEED_PROJECTS));
      setClients(load('clients', SEED_CLIENTS));
      setQuotations(load('quotations', SEED_QUOTATIONS));
      setInvoices(load('invoices', SEED_INVOICES));
      setPayments(load('payments', SEED_PAYMENTS));
      setDocuments(load('documents', SEED_DOCUMENTS));
      setMilestones(load('milestones', SEED_MILESTONES));
      setMessages(load('messages', SEED_MESSAGES));
      setMeetings(load('meetings', SEED_MEETINGS));
      setNotifications(load('notifications', SEED_NOTIFICATIONS));
      setAuditLogs(load('audit_logs', SEED_AUDIT_LOGS));
      setStatistics(load('statistics', SEED_STATS));
      setSiteSettings(load('site_settings', SITE_SETTINGS));

      const storedUser = localStorage.getItem('livrise_user');
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error('Failed to load local storage state:', e);
    }
  }, []);

  const saveToLocal = (key: string, val: unknown) => {
    try {
      localStorage.setItem(`livrise_${key}`, JSON.stringify(val));
    } catch (e) {
      console.error('Storage error:', e);
    }
  };

  const switchRole = (role: UserRole) => {
    const user = DEFAULT_USERS[role] || DEFAULT_USERS.super_admin;
    setCurrentUser(user);
    saveToLocal('user', user);
  };

  // Real Lead Submission Workflow (LIV-YYYY-XXXXX)
  const submitEnquiry = (enquiryData: Omit<Lead, 'id' | 'enquiryNumber' | 'status' | 'createdAt' | 'updatedAt'>) => {
    const year = new Date().getFullYear();
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const enquiryNumber = `LIV-${year}-${randomSuffix}`;

    const newLead: Lead = {
      ...enquiryData,
      id: `lead-${Date.now()}`,
      enquiryNumber,
      status: 'New Leads',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updated = [newLead, ...leads];
    setLeads(updated);
    saveToLocal('leads', updated);

    // Create Notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      recipientRole: 'admin',
      title: 'New Project Enquiry Received',
      message: `${newLead.fullName} requested ${newLead.serviceRequired} (${newLead.projectType}) — ${enquiryNumber}`,
      linkUrl: `/admin/leads`,
      type: 'enquiry',
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    setNotifications((prev) => [newNotif, ...prev]);

    // Create Audit Log
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      actorName: newLead.fullName,
      actorEmail: newLead.email,
      action: 'lead.submit_enquiry',
      entity: 'leads',
      entityId: newLead.enquiryNumber,
      metadata: { service: newLead.serviceRequired, city: newLead.city },
      ipAddress: '127.0.0.1',
      timestamp: new Date().toISOString(),
    };
    setAuditLogs((prev) => [newLog, ...prev]);

    return newLead;
  };

  const updateLeadStatus = (leadId: string, status: LeadStatus) => {
    setLeads((prev) => {
      const updated = prev.map((l) => (l.id === leadId ? { ...l, status, updatedAt: new Date().toISOString() } : l));
      saveToLocal('leads', updated);
      return updated;
    });

    const targetLead = leads.find((l) => l.id === leadId);
    if (targetLead) {
      const newLog: AuditLog = {
        id: `log-${Date.now()}`,
        actorName: currentUser.name,
        actorEmail: currentUser.email,
        action: 'lead.status_change',
        entity: 'leads',
        entityId: targetLead.enquiryNumber,
        metadata: { newStatus: status },
        ipAddress: '127.0.0.1',
        timestamp: new Date().toISOString(),
      };
      setAuditLogs((prev) => [newLog, ...prev]);
    }
  };

  const assignLead = (leadId: string, staffId: string, staffName: string) => {
    setLeads((prev) => {
      const updated = prev.map((l) =>
        l.id === leadId ? { ...l, assignedTo: staffId, assignedToName: staffName, updatedAt: new Date().toISOString() } : l
      );
      saveToLocal('leads', updated);
      return updated;
    });

    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      recipientRole: 'consultant',
      recipientId: staffId,
      title: 'Lead Assigned to You',
      message: `You have been assigned to lead ${leadId} by ${currentUser.name}`,
      linkUrl: `/admin/leads`,
      type: 'lead_assigned',
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const addLeadNote = (leadId: string, noteText: string) => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      actorName: currentUser.name,
      actorEmail: currentUser.email,
      action: 'lead.note_added',
      entity: 'leads',
      entityId: leadId,
      metadata: { note: noteText },
      ipAddress: '127.0.0.1',
      timestamp: new Date().toISOString(),
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const convertLeadToClientAndProject = (leadId: string) => {
    const lead = leads.find((l) => l.id === leadId);
    if (!lead) throw new Error('Lead not found');

    const year = new Date().getFullYear();
    const clientId = `cl-${Date.now()}`;
    const clientCode = `LIV-CL-${year}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newClient: Client = {
      id: clientId,
      clientCode,
      profileId: `usr-client-${Date.now()}`,
      fullName: lead.fullName,
      email: lead.email,
      phone: lead.phone,
      billingAddress: `${lead.city}, ${lead.state}`,
      city: lead.city,
      state: lead.state,
      country: lead.country,
      pinCode: lead.pinCode,
      activeProjectsCount: 1,
      totalSpent: 0,
      createdAt: new Date().toISOString(),
    };

    const projectId = `prj-${Date.now()}`;
    const projectCode = `LIV-PRJ-${year}-${Math.floor(100 + Math.random() * 900)}`;

    const newProject: Project = {
      id: projectId,
      projectCode,
      title: `${lead.fullName}'s ${lead.projectType} Development`,
      slug: `${lead.fullName.toLowerCase().replace(/\s+/g, '-')}-${lead.projectType.toLowerCase()}`,
      clientId: newClient.id,
      clientName: newClient.fullName,
      category: (lead.projectType as Project['category']) || 'Residential',
      location: `${lead.city}, ${lead.state}`,
      city: lead.city,
      state: lead.state,
      year,
      builtUpArea: lead.builtUpArea || 'Custom Footprint',
      buildingType: `${lead.numberOfFloors || 'G+2'} ${lead.projectType} Structure`,
      servicesRendered: [lead.serviceRequired],
      summary: lead.requirements || 'Turnkey engineering and architectural execution.',
      status: 'Planning',
      progressPercentage: 5,
      nextMilestone: 'Site Survey & Geotechnical Soil Sampling',
      nextMilestoneDue: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
      startDate: new Date().toISOString().split('T')[0],
      estimatedCompletion: new Date(Date.now() + 180 * 86400000).toISOString().split('T')[0],
      coverImageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?q=80&w=1200&auto=format&fit=crop',
      galleryImages: [],
      isFeatured: false,
      isPublicPortfolio: false,
    };

    setClients((prev) => [newClient, ...prev]);
    setProjects((prev) => {
      const up = [newProject, ...prev];
      saveToLocal('projects', up);
      return up;
    });

    updateLeadStatus(leadId, 'Won');

    return { client: newClient, project: newProject };
  };

  const createQuotation = (data: Omit<Quotation, 'id' | 'quotationNumber' | 'createdAt'>) => {
    const year = new Date().getFullYear();
    const qNum = `LIV-QT-${year}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newQ: Quotation = {
      ...data,
      id: `qt-${Date.now()}`,
      quotationNumber: qNum,
      createdAt: new Date().toISOString(),
    };

    const up = [newQ, ...quotations];
    setQuotations(up);
    saveToLocal('quotations', up);

    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        recipientRole: 'client',
        title: 'New Quotation Ready',
        message: `Quotation ${qNum} has been issued for ${newQ.serviceTitle}`,
        linkUrl: `/admin/quotations`,
        type: 'quotation',
        isRead: false,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);

    setAuditLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        actorName: currentUser.name,
        actorEmail: currentUser.email,
        action: 'quotation.create',
        entity: 'quotations',
        entityId: qNum,
        metadata: { client: newQ.clientName, grandTotal: newQ.grandTotal },
        ipAddress: '127.0.0.1',
        timestamp: new Date().toISOString(),
      },
      ...prev,
    ]);

    return newQ;
  };

  const updateQuotationStatus = (id: string, status: Quotation['status'], clientNote?: string) => {
    setQuotations((prev) => {
      const up = prev.map((q) =>
        q.id === id
          ? {
              ...q,
              status,
              clientActionNote: clientNote || q.clientActionNote,
              acceptedAt: status === 'Accepted' ? new Date().toISOString() : q.acceptedAt,
            }
          : q
      );
      saveToLocal('quotations', up);
      return up;
    });

    const target = quotations.find((q) => q.id === id);
    if (target) {
      setNotifications((prev) => [
        {
          id: `notif-${Date.now()}`,
          recipientRole: 'admin',
          title: `Quotation ${status}`,
          message: `${target.clientName} updated quotation ${target.quotationNumber} to ${status}`,
          linkUrl: `/admin/quotations`,
          type: 'quotation',
          isRead: false,
          createdAt: new Date().toISOString(),
        },
        ...prev,
      ]);
    }
  };

  const createInvoice = (data: Omit<Invoice, 'id' | 'invoiceNumber' | 'createdAt'>) => {
    const year = new Date().getFullYear();
    const invNum = `LIV-INV-${year}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newInv: Invoice = {
      ...data,
      id: `inv-${Date.now()}`,
      invoiceNumber: invNum,
      createdAt: new Date().toISOString(),
    };

    const up = [newInv, ...invoices];
    setInvoices(up);
    saveToLocal('invoices', up);

    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        recipientRole: 'client',
        title: 'New Tax Invoice Issued',
        message: `Invoice ${invNum} for ${newInv.currency} ${newInv.totalAmount.toLocaleString()} has been generated`,
        linkUrl: `/admin/invoices`,
        type: 'invoice',
        isRead: false,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);

    return newInv;
  };

  const recordPayment = (data: Omit<PaymentRecord, 'id' | 'paymentReference'>) => {
    const year = new Date().getFullYear();
    const payRef = `PAY-${year}-${Math.floor(10000 + Math.random() * 90000)}`;
    const newPay: PaymentRecord = {
      ...data,
      id: `pay-${Date.now()}`,
      paymentReference: payRef,
    };

    const up = [newPay, ...payments];
    setPayments(up);
    saveToLocal('payments', up);

    // Update invoice if paid in full
    setInvoices((prev) =>
      prev.map((inv) => {
        if (inv.id === data.invoiceId) {
          const newPaid = (inv.amountPaid || 0) + data.amount;
          const newBalance = inv.totalAmount - newPaid;
          return {
            ...inv,
            amountPaid: newPaid,
            balanceDue: newBalance,
            status: newBalance <= 0 ? 'Paid' : 'Partially Paid',
          };
        }
        return inv;
      })
    );

    return newPay;
  };

  const uploadDocument = (doc: Omit<ProjectDocument, 'id' | 'uploadedAt'>) => {
    const newDoc: ProjectDocument = {
      ...doc,
      id: `doc-${Date.now()}`,
      uploadedAt: new Date().toISOString(),
    };
    const up = [newDoc, ...documents];
    setDocuments(up);
    saveToLocal('documents', up);
    return newDoc;
  };

  const updateDocumentStatus = (id: string, status: ProjectDocument['status']) => {
    setDocuments((prev) => {
      const up = prev.map((d) => (d.id === id ? { ...d, status } : d));
      saveToLocal('documents', up);
      return up;
    });
  };

  const updateMilestone = (id: string, status: Milestone['status'], progress: number) => {
    setMilestones((prev) => {
      const up = prev.map((m) => (m.id === id ? { ...m, status, progress, progressPercentage: progress } : m));
      saveToLocal('milestones', up);
      return up;
    });
  };

  const sendMessage = (projectId: string, text: string) => {
    const newMsg: ProjectMessage = {
      id: `msg-${Date.now()}`,
      projectId,
      senderId: currentUser.id,
      senderName: `${currentUser.name} (${currentUser.role.toUpperCase()})`,
      senderRole: currentUser.role,
      messageText: text,
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newMsg]);
    return newMsg;
  };

  const scheduleMeeting = (meeting: Omit<Meeting, 'id'>) => {
    const newM: Meeting = {
      ...meeting,
      id: `mtg-${Date.now()}`,
    };
    setMeetings((prev) => [newM, ...prev]);

    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        recipientRole: 'all',
        title: 'Meeting Scheduled',
        message: `${newM.title} on ${newM.meetingDate} at ${newM.startTime}`,
        linkUrl: `/admin`,
        type: 'meeting',
        isRead: false,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);

    return newM;
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  };

  const updateStatistic = (id: string, newDisplay: string, numericVal: number) => {
    setStatistics((prev) =>
      prev.map((s) => (s.id === id ? { ...s, valueDisplay: newDisplay, numericValue: numericVal } : s))
    );
  };

  const updateSiteSettings = (newSettings: Partial<SiteSettings>) => {
    setSiteSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      saveToLocal('site_settings', updated);
      return updated;
    });
  };

  return (
    <LivRiseStoreContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        switchRole,
        siteSettings,
        updateSiteSettings,
        leads,
        projects,
        clients,
        quotations,
        invoices,
        payments,
        documents,
        milestones,
        messages,
        meetings,
        notifications,
        auditLogs,
        team,
        awards,
        testimonials,
        services,
        statistics,
        submitEnquiry,
        updateLeadStatus,
        assignLead,
        addLeadNote,
        convertLeadToClientAndProject,
        createQuotation,
        updateQuotationStatus,
        createInvoice,
        recordPayment,
        uploadDocument,
        updateDocumentStatus,
        updateMilestone,
        sendMessage,
        scheduleMeeting,
        markNotificationAsRead,
        updateStatistic,
      }}
    >
      {children}
    </LivRiseStoreContext.Provider>
  );
}

export function useLivRiseStore() {
  const ctx = useContext(LivRiseStoreContext);
  if (!ctx) {
    throw new Error('useLivRiseStore must be used within a LivRiseStoreProvider');
  }
  return ctx;
}
