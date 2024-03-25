import React, { useState } from "react";
import { Link } from "react-router-dom";
// import "../ForgotPassword/ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make an API call to initiate the password reset process
      window.passwordResetRoute = "http://localhost:5173/reset-password";

      // Make the fetch request
      const response = await fetch(window.passwordResetRoute, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSuccessMessage(
          "Un email de réinitialisation de mot de passe a été envoyé à votre adresse email."
        );
      } else {
        const data = await response.json();
        setErrorMessage(
          data.message ||
            "Une erreur s'est produite lors de la réinitialisation du mot de passe."
        );
      }
    } catch (error) {
      setErrorMessage(
        "Une erreur s'est produite lors de la réinitialisation du mot de passe."
      );
    }
  };

  return (
    <div className="forgot-password-container">
      <h2 className="forgot-password-heading">Mot de passe oublié</h2>
      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          className="forgot-password-input"
          placeholder="Adresse email"
          required
        />
        <button type="submit" className="forgot-password-button">
          Réinitialiser le mot de passe
        </button>
      </form>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      <div className="login-link">
        <Link to="/login" className="login-page-link">
          Retour à la page de connexion
        </Link>
      </div>
    </div>
  );
}

export default ForgotPassword;
