import React from 'react';
import electricity from '../../assets/Electry.png';
import gas from '../../assets/gas.png';
import internet from '../../assets/internet.png';
import water from '../../assets/water.png';

const Utilities = () => {
  const utilities = [
    { name: 'Electricity', image: electricity },
    { name: 'Internet', image: internet },
    { name: 'Gas', image: gas },
    { name: 'Water', image: water },
  ];

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center dark:text-gray-50">
        Utility Categories
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {utilities.map((utility) => (
          <div
            key={utility.name}
            className="w-[200px] h-[230px] border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center justify-center bg-white p-5 dark:bg-gray-800"
          >
            <img
              src={utility.image}
              alt={utility.name}
              className="w-20 h-20 object-contain mb-3"
            />
            <p className="font-semibold text-lg text-gray-800 mb-3 dark:text-gray-50">
              {utility.name}
            </p>
            <button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 rounded-lg transition-colors duration-200">
              View Bills
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Utilities;
