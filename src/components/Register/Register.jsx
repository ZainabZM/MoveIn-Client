import { useState } from "react";
// import { useNavigate } from "react-router-dom";

function Register() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let user = {
    firstname: firstname,
    lastname: lastname,
    username: username,
    email: email,
    password: password,
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/register`,
        options
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("data", data);
      if (data.message) {
        alert(data.message);
        // navigate("/login");
      } else {
        alert("Une erreur est survenue. Veuillez réessayer.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <div className="form">
      <form action="" method="POST">
        <input
          type="text"
          name="firstname"
          placeholder="Nom"
          className="inputRegister"
          required
          onChange={(e) => setLastname(e.target.value)}
        />
        <input
          type="text"
          name="lastname"
          placeholder="Prénom"
          className="inputRegister"
          required
          onChange={(e) => setFirstname(e.target.value)}
        />
        <input
          type="text"
          name="username"
          placeholder="Nom d'utilisateur"
          className="inputRegister"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          name="email"
          placeholder="Adresse email"
          className="inputRegister"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          className="inputRegister"
          placeholder="Mot de passe"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" onClick={handleRegister}>
          Inscription
        </button>
      </form>
    </div>
  );
}
export default Register;
