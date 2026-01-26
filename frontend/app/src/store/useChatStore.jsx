import toast from "react-hot-toast";
import { create } from "zustand";

export const useChatStore = create((set, get) => ({
  messages: [],
  users:[],
  selectedUser:null,//the person we will select to chat with
    isUserLoading:false,
    isMessageLoading:false,

}));
