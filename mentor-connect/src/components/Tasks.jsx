// src/components/Tasks.jsx
import React from 'react';
import { FaCheckCircle, FaHourglassHalf, FaClipboardList, FaPlus } from 'react-icons/fa';
import '../styles/ClassyTheme.css'; // Importing the shared Classy Theme

const Tasks = () => {
  // Mock Data for Tasks
  const tasks = [
    { id: 1, title: "Submit Project Proposal", deadline: "Today", priority: "High", status: "To Do", mentor: "Dr. Anjali" },
    { id: 2, title: "Review React Documentation", deadline: "Tomorrow", priority: "Medium", status: "In Progress", mentor: "Prof. Vikram" },
    { id: 3, title: "Complete Weekly Log", deadline: "Nov 20", priority: "Low", status: "Done", mentor: "Dr. Sarah" },
    { id: 4, title: "Prepare Presentation Slides", deadline: "Nov 25", priority: "High", status: "To Do", mentor: "Dr. Anjali" },
  ];

  // Helper function to render priority badges
  const getPriorityBadge = (priority) => {
    const colors = {
      High: "bg-danger bg-opacity-10 text-danger",
      Medium: "bg-warning bg-opacity-10 text-warning",
      Low: "bg-success bg-opacity-10 text-success"
    };
    return <span className={`badge rounded-pill ${colors[priority]} border border-0`}>{priority}</span>;
  };

  return (
    <div className="classic-animated-bg">
      <div className="d-flex justify-content-between align-items-center mb-5 position-relative z-1 flex-wrap gap-3">
        <div>
          <h2 className="classic-title display-6">My Tasks</h2>
          <p className="classic-text-muted">Track assignments and goals set by your mentors.</p>
        </div>
        <button className="classic-btn shadow-sm d-flex align-items-center">
          <FaPlus className="me-2" /> Add Personal Task
        </button>
      </div>

      <div className="row g-4 position-relative z-1">
        
        {/* Column 1: To Do */}
        <div className="col-md-4">
          <div className="glass-panel p-3 h-100">
            <h5 className="classic-title d-flex align-items-center mb-4 ps-2">
              <FaClipboardList className="text-secondary me-2" /> To Do
              <span className="badge bg-secondary rounded-circle ms-2">{tasks.filter(t => t.status === 'To Do').length}</span>
            </h5>
            
            <div className="d-flex flex-column gap-3">
              {tasks.filter(t => t.status === 'To Do').map(task => (
                <div key={task.id} className="card border-0 shadow-sm rounded-3 p-3 bg-white bg-opacity-75">
                  <div className="d-flex justify-content-between mb-2">
                    {getPriorityBadge(task.priority)}
                    <small className="text-muted">{task.deadline}</small>
                  </div>
                  <h6 className="fw-bold text-dark mb-1">{task.title}</h6>
                  <p className="small text-muted mb-0">Assigned by: {task.mentor}</p>
                </div>
              ))}
              {tasks.filter(t => t.status === 'To Do').length === 0 && <p className="text-center text-muted small py-4">No tasks to do.</p>}
            </div>
          </div>
        </div>

        {/* Column 2: In Progress */}
        <div className="col-md-4">
          <div className="glass-panel p-3 h-100">
            <h5 className="classic-title d-flex align-items-center mb-4 ps-2">
              <FaHourglassHalf className="text-primary me-2" /> In Progress
              <span className="badge bg-primary rounded-circle ms-2">{tasks.filter(t => t.status === 'In Progress').length}</span>
            </h5>
            
            <div className="d-flex flex-column gap-3">
              {tasks.filter(t => t.status === 'In Progress').map(task => (
                <div key={task.id} className="card border-0 shadow-sm rounded-3 p-3 bg-white bg-opacity-75 border-start border-4 border-primary">
                  <div className="d-flex justify-content-between mb-2">
                    {getPriorityBadge(task.priority)}
                    <small className="text-muted">{task.deadline}</small>
                  </div>
                  <h6 className="fw-bold text-dark mb-1">{task.title}</h6>
                  <p className="small text-muted mb-0">Assigned by: {task.mentor}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Column 3: Done */}
        <div className="col-md-4">
          <div className="glass-panel p-3 h-100">
            <h5 className="classic-title d-flex align-items-center mb-4 ps-2">
              <FaCheckCircle className="text-success me-2" /> Completed
              <span className="badge bg-success rounded-circle ms-2">{tasks.filter(t => t.status === 'Done').length}</span>
            </h5>
            
            <div className="d-flex flex-column gap-3">
              {tasks.filter(t => t.status === 'Done').map(task => (
                <div key={task.id} className="card border-0 shadow-sm rounded-3 p-3 bg-light opacity-75">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="badge bg-light text-secondary border">Done</span>
                    <small className="text-muted text-decoration-line-through">{task.deadline}</small>
                  </div>
                  <h6 className="fw-bold text-muted text-decoration-line-through mb-1">{task.title}</h6>
                  <p className="small text-muted mb-0">Assigned by: {task.mentor}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Tasks;