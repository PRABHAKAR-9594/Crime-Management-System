import { useState } from "react";
import axios from "axios";

export default function Addcriminal() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    dob: "",
    height: "",
    weight: "",
    adharnumber: "",
    criminalImg: null,
    crimetype: "",
    desc: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validation Rules
    if (name === "firstname" || name === "lastname") {
      if (!/^[a-zA-Z\s]*$/.test(value)) return; // Only letters and spaces
    } else if (name === "height" || name === "weight") {
      if (!/^\d{0,3}$/.test(value)) return; // Only numbers (max 3 digits)
    } else if (name === "adharnumber") {
      if (!/^\d{0,12}$/.test(value)) return; // Only numbers, max 12 digits
    } else if (name === "crimetype") {
      if (!/^[a-zA-Z\s]*$/.test(value)) return; // Only letters and spaces
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = async (e) => {

    const { name, files } = e.target; 
    const file = files[0];  // Get the first selected file
    const fileType = file?.type;
    const fileSize = file?.size;

    const maxFileSize = 5 * 1024 * 1024; // 5MB

    if (fileSize > maxFileSize) {
        alert("The file size is too large. Please upload a file smaller than 5MB.");
        return;
    }

    // Check if a file was selected
    if (!file) return;
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      alert('Please upload a valid image or video file');
      return;
  }

  const formData = new FormData();
    formData.append('file', file); // Attach the file
    formData.append('upload_preset', import.meta.env.VITE_REACT_UPLOAD_PRESET); // Replace with your upload preset name
    formData.append('cloud_name', import.meta.env.VITE_REACT_CLOUD_NAME); // Replace with your Cloudinary Cloud Name
  
    try {
      // Determine the appropriate Cloudinary endpoint
      const cloudinaryEndpoint = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_REACT_CLOUD_NAME}/image/upload`; // Image upload endpoint

      const response = await axios.post(cloudinaryEndpoint, formData);

      // Get the URL of the uploaded file (image or video)
      const filePath = response.data.secure_url;

      // Update the state with the file URL (string path)
      setFormData((prev) => {
          
          return {
              ...prev,
              criminalImg: filePath,
          };
      });
  } catch (error) {
      console.error('Error uploading file:', error);
  }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Aadhaar Number Length Check
    if (formData.adharnumber.length !== 12) {
      alert("Aadhaar Number must be exactly 12 digits.");
      return;
    }

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      await axios.post("http://localhost:8080/createcriminal", {...formData}
       );

      setFormData({
        firstname: "",
        lastname: "",
        dob: "",
        height: "",
        weight: "",
        adharnumber: "",
        criminalImg: null,
        crimetype: "",
        desc: "",
      });

      alert("Criminal record added successfully!");
    } catch (error) {
      console.error("Error adding criminal:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-black text-red-500 pt-[90px] pb-6">
      <h1 className="text-4xl font-extrabold mb-6 border-b-4 border-red-500 pb-2">Criminal Records</h1>
      
      <form className="w-full max-w-lg bg-gray-900 p-6 rounded-lg shadow-lg" onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="grid grid-cols-2 gap-4">
          {Object.keys(formData).map(
            (key) =>
              key !== "desc" &&
              key !== "criminalImg" && (
                <input
                  key={key}
                  type={key === "dob" ? "date" : "text"}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  className="w-full p-3 rounded bg-black text-red-500 border border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              )
          )}
        </div>

        <textarea
          name="desc"
          value={formData.desc}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-3 mt-4 rounded bg-black text-red-500 border border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
          rows="4"
        ></textarea>

        <label className="text-white mt-4 block">Please upload a photo of the criminal:</label>
        <input
          type="file"
          name="evidence.imageFile"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full mt-2 text-white bg-black border border-red-500 p-2 rounded"
        />

        <button 
          type="submit" 
          className="w-full mt-4 bg-red-600 hover:bg-red-700 text-black font-bold py-2 px-4 rounded transition duration-300"
        >
          Add Criminal
        </button>
      </form>
    </div>
  );
}
