import React from 'react';
import { Link } from 'react-router-dom';
import Error from '../../assets/ErrorP.png';
const ErrorPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-linear-to-br from-amber-100 to-amber-200 dark:from-gray-950 dark:to-gray-900 text-gray-900 dark:text-gray-100 px-6 py-5">
     <img className='w-[600px] h-[580px]' src={Error} alt="" />
      <Link
        to="/"
        className="px-8 py-3 bg-amber-600 text-white rounded-xl hover:bg-amber-500 transition duration-300 shadow-lg"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
