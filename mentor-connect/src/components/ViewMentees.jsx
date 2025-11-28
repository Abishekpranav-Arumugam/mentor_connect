import React, { useState } from 'react';
import { FaSearch, FaEnvelope, FaPhone, FaUserGraduate, FaStar } from 'react-icons/fa';
import '../styles/ClassyTheme.css'; // Import the CSS

const ViewMentees = () => {
  const [mentees] = useState([
    { id: 1, name: "Rahul Sharma", email: "rahul@college.edu", interest: "Web Development", status: "Active", year: "3rd Year", gpa: "8.5" },
    { id: 2, name: "Priya Patel", email: "priya@college.edu", interest: "Data Science", status: "Pending", year: "4th Year", gpa: "9.1" },
    { id: 3, name: "Amit Kumar", email: "amit@college.edu", interest: "AI & ML", status: "Active", year: "2nd Year", gpa: "7.8" },
    { id: 4, name: "Sneha Gupta", email: "sneha@college.edu", interest: "Web Development", status: "Completed", year: "4th Year", gpa: "9.5" },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredMentees = mentees.filter(mentee => 
    mentee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mentee.interest.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="classic-animated-bg">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-5 position-relative z-1 flex-wrap gap-3">
        <div>
          <h2 className="classic-title display-6">Mentee Directory</h2>
          <p className="classic-text-muted">Oversee and guide your assigned students.</p>
        </div>
        
        <div className="glass-panel px-3 py-2 d-flex align-items-center" style={{ width: '300px' }}>
          <FaSearch className="text-secondary me-2"/>
          <input 
            type="text" 
            className="form-control border-0 bg-transparent shadow-none" 
            placeholder="Search mentees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Grid */}
      <div className="row g-4 position-relative z-1">
        {filteredMentees.length > 0 ? (
          filteredMentees.map((mentee) => (
            <div className="col-md-6 col-lg-4" key={mentee.id}>
              <div className="glass-panel h-100 p-4">
                <div className="d-flex justify-content-between mb-3">
                    <span className={`badge rounded-pill px-3 py-2 ${mentee.status === 'Active' ? 'bg-success' : mentee.status === 'Pending' ? 'bg-warning text-dark' : 'bg-secondary'}`} style={{opacity: 0.9}}>
                        {mentee.status}
                    </span>
                    <div className="text-warning fw-bold"><FaStar /> {mentee.gpa}</div>
                </div>

                <div className="text-center mb-4">
                    <div className="bg-white rounded-circle shadow-sm mx-auto d-flex align-items-center justify-content-center mb-3" style={{width: '80px', height: '80px', fontSize: '2rem', background: 'linear-gradient(45deg, #2c3e50, #4ca1af)', color: 'white'}}>
                      {mentee.name.charAt(0)}
                    </div>
                    <h5 className="fw-bold mb-1 classic-title">{mentee.name}</h5>
                    <p className="text-muted small mb-0"><FaUserGraduate className="me-1"/> {mentee.year}</p>
                </div>

                <div className="bg-light bg-opacity-50 rounded p-3 mb-4 text-center border">
                    <small className="text-muted d-block text-uppercase" style={{fontSize: '0.7rem'}}>Interest Area</small>
                    <span className="fw-bold text-dark">{mentee.interest}</span>
                </div>
                  
                <div className="d-flex gap-2">
                    <button className="classic-btn w-100 btn-sm"><FaEnvelope className="me-2"/> Message</button>
                    <button className="btn btn-light border bg-white"><FaPhone /></button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5">
             <div className="glass-panel p-4 d-inline-block">
               <p className="text-muted mb-0">No mentees found matching "{searchTerm}".</p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewMentees;