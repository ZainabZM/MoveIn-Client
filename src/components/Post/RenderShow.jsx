import { Link } from "react-router-dom";
import React from "react";

function Render({ post, isFavorited, handleFavorite, handleDelete }) {
  if (!post) {
    return <div>Loading...</div>;
  }
  const userId = localStorage.getItem("userId");
  return (
    <div className="showPlaceContainer">
      <div>
        <h1 className="showTitle">{post.title}</h1>
      </div>
      <div>
        <div className="showLocation">
          <div className="adresse">
            <p className="adresseInformation">{post.brand}, </p>
            <p className="adresseInformation">{post.color}</p>
            <p className="adresseInformation">{post.price}</p>
          </div>
        </div>
      </div>
      <div className="showContent">
        <div className="showFile">
          <img src={post.file} alt="Post" />
        </div>
        <div className="about">
          <h2 className="aboutTitle">À Propos</h2>
          <p className="aboutParagraphe">{post.description}</p>
        </div>
      </div>
      <div>
        <button className="button" onClick={handleFavorite}>
          {isFavorited ? "Remove from Favorites" : "Add to Favorites"}
        </button>
        {userId == post.user_id && (
          <>
            <button className="button" onClick={handleDelete}>
              Supprimer
            </button>
            <Link
              to={`/articles/${post.id}/edit`}
              state={post.id}
              className="button"
            >
              Edit
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Render;
