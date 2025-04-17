import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CrimeReportForm = () => {
    //
const Username=sessionStorage.getItem('UserName')
const nevigate=useNavigate()
     useEffect(()=>{
        if (!Username) {
          nevigate('/login')
        }
      },[Username]);


    const Name=sessionStorage.getItem('Name')
    const Email=sessionStorage.getItem('Email')
    const [alert, setAlert] = useState({ type: '', message: '' });
    const showAlert = (type, message) => {
        setAlert({ type, message });
        setTimeout(() => setAlert({ type: '', message: '' }), 5000);
    };
    const [formData, setFormData] = useState({
        username: '',
        crimetype: '',
        description: '',
        incidentDate: '',
        incidentTime: '',
        incidentLocation: {
            address: '',
            city: '',
            state: '',
            pincode: ''
        },
        evidence: {
            imageFile: null,
            videoFile: null
        },
        suspectDetails: {
            name: '',
            description: ''
        },
        acknowledgeNumber: '',
        status: 'Open',
        assignedOfficer: {
            UserName: '',
            Name: '',
            contact: ''
        }
    });


    useEffect(() => {
        // Get username from sessionStorage and set it in formData
        const username = sessionStorage.getItem('UserName');
        if (username) {
            setFormData(prev => ({
                ...prev,
                username: username
            }));
        }
    }, []);

    // Handle Text Inputs
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => {
            const keys = name.split('.');
            if (keys.length === 1) {
                return { ...prev, [name]: value };
            } else {
                return {
                    ...prev,
                    [keys[0]]: {
                        ...prev[keys[0]],
                        [keys[1]]: value
                    }
                };
            }
        });
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

    // Determine if the file is an image or a video based on file type
    const isVideo = file.type.startsWith('video/');  // Check if it's a video
    const isImage = file.type.startsWith('image/');  // Check if it's an image

    if (!isImage && !isVideo) {
        alert('Please upload a valid image or video file');
        return;
    }

    // Prepare the form data to send to Cloudinary
    const formData = new FormData();
    formData.append('file', file); // Attach the file
    formData.append('upload_preset', import.meta.env.VITE_REACT_UPLOAD_PRESET); // Replace with your upload preset name
    formData.append('cloud_name', import.meta.env.VITE_REACT_CLOUD_NAME); // Replace with your Cloudinary Cloud Name
    console.log("inside ", formData);

    try {
        // Determine the appropriate Cloudinary endpoint
        const cloudinaryEndpoint = isVideo
            ? 'https://api.cloudinary.com/v1_1/deog4dkfc/video/upload'  // Video upload endpoint
            : 'https://api.cloudinary.com/v1_1/deog4dkfc/image/upload'; // Image upload endpoint

        console.log("inside ", formData);
        // Send the file to Cloudinary
        const response = await axios.post(cloudinaryEndpoint, formData);

        // Get the URL of the uploaded file (image or video)
        const filePath = response.data.secure_url;

        // Update the state with the file URL (string path)
        setFormData((prev) => {
            const [parent, child] = name.split('.');
            return {
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: filePath // Store the file URL, not the file object
                }
            };
        });
    } catch (error) {
        console.error('Error uploading file:', error);
    }
};

