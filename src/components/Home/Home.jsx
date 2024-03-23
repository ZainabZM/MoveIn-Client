import React, { useState } from "react";
import RenderPost from "../Post/RenderPost";
import Search from "../Search/Search";
import Navbar from "../../layouts/Navbar";
import Filter from "../Filter/Filter";
import Post from "../Post/Post";
import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  const [searchResults, setSearchResults] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState(null);

  // Function to handle search results
  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  // Function to handle filtered articles from Filter component
  const handleFilteredArticles = (articles) => {
    setFilteredArticles(articles);
  };

  // Function to handle category filter
  const handleCategoryFilter = (category) => {
    setCategoryFilter(category);
  };

  return (
    <>
      {/* SECTION HEADER - START */}
      <section className="homePage">
        <div className="navContainer">
          <div className="navbar">
            <Navbar handleSearchResults={handleSearchResults} />
          </div>
          <section className="filter">
            <Filter
              handleCategoryFilter={handleCategoryFilter}
              handleFilteredArticles={handleFilteredArticles}
            />
          </section>
        </div>
      </section>
      {/* SECTION HEADER - END */}
      <div className="showcase">
        <div className="caption">
          <p className="captionTitle">
            Redécouvrez votre intérieur avec style.
          </p>
        </div>
      </div>
      {/* SECTION AFFICHAGE LIEUX - START */}
      <section className="renderPost">
        {/* Conditionally render filtered articles */}
        {categoryFilter && filteredArticles.length > 0 ? (
          filteredArticles.map((article, index) => (
            <div key={index}>
              <Link to={`/articles/${article.id}`} state={article.id}>
                <Post
                  title={article.title}
                  file={article.file}
                  brand={article.brand}
                  price={article.price}
                />
              </Link>
            </div>
          ))
        ) : searchResults.length > 0 ? (
          <Search results={searchResults} />
        ) : (
          <RenderPost />
        )}
      </section>
      {/* SECTION AFFICHAGE LIEUX - END */}
    </>
  );
}

export default Home;
