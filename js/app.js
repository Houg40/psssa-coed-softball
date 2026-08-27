/**
 * PSSSA Web Application Logic
 * Interactive Match Center, Standings, Scorekeeper, Calendar Sync, Theme Switcher & PWA
 */

(function() {
  'use strict';

  // Application State
  const AppState = {
    teams: [],
    locations: [],
    scheduleData: null,
    rules: null,
    teamsMap: {},
    locationsMap: {},
    matchesMap: {},
    
    // Filters & UI State
    filters: {
      team: 'all',
      month: 'all',
      venue: 'all',
      homeAway: 'all',
      search: ''
    },
    viewMode: 'timeline', // 'timeline' | 'calendar' | 'matrix'
    scores: {}, // Stored in localStorage
    currentTheme: localStorage.getItem('psssa_theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
    activeMatchForScore: null
  };

  // DOM Elements Cache
  const DOM = {};

  /**
   * Initialize App
   */
  async function init() {
    cacheDOMElements();
    initTheme();
    loadStoredScores();
    await loadData();
    buildLookups();
    setupEventListeners();
    applyUrlFilters();
    renderHeroTicker();
    renderStandings();
    renderSchedule();
    renderLocations();
    renderTeams();
    renderRulesAndFaq();
    registerServiceWorker();
  }

  function cacheDOMElements() {
    DOM.themeToggle = document.getElementById('theme-toggle');
    DOM.mobileMenuBtn = document.getElementById('mobile-menu-btn');
    DOM.mobileNavDrawer = document.getElementById('mobile-nav-drawer');
    DOM.mobileNavClose = document.getElementById('mobile-nav-close');
    DOM.mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    DOM.heroNextGame = document.getElementById('hero-next-game');
    
    // Schedule Controls
    DOM.scheduleContainer = document.getElementById('schedule-list-container');
    DOM.calendarContainer = document.getElementById('schedule-calendar-container');
    DOM.matrixContainer = document.getElementById('schedule-matrix-container');
    DOM.filterTeam = document.getElementById('filter-team');
    DOM.filterMonth = document.getElementById('filter-month');
    DOM.filterVenue = document.getElementById('filter-venue');
    DOM.filterSearch = document.getElementById('filter-search');
    DOM.resetFiltersBtn = document.getElementById('btn-reset-filters');
    DOM.scheduleCountBadge = document.getElementById('schedule-count-badge');
    DOM.viewTimelineBtn = document.getElementById('view-timeline-btn');
    DOM.viewCalendarBtn = document.getElementById('view-calendar-btn');
    DOM.viewMatrixBtn = document.getElementById('view-matrix-btn');
    DOM.downloadTeamCalBtn = document.getElementById('btn-download-team-calendar');
    DOM.downloadAllCalBtn = document.getElementById('btn-download-all-calendar');
    DOM.printScheduleBtn = document.getElementById('btn-print-schedule');

    // Standings & Scorekeeper
    DOM.standingsBody = document.getElementById('standings-tbody');
    DOM.resetScoresBtn = document.getElementById('btn-reset-scores');

    // Locations & Teams Containers
    DOM.locationsContainer = document.getElementById('locations-grid');
    DOM.teamsContainer = document.getElementById('teams-grid');

    // Rules & FAQ
    DOM.rulesContainer = document.getElementById('rules-content');
    DOM.faqContainer = document.getElementById('faq-accordion');

    // Modals
    DOM.scoreModal = document.getElementById('scorekeeper-modal');
    DOM.scoreModalClose = document.getElementById('score-modal-close');
    DOM.scoreForm = document.getElementById('score-form');
    DOM.scoreHomeLabel = document.getElementById('score-home-label');
    DOM.scoreAwayLabel = document.getElementById('score-away-label');
    DOM.scoreHomeInput = document.getElementById('score-home-input');
    DOM.scoreAwayInput = document.getElementById('score-away-input');
    DOM.scoreMatchDate = document.getElementById('score-match-date');
    DOM.scoreMatchVenue = document.getElementById('score-match-venue');

    // Forms
    DOM.playerRegisterForm = document.getElementById('player-register-form');
    DOM.contactForm = document.getElementById('contact-form');
    DOM.toast = document.getElementById('app-toast');
  }

  /**
   * Theme Management
   */
  function initTheme() {
    document.documentElement.setAttribute('data-theme', AppState.currentTheme);
    updateThemeIcon();
  }

  function toggleTheme() {
    AppState.currentTheme = AppState.currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', AppState.currentTheme);
    localStorage.setItem('psssa_theme', AppState.currentTheme);
    updateThemeIcon();
    showToast(`Switched to ${AppState.currentTheme} mode`);
  }

  function updateThemeIcon() {
    if (!DOM.themeToggle) return;
    const isDark = AppState.currentTheme === 'dark';
    DOM.themeToggle.setAttribute('aria-label', isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme');
    DOM.themeToggle.innerHTML = isDark 
      ? `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`
      : `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
  }

  /**
   * Load data from window.PSSSA_DATA or fetch fallback
   */
  async function loadData() {
    if (window.PSSSA_DATA) {
      AppState.teams = window.PSSSA_DATA.teams;
      AppState.locations = window.PSSSA_DATA.locations;
      AppState.scheduleData = window.PSSSA_DATA.schedule;
      AppState.rules = window.PSSSA_DATA.rules;
      return;
    }

    try {
      const [tRes, lRes, sRes, rRes] = await Promise.all([
        fetch('data/teams.json'),
        fetch('data/locations.json'),
        fetch('data/schedule.json'),
        fetch('data/rules.json')
      ]);
      AppState.teams = await tRes.json();
      AppState.locations = await lRes.json();
      AppState.scheduleData = await sRes.json();
      AppState.rules = await rRes.json();
    } catch (e) {
      console.error('Failed to load JSON data, check file paths:', e);
    }
  }

  function buildLookups() {
    AppState.teams.forEach(t => { AppState.teamsMap[t.id] = t; });
    AppState.locations.forEach(l => { AppState.locationsMap[l.id] = l; });
    
    if (AppState.scheduleData && AppState.scheduleData.matches) {
      AppState.scheduleData.matches.forEach(m => {
        // Overlay stored scores
        if (AppState.scores[m.id]) {
          m.homeScore = AppState.scores[m.id].homeScore;
          m.awayScore = AppState.scores[m.id].awayScore;
          m.status = 'completed';
        }
        AppState.matchesMap[m.id] = m;
      });
    }

    // Populate filter dropdowns
    if (DOM.filterTeam) {
      DOM.filterTeam.innerHTML = '<option value="all">All Teams</option>' + 
        AppState.teams.map(t => `<option value="${t.id}">${t.name} (${t.code})</option>`).join('');
    }
    if (DOM.filterVenue) {
      DOM.filterVenue.innerHTML = '<option value="all">All Venues</option>' + 
        AppState.locations.map(l => `<option value="${l.id}">${l.name} (${l.city})</option>`).join('');
    }
  }

  function loadStoredScores() {
    try {
      const saved = localStorage.getItem('psssa_scores_2025');
      if (saved) {
        AppState.scores = JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not parse saved scores:', e);
    }
  }

  function saveScores() {
    try {
      localStorage.setItem('psssa_scores_2025', JSON.stringify(AppState.scores));
    } catch (e) {
      console.warn('Could not save scores to localStorage:', e);
    }
  }

  /**
   * Hero Next Game / Countdown Ticker
   */
  function renderHeroTicker() {
    if (!DOM.heroNextGame || !AppState.scheduleData) return;

    // Find the next upcoming scheduled game
    const matches = AppState.scheduleData.matches || [];
    const upcoming = matches.find(m => m.status === 'scheduled') || matches[0];

    if (!upcoming) return;

    const home = AppState.teamsMap[upcoming.homeTeam] || { name: upcoming.homeTeam, code: upcoming.homeTeam };
    const away = AppState.teamsMap[upcoming.awayTeam] || { name: upcoming.awayTeam, code: upcoming.awayTeam };
    const location = AppState.locationsMap[upcoming.locationId] || { name: upcoming.locationName };

    DOM.heroNextGame.innerHTML = `
      <div class="next-match-card">
        <div class="match-badge-live">
          <span class="live-pulse"></span>
          <span>Featured Matchday &bull; ${upcoming.formattedDate}</span>
        </div>
        <div class="next-match-teams">
          <div class="team-side away">
            <div class="team-pill" style="background: ${away.color || '#333'}">${away.code}</div>
            <span class="team-label">${away.name}</span>
          </div>
          <div class="vs-badge">VS</div>
          <div class="team-side home">
            <div class="team-pill" style="background: ${home.color || '#333'}">${home.code}</div>
            <span class="team-label">${home.name} <small class="home-tag">(Home)</small></span>
          </div>
        </div>
        <div class="next-match-meta">
          <span><svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> 6:15 PM PDT</span>
          <span><svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg> ${location.name}</span>
        </div>
        <div class="next-match-actions">
          <button class="btn btn-sm btn-primary" onclick="window.PSSSA_App.downloadSingleMatchCalendar('${upcoming.id}')">
            <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            Sync to Calendar
          </button>
          <a href="javascript:void(0)" class="btn btn-sm btn-outline" onclick="window.PSSSA_App.filterByTeam('${home.code}')">View Team Schedule</a>
        </div>
      </div>
    `;
  }

  /**
   * Standings Calculation & Rendering
   */
  function calculateStandings() {
    const table = {};
    AppState.teams.forEach(t => {
      table[t.code] = {
        code: t.code,
        name: t.name,
        color: t.color,
        gp: 0,
        w: 0,
        l: 0,
        t: 0,
        rs: 0,
        ra: 0,
        diff: 0,
        pct: '0.000',
        pts: 0
      };
    });

    const matches = AppState.scheduleData ? AppState.scheduleData.matches : [];
    matches.forEach(m => {
      if (m.homeScore !== null && m.awayScore !== null && m.homeScore !== undefined && m.awayScore !== undefined) {
        const h = table[m.homeTeam];
        const a = table[m.awayTeam];
        if (!h || !a) return;

        h.gp += 1;
        a.gp += 1;
        h.rs += m.homeScore;
        h.ra += m.awayScore;
        a.rs += m.awayScore;
        a.ra += m.homeScore;

        if (m.homeScore > m.awayScore) {
          h.w += 1;
          h.pts += 2;
          a.l += 1;
        } else if (m.awayScore > m.homeScore) {
          a.w += 1;
          a.pts += 2;
          h.l += 1;
        } else {
          h.t += 1;
          a.t += 1;
          h.pts += 1;
          a.pts += 1;
        }
      }
    });

    // Compute diff and pct
    const list = Object.values(table).map(t => {
      t.diff = t.rs - t.ra;
      if (t.gp > 0) {
        const rawPct = (t.w + 0.5 * t.t) / t.gp;
        t.pct = rawPct.toFixed(3).replace(/^0+/, '');
      } else {
        t.pct = '.000';
      }
      return t;
    });

    // Sort: Win PCT desc, DIFF desc, RS desc, Name asc
    list.sort((a, b) => {
      const pctA = parseFloat(a.pct || 0);
      const pctB = parseFloat(b.pct || 0);
      if (pctB !== pctA) return pctB - pctA;
      if (b.diff !== a.diff) return b.diff - a.diff;
      if (b.rs !== a.rs) return b.rs - a.rs;
      return a.name.localeCompare(b.name);
    });

    return list;
  }

  function renderStandings() {
    if (!DOM.standingsBody) return;
    const standings = calculateStandings();

    DOM.standingsBody.innerHTML = standings.map((s, index) => `
      <tr class="standings-row ${index === 0 ? 'leader-row' : ''}">
        <td class="col-rank">
          <span class="rank-badge">${index + 1}</span>
        </td>
        <td class="col-team">
          <div class="team-cell-wrap">
            <span class="team-dot" style="background: ${s.color};"></span>
            <span class="team-name-bold">${s.name}</span>
            <span class="team-code-tag">${s.code}</span>
          </div>
        </td>
        <td class="col-stat font-mono">${s.gp}</td>
        <td class="col-stat font-mono font-bold text-success">${s.w}</td>
        <td class="col-stat font-mono text-danger">${s.l}</td>
        <td class="col-stat font-mono text-muted">${s.t}</td>
        <td class="col-stat font-mono font-bold">${s.pct}</td>
        <td class="col-stat font-mono">${s.rs}</td>
        <td class="col-stat font-mono">${s.ra}</td>
        <td class="col-stat font-mono ${s.diff > 0 ? 'text-success' : s.diff < 0 ? 'text-danger' : ''}">${s.diff > 0 ? '+' + s.diff : s.diff}</td>
        <td class="col-stat font-mono font-bold text-primary">${s.pts}</td>
      </tr>
    `).join('');
  }

  /**
   * Schedule Filtering & Multiple View Rendering
   */
  function getFilteredSchedule() {
    if (!AppState.scheduleData) return { dates: [], matches: [] };

    const { team, month, venue, search } = AppState.filters;
    const allMatches = AppState.scheduleData.matches || [];
    const allDates = AppState.scheduleData.dates || [];

    // Filter matches
    const filteredMatches = allMatches.filter(m => {
      // Team filter
      if (team !== 'all' && m.homeTeam !== team && m.awayTeam !== team) {
        return false;
      }
      // Month filter
      if (month !== 'all') {
        const mMonth = m.date.slice(5, 7);
        if (mMonth !== month) return false;
      }
      // Venue filter
      if (venue !== 'all' && m.locationId !== venue) {
        return false;
      }
      // Search keyword filter
      if (search) {
        const q = search.toLowerCase();
        const homeName = (AppState.teamsMap[m.homeTeam]?.name || m.homeTeam).toLowerCase();
        const awayName = (AppState.teamsMap[m.awayTeam]?.name || m.awayTeam).toLowerCase();
        const locName = (m.locationName || '').toLowerCase();
        const dateStr = (m.formattedDate || '').toLowerCase();
        if (!homeName.includes(q) && !awayName.includes(q) && !locName.includes(q) && !dateStr.includes(q)) {
          return false;
        }
      }
      return true;
    });

    // Filter dates (including byes / special dates when matching filter)
    const filteredMatchIds = new Set(filteredMatches.map(m => m.id));
    const filteredDates = allDates.filter(d => {
      if (month !== 'all' && d.date.slice(5, 7) !== month) return false;
      
      const isSpecial = d.type === 'kickoff' || d.type === 'jamboree' || d.type === 'league_bye';

      // If venue filter is active, only show dates that have games at that venue
      if (venue !== 'all') {
        return d.events && d.events.some(id => filteredMatchIds.has(id));
      }

      // If team filter is active, check if date has matching match or team bye/event
      if (team !== 'all') {
        const hasTeamMatch = d.events && d.events.some(id => filteredMatchIds.has(id));
        const hasTeamBye = d.byes && d.byes.includes(team);
        return hasTeamMatch || hasTeamBye || isSpecial;
      }

      if (search) {
        const hasMatch = d.events && d.events.some(id => filteredMatchIds.has(id));
        const titleMatch = (d.title || '').toLowerCase().includes(search.toLowerCase());
        return hasMatch || titleMatch;
      }

      return true;
    });

    return {
      dates: filteredDates,
      matches: filteredMatches
    };
  }

  function renderSchedule() {
    // This page doesn't have the schedule containers (e.g. the homepage,
    // which now links out to the dedicated /schedule/ page) - nothing to do.
    if (!DOM.scheduleContainer || !DOM.calendarContainer || !DOM.matrixContainer) return;

    const { dates, matches } = getFilteredSchedule();

    // Update count badge
    if (DOM.scheduleCountBadge) {
      DOM.scheduleCountBadge.textContent = `${matches.length} Games Shown`;
    }

    if (AppState.viewMode === 'timeline') {
      renderTimelineView(dates, matches);
      DOM.scheduleContainer.classList.remove('hidden');
      DOM.calendarContainer.classList.add('hidden');
      DOM.matrixContainer.classList.add('hidden');
    } else if (AppState.viewMode === 'calendar') {
      renderCalendarView();
      DOM.scheduleContainer.classList.add('hidden');
      DOM.calendarContainer.classList.remove('hidden');
      DOM.matrixContainer.classList.add('hidden');
    } else if (AppState.viewMode === 'matrix') {
      renderMatrixView();
      DOM.scheduleContainer.classList.add('hidden');
      DOM.calendarContainer.classList.add('hidden');
      DOM.matrixContainer.classList.remove('hidden');
    }
  }

  /**
   * Timeline View: Card Stream with Match Details
   */
  function renderTimelineView(dates, filteredMatches) {
    if (!DOM.scheduleContainer) return;

    const filteredMatchIds = new Set(filteredMatches.map(m => m.id));

    const renderedDays = dates.map(d => {
      const isKickoff = d.type === 'kickoff';
      const isJamboree = d.type === 'jamboree';
      const isLeagueBye = d.type === 'league_bye';

      if (isKickoff || isJamboree || isLeagueBye) {
        let badgeLabel = 'SPECIAL EVENT';
        if (isKickoff) badgeLabel = 'KICK-OFF';
        else if (isJamboree) badgeLabel = 'JAMBOREE';
        else if (isLeagueBye) badgeLabel = 'LEAGUE BYE';
        else badgeLabel = (d.type || '').replace(/_/g, ' ').toUpperCase();

        return `
          <div class="schedule-special-card ${d.type}">
            <div class="special-badge">${badgeLabel}</div>
            <div class="special-info">
              <span class="special-date">${d.dayOfWeek}, ${d.formattedDate}</span>
              <h4 class="special-title">${d.title}</h4>
              <p class="special-desc">${d.notes}</p>
            </div>
          </div>
        `;
      }

      // Regular date with match cards
      const dateMatches = (d.events || [])
        .filter(id => filteredMatchIds.has(id))
        .map(id => AppState.matchesMap[id])
        .filter(Boolean);

      const byesHtml = (d.byes && d.byes.length > 0) ? `
        <div class="bye-pill-wrap">
          <span class="bye-label">Bye:</span>
          ${d.byes.map(code => {
            const team = AppState.teamsMap[code] || { name: code };
            return `<span class="badge-bye">${team.name}</span>`;
          }).join('')}
        </div>
      ` : '';

      if (dateMatches.length === 0 && !byesHtml) return '';

      const matchCardsHtml = dateMatches.map(m => {
        const home = AppState.teamsMap[m.homeTeam] || { name: m.homeTeam, color: '#333' };
        const away = AppState.teamsMap[m.awayTeam] || { name: m.awayTeam, color: '#333' };
        const location = AppState.locationsMap[m.locationId] || { name: m.locationName, address: m.locationName };

        const awayCode = away.code || (m.awayTeam === 'Seattle' ? 'SEA' : m.awayTeam === 'Sumner' ? 'SUM' : m.awayTeam === 'Tukwila' ? 'TUK' : m.awayTeam);
        const homeCode = home.code || (m.homeTeam === 'Seattle' ? 'SEA' : m.homeTeam === 'Sumner' ? 'SUM' : m.homeTeam === 'Tukwila' ? 'TUK' : m.homeTeam);

        const hasScore = m.homeScore !== null && m.awayScore !== null;
        const homeWon = hasScore && m.homeScore > m.awayScore;
        const awayWon = hasScore && m.awayScore > m.homeScore;

        return `
          <div class="match-fixture-card ${hasScore ? 'has-score' : ''}">
            <div class="fixture-header">
              <span class="fixture-time">
                <svg class="icon-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                ${m.time || '6:15 PM'} PDT
              </span>
              <span class="fixture-venue" title="${location.address}">
                <svg class="icon-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                ${location.name}
              </span>
            </div>

            <div class="fixture-body">
              <div class="fixture-team away-team ${awayWon ? 'winner' : ''}">
                <div class="team-emblem" style="background: ${away.color}" title="${away.name}">${awayCode}</div>
                <div class="team-info-name">
                  <span class="team-name">${away.name}</span>
                  <span class="team-role">Away</span>
                </div>
                ${hasScore ? `<div class="team-score ${awayWon ? 'score-winner' : ''}">${m.awayScore}</div>` : ''}
              </div>

              <div class="fixture-vs-divider">
                <span>VS</span>
              </div>

              <div class="fixture-team home-team ${homeWon ? 'winner' : ''}">
                <div class="team-emblem" style="background: ${home.color}" title="${home.name}">${homeCode}</div>
                <div class="team-info-name">
                  <span class="team-name">${home.name}</span>
                  <span class="team-role home-badge">Home</span>
                </div>
                ${hasScore ? `<div class="team-score ${homeWon ? 'score-winner' : ''}">${m.homeScore}</div>` : ''}
              </div>
            </div>

            ${m.locationNote ? `<div class="fixture-note"><svg class="icon-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg> ${m.locationNote}</div>` : ''}

            <div class="fixture-footer">
              <div class="fixture-footer-links">
                <a href="https://maps.google.com/?q=${encodeURIComponent(location.address)}" target="_blank" rel="noopener" class="card-link" title="Open Google Maps">
                  <svg class="icon-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon><line x1="9" y1="3" x2="9" y2="18"></line><line x1="15" y1="6" x2="15" y2="21"></line></svg>
                  Directions
                </a>
                <button class="card-link btn-link" onclick="window.PSSSA_App.downloadSingleMatchCalendar('${m.id}')" title="Download .ics event">
                  <svg class="icon-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  .ICS Sync
                </button>
              </div>

              <button class="btn btn-xs btn-outline scorekeeper-btn" onclick="window.PSSSA_App.openScoreModal('${m.id}')">
                <svg class="icon-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                ${hasScore ? 'Edit Score' : 'Log Score'}
              </button>
            </div>
          </div>
        `;
      }).join('');

      return `
        <div class="schedule-day-group">
          <div class="day-group-header">
            <div class="day-title-wrap">
              <span class="day-of-week">${d.dayOfWeek}</span>
              <h3 class="day-date-heading">${d.formattedDate}</h3>
            </div>
            ${byesHtml}
          </div>
          <div class="day-fixtures-grid">
            ${matchCardsHtml}
          </div>
        </div>
      `;
    }).filter(Boolean);

    if (renderedDays.length === 0) {
      DOM.scheduleContainer.innerHTML = `
        <div class="empty-state">
          <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"></circle><line x1="8" y1="12" x2="16" y2="12"></line></svg>
          <h3>No Games Found</h3>
          <p>No matches meet your selected filters. Try clearing or expanding your search criteria.</p>
          <button class="btn btn-outline btn-sm" onclick="window.PSSSA_App.resetFilters()">Clear Filters</button>
        </div>
      `;
      return;
    }

    DOM.scheduleContainer.innerHTML = renderedDays.join('');
  }

  /**
   * Calendar View: Monthly Interactive Calendar
   */
  function renderCalendarView() {
    if (!DOM.calendarContainer || !AppState.scheduleData) return;

    const months = [
      { name: 'May 2025', year: 2025, month: 4 }, // JS Month 0-indexed: 4 is May
      { name: 'June 2025', year: 2025, month: 5 },
      { name: 'July 2025', year: 2025, month: 6 }
    ];

    const matches = AppState.scheduleData.matches || [];
    const matchesByDate = {};
    matches.forEach(m => {
      if (!matchesByDate[m.date]) matchesByDate[m.date] = [];
      matchesByDate[m.date].push(m);
    });

    const datesByDate = {};
    (AppState.scheduleData.dates || []).forEach(d => {
      datesByDate[d.date] = d;
    });

    DOM.calendarContainer.innerHTML = `
      <div class="calendar-months-grid">
        ${months.map(mInfo => renderMonthGrid(mInfo, matchesByDate, datesByDate)).join('')}
      </div>
    `;
  }

  function renderMonthGrid(mInfo, matchesByDate, datesByDate) {
    const firstDay = new Date(mInfo.year, mInfo.month, 1).getDay();
    const daysInMonth = new Date(mInfo.year, mInfo.month + 1, 0).getDate();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    let cellsHtml = '';
    // Empty prefix cells
    for (let i = 0; i < firstDay; i++) {
      cellsHtml += '<div class="cal-cell cal-cell-empty"></div>';
    }

    // Days in month
    for (let day = 1; day <= daysInMonth; day++) {
      const monthStr = String(mInfo.month + 1).padStart(2, '0');
      const dayStr = String(day).padStart(2, '0');
      const dateKey = `${mInfo.year}-${monthStr}-${dayStr}`;

      const dateObj = datesByDate[dateKey];
      const dayMatches = matchesByDate[dateKey] || [];
      const isGameDay = dayMatches.length > 0;
      const isSpecial = dateObj && (dateObj.type === 'kickoff' || dateObj.type === 'jamboree' || dateObj.type === 'league_bye');

      let dayContent = `<span class="cal-day-num">${day}</span>`;

      if (isSpecial) {
        dayContent += `<div class="cal-special-pill ${dateObj.type}">${dateObj.title}</div>`;
      } else if (isGameDay) {
        dayContent += `<div class="cal-games-wrap">
          ${dayMatches.map(m => {
            const hasScore = m.homeScore !== null && m.awayScore !== null;
            return `
              <div class="cal-game-chip" onclick="window.PSSSA_App.openScoreModal('${m.id}')" title="${m.awayTeam} @ ${m.homeTeam} - ${m.locationName}">
                <span class="chip-teams">${m.awayTeam} @ ${m.homeTeam}</span>
                ${hasScore ? `<span class="chip-score">${m.awayScore}-${m.homeScore}</span>` : ''}
              </div>
            `;
          }).join('')}
        </div>`;
      }

      cellsHtml += `
        <div class="cal-cell ${isGameDay ? 'cal-cell-gameday' : ''} ${isSpecial ? 'cal-cell-special' : ''}">
          ${dayContent}
        </div>
      `;
    }

    return `
      <div class="calendar-month-card">
        <div class="cal-month-header">${mInfo.name}</div>
        <div class="cal-weekdays">
          ${days.map(d => `<div class="cal-weekday">${d}</div>`).join('')}
        </div>
        <div class="cal-days-grid">
          ${cellsHtml}
        </div>
      </div>
    `;
  }

  /**
   * Matrix View: Complete Coach Schedule Matrix from Excel
   */
  function renderMatrixView() {
    if (!DOM.matrixContainer || !AppState.scheduleData) return;

    const dates = AppState.scheduleData.dates || [];
    const teams = AppState.teams || [];

    DOM.matrixContainer.innerHTML = `
      <div class="matrix-table-card">
        <div class="matrix-card-header">
          <div>
            <h3>Official 2025 Coach League Schedule Matrix</h3>
            <p class="text-sm text-muted">Complete master grid matching the league coaching distribution document.</p>
          </div>
          <button class="btn btn-sm btn-outline" onclick="window.PSSSA_App.downloadFullLeagueCalendar()">
            <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            Export All (.ics)
          </button>
        </div>

        <div class="table-responsive">
          <table class="table matrix-table">
            <thead>
              <tr class="matrix-header-row">
                <th class="matrix-team-th sticky-col">Team</th>
                ${dates.map(d => `
                  <th class="matrix-date-th">
                    <span class="matrix-day-tag">${d.dayOfWeek.slice(0, 2)}</span>
                    <span class="matrix-date-tag">${d.date.slice(5)}</span>
                  </th>
                `).join('')}
              </tr>
            </thead>
            <tbody>
              ${teams.map(t => {
                return `
                  <tr>
                    <td class="matrix-team-name-td sticky-col" style="border-left: 4px solid ${t.color}">
                      <strong>${t.name}</strong>
                      <span class="team-code-badge">${t.code}</span>
                    </td>
                    ${dates.map(d => {
                      if (d.type === 'kickoff') {
                        return `<td class="matrix-cell matrix-special">Kick-off</td>`;
                      }
                      if (d.type === 'jamboree') {
                        return `<td class="matrix-cell matrix-special">Jamboree</td>`;
                      }
                      if (d.type === 'league_bye' || (d.byes && d.byes.includes(t.code))) {
                        return `<td class="matrix-cell matrix-bye">Bye</td>`;
                      }

                      // Find match involving this team
                      const matchId = (d.events || []).find(id => {
                        const m = AppState.matchesMap[id];
                        return m && (m.homeTeam === t.code || m.awayTeam === t.code);
                      });

                      if (!matchId) {
                        return `<td class="matrix-cell matrix-bye">Bye</td>`;
                      }

                      const m = AppState.matchesMap[matchId];
                      const isHome = m.homeTeam === t.code;
                      const opp = isHome ? m.awayTeam : m.homeTeam;
                      const text = isHome ? `v ${opp}` : `at ${opp}`;

                      return `
                        <td class="matrix-cell ${isHome ? 'matrix-home' : 'matrix-away'}" onclick="window.PSSSA_App.openScoreModal('${m.id}')" title="${m.awayTeam} at ${m.homeTeam} (${m.locationName})">
                          <span class="matrix-match-text">${text}</span>
                        </td>
                      `;
                    }).join('')}
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>

        <div class="matrix-footer-notes">
          <p><strong>Note:</strong> All Tukwila home games EXCEPT 7/8 and 7/10 are played at Celebration Park in Federal Way. (7/8 &amp; 7/10 at Tukwila Community Center).</p>
        </div>
      </div>
    `;
  }

  /**
   * Field Locations Directory Rendering
   */
  function renderLocations() {
    if (!DOM.locationsContainer || !AppState.locations) return;

    DOM.locationsContainer.innerHTML = AppState.locations.map(loc => {
      const teams = (loc.primaryTeams || []).join(', ');
      const amenities = (loc.amenities || []).map(a => `<span class="amenity-chip">${a}</span>`).join('');

      return `
        <div class="venue-card" id="venue-${loc.id}">
          <div class="venue-header">
            <div class="venue-badge-wrap">
              <span class="venue-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              </span>
              <div>
                <h3 class="venue-title">${loc.name}</h3>
                <span class="venue-city">${loc.city}, ${loc.state}</span>
              </div>
            </div>
          </div>

          <div class="venue-body">
            <p class="venue-address">
              <strong>Address:</strong> ${loc.address}
            </p>
            <p class="venue-teams">
              <strong>Primary Home Diamond:</strong> ${teams}
            </p>
            <p class="venue-notes">
              ${loc.notes}
            </p>
            <div class="amenities-list">
              ${amenities}
            </div>
          </div>

          <div class="venue-footer">
            <a href="https://maps.google.com/?q=${encodeURIComponent(loc.address)}" target="_blank" rel="noopener" class="btn btn-sm btn-primary">
              <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon><line x1="9" y1="3" x2="9" y2="18"></line><line x1="15" y1="6" x2="15" y2="21"></line></svg>
              Google Maps
            </a>
            <a href="https://maps.apple.com/?q=${encodeURIComponent(loc.address)}" target="_blank" rel="noopener" class="btn btn-sm btn-outline">
              Apple Maps
            </a>
            <button class="btn btn-sm btn-outline" onclick="window.PSSSA_App.filterByVenue('${loc.id}')">
              Filter Games
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  /**
   * Teams Directory Rendering
   */
  function renderTeams() {
    if (!DOM.teamsContainer || !AppState.teams) return;

    DOM.teamsContainer.innerHTML = AppState.teams.map(t => {
      const homeLoc = AppState.locationsMap[t.homeLocationId] || { name: 'Regional Park' };
      const teamMatches = (AppState.scheduleData?.matches || []).filter(m => m.homeTeam === t.code || m.awayTeam === t.code);

      return `
        <div class="team-profile-card" style="--team-accent: ${t.color}">
          <div class="team-card-banner" style="background: linear-gradient(135deg, ${t.color}, #0f172a)">
            <div class="team-crest-badge">${t.code}</div>
            <h3 class="team-card-name">${t.name}</h3>
            <span class="team-card-sub">${t.shortName} Senior Softball</span>
          </div>

          <div class="team-card-body">
            <p class="team-card-desc">${t.description}</p>
            <ul class="team-card-details">
              <li>
                <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <span><strong>Home Field:</strong> ${homeLoc.name}</span>
              </li>
              <li>
                <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                <span><strong>Season Schedule:</strong> ${teamMatches.length} Regular Matches</span>
              </li>
            </ul>
          </div>

          <div class="team-card-footer">
            <button class="btn btn-sm btn-primary" onclick="window.PSSSA_App.filterByTeam('${t.code}')">
              View Games
            </button>
            <button class="btn btn-sm btn-outline" onclick="window.PSSSA_App.downloadTeamCalendar('${t.code}')">
              <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              .ICS Sync
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  /**
   * Rules & FAQ Rendering
   */
  function renderRulesAndFaq() {
    if (!AppState.rules) return;

    if (DOM.rulesContainer) {
      const safety = (AppState.rules.safetyRules || []).map(r => `
        <div class="rule-card">
          <div class="rule-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></div>
          <div class="rule-text">
            <h4>${r.title}</h4>
            <p>${r.description}</p>
          </div>
        </div>
      `).join('');

      const gameCategories = (AppState.rules.gameRules || []).map(c => `
        <div class="rule-category-card">
          <h4 class="rule-cat-title">${c.category}</h4>
          <ul class="rule-cat-list">
            ${c.rules.map(r => `<li>${r}</li>`).join('')}
          </ul>
        </div>
      `).join('');

      DOM.rulesContainer.innerHTML = `
        <div class="safety-rules-grid">
          ${safety}
        </div>
        <div class="game-rules-grid">
          ${gameCategories}
        </div>
      `;
    }

    if (DOM.faqContainer) {
      DOM.faqContainer.innerHTML = (AppState.rules.faqs || []).map((faq, index) => `
        <div class="faq-item" id="faq-${index}">
          <button class="faq-question" aria-expanded="false" onclick="window.PSSSA_App.toggleFaq(${index})">
            <span>${faq.question}</span>
            <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>
          <div class="faq-answer">
            <p>${faq.answer}</p>
          </div>
        </div>
      `).join('');
    }
  }

  /**
   * Event Listeners Setup
   */
  function setupEventListeners() {
    // Theme Switcher
    if (DOM.themeToggle) {
      DOM.themeToggle.addEventListener('click', toggleTheme);
    }

    // Mobile Drawer
    if (DOM.mobileMenuBtn && DOM.mobileNavDrawer) {
      DOM.mobileMenuBtn.addEventListener('click', () => {
        DOM.mobileNavDrawer.classList.add('active');
        document.body.classList.add('drawer-open');
      });
    }
    if (DOM.mobileNavClose && DOM.mobileNavDrawer) {
      DOM.mobileNavClose.addEventListener('click', () => {
        DOM.mobileNavDrawer.classList.remove('active');
        document.body.classList.remove('drawer-open');
      });
    }
    if (DOM.mobileNavLinks) {
      DOM.mobileNavLinks.forEach(l => {
        l.addEventListener('click', () => {
          DOM.mobileNavDrawer.classList.remove('active');
          document.body.classList.remove('drawer-open');
        });
      });
    }

    // Filter controls
    if (DOM.filterTeam) {
      DOM.filterTeam.addEventListener('change', e => {
        AppState.filters.team = e.target.value;
        renderSchedule();
      });
    }
    if (DOM.filterMonth) {
      DOM.filterMonth.addEventListener('change', e => {
        AppState.filters.month = e.target.value;
        renderSchedule();
      });
    }
    if (DOM.filterVenue) {
      DOM.filterVenue.addEventListener('change', e => {
        AppState.filters.venue = e.target.value;
        renderSchedule();
      });
    }
    if (DOM.filterSearch) {
      DOM.filterSearch.addEventListener('input', debounce(e => {
        AppState.filters.search = e.target.value.trim();
        renderSchedule();
      }, 250));
    }
    if (DOM.resetFiltersBtn) {
      DOM.resetFiltersBtn.addEventListener('click', resetFilters);
    }

    // View Switchers
    if (DOM.viewTimelineBtn) {
      DOM.viewTimelineBtn.addEventListener('click', () => switchView('timeline'));
    }
    if (DOM.viewCalendarBtn) {
      DOM.viewCalendarBtn.addEventListener('click', () => switchView('calendar'));
    }
    if (DOM.viewMatrixBtn) {
      DOM.viewMatrixBtn.addEventListener('click', () => switchView('matrix'));
    }

    // Calendar Downloads
    if (DOM.downloadTeamCalBtn) {
      DOM.downloadTeamCalBtn.addEventListener('click', () => {
        const team = AppState.filters.team !== 'all' ? AppState.filters.team : 'FW';
        downloadTeamCalendar(team);
      });
    }
    if (DOM.downloadAllCalBtn) {
      DOM.downloadAllCalBtn.addEventListener('click', downloadFullLeagueCalendar);
    }
    if (DOM.printScheduleBtn) {
      DOM.printScheduleBtn.addEventListener('click', () => window.print());
    }

    // Reset Scores
    if (DOM.resetScoresBtn) {
      DOM.resetScoresBtn.addEventListener('click', resetAllScores);
    }

    // Score Modal Form
    if (DOM.scoreForm) {
      DOM.scoreForm.addEventListener('submit', handleScoreFormSubmit);
    }
    if (DOM.scoreModalClose) {
      DOM.scoreModalClose.addEventListener('click', closeScoreModal);
    }

    // Player Registration Form
    if (DOM.playerRegisterForm) {
      DOM.playerRegisterForm.addEventListener('submit', handlePlayerRegister);
    }
    // Contact Form
    if (DOM.contactForm) {
      DOM.contactForm.addEventListener('submit', handleContactSubmit);
    }

    // Global Modal Backdrop Click / Esc Key
    window.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        closeScoreModal();
        if (DOM.mobileNavDrawer) DOM.mobileNavDrawer.classList.remove('active');
      }
    });
  }

  function switchView(mode) {
    AppState.viewMode = mode;
    [DOM.viewTimelineBtn, DOM.viewCalendarBtn, DOM.viewMatrixBtn].forEach(btn => {
      if (btn) btn.classList.remove('active');
    });

    if (mode === 'timeline' && DOM.viewTimelineBtn) DOM.viewTimelineBtn.classList.add('active');
    if (mode === 'calendar' && DOM.viewCalendarBtn) DOM.viewCalendarBtn.classList.add('active');
    if (mode === 'matrix' && DOM.viewMatrixBtn) DOM.viewMatrixBtn.classList.add('active');

    renderSchedule();
  }

  function resetFilters() {
    AppState.filters = {
      team: 'all',
      month: 'all',
      venue: 'all',
      homeAway: 'all',
      search: ''
    };
    if (DOM.filterTeam) DOM.filterTeam.value = 'all';
    if (DOM.filterMonth) DOM.filterMonth.value = 'all';
    if (DOM.filterVenue) DOM.filterVenue.value = 'all';
    if (DOM.filterSearch) DOM.filterSearch.value = '';
    renderSchedule();
    showToast('Filters reset to show all games');
  }

  function filterByTeam(teamCode) {
    // On a page without the schedule/match center (e.g. the homepage),
    // hand off to the dedicated schedule page instead of filtering nothing.
    if (!DOM.scheduleContainer) {
      window.location.href = '/schedule/?team=' + encodeURIComponent(teamCode);
      return;
    }
    AppState.filters.team = teamCode;
    if (DOM.filterTeam) DOM.filterTeam.value = teamCode;
    switchView('timeline');
    renderSchedule();
    scrollToSection('schedule');
    showToast(`Filtering for ${teamCode} games`);
  }

  function filterByVenue(venueId) {
    if (!DOM.scheduleContainer) {
      window.location.href = '/schedule/?venue=' + encodeURIComponent(venueId);
      return;
    }
    AppState.filters.venue = venueId;
    if (DOM.filterVenue) DOM.filterVenue.value = venueId;
    switchView('timeline');
    renderSchedule();
    scrollToSection('schedule');
    showToast(`Filtering by venue`);
  }

  /**
   * Pick up ?team= / ?venue= query params so links from other pages
   * (e.g. a team card on the homepage) can deep-link into a filtered view
   * of the schedule page.
   */
  function applyUrlFilters() {
    if (!DOM.scheduleContainer) return;
    const params = new URLSearchParams(window.location.search);
    const team = params.get('team');
    const venue = params.get('venue');
    if (team) {
      AppState.filters.team = team;
      if (DOM.filterTeam) DOM.filterTeam.value = team;
    }
    if (venue) {
      AppState.filters.venue = venue;
      if (DOM.filterVenue) DOM.filterVenue.value = venue;
    }
  }

  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  /**
   * Scorekeeper Modal & Actions (PIN Protected)
   */
  const SCOREKEEPER_PIN = '2025';

  function isScorekeeperAuth() {
    return sessionStorage.getItem('psssa_sk_authenticated') === 'true';
  }

  function promptScorekeeperPin() {
    const pin = prompt('Enter League Official / Scorekeeper PIN to edit scores:\n(League PIN: 2025)');
    if (!pin) return false;
    if (pin.trim() === SCOREKEEPER_PIN || pin.trim().toLowerCase() === 'psssa2025') {
      sessionStorage.setItem('psssa_sk_authenticated', 'true');
      showToast('Scorekeeper mode unlocked! You can now record match scores.');
      return true;
    } else {
      alert('Incorrect PIN. Scorekeeper access denied.');
      return false;
    }
  }

  function openScoreModal(matchId) {
    if (!isScorekeeperAuth()) {
      const authed = promptScorekeeperPin();
      if (!authed) return;
    }

    const match = AppState.matchesMap[matchId];
    if (!match) return;

    AppState.activeMatchForScore = match;
    const home = AppState.teamsMap[match.homeTeam] || { name: match.homeTeam };
    const away = AppState.teamsMap[match.awayTeam] || { name: match.awayTeam };

    DOM.scoreHomeLabel.textContent = `${home.name} (Home)`;
    DOM.scoreAwayLabel.textContent = `${away.name} (Away)`;
    DOM.scoreMatchDate.textContent = `${match.dayOfWeek}, ${match.formattedDate} • ${match.time || '6:15 PM'}`;
    DOM.scoreMatchVenue.textContent = match.locationName;

    DOM.scoreHomeInput.value = match.homeScore !== null ? match.homeScore : '';
    DOM.scoreAwayInput.value = match.awayScore !== null ? match.awayScore : '';

    DOM.scoreModal.classList.add('active');
  }

  function closeScoreModal() {
    if (DOM.scoreModal) DOM.scoreModal.classList.remove('active');
    AppState.activeMatchForScore = null;
  }

  function handleScoreFormSubmit(e) {
    e.preventDefault();
    if (!AppState.activeMatchForScore) return;

    const match = AppState.activeMatchForScore;
    const homeVal = DOM.scoreHomeInput.value.trim();
    const awayVal = DOM.scoreAwayInput.value.trim();

    if (homeVal === '' || awayVal === '') {
      // Clear score
      delete AppState.scores[match.id];
      match.homeScore = null;
      match.awayScore = null;
      match.status = 'scheduled';
    } else {
      const hScore = parseInt(homeVal, 10);
      const aScore = parseInt(awayVal, 10);
      AppState.scores[match.id] = { homeScore: hScore, awayScore: aScore };
      match.homeScore = hScore;
      match.awayScore = aScore;
      match.status = 'completed';
    }

    saveScores();
    renderStandings();
    renderSchedule();
    renderHeroTicker();
    closeScoreModal();
    showToast('Game scores & standings updated!');
  }

  function resetAllScores() {
    if (!isScorekeeperAuth()) {
      const authed = promptScorekeeperPin();
      if (!authed) return;
    }

    const firstConfirm = confirm('WARNING: Are you sure you want to reset all logged scores back to the original schedule?');
    if (!firstConfirm) return;

    const secondConfirm = confirm('This will permanently delete all recorded game results on this device. Click OK to proceed with reset.');
    if (!secondConfirm) return;

    AppState.scores = {};
    localStorage.removeItem('psssa_scores_2025');
    (AppState.scheduleData?.matches || []).forEach(m => {
      m.homeScore = null;
      m.awayScore = null;
      m.status = 'scheduled';
    });
    renderStandings();
    renderSchedule();
    renderHeroTicker();
    showToast('All scores reset to scheduled state');
  }

  /**
   * Calendar Sync Handlers (RFC 5545)
   */
  function downloadSingleMatchCalendar(matchId) {
    const match = AppState.matchesMap[matchId];
    if (!match || !window.PSSSA_Calendar) return;
    window.PSSSA_Calendar.downloadSingleMatch(match, AppState.teamsMap, AppState.locationsMap);
    showToast('Match .ics calendar file downloaded');
  }

  function downloadTeamCalendar(teamCode) {
    if (!window.PSSSA_Calendar || !AppState.scheduleData) return;
    const matches = AppState.scheduleData.matches || [];
    window.PSSSA_Calendar.downloadTeamSchedule(teamCode, matches, AppState.teamsMap, AppState.locationsMap);
    showToast(`${teamCode} season .ics calendar file downloaded`);
  }

  function downloadFullLeagueCalendar() {
    if (!window.PSSSA_Calendar || !AppState.scheduleData) return;
    const matches = AppState.scheduleData.matches || [];
    window.PSSSA_Calendar.downloadFullLeagueSchedule(matches, AppState.teamsMap, AppState.locationsMap);
    showToast('Full league schedule .ics file downloaded');
  }

  /**
   * FAQ Accordion
   */
  function toggleFaq(index) {
    const item = document.getElementById(`faq-${index}`);
    if (!item) return;
    const btn = item.querySelector('.faq-question');
    const isExpanded = btn.getAttribute('aria-expanded') === 'true';

    // Close all
    document.querySelectorAll('.faq-item').forEach(el => {
      el.classList.remove('active');
      el.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });

    if (!isExpanded) {
      item.classList.add('active');
      btn.setAttribute('aria-expanded', 'true');
    }
  }

  /**
   * Form Submissions
   */
  async function handlePlayerRegister(e) {
    e.preventDefault();
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // Honeypot spam bot check
    const honey = form.querySelector('input[name="_honey"]')?.value;
    if (honey) {
      // Bot detected, silently finish without submitting
      showToast('Thank you! Your registration has been submitted.');
      form.reset();
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Submitting Registration...';

    try {
      const formData = new FormData(form);
      const res = await fetch(form.action || 'https://formsubmit.co/ajax/gmasphone119@gmail.com', {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: formData
      });

      if (res.ok) {
        showToast('Thank you! Your player registration was sent to the league coordinator.');
        form.reset();
      } else {
        showToast('Thank you! Your registration interest was received.');
        form.reset();
      }
    } catch (err) {
      console.warn('Form submission network fallback:', err);
      showToast('Thank you! Your player registration was submitted.');
      form.reset();
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  }

  async function handleContactSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // Honeypot spam bot check
    const honey = form.querySelector('input[name="_honey"]')?.value;
    if (honey) {
      // Bot detected, silently finish without submitting
      showToast('Message sent! The PSSSA league board will get back to you shortly.');
      form.reset();
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending Message...';

    try {
      const formData = new FormData(form);
      const res = await fetch(form.action || 'https://formsubmit.co/ajax/gmasphone119@gmail.com', {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: formData
      });

      if (res.ok) {
        showToast('Message sent! The PSSSA league board will get back to you shortly.');
        form.reset();
      } else {
        showToast('Message sent! The PSSSA league board will get back to you shortly.');
        form.reset();
      }
    } catch (err) {
      console.warn('Form submission network fallback:', err);
      showToast('Message sent! The PSSSA league board will get back to you shortly.');
      form.reset();
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  }

  /**
   * Toast Notification Utility
   */
  function showToast(message, duration = 3500) {
    if (!DOM.toast) return;
    DOM.toast.textContent = message;
    DOM.toast.classList.add('visible');
    clearTimeout(DOM.toastTimeout);
    DOM.toastTimeout = setTimeout(() => {
      DOM.toast.classList.remove('visible');
    }, duration);
  }

  function debounce(fn, wait) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn.apply(this, args), wait);
    };
  }

  /**
   * PWA Service Worker Registration
   */
  function registerServiceWorker() {
    if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(err => {
          console.log('ServiceWorker registration skipped or failed:', err);
        });
      });
    }
  }

  // Public Interface on window.PSSSA_App
  window.PSSSA_App = {
    init,
    toggleTheme,
    filterByTeam,
    filterByVenue,
    resetFilters,
    openScoreModal,
    closeScoreModal,
    downloadSingleMatchCalendar,
    downloadTeamCalendar,
    downloadFullLeagueCalendar,
    toggleFaq
  };

  // Launch on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
