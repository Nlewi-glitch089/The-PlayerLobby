import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './LobbyDetails.css';

export default function LobbyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lobby, setLobby] = useState(null);
  const [newMember, setNewMember] = useState('');
  const [newActivity, setNewActivity] = useState('');

  useEffect(() => {
    const lobbies = JSON.parse(localStorage.getItem('playerlobby_lobbies') || '[]');
    const found = lobbies.find(l => l.id === parseInt(id));
    if (found) {
      setLobby(found);
    }
  }, [id]);

  const handleAddMember = (e) => {
    e.preventDefault();
    if (newMember.trim() && lobby) {
      const updated = { ...lobby, members: [...lobby.members, newMember] };
      setLobby(updated);
      updateLobbies(updated);
      setNewMember('');
    }
  };

  const handleAddActivity = (e) => {
    e.preventDefault();
    if (newActivity.trim() && lobby) {
      const updated = { ...lobby, activities: [...lobby.activities, newActivity] };
      setLobby(updated);
      updateLobbies(updated);
      setNewActivity('');
    }
  };

  const updateLobbies = (updatedLobby) => {
    const lobbies = JSON.parse(localStorage.getItem('playerlobby_lobbies') || '[]');
    const updated = lobbies.map(l => l.id === updatedLobby.id ? updatedLobby : l);
    localStorage.setItem('playerlobby_lobbies', JSON.stringify(updated));
  };

  const handleRemoveMember = (member) => {
    if (lobby) {
      const updated = { ...lobby, members: lobby.members.filter(m => m !== member) };
      setLobby(updated);
      updateLobbies(updated);
    }
  };

  const handleRemoveActivity = (activity) => {
    if (lobby) {
      const updated = { ...lobby, activities: lobby.activities.filter(a => a !== activity) };
      setLobby(updated);
      updateLobbies(updated);
    }
  };

  if (!lobby) {
    return (
      <div className="lobby-details-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="lobby-details-container">
      <div className="bg-glow"></div>

      <div className="lobby-details-content">
        <button className="back-btn" onClick={() => navigate('/lobbies')}>
          ← Back to Lobbies
        </button>

        <section className="lobby-header">
          <h1>{lobby.name}</h1>
          <p>Created: {lobby.createdAt}</p>
        </section>

        <div className="details-grid">
          {/* Budget Section */}
          <div className="detail-card">
            <h2>Budget</h2>
            <div className="budget-display">
              <span className="budget-label">Total Budget</span>
              <span className="budget-amount">${lobby.budget}</span>
              <span className="per-person">
                ${(lobby.budget / lobby.members.length).toFixed(2)} per person
              </span>
            </div>
          </div>

          {/* Members Section */}
          <div className="detail-card">
            <h2>Squad Members ({lobby.members.length})</h2>
            <div className="members-section">
              <div className="members-list">
                {lobby.members.map((member, i) => (
                  <div key={i} className="member-item">
                    <span>{member}</span>
                    {member !== 'You' && (
                      <button
                        className="btn-remove"
                        onClick={() => handleRemoveMember(member)}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <form onSubmit={handleAddMember} className="add-member-form">
                <input
                  type="text"
                  placeholder="Add new member..."
                  value={newMember}
                  onChange={(e) => setNewMember(e.target.value)}
                />
                <button type="submit" className="btn btn-primary">Add Member</button>
              </form>
            </div>
          </div>

          {/* Activities Section */}
          <div className="detail-card full-width">
            <h2>Activities ({lobby.activities.length})</h2>
            <div className="activities-section">
              {lobby.activities.length > 0 ? (
                <div className="activities-list">
                  {lobby.activities.map((activity, i) => (
                    <div key={i} className="activity-item">
                      <span>{activity}</span>
                      <button
                        className="btn-remove"
                        onClick={() => handleRemoveActivity(activity)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="empty-message">No activities planned yet</p>
              )}
              <form onSubmit={handleAddActivity} className="add-activity-form">
                <input
                  type="text"
                  placeholder="Add activity..."
                  value={newActivity}
                  onChange={(e) => setNewActivity(e.target.value)}
                />
                <button type="submit" className="btn btn-primary">Add Activity</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
