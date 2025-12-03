import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

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

  const filteredBills = billsData.filter((bill) => {
    const matchesSearch =
      bill.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bill.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bill.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = activeCategory ? bill.category === activeCategory : true;
    return matchesSearch && matchesCategory;
  });

  const handleCategoryClick = (cat) => {
    setFiltering(true);
    setActiveCategory((prev) => (prev === cat ? "" : cat));
    setTimeout(() => setFiltering(false), 300);
  };

  const handleSearchChange = (e) => {
    setFiltering(true);
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
      toast.warn("Please login to pay the bill!", { position: "top-right" });
      navigate("/login", { state: { fromBill: bill } });
      return;
    }

    // check dynamic month condition
    if (!isCurrentMonthBill(bill.date)) {
      toast.warn("Only current month bills can be paid", { position: "top-right" });
      return;
    }

    setSelectedBill(bill);
    setIsModalOpen(true);
  };

  const handlePayBillSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username.trim() || !formData.address.trim() || !formData.phone.trim()) {
      toast.error("Please fill in all required fields", { position: "top-right" });
      return;
    }

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
        setSelectedBill(null);
        setFormData({
          username: "",
          address: "",
          phone: "",
          additionalInfo: ""
        });
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
    return new Date().toLocaleString("default", { month: "long" });
  };

  return (
    <div className="mt-28 px-10">
      <div className="text-3xl font-bold flex justify-center items-center text-black dark:text-white">
        <h1>All Utility Bills</h1>
      </div>
      <div className="flex justify-center items-center text-gray-600 dark:text-gray-300 mt-2">
        <p>Browse and manage all available utility bills</p>
      </div>

      <div className="flex justify-center items-center mt-2">
        <p className="text-sm text-amber-600 dark:text-amber-400 font-medium">
          💡 Only {getCurrentMonthName()} bills can be paid
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
        <div className="flex gap-2 flex-wrap justify-center md:justify-start">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`px-4 py-2 rounded-full font-medium transition ${
                activeCategory === cat
                  ? "bg-amber-600 text-white"
                  : "bg-amber-300 text-gray-800 hover:bg-amber-500"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center w-full md:w-auto mt-2 md:mt-0">
          <input
            type="text"
            placeholder="Search bills..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full md:w-64 px-4 py-2 bg-amber-50 border border-amber-500 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-400 dark:bg-gray-700 dark:text-gray-200"
          />
        </div>
      </div>

      {/* Bills */}
      {(loading || filtering) ? (
        <div className="flex justify-center items-center mt-10">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-amber-500 border-b-4"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center mt-6 mb-5">
          {filteredBills.length > 0 ? (
            filteredBills.map((bill) => {
              const isPayable = isCurrentMonthBill(bill.date);
              const billDate = new Date(bill.date);
              const billMonth = billDate.toLocaleString("default", { month: "long" });

              return (
                <div
                  key={bill._id}
                  className="border border-gray-200 rounded-2xl shadow-md p-4 w-full max-w-md h-[460px] flex flex-col justify-between bg-amber-50 dark:bg-gray-800"
                >
                  <div>
                    <img
                      className="w-full h-[200px] object-cover rounded-md"
                      src={bill.image}
                      alt={bill.title}
                    />
                    <div className="flex items-center justify-between mt-3">
                      <p className="font-bold text-lg">{bill.title}</p>
                      <span className="text-xs bg-amber-200 text-amber-800 px-2 py-1 rounded-full">
                        {bill.category}
                      </span>
                    </div>

                    <div className="flex justify-between items-center mt-3">
                      <p className="text-gray-700 font-semibold text-sm dark:text-gray-50">
                        Amount: ৳{bill.amount}
                      </p>
                      <p className="text-gray-500 text-xs">{bill.date}</p>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      <p className={`text-xs font-medium ${
                        isPayable ? "text-green-600" : "text-gray-500"
                      }`}>
                        📅 {billMonth} Bill
                      </p>
                      {!isPayable && (
                        <p className="text-xs text-amber-600">Not payable this month</p>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleSeeDetails(bill)}
                    className="flex justify-center text-amber-800 hover:text-amber-600 hover:underline mt-3"
                  >
                    See details
                  </button>

                  <div className="flex flex-col items-center mt-4">
                    <button
                      onClick={() => handlePayBillClick(bill)}
                      disabled={!isPayable}
                      className={`px-6 py-2 w-80 text-white rounded-2xl transition ${
                        isPayable
                          ? "bg-amber-600 hover:bg-amber-700"
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
            })
          ) : (
            <p className="text-gray-500 col-span-full text-center mt-10">
              No bills available.
            </p>
          )}
        </div>
      )}

      {/* Payment Modal */}
      {isModalOpen && selectedBill && (
        <div className="modal modal-open">
          <div className="modal-box bg-white dark:bg-gray-800 max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">
                Pay Bill - {selectedBill.title}
              </h3>
              <button onClick={closeModal} className="btn btn-sm btn-circle btn-ghost">✕</button>
            </div>

            <form onSubmit={handlePayBillSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="label"><span>Email</span></label>
                  <input
                    type="email"
                    value={user?.email || ""}
                    readOnly
                    className="input input-bordered w-full bg-gray-100"
                  />
                </div>

                <div>
                  <label className="label"><span>Bill ID</span></label>
                  <input
                    type="text"
                    value={selectedBill._id}
                    readOnly
                    className="input input-bordered w-full bg-gray-100"
                  />
                </div>

                <div>
                  <label className="label"><span>Amount (৳)</span></label>
                  <input
                    type="text"
                    value={selectedBill.amount}
                    readOnly
                    className="input input-bordered w-full bg-gray-100"
                  />
                </div>

                <div>
                  <label className="label"><span>Username *</span></label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    className="input input-bordered w-full"
                    placeholder="Enter your username"
                  />
                </div>

                <div>
                  <label className="label"><span>Phone *</span></label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="input input-bordered w-full"
                    placeholder="01XXXXXXXXX"
                    pattern="01[3-9]\d{8}"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="label"><span>Address *</span></label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="input input-bordered w-full"
                    placeholder="Enter your address"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="label"><span>Payment Date</span></label>
                  <input
                    type="text"
                    value={new Date().toISOString().split("T")[0]}
                    readOnly
                    className="input input-bordered w-full bg-gray-100"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="label"><span>Additional Info</span></label>
                  <textarea
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleInputChange}
                    className="textarea textarea-bordered w-full"
                    placeholder="Any additional information (optional)"
                  />
                </div>
              </div>

              <div className="modal-action mt-6">
                <button type="button" onClick={closeModal} className="btn btn-ghost">
                  Cancel
                </button>
                <button type="submit" className="btn bg-amber-600 text-white">
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

export default AllBills;
