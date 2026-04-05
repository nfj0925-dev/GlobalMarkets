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
    closeHour: 16, closeMinute: 30
  },
  {
    id: 'NYSE',
    name: 'NEW YORK',
    flag: '🇺🇸',
    timezone: 'America/New_York',
    openHour: 9, openMinute: 30,
    closeHour: 16, closeMinute: 0
  },
  {
    id: 'TSE',
    name: 'TOKYO',
    flag: '🇯🇵',
    timezone: 'Asia/Tokyo',
    openHour: 9, openMinute: 0,
    closeHour: 15, closeMinute: 0
  },
  {
    id: 'SSE',
    name: 'SHANGHAI',
    flag: '🇨🇳',
    timezone: 'Asia/Shanghai',
    openHour: 9, openMinute: 30,
    closeHour: 15, closeMinute: 0
  },
  {
    id: 'FRA',
    name: 'FRANKFURT',
    flag: '🇩🇪',
    timezone: 'Europe/Berlin',
    openHour: 9, openMinute: 0,
    closeHour: 17, closeMinute: 30
  },
  {
    id: 'ASX',
    name: 'SYDNEY',
    flag: '🇦🇺',
    timezone: 'Australia/Sydney',
    openHour: 10, openMinute: 0,
    closeHour: 16, closeMinute: 0
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
