import React from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="font-bold text-3xl text-gray-800 mb-6 text-center">
        Home
      </h1>
      <div className="flex justify-center space-x-3">
        <button
          className="bg-red-500 text-black py-2 px-4 rounded-lg shadow 
            hover:bg-red-400 transition duration-300 ease-in-out"
        >
          <NavLink to="/medicine">Medicine</NavLink>
        </button>
        <button
          className="bg-blue-500 text-black py-2 px-4 rounded-lg shadow 
            hover:bg-blue-400 transition duration-300 ease-in-out"
        >
          <NavLink to="/spendings">Spendings</NavLink>
        </button>
      </div>
      <div>
        <br></br>
        <br></br>
      </div>
    </div>
  );
};

export default Home;
