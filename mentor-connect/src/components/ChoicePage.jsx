// src/components/ChoicePage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ChoicePage.css';

const ChoiceCard = ({ className, label, onClick }) => {
  const [style, setStyle] = useState({});

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;   // 0..1
    const y = (e.clientY - rect.top) / rect.height;   // 0..1

    const origin = `${(x * 100).toFixed(1)}% ${(y * 100).toFixed(1)}%`;
    const dx = x - 0.5;
    const dy = y - 0.5;
    const dist = Math.hypot(dx, dy);                  // distance from center

    // Closer to center -> zoom in. Closer to edges -> zoom out.
    const scale = dist < 0.25 ? 1.1 : 0.96;

    setStyle({
      transformOrigin: origin,
      transform: `scale(${scale}) translateY(-6px)`,
      boxShadow:
        scale > 1
          ? '0 20px 40px rgba(0,0,0,0.3), 0 0 20px rgba(148,0,211,0.45)'
          : '0 12px 24px rgba(0,0,0,0.2)',
    });
  };

  const handleMouseLeave = () => {
    setStyle({ transform: 'none', transformOrigin: 'center center' });
  };

  return (
    <div
      className={`choice-image ${className}`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' ? onClick() : null}
    >
      <p>{label}</p>
    </div>
  );
};

const ChoicePage = () => {
  const navigate = useNavigate();

  const navigateToPage = (page) => {
    if (page === 'mentor') {
      navigate('/mentor/login');
    } else if (page === 'mentee') {
      navigate('/mentee/login');
    }
  };

  return (
    <div className="choice-container">
      <h1>Choose Your Path</h1>
      <div className="choice-images">
        <ChoiceCard
          className="mentor"
          label="Mentor Login"
          onClick={() => navigateToPage('mentor')}
        />
        <ChoiceCard
          className="mentee"
          label="Mentee Login"
          onClick={() => navigateToPage('mentee')}
        />
      </div>
    </div>
  );
};

export default ChoicePage;