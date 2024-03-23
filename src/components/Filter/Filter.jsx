import React from "react";
import "./Filter.css";

function Filter({ handleCategoryFilter, handleFilteredArticles }) {
  // Function to handle category filter
  const handleFilterByCategory = async (category) => {
    try {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/filter/${category}`,
        options
      );
      if (!response.ok) {
        throw new Error("Failed to fetch filtered articles");
      }
      const data = await response.json();
      console.log(data);
      handleCategoryFilter(category);
      handleFilteredArticles(data.articles);
    } catch (error) {
      console.error("Error filtering articles:", error);
    }
  };

  return (
    <div className="filterContainer">
      <button onClick={() => handleFilterByCategory("canapés")}>Canapés</button>
      <button onClick={() => handleFilterByCategory("chaises")}>Chaises</button>
      <button onClick={() => handleFilterByCategory("décoration")}>
        Décoration
      </button>
      <button onClick={() => handleFilterByCategory("fauteuils")}>
        Fauteuils
      </button>
      <button onClick={() => handleFilterByCategory("luminaires")}>
        Luminaires
      </button>
      <button onClick={() => handleFilterByCategory("meubles")}>Meubles</button>
      <button onClick={() => handleFilterByCategory("tableaux")}>
        Tableaux
      </button>
      <button onClick={() => handleFilterByCategory("tables")}>Tables</button>
    </div>
  );
}

export default Filter;
