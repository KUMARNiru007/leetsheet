import React from "react";
import { Link, Navigate } from "react-router-dom";
import { FaXTwitter, FaGithub, FaLinkedin } from "react-icons/fa6";
import "../index.css";
import { useAuthStore } from "../store/useAuthStore.js";
import Profile from "../pages/Profile.jsx";

const Footer = () => {
    const{authUser} = useAuthStore()
  return (
    <footer className="footer w-full left-0 right-0 px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12">
      {/* Top Section - Logo and Tagline */}
            <div className="footer-top flex flex-col gap-1 items-center text-center mb-2 sm:mb-2 md:mb-2 w-full">
                <div className="footer-logo flex justify-center w-full">
                    <h1 className="text-2xl md:text-3xl font-bold text-center">
                        <span className="logo-sheet">Leet</span>
                        <span className="logo-sheet">Sheet</span>
                    </h1>
                </div>
                <p className="footer-tagline text-sm md:text-base max-w-xs sm:max-w-sm md:max-w-md mx-auto">
                    Guiding coders towards success, one problem at a time.
                </p>
            </div>

      {/* Main Content - Four Columns */}
      <div className="footer-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
        <div className="footer-section text-center sm:text-left">
          <h4 className="footer-subtitle text-lg font-semibold mb-3 sm:mb-4">
            About LeetSheet
          </h4>
          <p className="footer-description text-sm md:text-base">
            LeetSheet helps you master coding with problem sheets, progress tracking, and company-focused prep for your dream tech job.
          </p>
        </div>
        
        <div className="footer-section text-center sm:text-left">
          <h4 className="footer-subtitle text-lg font-semibold mb-3 sm:mb-4">
            Quick Links
          </h4>
          <ul className="footer-links space-y-2">
            <li>
              <Link to="/problems" className="footer-link hover:text-[var(--leetsheet-orange)] transition-colors">
                Problems
              </Link>
            </li>
            <li>
              <Link to="/profile" className="footer-link hover:text-[var(--leetsheet-orange)] transition-colors" element={authUser ? <Profile /> : <Navigate to="/login" />}>
                Profile
              </Link>
            </li>
            <li className="footer-link hover:text-[var(--leetsheet-orange)] transition-colors cursor-pointer">
              Report an Issue
            </li>
            <li className="footer-link hover:text-[var(--leetsheet-orange)] transition-colors cursor-pointer">
              Feedback
            </li>
          </ul>
        </div>
        
        <div className="footer-section text-center sm:text-left">
          <h4 className="footer-subtitle text-lg font-semibold mb-3 sm:mb-4">
            Contact Us
          </h4>
          <div className="contact-info flex flex-col items-center sm:items-start space-y-3">
            <a
              href="https://github.com/KUMARNiru007/leetsheet"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-item flex items-center gap-2 hover:text-[var(--leetsheet-orange)] transition-colors"
            >
              <FaGithub className="contact-icon" size={18} />
              <span>Github</span>
            </a>

            <a
              href="https://www.linkedin.com/in/kumarnirupam/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-item flex items-center gap-2 hover:text-[var(--leetsheet-orange)] transition-colors"
            >
              <FaLinkedin className="contact-icon" size={18} />
              <span>LinkedIn</span>
            </a>

            <a
              href="https://x.com/KumarNirupam1"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-item flex items-center gap-2 hover:text-[var(--leetsheet-orange)] transition-colors"
            >
              <FaXTwitter className="contact-icon" size={18} />
              <span>Twitter</span>
            </a>
          </div>
        </div>
        
        <div className="footer-section text-center sm:text-left">
          <h4 className="footer-subtitle text-lg font-semibold mb-3 sm:mb-4">
            Newsletter
          </h4>
          <p className="footer-description text-sm md:text-base mb-3 sm:mb-4">
            Stay updated with the latest coding challenges and tips.
          </p>
          <div className="newsletter-form flex flex-col sm:flex-row gap-2 max-w-xs mx-auto sm:mx-0">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="newsletter-input w-full px-3 py-2 rounded text-sm"
            />
            <button className="newsletter-btn px-4 py-2 rounded whitespace-nowrap text-sm font-medium">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;