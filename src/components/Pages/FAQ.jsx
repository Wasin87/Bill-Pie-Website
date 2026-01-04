import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaQuestionCircle,
  FaChevronDown,
  FaChevronUp,
  FaSearch,
  FaFilter,
  FaTimes,
  FaLightbulb,
  FaExclamationCircle,
  FaArrowLeft,
  FaBook,
  FaUserClock,
  FaCreditCard,
  FaShieldAlt,
  FaMobileAlt
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const faqCategories = [
    { id: 'all', label: 'All Questions', icon: <FaQuestionCircle />, count: 25 },
    { id: 'payment', label: 'Payment', icon: <FaCreditCard />, count: 8 },
    { id: 'account', label: 'Account', icon: <FaUserClock />, count: 6 },
    { id: 'security', label: 'Security', icon: <FaShieldAlt />, count: 5 },
    { id: 'technical', label: 'Technical', icon: <FaMobileAlt />, count: 4 },
    { id: 'billing', label: 'Billing', icon: <FaBook />, count: 2 }
  ];

  const faqItems = [
    {
      id: 1,
      question: "How do I create an account?",
      answer: "Click the 'Sign Up' button on the top right corner. Fill in your details including name, email, and password. Verify your email through the link we send you, and your account will be ready to use.",
      category: 'account',
      tags: ['account', 'registration']
    },
    {
      id: 2,
      question: "What payment methods are accepted?",
      answer: "We accept all major credit/debit cards (Visa, MasterCard, American Express), mobile banking services (bKash, Nagad, Rocket), and bank transfers. All payments are processed through secure, encrypted channels.",
      category: 'payment',
      tags: ['payment', 'methods']
    },
    {
      id: 3,
      question: "Is my payment information secure?",
      answer: "Yes, absolutely. We use bank-level SSL encryption (256-bit) and comply with PCI DSS standards. We never store your complete card details on our servers. All sensitive information is handled by certified payment processors.",
      category: 'security',
      tags: ['security', 'privacy']
    },
    {
      id: 4,
      question: "How can I reset my password?",
      answer: "Click 'Forgot Password' on the login page. Enter your registered email address. Check your email for the password reset link. Click the link and create a new strong password. Make sure to use a combination of letters, numbers, and special characters.",
      category: 'account',
      tags: ['password', 'recovery']
    },
    {
      id: 5,
      question: "What should I do if a payment fails?",
      answer: "1. Check your internet connection. 2. Verify your payment method has sufficient funds. 3. Ensure your card details are correct. 4. Wait 5-10 minutes and try again. 5. Contact your bank if the issue persists. 6. Contact our support team if the problem continues.",
      category: 'payment',
      tags: ['payment', 'troubleshooting']
    },
    {
      id: 6,
      question: "How do I download my payment receipt?",
      answer: "Go to 'My Pay Bills' section in your dashboard. Find the specific payment. Click the 'Download PDF' button. The receipt will be downloaded immediately. You can also view and print receipts from the payment details page.",
      category: 'billing',
      tags: ['receipt', 'download']
    },
    {
      id: 7,
      question: "Can I pay bills for someone else?",
      answer: "Yes, you can pay bills for family members or friends. Enter their bill details as usual. Make sure you have the correct bill information. The payment will be processed normally. You'll receive the payment confirmation and receipt.",
      category: 'payment',
      tags: ['family', 'payments']
    },
    {
      id: 8,
      question: "How long does it take for payments to process?",
      answer: "Card payments: Instant. Mobile banking: 1-2 minutes. Bank transfers: 30 minutes to 2 business days. International payments: 1-3 business days. You'll receive instant confirmation for all successful payments.",
      category: 'payment',
      tags: ['processing', 'time']
    },
    {
      id: 9,
      question: "Is there a mobile app available?",
      answer: "Yes, Bill Pie is available on both iOS and Android. Download from App Store or Google Play. The app offers all features available on the website plus push notifications for bill reminders and payment confirmations.",
      category: 'technical',
      tags: ['mobile', 'app']
    },
    {
      id: 10,
      question: "How can I contact customer support?",
      answer: "Multiple options: 1) Email: support@billpie.com 2) Phone: +880 1234 567890 3) Live Chat: Available on website 4) Social Media: @BillPieSupport. Response times: Email - 24 hours, Phone - Business hours, Chat - Instant.",
      category: 'account',
      tags: ['support', 'contact']
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFAQs = faqItems.filter(item => {
    const matchesSearch = 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category) => {
    switch(category) {
      case 'payment': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'account': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'security': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'technical': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'billing': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-amber-50 dark:from-gray-900 dark:to-gray-800 py-8 px-4 sm:px-6 lg:px-8">
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
            <div className="p-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl">
              <FaQuestionCircle className="text-2xl text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Frequently Asked Questions
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Find quick answers to common questions about Bill Pie
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for questions or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent shadow-lg"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            )}
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <FaFilter className="text-gray-500" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Categories</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {faqCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow hover:shadow-md'
                }`}
              >
                {category.icon}
                <span>{category.label}</span>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  activeCategory === category.id
                    ? 'bg-white/20'
                    : 'bg-gray-100 dark:bg-gray-700'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* FAQ List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-4 mb-12"
        >
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${getCategoryColor(item.category)}`}>
                      <FaQuestionCircle />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        {item.question}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(item.category)}`}>
                          {item.category}
                        </span>
                        <div className="flex gap-1">
                          {item.tags.map(tag => (
                            <span key={tag} className="text-xs text-gray-500 dark:text-gray-400">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  {openIndex === index ? (
                    <FaChevronUp className="text-amber-500" />
                  ) : (
                    <FaChevronDown className="text-gray-400" />
                  )}
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4 pt-2 border-t border-gray-100 dark:border-gray-700">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
              <div className="w-20 h-20 mx-auto mb-4 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                <FaQuestionCircle className="text-3xl text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                No questions found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-4">
                {searchQuery 
                  ? `No results found for "${searchQuery}". Try different keywords.`
                  : "No questions available in this category."}
              </p>
              {(searchQuery || activeCategory !== 'all') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                  }}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </motion.div>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Still Need Help */}
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
              <FaExclamationCircle />
              Still Need Help?
            </h3>
            <p className="mb-4 text-blue-100">
              Can't find the answer you're looking for? Our support team is ready to help.
            </p>
            <Link
              to="/help"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-colors"
            >
              Contact Support
            </Link>
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-6 border border-amber-200 dark:border-amber-800">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <FaLightbulb className="text-amber-600 dark:text-amber-400" />
              Quick Tips
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-1">•</span>
                <span className="text-gray-700 dark:text-gray-300">Use specific keywords for better search results</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-1">•</span>
                <span className="text-gray-700 dark:text-gray-300">Check payment status in your dashboard</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-1">•</span>
                <span className="text-gray-700 dark:text-gray-300">Keep your contact information updated</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-1">•</span>
                <span className="text-gray-700 dark:text-gray-300">Enable 2-factor authentication for security</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>
            {faqItems.length} questions • Last updated: {new Date().toLocaleDateString()} • 
            <span className="ml-2 font-medium text-amber-600 dark:text-amber-400">
              {Math.round((faqItems.filter(f => f.category === activeCategory || activeCategory === 'all').length / faqItems.length) * 100)}% of topics covered
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;