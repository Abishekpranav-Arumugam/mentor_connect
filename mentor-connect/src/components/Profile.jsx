import React, { useEffect, useState } from 'react';
import { FaUserGraduate, FaBuilding, FaBirthdayCake, FaVenusMars, FaEnvelope, FaIdBadge } from 'react-icons/fa';
import '../styles/ClassyTheme.css';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    dateOfBirth: '',
    gender: '',
    highestQualification: '',
    currentStatus: '',
    schoolOrCompany: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5000/api/mentee/profile', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to load profile');
        setProfile(data);
        setFormData({
          fullName: data.fullName || '',
          email: data.email || '',
          dateOfBirth: data.dateOfBirth ? data.dateOfBirth.substring(0,10) : '',
          gender: data.gender || '',
          highestQualification: data.highestQualification || '',
          currentStatus: data.currentStatus || '',
          schoolOrCompany: data.schoolOrCompany || '',
        });
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/mentee/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update profile');
      setProfile(prev => ({ ...prev, ...formData }));
      setIsEditing(false);
    } catch (e) {
      setError(e.message);
    }
  };

  // Loading & Error States
  if (loading) return <div className="classic-animated-bg d-flex justify-content-center align-items-center"><div className="spinner-border text-dark"></div></div>;
  if (error) return <div className="classic-animated-bg p-5 text-center text-danger">Error: {error}</div>;

  return (
    <div className="classic-animated-bg">
      <div className="row justify-content-center position-relative z-1">
        <div className="col-lg-11 col-xl-10">
            
            {/* 1. Header Card (Glassmorphism) */}
            <div className="glass-panel p-4 mb-4 d-flex align-items-center flex-wrap gap-4">
                {/* Avatar */}
                <div 
                    className="rounded-circle shadow d-flex align-items-center justify-content-center text-white"
                    style={{ 
                        width: '120px', height: '120px', fontSize: '3rem',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        border: '4px solid rgba(255,255,255,0.8)'
                    }}
                >
                    {profile?.fullName ? profile.fullName.charAt(0) : 'U'}
                </div>
                
                {/* Name & Title */}
                <div className="flex-grow-1">
                    <h1 className="classic-title mb-1">{profile?.fullName || 'Mentee Name'}</h1>
                    <p className="text-muted fs-5 mb-2">{profile?.currentStatus || 'Student'}</p>
                    <div className="d-flex gap-3">
                        <span className="badge bg-primary bg-opacity-75 rounded-pill fw-light px-3 py-2">
                           <FaUserGraduate className="me-2"/> {profile?.highestQualification || 'N/A'}
                        </span>
                        <span className="badge bg-info bg-opacity-75 rounded-pill fw-light px-3 py-2 text-dark">
                           <FaBuilding className="me-2"/> {profile?.schoolOrCompany || 'N/A'}
                        </span>
                    </div>
                </div>

                {!isEditing && (
                    <button onClick={() => setIsEditing(true)} className="classic-btn shadow-sm">
                        Edit Profile
                    </button>
                )}
            </div>

            {/* 2. Content Body (Glassmorphism) */}
            <div className="glass-panel p-5">
                {isEditing ? (
                    /* --- EDIT FORM --- */
                    <div className="row g-4">
                        <div className="col-12"><h4 className="classic-title border-bottom pb-2">Update Information</h4></div>
                        
                        <div className="col-md-6">
                            <label className="text-muted small text-uppercase fw-bold mb-1">Full Name</label>
                            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="form-control classic-input" />
                        </div>
                        
                        <div className="col-md-6">
                            <label className="text-muted small text-uppercase fw-bold mb-1">Email</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control classic-input" disabled />
                        </div>

                        <div className="col-md-6">
                            <label className="text-muted small text-uppercase fw-bold mb-1">Date of Birth</label>
                            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className="form-control classic-input" />
                        </div>

                        <div className="col-md-6">
                            <label className="text-muted small text-uppercase fw-bold mb-1">Gender</label>
                            <select name="gender" value={formData.gender} onChange={handleChange} className="form-control classic-input">
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label className="text-muted small text-uppercase fw-bold mb-1">Qualification</label>
                            <input type="text" name="highestQualification" value={formData.highestQualification} onChange={handleChange} className="form-control classic-input" />
                        </div>

                        <div className="col-md-6">
                            <label className="text-muted small text-uppercase fw-bold mb-1">Current Status</label>
                            <select name="currentStatus" value={formData.currentStatus} onChange={handleChange} className="form-control classic-input">
                                <option value="">Select Status</option>
                                <option value="Student">Student</option>
                                <option value="UG">Undergraduate</option>
                                <option value="PG">Postgraduate</option>
                                <option value="Employee">Employee</option>
                            </select>
                        </div>

                        <div className="col-12">
                            <label className="text-muted small text-uppercase fw-bold mb-1">School / College / Company</label>
                            <input type="text" name="schoolOrCompany" value={formData.schoolOrCompany} onChange={handleChange} className="form-control classic-input" />
                        </div>

                        <div className="col-12 mt-4 text-end">
                            <button onClick={() => setIsEditing(false)} className="classic-btn-outline me-2">Cancel</button>
                            <button onClick={handleSave} className="classic-btn">Save Changes</button>
                        </div>
                    </div>
                ) : (
                    /* --- VIEW DETAILS --- */
                    <div className="row">
                        <div className="col-md-8">
                            <h5 className="classic-title border-bottom pb-3 mb-4">Personal Details</h5>
                            <div className="row g-4">
                                
                                {/* FIX: Email is now col-12 (full width) to prevent overlapping */}
                                <div className="col-12">
                                    <div className="d-flex align-items-center mb-1 text-muted small text-uppercase fw-bold">
                                        <FaEnvelope className="me-2"/> Email
                                    </div>
                                    {/* text-break ensures very long emails wrap to next line */}
                                    <span className="fs-5 text-break">{profile?.email}</span>
                                </div>

                                <div className="col-sm-6">
                                    <div className="d-flex align-items-center mb-1 text-muted small text-uppercase fw-bold">
                                        <FaBirthdayCake className="me-2"/> Date of Birth
                                    </div>
                                    <span className="fs-5">{profile?.dateOfBirth ? new Date(profile.dateOfBirth).toLocaleDateString() : 'N/A'}</span>
                                </div>

                                <div className="col-sm-6">
                                    <div className="d-flex align-items-center mb-1 text-muted small text-uppercase fw-bold">
                                        <FaVenusMars className="me-2"/> Gender
                                    </div>
                                    <span className="fs-5">{profile?.gender || 'N/A'}</span>
                                </div>

                                <div className="col-sm-6">
                                    <div className="d-flex align-items-center mb-1 text-muted small text-uppercase fw-bold">
                                        <FaIdBadge className="me-2"/> Status
                                    </div>
                                    <span className="fs-5">{profile?.currentStatus || 'N/A'}</span>
                                </div>
                            </div>
                        </div>
                        
                        {/* Right Sidebar */}
                        <div className="col-md-4 border-start">
                             <div className="ps-md-4 mt-4 mt-md-0">
                                <h5 className="classic-title mb-4">Academic Info</h5>
                                <div className="mb-4">
                                    <small className="text-muted d-block text-uppercase fw-bold" style={{fontSize: '0.7rem'}}>Institution</small>
                                    <p className="fw-bold mb-0 text-break">{profile?.schoolOrCompany}</p>
                                </div>
                                <div className="mb-4">
                                    <small className="text-muted d-block text-uppercase fw-bold" style={{fontSize: '0.7rem'}}>Qualification</small>
                                    <p className="fw-bold mb-0">{profile?.highestQualification}</p>
                                </div>
                                
                                <hr className="my-4"/>
                                <button className="btn btn-outline-danger w-100 py-2 rounded-pill" onClick={() => alert("Contact admin to delete account.")}>
                                    Close Account
                                </button>
                             </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;