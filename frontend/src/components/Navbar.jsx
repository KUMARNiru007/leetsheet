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
          <div className="dropdown">
            <button 
              className="navbar-link dropdown-toggle"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Solutions ▼
            </button>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/problems" className="dropdown-item">Practice Problems</Link>
                <Link to="/sheets" className="dropdown-item">Study Sheets</Link>
                <Link to="/contests" className="dropdown-item">Coding Contests</Link>
                <Link to="/tutorials" className="dropdown-item">Tutorials</Link>
              </div>
            )}
          </div>
          <div className="dropdown">
            <button className="navbar-link dropdown-toggle">
              Resources ▼
            </button>
            <div className="dropdown-menu">
              <Link to="/about" className="dropdown-item">About</Link>
              <Link to="/faq" className="dropdown-item">FAQ</Link>
              <Link to="/blog" className="dropdown-item">Blog</Link>
              <Link to="/support" className="dropdown-item">Support</Link>
            </div>
          </div>
          <Link to="/pricing" className="navbar-link">Pricing</Link>
        </div>
        
        <div className="navbar-auth">
          <Link to="/login" className="navbar-link">Login</Link>
          <Link to="/signup" className="navbar-link signup-btn">Get Started</Link>
        </div>
      </div>
    </nav>
  );
}