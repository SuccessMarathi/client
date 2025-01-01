import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../../Assets/akashLogo.jpg";


const Header = ({ isAuth }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <header className={styles.header}>
        <img src={logo} alt="Logo of SuccessMarathi" />
        <button className={styles.menuToggle} onClick={toggleSidebar}>
          {isSidebarOpen ? "✖" : "☰"}
        </button>
      </header>

      <div
        className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ""}`}
      >
        <button className={styles.sidebarClose} onClick={toggleSidebar}>
          ✖
        </button>
        <nav>
          <Link to={"/"} onClick={toggleSidebar}>
            Home
          </Link>

        
         
          {/* test */}
          <Link to={"/packages"} onClick={toggleSidebar}>
            Packages
          </Link>

          <Link to={"/myCourses"} onClick={toggleSidebar}>
            My Courses
          </Link>

          <Link to={`/:id/dashboard`} onClick={toggleSidebar}>
            Dashboard
          </Link>




          {isAuth ? (
            <Link to={"/account"} onClick={toggleSidebar}>
              Account
            </Link>
          ) : (
            <Link to={"/login"} onClick={toggleSidebar}>
              Login
            </Link>
          )}
        </nav>
      </div>

      {/* Background overlay for when the sidebar is open */}
      {isSidebarOpen && (
        <div className={styles.overlay} onClick={toggleSidebar}></div>
      )}
    </>
  );
};

export default Header;
