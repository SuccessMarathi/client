import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Utils/Layout";
import axios from "axios";
import { server } from "../..";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import "./dashboard.css";

const AdminDashboard = ({ user }) => {
  const navigate = useNavigate();
  const [stats, setStats] = useState([]);
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState(""); // For deleting user
  const [recipientEmail, setRecipientEmail] = useState(""); // For sending email
  const [amount, setAmount] = useState(""); // Amount for email

  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  async function fetchStats() {
    try {
      const { data } = await axios.get(`${server}/api/stats`, {
        headers: { token: localStorage.getItem("token") },
      });
      setStats(data.stats);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchUsers() {
    try {
      const { data } = await axios.get(`${server}/api/admin/users`, {
        headers: { token: localStorage.getItem("token") },
      });
      setUsers(data.users);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchStats();
    fetchUsers();
  }, []);

  // Function to handle user deletion
  const handleDeleteUser = async () => {
    if (!email) {
      toast.error("Please enter an email ID.");
      return;
    }
    try {
      await axios.delete(`${server}/api/users/delete`, {
        data: { email },
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      });

      toast.success("User deleted successfully!"); 
      setEmail(""); 
      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting user");
    }
  };

  // Function to send earnings email
  const handleSendMail = async () => {
    if (!recipientEmail || !amount) {
      toast.error("Please enter both email and amount.");
      return;
    }
    try {
      await axios.post(
        `${server}/api/admin/sendMail`,
        { email: recipientEmail, amount },
        {
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
        }
      );

      toast.success("Email sent successfully!");
      setRecipientEmail("");
      setAmount("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error sending email");
    }
  };

  return (
    <div>
      <Layout>
        <ToastContainer position="top-center" autoClose={3000} />

        <div className="main-content">
          <div className="box"><p>Total Courses</p><p>{stats.totalCoures}</p></div>
          <div className="box"><p>Total Lectures</p><p>{stats.totalLectures}</p></div>
          <div className="box"><p>Total Users</p><p>{stats.totalUsers}</p></div>
        </div>

        {/* Delete User Section */}
        <div className="delete-user-section">
          <h2>Delete User</h2>
          <input type="email" placeholder="Enter user email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button onClick={handleDeleteUser}>Delete</button>
        </div>

        {/* Send Email Section */}
        <div className="send-email-section">
          <h2>Send Earnings Email</h2>
          <input type="email" placeholder="Enter user email" value={recipientEmail} onChange={(e) => setRecipientEmail(e.target.value)} />
          <input type="number" placeholder="Enter amount (Rs)" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <button onClick={handleSendMail}>Send Mail</button>
        </div>

        {/* User List Section */}
        <div className="user-list">
          <h2>User List</h2>
          <table className="user-table">
            <thead>
              <tr><th>#</th><th>Name</th><th>Phone Number</th><th>Total Earnings</th></tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.number}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.contact}</td>
                  <td>{Math.floor(user.earnings)}</td> {/* Ensure no NaN issue */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Layout>
    </div>
  );
};

export default AdminDashboard;
