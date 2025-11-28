// src/components/MentorRegistrationPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Added Link import
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
            setErrorMessage(''); // Clear error when file is selected
        }
    };

    const nextStep = () => {
        // Validation for Step 1
        if (step === 1) {
            if (formData.password !== formData.confirmPassword) {
                setErrorMessage("Passwords do not match");
                return;
            }
            if (!formData.name || !formData.email || !formData.password) {
                setErrorMessage("Please fill in all fields");
                return;
            }
        }
        // Validation for Step 2
        if (step === 2) {
            if (!formData.fullName || !formData.phoneNumber || !formData.areaInterested || !formData.experience) {
                setErrorMessage("Please fill in all fields");
                return;
            }
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
        
        // --- MANUAL VALIDATION FIX ---
        // We removed 'required' from the HTML inputs, so we check here
        if (!files.idCard) {
            setErrorMessage("Please upload your ID Card.");
            return;
        }
        if (!files.resume) {
            setErrorMessage("Please upload your Resume.");
            return;
        }
        // -----------------------------

        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            formDataToSend.append(key, value);
        });

        formDataToSend.append('idCard', files.idCard);
        formDataToSend.append('resume', files.resume);

        try {
            // Ensure this URL matches your Vercel/Render setup
            // Use the environment variable if available, otherwise fallback
            const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
            
            const response = await fetch(`${API_URL}/api/mentor/register`, {
                method: 'POST',
                body: formDataToSend,
            });

            const result = await response.json();
            if (response.ok) {
                // Navigate to login after successful registration
                alert("Registration Successful! Please login.");
                navigate('/mentor/login');
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
                        
                        {/* FIX: Removed 'required' attribute from file inputs to prevent focus error */}
                        <div className="file-upload">
                            <label className="file-upload-label">
                                <FaFileUpload className="icon" /> Upload ID Card
                                <input
                                    type="file"
                                    name="idCard"
                                    onChange={handleFileChange}
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    // required removed here
                                />
                            </label>
                            {files.idCard ? 
                                <div className="file-name" style={{color: 'green'}}>{files.idCard.name}</div> :
                                <div className="file-name text-muted">No file chosen</div>
                            }
                        </div>

                        <div className="file-upload">
                            <label className="file-upload-label">
                                <FaFileUpload className="icon" /> Upload Resume
                                <input
                                    type="file"
                                    name="resume"
                                    onChange={handleFileChange}
                                    accept=".pdf,.doc,.docx"
                                    // required removed here
                                />
                            </label>
                            {files.resume ? 
                                <div className="file-name" style={{color: 'green'}}>{files.resume.name}</div> :
                                <div className="file-name text-muted">No file chosen</div>
                            }
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
                    {step === 1 && renderStep()}
                    <div className="form-actions">
                        <button type="button" className="btn btn-outline" disabled onClick={prevStep} style={{opacity: 0.5, cursor: 'not-allowed'}}>
                            Back
                        </button>
                        <button type="button" className="btn btn-primary" onClick={nextStep}>
                            Next
                        </button>
                    </div>
                </div>

                <div className={`form-step ${step === 2 ? 'active' : ''}`}>
                    {step === 2 && renderStep()}
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
                    {step === 3 && renderStep()}
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
                    <p>Already have an account? <Link to="/mentor/login">Sign in</Link></p>
                </div>
            </form>
        </div>
    );
};

export default MentorRegistrationPage;