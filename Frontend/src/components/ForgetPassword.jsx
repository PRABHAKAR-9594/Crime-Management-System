import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ForgetPassword() {
    const navigate = useNavigate();

    const [mobileNumber, setMobileNumber] = useState('');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [generatedOtp, setGeneratedOtp] = useState(null);
    const [otpGeneratedAt, setOtpGeneratedAt] = useState(null);
    const [newPassword, setNewPassword] = useState('');
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [resendTimer, setResendTimer] = useState(0);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // success | error

    useEffect(() => {
        let timer;
        if (resendTimer > 0 && !isOtpVerified) {
            timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [resendTimer, isOtpVerified]);

    const showMessage = (msg, type = 'success') => {
        setMessage(msg);
        setMessageType(type);
        setTimeout(() => {
            setMessage('');
            setMessageType('');
        }, 5000);
    };

    const generateOtp = () => Math.floor(1000 + Math.random() * 9000);

    const handleGenerateOtp = async () => {
        try {
            const response = await axios.post('https://crime-management-system-p889.onrender.com/verifyMobile', {
                phone: mobileNumber,
                email: email
            });

            if (response.data.success) {
                const otp = generateOtp();
                setGeneratedOtp(otp);
                setOtpGeneratedAt(Date.now());
                setIsOtpVerified(false);
                setResendTimer(30);

                const subject = "Crime Portal Password Reset OTP";
                const text = `This is your OTP: ${otp}.\nIt is valid for 10 minutes.\n\nIf not requested, ignore immediately.`;

                await axios.post('https://crime-management-system-p889.onrender.com/sendGmail', {
                    text: text,
                    gmail: email,
                    Subject: subject
                });

                showMessage("OTP has been sent to your email.");
            } else {
                showMessage("Details not found. Please check and try again.", "error");
            }
        } catch (error) {
            console.error("Error", error);
            showMessage("Email or mobile number not found.", "error");
        }
    };

    const handleVerifyOtp = () => {
        const now = Date.now();
        const expiry = otpGeneratedAt + 10 * 60 * 1000;

        if (!generatedOtp || !otpGeneratedAt) {
            showMessage("Please generate an OTP first.", "error");
            return;
        }

        if (now > expiry) {
            showMessage("OTP has expired. Please request a new one.", "error");
            return;
        }

        if (parseInt(otp) === generatedOtp) {
            setIsOtpVerified(true);
            showMessage("OTP verified successfully.");
        } else {
            showMessage("Incorrect OTP. Please try again.", "error");
        }
    };

    const handleResetPassword = async () => {
        try {
            const response = await axios.post('https://crime-management-system-p889.onrender.com/resetPassword', {
                phone: mobileNumber,
                email: email,
                newPassword: newPassword
            });

            if (response.data.success) {
                showMessage("Password has been reset. Redirecting to login...");
                setTimeout(() => navigate('/login'), 2000);
            } else {
                showMessage("Failed to reset password. Please try again.", "error");
            }
        } catch (error) {
            console.error("Reset Error", error);
            showMessage("Something went wrong while resetting password.", "error");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black text-red-600 font-mono z-50">
    <div className="w-full max-w-md p-8 bg-black border-2 border-red-600 rounded-none relative">
        <button
            onClick={() => navigate('/login')}
            className="absolute top-4 left-4 text-red-600 text-xl font-bold"
        >
            &larr;
        </button>

        <h2 className="text-2xl font-bold uppercase text-center mb-6 border-b border-red-600 pb-2">
            Reset Access
        </h2>

        {message && (
            <div className={`text-center p-2 mb-4 font-semibold uppercase tracking-wide 
                ${messageType === 'error' ? 'text-red-500' : 'text-green-500'}`}>
                {message}
            </div>
        )}

        {!generatedOtp ? (
            <form onSubmit={(e) => { e.preventDefault(); handleGenerateOtp(); }} className="space-y-4">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-2 bg-black border border-red-600 text-red-600 placeholder-red-600 focus:outline-none"
                />
                <input
                    type="text"
                    placeholder="Mobile Number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    required
                    className="w-full p-2 bg-black border border-red-600 text-red-600 placeholder-red-600 focus:outline-none"
                />
                <button
                    type="submit"
                    className="w-full py-2 bg-red-600 text-black font-bold uppercase tracking-wide"
                >
                    Send OTP
                </button>
            </form>
        ) : (
            <>
                <form onSubmit={(e) => { e.preventDefault(); handleVerifyOtp(); }} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => {
                            const val = e.target.value;
                            if (/^\d{0,4}$/.test(val)) {
                                setOtp(val);
                            }
                        }}
                        readOnly={isOtpVerified}
                        className={`w-full p-2 bg-black border border-red-600 text-red-600 placeholder-red-600 focus:outline-none ${
                            isOtpVerified ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    />
                    <button
                        type="submit"
                        disabled={isOtpVerified}
                        className={`w-full py-2 bg-red-600 text-black font-bold uppercase tracking-wide ${
                            isOtpVerified ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        {isOtpVerified ? 'Verified' : 'Verify OTP'}
                    </button>
                </form>

                <div className="text-sm mt-3 text-center uppercase tracking-widest">
                    {resendTimer > 0 && !isOtpVerified ? (
                        <span className="text-red-500">Resend OTP in {resendTimer}s</span>
                    ) : (
                        !isOtpVerified && (
                            <button
                                onClick={handleGenerateOtp}
                                className="text-green-500 hover:underline"
                            >
                                Resend OTP
                            </button>
                        )
                    )}
                </div>

                {isOtpVerified && (
                    <form onSubmit={(e) => { e.preventDefault(); handleResetPassword(); }} className="space-y-4 mt-6">
                        <input
                            type="password"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            minLength={8}
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            title="At least 8 characters, including number, uppercase & lowercase."
                            className="w-full p-2 bg-black border border-red-600 text-red-600 placeholder-red-600 focus:outline-none"
                        />
                        <button
                            type="submit"
                            className="w-full py-2 bg-red-600 text-black font-bold uppercase tracking-wide"
                        >
                            Reset Password
                        </button>
                    </form>
                )}
            </>
        )}
    </div>
</div>

    );
}

export default ForgetPassword;
