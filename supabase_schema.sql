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
    name VARCHAR(50) UNIQUE NOT NULL, -- 'super_admin', 'admin', 'project_manager', 'engineer', 'designer', 'finance', 'support', 'client'
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed canonical roles
INSERT INTO public.roles (name, description) VALUES
    ('super_admin', 'LivRise Super Administrator with full system control'),
    ('admin', 'Operations & Project Administrator'),
    ('project_manager', 'Project Manager with assigned project & client control'),
    ('engineer', 'Civil & Structural Engineering Specialist'),
    ('designer', 'Architectural & 3D Visualization Specialist'),
    ('finance', 'Financial Controller for Quotations, Invoices & Payments'),
    ('support', 'Client Relations & Enquiry Support'),
    ('client', 'Verified Project Homeowner / Enterprise Client')
ON CONFLICT (name) DO NOTHING;

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
    reference_id VARCHAR(50) UNIQUE NOT NULL, -- e.g. LIV-2026-48277
    enquiry_number VARCHAR(50) UNIQUE NOT NULL, -- Synchronized with reference_id
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    company VARCHAR(255),
    company_name VARCHAR(255),
    preferred_contact_method VARCHAR(50) DEFAULT 'email', -- 'email', 'phone', 'whatsapp'
    
    -- Project Parameters
    project_name VARCHAR(255),
    project_type VARCHAR(100) NOT NULL, -- Residential Villa, Commercial Office Complex, etc.
    service VARCHAR(100),
    service_required VARCHAR(100) NOT NULL, -- Architecture, Structural Engineering, Infrastructure, etc.
    country VARCHAR(100) DEFAULT 'India',
    state VARCHAR(100),
    city VARCHAR(100),
    pin_code VARCHAR(20),
    location VARCHAR(255),
    
    plot_area VARCHAR(100),
    built_up_area VARCHAR(100),
    number_of_floors VARCHAR(50),
    current_stage VARCHAR(100), -- Concept, Land Acquired, Planning, Ready to Build
    budget VARCHAR(100),
    estimated_budget VARCHAR(100),
    timeline VARCHAR(100),
    start_date VARCHAR(100),
    expected_start_date DATE,
    description TEXT,
    requirements TEXT NOT NULL,
    additional_requirements TEXT,
    attachments JSONB DEFAULT '[]'::jsonb, -- Array of uploaded drawing documents
    
    -- CRM Pipeline Status & Tracking
    status VARCHAR(50) DEFAULT 'New', -- 'New', 'Contacted', 'Qualified', 'Consultation', 'Proposal', 'Negotiation', 'Won', 'Lost', 'Archived'
    assigned_to UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    estimated_value NUMERIC(15, 2),
    source VARCHAR(100) DEFAULT 'Website Enquiry',
    whatsapp_opened_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for lightning-fast CRM and public queries
