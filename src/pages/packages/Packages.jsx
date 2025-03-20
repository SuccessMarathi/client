// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import styles from "./Packages.module.css";
// import { server } from "../../index"; // Ensure this is correctly set
// import qrCode from "../../Assets/akashQR.jpg"; // QR Code Image
// const Packages = () => {
//   const [packages, setPackages] = useState([]); // Store API response
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [selectedPackage, setSelectedPackage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     transactionId: "",
//     referral: "",
//   });
//   // :white_check_mark: Fetch all courses when the component mounts
//   useEffect(() => {
//     const fetchPackages = async () => {
//       try {
//         const response = await axios.get(`${server}/api/getAllCourses`);
//         setPackages(response.data.course); // Store the course data in state
//       } catch (error) {
//         console.error("Error fetching packages:", error);
//       }
//     };
//     fetchPackages();
//   }, []);
//   const openPopup = (pkg) => {
//     setSelectedPackage(pkg);
//     setIsPopupOpen(true);
//   };
//   const closePopup = () => {
//     setIsPopupOpen(false);
//     setSelectedPackage(null);
//   };
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };
//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Selected Package on Submit:", selectedPackage);
//     if (!selectedPackage || !selectedPackage._id) {
//       alert("Error: No package selected!");
//       return;
//     }
//     const { name, email, transactionId, referral } = formData;
//     if (!name || !email || !transactionId) {
//       alert("Please fill in all required fields.");
//       return;
//     }
//     setLoading(true);
//     try {
//       console.log("Sending Request Data:", {
//         courseId: selectedPackage._id,
//         name,
//         email,
//         transactionId,
//         referralId: referral,
//       });
//       const response = await axios.post(
//         `${server}/api/course/purchase`,
//         {
//           courseId: selectedPackage._id,  // Ensure this is NOT undefined
//           name,
//           email,
//           transactionId,
//           referralId: referral,
//         },
//         {
//           headers: {
//             token: localStorage.getItem("token"),
//           },
//         }
//       );
//       console.log("Server Response:", response.data);
//       if (response.status === 200) {
//         alert("Payment successful! Course added to your account.");
//         closePopup();
//       } else {
//         alert(response.data.message || "Payment failed. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error:", error.response ? error.response.data : error);
//       alert("An error occurred while processing the payment.");
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <section className={styles.packages}>
//       <h2 className={styles.heading}>Our Packages</h2>
//       <div className={styles.cardContainer}>
//         {packages.length > 0 ? (
//           packages.map((pkg) => (
//             <div className={styles.card} key={pkg._id}>
//               <img
//                 src={`${server}/${pkg.image}`} // Dynamically load images
//                 alt={pkg.name}
//                 className={styles.image}
//               />
//               <h3 className={styles.title}>{pkg.name}</h3>
//               <p className={styles.price}>₹{pkg.price}/-</p>
//               <p className={styles.description}>{pkg.description}</p>
//               <button
//                 className={styles.buyNowButton}
//                 onClick={() => openPopup(pkg)}
//               >
//                 Buy Now
//               </button>
//             </div>
//           ))
//         ) : (
//           <p>Loading packages...</p>
//         )}
//       </div>
//       {isPopupOpen && (
//         <div className={styles.popup}>
//           <div className={styles.popupContent}>
//             <button className={styles.closeButton} onClick={closePopup}>
//               &times;
//             </button>
//             <h3 className={styles.popupTitle}>
//               {selectedPackage?.name} - ₹{selectedPackage?.price}
//             </h3>
//             <img src={qrCode} alt="QR Code" className={styles.qrCode} />
//             <form onSubmit={handleFormSubmit} className={styles.paymentForm}>
//               <div className={styles.formGroup}>
//                 <label>Name:</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className={styles.formGroup}>
//                 <label>Email:</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className={styles.formGroup}>
//                 <label>Transaction ID:</label>
//                 <input
//                   type="text"
//                   name="transactionId"
//                   value={formData.transactionId}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className={styles.formGroup}>
//                 <label>Referral ID (Optional):</label>
//                 <input
//                   type="text"
//                   name="referral"
//                   value={formData.referral}
//                   onChange={handleChange}
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className={styles.submitButton}
//                 disabled={loading}
//               >
//                 {loading ? "Processing..." : "Submit Payment"}
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };
// export default Packages;




