import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Friends.css';

export default function Friends() {
  const navigate = useNavigate();
  const [friends, setFriends] = useState([
    { id: 1, name: 'Alex', status: 'online' },
    { id: 2, name: 'Sam', status: 'offline' },
    { id: 3, name: 'Jordan', status: 'online' },
    { id: 4, name: 'Casey', status: 'online' }
  ]);

  const [friendInput, setFriendInput] = useState('');
  const [requests, setRequests] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const handleAddFriend = (e) => {
    e.preventDefault();
    if (friendInput.trim()) {
      alert(`Friend request sent to ${friendInput}!`);
      setFriendInput('');
    }
  };

  const handleAcceptRequest = (id) => {
    setRequests(requests.filter(r => r.id !== id));
    alert('Friend request accepted!');
  };

  const handleRejectRequest = (id) => {
    setRequests(requests.filter(r => r.id !== id));
  };

  const handleRemoveFriend = (id) => {
    setFriends(friends.filter(f => f.id !== id));
    setEditingId(null);
  };

  const handleBlockFriend = (id) => {
    alert('Friend blocked - they cannot message you');
    setFriends(friends.filter(f => f.id !== id));
    setEditingId(null);
  };

  const handleTimeoutFriend = (id) => {
    alert('Friend timeout set - they can message after 7 days');
    setEditingId(null);
  };

  return (
    <div className="friends-container">
      <div className="bg-glow"></div>

      <section className="friends-header">
        <h1>Friends</h1>
        <p>Connect with your gaming buddies</p>
      </section>

      <section className="friends-content">
        <div className="friends-card">
          <h2>Invite Friends</h2>
          <form className="invite-form" onSubmit={handleAddFriend}>
            <input 
              type="text" 
              placeholder="Enter username or email..."
              value={friendInput}
              onChange={(e) => setFriendInput(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary">Send Invite</button>
          </form>
        </div>

        <div className="friends-card">
          <h2>Friend Requests ({requests.length})</h2>
          {requests.length > 0 ? (
            <div className="requests-list">
              {requests.map(request => (
                <div key={request.id} className="request-item">
                  <div className="request-info">
                    <h3>{request.name}</h3>
                    <p>Pending</p>
                  </div>
                  <div className="request-actions">
                    <button 
                      className="btn btn-sm btn-accept"
                      onClick={() => handleAcceptRequest(request.id)}
                    >
                      Accept
                    </button>
                    <button 
                      className="btn btn-sm btn-reject"
                      onClick={() => handleRejectRequest(request.id)}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No friend requests<br />yet</p>
            </div>
          )}
        </div>

        <div className="friends-card full-width">
          <h2>Your Friends ({friends.length})</h2>
          <div className="friends-list">
            {friends.map(friend => (
              <div key={friend.id} className="friend-item">
                <div className="friend-content">
                  <div className="friend-status-indicator" data-status={friend.status}></div>
                  <div className="friend-info">
                    <h3>{friend.name}</h3>
                    <p className={`status ${friend.status}`}>{friend.status}</p>
                  </div>
                </div>
                <div className="friend-menu">
                  <button
                    className="btn-menu-toggle"
                    onClick={() => setEditingId(editingId === friend.id ? null : friend.id)}
                  >
                    ⋮
                  </button>
                  {editingId === friend.id && (
                    <div className="friend-menu-dropdown">
                      <button 
                        className="menu-item remove"
                        onClick={() => handleRemoveFriend(friend.id)}
                      >
                        Remove Friend
                      </button>
                      <button 
                        className="menu-item timeout"
                        onClick={() => handleTimeoutFriend(friend.id)}
                      >
                        Timeout (7 days)
                      </button>
                      <button 
                        className="menu-item block"
                        onClick={() => handleBlockFriend(friend.id)}
                      >
                        Block
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
