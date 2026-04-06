// ==========================================
// CONFIGURATION - Edit market data here
// ==========================================
const MARKETS = [
  {
    id: 'LSE',
    name: 'LONDON',
    flag: '🇬🇧',
    timezone: 'Europe/London',
    openHour: 8, openMinute: 0,
    closeHour: 16, closeMinute: 30,
    accentColor: '#3b82f6'
  },
  {
    id: 'NYSE',
    name: 'NEW YORK',
    flag: '🇺🇸',
    timezone: 'America/New_York',
    openHour: 9, openMinute: 30,
    closeHour: 16, closeMinute: 0,
    accentColor: '#10b981'
  },
  {
    id: 'TSE',
    name: 'TOKYO',
    flag: '🇯🇵',
    timezone: 'Asia/Tokyo',
    openHour: 9, openMinute: 0,
    closeHour: 15, closeMinute: 0,
    accentColor: '#f43f5e'
  },
  {
    id: 'SSE',
    name: 'SHANGHAI',
    flag: '🇨🇳',
    timezone: 'Asia/Shanghai',
    openHour: 9, openMinute: 30,
    closeHour: 15, closeMinute: 0,
    accentColor: '#f59e0b'
  },
  {
    id: 'FRA',
    name: 'FRANKFURT',
    flag: '🇩🇪',
    timezone: 'Europe/Berlin',
    openHour: 9, openMinute: 0,
    closeHour: 17, closeMinute: 30,
    accentColor: '#8b5cf6'
  },
  {
    id: 'ASX',
    name: 'SYDNEY',
    flag: '🇦🇺',
    timezone: 'Australia/Sydney',
    openHour: 10, openMinute: 0,
    closeHour: 16, closeMinute: 0,
    accentColor: '#06b6d4'
  },
  {
    id: 'HKEX',
    name: 'HONG KONG',
    flag: '🇭🇰',
    timezone: 'Asia/Hong_Kong',
    openHour: 9, openMinute: 30,
    closeHour: 16, closeMinute: 0,
    accentColor: '#ec4899'
  },
  {
    id: 'SGX',
    name: 'SINGAPORE',
    flag: '🇸🇬',
    timezone: 'Asia/Singapore',
    openHour: 9, openMinute: 0,
    closeHour: 17, closeMinute: 0,
    accentColor: '#14b8a6'
  },
  {
    id: 'DFM',
    name: 'DUBAI',
    flag: '🇦🇪',
    timezone: 'Asia/Dubai',
    openHour: 10, openMinute: 0,
    closeHour: 14, closeMinute: 0,
    accentColor: '#f97316'
  },
  {
    id: 'TSX',
    name: 'TORONTO',
    flag: '🇨🇦',
    timezone: 'America/Toronto',
    openHour: 9, openMinute: 30,
    closeHour: 16, closeMinute: 0,
    accentColor: '#ef4444'
  }
];

// ==========================================
// CONSTANTS
// ==========================================
const MS_PER_HOUR = 3600000;
const MS_PER_MINUTE = 60000;
const WARNING_THRESHOLD_MINUTES = 30;
const UPDATE_INTERVAL_MS = 1000;
const DIAL_RADIUS_OFFSET = 36;
