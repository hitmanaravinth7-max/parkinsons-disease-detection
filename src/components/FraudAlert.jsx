import React from 'react';
import { AlertTriangle, CheckCircle, X, ShieldAlert, Eye, Clock, MapPin, DollarSign } from 'lucide-react';

export default function FraudAlert({
  alerts = [],
  onMarkReviewed,
  onDismissAlert,
  onViewTransaction
}) {
  const activeAlerts = alerts.filter(a => a.status !== 'Dismissed');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-500" />
            Live Fraud Alerts Panel
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time critical security alerts triggered by multi-vector anomaly scores exceeding threshold (≥70)
          </p>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
          {activeAlerts.length} Active Incidents
        </span>
      </div>

      {activeAlerts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeAlerts.map(alert => (
            <div
              key={alert.id}
              className={`glass-panel p-5 rounded-2xl border transition-all ${
                alert.status === 'Reviewed'
                  ? 'border-slate-800 opacity-75'
                  : 'border-rose-500/40 bg-gradient-to-br from-rose-950/20 to-slate-900/80 shadow-[0_0_20px_rgba(244,63,94,0.15)]'
              }`}
            >
              {/* Header Info */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-white uppercase block">
                      Fraud Alert #{alert.id}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      Tx: {alert.txId}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-lg font-extrabold text-rose-400 font-mono">
                    {alert.riskScore}/100
                  </span>
                  <span className="block text-[10px] font-mono uppercase text-slate-500">Risk Score</span>
                </div>
              </div>

              {/* Body Details */}
              <div className="py-3.5 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-1.5 text-slate-400 font-mono">
                    <DollarSign className="w-3.5 h-3.5 text-cyan-400" /> Amount:
                  </span>
                  <span className="font-bold text-white font-mono">
                    ${Number(alert.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-1.5 text-slate-400 font-mono">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" /> Location:
                  </span>
                  <span className="font-semibold text-slate-200">
                    {alert.location}
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-1.5 text-slate-400 font-mono">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" /> Timestamp:
                  </span>
                  <span className="font-mono text-slate-300">
                    {alert.timestamp}
                  </span>
                </div>

                <div className="pt-2">
                  <span className="text-[11px] font-mono uppercase text-slate-400 block mb-1">
                    Trigger Reason:
                  </span>
                  <p className="text-[11px] text-rose-200/90 leading-relaxed bg-rose-950/40 p-2.5 rounded-lg border border-rose-800/40">
                    {alert.reason}
                  </p>
                </div>
              </div>

              {/* Status and Action Buttons */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                <span className="text-[11px] font-mono text-slate-400">
                  Status: <strong className={alert.status === 'Reviewed' ? 'text-cyan-400' : 'text-amber-400'}>{alert.status || 'Active'}</strong>
                </span>

                <div className="flex items-center gap-1.5">
                  {alert.status !== 'Reviewed' && (
                    <button
                      onClick={() => onMarkReviewed(alert.id)}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-300 border border-slate-700 text-xs flex items-center gap-1 transition-colors"
                      title="Mark as Reviewed by SecOps"
                    >
                      <CheckCircle className="w-3 h-3" /> Reviewed
                    </button>
                  )}

                  <button
                    onClick={() => onViewTransaction(alert.txId)}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-slate-700 text-xs flex items-center gap-1 transition-colors"
                    title="View Full Transaction Dossier"
                  >
                    <Eye className="w-3 h-3" /> View
                  </button>

                  <button
                    onClick={() => onDismissAlert(alert.id)}
                    className="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                    title="Dismiss Alert"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="glass-panel p-12 rounded-2xl border border-slate-800 text-center">
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-3">
            <CheckCircle className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white mb-1">Incident Queue Clear</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            No active high-risk alerts require intervention. Start Live Monitoring or execute a high-risk test in Transaction Analysis to trigger live fraud alerts.
          </p>
        </div>
      )}
    </div>
  );
}
