import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  const navigate = useNavigate();

  const handlelogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.log(err);
    }
    navigate("/login");
  };

  return (
    <nav className=" backdrop-blur ">
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        <h1 className="text-xl font-semibold text-gray-800 tracking-tight" onClick={()=>navigate("/")}>ChatApp</h1>
        <div className="flex gap-3 items-center">
          {authUser ? (
            <>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `px-3 py-1 rounded transition-colors ${
                    isActive
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-700 hover:bg-blue-50"
                  }`
                }
              >
                Profile
              </NavLink>
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  `px-3 py-1 rounded transition-colors ${
                    isActive
                      ? "bg-green-100 text-green-700"
                      : "text-gray-700 hover:bg-green-50"
                  }`
                }
              >
                Settings
              </NavLink>
              <button
                onClick={handlelogout}
                className="px-3 py-1 rounded text-red-600 border border-red-200 hover:bg-red-50 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  `px-3 py-1 rounded border border-gray-200 transition-colors ${
                    isActive
                      ? "bg-gray-100 text-gray-800"
                      : "text-gray-700 hover:bg-gray-50"
                  }`
                }
              >
                Sign Up
              </NavLink>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `px-3 py-1 rounded border border-gray-200 transition-colors ${
                    isActive
                      ? "bg-gray-100 text-gray-800"
                      : "text-gray-700 hover:bg-gray-50"
                  }`
                }
              >
                Login
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
