import express from 'express';
import makeWASocket, { DisconnectReason, useMultiFileAuthState, delay } from '@whiskeysockets/baileys';
import qrcode from 'qrcode-terminal';
import P from 'pino';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY || 'your-secret-api-key-here';

// WhatsApp partner numbers for KP Investment
const PARTNER_NUMBERS = [
  '918469797169', // Kalp Shah
  '917041037428'  // Prasham Sanghvi
];

// Logger configuration
const logger = P({ level: 'silent' }); // Set to 'debug' for detailed logs

let sock = null;
let isConnected = false;
let qrCodeData = null;

// Initialize WhatsApp connection
async function connectToWhatsApp() {
  const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');
  
  sock = makeWASocket({
    auth: state,
    printQRInTerminal: true,
    logger,
    browser: ['KP Investment', 'Chrome', '111.0.0'],
  });

  // Handle connection updates
  sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect, qr } = update;
    
    if (qr) {
      console.log('\n🔐 QR Code Generated - Scan with WhatsApp:');
      qrcode.generate(qr, { small: true });
      qrCodeData = qr;
    }
    
    if (connection === 'close') {
      const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
      console.log('❌ Connection closed. Reconnecting...', shouldReconnect);
      isConnected = false;
      
      if (shouldReconnect) {
        await delay(5000);
        connectToWhatsApp();
      }
    } else if (connection === 'open') {
      console.log('✅ WhatsApp connected successfully!');
      isConnected = true;
      qrCodeData = null;
    }
  });

  // Save credentials when updated
  sock.ev.on('creds.update', saveCreds);
}

// Start WhatsApp connection
connectToWhatsApp();

// Middleware to verify API key
function verifyApiKey(req, res, next) {
  const apiKey = req.headers['x-api-key'];
  
  if (!apiKey || apiKey !== API_KEY) {
    return res.status(401).json({ 
      success: false, 
      error: 'Unauthorized - Invalid API Key' 
    });
  }
  
  next();
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    whatsapp_connected: isConnected,
    timestamp: new Date().toISOString()
  });
});

// Get QR code status
app.get('/qr-status', verifyApiKey, (req, res) => {
  res.json({
    connected: isConnected,
    qrCode: qrCodeData,
    message: isConnected 
      ? 'WhatsApp is connected' 
      : (qrCodeData ? 'Scan QR code to connect' : 'Initializing...')
  });
});

// Send WhatsApp message endpoint
app.post('/send-message', verifyApiKey, async (req, res) => {
  try {
    if (!isConnected || !sock) {
      return res.status(503).json({ 
        success: false, 
        error: 'WhatsApp not connected. Please scan QR code first.',
        qrCode: qrCodeData
      });
    }

    const { to, message } = req.body;

    if (!to || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields: to, message' 
      });
    }

    // Format phone number (ensure it has @s.whatsapp.net suffix)
    const formattedNumber = to.includes('@s.whatsapp.net') ? to : `${to}@s.whatsapp.net`;

    // Send message
    await sock.sendMessage(formattedNumber, { text: message });
    
    console.log(`✅ Message sent to ${to}`);
    
    res.json({ 
      success: true, 
      message: 'Message sent successfully',
      to: formattedNumber
    });

  } catch (error) {
    console.error('❌ Error sending message:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to send message: ' + error.message 
    });
  }
});

// Send inquiry notification to both partners
app.post('/send-inquiry-notification', verifyApiKey, async (req, res) => {
  try {
    if (!isConnected || !sock) {
      return res.status(503).json({ 
        success: false, 
        error: 'WhatsApp not connected. Please scan QR code first.',
        qrCode: qrCodeData
      });
    }

    const { name, email, phone, subject, message, inquiryId, timestamp } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields: name, email, subject, message' 
      });
    }

    // Format message for WhatsApp
    const whatsappMessage = 
      `🔔 *NEW INQUIRY - KP Investment*\n\n` +
      `👤 *Name:* ${name}\n` +
      `📧 *Email:* ${email}\n` +
      `📱 *Phone:* ${phone || 'Not provided'}\n` +
      `📋 *Subject:* ${subject}\n\n` +
      `💬 *Message:*\n${message}\n\n` +
      `🕐 *Time:* ${timestamp ? new Date(timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) : new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}\n` +
      `🆔 *ID:* ${inquiryId || 'N/A'}`;

    // Send to both partners
    const results = [];
    for (const partnerNumber of PARTNER_NUMBERS) {
      try {
        const formattedNumber = `${partnerNumber}@s.whatsapp.net`;
        await sock.sendMessage(formattedNumber, { text: whatsappMessage });
        results.push({ number: partnerNumber, success: true });
        console.log(`✅ Notification sent to ${partnerNumber}`);
        
        // Small delay between messages to avoid rate limiting
        await delay(1000);
      } catch (error) {
        console.error(`❌ Failed to send to ${partnerNumber}:`, error.message);
        results.push({ number: partnerNumber, success: false, error: error.message });
      }
    }

    const allSuccess = results.every(r => r.success);
    
    res.json({ 
      success: allSuccess,
      message: allSuccess 
        ? 'Notifications sent to all partners' 
        : 'Some notifications failed',
      results
    });

  } catch (error) {
    console.error('❌ Error sending inquiry notification:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to send notifications: ' + error.message 
    });
  }
});

// Logout endpoint
app.post('/logout', verifyApiKey, async (req, res) => {
  try {
    if (sock) {
      await sock.logout();
      isConnected = false;
      qrCodeData = null;
      console.log('✅ Logged out successfully');
      res.json({ success: true, message: 'Logged out successfully' });
    } else {
      res.json({ success: false, message: 'Not connected' });
    }
  } catch (error) {
    console.error('❌ Logout error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 KP Investment Baileys WhatsApp Server running on port ${PORT}`);
  console.log(`\n📋 Available endpoints:`);
  console.log(`   GET  /health - Health check`);
  console.log(`   GET  /qr-status - Get QR code status (requires API key)`);
  console.log(`   POST /send-message - Send WhatsApp message (requires API key)`);
  console.log(`   POST /send-inquiry-notification - Send inquiry to partners (requires API key)`);
  console.log(`   POST /logout - Logout from WhatsApp (requires API key)`);
  console.log(`\n🔑 API Key required in header: x-api-key: ${API_KEY}`);
  console.log(`\n⏳ Initializing WhatsApp connection...\n`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n👋 Shutting down gracefully...');
  if (sock) {
    await sock.end();
  }
  process.exit(0);
});
