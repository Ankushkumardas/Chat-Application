import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";

const MessageInput = () => {
  const [text, setText] = useState("");
  const { sendMessage, selectedUser } = useChatStore();
  const fileinputref = useRef(null);

  const handleSend = (e) => {
    e.preventDefault();
    if (!text.trim() || !selectedUser) return;
    if (sendMessage) sendMessage(text);
    setText("");
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSend} className="flex items-center gap-3">
        <input
          ref={fileinputref}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 px-4 py-3 rounded-full border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-100"
          placeholder={
            selectedUser ? `Message ${selectedUser.name}` : "Select a chat to start"
          }
        />

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm whitespace-nowrap"
          aria-label="Send message"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
