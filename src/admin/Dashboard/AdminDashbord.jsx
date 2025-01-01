import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Utils/Layout";
import axios from "axios";
import { server } from "../..";
import "./dashboard.css";

const AdminDashbord = ({ user }) => {
  const navigate = useNavigate();

  const [stats, setStats] = useState([]);
  const [users, setUsers] = useState([]);

  // Redirect if the user is not an admin
  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  // Fetch statistics
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

  // Fetch user list
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

  // Fetch data on component mount
  useEffect(() => {
    fetchStats();
    fetchUsers();
  }, []);

  return (
    <div>
      <Layout>
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

        <div className="user-list">
          <h2>User List</h2>
          <table className="user-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Earnings</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.contact}</td>
                  <td>{user.earnings}</td>
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
