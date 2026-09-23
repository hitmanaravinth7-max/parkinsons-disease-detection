import React from 'react';
import { 
  Activity, 
  Stethoscope, 
  User, 
  LogOut, 
  Menu, 
  X, 
  FileText, 
  History, 
  LayoutDashboard, 
  BrainCircuit, 
  Info,
  Sparkles
} from 'lucide-react';

export default function Header({ 
  currentTab, 
  setCurrentTab, 
  user, 
  onLogout, 
  sidebarOpen, 
  setSidebarOpen,
  stats 
}) {
  return (
    <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 lg:px-8 py-3.5 flex items-center justify-between">
      {/* Left: Mobile hamburger & Logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition"
          aria-label="Toggle navigation"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <div 
          onClick={() => setCurrentTab('dashboard')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-blue-600 flex items-center justify-center shadow-md shadow-teal-500/20 group-hover:scale-105 transition">
            <Stethoscope className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base text-white tracking-tight leading-none group-hover:text-teal-300 transition">
                Parkinson’s Disease Detection
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                <Sparkles className="w-2.5 h-2.5" /> AI/ML
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              Vocal Biomarker Clinical Acoustic Analysis
            </p>
          </div>
        </div>
      </div>

      {/* Center Desktop Navigation Quick Links */}
      <nav className="hidden md:flex items-center gap-1 bg-slate-800/60 p-1 rounded-xl border border-slate-700/60">
        <button
          onClick={() => setCurrentTab('dashboard')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
            currentTab === 'dashboard' 
              ? 'bg-teal-500 text-white shadow-sm' 
              : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
          }`}
        >
          <LayoutDashboard className="w-3.5 h-3.5" />
          Dashboard
        </button>
        <button
          onClick={() => setCurrentTab('predict')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
            currentTab === 'predict' 
              ? 'bg-teal-500 text-white shadow-sm' 
              : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
          }`}
        >
          <BrainCircuit className="w-3.5 h-3.5" />
          Predict Voice
        </button>
        <button
          onClick={() => setCurrentTab('history')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
            currentTab === 'history' 
              ? 'bg-teal-500 text-white shadow-sm' 
              : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
          }`}
        >
          <History className="w-3.5 h-3.5" />
          History
          {stats?.total > 0 && (
            <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-slate-900 text-teal-300 font-mono">
              {stats.total}
            </span>
          )}
        </button>
        <button
          onClick={() => setCurrentTab('about')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
            currentTab === 'about' 
              ? 'bg-teal-500 text-white shadow-sm' 
              : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
          }`}
        >
          <Info className="w-3.5 h-3.5" />
          About
        </button>
      </nav>

      {/* Right User Profile & Logout */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex flex-col text-right">
          <span className="text-xs font-bold text-white leading-tight">
            {user?.name || 'Dr. Clinical Lead'}
          </span>
          <span className="text-[10px] text-teal-400">
            {user?.role || 'Medical Neurologist'}
          </span>
        </div>

        <div className="w-8 h-8 rounded-full bg-slate-800 border border-teal-500/30 flex items-center justify-center text-teal-300">
          <User className="w-4 h-4" />
        </div>

        <button
          onClick={onLogout}
          title="Sign out of session"
          className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition"
          aria-label="Logout"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
