import React, { useState } from "react";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { signupSchema } from "../lib/validation";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

const SIgnup = () => {
  const [showpass, setshowpass] = useState(false);
  const [formdata, setformdata] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();
  const navigate = useNavigate();
  const handlesubmit = async (e) => {
    e.preventDefault();
    const result = signupSchema.safeParse(formdata);
    if (!result.success) {
      const errors = result.error.errors.map((err) => err.message).join("\n");
      toast.error(errors);
      return;
    }
    try {
      await signup(formdata);
      toast.success("Signup successful! Check your email for verification link.");
      navigate("/verify-email");
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-sm  border border-slate-200 p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-2 text-center">Create Account</h2>
        <p className="text-gray-500 mb-6 text-center">
          Get started with your free account
        </p>
        <form onSubmit={handlesubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
              name="name"
              value={formdata.name}
              onChange={(e) =>
                setformdata({ ...formdata, name: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              name="email"
              value={formdata.email}
              onChange={(e) =>
                setformdata({ ...formdata, email: e.target.value })
              }
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
                name="password"
                value={formdata.password}
                onChange={(e) =>
                  setformdata({ ...formdata, password: e.target.value })
                }
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
            disabled={isSigningUp}
          >
            {isSigningUp ? "Sigging Up" : "Create Account"}
          </button>
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <NavLink to="/login" className="text-blue-600 hover:underline">
              Sign In
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SIgnup;
