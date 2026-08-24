/**
 * PSSSA iCalendar (.ics) Generator
 * Conforms to RFC 5545 for Google Calendar, Apple Calendar, and Outlook sync.
 */

const PSSSA_Calendar = {
  /**
   * Format Date to iCalendar UTC/Local format
   * e.g., "2025-05-08", "18:15" -> "20250508T181500"
   */
  formatDateTime(dateStr, timeStr = '18:15') {
    const cleanDate = dateStr.replace(/-/g, '');
    const [h, m] = timeStr.split(':');
    const cleanTime = `${h.padStart(2, '0')}${m.padStart(2, '0')}00`;
    return `${cleanDate}T${cleanTime}`;
  },

  /**
   * Calculate end time (75 mins after start)
   */
  calculateEndTime(dateStr, timeStr = '18:15', durationMinutes = 75) {
    const [h, m] = timeStr.split(':').map(Number);
    const date = new Date(`${dateStr}T${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:00`);
    date.setMinutes(date.getMinutes() + durationMinutes);
    
    const endH = date.getHours().toString().padStart(2, '0');
    const endM = date.getMinutes().toString().padStart(2, '0');
    const cleanDate = dateStr.replace(/-/g, '');
    return `${cleanDate}T${endH}${endM}00`;
  },

  /**
   * Escape text per RFC 5545
   */
  escapeText(text) {
    if (!text) return '';
    return text
      .replace(/\\/g, '\\\\')
      .replace(/;/g, '\\;')
      .replace(/,/g, '\\,')
      .replace(/\n/g, '\\n');
  },

  /**
   * Generate an ICS event string
   */
  createVEvent(match, teamsMap, locationsMap) {
    const homeTeam = teamsMap[match.homeTeam] || { name: match.homeTeam };
    const awayTeam = teamsMap[match.awayTeam] || { name: match.awayTeam };
    const location = locationsMap[match.locationId] || { name: match.locationName, address: match.locationName };

    const startDT = this.formatDateTime(match.date, '18:15');
    const endDT = this.calculateEndTime(match.date, '18:15', 75);
    const summary = `Softball: ${awayTeam.name} @ ${homeTeam.name} (PSSSA)`;
    const description = `Puget Sound Senior Softball Association Co-Ed Game\\n\\n` +
      `Matchup: ${awayTeam.name} vs ${homeTeam.name}\\n` +
      `Location: ${location.name}\\n` +
      `Address: ${location.address}\\n` +
      (match.locationNote ? `Note: ${match.locationNote}\\n` : '') +
      `League Info: https://psssacoedleague.com`;

    return [
      'BEGIN:VEVENT',
      `UID:${match.id}@psssacoedleague.com`,
      `DTSTAMP:${this.formatDateTime(new Date().toISOString().slice(0, 10), '12:00')}Z`,
      `DTSTART;TZID=America/Los_Angeles:${startDT}`,
      `DTEND;TZID=America/Los_Angeles:${endDT}`,
      `SUMMARY:${this.escapeText(summary)}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${this.escapeText(location.address || location.name)}`,
      'STATUS:CONFIRMED',
      'CATEGORIES:Sports,Softball,PSSSA',
      'END:VEVENT'
    ].join('\r\n');
  },

  /**
   * Generate ICS file for single match
   */
  downloadSingleMatch(match, teamsMap, locationsMap) {
    const vEvent = this.createVEvent(match, teamsMap, locationsMap);
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Puget Sound Senior Softball Association//PSSSA Match Calendar//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'X-WR-CALNAME:PSSSA Softball Game',
      'X-WR-TIMEZONE:America/Los_Angeles',
      vEvent,
      'END:VCALENDAR'
    ].join('\r\n');

    this.triggerDownload(icsContent, `psssa-${match.date}-${match.homeTeam}-vs-${match.awayTeam}.ics`);
  },

  /**
   * Generate ICS file for an entire team's season
   */
  downloadTeamSchedule(teamCode, matches, teamsMap, locationsMap) {
    const team = teamsMap[teamCode] || { name: teamCode };
    const teamMatches = matches.filter(m => m.homeTeam === teamCode || m.awayTeam === teamCode);
    
    if (teamMatches.length === 0) {
      alert(`No matches found for team: ${team.name}`);
      return;
    }

    const vEvents = teamMatches.map(m => this.createVEvent(m, teamsMap, locationsMap)).join('\r\n');
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Puget Sound Senior Softball Association//PSSSA Season Calendar//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      `X-WR-CALNAME:PSSSA - ${team.name} 2025 Schedule`,
      'X-WR-TIMEZONE:America/Los_Angeles',
      vEvents,
      'END:VCALENDAR'
    ].join('\r\n');

    this.triggerDownload(icsContent, `psssa-2025-${teamCode.toLowerCase()}-schedule.ics`);
  },

  /**
   * Generate ICS file for all league matches
   */
  downloadFullLeagueSchedule(matches, teamsMap, locationsMap) {
    const vEvents = matches.map(m => this.createVEvent(m, teamsMap, locationsMap)).join('\r\n');
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Puget Sound Senior Softball Association//PSSSA Full League Calendar//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'X-WR-CALNAME:PSSSA 2025 Full League Schedule',
      'X-WR-TIMEZONE:America/Los_Angeles',
      vEvents,
      'END:VCALENDAR'
    ].join('\r\n');

    this.triggerDownload(icsContent, 'psssa-2025-full-schedule.ics');
  },

  /**
   * Helper to trigger browser file download
   */
  triggerDownload(content, filename) {
    const blob = new Blob([content], { type: 'text/calendar;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  }
};

window.PSSSA_Calendar = PSSSA_Calendar;
