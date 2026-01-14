import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { PortfolioProvider } from './context/PortfolioContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/Auth/ProtectedRoute';

// Components
import Navbar from './components/Header/Navbar';
import HeroSection from './components/About/HeroSection';
import SkillsSection from './components/Skills/SkillsSection';
import ProjectsGrid from './components/Projects/ProjectsGrid';
import ContactFooter from './components/Contact/ContactFooter';
import AdminDashboard from './components/Admin/AdminDashboard';
import Login from './components/Auth/Login';

// Public Home Page
const Home = () => (
  <div className="app-container">
    <Navbar />
    <section id="about"><HeroSection /></section>
    <section id="skills"><SkillsSection /></section>
    <section id="projects"><ProjectsGrid /></section>
    <section id="contact"><ContactFooter /></section>
  </div>
);

// Defaulting to 'admin' so you can see the login page immediately.
// You can change this back to 'viewer' later or use .env
const MODE = process.env.REACT_APP_MODE || 'admin';

function App() {
  return (
    <AuthProvider>
      <PortfolioProvider>
        <Router>
          <Routes>
            {MODE === 'viewer' && (
              <>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </>
            )}

            {MODE === 'admin' && (
              <>
                <Route path="/login" element={<Login />} />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                {/* Redirect root to admin in admin mode, or keep it separate */}
                <Route path="/" element={<Navigate to="/admin" replace />} />
                <Route path="*" element={<Navigate to="/admin" replace />} />
              </>
            )}
          </Routes>
        </Router>
      </PortfolioProvider>
    </AuthProvider>
  );
}

export default App;