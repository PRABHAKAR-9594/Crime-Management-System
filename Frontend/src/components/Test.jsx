import React, { useState } from "react";
import axios from "axios";

export default function Test() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the first selected file
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file)); // Generate a preview URL
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image before uploading!");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile); // "image" should match the backend field name

    try {
      const response = await axios.post("http://localhost:8080/Test", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("File uploaded successfully:", response.data);
      setUploadedImageUrl(response.data.url); // Store Cloudinary image URL
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <input type="file" onChange={handleFileChange} accept="image/*" />
      {preview && <img src={preview} alt="Preview" width="200" style={{ marginTop: "10px" }} />}
      <br />
      <button onClick={handleFileUpload} style={{ marginTop: "10px", padding: "5px 15px" }}>
        Upload
      </button>

      {uploadedImageUrl && (
        <div>
          <p>Uploaded Image:</p>
          <img src={uploadedImageUrl} alt="Uploaded to Cloudinary" width="200" />
          <p>URL: <a href={uploadedImageUrl} target="_blank" rel="noopener noreferrer">{uploadedImageUrl}</a></p>
        </div>
      )}
    </div>
  );
}
