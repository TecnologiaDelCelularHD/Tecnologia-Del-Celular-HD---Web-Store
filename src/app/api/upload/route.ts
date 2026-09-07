import { NextResponse } from 'next/server';
import { getStorageAdapter } from '@/services/storage';

const ALLOWED_MIME_TYPES = ['image/png', 'image/jpeg', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No se enviaron archivos' }, { status: 400 });
    }

    const storage = getStorageAdapter();
    const uploadedUrls: string[] = [];

    for (const file of files) {
      if (!ALLOWED_MIME_TYPES.includes(file.type)) {
        return NextResponse.json(
          { error: 'Tipo de archivo no permitido. Sólo se admiten PNG, JPEG y WEBP.' },
          { status: 400 }
        );
      }

      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: 'El archivo ' + file.name + ' supera el límite máximo de 5MB.' },
          { status: 400 }
        );
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      const url = await storage.uploadFile(buffer, file.name, file.type);
      uploadedUrls.push(url);
    }

    return NextResponse.json({ urls: uploadedUrls });
  } catch (error: any) {
    console.error('Error al subir archivos:', error);
    return NextResponse.json({ error: error.message || 'Error al procesar la subida' }, { status: 500 });
  }
}
