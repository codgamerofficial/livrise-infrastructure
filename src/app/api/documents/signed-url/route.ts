import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { storagePath, expiresIn = 3600 } = body;

    if (!storagePath) {
      return NextResponse.json({ success: false, error: 'storagePath is required' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const bucket = process.env.NEXT_PUBLIC_STORAGE_BUCKET_DOCUMENTS || 'project-documents';

    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUrl(storagePath, expiresIn);

    if (error || !data?.signedUrl) {
      return NextResponse.json({ success: false, error: error?.message || 'Failed to generate signed URL' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      signedUrl: data.signedUrl,
      expiresAt: new Date(Date.now() + expiresIn * 1000).toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
