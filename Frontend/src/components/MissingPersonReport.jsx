import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const MissingPersonReport = () => {
    const Username=sessionStorage.getItem('UserName')
    const Name=sessionStorage.getItem('Name')
    const Email=sessionStorage.getItem('Email')
const nevigate=useNavigate()
     useEffect(()=>{
        if (!Username) {
          nevigate('/login')
        }
      },[Username]);
    const [formData, setFormData] = useState({
        username: Username,
        missingPerson: {
            fullName: "",
            age: "",
            photo: "",
            contact: "",
        },
        lastSeenDetails: {
            location: "",
            pincode: "",
            date: "",
        },
        status: 'Open',
        assignedOfficer: {
            UserName: '',
            Name: '',
            contact: ''
        }
    });
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [submissionError, setSubmissionError] = useState(false);
    const [errors, setErrors] = useState([]);
    const [currentErrorIndex, setCurrentErrorIndex] = useState(0);
    const [showError, setShowError] = useState(false);
    const [acknowledgment, setAcknowledgment] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleNestedChange = (e, section) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [name]: value,
            },
        }));
    };

    const generateAcknowledgmentNumber = () => {
        const now = new Date();
        const formattedDate = now
            .toISOString()
            .replace(/[-T:.Z]/g, "")
            .slice(0, 14);
        return `CMS${formattedDate}`;
    };

    const validateForm = () => {
        let newErrors = [];
        const today = new Date().toISOString().split("T")[0];

        // Username validation
        if (!formData.username || formData.username.length < 3 || !/^[a-zA-Z0-9_]+$/.test(formData.username)) {
            newErrors.push("Username must be at least 3 characters long and contain only letters, numbers, or underscores.");
        }

        // Full Name validation
        if (!formData.missingPerson.fullName || formData.missingPerson.fullName.length < 3 || !/^[a-zA-Z\s]+$/.test(formData.missingPerson.fullName)) {
            newErrors.push("Full name must be at least 3 characters long and contain only letters and spaces.");
        }

        // Age validation
        if (!formData.missingPerson.age || isNaN(formData.missingPerson.age) || formData.missingPerson.age <= 0 || formData.missingPerson.age > 120) {
            newErrors.push("Age must be a number between 1 and 120.");
        }

        // Photo validation
        // if (!formData.missingPerson.photo) {
        //   newErrors.push("Please upload a valid image file.");
        // }

        // Contact Number validation
        if (!formData.missingPerson.contact || !/^[0-9]{10}$/.test(formData.missingPerson.contact)) {
            newErrors.push("Enter a valid 10-digit contact number.");
        }

        // Last Seen Location validation
        if (!formData.lastSeenDetails.location) {
            newErrors.push("Location is required.");
        }

        // Pincode validation
        if (!formData.lastSeenDetails.pincode || !/^[0-9]{6}$/.test(formData.lastSeenDetails.pincode)) {
            newErrors.push("Pincode must be a 6-digit number.");
        }

        // Date validation
        if (!formData.lastSeenDetails.date || formData.lastSeenDetails.date > today) {
            newErrors.push("Date cannot be in the future.");
        }

        if (newErrors.length > 0) {
            setErrors(newErrors);
            setCurrentErrorIndex(0);
            setShowError(true);
            return false;
        }
        return true;
    };

    useEffect(() => {
        if (showError && errors.length > 0) {
            const timer = setTimeout(() => {
                if (currentErrorIndex < errors.length - 1) {
                    setCurrentErrorIndex((prev) => prev + 1);
                } else {
                    setShowError(false);
                    setErrors([]);
                }
            }, 5000); // Show each error for 5 seconds

            return () => clearTimeout(timer);
        }
    }, [showError, currentErrorIndex, errors]);





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
          alert('Please upload a valid image file');
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
          console.log(filePath)
    
          // Update the state with the file URL (string path)
          setFormData((prev) => ({
            ...prev,
            missingPerson: {
                ...prev.missingPerson,
                photo: filePath, // Correctly updating the photo inside missingPerson
            },
        }));
      } catch (error) {
          console.error('Error uploading file:', error);
      }
      };





    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            const acknowledgmentNumber = generateAcknowledgmentNumber();
            setAcknowledgment(acknowledgmentNumber);
            try {
                const Subject=`Subject: Missing Report Acknowledgment – Stay Strong. ${acknowledgmentNumber}`
                const Message=`
    Dear ${Name},

We have successfully received your missing person report. Your acknowledgment number is ${acknowledgmentNumber}. Please keep this number safe for future reference.

Current Status: Your report is under initial review and is currently waiting for officer assignment. Our dedicated team is actively working on your case, and you will be notified as soon as an officer is assigned.

You can track the progress of your report anytime by visiting our website and checking the Status Section.

We understand that this is a challenging time, but please remember: Hope is stronger than fear. Our team is committed to assisting you, and we are doing everything possible to help reunite you with your loved one.

If you have any urgent concerns or additional details to share, please do not hesitate to contact us at departmentofcrime4049@gmail.com or call 100.

Stay strong. You are not alone in this—we are here for you.

Best regards,
Crime Reporting System Team
    `





                const response = await axios.post('http://localhost:8080/regmissing', {
                    ...formData,
                    acknowledgeNumber: acknowledgmentNumber
                });

                await axios.post('http://localhost:8080/sendGmail', {
                    gmail:Email,
                    text: Message,
                    Subject: Subject,
                  });
                setSubmissionError(false)
                setFormSubmitted(true);
                setFormData({
                    username: Username,
                    missingPerson: {
                        fullName: "",
                        age: "",
                        photo: "",
                        contact: "",
                    },
                    lastSeenDetails: {
                        location: "",
                        pincode: "",
                        date: "",
                    },
                    status: 'Open',
                    assignedOfficer: {
                        UserName: '',
                        Name: '',
                        contact: ''
                    }
                })
            } catch (error) {
                console.log(error);
              setSubmissionError(true)
                setFormSubmitted(false); // Set to false if there's an error
            }
            console.log("Form Submitted", formData);
        } else {
            setShowError(true);
        }
    };

    return (
        <div className="bg-black text-red-500 min-h-screen flex items-center p-6 pt-[120px] pb-[100px]">
            <div className="w-full max-w-5xl bg-gray-900 p-8 rounded-lg shadow-lg border border-red-500 flex ml-[230px]">
                {/* Left Side: Form */}
                <div className="w-1/2 pr-6 border-r border-red-500">
                    <h2 className="text-3xl font-bold text-center mb-6">Report a Missing Person</h2>
                    <form onSubmit={handleSubmit} className="space-y-4 grid grid-cols-2 gap-6">

                        <input type="text" name="userame" placeholder="Your Username" value={formData.username} onChange={handleChange} className="p-4 mt-4 w-full h-[50px] bg-gray-800 text-white border border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600" required />

                        <input
  type="text"
  name="fullName"
  placeholder="Name"
  value={formData.missingPerson.fullName}
  onChange={(e) => {
    // Remove digits and only allow letters and spaces
    const lettersOnly = e.target.value.replace(/[^A-Za-z ]/g, '');

    // Capitalize first letter of each word
    const transformedValue = lettersOnly
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());

    handleNestedChange(
      { target: { name: 'fullName', value: transformedValue } },
      'missingPerson'
    );
  }}
  onBlur={() => {
    const value = formData.missingPerson.fullName;
    if (value.length < 3) {
      setError('Name must be at least 3 characters.');
    } else if (value.length > 20) {
      setError('Name must be less than or equal to 20 characters.');
    } else if (!/^[A-Za-z ]+$/.test(value)) {
      setError('Only letters and spaces allowed.');
    } else if (/\s{2,}/.test(value)) {
      setError('Only one space allowed between words.');
    } else {
      setError('');
    }
  }}
  className="p-3 w-full bg-gray-800 text-white border border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
  required
  minLength={3}
  maxLength={20}
