import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Budget.css';

export default function Budget() {
  const navigate = useNavigate();
  const [personalBudget, setPersonalBudget] = useState(500);
  const [friends, setFriends] = useState(['You', 'Alex', 'Jordan', 'Casey']);
  const [newFriend, setNewFriend] = useState('');
  const [expenses, setExpenses] = useState([
    { id: 1, description: 'Pizza Night', amount: 45.00, paidBy: 'You', participants: 3 },
    { id: 2, description: 'Gaming Tournament', amount: 120.00, paidBy: 'Alex', participants: 4 }
  ]);
  const [formData, setFormData] = useState({ description: '', amount: '', paidBy: 'You', participants: 2 });
  const [showForm, setShowForm] = useState(false);
  const [showFriendForm, setShowFriendForm] = useState(false);
  const [showBudgetForm, setShowBudgetForm] = useState(false);
  const [settledDebts, setSettledDebts] = useState([]);
  const [settlements, setSettlements] = useState([
    { id: 1, type: 'warning', name: 'Alex', amount: 30, message: 'You owe Alex' },
    { id: 2, type: 'success', name: 'Jordan', amount: 30, message: 'Jordan owes you' }
  ]);

  // Calculate totals
  const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  
  const youOwe = expenses
    .filter(exp => exp.paidBy !== 'You')
    .reduce((sum, exp) => sum + (exp.amount / exp.participants), 0);
  
  const youAreOwed = expenses
    .filter(exp => exp.paidBy === 'You')
    .reduce((sum, exp) => sum + ((exp.amount / exp.participants) * (exp.participants - 1)), 0);

  const budgetRemaining = personalBudget - totalSpent;
  const budgetPercentage = (totalSpent / personalBudget) * 100;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (formData.description && formData.amount && formData.paidBy) {
      setExpenses([
        ...expenses,
        {
          id: Date.now(),
          description: formData.description,
          amount: parseFloat(formData.amount),
          paidBy: formData.paidBy,
          participants: parseInt(formData.participants)
        }
      ]);
      setFormData({ description: '', amount: '', paidBy: 'You', participants: 2 });
      setShowForm(false);
    }
  };

  const handleAddFriend = (e) => {
    e.preventDefault();
    if (newFriend.trim() && !friends.includes(newFriend)) {
      setFriends([...friends, newFriend]);
      setNewFriend('');
      setShowFriendForm(false);
    }
  };

  const handleSetBudget = (e) => {
    e.preventDefault();
    const newBudget = parseFloat(e.target.budget.value);
    if (newBudget > 0) {
      setPersonalBudget(newBudget);
      setShowBudgetForm(false);
      e.target.reset();
    }
  };

  const handleDeleteFriend = (friendName) => {
    if (friendName !== 'You') {
      setFriends(friends.filter(f => f !== friendName));
    }
  };

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  const handleSettle = (friendName) => {
    setSettledDebts([...settledDebts, { friend: friendName, timestamp: new Date() }]);
    alert(`Settled with ${friendName}!`);
  };

  const handleSettleDebt = (id) => {
    setSettlements(settlements.filter(s => s.id !== id));
    alert('Debt settled!');
  };

  return (
    <div className="budget-container">
      <div className="bg-glow"></div>

      <section className="budget-header">
        <button className="back-btn" onClick={() => navigate('/home')}>
          ← Back
        </button>
        <h1>💰 Budget Manager</h1>
        <p>Track shared expenses and personal budget</p>
      </section>

      {/* Personal Budget Section */}
      <section className="personal-budget">
        <div className="budget-card">
          <div className="card-header">
            <h3>Personal Budget</h3>
            <button 
              className="btn-sm btn-primary"
              onClick={() => setShowBudgetForm(!showBudgetForm)}
            >
              {showBudgetForm ? '✕' : '✏️'}
            </button>
          </div>

          {showBudgetForm && (
            <form className="budget-form" onSubmit={handleSetBudget}>
              <input
                type="number"
                name="budget"
                placeholder="Budget amount"
                step="0.01"
                defaultValue={personalBudget}
                required
              />
              <button type="submit" className="btn-sm btn-primary">Update</button>
            </form>
          )}

          <div className="budget-info">
            <div className="budget-stat">
              <span className="stat-label">Total Budget</span>
              <span className="stat-amount">${personalBudget.toFixed(2)}</span>
            </div>
            <div className="budget-stat">
              <span className="stat-label">Spent</span>
              <span className="stat-amount negative">${totalSpent.toFixed(2)}</span>
            </div>
            <div className="budget-stat">
              <span className="stat-label">Remaining</span>
              <span className={`stat-amount ${budgetRemaining < 0 ? 'negative' : 'positive'}`}>
                ${budgetRemaining.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="progress-bar">
            <div 
              className={`progress-fill ${budgetPercentage > 100 ? 'over' : budgetPercentage > 75 ? 'warning' : ''}`}
              style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
            ></div>
            <span className="progress-text">{budgetPercentage.toFixed(0)}%</span>
          </div>
        </div>
      </section>

      {/* Shared Expenses Overview */}
      <section className="budget-overview">
        <div className="overview-card">
          <div className="overview-icon">💵</div>
          <div className="overview-content">
            <h3>Total Shared</h3>
            <p className="amount">${totalSpent.toFixed(2)}</p>
          </div>
        </div>

        <div className="overview-card positive">
          <div className="overview-icon">✅</div>
          <div className="overview-content">
            <h3>You're Owed</h3>
            <p className="amount">${youAreOwed.toFixed(2)}</p>
          </div>
        </div>

        <div className="overview-card negative">
          <div className="overview-icon">⚠️</div>
          <div className="overview-content">
            <h3>You Owe</h3>
            <p className="amount">${youOwe.toFixed(2)}</p>
          </div>
        </div>
      </section>

      <section className="budget-content">
        <div className="expenses-section">
          <div className="section-header">
            <h2>Shared Expenses</h2>
            <button 
              className="btn-sm btn-primary"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? '✕' : '➕'}
            </button>
          </div>

          {showForm && (
            <form className="add-expense-form" onSubmit={handleAddExpense}>
              <input
                type="text"
                name="description"
                placeholder="What was it for?"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                name="amount"
                placeholder="Amount"
                step="0.01"
                value={formData.amount}
                onChange={handleInputChange}
                required
              />
              <select
                name="paidBy"
                value={formData.paidBy}
                onChange={handleInputChange}
              >
                {friends.map(friend => (
                  <option key={friend} value={friend}>{friend} paid</option>
                ))}
              </select>
              <input
                type="number"
                name="participants"
                placeholder="How many people?"
                min="1"
                value={formData.participants}
                onChange={handleInputChange}
              />
              <button type="submit" className="btn-sm btn-primary">Save</button>
            </form>
          )}

          <div className="expenses-list">
            {expenses.length === 0 ? (
              <div className="empty-state">
                <p>No expenses yet. Add one to get started!</p>
              </div>
            ) : (
              expenses.map(expense => (
                <div key={expense.id} className="expense-item">
                  <div className="expense-info">
                    <h4>{expense.description}</h4>
                    <p>${expense.amount.toFixed(2)} • {expense.paidBy} paid • Split {expense.participants} ways</p>
                  </div>
                  <div className="expense-actions">
                    <span className="expense-per-person">
                      ${(expense.amount / expense.participants).toFixed(2)}/person
                    </span>
                    <button 
                      className="btn-delete"
                      onClick={() => handleDeleteExpense(expense.id)}
                      title="Delete expense"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="sidebar">
          <div className="friends-card">
            <div className="section-header">
              <h2>Friends</h2>
              <button 
                className="btn-sm btn-primary"
                onClick={() => setShowFriendForm(!showFriendForm)}
              >
                {showFriendForm ? '✕' : '➕'}
              </button>
            </div>

            {showFriendForm && (
              <form className="add-friend-form" onSubmit={handleAddFriend}>
                <input
                  type="text"
                  placeholder="Friend's name"
                  value={newFriend}
                  onChange={(e) => setNewFriend(e.target.value)}
                />
                <button type="submit" className="btn-sm btn-primary">Add</button>
              </form>
            )}

            <div className="friends-list">
              {friends.map(friend => (
                <div key={friend} className="friend-item">
                  <span className="friend-name">{friend}</span>
                  {friend !== 'You' && (
                    <button
                      className="btn-remove"
                      onClick={() => handleDeleteFriend(friend)}
                      title="Remove friend"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="settlements-card">
            <div className="section-header">
              <h2>Settlements</h2>
            </div>
            {settlements.length > 0 ? (
              <div className="settlements-list">
                {settlements.map(settlement => (
                  <div key={settlement.id} className={`settlement-item ${settlement.type}`}>
                    <span className="settlement-icon">{settlement.type === 'success' ? '✓' : '⚠️'}</span>
                    <div className="settlement-text">
                      <p>{settlement.message}</p>
                      <span>${settlement.amount.toFixed(2)}</span>
                    </div>
                    <button 
                      className="btn-settle"
                      onClick={() => handleSettleDebt(settlement.id)}
                    >
                      Settle
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-state">All debts settled! 🎉</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

