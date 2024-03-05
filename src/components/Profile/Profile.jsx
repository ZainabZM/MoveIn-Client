import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Password from "./Password";
import "./Profile.css";

const Profile = () => {
  const [error, setError] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("@TokenUser");
        const userId = localStorage.getItem("UserId");
        if (!token) {
          setError("Token not found");
          alert("where is token :(");
          return;
        }
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/dashboard`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log("User data:", data.user);
          setUserProfile(data.user);
          setEditedProfile(data.user); // Initialize editedProfile with userProfile data
        } else {
          setError("Failed to fetch user data");
          alert("oops");
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    try {
      const token = localStorage.getItem("@TokenUser");
      if (!token) {
        setError("Token not found");
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/profile/edit`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editedProfile),
        }
      );

      if (!response.ok) {
        setError("Erreur lors de la modification du profil");
        return;
      }

      const data = await response.json();
      alert(data.message);
      setUserProfile(data.updatedProfile); // Update userProfile with the updated data
      setEditMode(false); // Toggle off edit mode

      // Fetch the updated user profile again to ensure the latest data is displayed
      const updatedProfileResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/dashboard`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!updatedProfileResponse.ok) {
        setError("Failed to fetch updated profile data");
        return;
      }

      const updatedProfileData = await updatedProfileResponse.json();
      setUserProfile(updatedProfileData.user);

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Erreur lors de la modification du profil", error);
      setError("Erreur lors de la modification du profil");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      {!editMode ? (
        <>
          <p>Firstname: {userProfile.firstname}</p>
          <p>Lastname: {userProfile.lastname}</p>
          <p>Username: {userProfile.username}</p>
          <p>Email: {userProfile.email}</p>
          <button onClick={handleEditClick}>Edit</button>
          {/* Button to toggle the change password form */}
          <button onClick={handleTogglePassword}>Change Password</button>

          {/* Render the Password component conditionally */}
          {showPassword && <Password onClose={handleTogglePassword} />}
        </>
      ) : (
        <>
          <label>
            Firstname:
            <input
              type="text"
              name="firstname"
              value={editedProfile.firstname}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Lastname:
            <input
              type="text"
              name="lastname"
              value={editedProfile.lastname}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={editedProfile.username}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={editedProfile.email}
              onChange={handleInputChange}
            />
          </label>

          <button onClick={handleSaveClick}>Save</button>
        </>
      )}
    </div>
  );
};

export default Profile;
