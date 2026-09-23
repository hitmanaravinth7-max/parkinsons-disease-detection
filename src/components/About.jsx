import React from 'react';
import { 
  Info, 
  Brain, 
  Activity, 
  Mic, 
  Cpu, 
  AlertTriangle, 
  HelpCircle, 
  Stethoscope, 
  ShieldCheck, 
  FileText, 
  ListChecks, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function About({ onNavigateToPredict }) {
  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="glass-panel rounded-2xl p-6 md:p-8 border border-slate-800 bg-slate-900/70 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/15 text-teal-300 border border-teal-500/30">
            <Info className="w-3.5 h-3.5" />
            <span>Clinical Knowledge Base</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            About Parkinson’s Disease & Vocal Biomarkers
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Understanding the physiological mechanisms of Parkinson's Disease, early phonation markers, machine learning classification methods, and system diagnostic limitations.
          </p>
        </div>

        {/* Educational Notice Banner */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-2.5 text-xs text-amber-300 bg-amber-500/10 -mx-6 md:-mx-8 -mb-6 md:-mb-8 px-6 md:px-8 py-3">
          <Info className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="font-semibold">
            This result is for educational purposes only and is not a medical diagnosis.
          </span>
        </div>
      </div>

      {/* 1. What is Parkinson's Disease? */}
      <div className="glass-panel rounded-2xl p-6 md:p-8 border border-slate-800 bg-slate-900/60 shadow-lg space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-300">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">What is Parkinson’s Disease?</h2>
            <p className="text-xs text-slate-400">Neurodegenerative disorder of the central nervous system</p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Parkinson’s Disease (PD) is a progressive neurodegenerative condition caused primarily by the loss of dopamine-producing neurons in the <em>substantia nigra</em> region of the midbrain. Dopamine is an essential neurotransmitter responsible for coordinating smooth, controlled muscle movements throughout the human body.
        </p>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          As dopamine levels decline, individuals experience progressive deterioration in both motor functions (such as locomotion, limb agility, and vocal fold coordination) and non-motor functions (such as sleep, cognition, and autonomic nervous regulation).
        </p>
      </div>

      {/* 2. Common Symptoms of Parkinson's Disease */}
      <div className="glass-panel rounded-2xl p-6 md:p-8 border border-slate-800 bg-slate-900/60 shadow-lg space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-300">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Clinical Symptoms</h2>
            <p className="text-xs text-slate-400">Primary cardinal signs and secondary manifestations</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Motor Symptoms */}
          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 space-y-2">
            <h3 className="text-xs font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-teal-400" />
              Cardinal Motor Symptoms
            </h3>
            <ul className="text-xs text-slate-300 space-y-2">
              <li className="flex items-start gap-2">
                <strong className="text-white shrink-0">• Resting Tremor:</strong> Involuntary rhythmic shaking, often starting unilaterally in a hand or fingers (pill-rolling motion).
              </li>
              <li className="flex items-start gap-2">
                <strong className="text-white shrink-0">• Bradykinesia:</strong> Marked slowness of spontaneous physical movement and difficulty initiating motion.
              </li>
              <li className="flex items-start gap-2">
                <strong className="text-white shrink-0">• Muscle Rigidity:</strong> Stiffness and resistance to passive limb flexion (cogwheel rigidity).
              </li>
              <li className="flex items-start gap-2">
                <strong className="text-white shrink-0">• Postural Instability:</strong> Impaired balance leading to stooped posture and elevated fall risk.
              </li>
            </ul>
          </div>

          {/* Phonation & Speech Symptoms */}
          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 space-y-2">
            <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              Speech & Phonation Impairment (Hypokinetic Dysarthria)
            </h3>
            <ul className="text-xs text-slate-300 space-y-2">
              <li className="flex items-start gap-2">
                <strong className="text-white shrink-0">• Hypophonia:</strong> Abnormally soft, monotone, or fading voice volume due to respiratory muscle rigidity.
              </li>
              <li className="flex items-start gap-2">
                <strong className="text-white shrink-0">• Vocal Tremor:</strong> Micro-oscillations in fundamental pitch and glottal amplitude.
              </li>
              <li className="flex items-start gap-2">
                <strong className="text-white shrink-0">• Breathy / Hoarse Quality:</strong> Incomplete vocal cord adduction producing turbulent airflow.
              </li>
              <li className="flex items-start gap-2">
                <strong className="text-white shrink-0">• Speech Festination:</strong> Rapid, rushed bursts of words with imprecise consonant articulation.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. How Voice Features Can Be Used for Detection */}
      <div className="glass-panel rounded-2xl p-6 md:p-8 border border-slate-800 bg-slate-900/60 shadow-lg space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-300">
            <Mic className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">How Voice Features Can Be Used</h2>
            <p className="text-xs text-slate-400">Non-invasive digital biomarkers through sustained vowel phonation</p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Over <strong>90% of individuals with Parkinson’s Disease</strong> display quantifiable speech and voice impairments during early stages—often years before significant limb tremors or postural changes become clinically obvious.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-700/60 space-y-1">
            <span className="font-bold text-teal-300 block">Frequency Perturbation (Jitter)</span>
            <p className="text-slate-400">
              Measures period-to-period variability in vocal cord vibration frequency. Healthy vocal folds vibrate with high periodicity, whereas Parkinsonian rigidity produces noticeable jitter.
            </p>
          </div>
          <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-700/60 space-y-1">
            <span className="font-bold text-blue-300 block">Amplitude Perturbation (Shimmer)</span>
            <p className="text-slate-400">
              Quantifies cycle-to-cycle variability in sound wave peak amplitude. Instability in subglottic breath pressure causes elevated shimmer (both in percentage and decibels).
            </p>
          </div>
          <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-700/60 space-y-1">
            <span className="font-bold text-purple-300 block">Nonlinear Pitch Entropy (PPE / RPDE)</span>
            <p className="text-slate-400">
              Applies dynamical systems theory and recurrence entropy to detect chaotic, unpredictable vocal fold movement that cannot be measured by classical linear acoustics alone.
            </p>
          </div>
        </div>
      </div>

      {/* 4. How Machine Learning Helps */}
      <div className="glass-panel rounded-2xl p-6 md:p-8 border border-slate-800 bg-slate-900/60 shadow-lg space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-300">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">How Machine Learning Helps</h2>
            <p className="text-xs text-slate-400">High-dimensional pattern recognition across subtle vocal cues</p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Traditional human ear assessment cannot perceive micro-jitter differences under 0.005 seconds or pitch period entropy shifts. Machine learning algorithms (such as <strong>Support Vector Machines (SVM)</strong>, <strong>Random Forest Ensembles</strong>, and <strong>XGBoost Classifiers</strong>) excel at detecting non-linear multidimensional correlations across 22 simultaneous acoustic parameters.
        </p>

        <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 space-y-2 text-xs">
          <h4 className="font-bold text-white">Key Machine Learning Advantages:</h4>
          <ul className="space-y-1.5 text-slate-300">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
              <span><strong>Early Telemonitoring:</strong> Enables remote screening using standard telecommunication microphones.</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
              <span><strong>Objective Quantifiable Scoring:</strong> Eliminates subjective doctor-to-doctor auditory variations.</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
              <span><strong>Longitudinal Tracking:</strong> Provides continuous data points to observe medication effectiveness (Levodopa on/off cycles).</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 5. Limitations of the System */}
      <div className="glass-panel rounded-2xl p-6 md:p-8 border border-rose-500/30 bg-slate-900/60 shadow-lg space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-300">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Limitations of the System</h2>
            <p className="text-xs text-rose-300/80">Crucial clinical constraints and boundary conditions</p>
          </div>
        </div>

        <div className="space-y-2.5 text-xs text-slate-300">
          <p>
            While biomedical vocal classification achieves high benchmark accuracy in research cohorts, users must recognize the following inherent limitations:
          </p>
          <ul className="space-y-2 list-disc pl-5 text-slate-300">
            <li>
              <strong className="text-white">Acoustic Overlap with Other Conditions:</strong> Vocal tremor, elevated jitter, and reduced HNR can also be caused by acute laryngitis, vocal fold nodules, essential vocal tremor, asthma, severe fatigue, or normal biological aging.
            </li>
            <li>
              <strong className="text-white">Microphone Quality & Background Noise:</strong> Environmental room reverberation or low-fidelity microphone compression can falsely inflate jitter and noise ratios.
            </li>
            <li>
              <strong className="text-white">Not a Standalone Diagnostic Tool:</strong> Definitive Parkinson's diagnosis requires a comprehensive physical neurological examination (UPDRS rating scale, bradykinesia tests, rigidity resistance evaluation) and specialist neuroimaging (DaTscan / MRI).
            </li>
            <li>
              <strong className="text-white">Educational & Research Focus:</strong> This application is intended solely as an educational demonstration of acoustic machine learning and biomedical feature extraction.
            </li>
          </ul>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onNavigateToPredict}
            className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-teal-500/20 transition cursor-pointer"
          >
            <span>Proceed to Voice Prediction Tool</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
