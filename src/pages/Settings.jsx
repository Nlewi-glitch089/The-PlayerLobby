import { useState, useEffect } from 'react';
import './Settings.css';

export default function Settings() {
  const [settings, setSettings] = useState({
    notifications: true,
    emailNotifications: true,
    privateProfile: false,
    darkMode: true
  });

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('playerlobby_settings');
    if (savedSettings) {
      const loaded = JSON.parse(savedSettings);
      setSettings(loaded);
      applyTheme(loaded.darkMode);
    } else {
      // Apply default theme (dark mode)
      applyTheme(true);
    }
  }, []);

  // Apply theme to document
  const applyTheme = (isDarkMode) => {
    if (isDarkMode) {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  };

  const handleToggle = (key) => {
    const updated = { ...settings, [key]: !settings[key] };
    setSettings(updated);
    localStorage.setItem('playerlobby_settings', JSON.stringify(updated));
    
    // Apply theme change if it's the dark mode toggle
    if (key === 'darkMode') {
      applyTheme(updated.darkMode);
    }
  };

  return (
    <div className="settings-container">
      <div className="bg-glow"></div>
      
      <section className="settings-header">
        <h1>Settings</h1>
        <p>Manage your preferences and account</p>
      </section>

      <section className="settings-content">
        <div className="settings-card">
          <h2>Notifications</h2>
          <div className="setting-item">
            <div className="setting-info">
              <h3>Push Notifications</h3>
              <p>Get alerts for lobbies and friend requests</p>
            </div>
            <div className="toggle-switch">
              <input 
                type="checkbox" 
                id="notif-toggle"
                checked={settings.notifications}
                onChange={() => handleToggle('notifications')}
              />
              <label htmlFor="notif-toggle"><span></span></label>
            </div>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <h3>Email Notifications</h3>
              <p>Receive email updates about your account</p>
            </div>
            <div className="toggle-switch">
              <input 
                type="checkbox" 
                id="email-toggle"
                checked={settings.emailNotifications}
                onChange={() => handleToggle('emailNotifications')}
              />
              <label htmlFor="email-toggle"><span></span></label>
            </div>
          </div>
        </div>

        <div className="settings-card">
          <h2>Privacy</h2>
          <div className="setting-item">
            <div className="setting-info">
              <h3>Private Profile</h3>
              <p>Only approved friends can see your profile</p>
            </div>
            <div className="toggle-switch">
              <input 
                type="checkbox" 
                id="private-toggle"
                checked={settings.privateProfile}
                onChange={() => handleToggle('privateProfile')}
              />
              <label htmlFor="private-toggle"><span></span></label>
            </div>
          </div>
        </div>

        <div className="settings-card">
          <h2>Display</h2>
          <div className="setting-item">
            <div className="setting-info">
              <h3>Dark Mode</h3>
              <p>{settings.darkMode ? 'Currently enabled' : 'Currently disabled'}</p>
            </div>
            <div className="toggle-switch">
              <input 
                type="checkbox" 
                id="dark-mode-toggle"
                checked={settings.darkMode}
                onChange={() => handleToggle('darkMode')}
              />
              <label htmlFor="dark-mode-toggle"><span></span></label>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
