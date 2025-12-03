import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const navigate = useNavigate();

  return (
    <nav className="navigation">
      <Link to="/home" className="nav-link">Home</Link>
      <Link to="/lobbies" className="nav-link">Lobbies</Link>
      <Link to="/budget" className="nav-link">Budget</Link>
      
      <div className="nav-spacer"></div>
      
      <button className="nav-btn nav-btn-friends" onClick={() => navigate('/friends')} title="Friends">
        👥
      </button>
      <button className="nav-btn nav-btn-settings" onClick={() => navigate('/settings')} title="Settings">
        ⚙️
      </button>
    </nav>
  );
};

export default Navigation;