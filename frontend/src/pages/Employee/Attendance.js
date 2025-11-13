import React, { useState, useEffect } from "react";
import { getAttendanceForEmployee } from "../../services/api";
import "../../styles/Attendance.css";

function EmployeeAttendance() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [error, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const employeeId = user?.user_id;

  const loadAttendance = async () => {
    if (!employeeId) return;
    setLoading(true);
    try {
      const data = await getAttendanceForEmployee(employeeId);
      setAttendance(data || []);
    } catch (err) {
      setError("Failed to load attendance records.");
    }
    setLoading(false);
  };

  const markAttendance = async (statusType) => {
    try {
      const res = await fetch("http://127.0.0.1:5000/attendance/mark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ employee_id: employeeId, status: statusType }),
      });
      const result = await res.json();
      setStatus(result.message || "Attendance marked!");
      loadAttendance();
    } catch (err) {
      setStatus("Failed to mark attendance.");
    }
  };

useEffect(() => {
  loadAttendance();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);


  return (
    <div className="attendance-page">
      <h2>My Attendance</h2>
      <p>
        Logged in as: <strong>{user?.full_name}</strong>
      </p>

      <div className="attendance-actions">
        <button onClick={() => markAttendance("Present")}>Mark Present</button>
        <button onClick={() => markAttendance("Absent")}>Mark Absent</button>
        {status && <p className="status-msg">{status}</p>}
      </div>

      {loading ? (
        <p>Loading attendance...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((a, i) => (
              <tr key={i}>
                <td>{new Date(a.date).toLocaleDateString()}</td>
                <td>{a.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default EmployeeAttendance;
