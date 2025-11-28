import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate('/choice'); // Navigate to the Choice Page
  };

  return (
    <div className="landing-container">
      {/* Navbar Section */}
      <nav className="navbar">
        <div className="logo">Mentor Connect</div>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#ratings">Ratings</a></li>
          <li><a href="#contact">Contact Us</a></li>
        </ul>
        <div className="nav-placeholder"></div>
      </nav>

      {/* Hero Section */}
      <header className="hero-section" id="home">
        <div className="overlay"></div>
        <div className="content">
          <h1>Empower Your Career with Expert Mentorship</h1>
          <p>Connect with Industry Experts to Boost Your Career Path</p>
          <button onClick={handleGetStartedClick} className="get-started-btn">Get Started</button>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="features-section">
        <h2>Why Choose Our Mentorship Platform?</h2>
        <div className="features">
          <div className="feature-card">
            <h3>Automated Scheduling</h3>
            <p>Book meetings with mentors effortlessly using our automated scheduling system.</p>
          </div>
          <div className="feature-card">
            <h3>Embedded Video Calls</h3>
            <p>Engage with mentors directly through our secure and reliable video call feature.</p>
          </div>
          <div className="feature-card">
            <h3>Industry Experts</h3>
            <p>Get mentorship from senior leaders and experts with years of industry experience.</p>
          </div>
        </div>
      </section>

      {/* Ratings Section */}
      <section id="ratings" className="ratings-section">
        <h2>User Reviews</h2>
        <div className="ratings">
          <div className="rating-card user-a">
            <p>"This platform connected me with the best mentors, and it transformed my career!"</p>
            <h4>— Kiruba, B.E CSE</h4>
          </div>
          <div className="rating-card user-b">
            <p>"I’ve learned so much from industry experts. Highly recommended!"</p>
            <h4>— Ananya, B.Tech IT</h4>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <h2>Contact Us</h2>
        <p>For any queries, feel free to reach out to us at: support@mentorconnect.com</p>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="social-icons" aria-label="Social media links">
          <a href="#" aria-label="Google" title="Google">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" role="img">
              <path d="M21.35 11.1H12v2.8h5.35c-.23 1.45-1.62 4.2-5.35 4.2-3.22 0-5.85-2.66-5.85-5.95 0-3.28 2.63-5.95 5.85-5.95 1.83 0 3.06.78 3.76 1.45l1.92-1.86C16.55 3.96 14.5 3 12 3 6.98 3 2.93 7.03 2.93 12.15 2.93 17.26 6.98 21.3 12 21.3c6.27 0 8.7-4.4 8.7-6.65 0-.45-.05-.74-.1-1.55z"/>
            </svg>
          </a>
          <a href="#" aria-label="Facebook" title="Facebook">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" role="img">
              <path d="M22 12.07C22 6.48 17.52 2 11.93 2 6.35 2 1.86 6.48 1.86 12.07 1.86 17.08 5.52 21.15 10.3 22v-7.02H7.9v-2.91h2.4v-2.22c0-2.38 1.42-3.69 3.6-3.69 1.04 0 2.13.19 2.13.19v2.33h-1.2c-1.18 0-1.55.74-1.55 1.5v1.9h2.64l-.42 2.91H13.3V22c4.78-.85 8.44-4.92 8.44-9.93z"/>
            </svg>
          </a>
          <a href="#" aria-label="Twitter" title="Twitter">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" role="img">
              <path d="M22 5.92c-.75.33-1.55.55-2.39.65.86-.52 1.52-1.34 1.83-2.31-.8.48-1.68.83-2.62 1.02A4.136 4.136 0 0 0 12.1 8.1c0 .32.04.63.1.93-3.43-.17-6.47-1.81-8.51-4.3-.36.63-.57 1.36-.57 2.14 0 1.48.76 2.78 1.91 3.55-.7-.02-1.36-.22-1.94-.53v.05c0 2.07 1.47 3.81 3.42 4.2-.36.1-.75.15-1.14.15-.28 0-.55-.03-.82-.08.55 1.74 2.14 3.01 4.02 3.04A8.29 8.29 0 0 1 2 18.57 11.71 11.71 0 0 0 8.29 20.4c7.54 0 11.67-6.25 11.67-11.67l-.01-.53A8.24 8.24 0 0 0 22 5.92z"/>
            </svg>
          </a>
          <a href="#" aria-label="Instagram" title="Instagram">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" role="img">
              <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-5 3.5a5.5 5.5 0 1 1 0 11.001 5.5 5.5 0 0 1 0-11zM12 9a3 3 0 1 0 0 6.001A3 3 0 0 0 12 9zm4.75-2.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5z"/>
            </svg>
          </a>
        </div>
        <p>&copy; 2025 Mentor Connect. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;