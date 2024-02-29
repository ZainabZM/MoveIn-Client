import React, { useState } from "react";

function SearchBar({ handleSearch }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
    handleSearch(e.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for articles..."
        value={query}
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchBar;
