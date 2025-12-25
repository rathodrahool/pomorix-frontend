
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Layout from './components/Layout';
import { API_CONFIG } from './constants/config';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Show login by default

  return (
    <GoogleOAuthProvider clientId={API_CONFIG.googleClientId}>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />

          <Route
            path="/"
            element={isAuthenticated ? <Layout /> : <Navigate to="/login" />}
          >
            <Route index element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </HashRouter>
    </GoogleOAuthProvider>
  );
};

export default App;
