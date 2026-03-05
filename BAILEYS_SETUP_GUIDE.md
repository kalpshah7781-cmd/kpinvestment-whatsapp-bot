# 🚀 KP Investment - Baileys WhatsApp Integration Setup Guide

Complete guide to set up automatic WhatsApp notifications using Baileys for your KP Investment website.

## 📋 Overview

When a client submits the contact form on your website, both Kalp Shah and Prasham Sanghvi will automatically receive a WhatsApp notification with the inquiry details.

**Partner Numbers:**
- Kalp Shah: +91 84697 97169
- Prasham Sanghvi: +91 70410 37428

## 🎯 What You'll Set Up

1. **Baileys WhatsApp Server** - A Node.js server that connects to WhatsApp
2. **Deploy to Cloud** - Host the server (FREE options available)
3. **Connect to Supabase** - Link the server to your website backend

---

## 📦 Part 1: Set Up Baileys Server Locally

### Step 1: Open the Baileys Server Folder

The server code is in the `baileys-whatsapp-server` folder of your project.

### Step 2: Install Node.js

If you don't have Node.js installed:
- Download from: https://nodejs.org/
- Install version 18 or higher
- Verify installation: Open terminal and run `node --version`

### Step 3: Install Dependencies

Open terminal in the `baileys-whatsapp-server` folder and run:

```bash
npm install
```

### Step 4: Configure API Key

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` file and create a strong API key:
   ```
   PORT=3000
   API_KEY=kp-investment-secret-key-xyz123abc
   ```
   
   💡 **Tip:** Use a random string generator: https://www.random.org/strings/

### Step 5: Start the Server

```bash
npm start
```

### Step 6: Scan QR Code with WhatsApp

1. A QR code will appear in the terminal
2. Open WhatsApp on your phone (Kalp or Prasham's phone)
3. Go to: **Settings → Linked Devices → Link a Device**
4. Scan the QR code from the terminal
5. ✅ Success! You'll see "WhatsApp connected successfully!"

**Important:** Keep this WhatsApp connection active. Don't logout from the linked device.

### Step 7: Test the Server

Open a new terminal and test:

```bash
# Health check
curl http://localhost:3000/health

# Should return: {"status":"ok","whatsapp_connected":true}
```

---

## 🌐 Part 2: Deploy to Cloud (Recommended: Railway.app)

You can't keep your laptop running 24/7, so deploy the server to the cloud (FREE!).

### Option A: Railway.app (Easiest - Recommended)

1. **Create Railway Account**
   - Go to: https://railway.app/
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Connect your GitHub account
   - Select your repository

3. **Configure the Server**
   - Railway will auto-detect Node.js
   - Add environment variable:
     - Key: `API_KEY`
     - Value: `kp-investment-secret-key-xyz123abc` (same as your .env)

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete

5. **Scan QR Code**
   - Click "View Logs" in Railway dashboard
   - Look for the QR code in logs
   - Scan it with WhatsApp (same process as before)
   - Wait for "WhatsApp connected successfully!" message

6. **Get Your Server URL**
   - In Railway, go to Settings → Domains
   - Click "Generate Domain"
   - Copy the URL (e.g., `https://your-app.railway.app`)
   - **Save this URL** - you'll need it for Supabase!

### Option B: Render.com (Alternative FREE option)

1. Go to: https://render.com/
2. Sign up with GitHub
3. Click "New" → "Web Service"
4. Connect your repository
5. Configure:
   - **Name:** kp-investment-whatsapp
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
6. Add environment variable: `API_KEY`
7. Deploy
8. View logs and scan QR code
9. Copy your Render URL (e.g., `https://your-app.onrender.com`)

### Option C: Other Platforms

- **Heroku:** https://heroku.com/
- **Google Cloud Run:** https://cloud.google.com/run
- **Your own VPS:** Use PM2 for process management

---

## 🔗 Part 3: Connect to Supabase

Now connect your deployed Baileys server to your website's backend.

### Step 1: Get Your Server Details

From Part 2, you should have:
- **Server URL:** `https://your-app.railway.app` (or your Render URL)
- **API Key:** `kp-investment-secret-key-xyz123abc` (from your .env)

### Step 2: Add Secrets to Supabase

1. **Open Supabase Dashboard**
   - Go to: https://supabase.com/dashboard
   - Select your KP Investment project

2. **Navigate to Edge Functions Settings**
   - Click "Edge Functions" in the sidebar
   - Click on your function (server)
   - Click "Settings" or "Secrets"

3. **Add These Two Secrets:**

   **Secret 1:**
   ```
   Name: BAILEYS_SERVER_URL
   Value: https://your-app.railway.app
   ```
   ⚠️ **Remove trailing slash!** Use `https://your-app.railway.app` not `https://your-app.railway.app/`

   **Secret 2:**
   ```
   Name: BAILEYS_API_KEY
   Value: kp-investment-secret-key-xyz123abc
   ```

4. **Save the Secrets**

### Step 3: Redeploy Supabase Function

After adding secrets, you need to redeploy:

1. In Supabase Dashboard → Edge Functions
2. Find your function
3. Click "Redeploy" or "Deploy"
4. Wait for deployment to complete

---

## ✅ Part 4: Test Everything

### Test 1: Check Server Health

Open your browser and visit:
```
https://your-app.railway.app/health
```

