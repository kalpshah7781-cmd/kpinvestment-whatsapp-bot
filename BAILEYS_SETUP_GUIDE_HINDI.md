# 🚀 KP Investment - Baileys WhatsApp Integration सेटअप गाइड (हिंदी)

आपकी KP Investment वेबसाइट के लिए Baileys का उपयोग करके automatic WhatsApp notifications सेट करने की पूरी गाइड।

## 📋 Overview

जब भी कोई client आपकी वेबसाइट पर contact form भरेगा, Kalp Shah और Prasham Sanghvi दोनों को automatically WhatsApp पर inquiry की details मिल जाएगी।

**Partner Numbers:**
- Kalp Shah: +91 84697 97169
- Prasham Sanghvi: +91 70410 37428

---

## 📦 भाग 1: Baileys Server को Locally सेट करें

### स्टेप 1: Baileys Server Folder खोलें

आपके project में `baileys-whatsapp-server` folder में server code है।

### स्टेप 2: Node.js Install करें

अगर Node.js installed नहीं है:
- Download करें: https://nodejs.org/
- Version 18 या उससे ऊपर install करें
- Check करें: Terminal में `node --version` चलाएं

### स्टेप 3: Dependencies Install करें

`baileys-whatsapp-server` folder में terminal खोलें और चलाएं:

```bash
npm install
```

### स्टेप 4: API Key Configure करें

1. Example environment file को copy करें:
   ```bash
   cp .env.example .env
   ```

2. `.env` file edit करें और strong API key बनाएं:
   ```
   PORT=3000
   API_KEY=kp-investment-secret-key-xyz123abc
   ```
   
   💡 **टिप:** Random string generator use करें: https://www.random.org/strings/

### स्टेप 5: Server Start करें

```bash
npm start
```

### स्टेप 6: WhatsApp से QR Code Scan करें

1. Terminal में QR code दिखाई देगा
2. अपने phone (Kalp या Prasham के phone) पर WhatsApp खोलें
3. जाएं: **Settings → Linked Devices → Link a Device**
4. Terminal से QR code scan करें
5. ✅ Success! "WhatsApp connected successfully!" दिखेगा

**ज़रूरी:** इस WhatsApp connection को active रखें। Linked device से logout न करें।

### स्टेप 7: Server Test करें

नया terminal खोलें और test करें:

```bash
# Health check
curl http://localhost:3000/health

# Response: {"status":"ok","whatsapp_connected":true}
```

---

## 🌐 भाग 2: Cloud पर Deploy करें (Recommended: Railway.app)

आप अपना laptop 24/7 नहीं चला सकते, इसलिए server को cloud पर deploy करें (FREE!).

### Option A: Railway.app (सबसे आसान - Recommended)

1. **Railway Account बनाएं**
   - जाएं: https://railway.app/
   - GitHub से sign up करें

2. **New Project बनाएं**
   - "New Project" पर click करें
   - "Deploy from GitHub repo" select करें
   - अपना GitHub account connect करें
   - अपनी repository select करें

3. **Server Configure करें**
   - Railway automatically Node.js detect करेगा
   - Environment variable add करें:
     - Key: `API_KEY`
     - Value: `kp-investment-secret-key-xyz123abc` (आपके .env जैसा ही)

4. **Deploy करें**
   - "Deploy" पर click करें
   - Deployment complete होने तक wait करें

5. **QR Code Scan करें**
   - Railway dashboard में "View Logs" पर click करें
   - Logs में QR code देखें
   - WhatsApp से scan करें (पहले जैसा ही process)
   - "WhatsApp connected successfully!" message के लिए wait करें

6. **अपना Server URL लें**
   - Railway में Settings → Domains पर जाएं
   - "Generate Domain" पर click करें
   - URL copy करें (जैसे: `https://your-app.railway.app`)
   - **इस URL को save करें** - Supabase के लिए ज़रूरी होगा!

### Option B: Render.com (Alternative FREE option)

1. जाएं: https://render.com/
2. GitHub से sign up करें
3. "New" → "Web Service" पर click करें
4. अपनी repository connect करें
5. Configure करें:
   - **Name:** kp-investment-whatsapp
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
6. Environment variable add करें: `API_KEY`
7. Deploy करें
8. Logs देखें और QR code scan करें
9. अपना Render URL copy करें (जैसे: `https://your-app.onrender.com`)

---

## 🔗 भाग 3: Supabase से Connect करें

अब अपने deployed Baileys server को website के backend से connect करें।

### स्टेप 1: अपने Server की Details लें

भाग 2 से, आपके पास होना चाहिए:
- **Server URL:** `https://your-app.railway.app` (या आपका Render URL)
- **API Key:** `kp-investment-secret-key-xyz123abc` (आपके .env से)

### स्टेप 2: Supabase में Secrets Add करें

1. **Supabase Dashboard खोलें**
   - जाएं: https://supabase.com/dashboard
   - अपना KP Investment project select करें

2. **Edge Functions Settings पर जाएं**
   - Sidebar में "Edge Functions" पर click करें
   - अपने function (server) पर click करें
   - "Settings" या "Secrets" पर click करें

