import React from 'react';
import { X, ShieldAlert, ShieldCheck, AlertTriangle, MapPin, Laptop, Clock, DollarSign, UserCheck, Lock, ExternalLink, Download } from 'lucide-react';

export default function TransactionDetails({ transaction, onClose }) {
  if (!transaction) return null;

  const isFraud = transaction.status === 'Fraud' || transaction.score >= 70;
  const isSuspicious = transaction.status === 'Suspicious' || (transaction.score >= 30 && transaction.score < 70);

  const downloadAuditReport = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(transaction, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `FinGuard-Audit-${transaction.id}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="glass-panel p-6 rounded-2xl max-w-2xl w-full border border-slate-700 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${
              isFraud
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                : isSuspicious
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
            }`}>
              {isFraud ? <ShieldAlert className="w-6 h-6" /> : isSuspicious ? <AlertTriangle className="w-6 h-6" /> : <ShieldCheck className="w-6 h-6" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white font-mono">{transaction.id}</h3>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                  isFraud ? 'bg-rose-500/20 text-rose-400' : isSuspicious ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'
                }`}>
                  {transaction.status}
                </span>
              </div>
              <p className="text-xs text-slate-400">Forensic Telemetry & AI Risk Inspection</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            title="Close Dossier"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Risk Score Spotlight */}
        <div className="my-5 p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-mono text-slate-400 uppercase">Calculated Fraud Risk Score</span>
            <div className="text-3xl font-extrabold mt-0.5 font-mono" style={{
              color: isFraud ? '#ef4444' : isSuspicious ? '#f59e0b' : '#10b981'
            }}>
              {transaction.score}<span className="text-base text-slate-500">/100</span>
            </div>
            <div className="text-xs font-semibold text-slate-300 mt-1">
              Risk Level: <span className="text-white">{transaction.riskLevel || (isFraud ? 'High Risk' : isSuspicious ? 'Medium Risk' : 'Low Risk')}</span>
            </div>
          </div>

          <div className="sm:text-right">
            <span className="text-[11px] font-mono text-slate-400 uppercase block">Model Verdict</span>
            <span className="text-sm font-bold text-white mt-1 block">
              {transaction.prediction || (isFraud ? 'Potential Fraud / Critical Risk' : isSuspicious ? 'Review Required' : 'Approved: Clean Pattern')}
            </span>
            <span className="text-[10px] text-cyan-400 font-mono">Ensemble Confidence: 94.2%</span>
          </div>
        </div>

        {/* Detailed Metadata Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="font-mono text-slate-400 uppercase text-[10px] pb-1 border-b border-slate-800/80">
              Financial Information
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Amount:</span>
              <span className="font-bold text-white font-mono">
                ${Number(transaction.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Payment Type:</span>
              <span className="text-slate-200">{transaction.type || 'Online Payment'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Sender:</span>
              <span className="font-mono text-cyan-400">{transaction.senderAccount || 'ACCT-8921-US'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Receiver:</span>
              <span className="font-mono text-slate-300">{transaction.receiverAccount || 'ACCT-4439-SG'}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="font-mono text-slate-400 uppercase text-[10px] pb-1 border-b border-slate-800/80">
              Device & Telemetry
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Location:</span>
              <span className="text-white font-medium">{transaction.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Device Hardware:</span>
              <span className="text-slate-200">{transaction.device}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">IP Address:</span>
              <span className="font-mono text-cyan-400">{transaction.ip || '194.26.29.11'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Timestamp:</span>
              <span className="font-mono text-slate-300">{transaction.time || transaction.timestamp}</span>
            </div>
          </div>

        </div>

        {/* Reasons & Anomaly Triggers */}
        <div className="mt-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <span className="text-[11px] font-mono uppercase text-slate-400 block mb-2">
            AI Detection Reasoning & Flagged Vectors:
          </span>
          <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800/80">
            {transaction.reason || 'Normal user telemetry, consistent device fingerprint, and standard transaction volume.'}
          </p>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between flex-wrap gap-2">
          <button
            onClick={downloadAuditReport}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" /> Export Audit JSON
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg text-xs uppercase tracking-wider transition-all"
          >
            Close Dossier
          </button>
        </div>

      </div>
    </div>
  );
}