import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Packages.module.css";
import { server } from "../../index"; // Ensure this is correctly set
import qrCode from "../../Assets/akashQR.jpg"; // QR Code Image
import { useNavigate } from "react-router-dom"; // Navigate hook for redirection

const Packages = () => {
  const [packages, setPackages] = useState([]); // Store API response
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    transactionId: "",
    referral: "",
  });

  const navigate = useNavigate(); // Hook to navigate

  // Fetch all courses when the component mounts
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get(`${server}/api/getAllCourses`);
        setPackages(response.data.course); // Store the course data in state
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };
    fetchPackages();
  }, []);

  const openPopup = (pkg) => {
    setSelectedPackage(pkg);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedPackage(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!selectedPackage || !selectedPackage._id) {
      alert("Error: No package selected!");
      return;
    }
    const { name, email, transactionId, referral } = formData;
    if (!name || !email || !transactionId) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      // Step 1: Initiate Payment Request (e.g., via PhonePay or other payment gateways)
      const paymentResponse = await axios.post(
        "https://phonepay-gateway-service.onrender.com/initiate-payment", // Replace with your actual payment gateway URL
        {
          amount: selectedPackage.price, // Send the amount to the payment gateway
        }
      );

      console.log("Payment initiation response:", paymentResponse.data);

      if (paymentResponse.data.success) {
        // Step 2: If the payment is initiated successfully, proceed with purchasing the course
        const purchaseResponse = await axios.post(
          `${server}/api/course/purchase`,
          {
            courseId: selectedPackage._id,
            name,
            email,
            transactionId,
            referralId: referral,
          },
          {
            headers: {
              token: localStorage.getItem("token"), // Assuming you are using JWT for authentication
            },
          }
        );

        console.log("Purchase Response:", purchaseResponse.data);
        
        if (purchaseResponse.status === 200) {
          alert("Payment successful! Course added to your account.");
          closePopup();
        } else {
          alert(purchaseResponse.data.message || "Course purchase failed. Please try again.");
        }
      } else {
        alert("Payment initiation failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error);
      alert("An error occurred while processing the payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.packages}>
      <h2 className={styles.heading}>Our Packages</h2>
      <div className={styles.cardContainer}>
        {packages.length > 0 ? (
          packages.map((pkg) => (
            <div className={styles.card} key={pkg._id}>
              <img
                src={`${server}/${pkg.image}`} // Dynamically load images
                alt={pkg.name}
                className={styles.image}
              />
              <h3 className={styles.title}>{pkg.name}</h3>
              <p className={styles.price}>₹{pkg.price}/-</p>
              <p className={styles.description}>{pkg.description}</p>
              <button
                className={styles.buyNowButton}
                onClick={() => openPopup(pkg)}
              >
                Buy Now
              </button>
            </div>
          ))
        ) : (
          <p>Loading packages...</p>
        )}
      </div>
      {isPopupOpen && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <button className={styles.closeButton} onClick={closePopup}>
              &times;
            </button>
            <h3 className={styles.popupTitle}>
              {selectedPackage?.name} - ₹{selectedPackage?.price}
            </h3>
            <img src={qrCode} alt="QR Code" className={styles.qrCode} />
            <form onSubmit={handleFormSubmit} className={styles.paymentForm}>
              <div className={styles.formGroup}>
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Transaction ID:</label>
                <input
                  type="text"
                  name="transactionId"
                  value={formData.transactionId}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Referral ID (Optional):</label>
                <input
                  type="text"
                  name="referral"
                  value={formData.referral}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={loading}
              >
                {loading ? "Processing..." : "Submit Payment"}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Packages;




// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import styles from "./Packages.module.css"; // Assuming you're still using this stylesheet
// import { server } from "../../index"; 

// const Packages = () => {
//   const [packages, setPackages] = useState([]); // Store API response
//   const [loadingPackage, setLoadingPackage] = useState(null); // Track loading state for each package
//   const [error, setError] = useState("");

//   // Fetch all packages on component mount
//   useEffect(() => {
//     const fetchPackages = async () => {
//       try {
//         const response = await axios.get(`${server}/api/getAllCourses`);
//         setPackages(response.data.course); // Store the course data in state
//       } catch (error) {
//         console.error("Error fetching packages:", error);
//       }
//     };

//     fetchPackages();
//   }, []);

//   // Handle payment initiation for a specific package
//   const handlePayment = async (pkg) => {
//     setLoadingPackage(pkg._id); // Set the loading state for the specific package
//     setError("");

//     // Validate package price
//     if (!pkg.price || pkg.price <= 0) {
//       setError("Invalid price. Please check the package price.");
//       setLoadingPackage(null); // Reset loading state
//       return;
//     }

//     try {
//       // Send the package price to the backend to initiate the payment
//       const response = await axios.post(
//         "https://phonepay-gateway-service.onrender.com/initiate-payment",
//         { amount: pkg.price } // Send the package price in INR
//       );

//       console.log("Payment initiation response:", response.data);

//       if (response.data.success && response.data.data.redirectUrl) {
//         // Redirect to the payment page if a redirect URL is returned
//         window.location.href = response.data.data.redirectUrl;
//       } else {
//         setError("Failed to initiate payment. Please try again.");
//       }
//     } catch (err) {
//       setError("Payment initiation failed. Please try again.");
//       console.error("Error initiating payment:", err);
//     } finally {
//       setLoadingPackage(null); // Reset loading state after the process
//     }
//   };

//   return (
//     <section className={styles.packages}>
//       <h2 className={styles.heading}>Our Packages</h2>

//       <div className={styles.cardContainer}>
//         {packages.length > 0 ? (
//           packages.map((pkg) => (
//             <div className={styles.card} key={pkg._id}>
//               <img
//                 src={`${server}/${pkg.image}`} // Dynamically load images
//                 alt={pkg.name}
//                 className={styles.image}
//               />
//               <h3 className={styles.title}>{pkg.name}</h3>
//               <p className={styles.price}>₹{pkg.price}/-</p>
//               <p className={styles.description}>{pkg.description}</p>
//               <button
//                 className={styles.buyNowButton}
//                 onClick={() => handlePayment(pkg)} // Trigger payment for this specific package
//                 disabled={loadingPackage === pkg._id} // Disable the button if the current package is being processed
//               >
//                 {loadingPackage === pkg._id ? "Processing..." : "Buy Now"}
//               </button>
//             </div>
//           ))
//         ) : (
//           <p>Loading packages...</p>
//         )}
//       </div>

//       {error && <p style={{ color: "red" }}>{error}</p>} {/* Show any errors */}
//     </section>
//   );
// };

// export default Packages;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import styles from "./Packages.module.css";
// import { server } from "../../index";

// const Packages = () => {
//   const [packages, setPackages] = useState([]);
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [selectedPackage, setSelectedPackage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     referral: "",
//   });

//   useEffect(() => {
//     const fetchPackages = async () => {
//       try {
//         const response = await axios.get(`${server}/api/getAllCourses`);
//         setPackages(response.data.course);
//       } catch (error) {
//         console.error("Error fetching packages:", error);
//       }
//     };

//     fetchPackages();
//   }, []);

//   const openPopup = (pkg) => {
//     setSelectedPackage(pkg);
//     setIsPopupOpen(true);
//   };

//   const closePopup = () => {
//     setIsPopupOpen(false);
//     setSelectedPackage(null);
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handlePayment = async (e) => {
//     e.preventDefault();
//     if (!selectedPackage) {
//       alert("Error: No package selected!");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.post(
//         "https://phonepay-gateway-service.onrender.com/initiate-payment",
//         { amount: selectedPackage.price }
//       );

//       console.log("Payment initiation response:", response.data);

//       if (response.data.success && response.data.data.redirectUrl) {
//         window.location.href = response.data.data.redirectUrl;
//       } else {
//         alert("Failed to initiate payment. Please try again.");
//       }
//     } catch (error) {
//       console.error("Payment initiation error:", error);
//       alert("Payment initiation failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className={styles.packages}>
//       <h2 className={styles.heading}>Our Packages</h2>

//       <div className={styles.cardContainer}>
//         {packages.length > 0 ? (
//           packages.map((pkg) => (
//             <div className={styles.card} key={pkg._id}>
//               <img
//                 src={`${server}/${pkg.image}`}
//                 alt={pkg.name}
//                 className={styles.image}
//               />
//               <h3 className={styles.title}>{pkg.name}</h3>
//               <p className={styles.price}>₹{pkg.price}/-</p>
//               <p className={styles.description}>{pkg.description}</p>
//               <button
//                 className={styles.buyNowButton}
//                 onClick={() => openPopup(pkg)}
//               >
//                 Buy Now
//               </button>
//             </div>
//           ))
//         ) : (
//           <p>Loading packages...</p>
//         )}
//       </div>

//       {isPopupOpen && (
//         <div className={styles.popup}>
//           <div className={styles.popupContent}>
//             <button className={styles.closeButton} onClick={closePopup}>
//               &times;
//             </button>
//             <h3 className={styles.popupTitle}>
//               {selectedPackage?.name} - ₹{selectedPackage?.price}
//             </h3>
//             <form onSubmit={handlePayment} className={styles.paymentForm}>
//               <div className={styles.formGroup}>
//                 <label>Name:</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className={styles.formGroup}>
//                 <label>Email:</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className={styles.formGroup}>
//                 <label>Referral Link:</label>
//                 <input
//                   type="text"
//                   name="referral"
//                   value={formData.referral}
//                   onChange={handleChange}
//                   placeholder="Enter referral link (if any)"
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className={styles.submitButton}
//                 disabled={loading}
//               >
//                 {loading ? "Processing..." : "Pay Now"}
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

// export default Packages;



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import styles from "./Packages.module.css";
// import { server } from "../../index";

// const Packages = () => {
//   const [packages, setPackages] = useState([]);
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [selectedPackage, setSelectedPackage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     transactionId: "",
//     referral: "",
//   });

//   useEffect(() => {
//     const fetchPackages = async () => {
//       try {
//         const response = await axios.get(`${server}/api/getAllCourses`);
//         setPackages(response.data.course);
//       } catch (error) {
//         console.error("Error fetching packages:", error);
//       }
//     };

//     fetchPackages();
//   }, []);

//   const openPopup = (pkg) => {
//     setSelectedPackage(pkg);
//     setIsPopupOpen(true);
//   };

//   const closePopup = () => {
//     setIsPopupOpen(false);
//     setSelectedPackage(null);
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     const { name, email, transactionId, referral } = formData; // Extract form data here

//     if (!selectedPackage || !selectedPackage._id) {
//       alert("Error: No package selected!");
//       return;
//     }

//     setLoading(true);
//     try {
//       // Step 1: Record the purchase in the backend first
//       const response = await axios.post(
//         `${server}/api/course/purchase`,
//         {
//           courseId: selectedPackage._id, // Ensure this is NOT undefined
//           name,
//           email,
//           transactionId,
//           referralId: referral,
//         },
//         {
//           headers: {
//             token: localStorage.getItem("token"),
//           },
//         }
//       );

//       console.log("Purchase response:", response.data);

    //   if (response.data.success) {
    //     // Step 2: Initiate PhonePe payment only if purchase is successful
    //     const paymentResponse = await axios.post(
    //       "https://phonepay-gateway-service.onrender.com/initiate-payment",
    //       { amount: selectedPackage.price * 100 } // Convert to paise if required
    //     );

    //     if (paymentResponse.data.success && paymentResponse.data.data.redirectUrl) {
    //       // Step 3: Redirect to the payment gateway's URL
    //       window.location.href = paymentResponse.data.data.redirectUrl;
    //     } else {
    //       console.error("Payment initiation failed:", paymentResponse.data);
    //       alert("Failed to initiate payment. Please try again.");
    //     }
    //   } else {
    //     alert("Failed to record purchase. Please try again.");
    //   }
    // } catch (error) {
    //   console.error("Error during the purchase/payment process:", error.response?.data || error.message);
    //   alert("An error occurred. Please try again.");
    // } finally {
    //   setLoading(false);
    // }
// };


//   return (
//     <section className={styles.packages}>
//       <h2 className={styles.heading}>Our Packages</h2>

//       <div className={styles.cardContainer}>
//         {packages.length > 0 ? (
//           packages.map((pkg) => (
//             <div className={styles.card} key={pkg._id}>
//               <img
//                 src={`${server}/${pkg.image}`}
//                 alt={pkg.name}
//                 className={styles.image}
//               />
//               <h3 className={styles.title}>{pkg.name}</h3>
//               <p className={styles.price}>₹{pkg.price}/-</p>
//               <p className={styles.description}>{pkg.description}</p>
//               <button
//                 className={styles.buyNowButton}
//                 onClick={() => openPopup(pkg)}
//               >
//                 Buy Now
//               </button>
//             </div>
//           ))
//         ) : (
//           <p>Loading packages...</p>
//         )}
//       </div>

//       {isPopupOpen && (
//   <div className={styles.popup}>
//     <div className={styles.popupContent}>
//       <button className={styles.closeButton} onClick={closePopup}>
//         &times;
//       </button>
//       <h3 className={styles.popupTitle}>
//         {selectedPackage?.name} - ₹{selectedPackage?.price}
//       </h3>
//       <form onSubmit={handleFormSubmit} className={styles.paymentForm}>
//         <div className={styles.formGroup}>
//           <label>Name:</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className={styles.formGroup}>
//           <label>Email:</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className={styles.formGroup}>
//           <label>Transaction ID:</label>
//           <input
//             type="text"
//             name="transactionId"
//             value={formData.transactionId}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className={styles.formGroup}>
//           <label>Referral Link:</label>
//           <input
//             type="text"
//             name="referral"
//             value={formData.referral}
//             onChange={handleChange}
//             placeholder="Enter referral link (if any)"
//           />
//         </div>
//         <button
//           type="submit"
//           className={styles.submitButton}
//           disabled={loading}
//         >
//           {loading ? "Processing..." : "Pay Now"}
//         </button>
//       </form>
//     </div>
//   </div>
// )}

//     </section>
//   );
// };

// export default Packages;













// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import styles from "./Packages.module.css";
// import { server } from "../../index"; // Ensure this is correctly set

// import qrCode from "../../Assets/akashQR.jpg"; // QR Code Image

// const Packages = () => {
//   const [packages, setPackages] = useState([]); // Store API response
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [selectedPackage, setSelectedPackage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     referral: "",
//   });

//   // ✅ Fetch all courses when the component mounts
//   useEffect(() => {
//     const fetchPackages = async () => {
//       try {
//         const response = await axios.get(`${server}/api/getAllCourses`);
//         setPackages(response.data.course); // Store the course data in state
//       } catch (error) {
//         console.error("Error fetching packages:", error);
//       }
//     };

//     fetchPackages();
//   }, []);

//   const openPopup = (pkg) => {
//     setSelectedPackage(pkg);
//     setIsPopupOpen(true);
//   };

//   const closePopup = () => {
//     setIsPopupOpen(false);
//     setSelectedPackage(null);
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // ✅ Load Razorpay dynamically to avoid constructor error
//   const loadRazorpay = () => {
//     return new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };

//   // ✅ Handle Razorpay Payment with Token Authentication
//   const handlePayment = async (e) => {
//     e.preventDefault();
//     if (!selectedPackage) {
//       alert("Error: No package selected!");
//       return;
//     }

//     setLoading(true);
//     try {
//       // Step 1: Load Razorpay
//       const razorpayLoaded = await loadRazorpay();
//       if (!razorpayLoaded) {
//         alert("Razorpay SDK failed to load. Check your internet connection.");
//         setLoading(false);
//         return;
//       }

//       // Step 2: Create Razorpay Order
//       const { data } = await axios.post(`${server}/create-order`, {
//         amount: selectedPackage.price * 100,
//         currency: "INR",
//       });

//       console.log("Order Created:", data);

//       // Step 3: Open Razorpay Checkout
//       const options = {
//         key: "rzp_live_d8KSUaJfBVhSUg", // Replace with actual Razorpay Key
//         amount: selectedPackage.price * 100,
//         currency: "INR",
//         name: "SuccessMarathi",
//         description: selectedPackage.name,
//         order_id: data.orderId, // ✅ Use correct orderId from response
//         handler: async (response) => {
//           console.log("Payment Success:", response);

//           // Step 4: Verify Payment & Complete Purchase
//           try {
//             console.log("Selected courseId:", selectedPackage._id); // Debugging
            
//             const token = localStorage.getItem("token"); // ✅ Get token from localStorage
//             console.log("Sending Token:", token);

//             const verifyRes = await axios.post(
//               `${server}/api/course/purchase`,
//               {
//                 courseId: String(selectedPackage._id),
//                 name: formData.name,
//                 email: formData.email,
//                 referralId: formData.referral,
//                 transactionId: response.razorpay_payment_id,
//                 razorpay_order_id: response.razorpay_order_id,
//                 razorpay_signature: response.razorpay_signature,
//               },
//               {
//                 headers: {
//                   token: token, // ✅ Send token in headers
//                 },
//               }
//             );

//             if (verifyRes.status === 200) {
//               alert("Payment successful! Course added to your account.");
//               closePopup();
//             } else {
//               alert("Payment verification failed.");
//             }
//           } catch (error) {
//             console.error("Payment Verification Error:", error);
//             alert("Payment verification failed.");
//           }
//         },
//         prefill: {
//           name: formData.name,
//           email: formData.email,
//         },
//         theme: {
//           color: "#3399cc",
//         },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (error) {
//       console.error("Payment initiation error:", error);
//       alert("Error initiating payment.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className={styles.packages}>
//       <h2 className={styles.heading}>Our Packages</h2>

//       <div className={styles.cardContainer}>
//         {packages.length > 0 ? (
//           packages.map((pkg) => (
//             <div className={styles.card} key={pkg._id}>
//               <img
//                 src={`${server}/${pkg.image}`} // Dynamically load images
//                 alt={pkg.name}
//                 className={styles.image}
//               />
//               <h3 className={styles.title}>{pkg.name}</h3>
//               <p className={styles.price}>₹{pkg.price}/-</p>
//               <p className={styles.description}>{pkg.description}</p>
//               <button
//                 className={styles.buyNowButton}
//                 onClick={() => openPopup(pkg)}
//               >
//                 Buy Now
//               </button>
//             </div>
//           ))
//         ) : (
//           <p>Loading packages...</p>
//         )}
//       </div>

//       {isPopupOpen && (
//         <div className={styles.popup}>
//           <div className={styles.popupContent}>
//             <button className={styles.closeButton} onClick={closePopup}>
//               &times;
//             </button>
//             <h3 className={styles.popupTitle}>
//               {selectedPackage?.name} - ₹{selectedPackage?.price}
//             </h3>
//             <form onSubmit={handlePayment} className={styles.paymentForm}>
//               <div className={styles.formGroup}>
//                 <label>Name:</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className={styles.formGroup}>
//                 <label>Email:</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className={styles.formGroup}>
//                 <label>Referral Link:</label>
//                 <input
//                   type="text"
//                   name="referral"
//                   value={formData.referral}
//                   onChange={handleChange}
//                   placeholder="Enter referral link (if any)"
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className={styles.submitButton}
//                 disabled={loading}
//               >
//                 {loading ? "Processing..." : "Pay Now"}
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

// export default Packages;


























// // import React, { useState } from "react";
// // import axios from "axios";
// // import styles from "./Packages.module.css";
// // import { server } from "../..";
// // // Import images
// // import beginner from "../../Assets/biginnerNew.jpg";
// // import silver from "../../Assets/silverNew.jpg";
// // import elite from "../../Assets/eliteNew.jpg";
// // import gold from "../../Assets/goldNew.jpg";
// // import diamond from "../../Assets/diamondNew.jpg";
// // import platinum from "../../Assets/platinumNew.jpg";

// // import qrCode from "../../Assets/akashQR.jpg"; // Add your QR image here

// // const Packages = () => {
// //   const [isPopupOpen, setIsPopupOpen] = useState(false);
// //   const [selectedPackage, setSelectedPackage] = useState(null);
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     email: "",
// //     transactionId: "",
// //     referral: "",
// //   });
// //   const [loading, setLoading] = useState(false);

// //   const packages = [
// //     {
// //       id: 1,
// //       image: beginner,
// //       title: "Beginner Package",
// //       price: "199/- ",
// //       description: "Ideal for beginners who want to get started.",
// //     },
// //     {
// //       id: 2,
// //       image: elite,
// //       title: "Elite Package",
// //       price: "399/-",
// //       description: "Perfect for intermediate users looking to improve.",
// //     },
// //     {
// //       id: 3,
// //       image: silver,
// //       title: "Silver Package",
// //       price: "699/- ",
// //       description: "Advanced features for professional users.",
// //     },
// //     {
// //       id: 4,
// //       image: gold,
// //       title: "Gold Package",
// //       price: "999/- )",
// //       description: "All-in-one solution for all your needs.",
// //     },
// //     {
// //       id: 5,
// //       image: diamond,
// //       title: "Diamond Package",
// //       price: "2199/-",
// //       description: "All-in-one solution for all your needs.",
// //     },
// //     {
// //       id: 6,
// //       image: platinum,
// //       title: "Platinum Package",
// //       price: "4999/-",
// //       description: "All-in-one solution for all your needs.",
// //     },
// //   ];

// //   const openPopup = (pkg) => {
// //     setSelectedPackage(pkg);
// //     setIsPopupOpen(true);
// //   };

// //   const closePopup = () => {
// //     setIsPopupOpen(false);
// //     setSelectedPackage(null);
// //   };

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleFormSubmit = async (e) => {
// //     e.preventDefault();
// //     const { name, email, transactionId, referral } = formData;

// //     if (!name || !email || !transactionId) {
// //       alert("Please fill in all required fields.");
// //       return;
// //     }

// //     setLoading(true);

// //     try {
// //       const response = await axios.post(
// //         `${server}/api/course/purchase`,
// //         {
// //           courseId: selectedPackage.id,
// //           name,
// //           email,
// //           transactionId,
// //           referralId: referral, // Optional field
// //         },
// //         {
// //           headers: {
// //             token: localStorage.getItem("token"),
// //           },
// //         }
// //       );

// //       const data = await response.data;
// //       if (response.status === 200) {
// //         alert("Payment successful! Course added to your account.");
// //         closePopup();
// //       } else {
// //         alert(data.message || "Payment failed. Please try again.");
// //       }
// //     } catch (error) {
// //       console.error("Error:", error);
// //       alert("An error occurred while processing the payment.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <section className={styles.packages}>
// //       <h2 className={styles.heading}>Our Packages</h2>
// //       <div className={styles.cardContainer}>
// //         {packages.map((pkg) => (
// //           <div className={styles.card} key={pkg.id}>
// //             <img src={pkg.image} alt={pkg.title} className={styles.image} />
// //             <h3 className={styles.title}>{pkg.title}</h3>
// //             <p className={styles.price}>{pkg.price}</p>
// //             <p className={styles.description}>{pkg.description}</p>
// //             <button
// //               className={styles.buyNowButton}
// //               onClick={() => openPopup(pkg)}
// //             >
// //               Buy Now
// //             </button>
// //           </div>
// //         ))}
// //       </div>

// //       {isPopupOpen && (
// //         <div className={styles.popup}>
// //           <div className={styles.popupContent}>
// //             <button className={styles.closeButton} onClick={closePopup}>
// //               &times;
// //             </button>
// //             <h3 className={styles.popupTitle}>
// //               {selectedPackage?.title} - {selectedPackage?.price}
// //             </h3>
// //             <img src={qrCode} alt="QR Code" className={styles.qrCode} />
// //             <form onSubmit={handleFormSubmit} className={styles.paymentForm}>
// //               <div className={styles.formGroup}>
// //                 <label>Name:</label>
// //                 <input
// //                   type="text"
// //                   name="name"
// //                   value={formData.name}
// //                   onChange={handleChange}
// //                   required
// //                 />
// //               </div>
// //               <div className={styles.formGroup}>
// //                 <label>Email:</label>
// //                 <input
// //                   type="email"
// //                   name="email"
// //                   value={formData.email}
// //                   onChange={handleChange}
// //                   required
// //                 />
// //               </div>
// //               <div className={styles.formGroup}>
// //                 <label>Transaction ID:</label>
// //                 <input
// //                   type="text"
// //                   name="transactionId"
// //                   value={formData.transactionId}
// //                   onChange={handleChange}
// //                   required
// //                 />
// //               </div>
// //               <div className={styles.formGroup}>
// //                 <label>Referral ID (Optional):</label>
// //                 <input
// //                   type="text"
// //                   name="referral"
// //                   value={formData.referral}
// //                   onChange={handleChange}
// //                 />
// //               </div>
// //               <button
// //                 type="submit"
// //                 className={styles.submitButton}
// //                 disabled={loading}
// //               >
// //                 {loading ? "Processing..." : "Submit Payment"}
// //               </button>
// //             </form>
// //           </div>
// //         </div>
// //       )}
// //     </section>
// //   );
// // };

// // export default Packages;
