import { TrendingUp, Shield, BarChart3, CheckCircle } from "lucide-react";

export function Services() {
  const services = [
    {
      icon: TrendingUp,
      title: "Unlisted Shares",
      description:
        "Gain access to high-growth potential companies before they go public.",
      features: [
        "Pre-IPO investment opportunities",
        "Expert valuation and analysis",
        "Market insights and trends",
        "Due diligence support",
        "Liquidity solutions",
        "Portfolio diversification",
      ],
    },
    {
      icon: Shield,
      title: "IPO Funding",
      description:
        "Secure the capital you need to participate in promising initial public offerings.",
      features: [
        "Competitive funding rates",
        "Quick approval process",
        "Flexible repayment options",
        "IPO application support",
        "Risk assessment",
        "Market opportunity analysis",
      ],
    },
    {
      icon: BarChart3,
      title: "Portfolio Management",
      description:
        "Professional management of your investment portfolio for optimal growth.",
      features: [
        "Customized investment strategies",
        "Regular performance reviews",
        "Risk management",
        "Tax optimization",
        "Rebalancing services",
        "Dedicated relationship manager",
      ],
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a2e3e] to-[#0f1921]" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37] rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl mb-6 text-white">
              Our <span className="text-[#d4af37]">Services</span>
            </h1>
            <p className="text-lg text-gray-300">
              Comprehensive investment solutions designed to help you achieve
              your financial goals with confidence and security.
            </p>
          </div>
        </div>
      </section>

      {/* Services Detail Section */}
      <section className="py-20 bg-[#0f1921]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {services.map((service, index) => (
              <div
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="w-20 h-20 bg-[#d4af37]/10 rounded-lg flex items-center justify-center mb-6">
                    <service.icon className="w-10 h-10 text-[#d4af37]" />
                  </div>
                  <h2 className="text-3xl md:text-4xl mb-4 text-white">
                    {service.title}
                  </h2>
                  <p className="text-gray-300 text-lg mb-6">
                    {service.description}
                  </p>
                </div>

                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="bg-[#1a2e3e] p-8 rounded-lg border border-[#d4af37]/20">
                    <h3 className="text-xl mb-6 text-[#d4af37]">
                      Key Features
                    </h3>
                    <div className="space-y-4">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-[#1a2e3e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-4 text-white">
              Our <span className="text-[#d4af37]">Process</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              A streamlined approach to help you get started
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Consultation",
                description: "Understand your goals and requirements",
              },
              {
                step: "02",
                title: "Analysis",
                description: "Evaluate opportunities and create strategy",
              },
              {
                step: "03",
                title: "Execution",
                description: "Implement the investment plan",
              },
              {
                step: "04",
                title: "Monitoring",
                description: "Regular reviews and adjustments",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="text-center bg-[#0f1921] p-6 rounded-lg border border-[#d4af37]/20"
              >
                <div className="text-4xl text-[#d4af37] mb-4">{item.step}</div>
                <h3 className="text-xl mb-3 text-white">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
