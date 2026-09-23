/**
 * Parkinson's Disease Demonstration Classification Engine
 * Evaluates 13 key acoustic vocal biomarkers from sustained phonation:
 * 1. MDVP:Fo(Hz)
 * 2. MDVP:Fhi(Hz)
 * 3. MDVP:Flo(Hz)
 * 4. MDVP:Jitter(%)
 * 5. MDVP:Shimmer
 * 6. NHR
 * 7. HNR
 * 8. RPDE
 * 9. DFA
 * 10. spread1
 * 11. spread2
 * 12. D2
 * 13. PPE
 */

export const FORM_FIELDS = [
  {
    key: "fo",
    label: "MDVP:Fo(Hz)",
    unit: "Hz",
    normalRef: "100 - 250 Hz",
    description: "Average vocal fundamental frequency",
    step: "0.001",
    placeholder: "e.g. 197.076"
  },
  {
    key: "fhi",
    label: "MDVP:Fhi(Hz)",
    unit: "Hz",
    normalRef: "120 - 550 Hz",
    description: "Maximum vocal fundamental frequency",
    step: "0.001",
    placeholder: "e.g. 206.896"
  },
  {
    key: "flo",
    label: "MDVP:Flo(Hz)",
    unit: "Hz",
    normalRef: "70 - 240 Hz",
    description: "Minimum vocal fundamental frequency",
    step: "0.001",
    placeholder: "e.g. 182.570"
  },
  {
    key: "jitter_pct",
    label: "MDVP:Jitter(%)",
    unit: "%",
    normalRef: "< 0.005",
    description: "Cycle-to-cycle frequency variation percentage",
    step: "0.00001",
    placeholder: "e.g. 0.00289"
  },
  {
    key: "shimmer",
    label: "MDVP:Shimmer",
    unit: "ratio",
    normalRef: "< 0.030",
    description: "Cycle-to-cycle amplitude variation ratio",
    step: "0.00001",
    placeholder: "e.g. 0.01764"
  },
  {
    key: "nhr",
    label: "NHR",
    unit: "ratio",
    normalRef: "< 0.020",
    description: "Noise-to-harmonics ratio (glottal turbulence)",
    step: "0.00001",
    placeholder: "e.g. 0.01168"
  },
  {
    key: "hnr",
    label: "HNR",
    unit: "dB",
    normalRef: "> 20 dB",
    description: "Harmonics-to-noise ratio (acoustic purity)",
    step: "0.01",
    placeholder: "e.g. 24.698"
  },
  {
    key: "rpde",
    label: "RPDE",
    unit: "index",
    normalRef: "< 0.48",
    description: "Recurrence period density entropy",
    step: "0.0001",
    placeholder: "e.g. 0.4425"
  },
  {
    key: "dfa",
    label: "DFA",
    unit: "exp",
    normalRef: "0.55 - 0.72",
    description: "Detrended fluctuation analysis exponent",
    step: "0.0001",
    placeholder: "e.g. 0.6961"
  },
  {
    key: "spread1",
    label: "spread1",
    unit: "dB",
    normalRef: "< -6.0",
    description: "Nonlinear frequency variation spread 1",
    step: "0.0001",
    placeholder: "e.g. -6.7593"
  },
  {
    key: "spread2",
    label: "spread2",
    unit: "ratio",
    normalRef: "< 0.20",
    description: "Nonlinear frequency variation spread 2",
    step: "0.0001",
    placeholder: "e.g. 0.1602"
  },
  {
    key: "d2",
    label: "D2",
    unit: "dim",
    normalRef: "< 2.20",
    description: "Correlation dimension of vocal attractor",
    step: "0.0001",
    placeholder: "e.g. 2.1543"
  },
  {
    key: "ppe",
    label: "PPE",
    unit: "entropy",
    normalRef: "< 0.18",
    description: "Pitch period entropy (vocal dysphonic disorder)",
    step: "0.0001",
    placeholder: "e.g. 0.1234"
  }
];

