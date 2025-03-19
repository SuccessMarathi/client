import React from "react";
import PaymentForm from "../../components/PaymentForm";
import PaymentStatus from "../../components/PaymentStatus";

const Phonepay = () => {
  return (
    <div>
      <div>
        <div style={{ padding: "20px" }}>
          <h1>PhonePe Payment Gateway Integration</h1>
          <PaymentForm />
          <hr />
          <PaymentStatus />
        </div>
      </div>
    </div>
  );
};

export default Phonepay;




// import React from 'react'
// import PaymentForm from '../../components/PaymentForm';
// import PaymentStatus from '../../components/PaymentStatus';

// const Phonepay = () => {
  
//   return (
//     <div>Phonepay

//       <div>             
//         <div style={{ padding: '20px' }}>
//             <h1>PhonePe Payment Gateway Integration</h1>
//             <PaymentForm />
//             <hr />
//             <PaymentStatus />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Phonepay;
