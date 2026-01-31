import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

const COLOR_CLASSES = [
  "bg-red-500",
  "bg-orange-500",
  "bg-yellow-500",
  "bg-green-500",
  "bg-teal-500",
  "bg-blue-500",
  "bg-indigo-500",
  "bg-purple-500",
  "bg-pink-500",
];

function pickColor(idOrName) {
  const s = String(idOrName || "");
  let hash = 0;
  for (let i = 0; i < s.length; i++)
    hash = (hash << 5) - hash + s.charCodeAt(i);
  return COLOR_CLASSES[Math.abs(hash) % COLOR_CLASSES.length];
}

const Sidebar = () => {
  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUser,
    isUserLoading,
  } = useChatStore();
  const { onlineUsers } = useAuthStore();
  console.log(onlineUsers);
  const userList = users?.filteredusers ?? users ?? [];
  console.log(selectedUser);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUserLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div role="status" className="flex flex-col items-center space-y-2">
          <svg
            className="w-10 h-10 text-blue-600 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
          <span className="text-sm text-gray-600">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto min-w-sm p-3">
      <div className="text-sm font-semibold text-gray-700 mb-3">Chats</div>

      {userList.length === 0 && (
        <div className="text-sm text-gray-500">No users found</div>
      )}

      <div className="space-y-1">
        {userList.map((data) => {
          const id = data._id ?? data.id ?? data.name ?? Math.random();
          const name = (data.name || "Unknown").trim();
          const compact = name.replace(/\s+/g, "");
          const suffix = (
            compact.slice(-2) || compact.slice(0, 1)
          ).toUpperCase();
          const colorClass = pickColor(id);
          return (
            <div
              key={id}
              className={`flex items-center gap-3 p-2 rounded-md cursor-pointer transition-colors ${
                selectedUser?._id === data?._id
                  ? "bg-gray-200"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setSelectedUser(data)}
            >
              <div className="relative">
                <div
                  className={`${colorClass} w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-semibold`}
                >
                  {suffix}
                </div>

                {onlineUsers.includes(data._id) && (
                  <span
                    className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white"
                    aria-hidden="true"
                  />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {name}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
