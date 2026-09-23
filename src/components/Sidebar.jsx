import React from 'react';
import {
  LayoutDashboard,
  Activity,
  AlertOctagon,
  SearchCode,
  BrainCircuit,
  BarChart3,
  Settings as SettingsIcon,
  ShieldAlert
} from 'lucide-react';

export default function Sidebar({ activeTab, onSelectTab, activeAlertsCount, mobileOpen, onCloseMobile }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'live-transactions', label: 'Live Transactions', icon: Activity },
    { id: 'fraud-alerts', label: 'Fraud Alerts', icon: AlertOctagon, badge: activeAlertsCount },
    { id: 'analyze', label: 'Transaction Analysis', icon: SearchCode },
    { id: 'ai-engine', label: 'AI Detection Engine', icon: BrainCircuit, tag: 'ML' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:sticky top-16 left-0 z-40 md:z-20 h-[calc(100vh-4rem)] w-64 bg-slate-900/95 border-r border-slate-800/80 p-4 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="space-y-6">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 px-3">
            Core Surveillance
          </div>

          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    if (onCloseMobile) onCloseMobile();
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all group ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/10 text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {item.tag && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-blue-500/20 text-blue-300 border border-blue-500/30">
                        {item.tag}
                      </span>
                    )}
                    {item.badge > 0 && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white animate-pulse">
                        {item.badge}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Security Shield Status Box */}
        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs space-y-2">
          <div className="flex items-center gap-2 text-cyan-400 font-semibold">
            <ShieldAlert className="w-4 h-4 text-cyan-400" />
            <span>Telemetry Status</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Multi-model voting layer online. Zero data drift detected in current session.
          </p>
          <div className="pt-1 flex items-center justify-between font-mono text-[10px] text-slate-500">
            <span>HEURISTIC GATE</span>
            <span className="text-emerald-400">NOMINAL</span>
          </div>
        </div>
      </aside>
    </>
  );
}
