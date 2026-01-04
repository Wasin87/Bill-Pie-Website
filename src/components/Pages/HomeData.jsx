import React, { use, useEffect, useState, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";
import { 
  FaCalendarAlt, 
  FaMoneyBillWave, 
  FaTag, 
  FaCreditCard, 
  FaInfoCircle, 
  FaArrowRight, 
  FaCalendarCheck, 
  FaCalendarTimes, 
  FaFire, 
  FaTint, 
  FaWifi, 
  FaBolt, 
  FaReceipt,
  FaMapMarkerAlt
} from "react-icons/fa";

const HomeData = ({ billPromise }) => {
  const billData = use(billPromise);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    address: "",
    phone: "",
    additionalInfo: ""
  });
  const [visibleBills, setVisibleBills] = useState(8);

  // Refs for animation triggers
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  const controls = useAnimation();
  const cardControls = useAnimation();

  // 🔥 Check bill is from current month dynamically
  const isCurrentMonthBill = (billDate) => {
    const currentDate = new Date();
    const billDateObj = new Date(billDate);
    return currentDate.getMonth() === billDateObj.getMonth() && 
           currentDate.getFullYear() === billDateObj.getFullYear();
  };

  // Redirected user
  useEffect(() => {
    const savedBill = sessionStorage.getItem("pendingBillDetails");
    if (user && savedBill) {
      const bill = JSON.parse(savedBill);
      sessionStorage.removeItem("pendingBillDetails");
      navigate("/details", { state: { bill } });
    }
  }, [user, navigate]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Pay Bill button click
  const handlePayBillClick = (bill) => {
    if (!user) {
      toast.warn("Please login to pay the bill!", { 
        position: "top-right",
        theme: "colored"
      });
      navigate("/login", { state: { fromBill: bill } });
      return;
    }

    if (!isCurrentMonthBill(bill.date)) {
      toast.warn("Only current month's bills can be paid", { 
        position: "top-right",
        theme: "colored"
      });
      return;
    }

    setSelectedBill(bill);
    setIsModalOpen(true);
  };

  // Pay Bill Submit
  const handlePayBillSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username.trim() || !formData.address.trim() || !formData.phone.trim()) {
      toast.error("Please fill in all required fields", { 
        position: "top-right",
        theme: "colored"
      });
      return;
    }

    const phoneRegex = /^01[3-9]\d{8}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Please enter a valid Bangladeshi phone number", { 
        position: "top-right",
        theme: "colored"
      });
      return;
    }

    const payData = {
      email: user.email,
      billId: selectedBill._id,
      amount: selectedBill.amount,
      username: formData.username,
      address: formData.address,
      phone: formData.phone,
      date: new Date().toISOString().split('T')[0],
      additionalInfo: formData.additionalInfo,
      billTitle: selectedBill.title,
      billCategory: selectedBill.category,
      billImage: selectedBill.image,
      billLocation: selectedBill.location,
      billDescription: selectedBill.description,
      billDate: selectedBill.date
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
          theme: "colored"
        });
        setIsModalOpen(false);
        setFormData({
          username: "",
          address: "",
          phone: "",
          additionalInfo: ""
        });
        setSelectedBill(null);
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || "⚠️ Something went wrong!", { 
          position: "top-right",
          theme: "colored"
        });
      }
    } catch (err) {
      console.error("Error saving bill:", err);
      toast.error("⚠️ Could not save data!", { 
        position: "top-right",
        theme: "colored"
      });
    }
  };

  const handleSeeDetails = (bill) => {
    navigate("/details", { state: { bill } });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBill(null);
    setFormData({
      username: "",
      address: "",
      phone: "",
      additionalInfo: ""
    });
  };

  // Show current month name
  const getCurrentMonthName = () => {
    const currentDate = new Date();
    return currentDate.toLocaleString('default', { month: 'long' });
  };

  // Get bill icon based on category
  const getCategoryIcon = (category) => {
    switch(category.toLowerCase()) {
      case 'electricity':
        return <FaBolt className="text-yellow-500 text-sm" />;
      case 'gas':
        return <FaFire className="text-orange-500 text-sm" />;
      case 'water':
        return <FaTint className="text-blue-500 text-sm" />;
      case 'internet':
        return <FaWifi className="text-purple-500 text-sm" />;
      default:
        return <FaReceipt className="text-gray-500 text-sm" />;
    }
  };

  const getCategoryColor = (category) => {
    switch(category.toLowerCase()) {
      case 'electricity':
        return "from-amber-500 to-amber-600";
      case 'gas':
        return "from-amber-500 to-amber-600";
      case 'water':
        return "from-amber-500 to-amber-600";
      case 'internet':
        return "from-amber-500 to-amber-600";
      default:
        return "from-amber-500 to-amber-600";
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
        duration: 0.6
      }
    }
  };

  const cardVariants = {
    hidden: (custom) => ({ 
      opacity: 0, 
      y: 40,
      x: custom % 2 === 0 ? -30 : 30,
      scale: 0.9
    }),
    visible: { 
      opacity: 1, 
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.5
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      boxShadow: "0 10px 30px rgba(251, 191, 36, 0.15)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  };

  const slideInVariants = {
    hidden: { 
      opacity: 0, 
      x: -100
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 20,
        duration: 0.8
      }
    }
  };

  const slideUpVariants = {
    hidden: { 
      opacity: 0, 
      y: 40
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 20,
        duration: 0.6
      }
    }
  };

  // Trigger animations when in view
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
      cardControls.start("visible");
    }
  }, [controls, cardControls, isInView]);

  // Handle load more
  const handleLoadMore = () => {
    setVisibleBills(prev => Math.min(prev + 8, billData.length));
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" ref={containerRef}>
      {/* Header Section */}
      <motion.div
        variants={slideInVariants}
        initial="hidden"
        animate={controls}
        className="text-center mb-10"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          Recent <span className="text-amber-500 dark:text-amber-400">Bills</span>
        </h1>
        
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-4">
          Stay updated with the latest utility bills in your area
        </p>
        
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/20 rounded-xl">
          <FaInfoCircle className="text-amber-600 dark:text-amber-400 text-sm" />
          <span className="text-sm font-medium text-amber-700 dark:text-amber-300">
            Only {getCurrentMonthName()} bills are payable
          </span>
        </div>
      </motion.div>

      {/* Bill Cards Grid - Compact 4 columns */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={cardControls}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {billData.slice(0, visibleBills).map((bill, index) => {
          const isPayable = isCurrentMonthBill(bill.date);
          const billDate = new Date(bill.date);
          const billMonth = billDate.toLocaleString('default', { month: 'short' });
          const billDay = billDate.getDate();
          const categoryColor = getCategoryColor(bill.category);

          return (
            <motion.div
              key={bill._id}
              custom={index}
              variants={cardVariants}
              whileHover="hover"
              className="group"
            >
              {/* Compact Card Container */}
              <div className="relative h-full rounded-xl overflow-hidden bg-amber-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-all duration-300">
                
                {/* Top status badge */}
                <div className="absolute top-2 left-2 z-10">
                  <div className={`px-2 py-1 rounded-lg text-xs font-bold ${
                    isPayable 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                  }`}>
                    {isPayable ? 'PAYABLE' : 'PAST DUE'}
                  </div>
                </div>

                {/* Compact Image */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={bill.image}
                    alt={bill.title}
                  />
                  
                  {/* linear Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
                  
                  {/* Category icon */}
                  <div className="absolute top-2 right-2 bg-white/90 dark:bg-gray-800/90 p-2 rounded-full shadow">
                    {getCategoryIcon(bill.category)}
                  </div>
                  
                  {/* Date overlay */}
                  <div className="absolute bottom-2 left-2">
                    <div className="bg-black/70 backdrop-blur-sm px-2 py-1 rounded-lg">
                      <div className="text-center">
                        <div className="text-white font-bold text-sm">{billDay}</div>
                        <div className="text-amber-300 text-xs">{billMonth}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Compact Card Content */}
                <div className="p-4">
                  {/* Title */}
                  <h3 className="text-base font-bold text-gray-900 dark:text-white line-clamp-1 mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {bill.title}
                  </h3>
                  
                  {/* Category and Location */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      <div className={`w-2 h-2 rounded-full bg-linear-to-r ${categoryColor}`} />
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                        {bill.category}
                      </span>
                    </div>
                    
                    {bill.location && (
                      <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                        <FaMapMarkerAlt className="text-xs" />
                        <span className="truncate max-w-[60px]">{bill.location}</span>
                      </div>
                    )}
                  </div>

                  {/* Amount */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2">
                      <FaMoneyBillWave className="text-amber-500 text-base" />
                      <div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Amount</div>
                        <div className="text-xl font-bold text-gray-900 dark:text-white">
                          ৳{bill.amount}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payable Status */}
                  <div className={`mb-4 text-xs font-medium ${isPayable ? 'text-green-600' : 'text-gray-500'}`}>
                    <div className="flex items-center gap-1">
                      {isPayable ? (
                        <>
                          <FaCalendarCheck className="text-green-500" />
                          <span>Payable this month</span>
                        </>
                      ) : (
                        <>
                          <FaCalendarTimes className="text-gray-500" />
                          <span>Not payable in {getCurrentMonthName()}</span>
                        </>
                      )}
                    </div>
                  </div>

{/* Compact Action Buttons - Side by Side with responsive text */}
<div className="flex gap-2">
  {/* Details Button */}
  <button
    onClick={() => handleSeeDetails(bill)}
    className="flex-1 flex items-center justify-center gap-1 text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 font-medium py-2 px-1 rounded-lg border border-amber-300 dark:border-amber-700 hover:border-amber-400 dark:hover:border-amber-600 transition-all duration-300 text-xs"
  >
    <span className="hidden xs:inline truncate">Details</span>
    <span className="xs:hidden">View</span>
    <FaArrowRight className="text-xs hidden sm:inline" />
  </button>

  {/* Pay Button */}
  <button
    onClick={() => handlePayBillClick(bill)}
    disabled={!isPayable}
    className={`
      flex-1 flex items-center justify-center gap-1 font-semibold py-2 px-1 rounded-lg
      transition-all duration-300 text-xs
      ${isPayable 
        ? `bg-linear-to-r ${categoryColor} text-white hover:shadow-md` 
        : 'bg-gray-300 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
      }
    `}
  >
    <FaCreditCard className="text-xs" />
    <span className="truncate">Pay</span>
  </button>
</div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Load More Button */}
      {visibleBills < billData.length && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-10"
        >
          <button
            onClick={handleLoadMore}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 dark:bg-gray-700 text-white font-medium rounded-xl hover:bg-gray-900 dark:hover:bg-gray-600 transition-all duration-300 text-sm"
          >
            <span>Load More Bills</span>
            <FaArrowRight className="text-xs" />
          </button>
        </motion.div>
      )}

      {/* Show All Bills Button */}
      <motion.div
        variants={slideUpVariants}
        initial="hidden"
        animate={controls}
        className="text-center mt-10"
      >
        <Link to="/allBills">
          <button className="
            inline-flex items-center gap-2
            px-8 py-3 bg-linear-to-r from-amber-500 to-amber-600 
            dark:from-amber-600 dark:to-amber-700
            text-white font-bold rounded-xl
            hover:from-amber-600 hover:to-amber-700
            dark:hover:from-amber-700 dark:hover:to-amber-800
            transition-all duration-300 text-sm
          ">
            <span>Browse All Bills</span>
            <FaArrowRight className="text-sm" />
          </button>
        </Link>
      </motion.div>

      {/* Pay Bill Modal - Compact Version */}
      <AnimatePresence>
        {isModalOpen && selectedBill && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-6 bg-linear-to-r from-amber-500 to-amber-600 dark:from-amber-600 dark:to-amber-700">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-lg text-white">
                      Pay Bill
                    </h3>
                    <p className="text-amber-100 text-sm mt-1">
                      {selectedBill.title} • {selectedBill.category}
                    </p>
                  </div>
                  <button 
                    onClick={closeModal}
                    className="text-white hover:bg-white/20 p-1 rounded-full"
                  >
                    ✕
                  </button>
                </div>
              </div>
              
              <form onSubmit={handlePayBillSubmit} className="p-6">
                {/* Bill Summary */}
                <div className="bg-amber-50 dark:bg-gray-700/50 p-4 rounded-xl mb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Amount</p>
                      <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">৳{selectedBill.amount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Due</p>
                      <p className="text-sm font-semibold text-gray-800 dark:text-white">{selectedBill.date}</p>
                    </div>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Username *
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-sm"
                      placeholder="Enter your username"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-sm"
                      placeholder="01XXXXXXXXX"
                      pattern="01[3-9]\d{8}"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-sm"
                      placeholder="Enter your address"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Additional Info (Optional)
                    </label>
                    <textarea
                      name="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-sm"
                      placeholder="Any additional information"
                      rows="2"
                    />
                  </div>
                </div>

                {/* Modal Actions */}
                <div className="flex justify-end gap-3">
                  <button 
                    type="button" 
                    onClick={closeModal} 
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="px-4 py-2 bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-lg transition-all text-sm"
                  >
                    Confirm Payment
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomeData;