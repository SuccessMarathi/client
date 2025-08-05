import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./AdminPendingOrders.module.css";
import { server } from "../../index";

const AdminPendingOrders = () => {
  const [pendingOrders, setPendingOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(`${server}/api/admin/pending-orders`, {
        headers: {
             token: localStorage.getItem("token"),
        },
      });
      setPendingOrders(data.orders || []);
    } catch (error) {
      console.error("Error fetching pending orders:", error);
    }
  };

  const handleAction = async (orderId, action) => {
    try {
      await axios.post(
        `${server}/approve`,
        { orderId, action },
        {
          headers: {
               token: localStorage.getItem("token"),
          },
        }
      );
      fetchOrders(); // Refresh list
    } catch (error) {
      console.error("Error handling order:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className={styles["pending-orders"]}>
      <h2>Pending Orders</h2>

      {pendingOrders.length === 0 ? (
        <p>No pending orders.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Course</th>
              <th>UTR</th>
              <th>Referrer</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingOrders.map((order) => (
              <tr key={order._id}>
                <td>{order.user?.name || "N/A"}</td>
                <td>{order.user?.email || "N/A"}</td>
                <td>{order.course?.name || "N/A"}</td>
                <td>{order.transactionId}</td>
                <td>{order.referrer?.name || "None"}</td>
                <td>
                  <button
                    className={styles["approve-btn"]}
                    onClick={() => handleAction(order._id, "approve")}
                  >
                    Approve
                  </button>
                  <button
                    className={styles["reject-btn"]}
                    onClick={() => handleAction(order._id, "reject")}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPendingOrders;
