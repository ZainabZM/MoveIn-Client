import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
// import Search from "../../components/search/Search";
import { useState, useEffect } from "react";

function Navbar() {
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

  return (
    <>
      <section className="header">
        <div className="boxLogo">
          <div className="logo">
            <Link to="/" className="logo">
              MoveIN
            </Link>
          </div>
          <div className="searchContainer">{/* <Search /> */}</div>
        </div>

        <input type="chexbox" id="check" />
        <div className="fa-solid fa-xmark icons" id="close-menu"></div>
        <div className="fa-solid fa-bars icons" id="icon-menu"></div>

        {authenticated ? (
          <nav>
            <div className="navbar">
              <div className="navbarLink">
                <Link to={`/dashboard`} className="Link">
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
      </section>
    </>
  );
}
export default Navbar;
