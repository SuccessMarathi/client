import axios from "axios";

const BASE_BACKEND_URL = "https://phonepay-integration-backend.vercel.app/api"; // Ensure this matches your backend

// ✅ Fetch Auth Token
export const getAuthToken = async () => {
  try {
    const response = await axios.post(`${BASE_BACKEND_URL}/get-token`);
    return response.data.access_token;
  } catch (error) {
    console.error(
      "Error getting Auth Token",
      error.response?.data || error.message
    );
    throw error;
  }
};

// ✅ Initiate Payment

// ✅ Initiate Payment
export const initiatePayment = async (accessToken, orderId) => {
  try {
    const response = await axios.post(
      `${BASE_BACKEND_URL}/initiate-payment`,
      { merchantOrderId: orderId, amount: 1000 },
      { headers: { Authorization: `O-Bearer ${accessToken}` } }
    );

    // console.log("Payment Redirect URL:", response.data.redirectUrl);
    return response.data.redirectUrl;
  } catch (error) {
    console.error(
      "Error in Payment API:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// ✅ Check Payment Status
export const checkPaymentStatus = async (accessToken, orderId) => {
  try {
    const response = await axios.get(
      `${BASE_BACKEND_URL}/check-status/${orderId}`,
      {
        headers: { Authorization: `O-Bearer ${accessToken}` },
      }
    );

    // console.log("Payment Status:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error Checking Payment Status:",
      error.response?.data || error.message
    );
    throw error;
  }
};
