import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const Username = sessionStorage.getItem('UserName')
  const negative = useNavigate()
  const Token = sessionStorage.getItem('Token')
  useEffect(()=>{
    if (!Username) {
      negative('/login')
    }
  });
  
  console.log("The UserName is ", Username);

  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState({ email: "", phone: "" });
  const [alert, setAlert] = useState({ type: '', message: '' });
  const [user, setUser] = useState({
    address: { street: "", city: "", state: "", postalCode: "", country: "" },
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    AdharNumber: "",
  });

  function heandlelogout(){
    sessionStorage.clear()
    window.location.reload()
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:8080/profile", {
          username: Username,
        },
          {
            headers: {
              "jwt-token": Token // Send JWT in header
          }
        }
    
      )

  setUser(response.data.response);

} catch (error) {
  console.error("Error fetching data:", error);
}
    };
fetchData();
  }, []);

const showAlert = (type, message) => {
  setAlert({ type, message });
  setTimeout(() => setAlert({ type: '', message: '' }), 5000);
};

const handleSave = async () => {
  if (
    !user.firstName || !user.lastName || !user.username || !user.email ||
    !user.phone || !user.AdharNumber || !user.address.street ||
    !user.address.city || !user.address.state || !user.address.postalCode ||
    !user.address.country
  ) {
    showAlert('error', 'All fields are mandatory!');
    return;
  }

  if (!validateEmail(user.email)) {
    showAlert('error', 'Invalid email format!');
    return;
  }

  if (!validatePhone(user.phone)) {
    showAlert('error', 'Phone number must be exactly 10 digits and non-negative!');
    return;
  }

  // Toggle editing mode before making an API request
  if (!isEditing) {
    setIsEditing(true);
    return;
  }

  try {
    const response = await axios.post("http://localhost:8080/updateProfile", {
      username: Username, ...user
    },
    {
      headers: {
        "jwt-token": Token // Send JWT in header
    }
  });

    if (response?.data?.message) {
      showAlert('success', response.data.message);
    } else {
      showAlert('success', "Profile updated successfully!");
    }

    setTimeout(() => setIsEditing(false), 1000);

  } catch (error) {
    console.error("Error updating data:", error);
    showAlert('error', 'Failed to update profile. Please try again later.');
  }
};
const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

const validatePhone = (phone) => {
  return /^\d{10}$/.test(phone) && !phone.startsWith("-");
};

const handleChange = (e) => {
  const { name, value } = e.target;

  // Validate Email
  if (name === "email") {
    if (!validateEmail(value)) {
      setError((prev) => ({ ...prev, email: "Invalid email format" }));
    } else {
      setError((prev) => ({ ...prev, email: "" }));
    }
  }

  // Validate Phone Number
  if (name === "phone") {
    if (!validatePhone(value)) {
      setError((prev) => ({ ...prev, phone: "Phone Enter a Vaild Phone No ..." }));
    } else {
      setError((prev) => ({ ...prev, phone: "" }));
    }
  }

  setUser((prevUser) => {
    if (name.includes("address.")) {
      const addressKey = name.split(".")[1];
      return {
        ...prevUser,
        address: { ...prevUser.address, [addressKey]: value },
      };
    }
    return { ...prevUser, [name]: value };
  });
};

return (
  <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-900 pt-[100px]" >
    <div className="w-2/3 bg-white shadow-lg rounded-2xl p-6 border border-gray-300">
      <div className="flex flex-col items-center">
        <div className="w-32 h-32 flex items-center justify-center rounded-full bg-red-500 text-white text-4xl font-bold border-4 border-red-700">
          {(user?.firstName)?.charAt(0)}
        </div>

        {isEditing ? (
          <>
            <label className="mt-4 text-gray-700">First Name</label>
            <input
              className="text-xl font-semibold mt-1 border p-1 rounded bg-gray-200 text-gray-900"
              type="text"
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
            />
            <label className="mt-4 text-gray-700">Last Name</label>
            <input
              className="text-xl font-semibold mt-1 border p-1 rounded bg-gray-200 text-gray-900"
              type="text"
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
            />
          </>
        ) : (
          <h2 className="text-2xl font-semibold mt-4">
            {user.firstName} {user.lastName}
          </h2>
        )}

        <div className="mt-4 w-full">
          {isEditing ? (
            <>
              <label className="mt-2 text-gray-700">Gmail</label>
              <input
                className="mt-1 w-full p-2 border rounded bg-gray-200 text-gray-900"
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
              {error.email && <p className="text-red-500 text-sm">{error.email}</p>}

              <label className="mt-2 text-gray-700">Phone</label>
              <input
                className="mt-1 w-full p-2 border rounded bg-gray-200 text-gray-900"
                type="number"
                name="phone"
                value={user.phone}
                onChange={handleChange}
              />
              {error.phone && <p className="text-red-500 text-sm">{error.phone}</p>}

              <label className="mt-2 text-gray-700">Street</label>
              <input
                className="mt-1 w-full p-2 border rounded bg-gray-200 text-gray-900"
                type="text"
                name="address.street"
                value={user.address.street}
                onChange={handleChange}
              />
              <label className="mt-2 text-gray-700">City</label>
              <input
                className="mt-1 w-full p-2 border rounded bg-gray-200 text-gray-900"
                type="text"
                name="address.city"
                value={user.address.city}
                onChange={handleChange}
              />
              <label className="mt-2 text-gray-700">State</label>
              <input
                className="mt-1 w-full p-2 border rounded bg-gray-200 text-gray-900"
                type="text"
                name="address.state"
                value={user.address.state}
                onChange={handleChange}
              />
              <label className="mt-2 text-gray-700">Postal Code</label>
              <input
                className="mt-1 w-full p-2 border rounded bg-gray-200 text-gray-900"
                type="text"
                name="address.postalCode"
                value={user.address.postalCode}
                onChange={handleChange}
              />
              <label className="mt-2 text-gray-700">Country</label>
              <input
                className="mt-1 w-full p-2 border rounded bg-gray-200 text-gray-900"
                type="text"
                name="address.country"
                value={user.address.country}
                onChange={handleChange}
              />
            </>
          ) : (
            <>
              <p className="mt-2 text-gray-700">UserName: {user.username}</p>
              <p className="mt-2 text-gray-700">Email: {user.email}</p>
              <p className="mt-2">Phone: {user.phone}</p>
              <p className="mt-2">Aadhar Number: {user.AdharNumber}</p>
              <p className="mt-2">
                Address: {user.address.street}, {user.address.city}, {user.address.state}, {user.address.postalCode}, {user.address.country}
              </p>
            </>
          )}
        </div>

        <div className="mt-6 w-full flex justify-around">
          <button
            type="submit"
            className={`px-4 py-2 rounded-xl ${error.email || error.phone ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600 text-white"
              }`}
            disabled={error.email || error.phone}
            onClick={handleSave}
          >
            {isEditing ? "Save" : "Edit Profile"}
          </button>
          <button className="px-4 py-2 bg-gray-700 text-white rounded-xl hover:bg-gray-800" onClick={heandlelogout}>
            Logout
          </button>
        </div>
      </div>
    </div>

    {alert?.message && (
      <div className={`absolute top-2 right-2 max-w-xs z-50 p-4 rounded ${alert?.type === 'success' ? 'bg-green-500' : 'bg-red-600'}`}>
        <p className="text-white">{alert.message}</p>
      </div>
    )}
  </div>
);
};

export default Profile;
