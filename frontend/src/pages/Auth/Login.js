import React, { useState } from "react";
import { loginUser } from "../../services/api";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/Auth.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await loginUser({ email, password });

      if (res.error) {
        setError("Invalid email or password");
        return;
      }

      // ✅ Save full user info in localStorage
      if (res.user_id) {
        localStorage.setItem("user", JSON.stringify(res));
        window.location.reload(); // ✅ Forces UI to re-render immediately
      }

      // ✅ Redirect user based on role
      if (res.role === "admin") navigate("/admin/dashboard");
      else if (res.role === "employee") navigate("/employee/dashboard");
      else navigate("/profile");

    } catch {
      setError("Server error");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Sign In</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>

        <p className="auth-message">
          Don’t have an account?{" "}
          <Link to="/signup" style={{ color: "#4a90e2", fontWeight: "bold", textDecoration: "underline" }}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
