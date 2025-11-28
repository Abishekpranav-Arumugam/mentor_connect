// src/components/MentorLoginPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import '../styles/MentorLogin.css';

const MentorLoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    const API_URL = process.env.REACT_APP_API_URL;
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/api/mentor/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                // --- FIX HERE: Use 'token' to match MentorDashboard ---
                localStorage.setItem('token', data.token); 
                localStorage.setItem('mentorData', JSON.stringify(data.mentor || {})); // Handle optional mentor data
                
                // Navigate to the dashboard
                navigate('/mentor/dashboard');
            } else {
                setError(data.message || 'Login failed. Please check your credentials.');
            }
        } catch (err) {
            setError('An error occurred. Please try again later.');
            console.error('Login error:', err);
        }
    };

    return (
        <div className="mentor-login-container">
            <div className="background-shapes">
                <div className="shape shape1"></div>
                <div className="shape shape2"></div>
                <div className="shape shape3"></div>
                <div className="shape shape4"></div>
                <div className="shape shape5"></div>
            </div>
            
            <form className="mentor-login-form" onSubmit={handleSubmit}>
                <h2>Mentor Login</h2>
                
                {error && <div className="error-message">{error}</div>}

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

                <div className="forgot-password">
                    <Link to="/mentor/forgot-password">Forgot Password?</Link>
                </div>

                <button type="submit" className="btn btn-primary">
                    Login
                </button>

                <div className="signup-link">
                    <p>Don't have an account? <Link to="/mentor/register">Sign up</Link></p>
                </div>
            </form>
        </div>
    );
};

export default MentorLoginPage;