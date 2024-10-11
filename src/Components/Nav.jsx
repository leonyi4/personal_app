import React from "react";
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="flex justify-between items-center bg-gray-100 p-4 shadow-md">
      <div className="text-2xl font-bold">Personal Planner App</div>
      <div>
        <ul className="flex space-x-8 text-lg">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-blue-500" : "text-gray-700"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/medicine"
              className={({ isActive }) =>
                isActive ? "text-blue-500" : "text-gray-700"
              }
            >
              Medicine
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/spendings"
              className={({ isActive }) =>
                isActive ? "text-blue-500" : "text-gray-700"
              }
            >
              Spendings
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
