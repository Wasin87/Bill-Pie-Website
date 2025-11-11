import React, { useContext, useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import logo from "../../assets/logo.png";
import { FaMoon, FaSun } from "react-icons/fa";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);

  // Load saved theme or default to "winter"
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "winter";
  });

  // Apply theme to HTML tag whenever it changes
  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle theme handler
  const handleThemeToggle = () => {
    setTheme((prev) => (prev === "winter" ? "night" : "winter"));
  };

  const handleSignOut = () => {
    signOutUser().catch(console.error);
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
      <div className="navbar-start flex items-center gap-2">
        <img
          src={logo}
          alt="logo"
          className="w-12 h-12 border border-b-amber-800 rounded-3xl bg-amber-100 dark:bg-gray-700 p-1"
        />
        <Link
          to="/"
          className="btn btn-ghost text-xl dark:text-white transition"
        >
          Bill <span className="text-amber-800 dark:text-amber-400">Pie</span>
        </Link>

        {/* ✅ Theme Toggle Button */}
        <button
          onClick={handleThemeToggle}
          className="ml-3 text-xl p-2 rounded-full hover:bg-amber-200 dark:hover:bg-gray-600 transition"
        >
          {theme === "night" ? (
            <FaSun className="text-yellow-400" />
          ) : (
            <FaMoon className="text-gray-700" />
          )}
        </button>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      <div className="navbar-end flex items-center gap-3">
        {user ? (
          <>
            <Link to="/profile" className="flex items-center gap-2">
              <img
                src={user.photoURL || "https://via.placeholder.com/150"}
                alt={user.displayName || "User"}
                className="w-10 h-10 rounded-full border border-amber-700"
              />
              <span className="text-gray-800 dark:text-gray-200 font-semibold">
                {user.displayName || "User"}
              </span>
            </Link>

            <button
              onClick={handleSignOut}
              className="btn btn-sm border border-amber-800 bg-amber-700 dark:bg-amber-600 text-white hover:bg-amber-700 transition"
            >
              Sign Out
            </button>
          </>
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
