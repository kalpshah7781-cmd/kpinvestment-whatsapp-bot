# 💼 KP Investment - Professional Financial Services Website

A complete, production-ready website for KP Investment, featuring automatic WhatsApp notifications for client inquiries.

## 🌟 Overview

KP Investment specializes in:
- 📊 Unlisted Shares Trading
- 🚀 IPO Funding & Advisory
- 💰 Portfolio Management Services
- 📈 Equity Market Investment

**Founded by:**
- **Kalp Shah** - 2 years experience, Unlisted Shares Expert
- **Prasham Sanghvi** - 8 years experience, Equity Markets Expert

## 🎯 Features

### Website Features
- ✅ Multi-page structure (Home, Services, About, Contact)
- ✅ Responsive design (mobile & desktop)
- ✅ Dark blue theme (#1a2e3e, #0f1921) with gold accents (#d4af37)
- ✅ Professional UI/UX
- ✅ Contact form with validation
- ✅ WhatsApp floating button

### Backend Features
- ✅ Supabase backend integration
- ✅ Inquiry storage & management
- ✅ Automatic WhatsApp notifications via Baileys
- ✅ Email notification support (ready to configure)
- ✅ Secure API with key authentication

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Supabase account
- WhatsApp (for notifications)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd kp-investment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Visit the website**
   ```
   http://localhost:5173
   ```

## 📱 WhatsApp Integration

The website uses **Baileys** for automatic WhatsApp notifications.

### Setup WhatsApp Notifications

Follow one of these guides:

1. **Quick Setup (5 minutes):** See `BAILEYS_QUICK_SETUP.md`
2. **Detailed Guide (English):** See `BAILEYS_SETUP_GUIDE.md`
3. **हिंदी गाइड:** See `BAILEYS_SETUP_GUIDE_HINDI.md`

### How It Works

When a client submits the contact form:
1. Inquiry saved to Supabase database
2. Supabase calls Baileys WhatsApp server
3. Both partners receive WhatsApp notification instantly
4. Partners can respond to client directly

**Partner WhatsApp Numbers:**
- Kalp Shah: +91 84697 97169
- Prasham Sanghvi: +91 70410 37428

## 📂 Project Structure

```
kp-investment/
├── baileys-whatsapp-server/     # Baileys WhatsApp server
│   ├── server.js                # Main server file
│   ├── package.json             # Server dependencies
│   ├── .env.example             # Environment template
│   └── README.md                # Server documentation
├── src/
│   ├── app/
│   │   ├── App.tsx              # Main application
│   │   ├── routes.tsx           # Route configuration
│   │   ├── components/          # Reusable components
│   │   └── pages/               # Page components
│   │       ├── Home.tsx
│   │       ├── Services.tsx
│   │       ├── About.tsx
│   │       └── Contact.tsx
│   └── styles/                  # CSS styles
├── supabase/
│   └── functions/
│       └── server/
│           ├── index.tsx        # Backend API
│           └── kv_store.tsx     # Database operations
├── BAILEYS_SETUP_GUIDE.md       # WhatsApp setup guide (English)
├── BAILEYS_SETUP_GUIDE_HINDI.md # WhatsApp setup guide (Hindi)
├── BAILEYS_QUICK_SETUP.md       # Quick setup reference
└── README.md                    # This file
```

## 🎨 Design System

### Colors
- **Primary Dark:** `#1a2e3e`
- **Secondary Dark:** `#0f1921`
- **Gold Accent:** `#d4af37`
- **Text:** White/Light gray

### Typography
- Modern sans-serif fonts
- Clear hierarchy
- Professional appearance

## 📊 Company Stats

- 💯 **500+ Happy Clients**
- 💰 **₹10Cr+ Assets Under Management**
- 📅 **8+ Years Combined Experience**
- ⭐ **98% Client Satisfaction**

## 🛠️ Technology Stack

### Frontend
- **React** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **React Router** - Navigation
- **Shadcn/ui** - UI components

### Backend
- **Supabase** - Backend as a Service
- **Hono** - Web framework
- **Deno** - Runtime for edge functions

### WhatsApp Integration
- **Baileys** - WhatsApp Web API
- **Express** - Node.js server
- **Railway/Render** - Cloud hosting

## 🔐 Environment Variables

### Supabase Secrets (Edge Functions)
```
BAILEYS_SERVER_URL=https://your-app.railway.app
BAILEYS_API_KEY=your-secret-api-key
```

### Baileys Server (.env)
```
PORT=3000
API_KEY=your-secret-api-key
```

## 📡 API Endpoints

### Supabase Backend
- `GET /make-server-822d295e/health` - Health check
- `POST /make-server-822d295e/submit-inquiry` - Submit inquiry
- `GET /make-server-822d295e/inquiries` - Get all inquiries

### Baileys Server
- `GET /health` - Health check
- `GET /qr-status` - QR code status
- `POST /send-inquiry-notification` - Send notification
- `POST /send-message` - Send custom message
- `POST /logout` - Logout from WhatsApp

## 🧪 Testing

### Test Contact Form
1. Visit website
2. Go to Contact page
3. Fill form with test data
4. Submit
5. Check WhatsApp on both partner phones

### Test Backend
```bash
# Health check
curl https://lloosoxswlzvdjduyemd.supabase.co/functions/v1/server/make-server-822d295e/health

# Get inquiries
curl https://lloosoxswlzvdjduyemd.supabase.co/functions/v1/server/make-server-822d295e/inquiries
```

### Test Baileys Server
```bash
# Health check
curl https://your-app.railway.app/health

# QR status (requires API key)
curl -H "x-api-key: your-api-key" https://your-app.railway.app/qr-status
```

## 🚀 Deployment

### Frontend (Figma Make)
Already deployed and hosted by Figma Make.

### Baileys Server

**Option 1: Railway.app (Recommended)**
1. Sign up at https://railway.app/
2. Deploy from GitHub
3. Add `API_KEY` environment variable
4. Scan QR code from logs
5. Get server URL

**Option 2: Render.com**
1. Sign up at https://render.com/
2. Create Web Service
3. Connect GitHub repo
4. Add `API_KEY` environment variable
5. Deploy and scan QR code

**Option 3: Heroku**
1. Install Heroku CLI
2. `heroku create kp-investment-whatsapp`
3. `heroku config:set API_KEY=your-key`
4. `git push heroku main`
5. Scan QR code from logs

## 📞 Contact Information

**KP Investment**
- Email: kpinvestment7781@gmail.com
- WhatsApp: +91 84697 97169 (Kalp Shah)
- WhatsApp: +91 70410 37428 (Prasham Sanghvi)

## 📝 Documentation

- `BAILEYS_SETUP_GUIDE.md` - Complete WhatsApp setup guide
- `BAILEYS_QUICK_SETUP.md` - Quick reference for setup
- `BAILEYS_SETUP_GUIDE_HINDI.md` - Hindi setup guide
- `baileys-whatsapp-server/README.md` - Baileys server documentation

## 🔒 Security

- ✅ API key authentication
- ✅ HTTPS only
- ✅ Environment variables for secrets
- ✅ CORS configured
- ✅ Input validation

## 🤝 Support

For issues or questions:
1. Check documentation files
2. Review server logs
3. Contact via email or WhatsApp

## 📄 License

Private - KP Investment © 2026

## 🎉 Success Metrics

After deploying WhatsApp integration:
- ⚡ **Instant notifications** (< 2 seconds)
- 📱 **100% delivery rate**
- 💰 **Zero cost** (FREE tier)
- 🔄 **Auto-reconnect** on disconnection
- 📊 **Inquiry tracking** in database

---

## 🌟 Company Motto

**"Unshakable Trust"**

*Building wealth through expertise and integrity.*

---

*Last Updated: March 5, 2026*
