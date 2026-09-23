import React, { useState, useEffect, useRef } from 'react';
import Login from './components/Login';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import DashboardCards from './components/DashboardCards';
import RiskRadar from './components/RiskRadar';
import TransactionTable from './components/TransactionTable';
import TransactionForm from './components/TransactionForm';
import FraudAlert from './components/FraudAlert';
import AiEngineSection from './components/AiEngineSection';
import AnalyticsCharts from './components/AnalyticsCharts';
import TransactionDetails from './components/TransactionDetails';
import Settings from './components/Settings';

import { INITIAL_TRANSACTIONS, INITIAL_ALERTS, generateRandomTransaction } from './utils/mockData';

export default function App() {
  // 1. Authentication State with localStorage
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('finguard_auth') || sessionStorage.getItem('finguard_auth');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // 2. Navigation Tab
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // 3. Transactions List
  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem('finguard_transactions');
      return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
    } catch {
      return INITIAL_TRANSACTIONS;
    }
  });

  // 4. Alerts List
  const [alerts, setAlerts] = useState(() => {
    try {
      const saved = localStorage.getItem('finguard_alerts');
      return saved ? JSON.parse(saved) : INITIAL_ALERTS;
    } catch {
      return INITIAL_ALERTS;
    }
  });

  // 5. Settings
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('finguard_settings');
      return saved ? JSON.parse(saved) : {
        fraudThreshold: 70,
        simulationInterval: 2500,
        audioAlerts: true,
        autoStartSimulation: true
      };
    } catch {
      return {
        fraudThreshold: 70,
        simulationInterval: 2500,
        audioAlerts: true,
        autoStartSimulation: true
      };
    }
  });

  // 6. Live Simulation State
  const [isSimulating, setIsSimulating] = useState(true);

  // 7. Modal Inspection
  const [inspectedTx, setInspectedTx] = useState(null);

  // Audio tone generator (Web Audio API - works offline, zero external assets required)
  const playAlertSound = () => {
    if (!settings.audioAlerts) return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime); // High pitch warning
      osc.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.25);
    } catch {
      // AudioContext not allowed or unsupported in restricted env
    }
  };

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('finguard_transactions', JSON.stringify(transactions.slice(0, 100)));
    } catch (e) {
      console.error(e);
    }
  }, [transactions]);

  useEffect(() => {
    try {
      localStorage.setItem('finguard_alerts', JSON.stringify(alerts.slice(0, 30)));
    } catch (e) {
      console.error(e);
    }
  }, [alerts]);

  useEffect(() => {
    try {
      localStorage.setItem('finguard_settings', JSON.stringify(settings));
    } catch (e) {
      console.error(e);
    }
  }, [settings]);

  // Live Transaction Simulation Timer
  useEffect(() => {
    if (!isSimulating || !user) return;

    const intervalTime = settings.simulationInterval || 2500;
    const interval = setInterval(() => {
      const newTx = generateRandomTransaction();

      setTransactions(prev => [newTx, ...prev.slice(0, 80)]);

      // Check if it breaches threshold
      const threshold = settings.fraudThreshold || 70;
      if (newTx.score >= threshold) {
        playAlertSound();
        const newAlert = {
          id: `ALT-${Math.floor(1000 + Math.random() * 9000)}`,
          txId: newTx.id,
          amount: newTx.amount,
          riskScore: newTx.score,
          location: newTx.location,
          reason: newTx.reason,
          timestamp: newTx.time,
          status: 'Active',
          level: 'High'
        };
        setAlerts(prev => [newAlert, ...prev.slice(0, 25)]);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isSimulating, user, settings]);

  // Actions
  const handleLoginSuccess = (userSession) => {
    setUser(userSession);
    setIsSimulating(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('finguard_auth');
    sessionStorage.removeItem('finguard_auth');
    setUser(null);
    setIsSimulating(false);
  };

  const handleMarkAlertReviewed = (alertId) => {
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, status: 'Reviewed' } : a));
  };

  const handleDismissAlert = (alertId) => {
    setAlerts(prev => prev.filter(a => a.id !== alertId));
  };

  const handleViewTransactionFromAlert = (txId) => {
    const found = transactions.find(t => t.id === txId);
    if (found) {
      setInspectedTx(found);
    } else {
      setActiveTab('live-transactions');
    }
  };

  const handleNewAnalyzedTransaction = (analyzedTx) => {
    setTransactions(prev => [analyzedTx, ...prev.slice(0, 80)]);
    const threshold = settings.fraudThreshold || 70;
    if (analyzedTx.score >= threshold) {
      playAlertSound();
      const newAlert = {
        id: `ALT-${Math.floor(1000 + Math.random() * 9000)}`,
        txId: analyzedTx.id,
        amount: analyzedTx.amount,
        riskScore: analyzedTx.score,
        location: analyzedTx.location,
        reason: analyzedTx.reason,
        timestamp: analyzedTx.time,
        status: 'Active',
        level: 'High'
      };
      setAlerts(prev => [newAlert, ...prev]);
    }
  };

  const handleClearFeed = () => {
    setTransactions([]);
  };

  const handleClearAllData = () => {
    if (window.confirm('Are you sure you want to clear all transactions, alerts, and settings?')) {
      localStorage.clear();
      setTransactions([]);
      setAlerts([]);
      alert('All local storage cleared.');
    }
  };

  const handleResetDemoData = () => {
    setTransactions(INITIAL_TRANSACTIONS);
    setAlerts(INITIAL_ALERTS);
    alert('Factory demo data restored.');
  };

  const activeAlertsCount = alerts.filter(a => a.status === 'Active').length;

  // Unauthenticated: render Login Page
  if (!user) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  // Authenticated: render Dashboard Shell
  return (
    <div className="min-h-screen bg-[#070C18] text-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <Header
        user={user}
        onLogout={handleLogout}
        activeAlertsCount={activeAlertsCount}
        onOpenAlerts={() => setActiveTab('fraud-alerts')}
        isSimulating={isSimulating}
        onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        mobileSidebarOpen={mobileSidebarOpen}
      />

      <div className="flex-1 flex">
        {/* Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          activeAlertsCount={activeAlertsCount}
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />

        {/* Main Workspace Area */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6 overflow-y-auto">
          
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Security Pulse / Radar Scanner */}
              <RiskRadar
                transactions={transactions}
                activeAlerts={activeAlertsCount}
                isSimulating={isSimulating}
              />

              {/* Statistics Cards */}
              <DashboardCards transactions={transactions} />

              {/* Live Table Preview & Alerts Preview */}
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                <div className="xl:col-span-8">
                  <TransactionTable
                    transactions={transactions.slice(0, 8)}
                    onViewDetails={setInspectedTx}
                    isSimulating={isSimulating}
                    onToggleSimulation={() => setIsSimulating(!isSimulating)}
                    onClearFeed={handleClearFeed}
                  />
                </div>

                <div className="xl:col-span-4 space-y-4">
                  <div className="glass-panel p-4 rounded-2xl border border-slate-800">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                      <span className="text-sm font-bold text-white">Recent High Risk Alerts</span>
                      <button
                        onClick={() => setActiveTab('fraud-alerts')}
                        className="text-xs text-cyan-400 hover:underline"
                      >
                        View All ({alerts.length})
                      </button>
                    </div>

                    <div className="space-y-2.5">
                      {alerts.slice(0, 3).map(alt => (
                        <div key={alt.id} className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs">
                          <div className="flex justify-between font-mono font-bold text-rose-400">
                            <span>{alt.txId}</span>
                            <span>{alt.riskScore}/100</span>
                          </div>
                          <p className="text-[11px] text-slate-300 mt-1 line-clamp-2">{alt.reason}</p>
                          <div className="flex justify-between items-center text-[10px] text-slate-400 mt-2 font-mono">
                            <span>${Number(alt.amount).toLocaleString()}</span>
                            <span>{alt.location}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Action Analyzer Card */}
                  <div className="glass-panel p-5 rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-950/20 to-slate-900 flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">Custom Payload Scoring</h4>
                      <p className="text-xs text-slate-400 leading-relaxed mb-3">
                        Test custom account numbers, foreign proxies, and frequency velocity parameters against the ML detection gate.
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab('analyze')}
                      className="w-full py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors"
                    >
                      Open Transaction Analyzer →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LIVE TRANSACTIONS */}
          {activeTab === 'live-transactions' && (
            <div className="space-y-4">
              <TransactionTable
                transactions={transactions}
                onViewDetails={setInspectedTx}
                isSimulating={isSimulating}
                onToggleSimulation={() => setIsSimulating(!isSimulating)}
                onClearFeed={handleClearFeed}
              />
            </div>
          )}

          {/* TAB 3: FRAUD ALERTS */}
          {activeTab === 'fraud-alerts' && (
            <FraudAlert
              alerts={alerts}
              onMarkReviewed={handleMarkAlertReviewed}
              onDismissAlert={handleDismissAlert}
              onViewTransaction={handleViewTransactionFromAlert}
            />
          )}

          {/* TAB 4: TRANSACTION ANALYSIS */}
          {activeTab === 'analyze' && (
            <TransactionForm onNewAnalyzedTransaction={handleNewAnalyzedTransaction} />
          )}

          {/* TAB 5: AI DETECTION ENGINE */}
          {activeTab === 'ai-engine' && (
            <AiEngineSection />
          )}

          {/* TAB 6: ANALYTICS */}
          {activeTab === 'analytics' && (
            <AnalyticsCharts transactions={transactions} />
          )}

          {/* TAB 7: SETTINGS */}
          {activeTab === 'settings' && (
            <Settings
              settings={settings}
              onUpdateSettings={setSettings}
              onClearAllData={handleClearAllData}
              onResetDemoData={handleResetDemoData}
            />
          )}

        </main>
      </div>

      {/* Transaction Details Modal */}
      {inspectedTx && (
        <TransactionDetails
          transaction={inspectedTx}
          onClose={() => setInspectedTx(null)}
        />
      )}
    </div>
  );
}