const generateAcknowledgementNumber = () => {
    const date = new Date();
    const prefix = 'CMS';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure 2-digit month
    const day = String(date.getDate()).padStart(2, '0'); // Ensure 2-digit day
    const hours = String(date.getHours()).padStart(2, '0'); // Ensure 2-digit hour
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Ensure 2-digit minute
    const seconds = String(date.getSeconds()).padStart(2, '0'); // Ensure 2-digit second

    const acknowledgementNumber = `${prefix}${year}${month}${day}${hours}${minutes}${seconds}`;
    return acknowledgementNumber;
};

    const handleSubmit = async (e) => {
        e.preventDefault();
        const ackNumber = generateAcknowledgementNumber();
        console.log(ackNumber);
    setFormData(prev => ({
        ...prev,
        acknowledgeNumber: ackNumber // Add the generated acknowledgement number
    }));
        console.log(formData);
        try {
            const Subject=`Crime Report Submission Successful – Acknowledgment No. ${ackNumber}`
            const Message=`
Dear ${Name},

We have successfully received your crime report. Your acknowledgment number is ${ackNumber}. Please keep this number for future reference.

Current Status: Your report is under initial review and is currently waiting for officer assignment. Our team is actively processing your case, and you will be notified once an officer is assigned.

You can also track the progress of your report anytime by visiting our website and checking the Status Section

We understand that this may be a difficult time for you, but please remember that you are not alone. We are with you, and our dedicated team is working to address your case with care and urgency.

If you have any urgent concerns or additional details to share, please do not hesitate to contact us at departmentofcrime4049@gmail.com or 100 .

Stay strong, and rest assured that we are here for you.

Best regards,
Crime Reporting System Team



`





            const response = await axios.post('http://localhost:8080/CrimeRegForm ', {...formData,
                acknowledgeNumber:ackNumber}, {
                headers: { 
                    'Content-Type': 'application/json', 
                    'jwt-token': sessionStorage.getItem("Token") // Add token here
                }
        
            });

            await axios.post('http://localhost:8080/sendGmail', {
                gmail:Email,
                text: Message,
                Subject: Subject,
              });
              showAlert('success', 'Crime Form Submitted Successful!');

            console.log('Success:', response.data);
        } catch (error) {
            showAlert('error', error?.response?.data?.message);
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-black text-white">
            <form onSubmit={handleSubmit} className="w-full max-w-4xl bg-gray-900 p-6 rounded shadow-md mt-10 mb-10">
                <h1 className="text-3xl font-bold mb-6 text-red-500 text-center">Crime Reporting Form</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block mb-2">
                        Username:
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            readOnly
                            className="mt-1 w-full border border-red-500 rounded p-2 bg-gray-800 text-white"
                            required
                        />
                    </label>

                    <label className="block">
    Crime Type:
    <select
        name="crimetype"
        value={formData.crimetype}
        onChange={handleChange}
        className="mt-1 w-full border border-red-500 rounded p-2 bg-gray-800 text-white"
        required
    >
        <option value="">Select a crime type</option>
<option value="Theft">Theft</option>
<option value="Assault">Assault</option>
<option value="Fraud">Fraud</option>
<option value="Homicide">Homicide</option>
<option value="Kidnapping">Kidnapping</option>
<option value="CyberCrime">Cyber Crime</option>
<option value="DrugTrafficking">Drug Trafficking</option>
<option value="Robbery">Robbery</option>
<option value="Vandalism">Vandalism</option>
<option value="HumanTrafficking">Human Trafficking</option>

      
        {/* Add more crime types as needed */}
    </select>
</label>


                    <label className="block col-span-2">
                        Description:
                        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Describe the crime in detail" className="mt-1 w-full border border-red-500 rounded p-2 bg-gray-800 text-white" required />
                    </label>

                    <label className="block">
                        Incident Date:
                        <input type="date" name="incidentDate" value={formData.incidentDate} onChange={handleChange} className="mt-1 w-full border border-red-500 rounded p-2 bg-gray-800 text-white" required />
                    </label>

                    <label className="block">
                        Incident Time:
                        <input type="time" name="incidentTime" value={formData.incidentTime} onChange={handleChange} className="mt-1 w-full border border-red-500 rounded p-2 bg-gray-800 text-white" required />
                    </label>
                </div>

                <h2 className="text-lg font-semibold mt-4">Incident Location</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
    Address:
    <input 
        type="text"
        name="incidentLocation.address"
        value={formData.incidentLocation.address}
        onChange={(e) => {
            // Remove special characters
            let inputValue = e.target.value.replace(/[^a-zA-Z0-9 ]/g, '');

            // Update form data with the cleaned value
            handleChange({ target: { name: e.target.name, value: inputValue } });
        }}
        placeholder="Street, Area"
        className="mt-1 w-full border border-red-500 rounded p-2 bg-gray-800 text-white"
        required
    />
</label>


                    <label className="block">
    City:
    <input 
        type="text"
        name="incidentLocation.city"
        value={formData.incidentLocation.city}
        onChange={(e) => {
            // Remove spaces and numbers, keep only alphabets
            let inputValue = e.target.value.replace(/[^a-zA-Z]/g, '').toLowerCase();

            // Capitalize first letter
            inputValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);

            // Update form data with the formatted value
            handleChange({ target: { name: e.target.name, value: inputValue } });
        }}
        placeholder="City name"
        className="mt-1 w-full border border-red-500 rounded p-2 bg-gray-800 text-white"
        required
    />
</label>

<label className="block">
    State:
    <input 
        type="text"
        name="incidentLocation.state"
        value={formData.incidentLocation.state}
        onChange={(e) => {
            // Remove spaces and numbers, keep only alphabets
            let inputValue = e.target.value.replace(/[^a-zA-Z]/g, '').toLowerCase();

            // Capitalize first letter
            inputValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);

            // Update form data with the formatted value
            handleChange({ target: { name: e.target.name, value: inputValue } });
        }}
        placeholder="State name"
        className="mt-1 w-full border border-red-500 rounded p-2 bg-gray-800 text-white"
        required
    />
