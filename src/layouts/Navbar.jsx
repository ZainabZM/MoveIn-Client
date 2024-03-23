import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import Search from "../components/Search/Search";
import { useState, useEffect } from "react";

function Navbar(props) {
  const [authenticated, setAuthenticated] = useState(false);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("@TokenUser");
    if (token) {
      setAuthenticated(true);
    }
  }, []);

  console.log("userId:", userId);

  const handleLogout = () => {
    localStorage.removeItem("@TokenUser");
    navigate("/");
    alert("Vous êtes déconnecté(e)");
    setAuthenticated(false);
  };

  const handleSearchResults = (results) => {
    props.handleSearchResults(results); // Call the handleSearchResults function passed from props
  };

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
        {authenticated ? (
          <nav>
            <div className="navbar">
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
            </div>
          </nav>
        ) : (
          <nav>
            <div className="navbar">
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
            </div>
          </nav>
        )}
      </div>
    </>
  );
}
export default Navbar;
