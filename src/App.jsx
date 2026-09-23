import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import PredictionPage from './components/PredictionPage';
import PredictionHistory from './components/PredictionHistory';
import About from './components/About';
import Login from './components/Login';
import { INITIAL_PREDICTION_HISTORY } from './utils/parkinsonsEngine';

export default function App() {
  // Authentication state
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('parkinsons_auth_user') || sessionStorage.getItem('parkinsons_auth_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  // Current active view: 'dashboard' | 'predict' | 'history' | 'about'
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Persistent history state initialized from localStorage
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('parkinsons_prediction_history');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error("Failed to load history from localStorage", e);
    }
    return INITIAL_PREDICTION_HISTORY;
  });

  // Save history on changes
  useEffect(() => {
    try {
      localStorage.setItem('parkinsons_prediction_history', JSON.stringify(history));
    } catch (e) {
      console.error("Failed to save history to localStorage", e);
    }
  }, [history]);

  // Compute live statistics
  const stats = {
    total: history.length,
    healthy: history.filter(item => item.status === 'healthy').length,
    parkinsons: history.filter(item => item.status === 'parkinsons').length
  };

  // Login handler
  const handleLoginSuccess = (authUser) => {
    setUser(authUser);
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('parkinsons_auth_user');
    sessionStorage.removeItem('parkinsons_auth_user');
    setUser(null);
  };

  // Add new prediction result to history
  const handlePredictionComplete = (newResult) => {
    setHistory(prev => [newResult, ...prev]);
  };

  // Delete a specific record from history
  const handleDeleteRecord = (recordId) => {
    setHistory(prev => prev.filter(item => item.id !== recordId));
  };

  // Clear all history
  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to clear all prediction history records?")) {
      setHistory([]);
    }
  };

  // If user is not authenticated, display clean Login Screen
  if (!user) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-[#0b1329] text-slate-100 flex flex-col font-sans selection:bg-teal-500 selection:text-white">
      {/* Top Application Bar */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        user={user}
        onLogout={handleLogout}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        stats={stats}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Left Navigation Sidebar */}
        <Sidebar
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          onLogout={handleLogout}
          stats={stats}
        />

        {/* Main Workspace Area */}
        <main className="flex-1 overflow-y-auto px-4 py-6 md:px-8 md:py-8">
          {currentTab === 'dashboard' && (
            <Dashboard
              stats={stats}
              recentHistory={history}
              onNavigateToPredict={() => setCurrentTab('predict')}
              onNavigateToHistory={() => setCurrentTab('history')}
              onNavigateToAbout={() => setCurrentTab('about')}
            />
          )}

          {currentTab === 'predict' && (
            <PredictionPage
              onPredictionComplete={handlePredictionComplete}
            />
          )}

          {currentTab === 'history' && (
            <PredictionHistory
              history={history}
              onClearHistory={handleClearHistory}
              onDeleteRecord={handleDeleteRecord}
              onSelectRecord={() => setCurrentTab('predict')}
            />
          )}

          {currentTab === 'about' && (
            <About
              onNavigateToPredict={() => setCurrentTab('predict')}
            />
          )}
        </main>
      </div>
    </div>
  );
}
