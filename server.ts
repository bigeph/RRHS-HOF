import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { exec } from 'child_process';
import AdmZip from 'adm-zip';
import bodyParser from 'body-parser';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(bodyParser.json({ limit: '50mb' }));

  // API: Save content to the permanent data file
  app.post('/api/save-content', (req, res) => {
    try {
      const content = req.body;
      const filePath = path.join(process.cwd(), 'src', 'data', 'content.json');
      
      fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf8');
      console.log('Content saved to src/data/content.json');
      res.json({ success: true, message: 'Content saved to permanent storage.' });
    } catch (error) {
      console.error('Failed to save content:', error);
      res.status(500).json({ success: false, error: 'Failed to save content to disk.' });
    }
  });

  // API: Trigger a build
  app.post('/api/build', (req, res) => {
    console.log('Starting build process...');
    exec('npm run build', (error, stdout, stderr) => {
      if (error) {
        console.error(`Build error: ${error.message}`);
        return res.status(500).json({ success: false, error: error.message });
      }
      console.log('Build completed successfully.');
      res.json({ success: true, message: 'Build completed successfully.' });
    });
  });

  // API: Download the build as a ZIP
  app.get('/api/download-zip', (req, res) => {
    try {
      const distPath = path.join(process.cwd(), 'dist');
      
      if (!fs.existsSync(distPath)) {
        return res.status(404).json({ error: 'Build folder (dist) not found. Please run build first.' });
      }

      const zip = new AdmZip();
      zip.addLocalFolder(distPath);
      
      const zipBuffer = zip.toBuffer();
      
      res.set('Content-Type', 'application/zip');
      res.set('Content-Disposition', 'attachment; filename=rrhs-hall-of-fame-build.zip');
      res.send(zipBuffer);
    } catch (error) {
      console.error('Failed to generate ZIP:', error);
      res.status(500).json({ error: 'Failed to generate ZIP file.' });
    }
  });

  // Vite middleware for development
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
