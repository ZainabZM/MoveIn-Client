import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Article from "./Article";
import "./Profile.css";

function UserArticles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const token = localStorage.getItem("@TokenUser");
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/profile/articles`,
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
          setArticles(data.articles);
        } else {
          console.error("Failed to fetch articles");
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="articlesContainer">
      {articles.map((article) => (
        <Link
          key={article.id}
          to={`/articles/${article.id}`}
          state={article.id}
        >
          <Article key={article.id} title={article.title} file={article.file} />
        </Link>
      ))}
    </div>
  );
}

export default UserArticles;
