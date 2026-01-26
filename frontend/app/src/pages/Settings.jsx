import React, { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

const Settings = () => {
  const userdata = localStorage.getItem("user");
  const data = [JSON.parse(userdata)];

  const [formdata, setformdata] = useState({
    name: "",
    email: "",
    oldPassword: "",
    newPassword: "",
  });
  useEffect(() => {
    if (data && data[0]) {
      setformdata({
        name: data[0].name || "",
        email: data[0].email || "",
        oldPassword: "",
        newPassword: "",
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformdata((prev) => ({ ...prev, [name]: value }));
  };
  const { updateProfile } = useAuthStore();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formdata);
    } catch (err) {
      console.error("Failed to update profile:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Update Accounts Data
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
              value={formdata.name}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md bg-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formdata.email}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md bg-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="oldPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Old Password
            </label>
            <input
              id="oldPassword"
              name="oldPassword"
              type="password"
              placeholder="Current password"
                value={formdata.oldPassword}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md bg-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              New Password
            </label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              placeholder="New password"
                value={formdata.newPassword}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md bg-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => {
                // reset to original values
                if (data && data[0]) {
                  setformdata({
                    name: data[0].name || "",
                    email: data[0].email || "",
                    oldPassword: "",
                    newPassword: "",
                  });
                } else {
                  setformdata({ name: "", email: "", oldPassword: "", newPassword: "" });
                }
              }}
              className="px-4 py-2 text-sm font-medium rounded-md border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium rounded-md bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
