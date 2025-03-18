import React from "react";
import { useNavigate } from "react-router-dom";
import { initiatePayment } from "../services/api";

const Payment = ({ token }) => {
  const navigate = useNavigate();

  const handlePayment = async () => {
    if (!token) {
      console.error("❌ Missing Token: Authenticate first.");
      navigate("/payment-failed");
      return;
    }

    try {
      const redirectUrl = await initiatePayment(token, "ORDER12345");
      window.location.href = redirectUrl; // ✅ Redirect to PhonePe payment page
    } catch (error) {
      console.error("❌ Payment Error:", error);
      navigate("/payment-failed");
    }
  };

  return (
    <div>
      <h2>Start Payment</h2>
      <button
        onClick={handlePayment}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Pay Now
      </button>
    </div>
  );
};

export default Payment;
