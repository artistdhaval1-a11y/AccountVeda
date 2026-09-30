import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Ensure custom_assets folder exists and serve it statically
  const customAssetsDir = path.join(process.cwd(), 'custom_assets');
  if (!fs.existsSync(customAssetsDir)) {
    fs.mkdirSync(customAssetsDir, { recursive: true });
  }
  app.use('/custom_assets', express.static(customAssetsDir));

  // Create backup copies of default assets if they do not exist yet
  const imagesDir = path.join(process.cwd(), 'src/assets/images');
  if (fs.existsSync(imagesDir)) {
    const backupFiles = [
      { src: 'accountveda_logo.svg', dest: 'default_logo.svg' },
      { src: 'founder_chaitali_1782221629255.jpg', dest: 'default_chaitali.jpg' },
      { src: 'founder_dhaval_1782221644891.jpg', dest: 'default_dhaval.jpg' }
    ];

    backupFiles.forEach(file => {
      const srcPath = path.join(imagesDir, file.src);
      const destPath = path.join(imagesDir, file.dest);
      if (fs.existsSync(srcPath) && !fs.existsSync(destPath)) {
        try {
          fs.copyFileSync(srcPath, destPath);
          console.log(`Created backup of default asset: ${file.dest}`);
        } catch (err) {
          console.error(`Failed to create backup of ${file.src}:`, err);
        }
      }
    });
  }

  // Increase payload limit for base64 image uploads
  app.use(express.json({ limit: '15mb' }));

  // API endpoint to retrieve whether custom assets exist
  app.get('/api/custom-assets-status', (req, res) => {
    try {
      const status = {
        logo: fs.existsSync(path.join(customAssetsDir, 'logo.svg')),
        chaitali: fs.existsSync(path.join(customAssetsDir, 'chaitali.jpg')),
        dhaval: fs.existsSync(path.join(customAssetsDir, 'dhaval.jpg'))
      };
      return res.json(status);
    } catch (error: any) {
      console.error('Error getting asset status:', error);
      return res.status(500).json({ error: error.message || 'Internal server error' });
    }
  });

  // API endpoint to save uploaded assets directly into the workspace filesystem
  app.post('/api/save-assets', (req, res) => {
    try {
      const { id, dataUrl } = req.body;
      if (!id || !dataUrl) {
        return res.status(400).json({ error: 'Missing id or dataUrl' });
      }

      // Ensure dataUrl is a valid base64 image
      const matches = dataUrl.match(/^data:(image\/[a-z0-9-+.]+);base64,(.*)$/);
      if (!matches) {
        return res.status(400).json({ error: 'Invalid data URL format' });
      }

      const mimeType = matches[1];
      const base64Data = matches[2];
      const buffer = Buffer.from(base64Data, 'base64');

      let targetPath = '';
      let customPath = '';

      if (id === 'chaitali') {
        targetPath = path.join(process.cwd(), 'src/assets/images/founder_chaitali_1782221629255.jpg');
        customPath = path.join(customAssetsDir, 'chaitali.jpg');
        fs.writeFileSync(targetPath, buffer);
        fs.writeFileSync(customPath, buffer);
        console.log(`Successfully updated founder Chaitali's photo at ${targetPath} and ${customPath}`);
      } else if (id === 'dhaval') {
        targetPath = path.join(process.cwd(), 'src/assets/images/founder_dhaval_1782221644891.jpg');
        customPath = path.join(customAssetsDir, 'dhaval.jpg');
        fs.writeFileSync(targetPath, buffer);
        fs.writeFileSync(customPath, buffer);
        console.log(`Successfully updated founder Dhaval's photo at ${targetPath} and ${customPath}`);
      } else if (id === 'logo') {
        targetPath = path.join(process.cwd(), 'src/assets/images/accountveda_logo.svg');
        customPath = path.join(customAssetsDir, 'logo.svg');
        
        // If the uploaded logo is already an SVG, write it directly
        if (mimeType.includes('svg')) {
          fs.writeFileSync(targetPath, buffer);
          fs.writeFileSync(customPath, buffer);
        } else {
          // Wrap PNG/JPG/WebP in a clean, responsive SVG using the data URL so references do not break
          const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <image href="${dataUrl}" x="0" y="0" width="500" height="500" />
</svg>`;
          fs.writeFileSync(targetPath, svgContent, 'utf8');
          fs.writeFileSync(customPath, svgContent, 'utf8');
        }
        console.log(`Successfully updated brand logo at ${targetPath} and ${customPath}`);
      } else {
        return res.status(400).json({ error: 'Invalid asset ID' });
      }

      return res.json({ success: true, path: targetPath, customPath });
    } catch (error: any) {
      console.error('Error saving asset:', error);
      return res.status(500).json({ error: error.message || 'Internal server error' });
    }
  });

  // API endpoint to reset custom assets back to system defaults
  app.post('/api/reset-asset', (req, res) => {
    try {
      const { id } = req.body;
      if (!id) {
        return res.status(400).json({ error: 'Missing id' });
      }

      const imagesDir = path.join(process.cwd(), 'src/assets/images');
      let targetPath = '';
      let backupPath = '';
      let customPath = '';

      if (id === 'chaitali') {
        targetPath = path.join(imagesDir, 'founder_chaitali_1782221629255.jpg');
        backupPath = path.join(imagesDir, 'default_chaitali.jpg');
        customPath = path.join(customAssetsDir, 'chaitali.jpg');
      } else if (id === 'dhaval') {
        targetPath = path.join(imagesDir, 'founder_dhaval_1782221644891.jpg');
        backupPath = path.join(imagesDir, 'default_dhaval.jpg');
        customPath = path.join(customAssetsDir, 'dhaval.jpg');
      } else if (id === 'logo') {
        targetPath = path.join(imagesDir, 'accountveda_logo.svg');
        backupPath = path.join(imagesDir, 'default_logo.svg');
        customPath = path.join(customAssetsDir, 'logo.svg');
      } else {
        return res.status(400).json({ error: 'Invalid asset ID' });
      }

      // Delete custom asset if it exists
      if (fs.existsSync(customPath)) {
        fs.unlinkSync(customPath);
      }

      // Restore from backup
      if (fs.existsSync(backupPath)) {
        fs.copyFileSync(backupPath, targetPath);
        console.log(`Successfully restored default asset for ${id}`);
      }

      return res.json({ success: true });
    } catch (error: any) {
      console.error('Error resetting asset:', error);
      return res.status(500).json({ error: error.message || 'Internal server error' });
    }
  });

  // API endpoint to save testimonials
  app.post('/api/save-testimonials', (req, res) => {
    try {
      const testimonials = req.body;
      if (!Array.isArray(testimonials)) {
        return res.status(400).json({ error: 'Body must be a JSON array of testimonials' });
      }

      const targetPath = path.join(process.cwd(), 'src/testimonials.json');
      fs.writeFileSync(targetPath, JSON.stringify(testimonials, null, 2), 'utf8');
      console.log(`Successfully updated testimonials at ${targetPath}`);

      return res.json({ success: true, path: targetPath });
    } catch (error: any) {
      console.error('Error saving testimonials:', error);
      return res.status(500).json({ error: error.message || 'Internal server error' });
    }
  });

  app.get('/api/knowledge-files', async (_req, res) => {
    try {
      const folderId = process.env.KNOWLEDGE_DRIVE_FOLDER_ID;
      const apiKey = process.env.GOOGLE_DRIVE_API_KEY;
      if (!folderId || !apiKey) return res.json({ configured: false, files: [] });
      const query = encodeURIComponent("'" + folderId + "' in parents and trashed = false");
      const fields = encodeURIComponent('files(id,name,mimeType,size,createdTime,modifiedTime,description)');
      const url = 'https://www.googleapis.com/drive/v3/files?q=' + query + '&fields=' + fields + '&orderBy=modifiedTime desc&key=' + encodeURIComponent(apiKey);
      const response = await fetch(url);
      if (!response.ok) return res.status(502).json({ configured: true, files: [], error: await response.text() });
      const data = await response.json();
      const files = (data.files || []).map((file: any) => ({
        id: file.id, name: file.name, mimeType: file.mimeType, size: file.size,
        createdTime: file.createdTime, modifiedTime: file.modifiedTime, description: file.description,
        viewUrl: 'https://drive.google.com/file/d/' + file.id + '/view',
      }));
      return res.json({ configured: true, files });
    } catch (error: any) {
      return res.status(500).json({ configured: true, files: [], error: error.message || 'Internal server error' });
    }
  });

  // Serve Vite in development, static files in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
