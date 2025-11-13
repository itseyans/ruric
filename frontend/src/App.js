import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

// 🌿 Shared Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import ChatBox from "./components/ChatBox";

// 🧑🏻‍🔧 Employee
import EmployeeHeader from "./components/EmployeeHeader";

// 👩🏻‍💼 Admin
import AdminHeader from "./components/AdminHeader";

// 🔐 Auth Pages
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";

// 👩🏻‍💻 Client Pages
import ClientHome from "./pages/Client/Home";
import ClientShop from "./pages/Client/Shop";
import ClientProfile from "./pages/Client/Profile";
import ClientCheckout from "./pages/Client/Checkout";

// 🧑🏻‍🔧 Employee Pages
import EmployeeDashboard from "./pages/Employee/Dashboard";
import EmployeeAttendance from "./pages/Employee/Attendance";
import EmployeeMessages from "./pages/Employee/Messages";

// 👩🏻‍💼 Admin Pages
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminEmployeeRatings from "./pages/Admin/EmployeeRatings";
import AdminAttendance from "./pages/Admin/Attendance";
import AdminMessages from "./pages/Admin/Messages";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));
  const isAuthPage = ["/login", "/signup"].includes(location.pathname);

  // 🔁 Refresh user when localStorage changes
  useEffect(() => {
    const updateUser = () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);
    };
    updateUser();
    window.addEventListener("storage", updateUser);
    return () => window.removeEventListener("storage", updateUser);
  }, []);

  // 🚦 Redirect logic by role
  useEffect(() => {
    if (user && isAuthPage) {
      if (user.role === "admin") navigate("/admin/dashboard", { replace: true });
      else if (user.role === "employee") navigate("/employee/dashboard", { replace: true });
      else navigate("/profile", { replace: true });
    } else if (!user && !isAuthPage && !["/", "/shop"].includes(location.pathname)) {
      navigate("/login", { replace: true });
    }
  }, [user, location.pathname, isAuthPage, navigate]);

  return (
    <>
      {/* 🧭 Role-based Header */}
      {user?.role === "employee" ? (
        <EmployeeHeader user={user} />
      ) : user?.role === "admin" ? (
        <AdminHeader user={user} />
      ) : (
        <Header user={user} />
      )}

      <div
        className="main-layout"
        style={{
          display: "flex",
          justifyContent: user?.role === "client" ? "space-between" : "center",
          alignItems: "flex-start",
          minHeight: "calc(100vh - 100px)",
        }}
      >
        {/* 🧭 Sidebar only for Client */}
        {user?.role === "client" && <Sidebar />}

        <main
          className="main-content"
          style={{
            flex: 1,
            padding: "20px",
            maxWidth: user?.role === "client" ? "calc(100% - 360px)" : "100%",
            transition: "max-width 0.3s ease",
          }}
        >
          <Routes>
            {/* Public */}
            <Route path="/" element={<ClientHome />} />
            <Route path="/shop" element={<ClientShop />} />

            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Client */}
            <Route path="/profile" element={<ClientProfile />} />
            <Route path="/checkout" element={<ClientCheckout />} />

            {/* Employee */}
            <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
            <Route path="/employee/attendance" element={<EmployeeAttendance />} />
            <Route path="/employee/messages" element={<EmployeeMessages />} />

            {/* Admin */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/attendance" element={<AdminAttendance />} />
            <Route path="/admin/employee-ratings" element={<AdminEmployeeRatings />} />
            <Route path="/admin/messages" element={<AdminMessages />} />
          </Routes>
        </main>

      </div>

      {!isAuthPage && <Footer />}
    </>
  );
}

export default App;