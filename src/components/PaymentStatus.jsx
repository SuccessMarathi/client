import React, { useState } from 'react'
import axios from 'axios';

const PaymentStatus = () => {
  const [orderId, setOrderId] = useState('');
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const fetchStatus = async () => {
      setLoading(true);
      setError('');
      try {
          const response = await axios.get(`https://phonepay-gateway-service.onrender.com/order-status/${orderId}`);
          setStatus(response.data);
      } catch (err) {
          setError('Failed to fetch payment status.');
          console.error('Error fetching payment status:', err);
      } finally {
          setLoading(false);
      }
  };


  return (
    <div>PaymentStatus


<div>
            <h2>Check Payment Status</h2>
            <div>
                <label>Order ID:</label>
                <input
                    type="text"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    placeholder="Enter Order ID"
                />
            </div>
            <button onClick={fetchStatus} disabled={loading}>
                {loading ? 'Fetching...' : 'Check Status'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {status && (
                <div>
                    <h3>Payment Status</h3>
                    <pre>{JSON.stringify(status, null, 2)}</pre>
                </div>
            )}
        </div>
    </div>
  )
}

export default PaymentStatus