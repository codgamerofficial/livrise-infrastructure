-- =============================================================================
-- LIVRISE DIGITAL ENGINEERING PLATFORM
-- Production Supabase PostgreSQL Schema
-- Engineering • Architecture • Infrastructure
-- Tagline: Building Ideas Into Reality.
-- =============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =============================================================================
-- 1. USERS & ROLES
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) UNIQUE NOT NULL, -- 'super_admin', 'admin', 'project_manager', 'consultant', 'client', 'lead', 'visitor'
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.permissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(100) UNIQUE NOT NULL, -- e.g., 'projects.create', 'documents.upload', 'quotations.approve'
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.role_permissions (
    role_id UUID REFERENCES public.roles(id) ON DELETE CASCADE,
    permission_id UUID REFERENCES public.permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role_id UUID REFERENCES public.roles(id),
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    avatar_url TEXT,
    company_name VARCHAR(255),
    designation VARCHAR(100),
    bio TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- 2. CRM & LEADS MANAGEMENT
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    enquiry_number VARCHAR(50) UNIQUE NOT NULL, -- e.g. LIV-ENQ-2026-00101
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    preferred_contact_method VARCHAR(50) DEFAULT 'email', -- 'email', 'phone', 'whatsapp'
    
    -- Multi-step enquiry details
    service_required VARCHAR(100) NOT NULL, -- Architecture, Structural Engineering, Interior, etc.
    project_type VARCHAR(100) NOT NULL, -- Residential, Commercial, Industrial, Infrastructure, etc.
    country VARCHAR(100) DEFAULT 'India',
    state VARCHAR(100),
    city VARCHAR(100),
    pin_code VARCHAR(20),
    
    plot_area VARCHAR(100),
    built_up_area VARCHAR(100),
    number_of_floors VARCHAR(50),
    current_stage VARCHAR(100), -- Concept, Land Acquired, Planning, Ready to Build
    estimated_budget VARCHAR(100),
    expected_start_date DATE,
    requirements TEXT,
    
    -- CRM Pipeline Status
    status VARCHAR(50) DEFAULT 'New Leads', -- 'New Leads', 'Contacted', 'Qualified', 'Meeting', 'Quotation', 'Negotiation', 'Won', 'Lost', 'Archived'
    assigned_to UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    estimated_value NUMERIC(15, 2),
    source VARCHAR(100) DEFAULT 'Website Enquiry',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.lead_notes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE,
    author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    note TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.lead_activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE,
    actor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    activity_type VARCHAR(50) NOT NULL, -- 'status_change', 'note_added', 'assigned', 'meeting_scheduled', 'quotation_sent'
    description TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- 3. CLIENTS & CLIENT PROFILES
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
    client_code VARCHAR(50) UNIQUE NOT NULL, -- e.g. INF-CL-2026-0042
    company_name VARCHAR(255),
    gst_vat_number VARCHAR(100),
    billing_address TEXT,
    shipping_address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100) DEFAULT 'India',
    pin_code VARCHAR(20),
    primary_contact_person VARCHAR(255),
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- 4. SERVICES CMS
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.service_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL, -- 'Engineering', 'Architecture', 'Infrastructure', 'Consultancy & R&D'
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID REFERENCES public.service_categories(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    summary TEXT NOT NULL,
    hero_headline TEXT,
    description TEXT NOT NULL,
    capabilities JSONB DEFAULT '[]'::jsonb,
    process_steps JSONB DEFAULT '[]'::jsonb,
    deliverables JSONB DEFAULT '[]'::jsonb,
    target_industries JSONB DEFAULT '[]'::jsonb,
    faqs JSONB DEFAULT '[]'::jsonb,
    icon_name VARCHAR(100),
    cover_image_url TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- 5. PROJECTS & PORTFOLIO
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_code VARCHAR(50) UNIQUE NOT NULL, -- e.g. INF-PRJ-2026-001
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
    category VARCHAR(100) NOT NULL, -- 'Residential', 'Commercial', 'Industrial', 'Infrastructure', 'Government', 'Institutional', 'Research', 'Award Winning'
    location VARCHAR(255) NOT NULL,
    city VARCHAR(100),
    state VARCHAR(100),
    year INT DEFAULT 2026,
    built_up_area VARCHAR(100),
    building_type VARCHAR(100),
    services_rendered JSONB DEFAULT '[]'::jsonb,
    
    -- Portfolio & Case Study presentation
    summary TEXT NOT NULL,
    challenge TEXT,
    solution TEXT,
    engineering_approach TEXT,
    
    -- Project Management State
    status VARCHAR(50) DEFAULT 'Planning', -- 'Planning', 'Design', 'Review', 'Client Approval', 'Execution', 'Delivered', 'Completed'
    progress_percentage INT DEFAULT 0,
    start_date DATE,
    estimated_completion DATE,
    actual_completion DATE,
    
    cover_image_url TEXT,
    gallery_images JSONB DEFAULT '[]'::jsonb,
    drawings JSONB DEFAULT '[]'::jsonb,
    is_featured BOOLEAN DEFAULT FALSE,
    is_public_portfolio BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.project_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    project_role VARCHAR(100) NOT NULL, -- 'Project Manager', 'Lead Structural Engineer', 'Architect', 'Consultant', 'Client Representative'
    assigned_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(project_id, profile_id)
);

