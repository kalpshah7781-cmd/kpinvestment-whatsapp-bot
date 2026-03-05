import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  MessageSquare,
} from "lucide-react";
import { projectId, publicAnonKey } from "/utils/supabase/info";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [showPhoneModal, setShowPhoneModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      // Submit to backend
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-822d295e/submit-inquiry`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit inquiry");
      }

      // Success - show message to client
      setSubmitStatus({
        type: "success",
        message:
          "Thank you for contacting us! We have received your inquiry and will get back to you within 24 hours.",
      });

      // Clear form
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });

    } catch (error) {
      console.error("Error submitting inquiry:", error);
      setSubmitStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Failed to submit inquiry. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+91 84697 97169", "+91 70410 37428"],
      buttonText: "Call Now",
      isPhone: true,
    },
    {
      icon: Mail,
      title: "Email",
      details: ["kpinvestment7781@gmail.com"],
      href: "mailto:kpinvestment7781@gmail.com",
      buttonText: "Send Email",
      isExternal: false,
      isPhone: false,
    },
    {
      icon: MapPin,
      title: "Office Locations",
      details: ["601, Jolly Plaza, Athwagate", "Surat - 395007"],
      href: "https://www.google.com/maps/search/?api=1&query=601+Jolly+Plaza+Athwagate+Surat+395007",
      buttonText: "View on Map",
      isExternal: true,
      isPhone: false,
    },
    {
      icon: MapPin,
      title: "Second Office",
      details: ["329, Diamond Village, Mahidharpura", "Surat - 395003"],
      href: "https://www.google.com/maps/search/?api=1&query=329+Diamond+Village+Mahidharpura+Surat+395003",
      buttonText: "View on Map",
      isExternal: true,
      isPhone: false,
    },
  ];

  const faqs = [
    {
      question: "What services do you offer?",
      answer:
        "We specialize in unlisted shares trading, IPO funding solutions, and comprehensive portfolio management services.",
    },
    {
      question: "How can I start investing with KP Investment?",
      answer:
        "Simply fill out the contact form or call us directly. Our team will schedule a consultation to understand your investment goals and create a customized strategy.",
    },
    {
      question: "What is the minimum investment amount?",
      answer:
        "The minimum investment varies depending on the service. Please contact us for specific details based on your investment interests.",
    },
    {
      question: "How do you ensure the security of my investments?",
      answer:
        "We follow strict due diligence processes, maintain transparent communication, and provide regular portfolio reviews to ensure your investments are secure and performing well.",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a2e3e] to-[#0f1921]" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#d4af37] rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl mb-6 text-white">
              Get In <span className="text-[#d4af37]">Touch</span>
            </h1>
            <p className="text-lg text-gray-300">
              Have questions? We'd love to hear from you. Send us a message and
              we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-20 bg-[#0f1921]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {contactInfo.map((item, index) => (
              <div
                key={index}
                className="bg-[#1a2e3e] p-6 rounded-lg border border-[#d4af37]/20 text-center"
              >
                <div className="w-12 h-12 bg-[#d4af37]/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-[#d4af37]" />
                </div>
                <h3 className="text-lg mb-3 text-white">{item.title}</h3>
                {item.details.map((detail, idx) => (
                  <p key={idx} className="text-gray-400 text-sm">
                    {detail}
                  </p>
                ))}
                {item.isPhone ? (
                  <button
                    onClick={() => setShowPhoneModal(true)}
                    className="mt-4 inline-block bg-[#d4af37] text-[#0f1921] px-4 py-2 rounded-lg hover:bg-[#c4a030] transition-colors font-semibold"
                  >
                    {item.buttonText}
                  </button>
                ) : (
                  <a
                    href={item.href}
                    target={item.isExternal ? "_blank" : undefined}
                    rel={item.isExternal ? "noopener noreferrer" : undefined}
                    className="mt-4 inline-block bg-[#d4af37] text-[#0f1921] px-4 py-2 rounded-lg hover:bg-[#c4a030] transition-colors font-semibold"
                  >
                    {item.buttonText}
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Phone Selection Modal */}
          {showPhoneModal && (
            <div
              className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4"
              onClick={() => setShowPhoneModal(false)}
            >
              <div
                className="bg-[#1a2e3e] p-8 rounded-lg border border-[#d4af37]/20 max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-2xl mb-6 text-white text-center">
                  Choose a number to <span className="text-[#d4af37]">call</span>
                </h3>
                <div className="space-y-4">
                  <a
                    href="tel:+918469797169"
                    className="block bg-[#d4af37] text-[#0f1921] px-6 py-4 rounded-lg hover:bg-[#c4a030] transition-colors font-semibold text-center"
                    onClick={() => setShowPhoneModal(false)}
                  >
                    <div className="flex items-center justify-center gap-3">
                      <Phone className="w-5 h-5" />
                      <div className="text-lg">+91 84697 97169</div>
                    </div>
                  </a>
                  <a
                    href="tel:+917041037428"
                    className="block bg-[#d4af37] text-[#0f1921] px-6 py-4 rounded-lg hover:bg-[#c4a030] transition-colors font-semibold text-center"
                    onClick={() => setShowPhoneModal(false)}
                  >
                    <div className="flex items-center justify-center gap-3">
                      <Phone className="w-5 h-5" />
                      <div className="text-lg">+91 70410 37428</div>
                    </div>
                  </a>
                </div>
                <button
                  onClick={() => setShowPhoneModal(false)}
                  className="mt-6 w-full text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Contact Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="w-16 h-16 bg-[#d4af37]/10 rounded-lg flex items-center justify-center mb-6">
                <MessageSquare className="w-8 h-8 text-[#d4af37]" />
              </div>
              <h2 className="text-3xl md:text-4xl mb-6 text-white">
                Send Us a <span className="text-[#d4af37]">Message</span>
              </h2>
              <p className="text-gray-300 mb-8">
                Fill out the form and our team will get back to you within 24
                hours. We look forward to discussing your investment needs.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm mb-2 text-gray-300"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#1a2e3e] border border-[#d4af37]/20 rounded-lg focus:outline-none focus:border-[#d4af37] text-white"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm mb-2 text-gray-300"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#1a2e3e] border border-[#d4af37]/20 rounded-lg focus:outline-none focus:border-[#d4af37] text-white"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm mb-2 text-gray-300"
                    >
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#1a2e3e] border border-[#d4af37]/20 rounded-lg focus:outline-none focus:border-[#d4af37] text-white"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm mb-2 text-gray-300"
                  >
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#1a2e3e] border border-[#d4af37]/20 rounded-lg focus:outline-none focus:border-[#d4af37] text-white"
                  >
                    <option value="">Select a subject</option>
                    <option value="unlisted-shares">Unlisted Shares</option>
                    <option value="ipo-funding">IPO Funding</option>
                    <option value="portfolio-management">
                      Portfolio Management
                    </option>
                    <option value="general-inquiry">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm mb-2 text-gray-300"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-[#1a2e3e] border border-[#d4af37]/20 rounded-lg focus:outline-none focus:border-[#d4af37] text-white resize-none"
                    placeholder="Tell us about your investment goals..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#d4af37] text-[#0f1921] px-8 py-4 rounded-lg hover:bg-[#c4a030] transition-colors flex items-center justify-center gap-2"
                >
                  Send Message
                  <Send className="w-5 h-5" />
                </button>

                {isSubmitting && (
                  <p className="text-gray-400 text-sm mt-2">Submitting...</p>
                )}

                {submitStatus.type === "success" && (
                  <p className="text-green-400 text-sm mt-2">
                    {submitStatus.message}
                  </p>
                )}

                {submitStatus.type === "error" && (
                  <p className="text-red-400 text-sm mt-2">
                    {submitStatus.message}
                  </p>
                )}
              </form>
            </div>

            {/* FAQ Section */}
            <div className="bg-[#1a2e3e] p-8 rounded-lg border border-[#d4af37]/20">
              <h3 className="text-2xl mb-6 text-white">
                Frequently Asked{" "}
                <span className="text-[#d4af37]">Questions</span>
              </h3>
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index}>
                    <h4 className="text-lg mb-2 text-white">{faq.question}</h4>
                    <p className="text-gray-400 text-sm">{faq.answer}</p>
                    {index < faqs.length - 1 && (
                      <div className="mt-6 border-t border-[#d4af37]/20" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}