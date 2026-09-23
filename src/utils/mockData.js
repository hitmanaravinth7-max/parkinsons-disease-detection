import { calculateFraudRisk } from './fraudScoringEngine';

export const CITIES = [
  'New York, USA',
  'London, UK',
  'Tokyo, Japan',
  'Singapore',
  'Frankfurt, Germany',
  'Lagos, NG',
  'Sydney, Australia',
  'Toronto, Canada',
  'Moscow, RU',
  'Zurich, Switzerland',
  'Dubai, UAE',
  'San Francisco, USA',
  'Unknown IP / Proxy'
];

export const DEVICES = ['Mobile (iOS)', 'Mobile (Android)', 'Desktop (Chrome/Mac)', 'Desktop (Windows)', 'Tablet (iPad)'];
export const TX_TYPES = ['Online Payment', 'Bank Transfer', 'ATM Withdrawal', 'Card Payment', 'Mobile Payment'];

export const INITIAL_TRANSACTIONS = [
  {
    id: 'TX-984210',
    senderAccount: 'ACCT-4891-US',
    receiverAccount: 'ACCT-8821-SG',
    amount: 1420.50,
    type: 'Bank Transfer',
    location: 'Frankfurt, Germany',
    device: 'Desktop (Chrome/Mac)',
    ip: '194.26.29.11',
    time: '14:23:10',
    score: 18,
    status: 'Safe',
    riskLevel: 'Low Risk',
    reason: 'Standard domestic transfer velocity and recognized user device profile.',
    timestamp: '2 mins ago'
  },
  {
    id: 'TX-984209',
    senderAccount: 'ACCT-9024-UK',
    receiverAccount: 'ACCT-1132-NG',
    amount: 8950.00,
    type: 'Online Payment',
    location: 'Lagos, NG',
    device: 'Mobile (Android)',
    ip: '102.89.23.144',
    time: '14:22:45',
    score: 84,
    status: 'Fraud',
    riskLevel: 'High Risk',
    reason: 'High monetary value ($8,950) exceeds account average; geo-location anomaly detected.',
    timestamp: '3 mins ago'
  },
  {
    id: 'TX-984208',
    senderAccount: 'ACCT-3312-CA',
    receiverAccount: 'ACCT-6641-US',
    amount: 320.00,
    type: 'Card Payment',
    location: 'Toronto, Canada',
    device: 'Mobile (iOS)',
    ip: '142.250.190.46',
    time: '14:22:15',
    score: 12,
    status: 'Safe',
    riskLevel: 'Low Risk',
    reason: 'Verified POS contactless terminal transaction with matching cardholder telemetry.',
    timestamp: '3 mins ago'
  },
  {
    id: 'TX-984207',
    senderAccount: 'ACCT-7718-DE',
    receiverAccount: 'ACCT-9921-RU',
    amount: 5400.00,
    type: 'Bank Transfer',
    location: 'Moscow, RU',
    device: 'Tablet (iPad)',
    ip: '185.220.101.5',
    time: '14:21:50',
    score: 76,
    status: 'Fraud',
    riskLevel: 'High Risk',
    reason: 'Anonymized VPN exit node; international outbound transfer to flagged corridor.',
    timestamp: '4 mins ago'
  },
  {
    id: 'TX-984206',
    senderAccount: 'ACCT-5531-JP',
    receiverAccount: 'ACCT-2209-JP',
    amount: 2150.00,
    type: 'Online Payment',
    location: 'Tokyo, Japan',
    device: 'Desktop (Windows)',
    ip: '133.242.18.99',
    time: '14:20:12',
    score: 48,
    status: 'Suspicious',
    riskLevel: 'Medium Risk',
    reason: 'Transaction frequency velocity jump: 4 consecutive transactions in 90 seconds.',
    timestamp: '5 mins ago'
  },
  {
    id: 'TX-984205',
    senderAccount: 'ACCT-1029-US',
    receiverAccount: 'ACCT-5511-US',
    amount: 85.00,
    type: 'Mobile Payment',
    location: 'New York, USA',
    device: 'Mobile (iOS)',
    ip: '72.229.28.185',
    time: '14:19:40',
    score: 8,
    status: 'Safe',
    riskLevel: 'Low Risk',
    reason: 'Peer-to-peer mobile transfer verified via biometric passkey.',
    timestamp: '6 mins ago'
  }
];

