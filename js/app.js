// ==========================================
// TELEGRAM INTEGRATION
// ==========================================
const tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;

function triggerHaptic() {
  if (tg && tg.HapticFeedback) {
    tg.HapticFeedback.impactOccurred('medium');
  }
}

function syncTheme() {
  // Theme syncing disabled to force dark mode
}


// ==========================================
// HOLIDAY & DST CALCULATIONS
// ==========================================
function getNthDayOfYear(year, month, dayOfWeek, n) {
  const date = new Date(year, month - 1, 1);
  let count = 0;
  while (date.getMonth() === month - 1) {
    if (date.getDay() === dayOfWeek) {
      count++;
      if (count === n) return date.getDate();
    }
    date.setDate(date.getDate() + 1);
  }
  return null;
}

function getLastDayOfMonth(year, month, dayOfWeek) {
  const date = new Date(year, month, 0);
  while (date.getDay() !== dayOfWeek) {
    date.setDate(date.getDate() - 1);
  }
  return date.getDate();
}

function getEasterDate(year) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

function isMarketClosed(date, marketId) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const dayOfMonth = date.getDate();
  const dayOfWeek = date.getDay();

  if (dayOfWeek === 0 || dayOfWeek === 6) return "WEEKEND";
  if (month === 1 && dayOfMonth === 1) return "NEW YEAR";
  if (month === 12 && dayOfMonth === 25 && marketId !== 'TSE') return "CHRISTMAS";

  const easter = getEasterDate(year);
  const goodFriday = new Date(easter);
  goodFriday.setDate(easter.getDate() - 2);
  const isGoodFriday = dayOfMonth === goodFriday.getDate() && month === (goodFriday.getMonth() + 1);

  const easterMonday = new Date(easter);
  easterMonday.setDate(easter.getDate() + 1);
  const isEasterMonday = dayOfMonth === easterMonday.getDate() && month === (easterMonday.getMonth() + 1);

  if (marketId === 'NYSE') {
    if (isGoodFriday) return "GOOD FRIDAY";
    if (month === 1 && dayOfMonth === getNthDayOfYear(year, 1, 1, 3)) return "MLK DAY";
    if (month === 2 && dayOfMonth === getNthDayOfYear(year, 2, 1, 3)) return "PRESIDENTS DAY";
    if (month === 5 && dayOfMonth === getLastDayOfMonth(year, 5, 1)) return "MEMORIAL DAY";
    if (month === 6 && dayOfMonth === 19) return "JUNETEENTH";
    if (month === 7 && dayOfMonth === 4) return "INDEPENDENCE DAY";
    if (month === 9 && dayOfMonth === getNthDayOfYear(year, 9, 1, 1)) return "LABOR DAY";
    if (month === 11 && dayOfMonth === getNthDayOfYear(year, 11, 4, 4)) return "THANKSGIVING";
  }

  if (marketId === 'LSE') {
    if (isGoodFriday) return "GOOD FRIDAY";
    if (isEasterMonday) return "EASTER MONDAY";
    if (month === 12 && dayOfMonth === 26) return "BOXING DAY";
    if (month === 5 && dayOfMonth === getNthDayOfYear(year, 5, 1, 1)) return "MAY BANK HOLIDAY";
    if (month === 5 && dayOfMonth === getLastDayOfMonth(year, 5, 1)) return "SPRING BANK HOLIDAY";
    if (month === 8 && dayOfMonth === getLastDayOfMonth(year, 8, 1)) return "SUMMER BANK HOLIDAY";
  }

  if (marketId === 'TSE') {
    if (month === 1 && dayOfMonth <= 3) return "NEW YEAR HOLIDAY";
    if (month === 2 && dayOfMonth === 11) return "FOUNDATION DAY";
    if (month === 2 && dayOfMonth === 23) return "EMPERORS BIRTHDAY";
    if (month === 4 && dayOfMonth === 29) return "SHOWA DAY";
    if (month === 5 && dayOfMonth >= 3 && dayOfMonth <= 5) return "GOLDEN WEEK";
    if (month === 7) {
      const marineDay = getNthDayOfYear(year, 7, 1, 3);
      if (dayOfMonth === marineDay) return "MARINE DAY";
    }
    if (month === 9) {
      const agedDay = getNthDayOfYear(year, 9, 1, 3);
      if (dayOfMonth === agedDay) return "RESPECT FOR AGED DAY";
    }
    if (month === 11 && dayOfMonth === 3) return "CULTURE DAY";
    if (month === 11 && dayOfMonth === 23) return "LABOR THANKSGIVING DAY";
  }

  if (marketId === 'SSE') {
    if (month === 1 && dayOfMonth >= 1 && dayOfMonth <= 3) return "CHINESE NEW YEAR";
    if (month === 5 && dayOfMonth >= 1 && dayOfMonth <= 5) return "LABOR DAY HOLIDAY";
    if (month === 10 && dayOfMonth >= 1 && dayOfMonth <= 7) return "NATIONAL DAY GOLDEN WEEK";
  }

  if (marketId === 'HKEX') {
    if (isGoodFriday) return "GOOD FRIDAY";
    if (month === 12 && dayOfMonth === 26) return "BOXING DAY";
  }

  if (marketId === 'SGX') {
    if (month === 5 && dayOfMonth === 1) return "LABOR DAY";
    if (month === 8 && dayOfMonth === 9) return "NATIONAL DAY";
  }

  if (marketId === 'TSX') {
    if (month === 2 && dayOfMonth === getNthDayOfYear(year, 2, 1, 3)) return "FAMILY DAY";
    if (month === 5 && dayOfMonth === getNthDayOfYear(year, 5, 1, 3)) return "VICTORIA DAY";
    if (month === 8 && dayOfMonth === getNthDayOfYear(year, 8, 1, 1)) return "CIVIC HOLIDAY";
  }

  return null;
}

