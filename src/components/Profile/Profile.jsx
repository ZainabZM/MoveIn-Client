import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import "./Profile.css";

const Profile = () => {
  const value = useLocation().state;
  const [error, setError] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("@TokenUser");
        const userId = localStorage.getItem("UserId");
        console.log(userId);
        console.log(token);
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

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>Firstname: {userProfile.firstname}</p>
      <p>Lastname: {userProfile.lastname}</p>
      <p>Username: {userProfile.username}</p>
      <p>Email: {userProfile.email}</p>
      <p>Password: {userProfile.password}</p>
      {/* Add other fields as needed */}
    </div>
  );
};

export default Profile;
