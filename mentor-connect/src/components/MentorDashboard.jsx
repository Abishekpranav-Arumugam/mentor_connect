// src/components/MentorDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import '../styles/MentorDashboard.css';

const MentorDashboard = () => {
  const [mentorData, setMentorData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Retrieve the token using the SAME KEY as the Login page
    const token = localStorage.getItem('token');
    
    // 2. Immediate check: If no token, kick them out.
    if (!token) {
      navigate('/mentor/login');
      return;
    }

    const fetchMentorData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/mentor/profile', {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        });
        
        if (response.ok) {
          const data = await response.json();
          setMentorData(data);
        } else if (response.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('token');
            navigate('/mentor/login');
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchMentorData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('mentorData');
    navigate('/mentor/login');
  };

  return (
    <div className="dashboard-wrapper">
      <Navbar bg="dark" variant="dark" expand="lg" className="py-3 shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to="/mentor/dashboard" className="fw-bold text-white">
            Mentor Dashboard
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto text-center gap-4">
              {/* Relative paths allow correct nesting */}
              <Nav.Link as={Link} to="view-mentees" className="text-white nav-hover">
                View Mentees
              </Nav.Link>
              <Nav.Link as={Link} to="past-sessions" className="text-white nav-hover">
                Past Sessions
              </Nav.Link>
              <Nav.Link as={Link} to="profile" className="text-white nav-hover">
                Profile
              </Nav.Link>
            </Nav>
            <div className="d-flex justify-content-center mt-3 mt-lg-0">
                <Button variant="danger" size="sm" onClick={handleLogout} className="px-4 rounded-pill fw-bold">Logout</Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-5">
        <main className="dashboard-content">
            {/* Context allows ProfileMentor to receive data if needed */}
            <Outlet context={{ mentorData, setMentorData }} /> 
        </main>
      </Container>
    </div>
  );
};

export default MentorDashboard;