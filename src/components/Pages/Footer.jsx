import React from "react";
import { 
  FaFacebookF, 
  FaLinkedinIn, 
  FaGithub, 
  FaInstagram,
  FaArrowRight,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCreditCard,
  FaShieldAlt,
  FaHeadset
} from "react-icons/fa";
import { BsTwitterX, BsFillSendFill } from "react-icons/bs";
import { FiMail } from "react-icons/fi";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FaFacebookF />, href: "https://www.facebook.com/wasin.ahmed.79", label: "Facebook", color: "hover:bg-amber-600 text-amber-600 hover:text-white" },
     
    { icon: <FaLinkedinIn />, href: "https://www.linkedin.com/in/md-wasin-ahmed/", label: "LinkedIn", color: "hover:bg-amber-700 text-amber-700 hover:text-white" },
    { icon: <FaGithub />, href: "https://github.com/Wasin87", label: "GitHub", color: "hover:bg-amber-600 text-black dark:text-white dark:hover:text-amber-600 hover:text-white" },
     
  ];

  const servicesLinks = [
    { name: "Bill Payment", path: "/allBills", icon: <FaCreditCard className="text-xs" /> },
    { name: "Payment History", path: "/myPayBil", icon: <FaCreditCard className="text-xs" /> },
    { name: "Dashboard", path: "/dashboard", icon: <FaShieldAlt className="text-xs" /> },
    { name: "Customer Support", path: "/customer-support", icon: <FaHeadset className="text-xs" /> },
  ];

  const companyLinks = [
    { name: "About Us", path: "/about" },
    { name: "Terms & Conditions", path: "/terms" },
    { name: "Help & Support", path: "/help" },
    { name: "FAQ", path: "/faq" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", path: "/privacy" },
     
    { name: "Cookie Policy", path: "/cookies" },
    { name: "Security", path: "/security" },
  ];

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    alert("Thank you for subscribing to our newsletter!");
  };

  return (
    <footer className="relative bg-gradient-to-b from-gray-50 to-amber-50 dark:from-gray-900 dark:to-gray-800 border-t border-gray-200 dark:border-gray-800 mt-auto">
      {/* Top decorative border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500"></div>
      
      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-12 pb-8">
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-8 shadow-xl mb-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold text-white mb-2">
                Stay Updated with Bill Management
              </h3>
              <p className="text-amber-100 max-w-xl">
                Subscribe to our newsletter for the latest updates, tips, and exclusive offers.
              </p>
            </div>
            
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <div className="relative flex-1">
                <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-amber-200 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-white text-amber-700 font-bold rounded-xl hover:bg-amber-50 transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <BsFillSendFill />
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <img
                  className="w-14 h-14 rounded-4xl bg-white dark:bg-gray-800 p-2 border-2 border-amber-500  shadow-lg"
                  src={logo}
                  alt="Bill Pie Logo"
                />
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">✓</span>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-1">
                  Bill <span className="text-amber-600 dark:text-amber-400">Pie</span>
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Smart Bill Management
                </p>
              </div>
            </div>

            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              Your trusted partner for seamless utility bill management. Pay, track, and manage all your bills in one place.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 mt-4">
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <FaEnvelope className="text-amber-500" />
                <span className="text-sm">support@billpie.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <FaPhone className="text-amber-500" />
                <span className="text-sm">+880 1234 567890</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <FaMapMarkerAlt className="text-amber-500" />
                <span className="text-sm">Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <FaCreditCard className="text-amber-500" />
              Services
            </h3>
            <ul className="space-y-2">
              {servicesLinks.map((service, index) => (
                <li key={index}>
                  <Link
                    to={service.path}
                    className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <FaArrowRight className="text-xs" />
                    </span>
                    {service.icon}
                    <span>{service.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-gray-400 rounded-full group-hover:bg-amber-500"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Social */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Legal
            </h3>
            <ul className="space-y-2 mb-6">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Media */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                Follow Us
              </h4>
              <div className="flex gap-2">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-xl border border-gray-300 dark:border-gray-700 flex items-center justify-center transition-all duration-300 hover:scale-110 ${social.color.split(' ')[0]} ${social.color.split(' ')[1]}`}
                    aria-label={social.label}
                    title={social.label}
                  >
                    <div className={`${social.color.split(' ')[2]}`}>
                      {social.icon}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                &copy; {currentYear} Bill Pie Industries Ltd. All rights reserved.
              </p>
              <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">
                Designed with ❤️ for seamless bill management
              </p>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>System Status: <span className="font-semibold text-green-600 dark:text-green-400">Operational</span></span>
              </div>
              <span className="hidden md:inline">|</span>
              <span>Version 2.1.0</span>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-gray-500 dark:text-gray-500">
            <span className="text-sm">Accepted Payment Methods:</span>
            <div className="flex gap-2">
              <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs font-medium">
                Visa
              </div>
              <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs font-medium">
                MasterCard
              </div>
              <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs font-medium">
                bKash
              </div>
              <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs font-medium">
                Nagad
              </div>
              <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs font-medium">
                Rocket
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center z-50"
        aria-label="Back to top"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </footer>
  );
};

export default Footer;