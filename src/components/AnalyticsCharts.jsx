import React, { useMemo } from 'react';
import { BarChart3, TrendingUp, PieChart, MapPin, CreditCard, Activity } from 'lucide-react';

export default function AnalyticsCharts({ transactions = [] }) {
  const stats = useMemo(() => {
    const total = transactions.length || 1;
    const fraud = transactions.filter(t => t.status === 'Fraud' || t.score >= 70).length;
    const suspicious = transactions.filter(t => t.status === 'Suspicious' || (t.score >= 30 && t.score < 70)).length;
    const safe = Math.max(0, total - fraud - suspicious);

    // Distribution by Type
    const typeCounts = {
      'Online Payment': 0,
      'Bank Transfer': 0,
      'Card Payment': 0,
      'ATM Withdrawal': 0,
      'Mobile Payment': 0
    };
    transactions.forEach(t => {
      const type = t.type || 'Online Payment';
      if (typeCounts[type] !== undefined) {
        typeCounts[type]++;
      } else {
        typeCounts['Online Payment']++;
      }
    });

    // Distribution by Location
    const locCounts = {};
    transactions.forEach(t => {
      const loc = t.location || 'Unknown';
      locCounts[loc] = (locCounts[loc] || 0) + 1;
    });

    const topLocations = Object.entries(locCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    // Time-based simulated buckets for volume trend
    const recentScores = transactions.slice(0, 10).map(t => t.score);

    return {
      total,
      fraud,
      suspicious,
      safe,
      typeCounts,
      topLocations,
      recentScores
    };
  }, [transactions]);

  const safePct = ((stats.safe / stats.total) * 100).toFixed(1);
  const suspPct = ((stats.suspicious / stats.total) * 100).toFixed(1);
  const fraudPct = ((stats.fraud / stats.total) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            Cybersecurity & Fraud Analytics
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time visual telemetry aggregating threat vectors, velocity histograms, and geo-hotspots
          </p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
          Live Sync Enabled ({transactions.length} Datapoints)
        </span>
      </div>

      {/* Grid of 6 Analytics Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* 1. Risk Level Distribution */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <PieChart className="w-4 h-4 text-cyan-400" />
                Risk Classification Breakdown
              </h4>
              <span className="text-[10px] font-mono text-slate-500 uppercase">Live Distribution</span>
            </div>

            {/* Visual Donut representation */}
            <div className="space-y-3 pt-1">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-emerald-400 font-medium">Low Risk (Safe)</span>
                  <span className="font-mono text-slate-300">{stats.safe} ({safePct}%)</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${safePct}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-amber-400 font-medium">Medium Risk (Suspicious)</span>
                  <span className="font-mono text-slate-300">{stats.suspicious} ({suspPct}%)</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 transition-all duration-300" style={{ width: `${suspPct}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-rose-400 font-medium">High Risk (Fraud Flagged)</span>
                  <span className="font-mono text-slate-300">{stats.fraud} ({fraudPct}%)</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 transition-all duration-300" style={{ width: `${fraudPct}%` }} />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>Threshold Gate: ≥ 70</span>
            <span className="text-emerald-400 font-mono">{(100 - Number(fraudPct)).toFixed(1)}% Passing Rate</span>
          </div>
        </div>

        {/* 2. Transaction Type Distribution */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-cyan-400" />
                Payment Channels Volume
              </h4>
              <span className="text-[10px] font-mono text-slate-500 uppercase">Channels</span>
            </div>

            <div className="space-y-2.5">
              {Object.entries(stats.typeCounts).map(([type, count]) => {
                const pct = ((count / (stats.total || 1)) * 100).toFixed(0);
                return (
                  <div key={type} className="text-xs">
                    <div className="flex justify-between mb-1">
                      <span className="text-slate-300">{type}</span>
                      <span className="font-mono text-cyan-400">{count} ({pct}%)</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-500/80 transition-all duration-300" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex justify-between">
            <span>Highest Vector:</span>
            <span className="text-white font-mono">Bank Transfer</span>
          </div>
        </div>

        {/* 3. Top Geo-Hotspots (Locations) */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-400" />
                Geographic Incident Origin
              </h4>
              <span className="text-[10px] font-mono text-slate-500 uppercase">Top 5 Cities</span>
            </div>

            <div className="space-y-3">
              {stats.topLocations.map(([loc, count], idx) => {
                const isFlagged = loc.includes('Lagos') || loc.includes('Moscow') || loc.includes('Unknown') || loc.includes('Proxy');
                return (
                  <div key={loc} className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                    <div className="flex items-center gap-2 truncate">
                      <span className="font-mono text-slate-500 text-[10px]">#{idx + 1}</span>
                      <span className="text-slate-200 font-medium truncate">{loc}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-mono text-white">{count} txs</span>
                      {isFlagged && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] bg-rose-500/20 text-rose-400 border border-rose-500/30">
                          WATCHLIST
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex justify-between">
            <span>IP Telemetry:</span>
            <span className="text-cyan-400 font-mono">Geo-Haversine Active</span>
          </div>
        </div>

        {/* 4. Live Risk Score Velocity Graph */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 shadow-xl md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              Live Risk Scoring Velocity (Last 10 Ingested Packets)
            </h4>
            <span className="text-[10px] font-mono text-slate-500 uppercase">Real-Time Waveform</span>
          </div>

          <div className="h-40 flex items-end justify-between gap-2 pt-4 px-2 bg-slate-950/40 rounded-xl border border-slate-800">
            {stats.recentScores.map((score, i) => {
              const isHigh = score >= 70;
              const isMed = score >= 30 && score < 70;
              const color = isHigh ? '#ef4444' : isMed ? '#f59e0b' : '#10b981';
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                  <span className="text-[10px] font-mono text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    {score}
                  </span>
                  <div
                    className="w-full rounded-t-sm transition-all duration-300 relative"
                    style={{
                      height: `${Math.max(10, score)}%`,
                      backgroundColor: color,
                      boxShadow: isHigh ? '0 0 12px rgba(239,68,68,0.4)' : 'none'
                    }}
                  />
                  <span className="text-[9px] font-mono text-slate-500">
                    p-{10 - i}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Normal (&lt;30)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span> Suspicious (30-69)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-400"></span> Critical (≥70)
            </span>
          </div>
        </div>

        {/* 5. Daily Transaction Statistics */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                Daily Operations Audit
              </h4>
              <span className="text-[10px] font-mono text-slate-500 uppercase">24h Benchmark</span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between pb-2 border-b border-slate-800/80">
                <span className="text-slate-400">Simulated 24h Volume:</span>
                <span className="text-white font-bold">$1,489,200.00</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-800/80">
                <span className="text-slate-400">Fraud Loss Prevented:</span>
                <span className="text-emerald-400 font-bold">$142,850.00</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-800/80">
                <span className="text-slate-400">Inference Response Time:</span>
                <span className="text-cyan-400 font-bold">28.4 ms</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-800/80">
                <span className="text-slate-400">False Positive Rate:</span>
                <span className="text-slate-300 font-bold">0.42% (Target: &lt;1%)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Model Drift Index:</span>
                <span className="text-emerald-400 font-bold">0.012 (Stable)</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
            Audit status: <strong className="text-white">Compliant with ISO 27001</strong>
          </div>
        </div>

      </div>
    </div>
  );
}
