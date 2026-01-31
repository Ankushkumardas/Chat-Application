import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
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
      toast.success("All User fetched ");
      set({ isUserLoading: false });
    }
  },
  getMessages: async (userid) => {
    set({ isMessageLoading: true });
    try {
      const { data } = await axiosInstance.get(`/message/${userid}`);
      console.log(data);
      // backend returns { messages: [...], success: true }
      set({ messages: data.messages ?? [] });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isMessageLoading: false });
    }
  },
  setSelectedUser: (user) => set({ selectedUser: user }),
  sendMessage: async (messageData) => {
    console.log("sendMessage payload:", messageData);
    const { selectedUser, messages } = get();
    if (!selectedUser) {
      toast.error("No recipient selected");
      return;
    }
    // backend expects { text, image }
    const body = typeof messageData === "string" ? { text: messageData } : { text: messageData.message ?? messageData.text };
    try {
      const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, body);
      console.log(res.data, "message response");
      if (res.data?.message) {
        set({ messages: [...messages, res.data.message] });
        toast.success("Message sent successfully");
      } else {
        toast.error("Failed to send message");
      }
    } catch (error) {
      console.log("sendMessage error:", error);
      toast.error("Error sending message");
    }
  },
}));
