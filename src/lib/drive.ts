/**
 * Google Drive API Integration Helpers for AccountVeda
 */

export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  webViewLink?: string;
  createdTime?: string;
}

/**
 * Searches for the 'AccountVeda_Vault' folder in the user's Google Drive.
 * If not found, it creates the folder and returns its ID.
 */
export async function findOrCreateVaultFolder(accessToken: string): Promise<string> {
  const query = encodeURIComponent("name = 'AccountVeda_Vault' and mimeType = 'application/vnd.google-apps.folder' and trashed = false");
  const searchUrl = `https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name)`;

  try {
    const res = await fetch(searchUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Failed to search folder: ${errText}`);
    }

    const data = await res.json();
    if (data.files && data.files.length > 0) {
      // Return the existing folder ID
      return data.files[0].id;
    }

    // Create the folder
    const createUrl = 'https://www.googleapis.com/drive/v3/files';
    const createRes = await fetch(createUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'AccountVeda_Vault',
        mimeType: 'application/vnd.google-apps.folder',
      }),
    });

    if (!createRes.ok) {
      const errText = await createRes.text();
      throw new Error(`Failed to create AccountVeda_Vault folder: ${errText}`);
    }

    const folder = await createRes.json();
    return folder.id;
  } catch (error) {
    console.error('findOrCreateVaultFolder error:', error);
    throw error;
  }
}

/**
 * Lists all files inside the AccountVeda_Vault folder.
 */
export async function listVaultFiles(accessToken: string, folderId: string): Promise<DriveFile[]> {
  const query = encodeURIComponent(`'${folderId}' in parents and trashed = false`);
  const listUrl = `https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name,mimeType,size,webViewLink,createdTime)&orderBy=createdTime+desc`;

  try {
    const res = await fetch(listUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Failed to list files: ${errText}`);
    }

    const data = await res.json();
    return data.files || [];
  } catch (error) {
    console.error('listVaultFiles error:', error);
    throw error;
  }
}

/**
 * Uploads a file (File object from browser input) to the specified folder.
 */
export async function uploadFileToVault(
  accessToken: string,
  folderId: string,
  file: File
): Promise<DriveFile> {
  const metadata = {
    name: file.name,
    parents: [folderId],
    mimeType: file.type || 'application/octet-stream',
  };

  const formData = new FormData();
  formData.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
  formData.append('file', file);

  try {
    const res = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,mimeType,size,webViewLink,createdTime', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Upload failed: ${errText}`);
    }

    return await res.json();
  } catch (error) {
    console.error('uploadFileToVault error:', error);
    throw error;
  }
}

/**
 * Creates and uploads a text-based compliance or calculator report directly to Google Drive.
 */
export async function uploadReportToVault(
  accessToken: string,
  folderId: string,
  filename: string,
  content: string,
  mimeType: string = 'text/plain'
): Promise<DriveFile> {
  const metadata = {
    name: filename,
    parents: [folderId],
    mimeType: mimeType,
  };

  const fileContent = new Blob([content], { type: mimeType });
  const formData = new FormData();
  formData.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
  formData.append('file', fileContent);

  try {
    const res = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,mimeType,size,webViewLink,createdTime', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Report upload failed: ${errText}`);
    }

    return await res.json();
  } catch (error) {
    console.error('uploadReportToVault error:', error);
    throw error;
  }
}

/**
 * Deletes a file from Google Drive by its file ID.
 */
export async function deleteFileFromVault(accessToken: string, fileId: string): Promise<void> {
  try {
    const res = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Delete failed: ${errText}`);
    }
  } catch (error) {
    console.error('deleteFileFromVault error:', error);
    throw error;
  }
}
