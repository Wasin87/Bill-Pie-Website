import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaCookieBite,
  FaEye,
  FaTrashAlt,
  FaToggleOn,
  FaToggleOff,
  FaArrowLeft,
  FaCheckCircle,
  FaTimesCircle,
  FaCog,
  FaChartBar,
  FaUser,
  FaShieldAlt,
  FaDownload
} from 'react-icons/fa';
import { MdCookie, MdSettings, MdAnalytics, MdAdsClick } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Cookies = () => {
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: { enabled: true, required: true },
    functional: { enabled: true, required: false },
    analytics: { enabled: false, required: false },
    marketing: { enabled: false, required: false }
  });

  const cookieTypes = [
    {
      id: 'essential',
      name: 'Essential Cookies',
      icon: <FaShieldAlt />,
      description: 'Required for the website to function properly. These cookies enable basic functions like page navigation and access to secure areas.',
      examples: ['Session management', 'Security features', 'Load balancing'],
      required: true,
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
    },
    {
      id: 'functional',
      name: 'Functional Cookies',
      icon: <FaCog />,
      description: 'Remember your preferences and choices to provide enhanced, more personal features.',
      examples: ['Language settings', 'Font size preferences', 'Region selection'],
      required: false,
      color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
    },
    {
      id: 'analytics',
      name: 'Analytics Cookies',
      icon: <FaChartBar />,
      description: 'Help us understand how visitors interact with our website by collecting and reporting information anonymously.',
      examples: ['Visitor counts', 'Page views', 'Bounce rates'],
      required: false,
      color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
    },
    {
      id: 'marketing',
      name: 'Marketing Cookies',
      icon: <MdAdsClick />,
      description: 'Used to track visitors across websites to display relevant advertisements.',
      examples: ['Ad personalization', 'Campaign tracking', 'Retargeting'],
      required: false,
      color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
    }
  ];

  const handleToggleCookie = (cookieId) => {
    if (cookieId === 'essential') {
      toast.info("Essential cookies cannot be disabled");
      return;
    }

    setCookiePreferences(prev => ({
      ...prev,
      [cookieId]: {
        ...prev[cookieId],
        enabled: !prev[cookieId].enabled
      }
    }));

    toast.success(`${cookieTypes.find(c => c.id === cookieId)?.name} ${!cookiePreferences[cookieId].enabled ? 'enabled' : 'disabled'}`);
  };

  const handleAcceptAll = () => {
    const updated = { ...cookiePreferences };
    Object.keys(updated).forEach(key => {
      updated[key].enabled = true;
    });
    setCookiePreferences(updated);
    toast.success("All cookies accepted!");
  };

  const handleRejectAll = () => {
    const updated = { ...cookiePreferences };
    Object.keys(updated).forEach(key => {
      if (!updated[key].required) {
        updated[key].enabled = false;
      }
    });
    setCookiePreferences(updated);
    toast.success("Non-essential cookies rejected!");
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookiePreferences', JSON.stringify(cookiePreferences));
    toast.success("Cookie preferences saved successfully!");
  };

  const handleClearCookies = () => {
    if (window.confirm("Are you sure you want to clear all cookies? This may log you out and reset preferences.")) {
      // In a real app, you would clear cookies here
      toast.success("Cookies cleared successfully!");
    }
  };

  const enabledCookiesCount = Object.values(cookiePreferences).filter(c => c.enabled).length;
  const totalCookiesCount = Object.keys(cookiePreferences).length;

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
              <MdCookie className="text-2xl text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Cookies Policy
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Learn about how we use cookies and manage your preferences
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <FaEye />
              <span>Transparent Cookie Usage</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <FaUser />
              <span>Full Control Over Preferences</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <FaShieldAlt />
              <span>GDPR Compliant</span>
            </div>
          </div>
        </motion.div>

        {/* Cookie Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-linear-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-white mb-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Your Cookie Settings</h3>
              <p className="text-amber-100">
                {enabledCookiesCount} of {totalCookiesCount} cookie types are currently enabled
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold">{enabledCookiesCount}</div>
                <div className="text-sm text-amber-200">Enabled</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{totalCookiesCount - enabledCookiesCount}</div>
                <div className="text-sm text-amber-200">Disabled</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Cookie Types */}
        <div className="space-y-6 mb-8">
          {cookieTypes.map((cookie, index) => (
            <motion.div
              key={cookie.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`p-3 rounded-xl ${cookie.color.split(' ')[0]} ${cookie.color.split(' ')[1]}`}>
                      <div className={`${cookie.color.split(' ')[2]} ${cookie.color.split(' ')[3]}`}>
                        {cookie.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {cookie.name}
                        </h3>
                        {cookie.required && (
                          <span className="px-2 py-1 text-xs bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-full">
                            Required
                          </span>
                        )}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-3">
                        {cookie.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {cookie.examples.map((example, idx) => (
                          <span key={idx} className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
                            {example}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <button
                      onClick={() => handleToggleCookie(cookie.id)}
                      disabled={cookie.required}
                      className={`p-2 rounded-lg transition-colors ${
                        cookie.required
                          ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                          : cookiePreferences[cookie.id].enabled
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50'
                          : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50'
                      }`}
                      title={cookie.required ? "Required - Cannot be disabled" : "Toggle cookie"}
                    >
                      {cookiePreferences[cookie.id].enabled ? (
                        <FaToggleOn className="text-xl" />
                      ) : (
                        <FaToggleOff className="text-xl" />
                      )}
                    </button>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      cookiePreferences[cookie.id].enabled
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                    }`}>
                      {cookiePreferences[cookie.id].enabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Cookie Duration & Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Cookie Duration & Management
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-3">Cookie Lifespan</h4>
              <div className="space-y-3">
                {[
                  { type: 'Session Cookies', duration: 'Until browser is closed' },
                  { type: 'Persistent Cookies', duration: 'Up to 2 years' },
                  { type: 'First-party Cookies', duration: 'Set by our domain' },
                  { type: 'Third-party Cookies', duration: 'Set by partners' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <span className="font-medium text-gray-900 dark:text-white">{item.type}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{item.duration}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-3">Manage Cookies</h4>
              <div className="space-y-3">
                <button
                  onClick={() => window.open('about:preferences#privacy', '_blank')}
                  className="w-full flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors text-left"
                >
                  <FaCog className="text-blue-600 dark:text-blue-400" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Browser Settings</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Manage cookies through browser preferences
                    </p>
                  </div>
                </button>

                <button
                  onClick={handleClearCookies}
                  className="w-full flex items-center gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors text-left"
                >
                  <FaTrashAlt className="text-red-600 dark:text-red-400" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Clear All Cookies</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Remove all cookies from this site
                    </p>
                  </div>
                </button>

                <button
                  onClick={handleSavePreferences}
                  className="w-full flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors text-left"
                >
                  <FaCheckCircle className="text-green-600 dark:text-green-400" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Save Preferences</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Remember your cookie settings
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6"
        >
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              Cookie Consent
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {enabledCookiesCount} of {totalCookiesCount} cookie types selected
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleRejectAll}
              className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Reject Non-Essential
            </button>
            <button
              onClick={handleAcceptAll}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl transition-colors"
            >
              Accept All Cookies
            </button>
            <button
              onClick={handleSavePreferences}
              className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl transition-colors"
            >
              <FaCheckCircle />
              Save Preferences
            </button>
          </div>
        </motion.div>

        {/* Additional Information */}
        <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>
            For more information about how we use cookies, please contact us at:
          </p>
          <p className="font-medium text-amber-600 dark:text-amber-400 mt-1">
            privacy@billpie.com
          </p>
          <p className="mt-2">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cookies;