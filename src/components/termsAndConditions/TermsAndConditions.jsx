import React from "react";
import "./TermsAndConditions.css";

const TermsAndConditions = () => {
  return (
    <div className="terms-container">
      <div className="terms-card">
        <h1 className="title">Terms & Conditions</h1>
        <p className="updated">Last updated on 01-02-2025 13:17:13</p>
        <p className="intro">
          These Terms and Conditions, along with the privacy policy or other terms (“Terms”), 
          constitute a binding agreement between <strong>AKASH NAMDEV RATHOD</strong> 
          (“Website Owner” or “we” or “us” or “our”) and you (“you” or “your”).
        </p>

        <div className="terms-content">
          <h2>1. Acceptance of Terms</h2>
          <p>By using our website and availing the Services, you agree that you have read and accepted these Terms.</p>

          <h2>2. User Responsibility</h2>
          <p>You agree to provide accurate and complete information during registration and ensure its security.</p>

          <h2>3. Disclaimer</h2>
          <p>We provide no guarantee as to the accuracy, performance, or reliability of the information and services.</p>

          <h2>4. Limitation of Liability</h2>
          <p>We shall not be liable for any loss or damage incurred as a result of using this website.</p>

          <h2>5. Governing Law</h2>
          <p>These Terms shall be governed by and construed in accordance with the laws of India.</p>

          <h2>6. Contact Information</h2>
          <p>For concerns or communication regarding these Terms, please contact us at <a href="mailto:support@example.com">support@example.com</a>.</p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;