CREATE TABLE IF NOT EXISTS public.project_milestones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'Upcoming', -- 'Completed', 'In Progress', 'Upcoming', 'Blocked', 'Delayed'
    owner_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    start_date DATE,
    due_date DATE,
    completed_at TIMESTAMPTZ,
    progress_percentage INT DEFAULT 0,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.project_tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    milestone_id UUID REFERENCES public.project_milestones(id) ON DELETE CASCADE,
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'Todo', -- 'Todo', 'In Progress', 'Review', 'Done'
    priority VARCHAR(50) DEFAULT 'Medium', -- 'Low', 'Medium', 'High', 'Urgent'
    assigned_to UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    due_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.project_activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    actor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    activity_type VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- 6. DOCUMENT MANAGEMENT & VERSIONING
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    folder VARCHAR(100) NOT NULL, -- 'Architecture', 'Structural', 'Drawings', 'Reports', 'Estimation', 'Contracts', 'Approvals', 'Invoices', 'Other'
    name VARCHAR(255) NOT NULL,
    description TEXT,
    current_version VARCHAR(20) DEFAULT 'REV01',
    storage_path TEXT NOT NULL,
    file_size_bytes BIGINT,
    mime_type VARCHAR(100),
    file_extension VARCHAR(20),
    status VARCHAR(50) DEFAULT 'Draft', -- 'Draft', 'Under Review', 'Approved', 'Rejected', 'Archived'
    uploaded_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    is_client_accessible BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.document_versions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    document_id UUID REFERENCES public.documents(id) ON DELETE CASCADE,
    version_label VARCHAR(20) NOT NULL, -- e.g. 'REV01', 'REV02', 'REV03'
    storage_path TEXT NOT NULL,
    file_size_bytes BIGINT,
    change_summary TEXT,
    uploaded_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- 7. QUOTATIONS & VERSIONS
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.quotations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quotation_number VARCHAR(100) UNIQUE NOT NULL, -- e.g. INF-QT-2026-0089
    client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
    project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
    lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
    service_title VARCHAR(255) NOT NULL,
    
    subtotal NUMERIC(15, 2) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(15, 2) DEFAULT 0,
    tax_rate_percent NUMERIC(5, 2) DEFAULT 18.00,
    tax_amount NUMERIC(15, 2) DEFAULT 0,
    grand_total NUMERIC(15, 2) NOT NULL DEFAULT 0,
    currency VARCHAR(10) DEFAULT 'INR',
    
    valid_until DATE NOT NULL,
    terms_and_conditions TEXT,
    notes TEXT,
    status VARCHAR(50) DEFAULT 'Draft', -- 'Draft', 'Sent', 'Viewed', 'Revision Requested', 'Accepted', 'Rejected', 'Expired'
    client_action_note TEXT,
    accepted_at TIMESTAMPTZ,
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.quotation_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quotation_id UUID REFERENCES public.quotations(id) ON DELETE CASCADE,
    item_description TEXT NOT NULL,
    quantity NUMERIC(10, 2) DEFAULT 1,
    unit VARCHAR(50) DEFAULT 'Sq.Ft.', -- 'Sq.Ft.', 'Lump sum', 'Units', 'Hours'
    unit_price NUMERIC(15, 2) NOT NULL,
    total_price NUMERIC(15, 2) NOT NULL,
    display_order INT DEFAULT 0
);

