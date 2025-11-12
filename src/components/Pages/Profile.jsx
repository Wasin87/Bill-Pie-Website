import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";

const Profile = () => {
  const { user, updateUserProfile, loading } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photo: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.displayName || "",
        email: user.email || "",
        photo: user.photoURL || "",
        password: "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      await updateUserProfile({
        displayName: formData.name,
        photoURL: formData.photo,
      });
      setMessage("Profile updated successfully!");
      setEditMode(false);
    } catch (error) {
      console.error("Update error:", error);
      setMessage("Failed to update profile.");
    }
  };

  if (loading) {
    return (
      <p className="text-center mt-28 text-gray-700 dark:text-gray-300">
        Loading profile...
      </p>
    );
  }

  if (!user) {
    return (
      <p className="text-center mt-28 text-gray-700 dark:text-gray-300">
        Please login to view profile.
      </p>
    );
  }

  return (
    <div className="max-w-lg mx-auto mt-28 mb-12 p-6 rounded-3xl shadow-2xl 
      bg-linear-to-br from-amber-200 to-amber-400 dark:from-gray-800 dark:to-gray-700
      border border-amber-400 dark:border-gray-600 transition-colors duration-500">

      <h2 className="text-4xl font-extrabold text-center mb-6 text-gray-900 dark:text-white">
        User Profile
      </h2>

      <div className="flex flex-col items-center gap-4 mb-6">
        <div className="relative">
          <img
            src={formData.photo || "https://via.placeholder.com/150"}
            alt={formData.name || "User"}
            className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-600 shadow-lg" referrerPolicy="no-referrer"
          />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{formData.name}</h3>
        <p className="text-gray-700 dark:text-gray-300">{formData.email}</p>
        <button
          onClick={() => setEditMode(!editMode)}
          className="px-6 py-2 mt-2 font-semibold rounded-full
            bg-linear-to-r from-amber-500 to-amber-600 dark:from-gray-600 dark:to-amber-700
            text-white dark:text-amber-300 shadow-md hover:scale-105 transition-transform duration-300"
        >
          {editMode ? "Cancel" : "Update Profile"}
        </button>
      </div>

      {editMode && (
        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="input rounded-2xl px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-inner border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email (read-only)"
            value={formData.email}
            disabled
            className="input rounded-2xl px-4 py-2 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 shadow-inner border border-gray-300 dark:border-gray-600 cursor-not-allowed"
          />
          <input
            type="text"
            name="photo"
            placeholder="Photo URL"
            value={formData.photo}
            onChange={handleChange}
            className="input rounded-2xl px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-inner border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
          />
          <input
            type="password"
            name="password"
            placeholder="New Password (optional)"
            value={formData.password}
            onChange={handleChange}
            className="input rounded-2xl px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-inner border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
          />
          <button
            type="submit"
            className="px-6 py-2 mt-2 font-bold rounded-full
              bg-linear-to-r from-amber-500 to-amber-700 dark:from-gray-600 dark:to-amber-700
              text-white dark:text-amber-200 shadow-lg hover:scale-105 transition-transform duration-300"
          >
            Save Changes
          </button>
        </form>
      )}

      {message && (
        <p className="mt-4 text-center font-semibold text-green-600 dark:text-green-400">
          {message}
        </p>
      )}
    </div>
  );
};

export default Profile;