/>




<input
  type="number"
  name="age"
  placeholder="Age"
  value={formData.missingPerson.age}
  onChange={(e) => handleNestedChange(e, "missingPerson")}
  className="p-3 w-full bg-gray-800 text-white border border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
  required
  min="1" // Minimum age must be at least 1
  max="100" // Maximum age allowed is 100
  step="1" // Only whole numbers
  title="Please enter a valid age between 1 and 100"
  onInput={(e) => {
    // Restrict input to a maximum of 3 digits
    const value = e.target.value;
    if (value.length > 3) {
      e.target.value = value.slice(0, 3); // Truncate to the first 3 digits
    }
    if (value.startsWith('-') || value > 100 || value < 1) {
      e.target.setCustomValidity('Please enter a valid age between 1 and 100');
    } else {
      e.target.setCustomValidity('');
    }
  }}
/>


                        <input type="file" accept="image/*"
                        name="evidence.imageFile" 
                        onChange={handleFileChange}
                        className="p-3 w-full bg-gray-800 text-white border border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600" required />


<div className="flex items-center">
  <span className="bg-gray-800 text-white p-3 rounded-l border border-red-500 select-none">+91</span>
  <input
    type="text"
    name="contact"
    placeholder="Contact Number"
    value={formData.missingPerson.contact}
    onChange={(e) => handleNestedChange(e, "missingPerson")}
    className="p-3 w-full bg-gray-800 text-white border border-red-500 rounded-r focus:outline-none focus:ring-2 focus:ring-red-600"
    required
    maxLength={10} // Ensure the user only enters 10 digits
    pattern="^[0-9]{10}$" // Validates the input as exactly 10 digits
    title="Phone number should contain exactly 10 digits"
    onInput={(e) => {
      let value = e.target.value.replace(/[^0-9]/g, ''); // Allow only numbers

      // Limit the number of digits to 10
      if (value.length > 10) {
        value = value.slice(0, 10);
      }

      // Update the input field value
      e.target.value = value;

      // Update the form data
      handleNestedChange(e, "missingPerson");
    }}
  />
