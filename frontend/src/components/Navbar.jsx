import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-logo">
            LeetLab
          </Link>
        </div>
        
        <div className="navbar-menu">
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/problems" className="navbar-link">Problems</Link>
          <Link to="/sheets" className="navbar-link">Sheet</Link>
          <Link to="/About" className="navbar-link">About</Link>
        </div>
        
        <div className="navbar-auth">
          <Link to="/login" className="navbar-link">Login</Link>
          <Link to="/signup" className="navbar-link signup-btn">Sign Up</Link>
        </div>
      </div>
    </nav>
  );
}