export const INITIAL_ALERTS = [
  {
    id: 'ALT-1092',
    txId: 'TX-984209',
    amount: 8950.00,
    riskScore: 84,
    location: 'Lagos, NG',
    reason: 'Unusual transaction amount ($8,950), high risk geographic jump, and new device hash.',
    timestamp: '14:22:45',
    status: 'Active',
    level: 'High'
  },
  {
    id: 'ALT-1091',
    txId: 'TX-984207',
    amount: 5400.00,
    riskScore: 76,
    location: 'Moscow, RU',
    reason: 'Anonymized Tor exit node detected with rapid multi-currency transfer attempt.',
    timestamp: '14:21:50',
    status: 'Active',
    level: 'High'
  }
];

export function generateRandomTransaction() {
  const isHighRiskCandidate = Math.random() < 0.22; // ~22% anomalous for lively demo
  const isMediumRisk = !isHighRiskCandidate && Math.random() < 0.28;

  const randId = `TX-${Math.floor(100000 + Math.random() * 900000)}`;
  const sender = `ACCT-${Math.floor(1000 + Math.random() * 9000)}-${['US', 'UK', 'SG', 'DE', 'CA', 'JP'][Math.floor(Math.random() * 6)]}`;
  const receiver = `ACCT-${Math.floor(1000 + Math.random() * 9000)}-${['US', 'SG', 'NG', 'RU', 'CH', 'AE'][Math.floor(Math.random() * 6)]}`;

  let amount = 0;
  let location = '';
  let frequency = 'Normal';
  let fraudHistory = 'None';
  let accountAge = 180;
  let type = TX_TYPES[Math.floor(Math.random() * TX_TYPES.length)];

  if (isHighRiskCandidate) {
    amount = Math.floor(4500 + Math.random() * 12500);
    location = Math.random() > 0.4 ? HIGH_RISK_LOCATIONS[Math.floor(Math.random() * HIGH_RISK_LOCATIONS.length)] : CITIES[Math.floor(Math.random() * CITIES.length)];
    frequency = Math.random() > 0.5 ? 'Extreme Burst' : 'Very High';
    fraudHistory = Math.random() > 0.6 ? 'Confirmed Flag' : 'Suspected';
    accountAge = Math.floor(3 + Math.random() * 20);
  } else if (isMediumRisk) {
    amount = Math.floor(1200 + Math.random() * 3200);
    location = CITIES[Math.floor(Math.random() * CITIES.length)];
    frequency = 'High';
    accountAge = Math.floor(35 + Math.random() * 90);
  } else {
    amount = parseFloat((25 + Math.random() * 450).toFixed(2));
    location = ['New York, USA', 'London, UK', 'Tokyo, Japan', 'Frankfurt, Germany', 'Sydney, Australia'][Math.floor(Math.random() * 5)];
    accountAge = Math.floor(120 + Math.random() * 600);
  }

  const device = DEVICES[Math.floor(Math.random() * DEVICES.length)];
  const time = new Date().toLocaleTimeString();

  const evalResult = calculateFraudRisk({
    amount,
    location,
    deviceType: device,
    transactionFrequency: frequency,
    previousFraudHistory: fraudHistory,
    accountAge,
    previousTransactionCount: Math.floor(Math.random() * 25),
    transactionTime: time,
    transactionType: type
  });

  return {
    id: randId,
    senderAccount: sender,
    receiverAccount: receiver,
    amount,
    type,
    location,
    device,
    ip: `${Math.floor(50 + Math.random() * 180)}.${Math.floor(10 + Math.random() * 200)}.${Math.floor(1 + Math.random() * 254)}.${Math.floor(1 + Math.random() * 254)}`,
    time,
    score: evalResult.score,
    status: evalResult.status,
    riskLevel: evalResult.riskLevel,
    reason: evalResult.reason,
    timestamp: 'Just now',
    fullTimestamp: evalResult.fullTimestamp
  };
}
