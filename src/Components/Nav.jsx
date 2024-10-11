import React from "react";
import { NavLink } from "react-router-dom";
import './Nav.css'

const Nav = () => {
  return (
    <nav>
      <div>Personal Planner App</div>
      <div>
        <ul>
          <li><NavLink to='/'>Home</NavLink></li>
          <li><NavLink to='/medicine'>Medicine</NavLink></li>
          <li><NavLink to='/spendings'>Spendings</NavLink></li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
