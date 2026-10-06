import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { referenceId, event, timestamp } = body;

    if (!referenceId || event !== 'whatsapp_enquiry_opened') {
      return NextResponse.json(
        { error: 'Invalid tracking event payload' },
        { status: 400 }
      );
    }

    const recordedTimestamp = timestamp || new Date().toISOString();

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    const isLiveSupabaseConfigured =
      Boolean(
        supabaseUrl &&
        supabaseKey &&
        !supabaseUrl.includes('livrise-cloud.supabase.co') &&
        !supabaseUrl.includes('mock') &&
        !supabaseKey.includes('mock')
      );

    if (isLiveSupabaseConfigured && supabaseUrl && supabaseKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey, {
          auth: { persistSession: false },
        });

        await supabase
          .from('leads')
          .update({ whatsapp_opened_at: recordedTimestamp })
          .or(`reference_id.eq.${referenceId},enquiry_number.eq.${referenceId}`);
      } catch (err) {
        console.warn('[Tracking API] Supabase tracking update warning:', err);
      }
    } else {
      // Local dev logging
      try {
        const dataDir = path.join(process.cwd(), '.data');
        const trackingFile = path.join(dataDir, 'events.json');
        let events = [];
        if (fs.existsSync(trackingFile)) {
          try {
            events = JSON.parse(fs.readFileSync(trackingFile, 'utf8'));
          } catch {
            events = [];
          }
        }
        events.push({
          event: 'whatsapp_enquiry_opened',
          reference_id: referenceId,
          timestamp: recordedTimestamp,
        });
        fs.writeFileSync(trackingFile, JSON.stringify(events, null, 2), 'utf8');
      } catch (fileErr) {
        console.warn('[Tracking API] Local event write warning:', fileErr);
      }
    }

    return NextResponse.json({
      success: true,
      event: 'whatsapp_enquiry_opened',
      referenceId,
      timestamp: recordedTimestamp,
    });
  } catch (error) {
    console.error('[Tracking API] Error:', error);
    return NextResponse.json(
      { error: 'Failed to record tracking event' },
      { status: 500 }
    );
  }
}
