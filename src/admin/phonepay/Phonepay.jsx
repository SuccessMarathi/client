import React from 'react'
import PaymentForm from '../../components/PaymentForm';
import PaymentStatus from '../../components/PaymentStatus';

const Phonepay = () => {
  
  return (
    <div>Phonepay

      <div>
        <h1 className="text-center text-3xl font-bold mt-6" style={{marginTop:"70px"}}>PhonePe Payment Integration</h1>
      
        <div style={{ padding: '20px' }}>
            <h1>PhonePe Payment Gateway Integration</h1>
            <PaymentForm />
            <hr />
            <PaymentStatus />
        </div>
      </div>
    </div>
  )
}

export default Phonepay;
