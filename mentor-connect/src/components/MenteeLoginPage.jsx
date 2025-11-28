// src/components/MenteeLoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    FaUser, 
    FaEnvelope, 
    FaLock, 
    FaCalendarAlt, 
    FaVenusMars, 
    FaGraduationCap, 
    FaIdBadge, 
    FaBuilding 
} from 'react-icons/fa';
import '../styles/MenteeLogin.css';

const MenteeLoginPage = () => {
  const [isRegistered, setIsRegistered] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    dateOfBirth: '',
    gender: '',
    highestQualification: '',
    currentStatus: '',
    schoolOrCompany: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleMode = () => {
    setIsRegistered(!isRegistered);
    setError(''); // Clear errors when switching
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/mentee/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token); // Consistent with Mentor Dashboard
        if(data.mentee) localStorage.setItem('menteeData', JSON.stringify(data.mentee));
        navigate('/mentee/dashboard');
      } else {
        setError(data.message || 'Login failed.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please check your connection.');
    }
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/mentee/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registration successful! Please login.');
        setIsRegistered(true);
      } else {
        setError(data.message || 'Registration failed.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="mentee-login-container">
      {/* Animated Background Shapes */}
      <div className="background-shapes">
          <div className="shape shape1"></div>
          <div className="shape shape2"></div>
          <div className="shape shape3"></div>
          <div className="shape shape4"></div>
          <div className="shape shape5"></div>
      </div>

      <div className="mentee-login-form">
        <h2>Mentee {isRegistered ? 'Login' : 'Sign Up'}</h2>
        
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={isRegistered ? handleLogin : handleRegistration}>
          
          {/* Registration Fields */}
          {!isRegistered && (
            <>
                <div className="input-group">
                    <FaUser className="input-icon" />
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" required />
                </div>
            </>
          )}

          {/* Common Fields */}
          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" required />
          </div>

          {/* More Registration Fields */}
          {!isRegistered && (
            <>
                <div className="input-group">
                    <FaCalendarAlt className="input-icon" />
                    <input type="text" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} placeholder="Date of Birth" required />
                </div>

                <div className="input-group">
                    <FaVenusMars className="input-icon" />
                    <select name="gender" value={formData.gender} onChange={handleChange} required>
                        <option value="" disabled>Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="input-group">
                    <FaGraduationCap className="input-icon" />
                    <input type="text" name="highestQualification" value={formData.highestQualification} onChange={handleChange} placeholder="Highest Qualification" required />
                </div>

                <div className="input-group">
                    <FaIdBadge className="input-icon" />
                    <select name="currentStatus" value={formData.currentStatus} onChange={handleChange} required>
                        <option value="" disabled>Current Status</option>
                        <option value="Student">Student</option>
                        <option value="UG">Undergraduate</option>
                        <option value="PG">Postgraduate</option>
                        <option value="Employee">Employee</option>
                    </select>
                </div>

                <div className="input-group">
                    <FaBuilding className="input-icon" />
                    <input type="text" name="schoolOrCompany" value={formData.schoolOrCompany} onChange={handleChange} placeholder="School / College / Company" required />
                </div>
            </>
          )}

          <div className="input-group">
            <FaLock className="input-icon" />
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
          </div>

          <button type="submit" className="btn-primary">
            {isRegistered ? 'Login' : 'Register'}
          </button>
        </form>

        <div className="signup-link">
            {isRegistered ? (
                <p>Don't have an account? <span className="link-text" onClick={toggleMode}>Register here</span></p>
            ) : (
                <p>Already have an account? <span className="link-text" onClick={toggleMode}>Login here</span></p>
            )}
        </div>
      </div>
    </div>
  );
};

export default MenteeLoginPage;