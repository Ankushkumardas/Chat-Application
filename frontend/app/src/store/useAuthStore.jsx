import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckauth: true,
  isSigningUp: false,
  isLogingIn: false,
  isUpdatingProfile: false,
  checkAuth: async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      set({ authUser: null, isCheckauth: false });
      return;
    }
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res });
    } catch (error) {
        console.log(error)
      set({ authUser: null });
    } finally {
      set({ isCheckauth: false });
    }
  },
}));
