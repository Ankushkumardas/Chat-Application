import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatHeader from "../messages/ChatHeader";
import MessageInput from "../messages/MessageInput";
import { motion, AnimatePresence } from "framer-motion";
const ChatContainer = () => {
  const {
    getMessages,
    messages = [],
    isMessageLoading,
    selectedUser,
    subscribeMessageInRealTime,
    unsubcscribeMessage,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messagesRef = useRef(null);
  useEffect(() => {
    if (selectedUser?._id) getMessages(selectedUser._id);
    subscribeMessageInRealTime();
    //when cleanup to turn of teh socket for newMessage
    return () => unsubcscribeMessage();
  }, [
    selectedUser,
    getMessages,
    unsubcscribeMessage,
    subscribeMessageInRealTime,
  ]);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  if (isMessageLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.24 }}
            className="flex flex-col items-center space-y-3 p-6 bg-white rounded-lg shadow-sm"
            role="status"
          >
            <div className="w-14 h-14 rounded-full border-4 border-t-transparent border-blue-500 animate-spin" />
            <span className="text-sm text-gray-500">Loading messages...</span>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white p-6 min-h-0 overflow-hidden">
      <ChatHeader />

      <div
        ref={messagesRef}
        className="flex-1 mt-4 overflow-y-auto px-2 py-4 bg-gray-50 rounded-lg min-h-0 max-h-[60vh] scrollbar-thin scrollbar-thumb-gray-400"
        role="log"
        aria-live="polite"
        tabIndex={0}
      >
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-500">No messages yet — say hello 👋</p>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence initial={false}>
              {messages.map((m, idx) => {
                const myId =
                  authUser?._id ??
                  authUser?.id ??
                  JSON.parse(localStorage.getItem("user") || "{}")?._id;
                const isMine = String(m.senderId) === String(myId);
                const time = m.createdAt
                  ? new Date(m.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "";
                return (
                  <motion.div
                    key={m._id ?? idx}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.18 }}
                    className={`flex items-end ${
                      isMine ? "justify-end" : "justify-start"
                    }`}
                  >
                    {!isMine && (
                      <div className="flex-shrink-0 mr-3">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-700">
                          {selectedUser?.name
                            ? selectedUser.name
                                .replace(/\s+/g, "")
                                .slice(-2)
                                .toUpperCase()
                            : "U"}
                        </div>
                      </div>
                    )}

                    <div
                      className={`${
                        isMine
                          ? "bg-green-600 text-white"
                          : "bg-white text-gray-900 border border-gray-100"
                      } max-w-[70%] px-4 py-2 rounded-xl shadow-sm`}
                    >
                      <div className="text-sm break-words">
                        {m.text || m.message || m.content}
                      </div>
                      <div
                        className={`text-xs mt-1 ${
                          isMine ? "text-green-100" : "text-gray-400"
                        } text-right`}
                      >
                        {time}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>

      <div className="mt-4">
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatContainer;
