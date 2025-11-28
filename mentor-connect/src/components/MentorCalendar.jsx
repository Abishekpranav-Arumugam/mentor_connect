import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaUniversity, FaBriefcase, FaClock, FaArrowLeft, FaUserTie } from 'react-icons/fa';
import '../styles/ClassyTheme.css'; // Importing the shared theme

const MentorCalendar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { calendlyUrl, fullName, profilePicture, faculty, areaInterested, experience, email } = location.state || {}; 

  // --- Logic remains unchanged ---
  if (!calendlyUrl) {
    navigate('/mentee/dashboard/view-mentors'); // Redirect to grid if no URL
    return null;
  }

  return (
    <div className="classic-animated-bg">
      <div className="container position-relative z-1 py-4">
        
        <div className="row g-4 justify-content-center">
          
          {/* Left Column: Mentor Details Card */}
          <div className="col-lg-4">
            <div className="glass-panel p-4 text-center h-100 d-flex flex-column align-items-center">
              
              {/* Avatar */}
              <div 
                className="rounded-circle shadow mb-4 d-flex align-items-center justify-content-center text-white"
                style={{ 
                    width: '120px', 
                    height: '120px', 
                    fontSize: '3rem',
                    background: 'linear-gradient(135deg, #2c3e50 0%, #4ca1af 100%)',
                    border: '4px solid rgba(255,255,255,0.8)'
                }}
              >
                {fullName ? fullName.charAt(0) : <FaUserTie />}
              </div>

              <h2 className="classic-title mb-2">{fullName}</h2>
              <p className="text-muted mb-4">{faculty} Faculty</p>

              <div className="w-100 text-start px-3 mb-4">
                 <div className="d-flex align-items-center mb-3 p-3 bg-white bg-opacity-50 rounded border">
                    <FaEnvelope className="text-primary me-3 fs-5" />
                    <div>
                        <small className="text-muted d-block text-uppercase fw-bold" style={{fontSize:'0.7rem'}}>Email</small>
                        <a href={`mailto:${email}`} className="text-dark text-decoration-none fw-medium text-break">{email}</a>
                    </div>
                 </div>

                 <div className="d-flex align-items-center mb-3 p-3 bg-white bg-opacity-50 rounded border">
                    <FaBriefcase className="text-primary me-3 fs-5" />
                    <div>
                        <small className="text-muted d-block text-uppercase fw-bold" style={{fontSize:'0.7rem'}}>Expertise</small>
                        <span className="fw-medium">{areaInterested}</span>
                    </div>
                 </div>

                 <div className="d-flex align-items-center p-3 bg-white bg-opacity-50 rounded border">
                    <FaClock className="text-primary me-3 fs-5" />
                    <div>
                        <small className="text-muted d-block text-uppercase fw-bold" style={{fontSize:'0.7rem'}}>Experience</small>
                        <span className="fw-medium">{experience} Years</span>
                    </div>
                 </div>
              </div>

              <div className="mt-auto w-100">
                <button 
                    className="btn btn-light border w-100 py-2 d-flex align-items-center justify-content-center shadow-sm"
                    onClick={() => navigate(-1)}
                >
                    <FaArrowLeft className="me-2" /> Go Back
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Calendly Embed */}
          <div className="col-lg-8">
            <div className="glass-panel h-100 d-flex flex-column overflow-hidden" style={{minHeight: '650px'}}>
               <div className="p-3 border-bottom bg-white bg-opacity-25">
                  <h5 className="mb-0 classic-title text-center">
                    <span className="fw-light">Schedule a Session with</span> {fullName}
                  </h5>
               </div>
               <div className="flex-grow-1 bg-white">
                  <iframe
                    src={calendlyUrl}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    title="Calendly Scheduling"
                    style={{minHeight: '600px'}}
                  ></iframe>
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MentorCalendar;