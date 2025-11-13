import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import logo from "../assets/logo.png";

function Header({ user }) {
  return (
    <header className="header">
      <div className="header-left">
        <img src={logo} alt="Ruri Logo" className="header-logo" />
        <h1 className="header-title">Ruri Club</h1>
      </div>

      <nav className="header-nav">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/shop" className="nav-link">Shop</Link>

        {user ? (
          <>
            <Link to="/profile" className="nav-link">Profile</Link>
            <button
              className="logout-btn"
              onClick={() => {
                localStorage.clear();
                window.location.href = "/login";
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="nav-link">Sign In</Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
