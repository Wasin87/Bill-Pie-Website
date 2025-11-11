import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllBills = () => {
  const [billsData, setBillsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(""); // Electricity, Gas, Internet, Water
  const [loading, setLoading] = useState(true); // Loading for initial fetch
  const [filtering, setFiltering] = useState(false); // Loading for search/category

  // Fetch bills from API
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

  // Categories
  const categories = ["Electricity", "Gas", "Internet", "Water"];

  // Filtered bills
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

  // Handle Category Click
  const handleCategoryClick = (cat) => {
    setFiltering(true);
    setActiveCategory((prev) => (prev === cat ? "" : cat));
    // Simulate small delay for loading effect
    setTimeout(() => setFiltering(false), 300);
  };

  // Handle Search Input
  const handleSearchChange = (e) => {
    setFiltering(true);
    setSearchQuery(e.target.value);
    setTimeout(() => setFiltering(false), 300);
  };

  return (
    <div className="mt-28 px-4">
      {/* Title */}
      <div className="text-3xl font-bold flex justify-center items-center text-black dark:text-white">
        <h1>All Utility Bills</h1>
      </div>
      <div className="flex justify-center items-center text-gray-500 mt-2">
        <p>Browse and manage all available utility bills</p>
      </div>

      {/* Search & Category */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
        {/* Categories */}
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

        {/* Search */}
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

      {/* Loading */}
      {(loading || filtering) ? (
        <div className="flex justify-center items-center mt-10">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-amber-500 border-b-4  "></div>
        </div>
      ) : (
        <>
          {/* Bills */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center mt-6 mb-5">
            {filteredBills.length > 0 ? (
              filteredBills.map(
                ({
                  _id,
                  image,
                  title,
                  category,
                  location,
                  description,
                  date,
                  amount,
                }) => (
                  <div
                    key={_id}
                    className="border border-gray-200 rounded-2xl shadow-md p-4 w-full max-w-md h-[450px] flex flex-col justify-between bg-amber-50 hover:shadow-lg transition-transform duration-300 hover:-translate-y-2 dark:bg-gray-800"
                  >
                    <div>
                      <img
                        className="w-full h-[200px] object-cover rounded-md"
                        src={image}
                        alt={title}
                      />
                      <div className="flex items-center justify-between mt-3">
                        <p className="font-bold text-lg text-gray-900 dark:text-gray-50">{title}</p>
                        <span className="text-xs bg-amber-200 text-amber-800 px-2 py-1 rounded-full">{category}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1 dark:text-gray-50">{location}</p>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2 dark:text-gray-50">{description}</p>
                      <div className="flex justify-between items-center mt-3">
                        <p className="text-gray-700 font-semibold text-sm dark:text-gray-50">Amount: ${amount}</p>
                        <p className="text-gray-500 text-xs dark:text-gray-50">{date}</p>
                      </div>
                    </div>
                    <div className="flex justify-center mt-4">
                      <Link to={`/payBill/${_id}`}>
                        <button className="px-6 py-2 w-80 bg-linear-to-r from-amber-600 to-amber-400 text-white rounded-2xl hover:opacity-90 transition">
                          Pay Bill
                        </button>
                      </Link>
                    </div>
                  </div>
                )
              )
            ) : (
              <p className="text-gray-500 col-span-full text-center mt-10">No bills available.</p>
            )}
          </div>

          {/* Back Button */}
          <div className="flex justify-center items-center">
            <Link to="/">
              <button className="mb-8 mt-4 px-10 py-2 bg-linear-to-r from-amber-800 to-amber-600 text-white rounded-md border-none hover:opacity-90 transition">
                Back to Home
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default AllBills;
