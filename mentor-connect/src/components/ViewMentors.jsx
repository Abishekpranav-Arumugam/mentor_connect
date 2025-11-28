import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserTie, FaEnvelope, FaUniversity, FaBriefcase, FaArrowRight } from 'react-icons/fa';
import '../styles/ClassyTheme.css'; // Import the shared CSS

const ViewMentors = () => {
  const [mentors, setMentors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/mentor/all');
        const data = await response.json();
        setMentors(data);
      } catch (error) {
        console.error('Error fetching mentors:', error);
      }
    };
    fetchMentors();
  }, []);

  const handleConnectClick = (mentor) => {
    navigate(`/mentee/connect/${mentor.name}`, {
      state: {
        email: mentor.email,
        calendlyUrl: mentor.calendlyUrl,
        fullName: mentor.fullName,
        profilePicture: mentor.idcard,
        faculty: mentor.faculty,
        experience: mentor.experience,
        areaInterested: mentor.areaInterested
      }
    });
  };

  return (
    <div className="classic-animated-bg">
      <div className="container position-relative z-1">
        <div className="mb-5">
            <h2 className="classic-title display-5">Available Mentors</h2>
            <p className="classic-text-muted lead">Connect with experienced faculty to guide your path.</p>
        </div>
        
        <div className="row g-4">
          {mentors.length > 0 ? (
            mentors.map((mentor) => (
              <div className="col-md-6 col-lg-4" key={mentor._id}>
                <div className="glass-panel h-100 p-4 d-flex flex-column">
                  
                  {/* Header */}
                  <div className="d-flex align-items-center mb-4">
                    <div className="rounded-circle d-flex align-items-center justify-content-center text-white shadow-sm me-3" 
                         style={{width: '60px', height: '60px', background: 'linear-gradient(45deg, #2c3e50, #4ca1af)', fontSize: '1.5rem'}}>
                         {mentor.fullName ? mentor.fullName.charAt(0) : <FaUserTie />}
                    </div>
                    <div>
                        <h4 className="fw-bold mb-0 text-dark">{mentor.fullName}</h4>
                        <span className="badge bg-light text-secondary border mt-1">{mentor.experience} Years Exp</span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="mb-4 flex-grow-1">
                    <div className="d-flex align-items-center mb-2 text-secondary">
                        <FaUniversity className="me-2 text-primary opacity-50"/>
                        <span>{mentor.faculty}</span>
                    </div>
                    <div className="d-flex align-items-center mb-2 text-secondary">
                        <FaEnvelope className="me-2 text-primary opacity-50"/>
                        <span className="text-truncate">{mentor.email}</span>
                    </div>
                    <div className="d-flex align-items-center text-secondary">
                        <FaBriefcase className="me-2 text-primary opacity-50"/>
                        <span>{mentor.areaInterested}</span>
                    </div>
                  </div>

                  {/* Footer Button */}
                  <button 
                    onClick={() => handleConnectClick(mentor)}
                    className="classic-btn w-100 d-flex justify-content-center align-items-center"
                    style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}
                  >
                    Connect <FaArrowRight className="ms-2" size={14}/>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-5">
               <div className="glass-panel p-5 d-inline-block">
                 <p className="text-muted mb-0 fs-5">No mentors available at the moment.</p>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewMentors;