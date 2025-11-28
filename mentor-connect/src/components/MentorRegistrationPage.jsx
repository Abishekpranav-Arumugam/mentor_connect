// src/components/MentorRegistrationPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MentorRegistration.css';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaLinkedin, FaBriefcase, FaFileUpload, FaCalendarAlt } from 'react-icons/fa';
const MentorRegistrationPage = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        phoneNumber: '',
        areaInterested: '',
        experience: '',
        linkedin: '',
        calendlyUrl: '',
    });
    const [files, setFiles] = useState({
        idCard: null,
        resume: null,
    });
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const { name, files: fileList } = e.target;
        if (fileList && fileList[0]) {
            setFiles(prev => ({ ...prev, [name]: fileList[0] }));
        }
    };

    const nextStep = () => {
        if (step === 1 && formData.password !== formData.confirmPassword) {
            setErrorMessage("Passwords do not match");
            return;
        }
        setStep(step + 1);
        setErrorMessage('');
    };

    const prevStep = () => {
        setStep(step - 1);
        setErrorMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            formDataToSend.append(key, value);
        });

        if (files.idCard) formDataToSend.append('idCard', files.idCard);
        if (files.resume) formDataToSend.append('resume', files.resume);

        try {
            const response = await fetch('http://localhost:5000/api/mentor/register', {
                method: 'POST',
                body: formDataToSend,
            });

            const result = await response.json();
            if (response.ok) {
                localStorage.setItem('mentorData', JSON.stringify(result.data));
                navigate('/mentor/dashboard');
            } else {
                setErrorMessage(result.message || 'Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Registration error:', error);
            setErrorMessage('An error occurred during registration. Please try again.');
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <>
                        <div className="input-group">
                            <FaUser className="input-icon" />
                            <input
                                type="text"
                                name="name"
                                placeholder="Username"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <FaEnvelope className="input-icon" />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <FaLock className="input-icon" />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <FaLock className="input-icon" />
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </>
                );
            case 2:
                return (
                    <>
                        <div className="input-group">
                            <FaUser className="input-icon" />
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Full Name"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <FaPhone className="input-icon" />
                            <input
                                type="tel"
                                name="phoneNumber"
                                placeholder="Phone Number"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <FaBriefcase className="input-icon" />
                            <input
                                type="text"
                                name="areaInterested"
                                placeholder="Area of Expertise"
                                value={formData.areaInterested}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <FaBriefcase className="input-icon" />
                            <input
                                type="text"
                                name="experience"
                                placeholder="Years of Experience"
                                value={formData.experience}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </>
                );
            case 3:
                return (
                    <>
                        <div className="input-group">
                            <FaLinkedin className="input-icon" />
                            <input
                                type="url"
                                name="linkedin"
                                placeholder="LinkedIn Profile URL"
                                value={formData.linkedin}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <FaCalendarAlt className="input-icon" />
                            <input
                                type="url"
                                name="calendlyUrl"
                                placeholder="Calendly URL"
                                value={formData.calendlyUrl}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="file-upload">
                            <label className="file-upload-label">
                                <FaFileUpload className="icon" /> Upload ID Card
                                <input
                                    type="file"
                                    name="idCard"
                                    onChange={handleFileChange}
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    required
                                />
                            </label>
                            {files.idCard && <div className="file-name">{files.idCard.name}</div>}
                        </div>
                        <div className="file-upload">
                            <label className="file-upload-label">
                                <FaFileUpload className="icon" /> Upload Resume
                                <input
                                    type="file"
                                    name="resume"
                                    onChange={handleFileChange}
                                    accept=".pdf,.doc,.docx"
                                    required
                                />
                            </label>
                            {files.resume && <div className="file-name">{files.resume.name}</div>}
                        </div>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="mentor-registration-container">
            <div className="background-shapes">
                <div className="shape shape1"></div>
                <div className="shape shape2"></div>
                <div className="shape shape3"></div>
                <div className="shape shape4"></div>
                <div className="shape shape5"></div>
            </div>
            
            <form className="mentor-registration-form" onSubmit={handleSubmit}>
                <h2>Mentor Sign Up</h2>
                
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                
                <div className="progress-steps">
                    {[1, 2, 3].map((stepNum) => (
                        <div key={stepNum} className={`progress-step ${step >= stepNum ? 'active' : ''}`}>
                            <div className="step-number">{stepNum}</div>
                            <div className="step-label">
                                {stepNum === 1 ? 'Account' : stepNum === 2 ? 'Profile' : 'Documents'}
                            </div>
                        </div>
                    ))}
                </div>

                <div className={`form-step ${step === 1 ? 'active' : ''}`}>
                    {renderStep()}
                    <div className="form-actions">
                        <button type="button" className="btn btn-outline" disabled={step === 1} onClick={prevStep}>
                            Back
                        </button>
                        <button type="button" className="btn btn-primary" onClick={nextStep}>
                            Next
                        </button>
                    </div>
                </div>

                <div className={`form-step ${step === 2 ? 'active' : ''}`}>
                    {renderStep()}
                    <div className="form-actions">
                        <button type="button" className="btn btn-outline" onClick={prevStep}>
                            Back
                        </button>
                        <button type="button" className="btn btn-primary" onClick={nextStep}>
                            Next
                        </button>
                    </div>
                </div>

                <div className={`form-step ${step === 3 ? 'active' : ''}`}>
                    {renderStep()}
                    <div className="form-actions">
                        <button type="button" className="btn btn-outline" onClick={prevStep}>
                            Back
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </div>

                <div className="signup-link">
                    <p>Already have an account? <a href="/mentor/login">Sign in</a></p>
                </div>
            </form>
        </div>
    );
};

export default MentorRegistrationPage;