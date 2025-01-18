import React, { useEffect, useState } from "react"; 
import axios from "axios";
import { server } from "../../index.js"; // Assuming your server URL
import styles from "./Dashboard.module.css"; // Modular CSS file
import { TbMoneybag } from "react-icons/tb";
import { GiReceiveMoney, GiTakeMyMoney, GiOpenTreasureChest } from "react-icons/gi";

import blank from './default.png'

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

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

    async function fetchProfileImage() {
      try {
        const { data } = await axios.get(`${server}/api/profile-image`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        setProfileImage(data.profileImage); // Assuming the endpoint returns profile image URL
      } catch (error) {
        console.error("Error fetching profile image", error);
      }
    }

    fetchUser();
    fetchProfileImage();  // Fetch the profile image URL
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.userInfo}>
        {/* Display user profile image if exists */}
        <img 
          src={profileImage || blank} // Default avatar if no profile image
          alt="User Profile"
          className={styles.profileImage}
        />
        <h1 className={styles.userName}>{user.name}</h1>
      </div>

      <div className={styles.section}>
        <div className={styles.earningBox}>
          <div className={styles.earnLeft}>
            <p>{Math.round(user.earnings.today || 0)}/-</p>
            <h4>Today's Earnings</h4>
          </div>
          <div className={styles.earnRight}>
            <TbMoneybag />
          </div>
        </div>

        <div className={styles.earningBox}>
          <div className={styles.earnLeft}>
            <p>{Math.round(user.earnings.week || 0)}/-</p>
            <h4>7 Days Earnings</h4>
          </div>
          <div className={styles.earnRight}>
            <GiTakeMyMoney />
          </div>
        </div>

        <div className={styles.earningBox}>
          <div className={styles.earnLeft}>
            <p>{Math.round(user.earnings.month || 0)}/-</p>
            <h4>30 Days Earnings</h4>
          </div>
          <div className={styles.earnRight}>
            <GiReceiveMoney />
          </div>
        </div>

        <div className={styles.earningBox}>
          <div className={styles.earnLeft}>
            <p>{Math.round(user.earnings.total || 0)}/-</p>
            <h4>Total Earnings</h4>
          </div>
          <div className={styles.earnRight}>
            <GiOpenTreasureChest />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
