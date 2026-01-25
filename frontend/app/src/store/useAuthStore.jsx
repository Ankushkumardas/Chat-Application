import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  userData: null,
  isCheckauth: true,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  checkAuth: async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      set({ authUser: null, isCheckauth: false });
      return;
    }
    try {
      const res = await axiosInstance.get("/auth/check");
      // backend returns decoded token / user info in res.data
      set({ authUser: res.data });
    } catch (error) {
      console.log(error);
      set({ authUser: null });
    } finally {
      set({ isCheckauth: false });
    }
  },
  signup: async (payload) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", payload);
      toast.success(
        "Account created successfully. Check your email to verify."
      );
      return res.data;
    } catch (error) {
      const msg = error?.response?.data?.message || "Signup failed";
      toast.error(msg);
      throw error;
    } finally {
      set({ isSigningUp: false });
    }
  },
  login: async (payload) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", payload);
      const accessToken = res?.data?.accessToken;
      const user = res?.data?.user;
      if (accessToken) {
        localStorage.setItem("token", accessToken);
      }
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        set({ authUser: user });
      }
      return res.data;
    } catch (error) {
      const msg = error?.response?.data?.message || "Login failed";
      toast.error(msg);
      throw error;
    } finally {
      set({ isLoggingIn: false });
    }
  },
  verifyEmail: async (payload) => {
    try {
      const res = await axiosInstance.post("/auth/verify-email", payload);
      toast.success("Email verified successfully");
      return res.data;
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Email verification failed"
      );
      throw error;
    }
  },
  logout: async () => {
    try {
      const res = await axiosInstance.post("/auth/logout");
      // clear local storage and auth state regardless of backend response
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      set({ authUser: null });
      if (res?.data?.success) {
        toast.success("Logout successful");
      }
      return res.data;
    } catch (error) {
      // still clear local state if request fails
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      set({ authUser: null });
      throw error;
    }
  },
}));