3. **ये दो Secrets Add करें:**

   **Secret 1:**
   ```
   Name: BAILEYS_SERVER_URL
   Value: https://your-app.railway.app
   ```
   ⚠️ **Trailing slash न लगाएं!** Use करें `https://your-app.railway.app` न कि `https://your-app.railway.app/`

   **Secret 2:**
   ```
   Name: BAILEYS_API_KEY
   Value: kp-investment-secret-key-xyz123abc
   ```

4. **Secrets Save करें**

### स्टेप 3: Supabase Function Redeploy करें

Secrets add करने के बाद, redeploy करना ज़रूरी है:

1. Supabase Dashboard → Edge Functions में
2. अपना function ढूंढें
3. "Redeploy" या "Deploy" पर click करें
4. Deployment complete होने तक wait करें

---

## ✅ भाग 4: सब कुछ Test करें

### Test 1: Server Health Check करें

अपने browser में visit करें:
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

### Test 2: Contact Form Submit करें

1. अपनी KP Investment website पर जाएं
2. Contact page पर navigate करें
3. Test data से form भरें:
   - Name: Test User
   - Email: test@example.com
   - Phone: 9876543210
   - Subject: Test Inquiry
   - Message: This is a test message

4. Form submit करें

### Test 3: WhatsApp Check करें

**Kalp Shah और Prasham Sanghvi दोनों को ऐसा WhatsApp message मिलेगा:**

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

### Test 4: Logs Check करें

**Railway/Render Logs:**
1. अपना Railway/Render dashboard खोलें
2. Logs देखें
3. देखें: `✅ Notification sent to 918469797169`
4. देखें: `✅ Notification sent to 917041037428`

**Supabase Logs:**
1. Supabase Dashboard → Edge Functions खोलें
2. अपने function के logs देखें
3. देखें: `✅ WhatsApp notifications sent successfully via Baileys`

---

## 🔧 Troubleshooting

### समस्या: "WhatsApp not connected"

**समाधान:**
1. Railway/Render logs check करें
2. Logs में QR code ढूंढें
3. WhatsApp से फिर से QR code scan करें
4. सुनिश्चित करें कि phone पर WhatsApp logout नहीं है

### समस्या: "Logs में QR code नहीं दिख रहा"

**समाधान:**
1. Server से `auth_info_baileys` folder delete करें
2. Redeploy करें
3. Fresh QR code दिखाई देगा

### समस्या: "Connection बार-बार drop हो रहा है"

**समाधान:**
- यह normal है - server automatically reconnect करता है
- Phone का internet connection check करें
- WhatsApp app updated रखें
- Linked device से logout न करें

### समस्या: "Messages नहीं भेजे जा रहे"

**समाधान:**
1. Check करें server चल रहा है: `/health` endpoint visit करें
2. Verify करें WhatsApp connected है: `whatsapp_connected: true`
3. Supabase secrets सही हैं check करें:
   - `BAILEYS_SERVER_URL` - trailing slash नहीं
   - `BAILEYS_API_KEY` - server के API key से match करता है
4. Server code में phone numbers सही हैं check करें

---

## 💰 खर्च

| Service | Cost | Notes |
|---------|------|-------|
| Railway.app | FREE | ₹400/महीना (optional, better resources के लिए) |
| Render.com | FREE | Free tier काफ़ी है |
| WhatsApp via Baileys | FREE | कोई API charges नहीं, unlimited messages |
| Supabase | FREE | आपका existing plan |

**कुल मासिक खर्च: ₹0** (FREE!)

---

## 🎯 अगले Steps

1. ✅ Baileys server locally सेट करें
2. ✅ Railway/Render पर deploy करें
3. ✅ WhatsApp से QR code scan करें
4. ✅ Supabase में secrets add करें
5. ✅ Integration test करें
6. ✅ पहली असली inquiry का wait करें!

---

## 📞 Support

अगर कोई समस्या आए:

1. **Logs देखें:** 90% समस्याएं logs में दिखती हैं
2. **QR Scan फिर से करें:** ज़्यादातर connection issues इससे ठीक हो जाती हैं
3. **Server Restart करें:** Simple restart से बहुत सी problems solve हो जाती हैं

**Contact:**
- Email: kpinvestment7781@gmail.com
- WhatsApp: +91 84697 97169 (Kalp Shah)

---

## 📝 Summary

### जब कोई Form Submit करता है तो क्या होता है:

1. **User website पर contact form भरता है**
2. **Form Supabase backend को submit होता है**
3. **Supabase, Baileys server API को call करता है**
4. **Baileys server दोनों partners को WhatsApp messages भेजता है**
5. **Kalp & Prasham को instant notifications मिलती हैं**
6. **Partners सीधे client को respond कर सकते हैं**

**सब automatic. सब FREE. सब instant!** ⚡

---

## 🎉 बधाई हो!

अब आपकी KP Investment website के लिए एक professional, automatic WhatsApp notification system तैयार है!

हर inquiry instantly दोनों partners को WhatsApp पर पहुंच जाएगी। कोई opportunity miss नहीं होगी। कोई delay नहीं। बस instant notifications! 🚀

**Happy Investing! 📈**

---

*Last Updated: 5 मार्च, 2026*
*KP Investment - अटूट विश्वास*
