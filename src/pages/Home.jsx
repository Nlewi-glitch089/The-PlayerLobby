import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();
  const [quickCreateInput, setQuickCreateInput] = useState('');
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);

  const aiSuggestions = [
    {
      id: 1,
      icon: '🎯',
      title: 'Gaming Marathon Night',
      description: 'Friday recommended based on history'
    },
    {
      id: 2,
      icon: '🏆',
      title: 'Tournament Tournament',
      description: '4 friends available this weekend'
    },
    {
      id: 3,
      icon: '🎪',
      title: 'Casual Hangout',
      description: 'Budget $50-100 per person'
    }
  ];

  const handleQuickCreate = () => {
    if (quickCreateInput.trim()) {
      console.log('Creating:', quickCreateInput);
      setQuickCreateInput('');
      setSelectedSuggestion(null);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSelectedSuggestion(suggestion.id);
    setQuickCreateInput(suggestion.title);
  };

  return (
    <div className="home-container">
      <div className="bg-glow"></div>

      {/* Welcome Section */}
      <section className="welcome-section">
        <div className="welcome-content">
          <h1>Your Gaming Hub</h1>
          <p>Organize lobbies, connect with friends, and manage budgets all in one place.</p>
        </div>
      </section>

      {/* Quick Actions Grid */}
      <section className="quick-actions">
        <button className="action-card primary" onClick={() => navigate('/lobbies')}>
          <div className="action-icon">🎮</div>
          <h3>Create a Lobby</h3>
          <p>Start planning your next gaming session</p>
          <div className="action-arrow">→</div>
        </button>

        <button className="action-card" onClick={() => navigate('/friends')}>
          <div className="action-icon">👥</div>
          <h3>Add Friends</h3>
          <p>Build your gaming network</p>
          <div className="action-arrow">→</div>
        </button>

        <button className="action-card" onClick={() => navigate('/budget')}>
          <div className="action-icon">💰</div>
          <h3>Budget Tracker</h3>
          <p>Manage shared expenses</p>
          <div className="action-arrow">→</div>
        </button>

        <button className="action-card" onClick={() => alert('AI Planner feature coming soon!')}>
          <div className="action-icon">🤖</div>
          <h3>AI Planner</h3>
          <p>Get event suggestions & planning help</p>
          <div className="action-arrow">→</div>
        </button>
      </section>

      {/* Recent Activity */}
      <section className="recent-activity">
        <h2>Your Gaming Hub</h2>
        
        <div className="hub-grid">
          <div className="hub-card">
            <div className="hub-header">
              <h3>🚀 Quick Create</h3>
            </div>
            <div className="quick-create-form">
              <input
                type="text"
                placeholder="What do you want to create?"
                value={quickCreateInput}
                onChange={(e) => setQuickCreateInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleQuickCreate()}
              />
              <button className="btn btn-primary" onClick={handleQuickCreate}>
                Create
              </button>
            </div>
            <div className="suggestions-list">
              {aiSuggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  className={`suggestion-item ${selectedSuggestion === suggestion.id ? 'selected' : ''}`}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <span className="suggestion-icon">{suggestion.icon}</span>
                  <div className="suggestion-text">
                    <p>{suggestion.title}</p>
                    <span>{suggestion.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="hub-card">
            <div className="hub-header">
              <h3>👥 Your Friends</h3>
            </div>
            <div className="empty-state-small">
              <p>No friends yet</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
