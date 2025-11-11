import React, { use } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomeData = ({ billPromise }) => {
  const billData = use(billPromise);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handlePayBill = (bill) => {
    if (!user) {
      toast.warn("Please login to pay the bill!", { position: "top-center" });
      navigate("/login", { state: { fromBill: bill } }); // store bill info to pay later
      return;
    }

    // ✅ show confirm popup
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
    <div className="mt-5 px-4">
      <div className="text-3xl font-bold flex justify-center items-center text-black dark:text-white">
        <h1>Recent Bills</h1>
      </div>

      <div className="flex justify-center items-center text-gray-600 dark:text-gray-300 mt-3">
        <p>Check out the latest utility bills reported in your area</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center mt-10 mb-5">
        {billData.map((bill) => (
          <div
            key={bill._id}
            className="border border-gray-200 rounded-xl shadow-md p-4 w-full max-w-md h-[400px] flex flex-col justify-between transition-transform duration-300 hover:-translate-y-2 bg-amber-50 py-3 px-5 dark:bg-gray-800"
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
            </div>

            {/* See details */}
                <a className="flex justify-between items-center text-amber-800 dark:text-amber-200 hover:text-amber-600 hover:underline transition-colors duration-300 m-auto">
                   See details
                </a>

            <div className="flex justify-center mt-4">
              <button
                onClick={() => handlePayBill(bill)}
                className="btn px-6 py-2 w-100 bg-linear-to-r from-amber-600 to-amber-400 text-white rounded-2xl"
              >
                Pay Bill
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center">
        <Link to="/allBills">
          <button className="btn mb-8 mt-4 px-10 bg-linear-to-r from-amber-800 to-amber-600 text-white rounded-md border-none">
            Show All Bills
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomeData;
