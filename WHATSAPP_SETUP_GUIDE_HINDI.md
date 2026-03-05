# WhatsApp Notification Setup Guide (हिंदी में)

## 📱 WhatsApp पर Automatic Inquiry Messages कैसे पाएं

जब भी कोई client आपकी website पर inquiry form भरे, तो automatically आपके WhatsApp पर notification आ जाएगी।

---

## ✅ Backend Code Update हो गया है!

आपका backend code पहले से ही **3 तरीकों** के साथ ready है:
1. **WhatsApp Cloud API (Meta)** - FREE 
2. **Wati.io / Interakt / Aisensy** - Indian Services
3. **Twilio WhatsApp API** - International, Paid

आपको बस अपनी पसंद के service को activate करना है।

---

## 🌟 RECOMMENDED: WhatsApp Cloud API (Meta) - BEST और FREE

### Step 1: Facebook Developer Account बनाएं
1. https://developers.facebook.com पर जाएं
2. Sign up/Login करें
3. "Create App" पर क्लिक करें
4. "Business" type चुनें

### Step 2: WhatsApp Product Add करें
1. App dashboard में "Add Product" करें
2. "WhatsApp" select करें
3. Setup करें

### Step 3: Phone Number Add करें
1. WhatsApp > Getting Started में जाएं
2. "Add phone number" करें
3. अपना business phone number verify करें
4. आपको **Phone Number ID** मिलेगी (यह save करें)

### Step 4: Access Token प्राप्त करें
1. WhatsApp > API Setup में जाएं
2. "Temporary Access Token" copy करें (24 hours के लिए)
3. Permanent token के लिए:
   - Settings > Business Settings > System Users
   - New System User create करें
   - WhatsApp permissions दें
   - Permanent token generate करें

### Step 5: Supabase में Secrets Add करें
1. Supabase Dashboard खोलें: https://lloosoxswlzvdjduyemd.supabase.co
2. Settings > Edge Functions > Secrets पर जाएं
3. दो secrets add करें:

```
Secret Name: WHATSAPP_API_TOKEN
Value: [आपका Access Token यहाँ paste करें]

Secret Name: WHATSAPP_PHONE_NUMBER_ID  
Value: [आपका Phone Number ID यहाँ paste करें]
```

### Step 6: Test करें!
1. अपनी website पर contact form भरें
2. Submit करें
3. 2-3 seconds में दोनों partners के WhatsApp पर message आ जाएगा! 🎉

---

## 🇮🇳 ALTERNATIVE: Indian Services (Wati/Interakt/Aisensy)

Indian businesses के लिए यह भी अच्छा option है।

### Option A: Wati.io

#### Step 1: Wati Account बनाएं
1. https://www.wati.io पर जाएं
2. Sign up करें (Free trial available)
3. WhatsApp number connect करें

#### Step 2: API Credentials लें
1. Dashboard > Settings > API Docs
2. **API Endpoint** copy करें (जैसे: `https://live-server-12345.wati.io`)
3. **API Token** generate और copy करें

#### Step 3: Supabase में Add करें
```
Secret Name: WATI_API_TOKEN
Value: [आपका Wati API Token]

Secret Name: WATI_API_ENDPOINT
Value: [आपका Wati API Endpoint URL]
```

#### Step 4: Test करें
Form submit करें और WhatsApp पर message check करें!

### Option B: Interakt

#### Step 1: Interakt Account
1. https://www.interakt.shop पर जाएं
2. Sign up और phone number verify करें

#### Step 2: API Setup
1. Settings > API में जाएं
2. API Key generate करें
3. API Endpoint note करें

#### Step 3: Supabase Secrets
```
Secret Name: WATI_API_TOKEN
Value: [Interakt API Key]

Secret Name: WATI_API_ENDPOINT
Value: [Interakt API URL]
```

### Option C: Aisensy

Similar process जैसे Wati/Interakt
1. https://www.aisensy.com से sign up करें
2. API credentials लें
3. Supabase में add करें

---

## 💵 PAID OPTION: Twilio (सबसे Easy लेकिन Paid)

### Step 1: Twilio Account
1. https://www.twilio.com/console पर जाएं
2. Sign up करें (Free trial मिलता है $15 credit)
3. Phone number purchase करें

### Step 2: WhatsApp Sandbox Setup
1. Messaging > Try it out > Send a WhatsApp message
2. Sandbox number से testing करें
3. Production के लिए WhatsApp Business profile approve कराएं

### Step 3: Credentials लें
1. Console में जाएं
2. **Account SID** copy करें
3. **Auth Token** copy करें
4. **WhatsApp From Number** note करें (format: `whatsapp:+14155238886`)

### Step 4: Supabase Secrets
```
Secret Name: TWILIO_ACCOUNT_SID
Value: [Account SID]

Secret Name: TWILIO_AUTH_TOKEN
Value: [Auth Token]

Secret Name: TWILIO_WHATSAPP_FROM
Value: [WhatsApp number with 'whatsapp:' prefix]
```

