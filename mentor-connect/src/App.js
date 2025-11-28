import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ChoicePage from './components/ChoicePage';
import MenteeLoginPage from './components/MenteeLoginPage';
import MentorLoginPage from './components/MentorLoginPage';
import MentorRegistrationPage from './components/MentorRegistrationPage';
import MenteeDashboard from './components/MenteeDashboard';
import MentorDashboard from './components/MentorDashboard';
import ViewMentees from './components/ViewMentees';
import PastSessionsMentor from './components/PastSessionsMentor';
import PastSessions from './components/PastSessions';
// import Calendar from './components/Calendar';
import Profile from './components/Profile';
import ProfileMentor from './components/ProfileMentor';
import ViewMentors from './components/ViewMentors';
import Tasks from './components/Tasks';
import MentorCalendar from './components/MentorCalendar';
import Chatbot from './components/Chatbot'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <Chatbot/>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/choice" element={<ChoicePage />} />
        <Route path="/mentee/login" element={<MenteeLoginPage />} />
        <Route path="/mentor/login" element={<MentorLoginPage />} />
        <Route path="/mentor/register" element={<MentorRegistrationPage />} />
        
        {/* Mentee Dashboard with Nested Routes */}
        <Route path="/mentee/dashboard" element={<MenteeDashboard />}>
          <Route path="view-mentors" element={<ViewMentors />} />
          <Route path="past-sessions" element={<PastSessions />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Mentor Dashboard with Nested Routes */}
        <Route path="/mentor/dashboard" element={<MentorDashboard />}>
          <Route path="view-mentees" element={<ViewMentees />} />
          <Route path="past-sessions" element={<PastSessionsMentor />} />
          {/* <Route path="calendar" element={<Calendar />} /> */}
          <Route path="profile" element={<ProfileMentor />} />
        </Route>

        {/* Route to Display Mentor's Calendar */}
        <Route path="/mentee/connect/:mentorName" element={<MentorCalendar />} />
        
      </Routes>
    </Router>
  );
};

export default App;
