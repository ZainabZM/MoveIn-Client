import React, { useState } from "react";
import RenderPost from "../Post/RenderPost";
import SearchBar from "../Search/SearchBar";

import Navbar from "../../layouts/Navbar";

function Home() {
  const [value, setValue] = useState("");

  const handleSearch = (searchValue) => {
    // Update the state with the search value
    setValue(searchValue);
  };

  console.log(value);
  return (
    <>
      {/* SECTION HEADER - START */}
      <section className="homePage">
        <div className="navContainer">
          <div className="navbar">
            <Navbar />
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
      <section className="RenderPlaces">
        <SearchBar onSearch={handleSearch} />
        <RenderPost />
      </section>
      {/* SECTION AFFICHAGE LIEUX - END */}
    </>
  );
}
export default Home;
