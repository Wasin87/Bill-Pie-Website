import React, { useContext, useState, useEffect, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import logo from "../../assets/logo.png";
import { FaMoon, FaSun, FaBars, FaUserCircle, FaSignOutAlt, FaHome, FaChartBar, FaTimes, FaFileInvoiceDollar, FaInfoCircle } from "react-icons/fa";
import Swal from "sweetalert2";
 
import { FiDollarSign } from "react-icons/fi";
import { FileText } from "lucide-react";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "winter");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && !event.target.closest('.mobile-menu-btn')) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleThemeToggle = () => setTheme(prev => (prev === "winter" ? "night" : "winter"));

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
            setProfileDropdownOpen(false);
            setMobileMenuOpen(false);
            navigate("/");
          })
          .catch((err) => {
            console.error(err);
            Swal.fire('Error!', 'Something went wrong.', 'error');
          });
      }
    });
  };

  // All navigation links for desktop - Limited to 4-5 items
  const allNavLinks = [
    { to: "/", label: "Home", icon: <FaHome className="w-4 h-4 " /> },
    { to: "/allBills", label: "Bills", icon: <FaFileInvoiceDollar className="w-4 h-4 " /> },
    ...(user ? [
      { to: "/myPayBil", label: "My Bills", icon: <FaUserCircle className="w-4 h-4 " /> },
      { to: "/dashboard", label: "Dashboard", icon: <FaChartBar className="w-4 h-4 " /> }
    ] : []),
    { to: "/about", label: "About", icon: <FaInfoCircle className="w-4 h-4 " /> },
    { to: "/utilities", label: "Utilities", icon: <FiDollarSign className="w-4 h-4 " /> },
    { to: "/features", label: "Features", icon: <FileText className="w-4 h-4 " /> },
     
  ].slice(0, 5); // Limit to maximum 5 items

  // Limited navigation links for mobile center (max 3 items)
  const mobileCenterLinks = allNavLinks.slice(0, 3);

  const profileMenuItems = [
    { to: "/profile", label: "Profile", icon: <FaUserCircle className="mr-2 w-4 h-4" /> },
    { to: "/dashboard", label: "Dashboard", icon: <FaChartBar className="mr-2 w-4 h-4" /> },
    { to: "/utilities", label: "Utilities", icon: <FiDollarSign className="w-4 h-4 " /> },
    { to: "/features", label: "Features", icon: <FileText className="w-4 h-4 " /> },
  ];

  return (
    <nav className="sticky top-0 left-0 w-full z-50 bg-linear-to-r from-amber-400 to-amber-200 dark:from-gray-800 dark:to-amber-900 shadow-lg transition-all duration-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* MAIN NAVBAR ROW - Everything in one line */}
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo with Name */}
          <div className="flex items-center ">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src={logo}
                alt="Bill Pie Logo"
                className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-amber-100 dark:bg-gray-700 p-1 border-2 border-amber-700 dark:border-amber-500 "
              />
              <span className="text-base md:text-lg lg:text-xl font-bold text-gray-900 dark:text-white whitespace-nowrap">
                Bill <span className="text-amber-800 dark:text-amber-400">Pie</span>
              </span>
            </Link>
          </div>

          {/* Center: Desktop Navigation Links (Hidden on mobile) */}
          <div className="hidden md:flex items-center justify-center flex-1 px-4">
            <ul className="flex items-center space-x-1 flex-wrap justify-center">
              {allNavLinks.map((link) => (
                <li key={link.to} className="">
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-1 whitespace-nowrap ${
                        isActive
                          ? "bg-amber-500 dark:bg-amber-700 text-white"
                          : "text-gray-700 dark:text-gray-200 hover:bg-amber-300 dark:hover:bg-gray-700"
                      }`
                    }
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Center: Mobile Navigation Links (3 items max) */}
          <div className="md:hidden flex items-center justify-center flex-1 px-2 overflow-hidden">
            <ul className="flex items-center space-x-1">
              {mobileCenterLinks.map((link) => (
                <li key={link.to} className="">
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `px-2 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 flex items-center gap-1 whitespace-nowrap ${
                        isActive
                          ? "bg-amber-500 dark:bg-amber-700 text-white"
                          : "text-gray-700 dark:text-gray-200 hover:bg-amber-300 dark:hover:bg-gray-700"
                      }`
                    }
                  >
                    <span className="hidden xs:inline">{link.icon}</span>
                    <span className="text-xs">{link.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Actions Section */}
          <div className="flex items-center space-x-2 md:space-x-3 ">
            {/* Theme Toggle */}
            <button
              onClick={handleThemeToggle}
              className="p-1.5 md:p-2 rounded-full hover:bg-amber-300 dark:hover:bg-gray-700 transition-colors duration-200 "
              aria-label="Toggle theme"
            >
              {theme === "night" ? (
                <FaSun className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
              ) : (
                <FaMoon className="w-4 h-4 md:w-5 md:h-5 text-gray-700 dark:text-gray-300" />
              )}
            </button>

            {/* Desktop User Profile */}
            {user ? (
              <div className="hidden md:block relative" ref={profileDropdownRef}>
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-amber-300 dark:hover:bg-gray-700 transition-colors duration-200 "
                  aria-label="User menu"
                >
                  <img
                    src={user.photoURL || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user.displayName || "User") + "&background=amber-500&color=fff"}
                    alt={user.displayName || "User"}
                    className="w-8 h-8 rounded-full border-2 border-amber-600 dark:border-amber-500 "
                    referrerPolicy="no-referrer"
                  />
                  <div className="text-left hidden lg:block">
                    <p className="text-xs font-semibold text-gray-800 dark:text-white truncate max-w-[85px] whitespace-nowrap">
                      {user.displayName?.split(' ')[0] || "User"}
                    </p>
                  </div>
                </button>

                {/* Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">
                        {user.displayName || "User"}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {user.email}
                      </p>
                    </div>
                    {profileMenuItems.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-amber-50 dark:hover:bg-gray-700 transition-colors duration-150 whitespace-nowrap"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        {item.icon}
                        {item.label}
                      </Link>
                    ))}
                    <hr className="my-2 border-gray-200 dark:border-gray-700" />
                    <button
                      onClick={handleSignOut}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-700 transition-colors duration-150 whitespace-nowrap"
                    >
                      <FaSignOutAlt className="mr-2 " />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2 ">
                <Link
                  to="/login"
                  className="px-3 py-1.5 text-sm font-medium text-gray-800 dark:text-white bg-transparent border border-amber-600 rounded-lg hover:bg-amber-500 hover:text-white dark:hover:bg-amber-700 transition-colors duration-200 whitespace-nowrap"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-1.5 text-sm font-medium text-white bg-amber-600 dark:bg-amber-700 rounded-lg hover:bg-amber-700 dark:hover:bg-amber-800 transition-colors duration-200 whitespace-nowrap"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile User Profile */}
            {user && (
              <div className="md:hidden flex items-center space-x-1 ">
                <div className="text-right hidden xs:block">
                  <p className="text-xs font-semibold text-gray-800 dark:text-white truncate max-w-[60px] whitespace-nowrap">
                    {user.displayName?.split(' ')[0] || "User"}
                  </p>
                </div>
                <img
                  src={user.photoURL || "https://via.placeholder.com/150"}
                  alt={user.displayName || "User"}
                  className="w-7 h-7 rounded-full border-2 border-amber-600 dark:border-amber-500 "
                  referrerPolicy="no-referrer"
                />
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 md:p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-amber-300 dark:hover:bg-gray-700 mobile-menu-btn "
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <FaTimes className="w-4 h-4 md:w-5 md:h-5" />
              ) : (
                <FaBars className="w-4 h-4 md:w-5 md:h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div ref={mobileMenuRef} className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50">
          <div className="absolute right-0 top-0 h-full w-64 bg-linear-to-b from-amber-50 to-white dark:from-gray-800 dark:to-gray-900 shadow-xl transform transition-transform duration-300">
            {/* Mobile Menu Header */}
            <div className="p-4 border-b border-amber-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={logo}
                    alt="Bill Pie Logo"
                    className="w-10 h-10 rounded-full bg-amber-100 dark:bg-gray-700 p-1 border-2 border-amber-700 dark:border-amber-500"
                  />
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    Bill <span className="text-amber-800 dark:text-amber-400">Pie</span>
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-amber-200 dark:hover:bg-gray-700"
                  aria-label="Close menu"
                >
                  <FaTimes className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
              
              {user && (
                <div className="flex items-center space-x-3 p-3 bg-amber-100 dark:bg-gray-700 rounded-lg">
                  <img
                    src={user.photoURL || "https://via.placeholder.com/150"}
                    alt={user.displayName || "User"}
                    className="w-10 h-10 rounded-full border-2 border-amber-600"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">
                      {user.displayName || "User"}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-300 truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Links */}
            <div className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-200px)]">
              {allNavLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-colors whitespace-nowrap ${
                      isActive
                        ? "bg-amber-500 text-white dark:bg-amber-700"
                        : "text-gray-700 dark:text-gray-200 hover:bg-amber-100 dark:hover:bg-gray-700"
                    }`
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </NavLink>
              ))}
              
              {!user ? (
                <>
                  <div className="mt-4 pt-4 border-t border-amber-200 dark:border-gray-700">
                    <Link
                      to="/login"
                      className="flex items-center justify-center px-4 py-3 mb-2 bg-linear-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 whitespace-nowrap"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="flex items-center justify-center px-4 py-3 bg-transparent border-2 border-amber-500 text-amber-600 dark:text-amber-400 font-semibold rounded-lg hover:bg-amber-50 dark:hover:bg-gray-700 transition-all duration-300 whitespace-nowrap"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Register
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <div className="mt-4 pt-4 border-t border-amber-200 dark:border-gray-700">
                    <div className="space-y-1">
                      {profileMenuItems.map((item) => (
                        <Link
                          key={item.to}
                          to={item.to}
                          className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-amber-100 dark:hover:bg-gray-700 whitespace-nowrap"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.icon}
                          <span>{item.label}</span>
                        </Link>
                      ))}
                    </div>
                    
                    <button
                      onClick={() => {
                        handleSignOut();
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center space-x-3 w-full px-4 py-3 mt-4 text-red-600 bg-amber-100 dark:text-red-400 hover:bg-amber-200 dark:hover:bg-gray-700 rounded-lg transition-colors whitespace-nowrap"
                    >
                      <FaSignOutAlt />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Mobile Menu Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-amber-200 dark:border-gray-700">
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={handleThemeToggle}
                  className="p-2 rounded-full hover:bg-amber-200 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Toggle theme"
                >
                  {theme === "night" ? (
                    <FaSun className="w-5 h-5 text-yellow-400" />
                  ) : (
                    <FaMoon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;