// Search.jsx

import React, { useState } from "react";

const Search = ({ handleSearchResults }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/search?query=${query}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }
      console.log("hello");
      const data = await response.json();
      console.log(data);
      setResults(data.articles);
      // Pass search results to parent component
      handleSearchResults(data.articles);
      console.log("handlesearchresults :", handleSearchResults);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleChange}
        className="searchContainer"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Search;