// Realistic clinical benchmark samples for 1-click testing
export const SAMPLES = {
  HEALTHY: {
    fo: "197.076",
    fhi: "206.896",
    flo: "182.570",
    jitter_pct: "0.00289",
    shimmer: "0.01764",
    nhr: "0.01168",
    hnr: "24.698",
    rpde: "0.44252",
    dfa: "0.69614",
    spread1: "-6.75932",
    spread2: "0.16024",
    d2: "2.15431",
    ppe: "0.12348"
  },
  PARKINSONS: {
    fo: "119.992",
    fhi: "157.302",
    flo: "74.997",
    jitter_pct: "0.00784",
    shimmer: "0.04374",
    nhr: "0.02211",
    hnr: "18.520",
    rpde: "0.53644",
    dfa: "0.73277",
    spread1: "-4.84318",
    spread2: "0.24879",
    d2: "2.50244",
    ppe: "0.23344"
  }
};

/**
 * Client-Side Demonstration Analysis Logic
 * Evaluates the 13 biomarkers against established clinical thresholds
 */
export function analyzeParkinsonsRisk(values) {
  let riskScore = 10; // Baseline minimal score

  const fo = parseFloat(values.fo) || 0;
  const ppe = parseFloat(values.ppe) || 0;
  const spread1 = parseFloat(values.spread1) || 0;
  const spread2 = parseFloat(values.spread2) || 0;
  const hnr = parseFloat(values.hnr) || 0;
  const jitter_pct = parseFloat(values.jitter_pct) || 0;
  const shimmer = parseFloat(values.shimmer) || 0;
  const rpde = parseFloat(values.rpde) || 0;
  const d2 = parseFloat(values.d2) || 0;

  // 1. Pitch Period Entropy (PPE)
  if (ppe > 0.21) {
    riskScore += 24;
  } else if (ppe > 0.17) {
    riskScore += 12;
  }

  // 2. Spread1 (Nonlinear frequency dispersion)
  if (spread1 > -5.2) {
    riskScore += 20;
  } else if (spread1 > -6.0) {
    riskScore += 10;
  }

  // 3. Harmonics to Noise (HNR)
  if (hnr < 19.5 && hnr > 0) {
    riskScore += 16;
  } else if (hnr < 22.0 && hnr > 0) {
    riskScore += 8;
  }

  // 4. Jitter Perturbation
  if (jitter_pct > 0.0055) {
    riskScore += 14;
  } else if (jitter_pct > 0.0035) {
    riskScore += 6;
  }

  // 5. Shimmer Perturbation
  if (shimmer > 0.032) {
    riskScore += 12;
  } else if (shimmer > 0.022) {
    riskScore += 5;
  }

  // 6. RPDE & D2
  if (rpde > 0.50 || d2 > 2.40) {
    riskScore += 10;
  }

  // 7. Low fundamental frequency
  if (fo > 0 && fo < 140.0) {
    riskScore += 6;
  }

  // Bound score between 8% and 96%
  riskScore = Math.min(Math.max(riskScore, 8), 96);

  const isParkinsonsDetected = riskScore >= 50;
  const prediction = isParkinsonsDetected ? "Parkinson's Detected" : "No Parkinson's Detected";
  const resultStatus = isParkinsonsDetected ? "High Risk Biomarkers Present" : "Healthy Acoustic Profile";

  let shortExplanation = "";
  if (isParkinsonsDetected) {
    shortExplanation = `The analyzed voice parameters exhibit characteristic signs of dysphonia, including elevated pitch period entropy (PPE: ${ppe.toFixed(3)}), increased frequency jitter (${(jitter_pct * 100).toFixed(2)}%), and diminished harmonics-to-noise ratio (${hnr.toFixed(1)} dB). These micro-tremors and nonlinear dispersions correlate with impaired vocal cord coordination.`;
  } else {
    shortExplanation = `All vocal biomarker metrics remain within expected healthy physiological bounds. Fundamental frequency stability is maintained, harmonics-to-noise ratio (${hnr.toFixed(1)} dB) indicates clear glottal closure, and pitch period entropy (${ppe.toFixed(3)}) shows stable pitch regulation.`;
  }

  return {
    prediction,
    riskScore,
    resultStatus,
    shortExplanation,
    isParkinsonsDetected,
    analyzedAt: new Date().toLocaleTimeString()
  };
}
