import { NextResponse } from 'next/server';
import { sendEnquiryNotificationEmail } from '@/lib/email-service';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { fullName, email, phone, message, requirements } = body;

    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required contact parameters (fullName, email, phone)' },
        { status: 400 }
      );
    }

    const payload = {
      fullName,
      email,
      phone,
      companyName: body.companyName || body.company || '',
      serviceRequired: body.serviceRequired || 'Engineering Consultation',
      projectType: body.projectType || 'Commercial',
      city: body.city || body.location || '',
      state: body.state || '',
      estimatedBudget: body.estimatedBudget || body.budget || '',
      expectedStartDate: body.expectedStartDate || body.timeline || '',
      requirements: requirements || message || 'No message provided',
      source: body.source || 'LivRise Web Contact',
      enquiryNumber: body.enquiryNumber,
    };

    const emailResult = await sendEnquiryNotificationEmail(payload);

    return NextResponse.json({
      success: true,
      message: 'Enquiry received and processed successfully',
      notification: emailResult,
    });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process contact enquiry' },
      { status: 500 }
    );
  }
}
