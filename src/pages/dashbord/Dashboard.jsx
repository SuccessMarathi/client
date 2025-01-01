import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../.."; // Assuming your server URL
import styles from "./Dashboard.module.css"; // Modular CSS file
import { toast } from "react-hot-toast"; // Importing toast library

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const { data } = await axios.get(`${server}/api/user/me`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    }

    fetchUser();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  const roundedEarnings = Math.round(user.earnings || 0);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(user.referralLink);
      toast.success("Referral link copied!");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className={styles.dashboard}>
      <h2>My Dashboard</h2>
      <h1 className={styles.userName}>{user.name}</h1>

      <div className={styles.section}>
        <div className={styles.referralSection}>
          <h3>Referral Link</h3>
          <div className={styles.referralLink}>
            <span>{user.referralLink}</span>
            <button className={styles.copyButton} onClick={handleCopy}>Copy</button>
          </div>
        </div>

        <div className={styles.earningsSection}>
          <h3>Total Earnings</h3>
          <div className={styles.earningBox}>
            <p>{roundedEarnings || 0}/-</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
