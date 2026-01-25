import React, { useState } from "react";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

const Login = () => {
  const [showpass, setshowpass] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login, isLoggingIn } = useAuthStore();

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form);
      toast.success("Login successful");
      setTimeout(() => {
        navigate("/profile");
      }, 1500);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-sm border border-slate-200 p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-2 text-center">Sign In</h2>
        <p className="text-gray-500 mb-6 text-center">
          Welcome back! Please login to your account
        </p>
        <form onSubmit={handlesubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showpass ? "text" : "password"}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                placeholder="Enter your password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-2 flex items-center text-gray-400 hover:text-gray-600"
                onClick={() => setshowpass(!showpass)}
                tabIndex={-1}
              >
                {showpass ? <FaRegEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? "Signing in..." : "Sign In"}
          </button>
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <NavLink to="/signup" className="text-blue-600 hover:underline">
              Create Account
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
