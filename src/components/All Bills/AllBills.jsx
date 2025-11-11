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
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3000/bills")
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

  const categories = ["Electricity", "Gas", "Internet", "Water"];

  const filteredBills = billsData.filter((bill) => {
    const matchesSearch =
      bill.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bill.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bill.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = activeCategory
      ? bill.category === activeCategory
      : true;

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

  const handlePayBill = (bill) => {
    if (!user) {
      toast.warn("Please login to pay the bill!", { position: "top-center" });
      navigate("/login", { state: { fromBill: bill } }); // go to login with bill info
      return;
    }

    // ✅ Show confirmation popup
    if (window.confirm("Are you sure you want to pay this bill?")) {
      const payData = {
        title: bill.title,
        category: bill.category,
        amount: bill.amount,
        image: bill.image,
        location: bill.location,
        description: bill.description,
        date: bill.date,
      };

      fetch("http://localhost:3000/payBill", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payData),
      })
        .then((res) => res.json())
        .then(() =>
          toast.success("✅ Bill Paid Successfully!", {
            position: "top-center",
          })
        )
        .catch((err) => console.error("Error saving bill:", err));
    }
  };

  return (
    <div className="mt-28 px-10">
      <div className="text-3xl font-bold flex justify-center items-center text-black dark:text-white">
        <h1>All Utility Bills</h1>
      </div>
      <div className="flex justify-center items-center text-gray-600 dark:text-gray-300 mt-2">
        <p>Browse and manage all available utility bills</p>
      </div>

      {/* ✅ Category + Search */}
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
            className="w-full md:w-64 px-4 py-2 bg-amber-50 border border-amber-500 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 dark:bg-gray-700 dark:text-gray-200"
          />
        </div>
      </div>

      {/* ✅ Loader */}
      {(loading || filtering) ? (
        <div className="flex justify-center items-center mt-10">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-amber-500 border-b-4"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center mt-6 mb-5">
            {filteredBills.length > 0 ? (
              filteredBills.map((bill) => (
                <div
                  key={bill._id}
                  className="border border-gray-200 rounded-2xl shadow-md p-4 w-full max-w-md h-[420px] flex flex-col justify-between bg-amber-50 hover:shadow-lg transition-transform duration-300 hover:-translate-y-2 dark:bg-gray-800"
                >
                  <div>
                    <img
                      className="w-full h-[200px] object-cover rounded-md"
                      src={bill.image}
                      alt={bill.title}
                    />
                    <div className="flex items-center justify-between mt-3">
                      <p className="font-bold text-lg text-gray-900 dark:text-gray-50">
                        {bill.title}
                      </p>
                      <span className="text-xs bg-amber-200 text-amber-800 px-2 py-1 rounded-full">
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
                  </div>

            {/* See details */}
                <a className="flex justify-between items-center text-gray-800 dark:text-gray-200 hover:text-amber-600 hover:underline transition-colors duration-300 m-auto">
                   See details
                </a>
                

                  <div className="flex justify-center mt-4">
                    <button
                      onClick={() => handlePayBill(bill)}
                      className="px-6 py-2 w-80 bg-linear-to-r from-amber-600 to-amber-400 text-white rounded-2xl hover:opacity-90 transition"
                    >
                      Pay Bill
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center mt-10">
                No bills available.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AllBills;
