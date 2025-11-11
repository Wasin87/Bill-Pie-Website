
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
    <div className="max-w-lg mx-auto mt-28 mb-10 p-5 bg-amber-100 dark:bg-gray-700 shadow-lg rounded-xl text-gray-800 dark:text-gray-200">
      <h2 className="text-3xl font-bold text-center mb-5">User Profile</h2>

      <div className="flex flex-col items-center gap-3 mb-5">
        <img
          src={formData.photo || "https://via.placeholder.com/150"}
          alt={formData.name || "User"}
          className="w-32 h-32 rounded-full border border-amber-700"
        />
        <h3 className="text-xl font-semibold">{formData.name}</h3>
        <p className="text-gray-700 dark:text-gray-300">{formData.email}</p>
        <button
          className="btn btn-sm mt-3 bg-amber-500 dark:bg-gray-600 text-white"
          onClick={() => setEditMode(!editMode)}
        >
          {editMode ? "Cancel" : "Update Profile"}
        </button>
      </div>

      {editMode && (
        <form onSubmit={handleUpdate} className="flex flex-col gap-3">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="input rounded-xl bg-gray-500 dark:bg-gray-600 text-white"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email (read-only)"
            value={formData.email}
            disabled
            className="input rounded-xl bg-gray-500 dark:bg-gray-600 text-white"
          />
          <input
            type="text"
            name="photo"
            placeholder="Photo URL"
            value={formData.photo}
            onChange={handleChange}
            className="input rounded-xl bg-gray-500 dark:bg-gray-600 text-white"
          />
          <input
            type="password"
            name="password"
            placeholder="New Password (optional)"
            value={formData.password}
            onChange={handleChange}
            className="input rounded-xl bg-gray-500 dark:bg-gray-600 text-white"
          />
          <button type="submit" className="btn btn-neutral rounded-3xl mt-2">
            Save Changes
          </button>
        </form>
      )}
      {message && <p className="mt-3 text-green-500 text-center">{message}</p>}
    </div>
  );
};

export default Profile;
