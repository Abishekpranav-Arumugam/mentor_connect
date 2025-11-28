import React from 'react';
import { FaClock, FaCheck, FaTimes, FaStickyNote } from 'react-icons/fa';
import '../styles/ClassyTheme.css';

const PastSessions = () => {
  const sessions = [
    { id: 101, mentor: "Dr. Anjali Verma", date: "Oct 22, 2023", time: "10:00 AM", topic: "Research Methodology", duration: "45 mins", status: "Completed" },
    { id: 102, mentor: "Prof. Vikram Singh", date: "Oct 29, 2023", time: "02:00 PM", topic: "Career Path in AI", duration: "30 mins", status: "Completed" },
    { id: 103, mentor: "Dr. Sarah Lee", date: "Nov 03, 2023", time: "11:00 AM", topic: "Internship Review", duration: "60 mins", status: "Cancelled" },
    { id: 104, mentor: "Prof. Vikram Singh", date: "Nov 10, 2023", time: "04:00 PM", topic: "Mock Interview", duration: "50 mins", status: "Completed" },
  ];

  return (
    <div className="classic-animated-bg">
      <div className="mb-4 position-relative z-1">
        <h2 className="classic-title display-6">My Session History</h2>
        <p className="classic-text-muted">A timeline of your learning journey with mentors.</p>
      </div>

      <div className="glass-panel p-0 overflow-hidden">
        <div className="table-responsive">
          <table className="table mb-0" style={{borderCollapse: 'separate', borderSpacing: '0'}}>
            <thead style={{background: 'rgba(44, 62, 80, 0.05)'}}>
              <tr>
                <th className="py-4 ps-4 text-uppercase small text-muted border-0">Mentor</th>
                <th className="py-4 text-uppercase small text-muted border-0">Date & Time</th>
                <th className="py-4 text-uppercase small text-muted border-0">Topic</th>
                <th className="py-4 text-uppercase small text-muted border-0">Duration</th>
                <th className="py-4 text-uppercase small text-muted border-0 text-center">Status</th>
                <th className="py-4 pe-4 text-end text-uppercase small text-muted border-0">Notes</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session, index) => (
                <tr key={session.id} style={{background: index % 2 === 0 ? 'rgba(255,255,255,0.4)' : 'transparent'}}>
                  <td className="ps-4 py-3 align-middle border-bottom border-light">
                    <div className="d-flex align-items-center">
                        <div className="rounded-circle bg-white shadow-sm d-flex justify-content-center align-items-center me-3" 
                             style={{width: '40px', height: '40px', color: '#4ca1af', fontWeight: 'bold', border: '1px solid #eee'}}>
                            {session.mentor.charAt(0)}
                        </div>
                        <span className="fw-bold text-dark">{session.mentor}</span>
                    </div>
                  </td>
                  <td className="align-middle border-bottom border-light">
                    <div className="d-flex flex-column">
                        <span className="fw-medium text-dark">{session.date}</span>
                        <small className="text-muted">{session.time}</small>
                    </div>
                  </td>
                  <td className="align-middle border-bottom border-light">
                    <span className="px-3 py-1 rounded-pill bg-white border small fw-medium text-secondary shadow-sm">
                        {session.topic}
                    </span>
                  </td>
                  <td className="align-middle border-bottom border-light text-muted">
                    <FaClock className="me-2" style={{opacity: 0.5}}/> {session.duration}
                  </td>
                  <td className="align-middle border-bottom border-light text-center">
                    {session.status === 'Completed' ? (
                        <div className="d-inline-flex align-items-center text-success small fw-bold bg-success bg-opacity-10 px-3 py-1 rounded-pill">
                            <FaCheck className="me-1"/> Done
                        </div>
                    ) : (
                        <div className="d-inline-flex align-items-center text-danger small fw-bold bg-danger bg-opacity-10 px-3 py-1 rounded-pill">
                            <FaTimes className="me-1"/> Void
                        </div>
                    )}
                  </td>
                  <td className="align-middle border-bottom border-light text-end pe-4">
                    <button className="btn btn-sm btn-light border bg-white shadow-sm text-muted rounded-circle p-2">
                        <FaStickyNote />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PastSessions;