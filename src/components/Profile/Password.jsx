// ChangePasswordForm.jsx
import React, { useState } from "react";

const Password = ({ onClose }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleChangePassword = async () => {
    try {
      const token = localStorage.getItem("@TokenUser");
      if (!token) {
        setError("Token not found");
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/profile/password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
            confirmPassword,
          }),
        }
      );

      if (!response.ok) {
        setError("Error changing password");
        return;
      }

      // Reset form fields after successful password change
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      alert(data.message);
    } catch (error) {
      console.error("Error changing password", error);
      setError("Error changing password");
    }
  };

  return (
    <div>
      <h2>Change Password</h2>
      <label>
        Current Password:
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </label>
      <label>
        New Password:
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </label>
      <label>
        Confirm Password:
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </label>
      <button onClick={handleChangePassword}>Modifier</button>
      <button onClick={onClose}>Annuler</button>
    </div>
  );
};

export default Password;
