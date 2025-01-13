import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Leaderboard.module.css";
import { server } from "../../index.js"; // Assuming server URL
import { FaCrown } from "react-icons/fa";


const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`${server}/api/leaderboard`, {
          headers: { token },
        });
        setLeaderboard(data.leaderboard);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return <div className={styles.loader}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
      <FaCrown/>
      <h1>
        LEADERBOARD
        </h1>
       <FaCrown/>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Total Earnings</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{Math.round(user.earnings.total)}Rs</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;