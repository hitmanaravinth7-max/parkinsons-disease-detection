import React, { useState } from 'react';
import { calculateFraudRisk } from '../utils/fraudScoringEngine';
import { CITIES, DEVICES, TX_TYPES } from '../utils/mockData';
import { ShieldAlert, ShieldCheck, AlertTriangle, Cpu, RefreshCw, Send, CheckCircle2, Sparkles, FileText } from 'lucide-react';

export default function TransactionForm({ onNewAnalyzedTransaction }) {
  const [formData, setFormData] = useState({
    transactionId: `TX-${Math.floor(100000 + Math.random() * 900000)}`,
    senderAccount: 'ACCT-8921-US',
    receiverAccount: 'ACCT-4439-SG',
    amount: '4850.00',
    transactionType: 'Online Payment',
    transactionTime: new Date().toTimeString().slice(0, 5),
    location: 'Lagos, NG',
    deviceType: 'Mobile',
    ipAddress: '102.89.23.144',
    previousTransactionCount: '12',
    transactionFrequency: 'High',
    accountAge: '14',
    previousFraudHistory: 'None'
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const generateNewId = () => {
    setFormData(prev => ({
      ...prev,
      transactionId: `TX-${Math.floor(100000 + Math.random() * 900000)}`
    }));
  };

  const loadPreset = (type) => {
    if (type === 'highRisk') {
      setFormData({
        transactionId: `TX-${Math.floor(100000 + Math.random() * 900000)}`,
        senderAccount: 'ACCT-9021-US',
        receiverAccount: 'ACCT-1132-RU',
        amount: '9850.00',
        transactionType: 'Bank Transfer',
        transactionTime: '03:15',
        location: 'Moscow, RU',
        deviceType: 'Tablet',
        ipAddress: '185.220.101.5',
        previousTransactionCount: '24',
        transactionFrequency: 'Extreme Burst',
        accountAge: '5',
        previousFraudHistory: 'Confirmed Flag'
      });
    } else if (type === 'safe') {
      setFormData({
        transactionId: `TX-${Math.floor(100000 + Math.random() * 900000)}`,
        senderAccount: 'ACCT-1402-US',
        receiverAccount: 'ACCT-7712-US',
        amount: '85.50',
        transactionType: 'Card Payment',
        transactionTime: '13:45',
        location: 'New York, USA',
        deviceType: 'Mobile',
        ipAddress: '72.229.28.185',
        previousTransactionCount: '4',
        transactionFrequency: 'Normal',
        accountAge: '450',
        previousFraudHistory: 'None'
      });
    } else {
      setFormData({
        transactionId: `TX-${Math.floor(100000 + Math.random() * 900000)}`,
        senderAccount: 'ACCT-5531-UK',
        receiverAccount: 'ACCT-9901-SG',
        amount: '2800.00',
        transactionType: 'Online Payment',
        transactionTime: '21:10',
        location: 'London, UK',
        deviceType: 'Desktop',
        ipAddress: '133.242.18.99',
        previousTransactionCount: '9',
        transactionFrequency: 'High',
        accountAge: '45',
        previousFraudHistory: 'Suspected'
      });
    }
  };

  const validate = () => {
    const errors = {};
    if (!formData.transactionId.trim()) errors.transactionId = 'Transaction ID is required';
    if (!formData.senderAccount.trim()) errors.senderAccount = 'Sender Account is required';
    if (!formData.receiverAccount.trim()) errors.receiverAccount = 'Receiver Account is required';
    if (!formData.amount || isNaN(formData.amount) || Number(formData.amount) <= 0) {
      errors.amount = 'Valid amount is required (greater than 0)';
    }
    if (!formData.location.trim()) errors.location = 'Location is required';
    if (!formData.ipAddress.trim()) errors.ipAddress = 'IP Address is required';
    if (!formData.accountAge || isNaN(formData.accountAge)) errors.accountAge = 'Valid account age in days required';
    return errors;
  };

  const handleAnalyze = (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    setValidationErrors({});
    setAnalyzing(true);

    // Simulate multi-model evaluation latency (400ms)
    setTimeout(() => {
      const result = calculateFraudRisk({
        amount: formData.amount,
        location: formData.location,
        deviceType: formData.deviceType,
        transactionFrequency: formData.transactionFrequency,
        previousFraudHistory: formData.previousFraudHistory,
        accountAge: formData.accountAge,
        previousTransactionCount: formData.previousTransactionCount,
        transactionTime: formData.transactionTime,
        transactionType: formData.transactionType
      });

      const fullRecord = {
        ...formData,
        id: formData.transactionId,
        amount: Number(formData.amount),
        type: formData.transactionType,
        device: formData.deviceType,
        time: formData.transactionTime,
        score: result.score,
        status: result.status,
        riskLevel: result.riskLevel,
        prediction: result.prediction,
        reason: result.reason,
        reasonsList: result.reasonsList,
        timestamp: 'Just now'
      };

      setAnalysisResult(fullRecord);
      setAnalyzing(false);

      if (onNewAnalyzedTransaction) {
        onNewAnalyzedTransaction(fullRecord);
      }
    }, 450);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-400" />
            Analyze Transaction
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Input digital payment telemetry to test the hybrid Isolation Forest + XGBoost scoring engine
          </p>
        </div>

        {/* Quick Test Presets */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-slate-400 font-mono">Load Presets:</span>
          <button
            type="button"
            onClick={() => loadPreset('safe')}
            className="px-2.5 py-1 text-xs rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20"
          >
            Safe Case
          </button>
          <button
            type="button"
            onClick={() => loadPreset('suspicious')}
            className="px-2.5 py-1 text-xs rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20"
          >
            Suspicious
          </button>
          <button
            type="button"
            onClick={() => loadPreset('highRisk')}
            className="px-2.5 py-1 text-xs rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/30 hover:bg-rose-500/20"
          >
            Critical Fraud
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Container */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border border-slate-800 shadow-xl">
          <form onSubmit={handleAnalyze} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Transaction ID */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-mono uppercase text-slate-300">Transaction ID *</label>
                  <button
                    type="button"
                    onClick={generateNewId}
                    className="text-[11px] text-cyan-400 hover:underline flex items-center gap-1 font-mono"
                  >
                    <RefreshCw className="w-3 h-3" /> Auto
                  </button>
                </div>
                <input
                  type="text"
                  value={formData.transactionId}
                  onChange={e => setFormData({ ...formData, transactionId: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs font-mono focus:border-cyan-500 focus:outline-none"
                />
                {validationErrors.transactionId && (
                  <span className="text-[11px] text-rose-400 mt-1 block">{validationErrors.transactionId}</span>
                )}
              </div>

              {/* Amount */}
              <div>
                <label className="text-xs font-mono uppercase text-slate-300 block mb-1">Transaction Amount ($) *</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={e => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs font-mono focus:border-cyan-500 focus:outline-none"
                  placeholder="e.g. 2500.00"
                />
                {validationErrors.amount && (
                  <span className="text-[11px] text-rose-400 mt-1 block">{validationErrors.amount}</span>
                )}
              </div>

              {/* Sender Account */}
              <div>
                <label className="text-xs font-mono uppercase text-slate-300 block mb-1">Sender Account *</label>
                <input
                  type="text"
                  value={formData.senderAccount}
                  onChange={e => setFormData({ ...formData, senderAccount: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs font-mono focus:border-cyan-500 focus:outline-none"
                />
                {validationErrors.senderAccount && (
                  <span className="text-[11px] text-rose-400 mt-1 block">{validationErrors.senderAccount}</span>
                )}
              </div>

              {/* Receiver Account */}
              <div>
                <label className="text-xs font-mono uppercase text-slate-300 block mb-1">Receiver Account *</label>
                <input
                  type="text"
                  value={formData.receiverAccount}
                  onChange={e => setFormData({ ...formData, receiverAccount: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs font-mono focus:border-cyan-500 focus:outline-none"
                />
                {validationErrors.receiverAccount && (
                  <span className="text-[11px] text-rose-400 mt-1 block">{validationErrors.receiverAccount}</span>
                )}
              </div>

              {/* Transaction Type */}
              <div>
                <label className="text-xs font-mono uppercase text-slate-300 block mb-1">Transaction Type</label>
                <select
                  value={formData.transactionType}
                  onChange={e => setFormData({ ...formData, transactionType: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs focus:border-cyan-500 focus:outline-none"
                >
                  <option value="Online Payment">Online Payment</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="ATM Withdrawal">ATM Withdrawal</option>
                  <option value="Card Payment">Card Payment</option>
                  <option value="Mobile Payment">Mobile Payment</option>
                </select>
              </div>

              {/* Transaction Time */}
              <div>
                <label className="text-xs font-mono uppercase text-slate-300 block mb-1">Transaction Time (HH:MM)</label>
                <input
                  type="time"
                  value={formData.transactionTime}
                  onChange={e => setFormData({ ...formData, transactionTime: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs font-mono focus:border-cyan-500 focus:outline-none"
                />
              </div>

              {/* Location */}
              <div>
                <label className="text-xs font-mono uppercase text-slate-300 block mb-1">Location *</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={e => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs focus:border-cyan-500 focus:outline-none"
                  placeholder="e.g. New York, USA or Lagos, NG"
                />
                {validationErrors.location && (
                  <span className="text-[11px] text-rose-400 mt-1 block">{validationErrors.location}</span>
                )}
              </div>

              {/* Device Type */}
              <div>
                <label className="text-xs font-mono uppercase text-slate-300 block mb-1">Device Type</label>
                <select
                  value={formData.deviceType}
                  onChange={e => setFormData({ ...formData, deviceType: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs focus:border-cyan-500 focus:outline-none"
                >
                  <option value="Mobile">Mobile</option>
                  <option value="Desktop">Desktop</option>
                  <option value="Tablet">Tablet</option>
                </select>
              </div>

              {/* IP Address */}
              <div>
                <label className="text-xs font-mono uppercase text-slate-300 block mb-1">IP Address *</label>
                <input
                  type="text"
                  value={formData.ipAddress}
                  onChange={e => setFormData({ ...formData, ipAddress: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs font-mono focus:border-cyan-500 focus:outline-none"
                  placeholder="e.g. 192.168.1.1"
                />
                {validationErrors.ipAddress && (
                  <span className="text-[11px] text-rose-400 mt-1 block">{validationErrors.ipAddress}</span>
                )}
              </div>

              {/* Previous Transaction Count */}
              <div>
                <label className="text-xs font-mono uppercase text-slate-300 block mb-1">Prev. Tx Count (Last 24h)</label>
                <input
                  type="number"
                  value={formData.previousTransactionCount}
                  onChange={e => setFormData({ ...formData, previousTransactionCount: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs font-mono focus:border-cyan-500 focus:outline-none"
                />
              </div>

              {/* Transaction Frequency */}
              <div>
                <label className="text-xs font-mono uppercase text-slate-300 block mb-1">Velocity Frequency</label>
                <select
                  value={formData.transactionFrequency}
                  onChange={e => setFormData({ ...formData, transactionFrequency: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs focus:border-cyan-500 focus:outline-none"
                >
                  <option value="Normal">Normal</option>
                  <option value="High">High</option>
                  <option value="Very High">Very High</option>
                  <option value="Extreme Burst">Extreme Burst (Rapid Spikes)</option>
                </select>
              </div>

              {/* Account Age */}
              <div>
                <label className="text-xs font-mono uppercase text-slate-300 block mb-1">Account Age (Days) *</label>
                <input
                  type="number"
                  value={formData.accountAge}
                  onChange={e => setFormData({ ...formData, accountAge: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs font-mono focus:border-cyan-500 focus:outline-none"
                />
              </div>

              {/* Previous Fraud History */}
              <div className="sm:col-span-2">
                <label className="text-xs font-mono uppercase text-slate-300 block mb-1">Prior Fraud History</label>
                <select
                  value={formData.previousFraudHistory}
                  onChange={e => setFormData({ ...formData, previousFraudHistory: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs focus:border-cyan-500 focus:outline-none"
                >
                  <option value="None">None (Clean Track Record)</option>
                  <option value="Suspected">Suspected (Compliance Flag)</option>
                  <option value="Confirmed Flag">Confirmed Flag (Historical Chargeback)</option>
                </select>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={analyzing}
                className="w-full py-3.5 px-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] active:scale-[0.99] text-sm uppercase tracking-wider flex items-center justify-center gap-2"
              >
                {analyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Executing Multi-Model Anomaly Scoring...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Analyze Transaction
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Output Result Card (REQUIREMENT 5) */}
        <div className="lg:col-span-5">
          {analysisResult ? (
            <div className="glass-panel p-6 rounded-2xl border border-cyan-500/30 shadow-2xl relative overflow-hidden h-full flex flex-col justify-between">
              
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs font-mono uppercase text-slate-400">Fraud Detection Output</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    AI Simulation / Demo Analysis
                  </span>
                </div>

                {/* Score Gauge & Status */}
                <div className="my-5 p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-mono text-slate-400 uppercase">Fraud Risk Score</div>
                    <div className="text-4xl font-extrabold tracking-tight mt-1" style={{ color: analysisResult.score >= 70 ? '#ef4444' : analysisResult.score >= 30 ? '#f59e0b' : '#10b981' }}>
                      {analysisResult.score}<span className="text-lg text-slate-500 font-normal">/100</span>
                    </div>
                    <div className="text-xs font-semibold text-slate-300 mt-1">
                      {analysisResult.riskLevel}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-mono text-slate-400 block uppercase">Status</span>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mt-1 ${
                      analysisResult.score >= 70
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                        : analysisResult.score >= 30
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    }`}>
                      {analysisResult.status}
                    </span>
                    <div className="text-[11px] font-mono text-slate-500 mt-1">
                      ID: {analysisResult.id}
                    </div>
                  </div>
                </div>

                {/* Risk Level Progress bar */}
                <div className="space-y-1.5 mb-5">
                  <div className="flex justify-between text-[11px] font-mono text-slate-400">
                    <span>Low (0-29)</span>
                    <span>Medium (30-69)</span>
                    <span>High (70-100)</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden flex">
                    <div
                      className="h-full transition-all duration-500"
                      style={{
                        width: `${analysisResult.score}%`,
                        backgroundColor: analysisResult.score >= 70 ? '#ef4444' : analysisResult.score >= 30 ? '#f59e0b' : '#10b981'
                      }}
                    />
                  </div>
                </div>

                {/* Prediction Result & Reason */}
                <div className="space-y-3">
                  <div>
                    <span className="text-[11px] uppercase font-mono text-slate-400 block">Prediction Result:</span>
                    <p className="text-sm font-semibold text-white mt-0.5">
                      {analysisResult.prediction}
                    </p>
                  </div>

                  <div>
                    <span className="text-[11px] uppercase font-mono text-slate-400 block">Detection Reason:</span>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                      {analysisResult.reason}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-800/80">
                    <span>Evaluated At:</span>
                    <span className="text-slate-300">{new Date().toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 text-center font-mono">
                ✓ Recorded in live simulation audit feed
              </div>

            </div>
          ) : (
            <div className="glass-panel p-8 rounded-2xl border border-slate-800/80 h-full flex flex-col items-center justify-center text-center">
              <div className="p-4 rounded-full bg-slate-900 border border-slate-800 text-slate-600 mb-3">
                <FileText className="w-8 h-8 text-cyan-400" />
              </div>
              <h4 className="text-base font-bold text-white mb-1">Awaiting Transaction Analysis</h4>
              <p className="text-xs text-slate-400 max-w-xs mb-4">
                Fill out the transaction telemetry on the left or select a preset, then click "Analyze Transaction".
              </p>
              <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl text-left text-xs space-y-1 w-full max-w-xs">
                <div className="text-[10px] font-mono uppercase text-slate-500">Risk Thresholds:</div>
                <div className="text-emerald-400">0–29: Low Risk (Safe)</div>
                <div className="text-amber-400">30–69: Medium Risk (Suspicious)</div>
                <div className="text-rose-400">70–100: High Risk (Potential Fraud)</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
