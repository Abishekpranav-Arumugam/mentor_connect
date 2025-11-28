import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ClassyTheme.css';

const ProfileMentor = () => {
  const [mentor, setMentor] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    fullName: '', email: '', faculty: '', experience: '',
    areaInterested: '', phoneNumber: '', linkedin: '', calendlyUrl: '',
  });

  const navigate = useNavigate();
  // 1. GET THE LIVE URL
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchMentorData = async () => {
      const token = localStorage.getItem('token');
      if (!token) { navigate('/mentor/login'); return; }

      try {
        // 2. USE THE LIVE URL
        const response = await fetch(`${API_URL}/api/mentor/profile`, {
          method: 'GET',
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });

        const data = await response.json();

        if (response.ok) {
          setMentor(data);
          setFormData({
            fullName: data.fullName || '', email: data.email || '',
            faculty: data.faculty || '', experience: data.experience || '',
            areaInterested: data.areaInterested || '', phoneNumber: data.phoneNumber || '',
            linkedin: data.linkedin || '', calendlyUrl: data.calendlyUrl || '',
          });
        } else if (response.status === 401) {
            localStorage.removeItem('token'); 
            navigate('/mentor/login');
        } else {
            setError(data.message || 'Failed to load profile.');
        }
      } catch (err) {
        console.error("Profile Fetch Error:", err);
        setError('Failed to connect to server.');
      } finally { setLoading(false); }
    };
    fetchMentorData();
  }, [navigate, API_URL]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      // 3. USE THE LIVE URL FOR UPDATES
      const response = await fetch(`${API_URL}/api/mentor/profile`, {
        method: 'PUT',
        headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setMentor({ ...mentor, ...formData });
        setIsEditing(false);
      } else {
        alert("Failed to update profile.");
      }
    } catch (err) { alert("An error occurred."); }
  };

  const handleDelete = async () => {
    if(!window.confirm("Delete account? This is permanent.")) return;
    try {
      const token = localStorage.getItem('token');
      // 4. USE THE LIVE URL FOR DELETE
      await fetch(`${API_URL}/api/mentor/profile`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      localStorage.removeItem('token');
      navigate('/mentor/register');
    } catch (err) { console.error(err); }
  };

  if (loading) return <div className="classic-animated-bg d-flex justify-content-center align-items-center"><div className="spinner-border text-dark"></div></div>;
  if (error) return <div className="classic-animated-bg p-5 text-center text-danger">Error: {error}</div>;

  return (
    <div className="classic-animated-bg">
      <div className="row justify-content-center position-relative z-1">
        <div className="col-lg-11 col-xl-10">
            
            {/* Header */}
            <div className="glass-panel p-4 mb-4 d-flex align-items-center flex-wrap gap-4">
                <div 
                    className="rounded-circle shadow d-flex align-items-center justify-content-center text-white"
                    style={{ 
                        width: '120px', height: '120px', fontSize: '3rem',
                        background: 'linear-gradient(135deg, #2c3e50 0%, #4ca1af 100%)',
                        border: '4px solid rgba(255,255,255,0.8)'
                    }}
                >
                    {mentor?.fullName ? mentor.fullName.charAt(0) : 'M'}
                </div>
                
                <div className="flex-grow-1">
                    <h1 className="classic-title mb-1">{mentor?.fullName || 'Mentor Name'}</h1>
                    <p className="text-muted fs-5 mb-2">{mentor?.faculty || 'Department'} Faculty</p>
                    <div className="d-flex gap-3">
                        <span className="badge bg-dark bg-opacity-75 rounded-pill fw-light px-3 py-2">
                            {mentor?.experience || '0'} Years Experience
                        </span>
                        <span className="badge bg-secondary bg-opacity-75 rounded-pill fw-light px-3 py-2">
                            {mentor?.areaInterested || 'Expertise'}
                        </span>
                    </div>
                </div>

                {!isEditing && (
                    <button onClick={() => setIsEditing(true)} className="classic-btn shadow-sm">
                        Edit Profile
                    </button>
                )}
            </div>

            {/* Body */}
            <div className="glass-panel p-5">
                {isEditing ? (
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
                            <label className="text-muted small text-uppercase fw-bold mb-1">Faculty</label>
                            <input type="text" name="faculty" value={formData.faculty} onChange={handleChange} className="form-control classic-input" />
                        </div>
                        <div className="col-md-6">
                            <label className="text-muted small text-uppercase fw-bold mb-1">Phone</label>
                            <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="form-control classic-input" />
                        </div>
                        <div className="col-md-6">
                            <label className="text-muted small text-uppercase fw-bold mb-1">Expertise</label>
                            <input type="text" name="areaInterested" value={formData.areaInterested} onChange={handleChange} className="form-control classic-input" />
                        </div>
                        <div className="col-md-6">
                            <label className="text-muted small text-uppercase fw-bold mb-1">Years Exp.</label>
                            <input type="text" name="experience" value={formData.experience} onChange={handleChange} className="form-control classic-input" />
                        </div>
                        <div className="col-12">
                            <label className="text-muted small text-uppercase fw-bold mb-1">LinkedIn</label>
                            <input type="text" name="linkedin" value={formData.linkedin} onChange={handleChange} className="form-control classic-input" />
                        </div>
                        <div className="col-12">
                            <label className="text-muted small text-uppercase fw-bold mb-1">Calendly Link</label>
                            <input type="text" name="calendlyUrl" value={formData.calendlyUrl} onChange={handleChange} className="form-control classic-input" />
                        </div>
                        <div className="col-12 mt-4 text-end">
                            <button onClick={() => setIsEditing(false)} className="classic-btn-outline me-2">Cancel</button>
                            <button onClick={handleSave} className="classic-btn">Save Updates</button>
                        </div>
                    </div>
                ) : (
                    <div className="row">
                        <div className="col-md-8">
                            <h5 className="classic-title border-bottom pb-3 mb-4">Contact Information</h5>
                            <div className="row g-4">
                                <div className="col-sm-6">
                                    <small className="text-uppercase text-muted d-block fw-bold" style={{fontSize: '0.7rem'}}>Email Address</small>
                                    <span className="fs-5 text-break">{mentor?.email}</span>
                                </div>
                                <div className="col-sm-6">
                                    <small className="text-uppercase text-muted d-block fw-bold" style={{fontSize: '0.7rem'}}>Phone Number</small>
                                    <span className="fs-5">{mentor?.phoneNumber || 'N/A'}</span>
                                </div>
                                <div className="col-12">
                                    <small className="text-uppercase text-muted d-block fw-bold" style={{fontSize: '0.7rem'}}>Social & Scheduling</small>
                                    <div className="d-flex gap-4 mt-2">
                                        {mentor?.linkedin ? 
                                            <a href={mentor.linkedin} target="_blank" rel="noreferrer" className="text-decoration-none d-flex align-items-center"><span className="badge bg-primary me-2">in</span> LinkedIn Profile</a> 
                                            : <span className="text-muted">No LinkedIn</span>}
                                            
                                        {mentor?.calendlyUrl ? 
                                            <a href={mentor.calendlyUrl} target="_blank" rel="noreferrer" className="text-decoration-none d-flex align-items-center"><span className="badge bg-info me-2">C</span> Calendly</a> 
                                            : <span className="text-muted">No Calendly</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 border-start">
                             <div className="ps-md-4 mt-4 mt-md-0">
                                <h5 className="classic-title mb-4">Account Settings</h5>
                                <button onClick={handleDelete} className="btn btn-outline-danger w-100 py-2 rounded-pill">
                                    Delete Account
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

export default ProfileMentor;