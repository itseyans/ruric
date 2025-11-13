import React, { useEffect, useState } from "react";
import { getAdminEmployees, getAttendanceForEmployee } from "../../services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import "../../styles/AdminAttendance.css";

function AdminAttendance() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadAttendanceStats = async () => {
      const employees = await getAdminEmployees();
      const stats = [];

      for (const emp of employees) {
        const records = await getAttendanceForEmployee(emp.user_id);
        const presentDays = records.filter((r) => r.status === "Present").length;
        const absentDays = records.filter((r) => r.status === "Absent").length;

        stats.push({
          name: emp.full_name,
          present: presentDays,
          absent: absentDays,
        });
      }

      setData(stats);
    };

    loadAttendanceStats();
  }, []);

  return (
    <div className="admin-attendance">
      <h2>Employee Attendance Analytics</h2>
      <p>Track who has the best and lowest attendance performance.</p>

      {data.length > 0 ? (
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 0, bottom: 50 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-25} textAnchor="end" interval={0} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="present" fill="#16a34a" name="Present Days" />
              <Bar dataKey="absent" fill="#dc2626" name="Absent Days" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p>Loading attendance data...</p>
      )}
    </div>
  );
}

export default AdminAttendance;