# Parkinson’s Disease Detection – AI/ML Acoustic Biomarker Platform

A responsive medical-grade web application for non-invasive **Parkinson’s Disease Detection** using biomedical voice acoustic measurements and machine learning classification.

---

## 🔬 Core System Features

1. **Secure Healthcare Login**
   - Professional clinical authentication interface.
   - Demo-ready authentication with 1-click login without requiring an external backend.
   - Password show/hide toggle, Remember Me persistence, and Forgot Password flow.

2. **Interactive Clinical Dashboard**
   - Executive statistics: Total Predictions, Healthy Results, Parkinson’s Detected Results, and model accuracy metrics.
   - Recent patient prediction history summary.
   - Key acoustic biomarker breakdown cards (Pitch Period Entropy, Spread1, HNR, Jitter).

3. **Multi-Feature Vocal Prediction Form**
   - 22 acoustic biomedical voice measurements:
     - `MDVP:Fo(Hz)`, `MDVP:Fhi(Hz)`, `MDVP:Flo(Hz)`
     - `MDVP:Jitter(%)`, `MDVP:Jitter(Abs)`, `MDVP:RAP`, `MDVP:PPQ`, `Jitter:DDP`
     - `MDVP:Shimmer`, `MDVP:Shimmer(dB)`, `Shimmer:APQ3`, `Shimmer:APQ5`, `MDVP:APQ`, `Shimmer:DDA`
     - `NHR`, `HNR`
     - `RPDE`, `DFA`, `spread1`, `spread2`, `D2`, `PPE`
   - Real-time input validation with user-friendly error banners.
   - Preset buttons: **Healthy Control Sample**, **Mild Tremor**, and **Parkinson’s Positive**.

4. **Prediction Result & Decision Explanation**
   - Categorical outcome: **Parkinson’s Detected** or **Healthy**.
   - Model confidence percentage.
   - In-depth physiological explanation of acoustic deviations.
   - Actionable clinical recommendations.
   - Persistent notice: *“This result is for educational purposes only and is not a medical diagnosis.”*

5. **Local Storage Prediction History**
   - Client-side persistence using `localStorage`.
   - Search by patient name, record ID, or diagnosis.
   - Status filters (All, Healthy, Parkinson’s).
   - Export history as JSON for clinical records.

6. **Comprehensive Knowledge Base (About)**
   - What is Parkinson's Disease (neurobiology of dopamine depletion in the substantia nigra).
   - Cardinal motor symptoms & speech impairment (hypokinetic dysarthria).
   - Vocal acoustic biomarkers (frequency jitter, amplitude shimmer, nonlinear pitch entropy).
   - Machine learning role (SVM, Random Forest, multi-dimensional pattern recognition).
   - Clinical limitations and system boundaries.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Production Build (Vercel & GitHub Friendly)
```bash
npm run build
```

---

## ⚕️ Medical Disclaimer
This software is intended strictly for educational, scientific demonstration, and research purposes. It does not replace professional neurological evaluation, physical examination (UPDRS), or neuroimaging (DaTscan/MRI).