// ==========================================
// TIMEZONE HELPERS
// ==========================================
function getTimezoneInfo(date, timezone) {
  try {
    const getOffset = (d) => {
      const utcDate = new Date(d.toLocaleString('en-US', { timeZone: 'UTC' }));
      const localDate = new Date(d.toLocaleString('en-US', { timeZone: timezone }));
      return localDate - utcDate;
    };

    const offsetMs = getOffset(date);
    const isNegative = offsetMs < 0;
    const absOffsetMs = Math.abs(offsetMs);
    const offsetHours = Math.floor(absOffsetMs / MS_PER_HOUR);
    const offsetMinutes = Math.floor((absOffsetMs % MS_PER_HOUR) / MS_PER_MINUTE);
    
    // Explicit format to prevent UTC-4:30 when it should be UTC-03:30
    const sign = isNegative ? '-' : '+';
    const offsetStr = `UTC${sign}${offsetHours}${offsetMinutes > 0 ? ':' + offsetMinutes.toString().padStart(2, '0') : ''}`;

    const jan = new Date(date.getFullYear(), 0, 1);
    const jul = new Date(date.getFullYear(), 6, 1);
    const stdOffsetMs = Math.min(getOffset(jan), getOffset(jul));
    const isDST = offsetMs > stdOffsetMs;

    let abbr = '';
    switch (timezone) {
      case 'Europe/London': abbr = isDST ? 'BST' : 'GMT'; break;
      case 'America/New_York': abbr = isDST ? 'EDT' : 'EST'; break;
      case 'Asia/Tokyo': abbr = 'JST'; break;
      case 'Asia/Shanghai': abbr = 'CST'; break;
      case 'Europe/Berlin': abbr = isDST ? 'CEST' : 'CET'; break;
      case 'Australia/Sydney': abbr = isDST ? 'AEDT' : 'AEST'; break;
      case 'Asia/Hong_Kong': abbr = 'HKT'; break;
      case 'Asia/Singapore': abbr = 'SGT'; break;
      case 'Asia/Dubai': abbr = 'GST'; break;
      case 'America/Toronto': abbr = isDST ? 'EDT' : 'EST'; break;
      default: abbr = timezone.split('/').pop();
    }

    return { abbr, offset: offsetStr, isDST };
  } catch (error) {
    console.warn(`Timezone error for ${timezone}:`, error);
    return { abbr: '---', offset: 'UTC', isDST: false };
  }
}

function getSessionHoursInUserTime(marketTimezone, openH, openM, closeH, closeM) {
  try {
    const now = new Date();
    const marketLocal = now.toLocaleString('en-US', { timeZone: marketTimezone, year: 'numeric', month: '2-digit', day: '2-digit' });
    const [mm, dd, yyyy] = marketLocal.split('/');

    const convertToUtc = (h, m) => {
      const targetISO = `${yyyy}-${mm}-${dd}T${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:00`;
      const guessUtc = new Date(targetISO + "Z");
      const marketCheck = new Date(guessUtc.toLocaleString('en-US', { timeZone: marketTimezone }));
      const diff = marketCheck - new Date(targetISO);
      const finalUtc = new Date(guessUtc.getTime() - diff);
      return finalUtc.getHours().toString().padStart(2, '0') + ':' + finalUtc.getMinutes().toString().padStart(2, '0');
    };

    return `${convertToUtc(openH, openM)} - ${convertToUtc(closeH, closeM)}`;
  } catch (error) {
    console.warn('Session hours calculation error:', error);
    return '--:-- - --:--';
  }
}

