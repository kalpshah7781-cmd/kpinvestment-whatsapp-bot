import { Link, useLocation, Outlet } from "react-router";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Phone,
  Mail,
  ChevronDown,
} from "lucide-react";
import logo from "figma:asset/90d647075848a9ba11e817bb8f32d8f31356c737.png";
import { WhatsAppButton } from "./WhatsAppButton";

export function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[#0f1921] text-white">
      {/* Header */}
      <header className="fixed w-full top-0 z-50 bg-[#1a2e3e] border-b border-[#d4af37]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img
                src={logo}
                alt="KP Investment"
                className="h-12"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`transition-colors ${
                    isActive(item.path)
                      ? "text-[#d4af37]"
                      : "text-white hover:text-[#d4af37]"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Contact Info */}
            <div className="hidden lg:flex items-center gap-6">
              <a
                href="tel:+918469797169"
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-[#d4af37] transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>+91 84697 97169</span>
              </a>
              <a
                href="mailto:kpinvestment7781@gmail.com"
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-[#d4af37] transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>kpinvestment7781@gmail.com</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#1a2e3e] border-t border-[#d4af37]/20">
            <nav className="px-4 py-4 space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-2 transition-colors ${
                    isActive(item.path)
                      ? "text-[#d4af37]"
                      : "text-white hover:text-[#d4af37]"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-[#d4af37]/20 space-y-3">
                <a
                  href="tel:+918469797169"
                  className="flex items-center gap-2 text-sm text-gray-300"
                >
                  <Phone className="w-4 h-4" />
                  <span>+91 84697 97169</span>
                </a>
                <a
                  href="mailto:kpinvestment7781@gmail.com"
                  className="flex items-center gap-2 text-sm text-gray-300"
                >
                  <Mail className="w-4 h-4" />
                  <span>kpinvestment7781@gmail.com</span>
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-20">
        <Outlet />
      </main>

      {/* WhatsApp Button */}
      <WhatsAppButton />

      {/* Footer */}
      <footer className="bg-[#1a2e3e] border-t border-[#d4af37]/20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <img
                src={logo}
                alt="KP Investment"
                className="h-12 mb-4"
              />
              <p className="text-gray-400 max-w-md">
                Empowering investors with expert guidance in
                unlisted shares, IPO funding, and portfolio
                management. Your trusted partner for financial
                growth.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-[#d4af37] mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className="text-gray-400 hover:text-[#d4af37] transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold text-[#d4af37] mb-4">
                Contact Us
              </h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="tel:+918469797169"
                    className="flex items-start gap-2 hover:text-[#d4af37] transition-colors"
                  >
                    <Phone className="w-4 h-4 mt-1 flex-shrink-0" />
                    <span>+91 84697 97169</span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:kpinvestment7781@gmail.com"
                    className="flex items-start gap-2 hover:text-[#d4af37] transition-colors"
                  >
                    <Mail className="w-4 h-4 mt-1 flex-shrink-0" />
                    <span>kpinvestment7781@gmail.com</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#d4af37]/20 mt-8 pt-8 text-center text-gray-400">
            <p>© 2026 KP Investment. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}