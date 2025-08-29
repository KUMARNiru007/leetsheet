import React from "react";
import { Link, Navigate } from "react-router-dom";
import { FaXTwitter, FaGithub, FaLinkedin } from "react-icons/fa6";
import "../index.css";
import { useAuthStore } from "../store/useAuthStore.js";
import Profile from "../pages/Profile.jsx";

const Footer = () => {

    const{authUser} = useAuthStore()
  return (
    <footer className="footer w-full left-0 right-0">
      {/* Top Section - Logo and Tagline */}
      <div className="footer-top flex flex-col gap-1 items-center text-center ml-140">
        <div className="footer-logo ">
          <span className="logo-sheet">Leet</span>
          <span className="logo-sheet">Sheet</span>
        </div>
        <p className="footer-tagline">
          Guiding coders towards success, one problem at a time.
        </p>
      </div>

      {/* Main Content - Four Columns */}
      <div className="footer-container">
        <div className="footer-section">
          <h4 className="footer-subtitle">About Leetsheet</h4>
          <p className="footer-description">
            LeetSheet helps you master coding with problem sheets, progress tracking, and company-focused prep for your dream tech job.
          </p>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-subtitle">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/problems" className="footer-link">Problems</Link></li>
            <li><Link  to="/profile" className="footer-link" element={authUser ? <Profile /> : <Navigate to="/login" />}>Profile</Link></li>
            <li className="footer-link">Report an Issue</li>
            <li className="footer-link">Feedback</li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-subtitle">Contact Us</h4>
          <div className="contact-info">
            <div className="contact-item">
              <FaGithub className="contact-icon" size={18} />
              <span>Github</span>
            </div>
            <div className="contact-item">
              <FaLinkedin className="contact-icon" size={18} />
              <span>Linkedin</span>
            </div>
            <div className="contact-item">
              <FaXTwitter className="contact-icon" size={18} />
              <span>Twitter</span>
            </div>
          </div>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-subtitle">Newsletter</h4>
          <p className="footer-description">
            Stay updated with the latest coding challenges and tips.
          </p>
          <div className="newsletter-form">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="newsletter-input"
            />
            <button className="newsletter-btn">Subscribe</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;