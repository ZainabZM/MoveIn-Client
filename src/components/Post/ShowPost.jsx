import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import Navbar from "../../layouts/Navbar";
import Render from "./RenderShow";

function Show({ userId }) {
  const [error, setError] = useState(null);
  const value = useLocation().state;
  console.log("Article ID:", value);
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);

  // ------------- RECUPERE LES DETAILS DU LIEU A AFFICHER -------------- //

  const handleShow = async () => {
    console.log("Fetching article with ID:", value);
    let options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/articles/${value}`,
        options
      );

      if (!response.ok) {
        alert(`HTTP error! Status: ${response.status}`);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setPost(data.article);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  // ------------- SUPPRIMER -------------- //
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("@TokenUser");

      if (!token) {
        setError("Token not found");
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/articles/${value}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.log(value);
        console.error(`HTTP error! Status: ${response.status}`);
      } else {
        const data = await response.json();
        console.log(data.message);
        navigate("/");
        alert(data.message);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const fetchFavorites = async () => {
    try {
      const token = localStorage.getItem("@TokenUser");
      if (!token) {
        throw new Error("Token not found");
      }
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/favorites`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      const isFavorite = data.favorites.some(
        (favorite) => favorite.article_id === value
      );
      setIsFavorited(isFavorite);
    } catch (error) {
      console.error("Fetch favorites error:", error);
    }
  };

  const handleFavorite = async () => {
    try {
      const token = localStorage.getItem("@TokenUser");
      const user_id = localStorage.getItem("userId");
      if (!token) {
        setError("Token not found");
        console.error("Token not found");
        return;
      }

      // Define the URL and method based on whether the article is favorited or not
      let url = `${import.meta.env.VITE_API_URL}/favorites`;
      let method = isFavorited ? "DELETE" : "POST";

      // If favorited, include the article ID in the DELETE request URL
      if (isFavorited) {
        url += `/${value}`;
      }

      // Include the user ID in the request body
      const requestBody = {
        user_id,
        article_id: value,
      };

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: method === "POST" ? JSON.stringify(requestBody) : null,
      });

      if (!response.ok) {
        // Handle error responses from the backend
        console.error(`HTTP error! Status: ${response.status}`);
        return;
      }

      // Update the isFavorited state based on the current state
      setIsFavorited((prevState) => !prevState);
      alert(isFavorited ? "Removed from Favorites" : "Added to Favorites");
    } catch (error) {
      // Handle fetch errors
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    handleShow();
    fetchFavorites();
  }, []);

  return (
    <>
      <div className="navbar">
        <Navbar />
      </div>
      <div className="renderPlaceParent">
        <Render
          post={post}
          isFavorited={isFavorited}
          handleFavorite={handleFavorite}
          handleDelete={handleDelete}
        />
      </div>
    </>
  );
}

export default Show;
