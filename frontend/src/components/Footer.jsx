import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Top Section - Logo and Tagline */}
      <div className="footer-top">
        <div className="footer-logo">
          <span className="logo-leet">Leet</span>
          <span className="logo-labs">Labs</span>
        </div>
        <p className="footer-tagline">
          Empowering Coders to Excel, One Challenge at a Time
        </p>
      </div>

      {/* Main Content - Four Columns */}
      <div className="footer-container">
        <div className="footer-section">
          <h4 className="footer-subtitle">About LeetLabs</h4>
          <p className="footer-description">
            LeetLabs is your ultimate platform for coding excellence. Solve problems, track progress, and grow your skills with our cutting-edge tools and vibrant community.
          </p>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-subtitle">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/problems" className="footer-link">Problems</Link></li>
            <li><Link to="/profile" className="footer-link">Profile</Link></li>
            <li><Link to="/report" className="footer-link">Report an Issue</Link></li>
            <li><Link to="/feedback" className="footer-link">Feedback</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-subtitle">Contact Us</h4>
          <div className="contact-info">
            <div className="contact-item">
              <span className="contact-icon">✉</span>
              <span>shreyansh@leetlabs.in</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📞</span>
              <span>+91 123 456 789</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <span>123 Leet Street, Tech City</span>
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
      
      {/* Bottom Section - Social Media, Copyright, Legal */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <div className="social-media">
            <a href="#" className="social-icon">🐦</a>
            <a href="#" className="social-icon">📷</a>
            <a href="#" className="social-icon">🐙</a>
            <a href="#" className="social-icon">💼</a>
          </div>
          
          <div className="footer-legal">
            <span className="footer-copyright">
              © 2025 LeetLabs. All rights reserved.
            </span>
            <div className="legal-links">
              <Link to="/privacy" className="legal-link">Privacy Policy</Link>
              <Link to="/terms" className="legal-link">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Background Logo Watermark */}
      <div className="footer-watermark">
        <span className="watermark-leet">Leet</span>
        <span className="watermark-labs">Labs</span>
      </div>
    </footer>
  );
};

export default Footer;
