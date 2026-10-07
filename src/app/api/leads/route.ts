import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('[API /api/leads] Supabase error:', error.message);
      return NextResponse.json({ success: false, error: error.message, leads: [] }, { status: 500 });
    }

    // Map DB fields cleanly to frontend Lead model
    const leads = (data || []).map((row: any) => ({
      id: row.id,
      enquiryNumber: row.reference_id || row.enquiry_number || `LIV-2026-${row.id.slice(0, 5)}`,
      referenceId: row.reference_id || row.enquiry_number,
      fullName: row.full_name || row.name || 'Anonymous Client',
      name: row.full_name || row.name || 'Anonymous Client',
      email: row.email || '',
      phone: row.phone || '',
      companyName: row.company || row.company_name,
      projectName: row.project_name || `${row.project_type || 'Infrastructure'} Project`,
      projectType: row.project_type || 'Residential',
      serviceRequired: row.service || row.service_required || 'Full Engineering Consultation',
      service: row.service || row.service_required || 'Full Engineering Consultation',
      city: row.city || '',
      state: row.state || 'West Bengal',
      country: row.country || 'India',
      pinCode: row.pin_code || '',
      location: row.location || `${row.city || 'Kolkata'}, ${row.state || 'WB'}`,
      budget: row.budget || row.estimated_budget || 'Undisclosed',
      estimatedBudget: row.budget || row.estimated_budget || 'Undisclosed',
      timeline: row.timeline || 'Immediate',
      requirements: row.requirements || row.description || '',
      description: row.requirements || row.description || '',
      additionalRequirements: row.additional_requirements || '',
      attachments: row.attachments || [],
      status: mapStatus(row.status),
      assignedTo: row.assigned_to || undefined,
      assignedToName: row.assigned_to ? 'Assigned Staff' : undefined,
      source: row.source || 'Website Start Project',
      createdAt: row.created_at,
      updatedAt: row.updated_at || row.created_at,
    }));

    return NextResponse.json({ success: true, count: leads.length, leads });
  } catch (err: any) {
    console.error('[API /api/leads] Critical error:', err);
    return NextResponse.json({ success: false, error: err.message, leads: [] }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status, assignedTo, notes } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Lead ID is required' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const updatePayload: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };

    if (status) updatePayload.status = status;
    if (assignedTo !== undefined) updatePayload.assigned_to = assignedTo;

    const { data, error } = await supabase
      .from('leads')
      .update(updatePayload)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, lead: data });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

function mapStatus(rawStatus?: string): string {
  if (!rawStatus) return 'New Leads';
  const s = rawStatus.toLowerCase();
  if (s.includes('new')) return 'New Leads';
  if (s.includes('contact')) return 'Contacted';
  if (s.includes('qualif')) return 'Qualified';
  if (s.includes('meet')) return 'Meeting';
  if (s.includes('quote') || s.includes('quotation')) return 'Quotation';
  if (s.includes('negot')) return 'Negotiation';
  if (s.includes('won') || s.includes('convert')) return 'Won';
  if (s.includes('lost')) return 'Lost';
  return 'New Leads';
}
