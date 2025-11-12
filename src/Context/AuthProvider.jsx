import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updatePassword,
  updateProfile
} from 'firebase/auth';
import { auth } from '../Firebase/Firebase.init';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  // ✅ New Reset Password (custom form-based)
  const resetPassword = async (email, newPassword) => {
    try {
      // 1️⃣ sign in temporarily
      const userCredential = await signInWithEmailAndPassword(auth, email, newPassword);
      const user = userCredential.user;
      // 2️⃣ update password
      await updatePassword(user, newPassword);
      // 3️⃣ sign out
      await signOut(auth);
      return Promise.resolve("Password updated successfully");
    } catch (error) {
      return Promise.reject(error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    createUser,
    updateUserProfile,
    signInUser,
    signInWithGoogle,
    signOutUser,
    resetPassword, // ✅ Added here
    user,
    loading,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
