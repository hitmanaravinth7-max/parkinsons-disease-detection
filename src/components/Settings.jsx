import React, { useState } from 'react';
import { Sliders, Bell, Activity, Moon, RefreshCw, Trash2, CheckCircle2, RotateCcw, ShieldCheck } from 'lucide-react';

export default function Settings({ settings, onUpdateSettings, onClearAllData, onResetDemoData }) {
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleChange = (key, value) => {
    const updated = { ...settings, [key]: value };
    onUpdateSettings(updated);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Sliders className="w-5 h-5 text-cyan-400" />
            Security & Detection Settings
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Configure risk classification thresholds, live stream velocity, and notifications (persisted to localStorage)
          </p>
        </div>

        {saveSuccess && (
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 animate-in fade-in">
            <CheckCircle2 className="w-3.5 h-3.5" /> Saved
          </span>
        )}
      </div>

      <div className="space-y-4">
        
        {/* Fraud Risk Threshold Slider */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h4 className="text-sm font-bold text-white">Fraud Risk Threshold (Critical Alarm)</h4>
              <p className="text-xs text-slate-400">
                Transactions scoring at or above this threshold trigger Critical Fraud Alerts and automated blocking.
              </p>
            </div>
            <span className="text-2xl font-extrabold text-cyan-400 font-mono">
              {settings.fraudThreshold || 70}
            </span>
          </div>

          <div className="pt-2">
            <input
              type="range"
              min="50"
              max="95"
              step="1"
              value={settings.fraudThreshold || 70}
              onChange={e => handleChange('fraudThreshold', Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-1">
              <span>Aggressive (50)</span>
              <span>Default Enterprise (70)</span>
              <span>Conservative (95)</span>
            </div>
          </div>
        </div>

        {/* Live Monitoring & Auto Refresh */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 shadow-xl space-y-4">
          <h4 className="text-sm font-bold text-white">Live Stream & Telemetry Simulation</h4>

          <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
            <div>
              <span className="text-xs font-semibold text-slate-200 block">Simulation Interval (Velocity)</span>
              <span className="text-[11px] text-slate-400">Controls frequency of synthetic transaction generation</span>
            </div>
            <select
              value={settings.simulationInterval || 2500}
              onChange={e => handleChange('simulationInterval', Number(e.target.value))}
              className="px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white font-mono focus:border-cyan-500 focus:outline-none"
            >
              <option value="1200">Fast (1.2 sec)</option>
              <option value="2500">Normal (2.5 sec)</option>
              <option value="5000">Slow (5.0 sec)</option>
            </select>
          </div>

          <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
            <div>
              <span className="text-xs font-semibold text-slate-200 block">Sound FX & Audio Alerts</span>
              <span className="text-[11px] text-slate-400">Play web synthesized audio chime when high-risk transactions are detected</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.audioAlerts ?? true}
                onChange={e => handleChange('audioAlerts', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-cyan-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-200 block">Cyber Dark Mode UI</span>
              <span className="text-[11px] text-slate-400">SecOps high-contrast fintech dark palette (Active by default)</span>
            </div>
            <span className="px-2.5 py-1 rounded bg-slate-800 text-cyan-400 text-xs font-mono border border-slate-700">
              Cyberpunk Dark (Locked)
            </span>
          </div>
        </div>

        {/* Data Reset & Storage Management */}
        <div className="glass-panel p-5 rounded-2xl border border-rose-500/20 shadow-xl space-y-4">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Trash2 className="w-4 h-4 text-rose-400" />
            Data Persistence & Reset Options
          </h4>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
            <div>
              <span className="text-xs font-semibold text-slate-200 block">Reset to Factory Demo Seed</span>
              <span className="text-[11px] text-slate-400">Restores standard initial transactions and baseline alerts</span>
            </div>
            <button
              onClick={onResetDemoData}
              className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 hover:border-cyan-500/30 text-xs font-mono flex items-center gap-1.5 transition-colors self-start sm:self-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Default Seed
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-semibold text-rose-300 block">Purge All Live Data</span>
              <span className="text-[11px] text-slate-400">Clears all transaction logs, alert queues, and local session caches</span>
            </div>
            <button
              onClick={onClearAllData}
              className="px-3.5 py-2 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-mono flex items-center gap-1.5 transition-colors self-start sm:self-auto"
            >
              <Trash2 className="w-3.5 h-3.5" /> Purge Local Storage
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
