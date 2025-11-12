import React, { use } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  // Check if bill is from current month (November - month 11)
  const isCurrentMonthBill = (billDate) => {
    const currentDate = new Date();
    const billDateObj = new Date(billDate);
    
    // Check if bill is from November (month 10 in JavaScript, 0-indexed)
    // AND current month is also November
    const isBillNovember = billDateObj.getMonth() === 10; // November is month 10 (0-indexed)
    const isCurrentNovember = currentDate.getMonth() === 10;
    
    return isBillNovember && isCurrentNovember && 
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

  // Handle pay bill button click
  const handlePayBillClick = (bill) => {
    if (!user) {
      toast.warn("Please login to pay the bill!", { position: "top-right" });
      navigate("/login", { state: { fromBill: bill } });
      return;
    }

    if (!isCurrentMonthBill(bill.date)) {
      toast.warn("Only bills of the current month can be paid", { position: "top-right" });
      return;
    }

    setSelectedBill(bill);
    setIsModalOpen(true);
  };

  // Handle pay bill form submission
  const handlePayBillSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.username.trim() || !formData.address.trim() || !formData.phone.trim()) {
      toast.error("Please fill in all required fields", { position: "top-right" });
      return;
    }

    // Phone number validation
    const phoneRegex = /^01[3-9]\d{8}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Please enter a valid Bangladeshi phone number", { position: "top-right" });
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
        toast.success("✅ Bill Paid Successfully!", { position: "top-right" });
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
        toast.error(errorData.message || "⚠️ Something went wrong!", { position: "top-right" });
      }
    } catch (err) {
      console.error("Error saving bill:", err);
      toast.error("⚠️ Could not save data!", { position: "top-right" });
    }
  };

  const handleSeeDetails = (bill) => {
    if (!user) {
      toast.warn("Please login to see details!", { position: "top-right" });
      sessionStorage.setItem("pendingBillDetails", JSON.stringify(bill));
      navigate("/login");
      return;
    }
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
    const currentDate = new Date();
    return currentDate.toLocaleString('default', { month: 'long' });
  };

  return (
    <div className="mt-5 px-4">
      <div className="text-3xl font-bold flex justify-center items-center text-black dark:text-white">
        <h1>Recent Bills</h1>
      </div>

      <div className="flex justify-center items-center text-gray-600 dark:text-gray-300 mt-3">
        <p>Check out the latest utility bills reported in your area</p>
      </div>

       
      <div className="flex justify-center items-center mt-2">
        <p className="text-sm text-amber-600 dark:text-amber-400 font-medium">
          💡 Only {getCurrentMonthName()} bills can be paid
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center mt-10 mb-5">
        {billData.map((bill) => {
          const isPayable = isCurrentMonthBill(bill.date);
          const billDate = new Date(bill.date);
          const billMonth = billDate.toLocaleString('default', { month: 'long' });
          
          return (
            <div
              key={bill._id}
              className="border border-gray-200 rounded-xl shadow-md p-4 w-full max-w-md h-[420px] flex flex-col justify-between transition-transform duration-300 hover:-translate-y-2 bg-amber-50 py-3 px-5 dark:bg-gray-800"
            >
              <div>
                <img
                  className="w-full h-[200px] object-cover rounded-md"
                  src={bill.image}
                  alt={bill.title}
                />

                <div className="flex items-center justify-between mt-3">
                  <p className="font-bold text-lg dark:text-gray-50">
                    {bill.title}
                  </p>
                  <span className="text-xs bg-amber-300 text-amber-800 px-2 py-1 rounded-full">
                    {bill.category}
                  </span>
                </div>

                <div className="flex justify-between items-center mt-3">
                  <p className="text-gray-700 font-semibold text-sm dark:text-gray-50">
                    Amount: ৳{bill.amount}
                  </p>
                  <p className="text-gray-500 text-xs dark:text-gray-50">
                    {bill.date}
                  </p>
                </div>

               
                <div className="flex justify-between items-center mt-2">
                  <p className={`text-xs font-medium ${
                    isPayable ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    📅 {billMonth} Bill
                  </p>
                  {!isPayable && (
                    <p className="text-xs text-amber-600">
                      Not payable this month
                    </p>
                  )}
                </div>
              </div>

               
              <button
                onClick={() => handleSeeDetails(bill)}
                className="flex justify-center text-amber-800 dark:text-amber-200 hover:text-amber-600 hover:underline transition-colors duration-300 mt-3"
              >
                See details
              </button>

              {/* Pay Bill Button */}
              <div className="flex flex-col items-center mt-4">
                <button
                  onClick={() => handlePayBillClick(bill)}
                  disabled={!isPayable}
                  className={`px-6 py-2 w-full text-white rounded-2xl transition ${
                    isPayable 
                      ? "bg-linear-to-r from-amber-600 to-amber-400 hover:opacity-90 hover:shadow-lg" 
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  Pay Bill
                </button>
                {!isPayable && (
                  <p className="text-xs text-red-500 mt-1 text-center">
                    Only {getCurrentMonthName()} bills can be paid
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center items-center">
        <Link to="/allBills">
          <button className="btn mb-8 mt-4 px-10 bg-linear-to-r from-amber-800 to-amber-600 text-white rounded-md border-none hover:shadow-lg transition-all">
            Show All Bills
          </button>
        </Link>
      </div>

      {/* Pay Bill Modal */}
      {isModalOpen && selectedBill && (
        <div className="modal modal-open">
          <div className="modal-box bg-white dark:bg-gray-800 border border-amber-200 dark:border-gray-600 max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg text-gray-800 dark:text-white">
                Pay Bill - {selectedBill.title}
              </h3>
              <button 
                onClick={closeModal}
                className="btn btn-sm btn-circle btn-ghost"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handlePayBillSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Read-only fields */}
                <div className="md:col-span-2">
                  <label className="label">
                    <span className="label-text text-gray-700 dark:text-gray-300">Email</span>
                  </label>
                  <input
                    type="email"
                    value={user?.email || ""}
                    readOnly
                    className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text text-gray-700 dark:text-gray-300">Bill ID</span>
                  </label>
                  <input
                    type="text"
                    value={selectedBill._id}
                    readOnly
                    className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text text-gray-700 dark:text-gray-300">Amount (৳)</span>
                  </label>
                  <input
                    type="text"
                    value={selectedBill.amount}
                    readOnly
                    className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                  />
                </div>

                
                <div>
                  <label className="label">
                    <span className="label-text text-gray-700 dark:text-gray-300">Username *</span>
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    className="input input-bordered w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                    placeholder="Enter your username"
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text text-gray-700 dark:text-gray-300">Phone *</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="input input-bordered w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                    placeholder="01XXXXXXXXX"
                    pattern="01[3-9]\d{8}"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="label">
                    <span className="label-text text-gray-700 dark:text-gray-300">Address *</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="input input-bordered w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                    placeholder="Enter your address"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="label">
                    <span className="label-text text-gray-700 dark:text-gray-300">Payment Date</span>
                  </label>
                  <input
                    type="text"
                    value={new Date().toISOString().split('T')[0]}
                    readOnly
                    className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="label">
                    <span className="label-text text-gray-700 dark:text-gray-300">Additional Info</span>
                  </label>
                  <textarea
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleInputChange}
                    className="textarea textarea-bordered w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                    placeholder="Any additional information (optional)"
                    rows="3"
                  />
                </div>
              </div>

              <div className="modal-action mt-6">
                <button type="button" onClick={closeModal} className="btn btn-ghost">
                  Cancel
                </button>
                <button type="submit" className="btn bg-amber-600 hover:bg-amber-700 text-white border-none">
                  Confirm Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeData;