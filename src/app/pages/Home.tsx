import { Link } from "react-router";
import {
  TrendingUp,
  Shield,
  Users,
  Award,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export function Home() {
  const services = [
    {
      icon: TrendingUp,
      title: "Unlisted Shares",
      description:
        "Access pre-IPO opportunities with expert valuation and market insights.",
    },
    {
      icon: Shield,
      title: "IPO Funding",
      description:
        "Secure funding solutions for participating in promising IPOs.",
    },
    {
      icon: Users,
      title: "Portfolio Management",
      description:
        "Customized strategies to grow and protect your investments.",
    },
  ];

  const stats = [
    { number: "500+", label: "Happy Clients" },
    { number: "₹10Cr+", label: "Assets Under Management" },
    { number: "8+", label: "Years of Experience" },
    { number: "98%", label: "Client Satisfaction" },
  ];

  const benefits = [
    "Expert Market Analysis",
    "Personalized Investment Strategies",
    "Transparent Communication",
    "Risk Management",
    "Regular Portfolio Reviews",
    "Dedicated Support Team",
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a2e3e] to-[#0f1921]" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#d4af37] rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#d4af37] rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6 text-white">
              Your Trusted Partner in{" "}
              <span className="text-[#d4af37]">Investment Excellence</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Empowering investors with expert guidance in unlisted shares, IPO
              funding, and portfolio management. Building wealth through trust
              and expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-[#d4af37] text-[#0f1921] px-8 py-4 rounded-lg hover:bg-[#c4a030] transition-colors inline-flex items-center justify-center gap-2"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/services"
                className="border border-[#d4af37] text-[#d4af37] px-8 py-4 rounded-lg hover:bg-[#d4af37] hover:text-[#0f1921] transition-colors inline-flex items-center justify-center"
              >
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-[#1a2e3e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-4 text-white">
              Our <span className="text-[#d4af37]">Services</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Comprehensive investment solutions tailored to your financial
              goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-[#0f1921] p-8 rounded-lg border border-[#d4af37]/20 hover:border-[#d4af37] transition-all"
              >
                <div className="w-16 h-16 bg-[#d4af37]/10 rounded-lg flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-[#d4af37]" />
                </div>
                <h3 className="text-xl mb-4 text-white">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[#0f1921]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl text-[#d4af37] mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-[#1a2e3e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl mb-6 text-white">
                Why Choose{" "}
                <span className="text-[#d4af37]">KP Investment?</span>
              </h2>
              <p className="text-gray-300 mb-8">
                We combine years of market expertise with innovative investment
                strategies to deliver exceptional results. Your financial
                success is our mission, and your trust is our foundation.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#d4af37] flex-shrink-0" />
                    <span className="text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#0f1921] p-8 rounded-lg border border-[#d4af37]/20">
              <Award className="w-16 h-16 text-[#d4af37] mb-6" />
              <h3 className="text-2xl mb-4 text-white">
                Unshakable Trust
              </h3>
              <p className="text-gray-400 mb-6">
                "When years of seasoned experience meet youthful energy, it
                gives birth to 'Unshakable Trust.'"
              </p>
              <p className="text-gray-300">
                Our commitment to your financial security goes beyond numbers.
                We respect the hard work behind every rupee you earn and
                dedicate ourselves to safeguarding your future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#1a2e3e] to-[#0f1921]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl mb-6 text-white">
            Ready to Start Your{" "}
            <span className="text-[#d4af37]">Investment Journey?</span>
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            Let's discuss how we can help you achieve your financial goals.
          </p>
          <Link
            to="/contact"
            className="bg-[#d4af37] text-[#0f1921] px-8 py-4 rounded-lg hover:bg-[#c4a030] transition-colors inline-flex items-center gap-2"
          >
            Contact Us Today
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
