import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import { useChatStore } from "../store/useChatStore";

const Message = () => {
  const { selectedUser } = useChatStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onOpen = () => setMobileOpen(true);
    window.addEventListener("openSidebar", onOpen);
    return () => window.removeEventListener("openSidebar", onOpen);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  return (
    <div className="h-screen w-full">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="rounded-lg shadow-sm w-full max-w-8xl">
          <div className="flex h-full rounded-md overflow-hidden">
            <Sidebar mobileOpen={mobileOpen} onClose={closeMobile} />
            {!selectedUser ? (
              <NoChatSelected />
            ) : (
              <ChatContainer onOpenSidebar={() => setMobileOpen(true)} onCloseSidebar={closeMobile} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
