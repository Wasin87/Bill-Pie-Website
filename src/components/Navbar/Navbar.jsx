import React, { useContext, useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import logo from "../../assets/logo.png";
import { FaMoon, FaSun } from "react-icons/fa";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [darkMode, setDarkMode] = useState(false);

  // Load dark mode from localStorage (on page load)
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedMode);
    if (savedMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // ✅ Fixed toggle function
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleSignOut = () => {
    signOutUser()
      .then(() => {})
      .catch(() => {});
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-amber-700 dark:text-amber-400 border-b-2 border-amber-700 dark:border-amber-400"
      : "text-gray-800 dark:text-gray-200 hover:text-amber-700 dark:hover:text-amber-400";

  const links = (
    <>
      <li>
        <NavLink to="/" className={navLinkClass}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/allBills" className={navLinkClass}>
          Bills
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink to="/myPayBil" className={navLinkClass}>
            My Pay Bills
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-linear-to-r from-amber-400 to-amber-200 dark:from-gray-700 dark:to-amber-900 shadow-md px-10 fixed top-0 left-0 w-full z-50 transition-colors duration-300">
      {/* Navbar Start */}
      <div className="navbar-start flex items-center gap-2">
        <img
          src={logo}
          alt="logo"
          className="w-12 h-12 border border-b-amber-800 rounded-3xl bg-amber-100 dark:bg-gray-700 p-1"
        />
        <Link to="/" className="btn btn-ghost text-xl dark:text-white transition">
          Bill <span className="text-amber-800 dark:text-amber-400">Pie</span>
        </Link>

        {/* ✅ Dark/Light Toggle Icon */}
        <button
          onClick={toggleDarkMode}
          className="ml-3 text-2xl text-gray-800 dark:text-yellow-400 transition"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end">
        {user ? (
          <button
            onClick={handleSignOut}
            className="btn border border-amber-800 bg-amber-700 dark:bg-amber-600 text-white hover:bg-amber-700 transition"
          >
            Sign Out
          </button>
        ) : (
          <div className="flex gap-3">
            <Link
              to="/login"
              className="btn border border-amber-800 bg-amber-400 dark:bg-gray-700 dark:text-white hover:bg-amber-400 dark:hover:bg-gray-600"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="btn border border-amber-800 bg-amber-600 dark:bg-gray-800 text-white hover:bg-amber-600 dark:hover:bg-gray-700"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
