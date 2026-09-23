import React, { useState } from 'react';
import { 
  History, 
  Trash2, 
  Download, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Calendar, 
  User, 
  Stethoscope, 
  Info,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export default function PredictionHistory({ 
  history, 
  onClearHistory, 
  onDeleteRecord,
  onSelectRecord 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [selectedItem, setSelectedItem] = useState(null);

  // Filter history
  const filteredHistory = history.filter(item => {
    const matchesSearch = 
      (item.patientName && item.patientName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.id && item.id.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.prediction && item.prediction.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!matchesSearch) return false;

    if (filterStatus === 'HEALTHY') return item.status === 'healthy';
    if (filterStatus === 'PARKINSONS') return item.status === 'parkinsons';
    return true;
  });

  const exportAsJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(history, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `parkinsons_predictions_history_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/15 text-teal-300 border border-teal-500/30 mb-2">
            <History className="w-3.5 h-3.5" />
            <span>Local Database Persistence (localStorage)</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Prediction History
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Historical voice classification evaluations and acoustic records saved in browser session storage.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={exportAsJSON}
            disabled={history.length === 0}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition disabled:opacity-50"
          >
            <Download className="w-4 h-4 text-teal-400" />
            <span>Export JSON</span>
          </button>
          <button
            onClick={onClearHistory}
            disabled={history.length === 0}
            className="px-3.5 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 rounded-xl text-xs font-semibold border border-rose-500/30 flex items-center gap-1.5 transition disabled:opacity-50"
          >
            <Trash2 className="w-4 h-4 text-rose-400" />
            <span>Clear All</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel p-4 rounded-xl border border-slate-800 bg-slate-900/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search patient, ID, or diagnosis..."
            className="w-full pl-9 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-teal-400"
          />
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          <button
            onClick={() => setFilterStatus('ALL')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              filterStatus === 'ALL' 
                ? 'bg-teal-500 text-white' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            All ({history.length})
          </button>
          <button
            onClick={() => setFilterStatus('HEALTHY')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              filterStatus === 'HEALTHY' 
                ? 'bg-emerald-600 text-white' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Healthy ({history.filter(i => i.status === 'healthy').length})
          </button>
          <button
            onClick={() => setFilterStatus('PARKINSONS')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              filterStatus === 'PARKINSONS' 
                ? 'bg-rose-600 text-white' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Parkinson’s ({history.filter(i => i.status === 'parkinsons').length})
          </button>
        </div>
      </div>

      {/* History Table */}
      {filteredHistory.length === 0 ? (
        <div className="glass-panel p-12 text-center rounded-2xl border border-slate-800 bg-slate-900/40 space-y-3">
          <History className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No Prediction Records Found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {searchTerm ? "No records matched your search query. Try clearing filters." : "Perform an acoustic vocal prediction to save history entries."}
          </p>
        </div>
      ) : (
        <div className="glass-panel rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-800/40 text-slate-400 font-semibold uppercase tracking-wider">
                  <th className="py-3.5 px-4">Record ID</th>
                  <th className="py-3.5 px-4">Patient Profile</th>
                  <th className="py-3.5 px-4">Date & Time</th>
                  <th className="py-3.5 px-4">Outcome</th>
                  <th className="py-3.5 px-4">Confidence</th>
                  <th className="py-3.5 px-4">Key Metrics (Fo / HNR)</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredHistory.map((item) => {
                  const isParkinsons = item.status === 'parkinsons';
                  return (
                    <tr key={item.id} className="hover:bg-slate-800/40 transition">
                      <td className="py-3.5 px-4 font-mono font-bold text-teal-400">
                        {item.id}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-white">
                          {item.patientName || 'Anonymous'}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {item.patientAge ? `Age ${item.patientAge}` : ''} {item.patientGender ? `• ${item.patientGender}` : ''}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-300 font-mono text-[11px]">
                        {item.date}
                      </td>
                      <td className="py-3.5 px-4">
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
                      <td className="py-3.5 px-4 font-mono font-bold text-white">
                        {item.confidence}%
                      </td>
                      <td className="py-3.5 px-4 text-slate-300 font-mono text-[11px]">
                        Fo: {item.fo ? `${Number(item.fo).toFixed(1)} Hz` : '—'} | HNR: {item.hnr ? `${Number(item.hnr).toFixed(1)} dB` : '—'}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedItem(item)}
                            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition"
                            title="View Record Details"
                          >
                            <FileText className="w-4 h-4 text-teal-400" />
                          </button>
                          <button
                            onClick={() => onDeleteRecord(item.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition"
                            title="Delete Record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Mandatory Disclaimer Footer */}
      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-center gap-3">
        <Info className="w-5 h-5 text-amber-400 shrink-0" />
        <span className="font-medium">
          This result is for educational purposes only and is not a medical diagnosis.
        </span>
      </div>

      {/* Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-lg w-full shadow-2xl relative">
            <div className="flex justify-between items-start pb-4 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono uppercase text-teal-400 font-bold">
                  {selectedItem.id}
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  {selectedItem.patientName}
                </h3>
                <p className="text-xs text-slate-400">
                  Evaluated on {selectedItem.date}
                </p>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-4">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/70 border border-slate-700">
                <span className="text-xs text-slate-300 font-semibold">Diagnosis Result:</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  selectedItem.status === 'parkinsons' 
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' 
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                }`}>
                  {selectedItem.prediction} ({selectedItem.confidence}%)
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <h4 className="font-bold text-slate-300">Biomarker Telemetry:</h4>
                <div className="grid grid-cols-2 gap-2 font-mono">
                  <div className="p-2 bg-slate-800/40 rounded border border-slate-700/60">
                    <span className="text-slate-400 block text-[10px]">MDVP:Fo(Hz)</span>
                    <span className="text-white font-bold">{selectedItem.fo || 'N/A'}</span>
                  </div>
                  <div className="p-2 bg-slate-800/40 rounded border border-slate-700/60">
                    <span className="text-slate-400 block text-[10px]">HNR (Harmonics)</span>
                    <span className="text-white font-bold">{selectedItem.hnr || 'N/A'}</span>
                  </div>
                  <div className="p-2 bg-slate-800/40 rounded border border-slate-700/60">
                    <span className="text-slate-400 block text-[10px]">Jitter (%)</span>
                    <span className="text-white font-bold">{selectedItem.jitter_pct || 'N/A'}</span>
                  </div>
                  <div className="p-2 bg-slate-800/40 rounded border border-slate-700/60">
                    <span className="text-slate-400 block text-[10px]">Pitch Period Entropy (PPE)</span>
                    <span className="text-white font-bold">{selectedItem.ppe || 'N/A'}</span>
                  </div>
                </div>
              </div>

              {selectedItem.notes && (
                <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-700/60 text-xs">
                  <span className="font-bold text-slate-300 block mb-1">Clinical Notes:</span>
                  <p className="text-slate-300 leading-relaxed">{selectedItem.notes}</p>
                </div>
              )}

              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-[11px] text-amber-300 flex items-center gap-2">
                <Info className="w-4 h-4 text-amber-400 shrink-0" />
                <span>This result is for educational purposes only and is not a medical diagnosis.</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold transition"
              >
                Close Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
