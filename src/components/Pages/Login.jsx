import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const { signInUser, signInWithGoogle, resetPassword } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [emailForReset, setEmailForReset] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value.trim();

    // ✅ Professional validation
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
        console.log("Logged in:", result.user);
        toast.success("✅ Logged in successfully!");
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        setError("Invalid email or password. Try again.");
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const newUser = {
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
        };

        fetch("http://localhost:3000/users", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then(() => {
            toast.success("✅ Logged in with Google!");
            navigate("/");
          });
      })
      .catch((error) => {
        console.error(error);
        toast.error("Google login failed.");
      });
  };

  // ✅ Forget password handler
  const handleForgetPassword = () => {
    if (!emailForReset) {
      toast.warning("Enter your email first!");
      return;
    }
    resetPassword(emailForReset)
      .then(() => {
        toast.success("Password reset email sent! Check your inbox.");
      })
      .catch(() => {
        toast.error("Failed to send reset email. Try again.");
      });
  };

  return (
    <div className="card mx-auto w-full max-w-sm shadow-2xl mt-25 mb-10 text-black bg-linear-to-b from-amber-400 to-amber-200 dark:from-gray-800 dark:to-amber-800 dark:text-white">
      <h1 className="text-3xl font-bold text-center mt-5">Login now!</h1>

      <form onSubmit={handleLogin} className="card-body">
        <fieldset className="fieldset">
          <label className="label text-black dark:text-white">Email</label>
          <input
            type="email"
            name="email"
            onChange={(e) => setEmailForReset(e.target.value)}
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

      {/* Google */}
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
