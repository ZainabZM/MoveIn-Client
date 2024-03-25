import React from "react";
import { Link } from "react-router-dom";

function Render({ post, isFavorited, handleFavorite, handleDelete }) {
  if (!post) {
    return <div>Loading...</div>;
  }

  const userId = localStorage.getItem("userId");
  const isAuthenticated = userId !== null;

  // Function to handle adding to favorites
  const handleAddToFavorites = () => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      // Redirect to login page
      alert("Connectez-vous pour pouvoir ajouter cet article en favoris");
      window.location.href = "/login";
      return;
    }

    // User is authenticated, proceed with adding to favorites
    handleFavorite();
  };

  return (
    <div className="showPlaceContainer">
      <div className="imageContainer">
        <img src={post.file} alt="Post" className="image" />
      </div>
      <div className="infoContainer">
        <div className="price">
          {post.price} €
          <p>{parseFloat(post.price) + 1} € Protection acheteurs incluse</p>
        </div>
        <div className="info">
          <p>
            <strong>Brand:</strong> {post.brand}
          </p>
          <p>
            <strong>Color:</strong> {post.color}
          </p>
          <p>
            <strong>State:</strong> {post.state}
          </p>
        </div>
        <div className="description">
          <h2>About</h2>
          <p>{post.description}</p>
        </div>
        <div className="buttonsContainer">
          <button className="button" onClick={handleAddToFavorites}>
            {isFavorited ? "Remove from Favorites" : "Add to Favorites"}
          </button>
          {isAuthenticated ? (
            <Link to={`/checkout`} state={post.id}>
              <button className="button">Buy Now</button>
            </Link>
          ) : (
            <button className="button">Login to Buy</button>
          )}
          {userId == post.user_id && isAuthenticated && (
            <>
              <button className="button" onClick={handleDelete}>
                Delete
              </button>
              <button className="button">Edit</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Render;
