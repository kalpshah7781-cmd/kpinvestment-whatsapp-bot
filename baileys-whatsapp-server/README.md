# KP Investment - Baileys WhatsApp Server

This is a standalone Node.js server using Baileys library to send WhatsApp notifications for KP Investment contact form inquiries.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- A phone with WhatsApp installed
- Internet connection

### Installation

1. **Navigate to the server directory:**
   ```bash
   cd baileys-whatsapp-server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and set a strong API key:
   ```
   PORT=3000
   API_KEY=your-very-secret-random-api-key-12345
   ```

4. **Start the server:**
   ```bash
   npm start
   ```

5. **Scan QR Code:**
   - A QR code will appear in the terminal
   - Open WhatsApp on your phone
   - Go to Settings → Linked Devices → Link a Device
   - Scan the QR code shown in terminal
   - ✅ Connected! The server is now ready to send messages

## 📡 API Endpoints

All endpoints (except `/health`) require the API key in the header:
```
x-api-key: your-api-key-here
```

### 1. Health Check
```bash
GET /health

# Response:
{
  "status": "ok",
  "whatsapp_connected": true,
  "timestamp": "2026-03-05T10:30:00.000Z"
}
```

### 2. QR Status (Check connection)
```bash
GET /qr-status
Header: x-api-key: your-api-key

# Response when connected:
{
  "connected": true,
  "qrCode": null,
  "message": "WhatsApp is connected"
}
```

### 3. Send Inquiry Notification
```bash
POST /send-inquiry-notification
Header: x-api-key: your-api-key
Content-Type: application/json

Body:
{
  "name": "Rajesh Kumar",
  "email": "rajesh@example.com",
  "phone": "9876543210",
  "subject": "IPO Investment Query",
  "message": "I want to know about upcoming IPOs",
  "inquiryId": "inquiry-1234567890",
  "timestamp": "2026-03-05T10:30:00.000Z"
}

# Response:
{
  "success": true,
  "message": "Notifications sent to all partners",
  "results": [
    { "number": "918469797169", "success": true },
    { "number": "917041037428", "success": true }
  ]
}
```

### 4. Send Custom Message
```bash
POST /send-message
Header: x-api-key: your-api-key
Content-Type: application/json

Body:
{
  "to": "918469797169",
  "message": "Hello from KP Investment!"
}

# Response:
{
  "success": true,
  "message": "Message sent successfully",
  "to": "918469797169@s.whatsapp.net"
}
```

## 🌐 Deployment Options

### Option 1: Railway.app (Recommended - FREE)

1. Create account at https://railway.app
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Add environment variables:
   - `API_KEY`: your-secret-api-key
5. Deploy! Railway will auto-detect Node.js
6. After deployment, open the Railway dashboard logs
7. **Scan the QR code** from the logs using WhatsApp
8. Get your server URL (e.g., `https://your-app.railway.app`)

### Option 2: Render.com (FREE)

1. Create account at https://render.com
2. New → Web Service
3. Connect your GitHub repository
4. Configure:
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Add environment variable: `API_KEY`
6. Deploy and scan QR from logs
7. Get your URL (e.g., `https://your-app.onrender.com`)

### Option 3: Local Server (Development)

If deploying locally or on your own VPS:
```bash
npm start
```

Keep the terminal open and ensure the server stays running. Use a process manager like PM2 for production:
```bash
npm install -g pm2
pm2 start server.js --name kp-whatsapp
pm2 save
pm2 startup
```

### Option 4: Heroku

1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create kp-investment-whatsapp`
4. Set environment: `heroku config:set API_KEY=your-api-key`
5. Deploy: `git push heroku main`
6. View logs: `heroku logs --tail`
7. Scan QR code from logs

## 🔐 Security Notes

1. **Keep API_KEY Secret:** Never commit the actual API key to GitHub
2. **Use HTTPS:** All deployed platforms provide HTTPS by default
3. **Firewall:** Consider IP whitelisting for production
4. **Session Storage:** The `auth_info_baileys/` folder contains your WhatsApp session - keep it secure

## 🔧 Troubleshooting

### QR Code Not Appearing
- Ensure WhatsApp is not already logged in on another device
- Delete `auth_info_baileys/` folder and restart

### Connection Keeps Dropping
- This is normal - the server auto-reconnects
- Check your internet connection
- Ensure WhatsApp app is updated

### Messages Not Sending
- Verify the server is connected (check `/health` endpoint)
- Ensure phone numbers are in correct format (918469797169)
- Check API key is correct

### Port Already in Use
- Change PORT in `.env` file to another value (e.g., 3001)

## 📱 Partner Numbers

The server is pre-configured to send notifications to:
- **Kalp Shah:** +91 84697 97169
- **Prasham Sanghvi:** +91 70410 37428

To modify these, edit the `PARTNER_NUMBERS` array in `server.js`.

## 📞 Support

For issues or questions:
- Email: kpinvestment7781@gmail.com
- WhatsApp: +91 84697 97169

## 📄 License

Private - KP Investment © 2026
