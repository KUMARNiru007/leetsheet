import React, { useState } from "react";
import { Link } from "react-router-dom";
import { User, Code, LogOut } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import LogoutButton from "./LogoutButton";
import "../index.css";

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null); // 'sheets' | 'resources' | null
  const { authUser } = useAuthStore();

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  return (
    <nav className="navbar sticky top-0 z-50 w-4/5 mx-auto py-5 bg-black/15 shadow-lg shadow-neutral-600/5 backdrop-blur-lg border border-gray-200/10 rounded-2xl">
  <div className="navbar-container max-w-6xl mx-auto flex justify-between items-center px-6">
    
    {/* Brand (Left) */}
    <Link to="/" className="flex items-center gap-3">
      <img
        src="/leetlab.svg"
        className="h-12 w-12 bg-primary/20 text-primary border-none px-2 py-2 rounded-full"
        alt="Logo"
      />
      <span className="text-xl md:text-2xl font-bold tracking-tight text-white hidden md:block">
        LeetLab
      </span>
    </Link>

    {/* Menu (Center) */}
    <div className="navbar-menu flex items-center gap-8">
      <Link to="/" className="navbar-link">
        Home
      </Link>

      {/* Sheets dropdown */}
      <div className="dropdown relative">
        <button
          className="navbar-link dropdown-toggle"
          onClick={() => toggleDropdown("sheets")}
        >
          Sheets ▼
        </button>
        {openDropdown === "sheets" && (
          <div className="dropdown-menu absolute top-full left-0 mt-2 bg-base-100 rounded-xl shadow-lg flex flex-col">
            <Link to="/playlist" className="dropdown-item px-4 py-2">
              Company Sheets
            </Link>
            <Link to="/problems" className="dropdown-item px-4 py-2">
              All Problems
            </Link>
          </div>
        )}
      </div>

      {/* Resources dropdown */}
      <div className="dropdown relative">
        <button
          className="navbar-link dropdown-toggle"
          onClick={() => toggleDropdown("resources")}
        >
          Resources ▼
        </button>
        {openDropdown === "resources" && (
          <div className="dropdown-menu absolute top-full left-0 mt-2 bg-base-100 rounded-xl shadow-lg flex flex-col space-y-1">
            <Link to="/about" className="dropdown-item px-4 py-2">
              About
            </Link>
            <Link to="/FAQ" className="dropdown-item px-4 py-2">
              FAQ
            </Link>
            <Link to="/blog" className="dropdown-item px-4 py-2">
              Blog
            </Link>
            <Link to="/support" className="dropdown-item px-4 py-2">
              Support
            </Link>
          </div>
        )}
      </div>

      <Link to="/pricing" className="navbar-link">
        Pricing
      </Link>
    </div>

    {/* Auth/User (Right) */}
    {authUser ? (
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img
              src={
                authUser.image ||
                "https://avatar.iran.liara.run/public/boy"
              }
              alt="User Avatar"
              className="object-cover"
            />
          </div>
        </label>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 space-y-3"
        >
          <li>
            <p className="text-base font-semibold">{authUser.name}</p>
            <hr className="border-gray-200/10" />
          </li>
          <li>
            <Link
              to="/profile"
              className="hover:bg-primary hover:text-white text-base font-semibold"
            >
              <User className="w-4 h-4 mr-2" />
              My Profile
            </Link>
          </li>
          {authUser.role === "ADMIN" && (
            <li>
              <Link
                to="/add-problem"
                className="hover:bg-primary hover:text-white text-base font-semibold"
              >
                <Code className="w-4 h-4 mr-1" />
                Add Problem
              </Link>
            </li>
          )}
          <li>
            <LogoutButton className="hover:bg-primary hover:text-white flex items-center">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </LogoutButton>
          </li>
        </ul>
      </div>
    ) : (
      <div className="navbar-auth flex items-center gap-4">
        <Link to="/login" className="navbar-link">
          Login
        </Link>
        <Link to="/signup" className="navbar-link signup-btn">
          Get Started
        </Link>
      </div>
    )}
  </div>
</nav>

  );
};

export default Navbar;
