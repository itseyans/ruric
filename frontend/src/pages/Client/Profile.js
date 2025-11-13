import React, { useState } from "react";
import { updateProfile, changePassword } from "../../services/api";
import "../../styles/Profile.css";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [profile, setProfile] = useState({
    user_id: user?.user_id || "",
    full_name: user?.full_name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });

  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
  });

  const [status, setStatus] = useState("");

  const handleProfileUpdate = async () => {
    try {
      setStatus("Saving...");
      const res = await updateProfile(profile);
      setStatus(res.message || "Profile updated successfully!");
    } catch (error) {
      setStatus("Failed to update profile.");
    }
  };

  const handlePasswordChange = async () => {
    try {
      setStatus("Updating password...");
      const res = await changePassword({
        user_id: profile.user_id,
        current_password: passwordData.current_password,
        new_password: passwordData.new_password,
      });
      setStatus(res.message || "Password changed successfully!");
    } catch (error) {
      setStatus("Failed to update password.");
    }
  };

  return (
    <div className="profile-page">
      <h2 className="profile-header">👤 My Profile</h2>

      <div className="profile-container">
        {/* ✅ Profile Info */}
        <div className="profile-card">
          <h3>Personal Information</h3>
          <div className="profile-form">
            <label>Full Name</label>
            <input
              type="text"
              value={profile.full_name}
              onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
            />

            <label>Email</label>
            <input type="email" value={profile.email} disabled />

            <label>Phone</label>
            <input
              type="text"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            />

            <label>Address</label>
            <input
              type="text"
              value={profile.address}
              onChange={(e) => setProfile({ ...profile, address: e.target.value })}
            />

            <button className="btn-save" onClick={handleProfileUpdate}>
              Save Changes
            </button>
          </div>
        </div>

        {/* ✅ Change Password */}
        <div className="profile-card">
          <h3>Change Password</h3>
          <div className="profile-form">
            <label>Current Password</label>
            <input
              type="password"
              value={passwordData.current_password}
              onChange={(e) =>
                setPasswordData({ ...passwordData, current_password: e.target.value })
              }
            />

            <label>New Password</label>
            <input
              type="password"
              value={passwordData.new_password}
              onChange={(e) =>
                setPasswordData({ ...passwordData, new_password: e.target.value })
              }
            />

            <button className="btn-change" onClick={handlePasswordChange}>
              Update Password
            </button>
          </div>
        </div>
      </div>

      {status && <p className="profile-status">{status}</p>}
    </div>
  );
}

export default Profile;
