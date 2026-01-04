import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import {
  FaTrashAlt,
  FaDownload,
  FaEye,
  FaFileInvoiceDollar,
  FaReceipt,
  FaFilter,
  FaSearch,
  FaTimes,
  FaPrint,
  FaShareAlt,
  FaCheckCircle,
  FaMoneyBillWave,
  FaCalendarAlt // Added calendar icon
} from "react-icons/fa";
import {
  MdCategory,
  MdDateRange,
  MdLocationOn,
  MdPerson,
  MdEmail,
  MdPhone,
  MdHome,
  MdPaid,
  MdDescription
} from "react-icons/md";
import { FiArrowLeft } from "react-icons/fi";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const MyPayBills = () => {
  const [myBills, setMyBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortOption, setSortOption] = useState("date-desc");

  useEffect(() => {
    fetchMyBills();
  }, []);

  const fetchMyBills = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://bill-management-db-api.vercel.app/payBill");
      const data = await response.json();
      setMyBills(data);
    } catch (error) {
      console.error("Error loading pay bills:", error);
      toast.error("Failed to load payment history");
    } finally {
      setLoading(false);
    }
  };

  // Calculate statistics
  const totalPaid = myBills.reduce((sum, bill) => sum + Number(bill.amount), 0);
  const totalBills = myBills.length;
  const categories = [...new Set(myBills.map(bill => bill.billCategory || bill.category))];

  // Filter and sort bills
  const filteredBills = myBills
    .filter(bill => {
      const matchesSearch = 
        (bill.billTitle || bill.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (bill.billCategory || bill.category || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (bill.username || "").toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = filterCategory === "all" || 
        (bill.billCategory || bill.category) === filterCategory;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
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

  // Handle Download PDF
  const handleDownloadPDF = (bill) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Add header with linear effect
    doc.setFillColor(245, 158, 11); // Amber color
    doc.rect(0, 0, pageWidth, 40, 'F');
    
    // Add logo
    const img = new Image();
    img.src = logo;
    img.onload = function () {
      const imgWidth = 25;
      const imgHeight = (this.height / this.width) * imgWidth;
      doc.addImage(img, "PNG", 20, 8, imgWidth, imgHeight);
      
      // Header text
      doc.setFont("helvetica", "bold");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(16);
      doc.text("PAYMENT RECEIPT", pageWidth / 2, 15, { align: "center" });
      
      doc.setFontSize(10);
      doc.text("Bill Management System", pageWidth / 2, 22, { align: "center" });
      doc.text("Official Receipt", pageWidth / 2, 28, { align: "center" });

      // Receipt details
      doc.setFont("helvetica", "normal");
      doc.setTextColor(0, 0, 0);
      
      // Receipt Info Section
      let yPos = 50;
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("RECEIPT INFORMATION", 20, yPos);
      doc.setFont("helvetica", "normal");
      yPos += 10;
      
      doc.text(`Receipt ID: ${bill._id || "N/A"}`, 20, yPos);
      yPos += 7;
      doc.text(`Payment Date: ${new Date(bill.date).toLocaleDateString()}`, 20, yPos);
      yPos += 7;
      doc.text(`Status: PAID ✓`, 20, yPos);
      yPos += 15;

      // Bill Details Section
      doc.setFont("helvetica", "bold");
      doc.text("BILL DETAILS", 20, yPos);
      doc.setFont("helvetica", "normal");
      yPos += 10;
      
      doc.text(`Bill Title: ${bill.billTitle || bill.title}`, 20, yPos);
      yPos += 7;
      doc.text(`Category: ${bill.billCategory || bill.category}`, 20, yPos);
      yPos += 7;
      doc.text(`Location: ${bill.billLocation || bill.location}`, 20, yPos);
      yPos += 7;
      doc.text(`Bill Date: ${bill.billDate || bill.date}`, 20, yPos);
      yPos += 15;

      // Payment Details Section
      doc.setFont("helvetica", "bold");
      doc.text("PAYMENT DETAILS", 20, yPos);
      doc.setFont("helvetica", "normal");
      yPos += 10;
      
      doc.text(`Amount Paid: Tk ${bill.amount}`, 20, yPos);
      yPos += 7;
      doc.text(`Paid By: ${bill.username}`, 20, yPos);
      yPos += 7;
      doc.text(`Email: ${bill.email}`, 20, yPos);
      yPos += 7;
      doc.text(`Phone: ${bill.phone}`, 20, yPos);
      yPos += 7;
      doc.text(`Address: ${bill.address}`, 20, yPos);
      yPos += 15;

      // Additional Info
      if (bill.additionalInfo) {
        doc.setFont("helvetica", "bold");
        doc.text("ADDITIONAL NOTES", 20, yPos);
        doc.setFont("helvetica", "normal");
        yPos += 10;
        doc.text(bill.additionalInfo, 20, yPos);
        yPos += 10;
      }

      // Footer
      yPos += 10;
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      doc.text("This is an official receipt. Please keep this for your records.", pageWidth / 2, yPos, { align: "center" });
      yPos += 5;
      doc.text("Generated on " + new Date().toLocaleDateString(), pageWidth / 2, yPos, { align: "center" });

      doc.save(`${(bill.billTitle || bill.title).replace(/\s+/g, '_')}_Receipt.pdf`);
      
      toast.success("PDF receipt downloaded successfully!");
    };
  };

  // Handle Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this payment record?")) {
      try {
        const response = await fetch(`https://bill-management-db-api.vercel.app/payBill/${id}`, {
          method: "DELETE",
        });
        
        if (response.ok) {
          setMyBills(myBills.filter((bill) => bill._id !== id));
          toast.success("Payment record deleted successfully!");
        }
      } catch (error) {
        console.error("Error deleting bill:", error);
        toast.error("Failed to delete payment record");
      }
    }
  };

  // Handle Share
  const handleShare = (bill) => {
    const shareData = {
      title: `Payment Receipt - ${bill.billTitle || bill.title}`,
      text: `I paid Tk ${bill.amount} for ${bill.billCategory || bill.category} bill. Paid on ${bill.date}`,
    };
    
    if (navigator.share) {
      navigator.share(shareData);
    } else {
      navigator.clipboard.writeText(JSON.stringify(shareData));
      toast.success("Payment info copied to clipboard!");
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "Electricity": return "bg-amber-500";
      case "Gas": return "bg-amber-500";
      case "Internet": return "bg-amber-500";
      case "Water": return "bg-amber-500";
      default: return "bg-amber-500";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-amber-500 border-b-4 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading payment history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-amber-50 dark:from-gray-900 dark:to-gray-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-200  dark:bg-amber-600 rounded-xl shadow hover:shadow-lg transition-shadow text-gray-700 dark:text-white"
          >
            <FiArrowLeft />
            <span>Back to Home</span>
          </Link>
        </motion.div>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Payment History
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            View and manage all your paid utility bills in one place
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {/* Total Paid Card */}
          <div className="bg-linear-to-r from-amber-500 to-amber-600 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-amber-100">Total Paid</p>
                <p className="text-3xl font-bold mt-2">৳{totalPaid.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-xl">
                <FaMoneyBillWave className="text-2xl" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-amber-100">
              <FaCheckCircle />
              <span>All payments verified</span>
            </div>
          </div>

          {/* Total Bills Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Bills</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{totalBills}</p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400">
                <FaReceipt className="text-2xl" />
              </div>
            </div>
          </div>

          {/* Categories Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Categories</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{categories.length}</p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl text-green-600 dark:text-green-400">
                <MdCategory className="text-2xl" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filters & Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by title, category, or name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
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

            {/* Category Filter */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FaFilter className="text-gray-500" />
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
              </div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Sort Options */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sort By</label>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="amount-desc">Amount: High to Low</option>
                <option value="amount-asc">Amount: Low to High</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Payment Cards Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {filteredBills.length > 0 ? (
            filteredBills.map((bill, index) => (
              <motion.div
                key={bill._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-amber-50 border dark:border-amber-200 dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Card Header */}
                <div className={`p-4 ${getCategoryColor(bill.billCategory || bill.category)} text-white`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg line-clamp-2">{bill.billTitle || bill.title}</h3>
                      <div className="flex items-center gap-2 mt-2">
                        <MdCategory className="text-sm" />
                        <span className="text-sm font-medium">{bill.billCategory || bill.category}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">৳{bill.amount}</div>
                      <div className="text-sm mt-1 bg-green-400 px-2 rounded-2xl ">PAID</div>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  {/* User Info */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                        <MdPerson className="text-amber-600 dark:text-amber-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Paid By</p>
                        <p className="font-medium text-gray-900 dark:text-white">{bill.username}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <FaCalendarAlt className="text-amber-600 dark:text-amber-400" /> {/* Fixed: Changed from MdCalendarCheck to FaCalendarAlt */}
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Payment Date</p>
                        <p className="font-medium text-gray-900 dark:text-white">{formatDate(bill.date)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => setSelectedBill(bill)}
                      className="flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-xl hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors"
                    >
                      <FaEye />
                      <span className="font-medium">View</span>
                    </button>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDownloadPDF(bill)}
                        title="Download PDF"
                        className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-xl hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
                      >
                        <FaDownload />
                      </button>
                      <button
                        onClick={() => handleShare(bill)}
                        title="Share"
                        className="p-2 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-xl hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors"
                      >
                        <FaShareAlt />
                      </button>
                      <button
                        onClick={() => handleDelete(bill._id)}
                        title="Delete"
                        className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="md:col-span-3 text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                <FaFileInvoiceDollar className="text-3xl text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                No Payments Found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                {searchQuery || filterCategory !== "all" 
                  ? "Try adjusting your search or filter criteria"
                  : "You haven't made any payments yet"}
              </p>
              {searchQuery || filterCategory !== "all" ? (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setFilterCategory("all");
                  }}
                  className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl transition-colors"
                >
                  Clear Filters
                </button>
              ) : (
                <Link
                  to="/allBills"
                  className="inline-flex items-center gap-2 px-6 py-2 bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-xl transition-colors"
                >
                  <FaFileInvoiceDollar />
                  Pay Your First Bill
                </Link>
              )}
            </div>
          )}
        </motion.div>

        {/* Payment Details Modal */}
        <AnimatePresence>
          {selectedBill && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedBill(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                transition={{ type: "spring", damping: 25 }}
                className="relative w-full max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="bg-linear-to-r from-amber-500 to-amber-600 p-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/20 rounded-lg">
                        <FaFileInvoiceDollar className="text-xl text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          Payment Details
                        </h3>
                        <p className="text-amber-100 text-sm">
                          {selectedBill.billTitle || selectedBill.title}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedBill(null)}
                      className="p-2 text-white hover:bg-white/20 rounded-full transition-colors"
                    >
                      <FaTimes className="text-xl" />
                    </button>
                  </div>
                </div>

                {/* Modal Body */}
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-6">
                      {/* Bill Info */}
                      <div className="bg-amber-50 dark:bg-gray-700/50 rounded-xl p-5">
                        <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                          <MdDescription className="text-amber-500" />
                          Bill Information
                        </h4>
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm text-gray-600 dark:text-gray-400">Title</label>
                            <p className="font-semibold text-gray-900 dark:text-white">
                              {selectedBill.billTitle || selectedBill.title}
                            </p>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm text-gray-600 dark:text-gray-400">Category</label>
                              <span className={`px-3 py-1 text-sm rounded-full ${getCategoryColor(selectedBill.billCategory || selectedBill.category)} text-white`}>
                                {selectedBill.billCategory || selectedBill.category}
                              </span>
                            </div>
                            <div>
                              <label className="text-sm text-gray-600 dark:text-gray-400">Location</label>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {selectedBill.billLocation || selectedBill.location}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Timeline */}
                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5">
                        <h4 className="font-bold text-gray-900 dark:text-white mb-4">Payment Timeline</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">Bill Generated</p>
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                {selectedBill.billDate || selectedBill.date}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">Payment Completed</p>
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                {formatDate(selectedBill.date)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                      {/* Payment Details */}
                      <div className="bg-linear-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-5 border border-green-200 dark:border-green-800">
                        <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                          <MdPaid className="text-green-500" />
                          Payment Details
                        </h4>
                        <div className="text-center mb-4">
                          <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                            ৳{selectedBill.amount}
                          </div>
                          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-full">
                            <FaCheckCircle />
                            <span className="font-semibold">PAYMENT SUCCESSFUL</span>
                          </div>
                        </div>
                      </div>

                      {/* User Information */}
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-5">
                        <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                          <MdPerson className="text-blue-500" />
                          User Information
                        </h4>
                        <div className="space-y-3">
                          {[
                            { icon: <MdPerson />, label: "Paid By", value: selectedBill.username },
                            { icon: <MdEmail />, label: "Email", value: selectedBill.email },
                            { icon: <MdPhone />, label: "Phone", value: selectedBill.phone },
                            { icon: <MdHome />, label: "Address", value: selectedBill.address },
                          ].map((item, index) => (
                            <div key={index} className="flex items-center gap-3">
                              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                <div className="text-blue-600 dark:text-blue-400">{item.icon}</div>
                              </div>
                              <div className="flex-1">
                                <p className="text-sm text-gray-600 dark:text-gray-400">{item.label}</p>
                                <p className="font-medium text-gray-900 dark:text-white">{item.value}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  {selectedBill.additionalInfo && (
                    <div className="mt-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5">
                      <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                        Additional Information
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 p-4 rounded-lg">
                        {selectedBill.additionalInfo}
                      </p>
                    </div>
                  )}

                  {/* Modal Actions */}
                  <div className="flex flex-wrap gap-3 justify-end mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => handleShare(selectedBill)}
                      className="flex items-center gap-2 px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition-colors"
                    >
                      <FaShareAlt />
                      Share
                    </button>
                    <button
                      onClick={() => handleDownloadPDF(selectedBill)}
                      className="flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-semibold transition-colors"
                    >
                      <FaDownload />
                      Download PDF
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="flex items-center gap-2 px-5 py-2.5 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-semibold transition-colors"
                    >
                      <FaPrint />
                      Print
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MyPayBills;