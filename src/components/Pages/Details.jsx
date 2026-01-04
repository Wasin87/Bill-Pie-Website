import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../Context/AuthContext";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaTag,
  FaFileAlt,
  FaBuilding,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaShareAlt,
  FaPrint,
  FaDownload,
  FaChevronDown,
  FaChevronUp,
  FaInfoCircle,
  FaExclamationTriangle,
  FaCreditCard,
  FaTimes,
  FaCalendarCheck,
  FaCalendarTimes
} from "react-icons/fa";

const Details = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const bill = location.state?.bill;
  
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPaymentInfo, setShowPaymentInfo] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    address: "",
    phone: "",
    additionalInfo: ""
  });
  const [processingPayment, setProcessingPayment] = useState(false);

  useEffect(() => {
    if (!bill) {
      navigate("/", { replace: true });
    }
  }, [bill, navigate]);

  if (!bill) return null;

  // Check if bill is from current month
  const isCurrentMonthBill = (billDate) => {
    const today = new Date();
    const bill = new Date(billDate);
    return (
      today.getMonth() === bill.getMonth() &&
      today.getFullYear() === bill.getFullYear()
    );
  };

  const isPayable = isCurrentMonthBill(bill.date);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 30,
      transition: {
        duration: 0.2
      }
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "Electricity":
        return "from-blue-500 to-blue-600";
      case "Gas":
        return "from-red-500 to-red-600";
      case "Internet":
        return "from-purple-500 to-purple-600";
      case "Water":
        return "from-cyan-500 to-cyan-600";
      default:
        return "from-amber-500 to-amber-600";
    }
  };

  const getCategoryBgColor = (category) => {
    switch (category) {
      case "Electricity":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "Gas":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      case "Internet":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
      case "Water":
        return "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300";
      default:
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Electricity":
        return "⚡";
      case "Gas":
        return "🔥";
      case "Internet":
        return "🌐";
      case "Water":
        return "💧";
      default:
        return "📄";
    }
  };

  const getStatusColor = () => {
    const today = new Date();
    const dueDate = new Date(bill.date);
    const daysDiff = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
    
    if (daysDiff > 7) return "text-green-600 dark:text-green-400";
    if (daysDiff > 0) return "text-amber-600 dark:text-amber-400";
    return "text-red-600 dark:text-red-400";
  };

  const getStatusBgColor = () => {
    const today = new Date();
    const dueDate = new Date(bill.date);
    const daysDiff = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
    
    if (daysDiff > 7) return "bg-green-100 border-green-200 dark:bg-green-900/20 dark:border-green-800";
    if (daysDiff > 0) return "bg-amber-100 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800";
    return "bg-red-100 border-red-200 dark:bg-red-900/20 dark:border-red-800";
  };

  const getStatusText = () => {
    const today = new Date();
    const dueDate = new Date(bill.date);
    const daysDiff = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
    
    if (daysDiff > 7) return "Payment Due";
    if (daysDiff > 0) return `Due in ${daysDiff} days`;
    if (daysDiff === 0) return "Due Today";
    return `Overdue by ${Math.abs(daysDiff)} days`;
  };

  const getStatusIcon = () => {
    const today = new Date();
    const dueDate = new Date(bill.date);
    const daysDiff = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
    
    if (daysDiff >= 0) return <FaCheckCircle className="text-green-500" />;
    return <FaTimesCircle className="text-red-500" />;
  };

  const formatDate = (dateString) => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handlePayBillClick = () => {
    if (!user) {
      toast.warn("Please login to pay the bill!", { 
        position: "top-right",
        autoClose: 3000 
      });
      navigate("/login", { state: { fromBill: bill } });
      return;
    }

    if (!isPayable) {
      toast.warn("Only current month bills can be paid", { 
        position: "top-right",
        autoClose: 3000 
      });
      return;
    }

    // Check if user is already logged in and fill form with user data
    if (user) {
      setFormData(prev => ({
        ...prev,
        username: user.displayName || user.username || "",
        email: user.email || ""
      }));
    }
    
    setShowPaymentInfo(false);
    setIsModalOpen(true);
  };

  const handlePayBillSubmit = async (e) => {
    e.preventDefault();
    setProcessingPayment(true);

    if (!formData.username.trim() || !formData.address.trim() || !formData.phone.trim()) {
      toast.error("Please fill in all required fields", { 
        position: "top-right",
        autoClose: 3000 
      });
      setProcessingPayment(false);
      return;
    }

    const phoneRegex = /^01[3-9]\d{8}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Please enter a valid Bangladeshi phone number", { 
        position: "top-right",
        autoClose: 3000 
      });
      setProcessingPayment(false);
      return;
    }

    const payData = {
      email: user.email,
      billId: bill._id,
      amount: bill.amount,
      username: formData.username,
      address: formData.address,
      phone: formData.phone,
      date: new Date().toISOString().split('T')[0],
      additionalInfo: formData.additionalInfo,
      billTitle: bill.title,
      billCategory: bill.category,
      billImage: bill.image,
      billLocation: bill.location,
      billDescription: bill.description,
      billDate: bill.date
    };

    try {
      const res = await fetch("https://bill-management-db-api.vercel.app/payBill", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payData),
      });

      if (res.ok) {
        toast.success("✅ Bill Paid Successfully!", { 
          position: "top-right",
          autoClose: 3000 
        });
        setIsModalOpen(false);
        setFormData({
          username: "",
          address: "",
          phone: "",
          additionalInfo: ""
        });
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || "⚠️ Something went wrong!", { 
          position: "top-right",
          autoClose: 3000 
        });
      }
    } catch (err) {
      console.error("Error saving bill:", err);
      toast.error("⚠️ Could not save data!", { 
        position: "top-right",
        autoClose: 3000 
      });
    } finally {
      setProcessingPayment(false);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: bill.title,
      text: `Check out this ${bill.category} bill: ${bill.title} - ৳${bill.amount}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.log('Error sharing:', err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const content = `
      Bill Details
      ============
      Title: ${bill.title}
      Category: ${bill.category}
      Amount: ৳${bill.amount}
      Due Date: ${formatDate(bill.date)}
      Location: ${bill.location}
      Description: ${bill.description}
      Date Generated: ${new Date().toLocaleDateString()}
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${bill.title.replace(/\s+/g, '_')}_details.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      username: "",
      address: "",
      phone: "",
      additionalInfo: ""
    });
  };

  const getCurrentMonthName = () => {
    return new Date().toLocaleString("default", { month: "long" });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-amber-50 dark:from-gray-900 dark:to-gray-800 py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header with Back Button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigate(-1)}
              className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Back to Bills
              </span>
            </button>

            <div className="flex items-center gap-2">
              <div className={`px-3 py-1 rounded-full text-sm font-bold ${getCategoryBgColor(bill.category)}`}>
                {getCategoryIcon(bill.category)} {bill.category}
              </div>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-2">
            Bill Details
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-center">
            Complete information about your utility bill
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Left Column - Bill Image and Basic Info */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-8">
            {/* Bill Image Card */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-blue-500/20 dark:from-amber-600/10 dark:to-blue-600/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  className="w-full h-80 md:h-96 object-cover transform group-hover:scale-105 transition-transform duration-500"
                  src={bill.image}
                  alt={bill.title}
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/800x400/FFD54F/374151?text=${bill.category}+Bill`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-lg">
                    {bill.title}
                  </h2>
                  <div className="flex items-center gap-3 text-white/90">
                    <FaBuilding className="text-amber-300" />
                    <span className="font-medium">{bill.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Information Card */}
            <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <FaFileAlt className="text-amber-500" />
                  Bill Information
                </h3>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center gap-1 text-sm text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300"
                >
                  {isExpanded ? (
                    <>
                      <span>Show Less</span>
                      <FaChevronUp className="text-xs" />
                    </>
                  ) : (
                    <>
                      <span>Show More</span>
                      <FaChevronDown className="text-xs" />
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                      <FaTag className="text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Category</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{bill.category}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                      <FaMoneyBillWave className="text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Amount</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">৳{bill.amount}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <FaCalendarAlt className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Due Date</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{formatDate(bill.date)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                      <FaMapMarkerAlt className="text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Service Area</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{bill.location}</p>
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/10 rounded-xl border border-amber-200 dark:border-amber-800">
                        <h4 className="font-semibold text-amber-800 dark:text-amber-300 mb-2 flex items-center gap-2">
                          <FaInfoCircle />
                          Additional Details
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300">
                          {bill.description || "No additional description available for this bill."}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Payment Info and Actions */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Payment Status Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <FaClock className="text-amber-500" />
                Payment Status
              </h3>
              
              <div className="space-y-4">
                <div className={`p-4 rounded-xl border ${getStatusBgColor()}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon()}
                      <span className="font-bold">Status</span>
                    </div>
                    <span className={`font-bold ${getStatusColor()}`}>
                      {getStatusText()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-3 text-sm">
                    {isPayable ? (
                      <>
                        <FaCalendarCheck className="text-green-500" />
                        <span className="text-green-600 dark:text-green-400">
                          Payable in {getCurrentMonthName()}
                        </span>
                      </>
                    ) : (
                      <>
                        <FaCalendarTimes className="text-red-500" />
                        <span className="text-red-600 dark:text-red-400">
                          Not payable in {getCurrentMonthName()}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => setShowPaymentInfo(!showPaymentInfo)}
                  className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-xl transition-all duration-300 group"
                >
                  <span>Make Payment</span>
                  <FaChevronDown className={`transform transition-transform ${showPaymentInfo ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {showPaymentInfo && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Bill Amount:</span>
                          <span className="font-bold">৳{bill.amount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Service Charge:</span>
                          <span className="font-bold">৳50.00</span>
                        </div>
                        <div className="flex justify-between border-t border-gray-300 dark:border-gray-600 pt-2">
                          <span className="text-lg font-bold text-gray-900 dark:text-white">Total:</span>
                          <span className="text-xl font-bold text-amber-600 dark:text-amber-400">
                            ৳{parseFloat(bill.amount) + 50}
                          </span>
                        </div>
                        <button
                          onClick={handlePayBillClick}
                          disabled={!isPayable}
                          className={`w-full mt-4 py-3 font-bold rounded-xl transition-all ${
                            isPayable
                              ? `bg-gradient-to-r ${getCategoryColor(bill.category)} text-white hover:shadow-lg hover:scale-[1.02]`
                              : "bg-gray-300 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                          }`}
                        >
                          <div className="flex items-center justify-center gap-2">
                            <FaCreditCard className="text-sm" />
                            <span>Proceed to Payment</span>
                          </div>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h3>
              
              <div className="space-y-3">
                <button
                  onClick={handleShare}
                  className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-xl transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <FaShareAlt className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900 dark:text-white">Share Bill</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Share with others</p>
                    </div>
                  </div>
                  {copied && (
                    <span className="text-xs text-green-600 animate-pulse">Copied!</span>
                  )}
                </button>

                <button
                  onClick={handlePrint}
                  className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-xl transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                      <FaPrint className="text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900 dark:text-white">Print Details</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Print this bill</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={handleDownload}
                  className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-xl transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                      <FaDownload className="text-green-600 dark:text-green-400" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900 dark:text-white">Download Info</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Save as text file</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Important Notes Card */}
            <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl shadow-xl p-6 border border-amber-200 dark:border-amber-800">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <FaExclamationTriangle className="text-amber-600 dark:text-amber-400" />
                Important Notes
              </h3>
              
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 dark:text-amber-400 mt-1">•</span>
                  <span>Payment should be made before the due date to avoid late fees</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 dark:text-amber-400 mt-1">•</span>
                  <span>Keep a copy of the payment receipt for future reference</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 dark:text-amber-400 mt-1">•</span>
                  <span>For any discrepancies, contact customer support within 7 days</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 dark:text-amber-400 mt-1">•</span>
                  <span>Digital payments are processed instantly, bank transfers may take 24-48 hours</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </motion.div>

        {/* Bill Summary Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 p-6 bg-gradient-to-r from-amber-500 to-amber-600 dark:from-amber-700 dark:to-amber-800 rounded-2xl shadow-lg"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-white">
              <h4 className="text-lg font-bold mb-1">Need Help?</h4>
              <p className="text-amber-100 text-sm">
                Contact our customer support for any assistance
              </p>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-2 bg-white text-amber-700 font-bold rounded-xl hover:bg-amber-50 transition-colors">
                Contact Support
              </button>
              <button className="px-6 py-2 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-colors">
                View FAQ
              </button>
            </div>
          </div>
        </motion.div>
      </div>

{/* Payment Modal */}
<AnimatePresence>
  {isModalOpen && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={closeModal}
    >
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header - More Compact */}
        <div className="p-4 bg-gradient-to-r from-amber-500 to-amber-600 dark:from-amber-600 dark:to-amber-700">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-base text-white">
                Pay Bill
              </h3>
              <p className="text-amber-100 text-xs mt-0.5 truncate max-w-[250px]">
                {bill.title} • {bill.category}
              </p>
            </div>
            <button 
              onClick={closeModal}
              className="text-white hover:bg-white/20 p-1 rounded-full transition-colors"
            >
              <FaTimes className="text-lg" />
            </button>
          </div>
        </div>
        
        <form onSubmit={handlePayBillSubmit} className="p-4">
          {/* Bill Summary - Compact */}
          <div className="bg-amber-50 dark:bg-gray-700/50 p-3 rounded-lg mb-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Amount</p>
                <p className="text-xl font-bold text-amber-600 dark:text-amber-400">৳{bill.amount}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Due</p>
                <p className="text-xs font-semibold text-gray-800 dark:text-white">
                  {new Date(bill.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Form Fields - Compact Spacing */}
          <div className="space-y-3 mb-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Username *
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Phone *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                placeholder="01XXXXXXXXX"
                pattern="01[3-9]\d{8}"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Address *
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                placeholder="Enter your address"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Additional Info (Optional)
              </label>
              <textarea
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleInputChange}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                placeholder="Any additional information"
                rows="2"
              />
            </div>
          </div>

          {/* Modal Actions - Compact */}
          <div className="flex justify-end gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
            <button 
              type="button" 
              onClick={closeModal} 
              className="px-3 py-1.5 text-xs bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={processingPayment}
              className="px-4 py-1.5 text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {processingPayment ? (
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </div>
              ) : (
                "Confirm Payment"
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
    </motion.div>
  );
};

export default Details;