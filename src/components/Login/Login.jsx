import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Register/Register.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  let user = {
    email: email,
    password: password,
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");

    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/login`,
        options
      );
      const data = await response.json();
      if (data.token) {
        localStorage.setItem("@TokenUser", data.token);
        setShowSuccessAlert(true);
        alert("Vous êtes connecté(e)");
        navigate("/");
      } else {
        setShowErrorAlert(true);
        alert("Email ou mot de passe incorrect.");
        setError(data.message || "Email ou mot de passe incorrect.");
      }
    } catch (error) {
      setError("Une erreur s'est produite lors de la connexion.");
    }
  };
  return (
    <div className="form">
      <form action="" method="post">
        <input
          type="text"
          value={email}
          onChange={handleEmail}
          className="inputLogin"
          placeholder="Adresse email"
        />
        <label>{emailError}</label>
        <input
          value={password}
          onChange={handlePassword}
          className="inputLogin"
          placeholder="Mot de Passe"
        />
        <div className="inputContainer">
          <button
            className="inputButton"
            type="button"
            onClick={handleLogin}
            value="Connexion"
            id="loginButton"
          >
            Connexion
          </button>
        </div>
      </form>
    </div>
  );
}
export default Login;
