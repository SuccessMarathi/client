import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../index"; 
const SuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve form data from local storage
    const formData = JSON.parse(localStorage.getItem("formData"));

    if (formData) {
      const { name, email, referral, courseId } = formData;

      // Call the purchase API
      const purchaseCourse = async () => {
        try {
          const purchaseResponse = await axios.post(
            `${server}/api/course/purchase`,
            {
              courseId,
              name,
              email,
              referralId: referral,
            },
            {
              headers: {
                token: localStorage.getItem("token"), // Assuming you are using JWT for authentication
              },
            }
          );

          if (purchaseResponse.status === 200) {
            alert("Payment successful! Course added to your account.");
            localStorage.removeItem("formData"); // Clear stored form data
            navigate("/myCourses"); // Redirect to the account page
          } else {
            alert("Course purchase failed. Please try again.");
            navigate("/packagesmyCourses"); // Redirect back to packages page
          }
        } catch (error) {
          console.error("Error during course purchase:", error);
          alert("An error occurred while processing the payment.");
          navigate("/packages"); // Redirect back to packages page
        }
      };

      purchaseCourse();
    } else {
      alert("Invalid payment details. Please try again.");
      navigate("/packages"); // Redirect back to packages page
    }
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
