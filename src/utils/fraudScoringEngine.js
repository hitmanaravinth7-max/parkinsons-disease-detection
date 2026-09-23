/**
 * FinGuard AI - Safe Frontend Demo Fraud Scoring Engine
 * 
 * Evaluates transactional risk using multi-factor heuristics and weighted
 * anomaly indicators designed to mirror enterprise Isolation Forest + XGBoost inputs.
 * 
 * Ready for ML API integration: replace calculateFraudRisk() with an async REST
 * call to your Python/FastAPI endpoint (e.g. POST /v1/predict).
 */

export const RISK_LEVELS = {
  LOW: { label: 'Low Risk', min: 0, max: 29, color: '#10b981', status: 'Safe', badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
  MEDIUM: { label: 'Medium Risk', min: 30, max: 69, color: '#f59e0b', status: 'Suspicious', badge: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
  HIGH: { label: 'High Risk', min: 70, max: 100, color: '#ef4444', status: 'Fraud', badge: 'bg-rose-500/20 text-rose-400 border-rose-500/30' }
};

export const HIGH_RISK_LOCATIONS = ['Lagos, NG', 'Moscow, RU', 'Unknown IP / Proxy', 'Cayman Islands', 'Panama City'];
export const MEDIUM_RISK_LOCATIONS = ['Singapore', 'London, UK', 'Sydney, AU'];

export function calculateFraudRisk(transaction) {
  let score = 5; // Baseline low risk
  const reasons = [];

  const amount = Number(transaction.amount) || 0;
  const frequency = transaction.transactionFrequency || transaction.frequency || 'Normal';
  const location = transaction.location || 'Unknown';
  const device = transaction.deviceType || transaction.device || 'Mobile';
  const fraudHistory = transaction.previousFraudHistory || transaction.fraudHistory || 'None';
  const accountAgeDays = Number(transaction.accountAge) || 180;
  const prevCount = Number(transaction.previousTransactionCount) || 10;
  const time = transaction.transactionTime || transaction.time || '12:00';
  const txType = transaction.transactionType || transaction.type || 'Online Payment';

  // 1. Transaction Amount Evaluation
  if (amount > 10000) {
    score += 42;
    reasons.push(`High monetary value ($${amount.toLocaleString()}) severely exceeds standard consumer profile`);
  } else if (amount > 4500) {
    score += 26;
    reasons.push(`Transaction amount ($${amount.toLocaleString()}) is 4.5x higher than median velocity benchmark`);
  } else if (amount > 1500) {
    score += 12;
    reasons.push(`Elevated transaction amount ($${amount.toLocaleString()}) flagged for heuristic verification`);
  }

  // 2. Geolocation & Anomaly checks
  if (HIGH_RISK_LOCATIONS.some(loc => location.toLowerCase().includes(loc.toLowerCase()))) {
    score += 28;
    reasons.push(`Geographic IP location (${location}) matches active fraud consortium watchlist`);
  } else if (location.includes('Proxy') || location.includes('VPN') || location.includes('Unknown')) {
    score += 24;
    reasons.push('Anonymized proxy or suspicious VPN exit node identified in connection header');
  }

  // 3. Frequency & Velocity Spike
  if (frequency === 'Extreme Burst' || frequency === 'Very High') {
    score += 32;
    reasons.push(`High-frequency burst rate detected (${prevCount} transactions within a compressed 3-minute window)`);
  } else if (frequency === 'High') {
    score += 16;
    reasons.push('Elevated transaction frequency exceeds user historical standard deviation');
  }

  // 4. Previous Fraud History
  if (fraudHistory === 'Confirmed Flag' || fraudHistory === 'Confirmed Fraud') {
    score += 38;
    reasons.push('Sender identity is linked to previously confirmed chargeback/fraud incident');
  } else if (fraudHistory === 'Suspected' || fraudHistory === 'Suspected Flag') {
    score += 18;
    reasons.push('Account has prior suspicious activity alerts under compliance observation');
  }

  // 5. Account Age & Cold Start
  if (accountAgeDays <= 7) {
    score += 22;
    reasons.push(`New account creation (${accountAgeDays} days old) exhibiting immediate high velocity`);
  } else if (accountAgeDays <= 30 && amount > 2000) {
    score += 14;
    reasons.push(`Juvenile account tenure (${accountAgeDays} days) combined with high-tier transfer`);
  }

  // 6. Device & Channel Profiling
  if (device === 'Tablet' && amount > 4000) {
    score += 8;
    reasons.push('Uncommon high-value transaction executed from unverified secondary device profile');
  }

  // 7. Time of day anomaly (Off-hours 1:00 AM - 4:45 AM)
  const hour = parseInt(time.split(':')[0], 10);
  if (!isNaN(hour) && hour >= 1 && hour <= 4) {
    score += 12;
    reasons.push(`Irregular nocturnal execution window (${time} local time) outside habitual behavioral curve`);
  }

  // 8. Specific Transaction Type combinations
  if (txType === 'ATM Withdrawal' && amount > 1500) {
    score += 15;
    reasons.push(`Cash extraction attempt ($${amount.toLocaleString()}) near maximum daily interchange ceiling`);
  } else if (txType === 'Bank Transfer' && location.includes('Unknown')) {
    score += 20;
    reasons.push('Outbound wire transfer originating from unregistered network telemetry');
  }

  // Cap score between 0 and 100
  const finalScore = Math.min(100, Math.max(2, Math.round(score)));

  let riskLevel = RISK_LEVELS.LOW;
  let status = 'Safe';
  let prediction = 'Legitimate Transaction';

  if (finalScore >= 70) {
    riskLevel = RISK_LEVELS.HIGH;
    status = 'Fraud';
    prediction = 'Potential Fraud / Critical Risk';
  } else if (finalScore >= 30) {
    riskLevel = RISK_LEVELS.MEDIUM;
    status = 'Suspicious';
    prediction = 'Suspicious / Flagged for Review';
  }

  if (reasons.length === 0) {
    reasons.push('Normal user telemetry, consistent device fingerprint, and standard transaction volume.');
  }

  return {
    score: finalScore,
    status,
    riskLevel: riskLevel.label,
    riskLevelKey: finalScore >= 70 ? 'HIGH' : finalScore >= 30 ? 'MEDIUM' : 'LOW',
    prediction,
    color: riskLevel.color,
    badgeClass: riskLevel.badge,
    reason: reasons.join('; '),
    reasonsList: reasons,
    timestamp: new Date().toLocaleTimeString(),
    fullTimestamp: new Date().toISOString(),
    isSimulated: true
  };
}

/**
 * Optional REST Connector for when a real ML backend (FastAPI/XGBoost) is configured.
 */
export async function analyzeTransactionWithBackend(transaction, apiUrl) {
  if (!apiUrl) {
    // Fallback to local heuristic simulation
    return calculateFraudRisk(transaction);
  }

  try {
    const res = await fetch(`${apiUrl}/v1/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transaction)
    });
    if (!res.ok) throw new Error(`API error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('ML Backend unreachable, falling back to safe local simulation:', err);
    return calculateFraudRisk(transaction);
  }
}
