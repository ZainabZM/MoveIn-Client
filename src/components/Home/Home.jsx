import React, { useState } from "react";
import RenderPost from "../Post/RenderPost";
import Navbar from "../../layouts/Navbar";
import Post from "../Post/Post";
import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  const [searchResults, setSearchResults] = useState([]);

  // Function to handle search results
  const handleSearchResults = (results) => {
    setSearchResults(results);
  };
  console.log("searchresults :", searchResults);

  return (
    <>
      {/* SECTION HEADER - START */}
      <section className="homePage">
        <div className="navContainer">
          <div className="navbar">
            <Navbar handleSearchResults={handleSearchResults} />
          </div>
          <div className="filterNavContainer"></div>
        </div>
        {/* <div className="showcase">
          <div className="caption">
            <h1 className="captionTitle">heheheh... siiuuuuuu</h1>
          </div>
        </div> */}
      </section>
      {/* SECTION HEADER - END */}

      {/* SECTION AFFICHAGE LIEUX - START */}
      <section className="renderPost">
        {/* Conditionally render RenderPost based on search results */}
        {searchResults.length > 0 ? (
          searchResults.map((element, index) => {
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
          })
        ) : (
          <RenderPost />
        )}
      </section>
      {/* SECTION AFFICHAGE LIEUX - END */}
    </>
  );
}
export default Home;
