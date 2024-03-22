import React, { useState, useEffect } from "react";
import "./EditForm.css";

function EditForm({ initialValues, handleSubmit }) {
  const [formData, setFormData] = useState(initialValues);
  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    setFormData(initialValues);
  }, [initialValues]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/categories`
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data.categories);
          setCategories(data);
        } else {
          console.error("Failed to fetch categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e) => {
    const { name, options } = e.target;
    const selectedCategories = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: selectedCategories,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log("Selected file:", selectedFile);
    setFile(selectedFile);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData); // Pass formData to the handleSubmit callback
  };

  return (
    <div className="editForm">
      <form method="POST" onSubmit={onSubmit}>
        <input type="hidden" name="_method" value="PUT" />
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <label htmlFor="brand">Marque</label>
        <input
          type="text"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
        />
        <label htmlFor="color">Couleur</label>
        <input
          type="text"
          name="color"
          value={formData.color}
          onChange={handleChange}
        />
        <label htmlFor="state">Etat</label>
        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={handleChange}
        />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <label htmlFor="price">Prix</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
        <select
          name="category"
          className="inputRegister"
          placeholder="Catégorie"
          required
          value={formData.category}
          onChange={handleCategoryChange}
          multiple
        >
          {/* Map over categories to render select options */}
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.category}
            </option>
          ))}
        </select>
        <input type="file" name="file" onChange={handleFileChange} />
        <button type="submit">Update Article</button>
      </form>
    </div>
  );
}

export default EditForm;
