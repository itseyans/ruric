import React, { useEffect, useState } from "react";
import { getAdminEmployeeRatings } from "../../services/api";
import "../../styles/EmployeeRatings.css";

function EmployeeRatings() {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    const load = async () => {
      const res = await getAdminEmployeeRatings();
      setRatings(res);
    };
    load();
  }, []);

  return (
    <div className="admin-ratings">
      <h2>Employee Ratings (Static Summary)</h2>
      <table className="ratings-table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Average Rating ⭐</th>
            <th>Total Reviews</th>
          </tr>
        </thead>
        <tbody>
          {ratings.map((r, i) => (
            <tr key={i}>
              <td>{r.employee}</td>
              <td>{r.rating}</td>
              <td>{r.reviews}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeRatings;
