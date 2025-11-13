import React, { useState } from "react";
import { signupUser, loginUser } from "../../services/api";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/Auth.css";

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    role: "client",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await signupUser(formData);

      if (res.error) {
        setError(res.error || "Signup failed.");
        return;
      }

      setSuccess("Signup successful! Logging you in...");

      // ✅ Auto-login after signup
      const loginRes = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("user", JSON.stringify(loginRes));
      window.location.reload(); // ✅ Forces immediate re-render

      if (loginRes.role === "admin") navigate("/admin/dashboard");
      else if (loginRes.role === "employee") navigate("/employee/dashboard");
      else navigate("/profile");
    } catch (err) {
      setError("Server error.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create an Account</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            value={formData.full_name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
          />

          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="client">Client</option>
            <option value="employee">Employee</option>
          </select>

          <button type="submit">Create Account</button>
        </form>

        <p className="auth-message">
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#4a90e2", fontWeight: "bold", textDecoration: "underline" }}>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
