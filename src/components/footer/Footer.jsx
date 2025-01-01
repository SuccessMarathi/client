import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footerContainer">
        <p className="siteName">
          Success<span className="footerMarathi">मराठी</span>
        </p>
        <div className="footerLinks">
          <Link to="/privacy-policy" className="footerLink">Privacy Policy</Link>
          <span> | </span>
          <Link to="/terms-and-conditions" className="footerLink">Terms and Conditions</Link>
        </div>
        <p className="owner">© 2024 Akash Rathod. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
