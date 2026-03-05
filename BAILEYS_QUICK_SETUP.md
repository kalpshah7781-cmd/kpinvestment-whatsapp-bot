# ⚡ Baileys WhatsApp - Quick Setup (5 Minutes)

## 🎯 Goal

Get WhatsApp notifications working in 5 minutes!

---

## Step 1: Install & Run Locally (2 minutes)

```bash
# Navigate to folder
cd baileys-whatsapp-server

# Install
npm install

# Create environment file
cp .env.example .env

# Edit .env and set API_KEY (any random string)
# API_KEY=my-secret-key-12345

# Start
npm start
```

**Scan the QR code with WhatsApp → Connected!** ✅

---

## Step 2: Deploy to Railway (2 minutes)

1. Go to https://railway.app/ → Sign up
2. New Project → Deploy from GitHub repo
3. Select your repository
4. Add environment variable:
   - `API_KEY` = `my-secret-key-12345`
5. Deploy → Wait → View Logs → **Scan QR code**
6. Copy your Railway URL: `https://your-app.railway.app`

---

## Step 3: Connect to Supabase (1 minute)

1. Go to https://supabase.com/dashboard
2. Your Project → Edge Functions → Settings
3. Add two secrets:
   ```
   BAILEYS_SERVER_URL = https://your-app.railway.app
   BAILEYS_API_KEY = my-secret-key-12345
   ```
4. Redeploy the function

---

## Step 4: Test! ✅

1. Visit: `https://your-app.railway.app/health`
   - Should show: `"whatsapp_connected": true`

2. Submit a test form on your website

3. Check WhatsApp on both partner phones → **Message received!** 🎉

---

## 🆘 Quick Troubleshooting

| Problem       | Solution                           |
| ------------- | ---------------------------------- |
| No QR code    | Check Railway logs                 |
| Not connected | Scan QR code with WhatsApp         |
| No messages   | Check Supabase secrets are correct |
| Server error  | Restart Railway deployment         |

---

## 📋 Checklist

- [ ] Server running locally
- [ ] QR code scanned
- [ ] Deployed to Railway
- [ ] QR code scanned on Railway
- [ ] Supabase secrets added
- [ ] Test form submitted
- [ ] WhatsApp messages received

---

## 🎉 Done!

**You're all set! Every form submission now sends WhatsApp notifications to both partners automatically.**

For detailed guide, see: `BAILEYS_SETUP_GUIDE.md`

---

**Partner Numbers:**

- Kalp Shah: +91 84697 97169
- Prasham Sanghvi: +91 70410 37428

**Server URL Format:**

- ✅ Correct: `https://your-app.railway.app`
- ❌ Wrong: `https://your-app.railway.app/`

**API Key:**

- Same value in `.env` and Supabase secrets
- No spaces, no special characters
- Example: `kp-investment-secret-key-xyz123`

---

_KP Investment - Unshakable Trust_ 🚀