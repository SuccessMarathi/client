import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FailurePage = () => {
  const navigate = useNavigate();

  // Redirect to home after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/admin/phonepay"); // Redirect to the home page
    }, 5000); // 5 seconds delay

    return () => clearTimeout(timer); // Cleanup timer
  }, [navigate]);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Payment Failed!</h2>
      <p style={styles.message}>
        We're sorry, but your payment could not be processed. Please try again.
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
    backgroundColor: "#fff0f0",
    padding: "20px",
    textAlign: "center",
    marginTOP: "60px",
  },
  heading: {
    fontSize: "2rem",
    color: "#FF0000",
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

export default FailurePage;