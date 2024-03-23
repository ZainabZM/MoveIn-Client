import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Post from "./Post";
import "./RenderPost.css";

function RenderPost(props) {
  const [post, setPost] = useState(null);

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
      if (Array.isArray(data["articles"])) {
        setPost(data["articles"]);
      } else {
        console.error("articles n'est pas un tableau:", data);
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
