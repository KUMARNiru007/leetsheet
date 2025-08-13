import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Check, ChevronDown } from "lucide-react";

const Navbar = () => {
  const { authUser } = useAuthStore();
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity" 
            onClick={() => navigate('/')}
          >
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center shadow-md">
              <Check className="w-5 h-5 text-white font-bold" />
            </div>
            <span className="text-xl font-bold text-gray-900">LeetLab</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-1 cursor-pointer group">
              <span className="text-gray-700 group-hover:text-gray-900 transition-colors">Solutions</span>
              <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-gray-700 transition-colors" />
            </div>
            <div className="flex items-center space-x-1 cursor-pointer group">
              <span className="text-gray-700 group-hover:text-gray-900 transition-colors">Problems</span>
              <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-gray-700 transition-colors" />
            </div>
            <div className="flex items-center space-x-1 cursor-pointer group">
              <span className="text-gray-700 group-hover:text-gray-900 transition-colors">Community</span>
              <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-gray-700 transition-colors" />
            </div>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {!authUser ? (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-gray-900 px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-400 transition-all duration-200 hover:shadow-sm"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Start Now
                </Link>
              </>
            ) : (
              <Link
                to="/dashboard"
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Go to Dashboard
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;