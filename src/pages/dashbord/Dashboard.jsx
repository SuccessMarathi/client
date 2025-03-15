import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../index.js";
import styles from "./Dashboard.module.css";
import { TbMoneybag } from "react-icons/tb";
import { GiReceiveMoney, GiTakeMyMoney, GiOpenTreasureChest } from "react-icons/gi";
import blank from "./default.png";

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
  const [amounts, setAmounts] = useState([0, 0, 0, 0]);

  useEffect(() => {
    async function fetchUser() {
      try {
        const { data } = await axios.get(`${server}/api/user/me`, {
          headers: { token: localStorage.getItem("token") },
        });
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    }

    async function fetchProfileImage() {
      try {
        const { data } = await axios.get(`${server}/api/profile-image`, {
          headers: { token: localStorage.getItem("token") },
        });
        setProfileImage(data.profileImage);
      } catch (error) {
        console.error("Error fetching profile image", error);
      }
    }

    fetchUser();
    fetchProfileImage();
  }, []);

  useEffect(() => {
    if (user) {
      const earnings = [
        user.earnings.today || 0,
        user.earnings.week || 0,
        user.earnings.month || 0,
        user.earnings.total || 0,
      ];

      earnings.forEach((value, index) => {
        let current = 0;
        const increment = Math.ceil(value / 100);
        const interval = setInterval(() => {
          current += increment;
          if (current >= value) {
            current = value;
            clearInterval(interval);
          }
          setAmounts((prev) => {
            const newAmounts = [...prev];
            newAmounts[index] = current;
            return newAmounts;
          });
        }, 10);
      });
    }
  }, [user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const highestCourse = user.purchasedCourses.reduce((max, courseId) => {
    return courseNames[courseId] > courseNames[max] ? courseId : max;
  }, user.purchasedCourses[0]);

  return (
    <div className={styles.dashboard}>
      <h4 style={{ width: "100%", maxWidth: "1200px", margin: "10px 0px" }}>
        Welcome back, {user.name}!
      </h4>

      {/* Profile Card */}
      <div className={styles.profileCard} style={{ background: "rgb(250,241,226)", border: "3px solid #fff" }}>
        <img src={profileImage || blank} alt="User Profile" className={styles.profileImage} />
        <div className={styles.profileDetails} style={{ marginTop: "0px", marginBottom: "10px" }}>
          <h2 className={styles.userName}>{user.name}</h2>
          {highestCourse && <span className={styles.packageLabel}>{courseNames[highestCourse]} Package</span>}
        </div>
      </div>

      {/* Earnings Grid */}
      <div className={styles.earningsGrid}>
        {[
          { label: "Today's Earning", icon: <TbMoneybag />, className: styles.today },
          { label: "Weekly Earning", icon: <GiTakeMyMoney />, className: styles.weekly },
          { label: "Monthly Earning", icon: <GiReceiveMoney />, className: styles.monthly },
          { label: "All Time Earning", icon: <GiOpenTreasureChest />, className: styles.total },
        ].map((card, index) => (
          <div key={index} className={`${styles.card} ${card.className}`}>
            <div className={styles.earningText}>
              <p className={styles.amount}>&#8377; {Math.round(amounts[index])} /-</p>
              <h4 className={styles.label}>{card.label}</h4>
            </div>
            <div className={styles.icon}>{card.icon}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
