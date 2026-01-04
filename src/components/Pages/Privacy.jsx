import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaShieldAlt,
  FaUserShield,
  FaDatabase,
  FaEye,
  FaLock,
  FaDownload,
  FaArrowLeft,
  FaCheckCircle,
  FaTimesCircle,
  FaEnvelope,
  FaCalendarAlt,
  FaGlobe
} from 'react-icons/fa';
import { MdPrivacyTip, MdDelete, MdEdit } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Privacy = () => {
  const [selectedSections, setSelectedSections] = useState([]);

  const privacySections = [
    {
      id: 1,
      title: "Information We Collect",
      icon: <FaDatabase />,
      content: "We collect information you provide directly to us, such as when you create an account, make payments, or contact us. This includes: your name, email address, phone number, billing address, payment information, and transaction history.",
      important: true
    },
    {
      id: 2,
      title: "How We Use Your Information",
      icon: <FaEye />,
      content: "We use the information we collect to: Process your bill payments, communicate with you about your account, provide customer support, improve our services, detect and prevent fraud, comply with legal obligations.",
      important: true
    },
    {
      id: 3,
      title: "Information Sharing",
      icon: <FaUserShield />,
      content: "We do not sell your personal information. We may share your information with: Payment processors to complete transactions, service providers who assist our operations, law enforcement when required by law, third parties during business transfers.",
      important: false
    },
    {
      id: 4,
      title: "Data Security",
      icon: <FaLock />,
      content: "We implement industry-standard security measures including: 256-bit SSL encryption, regular security audits, secure data storage, access controls, and employee training. However, no method of transmission over the internet is 100% secure.",
      important: true
    },
    {
      id: 5,
      title: "Your Rights",
      icon: <MdEdit />,
      content: "You have the right to: Access your personal data, correct inaccurate data, request deletion of your data, object to data processing, withdraw consent, and request data portability. Contact us to exercise these rights.",
      important: true
    },
    {
      id: 6,
      title: "Data Retention",
      icon: <FaCalendarAlt />,
      content: "We retain your personal data for as long as necessary to: Provide our services, comply with legal obligations, resolve disputes, and enforce agreements. Transaction records are retained for 7 years as required by law.",
      important: false
    },
    {
      id: 7,
      title: "International Transfers",
      icon: <FaGlobe />,
      content: "Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place and comply with applicable data protection laws for international data transfers.",
      important: false
    },
    {
      id: 8,
      title: "Children's Privacy",
      icon: <FaUserShield />,
      content: "Our services are not directed to individuals under 18. We do not knowingly collect personal information from children. If we become aware of such collection, we will take steps to delete it.",
      important: true
    }
  ];

  const handleToggleSection = (id) => {
    setSelectedSections(prev => 
      prev.includes(id) 
        ? prev.filter(sectionId => sectionId !== id)
        : [...prev, id]
    );
  };

  const handleDownloadPDF = () => {
    toast.success("Privacy Policy PDF downloaded successfully!");
  };

  const handleAcceptAll = () => {
    setSelectedSections(privacySections.map(section => section.id));
    toast.success("All privacy settings accepted!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-8 px-4 sm:px-6 lg:px-8">
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
            <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
              <MdPrivacyTip className="text-2xl text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Privacy Policy
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-4">
            Protecting your privacy is our top priority. Learn how we collect, use, and protect your data.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <FaCalendarAlt />
              <span>Effective: January 1, 2024</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500" />
              <span>GDPR Compliant</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <FaShieldAlt className="text-blue-500" />
              <span>Encrypted Data</span>
            </div>
          </div>
        </motion.div>

        {/* Quick Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 mb-8 border border-blue-200 dark:border-blue-800"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <FaShieldAlt className="text-blue-600 dark:text-blue-400" />
            Privacy Commitment
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <FaCheckCircle className="text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">No Data Selling</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">We never sell your data</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <FaLock className="text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Bank-Level Security</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">256-bit encryption</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <FaUserShield className="text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Full Control</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Manage your data rights</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Privacy Sections */}
        <div className="space-y-6 mb-8">
          {privacySections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`p-3 rounded-xl ${section.important ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-gray-100 dark:bg-gray-700'}`}>
                      <div className={`${section.important ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}>
                        {section.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {section.title}
                        </h3>
                        {section.important && (
                          <span className="px-2 py-1 text-xs bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-full">
                            Important
                          </span>
                        )}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {section.content}
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleToggleSection(section.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      selectedSections.includes(section.id)
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                    title={selectedSections.includes(section.id) ? "Selected" : "Select"}
                  >
                    {selectedSections.includes(section.id) ? (
                      <FaCheckCircle className="text-lg" />
                    ) : (
                      <FaCheckCircle className="text-lg opacity-50" />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Data Rights Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Your Data Protection Rights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {[
                { icon: <FaEye />, title: "Right to Access", desc: "Request copies of your data" },
                { icon: <MdEdit />, title: "Right to Rectify", desc: "Correct inaccurate information" },
                { icon: <MdDelete />, title: "Right to Erasure", desc: "Request data deletion" },
                { icon: <FaUserShield />, title: "Right to Object", desc: "Object to data processing" }
              ].map((right, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <div className="text-blue-600 dark:text-blue-400">{right.icon}</div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{right.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{right.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 rounded-xl p-6">
              <h4 className="font-bold text-gray-900 dark:text-white mb-3">Exercise Your Rights</h4>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                To exercise any of these rights, contact our Data Protection Officer:
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FaEnvelope className="text-blue-500" />
                  <span className="font-medium">dpo@billpie.com</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  We respond to all requests within 30 days
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6"
        >
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              Privacy Preferences
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {selectedSections.length} of {privacySections.length} sections selected
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleAcceptAll}
              className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Accept All
            </button>
            <button
              onClick={() => setSelectedSections([])}
              className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Clear All
            </button>
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors"
            >
              <FaDownload />
              Download PDF
            </button>
          </div>
        </motion.div>

        {/* Contact Information */}
        <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>For privacy-related inquiries, contact our Data Protection Officer at:</p>
          <p className="font-medium text-blue-600 dark:text-blue-400 mt-1">
            privacy@billpie.com
          </p>
          <p className="mt-2">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;