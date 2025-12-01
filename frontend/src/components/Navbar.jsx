import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { User, Code, LogOut, Menu, X } from "lucide-react";

import LogoutButton from "./LogoutButton.jsx";
import { useAuthStore } from "../store/useAuthStore.js";

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const sheetsRef = useRef(null);
  const userDropdownRef = useRef(null);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);


  // const navigate = useNavigate(); // not needed here; LogoutButton manages navigation
  const { authUser } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => {
      const next = !prev;
      if (next) setOpenDropdown(null);
      return next;
    });
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
      // Check if click is outside both sheets and user dropdowns
      const isOutsideSheets = sheetsRef.current && !sheetsRef.current.contains(event.target);
      const isOutsideUser = userDropdownRef.current && !userDropdownRef.current.contains(event.target);
      
      if (isOutsideSheets && isOutsideUser) {
        setOpenDropdown(null);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 rounded hover:bg-[var(--leetsheet-bg-tertiary)]"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>




        {/* Auth/User (Right) - Hidden on mobile */}
        {authUser && (
          <div className="relative hidden md:block" ref={userDropdownRef}>
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
                <div className="mt-1 pt-1">
                  <LogoutButton className="dropdown-item flex items-center gap-3 w-full justify-start">
                    <LogOut className="w-4 h-4" />
                    Logout
                  </LogoutButton>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
    </nav>
  );
};

export default Navbar;