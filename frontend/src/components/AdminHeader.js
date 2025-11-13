import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/AdminHeader.css";

function AdminHeader({ user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.clear();
    setTimeout(() => {
      navigate("/login", { replace: true });
      window.location.reload();
    }, 200);
  };

  return (
    <header className="admin-header">
      <div className="admin-header-left">
        <img src="/logo192.png" alt="Ruri Logo" className="admin-logo" />
        <h1>Ruri Admin Panel</h1>
      </div>

      <nav className="admin-nav">
        <Link to="/admin/dashboard">Dashboard</Link>
        <Link to="/admin/attendance">Attendance</Link>
        <Link to="/admin/employee-ratings">Employee Ratings</Link>
        <Link to="/admin/messages">Messages</Link>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </header>
  );
}

export default AdminHeader;