Expected response:
```json
{
  "status": "ok",
  "whatsapp_connected": true,
  "timestamp": "2026-03-05T10:30:00.000Z"
}
```

### Test 2: Submit Contact Form

1. Go to your KP Investment website
2. Navigate to the Contact page
3. Fill out the form with test data:
   - Name: Test User
   - Email: test@example.com
   - Phone: 9876543210
   - Subject: Test Inquiry
   - Message: This is a test message

4. Submit the form

### Test 3: Check WhatsApp

**Both Kalp Shah and Prasham Sanghvi should receive a WhatsApp message like this:**

```
🔔 NEW INQUIRY - KP Investment

👤 Name: Test User
📧 Email: test@example.com
📱 Phone: 9876543210
📋 Subject: Test Inquiry

💬 Message:
This is a test message

🕐 Time: 05/03/2026, 4:00:00 PM
🆔 ID: inquiry-1709640000000-xyz123
```

### Test 4: Check Logs

**Railway/Render Logs:**
1. Open your Railway/Render dashboard
2. View logs
3. Look for: `✅ Notification sent to 918469797169`
4. Look for: `✅ Notification sent to 917041037428`

**Supabase Logs:**
1. Open Supabase Dashboard → Edge Functions
2. View logs for your function
3. Look for: `✅ WhatsApp notifications sent successfully via Baileys`

---

## 🔧 Troubleshooting

### Issue: "WhatsApp not connected"

**Solution:**
1. Check Railway/Render logs
2. Look for QR code in logs
3. Scan QR code with WhatsApp again
4. Ensure WhatsApp is not logged out on the phone

### Issue: "No QR code showing in logs"

**Solution:**
1. Delete the `auth_info_baileys` folder from the server
2. Redeploy
3. Fresh QR code will appear

### Issue: "Connection keeps dropping"

**Solution:**
- This is normal behavior - server auto-reconnects
- Check internet connection on phone
- Keep WhatsApp app updated
- Don't logout from linked device

### Issue: "Messages not being sent"

**Solution:**
1. Check server is running: Visit `/health` endpoint
2. Verify WhatsApp connected: `whatsapp_connected: true`
3. Check Supabase secrets are correct:
   - `BAILEYS_SERVER_URL` - no trailing slash
   - `BAILEYS_API_KEY` - matches your server's API key
4. Check phone numbers in server code are correct

### Issue: "API Key Invalid"

**Solution:**
1. Ensure API key in Supabase matches server .env
2. No extra spaces in the API key
3. Redeploy Supabase function after updating secrets

### Issue: "Server not responding"

**Solution:**
1. Check Railway/Render dashboard - is server running?
2. Check server logs for errors
3. Restart the server
4. Verify environment variables are set

---

## 🔐 Security Best Practices

1. **Never Share API Key:** Keep your API key secret
2. **Use Strong API Key:** 20+ random characters
3. **Keep WhatsApp Logged In:** Don't logout from linked device
4. **Monitor Logs:** Regularly check for suspicious activity
5. **Update Dependencies:** Run `npm update` monthly

---

## 📱 Managing WhatsApp Connection

### Reconnecting After Logout

If WhatsApp gets disconnected:

1. **Railway/Render:**
   - View logs
   - Look for new QR code
   - Scan with WhatsApp

2. **Local Server:**
   - Stop server (Ctrl+C)
   - Delete `auth_info_baileys` folder
   - Restart: `npm start`
   - Scan new QR code

### Switching Phones

To use a different phone number:

1. Logout from current WhatsApp session
2. Restart server
3. Scan QR code with new phone
4. Done!

---

## 💰 Cost Breakdown

| Service | Cost | Notes |
|---------|------|-------|
| Railway.app | FREE | $5/month for more resources (optional) |
| Render.com | FREE | Free tier sufficient for this use case |
| WhatsApp via Baileys | FREE | No API charges, unlimited messages |
| Supabase | FREE | Your existing plan |

**Total Monthly Cost: ₹0** (FREE!)

---

## 🎯 Next Steps

1. ✅ Set up Baileys server locally
2. ✅ Deploy to Railway/Render
3. ✅ Scan QR code with WhatsApp
4. ✅ Add secrets to Supabase
5. ✅ Test the integration
6. ✅ Monitor for first real inquiry!

---

## 📞 Support

If you encounter any issues:

1. **Check Logs:** 90% of issues are visible in logs
2. **Retry QR Scan:** Most connection issues fixed by rescanning
3. **Restart Server:** Simple restart solves many problems

**Contact:**
- Email: kpinvestment7781@gmail.com
- WhatsApp: +91 84697 97169 (Kalp Shah)

---

## 📝 Summary

### What Happens When Someone Submits the Form:

1. **User fills contact form** on KP Investment website
2. **Form submitted** to Supabase backend
3. **Supabase calls** Baileys server API
4. **Baileys server sends** WhatsApp messages to both partners
5. **Kalp & Prasham receive** instant notifications
6. **Partners can respond** directly to the client

**All automatic. All FREE. All instant!** ⚡

---

## 🎉 Congratulations!

You now have a professional, automatic WhatsApp notification system for your KP Investment website!

Every inquiry is instantly delivered to both partners via WhatsApp. No more missed opportunities. No delays. Just instant notifications! 🚀

**Happy Investing! 📈**

---

*Last Updated: March 5, 2026*
*KP Investment - Unshakable Trust*
