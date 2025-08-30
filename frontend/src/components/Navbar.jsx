import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { User, Code, LogOut } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.js";
import LogoutButton from "./LogoutButton.jsx";

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null); // 'sheets' | 'resources' | null
  const { authUser } = useAuthStore();
  const sheetsRef = useRef(null);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  // Handle scroll events for navbar transparency
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine scroll direction
      if (currentScrollY < lastScrollY) {
        setIsScrollingUp(true);
      } else {
        setIsScrollingUp(false);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  // Handle click outside for user dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sheetsRef.current && !sheetsRef.current.contains(event.target)) {
        if (openDropdown === 'sheets') {
          setOpenDropdown(null);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]);

  return (
    <nav 
      className={`sticky top-0 z-60 w-full mx-auto py-1 border-[var(--leetsheet-bg-secondary)] transition-all duration-300 ${isScrollingUp ? 'bg-transparent' : 'nav-leetsheet'}`}
    >
      <div className="max-w-8xl mx-auto flex justify-between items-center px-6">
        
        {/* Long Logo (Left) */}
<Link
  to="/"
  className="flex items-center hover:opacity-90 transition-all duration-300"
>
  <div className="flex items-center perspective-[1000px]">
    <img
      src="/logo.webp"
      className="h-8 w-13 mt-1"
      alt="Logo"
    />
    <span
      className="text-[var(--leetsheet-text-primary)] font-bold text-xl tracking-wide  transition-transform duration-500 translate-x-[-10px]"
    >
      LeetSheet
    </span>
  </div>
</Link>

        {/* Menu (Center) */}
        <div className="navbar-menu flex items-center gap-8">
          <Link 
            to="/" 
            className="nav-link-leetsheet text-sm font-medium"
          >
            Home
          </Link>

          {/* Sheets dropdown */}
          <div 
            className="dropdown relative group"
            ref={sheetsRef}
          >
            <button
              className="nav-link-leetsheet text-sm font-medium flex items-center gap-1"
              onClick={() => toggleDropdown("sheets")}
            >
              Sheets 
              <svg className={`w-4 h-4 transition-transform duration-200 ${openDropdown === "sheets" ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className={`dropdown-menu absolute top-full left-0 mt-2 bg-[var(--leetsheet-bg-secondary)] border border-[var(--leetsheet-border-primary)] rounded-xl shadow-2xl min-w-[150px] py-2 z-50 ${
              openDropdown === "sheets" ? "block" : "hidden"
            } group-hover:block`}>
              <Link 
                to="/playlist" 
                className="dropdown-item block px-4 py-3 text-xs"
                onClick={() => setOpenDropdown(null)}
              >
                Company Sheets
              </Link>
              <Link 
                to="/problems" 
                className="dropdown-item block px-4 py-3 text-xs"
                onClick={() => setOpenDropdown(null)}
              >
                All Problems
              </Link>
            </div>
          </div>
          <Link 
            to="/pricing" 
            className="nav-link-leetsheet text-sm font-medium"
          >
            Pricing
          </Link>

          <Link 
                  to="/about" 
                  className="nav-link-leetsheet text-sm font-medium"
                  onClick={() => setOpenDropdown(null)}
                >
                  About
                </Link>
                <Link 
                  to="/FAQ" 
                  className="nav-link-leetsheet text-sm font-medium"
                  onClick={() => setOpenDropdown(null)}
                >
                  FAQ
                </Link>
        </div>

        {/* Auth/User (Right) */}
        {authUser ? (
          <div className="relative">
            <button 
              className="flex items-center gap-2 p-2 rounded-full hover:bg-[var(--leetsheet-bg-tertiary)] transition-colors duration-200"
              onClick={() => toggleDropdown("user")}
            >
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[var(--leetsheet-border-primary)]">
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
              
              <div className="dropdown-menu absolute top-full right-0 mt-2 bg-[var(--leetsheet-bg-secondary)] border border-[var(--leetsheet-border-primary)] rounded-xl shadow-2xl min-w-[220px] py-2 z-50">
                <div className="">
                  <p className="flex items-center hover:bg-[var(--leetsheet-bg-tertiary)] px-3 py-2 text-[var(--leetsheet-text-primary)] font-semibold text-sm  cursor-pointer">
                 {authUser.name}</p>

                </div>
                <Link
                  to="/profile"
                  className="dropdown-item flex items-center gap-3 px-4 py-3 text-sm"
                  onClick={() => setOpenDropdown(null)}
                >
                  <User className="w-4 h-4" />
                  My Profile
                </Link>
                {authUser.role === "ADMIN" && (
                  <Link
                    to="/add-problem"
                    className="dropdown-item flex items-center gap-3 px-4 py-3 text-sm"
                    onClick={() => setOpenDropdown(null)}
                  >
                    <Code className="w-4 h-4" />
                    Add Problem
                  </Link>
                )}
                <div className="mt-1 pt-1">
         <LogoutButton className="dropdown-item flex items-center gap-3 w-full justify-start">
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
              className="nav-link-leetsheet text-sm font-medium px-4 py-2"
            >
              Log In
            </Link>
            <Link 
              to="/signup" 
              className="btn-leetsheet-primary px-4 py-2 rounded-3xl text-sm font-medium"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>

      {/* Click outside handler - only for user dropdown */}
      {openDropdown === "user" && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setOpenDropdown(null)}
        />
      )}
    </nav>
  );
};

export default Navbar;