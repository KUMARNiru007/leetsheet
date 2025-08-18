import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../index.css";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-logo">
            <span className="logo-leet">Leet</span>
            <span className="logo-labs">Lab</span>
          </Link>
        </div>

        <div className="navbar-menu">
          <Link to="/" className="navbar-link">Home</Link>

          {/* Sheets dropdown */}
          <div className="dropdown">
            <button 
              className="navbar-link dropdown-toggle"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Sheets ▼
            </button>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/playlist" className="dropdown-item">Company Sheets</Link>
                <Link to="/problems" className="dropdown-item">All Problems</Link>
              </div>
            )}
          </div>

          {/* Resources dropdown */}
          <div className="dropdown">
            <button className="navbar-link dropdown-toggle">
              Resources ▼
            </button>
            <div className="dropdown-menu">
              <Link to="/about" className="dropdown-item">About</Link>
              <Link to="/FAQ" className="dropdown-item">FAQ</Link>
              <Link to="/blog" className="dropdown-item">Blog</Link>
              <Link to="/support" className="dropdown-item">Support</Link>
            </div>
          </div>

          <Link to="/pricing" className="navbar-link">Pricing</Link>
        </div>

        <div className="navbar-auth">
          <Link to="/login" className="navbar-link">Login</Link>
          <Link to="/signin" className="navbar-link signup-btn">Get Started</Link>
        </div>
      </div>
    </nav>
  );
}
