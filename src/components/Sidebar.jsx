import React from 'react';
import { 
  LayoutDashboard, 
  BrainCircuit, 
  History, 
  Info, 
  FileCheck2, 
  Stethoscope, 
  LogOut, 
  ChevronRight,
  Sparkles,
  Database,
  ShieldAlert
} from 'lucide-react';

export default function Sidebar({ 
  currentTab, 
  setCurrentTab, 
  sidebarOpen, 
  setSidebarOpen, 
  onLogout,
  stats
}) {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: 'Live',
      badgeColor: 'bg-teal-500/20 text-teal-300'
    },
    {
      id: 'predict',
      label: 'Predict Parkinson’s',
      icon: BrainCircuit,
      badge: '22 Features',
      badgeColor: 'bg-blue-500/20 text-blue-300'
    },
    {
      id: 'history',
      label: 'Prediction History',
      icon: History,
      badge: stats?.total ? `${stats.total}` : null,
      badgeColor: 'bg-slate-700 text-slate-300'
    },
    {
      id: 'about',
      label: 'About & Symptoms',
      icon: Info,
      badge: null
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed lg:static top-0 bottom-0 left-0 z-40
        w-64 bg-[#0a1022] border-r border-slate-800
        flex flex-col justify-between
        transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Top Section */}
        <div className="p-5">
          {/* Logo badge in sidebar */}
          <div className="flex items-center gap-3 pb-6 mb-6 border-b border-slate-800">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-500 to-blue-600 flex items-center justify-center shadow-md shadow-teal-500/20">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-sm text-white leading-tight">
                NeuroVoice AI
              </h2>
              <p className="text-[11px] text-teal-400 font-medium">
                Parkinson’s Classifier
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-1.5">
            <p className="text-[10px] font-bold text-slate-500 tracking-wider uppercase px-3 mb-2">
              Clinical Workspace
            </p>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold
                    transition-all duration-150 cursor-pointer
                    ${isActive 
                      ? 'bg-gradient-to-r from-teal-500/20 to-blue-500/10 text-teal-300 border border-teal-500/30 shadow-sm shadow-teal-500/10' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-teal-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Metrics Summary in Sidebar */}
          <div className="mt-8 p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-teal-400" />
                Local Session DB
              </span>
              <span className="text-teal-400 font-bold">{stats?.total || 0} Records</span>
            </div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden flex">
              <div 
                className="bg-emerald-500 h-full transition-all duration-500"
                style={{ width: `${stats?.total ? (stats.healthy / stats.total) * 100 : 50}%` }}
                title="Healthy percentage"
              />
              <div 
                className="bg-rose-500 h-full transition-all duration-500"
                style={{ width: `${stats?.total ? (stats.parkinsons / stats.total) * 100 : 50}%` }}
                title="Parkinson's detected percentage"
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 pt-0.5">
              <span className="text-emerald-400">● {stats?.healthy || 0} Healthy</span>
              <span className="text-rose-400">● {stats?.parkinsons || 0} Detected</span>
            </div>
          </div>
        </div>

        {/* Footer info & Logout */}
        <div className="p-4 border-t border-slate-800/80 space-y-3">
          <div className="p-3 bg-teal-500/10 border border-teal-500/20 rounded-xl text-[11px] text-teal-300 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
            <span>Oxford Vocal Biomarker Reference Model (Little et al.)</span>
          </div>

          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-red-400 hover:bg-red-500/10 border border-slate-800 transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out Session</span>
          </button>
        </div>
      </aside>
    </>
  );
}
