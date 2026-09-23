import React from 'react';
import { ArrowUpRight, ArrowDownRight, ShieldCheck, AlertTriangle, ShieldAlert, Percent, Gauge, Zap, Info } from 'lucide-react';

export default function DashboardCards({ transactions = [] }) {
  const totalCount = transactions.length || 14892;
  const fraudCount = transactions.filter(t => t.status === 'Fraud' || t.riskLevel === 'High Risk').length;
  const suspiciousCount = transactions.filter(t => t.status === 'Suspicious' || t.riskLevel === 'Medium Risk').length;
  const safeCount = Math.max(0, totalCount - fraudCount - suspiciousCount);

  const fraudPercentage = totalCount > 0 ? ((fraudCount / totalCount) * 100).toFixed(2) : '0.00';
  const averageRisk = totalCount > 0
    ? (transactions.reduce((acc, curr) => acc + (curr.score || 0), 0) / transactions.length).toFixed(1)
    : '24.2';

  const tpm = 184; // Simulated Transactions Per Minute throughput

  const cards = [
    {
      title: 'Total Transactions',
      value: totalCount.toLocaleString(),
      change: '+12.4% vs last hour',
      isPositive: true,
      icon: ShieldCheck,
      color: 'cyan',
      borderGlow: 'border-cyan-500/20'
    },
    {
      title: 'Fraudulent Detected',
      value: fraudCount.toLocaleString(),
      change: `${fraudPercentage}% of volume`,
      isPositive: false,
      icon: ShieldAlert,
      color: 'rose',
      borderGlow: 'border-rose-500/30'
    },
    {
      title: 'Suspicious Flagged',
      value: suspiciousCount.toLocaleString(),
      change: 'Pending SecOps review',
      isPositive: null,
      icon: AlertTriangle,
      color: 'amber',
      borderGlow: 'border-amber-500/20'
    },
    {
      title: 'Fraud Rate',
      value: `${fraudPercentage}%`,
      change: '-0.3% under monthly target',
      isPositive: true,
      icon: Percent,
      color: 'emerald',
      borderGlow: 'border-emerald-500/20'
    },
    {
      title: 'Average Risk Score',
      value: `${averageRisk} / 100`,
      change: 'Normal baseline corridor',
      isPositive: true,
      icon: Gauge,
      color: 'purple',
      borderGlow: 'border-purple-500/20'
    },
    {
      title: 'Real-Time Throughput',
      value: `${tpm} TPM`,
      change: 'Stream ingestion active',
      isPositive: true,
      icon: Zap,
      color: 'blue',
      borderGlow: 'border-blue-500/20'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Simulation Banner Notice (MANDATORY REQUIREMENT) */}
      <div className="p-3 bg-slate-900/70 border border-cyan-500/20 rounded-xl flex items-center justify-between text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>
            <strong className="text-white">Demo / Simulated Model Performance:</strong> Metrics reflect real-time synthetic data generation for evaluation and architectural testing. No real client PII is processed.
          </span>
        </div>
        <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 font-mono text-[10px]">
          CLIENT-SIDE SIMULATION
        </span>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className={`glass-panel p-4 rounded-xl border ${card.borderGlow} hover:border-cyan-500/40 transition-all duration-200 relative overflow-hidden group`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400 font-medium tracking-wide">
                  {card.title}
                </span>
                <div className={`p-2 rounded-lg bg-slate-800/80 text-${card.color}-400 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="text-2xl font-extrabold text-white tracking-tight my-1">
                {card.value}
              </div>

              <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400 mt-2">
                {card.isPositive === true && <ArrowUpRight className="w-3 h-3 text-emerald-400" />}
                {card.isPositive === false && <ArrowDownRight className="w-3 h-3 text-rose-400" />}
                <span>{card.change}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