</div>

<input
  type="text"
  name="location"
  placeholder="Last Seen Location"
  value={formData.lastSeenDetails.location}
  onChange={(e) => handleNestedChange(e, "lastSeenDetails")}
  className="p-3 w-full bg-gray-800 text-white border border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
  required
  minLength={5}
  maxLength={30}
  pattern=".{5,30}"
  title="Location must be between 5 and 30 characters"
/>


<input
  type="text"
  name="pincode"
  placeholder="Pincode"
  value={formData.lastSeenDetails.pincode}
  onChange={(e) => handleNestedChange(e, "lastSeenDetails")}
  className="p-3 w-full bg-gray-800 text-white border border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
  required
  maxLength={6}
  pattern="\d{6}"
  title="Pincode must be exactly 6 digits"
  onInput={(e) => {
    // Remove all non-numeric characters
    e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 6);
  }}
/>


<input
  type="date"
  name="date"
  value={formData.lastSeenDetails.date}
  onChange={(e) => handleNestedChange(e, "lastSeenDetails")}
  className="p-3 w-full bg-gray-800 text-white border border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
  required
  min={new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString().split('T')[0]}
  max={new Date().toISOString().split('T')[0]}
/>

                        <button type="submit" className="col-span-2 p-3 bg-red-600 text-white font-bold rounded-md hover:bg-red-700 transition">Report Missing Person</button>
                    </form>{formSubmitted &&
                    <div className="mt-6 text-center text-white text-lg font-bold">
                            ✅ Report Submitted Successfully! <br />
                            Acknowledgment Number: {acknowledgment}
                        </div>}
                     {submissionError && <p className="mt-4 text-red-500">❌ Something went wrong. Please try again.</p>}
 </div>

                {/* Right Side: Motivational Quote & Image */}
                <div className="w-1/2 flex flex-col justify-center items-center text-center p-6">
                    <p className="text-xl italic font-semibold text-white mb-4">“Every missing person is someone’s loved one. Let’s bring them home.”</p>
                    <img src="https://thumbs.dreamstime.com/b/3d-small-people-searching-27364925.jpg" alt="Searching for someone" className="w-72 h-72 object-cover border border-red-500 rounded-md" />
                </div>
            </div>
            {showError && (
                <div className="fixed top-4 right-4 bg-red-600 text-white p-4 rounded-md shadow-lg">
                    {errors[currentErrorIndex]}
                </div>
            )}
        </div>
    );
};

export default MissingPersonReport;