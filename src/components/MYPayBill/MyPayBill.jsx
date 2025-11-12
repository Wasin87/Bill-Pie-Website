import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import { FaTrashAlt, FaDownload, FaEye, FaFileInvoiceDollar } from "react-icons/fa";
import { MdCategory, MdDateRange, MdLocationOn, MdPerson, MdEmail, MdPhone, MdHome } from "react-icons/md";
import logo from "../../assets/logo.png";

const MyPayBills = () => {
  const [myBills, setMyBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);  

  useEffect(() => {
    fetch("http://localhost:3000/payBill")
      .then((res) => res.json())
      .then((data) => setMyBills(data))
      .catch((err) => console.error("Error loading pay bills:", err));
  }, []);

  const totalPaid = myBills.reduce((sum, bill) => sum + Number(bill.amount), 0);

  // Handle Download PDF
  const handleDownloadPDF = (bill) => {
    const doc = new jsPDF();
    const img = new Image();
    img.src = logo;
    img.onload = function () {
      const imgWidth = 30;  
      const imgHeight = (this.height / this.width) * imgWidth;  
      const pageWidth = doc.internal.pageSize.getWidth();
      doc.addImage(img, "PNG", (pageWidth - imgWidth) / 2, 10, imgWidth, imgHeight);

      // Title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.text("Bill Payment Report", pageWidth / 2, 45, { align: "center" });

      // Bill Details
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      let startY = 60;
      doc.text(`Title: ${bill.billTitle || bill.title}`, 20, startY);
      doc.text(`Category: ${bill.billCategory || bill.category}`, 20, startY + 10);
      doc.text(`Amount: Tk ${bill.amount}`, 20, startY + 20);
      doc.text(`Location: ${bill.billLocation || bill.location}`, 20, startY + 30);
      doc.text(`Bill Date: ${bill.billDate || bill.date}`, 20, startY + 40);
      doc.text(`Payment Date: ${bill.date}`, 20, startY + 50);
      doc.text(`Paid By: ${bill.username}`, 20, startY + 60);
      doc.text(`Email: ${bill.email}`, 20, startY + 70);
      doc.text(`Phone: ${bill.phone}`, 20, startY + 80);
      doc.text(`Address: ${bill.address}`, 20, startY + 90);
      
      if (bill.additionalInfo) {
        doc.text(`Additional Info: ${bill.additionalInfo}`, 20, startY + 100);
      }

      doc.save(`${bill.billTitle || bill.title}_Report.pdf`);
    };
  };

  // Handle Delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this bill payment record?")) {
      fetch(`http://localhost:3000/payBill/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => {
          setMyBills(myBills.filter((bill) => bill._id !== id));
        })
        .catch((err) => console.error("Error deleting bill:", err));
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-24 mb-12 px-4 sm:px-6 lg:px-8">
      {/* Total Amount Paid */}
      <div className="w-full flex flex-col justify-center items-center px-6 py-8 bg-linear-to-r from-amber-400 to-amber-200 dark:from-amber-600 dark:to-amber-800 border border-amber-500 rounded-3xl shadow-lg mb-12">
        <div className="flex items-center gap-3 mb-2">
          <FaFileInvoiceDollar className="text-2xl text-amber-800 dark:text-amber-100" />
          <p className="font-bold text-2xl text-amber-900 dark:text-white">
            Total Amount Paid
          </p>
        </div>
        <p className="text-5xl font-extrabold text-amber-800 dark:text-amber-100 mt-2">
          Tk {totalPaid.toLocaleString()}
        </p>
        <div className="mt-3 px-4 py-1 bg-amber-700 dark:bg-amber-900 rounded-full">
          <p className="text-sm font-medium text-white">PAID</p>
        </div>
      </div>

      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Payment History
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Manage, view, download, or delete your paid bill reports in one place
        </p>
      </div>

      {/* Bills Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
        {myBills.map((bill) => (
          <div
            key={bill._id}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            {/* Header Section */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white line-clamp-2">
                  {bill.billTitle || bill.title}
                </h2>
                
                <div className="flex items-center gap-2 mt-2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-linear-to-r from-amber-500 to-amber-400 text-white text-xs font-semibold rounded-full">
                    <MdCategory className="text-xs" />
                    {bill.billCategory || bill.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                    <MdDateRange className="text-xs" />
                    {bill.date}
                  </span>
                </div>
              </div>
            </div>

            {/* Amount Section */}
            <div className="mb-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Amount Paid
                </span>
                <div className="text-right">
                  <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                    Tk {bill.amount}
                  </p>
                  <div className="mt-1 px-3 py-1 bg-green-100 dark:bg-green-900 rounded-full">
                    <p className="text-xs font-semibold text-green-700 dark:text-green-300">PAID</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Location and User Info */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <MdLocationOn className="text-amber-500" />
                <span>{bill.billLocation || bill.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <MdPerson className="text-amber-500" />
                <span>{bill.username}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <MdPhone className="text-amber-500" />
                <span>{bill.phone}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setSelectedBill(bill)}  
                className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-amber-500 to-amber-600 hover:amber-blue-600 hover:to-amber-700 text-white rounded-xl font-medium transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <FaEye className="text-sm" />
                View Details
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => handleDownloadPDF(bill)}
                  className="flex items-center gap-2 px-3 py-2 bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <FaDownload className="text-sm" />
                </button>
                <button
                  onClick={() => handleDelete(bill._id)}
                  className="flex items-center gap-2 px-3 py-2 bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <FaTrashAlt className="text-sm" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {myBills.length === 0 && (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 mx-auto mb-4 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center">
              <FaFileInvoiceDollar className="text-3xl text-amber-600 dark:text-amber-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No Bills Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              You haven't paid any bills yet. Start by paying your first utility bill.
            </p>
          </div>
        </div>
      )}

       
      {selectedBill && (
        <div className="modal modal-open">
          <div className="modal-box max-w-4xl p-0 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Modal Header */}
            <div className="bg-linear-to-r from-amber-500 to-amber-600 px-6 py-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <FaFileInvoiceDollar className="text-2xl text-white" />
                  <h3 className="text-xl font-bold text-white">
                    Bill Payment Details
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedBill(null)}
                  className="btn btn-sm btn-circle bg-white/20 hover:bg-white/30 border-none text-white"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                <div className="space-y-4">
                  <div className="bg-amber-50 dark:bg-gray-700 rounded-2xl p-4">
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                      <MdCategory className="text-amber-500" />
                      Bill Information
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Title</p>
                        <p className="text-lg font-semibold text-gray-800 dark:text-white">
                          {selectedBill.billTitle || selectedBill.title}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-linear-to-r from-amber-500 to-amber-400 text-white text-sm font-semibold rounded-full">
                          {selectedBill.billCategory || selectedBill.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-50 dark:bg-gray-700 rounded-2xl p-4">
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                      <MdLocationOn className="text-amber-500" />
                      Location & Dates
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <MdLocationOn className="text-amber-500" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {selectedBill.billLocation || selectedBill.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MdDateRange className="text-amber-500" />
                        <span className="text-gray-700 dark:text-gray-300">
                          Bill Date: {selectedBill.billDate || selectedBill.date}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MdDateRange className="text-green-500" />
                        <span className="text-gray-700 dark:text-gray-300">
                          Paid on: {selectedBill.date}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                 
                <div className="space-y-4">
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-4 border border-green-200 dark:border-green-800">
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                      <FaFileInvoiceDollar className="text-green-500" />
                      Payment Details
                    </h4>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                        Tk {selectedBill.amount}
                      </p>
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-full">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        <span className="text-sm font-semibold">PAYMENT SUCCESSFUL</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4">
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                      <MdPerson className="text-blue-500" />
                      User Information
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <MdPerson className="text-blue-500" />
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Paid By</p>
                          <p className="font-medium text-gray-800 dark:text-white">{selectedBill.username}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <MdEmail className="text-blue-500" />
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                          <p className="font-medium text-gray-800 dark:text-white">{selectedBill.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <MdPhone className="text-blue-500" />
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Phone</p>
                          <p className="font-medium text-gray-800 dark:text-white">{selectedBill.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <MdHome className="text-blue-500" />
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Address</p>
                          <p className="font-medium text-gray-800 dark:text-white">{selectedBill.address}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

             
              {selectedBill.additionalInfo && (
                <div className="mt-6 bg-gray-50 dark:bg-gray-700 rounded-2xl p-4">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-3">
                    Additional Information
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-600 p-3 rounded-xl">
                    {selectedBill.additionalInfo}
                  </p>
                </div>
              )}

              {/* Modal Actions */}
              <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => handleDownloadPDF(selectedBill)}
                  className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <FaDownload />
                  Download PDF
                </button>
                <button
                  onClick={() => setSelectedBill(null)}
                  className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-semibold transition-all duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPayBills;