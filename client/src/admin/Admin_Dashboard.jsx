import React from "react";
import "../styles/admin_dashboard.css";

const AdminDashboard = () => {
  const handleLogout = () => {
    // Remove tokens from localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    alert("Logout Success ---");
  };
  return (
    <div className="dashboard">
      <div className="sidebar">
        <h2>Admin Dashboard</h2>
        <ul>
          <li>Home</li>
          <li>Users</li>
          <li>Products</li>
          <li>Settings</li>
        </ul>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="main-content">
        <h2>Welcome, Admin!</h2>
        <p>This is the main content area of your admin dashboard.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
