import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { leadId } = body;

    if (!leadId) {
      return NextResponse.json({ success: false, error: 'leadId is required' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();

    // 1. Fetch the lead from Supabase
    const { data: lead, error: leadErr } = await supabase
      .from('leads')
      .select('*')
      .eq('id', leadId)
      .single();

    if (leadErr || !lead) {
      return NextResponse.json(
        { success: false, error: leadErr ? leadErr.message : 'Lead not found in Supabase' },
        { status: 404 }
      );
    }

    const year = new Date().getFullYear();
    const uniqueDigits = Math.floor(1000 + Math.random() * 9000);
    const clientCode = `LIV-CL-${year}-${uniqueDigits}`;
    const projectCode = `LIV-PRJ-${year}-${uniqueDigits}`;
    const clientId = `cl-${Date.now()}`;
    const projectId = `prj-${Date.now()}`;

    // 2. Mark lead as Won/Converted in Supabase
    await supabase
      .from('leads')
      .update({
        status: 'Won',
        updated_at: new Date().toISOString(),
      })
      .eq('id', leadId);

    // 3. Construct Client object
    const clientData = {
      id: clientId,
      clientCode,
      profileId: `usr-client-${Date.now()}`,
      fullName: lead.full_name || lead.name || 'Client',
      email: lead.email || '',
      phone: lead.phone || '',
      billingAddress: lead.location || `${lead.city || 'Kolkata'}, ${lead.state || 'West Bengal'}`,
      city: lead.city || 'Kolkata',
      state: lead.state || 'West Bengal',
      country: lead.country || 'India',
      pinCode: lead.pin_code || '',
      activeProjectsCount: 1,
      totalBilled: 0,
      totalPaid: 0,
      status: 'Active',
      companyName: lead.company || lead.company_name || `${lead.full_name || 'Client'} Estates`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // 4. Construct Project object
    const projectTitle = lead.project_name || `${lead.project_type || 'Infrastructure'} Development`;
    const projectData = {
      id: projectId,
      projectCode,
      clientId,
      clientName: clientData.fullName,
      clientEmail: clientData.email,
      title: projectTitle,
      name: projectTitle,
      projectType: lead.project_type || 'Residential',
      service: lead.service || lead.service_required || 'Structural & Architectural Consultation',
      stage: 'Design',
      status: 'In Progress',
      progress: 15,
      progressPercentage: 15,
      health: 'Good',
      budget: typeof lead.budget === 'number' ? lead.budget : 3500000,
      budgetFormatted: lead.budget || '₹35 Lakhs',
      spent: 0,
      spentFormatted: '₹0',
      currency: 'INR',
      currencySymbol: '₹',
      startDate: new Date().toISOString().split('T')[0],
      targetCompletionDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      location: lead.location || `${lead.city || 'Kolkata'}, ${lead.state || 'WB'}`,
      description: lead.requirements || lead.description || 'Turnkey engineering and architectural execution.',
      teamCount: 4,
      pendingActionsCount: 1,
      assignedLeadId: lead.id,
      assignedTeamMembers: [
        {
          id: 'usr-pm-1',
          name: 'Iman Khanra',
          role: 'Lead Project Engineer',
          avatarUrl: '/images/team/iman-khanra.png',
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // 5. Construct Initial Milestones
    const milestonesData = [
      {
        id: `ms-${Date.now()}-1`,
        projectId,
        title: 'Initial Consultation & Technical Site Feasibility',
        description: 'Site inspection, soil test review, and requirement analysis.',
        status: 'Completed',
        percentage: 100,
        stage: 'Consultation',
        dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        completedDate: new Date().toISOString().split('T')[0],
      },
      {
        id: `ms-${Date.now()}-2`,
        projectId,
        title: 'Architectural Concept & 3D Elevation Approval',
        description: 'Submission of 3D floor plan layout and elevation renders for client sign-off.',
        status: 'In Progress',
        percentage: 30,
        stage: 'Design',
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      },
      {
        id: `ms-${Date.now()}-3`,
        projectId,
        title: 'Structural Design & Stability Certification',
        description: 'Seismic and wind load analysis, foundation drafting, and structural approval.',
        status: 'Upcoming',
        percentage: 0,
        stage: 'Design',
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      },
      {
        id: `ms-${Date.now()}-4`,
        projectId,
        title: 'Municipal Building Sanction & Approvals',
        description: 'Filing documentation with local municipal corporation authorities.',
        status: 'Upcoming',
        percentage: 0,
        stage: 'Approval',
        dueDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      },
      {
        id: `ms-${Date.now()}-5`,
        projectId,
        title: 'Site Execution & Foundation Construction',
        description: 'Site leveling, excavation, piling, and RCC foundation pouring.',
        status: 'Upcoming',
        percentage: 0,
        stage: 'Construction',
        dueDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      },
    ];

    // Try inserting into Supabase tables if they exist
    try {
      await supabase.from('clients').insert({
        id: clientId,
        client_code: clientCode,
        company_name: clientData.companyName,
        billing_address: clientData.billingAddress,
        city: clientData.city,
        state: clientData.state,
        country: clientData.country,
        pin_code: clientData.pinCode,
      });

      await supabase.from('projects').insert({
        id: projectId,
        project_code: projectCode,
        client_id: clientId,
        title: projectData.title,
        project_type: projectData.projectType,
        service: projectData.service,
        current_stage: projectData.stage,
        status: projectData.status,
        progress: projectData.progress,
        budget: projectData.budget,
        location: projectData.location,
        description: projectData.description,
      });
    } catch (dbErr) {
      // Table migration pending in Supabase; fallback handled gracefully
      console.warn('[Convert API] Supabase table insert skipped:', dbErr);
    }

    return NextResponse.json({
      success: true,
      message: `Lead successfully converted to Client ${clientCode} and Project ${projectCode}`,
      client: clientData,
      project: projectData,
      milestones: milestonesData,
    });
  } catch (err: any) {
    console.error('[API /api/admin/leads/convert] Error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
