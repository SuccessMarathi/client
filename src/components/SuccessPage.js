import React from "react";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
    const navigate = useNavigate();

    return (
        <div className="text-center mt-10">
            <h2 className="text-green-500 text-2xl font-bold">Payment Successful! ✅</h2>
            <p className="mt-2">Thank you for your payment.</p>
            <button 
                className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
                onClick={() => navigate("/")}
            >
                Go to Home
            </button>
        </div>
    );
};

export default SuccessPage;
