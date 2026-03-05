import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-822d295e/health", (c) => {
  return c.json({ status: "ok" });
});

// Submit contact inquiry endpoint
app.post("/make-server-822d295e/submit-inquiry", async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, phone, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    // Generate unique inquiry ID
    const inquiryId = `inquiry-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const timestamp = new Date().toISOString();

    // Store inquiry in KV store
    const inquiry = {
      id: inquiryId,
      name,
      email,
      phone: phone || "Not provided",
      subject,
      message,
      timestamp,
      status: "new"
    };

    await kv.set(inquiryId, inquiry);

    // Format message for WhatsApp
    const whatsappMessageText = 
      `🔔 *NEW INQUIRY - KP Investment*\n\n` +
      `👤 *Name:* ${name}\n` +
      `📧 *Email:* ${email}\n` +
      `📱 *Phone:* ${phone || "Not provided"}\n` +
      `📋 *Subject:* ${subject}\n\n` +
      `💬 *Message:*\n${message}\n\n` +
      `🕐 *Time:* ${new Date(timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}\n` +
      `🆔 *ID:* ${inquiryId}`;

    // =====================================================
    // WHATSAPP INTEGRATION - Baileys Server
    // =====================================================
    
    // Send WhatsApp notification via Baileys server
    try {
      const baileysServerUrl = Deno.env.get('BAILEYS_SERVER_URL');
      const baileysApiKey = Deno.env.get('BAILEYS_API_KEY');
      
      if (baileysServerUrl && baileysApiKey) {
        const response = await fetch(`${baileysServerUrl}/send-inquiry-notification`, {
          method: 'POST',
          headers: {
            'x-api-key': baileysApiKey,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name,
            email,
            phone: phone || "Not provided",
            subject,
            message,
            inquiryId,
            timestamp
          })
        });

        const result = await response.json();
        
        if (result.success) {
          console.log("✅ WhatsApp notifications sent successfully via Baileys");
          console.log("📊 Results:", result.results);
        } else {
          console.error("❌ Baileys server error:", result.error);
          // Continue execution - don't fail the entire request
        }
      } else {
        console.log("⚠️ Baileys server credentials not configured");
        console.log("ℹ️  Set BAILEYS_SERVER_URL and BAILEYS_API_KEY in Supabase secrets");
      }
    } catch (baileysError) {
      console.error("❌ Error connecting to Baileys server:", baileysError);
      // Continue execution - notification failure shouldn't block inquiry submission
    }

    // Generate fallback URLs (if API fails)
    const whatsappMessage = encodeURIComponent(whatsappMessageText);
    const whatsappUrl1 = `https://wa.me/${whatsappNumber1}?text=${whatsappMessage}`;
    const whatsappUrl2 = `https://wa.me/${whatsappNumber2}?text=${whatsappMessage}`;
    
    console.log("📱 Fallback WhatsApp URLs:");
    console.log("Kalp:", whatsappUrl1);
    console.log("Prasham:", whatsappUrl2);

    // Send email notification to company email
    const emailSubject = `New Inquiry: ${subject}`;
    const emailBody = `
      <html>
        <body style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #1a2e3e; border-bottom: 3px solid #d4af37; padding-bottom: 10px;">
              🔔 New Inquiry - KP Investment
            </h2>
            <div style="margin-top: 20px;">
              <p style="margin: 10px 0;"><strong style="color: #1a2e3e;">👤 Name:</strong> ${name}</p>
              <p style="margin: 10px 0;"><strong style="color: #1a2e3e;">📧 Email:</strong> ${email}</p>
              <p style="margin: 10px 0;"><strong style="color: #1a2e3e;">📱 Phone:</strong> ${phone || "Not provided"}</p>
              <p style="margin: 10px 0;"><strong style="color: #1a2e3e;">📋 Subject:</strong> ${subject}</p>
              <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #d4af37; border-radius: 5px;">
                <strong style="color: #1a2e3e;">💬 Message:</strong>
                <p style="margin-top: 10px; color: #333;">${message}</p>
              </div>
              <hr style="margin: 20px 0; border: none; border-top: 1px solid #e0e0e0;">
              <p style="margin: 10px 0; font-size: 12px; color: #666;">
                <strong>🕐 Time:</strong> ${new Date(timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
              </p>
              <p style="margin: 10px 0; font-size: 12px; color: #666;">
                <strong>🆔 Inquiry ID:</strong> ${inquiryId}
              </p>
            </div>
            <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e0e0e0; text-align: center;">
              <h3 style="color: #1a2e3e; margin-bottom: 15px;">Contact Client via WhatsApp:</h3>
              <a href="${whatsappUrl1}" style="display: inline-block; margin: 5px; padding: 12px 24px; background-color: #25D366; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
                Contact Kalp: +91 84697 97169
              </a>
              <br>
              <a href="${whatsappUrl2}" style="display: inline-block; margin: 5px; padding: 12px 24px; background-color: #25D366; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
                Contact Prasham: +91 70410 37428
              </a>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email using a simple API call
    // You can use SendGrid, Resend, or any other email service
    // For now, we'll use a placeholder that logs the email
    try {
      // TODO: Integrate with your preferred email service
      // Example with Resend (when you add API key):
      // const response = await fetch('https://api.resend.com/emails', {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': 'Bearer YOUR_RESEND_API_KEY',
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     from: 'noreply@kpinvestment.com',
      //     to: 'kpinvestment7781@gmail.com',
      //     subject: emailSubject,
      //     html: emailBody
      //   })
      // });
      
      console.log("Email would be sent to: kpinvestment7781@gmail.com");
      console.log("Email Subject:", emailSubject);
      console.log("Email Body:", emailBody);
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      // Don't fail the request if email fails
    }

    return c.json({ 
      success: true, 
      inquiryId,
      message: "Inquiry submitted successfully. Our team will contact you soon." 
    });

  } catch (error) {
    console.error("Error submitting inquiry:", error);
    return c.json({ error: "Failed to submit inquiry: " + error.message }, 500);
  }
});

// Get all inquiries (for admin use)
app.get("/make-server-822d295e/inquiries", async (c) => {
  try {
    const inquiries = await kv.getByPrefix("inquiry-");
    // Sort by timestamp, newest first
    inquiries.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    return c.json({ inquiries });
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    return c.json({ error: "Failed to fetch inquiries: " + error.message }, 500);
  }
});

Deno.serve(app.fetch);