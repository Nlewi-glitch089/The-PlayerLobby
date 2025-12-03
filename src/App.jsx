import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import About from './pages/About';
import Home from './pages/Home';
import Lobbies from './pages/Lobbies';
import LobbyDetails from './pages/LobbyDetails';
import Budget from './pages/Budget';
import Friends from './pages/Friends';
import Settings from './pages/Settings';

function App() {
  useEffect(() => {
    // Load saved theme on app mount IMMEDIATELY
    const savedSettings = localStorage.getItem('playerlobby_settings');
    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings);
        if (!settings.darkMode) {
          // Light mode is enabled
          document.documentElement.setAttribute('data-theme', 'light');
        } else {
          // Dark mode - remove the attribute
          document.documentElement.removeAttribute('data-theme');
        }
      } catch (e) {
        console.error('Error loading theme:', e);
      }
    }
  }, []); // Run once on mount

  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/home" element={<Home />} />
        <Route path="/lobbies" element={<Lobbies />} />
        <Route path="/lobbies/:id" element={<LobbyDetails />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;