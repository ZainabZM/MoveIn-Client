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
          console.log(error);
          return;
        }
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/profile`,
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
          setUserProfile(data.user);
          setEditedProfile(data.user);
        } else {
          setError("Failed to fetch user data");
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
      setUserProfile(data.updatedProfile);
      setEditMode(false);

      const updatedProfileResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/profile`,
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

      navigate("/profile");
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
    <div className="profileContainer">
      <h2>User Profile</h2>
      {!editMode ? (
        <>
          <div className="profileBox">
            <p>Firstname: {userProfile.firstname}</p>
            <p>Lastname: {userProfile.lastname}</p>
            <p>Username: {userProfile.username}</p>
            <p>Email: {userProfile.email}</p>
            <button onClick={handleEditClick}>Modifier mon profil</button>
          </div>
        </>
      ) : (
        <>
          <div className="profileForm">
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
          </div>
          {/* Button to toggle the change password form */}
          <button onClick={handleTogglePassword}>Change Password</button>

          {/* Render the Password component conditionally */}
          {showPassword && <Password onClose={handleTogglePassword} />}

          <button onClick={handleSaveClick}>Save</button>
        </>
      )}
    </div>
  );
};

export default Profile;
