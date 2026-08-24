# Puget Sound Senior Softball Association (PSSSA) Website

Modern, accessible, fast, and feature-complete web platform for the **Puget Sound Senior Softball Association (PSSSA) Co-Ed League**.

![PSSSA Logo](images/logo.svg)

---

## ✨ Features

- 📅 **Interactive Match Center & Schedule**:
  - Filter games by Team, Month (May, June, July), Field Venue, or Search keywords.
  - **Timeline View**: Fixture cards with start times, home/away badges, Google Maps links, and .ICS downloads.
  - **Calendar View**: Month-by-month calendar with game chips and gameday highlights.
  - **Coach Master Matrix**: Full master matrix extracted directly from the league coaches schedule sheet.
  - **One-Click Calendar Sync (.ICS)**: Export individual games, an entire team's season, or the full 40-game league schedule into Apple Calendar, Google Calendar, or Microsoft Outlook.
  - **Print Optimized**: Press `Ctrl+P` (or click Print) for clean, printer-friendly paper schedules.

- 🏆 **Dynamic Standings & Interactive Scorekeeper**:
  - Live table calculating Games Played (GP), Wins (W), Losses (L), Ties (T), Win Percentage (PCT), Runs Scored (RS), Runs Allowed (RA), Run Differential (DIFF), and Points.
  - Built-in Scorekeeper mode allowing coaches/administrators to log game scores with automatic `localStorage` persistence.
  - One-click score reset button to restore default schedule status.

- 📍 **Field Locations & Interactive Maps**:
  - Complete venue directory with addresses, parking/amenities notes, and direct Google Maps & Apple Maps navigation links for:
    - **Celebration Park** (Federal Way)
    - **Lower Woodland Park** (Seattle)
    - **Ravensdale Park** (Maple Valley)
    - **Tukwila Community Center** (Tukwila)
    - **Sumner Ballfields** (Sumner)

- 🛡️ **Senior Softball Rules & FAQ**:
  - Detailed explanations of Senior Softball co-ed rules (Commitment Line, Scoring Plate, Safety Double First Base, Approved Senior Bats, Inning Run Limits, Courtesy Runners).
  - Searchable FAQ accordion.

- ✍️ **Player Registration & Contact Forms**:
  - Free Agent / New Player Interest form with team preference and position selection.
  - Direct league board contact form.

- 🌓 **Dark / Light Mode**:
  - System-preference-aware theme switcher with local persistence.

- 📱 **Progressive Web App (PWA) Offline Support**:
  - Works offline when cell reception is spotty at the ballfields.

---

## 📁 Directory Structure

```
├── index.html                  # Semantic, accessible HTML5 single-page application
├── manifest.json               # Progressive Web App (PWA) manifest
├── sw.js                       # Service Worker for offline caching
├── package.json                # Local development scripts
├── netlify.toml                # Netlify deployment configuration
├── vercel.json                 # Vercel deployment configuration
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions automated GitHub Pages CI/CD
├── css/
│   └── style.css               # Modern responsive design system & print styles
├── js/
│   ├── data.js                 # Standalone data store for instant offline/file:// use
│   ├── calendar.js             # RFC 5545 iCalendar (.ics) generator
│   └── app.js                  # Application state, filters, standings & modals
├── data/
│   ├── schedule.json           # 2025 match fixtures and dates
│   ├── locations.json          # Ballpark addresses and details
│   ├── teams.json              # Team clubs, colors, and contacts
│   └── rules.json              # League rules, guidelines, and FAQs
├── images/
│   ├── logo.svg                # Vector PSSSA crest emblem
│   └── favicon.svg             # Vector favicon
├── Locations.docx              # Original source documents
└── PSSSA_CoedSchedule2025ToCoaches.xlsx
```

---

## 🚀 Local Development

You can open `index.html` directly in any web browser by double-clicking it, or run a local dev server:

```bash
# Using Node / npx
npx serve .

# Or using Python 3
python -m http.server 3000
```
Then open `http://localhost:3000` in your browser.

---

## 🌐 Deployment Options

### 1. GitHub Pages (Automated via GitHub Actions)
1. Push this repository to GitHub.
2. In your repository settings, go to **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, select **GitHub Actions**.
4. The workflow in `.github/workflows/deploy.yml` will automatically build and publish your site!

### 2. Netlify
1. Connect your repository to [Netlify](https://www.netlify.com/).
2. Set Publish directory to `.` (root).
3. The included `netlify.toml` automatically configures headers and deployment.

### 3. Vercel
1. Import your repository into [Vercel](https://vercel.com/).
2. Deploy with default static settings.

### 4. Firebase Hosting
```bash
npx -y firebase-tools init hosting
npx -y firebase-tools deploy
```

---

## 📝 Updating Season Data

All league data is separated into clean, human-readable JSON files in the `/data` folder:
- To update matches or dates: edit `data/schedule.json`
- To update ballpark addresses: edit `data/locations.json`
- To update teams or colors: edit `data/teams.json`
- To update rules or FAQs: edit `data/rules.json`

Run `python -c "import json; ..."` or update `js/data.js` if running in environments without HTTP fetch.
