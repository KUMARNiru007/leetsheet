import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">LeetLab</h3>
          <p className="footer-description">
            Master coding problems and improve your skills with our comprehensive platform.
          </p>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-subtitle">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/" className="footer-link">Home</Link></li>
            <li><Link to="/problems" className="footer-link">Problems</Link></li>
            <li><Link to="/playlists" className="footer-link">Playlists</Link></li>
            <li><Link to="/faq" className="footer-link">FAQ</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-subtitle">Support</h4>
          <ul className="footer-links">
            <li><Link to="/contact" className="footer-link">Contact</Link></li>
            <li><Link to="/help" className="footer-link">Help Center</Link></li>
            <li><Link to="/feedback" className="footer-link">Feedback</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p className="footer-copyright">
          © 2024 LeetLab. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
