import React, { useState } from "react";
import axios from "axios";
import { server } from "../../index"; // Replace with your actual server URL
import styles from "./UpdateProfile.module.css";

const UpdateProfile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreview(URL.createObjectURL(file)); // Preview the image before uploading
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!profileImage) {
      setErrorMessage("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("profileImage", profileImage);

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${server}/api/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token,
        },
      });
      setSuccessMessage("Profile image uploaded successfully!");
      setPreview(response.data.imageUrl); // Update preview with the uploaded image URL
    } catch (error) {
      setErrorMessage(error.response?.data?.error || "Failed to upload image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Update Profile Picture</h2>
      <form onSubmit={handleUpload} className={styles.form}>
        <div className={styles.imagePreview}>
          {preview ? (
            <img src={preview} alt="Preview" className={styles.previewImage} />
          ) : (
            <div className={styles.placeholder}>No image selected</div>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className={styles.fileInput}
        />
        <button type="submit" className={styles.uploadButton} disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
      {successMessage && <p className={styles.success}>{successMessage}</p>}
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
    </div>
  );
};

export default UpdateProfile;
