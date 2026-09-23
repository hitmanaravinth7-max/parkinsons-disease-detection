import React, { useState } from 'react';
import { Shield, Bell, LogOut, CheckCircle, AlertTriangle, Menu, X, Wifi } from 'lucide-react';

export default function Header({ user, onLogout, activeAlertsCount, onOpenAlerts, isSimulating, onToggleMobileSidebar, mobileSidebarOpen }) {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="h-16 bg-slate-900/90 border-b border-slate-800/80 sticky top-0 z-30 px-4 md:px-6 flex items-center justify-between backdrop-blur-md">
      {/* Brand & Mobile Hamburger */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileSidebar}
          className="p-2 md:hidden text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          title="Toggle Navigation"
        >
          {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-gradient-to-tr from-cyan-500/20 to-blue-600/30 border border-cyan-500/40 rounded-lg shadow-[0_0_12px_rgba(6,182,212,0.3)]">
            <Shield className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-white text-lg tracking-tight">FinGuard <span className="text-cyan-400">AI</span></span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                v2.4 SEC-OPS
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Real-Time Fraud Detection for Digital Transactions
            </p>
          </div>
        </div>
      </div>

      {/* Live System Indicator */}
      <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/60 font-mono text-xs">
        <span className={`w-2 h-2 rounded-full ${isSimulating ? 'bg-emerald-400 animate-pulse-glow' : 'bg-amber-400'}`}></span>
        <span className="text-slate-300">
          {isSimulating ? 'LIVE STREAMING • ANOMALY ENGINE ON' : 'MONITORING PAUSED'}
        </span>
        <span className="text-slate-500">|</span>
        <span className="text-cyan-400 flex items-center gap-1">
          <Wifi className="w-3 h-3" /> 24ms LATENCY
        </span>
      </div>

      {/* Actions: Notifications, Profile, Logout */}
      <div className="flex items-center gap-3">
        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/80 relative transition-colors"
            title="Fraud Notifications"
          >
            <Bell className="w-5 h-5" />
            {activeAlertsCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                {activeAlertsCount > 9 ? '9+' : activeAlertsCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 glass-panel rounded-xl border border-slate-700 shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-2">
                <span className="font-bold text-sm text-white">Live Threat Telemetry</span>
                <span className="text-xs text-rose-400 font-mono">{activeAlertsCount} Active Alerts</span>
              </div>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {activeAlertsCount > 0 ? (
                  <div
                    onClick={() => {
                      setShowNotifications(false);
                      onOpenAlerts();
                    }}
                    className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-400">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      Critical Fraud Anomaly Detected
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                      High risk transaction flagged above threshold. Click to review in Alerts Center.
                    </p>
                  </div>
                ) : (
                  <div className="p-4 text-center text-xs text-slate-400 flex flex-col items-center gap-1">
                    <CheckCircle className="w-6 h-6 text-emerald-400 mb-1" />
                    No unreviewed critical alerts. All incoming packets clear.
                  </div>
                )}
              </div>
              {activeAlertsCount > 0 && (
                <button
                  onClick={() => {
                    setShowNotifications(false);
                    onOpenAlerts();
                  }}
                  className="w-full mt-3 py-1.5 text-center text-xs text-cyan-400 font-semibold hover:underline border-t border-slate-800/80 pt-2"
                >
                  View All Alerts in Incident Center →
                </button>
              )}
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-slate-800">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-600 to-blue-700 flex items-center justify-center text-xs font-bold text-white shadow-inner">
            AV
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-xs font-semibold text-white leading-tight">
              {user?.email?.split('@')[0] || 'Alex Vance'}
            </div>
            <div className="text-[10px] text-cyan-400 font-mono">
              Chief SecOps Analyst
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="p-2 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800/80 transition-colors ml-1"
          title="Logout of FinGuard AI"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
