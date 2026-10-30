require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const multer = require('multer');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || '*',
  methods: ['POST', 'GET'],
  allowedHeaders: ['Content-Type', 'X-Secret-Key']
}));
app.use(express.json({ limit: '10mb' }));

// Telegram config from environment variables (SECRET - never exposed to browser)
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_ADMIN_ID = process.env.TELEGRAM_ADMIN_ID;

if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_ADMIN_ID) {
  console.error('FATAL: TELEGRAM_BOT_TOKEN and TELEGRAM_ADMIN_ID must be set in environment variables');
  process.exit(1);
}

// Multer for photo uploads (in-memory, then stream to Telegram)
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'cardvault-telegram-backend' });
});

// Send text notification
app.post('/notify/text', async (req, res) => {
  try {
    const { text, parse_mode = 'Markdown' } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'text is required' });
    }

    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: String(TELEGRAM_ADMIN_ID),
          text,
          parse_mode,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('Telegram API error:', data);
      return res.status(response.status).json({ error: 'Telegram API error', details: data });
    }

    res.json({ ok: true, result: data.result });
  } catch (error) {
    console.error('Text notification error:', error);
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
});

// Send photo notification (payment proof)
app.post('/notify/photo', upload.single('photo'), async (req, res) => {
  try {
    const { caption, parse_mode = 'Markdown' } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'photo file is required' });
    }

    // Build multipart form data to forward to Telegram
    const formData = new (require('form-data'))();
    formData.append('chat_id', String(TELEGRAM_ADMIN_ID));
    formData.append('photo', req.file.buffer, {
      filename: req.file.originalname || 'payment-proof.jpg',
      contentType: req.file.mimetype || 'image/jpeg',
    });
    formData.append('caption', caption || '');
    formData.append('parse_mode', parse_mode);

    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`,
      {
        method: 'POST',
        body: formData,
        headers: formData.getHeaders(),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('Telegram API error:', data);
      return res.status(response.status).json({ error: 'Telegram API error', details: data });
    }

    res.json({ ok: true, result: data.result });
  } catch (error) {
    console.error('Photo notification error:', error);
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
});

// Send generic notification (flexible)
app.post('/notify', async (req, res) => {
  try {
    const { type, ...payload } = req.body;

    if (type === 'photo') {
      // For photo, we need multipart - redirect to /notify/photo
      return res.status(400).json({ error: 'Use /notify/photo for photo uploads' });
    }

    // Default to text message
    const text = payload.text || JSON.stringify(payload);

    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: String(TELEGRAM_ADMIN_ID),
          text,
          parse_mode: 'Markdown',
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('Telegram API error:', data);
      return res.status(response.status).json({ error: 'Telegram API error', details: data });
    }

    res.json({ ok: true, result: data.result });
  } catch (error) {
    console.error('Notification error:', error);
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Card Vault Telegram Backend running on port ${PORT}`);
});
