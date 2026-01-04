import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaShieldAlt, 
  FaFileContract, 
  FaUserShield, 
  FaLock, 
  FaBalanceScale,
  FaCheckCircle,
  FaExclamationTriangle,
  FaArrowLeft,
  FaDownload
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Term = () => {
  const [accepted, setAccepted] = useState(false);

  const sections = [
    {
      title: "Acceptance of Terms",
      icon: <FaCheckCircle />,
      content: "By accessing and using Bill Pie, you accept and agree to be bound by the terms and provision of this agreement. Additionally, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services."
    },
    {
      title: "User Responsibilities",
      icon: <FaUserShield />,
      content: "You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer. You agree to accept responsibility for all activities that occur under your account or password."
    },
    {
      title: "Payment Terms",
      icon: <FaFileContract />,
      content: "All payments made through Bill Pie are processed through secure third-party payment processors. We are not responsible for any issues arising from payment processing. Payments are non-refundable except as required by law or as explicitly stated in these terms."
    },
    {
      title: "Data Security",
      icon: <FaLock />,
      content: "We implement industry-standard security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security of your data."
    },
    {
      title: "Intellectual Property",
      icon: <FaShieldAlt />,
      content: "All content included on this site, such as text, graphics, logos, button icons, images, audio clips, digital downloads, data compilations, and software, is the property of Bill Pie or its content suppliers and protected by international copyright laws."
    },
    {
      title: "Limitation of Liability",
      icon: <FaBalanceScale />,
      content: "Bill Pie shall not be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service."
    }
  ];

  const handleAccept = () => {
    setAccepted(true);
    toast.success("Terms and Conditions accepted successfully!");
  };

  const handleDownloadPDF = () => {
    toast.info("PDF download will be implemented soon!");
    // PDF generation logic here
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-amber-50 dark:from-gray-900 dark:to-gray-800 py-8 px-4 sm:px-6 lg:px-8">
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
            <div className="p-3 bg-linear-to-r from-amber-500 to-orange-500 rounded-xl">
              <FaFileContract className="text-2xl text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Terms & Conditions
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Please read these terms and conditions carefully before using our services
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <FaExclamationTriangle className="text-amber-500" />
            <span>Last updated: {new Date().toLocaleDateString()}</span>
          </div>
        </motion.div>

        {/* Content Sections */}
        <div className="space-y-6 mb-8">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-xl">
                    <div className="text-amber-600 dark:text-amber-400">
                      {section.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {section.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Important Points */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-linear-to-r from-amber-500/10 to-orange-500/10 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-6 mb-8 border border-amber-200 dark:border-amber-800"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <FaExclamationTriangle className="text-amber-600 dark:text-amber-400" />
            Important Points to Note
          </h3>
          <ul className="space-y-3">
            {[
              "You must be at least 18 years old to use our services",
              "We reserve the right to modify these terms at any time",
              "Continued use of the service constitutes acceptance of updated terms",
              "Violation of terms may result in account suspension or termination",
              "All transactions are logged and monitored for security purposes"
            ].map((point, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                <span className="text-gray-700 dark:text-gray-300">{point}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Acceptance Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Agreement Acceptance
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                By using our services, you acknowledge that you have read and understood these terms
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleDownloadPDF}
                className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                <FaDownload />
                Download PDF
              </button>
              
              <button
                onClick={handleAccept}
                disabled={accepted}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-colors ${
                  accepted 
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 cursor-not-allowed'
                    : 'bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white'
                }`}
              >
                <FaCheckCircle />
                {accepted ? 'Accepted' : 'Accept Terms'}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Contact Information */}
        <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>For any questions regarding these terms, please contact us at:</p>
          <p className="font-medium text-amber-600 dark:text-amber-400 mt-1">
            legal@billpie.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default Term;