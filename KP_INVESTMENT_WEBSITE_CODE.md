# KP Investment Website - Complete Code Documentation

## Overview

This is a professional financial services website for KP Investment, featuring unlisted shares trading, IPO funding, and portfolio management services.

---

## 🎨 Design Specifications

### Color Scheme

- **Dark Blue Primary**: `#1a2e3e`
- **Dark Blue Secondary**: `#0f1921`
- **Gold Accent**: `#d4af37`
- **Hover Gold**: `#c4a030`

### Brand Assets

- **Logo**: KP Investment logo (imported via Figma asset)
- **Theme**: Professional, trustworthy, modern financial services

---

## 📂 Project Structure

```
/
├── src/
│   ├── app/
│   │   ├── App.tsx                          # Main app entry with routing
│   │   ├── routes.tsx                        # Route definitions
│   │   ├── components/
│   │   │   ├── Layout.tsx                    # Main layout with header & footer
│   │   │   ├── WhatsAppButton.tsx            # Floating WhatsApp button
│   │   │   └── ui/                           # UI component library
│   │   └── pages/
│   │       ├── Home.tsx                      # Homepage
│   │       ├── Services.tsx                  # Services page
│   │       ├── About.tsx                     # About page
│   │       └── Contact.tsx                   # Contact page with form
│   └── styles/
│       ├── index.css                         # Main styles
│       ├── theme.css                         # Theme tokens
│       └── fonts.css                         # Font imports
├── supabase/
│   └── functions/
│       └── server/
│           ├── index.tsx                     # Backend API server
│           └── kv_store.tsx                  # Key-value storage
└── package.json                              # Dependencies
```

---

## 📋 Key Features

### 1. Multi-Page Navigation

- Home
- Services (Unlisted Shares, IPO Funding, Portfolio Management)
- About (Company story, team, values)
- Contact (Form with WhatsApp integration)

### 2. Contact System

- Form submissions stored in Supabase
- Automatic WhatsApp redirect after submission
- WhatsApp number: **8469797169** (Kalp Shah)
- Email: **kpinvestment7781@gmail.com**

### 3. Floating WhatsApp Button

- Fixed position on all pages
- Opens WhatsApp with "Hey" pre-filled
- Visible on desktop and mobile

### 4. Contact Information

- \*\*: +91 84697 97169 (Founder, 2 years experience)
- \*\*: +91 70410 37428 (Founder, 8 years experience)
- **Office 1**: 601, Jolly Plaza, Athwagate, Surat - 395007
- **Office 2**: 329, Diamond Village, Mahidharpura, Surat - 395003

### 5. Statistics

- 500+ Happy Clients
- ₹10Cr+ Assets Under Management
- 8+ Years of Experience
- 98% Client Satisfaction

---

## 💻 Main Code Files

### 1. App.tsx (Entry Point)

```typescript
import { RouterProvider } from "react-router";
import { router } from "./routes";

export default function App() {
  return <RouterProvider router={router} />;
}
```

### 2. routes.tsx (Routing Configuration)

```typescript
import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Services } from "./pages/Services";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "services", Component: Services },
      { path: "about", Component: About },
      { path: "contact", Component: Contact },
    ],
  },
]);
```

### 3. Layout.tsx (Main Layout with Header & Footer)

**Features:**

- Fixed header with logo and navigation
- Contact info in header (phone & email)
- Mobile-responsive menu
- Footer with company info and quick links
- WhatsApp button integration

**Navigation Links:**

- Home (/)
- Services (/services)
- About (/about)
- Contact (/contact)

### 4. WhatsAppButton.tsx (Floating WhatsApp Button)

```typescript
import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const handleWhatsAppClick = () => {
    const phoneNumber = "918469797169"; // Kalp Shah's WhatsApp
    const message = encodeURIComponent("Hey");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Chat with us on WhatsApp
      </span>
    </button>
  );
}
```

### 5. Contact.tsx (Contact Form with WhatsApp Integration)

**Features:**

- Contact form with validation
- Submits to Supabase backend
- Redirects to WhatsApp after successful submission
- FAQ section
- Contact cards with clickable phone, email, and map links

**Form Fields:**

