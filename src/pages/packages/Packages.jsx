import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Packages.module.css";
import { server } from "../../index";
import { useNavigate } from "react-router-dom";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [loginPopup, setLoginPopup] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    referral: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get(`${server}/api/getAllCourses`);
        setPackages(response.data.course);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    // Check referral in URL
    const urlParams = new URLSearchParams(window.location.search);
    const referralId = urlParams.get("ref");

    if (referralId) {
      setFormData((prev) => ({ ...prev, referral: referralId }));
      setLoginPopup(true); // Open login popup if referral exists
    }

    fetchPackages();

    // Check if user is already logged in
    const token = localStorage.getItem("token");
    if (token) setIsAuthenticated(true);
  }, []);

  const openPopup = (pkg) => {
    if (!isAuthenticated) {
      setLoginPopup(true); // Show login popup if not logged in
      return;
    }
    setSelectedPackage(pkg);
    setIsPopupOpen(true);
    setPaymentStatus(null);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedPackage(null);
    setPaymentStatus(null);
  };

  const closeLoginPopup = () => {
    setLoginPopup(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const loginUser = async (email, password) => {
    setBtnLoading(true);
    try {
      const response = await axios.post(`${server}/api/user/login`, {
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token); // Store token
        setIsAuthenticated(true);
        setLoginPopup(false); // Close login popup
      }
    } catch (error) {
      alert("Login failed. Please check your credentials.");
    } finally {
      setBtnLoading(false);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginData;
    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }
    await loginUser(email, password);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!selectedPackage || !selectedPackage._id) {
      alert("Error: No package selected!");
      return;
    }

    const { name, email, referral } = formData;
    if (!name || !email) {
      alert("Please fill in all required fields.");
      return;
    }

    localStorage.setItem(
      "formData",
      JSON.stringify({
        name,
        email,
        referral,
        courseId: selectedPackage._id,
      })
    );

    setLoading(true);
    try {
      console.log(formData);
      console.log(localStorage.getItem("token"))
      const paymentResponse = await axios.post(
        "https://phonepay-gateway-service.onrender.com/initiate-payment",
        {
          amount: selectedPackage.price,
          redirectUrl: `${window.location.origin}/payment-success`,
          courseId: selectedPackage._id,
        }
      );

      if (paymentResponse.data.success) {
        const redirectUrl = paymentResponse.data.data?.redirectUrl;
        if (redirectUrl) {
          window.location.href = redirectUrl;
        } else {
          alert("Payment initiation failed. No redirect URL returned.");
        }
      } else {
        alert("Payment initiation failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during payment initiation:", error);
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
                src={`${server}/${pkg.image}`}
                alt={pkg.name}
                className={styles.image}
              />
              <h3 className={styles.title}>{pkg.name}</h3>
              <p className={styles.price}>₹{pkg.price}/-</p>
              <p className={styles.description}>{pkg.description}</p>
              <button className={styles.buyNowButton} onClick={() => openPopup(pkg)}>
                Buy Now
              </button>
            </div>
          ))
        ) : (
          <p>Loading packages...</p>
        )}
      </div>

      {/* Login Popup */}
      {loginPopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <button className={styles.closeButton} onClick={closeLoginPopup}>
              &times;
            </button>
            <h3 className={styles.popupTitle}>Login Required</h3>
            <form onSubmit={handleLoginSubmit} className={styles.paymentForm}>
              <div className={styles.formGroup}>
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  required
                />
              </div>
              <button type="submit" className={styles.submitButton} disabled={btnLoading}>
                {btnLoading ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      )}

{isPopupOpen && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <button className={styles.closeButton} onClick={closePopup}>
              &times;
            </button>
            <h3 className={styles.popupTitle}>
              {selectedPackage?.name} - ₹{selectedPackage?.price}
            </h3>
            {paymentStatus === "success" ? (
              <div className={styles.successMessage}>
                <p>Payment successful! Course added to your account.</p>
              </div>
            ) : paymentStatus === "failed" ? (
              <div className={styles.errorMessage}>
                <p>Payment failed. Please try again.</p>
              </div>
            ) : (
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
            )}
          </div>
     </div>
       )} 
    </section>
  );
};

