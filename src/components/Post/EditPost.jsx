import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import Navbar from "../../layouts/Navbar";
import EditForm from "./EditForm";

function EditPost() {
  const location = useLocation();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      const articleId = location.state;
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/articles/${articleId}`
        );
        if (response.ok) {
          const data = await response.json();
          setArticle(data.article);
        } else {
          console.error("Failed to fetch article");
        }
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    fetchArticle();
  }, [location.state]);

  const handleUpdate = async (updatedArticleData) => {
    const articleId = location.state;
    try {
      const token = localStorage.getItem("@TokenUser");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/articles/${articleId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedArticleData),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        navigate("/"); // Redirect to show page after update
      } else {
        console.error("Failed to update article");
      }
    } catch (error) {
      console.error("Error updating article:", error);
    }
  };

  return (
    <>
      <div className="navbar">
        <Navbar />
      </div>
      <div className="editArticleContainer">
        {article ? (
          <EditForm initialValues={article} handleSubmit={handleUpdate} />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
}

export default EditPost;
