# FinGuard AI – Real-Time Fraud Detection for Digital Transactions

FinGuard AI is a modern, responsive cybersecurity and fintech web application designed to monitor digital transactions in real time, evaluate multi-dimensional risk scores, simulate machine-learning-driven anomaly detection (Isolation Forest + XGBoost hybrid architecture), and alert security analysts to suspicious activities.

![FinGuard AI Banner](public/banner.png)

## 🛡️ Key Features

- **Cybersecurity & Fintech UI**: Futuristic dark theme with glassmorphism, glowing telemetry indicators, and high visual contrast.
- **Authentication**: Demo login with credential validation, password show/hide, remember me, and 1-click test credentials (`admin@finguard.ai` / `admin123`).
- **Live System Radar**: Real-time canvas radar scanner visualizing active transactions, DEFCON threat levels, and network telemetry.
- **Real-Time Simulation**: Turn on live transaction streaming to see auto-generated banking transactions evaluate against the fraud detection engine.
- **Heuristic & Hybrid Scoring Engine**: Multi-factor scoring incorporating transaction amount velocity, geographic anomalies, device novelty, off-hours execution, and previous fraud indicators.
- **Interactive Transaction Analyzer**: Dedicated simulator to input custom transactions with sender/receiver accounts, device parameters, and frequency metrics to inspect AI fraud reasoning.
- **AI Detection Engine (Architecture)**: Visual documentation of the intended enterprise architecture utilizing an unsupervised Isolation Forest for zero-day anomaly detection combined with a supervised XGBoost classifier.
- **Fraud Alerts Management**: Real-time triage center for reviewing, dismissing, or inspecting high-risk flagged transactions.
- **Interactive Analytics**: Dynamic charts powered by Chart.js tracking transaction volume, fraud trends, risk distribution, payment channels, and geographic hotspots.
- **Transaction Details Modal**: Deep-dive telemetry inspection with device fingerprinting and risk breakdown.
- **Local Persistence**: Stores authentication, live transactions, alerts, and settings in browser `localStorage`.
- **Responsive Design**: Flawlessly adapts across desktop, tablet, and mobile displays.

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js (version 18+ recommended)
- npm or yarn

### Installation
```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 🌐 Deploy to Vercel

FinGuard AI is built to deploy on Vercel with zero configuration required:

1. Push this repository to **GitHub**.
2. Go to [Vercel](https://vercel.com) and import the repository.
3. Keep default settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click **Deploy**.

---

## 🧠 Intended ML Architecture

In a production environment, the frontend connects to an enterprise Python/FastAPI microservice running:
1. **Unsupervised Anomaly Detection**: Isolation Forest detects outlier patterns without requiring pre-labeled fraud vectors.
2. **Supervised Classification**: XGBoost / LightGBM evaluates known fraud vectors with calibrated probabilities.
3. **Fusion Gate**: Weighted ensemble score `Risk = α · AnomalyScore + β · XGBoostScore + Heuristics`.
4. **Sub-30ms Inference**: Evaluated in-memory with real-time decision gating.

---

## 🔒 Security Notice
*Demo Simulation Notice*: This application operates as a safe client-side simulation for security analysis UI demonstrations and does not claim measured production accuracy or real banking connectivity without backend integration.
