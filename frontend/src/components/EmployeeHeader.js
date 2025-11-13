import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/Header.css";

function EmployeeHeader({ user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="header header-green">
      <div className="header-left">
        <img src={logo} alt="Ruri Logo" className="header-logo" />
        <h1 className="header-title white-text">Ruri Employee Panel</h1>
      </div>

      <nav className="header-nav">
        <Link to="/employee/dashboard" className="white-link">
          Dashboard
        </Link>
        <Link to="/employee/attendance" className="white-link">
          Attendance
        </Link>
        <button className="logout-btn logout-light" onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </header>
  );
}

export default EmployeeHeader;