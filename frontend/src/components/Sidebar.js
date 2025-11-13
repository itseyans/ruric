import React from "react";
import ChatBox from "./ChatBox"; // ✅ keep your functional chat
import "../styles/Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      {/* ✅ only ADD this header above ChatBox */}
      <div className="sidebar-header">
        <h2>💬 Ruri Chat Support</h2>
        <p>Ask questions, get help with orders, or track deliveries.</p>
      </div>

      {/* ✅ keep your existing working ChatBox */}
      <div className="sidebar-chat">
        <ChatBox />
      </div>

      {/* footer (optional) */}
      <div className="sidebar-footer">
        <p className="footer-text">-------</p>
      </div>
    </div>
  );
}

export default Sidebar;