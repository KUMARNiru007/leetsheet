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
    <nav className="sticky top-0 z-60 w-full mx-auto py-2.5 bg-gray-900/95 shadow-xl shadow-black/20 backdrop-blur-lg border border-gray-700/50 rounded-b-2xl">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6">
        
        {/* Logo (Left) */}
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <img
            src="/leetsheet.svg"
            className="h-12 w-12 bg-[#7df9ff]/20 text-[#7df9ff] border border-[#7df9ff]/30 px-2 py-2 rounded-full"
            alt="Logo"
          />
          <span className="text-xl md:text-2xl font-bold tracking-tight text-gray-100 hidden md:block">
            LeetSheet
          </span>
        </Link>

        {/* Menu (Center) */}
        <div className="navbar-menu flex items-center gap-8">
          <Link 
            to="/" 
            className="text-gray-300 hover:text-[#7df9ff] transition-colors duration-200 text-sm font-medium"
          >
            Home
          </Link>

          {/* Sheets dropdown */}
          <div className="dropdown relative">
            <button
              className="text-gray-300 hover:text-[#7df9ff] transition-colors duration-200 text-sm font-medium flex items-center gap-1"
              onClick={() => toggleDropdown("sheets")}
            >
              Sheets 
              <svg className={`w-4 h-4 transition-transform duration-200 ${openDropdown === "sheets" ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openDropdown === "sheets" && (
              <div className="dropdown-menu absolute top-full left-0 mt-3 bg-gray-900/95 border border-gray-700/50 rounded-xl shadow-2xl min-w-[180px] py-2 z-50">
                <Link 
                  to="/playlist" 
                  className="block px-4 py-3 text-gray-200 hover:text-[#7df9ff]  transition-colors duration-150 text-sm"
                  onClick={() => setOpenDropdown(null)}
                >
                  Company Sheets
                </Link>
                <Link 
                  to="/problems" 
                  className="block px-4 py-3 text-gray-200 hover:text-[#7df9ff]  transition-colors duration-150 text-sm"
                  onClick={() => setOpenDropdown(null)}
                >
                  All Problems
                </Link>
              </div>
            )}
          </div>

          {/* Resources dropdown */}
          <div className="dropdown relative">
            <button
              className="text-gray-300 hover:text-[#7df9ff] transition-colors duration-200 text-sm font-medium flex items-center gap-1"
              onClick={() => toggleDropdown("resources")}
            >
              Resources 
              <svg className={`w-4 h-4 transition-transform duration-200 ${openDropdown === "resources" ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openDropdown === "resources" && (
              <div className="dropdown-menu absolute top-full left-0 mt-3 bg-gray-900/95 border border-gray-700/50 rounded-xl shadow-2xl min-w-[180px] py-2 z-50">
                <Link 
                  to="/about" 
                  className="block px-4 py-3 text-gray-200 hover:text-[#7df9ff]  transition-colors duration-150 text-sm"
                  onClick={() => setOpenDropdown(null)}
                >
                  About
                </Link>
                <Link 
                  to="/FAQ" 
                  className="block px-4 py-3 text-gray-200 hover:text-[#7df9ff]  transition-colors duration-150 text-sm"
                  onClick={() => setOpenDropdown(null)}
                >
                  FAQ
                </Link>
                <Link 
                  to="/blog" 
                  className="block px-4 py-3 text-gray-200 hover:text-[#7df9ff]  transition-colors duration-150 text-sm"
                  onClick={() => setOpenDropdown(null)}
                >
                  Blog
                </Link>
                <Link 
                  to="/support" 
                  className="block px-4 py-3 text-gray-200 hover:text-[#7df9ff]  transition-colors duration-150 text-sm"
                  onClick={() => setOpenDropdown(null)}
                >
                  Support
                </Link>
              </div>
            )}
          </div>

          <Link 
            to="/pricing" 
            className="text-gray-300 hover:text-[#7df9ff] transition-colors duration-200 text-sm font-medium"
          >
            Pricing
          </Link>
        </div>

        {/* Auth/User (Right) */}
        {authUser ? (
          <div className="relative">
            <button 
              className="flex items-center gap-2 p-2 rounded-full hover:bg-[#536878] transition-colors duration-200"
              onClick={() => toggleDropdown("user")}
            >
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-700/50">
                <img
                  src={
                    authUser.image ||
                    "https://avatar.iran.liara.run/public/boy"
                  }
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </button>
            {openDropdown === "user" && (
              
              <div className="dropdown-menu absolute top-full right-0 mt-3 bg-gray-900/95 border border-gray-700/50 rounded-xl shadow-2xl min-w-[220px] py-2 z-50">
                <div className="px-4 py-3">
                  <p className="flex items-center hover:bg-[#536878] px-3 py-2 text-white font-semibold text-sm rounded-md cursor-pointer">
                 {authUser.name}</p>

                </div>
                <Link
                  to="/profile"
                  className="flex items-center gap-3 px-4 py-3 text-gray-200 hover:text-[#7df9ff]  transition-colors duration-150 text-sm"
                  onClick={() => setOpenDropdown(null)}
                >
                  <User className="w-4 h-4" />
                  My Profile
                </Link>
                {authUser.role === "ADMIN" && (
                  <Link
                    to="/add-problem"
                    className="flex items-center gap-3 px-4 py-3 text-gray-200 hover:text-[#7df9ff]  transition-colors duration-150 text-sm"
                    onClick={() => setOpenDropdown(null)}
                  >
                    <Code className="w-4 h-4" />
                    Add Problem
                  </Link>
                )}
                <div className="mt-1 pt-1">
  <LogoutButton className="flex items-center gap-3 w-full justify-start">
    <LogOut className="w-4 h-4" />
    Logout
  </LogoutButton>
</div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link 
              to="/login" 
              className="text-gray-300 hover:text-[#7df9ff] transition-colors duration-200 text-sm font-medium px-4 py-2"
            >
              Log In
            </Link>
            <Link 
              to="/signup" 
              className="bg-[#2c75ff] hover:bg-[#3137fd] text-white px-4 py-2 rounded-3xl text-sm font-medium transition-colors duration-200 border border-[#2c75ff] hover:border-[#3137fd]"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>

      {/* Click outside handler */}
      {openDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setOpenDropdown(null)}
        />
      )}
    </nav>
  );
};

export default Navbar;