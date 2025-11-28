import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
// Important: Import the same CSS file used by MentorDashboard
import '../styles/MentorDashboard.css'; 

const MenteeDashboard = () => {
  const [menteeData, setMenteeData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Check for token
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/mentee/login');
      return;
    }

    // 2. Fetch Mentee Data (Similar to Mentor Dashboard logic)
    const API_URL = process.env.REACT_APP_API_URL;
    const fetchMenteeData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/mentee/profile`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        });
        
        if (response.ok) {
          const data = await response.json();
          setMenteeData(data);
        } else if (response.status === 401) {
            // Token expired
            localStorage.removeItem('token');
            navigate('/mentee/login');
        }
      } catch (error) {
        console.error('Error fetching mentee data:', error);
      }
    };

    fetchMenteeData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/mentee/login');
  };

  return (
    <div className="dashboard-wrapper">
      {/* Navbar with Dark Theme & Shadow */}
      <Navbar bg="dark" variant="dark" expand="lg" className="py-3 shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to="/mentee/dashboard" className="fw-bold text-white">
            Mentee Dashboard
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          
          <Navbar.Collapse id="basic-navbar-nav">
            {/* Centered Navigation Links */}
            <Nav className="mx-auto text-center gap-4">
              <Nav.Link as={Link} to="view-mentors" className="text-white nav-hover">
                View Mentors
              </Nav.Link>
              <Nav.Link as={Link} to="past-sessions" className="text-white nav-hover">
                Past Sessions
              </Nav.Link>
              <Nav.Link as={Link} to="tasks" className="text-white nav-hover">
                Tasks
              </Nav.Link>
              <Nav.Link as={Link} to="profile" className="text-white nav-hover">
                Profile
              </Nav.Link>
            </Nav>
            
            {/* Logout Button */}
            <div className="d-flex justify-content-center mt-3 mt-lg-0">
                <Button 
                    variant="danger" 
                    size="sm" 
                    onClick={handleLogout} 
                    className="px-4 rounded-pill fw-bold"
                >
                    Logout
                </Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Content with White Box styling */}
      <Container className="mt-5">
        <main className="dashboard-content">
            {/* Pass data to children via context */}
            <Outlet context={{ menteeData, setMenteeData }} />
        </main>
      </Container>
    </div>
  );
};

export default MenteeDashboard;