# Project Handoff Synopsis: PSSSA Website Modernization

## 1. Project Goal
Modernize the official Puget Sound Senior Softball Association (PSSSA) Co-Ed League website (`psssacoedleague.com`), replacing an obsolete, unmaintained WordPress installation with an ultra-fast, zero-cost, static web application featuring interactive schedules, live standings with scorekeeping, ballpark mapping, RFC 5545 calendar syncing, and online player registration. Success is measured by high mobile usability, zero hosting maintenance costs for the league, verified form lead delivery to league officials, and top organic search engine visibility across King and Pierce County.

---

## 2. Current Status
* **Phase:** Production Launch & QA Complete (Post-Deployment Hardening).
* **Live URL:** [https://psssacoedleague.com/](https://psssacoedleague.com/) (HTTPS Enforced, SSL active via Let's Encrypt).
* **Staging / Fallback URL:** [https://houg40.github.io/psssa-coed-softball/](https://houg40.github.io/psssa-coed-softball/)
* **Code Repository:** `https://github.com/Houg40/psssa-coed-softball.git` (Branch: `main`).
* **Audit Status:** All 10 QA defects (DEF-01 through DEF-10) resolved, verified, and pushed to production.

---

## 3. Decisions Made & Rationale

* **Architecture (Static Multi-Page SPA Hybrid):**
  * *Decision:* Replaced PHP/WordPress with semantic HTML5, vanilla JavaScript (ES6+), modular CSS3 custom properties, and static JSON data bundles.
  * *Why:* Eliminates database/server vulnerabilities, zero hosting cost on GitHub Pages, near-instant load times (<0.3s), and perfect Core Web Vitals score.
* **Dual Data Loading (`data/*.json` + `js/data.js`):**
  * *Decision:* Data is structured in JSON files and mirrored into `window.PSSSA_DATA` in `js/data.js`.
  * *Why:* Allows the site to run both over HTTP/HTTPS servers and directly via local `file:///` double-click without triggering CORS restrictions.
* **Form Submissions via FormSubmit.co:**
  * *Decision:* Connected Free Agent and Contact forms to `https://formsubmit.co/ajax/gmasphone119@gmail.com` with honeypot spam protection (`_honey`) and AJAX submission.
  * *Why:* Requires no server-side backend maintenance; forwards structured lead tables directly to the commissioner's inbox.
* **Scorekeeper Authorization (Client-Side PIN Gate):**
  * *Decision:* Score logging, score editing, and score resets require PIN authentication (Default: `2025` or `psssa2025`), storing auth in `sessionStorage`.
  * *Why:* Prevents unauthorized public visitors from altering or wiping official league standings, while avoiding complex database user account infrastructure.
* **Domain & DNS Strategy (IONOS Registrar + GitHub Pages DNS):**
  * *Decision:* Retained domain registration under IONOS Contract `#95679879`, updated `A` records to GitHub IP addresses (`185.199.108.153` – `111.153`) and `www` CNAME to `houg40.github.io`.
  * *Why:* Keeps domain ownership intact while eliminating paid WordPress hosting contracts.
* **Dedicated Multi-Page URL Structure for SEO:**
  * *Decision:* Built dedicated subdirectories with individual `index.html` files (`/schedule/`, `/standings/`, `/locations/`, `/teams/`, `/rules/`, `/join/`) alongside legacy 301/refresh stubs (`/schedule-2/`, `/field-locations/`, `/about/`) and custom `404.html`.
  * *Why:* Maximizes Google crawl indexation and ranking for local sports search keywords.

---

## 4. Work Completed & Deliverables

### Core Application Files
* [`index.html`](file:///c:/Users/ignac/Desktop/PSSSA%20Website/index.html): Modern landing page with hero ticker, next-game countdown, quick action cards, and Schema.org `SportsOrganization` + `FAQPage` JSON-LD markup.
* [`schedule/index.html`](file:///c:/Users/ignac/Desktop/PSSSA%20Website/schedule/index.html): Match Center with 3 view switchers (Timeline, Monthly Calendar, Master Matrix), multi-criteria filtering (Team, Month, Venue, Search), and `.ics` download buttons.
* [`standings/index.html`](file:///c:/Users/ignac/Desktop/PSSSA%20Website/standings/index.html): Leaderboard with live win percentage, run differential, points, and Scorekeeper modal.
* [`locations/index.html`](file:///c:/Users/ignac/Desktop/PSSSA%20Website/locations/index.html): Ballpark directory with addresses, parking notes, field amenities, and Google/Apple Maps direct links.
* [`teams/index.html`](file:///c:/Users/ignac/Desktop/PSSSA%20Website/teams/index.html): Team profiles (Federal Way, Maple Valley Masters, Seattle, Sumner, Tukwila) with home diamond links and season filter shortcuts.
* [`rules/index.html`](file:///c:/Users/ignac/Desktop/PSSSA%20Website/rules/index.html): Senior softball bylaws, safety equipment rules, and interactive FAQ accordion.
* [`join/index.html`](file:///c:/Users/ignac/Desktop/PSSSA%20Website/join/index.html): Free Agent registration form and league contact inquiry form.
* [`404.html`](file:///c:/Users/ignac/Desktop/PSSSA%20Website/404.html): Branded error page with recovery navigation and legacy WordPress path auto-redirects.
* [`css/style.css`](file:///c:/Users/ignac/Desktop/PSSSA%20Website/css/style.css): Full design system with CSS custom properties (PNW Emerald `#059669`, Gold `#f59e0b`, Slate dark mode, Light theme tokens, print styles).
* [`js/app.js`](file:///c:/Users/ignac/Desktop/PSSSA%20Website/js/app.js): Core application logic, filters, calendar/matrix renderers, standings math, PIN auth, and sanitized toast system.
* [`js/calendar.js`](file:///c:/Users/ignac/Desktop/PSSSA%20Website/js/calendar.js): RFC 5545 `.ics` iCalendar generator supporting single game, team season, and full league schedule downloads.
* [`js/data.js`](file:///c:/Users/ignac/Desktop/PSSSA%20Website/js/data.js): Embedded unified data store.

### Data & Assets
* [`data/schedule.json`](file:///c:/Users/ignac/Desktop/PSSSA%20Website/data/schedule.json): Extracted from Excel; 24 schedule dates, 40 fixtures, Kick-off, Jamboree, Byes, and field notes.
* [`data/locations.json`](file:///c:/Users/ignac/Desktop/PSSSA%20Website/data/locations.json): Extracted from Word; Celebration Park, Lower Woodland, Ravensdale, Tukwila CC, Sumner Ballfields.
* [`data/teams.json`](file:///c:/Users/ignac/Desktop/PSSSA%20Website/data/teams.json): Team metadata, hex colors, and home ballpark IDs.
* [`data/rules.json`](file:///c:/Users/ignac/Desktop/PSSSA%20Website/data/rules.json): Senior co-ed softball safety and game regulations.
* `images/logo.svg` & `images/favicon.svg`: Vector badges and favicon.
* `manifest.json` & `sw.js`: PWA offline caching service worker and web manifest.
* `robots.txt` & `sitemap.xml`: Complete search engine crawling rules and indexed page list.
* `CNAME`: Domain configuration set to `psssacoedleague.com`.
* `.nojekyll` & `.github/workflows/deploy.yml`: GitHub Pages automated deployment pipeline.

---

## 5. In Progress / Partially Done
* **FormSubmit Email Activation:** First-time activation email sent to `gmasphone119@gmail.com`. The client must click the one-time confirmation link in their inbox to enable automated form forwarding.
* **IONOS Contract Cancellation:** Client was provided an itemized contract cancellation guide to terminate duplicate WordPress hosting (#100483257), marketingRadar (#100483256), and security add-ons, while preserving domain #95679879. Client must execute this in the IONOS portal.

---

## 6. Open Questions / Undecided Items
* **Google Search Console & Business Profile:** Has the client claimed `psssacoedleague.com` in Google Search Console and submitted `sitemap.xml`?
* **Real Community Photography:** Does the league want to replace vector illustrations with high-resolution action photos from senior softball tournaments?
* **Payment Links / League Dues:** Does the league board want to display player registration fees or direct payment options (Venmo/Zelle/PayPal) on `/join/`?

---

## 7. Next Steps (Priority Order)

1. **Verify Client Form Activation:** Confirm client opened the FormSubmit verification email at `gmasphone119@gmail.com` and submitted a live test registration on `/join/`.
2. **Submit Sitemap to Google Search Console:** Have client log into [search.google.com/search-console](https://search.google.com/search-console) with `gmasphone119@gmail.com`, add `psssacoedleague.com`, and submit `https://psssacoedleague.com/sitemap.xml`.
3. **Confirm IONOS Bill Reductions:** Follow up with client to verify that redundant WordPress hosting and security line items have been cancelled on IONOS.
4. **Prepare 2026 Schedule Updates:** When the league commissioner releases the next season schedule Excel sheet, update `data/schedule.json` and run the generator script.

---

## 8. Key Context & Constraints

* **Primary Audience:** Senior softball players (Men 50+, Women 45+), team managers, and umpires across King and Pierce County, WA. High mobile usage, requiring large tap targets, high contrast, readable typography, and offline access.
* **Hosting & Stack:** Pure static site hosted on **GitHub Pages** with custom domain `psssacoedleague.com`. **Do not introduce server-side runtimes (PHP, Node server, Python backend)** into production hosting; keep it static.
* **Git Repository:** Working tree is at `c:\Users\ignac\Desktop\PSSSA Website`. All pushes go to `origin main`.
* **Scorekeeper Credentials:** PIN is set to `2025` (or `psssa2025`) in `js/app.js`.
* **Form Receiving Email:** `gmasphone119@gmail.com` (configured in `index.html`, `join/index.html`, and `js/app.js`).
* **Rejected Approaches:**
  * *Full WordPress rebuild:* Rejected due to recurring hosting costs, security maintenance, and plugin bloat.
  * *Single-page only anchor layout:* Replaced with dedicated multi-page routes (`/schedule/`, `/standings/`, etc.) for superior SEO and direct bookmarking.
