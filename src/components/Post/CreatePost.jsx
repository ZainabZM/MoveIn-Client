import React, { useState, useEffect } from "react";
import "./CreatePost.css";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [state, setState] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState("");
  const [category, setCategory] = useState("");
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
        setCategories(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchCategories();
  }, []);

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
    <>
      <h2 className="post">Vendez votre article</h2>
      <div className="create-box">
        <form className="create-post-form" onSubmit={handlePost}>
          <div className="big-white-div">
            <div className="input-row">
              <input
                type="text"
                name="title"
                placeholder="Titre"
                className="input-create-post"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <input
                type="text"
                name="brand"
                placeholder="Brand"
                className="input-create-post"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                required
              />
            </div>
            <div className="input-row">
              <input
                type="text"
                name="color"
                placeholder="Couleur"
                className="input-create-post"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                required
              />
              <input
                type="text"
                name="state"
                placeholder="État"
                className="input-create-post"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
            </div>
            <div className="input-row">
              <input
                type="number"
                name="price"
                placeholder="Prix"
                className="input-create-post"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
              <select
                name="category"
                className="input-create-post"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="" disabled selected>
                  Sélectionner une catégorie
                </option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.category}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-row">
              <textarea
                name="description"
                placeholder="Description"
                className="input-create-post"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="input-row">
              <input
                type="file"
                name="file"
                className="input-create-post"
                onChange={(e) => setFile(e.target.files[0])}
                required
              />
            </div>
          </div>
          <div className="submit-btn">
            <button type="submit" id="submit-btn">
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreatePost;
