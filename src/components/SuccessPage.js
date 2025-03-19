import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();

  // Redirect to home after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/packages"); // Redirect to the home page
    }, 5000); // 5 seconds delay

    return () => clearTimeout(timer); // Cleanup timer
  }, [navigate]);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Payment Successful!</h2>
      <p style={styles.message}>
        Thank you for your payment. Your transaction was completed successfully.
      </p>
      <p style={styles.redirectMessage}>
        You will be redirected to the home page shortly...
      </p>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f0f8ff",
    padding: "20px",
    textAlign: "center",
    marginTOP: "60px",
  },
  heading: {
    fontSize: "2rem",
    color: "#4CAF50",
    marginBottom: "20px",
  },
  message: {
    fontSize: "1.2rem",
    color: "#333",
    marginBottom: "10px",
  },
  redirectMessage: {
    fontSize: "1rem",
    color: "#666",
  },
};

export default SuccessPage;
