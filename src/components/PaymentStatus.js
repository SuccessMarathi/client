import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { initiatePayment, checkPaymentStatus } from "../services/api";

const Payment = ({ token }) => {
    const navigate = useNavigate();
    const [orderId, setOrderId] = useState("ORDER12345");
    const [status, setStatus] = useState("");

    const handlePayment = async () => {
        try {
            const redirectUrl = await initiatePayment(token, orderId);
            window.location.href = redirectUrl;  // Redirect to PhonePe
        } catch (error) {
            console.error("Payment Error:", error);
            navigate("/payment-failed");
        }
    };

    const handleCheckStatus = async () => {
        try {
            const paymentStatus = await checkPaymentStatus(token, orderId);
            setStatus(paymentStatus.status);
            if (paymentStatus.status === "SUCCESS") navigate("/payment-success");
            if (paymentStatus.status === "FAILED") navigate("/payment-failed");
        } catch (error) {
            console.error("Status Check Error:", error);
        }
    };

    return (
        <div className="text-center mt-10">
            <h2 className="text-2xl font-bold">Start Payment</h2>
            <button onClick={handlePayment} className="bg-blue-500 text-white px-4 py-2 rounded mr-4">
                Pay Now
            </button>
            <button onClick={handleCheckStatus} className="bg-gray-500 text-white px-4 py-2 rounded">
                Check Status
            </button>
            {status && <p className="mt-2">Payment Status: {status}</p>}
        </div>
    );
};

export default Payment;
