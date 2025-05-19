import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="bg-gray-900 text-white p-4 shadow-md">
    <div className="flex justify-between max-w-4xl mx-auto">
      <Link to="/" className="font-bold text-xl">
        Afghan Proverbs
      </Link>
      <div className="flex gap-4">
        <Link to="/add" className="hover:text-gray-300">
          Add
        </Link>
      </div>
    </div>
  </nav>
);

export default Navbar;
