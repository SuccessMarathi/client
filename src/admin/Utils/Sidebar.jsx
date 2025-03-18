import React from "react";
import "./common.css";
import { Link } from "react-router-dom";
import { AiFillHome, AiOutlineLogout } from "react-icons/ai";
import { FaBook, FaUserAlt, FaPlus, FaTrash } from "react-icons/fa";
import { UserData } from "../../context/UserContext";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { user } = UserData();

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
          <li>
            <Link to="/admin/users" onClick={toggleSidebar}>
              <div className="icon"><FaUserAlt /></div>
              <span>Users</span>
            </Link>
          </li>
        )}

        <li>
          <Link to="/account" onClick={toggleSidebar}>
            <div className="icon"><AiOutlineLogout /></div>
            <span>Logout</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/phonepay" onClick={toggleSidebar}>
            <div className="icon"><FaTrash /></div>
            <span>Phonepay Testing</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
