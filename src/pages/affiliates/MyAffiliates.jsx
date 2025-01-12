import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./MyAffiliates.module.css"; // Modular CSS
import { server } from "../../index.js"; // Assuming server URL

const MyAffiliates = () => {
  const [affiliates, setAffiliates] = useState([]);
  const [loading, setLoading] = useState(true);

  // Map course IDs to course names
  const courseNames = {
    1: "Silver",
    2: "Gold",
    3: "Diamond",
    4: "Platinum",
  };

  useEffect(() => {
    const fetchAffiliates = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`${server}/api/user/my-affiliates`, {
          headers: { token },
        });

        // Transform the data to prioritize highest course ID
        const transformedAffiliates = data.affiliates.map((affiliate) => {
          const highestCourseId = Math.max(...affiliate.purchasedCourses.map(Number));
          return {
            ...affiliate,
            courseName: courseNames[highestCourseId] || "Unknown Package",
          };
        });

        setAffiliates(transformedAffiliates);
      } catch (error) {
        console.error("Error fetching affiliates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAffiliates();
  }, []);

  if (loading) {
    return <div className={styles.loader}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1>My Affiliates</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Package</th>
          </tr>
        </thead>
        <tbody>
          {affiliates.length > 0 ? (
            affiliates.map((affiliate, index) => (
              <tr key={affiliate._id}>
                <td>{index + 1}</td> {/* Serial Number */}
                <td>{affiliate.name}</td>
                <td>{affiliate.contact}</td>
                <td>{affiliate.courseName}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className={styles.noData}>
                No affiliates found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyAffiliates;
