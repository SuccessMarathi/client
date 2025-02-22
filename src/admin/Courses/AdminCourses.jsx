import React, { useState } from 'react'
import axios from "axios";
import { server } from "../../index.js";
import './admincourses.css';

const AdminCourses = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("description", formData.description);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }
  
    try {
      const { data } = await axios.post(`${server}/api/course/new`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      alert(data.message); // Show API success message
      console.log("Created Course:", data.course);
  
      // Reset form & preview
      setFormData({ name: "", price: "", description: "", image: null });
      setPreview(null); // Clear the image preview
  
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(error.response?.data?.message || "Failed to submit. Please try again.");
    }
  };
  
  
  
  return (
    <div style={styles.container}>
    <h2 style={styles.heading}>Create a Package</h2>
    <form onSubmit={handleSubmit} style={styles.form}>
      
      <label style={styles.label}>Package Name:</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        style={styles.input}
        placeholder="Enter package name"
        required
      />

      <label style={styles.label}>Select Image:</label>
      <input type="file" accept="image/*" onChange={handleImageChange} style={styles.fileInput} required />
      {/* {preview && <img src={preview} alt="Preview" style={styles.preview} />} */}

      <label style={styles.label}>Price:</label>
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        style={styles.input}
        placeholder="Enter price"
        required
      />

      <label style={styles.label}>Short Description:</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        style={styles.textarea}
        placeholder="Write a short description"
        required
      ></textarea>

      <button type="submit" style={styles.button}>Submit</button>
    </form>
  </div>
);
};

// Inline CSS Styles (Improved for Responsiveness)
const styles = {
container: {
  width: "90%",
  maxWidth: "420px",
  margin: "100px auto",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#fff",
},
heading: {
  textAlign: "center",
  marginBottom: "20px",
  color: "#333",
  fontSize: "22px",
},
form: {
  display: "flex",
  flexDirection: "column",
},
label: {
  marginBottom: "6px",
  // fontWeight: "bold",
  color: "#555",
  fontSize: "14px",
},
input: {
  padding: "12px",
  marginBottom: "15px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  fontSize: "16px",
  outline: "none",
},
textarea: {
  padding: "12px",
  marginBottom: "15px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  fontSize: "16px",
  height: "80px",
  resize: "none",
  outline: "none",
},
button: {
  padding: "12px",
  backgroundColor: "#00275a",
  color: "#fff",
  fontSize: "16px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "background 0.3s ease",
},
buttonHover: {
  backgroundColor: "#0056b3",
},
fileInput: {
  marginBottom: "15px",
  fontSize: "14px",
},
preview: {
  width: "100%",
  height: "auto",
  marginBottom: "15px",
  borderRadius: "8px",
  boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
},
};
export default AdminCourses
