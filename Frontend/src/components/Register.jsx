import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './Register.css';
import myphoto from '../assets/lock.png';
import { memo } from 'react';
import axios from 'axios';

const Register = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const [alert, setAlert] = useState({ type: '', message: '' });
    const [countdown, setCountdown] = useState(5);
    const [isOtpSend, setIsOtpSend] = useState(false);
    const [otp, Setotp] = useState('')
    const [generatedOtp, setGeneratedOtp] = useState('');
    const [emailTemplate, setEmailTemplate] = useState({ text: '', subject: '' });
    const [regbtn, setregbtn] = useState(false)
    const [formdata, setformData] = useState({});
    const generateOtp = () => Math.floor(1000 + Math.random() * 9000);

    // Display alert messages
    const showAlert = (type, message) => {
        setAlert({ type, message });
        setTimeout(() => setAlert({ type: '', message: '' }), 5000);
    };

    // Send OTP to email
    const handleOtpSend = async (email,name) => {
        const otp = generateOtp();

        setGeneratedOtp(otp);

        const emailContent = `
Hi ${name},

Thank you for registering with CMS.

Your One-Time Password (OTP) for completing your registration is:
${otp}

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
            console.log(error);

            showAlert('error', 'Failed to send OTP. Try again later.');
        }
    };



    const reSendOtp= async()=>{
        await handleOtpSend(formdata.email,formdata.firstName);
    }
    // Handle form submission
    const onSubmit = async (data) => {
        if (!isOtpSend) {
            setformData(data); // Save form data temporarily
            await handleOtpSend(data.email,data.firstName);
        } else if (otp == generatedOtp) {
            try {
                await axios.post('http://localhost:8080/registerValidation', { ...data, role: 'user' });
            }
            catch (error) {
                showAlert('error', error?.response?.data?.message);
                console.log(error);

            }
            try {
                await axios.post('http://localhost:8080/register', { ...data, role: 'user' });
                showAlert('success', 'Registration successful!');
            }
            catch (error) {
                showAlert('error', error?.response?.data?.message);
                console.log(error);

            }
        }


        else {
            showAlert('error', 'Invalid OTP. Please try again.');
        }
    };

    useEffect(() => {
        if (alert.message) {
            const timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev === 1) {
                        setAlert({ type: '', message: '' });
                        clearInterval(timer);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [alert]);
    return (
        <>
            <div className="main">
                <div className="container">
                    <div className="left-side">
                        <h2>Register</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* First row: First Name and Last Name */}
                            <div className="form-row">
                                <div className="input-container">
                                    <label>First Name:</label>
                                    <input type="text" {...register('firstName', { required: 'First name is required' })} />
                                    {errors.firstName && <p>{errors.firstName.message}</p>}
                                </div>
                                <div className="input-container">
                                    <label>Last Name:</label>
                                    <input type="text" {...register('lastName', { required: 'Last name is required' })} />
                                    {errors.lastName && <p>{errors.lastName.message}</p>}
                                </div>
                            </div>

                            {/* Second row: Username and Email */}
                            <div className="form-row">
                                <div className="input-container">
                                    <label>Username:</label>
                                    <input type="text" {...register('username', { required: 'Username is required' })} />
                                    {errors.username && <p>{errors.username.message}</p>}
                                </div>
                                <div className="input-container">
                                    <label>Email:</label>
                                    <input type="email" {...register('email', { required: 'Email is required' })} />
                                    {errors.email && <p>{errors.email.message}</p>}
                                </div>
                            </div>

                            {/* Third row: Phone and Adhar Number */}
                            <div className="form-row">
                                <div className="input-container">
                                    <label>Phone:</label>
                                    <input type="text" {...register('phone', { required: 'Phone number is required' })} />
                                    {errors.phone && <p>{errors.phone.message}</p>}
                                </div>
                                <div className="input-container">
                                    <label>Adhar Number:</label>
                                    <input type="text" {...register('AdharNumber', { required: 'Adhar number is required' })} />
                                    {errors.AdharNumber && <p>{errors.AdharNumber.message}</p>}
                                </div>
                            </div>

                            {/* Fourth row: Street Address and City */}
                            <div className="form-row">
                                <div className="input-container">
                                    <label>Street Address:</label>
                                    <input type="text" {...register('address.street', { required: 'Street address is required' })} />
                                    {errors.address?.street && <p>{errors.address?.street.message}</p>}
                                </div>
                                <div className="input-container">
                                    <label>City:</label>
                                    <input type="text" {...register('address.city', { required: 'City is required' })} />
                                    {errors.address?.city && <p>{errors.address?.city.message}</p>}
                                </div>
                            </div>

                            {/* Fifth row: State and Postal Code */}
                            <div className="form-row">
                                <div className="input-container">
                                    <label>State:</label>
                                    <input type="text" {...register('address.state', { required: 'State is required' })} />
                                    {errors.address?.state && <p>{errors.address?.state.message}</p>}
                                </div>
                                <div className="input-container">
                                    <label>Postal Code:</label>
                                    <input type="text" {...register('address.postalCode', { required: 'Postal code is required' })} />
                                    {errors.address?.postalCode && <p>{errors.address?.postalCode.message}</p>}
                                </div>
                            </div>

                            {/* Sixth row: Country and Password */}
                            <div className="form-row">
                                <div className="input-container">
                                    <label>Country:</label>
                                    <input type="text" {...register('address.country', { required: 'Country is required' })} />
                                    {errors.address?.country && <p>{errors.address?.country.message}</p>}
                                </div>
                                <div className="input-container">
                                    <label>Password:</label>
                                    <input type="password" {...register('passwordHash', { required: 'Password is required' })} />
                                    {errors.password && <p>{errors.password.message}</p>}
                                </div>
                            </div>

                            {/* Seventh row: Confirm Password and Gender */}
                            <div className="form-row">
                                <div className="input-container">
                                    <label>Confirm Password:</label>
                                    <input type="password" {...register('confirmPassword', {
                                        required: 'Confirm password is required',
                                         validate: (value) =>
                                            value === watch('passwordHash') || 'Passwords do not match'
                                    })} />
                                    {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
                                </div>
                                <div className="input-container">
                                    <label>Gender:</label>
                                    <select {...register('gender')}>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>
                            {isOtpSend && <div>
                                <label htmlFor="otp">Enter Your Otp :   </label>
                                <input id='otp' value={otp} type='text' onChange={(e) => { Setotp(e.target.value) }} />
                                 <a onClick={reSendOtp} className="text-link">  Resend otp ?</a>
                            </div>
                            }




                            {/* Submit Button */}
                            <div>
                                <button type="submit" onClick={onsubmit}>Submit</button>
                            </div>
                        </form>
                    </div>
                    <div className="right-side">
                        <h1> <i>Welcome To Crime Management System </i></h1>
                        <img src={myphoto} alt="background" height={300} />
                        <h3><i>"Every voice matters, every action counts    Register today and be a part of something greater "</i></h3>
                        <div className='Additional-content'>


                            <div>
                                <h4>Why Register?</h4>
                                <ul>
                                    <li>Help us make your community safer.</li>
                                    <li>Report crimes, track cases, and stay informed.</li>
                                    <li>Access useful resources and crime prevention tips.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {alert?.message && (
                    <div className={alert?.type === 'success' ? 'alert-container-success' : 'alert-container'} >
                        {alert.message}
                    </div>
                )}
            </div>

        </>

    );
};

export default memo(Register);
