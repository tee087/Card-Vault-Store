require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const multer = require('multer');
const helmet = require('helmet');
const FormData = require('form-data');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || '*',
  methods: ['POST', 'GET'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json({ limit: '10mb' }));

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_ADMIN_ID = process.env.TELEGRAM_ADMIN_ID;

if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_ADMIN_ID) {
  console.error('FATAL: TELEGRAM_BOT_TOKEN and TELEGRAM_ADMIN_ID must be set');
  process.exit(1);
}

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

// In-memory order decisions (orderId -> {status, deliveryMethod, deliveryInfo, timestamp, admin})
const orderDecisions = new Map();

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'cardvault-telegram-backend' });
});

// Root route
app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'cardvault-telegram-backend', endpoints: ['POST /notify/text', 'POST /notify/photo', 'GET /order-status/:orderId', 'GET /health'] });
});

// Check order approval status (frontend polls this)
app.get('/order-status/:orderId', (req, res) => {
  const decision = orderDecisions.get(req.params.orderId);
  if (decision) {
    res.json(decision);
  } else {
    res.status(200).json({ status: 'pending' });
  }
});

// Send text notification
app.post('/notify/text', async (req, res) => {
  try {
    const { text, parse_mode = 'Markdown' } = req.body;
    if (!text) return res.status(400).json({ error: 'text is required' });

    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: String(TELEGRAM_ADMIN_ID),
          text,
          parse_mode
        })
      }
    );
    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Telegram API error', details: data });
    }
    res.json({ ok: true, result: data.result });
  } catch (error) {
    console.error('Text notification error:', error);
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
});

// Send photo notification (payment proof) with Approve/Reject inline buttons
app.post('/notify/photo', upload.single('photo'), async (req, res) => {
  try {
    const { caption, order_id, delivery_method, delivery_info } = req.body;

    if (!req.file) return res.status(400).json({ error: 'photo file is required' });

    const formData = new FormData();
    formData.append('chat_id', String(TELEGRAM_ADMIN_ID));
    formData.append('photo', req.file.buffer, {
      filename: req.file.originalname || 'payment-proof.jpg',
      contentType: req.file.mimetype || 'image/jpeg'
    });
    formData.append('caption', caption || '');
    formData.append('parse_mode', 'Markdown');

    // Inline keyboard with Approve/Reject buttons
    if (order_id) {
      formData.append('reply_markup', JSON.stringify({
        inline_keyboard: [[
          { text: '✅ Approve', callback_data: `approve:${order_id}` },
          { text: '❌ Reject', callback_data: `reject:${order_id}` }
        ]]
      }));
    }

    // Store pending decision with delivery info
    if (order_id) {
      orderDecisions.set(order_id, {
        status: 'pending',
        delivery_method: delivery_method || '',
        delivery_info: delivery_info || '',
        timestamp: new Date().toISOString()
      });
    }

    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`,
      {
        method: 'POST',
        body: formData,
        headers: formData.getHeaders()
      }
    );
    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Telegram API error', details: data });
    }
    res.json({ ok: true, result: data.result });
  } catch (error) {
    console.error('Photo notification error:', error);
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
});

// Long-poll Telegram for callback queries (Approve/Reject button clicks)
async function pollTelegramUpdates() {
  let offset = 0;
  console.log('Starting Telegram long-poll for callback queries...');

  while (true) {
    try {
      const response = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates?offset=${offset}&timeout=30&limit=100`
      );
      const data = await response.json();

      if (data.ok && Array.isArray(data.result)) {
        for (const update of data.result) {
          offset = update.update_id + 1;

          if (update.callback_query) {
            const cq = update.callback_query;
            const callbackData = cq.data || '';
            const parts = callbackData.split(':');
            const action = parts[0]; // 'approve' or 'reject'
            const orderId = parts.slice(1).join(':');

            if ((action === 'approve' || action === 'reject') && orderId) {
              const existing = orderDecisions.get(orderId) || {};
              orderDecisions.set(orderId, {
                status: action,
                delivery_method: existing.delivery_method || '',
                delivery_info: existing.delivery_info || '',
                timestamp: new Date().toISOString(),
                admin: cq.from.username || cq.from.first_name || 'admin'
              });

              // Answer the callback query so the button stops spinning
              await fetch(
                `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/answerCallbackQuery`,
                {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    callback_query_id: cq.id,
                    text: `Order ${orderId} ${action === 'approve' ? '✅ APPROVED SUCCESSFULLY' : '❌ REJECTED SUCCESSFULLY'}`
                  })
                }
              );

              // Confirm decision to admin chat with delivery info
              const decisionText =
                `*Payment Decision*\n\n` +
                `🔖 *Order ID:* ${orderId}\n` +
                `⚡ *Status:* ${action === 'approve' ? '✅ APPROVED' : '❌ REJECTED'}\n` +
                `👤 *Admin:* ${cq.from.username || cq.from.first_name || 'admin'}\n` +
                `📬 *Delivery Method:* ${existing.delivery_method || 'N/A'}\n` +
                `📧 *Delivery To:* ${existing.delivery_info || 'N/A'}\n` +
                `⏰ *Time:* ${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}`;

              await fetch(
                `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
                {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    chat_id: String(TELEGRAM_ADMIN_ID),
                    text: decisionText,
                    parse_mode: 'Markdown'
                  })
                }
              );

              console.log(`Order ${orderId} ${action} by ${cq.from.username || cq.from.first_name}`);
            }
          }
        }
      }
    } catch (err) {
      console.error('Telegram poll error:', err.message);
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
}

// Start polling (non-blocking)
pollTelegramUpdates().catch((err) => console.error('Poll fatal:', err));

app.listen(PORT, () => {
  console.log(`Card Vault Telegram Backend running on port ${PORT}`);
});
