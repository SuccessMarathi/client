import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {useLocation } from "react-router-dom";
import axios from "axios";
import { server } from "../index"; 
const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const transactionId = queryParams.get("transaction_id");
    const courseId = queryParams.get("course_id");
    const userId = localStorage.getItem("userId");

    if (transactionId && courseId && userId) {
      // Call the purchase API to add the course to the user's account
      const purchaseCourse = async () => {
        try {
          const purchaseResponse = await axios.post(
            `${server}/api/course/purchase`,
            {
              courseId,
              userId,
              transactionId,
            },
            {
              headers: {
                token: localStorage.getItem("token"), // Assuming you are using JWT for authentication
              },
            }
          );

          if (purchaseResponse.status === 200) {
            alert("Payment successful! Course added to your account.");
            navigate("/account"); // Redirect to the account page
          } else {
            alert("Course purchase failed. Please try again.");
            navigate("/packages"); // Redirect back to packages page
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
  }, [location, navigate]);

  return (
    <div>
      <h2>Payment Successful!</h2>
      <p>Redirecting you to your account...</p>
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
