# WhatsApp Notification Setup - Quick Start Guide

## ✅ Your Backend is Ready!

Your backend code in `/supabase/functions/server/index.tsx` is already configured with **3 WhatsApp integration options**. You just need to activate ONE of them.

---

## 🚀 FASTEST SETUP: WhatsApp Cloud API (Meta) - FREE

### What You'll Get:
- 1000 free messages per month
- Direct integration with WhatsApp
- No third-party dependencies
- ~₹0.40-0.80 per message after free tier

### 5-Minute Setup:

#### 1. Create Facebook App
- Go to: https://developers.facebook.com
- Click "Create App" → Choose "Business"

#### 2. Add WhatsApp Product
- In App Dashboard → "Add Product"
- Select "WhatsApp" → Click "Set Up"

#### 3. Get Your Credentials
- Go to WhatsApp → API Setup
- Copy these two values:
  - **Phone Number ID** (looks like: 123456789012345)
  - **Access Token** (long string starting with EAAG...)

#### 4. Add to Supabase Secrets
1. Open: https://lloosoxswlzvdjduyemd.supabase.co
2. Go to: Settings → Edge Functions → Secrets
3. Click "Add Secret" and add these:

```
Name: WHATSAPP_API_TOKEN
Value: [Paste your Access Token]

Name: WHATSAPP_PHONE_NUMBER_ID
Value: [Paste your Phone Number ID]
```

#### 5. Test It!
- Fill out your contact form
- Submit
- Check WhatsApp on both numbers (8469797169 and 7041037428)
- You should receive the inquiry within 2-3 seconds! 🎉

---

## 🇮🇳 ALTERNATIVE: Indian Services (Wati/Interakt)

### Why Choose This:
- Built for Indian businesses
- Local support
- Easy dashboard
- 7-14 day free trial

### Quick Setup (Wati.io):

1. **Sign Up**: https://www.wati.io
2. **Get API Credentials**:
   - Dashboard → Settings → API
   - Copy **API Endpoint** (e.g., https://live-server-12345.wati.io)
   - Copy **API Token**

3. **Add to Supabase Secrets**:
```
Name: WATI_API_TOKEN
Value: [Your Wati API Token]

Name: WATI_API_ENDPOINT
Value: [Your Wati API URL]
```

4. **Test**: Submit a form and check WhatsApp!

---

## 💳 PAID OPTION: Twilio (Easiest but Paid)

### Why Choose This:
- Most reliable
- Great documentation
- $15 free trial credit
- Enterprise-grade

### Setup:

1. **Sign Up**: https://www.twilio.com
2. **Get WhatsApp Number**: Console → Messaging → WhatsApp
3. **Copy Credentials**:
   - Account SID
   - Auth Token
   - WhatsApp From Number (format: whatsapp:+14155238886)

4. **Add to Supabase**:
```
Name: TWILIO_ACCOUNT_SID
Value: [Your Account SID]

Name: TWILIO_AUTH_TOKEN
Value: [Your Auth Token]

Name: TWILIO_WHATSAPP_FROM
Value: [Your WhatsApp number]
```

---

## 📱 What Happens When Someone Submits?

### Client Experience:
1. Fills out contact form
2. Clicks "Send Message"
3. Sees success message
4. Form clears

### Your Experience:
1. Instant WhatsApp message arrives
2. Message contains:
   ```
   🔔 NEW INQUIRY - KP Investment
   
   👤 Name: John Doe
   📧 Email: john@example.com
   📱 Phone: +91 9876543210
   📋 Subject: IPO Funding
   
   💬 Message:
   Interested in IPO funding for upcoming issues
   
   🕐 Time: 02 Mar 2026, 10:30 AM
   🆔 ID: inquiry-1709367000123-abc123
   ```
3. Message sent to BOTH partners simultaneously:
   - Kalp Shah: +91 84697 97169
   - Prasham Sanghvi: +91 70410 37428

---

## 🧪 Testing

### Test Inquiry:
```
Name: Test User
Email: test@example.com
Phone: 9876543210
Subject: Test Inquiry
Message: Testing WhatsApp notifications
```

### Check:
1. ✅ WhatsApp message received by both partners
2. ✅ All details are correct
3. ✅ Message is formatted properly
4. ✅ Timestamp is in IST
5. ✅ Unique inquiry ID is present

---

## ⚠️ Troubleshooting

### "No message received"
- Check Supabase logs: Edge Functions → Logs
- Verify secrets are added correctly
- Wait 2-3 minutes for secrets to propagate

### "Credentials not found" in logs
- Exact spelling matters: WHATSAPP_API_TOKEN (not whatsapp_api_token)
- Redeploy edge function if needed

### "API Error"
- Token expired? Generate new one
- Phone number active? Check WhatsApp Manager
- Free tier limit reached? Check usage

---

## 💰 Cost Comparison

| Service | Setup Time | Free Tier | Monthly Cost | Recommended For |
|---------|-----------|-----------|--------------|-----------------|
| **Meta Cloud API** | 10 min | 1000 msgs | ~₹500 (5000 msgs) | Best value |
| **Wati** | 5 min | 7-day trial | ₹1500+ | Easy dashboard |
| **Interakt** | 5 min | 14-day trial | ₹2000+ | Indian support |
| **Twilio** | 5 min | $15 credit | ~₹800 (10000 msgs) | Most reliable |

---

## 📊 Current Setup

✅ **Backend Code**: Ready with 3 integration options  
✅ **Database**: Inquiries saved to Supabase KV Store  
✅ **Frontend**: Contact form connected  
✅ **Partners**: Both numbers configured (8469797169, 7041037428)  
✅ **Email**: Template ready (needs email service setup)  

🔲 **WhatsApp API**: Needs API credentials (choose one option above)  
🔲 **Email Service**: See `/EMAIL_INTEGRATION_GUIDE.md`  

---

## 🎯 Next Steps

1. **Choose Your Service**: Meta Cloud API (recommended) or Indian service
2. **Get Credentials**: Follow setup steps above
3. **Add to Supabase**: Add secrets to your project
4. **Test**: Submit a form and verify
5. **Set Up Email**: Follow `/EMAIL_INTEGRATION_GUIDE.md`
6. **Go Live**: Deploy and start receiving inquiries!

---

## 📞 Your Contact Info

**Partners:**
- Kalp Shah: +91 84697 97169 (2 years exp, Unlisted Shares)
- Prasham Sanghvi: +91 70410 37428 (8 years exp, Equity Markets)

**Company Email:**
- kpinvestment7781@gmail.com

**Offices:**
- 601, Jolly Plaza, Athwagate, Surat - 395007
- 329, Diamond Village, Mahidharpura, Surat - 395003

---

## 📚 Documentation Links

- **WhatsApp Cloud API**: https://developers.facebook.com/docs/whatsapp
- **Wati**: https://www.wati.io/docs
- **Twilio**: https://www.twilio.com/docs/whatsapp
- **Supabase Edge Functions**: https://supabase.com/docs/guides/functions

---

## ✅ Setup Checklist

- [ ] Choose WhatsApp service (Meta/Wati/Twilio)
- [ ] Create account and verify phone number
- [ ] Get API credentials
- [ ] Add secrets to Supabase
- [ ] Test with sample inquiry
- [ ] Verify both partners receive message
- [ ] Check message formatting
- [ ] Set up email notifications (optional)
- [ ] Deploy to production
- [ ] Start receiving real inquiries!

---

**Ready to go live?** Once you add the API credentials to Supabase, everything will work automatically! 🚀

**Questions?** Check the detailed Hindi guide: `/WHATSAPP_SETUP_GUIDE_HINDI.md`
