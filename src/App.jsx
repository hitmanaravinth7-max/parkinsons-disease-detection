import React, { useState } from 'react';
import { 
  FORM_FIELDS, 
  SAMPLES, 
  analyzeParkinsonsRisk 
} from './utils/parkinsonsEngine';
import { 
  Activity, 
  Stethoscope, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  RotateCcw, 
  HelpCircle, 
  Info, 
  ChevronRight,
  ShieldAlert,
  FileText,
  Sliders,
  ExternalLink
} from 'lucide-react';

export default function App() {
  // 13 vocal biomarker form fields state
  const [formData, setFormData] = useState({
    fo: '',
    fhi: '',
    flo: '',
    jitter_pct: '',
    shimmer: '',
    nhr: '',
    hnr: '',
    rpde: '',
    dfa: '',
    spread1: '',
    spread2: '',
    d2: '',
    ppe: ''
  });

  const [errors, setErrors] = useState({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [activeSampleType, setActiveSampleType] = useState(null);

  // Field change handler
  const handleInputChange = (fieldKey, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldKey]: value
    }));

    if (errors[fieldKey]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[fieldKey];
        return next;
      });
    }
  };

  // 1-Click Load Sample - Healthy
  const handleLoadHealthy = () => {
    setFormData(SAMPLES.HEALTHY);
    setErrors({});
    setActiveSampleType('healthy');
    setAnalysisResult(null);
  };

  // 1-Click Load Sample - Parkinson's
  const handleLoadParkinsons = () => {
    setFormData(SAMPLES.PARKINSONS);
    setErrors({});
    setActiveSampleType('parkinsons');
    setAnalysisResult(null);
  };

  // Clear all fields
  const handleClear = () => {
    setFormData({
      fo: '',
      fhi: '',
      flo: '',
      jitter_pct: '',
      shimmer: '',
      nhr: '',
      hnr: '',
      rpde: '',
      dfa: '',
      spread1: '',
      spread2: '',
      d2: '',
      ppe: ''
    });
    setErrors({});
    setAnalysisResult(null);
    setActiveSampleType(null);
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    FORM_FIELDS.forEach(field => {
      const val = formData[field.key];
      if (val === undefined || val === null || val === '') {
        newErrors[field.key] = `Required`;
      } else if (isNaN(parseFloat(val))) {
        newErrors[field.key] = `Invalid number`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Analyze button handler
  const handleAnalyze = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsAnalyzing(true);

    // Fast client-side demonstration computation with smooth UX
    setTimeout(() => {
      setIsAnalyzing(false);
      const result = analyzeParkinsonsRisk(formData);
      setAnalysisResult({
        ...result,
        submittedValues: { ...formData }
      });

      // Smooth scroll to output card
      setTimeout(() => {
        const outputEl = document.getElementById('analysis-output-section');
        if (outputEl) {
          outputEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      
      {/* Top Professional Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 lg:px-8 py-3.5 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-slate-900 leading-tight">
                  Parkinson's Disease Detection
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  <Sparkles className="w-3 h-3 text-blue-600" />
                  DEMO MODE
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                AI/ML Based Vocal Biomarker Analysis
              </p>
            </div>
          </div>

          {/* Quick Demo Controls in Header */}
          <div className="hidden md:flex items-center gap-2">
            <button
              type="button"
              onClick={handleLoadHealthy}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition cursor-pointer"
            >
              Load Sample - Healthy
            </button>
            <button
              type="button"
              onClick={handleLoadParkinsons}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 transition cursor-pointer"
            >
              Load Sample - Parkinson's
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 space-y-8">
        
        {/* Warning & Demo Banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 text-amber-900 shadow-sm">
          <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm space-y-1">
            <p className="font-semibold text-amber-950">
              Educational Demonstration Notice
            </p>
            <p className="text-amber-800 leading-relaxed">
              "This application is for educational and demonstration purposes only. It is not a medical diagnosis."
            </p>
            <p className="text-xs text-amber-700">
              This client-side demo evaluates 13 vocal biomarkers from sustained vowel phonation without requiring any backend server or cloud connectivity.
            </p>
          </div>
        </div>

        {/* Hero Section & Sample Selector Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 mb-2">
                <Activity className="w-3.5 h-3.5 text-blue-600" />
                <span>Non-Invasive Acoustic Screening</span>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Vocal Phonation Biomarker Inputs
              </h2>
              <p className="text-sm text-slate-600 max-w-2xl mt-1 leading-relaxed">
                Enter the biomedical speech measurements below or load pre-populated patient samples to analyze Parkinson's risk indicators.
              </p>
            </div>

            {/* Demo Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 shrink-0 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <span className="text-xs font-semibold text-slate-600 px-1">
                Demo Presets:
              </span>
              <button
                type="button"
                onClick={handleLoadHealthy}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  activeSampleType === 'healthy'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Load Sample - Healthy
              </button>
              <button
                type="button"
                onClick={handleLoadParkinsons}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  activeSampleType === 'parkinsons'
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                Load Sample - Parkinson's
              </button>
            </div>
          </div>
        </div>

        {/* INPUT SECTION: 13 Vocal Biomarker Fields Form */}
        <form onSubmit={handleAnalyze} className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Acoustic Feature Fields (13 Parameters)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Fundamental frequency, perturbation (jitter/shimmer), harmonics ratios, and nonlinear dynamic measures
              </p>
            </div>
            <span className="text-xs font-mono font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
              13 Biomarkers
            </span>
          </div>

          {/* Validation error notice if fields missing */}
          {Object.keys(errors).length > 0 && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2.5">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
              <span>
                Please fill in all 13 fields with numeric values or click <strong>Load Sample - Healthy</strong> or <strong>Load Sample - Parkinson's</strong> above.
              </span>
            </div>
          )}

          {/* 13 Input Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {FORM_FIELDS.map((field) => {
              const hasError = !!errors[field.key];
              return (
                <div 
                  key={field.key} 
                  className={`p-3.5 rounded-xl border transition ${
                    hasError 
                      ? 'bg-red-50/50 border-red-300' 
                      : 'bg-slate-50/80 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <label 
                      htmlFor={`input-${field.key}`}
                      className="text-xs font-bold font-mono text-slate-800"
                    >
                      {field.label}
                    </label>
                    <span className="text-[11px] text-slate-500 font-mono">
                      Ref: {field.normalRef}
                    </span>
                  </div>

                  <div className="relative">
                    <input
                      id={`input-${field.key}`}
                      type="number"
                      step={field.step}
                      value={formData[field.key]}
                      onChange={(e) => handleInputChange(field.key, e.target.value)}
                      placeholder={field.placeholder}
                      className={`w-full px-3 py-2 bg-white border rounded-lg text-xs font-mono text-slate-900 placeholder-slate-400 focus:outline-none transition ${
                        hasError 
                          ? 'border-red-500 focus:ring-2 focus:ring-red-400' 
                          : 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                      }`}
                    />
                    <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-[11px] text-slate-400 pointer-events-none font-mono">
                      {field.unit}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-1.5 text-[10px] text-slate-500">
                    <span className="truncate" title={field.description}>
                      {field.description}
                    </span>
                    {hasError && (
                      <span className="text-red-600 font-semibold shrink-0">
                        {errors[field.key]}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-6 border-t border-slate-100">
            <button
              type="button"
              onClick={handleClear}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs border border-slate-200 flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-slate-500" />
              <span>Clear</span>
            </button>

            <button
              type="submit"
              disabled={isAnalyzing}
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition cursor-pointer disabled:opacity-75"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Evaluating Biomarkers...</span>
                </>
              ) : (
                <>
                  <Activity className="w-4 h-4" />
                  <span>Analyze Parkinson's Risk</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* OUTPUT SECTION: Result Card */}
        {analysisResult && (
          <div 
            id="analysis-output-section" 
            className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6 animate-fadeIn"
          >
            {/* Header Result Banner */}
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-100 gap-4">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-md ${
                  analysisResult.isParkinsonsDetected 
                    ? 'bg-rose-100 text-rose-700' 
                    : 'bg-emerald-100 text-emerald-700'
                }`}>
                  {analysisResult.isParkinsonsDetected ? (
                    <AlertTriangle className="w-8 h-8" />
                  ) : (
                    <CheckCircle2 className="w-8 h-8" />
                  )}
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Acoustic Biomarker Result
                  </span>
                  <h3 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
                    analysisResult.isParkinsonsDetected ? 'text-rose-700' : 'text-emerald-700'
                  }`}>
                    {analysisResult.prediction}
                  </h3>
                  <p className="text-xs font-medium text-slate-500 mt-0.5">
                    Status: <span className="font-semibold text-slate-800">{analysisResult.resultStatus}</span>
                  </p>
                </div>
              </div>

              {/* Risk Score Percentage Pill */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-4 shrink-0">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Risk Score
                  </p>
                  <p className={`text-3xl font-black font-mono ${
                    analysisResult.isParkinsonsDetected ? 'text-rose-600' : 'text-emerald-600'
                  }`}>
                    {analysisResult.riskScore}%
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full border-4 border-slate-200 flex items-center justify-center relative bg-white">
                  <span className="text-xs font-mono font-bold text-slate-700">
                    {analysisResult.riskScore}%
                  </span>
                </div>
              </div>
            </div>

            {/* Short Explanation Card */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-blue-600" />
                Biomarker Explanation
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed">
                {analysisResult.shortExplanation}
              </p>
            </div>

            {/* Clean Result Card of Entered Values */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Entered Biomarker Values
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2.5">
                {FORM_FIELDS.map((f) => (
                  <div key={f.key} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                    <span className="text-[10px] font-mono text-slate-500 block truncate" title={f.label}>
                      {f.label}
                    </span>
                    <span className="font-mono font-bold text-slate-900 text-xs block mt-0.5">
                      {analysisResult.submittedValues[f.key] || '—'}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {f.unit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mandatory Educational Notice in Result */}
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-3">
              <Info className="w-5 h-5 text-amber-600 shrink-0" />
              <span className="font-medium">
                "This application is for educational and demonstration purposes only. It is not a medical diagnosis."
              </span>
            </div>
          </div>
        )}

        {/* Information & Clinical Background Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
            <h4 className="text-xs font-bold text-blue-700 uppercase tracking-wider">
              1. Phonation Impairment
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Parkinson's Disease frequently induces <em>hypokinetic dysarthria</em>, causing subtle involuntary vocal cord micro-tremors, breathiness, and pitch instability prior to gross motor symptoms.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
            <h4 className="text-xs font-bold text-blue-700 uppercase tracking-wider">
              2. Acoustic Biomarkers
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Jitter measures cycle-to-cycle frequency variations, Shimmer measures amplitude variations, HNR captures signal purity, and Pitch Period Entropy (PPE) detects chaotic vocal dynamics.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
            <h4 className="text-xs font-bold text-blue-700 uppercase tracking-wider">
              3. Telemonitoring Potential
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Non-invasive voice analysis provides a lightweight digital screening biomarker that can be tested over standard telecommunication microphones for early patient referral.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 px-4 text-center text-xs text-slate-500">
        <p className="font-semibold text-slate-700">
          Parkinson's Disease Detection • AI/ML Based Vocal Biomarker Analysis
        </p>
        <p className="mt-1 text-slate-400">
          Client-side demonstration platform • Zero backend server required • Compatible with GitHub & Vercel
        </p>
      </footer>
    </div>
  );
}
