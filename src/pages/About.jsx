import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './About.css';

export default function About() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('features');

  const features = [
    {
      icon: '👥',
      title: 'Connect with Friends',
      description: 'Build your gaming network, organize hangouts, and keep everyone in sync with real-time updates and notifications'
    },
    {
      icon: '💰',
      title: 'Smart Budget Management',
      description: 'Split costs fairly with AI-powered calculations. Track expenses, manage payments, and settle debts instantly'
    },
    {
      icon: '🤖',
      title: 'AI Planning Assistant',
      description: 'Your personal gaming event planner. Get smart recommendations, automated scheduling, and intelligent event suggestions'
    }
  ];

  const aiCapabilities = [
    {
      icon: '🎯',
      title: 'Smart Recommendations',
      description: 'Get personalized suggestions based on your gaming history'
    },
    {
      icon: '📊',
      title: 'Predictive Analytics',
      description: 'AI learns your patterns and predicts optimal event times'
    },
    {
      icon: '⚡',
      title: 'Automated Planning',
      description: 'Handles invites, reminders, and follow-ups automatically'
    },
    {
      icon: '💡',
      title: 'Intelligent Insights',
      description: 'Get data-driven insights about your gaming community'
    }
  ];

  const budgetSteps = [
    { icon: '📝', title: 'Log Expenses', description: 'Add any expense during or after events' },
    { icon: '🤖', title: 'AI Calculates', description: 'Smart algorithm splits costs fairly' },
    { icon: '💳', title: 'Settle Up', description: 'View who owes who and settle instantly' },
    { icon: '📊', title: 'Track History', description: 'Keep records of all transactions' }
  ];

  const whyChoose = [
    'AI-powered planning saves hours of coordination',
    'Fair budget splitting eliminates money drama',
    'Built specifically for gamers, by gamers',
    'One platform for planning, budgeting, and connecting'
  ];

  return (
    <div className="about-container">
      <div className="bg-glow"></div>

      {/* Hero Section */}
      <div className="hero">
        <div className="hero-content">
          <div className="hero-badge">✨ About The PlayerLobby</div>
          <h1 className="hero-title">Game Together, Plan Smarter</h1>
          <p className="hero-subtitle">
            Connect with friends, manage budgets effortlessly, and let our AI assistant handle the planning while you focus on the fun.
          </p>
        </div>

        <div className="hero-visual">
          <div className="floating-card card-1">👥 Connect Friends</div>
          <div className="floating-card card-2">💰 Smart Budget</div>
          <div className="floating-card card-3">🤖 AI Planning</div>
          <div className="accent accent-1"></div>
          <div className="accent accent-2"></div>
          <div className="accent accent-3"></div>
          <div className="accent accent-4"></div>
        </div>
      </div>

      {/* Tab Navigation */}
      <section className="tab-navigation">
        <button 
          className={`tab-btn ${activeTab === 'features' ? 'active' : ''}`}
          onClick={() => setActiveTab('features')}
        >
          Core Features
        </button>
        <button 
          className={`tab-btn ${activeTab === 'ai' ? 'active' : ''}`}
          onClick={() => setActiveTab('ai')}
        >
          AI Assistant
        </button>
        <button 
          className={`tab-btn ${activeTab === 'budget' ? 'active' : ''}`}
          onClick={() => setActiveTab('budget')}
        >
          Budget Tools
        </button>
        <button 
          className={`tab-btn ${activeTab === 'why' ? 'active' : ''}`}
          onClick={() => setActiveTab('why')}
        >
          Why Us
        </button>
      </section>

      {/* Dynamic Content Section */}
      <section className="dynamic-content">
        {activeTab === 'features' && (
          <div className="content-section">
            <div className="section-header">
              <h2>What We Offer</h2>
              <p>Everything you need for seamless gaming events</p>
            </div>
            <div className="features-grid">
              {features.map((feature, idx) => (
                <div key={idx} className="feature-card">
                  <span className="feature-icon">{feature.icon}</span>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-text">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'ai' && (
          <div className="content-section">
            <div className="section-header">
              <h2>Meet Your AI Assistant</h2>
              <p>The future of event planning is here</p>
            </div>
            <div className="ai-content">
              {aiCapabilities.map((item, idx) => (
                <div key={idx} className="ai-feature">
                  <div className="ai-icon">{item.icon}</div>
                  <div className="ai-text">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'budget' && (
          <div className="content-section">
            <div className="section-header">
              <h2>Budget Made Simple</h2>
              <p>Take the stress out of splitting costs</p>
            </div>
            <div className="budget-features">
              {budgetSteps.map((step, idx) => (
                <div key={idx} className="budget-item">
                  <div className="budget-number">{idx + 1}</div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'why' && (
          <div className="content-section">
            <div className="section-header">
              <h2>Why The PlayerLobby?</h2>
              <p>The complete solution for gamers</p>
            </div>
            <div className="why-grid">
              {whyChoose.map((item, idx) => (
                <div key={idx} className="why-item">
                  <span className="why-check">✓</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* CTA Footer */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Elevate Your Gaming?</h2>
          <p>Join gamers already using The PlayerLobby to organize their events</p>
          <button className="btn btn-primary btn-large" onClick={() => navigate('/home')}>
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
}