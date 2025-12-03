import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Lobbies.css'

export default function Lobbies() {
  const navigate = useNavigate()
  const [lobbies, setLobbies] = useState([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newLobbyName, setNewLobbyName] = useState('')
  const [newLobbyBudget, setNewLobbyBudget] = useState('')
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // Load lobbies from localStorage on mount
  useEffect(() => {
    const savedLobbies = localStorage.getItem('playerlobby_lobbies')
    if (savedLobbies) {
      setLobbies(JSON.parse(savedLobbies))
    } else {
      // Set example lobbies if none exist
      const exampleLobbies = [
        {
          id: 1,
          name: 'Summer Vibes 2025',
          budget: 500,
          members: ['You', 'Alex', 'Jordan', 'Sam'],
          activities: ['Gaming', 'Dinner'],
          createdAt: new Date().toLocaleDateString(),
        },
        {
          id: 2,
          name: 'Weekend Gaming',
          budget: 200,
          members: ['You', 'Casey', 'Morgan'],
          activities: ['Mario Kart Tournament'],
          createdAt: new Date().toLocaleDateString(),
        }
      ]
      setLobbies(exampleLobbies)
      localStorage.setItem('playerlobby_lobbies', JSON.stringify(exampleLobbies))
    }
  }, [])

  // Save lobbies to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('playerlobby_lobbies', JSON.stringify(lobbies))
  }, [lobbies])

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleCreateLobby = (e) => {
    e.preventDefault()
    if (newLobbyName.trim()) {
      const newLobby = {
        id: Date.now(),
        name: newLobbyName,
        budget: parseFloat(newLobbyBudget) || 0,
        members: ['You'],
        activities: [],
        createdAt: new Date().toLocaleDateString(),
      }
      setLobbies([newLobby, ...lobbies])
      setNewLobbyName('')
      setNewLobbyBudget('')
      setShowCreateModal(false)
    }
  }

  const handleDeleteLobby = (id) => {
    setLobbies(lobbies.filter(l => l.id !== id))
  }

  const handleViewLobby = (id) => {
    navigate(`/lobbies/${id}`)
  }

  return (
    <div className="lobbies-container" style={{
      '--mouse-x': `${mousePos.x}px`,
      '--mouse-y': `${mousePos.y}px`,
    }}>
      <div className="bg-glow" />

      <div className="lobbies-content">
        {/* Header */}
        <div className="lobbies-header">
          <div className="header-text">
            <h1 className="lobbies-title">Your Lobbies</h1>
            <p className="lobbies-subtitle">Manage your squads and coordinate epic hangouts</p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => setShowCreateModal(true)}
          >
            ➕ Create Lobby
          </button>
        </div>

        {/* Lobbies Grid */}
        <div className="lobbies-grid">
          {lobbies.map((lobby, idx) => (
            <div
              key={lobby.id}
              className="lobby-card"
              style={{ '--delay': `${idx * 0.1}s` }}
            >
              <div className="card-header">
                <h2 className="lobby-name">{lobby.name}</h2>
                <button
                  className="btn-delete"
                  onClick={() => handleDeleteLobby(lobby.id)}
                  title="Delete lobby"
                >
                  <span role="img" aria-label="Delete lobby" style={{ fontSize: '1.2rem' }}>🗑️</span>
                </button>
              </div>

              <div className="card-stats">
                <div className="stat">
                  <span role="img" aria-label="Members" style={{ fontSize: '1rem' }}>👥</span>
                  <span>{lobby.members.length} Members</span>
                </div>
                <div className="stat">
                  <span role="img" aria-label="Budget" style={{ fontSize: '1rem' }}>💰</span>
                  <span>${lobby.budget}</span>
                </div>
                <div className="stat">
                  <span role="img" aria-label="Created At" style={{ fontSize: '1rem' }}>📅</span>
                  <span>{lobby.createdAt}</span>
                </div>
              </div>

              <div className="card-members">
                <p className="members-label">Squad:</p>
                <div className="members-list">
                  {lobby.members.map((member, i) => (
                    <span key={i} className="member-badge">{member}</span>
                  ))}
                </div>
              </div>

              <div className="card-activities">
                <p className="activities-label">{lobby.activities.length} Activities Planned</p>
                {lobby.activities.length > 0 && (
                  <div className="activities-preview">
                    {lobby.activities.slice(0, 2).map((activity, i) => (
                      <span key={i} className="activity-tag">{activity}</span>
                    ))}
                    {lobby.activities.length > 2 && (
                      <span className="activity-more">+{lobby.activities.length - 2} more</span>
                    )}
                  </div>
                )}
              </div>

              <button
                className="btn btn-view"
                onClick={() => handleViewLobby(lobby.id)}
              >
                View Details <span role="img" aria-label="Arrow Right" style={{ fontSize: '1rem' }}>➡️</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Create a New Lobby</h2>
            <form onSubmit={handleCreateLobby}>
              <div className="form-group">
                <label>Lobby Name</label>
                <input
                  type="text"
                  placeholder="e.g., Summer Vibes 2025"
                  value={newLobbyName}
                  onChange={(e) => setNewLobbyName(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="form-group">
                <label>Initial Budget (Optional)</label>
                <input
                  type="number"
                  placeholder="e.g., 500"
                  value={newLobbyBudget}
                  onChange={(e) => setNewLobbyBudget(e.target.value)}
                  min="0"
                />
              </div>
              <div className="modal-actions">
                <button type="submit" className="btn btn-primary">
                  Create Lobby
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}