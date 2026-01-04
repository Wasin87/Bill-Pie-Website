import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaHeadset, 
  FaPhone, 
  FaEnvelope, 
  FaClock, 
  FaWhatsapp,
  FaTwitter,
  FaFacebookMessenger,
  FaPaperPlane,
  FaUser,
  FaStar,
  FaCheckCircle,
  FaArrowLeft,
  FaLifeRing
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Help = () => {
  const [activeTab, setActiveTab] = useState('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const supportChannels = [
    {
      title: "Email Support",
      icon: <FaEnvelope />,
      description: "Get detailed assistance via email",
      contact: "support@billpie.com",
      responseTime: "Within 24 hours",
      color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
    },
    {
      title: "Phone Support",
      icon: <FaPhone />,
      description: "Speak directly with our team",
      contact: "+880 1234 567890",
      responseTime: "9 AM - 6 PM (GMT+6)",
      color: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
    },
    {
      title: "Live Chat",
      icon: <FaWhatsapp />,
      description: "Instant chat support",
      contact: "WhatsApp: +880 1234 567891",
      responseTime: "Instant response",
      color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
    },
    {
      title: "Social Media",
      icon: <FaTwitter />,
      description: "Connect with us on social platforms",
      contact: "@BillPieSupport",
      responseTime: "Within 2 hours",
      color: "bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400"
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    toast.success("Your support request has been submitted successfully!");
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition-shadow text-gray-700 dark:text-gray-300"
          >
            <FaArrowLeft />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-linear-to-r from-blue-500 to-cyan-500 rounded-xl">
              <FaHeadset className="text-2xl text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Help & Support
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We're here to help you! Choose your preferred support channel below
          </p>
        </motion.div>

        {/* Support Channels */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {supportChannels.map((channel, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center"
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center ${channel.color.split(' ')[0]} ${channel.color.split(' ')[1]}`}>
                <div className={`${channel.color.split(' ')[2]} ${channel.color.split(' ')[3]}`}>
                  {channel.icon}
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {channel.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                {channel.description}
              </p>
              <div className="space-y-2">
                <p className="font-medium text-gray-900 dark:text-white">
                  {channel.contact}
                </p>
                <div className="flex items-center justify-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                  <FaClock className="text-xs" />
                  <span>{channel.responseTime}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setActiveTab('contact')}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'contact'
                  ? 'bg-linear-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Contact Form
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'faq'
                  ? 'bg-linear-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Quick FAQs
            </button>
            <button
              onClick={() => setActiveTab('status')}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'status'
                  ? 'bg-linear-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              System Status
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'contact' && (
              <motion.div
                key="contact"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Send us a Message
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <FaUser className="inline mr-2 text-blue-500" />
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <FaEnvelope className="inline mr-2 text-blue-500" />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="What is this regarding?"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Describe your issue in detail..."
                      required
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold rounded-xl transition-all"
                    >
                      <FaPaperPlane />
                      Send Message
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {activeTab === 'faq' && (
              <motion.div
                key="faq"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Frequently Asked Questions
                </h3>
                
                <div className="space-y-4">
                  {[
                    {
                      q: "How do I pay my bills?",
                      a: "Go to the 'All Bills' page, select your bill, and click 'Pay Now'. Follow the payment instructions."
                    },
                    {
                      q: "What payment methods are accepted?",
                      a: "We accept all major credit/debit cards, bKash, Nagad, Rocket, and bank transfers."
                    },
                    {
                      q: "How can I view my payment history?",
                      a: "Visit 'My Pay Bills' section in your dashboard to view complete payment history."
                    },
                    {
                      q: "Is my payment information secure?",
                      a: "Yes, we use bank-level SSL encryption and never store your payment details."
                    },
                    {
                      q: "Can I get a refund?",
                      a: "Refunds are processed within 7-14 business days. Contact support for refund requests."
                    }
                  ].map((faq, index) => (
                    <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <FaCheckCircle className="text-green-500 mt-1" />
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                            {faq.q}
                          </h4>
                          <p className="text-gray-700 dark:text-gray-300">
                            {faq.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'status' && (
              <motion.div
                key="status"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  System Status & Maintenance
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">Payment System</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Operational</p>
                      </div>
                    </div>
                    <span className="font-bold text-green-600 dark:text-green-400">100%</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">API Services</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Operational</p>
                      </div>
                    </div>
                    <span className="font-bold text-green-600 dark:text-green-400">100%</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">Mobile App</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Under Maintenance</p>
                      </div>
                    </div>
                    <span className="font-bold text-yellow-600 dark:text-yellow-400">85%</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Support Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-linear-to-r from-blue-500/10 to-cyan-500/10 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <FaLifeRing className="text-blue-600 dark:text-blue-400" />
            Tips for Getting Help Faster
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <FaStar className="text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Be Specific</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Include bill ID, amount, and transaction date
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <FaEnvelope className="text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Check Email</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  We always respond to your registered email
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <FaClock className="text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Response Time</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  We aim to respond within 2 hours during business hours
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Help;