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
  Info, 
  FileText,
  Sliders,
  TrendingUp,
  Brain
} from 'lucide-react';

export default function App() {
  // 13 vocal biomarker form fields
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
  const [activeSample, setActiveSample] = useState(null);

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
    setActiveSample('healthy');
    setAnalysisResult(null);
  };

  // 1-Click Load Sample - Parkinson's
  const handleLoadParkinsons = () => {
    setFormData(SAMPLES.PARKINSONS);
    setErrors({});
    setActiveSample('parkinsons');
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
    setActiveSample(null);
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

    setTimeout(() => {
      setIsAnalyzing(false);
      const result = analyzeParkinsonsRisk(formData);
      
      // Determine risk level based on risk score
      let riskLevel = "Low Risk";
      if (result.riskScore >= 75) {
        riskLevel = "High Risk";
      } else if (result.riskScore >= 45) {
        riskLevel = "Moderate / High Risk";
      } else if (result.riskScore >= 25) {
        riskLevel = "Mild / Low Risk";
      }

      setAnalysisResult({
        ...result,
        riskLevel,
        submittedValues: { ...formData }
      });

      setTimeout(() => {
        const outputEl = document.getElementById('result-section');
        if (outputEl) {
          outputEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased">
      
      {/* 1. HEADER */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 shrink-0">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 leading-tight">
                  Parkinson's Disease Detection
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  <Sparkles className="w-3 h-3 text-blue-600" />
                  DEMO MODE
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                AI/ML Based Vocal Biomarker Analysis
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="hidden md:inline-flex text-xs font-semibold text-slate-500">
              Oxford Vocal Biomarker Telemetry
            </span>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER: Centered with max-w-6xl (around 1152px) */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* 2. EDUCATIONAL NOTICE */}
        <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-4 sm:p-5 flex items-start gap-3.5 text-blue-900 shadow-sm">
          <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs sm:text-sm">
            <p className="font-bold text-blue-950">
              Educational Demonstration Only — This result is not a medical diagnosis.
            </p>
            <p className="text-blue-800 leading-relaxed">
              This client-side application demonstrates how machine learning evaluates sustained phonation voice acoustics (such as fundamental frequency perturbation, amplitude shimmer, noise harmonics, and pitch period entropy) to identify early dysphonia indicators without requiring a backend server.
            </p>
          </div>
        </div>

        {/* 3. DEMO SAMPLE BUTTONS BAR */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
            <Sliders className="w-4 h-4 text-blue-600" />
            <span>Quick Clinical Presets:</span>
            <span className="text-slate-400 font-normal hidden sm:inline">Auto-populate with verified benchmark voice measurements</span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handleLoadHealthy}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer flex-1 sm:flex-none ${
                activeSample === 'healthy'
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
              className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer flex-1 sm:flex-none ${
                activeSample === 'parkinsons'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              Load Sample - Parkinson's
            </button>
          </div>
        </div>

        {/* 4. BIOMARKER INPUT CARD (Form with 13 features in responsive grid) */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-600" />
                Vocal Phonation Biomarker Inputs
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Enter all 13 acoustic vocal parameters extracted from sustained vowel phonation (/a/)
              </p>
            </div>
            <span className="self-start sm:self-auto px-3 py-1 bg-slate-100 text-slate-700 text-xs font-mono font-semibold rounded-lg border border-slate-200">
              13 Features Model
            </span>
          </div>

          {/* Validation Banner if errors present */}
          {Object.keys(errors).length > 0 && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
              <span>
                Please fill in all 13 fields with numeric values or click <strong>Load Sample - Healthy</strong> or <strong>Load Sample - Parkinson's</strong>.
              </span>
            </div>
          )}

          {/* Responsive Form Grid: 1-col on mobile, 2-cols on tablet, 3-cols / 4-cols on desktop */}
          <form onSubmit={handleAnalyze} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
              {FORM_FIELDS.map((field, idx) => {
                const hasError = !!errors[field.key];
                return (
                  <div 
                    key={field.key}
                    className={`p-3.5 rounded-xl border transition-all ${
                      hasError 
                        ? 'bg-red-50/50 border-red-300' 
                        : 'bg-slate-50/70 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <label 
                        htmlFor={`input-${field.key}`}
                        className="text-xs font-bold font-mono text-slate-800 flex items-center gap-1.5"
                      >
                        <span className="text-[10px] text-blue-600 font-sans font-semibold">#{idx + 1}</span>
                        {field.label}
                      </label>
                      <span className="text-[10px] text-slate-500 font-mono">
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
                        className={`w-full h-10 px-3 py-2 bg-white border rounded-lg text-xs font-mono text-slate-900 placeholder-slate-400 focus:outline-none transition ${
                          hasError 
                            ? 'border-red-500 focus:ring-2 focus:ring-red-400' 
                            : 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                        }`}
                      />
                      <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-[10px] text-slate-400 pointer-events-none font-mono">
                        {field.unit}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-1.5 text-[10px] text-slate-500">
                      <span className="truncate" title={field.description}>
                        {field.description}
                      </span>
                      {hasError && (
                        <span className="text-red-600 font-bold shrink-0 ml-1">
                          {errors[field.key]}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 5. MAIN ACTION BUTTONS: Analyze / Clear */}
            <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-6 border-t border-slate-100">
              <button
                type="button"
                onClick={handleClear}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs border border-slate-200 flex items-center justify-center gap-2 transition cursor-pointer"
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
                    <span>Analyzing Phonation Telemetry...</span>
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
        </div>

        {/* 6. RESULT SECTION (Separate styled card) */}
        {analysisResult && (
          <div 
            id="result-section" 
            className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6 animate-fadeIn"
          >
            {/* Prediction Header & Score Indicator */}
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-100 gap-5">
              <div className="flex items-start sm:items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm shrink-0 ${
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
                    Analysis Prediction
                  </span>
                  <h3 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
                    analysisResult.isParkinsonsDetected ? 'text-rose-700' : 'text-emerald-700'
                  }`}>
                    {analysisResult.prediction}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <span className="text-xs text-slate-500">
                      Analysis Status: <strong className="text-slate-800">{analysisResult.resultStatus}</strong>
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs text-slate-500">
                      Risk Level: <strong className={analysisResult.isParkinsonsDetected ? 'text-rose-700' : 'text-emerald-700'}>{analysisResult.riskLevel}</strong>
                    </span>
                  </div>
                </div>
              </div>

              {/* Circular / Box Score Gauge */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-4 shrink-0 self-start md:self-auto">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Risk Score
                  </p>
                  <p className={`text-3xl font-black font-mono leading-none mt-0.5 ${
                    analysisResult.isParkinsonsDetected ? 'text-rose-600' : 'text-emerald-600'
                  }`}>
                    {analysisResult.riskScore}%
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1 font-mono">
                    Scale: 0% - 100%
                  </p>
                </div>

                {/* Visual Circular Gauge */}
                <div className="w-14 h-14 rounded-full border-4 border-slate-200 flex items-center justify-center relative bg-white shadow-inner">
                  <div 
                    className={`w-14 h-14 rounded-full border-4 absolute ${
                      analysisResult.isParkinsonsDetected ? 'border-rose-500' : 'border-emerald-500'
                    }`}
                    style={{
                      clipPath: `polygon(50% 50%, -50% -50%, ${analysisResult.riskScore}% -50%, ${analysisResult.riskScore}% 150%)`
                    }}
                  />
                  <span className="text-xs font-mono font-bold text-slate-800">
                    {analysisResult.riskScore}%
                  </span>
                </div>
              </div>
            </div>

            {/* Linear Progress Bar Indicator */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-slate-600">
                <span>Risk Spectrum Indicator</span>
                <span className={analysisResult.isParkinsonsDetected ? 'text-rose-600' : 'text-emerald-600'}>
                  {analysisResult.riskLevel} ({analysisResult.riskScore}%)
                </span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex border border-slate-200">
                <div 
                  className={`h-full transition-all duration-700 ${
                    analysisResult.isParkinsonsDetected 
                      ? 'bg-gradient-to-r from-amber-500 to-rose-600' 
                      : 'bg-gradient-to-r from-blue-500 to-emerald-500'
                  }`}
                  style={{ width: `${analysisResult.riskScore}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 font-mono pt-0.5">
                <span>0% (Low Risk)</span>
                <span>50% (Threshold)</span>
                <span>100% (High Risk)</span>
              </div>
            </div>

            {/* Short Explanation */}
            <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-blue-600" />
                Acoustic Phonation Explanation
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {analysisResult.shortExplanation}
              </p>
            </div>

            {/* Submitted Values Grid */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Captured Acoustic Feature Readings
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
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

            {/* Notice in Result */}
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs flex items-center gap-2.5">
              <Info className="w-4 h-4 text-blue-600 shrink-0" />
              <span className="font-semibold">
                Educational Demonstration Only — This result is not a medical diagnosis.
              </span>
            </div>
          </div>
        )}

        {/* 7. EDUCATIONAL DISCLAIMER FOOTER CARD */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm text-center space-y-1.5">
          <p className="text-xs font-bold text-slate-800">
            Educational Demonstration Only — This result is not a medical diagnosis.
          </p>
          <p className="text-xs text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Parkinson's Disease requires specialized clinical neurological examination (UPDRS), movement motor assessments, and neuroimaging (DaTscan/MRI). This acoustic vocal analysis model is developed exclusively for scientific study and machine learning demonstration.
          </p>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 px-4 text-center text-xs text-slate-500 mt-auto">
        <p className="font-semibold text-slate-700">
          Parkinson's Disease Detection • AI/ML Based Vocal Biomarker Analysis
        </p>
        <p className="mt-1 text-slate-400">
          Oxford Vocal Biomarker Reference Study (Little et al.) • Zero-backend client demonstration
        </p>
      </footer>
    </div>
  );
}
