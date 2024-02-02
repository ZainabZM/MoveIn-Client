import { useState, useEffect } from "react";

function Post() {
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [state, setState] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState("");
  const [category, setCategory] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from your backend API and update the state
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/categories`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setCategories(data); // Corrected from setCategories
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchCategories();
  }, []); // Run this effect only once on component mount

  const handlePost = async (e) => {
    e.preventDefault();

    const authToken = localStorage.getItem("@TokenUser");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("brand", brand);
    formData.append("color", color);
    formData.append("state", state);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("file", file);
    formData.append("category", category);

    let options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      body: formData,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/articles`,
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
      <form method="POST" onSubmit={handlePost}>
        <input
          type="text"
          name="title"
          placeholder="Titre"
          className="inputRegister"
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          name="brand"
          placeholder="Marque"
          className="inputRegister"
          required
          onChange={(e) => setBrand(e.target.value)}
        />
        <input
          type="text"
          name="color"
          placeholder="Couleur"
          className="inputRegister"
          required
          onChange={(e) => setColor(e.target.value)}
        />
        <input
          type="text"
          name="state"
          placeholder="Condition"
          className="inputRegister"
          required
          onChange={(e) => setState(e.target.value)}
        />
        <input
          type="text"
          name="description"
          className="inputRegister"
          placeholder="Description"
          required
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          name="price"
          className="inputRegister"
          placeholder="Prix"
          required
          onChange={(e) => setPrice(e.target.value)}
        />
        <select
          name="category"
          className="inputRegister"
          placeholder="Catégorie"
          required
          onChange={(e) => setCategory(e.target.value)}
          multiple
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.category}
            </option>
          ))}
        </select>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">Poster</button>
      </form>
    </div>
  );
}
export default Post;
