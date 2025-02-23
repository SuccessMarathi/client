import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../index.js";
import styles from "./Dashboard.module.css";
import { TbMoneybag } from "react-icons/tb";
import { GiReceiveMoney, GiTakeMyMoney, GiOpenTreasureChest } from "react-icons/gi";
import blank from './default.png';

const courseNames = {
  "67b81fdeb7e36f5e02b649cd": "Beginner",
  "67b82012b7e36f5e02b649cf": "Elite",
  "67b82046b7e36f5e02b649d1": "Silver",
  "67b8206eb7e36f5e02b649d3": "Gold",
  "67b82092b7e36f5e02b649d5": "Diamond",
  "67b820b1b7e36f5e02b649d7": "Platinum",
};

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
        setProfileImage(data.profileImage);
      } catch (error) {
        console.error("Error fetching profile image", error);
      }
    }

    fetchUser();
    fetchProfileImage();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  const highestCourse = user.purchasedCourses.reduce((max, courseId) => {
    return courseNames[courseId] > courseNames[max] ? courseId : max;
  }, user.purchasedCourses[0]);

  return (
    <div className={styles.dashboard}>
      <div className={styles.userInfo}>
        {highestCourse && (
          <div className={styles.courseLabel}>
            {courseNames[highestCourse]}
          </div>
        )}
        <div className={styles.above}>
          <img
            src={profileImage || blank}
            alt="User Profile"
            className={styles.profileImage}
          />
          <h1 className={styles.userName}>{user.name}</h1>
        </div>
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
