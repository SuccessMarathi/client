// ContactUs.js
import React from "react";
import { FaPhoneAlt, FaEnvelope, FaBuilding, FaMapMarkerAlt } from "react-icons/fa";
import "./ContactUs.css";

const ContactUs = () => {
  return (
    <div className="container">
      <h1 className="header">Contact Us</h1>
      <p className="paragraph">Last updated on 27-01-2025 09:36:44</p>

      <div className="contactInfo">
        <div className="contactItem">
          <FaPhoneAlt className="icon" />
          <span className="contactText">9356743349</span>
        </div>
        <div className="contactItem">
          <FaEnvelope className="icon" />
          <span className="contactText">akashrathod782304@gmail.com</span>
        </div>
      </div>

      <div className="contactInfo">
        <div className="contactItem">
          <FaBuilding className="icon" />
          <span className="contactText">
            <strong>Registered Address:</strong> Saradwadi, Shirur, Pune, Maharashtra, PIN: 412210
          </span>
        </div>

        <div className="contactItem">
          <FaMapMarkerAlt className="icon" />
          <span className="contactText">
            <strong>Operational Address:</strong> Saradwadi, Shirur, Pune, Maharashtra, PIN: 412210
          </span>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;