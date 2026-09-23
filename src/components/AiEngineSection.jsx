import React, { useState } from 'react';
import { BrainCircuit, Cpu, Layers, GitMerge, Sliders, CheckCircle2, ArrowRight, ShieldCheck, Terminal, Code2 } from 'lucide-react';

export default function AiEngineSection() {
  const [sliderWeight, setSliderWeight] = useState(50); // 50% IF, 50% XGBoost

  const featureWeights = [
    { feature: 'Velocity Spike (Haversine Distance / Time Delta)', importance: 0.28, type: 'Isolation Forest' },
    { feature: 'Amount Z-Score vs. 30-Day Account Baseline', importance: 0.24, type: 'XGBoost Supervised' },
    { feature: 'Geographic IP Proxy / Tor Exit Node Match', importance: 0.19, type: 'Rule / XGBoost' },
    { feature: 'Device Fingerprint Novelty / Browser Drift', importance: 0.14, type: 'Isolation Forest' },
    { feature: 'Account Tenure < 14 Days with High Inflow', importance: 0.09, type: 'XGBoost Supervised' },
    { feature: 'Circadian Execution Hour (Nocturnal Burst)', importance: 0.06, type: 'Temporal Heuristic' },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-cyan-400" />
              AI Detection Engine
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
              Demo Simulation
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
              Ready for ML API Integration
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Enterprise Hybrid Architecture combining Unsupervised Anomaly Detection with Supervised Gradient Boosted Classification.
          </p>
        </div>
      </div>

      {/* Visual Pipeline Flowchart Diagram */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 shadow-xl">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono mb-4 flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          Hybrid ML Decision Architecture Flow
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          
          {/* Step 1: Ingestion & Feature Engineering */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/60 relative">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs mb-3">
              01
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Payload Ingestion</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Stream ingestion of 42 behavioral & transactional features: velocity, geo-IP, account age, amount standard deviation.
            </p>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
              Sub-5ms Preprocessing
            </span>
          </div>

          {/* Step 2: Dual Model Engine */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-blue-500/40 relative shadow-[0_0_15px_rgba(59,130,246,0.1)]">
            <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs mb-3">
              02
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Dual-Engine Inference</h4>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="p-2 rounded bg-slate-950/60 border border-slate-800">
                <span className="font-semibold text-cyan-300 block">1. Isolation Forest</span>
                <span className="text-[11px] text-slate-400">Unsupervised zero-day outlier anomaly detection</span>
              </div>
              <div className="p-2 rounded bg-slate-950/60 border border-slate-800">
                <span className="font-semibold text-blue-300 block">2. XGBoost Classifier</span>
                <span className="text-[11px] text-slate-400">Supervised classification against known fraud vectors</span>
              </div>
            </div>
          </div>

          {/* Step 3: Hybrid Fusion */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-purple-500/40 relative">
            <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs mb-3">
              03
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Hybrid Risk Fusion</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Dynamic ensemble blending scores from both algorithms plus real-time heuristic rule gates:
            </p>
            <div className="p-2 rounded bg-slate-950 font-mono text-[11px] text-purple-300 border border-purple-900/50">
              Score = w₁·IF + w₂·XGB + Heuristics
            </div>
          </div>

          {/* Step 4: Decision Gate */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-emerald-500/40 relative">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs mb-3">
              04
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Decision Classification</h4>
            <div className="space-y-1.5 text-xs font-mono mt-2">
              <div className="flex justify-between items-center p-1.5 rounded bg-emerald-950/30 text-emerald-300 border border-emerald-900/40">
                <span>0–29: LOW RISK</span>
                <span className="text-[10px]">Auto-Approve</span>
              </div>
              <div className="flex justify-between items-center p-1.5 rounded bg-amber-950/30 text-amber-300 border border-amber-900/40">
                <span>30–69: SUSPICIOUS</span>
                <span className="text-[10px]">MFA Step-Up</span>
              </div>
              <div className="flex justify-between items-center p-1.5 rounded bg-rose-950/30 text-rose-300 border border-rose-900/40">
                <span>70–100: CRITICAL</span>
                <span className="text-[10px]">Instant Block</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Feature Importance Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              Simulated Feature Importance Weightings
            </h4>
            <span className="text-[10px] font-mono text-slate-500 uppercase">SHAP Value Ranking</span>
          </div>

          <div className="space-y-3 pt-2">
            {featureWeights.map((f, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium">{f.feature}</span>
                  <span className="font-mono text-cyan-400">{(f.importance * 100).toFixed(0)}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                    style={{ width: `${f.importance * 100}%` }}
                  />
                </div>
                <div className="text-[10px] text-slate-500 font-mono">{f.type}</div>
              </div>
            ))}
          </div>
        </div>

        {/* API Integration Blueprint */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                Ready for ML Microservice REST API
              </h4>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                POST /v1/detect-fraud
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-3">
              To connect your real Python FastAPI / Triton model server, set your endpoint in Settings or configure the client wrapper:
            </p>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-[11px] text-slate-300 overflow-x-auto leading-relaxed">
              <span className="text-slate-500">// Example Python FastAPI Payload Contract</span><br />
              <span className="text-cyan-400">async def</span> <span className="text-yellow-300">score_transaction</span>(tx: TransactionPayload):<br />
              &nbsp;&nbsp;features = feature_pipeline.transform(tx)<br />
              &nbsp;&nbsp;anomaly_score = iforest.score_samples(features)<br />
              &nbsp;&nbsp;fraud_prob = xgb_model.predict_proba(features)[:, 1]<br />
              &nbsp;&nbsp;hybrid_score = (0.4 * anomaly_score) + (0.6 * fraud_prob)<br />
              &nbsp;&nbsp;<span className="text-cyan-400">return</span> &#123;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-emerald-400">"risk_score"</span>: int(hybrid_score * 100),<br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-emerald-400">"status"</span>: <span className="text-yellow-300">"Fraud"</span> <span className="text-cyan-400">if</span> hybrid_score &gt;= 0.70 <span className="text-cyan-400">else</span> <span className="text-yellow-300">"Safe"</span><br />
              &nbsp;&nbsp;&#125;
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Latency Target: &lt; 35ms</span>
            <span className="text-cyan-400 font-mono">Zero External DB Needed for Demo</span>
          </div>
        </div>

      </div>
    </div>
  );
}
