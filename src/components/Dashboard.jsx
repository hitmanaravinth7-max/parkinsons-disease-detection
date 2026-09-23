import React from 'react';
import { 
  Activity, 
  Brain, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Clock, 
  ArrowRight, 
  ShieldAlert, 
  Sparkles,
  Stethoscope,
  Microscope,
  FileSpreadsheet,
  Info
} from 'lucide-react';

export default function Dashboard({ 
  stats, 
  recentHistory, 
  onNavigateToPredict, 
  onNavigateToHistory,
  onNavigateToAbout 
}) {
  const healthyRate = stats.total > 0 ? Math.round((stats.healthy / stats.total) * 100) : 0;
  const parkinsonsRate = stats.total > 0 ? Math.round((stats.parkinsons / stats.total) * 100) : 0;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700/80 p-6 md:p-8 shadow-xl">
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/15 text-teal-300 border border-teal-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI / ML Based Detection</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Parkinson’s Disease Detection
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Biomedical acoustic classification platform powered by machine learning algorithms. Evaluates 22 phonation parameters including fundamental frequency stability, cycle-to-cycle frequency jitter, amplitude shimmer, noise harmonics, and pitch period entropy.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0">
            <button
              onClick={onNavigateToPredict}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-400 hover:to-blue-500 text-white font-semibold text-sm shadow-lg shadow-teal-500/25 flex items-center gap-2 transition cursor-pointer"
            >
              <Stethoscope className="w-4 h-4" />
              <span>New Voice Prediction</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onNavigateToAbout}
              className="px-4 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition"
            >
              About Disease
            </button>
          </div>
        </div>

        {/* Educational Disclaimer Strip */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs text-amber-300/90 bg-amber-500/10 -mx-6 md:-mx-8 -mb-6 md:-mb-8 px-6 md:px-8 py-2.5">
          <Info className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="font-medium">
            This result is for educational purposes only and is not a medical diagnosis.
          </span>
        </div>
      </div>

      {/* 4 Core Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Predictions */}
        <div className="glass-card rounded-2xl p-5 border border-slate-700/60 bg-slate-900/60 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Total Predictions</span>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Microscope className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-white font-mono tracking-tight">
              {stats.total}
            </span>
            <span className="text-xs text-slate-400 ml-2">Analyzed cases</span>
          </div>
          <div className="mt-3 text-[11px] text-slate-400 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
            <span>Oxford Acoustic Telemetry dataset</span>
          </div>
        </div>

        {/* Healthy Results */}
        <div className="glass-card rounded-2xl p-5 border border-emerald-500/20 bg-slate-900/60 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Healthy Results</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-emerald-400 font-mono tracking-tight">
              {stats.healthy}
            </span>
            <span className="text-xs text-slate-400 ml-2">({healthyRate}%)</span>
          </div>
          <div className="mt-3 text-[11px] text-emerald-300/80 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
            <span>Normal acoustic harmonics</span>
          </div>
        </div>

        {/* Parkinson's Detected */}
        <div className="glass-card rounded-2xl p-5 border border-rose-500/20 bg-slate-900/60 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Parkinson’s Detected</span>
            <div className="w-10 h-10 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-rose-400 font-mono tracking-tight">
              {stats.parkinsons}
            </span>
            <span className="text-xs text-slate-400 ml-2">({parkinsonsRate}%)</span>
          </div>
          <div className="mt-3 text-[11px] text-rose-300/80 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-400 inline-block" />
            <span>Dysphonic biomarker present</span>
          </div>
        </div>

        {/* Average Model Accuracy */}
        <div className="glass-card rounded-2xl p-5 border border-teal-500/20 bg-slate-900/60 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Model Classification</span>
            <div className="w-10 h-10 rounded-xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-400">
              <Brain className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-teal-300 font-mono tracking-tight">
              91.4%
            </span>
            <span className="text-xs text-slate-400 ml-2">SVM / RF Accuracy</span>
          </div>
          <div className="mt-3 text-[11px] text-teal-300/80 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span>22 Acoustic Features</span>
          </div>
        </div>
      </div>

      {/* Grid: Recent Prediction History & Model Diagnostic Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Recent Prediction History */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6 border border-slate-800 bg-slate-900/70">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-400" />
                Recent Prediction History
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Latest voice recording acoustic classifications
              </p>
            </div>
            <button
              onClick={onNavigateToHistory}
              className="text-xs font-semibold text-teal-400 hover:text-teal-300 flex items-center gap-1 transition"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Table / List */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                  <th className="pb-3 pl-2">Patient / Record</th>
                  <th className="pb-3">Timestamp</th>
                  <th className="pb-3">Result</th>
                  <th className="pb-3">Confidence</th>
                  <th className="pb-3">Fo (Hz)</th>
                  <th className="pb-3 text-right pr-2">HNR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {recentHistory.slice(0, 5).map((row) => {
                  const isParkinsons = row.status === 'parkinsons';
                  return (
                    <tr key={row.id} className="hover:bg-slate-800/40 transition">
                      <td className="py-3 pl-2">
                        <div className="font-semibold text-white">{row.patientName || row.id}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{row.id}</div>
                      </td>
                      <td className="py-3 text-slate-300 font-mono text-[11px]">
                        {row.date}
                      </td>
                      <td className="py-3">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                          isParkinsons 
                            ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30' 
                            : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                        }`}>
                          {isParkinsons ? (
                            <>
                              <AlertTriangle className="w-3 h-3 text-rose-400 shrink-0" />
                              <span>Parkinson’s Detected</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                              <span>Healthy</span>
                            </>
                          )}
                        </span>
                      </td>
                      <td className="py-3 font-mono font-bold text-white">
                        {row.confidence}%
                      </td>
                      <td className="py-3 font-mono text-slate-300">
                        {row.fo ? `${Number(row.fo).toFixed(1)} Hz` : '—'}
                      </td>
                      <td className="py-3 text-right pr-2 font-mono text-slate-300">
                        {row.hnr ? `${Number(row.hnr).toFixed(1)} dB` : '—'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 1 Col: Key Diagnostic Biomarkers Card */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 bg-slate-900/70 space-y-5">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-teal-400" />
              Vocal Biomarker Matrix
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Physiological phonation markers evaluated by the ML model
            </p>
          </div>

          <div className="space-y-3.5">
            <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-white">Pitch Period Entropy (PPE)</span>
                <span className="text-teal-400 font-mono font-bold">Weight: 26%</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Measures impaired control of vocal fundamental pitch frequency, a primary hallmark of Parkinsonian hypokinetic dysarthria.
              </p>
            </div>

            <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-white">Spread1 & Spread2</span>
                <span className="text-blue-400 font-mono font-bold">Weight: 22%</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Nonlinear measures of fundamental frequency variation, capturing vocal cord stiffness and chaotic vibratory dynamics.
              </p>
            </div>

            <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-white">Harmonics-to-Noise Ratio (HNR)</span>
                <span className="text-emerald-400 font-mono font-bold">Weight: 18%</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Detects glottal turbulence and incomplete vocal fold closure, leading to breathy or hoarse voice characteristics.
              </p>
            </div>

            <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-white">Jitter & Shimmer Perturbations</span>
                <span className="text-purple-400 font-mono font-bold">Weight: 20%</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Cycle-to-cycle frequency variations (Jitter) and amplitude deviations (Shimmer) indicating sub-harmonic tremors.
              </p>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={onNavigateToPredict}
              className="w-full py-2.5 px-4 bg-teal-500/15 hover:bg-teal-500/25 border border-teal-500/30 text-teal-300 font-semibold rounded-xl text-xs flex items-center justify-center gap-2 transition"
            >
              <span>Test Voice Sample Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