function getUserLocalTime(timezone) {
  try {
    const now = new Date();
    const marketTimeStr = now.toLocaleString('en-US', { timeZone: timezone });
    const marketDate = new Date(marketTimeStr);
    const offsetHours = Math.round((now - marketDate) / MS_PER_HOUR);
    const sign = offsetHours >= 0 ? '+' : '';
    const offsetStr = offsetHours !== 0 ? ` (${sign}${offsetHours}h)` : '';
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}${offsetStr}`;
  } catch (error) {
    return '--:--';
  }
}

// ==========================================
// DOM GENERATION
// ==========================================
function createMarketCard(market) {
  const card = document.createElement('article');
  card.id = `${market.id}-card`;
  card.className = 'card';
  card.style.setProperty('--card-accent', market.accentColor);
  card.setAttribute('tabindex', '0');
  card.setAttribute('role', 'region');
  card.setAttribute('aria-label', `${market.name} market status`);
  card.addEventListener('click', triggerHaptic);
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      triggerHaptic();
    }
  });

  card.innerHTML = `
    <div class="market-header">
      <h2><span class="flag" aria-hidden="true">${market.flag}</span> ${market.name}</h2>
      <div id="${market.id}-dst" class="dst-badge" aria-label="Timezone">...</div>
    </div>
    <div class="time-display">
      <div class="analog-watch" role="img" aria-label="Analog clock showing ${market.name} time">
        <div class="dial" aria-hidden="true"></div>
        <div id="${market.id}-h" class="hand hour-hand" aria-hidden="true"></div>
        <div id="${market.id}-m" class="hand minute-hand" aria-hidden="true"></div>
        <div id="${market.id}-s" class="hand second-hand" aria-hidden="true"></div>
        <div class="center-nub" aria-hidden="true"></div>
      </div>
      <time id="${market.id}-clock" class="clock" datetime="">00:00:00</time>
    </div>
    <div class="status-line" aria-live="polite">
      <span class="dot" aria-hidden="true"></span>
      <span id="${market.id}-status-text">---</span>
    </div>
    <div id="${market.id}-countdown-box" class="countdown">
      <div class="countdown-label" id="${market.id}-cd-label">NEXT EVENT</div>
      <div id="${market.id}-countdown" class="countdown-timer" aria-live="polite">00h 00m 00s</div>
    </div>
    <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
      <div id="${market.id}-progress" class="progress-fill" style="width:0%"></div>
    </div>
    <div class="local-info">
      <span>Session: ${market.openHour.toString().padStart(2, '0')}:${market.openMinute.toString().padStart(2, '0')} - ${market.closeHour.toString().padStart(2, '0')}:${market.closeMinute.toString().padStart(2, '0')}</span>
      <span class="session-hours" id="${market.id}-duration">--</span>
    </div>
    <div class="converted-session" id="${market.id}-converted-session">
      <strong>--:-- - --:--</strong>
    </div>
    <div class="user-time">
      <span class="user-time-label">Local:</span>
      <span id="${market.id}-user-time">--:--</span>
    </div>
  `;

  return card;
}

function initDial(analogWatch) {
  const dial = analogWatch.querySelector('.dial');
  if (!dial) return;

  for (let i = 0; i < 12; i++) {
    const marker = document.createElement('div');
    const markerClass = i % 3 === 0 ? `marker m${i === 0 ? '12' : i}` : 'marker';
    marker.className = markerClass;
    marker.style.transform = `rotate(${i * 30}deg)`;
    dial.appendChild(marker);

    const num = document.createElement('div');
    num.className = 'dial-num';
    num.textContent = i === 0 ? 12 : i;
    num.style.transform = `rotate(${i * 30}deg) translateY(-${DIAL_RADIUS_OFFSET}px) rotate(${-i * 30}deg)`;
    dial.appendChild(num);
  }
}

// ==========================================
// MAIN UPDATE LOOP
// ==========================================
function updateMarketCard(market) {
  try {
    const now = new Date();
    const marketTimeStr = now.toLocaleString("en-US", { timeZone: market.timezone });
    const marketDate = new Date(marketTimeStr);

    const hours = marketDate.getHours();
    const minutes = marketDate.getMinutes();
    const seconds = marketDate.getSeconds();
    const currentDecimal = hours + minutes / 60 + seconds / 3600;
    const openDecimal = market.openHour + market.openMinute / 60;
    const closeDecimal = market.closeHour + market.closeMinute / 60;

    // Digital clock
    const clockEl = document.getElementById(`${market.id}-clock`);
    if (clockEl) {
      const timeString = marketDate.toTimeString().split(' ')[0];
      clockEl.textContent = timeString;
      clockEl.setAttribute('datetime', now.toISOString());
    }

    // Analog clock hands
    const hourDeg = (hours % 12 + minutes / 60) * 30;
    const minuteDeg = (minutes + seconds / 60) * 6;
    const secondDeg = seconds * 6;

    const hourHand = document.getElementById(`${market.id}-h`);
    const minuteHand = document.getElementById(`${market.id}-m`);
    const secondHand = document.getElementById(`${market.id}-s`);

    if (hourHand) hourHand.style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;
    if (minuteHand) minuteHand.style.transform = `translateX(-50%) rotate(${minuteDeg}deg)`;
    if (secondHand) {
      secondHand.style.transition = seconds === 0 ? 'none' : 'transform .15s cubic-bezier(.4,2.3,.6,1)';
      secondHand.style.transform = `translateX(-50%) rotate(${secondDeg}deg)`;
    }

    // Timezone badge
    const tzInfo = getTimezoneInfo(now, market.timezone);
    const dstBadge = document.getElementById(`${market.id}-dst`);
    if (dstBadge) {
      dstBadge.textContent = `${tzInfo.abbr} (${tzInfo.offset})`;
      tzInfo.isDST ? dstBadge.classList.add('dst-active') : dstBadge.classList.remove('dst-active');
    }

    // Market status
    const holiday = isMarketClosed(marketDate, market.id);
    const isOpen = !holiday && currentDecimal >= openDecimal && currentDecimal < closeDecimal;
    const card = document.getElementById(`${market.id}-card`);
    const statusText = document.getElementById(`${market.id}-status-text`);

    // Progress bar
    const sessionDuration = closeDecimal - openDecimal;
    let progressPct = 0;
    if (isOpen && sessionDuration > 0) {
      progressPct = ((currentDecimal - openDecimal) / sessionDuration) * 100;
    }

    const progressEl = document.getElementById(`${market.id}-progress`);
    if (progressEl) {
      progressEl.style.width = `${Math.max(0, Math.min(100, progressPct))}%`;
      const progressBar = progressEl.closest('[role="progressbar"]');
      if (progressBar) progressBar.setAttribute('aria-valuenow', Math.round(progressPct));
    }

    // Session duration
    const durationHours = Math.floor(sessionDuration);
    const durationMinutes = Math.round((sessionDuration - durationHours) * 60);
    const durationEl = document.getElementById(`${market.id}-duration`);
    if (durationEl) {
      durationEl.textContent = `${durationHours}h ${durationMinutes.toString().padStart(2, '0')}m`;
    }

    // Countdown logic
    let countdownLabel = "Next opening";
    let isWarning = false;
    const countdownBox = document.getElementById(`${market.id}-countdown-box`);
    if (countdownBox) countdownBox.classList.remove('warning');

    function renderCountdown(label, diffMs) {
      const cdLabelEl = document.getElementById(`${market.id}-cd-label`);
      const cdTimerEl = document.getElementById(`${market.id}-countdown`);
      if (cdLabelEl) cdLabelEl.textContent = label;
      if (cdTimerEl) {
        // Prevent negative values just in case
        const safeDiffMs = Math.max(0, diffMs);
        const h = Math.floor(safeDiffMs / MS_PER_HOUR);
        const m = Math.floor((safeDiffMs % MS_PER_HOUR) / MS_PER_MINUTE);
        const s = Math.floor((safeDiffMs % MS_PER_MINUTE) / 1000);
        cdTimerEl.textContent = `${h.toString().padStart(2, '0')}h ${m.toString().padStart(2, '0')}m ${s.toString().padStart(2, '0')}s`;
      }
    }

    if (!isOpen) {
      if (currentDecimal < openDecimal && !holiday) {
        const minsUntil = (openDecimal - currentDecimal) * 60;
        if (minsUntil <= WARNING_THRESHOLD_MINUTES) {
          countdownLabel = "⚡ Opening soon";
          isWarning = true;
          if (countdownBox) countdownBox.classList.add('warning');
        } else {
          countdownLabel = "Opening in";
        }

        const targetDate = new Date(marketDate);
        targetDate.setHours(market.openHour, market.openMinute, 0, 0);
        const diffMs = targetDate - marketDate;
        renderCountdown(countdownLabel, diffMs);
      } else {
        countdownLabel = "Next opening";

        let testDate = new Date(marketDate);
        do {
          testDate.setDate(testDate.getDate() + 1);
        } while (isMarketClosed(testDate, market.id));

        testDate.setHours(market.openHour, market.openMinute, 0, 0);
        const diffMs = testDate - marketDate;
        renderCountdown(countdownLabel, diffMs);
      }
    } else {
      const minsUntilClose = (closeDecimal - currentDecimal) * 60;
      if (minsUntilClose <= WARNING_THRESHOLD_MINUTES) {
        countdownLabel = "⚠️ Closing soon";
        isWarning = true;
        if (countdownBox) countdownBox.classList.add('warning');
      } else {
        countdownLabel = "Closing in";
      }
      const targetDate = new Date(marketDate);
      targetDate.setHours(market.closeHour, market.closeMinute, 0, 0);
      const diffMs = targetDate - marketDate;
      renderCountdown(countdownLabel, diffMs);
    }

    // Update card classes
    if (card) {
      card.className = `card ${isOpen ? 'is-open' : 'is-closed'} ${isWarning ? 'is-warning' : ''}`;
    }

    if (statusText) {
      statusText.textContent = holiday
        ? `CLOSED (${holiday})`
        : (isOpen ? "MARKET OPEN 📈" : "MARKET CLOSED");
    }

    // User local time
    const userTimeEl = document.getElementById(`${market.id}-user-time`);
    if (userTimeEl) userTimeEl.textContent = getUserLocalTime(market.timezone);

    // Converted session hours
    const convertedSessionEl = document.getElementById(`${market.id}-converted-session`);
    if (convertedSessionEl) {
      const sessionHrs = getSessionHoursInUserTime(
        market.timezone,
        market.openHour, market.openMinute,
        market.closeHour, market.closeMinute
      );
      convertedSessionEl.innerHTML = `Your session: <strong>${sessionHrs}</strong>`;
    }

  } catch (error) {
    console.error(`Error updating ${market.id}:`, error);
    const statusText = document.getElementById(`${market.id}-status-text`);
    if (statusText) statusText.textContent = "Error loading data";
  }
}

function updateAllMarkets() {
  MARKETS.forEach(market => updateMarketCard(market));
}

// ==========================================
// OFFLINE DETECTION
// ==========================================
function updateOfflineBanner() {
  const banner = document.getElementById('offline-banner');
  if (banner) {
    if (!navigator.onLine) {
      banner.classList.add('visible');
    } else {
      banner.classList.remove('visible');
    }
  }
}

// ==========================================
// INITIALIZATION
// ==========================================
function init() {
  try {


    const grid = document.querySelector('.grid');
    if (!grid) {
      console.error('Grid element not found');
      return;
    }

    MARKETS.forEach(market => {
      const card = createMarketCard(market);
      grid.appendChild(card);
    });

    document.querySelectorAll('.analog-watch').forEach(initDial);

    if (tg) {
      tg.ready();
      tg.expand();
      tg.enableClosingConfirmation();
      tg.onEvent('themeChanged', syncTheme);
      syncTheme();

      const manualBack = document.getElementById('manual-back');
      if (tg.BackButton && tg.platform !== 'unknown' && tg.platform !== 'tdesktop') {
        tg.BackButton.show();
        tg.BackButton.onClick(() => {
          triggerHaptic();
          window.location.href = 'index.html';
        });
        if (manualBack) manualBack.style.display = 'none';
      } else if (manualBack) {
        manualBack.style.display = 'flex';
      }

      tg.MainButton.text = "REFRESH DATA";
      tg.MainButton.show();
      tg.MainButton.onClick(() => {
        updateAllMarkets();
        if (tg.HapticFeedback) {
          tg.HapticFeedback.notificationOccurred('success');
        }
      });
    }

    updateAllMarkets();

    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
      setTimeout(() => loadingOverlay.classList.add('hidden'), 500);
    }

    setInterval(updateAllMarkets, UPDATE_INTERVAL_MS);

    window.addEventListener('online', updateOfflineBanner);
    window.addEventListener('offline', updateOfflineBanner);
    updateOfflineBanner();

  } catch (error) {
    console.error('Initialization error:', error);
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
      loadingOverlay.innerHTML = '<div style="color: var(--closed); text-align: center; padding: 20px;"><h2>⚠️ Error</h2><p>Failed to initialize market tracker.</p><p style="font-size: 0.8rem; color: var(--muted);">' + error.message + '</p></div>';
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  setTimeout(init, 100);
}
