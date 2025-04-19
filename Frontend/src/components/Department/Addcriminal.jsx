import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Addcriminal() {
  const Username = sessionStorage.getItem("UserName");
  const nevigate = useNavigate();

  useEffect(() => {
    if (!Username) {
      nevigate("/login");
    }
  }, [Username]);

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

    if (name === "firstname" || name === "lastname") {
      if (!/^[a-zA-Z\s]*$/.test(value)) return;
    } else if (name === "height" || name === "weight") {
      if (!/^\d{0,3}(\.\d{0,2})?$/.test(value)) return; // ✅ updated to allow decimal
    } else if (name === "adharnumber") {
      if (!/^\d{0,12}$/.test(value)) return;
    } else if (name === "crimetype") {
      if (!/^[a-zA-Z\s]*$/.test(value)) return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = async (e) => {
    const { name, files } = e.target;
    const file = files[0];
    const fileType = file?.type;
    const fileSize = file?.size;
    const maxFileSize = 5 * 1024 * 1024;

    if (fileSize > maxFileSize) {
      alert("The file size is too large. Please upload a file smaller than 5MB.");
      return;
    }

    if (!file) return;

    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      alert("Please upload a valid image or video file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_REACT_UPLOAD_PRESET);
    formData.append("cloud_name", import.meta.env.VITE_REACT_CLOUD_NAME);

    try {
      const cloudinaryEndpoint = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_REACT_CLOUD_NAME}/image/upload`;
      const response = await axios.post(cloudinaryEndpoint, formData);
      const filePath = response.data.secure_url;

      setFormData((prev) => ({
        ...prev,
        criminalImg: filePath,
      }));
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.adharnumber.length !== 12) {
      alert("Aadhaar Number must be exactly 12 digits.");
      return;
    }

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      await axios.post("http://localhost:8080/createcriminal", { ...formData });

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
      <h1 className="text-4xl font-extrabold mb-6 border-b-4 border-red-500 pb-2">
        Criminal Records
      </h1>

      <form
        className="w-full max-w-lg bg-gray-900 p-6 rounded-lg shadow-lg"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="grid grid-cols-2 gap-4">
          {Object.keys(formData).map((key) => {
            if (key === "desc" || key === "criminalImg") return null;

            if (key === "dob") {
              const today = new Date().toISOString().split("T")[0];
              const oneYearAgo = new Date();
              oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
              const minDate = oneYearAgo.toISOString().split("T")[0];

              return (
                <input
                  key={key}
                  type="date"
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  min={minDate}
                  max={today}
                  placeholder="DOB"
                  className="w-full p-3 rounded bg-black text-red-500 border border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              );
            }

            if (key === "crimetype") {
              return (
                <select
                  key={key}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="w-full p-3 rounded bg-black text-red-500 border border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Select Crime Type</option>
                  <option value="Theft">Theft</option>
                  <option value="Murder">Murder</option>
                  <option value="Cybercrime">Cybercrime</option>
                </select>
              );
            }

            if (key === "height") {
              return (
                <div key={key} className="relative">
                  <input
                    type="text"
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    placeholder="Height (ft)"
                    className="w-full p-3 pr-10 rounded bg-black text-red-500 border border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <span className="absolute right-3 top-3 text-sm text-white">ft</span>
                </div>
              );
            }

            if (key === "weight") {
              return (
                <div key={key} className="relative">
                  <input
                    type="text"
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    placeholder="Weight"
                    className="w-full p-3 pr-10 rounded bg-black text-red-500 border border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <span className="absolute right-3 top-3 text-sm text-white">kg</span>
                </div>
              );
            }

            return (
              <input
                key={key}
                type="text"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                className="w-full p-3 rounded bg-black text-red-500 border border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            );
          })}
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
