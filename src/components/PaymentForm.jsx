import React, { useState } from "react";
import axios from "axios";

const PaymentForm = () => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentResponse, setPaymentResponse] = useState(null);
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
      const response = await axios.post(
        "https://phonepay-gateway-service.onrender.com/initiate-payment",
        { amount } // Send amount as INR, backend handles conversion
      );

      setPaymentResponse(response.data);
      if (response.data.data.redirectUrl) {
        window.location.href = response.data.data.redirectUrl; // Redirect to PhonePe payment page
      }
    } catch (err) {
      setError("Payment initiation failed. Please try again.");
      console.error("Error initiating payment:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Initiate Payment</h2>
      <div>
        <label>Amount (in INR):</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
        />
      </div>
      <button onClick={handlePayment} disabled={loading}>
        {loading ? "Processing..." : "Pay Now"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {paymentResponse && (
        <div>
          <h3>Payment Response</h3>
          <pre>{JSON.stringify(paymentResponse, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;




// import React, { useState } from 'react'
// import axios from 'axios';
// const PaymentForm = () => {
//   const [amount , setAmount] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [paymentResponse, setPaymentResponse] = useState(null);
//     const [error, setError] = useState('');

//     const handlePayment = async () => {
//         setLoading(true);
//         setError('');
//         try {
//             const response = await axios.post('https://phonepay-gateway-service.onrender.com/initiate-payment', {
//                 amount: amount * 100, // Convert to paise
//             });
//             setPaymentResponse(response.data);
//             if (response.data.data.redirectUrl) {
//                 window.location.href = response.data.data.redirectUrl; // Redirect to PhonePe payment page
//             }
//         } catch (err) {
//             setError('Payment initiation failed. Please try again.');
//             console.error('Error initiating payment:', err);
//         } finally {
//             setLoading(false);
//         }
//     };
//   return (
//     <div>
//     <h2>Initiate Payment</h2>
//     <div>
//         <label>Amount (in INR):</label>
//         <input
//             type="number"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             placeholder="Enter amount"
//         />
//     </div>
//     <button onClick={handlePayment} disabled={loading}>
//         {loading ? 'Processing...' : 'Pay Now'}
//     </button>
//     {error && <p style={{ color: 'red' }}>{error}</p>}
//     {paymentResponse && (
//         <div>
//             <h3>Payment Response</h3>
//             <pre>{JSON.stringify(paymentResponse, null, 2)}</pre>
//         </div>
//     )}
// </div>
//   )
// }

// export default PaymentForm