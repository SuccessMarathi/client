import React, { useState } from "react";
import "./common.css";
import { Link } from "react-router-dom";
import { AiFillHome, AiOutlineLogout } from "react-icons/ai";
import { FaBook, FaUserAlt, FaPlus, FaTrash } from "react-icons/fa";
import { UserData } from "../../context/UserContext";
import axios from "axios";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { user } = UserData();
  const [email, setEmail] = useState(""); // Store email input
  const [message, setMessage] = useState(""); // Store response message

  // Function to handle user deletion
  const handleDeleteUser = async () => {
    if (!email) {
      setMessage("Please enter an email ID.");
      return;
    }

    try {
      const response = await axios.delete("http://localhost:5000/api/users/delete", {
        data: { email }, // Send email in the request body
        headers: { "Content-Type": "application/json" },
      });

      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error deleting user");
    }
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      {/* Close Button for Mobile */}
      <button className="close-btn" onClick={toggleSidebar}>
        ✖
      </button>

      <ul>
        <li>
          <Link to="/admin/dashboard" onClick={toggleSidebar}>
            <div className="icon"><AiFillHome /></div>
            <span>Home</span>
          </Link>
        </li>

        <li>
          <Link to="/admin/course" onClick={toggleSidebar}>
            <div className="icon"><FaBook /></div>
            <span>Add Packages</span>
          </Link>
        </li>

        <li>
          <Link to="/admin/delete" onClick={toggleSidebar}>
            <div className="icon"><FaTrash /></div>
            <span>Delete Packages</span>
          </Link>
        </li>

        <li>
          <Link to="/admin/lecture" onClick={toggleSidebar}>
            <div className="icon"><FaPlus /></div>
            <span>Add Lectures</span>
          </Link>
        </li>

        <li>
          <Link to="/admin/lecturedelete" onClick={toggleSidebar}>
            <div className="icon"><FaTrash /></div>
            <span>Delete Lectures</span>
          </Link>
        </li>

        {user && user.mainrole === "superadmin" && (
          <>
            <li>
              <Link to="/admin/users" onClick={toggleSidebar}>
                <div className="icon"><FaUserAlt /></div>
                <span>Users</span>
              </Link>
            </li>

            {/* Delete User Section */}
            <li className="delete-user-section">
              <div className="icon"><FaTrash /></div>
              <span>Delete User</span>
              <input
                type="email"
                placeholder="Enter user email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button onClick={handleDeleteUser}>Delete</button>
              {message && <p className="delete-message">{message}</p>}
            </li>
          </>
        )}

        <li>
          <Link to="/account" onClick={toggleSidebar}>
            <div className="icon"><AiOutlineLogout /></div>
            <span>Logout</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
