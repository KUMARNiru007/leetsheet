import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { User, Code, LogOut, Menu, X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.js";
import LogoutButton from "./LogoutButton.jsx";

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const { authUser } = useAuthStore();
  const sheetsRef = useRef(null);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sheetsHover, setSheetsHover] = useState(false);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
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

  // Handle click outside for dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sheetsRef.current && !sheetsRef.current.contains(event.target)) {
        setOpenDropdown(null);
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
              className="text-[var(--leetsheet-text-primary)] font-bold text-xl tracking-wide transition-transform duration-500 translate-x-[-10px]"
            >
              LeetSheet
            </span>
          </div>
        </Link>

        {/* Hamburger Menu Button (visible only on mobile) */}
        <button 
          className="md:hidden flex items-center justify-center p-2 rounded-md text-[var(--leetsheet-text-primary)] hover:bg-[var(--leetsheet-bg-tertiary)] transition-colors duration-200"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

        {/* Desktop Menu (Center) - Hidden on mobile */}
        <div className="hidden md:flex navbar-menu items-center gap-8">
          <Link 
            to="/" 
            className="nav-link-leetsheet text-sm font-medium"
          >
            Home
          </Link>

          {/* Sheets dropdown */}
          <div 
            className="dropdown relative"
            ref={sheetsRef}
            onMouseEnter={() => setSheetsHover(true)}
            onMouseLeave={() => {
              // Only close if not opened by click
              if (openDropdown !== "sheets") {
                setSheetsHover(false);
              }
            }}
          >
            <button
              className="nav-link-leetsheet text-sm font-medium flex items-center gap-1"
              onClick={() => toggleDropdown("sheets")}
              onMouseEnter={() => setSheetsHover(true)}
            >
              Sheets 
              <svg className={`w-4 h-4 transition-transform duration-200 ${(openDropdown === "sheets" || sheetsHover) ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div 
              className={`dropdown-menu absolute top-full left-0 mt-2 bg-[var(--leetsheet-bg-secondary)] border border-[var(--leetsheet-border-primary)] rounded-xl shadow-2xl min-w-[150px] py-2 z-50 ${(openDropdown === "sheets" || sheetsHover) ? "block" : "hidden"}`}
              onMouseEnter={() => setSheetsHover(true)}
              onMouseLeave={() => {
                setSheetsHover(false);
                if (openDropdown === "sheets") {
                  // Keep it open if clicked, but we're leaving the dropdown area
                  // This ensures it stays open until clicked elsewhere
                }
              }}
            >
              <Link 
                to="/playlist" 
                className="dropdown-item block px-4 py-3 text-xs"
                onClick={() => {
                  setOpenDropdown(null);
                  setSheetsHover(false);
                }}
              >
                Company Sheets
              </Link>
              <Link 
                to="/problems" 
                className="dropdown-item block px-4 py-3 text-xs"
                onClick={() => {
                  setOpenDropdown(null);
                  setSheetsHover(false);
                }}
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

        {/* Auth/User (Right) - Hidden on mobile */}
        {authUser ? (
          <div className="relative hidden md:block">
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
          <div className="hidden md:flex items-center gap-4">
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

      {/* Mobile Menu - Full screen overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-[var(--leetsheet-bg-primary)] bg-opacity-95 z-50 flex flex-col pt-20 px-6 overflow-y-auto">
          <div className="flex flex-col space-y-6">
            <Link 
              to="/" 
              className="nav-link-leetsheet text-lg font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            
            {/* Mobile Sheets Menu */}
            <div className="flex flex-col space-y-2">
              <button
                className="nav-link-leetsheet text-lg font-medium flex items-center justify-between py-2"
                onClick={() => toggleDropdown("mobile-sheets")}
              >
                <span>Sheets</span>
                <svg 
                  className={`w-5 h-5 transition-transform duration-200 ${openDropdown === "mobile-sheets" ? "rotate-180" : ""}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {openDropdown === "mobile-sheets" && (
                <div className="flex flex-col space-y-2 pl-4 border-l-2 border-[var(--leetsheet-border-primary)]">
                  <Link 
                    to="/playlist" 
                    className="nav-link-leetsheet text-base py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Company Sheets
                  </Link>
                  <Link 
                    to="/problems" 
                    className="nav-link-leetsheet text-base py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    All Problems
                  </Link>
                </div>
              )}
            </div>
            
            <Link 
              to="/pricing" 
              className="nav-link-leetsheet text-lg font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            
            <Link 
              to="/about" 
              className="nav-link-leetsheet text-lg font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            
            <Link 
              to="/FAQ" 
              className="nav-link-leetsheet text-lg font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </Link>
            
            {/* Mobile Auth Section */}
            <div className="pt-6 border-t border-[var(--leetsheet-border-primary)]">
              {authUser ? (
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[var(--leetsheet-border-primary)]">
                      <img
                        src={authUser.image || "https://avatar.iran.liara.run/public/boy"}
                        alt="User Avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="font-semibold">{authUser.name}</p>
                  </div>
                  
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User className="w-5 h-5" />
                    My Profile
                  </Link>
                  
                  {authUser.role === "ADMIN" && (
                    <Link
                      to="/add-problem"
                      className="flex items-center gap-3 py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Code className="w-5 h-5" />
                      Add Problem
                    </Link>
                  )}
                  
                  <LogoutButton className="flex items-center gap-3 py-2">
                    <LogOut className="w-5 h-5" />
                    Logout
                  </LogoutButton>
                </div>
              ) : (
                <div className="flex flex-col space-y-4">
                  <Link 
                    to="/login" 
                    className="nav-link-leetsheet text-lg font-medium py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Log In
                  </Link>
                  <Link 
                    to="/signup" 
                    className="btn-leetsheet-primary py-3 rounded-3xl text-lg font-medium text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

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