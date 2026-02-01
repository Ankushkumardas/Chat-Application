import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { IoClose } from "react-icons/io5";
import { FiMenu } from "react-icons/fi";

const ChatHeader = ({ onOpenSidebar }) => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const name = selectedUser?.name ?? "No user selected";
  const suffix = (
    name.replace(/\s+/g, "").slice(-2) || name.slice(0, 1)
  ).toUpperCase();
  const isOnline = Boolean(onlineUsers?.includes(selectedUser?._id));
  const handleClose = () => {
    setSelectedUser(null);
  };
return (
    <div className="flex items-center justify-between p-2">
        <div className="flex items-center gap-3">
            {/* Mobile: show menu button to open sidebar */}
            <button
                onClick={onOpenSidebar}
                className="md:hidden p-1 mr-1 rounded hover:bg-gray-100"
                aria-label="Open chats"
            >
                <FiMenu size={20} />
            </button>
            <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-700">
                    {suffix}
                </div>
                {isOnline && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white" />
                )}
            </div>

            <div className="min-w-0">
                <div className="text-sm font-semibold text-gray-900 truncate">{name}</div>
                <div className="text-xs text-gray-500">
                    {isOnline ? "Online" : "Last seen recently"}
                </div>
            </div>
        </div>

        <button
            onClick={handleClose}
            aria-label="Close chat"
            title="Close"
            className="p-1 rounded hover:bg-gray-100"
        >
            <IoClose size={20} />
        </button>
    </div>
);
};

export default ChatHeader;
