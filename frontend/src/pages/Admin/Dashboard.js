import React, { useEffect, useState } from "react";
import { getAdminEmployees, getAttendanceForEmployee } from "../../services/api";
import "../../styles/Dashboard.css";

function AdminDashboard() {
  const [employees, setEmployees] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});

  useEffect(() => {
    const fetchEmployees = async () => {
      const data = await getAdminEmployees();
      setEmployees(data || []);
    };
    fetchEmployees();
  }, []);

  useEffect(() => {
    const fetchAttendance = async () => {
      const result = {};
      for (const emp of employees) {
        const records = await getAttendanceForEmployee(emp.user_id);
        const today = new Date().toISOString().slice(0, 10);
        const todayRecord = records.find((r) => r.date === today);
        result[emp.user_id] = todayRecord ? todayRecord.status : "Absent";
      }
      setAttendanceData(result);
    };
    if (employees.length > 0) fetchAttendance();
  }, [employees]);

  return (
    <div className="admin-dashboard">
      <h2>Employee Directory</h2>
      <p>Track which employees are present today.</p>

      <div className="employee-grid">
        {employees.map((emp) => (
          <div key={emp.user_id} className="employee-card">
            <div className="employee-info">
              <h4>{emp.full_name}</h4>
              <p>{emp.email}</p>
            </div>

            <button
              className={`status-btn ${
                attendanceData[emp.user_id] === "Present" ? "present" : "absent"
              }`}
            >
              {attendanceData[emp.user_id] || "Absent"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;