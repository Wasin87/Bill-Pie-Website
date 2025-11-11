// src/pages/Register.jsx
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle } = useContext(AuthContext);
  const [nameError, setNameError] = useState('');
  const [photoError, setPhotoError] = useState('');
  const [formError, setFormError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const photo = form.photo.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;

    setNameError('');
    setPhotoError('');
    setFormError('');

    if (!name) {
      setNameError('Name is required');
      return;
    }
    if (!photo) {
      setPhotoError('Photo URL is required');
      return;
    }

    try {
      const result = await createUser(email, password);
      await updateUserProfile({ displayName: name, photoURL: photo });

      const user = result.user;
      const newUser = {
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
      };

      const res = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });

      const data = await res.json();
      console.log('User saved:', data);
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error);
      setFormError('Registration failed. Please try again.');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;

      const newUser = {
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
      };

      const res = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });

      const data = await res.json();
      console.log('User saved:', data);
      navigate('/');
    } catch (error) {
      console.error('Google sign-in error:', error);
      setFormError('Google sign-in failed. Please try again.');
    }
  };

  return (
    <div className="card mx-auto w-full max-w-sm shadow-2xl mt-25 mb-10 bg-amber-100 dark:bg-gray-700 dark:text-gray-200">
      <h1 className="text-3xl font-bold text-center mt-5">Register now!</h1>
      <form onSubmit={handleRegister} className="card-body">
        <fieldset className="fieldset">
          <label className="label mt-3 text-white">Your Name</label>
          <input type="text" name="name" className="input rounded-xl bg-gray-500" placeholder='Enter your name' required />
          {nameError && <p className="text-xs text-error mt-1">{nameError}</p>}

          <label className="label text-white">Photo URL</label>
          <input type="text" name="photo" className="input rounded-xl bg-gray-500" placeholder='Enter photo URL' required />
          {photoError && <p className="text-xs text-error mt-1">{photoError}</p>}

          <label className="label text-white">Email</label>
          <input type="email" name="email" className="input rounded-xl bg-gray-500" placeholder='Enter yor email' required />

          <label className="label text-white">Password</label>
          <input type="password" name="password" className="input rounded-xl bg-gray-500" placeholder='Password' required />

          <div className="flex gap-2 mt-2">
            <input type="checkbox" name="term" id="term" required />
            <label htmlFor="term">Accept Terms & Conditions</label>
          </div>

          {formError && <p className="text-xs text-error mt-2">{formError}</p>}

          <button type="submit" className="btn btn-neutral mt-4 rounded-3xl">Register</button>
          <p className="font-semibold m-auto pt-5">
            Already Have An Account? <Link className="text-blue-600" to="/login">Login</Link>
          </p>
        </fieldset>
      </form>

       {/* Google */}
        <button onClick={handleGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5] rounded-3xl w-[330px] flex items-center justify-center mb-5 m-auto ">
         <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
            Register with Google
         </button>
    </div>
  );
};

export default Register;