- Full Name (required)
- Email (required)
- Phone (optional)
- Subject (dropdown: Unlisted Shares, IPO Funding, Portfolio Management, General Inquiry)
- Message (required)

**WhatsApp Integration:**
Forms submit to backend → Stored in database → WhatsApp notification sent to 8469797169

### 6. Backend API (supabase/functions/server/index.tsx)

**Endpoints:**

1. **Health Check**
   - `GET /make-server-822d295e/health`
   - Returns: `{ status: "ok" }`

2. **Submit Inquiry**
   - `POST /make-server-822d295e/submit-inquiry`
   - Body: `{ name, email, phone, subject, message }`
   - Returns: `{ success, inquiryId, whatsappUrl, message }`
   - Stores inquiry in KV store
   - Generates WhatsApp URL with formatted message

3. **Get Inquiries (Admin)**
   - `GET /make-server-822d295e/inquiries`
   - Returns: `{ inquiries: [...] }`
   - Lists all inquiries sorted by newest first

---

## 📦 Dependencies

### Core Libraries

- **react**: 18.3.1
- **react-dom**: 18.3.1
- **react-router**: 7.13.0

### UI Components

- **@radix-ui/\***: Accessible UI components
- **lucide-react**: 0.487.0 (Icons)
- **@mui/material**: 7.3.5 (Material UI)
- **tailwindcss**: 4.1.12

### Animations

- **motion**: 12.23.24 (formerly Framer Motion)

### Styling

- **@tailwindcss/vite**: 4.1.12
- **tailwind-merge**: 3.2.0
- **class-variance-authority**: 0.7.1

### Build Tools

- **vite**: 6.3.5
- **@vitejs/plugin-react**: 4.7.0

---

## 🚀 How to Build & Deploy

### Build Command

```bash
pnpm build
```

### Output

Static files in `/dist` folder ready for deployment

---

## 🔐 Environment Configuration

### Supabase Setup

The backend uses Supabase Edge Functions with:

- **Project ID**: Set in `/utils/supabase/info.tsx`
- **Anon Key**: Public anonymous key for client requests
- **KV Store**: For storing contact inquiries

### WhatsApp Configuration

- **Primary Number**: 918469797169 (Kalp Shah)
- **Format**: International format without '+' symbol
- **Message Template**: Formatted with inquiry details

---

## 📱 Contact Integration Details

### Phone Links (tel:)

```html
<a href="tel:+918469797169">Call </a>
<a href="tel:+917041037428">CaLL </a>
```

### Email Links (mailto:)

```html
<a href="mailto:kpinvestment7781@gmail.com">Email Us</a>
```

### Map Links (Google Maps)

```html
<!-- Office 1 -->
<a href="https://www.google.com/maps/search/?api=1&query=601+Jolly+Plaza+Athwagate+Surat+395007" target="_blank">View Office 1</a>

<!-- Office 2 -->
<a href="https://www.google.com/maps/search/?api=1&query=329+Diamond+Village+Mahidharpura+Surat+395003" target="_blank">View Office 2</a>
```

### WhatsApp Links

```html
<!-- Floating Button -->
<a href="https://wa.me/918469797169?text=Hey" target="_blank">WhatsApp</a>

<!-- From Form Submission -->
<!-- Message includes: Name, Email, Phone, Subject, Message, Timestamp, Inquiry ID -->
```

---

## 📝 Content

### Company Tagline

"Your Trusted Partner in Investment Excellence"

### Core Message

"Empowering investors with expert guidance in unlisted shares, IPO funding, and portfolio management. Building wealth through trust and expertise."

### Unique Value Proposition

"When years of seasoned experience meet youthful energy, it gives birth to 'Unshakable Trust.'"

### Services

1. **Unlisted Shares** - Access pre-IPO opportunities with expert valuation
2. **IPO Funding** - Secure funding solutions for promising IPOs
3. **Portfolio Management** - Customized strategies for growth

### Team

1. **Kalp Shah** (Founder)
   - 2 years experience
   - Expert in unlisted shares valuation and pre-IPO market analysis

2. **Prasham Sanghvi** (Founder)
   - 8 years experience
   - Expert in equity markets and portfolio management

---

## 🎯 SEO & Meta Information

### Site Title

