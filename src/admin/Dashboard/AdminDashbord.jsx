import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Utils/Layout";
import axios from "axios";
import { server } from "../..";
import { toast, ToastContainer } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import "./dashboard.css";

const AdminDashbord = ({ user }) => {
  const navigate = useNavigate();

  const [stats, setStats] = useState([]);
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState(""); // Input field for deleting user

  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  async function fetchStats() {
    try {
      const { data } = await axios.get(`${server}/api/stats`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setStats(data.stats);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchUsers() {
    try {
      const { data } = await axios.get(`${server}/api/admin/users`, {
        headers: {
          token: localStorage.getItem("token"),
        },
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

  // Function to handle user deletion by email
  const handleDeleteUser = async () => {
    if (!email) {
      toast.error("Please enter an email ID.");
      return;
    }

    try {
      await axios.delete(`${server}/api/users/delete`, {
        data: { email }, // Sending email in request body
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      });

      toast.success("User deleted successfully!"); // Show success toast
      setEmail(""); // Clear input field
      fetchUsers(); // Refresh user list after deletion
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting user");
    }
  };

  return (
    <div>
      <Layout>
        <ToastContainer position="top-center" autoClose={3000} />
        
        <div className="main-content">
          <div className="box">
            <p>Total Courses</p>
            <p>{stats.totalCoures}</p>
          </div>
          <div className="box">
            <p>Total Lectures</p>
            <p>{stats.totalLectures}</p>
          </div>
          <div className="box">
            <p>Total Users</p>
            <p>{stats.totalUsers}</p>
          </div>
        </div>

        {/* Delete User Section */}
        <div className="delete-user-section">
          <h2>Delete User</h2>
          <input
            type="email"
            placeholder="Enter user email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleDeleteUser}>Delete</button>
        </div>

        {/* User List Section */}
        <div className="user-list">
          <h2>User List</h2>
          <table className="user-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Total Earnings</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.contact}</td>
                  <td>{Math.floor(user.earnings.total)}</td> {/* Apply Math.floor */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Layout>
    </div>
  );
};

export default AdminDashbord;
