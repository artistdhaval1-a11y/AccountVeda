import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const folderId = process.env.KNOWLEDGE_DRIVE_FOLDER_ID;
    const apiKey = process.env.GOOGLE_DRIVE_API_KEY;
    if (!folderId || !apiKey) {
      return res.status(200).json({ configured: false, files: [] });
    }

    const params = new URLSearchParams({
      q: `'${folderId}' in parents and trashed = false`,
      fields: 'files(id,name,mimeType,size,createdTime,modifiedTime,description)',
      orderBy: 'modifiedTime desc',
      key: apiKey,
    });
    const response = await fetch(`https://www.googleapis.com/drive/v3/files?${params.toString()}`);
    if (!response.ok) {
      return res.status(502).json({ configured: true, files: [], error: 'Google Drive request failed' });
    }
    const data = await response.json();
    const files = (data.files || []).map((file: any) => ({
      id: file.id,
      name: file.name,
      mimeType: file.mimeType,
      size: file.size,
      createdTime: file.createdTime,
      modifiedTime: file.modifiedTime,
      description: file.description,
      viewUrl: 'https://drive.google.com/file/d/' + file.id + '/view',
    }));
    return res.status(200).json({ configured: true, files });
  } catch {
    return res.status(500).json({ configured: true, files: [], error: 'Internal server error' });
  }
}