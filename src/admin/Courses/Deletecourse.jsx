import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../pages/packages/Packages.module.css";
import { server } from "../../index";
import qrCode from "../../Assets/akashQR.jpg"; 

const Packages = () => {
  const [packages, setPackages] = useState([]); 
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hoveredPackage, setHoveredPackage] = useState(null); // Track hovered package
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    transactionId: "",
    referral: "",
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

  const handleDelete = async (packageId) => {
    if (!window.confirm("Are you sure you want to delete this package?")) {
      return;
    }

    try {
      const response = await axios.delete(
        `${server}/api/course/${packageId}`,
        {
          headers: {
            token: localStorage.getItem("token"), 
          },
        }
      );

      if (response.status === 200) {
        alert("Package deleted successfully!");
        setPackages(packages.filter((pkg) => pkg._id !== packageId)); 
      } else {
        alert("Failed to delete package.");
      }
    } catch (error) {
      console.error("Error deleting package:", error);
      alert("An error occurred while deleting the package.");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
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
      const response = await axios.post(
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
            token: localStorage.getItem("token"),
          },
        }
      );
  
      if (response.status === 200) {
        alert("Payment successful! Course added to your account.");
        closePopup();
      } else {
        alert(response.data.message || "Payment failed. Please try again.");
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
            <div
              className={styles.card}
              key={pkg._id}
              onMouseEnter={() => setHoveredPackage(pkg._id)}
              onMouseLeave={() => setHoveredPackage(null)}
            >
              <img
                src={`${server}/${pkg.image}`}
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

              {hoveredPackage === pkg._id && (
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDelete(pkg._id)}
                >
                  Delete
                </button>
              )}
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




// import React, { useState } from "react";
// import axios from "axios";
// import styles from "./Packages.module.css";
// import { server } from "../..";
// // Import images
// import beginner from "../../Assets/biginnerNew.jpg";
// import silver from "../../Assets/silverNew.jpg";
// import elite from "../../Assets/eliteNew.jpg";
// import gold from "../../Assets/goldNew.jpg";
// import diamond from "../../Assets/diamondNew.jpg";
// import platinum from "../../Assets/platinumNew.jpg";

// import qrCode from "../../Assets/akashQR.jpg"; // Add your QR image here

// const Packages = () => {
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [selectedPackage, setSelectedPackage] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     transactionId: "",
//     referral: "",
//   });
//   const [loading, setLoading] = useState(false);

//   const packages = [
//     {
//       id: 1,
//       image: beginner,
//       title: "Beginner Package",
//       price: "199/- ",
//       description: "Ideal for beginners who want to get started.",
//     },
//     {
//       id: 2,
//       image: elite,
//       title: "Elite Package",
//       price: "399/-",
//       description: "Perfect for intermediate users looking to improve.",
//     },
//     {
//       id: 3,
//       image: silver,
//       title: "Silver Package",
//       price: "699/- ",
//       description: "Advanced features for professional users.",
//     },
//     {
//       id: 4,
//       image: gold,
//       title: "Gold Package",
//       price: "999/- )",
//       description: "All-in-one solution for all your needs.",
//     },
//     {
//       id: 5,
//       image: diamond,
//       title: "Diamond Package",
//       price: "2199/-",
//       description: "All-in-one solution for all your needs.",
//     },
//     {
//       id: 6,
//       image: platinum,
//       title: "Platinum Package",
//       price: "4999/-",
//       description: "All-in-one solution for all your needs.",
//     },
//   ];

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
//     const { name, email, transactionId, referral } = formData;

//     if (!name || !email || !transactionId) {
//       alert("Please fill in all required fields.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await axios.post(
//         `${server}/api/course/purchase`,
//         {
//           courseId: selectedPackage.id,
//           name,
//           email,
//           transactionId,
//           referralId: referral, // Optional field
//         },
//         {
//           headers: {
//             token: localStorage.getItem("token"),
//           },
//         }
//       );

//       const data = await response.data;
//       if (response.status === 200) {
//         alert("Payment successful! Course added to your account.");
//         closePopup();
//       } else {
//         alert(data.message || "Payment failed. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       alert("An error occurred while processing the payment.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className={styles.packages}>
//       <h2 className={styles.heading}>Our Packages</h2>
//       <div className={styles.cardContainer}>
//         {packages.map((pkg) => (
//           <div className={styles.card} key={pkg.id}>
//             <img src={pkg.image} alt={pkg.title} className={styles.image} />
//             <h3 className={styles.title}>{pkg.title}</h3>
//             <p className={styles.price}>{pkg.price}</p>
//             <p className={styles.description}>{pkg.description}</p>
//             <button
//               className={styles.buyNowButton}
//               onClick={() => openPopup(pkg)}
//             >
//               Buy Now
//             </button>
//           </div>
//         ))}
//       </div>

//       {isPopupOpen && (
//         <div className={styles.popup}>
//           <div className={styles.popupContent}>
//             <button className={styles.closeButton} onClick={closePopup}>
//               &times;
//             </button>
//             <h3 className={styles.popupTitle}>
//               {selectedPackage?.title} - {selectedPackage?.price}
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
