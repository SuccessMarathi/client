// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import styles from "./MyAffiliates.module.css"; // Modular CSS
// import { server } from "../../index.js"; // Assuming server URL

// const MyAffiliates = () => {
//   const [affiliates, setAffiliates] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchAffiliates = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const { data } = await axios.get(`${server}/api/user/my-affiliates`, {
//           headers: { token },
//         });

//         // Define course names within the function
//         const courseNames = {
//           "67b81fdeb7e36f5e02b649cd": "Beginner",
//           "67b82012b7e36f5e02b649cf": "Elite",
//           "67b82046b7e36f5e02b649d1": "Silver",
//           "67b8206eb7e36f5e02b649d3": "Gold",
//           "67b82092b7e36f5e02b649d5": "Diamond",
//           "67b820b1b7e36f5e02b649d7": "Platinum",

//         };

//         // Transform the data safely
//         const transformedAffiliates = data.affiliates.map((affiliate) => {
//           const courses = affiliate.purchasedCourses || []; // Handle missing `purchasedCourses`
//           const highestCourseId = courses.length > 0 ? courses[courses.length - 1] : null;
//           return {
//             ...affiliate,
//             courseName: highestCourseId ? courseNames[highestCourseId] || "Unknown Package" : "No Package",
//           };
//         });

//         setAffiliates(transformedAffiliates);
//       } catch (error) {
//         console.error("Error fetching affiliates:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAffiliates();
//   }, []);

//   if (loading) {
//     return <div className={styles.loader}>Loading...</div>;
//   }

//   return (
//     <div className={styles.container}>
//       <h1>My Affiliates</h1>
//       <table className={styles.table}>
//         <thead>
//           <tr>
//             <th>S.No</th>
//             <th>Name</th>
//             <th>Contact</th>
//             <th>Package</th>
//           </tr>
//         </thead>
//         <tbody>
//           {affiliates.length > 0 ? (
//             affiliates.map((affiliate, index) => (
//               <tr key={affiliate._id}>
//                 <td>{index + 1}</td> {/* Serial Number */}
//                 <td>{affiliate.name}</td>
//                 <td>{affiliate.contact}</td>
//                 <td>{affiliate.courseName}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="4" className={styles.noData}>
//                 No affiliates found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default MyAffiliates;




import React, { useEffect, useState } from "react";
import styles from "./MyAffiliates.module.css";

const MyAffiliates = () => {
  const [affiliates, setAffiliates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAffiliates = async () => {
      try {
        const res = await fetch("/api/affiliates", {
          credentials: "include", // assuming cookies for auth
        });
        const data = await res.json();

        if (data.success) {
          setAffiliates(data.affiliates);
        } else {
          console.error("Failed to fetch affiliates.");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAffiliates();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>My Affiliates</h2>

      <div className={styles.headerRow}>
        <div className={styles.headerItem}>Name</div>
        <div className={styles.headerItem}>Contact</div>
        <div className={styles.headerItem}>Purchased Courses</div>
      </div>

      {loading ? (
        <p className={styles.loading}>Loading...</p>
      ) : affiliates.length === 0 ? (
        <p className={styles.empty}>No affiliates yet.</p>
      ) : (
        affiliates.map((affiliate, index) => (
          <div className={styles.affiliateRow} key={index}>
            <div className={styles.affiliateItem}>{affiliate.name}</div>
            <div className={styles.affiliateItem}>{affiliate.contact}</div>
            <div className={styles.affiliateItem}>
              {Array.isArray(affiliate.purchasedCourses)
                ? affiliate.purchasedCourses.length
                : 0}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyAffiliates;
