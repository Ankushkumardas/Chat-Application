import React from "react";
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
    <div className=" container mx-auto">
      <div className=" flex justify-between p-2  ">
        <h1>Navbar</h1>
        <div className=" flex gap-2">
          {authUser ? (
            <button
              onClick={handlelogout}
              className="bg-red-500 rounded-md px-2 py-1 text-white hover:cursor-pointer"
            >
              Logout
            </button>
          ) : (
            <>
              <button type="" className="px-2 py-1 rounded-md ">
                <NavLink to={"/signup"}>SignUp</NavLink>
              </button>
              <button type="" className="px-2 py-1 rounded-md ">
                <NavLink to={"/login"}>Login</NavLink>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
