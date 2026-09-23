import React, { useState } from 'react';
import { 
  FEATURE_DEFINITIONS, 
  ALL_FEATURES, 
  PRESETS, 
  predictParkinsons 
} from '../utils/parkinsonsEngine';
import { 
  BrainCircuit, 
  RotateCcw, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  AlertTriangle, 
  Activity, 
  HelpCircle,
  Info,
  Download,
  Share2,
  FileCheck2,
  Stethoscope,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function PredictionPage({ onPredictionComplete }) {
  // 22 features form state
  const [formData, setFormData] = useState({
    fo: '',
    fhi: '',
    flo: '',
    jitter_pct: '',
    jitter_abs: '',
    rap: '',
    ppq: '',
    ddp: '',
    shimmer: '',
    shimmer_db: '',
    apq3: '',
    apq5: '',
    apq: '',
    dda: '',
    nhr: '',
    hnr: '',
    rpde: '',
    dfa: '',
    spread1: '',
    spread2: '',
    d2: '',
    ppe: ''
  });

  // Optional patient demographic fields
  const [patientName, setPatientName] = useState('Patient John Doe');
  const [patientAge, setPatientAge] = useState('64');
  const [patientGender, setPatientGender] = useState('Male');

  const [errors, setErrors] = useState({});
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

  // Handle individual input changes
  const handleInputChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));

    // Clear error for field if fixed
    if (errors[key]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  // Load a clinically pre-configured preset
  const handleLoadPreset = (presetKey) => {
    const preset = PRESETS[presetKey];
    if (!preset) return;

    const newValues = {};
    Object.keys(preset.values).forEach(k => {
      newValues[k] = preset.values[k].toString();
    });

    setFormData(newValues);
    setErrors({});
    setPredictionResult(null);

    if (presetKey === 'HEALTHY_PATIENT') {
      setPatientName('Sarah Lin (Control)');
      setPatientAge('52');
      setPatientGender('Female');
    } else if (presetKey === 'MILD_PARKINSONS') {
      setPatientName('Robert M. (Early Stage)');
      setPatientAge('61');
      setPatientGender('Male');
    } else {
      setPatientName('Arthur Pendelton (Tremor)');
      setPatientAge('68');
      setPatientGender('Male');
    }
  };

  // Clear all inputs
  const handleClear = () => {
    const emptyForm = {};
    ALL_FEATURES.forEach(f => {
      emptyForm[f.key] = '';
    });
    setFormData(emptyForm);
    setErrors({});
    setPredictionResult(null);
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    ALL_FEATURES.forEach(feature => {
      const val = formData[feature.key];
      if (val === undefined || val === null || val === '') {
        newErrors[feature.key] = `${feature.label} is required`;
      } else {
        const num = parseFloat(val);
        if (isNaN(num)) {
          newErrors[feature.key] = `Must be a valid number`;
        } else if (feature.min !== undefined && num < feature.min) {
          newErrors[feature.key] = `Min value is ${feature.min}`;
        } else if (feature.max !== undefined && num > feature.max) {
          newErrors[feature.key] = `Max value is ${feature.max}`;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Trigger prediction
  const handlePredict = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll to first error
      const firstErrorKey = Object.keys(errors)[0] || 'fo';
      const el = document.getElementById(`field-${firstErrorKey}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsEvaluating(true);

    setTimeout(() => {
      setIsEvaluating(false);
      const result = predictParkinsons(formData);
      
      const enrichedResult = {
        ...result,
        id: `REC-${Math.floor(1000 + Math.random() * 9000)}`,
        patientName: patientName || 'Anonymous Patient',
        patientAge: patientAge || 'N/A',
        patientGender: patientGender || 'N/A',
        date: new Date().toISOString().replace('T', ' ').substring(0, 16),
        fo: formData.fo,
        hnr: formData.hnr,
        jitter_pct: formData.jitter_pct,
        ppe: formData.ppe
      };

      setPredictionResult(enrichedResult);

      // Save to parent history state and localStorage
      if (onPredictionComplete) {
        onPredictionComplete(enrichedResult);
      }

      // Smooth scroll down to results section
      setTimeout(() => {
        const resultsEl = document.getElementById('prediction-results-card');
        if (resultsEl) {
          resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }, 700);
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-6xl mx-auto pb-12">
      {/* Header Title & Preset Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/15 text-teal-300 border border-teal-500/30 mb-2">
            <BrainCircuit className="w-3.5 h-3.5" />
            <span>22 Acoustic Biomedical Feature Vector</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Predict Parkinson’s Disease
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Input vocal phonation measurements derived from speech acoustics. You can manually enter values or choose a clinical benchmark preset below for instant evaluation.
          </p>
        </div>

        {/* Preset Selector Chips */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-900/80 p-2 rounded-xl border border-slate-800 shrink-0">
          <span className="text-[11px] font-semibold text-slate-400 px-2 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            Presets:
          </span>
          <button
            type="button"
            onClick={() => handleLoadPreset('HEALTHY_PATIENT')}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25 border border-emerald-500/30 transition cursor-pointer"
          >
            ● Healthy Sample
          </button>
          <button
            type="button"
            onClick={() => handleLoadPreset('MILD_PARKINSONS')}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500/15 text-amber-300 hover:bg-amber-500/25 border border-amber-500/30 transition cursor-pointer"
          >
            ● Mild Tremor
          </button>
          <button
            type="button"
            onClick={() => handleLoadPreset('DETECTED_PARKINSONS')}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-500/15 text-rose-300 hover:bg-rose-500/25 border border-rose-500/30 transition cursor-pointer"
          >
            ● Parkinson's Positive
          </button>
        </div>
      </div>

      {/* Optional Patient Demographic Ribbon */}
      <div className="glass-panel p-4 rounded-xl border border-slate-800 bg-slate-900/60 flex flex-wrap items-center gap-4 text-xs">
        <span className="font-semibold text-slate-300 flex items-center gap-1.5">
          <Stethoscope className="w-4 h-4 text-teal-400" />
          Patient Info (Optional):
        </span>
        <div className="flex items-center gap-2">
          <label className="text-slate-400">Name:</label>
          <input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            placeholder="Patient Name"
            className="px-2.5 py-1 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs w-44 focus:outline-none focus:border-teal-400"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-slate-400">Age:</label>
          <input
            type="number"
            value={patientAge}
            onChange={(e) => setPatientAge(e.target.value)}
            placeholder="60"
            className="px-2.5 py-1 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs w-20 focus:outline-none focus:border-teal-400"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-slate-400">Gender:</label>
          <select
            value={patientGender}
            onChange={(e) => setPatientGender(e.target.value)}
            className="px-2.5 py-1 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs focus:outline-none focus:border-teal-400"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* Global Validation Error Banner */}
      {Object.keys(errors).length > 0 && (
        <div className="p-4 bg-rose-500/15 border border-rose-500/40 rounded-xl flex items-start gap-3 text-xs text-rose-300 animate-fadeIn">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-rose-200">
              Please complete all 22 required acoustic measurement fields:
            </p>
            <p className="text-rose-300/80 mt-1">
              {Object.keys(errors).length} fields require attention. You can click any preset button above (e.g., “Healthy Sample” or “Parkinson’s Positive”) to auto-populate the form with validated acoustic data.
            </p>
          </div>
        </div>
      )}

      {/* 22 Voice Feature Inputs Form Organized by Category */}
      <form onSubmit={handlePredict} className="space-y-6">
        {FEATURE_DEFINITIONS.map((group, groupIdx) => (
          <div 
            key={groupIdx} 
            className="glass-panel rounded-2xl p-5 md:p-6 border border-slate-800 bg-slate-900/60 shadow-lg space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-teal-400" />
                  {group.category}
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {group.description}
                </p>
              </div>
              <span className="text-[11px] text-teal-400 font-mono font-medium">
                {group.items.length} Parameters
              </span>
            </div>

            {/* Input Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.items.map((item) => {
                const hasError = !!errors[item.key];
                return (
                  <div 
                    key={item.key} 
                    id={`field-${item.key}`}
                    className={`p-3 rounded-xl border transition ${
                      hasError 
                        ? 'bg-rose-500/10 border-rose-500/50' 
                        : 'bg-slate-800/50 border-slate-700/60 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-semibold text-slate-200 font-mono">
                        {item.label}
                      </label>
                      <span className="text-[10px] text-slate-400 font-mono">
                        Ref: {item.normal}
                      </span>
                    </div>

                    <div className="relative">
                      <input
                        type="number"
                        step={item.step || 'any'}
                        value={formData[item.key] ?? ''}
                        onChange={(e) => handleInputChange(item.key, e.target.value)}
                        placeholder={`e.g. ${item.healthyRef}`}
                        className={`w-full px-3 py-2 bg-slate-900 border rounded-lg text-xs font-mono text-white placeholder-slate-600 focus:outline-none transition ${
                          hasError 
                            ? 'border-rose-500 focus:ring-1 focus:ring-rose-500' 
                            : 'border-slate-700 focus:border-teal-400 focus:ring-1 focus:ring-teal-400'
                        }`}
                      />
                      <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-[10px] text-slate-400 pointer-events-none font-mono">
                        {item.unit}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-1.5 text-[10px]">
                      <span className="text-slate-400 truncate max-w-[200px]" title={item.desc}>
                        {item.desc}
                      </span>
                      {hasError && (
                        <span className="text-rose-400 font-medium shrink-0">
                          Required
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Action Buttons: Predict & Clear */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={handleClear}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold text-xs border border-slate-700 flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Clear Fields</span>
          </button>

          <button
            type="submit"
            disabled={isEvaluating}
            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-teal-500/25 flex items-center justify-center gap-2 transition cursor-pointer disabled:opacity-70"
          >
            {isEvaluating ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Running Acoustic ML Classification...</span>
              </>
            ) : (
              <>
                <Stethoscope className="w-4 h-4" />
                <span>Predict Parkinson’s Disease</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* ========================================================= */}
      {/* 4. RESULT SECTION (Show: Prediction, Confidence %, Explanation, Recommendation, Disclaimer) */}
      {/* ========================================================= */}
      {predictionResult && (
        <div 
          id="prediction-results-card" 
          className="mt-12 glass-panel rounded-2xl p-6 md:p-8 border border-slate-700 bg-slate-900/90 shadow-2xl relative overflow-hidden animate-fadeIn"
        >
          {/* Top Classification Result Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-800 gap-4">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl ${
                predictionResult.status === 'parkinsons' 
                  ? 'bg-rose-500/20 border-2 border-rose-500/40 text-rose-400 shadow-rose-500/20' 
                  : 'bg-emerald-500/20 border-2 border-emerald-500/40 text-emerald-400 shadow-emerald-500/20'
              }`}>
                {predictionResult.status === 'parkinsons' ? (
                  <AlertTriangle className="w-8 h-8" />
                ) : (
                  <CheckCircle2 className="w-8 h-8" />
                )}
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Prediction Outcome
                </span>
                <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
                  predictionResult.status === 'parkinsons' ? 'text-rose-400' : 'text-emerald-400'
                }`}>
                  {predictionResult.prediction}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Record ID: <span className="font-mono text-slate-300">{predictionResult.id}</span> • Patient: <span className="text-white font-semibold">{predictionResult.patientName}</span>
                </p>
              </div>
            </div>

            {/* Confidence Percentage Gauge */}
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center gap-4 shrink-0">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Model Confidence
                </p>
                <p className="text-3xl font-black font-mono text-white">
                  {predictionResult.confidence}%
                </p>
              </div>
              <div className="w-12 h-12 rounded-full border-4 border-slate-700 flex items-center justify-center relative">
                <div 
                  className={`w-12 h-12 rounded-full border-4 absolute ${
                    predictionResult.status === 'parkinsons' ? 'border-rose-400' : 'border-emerald-400'
                  }`}
                  style={{
                    clipPath: `polygon(50% 50%, -50% -50%, ${predictionResult.confidence}% -50%, ${predictionResult.confidence}% 150%)`
                  }}
                />
                <span className="text-xs font-mono font-bold text-slate-300">
                  {Math.round(predictionResult.confidence)}%
                </span>
              </div>
            </div>
          </div>

          {/* Result Explanation & Clinical Recommendation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            {/* Explanation */}
            <div className="p-5 rounded-xl bg-slate-800/50 border border-slate-700/60 space-y-2">
              <h4 className="text-xs font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                <FileCheck2 className="w-4 h-4" />
                Result Explanation
              </h4>
              <p className="text-xs text-slate-200 leading-relaxed">
                {predictionResult.explanation}
              </p>
            </div>

            {/* Recommendation */}
            <div className="p-5 rounded-xl bg-slate-800/50 border border-slate-700/60 space-y-2">
              <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                <Stethoscope className="w-4 h-4" />
                Clinical Recommendation
              </h4>
              <p className="text-xs text-slate-200 leading-relaxed">
                {predictionResult.recommendation}
              </p>
            </div>
          </div>

          {/* Biomarker Breakdown Details */}
          {predictionResult.findings && predictionResult.findings.length > 0 && (
            <div className="mb-6">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                Key Diagnostic Biomarker Observations:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {predictionResult.findings.map((finding, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-800/40 border border-slate-700/50 text-xs space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-white">{finding.feature}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        finding.impact === 'High' ? 'bg-rose-500/20 text-rose-300' :
                        finding.impact === 'Medium' ? 'bg-amber-500/20 text-amber-300' :
                        'bg-emerald-500/20 text-emerald-300'
                      }`}>
                        {finding.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      {finding.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MANDATORY EDUCATIONAL DISCLAIMER */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-center gap-3">
            <Info className="w-5 h-5 text-amber-400 shrink-0" />
            <div className="font-medium">
              <span className="font-bold underline block sm:inline mr-1">Medical Notice:</span>
              “This result is for educational purposes only and is not a medical diagnosis.”
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
