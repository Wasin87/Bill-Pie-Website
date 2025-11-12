import React, { useContext, useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import logo from "../../assets/logo.png";
import { FaMoon, FaSun, FaBars } from "react-icons/fa";
import Swal from "sweetalert2"; // ✅ SweetAlert import

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);

  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "winter");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleThemeToggle = () => setTheme(prev => (prev === "winter" ? "night" : "winter"));

  // ✅ SweetAlert Sign Out
  const handleSignOut = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will be signed out!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Sign Out!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        signOutUser()
          .then(() => {
            Swal.fire('Signed Out!', 'You have successfully signed out.', 'success');
          })
          .catch((err) => {
            console.error(err);
            Swal.fire('Error!', 'Something went wrong.', 'error');
          });
      }
    });
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-amber-700 dark:text-amber-400 border-b-2 border-amber-700 dark:border-amber-400"
      : "text-gray-800 dark:text-gray-200 hover:text-amber-700 dark:hover:text-amber-400";

  const links = (
    <>
      <li>
        <NavLink to="/" className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/allBills" className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>
          Bills
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink to="/myPayBil" className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>
            My Pay Bills
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <nav className="bg-linear-to-r from-amber-400 to-amber-200 dark:from-gray-700 dark:to-amber-900 shadow-md fixed w-full top-0 left-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo + Theme + Hamburger (mobile) */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <img
              src={logo}
              alt="Logo"
              className="w-12 h-12 border border-b-amber-800 rounded-3xl bg-amber-100 dark:bg-gray-700 p-1"
            />
            <span className="text-xl font-bold text-gray-900 dark:text-white transition">
              Bill <span className="text-amber-800 dark:text-amber-400">Pie</span>
            </span>
          </Link>

          <button
            onClick={handleThemeToggle}
            className="ml-3 text-xl p-2 rounded-full hover:bg-amber-200 dark:hover:bg-gray-600 transition"
          >
            {theme === "night" ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-700" />}
          </button>

          {/* Hamburger icon for mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-2xl p-2 rounded hover:bg-amber-200 dark:hover:bg-gray-600 transition"
          >
            <FaBars />
          </button>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex gap-6 items-center">{links}</ul>

        {/* User / Login/Register buttons */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link to="/profile" className="flex items-center gap-2">
                <img
                  src={user.photoURL || "https://via.placeholder.com/150"}
                  alt={user.displayName || "User"}
                  className="w-10 h-10 rounded-full border border-amber-700" referrerPolicy="no-referrer"
                />
                <span className="text-gray-800 dark:text-gray-200 font-semibold">
                  {user.displayName || "User"}
                </span>
              </Link>
              <button
                onClick={handleSignOut} // ✅ SweetAlert applied
                className="btn btn-sm border border-amber-800 bg-amber-700 dark:bg-amber-600 text-white hover:bg-amber-700 transition"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-linear-to-r from-amber-300 to-amber-100 dark:from-gray-800 dark:to-gray-700 border-t border-amber-400 dark:border-gray-600 shadow-md px-6 py-4 transition-all duration-300">
          <ul className="flex flex-col gap-4">{links}</ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