"KP Investment - Financial Services & Investment Solutions"

### Description

"Expert investment guidance in unlisted shares, IPO funding, and portfolio management. Trusted by 500+ clients with ₹10Cr+ AUM."

### Keywords

- Unlisted shares
- IPO funding
- Portfolio management
- Financial services
- Investment advisor
- Surat
- Gujarat

---

## 📜 Copyright & License

### Copyright Notice

© 2026 KP Investment. All rights reserved.

### Ownership Rights

**You (the website owner) have full rights to:**

1. ✅ Use this code for your business
2. ✅ Modify and customize any part of the website
3. ✅ Deploy it to any hosting platform
4. ✅ Use it for commercial purposes
5. ✅ Share it with your developers/team

**What this means:**

- This is YOUR website code
- You own all the content and business information
- You can do whatever you want with it
- No restrictions on usage or modification

**Technology Stack Rights:**

- The code is built using open-source technologies (React, Tailwind, etc.)
- These libraries are freely available for commercial use
- You have full rights to the custom code written for your website
- The UI components and styling are yours to use

**Important Notes:**

- Keep your Supabase credentials secure
- WhatsApp number (8469797169) is configured throughout
- Email (kpinvestment7781@gmail.com) is your business email
- All branding and content belongs to KP Investment

---

## 🛠️ Customization Guide

### To Change Colors

Edit the following hex codes throughout the files:

- Dark Blue Primary: `#1a2e3e`
- Dark Blue Secondary: `#0f1921`
- Gold Accent: `#d4af37`

### To Change Contact Info

Update in these files:

- `/src/app/components/Layout.tsx` (Header & Footer)
- `/src/app/pages/Contact.tsx` (Contact cards & form)
- `/src/app/components/WhatsAppButton.tsx` (WhatsApp number)
- `/supabase/functions/server/index.tsx` (Backend WhatsApp number)

### To Add New Pages

1. Create new file in `/src/app/pages/YourPage.tsx`
2. Add route in `/src/app/routes.tsx`
3. Add navigation link in `/src/app/components/Layout.tsx`

### To Modify Content

All page content is in:

- `/src/app/pages/Home.tsx`
- `/src/app/pages/Services.tsx`
- `/src/app/pages/About.tsx`
- `/src/app/pages/Contact.tsx`

---

## 🌐 Deployment Checklist

- [ ] Build project: `pnpm build`
- [ ] Test all links (phone, email, maps)
- [ ] Verify WhatsApp integration works
- [ ] Check form submission and database storage
- [ ] Test on mobile devices
- [ ] Verify all pages are responsive
- [ ] Check SEO meta tags
- [ ] Configure custom domain
- [ ] Set up SSL certificate
- [ ] Test contact form spam protection (if needed)

---

## 📞 Support Contacts

**For Website Issues:**

- Kalp Shah: +91 84697 97169
- Prasham Sanghvi: +91 70410 37428
- Email: kpinvestment7781@gmail.com

**Office Locations:**

1. 601, Jolly Plaza, Athwagate, Surat - 395007
2. 329, Diamond Village, Mahidharpura, Surat - 395003

---

## 🎉 Website Features Summary

✅ **Fully Responsive** - Works on desktop, tablet, and mobile
✅ **Multi-Page Structure** - Home, Services, About, Contact
✅ **Contact Form** - Integrated with Supabase backend
✅ **WhatsApp Integration** - Floating button + form notifications
✅ **Clickable Contacts** - Phone, email, and map links work
✅ **Professional Design** - Dark blue theme with gold accents
✅ **Fast Performance** - Built with Vite and React
✅ **SEO Optimized** - Clean URLs and meta information
✅ **Secure** - Form validation and secure backend

---

## 📚 Additional Notes

This website is built with modern web technologies and follows best practices for:

- Performance optimization
- Accessibility
- Mobile responsiveness
- Security
- User experience
- SEO

All code is production-ready and can be deployed immediately to any static hosting platform (Vercel, Netlify, AWS, etc.) with Supabase for the backend.

**You have complete ownership and rights to use, modify, and deploy this website for your business.**

---

**End of Documentation**

Generated: February 25, 2026
Website: KP Investment - Professional Financial Services