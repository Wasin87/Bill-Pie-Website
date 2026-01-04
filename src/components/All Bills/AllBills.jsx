import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSearch,
  FaFilter,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaCreditCard,
  FaEye,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaInfoCircle,
  FaArrowLeft,
  FaCalendarCheck,
  FaCalendarTimes,
  FaArrowRight
} from "react-icons/fa";

const AllBills = () => {
  const [billsData, setBillsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [filtering, setFiltering] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    address: "",
    phone: "",
    additionalInfo: ""
  });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [sortOption, setSortOption] = useState("date-desc");

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

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

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4
      }
    },
    hover: {
      y: -8,
      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
      transition: {
        duration: 0.3
      }
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.2
      }
    }
  };

  // DYNAMIC MONTH CHECK
  const isCurrentMonthBill = (billDate) => {
    const today = new Date();
    const bill = new Date(billDate);

    return (
      today.getMonth() === bill.getMonth() &&
      today.getFullYear() === bill.getFullYear()
    );
  };

  // Fetch all bills
  useEffect(() => {
    setLoading(true);
    fetch("https://bill-management-db-api.vercel.app/bills")
      .then((res) => res.json())
      .then((data) => {
        setBillsData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching bills:", err);
        toast.error("Failed to load bills");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const savedBill = sessionStorage.getItem("pendingBillDetails");
    if (user && savedBill) {
      const bill = JSON.parse(savedBill);
      sessionStorage.removeItem("pendingBillDetails");
      navigate("/details", { state: { bill } });
    }
  }, [user, navigate]);

  const categories = ["Electricity", "Gas", "Internet", "Water"];

  // Filter bills based on search and category
  const filteredBills = billsData.filter((bill) => {
    const matchesSearch =
      bill.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bill.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bill.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bill.location?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = activeCategory ? bill.category === activeCategory : true;
    return matchesSearch && matchesCategory;
  });

  // Sort bills
  const sortedBills = [...filteredBills].sort((a, b) => {
    switch (sortOption) {
      case "date-desc":
        return new Date(b.date) - new Date(a.date);
      case "date-asc":
        return new Date(a.date) - new Date(b.date);
      case "amount-desc":
        return b.amount - a.amount;
      case "amount-asc":
        return a.amount - b.amount;
      default:
        return 0;
    }
  });

  // Pagination calculations
  const totalItems = sortedBills.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBills = sortedBills.slice(indexOfFirstItem, indexOfLastItem);

  const handleCategoryClick = (cat) => {
    setFiltering(true);
    setCurrentPage(1);
    setActiveCategory((prev) => (prev === cat ? "" : cat));
    setTimeout(() => setFiltering(false), 300);
  };

  const handleSearchChange = (e) => {
    setFiltering(true);
    setCurrentPage(1);
    setSearchQuery(e.target.value);
    setTimeout(() => setFiltering(false), 300);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePayBillClick = (bill) => {
    if (!user) {
      toast.warn("Please login to pay the bill!", { 
        position: "top-right",
        autoClose: 3000 
      });
      navigate("/login", { state: { fromBill: bill } });
      return;
    }

    // check dynamic month condition
    if (!isCurrentMonthBill(bill.date)) {
      toast.warn("Only current month bills can be paid", { 
        position: "top-right",
        autoClose: 3000 
      });
      return;
    }

    setSelectedBill(bill);
    setIsModalOpen(true);
  };

  const handlePayBillSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username.trim() || !formData.address.trim() || !formData.phone.trim()) {
      toast.error("Please fill in all required fields", { 
        position: "top-right",
        autoClose: 3000 
      });
      return;
    }

    const phoneRegex = /^01[3-9]\d{8}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Please enter a valid Bangladeshi phone number", { 
        position: "top-right",
        autoClose: 3000 
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
          autoClose: 3000 
        });
        setIsModalOpen(false);
        setSelectedBill(null);
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

  const getCurrentMonthName = () => {
    return new Date().toLocaleString("default", { month: "long" });
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "Electricity":
        return "from-amber-500 to-amber-600";
      case "Gas":
        return "from-amber-500 to-amber-600";
      case "Internet":
        return "from-amber-500 to-amber-600";
      case "Water":
        return "from-amber-500 to-amber-600";
      default:
        return "from-amber-500 to-amber-600";
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

  // Pagination handlers
  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 rounded-lg transition-all duration-300 ${
            currentPage === i
              ? "bg-linear-to-r from-amber-500 to-amber-600 text-white shadow-md"
              : "bg-amber-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-amber-100 dark:hover:bg-gray-600"
          }`}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <span>Showing</span>
          <select
            value={itemsPerPage}
            onChange={(e) => handleItemsPerPageChange(e.target.value)}
            className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
          >
            <option value="6">6</option>
            <option value="9">9</option>
            <option value="12">12</option>
            <option value="15">15</option>
          </select>
          <span>items per page</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-amber-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-amber-100 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <FaChevronLeft className="text-xs" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          <div className="flex items-center gap-1">
            {pages}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-amber-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-amber-100 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <span className="hidden sm:inline">Next</span>
            <FaChevronRight className="text-xs" />
          </button>
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-400">
          Page {currentPage} of {totalPages} • {totalItems} total bills
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-amber-50/50 to-white dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            All Utility <span className="text-amber-500 dark:text-amber-400">Bills</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Browse and manage all available utility bills in one place
          </p>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 rounded-xl mt-4">
            <FaInfoCircle className="text-amber-600 dark:text-amber-400" />
            <span className="text-sm font-medium text-amber-700 dark:text-amber-300">
              Only {getCurrentMonthName()} bills are payable
            </span>
          </div>
        </motion.div>

        {/* Filters and Search Section */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => handleCategoryClick("")}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  activeCategory === ""
                    ? "bg-linear-to-r from-amber-500 to-amber-600 text-white shadow-md"
                    : "bg-amber-100 dark:bg-gray-700 text-amber-800 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-gray-600"
                }`}
              >
                All Bills
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    activeCategory === cat
                      ? "bg-linear-to-r from-amber-500 to-amber-600 text-white shadow-md"
                      : "bg-amber-100 dark:bg-gray-700 text-amber-800 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-2">
              <FaFilter className="text-gray-500 dark:text-gray-400" />
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="amount-desc">Amount: High to Low</option>
                <option value="amount-asc">Amount: Low to High</option>
              </select>
            </div>

            {/* Search Bar */}
            <div className="relative w-full lg:w-auto">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search bills by title, category, or location..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full lg:w-80 pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Loading State */}
        {(loading || filtering) && (
          <div className="flex justify-center items-center py-20">
            <div className="relative">
              <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-amber-500"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-amber-500 font-medium">{filtering ? "Filtering..." : "Loading..."}</span>
              </div>
            </div>
          </div>
        )}

        {/* Bills Grid */}
        {!loading && !filtering && (
          <>
            {currentBills.length > 0 ? (
              <>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                  {currentBills.map((bill, index) => {
                    const isPayable = isCurrentMonthBill(bill.date);
                    const billDate = new Date(bill.date);
                    const billMonth = billDate.toLocaleString("default", { month: "short" });
                    const billDay = billDate.getDate();
                    const categoryColor = getCategoryColor(bill.category);

                    return (
                      <motion.div
                        key={bill._id}
                        variants={cardVariants}
                        whileHover="hover"
                        className="group"
                      >
                        <div className="relative h-full rounded-2xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
                          {/* Status Badge */}
                          <div className="absolute top-4 left-4 z-10">
                            <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                              isPayable
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                            }`}>
                              {isPayable ? "PAYABLE" : "PAST DUE"}
                            </div>
                          </div>

                          {/* Image Section */}
                          <div className="relative h-48 overflow-hidden">
                            <img
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              src={bill.image}
                              alt={bill.title}
                              onError={(e) => {
                                e.target.src = `https://via.placeholder.com/400x200/FFD54F/374151?text=${bill.category}`;
                              }}
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
                            
                            {/* Date Overlay */}
                            <div className="absolute bottom-4 left-4">
                              <div className="bg-black/70 backdrop-blur-sm px-3 py-2 rounded-xl">
                                <div className="text-center">
                                  <div className="text-white font-bold text-lg">{billDay}</div>
                                  <div className="text-amber-300 text-sm">{billMonth}</div>
                                </div>
                              </div>
                            </div>

                            {/* Category Icon */}
                            <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 p-2 rounded-full shadow-lg">
                              <span className="text-lg">{getCategoryIcon(bill.category)}</span>
                            </div>
                          </div>

                          {/* Content Section */}
                          <div className="p-5">
                            {/* Title and Location */}
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-1 mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                              {bill.title}
                            </h3>
                            
                            <div className="flex items-center gap-2 mb-3">
                              <div className={`w-3 h-3 rounded-full bg-linear-to-r ${categoryColor}`} />
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {bill.category}
                              </span>
                              {bill.location && (
                                <>
                                  <span className="text-gray-400">•</span>
                                  <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                                    <FaMapMarkerAlt className="text-xs" />
                                    <span>{bill.location}</span>
                                  </div>
                                </>
                              )}
                            </div>

                   

                            {/* Amount and Date */}
                            <div className="flex items-center justify-between mb-3">
                              <div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">Amount</div>
                                <div className="text-xl font-bold text-gray-900 dark:text-white">
                                  ৳{bill.amount}
                                </div>
                              </div>
                              <div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">Due Date</div>
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                  {new Date(bill.date).toLocaleDateString()}
                                </div>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                              <button
                                onClick={() => handleSeeDetails(bill)}
                                className="flex-1 flex items-center justify-center gap-2 py-2 px-2 rounded-xl border border-amber-300 dark:border-amber-700 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all duration-300 group/btn"
                              >
                                <FaEye className="group-hover/btn:scale-110 transition-transform" />
                                <span className="text-sm">Details</span>
                              </button>
                              
                              <button
                                onClick={() => handlePayBillClick(bill)}
                                disabled={!isPayable}
                                className={`flex-1 flex items-center justify-center gap-2 py-2 px-2 rounded-xl font-bold transition-all duration-300 ${
                                  isPayable
                                    ? `bg-linear-to-r ${categoryColor} text-white hover:shadow-lg hover:scale-[1.02]`
                                    : "bg-gray-300 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                                }`}
                              >
                                <FaCreditCard className="text-sm" />
                                <span>Pay Now</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-10"
                  >
                    {renderPagination()}
                  </motion.div>
                )}

                {/* Results Summary */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-6 p-4 bg-amber-50 dark:bg-gray-800/50 rounded-xl"
                >
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-center sm:text-left">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Showing <span className="font-bold text-amber-600 dark:text-amber-400">
                          {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, totalItems)}
                        </span> of <span className="font-bold">{totalItems}</span> bills
                        {activeCategory && ` in ${activeCategory}`}
                      </p>
                      {searchQuery && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          Search results for: "{searchQuery}"
                        </p>
                      )}
                    </div>
                    
                    <button
                      onClick={() => navigate(-1)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-100 dark:bg-gray-700 text-amber-800 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      <FaArrowLeft />
                      <span>Go Back</span>
                    </button>
                  </div>
                </motion.div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <div className="w-24 h-24 mx-auto mb-6 bg-amber-100 dark:bg-amber-900/20 rounded-full flex items-center justify-center">
                  <FaMoneyBillWave className="text-4xl text-amber-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  No Bills Found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                  {searchQuery || activeCategory
                    ? "Try adjusting your search or filter criteria"
                    : "No bills are available at the moment"}
                </p>
                {(searchQuery || activeCategory) && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setActiveCategory("");
                    }}
                    className="px-6 py-2 bg-linear-to-r from-amber-500 to-amber-600 text-white rounded-full hover:shadow-lg transition-all"
                  >
                    Clear Filters
                  </button>
                )}
              </motion.div>
            )}
          </>
        )}

        {/* Payment Modal */}
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
    </div>
  );
};

export default AllBills;