</label>

                    <label className="block">
    Pincode:
    <input
        type="text"
        name="incidentLocation.pincode"
        value={formData.incidentLocation.pincode}
        onChange={handleChange}
        onInput={(e) => {
          // Allow only numeric input
          e.target.value = e.target.value.replace(/[^0-9]/g, '');

          // Limit to 6 digits
          if (e.target.value.length > 6) {
            e.target.value = e.target.value.slice(0, 6);
          }

          // Update form data
          handleChange(e);
        }}
        pattern="\d{6}"
        title="Pincode must be a 6 digit number"
        maxLength={6}
        placeholder="6-digit Pincode"
        className="mt-1 w-full border border-red-500 rounded p-2 bg-gray-800 text-white"
        required
    />
</label>

                </div>

                <h2 className="text-lg font-semibold mt-4">Evidence</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
            Image File (Max size: 5MB):
            <input 
                type="file" 
                name="evidence.imageFile" 
                accept="image/*" 
                onChange={handleFileChange} 
                className="mt-1 w-full border border-red-500 rounded p-2 bg-gray-800 text-white" 
            />
        </label>

        <label className="block">
            Video File (Max size: 5MB):
            <input 
                type="file" 
                name="evidence.videoFile" 
                accept="video/*" 
                onChange={handleFileChange} 
                className="mt-1 w-full border border-red-500 rounded p-2 bg-gray-800 text-white" 
            />
        </label>
                </div>

                <h2 className="text-lg font-semibold mt-4">Suspect Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
    Name:
    <input 
        type="text"
        name="suspectDetails.name"
        value={formData.suspectDetails.name}
        onChange={(e) => {
            let inputValue = e.target.value;

            // Remove numbers and special characters except for spaces
            inputValue = inputValue.replace(/[^a-zA-Z ]/g, '');

            // Capitalize the first letter of each word and make the rest lowercase
            inputValue = inputValue
                .split(' ') // Split by space
                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
                .join(' '); // Join them back with a single space

            // Update form data with the cleaned and formatted value
            handleChange({ target: { name: e.target.name, value: inputValue } });
        }}
        placeholder="Suspect's name"
        className="mt-1 w-full border border-red-500 rounded p-2 bg-gray-800 text-white"
    />
</label>


                    <label className="block col-span-2">
                        Description:
                        <textarea name="suspectDetails.description" value={formData.suspectDetails.description} onChange={handleChange} placeholder="Describe suspect appearance, behavior, etc." className="mt-1 w-full border border-red-500 rounded p-2 bg-gray-800 text-white" />
                    </label>
                </div>

                <button type="submit" className="mt-4 bg-red-500 text-white rounded p-2 hover:bg-red-600">Submit</button>
                {alert?.message && (
                <div className={`absolute top-2 right-2 max-w-xs z-50 p-4 rounded ${alert?.type === 'success' ? 'bg-green-500' : 'bg-red-600'}`}>
                    <p className="text-white">{alert.message}</p>
                </div>
            )}
            </form>
           
        </div>
        
    );
};

export default CrimeReportForm;
