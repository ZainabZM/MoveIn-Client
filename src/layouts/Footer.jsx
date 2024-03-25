import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer id="footer">
      <div className="footer-container">
        <div className="footer-links">
          <Link to="/" className="footer-link">
            Home
          </Link>
          <Link to="/about" className="footer-link">
            About
          </Link>
          <Link to="/contact" className="footer-link">
            Contact
          </Link>
        </div>
        <div className="footer-social">
          <a href="#" className="social-link">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="social-link">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="social-link">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Your Website. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
