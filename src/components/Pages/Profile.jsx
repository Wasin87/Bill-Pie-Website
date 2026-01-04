import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiCamera,
  FiLock,
  FiEdit2,
  FiSave,
  FiX,
  FiCheck,
  FiCalendar,
  FiShield,
  FiSmartphone,
  FiMapPin,
  FiUpload
} from "react-icons/fi";
import { toast } from "react-toastify";

const Profile = () => {
  const { user, updateUserProfile, loading } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photo: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: ""
  });
  const [uploading, setUploading] = useState(false);
  const [stats, setStats] = useState({
    totalBills: 0,
    paidBills: 0,
    unpaidBills: 0,
    totalAmount: 0
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.displayName || "",
        email: user.email || "",
        photo: user.photoURL || "",
        phone: user.phoneNumber || "",
        address: user.address || "",
        password: "",
        confirmPassword: ""
      });
      
      // Fetch user stats from API
      fetchUserStats();
    }
  }, [user]);

  const fetchUserStats = async () => {
    try {
      // Fetch user's bills and payments
      const billsRes = await fetch("https://bill-management-db-api.vercel.app/bills");
      const billsData = await billsRes.json();
      
      const paymentsRes = await fetch(`https://bill-management-db-api.vercel.app/payBill/user/${user.email}`);
      const paymentsData = await paymentsRes.json();
      
      setStats({
        totalBills: billsData.length,
        paidBills: paymentsData.length,
        unpaidBills: billsData.length - paymentsData.length,
        totalAmount: billsData.reduce((sum, bill) => sum + parseFloat(bill.amount), 0)
      });
    } catch (error) {
      console.error("Error fetching user stats:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Simulate image upload (in real app, upload to cloud storage)
    setUploading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create local URL for preview
    const imageUrl = URL.createObjectURL(file);
    setFormData({ ...formData, photo: imageUrl });
    setUploading(false);
    
    toast.success("Profile picture uploaded successfully!");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!user) return;

    // Validate passwords match
    if (formData.password && formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      await updateUserProfile({
        displayName: formData.name,
        photoURL: formData.photo,
        phoneNumber: formData.phone,
        address: formData.address
      });

      toast.success("Profile updated successfully!");
      setEditMode(false);
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "U";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-amber-500 border-b-4 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl"
        >
          <FiUser className="text-6xl text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Please Login
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            You need to login to view your profile
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-amber-50 dark:from-gray-900 dark:to-gray-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            My Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your account information and preferences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card & Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="relative h-32 bg-gradient-to-r from-amber-500 to-orange-500">
                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                  <div className="relative">
                    {formData.photo ? (
                      <img
                        src={formData.photo}
                        alt={formData.name}
                        className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-xl object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-xl">
                        <span className="text-4xl font-bold text-white">
                          {getInitial(formData.name)}
                        </span>
                      </div>
                    )}
                    
                    {editMode && (
                      <label className="absolute bottom-2 right-2 bg-white dark:bg-gray-700 p-2 rounded-full shadow-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                        <FiCamera className="text-gray-700 dark:text-gray-300" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-20 pb-6 px-6 text-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {formData.name || "User"}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {formData.email}
                </p>
                
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
                  <FiCalendar className="text-amber-500" />
                  <span>Joined {new Date(user.metadata?.creationTime).toLocaleDateString()}</span>
                </div>

                {!editMode && (
                  <button
                    onClick={() => setEditMode(true)}
                    className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <FiEdit2 />
                    Edit Profile
                  </button>
                )}
              </div>
            </motion.div>

            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <FiShield className="text-amber-500" />
                Account Statistics
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Total Bills</span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {stats.totalBills}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Paid Bills</span>
                  <span className="font-bold text-green-600 dark:text-green-400">
                    {stats.paidBills}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Unpaid Bills</span>
                  <span className="font-bold text-red-600 dark:text-red-400">
                    {stats.unpaidBills}
                  </span>
                </div>
                
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-900 dark:text-white">Total Amount</span>
                    <span className="text-xl font-bold text-amber-600 dark:text-amber-400">
                      ৳{stats.totalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Account Info Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl shadow-xl p-6 text-white"
            >
              <h3 className="text-lg font-bold mb-2">Account Security</h3>
              <p className="text-amber-100 text-sm mb-4">
                Last updated: {new Date().toLocaleDateString()}
              </p>
              <div className="flex items-center gap-2">
                <FiCheck className="text-green-300" />
                <span>Email verified</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Profile Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {editMode ? "Edit Profile Information" : "Profile Information"}
                </h3>
                
                {editMode && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditMode(false);
                        setFormData({
                          name: user.displayName || "",
                          email: user.email || "",
                          photo: user.photoURL || "",
                          phone: user.phoneNumber || "",
                          address: user.address || "",
                          password: "",
                          confirmPassword: ""
                        });
                      }}
                      className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center gap-2"
                    >
                      <FiX />
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <form onSubmit={handleUpdate}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <FiUser className="inline mr-2 text-amber-500" />
                      Full Name
                    </label>
                    {editMode ? (
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                        placeholder="Enter your full name"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-xl text-gray-900 dark:text-white">
                        {formData.name || "Not set"}
                      </div>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <FiMail className="inline mr-2 text-amber-500" />
                      Email Address
                    </label>
                    <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-xl text-gray-900 dark:text-white">
                      {formData.email}
                    </div>
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <FiSmartphone className="inline mr-2 text-amber-500" />
                      Phone Number
                    </label>
                    {editMode ? (
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                        placeholder="01XXXXXXXXX"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-xl text-gray-900 dark:text-white">
                        {formData.phone || "Not set"}
                      </div>
                    )}
                  </div>

                  {/* Address Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <FiMapPin className="inline mr-2 text-amber-500" />
                      Address
                    </label>
                    {editMode ? (
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                        placeholder="Enter your address"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-xl text-gray-900 dark:text-white">
                        {formData.address || "Not set"}
                      </div>
                    )}
                  </div>

                  {/* Password Fields (Edit Mode Only) */}
                  <AnimatePresence>
                    {editMode && (
                      <>
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="md:col-span-2"
                        >
                          <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                            Change Password (Optional)
                          </h4>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="md:col-span-2"
                        >
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            <FiLock className="inline mr-2 text-amber-500" />
                            New Password
                          </label>
                          <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                            placeholder="Leave empty to keep current"
                          />
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          className="md:col-span-2"
                        >
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            <FiLock className="inline mr-2 text-amber-500" />
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                            placeholder="Confirm new password"
                          />
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>

                {editMode && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-700"
                  >
                    <button
                      type="submit"
                      disabled={uploading}
                      className="px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-xl transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {uploading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Uploading...
                        </>
                      ) : (
                        <>
                          <FiSave />
                          Save Changes
                        </>
                      )}
                    </button>
                  </motion.div>
                )}
              </form>

              {/* Current Settings (Read-only) */}
              {!editMode && (
                <div className="mt-8 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Tips</h4>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• Keep your profile information up to date</li>
                    <li>• Use a strong password for better security</li>
                    <li>• Verify your email address for account recovery</li>
                    <li>• Add a profile picture for personalization</li>
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;