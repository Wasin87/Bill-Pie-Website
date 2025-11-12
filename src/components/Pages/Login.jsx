import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const { signInUser, signInWithGoogle, resetPassword } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [showResetForm, setShowResetForm] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  // ✅ Handle Normal Login
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value.trim();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setError("");
    signInUser(email, password)
      .then((result) => {
        if (result?.user) {
          toast.success("✅ Logged in successfully!");
          navigate("/");
        }
      })
      .catch(() => {
        setError("Invalid email or password. Try again.");
      });
  };

  // ✅ Handle Google Sign In
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((res) => {
        if (!res || !res.user) return;
        const newUser = {
          name: res.user.displayName,
          email: res.user.email,
          image: res.user.photoURL,
        };

        return fetch("http://localhost:3000/users", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(newUser),
        });
      })
      .then((response) => {
        if (response && response.ok) {
          toast.success("✅ Logged in with Google!");
          navigate("/");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("⚠️ Google login failed. Try again!");
      });
  };

  // ✅ Toggle Forget Password Form
  const handleForgetPassword = () => {
    setShowResetForm(!showResetForm);
    setResetEmail("");
    setNewPassword("");
  };

  // ✅ Submit new password
  const handlePasswordResetSubmit = async (e) => {
    e.preventDefault();

    if (!resetEmail || !/\S+@\S+\.\S+/.test(resetEmail)) {
      toast.warning("Enter a valid email!");
      return;
    }
    if (newPassword.length < 6) {
      toast.warning("Password must be at least 6 characters long!");
      return;
    }

    try {
      // 🔹 Try to reset password (via Firebase or custom API)
      const res = await resetPassword(resetEmail, newPassword);

      // যদি Firebase এর custom ফাংশন হয়, তাহলে res null হতে পারে, তাই safe check:
      if (res?.status === 200 || res === true || res === undefined) {
        toast.success("✅ Password reset successfully!");
        setShowResetForm(false);
        setResetEmail("");
        setNewPassword("");
      } else {
        throw new Error("Reset failed");
      }
    } catch (error) {
      console.error("Password Reset Error:", error);
      toast.error("⚠️ Failed to reset password. Please try again!");
    }
  };

  return (
    <div className="card mx-auto w-full max-w-sm shadow-2xl mt-25 mb-10 text-black bg-linear-to-b from-amber-400 to-amber-200 dark:from-gray-800 dark:to-amber-800 dark:text-white">
      <h1 className="text-3xl font-bold text-center mt-5">Login now!</h1>

      {/* ✅ Normal Login Form */}
      <form onSubmit={handleLogin} className="card-body">
        <fieldset className="fieldset">
          <label className="label text-black dark:text-white">Email</label>
          <input
            type="email"
            name="email"
            className="input rounded-xl dark:bg-gray-500"
            placeholder="Enter your email"
            required
          />

          <label className="label text-black dark:text-white">Password</label>
          <input
            type="password"
            name="password"
            className="input rounded-xl dark:bg-gray-500"
            placeholder="Password"
            required
          />

          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

          <div className="flex justify-between mt-2">
            <button
              type="button"
              onClick={handleForgetPassword}
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="btn btn-neutral mt-4 border border-amber-50 rounded-3xl bg-linear-to-b from-amber-600 to-amber-400 text-black dark:text-white"
          >
            Login
          </button>

          <p className="font-semibold m-auto pt-5">
            Don't Have An Account?{" "}
            <Link className="text-blue-600" to="/register">
              Register
            </Link>
          </p>
        </fieldset>
      </form>

      {/* ✅ Forget Password Form */}
      {showResetForm && (
        <div className="px-6 pb-6">
          <h3 className="text-lg font-semibold mb-3 text-center">Reset Password</h3>
          <form onSubmit={handlePasswordResetSubmit}>
            <input
              type="email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              placeholder="Enter your email"
              className="input w-full mb-3 rounded-xl dark:bg-gray-500"
            />
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="input w-full mb-3 rounded-xl dark:bg-gray-500"
            />
            <button
              type="submit"
              className="btn w-full bg-amber-600 text-white rounded-2xl"
            >
              Reset Password
            </button>
          </form>
        </div>
      )}

      {/* ✅ Google Login */}
      <button
        onClick={handleGoogleSignIn}
        className="btn bg-white text-black border-[#e5e5e5] rounded-3xl w-[330px] flex items-center justify-center mb-5 m-auto "
      >
        <svg
          aria-label="Google logo"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <g>
            <path d="m0 0H512V512H0" fill="#fff"></path>
            <path
              fill="#34a853"
              d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
            ></path>
            <path
              fill="#4285f4"
              d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
            ></path>
            <path
              fill="#fbbc02"
              d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
            ></path>
            <path
              fill="#ea4335"
              d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
            ></path>
          </g>
        </svg>
        Login with Google
      </button>
    </div>
  );
};

export default Login;
