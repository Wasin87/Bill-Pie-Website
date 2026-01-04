import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Pages/Footer";

const RootLayouts = () => {
  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 bg-white dark:bg-gray-900 dark:text-white">
      <Navbar />
      <div className="flex-1  py-8 bg-amber-100 dark:bg-gray-950">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayouts;
