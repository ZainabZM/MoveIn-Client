import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import Navbar from "../../layouts/Navbar";

function Show({}) {
  const value = useLocation().state;
  console.log("Article ID:", value);
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [post, setPost] = useState(null);

  // ------------- RECUPERE LES DETAILS DU LIEU A AFFICHER -------------- //

  //   const [userId, setUserId] = useState();

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
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/articles/${value}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
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

  useEffect(() => {
    handleShow();
  }, [value]);

  // ------------- AFFICHE LE LIEU -------------- //
  const renderPost = () => {
    if (!post) {
      return <div>Loading...</div>;
    }
    return (
      <>
        <div className="showPlaceContainer">
          <div>
            <h1 className="showTitle">{post.title}</h1>
          </div>
          <div>
            <div className="showLocation">
              <div className="adresse">
                <i class="fa-solid fa-location-dot locationIcon"></i>
                <p className="adresseInformation">{post.brand}, </p>
                <p className="adresseInformation">{post.color}</p>
                <p className="adresseInformation">{post.price}</p>
              </div>
            </div>
          </div>
          <div className="showContent">
            <div className="showFile">
              <img src={post.file}></img>
            </div>
            <div className="about">
              <h2 className="aboutTitle">À Propos</h2>
              <p className="aboutParagraphe">{post.description}</p>
            </div>
          </div>
        </div>

        <div>
          {/* <button className="buttonShow" onClick={handleDelete}>
            Modifier
          </button> */}
          {post.user_id === user.id && (
            <button className="button" onClick={handleDelete}>
              Supprimer
            </button>
          )}
        </div>
      </>
    );
  };

  return (
    <>
      {/* SECTION HEADER - START */}
      <div className="navbar">
        <Navbar />
      </div>
      {/* SECTION HEADER - END */}

      {/* SECTION SHOWPLACE - START */}
      <div className="renderPlaceParent">{renderPost()}</div>
      {/* SECTION SHOWPLACE - END */}
    </>
  );
}

export default Show;
