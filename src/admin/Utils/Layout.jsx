import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import "./common.css";

const Layout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 608);

  // Function to update state based on window width
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 608);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="dashboard-admin">
      {/* Show Toggle Button Only on Mobile */}
      {isMobile && (
        <button className="menu-btn" onClick={() => setSidebarOpen(!isSidebarOpen)}>
          ☰
        </button>
      )}

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="content">{children}</div>
    </div>
  );
};

export default Layout;
