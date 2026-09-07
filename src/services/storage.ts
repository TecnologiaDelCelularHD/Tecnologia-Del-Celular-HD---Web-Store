import fs from 'fs';
import path from 'path';

export interface StorageAdapter {
  uploadFile(file: Buffer, filename: string, mimeType: string): Promise<string>;
}

class LocalStorageAdapter implements StorageAdapter {
  private uploadDir: string;

  constructor() {
    this.uploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async uploadFile(file: Buffer, filename: string): Promise<string> {
    const cleanFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '_');
    const uniqueName = Date.now() + '-' + cleanFilename;
    const filePath = path.join(this.uploadDir, uniqueName);
    await fs.promises.writeFile(filePath, file);
    return '/uploads/' + uniqueName;
  }
}

class VercelBlobStorageAdapter implements StorageAdapter {
  async uploadFile(file: Buffer, filename: string): Promise<string> {
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) {
      const local = new LocalStorageAdapter();
      return local.uploadFile(file, filename);
    }
    throw new Error('Vercel Blob token configurado pero no inicializado en V1');
  }
}

export function getStorageAdapter(): StorageAdapter {
  if (process.env.STORAGE_PROVIDER === 'vercel-blob' && process.env.BLOB_READ_WRITE_TOKEN) {
    return new VercelBlobStorageAdapter();
  }
  return new LocalStorageAdapter();
}