export default Packages;






















// import React, { useState, useEffect } from "react"; 
// import axios from "axios";
// import styles from "./Packages.module.css";
// import { server } from "../../index";
// import { useNavigate } from "react-router-dom";

// const Packages = () => {
//   const [packages, setPackages] = useState([]);
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [selectedPackage, setSelectedPackage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [paymentStatus, setPaymentStatus] = useState(null);
//   const [loginPopup, setLoginPopup] = useState(false);
//   const [btnLoading, setBtnLoading] = useState(false);
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     referral: "",
//   });

//   const [loginData, setLoginData] = useState({
//     email: "",
//     password: "",
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

//     // Fetch referral ID from the URL if present
//     const urlParams = new URLSearchParams(window.location.search);
//     const referralId = urlParams.get("ref");

//     if (referralId) {
//       setFormData((prevFormData) => ({
//         ...prevFormData,
//         referral: referralId,
//       }));
//       setLoginPopup(true); // Show login popup if referral ID exists
//     }

//     fetchPackages();
//   }, []);

//   const openPopup = (pkg) => {
//     setSelectedPackage(pkg);
//     setIsPopupOpen(true);
//     setPaymentStatus(null);
//   };

//   const closePopup = () => {
//     setIsPopupOpen(false);
//     setSelectedPackage(null);
//     setPaymentStatus(null);
//   };

//   const closeLoginPopup = () => {
//     setLoginPopup(false);
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleLoginChange = (e) => {
//     setLoginData({ ...loginData, [e.target.name]: e.target.value });
//   };

//   const loginUser = async (email, password) => {
//     setBtnLoading(true);
//     try {
//       await axios.post(`${server}/api/user/login`, { email, password });
//       setLoginPopup(false); // Close login popup on success
//     } catch (error) {
//       alert("Login failed. Please check your credentials.");
//     } finally {
//       setBtnLoading(false);
//     }
//   };

//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();
//     const { email, password } = loginData;
//     if (!email || !password) {
//       alert("Please enter email and password.");
//       return;
//     }
//     await loginUser(email, password);
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     if (!selectedPackage || !selectedPackage._id) {
//       alert("Error: No package selected!");
//       return;
//     }

//     const { name, email, referral } = formData;
//     if (!name || !email) {
//       alert("Please fill in all required fields.");
//       return;
//     }

//     localStorage.setItem(
//       "formData",
//       JSON.stringify({
//         name,
//         email,
//         referral,
//         courseId: selectedPackage._id,
//       })
//     );

//     setLoading(true);
//     try {
//       console.log(formData);
//       const paymentResponse = await axios.post(
//         "https://phonepay-gateway-service.onrender.com/initiate-payment",
//         {
//           amount: selectedPackage.price,
//           redirectUrl: `${window.location.origin}/payment-success`,
//           courseId: selectedPackage._id,
//         }
//       );

//       if (paymentResponse.data.success) {
//         const redirectUrl = paymentResponse.data.data?.redirectUrl;
//         if (redirectUrl) {
//           window.location.href = redirectUrl;
//         } else {
//           alert("Payment initiation failed. No redirect URL returned.");
//         }
//       } else {
//         alert("Payment initiation failed. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error occurred during payment initiation:", error);
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

//       {/* Login Popup */}
//       {loginPopup && (
//         <div className={styles.popup}>
//           <div className={styles.popupContent}>
//             <button className={styles.closeButton} onClick={closeLoginPopup}>
//               &times;
//             </button>
//             <h3 className={styles.popupTitle}>Login Required</h3>
//             <form onSubmit={handleLoginSubmit} className={styles.paymentForm}>
//               <div className={styles.formGroup}>
//                 <label>Email:</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={loginData.email}
//                   onChange={handleLoginChange}
//                   required
//                 />
//               </div>
//               <div className={styles.formGroup}>
//                 <label>Password:</label>
//                 <input
//                   type="password"
//                   name="password"
//                   value={loginData.password}
//                   onChange={handleLoginChange}
//                   required
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className={styles.submitButton}
//                 disabled={btnLoading}
//               >
//                 {btnLoading ? "Logging in..." : "Login"}
//               </button>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Payment Popup */}
//       {isPopupOpen && (
//         <div className={styles.popup}>
//           <div className={styles.popupContent}>
//             <button className={styles.closeButton} onClick={closePopup}>
//               &times;
//             </button>
//             <h3 className={styles.popupTitle}>
//               {selectedPackage?.name} - ₹{selectedPackage?.price}
//             </h3>
//             {paymentStatus === "success" ? (
//               <div className={styles.successMessage}>
//                 <p>Payment successful! Course added to your account.</p>
//               </div>
//             ) : paymentStatus === "failed" ? (
//               <div className={styles.errorMessage}>
//                 <p>Payment failed. Please try again.</p>
//               </div>
//             ) : (
//               <form onSubmit={handleFormSubmit} className={styles.paymentForm}>
//                 <div className={styles.formGroup}>
//                   <label>Name:</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div className={styles.formGroup}>
//                   <label>Email:</label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div className={styles.formGroup}>
//                   <label>Referral ID (Optional):</label>
//                   <input
//                     type="text"
//                     name="referral"
//                     value={formData.referral}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   className={styles.submitButton}
//                   disabled={loading}
//                 >
//                   {loading ? "Processing..." : "Submit Payment"}
//                 </button>
//               </form>
//             )}
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
//   const [paymentStatus, setPaymentStatus] = useState(null);
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

//     // Fetch referral ID from the URL if present
//     const urlParams = new URLSearchParams(window.location.search);
//     const referralId = urlParams.get("ref");

//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       referral: referralId || "", // Auto-fill referral if available
//     }));

//     fetchPackages();
//   }, []);

//   const openPopup = (pkg) => {
//     setSelectedPackage(pkg);
//     setIsPopupOpen(true);
//     setPaymentStatus(null);
//   };

//   const closePopup = () => {
//     setIsPopupOpen(false);
//     setSelectedPackage(null);
//     setPaymentStatus(null);
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     if (!selectedPackage || !selectedPackage._id) {
//       alert("Error: No package selected!");
//       return;
//     }

//     const { name, email, referral } = formData;
//     if (!name || !email) {
//       alert("Please fill in all required fields.");
//       return;
//     }

//     localStorage.setItem(
//       "formData",
//       JSON.stringify({
//         name,
//         email,
//         referral,
//         courseId: selectedPackage._id,
//       })
//     );

//     setLoading(true);
//     try {
//       console.log(formData)
//       const paymentResponse = await axios.post(
//         "https://phonepay-gateway-service.onrender.com/initiate-payment",
//         {
//           amount: selectedPackage.price,
//           redirectUrl: `${window.location.origin}/payment-success`,
//           courseId: selectedPackage._id,
//         }
//       );

//       if (paymentResponse.data.success) {
//         const redirectUrl = paymentResponse.data.data?.redirectUrl;
//         if (redirectUrl) {
//           window.location.href = redirectUrl;
//         } else {
//           alert("Payment initiation failed. No redirect URL returned.");
//         }
//       } else {
//         alert("Payment initiation failed. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error occurred during payment initiation:", error);
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
//             {paymentStatus === "success" ? (
//               <div className={styles.successMessage}>
//                 <p>Payment successful! Course added to your account.</p>
//               </div>
//             ) : paymentStatus === "failed" ? (
//               <div className={styles.errorMessage}>
//                 <p>Payment failed. Please try again.</p>
//               </div>
//             ) : (
//               <form onSubmit={handleFormSubmit} className={styles.paymentForm}>
//                 <div className={styles.formGroup}>
//                   <label>Name:</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div className={styles.formGroup}>
//                   <label>Email:</label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div className={styles.formGroup}>
//                   <label>Referral ID (Optional):</label>
//                   <input
//                     type="text"
//                     name="referral"
//                     value={formData.referral} // Autofilled referral ID
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   className={styles.submitButton}
//                   disabled={loading}
//                 >
//                   {loading ? "Processing..." : "Submit Payment"}
//                 </button>
//               </form>
//             )}
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
