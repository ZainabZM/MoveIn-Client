import React, { useState } from "react";
import RenderPost from "../Post/RenderPost";
import Navbar from "../../layouts/Navbar";

function Home() {
  const [value, setValue] = useState("");

  console.log(value);
  return (
    <>
      {/* SECTION HEADER - START */}
      <section className="homePage">
        <div className="navContainer">
          <div className="navbar">
            <Navbar />
          </div>

          <div className="filterNavContainer">{/* <NavFilter /> */}</div>
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
        <RenderPost />
      </section>
      {/* SECTION AFFICHAGE LIEUX - END */}
    </>
  );
}
export default Home;