CREATE UNIQUE INDEX IF NOT EXISTS idx_leads_reference_id ON public.leads (reference_id);
CREATE INDEX IF NOT EXISTS idx_leads_enquiry_number ON public.leads (enquiry_number);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads (status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads (email);

-- Enquiries view alias for unified API integration
CREATE OR REPLACE VIEW public.enquiries AS SELECT * FROM public.leads;

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
    activity_type VARCHAR(50) NOT NULL, -- 'status_change', 'note_added', 'assigned', 'meeting_scheduled', 'quotation_sent', 'converted'
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
    client_code VARCHAR(50) UNIQUE NOT NULL, -- e.g. LIV-CL-2026-0042
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
    name VARCHAR(100) UNIQUE NOT NULL,
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
    project_code VARCHAR(50) UNIQUE NOT NULL, -- e.g. LIV-PRJ-2026-001
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
    category VARCHAR(100) NOT NULL, -- 'Residential', 'Commercial', 'Industrial', 'Infrastructure', 'Institutional'
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
    status VARCHAR(50) DEFAULT 'Planning', -- 'Planning', 'Design', 'Approval', 'Construction', 'On Hold', 'Completed', 'Cancelled'
    stage VARCHAR(50) DEFAULT 'CONSULTATION', -- 'CONSULTATION', 'DESIGN', 'APPROVAL', 'CONSTRUCTION', 'COMPLETED'
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
    project_role VARCHAR(100) NOT NULL, -- 'Project Manager', 'Lead Structural Engineer', 'Architect', 'Civil Engineer', 'Client Representative'
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
    status VARCHAR(50) DEFAULT 'Todo', -- 'Todo', 'In Progress', 'Review', 'Completed', 'Blocked'
    priority VARCHAR(50) DEFAULT 'Medium', -- 'Low', 'Medium', 'High', 'Urgent'
    assigned_to UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    due_date DATE,
    requires_client_action BOOLEAN DEFAULT FALSE,
    client_action_type VARCHAR(100), -- 'Approve Floor Plan', 'Review 3D Elevation', 'Approve Quotation', 'Upload Document'
    client_action_status VARCHAR(50) DEFAULT 'Pending', -- 'Pending', 'In Review', 'Approved', 'Rejected', 'Completed'
    completed_at TIMESTAMPTZ,
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

CREATE TABLE IF NOT EXISTS public.project_change_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'Submitted', -- 'Submitted', 'Under Review', 'Quoted', 'Approved', 'Rejected', 'Completed'
    estimated_cost NUMERIC(15, 2),
    estimated_delay_days INT DEFAULT 0,
    attachment_url TEXT,
    admin_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- 6. DOCUMENT MANAGEMENT & VERSIONING
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    folder VARCHAR(100) NOT NULL, -- 'Architecture', 'Structural', 'Drawings', 'Reports', 'Estimation', 'Contracts', 'Approvals', 'Invoices', 'Receipts', 'Other'
    name VARCHAR(255) NOT NULL,
    description TEXT,
    current_version VARCHAR(20) DEFAULT 'REV01',
    storage_path TEXT NOT NULL,
    file_size_bytes BIGINT,
    mime_type VARCHAR(100),
    file_extension VARCHAR(20),
    status VARCHAR(50) DEFAULT 'Approved', -- 'Draft', 'Under Review', 'Approved', 'Rejected', 'Archived'
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
    quotation_number VARCHAR(100) UNIQUE NOT NULL, -- e.g. LIV-QT-2026-0089
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
    status VARCHAR(50) DEFAULT 'Sent', -- 'Draft', 'Sent', 'Viewed', 'Accepted', 'Rejected', 'Expired'
    client_action_note TEXT,
    accepted_at TIMESTAMPTZ,
    accepted_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
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
    invoice_number VARCHAR(100) UNIQUE NOT NULL, -- e.g. LIV-INV-2026-0045
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
    status VARCHAR(50) DEFAULT 'Sent', -- 'Draft', 'Issued', 'Partially Paid', 'Paid', 'Overdue', 'Cancelled'
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
    payment_method VARCHAR(50) DEFAULT 'Bank Transfer', -- 'Bank Transfer', 'NEFT/RTGS', 'UPI', 'Cash', 'Other'
    transaction_reference VARCHAR(150),
    status VARCHAR(50) DEFAULT 'Successful', -- 'Pending', 'Processing', 'Successful', 'Failed', 'Refunded'
    payment_date DATE DEFAULT CURRENT_DATE,
    paid_at TIMESTAMPTZ DEFAULT NOW(),
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
    notification_type VARCHAR(100), -- 'enquiry', 'lead_assigned', 'quotation', 'invoice', 'payment', 'milestone', 'message', 'meeting', 'document'
    reference_type VARCHAR(50),
    reference_id VARCHAR(100),
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL, -- e.g. 'lead.convert', 'quotation.accept', 'invoice.paid'
    entity VARCHAR(100) NOT NULL, -- 'leads', 'clients', 'projects', 'quotations', 'invoices', 'documents', 'payments'
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
    position VARCHAR(100) NOT NULL,
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

CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key VARCHAR(100) UNIQUE NOT NULL,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed initial site settings
INSERT INTO public.site_settings (key, value) VALUES (
    'company_profile',
    '{
        "name": "LivRise Infrastructure",
        "tagline": "Engineering • Architecture • Infrastructure | Building Ideas Into Reality.",
        "email": "livriseinfrastructure@gmail.com",
        "phone": "+91 6296603868",
        "whatsapp": "+91 6296603868",
        "currency": "INR",
        "gstRate": 18.0,
        "headquarters": "West Bengal, India"
    }'::jsonb
) ON CONFLICT (key) DO NOTHING;

-- =============================================================================
-- 12. AUTOMATIC PROFILE TRIGGER (ON AUTH.USERS SIGNUP)
-- =============================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    default_role_id UUID;
    user_role_name VARCHAR(50);
BEGIN
    user_role_name := COALESCE(NEW.raw_user_meta_data->>'role', 'client');
    SELECT id INTO default_role_id FROM public.roles WHERE name = user_role_name;
    IF default_role_id IS NULL THEN
        SELECT id INTO default_role_id FROM public.roles WHERE name = 'client';
    END IF;

    INSERT INTO public.profiles (
        id,
        role_id,
        full_name,
        email,
        phone,
        company_name,
        is_active
    ) VALUES (
        NEW.id,
        default_role_id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
        NEW.email,
        NEW.raw_user_meta_data->>'phone',
        NEW.raw_user_meta_data->>'company_name',
        TRUE
    )
    ON CONFLICT (id) DO UPDATE SET
        full_name = EXCLUDED.full_name,
        phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
        updated_at = NOW();

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT OR UPDATE ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================================================
-- 13. REALTIME REPLICATION PUBLICATION
-- =============================================================================

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
        CREATE PUBLICATION supabase_realtime;
    END IF;
END $$;

ALTER PUBLICATION supabase_realtime ADD TABLE 
    public.messages,
    public.notifications,
    public.project_milestones,
    public.project_tasks,
    public.documents,
    public.quotations,
    public.invoices,
    public.payments;

