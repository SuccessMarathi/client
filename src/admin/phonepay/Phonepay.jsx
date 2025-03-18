import React, { useState } from 'react'
import AuthToken from '../../components/AuthToken'
import Payment from '../../components/Payment'
const Phonepay = () => {
  const [token, setToken] = useState("");
  return (
    <div>Phonepay

<div>
                <h1 className="text-center text-3xl font-bold mt-6">PhonePe Payment Integration</h1>
                <AuthToken setToken={setToken} />
                <Payment token={token} />

              
            </div>
    </div>
  )
}

export default Phonepay;
