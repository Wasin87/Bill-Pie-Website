import React, { use } from 'react';
import { Link } from 'react-router-dom';

const HomeData = ({ billPromise }) => {
  const billData = use(billPromise); // Resolve the promise
  console.log(billData);

  return (
    <div className="mt-5 px-4">
      <div className="text-3xl font-bold flex justify-center items-center text-black dark:text-white">
        <h1>Recent Bills</h1>
      </div>

      <div className="flex justify-center items-center text-gray-500 mt-3">
        <p>Check out the latest utility bills reported in your area</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center mt-10 mb-5">
        {billData.map(({ _id, image, title, category, location, description, date, amount }) => (
          <div
            key={_id}
            className="border border-gray-200 rounded-xl shadow-md p-4 w-full max-w-md h-[400px] flex flex-col justify-between transition-transform duration-300 hover:-translate-y-2 bg-amber-50 py-3 px-5 dark:bg-gray-800"
          >
            <div>
              <img
                className="w-full h-[200px] object-cover rounded-md"
                src={image}
                alt={title}
              />

              {/* Title and Category */}
              <div className="flex items-center justify-between mt-3">
                <p className="font-bold text-lg dark:text-gray-50">{title}</p>
                <span className="text-xs bg-amber-300 text-amber-800 px-2 py-1 rounded-full">
                  {category}
                </span>
              </div>

              <p className="text-sm text-gray-600 mt-1 dark:text-gray-50">{location}</p>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2 dark:text-gray-50">{description}</p>

              <div className="flex justify-between items-center mt-3">
                <p className="text-gray-700 font-semibold text-sm dark:text-gray-50">Amount: ${amount}</p>
                <p className="text-gray-500 text-xs dark:text-gray-50">{date}</p>
              </div>
            </div>

            {/* Pay Bill Button */}
            <div className="flex justify-center mt-4">
              <Link to={`/payBill/${_id}`}>
                <button className="btn px-6 py-2 w-100 bg-linear-to-r from-amber-600 to-amber-400 text-white  rounded-2xl">
                  Pay Bill
                </button>
              </Link>
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
