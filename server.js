import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Enable CORS for frontend
app.use(cors());

// Serve static files from public/img
app.use('/img', express.static(path.join(__dirname, 'public/img')));

// Health check route
app.get('/', (req, res) => {
    res.send('Neural Fragment Upload Server Online');
});

// Configure storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.join(__dirname, 'public/img');
        // Ensure directory exists
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        // Sanitize filename and add timestamp to prevent collisions
        const cleanName = file.originalname.replace(/[^a-zA-Z0-9.]/g, '_');
        cb(null, `${Date.now()}_${cleanName}`);
    }
});

const upload = multer({ storage: storage });

// API Endpoint for file upload
app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    // Return the URL path that the frontend can use
    // Since we are serving 'public' via Vite (and this server in prod), 
    // the path should be relative to the web root.
    // If we save to 'public/img', the URL is '/img/filename'
    const fileUrl = `/img/${req.file.filename}`;

    res.json({
        success: true,
        message: 'File uploaded successfully',
        url: fileUrl
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Uploads target: ${path.join(__dirname, 'public/img')}`);
});