-- =============================================================================
-- 14. ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_change_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current authenticated user has an administrative role
CREATE OR REPLACE FUNCTION public.is_admin_or_staff()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles p
        JOIN public.roles r ON p.role_id = r.id
        WHERE p.id = auth.uid()
        AND r.name IN ('super_admin', 'admin', 'project_manager', 'engineer', 'designer', 'finance', 'support')
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Profiles
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (id = auth.uid() OR public.is_admin_or_staff());
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (id = auth.uid());
CREATE POLICY "Admins can manage all profiles" ON public.profiles FOR ALL USING (public.is_admin_or_staff());

-- Leads
CREATE POLICY "Anonymous can insert lead enquiry" ON public.leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Staff can view all leads" ON public.leads FOR SELECT USING (public.is_admin_or_staff());
CREATE POLICY "Staff can update leads" ON public.leads FOR UPDATE USING (public.is_admin_or_staff());

-- Clients
CREATE POLICY "Clients can view own client profile" ON public.clients FOR SELECT USING (profile_id = auth.uid() OR public.is_admin_or_staff());
CREATE POLICY "Staff can manage clients" ON public.clients FOR ALL USING (public.is_admin_or_staff());

-- Projects
CREATE POLICY "Clients can view own projects" ON public.projects FOR SELECT USING (
    (client_id IN (SELECT id FROM public.clients WHERE profile_id = auth.uid()))
    OR (id IN (SELECT project_id FROM public.project_members WHERE profile_id = auth.uid()))
    OR public.is_admin_or_staff()
    OR (is_public_portfolio = true)
);
CREATE POLICY "Staff can manage projects" ON public.projects FOR ALL USING (public.is_admin_or_staff());

-- Milestones & Tasks
CREATE POLICY "Project stakeholders can view milestones" ON public.project_milestones FOR SELECT USING (
    project_id IN (
        SELECT id FROM public.projects WHERE client_id IN (SELECT id FROM public.clients WHERE profile_id = auth.uid())
    ) OR public.is_admin_or_staff()
);
CREATE POLICY "Staff can manage milestones" ON public.project_milestones FOR ALL USING (public.is_admin_or_staff());

CREATE POLICY "Project stakeholders can view tasks" ON public.project_tasks FOR SELECT USING (
    project_id IN (
        SELECT id FROM public.projects WHERE client_id IN (SELECT id FROM public.clients WHERE profile_id = auth.uid())
    ) OR public.is_admin_or_staff()
);
CREATE POLICY "Clients can update tasks requiring their action" ON public.project_tasks FOR UPDATE USING (
    requires_client_action = true AND project_id IN (
        SELECT id FROM public.projects WHERE client_id IN (SELECT id FROM public.clients WHERE profile_id = auth.uid())
    )
);
CREATE POLICY "Staff can manage tasks" ON public.project_tasks FOR ALL USING (public.is_admin_or_staff());

-- Documents
CREATE POLICY "Clients can view client accessible documents" ON public.documents FOR SELECT USING (
    (is_client_accessible = true AND project_id IN (
        SELECT id FROM public.projects WHERE client_id IN (SELECT id FROM public.clients WHERE profile_id = auth.uid())
    )) OR public.is_admin_or_staff()
);
CREATE POLICY "Staff can manage documents" ON public.documents FOR ALL USING (public.is_admin_or_staff());

-- Quotations
CREATE POLICY "Clients can view own quotations" ON public.quotations FOR SELECT USING (
    client_id IN (SELECT id FROM public.clients WHERE profile_id = auth.uid()) OR public.is_admin_or_staff()
);
CREATE POLICY "Clients can accept or request revision on quotation" ON public.quotations FOR UPDATE USING (
    client_id IN (SELECT id FROM public.clients WHERE profile_id = auth.uid())
);
CREATE POLICY "Staff can manage quotations" ON public.quotations FOR ALL USING (public.is_admin_or_staff());

-- Invoices & Payments
CREATE POLICY "Clients can view own invoices" ON public.invoices FOR SELECT USING (
    client_id IN (SELECT id FROM public.clients WHERE profile_id = auth.uid()) OR public.is_admin_or_staff()
);
CREATE POLICY "Staff can manage invoices" ON public.invoices FOR ALL USING (public.is_admin_or_staff());

CREATE POLICY "Clients can view own payments" ON public.payments FOR SELECT USING (
    client_id IN (SELECT id FROM public.clients WHERE profile_id = auth.uid()) OR public.is_admin_or_staff()
);
CREATE POLICY "Staff can manage payments" ON public.payments FOR ALL USING (public.is_admin_or_staff());

-- Messages
CREATE POLICY "Clients can view and send project messages" ON public.messages FOR ALL USING (
    project_id IN (
        SELECT id FROM public.projects WHERE client_id IN (SELECT id FROM public.clients WHERE profile_id = auth.uid())
    ) OR public.is_admin_or_staff()
);

-- Notifications
CREATE POLICY "Users can view own notifications" ON public.notifications FOR SELECT USING (
    recipient_id = auth.uid() OR recipient_id IS NULL
);
CREATE POLICY "Users can mark own notifications as read" ON public.notifications FOR UPDATE USING (
    recipient_id = auth.uid()
);

-- Site Settings
CREATE POLICY "Public can view site settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Staff can manage site settings" ON public.site_settings FOR ALL USING (public.is_admin_or_staff());
