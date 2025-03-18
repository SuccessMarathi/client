import React from "react";
import { useNavigate } from "react-router-dom";

const FailurePage = () => {
    const navigate = useNavigate();

    return (
        <div className="text-center mt-10">
            <h2 className="text-red-500 text-2xl font-bold">Payment Failed ❌</h2>
            <p className="mt-2">Oops! Something went wrong.</p>
            <button 
                className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
                onClick={() => navigate("/")}
            >
                Try Again
            </button>
        </div>
    );
};

export default FailurePage;
