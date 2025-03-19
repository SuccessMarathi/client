import React, { useState } from "react";
import axios from "axios";

const PaymentForm = () => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePayment = async () => {
    setLoading(true);
    setError("");

    // Validate Amount
    if (!amount || amount <= 0) {
      setError("Please enter a valid amount greater than 0.");
      setLoading(false);
      return;
    }

    try {
      // Call the backend to initiate payment
      const response = await axios.post(
        "https://phonepay-gateway-service.onrender.com/initiate-payment",
        { amount }
      );

      // Redirect to the PhonePe payment page
      if (response.data.data.redirectUrl) {
        window.location.href = response.data.data.redirectUrl;
      }
    } catch (err) {
      setError("Payment initiation failed. Please try again.");
      console.error("Error initiating payment:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Initiate Payment</h2>
      <div>
        <label>Amount (in INR):</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          style={styles.input}
        />
      </div>
      <button onClick={handlePayment} disabled={loading} style={styles.button}>
        {loading ? "Processing..." : "Pay Now"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  input: {
    padding: "10px",
    margin: "10px 0",
    width: "100%",
    maxWidth: "300px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default PaymentForm;

//         <div>
//           <h3>Payment Response</h3>
//           <pre>{JSON.stringify(paymentResponse, null, 2)}</pre>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PaymentForm;


// import React, { useState } from 'react';
// import axios from 'axios';

// const PaymentForm = () => {
//   const [amount, setAmount] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [paymentResponse, setPaymentResponse] = useState(null);
//   const [error, setError] = useState('');

//   const handlePayment = async () => {
//     setLoading(true);
//     setError('');

//     // Validate Amount
//     if (!amount || amount <= 0) {
//       setError('Please enter a valid amount greater than 0.');
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.post(
//         'https://phonepay-gateway-service.onrender.com/initiate-payment',
//         { amount } // Send amount in INR, backend will convert to paise
//       );

//       setPaymentResponse(response.data);
//       if (response.data.data.redirectUrl) {
//         window.location.href = response.data.data.redirectUrl; // Redirect to PhonePe payment page
//       }
//     } catch (err) {
//       setError('Payment initiation failed. Please try again.');
//       console.error('Error initiating payment:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h2>Initiate Payment</h2>
//       <div>
//         <label>Amount (in INR):</label>
//         <input
//           type="number"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           placeholder="Enter amount"
//         />
//       </div>
//       <button onClick={handlePayment} disabled={loading}>
//         {loading ? 'Processing...' : 'Pay Now'}
//       </button>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {paymentResponse && (