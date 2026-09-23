import React, { useState } from 'react';
import { Search, Eye, Play, Pause, Trash2, Filter, ArrowUpDown } from 'lucide-react';

export default function TransactionTable({
  transactions = [],
  onViewDetails,
  isSimulating,
  onToggleSimulation,
  onClearFeed
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch =
      tx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (tx.senderAccount && tx.senderAccount.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (tx.location && tx.location.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus =
      statusFilter === 'All' ||
      (statusFilter === 'Safe' && tx.status === 'Safe') ||
      (statusFilter === 'Suspicious' && tx.status === 'Suspicious') ||
      (statusFilter === 'Fraud' && tx.status === 'Fraud');

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="glass-panel rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
      {/* Header Controls */}
      <div className="p-4 md:p-5 border-b border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Title & Live Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-white tracking-wide">Live Transaction Stream</span>
            <span className="text-xs font-mono text-slate-500">({transactions.length} records)</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 font-mono text-[11px]">
            <span className={`w-2 h-2 rounded-full ${isSimulating ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`}></span>
            <span className={isSimulating ? 'text-emerald-400 font-semibold' : 'text-slate-400'}>
              {isSimulating ? 'LIVE FEED ACTIVE' : 'PAUSED'}
            </span>
          </div>
        </div>

        {/* Action Controls: Live Toggle, Clear Feed */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={onToggleSimulation}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all flex items-center gap-1.5 ${
              isSimulating
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30'
                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30'
            }`}
          >
            {isSimulating ? (
              <>
                <Pause className="w-3.5 h-3.5" /> Pause Feed
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" /> Start Live Monitoring
              </>
            )}
          </button>

          <button
            onClick={onClearFeed}
            className="px-3 py-1.5 rounded-lg text-xs font-mono text-slate-400 hover:text-rose-400 bg-slate-800/60 border border-slate-700 hover:border-rose-500/30 transition-all flex items-center gap-1.5"
            title="Clear all transactions in stream"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear Feed
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="px-4 py-3 bg-slate-950/40 border-b border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search by ID, Account, City..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-900 border border-slate-750 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 self-start sm:self-center">
          <Filter className="w-3.5 h-3.5 text-slate-500 mr-1" />
          {['All', 'Safe', 'Suspicious', 'Fraud'].map(filter => (
            <button
              key={filter}
              onClick={() => setStatusFilter(filter)}
              className={`px-2.5 py-1 rounded-md text-xs font-mono transition-colors ${
                statusFilter === filter
                  ? filter === 'Fraud'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    : filter === 'Suspicious'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : filter === 'Safe'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white bg-slate-900/60 border border-transparent'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/60 font-mono text-[11px] text-slate-400 uppercase tracking-wider">
              <th className="py-3 px-4">Transaction ID</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Location</th>
              <th className="py-3 px-4">Device</th>
              <th className="py-3 px-4">Risk Score</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Timestamp</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((tx) => {
                const isFraud = tx.status === 'Fraud' || tx.score >= 70;
                const isSuspicious = tx.status === 'Suspicious' || (tx.score >= 30 && tx.score < 70);

                return (
                  <tr
                    key={tx.id}
                    className={`hover:bg-slate-800/40 transition-colors ${
                      isFraud ? 'bg-rose-500/5' : ''
                    }`}
                  >
                    <td className="py-3 px-4 font-bold text-white">
                      {tx.id}
                    </td>

                    <td className="py-3 px-4 font-semibold text-slate-100">
                      ${Number(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>

                    <td className="py-3 px-4 text-slate-300 font-sans">
                      {tx.type}
                    </td>

                    <td className="py-3 px-4 text-slate-300 font-sans truncate max-w-[140px]">
                      {tx.location}
                    </td>

                    <td className="py-3 px-4 text-slate-400 font-sans truncate max-w-[120px]">
                      {tx.device}
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span
                          className="font-bold text-xs"
                          style={{
                            color: isFraud ? '#ef4444' : isSuspicious ? '#f59e0b' : '#10b981'
                          }}
                        >
                          {tx.score}
                        </span>
                        <div className="w-12 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                          <div
                            className="h-full"
                            style={{
                              width: `${tx.score}%`,
                              backgroundColor: isFraud ? '#ef4444' : isSuspicious ? '#f59e0b' : '#10b981'
                            }}
                          />
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          isFraud
                            ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                            : isSuspicious
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        }`}
                      >
                        {tx.status}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-slate-400 text-[11px]">
                      {tx.time || tx.timestamp}
                    </td>

                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => onViewDetails(tx)}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-slate-700 hover:border-cyan-500/40 transition-colors inline-flex items-center gap-1 text-[11px]"
                      >
                        <Eye className="w-3 h-3" />
                        Details
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={9} className="py-8 text-center text-slate-500 font-sans">
                  No transactions match the selected filter or search term.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
