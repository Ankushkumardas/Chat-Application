import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const data = localStorage.getItem("user");
  const res = JSON.parse(data);
  const navigate = useNavigate();
  if (!res) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        No user data found.
      </div>
    );
  }
  const users = Array.isArray(res) ? res : [res];
  console.log(users);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      {users.map((user, idx) => {
        // Destructure and filter out sensitive fields
        const { password, refreshToken, ...safeUser } = user;
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="bg-white shadow-lg rounded-lg p-8 mb-6 w-full max-w-3xl"
          >
            {/* Header: avatar + basic info */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
          <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-700 mr-4">
            {(
              (safeUser.name || safeUser.firstName || safeUser.fullName)
                ? String(safeUser.name || safeUser.firstName || safeUser.fullName)
              .split(" ")
              .map((s) => s[0])
              .slice(0, 2)
              .join("")
              .toUpperCase()
                : String(safeUser.email || "U").charAt(0).toUpperCase()
            )}
          </div>
          <div>
            <div className="text-lg font-semibold text-gray-900">
              {safeUser.name ||
                [safeUser.firstName, safeUser.lastName].filter(Boolean).join(" ") ||
                safeUser.email ||
                "Unknown User"}
            </div>
            <div className="text-sm text-gray-500">{safeUser.email || ""}</div>
          </div>
              </div>
              <div>
          {safeUser.role && (
            <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm">
              {safeUser.role}
            </span>
          )}
              </div>
            </div>

            {/* Grid of nicely formatted fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {Object.entries(safeUser).map(([key, value]) => {
          const formattedKey = key
            .replace(/([A-Z])/g, " $1")
            .replace(/_/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase());

          let display;
          if (value === null || value === undefined || value === "") {
            display = <span className="text-gray-400">—</span>;
          } else if (typeof value === "boolean") {
            display = <span>{value ? "Yes" : "No"}</span>;
          } else if (
            key.toLowerCase().includes("date") ||
            key.toLowerCase().includes("at") ||
            /created|updated/i.test(key)
          ) {
            const d = new Date(value);
            display = isNaN(d) ? String(value) : d.toLocaleString();
          } else if (typeof value === "object") {
            display = (
              <pre className="bg-gray-50 p-2 rounded text-sm overflow-auto max-h-40">
                {JSON.stringify(value, null, 2)}
              </pre>
            );
          } else {
            display = String(value);
          }

          return (
            <div key={key} className="flex flex-col bg-white p-3 rounded border">
              <div className="text-xs text-gray-500 mb-1">{formattedKey}</div>
              <div className="text-sm text-gray-900 break-words">{display}</div>
            </div>
          );
              })}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-2">
              <button
          onClick={() => navigate("/settings")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
              >
          Update Profile
              </button>
              <button
          onClick={() => navigator.clipboard?.writeText(JSON.stringify(safeUser, null, 2))}
          className="px-4 py-2 border rounded text-sm text-gray-700 hover:bg-gray-50"
              >
          Copy JSON
              </button>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Profile;
