import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

export const BASE_URL = "http://localhost:3000";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  userData: null,
  isCheckauth: true,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  onlineUsers: [],
  socket: null,
  checkAuth: async () => {
    //same when ever teh app refreshed we connect to socket server and if authenticaetd tahn only get connected to socket
    const token = localStorage.getItem("token");
    if (!token) {
      set({ authUser: null, isCheckauth: false });
      return;
    }
    try {
      const res = await axiosInstance.get("/auth/check");
      // console.log(res.data)
      set({ authUser: res.data });
      get().connectSocket();
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
      get().connectSocket();
      return res.data;
      //same while we signup connect to socket server when we are online
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
        //if login successfull tahn connect to socket server
        get().connectSocket();
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
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      set({ authUser: null });
      if (res?.data?.success) {
        toast.success("Logout successful");
      }
      //we call this when ever we disconnect socket to disconnect ffrom teh socket server to
      get().disconnectSocket();
      return res.data;
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      set({ authUser: null });
      throw error;
    }
  },
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/user/update-profile", data);
      const resData = res?.data;
      if (resData?.user) {
        localStorage.setItem("user", JSON.stringify(resData.user));
        set({ authUser: resData.user });
      }
      toast.success(resData?.message || "Profile updated");
      return resData;
    } catch (error) {
      console.log("error while updating users data ", error);
      const msg = error?.response?.data?.message || "Error updating user data";
      toast.error(msg);
      throw error;
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
  //for socket
  connectSocket: () => {
    const { authUser } = get();
    //if there is no authenticated user or there is a connection before than do not craete a duplicate connection
    if (!authUser || get().socket?.connected) return;
    const socket = io(BASE_URL,{
      query:{
        userId:authUser.id,
      }
    });
    socket.connect();
    set({ socket: socket });
    //listen and get onlien users
    socket.on("getOnlineUsers",(userId)=>{
      set({onlineUsers:userId})
    })
  },
  disconnectSocket: () => {
    //if you are connected then only disconnect
    if (get().socket?.connected) get().socket?.disconnect();
    set({ socket: null });
  },
}));
