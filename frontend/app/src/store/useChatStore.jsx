import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null, //the person we will select to chat with from teh sidebar of people
  isUserLoading: false,
  isMessageLoading: false,
  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const { data } = await axiosInstance.get("/message/users");
      set({ users: data.users });
    } catch (error) {
      toast.error("Error while getting users");
      console.log(error);
    } finally {
      toast.success("All User fetched ")
      set({ isUserLoading: false });
    }
  },
  getMessages: async (userid) => {
    set({ isMessageLoading: true });
    try {
      const { data } = await axiosInstance.get(`/message/${userid}`);
      console.log(data);
      set({ messages: data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isMessageLoading: false });
    }
  },
  setSelectedUser: (user) => set({ selectedUser: user }),
}));
