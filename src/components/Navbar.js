import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { BookOpen, Menu, X } from "lucide-react";
import "../styles/Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <BookOpen size={24} />
          <span>Afghan Proverbs</span>
        </Link>

        <button className="navbar-mobile-toggle" onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`navbar-links ${isOpen ? "open" : ""}`}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "navbar-link active" : "navbar-link"
            }
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/add"
            className={({ isActive }) =>
              isActive ? "navbar-link active" : "navbar-link"
            }
            onClick={() => setIsOpen(false)}
          >
            Add Proverb
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
