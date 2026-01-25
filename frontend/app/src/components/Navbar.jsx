import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className=" container mx-auto">
      <div className=" flex justify-between p-2  ">
        <h1>Navbar</h1>
        <div className=" flex gap-2">
          <button
            type=""
            className="px-2 py-1 rounded-md "
          >
            <NavLink to={"/signup"}>SignUp</NavLink>
          </button>
          <button
            type=""
            className="px-2 py-1 rounded-md "
          >
            <NavLink to={"/login"}>Login</NavLink>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