-- =============================================================================
-- 8. INVOICES & PAYMENTS
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.invoices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_number VARCHAR(100) UNIQUE NOT NULL, -- e.g. INF-INV-2026-0045
    client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
    project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
    quotation_id UUID REFERENCES public.quotations(id) ON DELETE SET NULL,
    
    subtotal NUMERIC(15, 2) NOT NULL DEFAULT 0,
    tax_rate_percent NUMERIC(5, 2) DEFAULT 18.00,
    tax_amount NUMERIC(15, 2) DEFAULT 0,
    discount_amount NUMERIC(15, 2) DEFAULT 0,
    total_amount NUMERIC(15, 2) NOT NULL DEFAULT 0,
    amount_paid NUMERIC(15, 2) DEFAULT 0,
    balance_due NUMERIC(15, 2) NOT NULL DEFAULT 0,
    currency VARCHAR(10) DEFAULT 'INR',
    
    issue_date DATE NOT NULL DEFAULT CURRENT_DATE,
    due_date DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'Sent', -- 'Draft', 'Sent', 'Partially Paid', 'Paid', 'Overdue', 'Cancelled'
    notes TEXT,
    payment_terms TEXT,
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.invoice_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_id UUID REFERENCES public.invoices(id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    quantity NUMERIC(10, 2) DEFAULT 1,
    unit VARCHAR(50) DEFAULT 'Phase',
    unit_price NUMERIC(15, 2) NOT NULL,
    total_price NUMERIC(15, 2) NOT NULL,
    display_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    payment_reference VARCHAR(100) UNIQUE NOT NULL, -- e.g. PAY-2026-00912
    invoice_id UUID REFERENCES public.invoices(id) ON DELETE CASCADE,
    project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
    client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
    amount NUMERIC(15, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'INR',
    payment_method VARCHAR(50) DEFAULT 'Bank Transfer', -- 'Bank Transfer', 'NEFT/RTGS', 'UPI', 'Cheque', 'Credit Card Gateway'
    transaction_id VARCHAR(150),
    status VARCHAR(50) DEFAULT 'Successful', -- 'Pending', 'Processing', 'Successful', 'Failed', 'Refunded'
    payment_date DATE DEFAULT CURRENT_DATE,
    recorded_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- 9. MESSAGING & MEETINGS
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    message_text TEXT NOT NULL,
    attachments JSONB DEFAULT '[]'::jsonb,
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.meetings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
    organizer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    meeting_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    meeting_type VARCHAR(50) DEFAULT 'Virtual', -- 'Virtual', 'On-Site Inspection', 'In-Person Office'
    meeting_url TEXT,
    agenda TEXT,
    meeting_notes TEXT,
    status VARCHAR(50) DEFAULT 'Scheduled', -- 'Scheduled', 'Completed', 'Cancelled'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- 10. NOTIFICATIONS & AUDIT LOGS
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    recipient_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    link_url TEXT,
    notification_type VARCHAR(100), -- 'enquiry', 'lead_assigned', 'quotation', 'invoice', 'milestone', 'message', 'meeting'
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL, -- e.g. 'lead.create', 'quotation.accept', 'invoice.paid'
    entity VARCHAR(100) NOT NULL, -- 'leads', 'projects', 'quotations', 'invoices', 'documents'
    entity_id VARCHAR(100),
    metadata JSONB DEFAULT '{}'::jsonb,
    ip_address VARCHAR(50),
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- 11. CMS & SITE SETTINGS
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    department VARCHAR(100) NOT NULL, -- 'Executive Leadership', 'Structural Engineering', 'Architectural Design', 'Advisory Board'
    photo_url TEXT,
    biography TEXT NOT NULL,
    education TEXT,
    experience_years VARCHAR(50),
    expertise JSONB DEFAULT '[]'::jsonb,
    social_links JSONB DEFAULT '{}'::jsonb,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.awards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    year INT NOT NULL,
    organization VARCHAR(255) NOT NULL,
    position VARCHAR(100) NOT NULL, -- 'Winner', '2nd Position', '3rd Position'
    project_name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    certificate_url TEXT,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_name VARCHAR(255) NOT NULL,
    client_designation VARCHAR(255) NOT NULL,
    client_company VARCHAR(255),
    content TEXT NOT NULL,
    rating INT DEFAULT 5,
    project_reference VARCHAR(255),
    is_verified BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT TRUE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.offices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    region VARCHAR(100) NOT NULL, -- 'West Bengal HQ', 'Odisha Regional Office'
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pin_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) DEFAULT 'India',
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    is_headquarters BOOLEAN DEFAULT FALSE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.site_statistics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    metric_key VARCHAR(100) UNIQUE NOT NULL,
    label VARCHAR(255) NOT NULL,
    value_display VARCHAR(50) NOT NULL, -- '2.5M+', '200+', '26+', '5'
    numeric_value NUMERIC(15, 2),
    description TEXT,
    is_verified BOOLEAN DEFAULT TRUE,
    display_order INT DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key VARCHAR(100) UNIQUE NOT NULL,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- 12. ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.awards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_statistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Public can read active public services, portfolio projects, team members, awards, testimonials, site stats
CREATE POLICY "Public can view active service categories" ON public.service_categories FOR SELECT USING (true);
CREATE POLICY "Public can view active services" ON public.services FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view public projects" ON public.projects FOR SELECT USING (is_public_portfolio = true);
CREATE POLICY "Public can view team members" ON public.team_members FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view awards" ON public.awards FOR SELECT USING (true);
CREATE POLICY "Public can view verified testimonials" ON public.testimonials FOR SELECT USING (is_verified = true);
CREATE POLICY "Public can view offices" ON public.offices FOR SELECT USING (true);
CREATE POLICY "Public can view site stats" ON public.site_statistics FOR SELECT USING (is_verified = true);
CREATE POLICY "Public can view site settings" ON public.site_settings FOR SELECT USING (true);

-- Leads: Anyone can submit an enquiry; only admins/consultants can read
CREATE POLICY "Anonymous can insert lead enquiry" ON public.leads FOR INSERT WITH CHECK (true);

-- Clients can only see their own profile, projects, quotations, invoices, documents, and messages
CREATE POLICY "Clients can view own client profile" ON public.clients FOR SELECT USING (profile_id = auth.uid());

CREATE POLICY "Clients can view own projects" ON public.projects FOR SELECT USING (
    client_id IN (SELECT id FROM public.clients WHERE profile_id = auth.uid())
);

CREATE POLICY "Clients can view own quotations" ON public.quotations FOR SELECT USING (
    client_id IN (SELECT id FROM public.clients WHERE profile_id = auth.uid())
);

CREATE POLICY "Clients can view own invoices" ON public.invoices FOR SELECT USING (
    client_id IN (SELECT id FROM public.clients WHERE profile_id = auth.uid())
);

CREATE POLICY "Clients can view own payments" ON public.payments FOR SELECT USING (
    client_id IN (SELECT id FROM public.clients WHERE profile_id = auth.uid())
);

CREATE POLICY "Clients can view project documents" ON public.documents FOR SELECT USING (
    is_client_accessible = true AND project_id IN (
        SELECT id FROM public.projects WHERE client_id IN (SELECT id FROM public.clients WHERE profile_id = auth.uid())
    )
);

CREATE POLICY "Clients can view and send project messages" ON public.messages FOR ALL USING (
    project_id IN (
        SELECT id FROM public.projects WHERE client_id IN (SELECT id FROM public.clients WHERE profile_id = auth.uid())
    )
);

-- Profiles: Users can view their own profile; admins can view all
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (id = auth.uid());
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (id = auth.uid());
