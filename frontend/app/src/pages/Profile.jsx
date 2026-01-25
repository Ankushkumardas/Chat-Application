import { motion } from "framer-motion";

const Profile = () => {
  const data = localStorage.getItem("user");
  const res = JSON.parse(data);

  if (!res) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        No user data found.
      </div>
    );
  }
  const users = Array.isArray(res) ? res : [res];
console.log(users)
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
            className="bg-white shadow-lg rounded-lg p-8 mb-6 w-full max-w-md"
          >
            <h2 className="text-2xl font-bold mb-4 text-blue-600">Profile Details</h2>
            <div className="space-y-3">
              {Object.entries(safeUser).map(([key, value]) => (
                <div key={key} className="flex justify-between border-b pb-2">
                  <span className="font-semibold capitalize text-gray-700">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <span className="text-gray-900">{String(value)}</span>
                </div>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Profile;
