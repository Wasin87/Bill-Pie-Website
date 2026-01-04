import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaHeadset,
  FaPhoneAlt,
  FaEnvelope,
  FaWhatsapp,
  FaClock,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaUser,
  FaCheckCircle,
  FaArrowLeft,
  FaCalendarAlt,
  FaTicketAlt,
  FaShieldAlt,
  FaUsers,
  FaStar,
  FaComments,
  FaVideo,
  FaFileAlt
} from 'react-icons/fa';
import { 
  MdSupportAgent,
  MdEmail,
  MdPhoneInTalk,
  MdChat,
  MdAccessTimeFilled 
} from 'react-icons/md';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Customer = () => {
  const [activeTab, setActiveTab] = useState('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    priority: 'normal',
    message: '',
    attachFile: null
  });
  const [submitting, setSubmitting] = useState(false);

  const supportTeams = [
    {
      id: 1,
      name: "Billing Support",
      icon: <FaTicketAlt />,
      description: "Payment issues, refunds, billing queries",
      email: "billing@billpie.com",
      phone: "+880 1234 567891",
      responseTime: "Within 2 hours",
      availability: "24/7",
      color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
    },
    {
      id: 2,
      name: "Technical Support",
      icon: <FaShieldAlt />,
      description: "App issues, bugs, technical problems",
      email: "tech@billpie.com",
      phone: "+880 1234 567892",
      responseTime: "Within 1 hour",
      availability: "24/7",
      color: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
    },
    {
      id: 3,
      name: "Account Support",
      icon: <FaUsers />,
      description: "Account access, security, profile issues",
      email: "accounts@billpie.com",
      phone: "+880 1234 567893",
      responseTime: "Within 30 minutes",
      availability: "8 AM - 10 PM",
      color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
    },
    {
      id: 4,
      name: "Business Support",
      icon: <FaStar />,
      description: "Enterprise solutions, partnerships",
      email: "business@billpie.com",
      phone: "+880 1234 567894",
      responseTime: "Within 4 hours",
      availability: "9 AM - 6 PM",
      color: "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
    }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low', color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' },
    { value: 'normal', label: 'Normal', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' },
    { value: 'high', label: 'High', color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' },
    { value: 'urgent', label: 'Urgent', color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("Support ticket created successfully! Ticket ID: #" + Math.floor(Math.random() * 10000));
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        priority: 'normal',
        message: '',
        attachFile: null
      });
      setSubmitting(false);
    }, 1500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) { // 5MB limit
      toast.error("File size should be less than 5MB");
      return;
    }
    setFormData(prev => ({ ...prev, attachFile: file }));
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
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
              <MdSupportAgent className="text-2xl text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Customer Support
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We're here to help you 24/7. Choose your preferred way to get assistance
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                <MdAccessTimeFilled className="text-2xl text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Response Time</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">28 mins</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                <FaCheckCircle className="text-2xl text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Support Rating</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">4.8/5.0</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                <FaUsers className="text-2xl text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Agents</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">24/7</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setActiveTab('contact')}
              className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
                activeTab === 'contact'
                  ? 'bg-linear-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              <MdEmail />
              Contact Form
            </button>
            <button
              onClick={() => setActiveTab('teams')}
              className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
                activeTab === 'teams'
                  ? 'bg-linear-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              <FaUsers />
              Support Teams
            </button>
            <button
              onClick={() => setActiveTab('live')}
              className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
                activeTab === 'live'
                  ? 'bg-linear-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              <MdChat />
              Live Support
            </button>
          </div>

          <AnimatePresence mode="wait">
            {/* Contact Form Tab */}
            {activeTab === 'contact' && (
              <motion.div
                key="contact"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Create Support Ticket
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <FaTicketAlt />
                      <span>Ticket will be created</span>
                    </div>
                  </div>

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
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter your full name"
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
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="your@email.com"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          <FaPhoneAlt className="inline mr-2 text-blue-500" />
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="+880 1234 567890"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Priority Level
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {priorityOptions.map(option => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, priority: option.value }))}
                              className={`px-4 py-2 rounded-lg transition-all ${option.color} ${
                                formData.priority === option.value ? 'ring-2 ring-blue-500' : ''
                              }`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Brief description of your issue"
                        required
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
                        rows="5"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Please describe your issue in detail..."
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <FaFileAlt className="inline mr-2 text-blue-500" />
                        Attach File (Optional)
                      </label>
                      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center">
                        <input
                          type="file"
                          id="file-upload"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <label htmlFor="file-upload" className="cursor-pointer">
                          <div className="flex flex-col items-center">
                            <FaFileAlt className="text-3xl text-gray-400 mb-2" />
                            <p className="text-gray-600 dark:text-gray-400 mb-1">
                              Click to upload or drag and drop
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-500">
                              PNG, JPG, PDF up to 5MB
                            </p>
                          </div>
                        </label>
                        {formData.attachFile && (
                          <div className="mt-3 flex items-center justify-center gap-2">
                            <FaFileAlt className="text-blue-500" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                              {formData.attachFile.name}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <FaClock className="inline mr-2" />
                        Average response time: 28 minutes
                      </div>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {submitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Submitting...
                          </>
                        ) : (
                          <>
                            <FaPaperPlane />
                            Submit Ticket
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}

            {/* Support Teams Tab */}
            {activeTab === 'teams' && (
              <motion.div
                key="teams"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Specialized Support Teams
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {supportTeams.map(team => (
                    <motion.div
                      key={team.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ y: -5 }}
                      className="border border-gray-200 dark:border-gray-700 rounded-2xl p-5 hover:shadow-lg transition-all"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`p-3 rounded-xl ${team.color.split(' ')[0]} ${team.color.split(' ')[1]}`}>
                          <div className={`${team.color.split(' ')[2]} ${team.color.split(' ')[3]}`}>
                            {team.icon}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                            {team.name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {team.description}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <FaEnvelope className="text-gray-400" />
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-500">Email</p>
                            <p className="font-medium text-gray-900 dark:text-white">{team.email}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <FaPhoneAlt className="text-gray-400" />
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-500">Phone</p>
                            <p className="font-medium text-gray-900 dark:text-white">{team.phone}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-500">Response Time</p>
                            <p className="font-medium text-gray-900 dark:text-white">{team.responseTime}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-500">Availability</p>
                            <p className="font-medium text-gray-900 dark:text-white">{team.availability}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Live Support Tab */}
            {activeTab === 'live' && (
              <motion.div
                key="live"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Live Support Channels
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-linear-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                        <FaWhatsapp className="text-2xl text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white">WhatsApp Chat</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Instant messaging support</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <p className="font-bold text-gray-900 dark:text-white">+880 1234 567895</p>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <FaClock className="text-xs" />
                        <span>Available 24/7</span>
                      </div>
                      <a
                        href="https://wa.me/8801234567895"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-colors"
                      >
                        <FaWhatsapp />
                        Start WhatsApp Chat
                      </a>
                    </div>
                  </div>

                  <div className="bg-linear-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                        <FaComments className="text-2xl text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white">Live Chat</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Chat with support agents</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="font-medium text-green-600 dark:text-green-400">6 agents online</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <FaClock className="text-xs" />
                        <span>Typical wait time: 2 minutes</span>
                      </div>
                      <button
                        onClick={() => toast.info("Live chat will open in a new window")}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors"
                      >
                        <FaComments />
                        Start Live Chat
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-linear-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-6 border border-amber-200 dark:border-amber-800">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <FaVideo className="text-amber-600 dark:text-amber-400" />
                    Video Call Support
                  </h4>
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <p className="text-gray-700 dark:text-gray-300 mb-2">
                        Schedule a video call with our support team
                      </p>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <FaCalendarAlt />
                        <span>Available Monday-Friday, 9 AM - 5 PM</span>
                      </div>
                    </div>
                    <button
                      onClick={() => toast.info("Schedule a video call feature coming soon")}
                      className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl transition-colors"
                    >
                      <FaCalendarAlt />
                      Schedule Call
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-linear-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl">
                <FaMapMarkerAlt className="text-xl" />
              </div>
              <div>
                <h4 className="font-bold mb-1">Office Address</h4>
                <p className="text-blue-100 text-sm">
                  123 Bill Street, Dhaka 1205<br />
                  Bangladesh
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl">
                <MdPhoneInTalk className="text-xl" />
              </div>
              <div>
                <h4 className="font-bold mb-1">General Contact</h4>
                <p className="text-blue-100 text-sm">
                  +880 1234 567890<br />
                  support@billpie.com
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl">
                <FaClock className="text-xl" />
              </div>
              <div>
                <h4 className="font-bold mb-1">Working Hours</h4>
                <p className="text-blue-100 text-sm">
                  24/7 Support Available<br />
                  Emergency: +880 1712 345678
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* FAQ Link */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Check our FAQ for quick answers to common questions
          </p>
          <Link
            to="/faq"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            <FaHeadset />
            Visit FAQ Page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Customer;