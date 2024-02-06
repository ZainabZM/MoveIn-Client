import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Post from "./Post";
import "./RenderPost.css";

function RenderPost(props) {
  const [post, setPost] = useState(null);

  /* ---- Récupère tous les lieux présents dans la bdd ------- */
  const getPost = async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/articles/`,
        options
      );
      const data = await response.json();

      console.log("getPost", data);
      // Vérifie si le premier élément de data est bien un tableau
      if (Array.isArray(data["articles"])) {
        // Si oui, places prend la valeur de celui-ci
        setPost(data["articles"]);
      } else {
        // Si non, erreur
        console.error("Pas un tableau:", data);
      }
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  useEffect(() => {
    getPost();
  }, []);
  /* -----------  Renvoie tous les lieux présents dans la database --------- */
  const renderPost = () => {
    return post?.map((element, index) => {
      const id = element.id;
      return (
        <div key={index}>
          <ul>
            <Link to={`/articles/${id}`} state={element.id}>
              <Post
                title={element.title}
                file={element.file}
                brand={element.brand}
                price={element.price}
              />
            </Link>
          </ul>
        </div>
      );
    });
  };

  return (
    <>
      <div className="box-container">{renderPost()}</div>
    </>
  );
}

export default RenderPost;
