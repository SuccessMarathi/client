import React, { useState } from "react";
import { getAuthToken } from "../services/api";

const AuthToken = ({ setToken }) => {
    const [loading, setLoading] = useState(false);

    const fetchToken = async () => {
        setLoading(true);
        try {
            const token = await getAuthToken();
            setToken(token);
            alert("Auth Token Fetched Successfully!");
        } catch (error) {
            alert("Failed to get token");
        }
        setLoading(false);
    };

    return (
        <div>
            <button onClick={fetchToken} disabled={loading} className="bg-blue-500 text-white px-4 py-2 rounded">
                {loading ? "Fetching Token..." : "Get Auth Token"}
            </button>
        </div>
    );
};

export default AuthToken;