---

## 🧪 Testing कैसे करें

### 1. Local Testing
1. अपनी website पर जाएं
2. Contact form भरें:
   - Name: Test User
   - Email: test@example.com
   - Phone: 9876543210
   - Subject: Test Inquiry
   - Message: Testing WhatsApp notification
3. Submit करें

### 2. Check WhatsApp
- 2-5 seconds में आपको message मिलना चाहिए
- Message format:
```
🔔 NEW INQUIRY - KP Investment

👤 Name: Test User
📧 Email: test@example.com
📱 Phone: 9876543210
📋 Subject: Test Inquiry

💬 Message:
Testing WhatsApp notification

🕐 Time: [Current time]
🆔 ID: inquiry-xxxxx
```

### 3. Check Supabase Logs
1. Supabase Dashboard > Edge Functions > Logs
2. देखें कि message send हुआ या नहीं
3. Errors check करें (अगर कोई हो)

---

## 🎯 Message किसे-किसे जाएगा?

जब कोई inquiry form submit करेगा, तो message **दोनों partners** को जाएगा:

1. **Kalp Shah**: +91 84697 97169
2. **Prasham Sanghvi**: +91 70410 37428

दोनों को same time पर same message मिलेगा!

---

## ⚠️ Common Issues और Solutions

### Issue 1: Message नहीं आ रहा
**Solution:**
- Supabase Secrets correctly add किए हैं check करें
- API credentials verify करें
- Supabase logs check करें error के लिए
- Phone numbers correctly format हैं check करें (918469797169)

### Issue 2: Only 1 partner को message मिल रहा
**Solution:**
- Backend code में दोनों numbers check करें
- Logs में दोनों API calls हो रही हैं confirm करें

### Issue 3: "Credentials not found" error
**Solution:**
- Supabase secrets exact spelling में add करें
- Edge function redeploy करें
- 2-3 minutes wait करें refresh के लिए

### Issue 4: WhatsApp API error
**Solution:**
- Access token expired तो renew करें
- Phone number status "Active" है verify करें
- API limits check करें (free tier limitations)

---

## 💰 Cost Comparison

| Service | Free Tier | Cost per Message | Best For |
|---------|-----------|------------------|----------|
| **WhatsApp Cloud API** | 1000 msgs/month | ₹0.40-0.80 | Small-Medium business |
| **Wati.io** | 7-day trial | ~₹1500/month (1000 msgs) | Indian businesses |
| **Interakt** | 14-day trial | ~₹2000/month | Indian businesses |
| **Aisensy** | Custom | Custom pricing | Enterprise |
| **Twilio** | $15 credit | $0.005/msg (~₹0.40) | International |

---

## 🚀 Next Steps

### After WhatsApp Setup:

1. **Email Integration भी करें**
   - `/EMAIL_INTEGRATION_GUIDE.md` देखें
   - Resend या SendGrid setup करें
   - Email: kpinvestment7781@gmail.com पर notifications पाएं

2. **Test Thoroughly**
   - कई test inquiries submit करें
   - Check करें सभी details सही आ रही हैं
   - दोनों partners के WhatsApp verify करें

3. **Monitor Performance**
   - Daily inquiries track करें
   - Response time improve करें
   - Client follow-ups ensure करें

---

## 📞 Quick Reference

### Partner Contact Numbers:
- **Kalp Shah**: +91 84697 97169
- **Prasham Sanghvi**: +91 70410 37428

### Company Email:
- kpinvestment7781@gmail.com

### Supabase Project:
- https://lloosoxswlzvdjduyemd.supabase.co

### Backend API Endpoint:
- https://lloosoxswlzvdjduyemd.supabase.co/functions/v1/make-server-822d295e/submit-inquiry

---

## 💡 Pro Tips

1. **Response Time**: WhatsApp message मिलते ही client को reply करें (fast response = better conversion)

2. **Message Template**: Message में सभी details हैं, direct client को call/WhatsApp कर सकते हैं

3. **Tracking**: हर inquiry का unique ID है, easy tracking के लिए

4. **Backup**: अगर WhatsApp API fail भी हो, तो inquiries Supabase में save हैं - `/inquiries` endpoint से check कर सकते हैं

5. **Analytics**: Monthly report निकालें - कितने inquiries आए, कितने convert हुए

---

## ✅ Setup Complete Checklist

- [ ] Service choose किया (Meta/Wati/Twilio)
- [ ] Account बनाया
- [ ] API credentials प्राप्त किए
- [ ] Supabase में secrets add किए
- [ ] Test inquiry submit किया
- [ ] दोनों WhatsApp पर message received
- [ ] Message format correct है
- [ ] All details properly show हो रही हैं

---

**Need Help?** 
- Meta WhatsApp API Docs: https://developers.facebook.com/docs/whatsapp
- Wati Support: https://www.wati.io/support
- Twilio Docs: https://www.twilio.com/docs/whatsapp

**Last Updated:** March 2, 2026
