import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../Login/Login.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("@TokenUser", data.token);
        localStorage.setItem("userId", data.user.id);
        setShowSuccessAlert(true);
        alert("Vous êtes connecté(e)");
        navigate("/");
      } else {
        const data = await response.json();
        setShowErrorAlert(true);
        alert("Email ou mot de passe incorrect.");
        setError(data.message || "Email ou mot de passe incorrect.");
      }
    } catch (error) {
      setError("Une erreur s'est produite lors de la connexion.");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-heading">Connecte-toi à ton compte</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="text"
          value={email}
          onChange={handleEmail}
          className="login-input"
          placeholder="Adresse email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={handlePassword}
          className="login-input"
          placeholder="Mot de Passe"
          required
        />
        <button type="submit" className="login-button">
          Connexion
        </button>
      </form>
      <div className="forgot-link">
        <Link to="/resetpassword" className="forgot-password-link">
          Mot de passe oublié
        </Link>
      </div>
      {showErrorAlert && <div className="error-alert">{error}</div>}
      {showSuccessAlert && (
        <div className="success-alert">Vous êtes connecté(e)</div>
      )}
    </div>
  );
}

export default Login;
