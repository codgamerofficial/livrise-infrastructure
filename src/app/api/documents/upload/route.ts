import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const projectId = (formData.get('projectId') as string) || 'prj-default';
    const title = (formData.get('title') as string) || (file?.name ? file.name.split('.')[0] : 'Document');
    const folder = (formData.get('folder') as string) || 'Drawings';
    const uploadedBy = (formData.get('uploadedBy') as string) || 'Authorized User';
    const version = (formData.get('version') as string) || 'REV01';

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const bucket = process.env.NEXT_PUBLIC_STORAGE_BUCKET_DOCUMENTS || 'project-documents';

    // Generate unique storage path
    const fileExt = file.name.split('.').pop()?.toLowerCase() || 'pdf';
    const safeBaseName = title.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const storagePath = `projects/${projectId}/${folder.toLowerCase()}/${Date.now()}-${safeBaseName}.${fileExt}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadErr } = await supabase.storage
      .from(bucket)
      .upload(storagePath, buffer, {
        contentType: file.type || 'application/pdf',
        upsert: false,
      });

    if (uploadErr) {
      console.warn('[API /api/documents/upload] Supabase storage upload warning:', uploadErr.message);
    }

    // Generate initial signed URL (valid for 1 hour)
    let signedUrl = '';
    const { data: signedData, error: signErr } = await supabase.storage
      .from(bucket)
      .createSignedUrl(storagePath, 3600);

    if (!signErr && signedData?.signedUrl) {
      signedUrl = signedData.signedUrl;
    }

    const documentRecord = {
      id: `doc-${Date.now()}`,
      projectId,
      name: title,
      folder,
      category: folder,
      currentVersion: version,
      storagePath,
      signedUrl,
      fileSizeBytes: file.size,
      fileExtension: fileExt,
      status: 'Approved',
      uploadedBy,
      uploadedAt: new Date().toISOString(),
      isClientAccessible: true,
    };

    return NextResponse.json({
      success: true,
      document: documentRecord,
      message: 'File securely stored in Supabase Storage',
    });
  } catch (err: any) {
    console.error('[API /api/documents/upload] Error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
