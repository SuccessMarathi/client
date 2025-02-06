import React from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-container">
      <h2>Privacy Policy</h2>
      <div className="privacy-content">
        <p><strong>Who we are</strong><br />
        Our website address is: <a href="https://SuccessMarathi.Vercel.app" target="_blank" rel="noopener noreferrer">SuccessMarathi.Vercel.app</a>
        </p>

        <p><strong>Comments</strong><br />
        When visitors leave comments, we collect the data shown in the comments form, along with the visitor’s IP address and browser user agent string to help with spam detection.
        </p>

        <p><strong>Media</strong><br />
        Avoid uploading images with embedded location data (EXIF GPS), as visitors can extract location data from images.
        </p>

        <p><strong>Cookies</strong><br />
        If you leave a comment, you may opt-in to saving your details in cookies for convenience. These cookies last for one year.
        </p>

        <p><strong>Embedded Content</strong><br />
        Articles on this site may include embedded content (videos, images, etc.), which behaves just as if you visited the other website.
        </p>

        <p><strong>Who we share your data with</strong><br />
        If you request a password reset, your IP address will be included in the reset email.
        </p>

        <p><strong>How long we retain your data</strong><br />
        Comments and metadata are retained indefinitely for recognition and approval.
        </p>

        <p><strong>Your data rights</strong><br />
        If you have an account, you can request an exported file of your personal data or request its deletion.
        </p>

        <p><strong>Where we send your data</strong><br />
        Visitor comments may be checked through an automated spam detection service.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;