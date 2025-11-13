import React, { useEffect, useState } from "react";
import "../../styles/EmployeeDashboard.css";
import EmployeeMessages from "./Messages";

function EmployeeDashboard() {
  const [clients, setClients] = useState([]);

  // placeholder for potential future logic (no backend broken)
  useEffect(() => {
    // You can later fetch a summary here
  }, []);

  // ✅ FIXED: use backticks for template literal, not slashes
  const handleClientClick = (client) => {
    window.location.href = `/employee/messages?client_id=${client.client_id}`;
  };

  return (
    <div className="employee-dashboard-page">
      {/* Header */}
      <div className="employee-dashboard-header">
        <h2>💬 Support Messages</h2>
        <p>
          View and respond to clients who need your assistance. Stay connected
          and keep chats up-to-date in real time.
        </p>
      </div>

      {/* Body */}
      <div className="employee-dashboard-body">
        {/* Connected chat component */}
        <EmployeeMessages />
      </div>
    </div>
  );
}

export default EmployeeDashboard;
