import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://livrise-cloud.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'mock_anon_key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function uploadProjectFile(file: File, folderPath: string) {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const fullPath = `${folderPath}/${fileName}`;

    const bucketName = process.env.NEXT_PUBLIC_STORAGE_BUCKET_DOCUMENTS || 'project-documents';

    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(fullPath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      // Return simulated signed URL if offline or mock supabase
      return {
        path: `/storage/mock/${fullPath}`,
        name: file.name,
        size: file.size,
      };
    }

    const { data: urlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(data.path);

    return {
      path: urlData.publicUrl,
      name: file.name,
      size: file.size,
    };
  } catch {
    return {
      path: `/storage/local/${file.name}`,
      name: file.name,
      size: file.size,
    };
  }
}
