import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import Search from "../components/Search/Search";
import { useState, useEffect } from "react";

function Navbar(props) {
  const [authenticated, setAuthenticated] = useState(false);
  const [showLinks, setShowLinks] = useState(true); // State to track the visibility of the links
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("@TokenUser");
    if (token) {
      setAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("@TokenUser");
    navigate("/");
    alert("Vous êtes déconnecté(e)");
    setAuthenticated(false);
  };

  const handleSearchResults = (results) => {
    props.handleSearchResults(results); // Call the handleSearchResults function passed from props
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 967) {
        setShowLinks(false);
      } else {
        setShowLinks(true);
      }
    };

    handleResize(); // Call handleResize on component mount
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <div className="header">
        <div className="boxLogo">
          <div className="logo">
            <Link to="/" className="logo">
              Movein
            </Link>
          </div>
          <div className="searchContainer">
            <Search handleSearchResults={handleSearchResults} />
          </div>
        </div>
        <button id="burger-menu" onClick={() => setShowLinks(!showLinks)}>
          ☰ {/* Burger menu icon */}
        </button>
        <nav>
          <div
            className={`navbar ${showLinks ? "show" : "hide"}`}
            id="navLinks"
          >
            {authenticated ? (
              <>
                <div className="navbarLink">
                  <Link to="/sell" className="Link">
                    Vendre
                  </Link>
                </div>
                <div className="navbarLink">
                  <Link to={`/profile`} className="Link">
                    Profil
                  </Link>
                </div>
                <div className="navbarLink">
                  <Link className="btnLogOut" onClick={handleLogout}>
                    Déconnexion
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="navbarLink">
                  <Link to="/register" className="Link">
                    Inscription
                  </Link>
                </div>
                <div className="navbarLink">
                  <Link to="/login" className="Link">
                    Connexion
                  </Link>
                </div>
              </>
            )}
          </div>
        </nav>
      </div>
    </>
  );
}
export default Navbar;
