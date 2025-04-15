import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";

import myphoto from '../../../assets/lock.png'

// import myphoto from '../assets/lock.png';
import { memo } from 'react';
import axios from 'axios';


const MissingOfficerReg = () => {
    const Username=sessionStorage.getItem('UserName')
    const nevigate=useNavigate()
         useEffect(()=>{
            if (!Username) {
              nevigate('/login')
            }
          },[Username]);
    const Nevigate=useNavigate()
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const [alert, setAlert] = useState({ type: '', message: '' });
    const [isOtpSend, setIsOtpSend] = useState(false);
    const [otp, setOtp] = useState('');
    const [generatedOtp, setGeneratedOtp] = useState('');
    const [formdata, setFormData] = useState({});
    

    const generateOtp = () => Math.floor(1000 + Math.random() * 9000);

    const showAlert = (type, message) => {
        setAlert({ type, message });
        setTimeout(() => setAlert({ type: '', message: '' }), 5000);
    };

    const handleOtpSend = async (email, name) => {
        const Gotp = generateOtp();
        setGeneratedOtp(Gotp);

        const emailContent = `
Hi ${name},

Thank you for registering with CMS.

Your One-Time Password (OTP) for completing your registration is:
${Gotp}

Please enter this OTP within the next 10 minutes to verify your account.

If you did not request this, please ignore this email.

Best regards,
The CMS Team
        `;





        try {
            await axios.post('http://localhost:8080/sendGmail', {
                gmail: email,
                text: emailContent,
                Subject: 'Verification OTP',
            });
            showAlert('success', 'OTP sent successfully! Check your email.');
            setIsOtpSend(true);
        } catch (error) {
            showAlert('error', 'Failed to send OTP. Try again later.');
        }
    };
    

    const reSendOtp = async () => {
        await handleOtpSend(formdata.email, formdata.firstName);
    };

const onSubmit = async (data) => {
    if (!isOtpSend) {
        setFormData(data);
        await handleOtpSend(data.email, data.firstName);
    } else if (otp == generatedOtp) {
        try {

            await axios.post('http://localhost:8080/register', { ...data, role: 'missingofficer' });
            showAlert('success', 'Registration successful!');


const Subject='Registration Successful - Welcome to Crime Management System'
const RegestrationMessage=`Dear ${data.firstName},

Your account has been successfully registered with the Crime Management System.

"A secure society is built on awareness and action."

If you need any assistance, feel free to contact us at [departmentofcrime4049@gmail.com].

Your safety, our priority.

Best regards,
Crime Management System Team`

            setTimeout( async()=>{
                await axios.post('http://localhost:8080/sendGmail', {
                    gmail: data.email,
                    text: RegestrationMessage,
                    Subject: Subject,
                });
                    Nevigate('/login')
            },4000)
        } catch (error) {
            showAlert('error', error?.response?.data?.message);
        }
    } else {
        console.log(otp);
        console.log(generateOtp);


        showAlert('error', 'Invalid OTP. Please try again.');
    }
}


return (
    <>
        <div className="flex justify-center bg-gray-900  ">
            <div className="flex mt-[50px] bg-gray-950 shadow-lg  h-fit">
                <div className="flex-1 w-[750px] p-8 text-white">  {/* Adjusted width here */}
                    <h2 className="text-[#ff0000]   text-4xl mb-6 text-center">Register</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                        {/* First row: First Name and Last Name */}
                        <div className="flex gap-5">
                            <div className="flex-1">
                                <label className=''>First Name:</label>
                                <input
                                    type="text"
                                    {...register('firstName', { required: 'First name is required' })}
                                    className="border border-gray-600 rounded bg-gray-700 text-white p-2 w-full"
                                />
                                {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
                            </div>
                            <div className="flex-1">
                                <label>Last Name:</label>
                                <input
                                    type="text"
                                    {...register('lastName', { required: 'Last name is required' })}
                                    className="border border-gray-600 rounded bg-gray-700 text-white p-2 w-full"
                                />
                                {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
                            </div>
                        </div>

                        {/* Second row: Username and Email */}
                        <div className="flex gap-5">
                            <div className="flex-1">
                                <label>Username:</label>
                                <input
                                    type="text"
                                    {...register('username', { required: 'Username is required' })}
                                    className="border border-gray-600 rounded bg-gray-700 text-white p-2 w-full"
                                />
                                {errors.username && <p className="text-red-500">{errors.username.message}</p>}
                            </div>
                            <div className="flex-1">
                                <label>Email:</label>
                                <input
                                    type="email"
                                    {...register('email', { required: 'Email is required' })}
                                    className="border border-gray-600 rounded bg-gray-700 text-white p-2 w-full"
                                />
                                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                            </div>
                        </div>

                        {/* Third row: Phone and Adhar Number */}
                        <div className="flex gap-5">
                            <div className="flex-1">
                                <label>Phone:</label>
                                <input
                                    type="text"
                                    {...register('phone', { required: 'Phone number is required' })}
                                    className="border border-gray-600 rounded bg-gray-700 text-white p-2 w-full"
                                />
                                {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
                            </div>
                            <div className="flex-1">
                                <label>Adhar Number:</label>
                                <input
                                    type="text"
                                    {...register('AdharNumber', { required: 'Adhar number is required' })}
                                    className="border border-gray-600 rounded bg-gray-700 text-white p-2 w-full"
                                />
                                {errors.AdharNumber && <p className="text-[#ff0000]">{errors.AdharNumber.message}</p>}
                            </div>
                        </div>

                        {/* Fourth row: Street Address and City */}
                        <div className="flex gap-5">
                            <div className="flex-1">
                                <label>Street Address:</label>
                                <input
                                    type="text"
                                    {...register('address.street', { required: 'Street address is required' })}
                                    className="border border-gray-600 rounded bg-gray-700 text-white p-2 w-full"
                                />
                                {errors.address?.street && <p className="text-red-500">{errors.address?.street.message}</p>}
                            </div>
                            <div className="flex-1">
                                <label>City:</label>
                                <input
                                    type="text"
                                    {...register('address.city', { required: 'City is required' })}
                                    className="border border-gray-600 rounded bg-gray-700 text-white p-2 w-full"
                                />
                                {errors.address?.city && <p className="text-red-500">{errors.address?.city.message}</p>}
                            </div>
                        </div>

                        {/* Fifth row: State and Postal Code */}
                        <div className="flex gap-5">
                            <div className="flex-1">
                                <label>State:</label>
                                <input
                                    type="text"
                                    {...register('address.state', { required: 'State is required' })}
                                    className="border border-gray-600 rounded bg-gray-700 text-white p-2 w-full"
                                />
                                {errors.address?.state && <p className="text-red-500">{errors.address?.state.message}</p>}
                            </div>
                            <div className="flex-1">
                                <label>Postal Code:</label>
                                <input
                                    type="text"
                                    {...register('address.postalCode', { required: 'Postal code is required' })}
                                    className="border border-gray-600 rounded bg-gray-700 text-white p-2 w-full"
                                />
                                {errors.address?.postalCode && <p className="text-red-500">{errors.address?.postalCode.message}</p>}
                            </div>
                        </div>

                        {/* Sixth row: Country and Password */}
                        <div className="flex gap-5">
                            <div className="flex-1">
                                <label>Country:</label>
                                <input
                                    type="text"
                                    {...register('address.country', { required: 'Country is required' })}
                                    className="border border-gray-600 rounded bg-gray-700 text-white p-2 w-full"
                                />
                                {errors.address?.country && <p className="text-red-500">{errors.address?.country.message}</p>}
                            </div>
                            <div className="flex-1">
                                <label>Password:</label>
                                <input
                                    type="password"
                                    {...register('passwordHash', { required: 'Password is required' })}
                                    className="border border-gray-600 rounded bg-gray-700 text-white p-2 w-full"
                                />
                                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                            </div>
                        </div>

                        {/* Seventh row: Confirm Password and Gender */}
                        <div className="flex gap-5">
                            <div className="flex-1">
                                <label>Confirm Password:</label>
                                <input
                                    type="password"
                                    {...register('confirmPassword', {
                                        required: 'Confirm password is required',
                                        validate: (value) =>
                                            value === watch('passwordHash') || 'Passwords do not match'
                                    })}
                                    className="border border-gray-600 rounded bg-gray-700 text-white p-2 w-full"
                                />
                                {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
                            </div>
                            <div className="flex-1">
                                <label>Gender:</label>
                                <select {...register('gender')} className="border border-gray-600 rounded bg-gray-700 text-white p-2 w-full">
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>

                        {isOtpSend && (
                            <div className="flex flex-col">
                                <label htmlFor="otp">Enter Your OTP:</label>
                                <input
                                    id='otp'
                                    value={otp}
                                    type='text'
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="border border-gray-600 rounded bg-gray-700 text-white p-2 w-full"
                                />
                                <a onClick={reSendOtp} className="text-blue-500 hover:underline cursor-pointer mt-2">Resend OTP?</a>
                            </div>
                        )}

                        {/* Submit Button */}
                        <div>
                            <button type="submit" className="bg-[#ff0000] text-white p-2 rounded hover:bg-red-600 transition duration-200 ml-[40%]">Submit</button>
                        </div>
                    </form>
                </div>
                <div className="bg-gray-900 p-8 flex flex-col items-center justify-center">
                    <h1 className="text-[#ff0000] text-4xl mb-4"><i>Welcome To Crime Management System</i></h1>
                    <img src={myphoto} alt="background" className="h-72 mb-4" />
                    <h3 className="text-gray-300 text-lg mb-4"><i>"Every voice matters, every action counts. Register today and be a part of something greater."</i></h3>
                    <div className='text-gray-300'>

                    </div>
                </div>
            </div>

            {alert?.message && (
                <div className={`absolute top-2 right-2 max-w-xs z-50 p-4 rounded ${alert?.type === 'success' ? 'bg-green-500' : 'bg-red-600'}`}>
                    <p className="text-white">{alert.message}</p>
                </div>
            )}
        </div>
    </>
);
    };

export default memo(MissingOfficerReg);