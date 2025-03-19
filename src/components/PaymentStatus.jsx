import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const PaymentStatus = () => {
  const { orderId } = useParams(); // Get orderId from URL
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // For navigation

  // Fetch payment status when orderId changes
  useEffect(() => {
    if (orderId) {
      fetchStatus();
    }
  }, [orderId]);

  const fetchStatus = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `https://phonepay-gateway-service.onrender.com/order-status/${orderId}`
      );
      setStatus(response.data);
    } catch (err) {
      setError("Failed to fetch payment status. Please try again.");
      console.error("Error fetching payment status:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle retry button click
  const handleRetry = () => {
    fetchStatus();
  };

  // Handle back to home button click
  const handleBackToHome = () => {
    navigate("/"); // Navigate to the home page
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Payment Status for Order ID: {orderId}</h2>
      {loading ? (
        <p style={styles.loading}>Loading...</p>
      ) : error ? (
        <div>
          <p style={styles.error}>{error}</p>
          <button onClick={handleRetry} style={styles.button}>
            Retry
          </button>
        </div>
      ) : (
        status && (
          <div>
            <h3 style={styles.statusHeading}>Payment Details</h3>
            <pre style={styles.statusDetails}>
              {JSON.stringify(status, null, 2)}
            </pre>
            <button onClick={handleBackToHome} style={styles.button}>
              Back to Home
            </button>
          </div>
        )
      )}
    </div>
  );
};

// Styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    textAlign: "center",
  },
  heading: {
    fontSize: "1.5rem",
    marginBottom: "20px",
  },
  loading: {
    fontSize: "1.2rem",
    color: "#666",
  },
  error: {
    fontSize: "1.2rem",
    color: "red",
    marginBottom: "10px",
  },
  statusHeading: {
    fontSize: "1.3rem",
    marginBottom: "10px",
  },
  statusDetails: {
    backgroundColor: "#f5f5f5",
    padding: "10px",
    borderRadius: "5px",
    maxWidth: "600px",
    overflowX: "auto",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default PaymentStatus;