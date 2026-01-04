import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaShieldAlt,
  FaLock,
  FaUserShield,
  FaFingerprint,
  FaHistory,
  FaBell,
  FaDownload,
  FaArrowLeft,
  FaCheckCircle,
  FaTimesCircle,
  FaServer,
  FaNetworkWired,
  FaUserCheck,
  FaKey
} from 'react-icons/fa';
import { MdSecurity, MdVerifiedUser, MdWarning } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Security = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState('30');

  const securityFeatures = [
    {
      title: "Bank-Level Encryption",
      icon: <FaLock />,
      description: "All data is encrypted using 256-bit SSL encryption, the same standard used by banks and financial institutions.",
      status: "active",
      level: "High"
    },
    {
      title: "Two-Factor Authentication",
      icon: <FaFingerprint />,
      description: "Add an extra layer of security to your account with 2FA via SMS or authenticator apps.",
      status: twoFactorEnabled ? "active" : "inactive",
      level: "Critical"
    },
    {
      title: "Regular Security Audits",
      icon: <FaShieldAlt />,
      description: "We conduct regular security audits and penetration testing to identify and fix vulnerabilities.",
      status: "active",
      level: "High"
    },
    {
      title: "Secure Data Centers",
      icon: <FaServer />,
      description: "Our data is stored in ISO 27001 certified data centers with 24/7 monitoring and physical security.",
      status: "active",
      level: "High"
    },
    {
      title: "Payment Card Security",
      icon: <MdVerifiedUser />,
      description: "We are PCI DSS compliant and never store your complete card details on our servers.",
      status: "active",
      level: "Critical"
    },
    {
      title: "Login Activity Monitoring",
      icon: <FaHistory />,
      description: "We monitor all login attempts and alert you of suspicious activity from new devices.",
      status: loginAlerts ? "active" : "inactive",
      level: "Medium"
    }
  ];

  const securityTips = [
    "Use a strong, unique password for your account",
    "Enable two-factor authentication for added security",
    "Never share your login credentials with anyone",
    "Log out from shared or public computers",
    "Regularly review your account activity",
    "Keep your contact information up to date"
  ];

  const handleToggle2FA = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    toast.success(`Two-factor authentication ${!twoFactorEnabled ? 'enabled' : 'disabled'}`);
  };

  const handleToggleAlerts = () => {
    setLoginAlerts(!loginAlerts);
    toast.success(`Login alerts ${!loginAlerts ? 'enabled' : 'disabled'}`);
  };

  const handleDownloadReport = () => {
    toast.success("Security report downloaded successfully!");
  };

  const getStatusColor = (status) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
      : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
  };

  const getLevelColor = (level) => {
    switch(level) {
      case 'Critical': return 'bg-red-500';
      case 'High': return 'bg-amber-500';
      case 'Medium': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4 sm:px-6 lg:px-8">
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
            <div className="p-3 bg-linear-to-r from-green-500 to-emerald-500 rounded-xl">
              <MdSecurity className="text-2xl text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Security Policy
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Your security is our highest priority. Learn about the measures we take to protect your data.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded-full">
              <FaCheckCircle className="text-green-600 dark:text-green-400" />
              <span className="text-sm font-medium text-green-800 dark:text-green-300">PCI DSS Compliant</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <FaCheckCircle className="text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-800 dark:text-blue-300">ISO 27001 Certified</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 rounded-full">
              <FaCheckCircle className="text-purple-600 dark:text-purple-400" />
              <span className="text-sm font-medium text-purple-800 dark:text-purple-300">GDPR Compliant</span>
            </div>
          </div>
        </motion.div>

        {/* Security Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-linear-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white mb-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2">Security Status: Excellent</h3>
              <p className="text-green-100">
                All critical security systems are active and monitoring your account
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold">99.9%</div>
                <div className="text-sm text-green-200">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">0</div>
                <div className="text-sm text-green-200">Security Incidents</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">24/7</div>
                <div className="text-sm text-green-200">Monitoring</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Security Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                  <div className="text-green-600 dark:text-green-400">
                    {feature.icon}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(feature.status)}`}>
                    {feature.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded-full text-white ${getLevelColor(feature.level)}`}>
                    {feature.level}
                  </span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                {feature.description}
              </p>
              {(feature.title === "Two-Factor Authentication" || feature.title === "Login Activity Monitoring") && (
                <button
                  onClick={feature.title === "Two-Factor Authentication" ? handleToggle2FA : handleToggleAlerts}
                  className={`w-full py-2 rounded-lg font-medium transition-colors ${
                    feature.status === 'active'
                      ? 'bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-700 dark:text-red-300'
                      : 'bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-900/50 text-green-700 dark:text-green-300'
                  }`}
                >
                  {feature.status === 'active' ? 'Disable' : 'Enable'}
                </button>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Security Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Security Settings
          </h3>
          
          <div className="space-y-6">
            {/* Session Timeout */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <FaUserCheck className="inline mr-2 text-blue-500" />
                Session Timeout
              </label>
              <div className="flex items-center gap-4">
                <select
                  value={sessionTimeout}
                  onChange={(e) => setSessionTimeout(e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="120">2 hours</option>
                </select>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Automatically log out after {sessionTimeout} minutes of inactivity
                </span>
              </div>
            </div>

            {/* Password Requirements */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
              <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <FaKey className="text-amber-500" />
                Password Requirements
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {[
                  "Minimum 8 characters",
                  "At least one uppercase letter",
                  "At least one number",
                  "At least one special character",
                  "Not used in last 5 passwords",
                  "Changed every 90 days"
                ].map((req, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500 text-sm" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{req}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Security Tips & Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Security Tips */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-linear-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-6 border border-amber-200 dark:border-amber-800"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <MdWarning className="text-amber-600 dark:text-amber-400" />
              Security Tips for You
            </h3>
            <ul className="space-y-3">
              {securityTips.map((tip, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                  <span className="text-gray-700 dark:text-gray-300">{tip}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Quick Security Actions
            </h3>
            <div className="space-y-4">
              <button
                onClick={handleToggle2FA}
                className="w-full flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FaFingerprint className="text-blue-600 dark:text-blue-400" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {twoFactorEnabled ? 'Enabled' : 'Disabled'}
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 text-xs rounded-full ${twoFactorEnabled ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'}`}>
                  {twoFactorEnabled ? 'ON' : 'OFF'}
                </span>
              </button>

              <button
                onClick={handleToggleAlerts}
                className="w-full flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FaBell className="text-blue-600 dark:text-blue-400" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900 dark:text-white">Login Alerts</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {loginAlerts ? 'Receiving alerts' : 'Alerts off'}
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 text-xs rounded-full ${loginAlerts ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'}`}>
                  {loginAlerts ? 'ON' : 'OFF'}
                </span>
              </button>

              <button
                onClick={handleDownloadReport}
                className="w-full flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
              >
                <FaDownload className="text-green-600 dark:text-green-400" />
                <div className="text-left">
                  <p className="font-medium text-gray-900 dark:text-white">Download Security Report</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Get detailed security information
                  </p>
                </div>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Contact Information */}
        <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>For security-related concerns, contact our Security Team at:</p>
          <p className="font-medium text-green-600 dark:text-green-400 mt-1">
            security@billpie.com
          </p>
          <p className="mt-2">
            Emergency Security Line: +880 1712 345678 (Available 24/7)
          </p>
        </div>
      </div>
    </div>
  );
};

export default Security;