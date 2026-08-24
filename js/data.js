/**
 * PSSSA Data Bundle
 * Bundled data store supporting both offline/local file:// and fetch() workflows.
 */
window.PSSSA_DATA = {
  teams: [
  {
    "id": "FW",
    "name": "Federal Way",
    "shortName": "Federal Way",
    "code": "FW",
    "color": "#0d9488",
    "accent": "#14b8a6",
    "homeLocationId": "celebration",
    "manager": "League Coordinator",
    "email": "fw-softball@psssacoedleague.com",
    "description": "Federal Way Senior Softball Club playing out of Celebration Park."
  },
  {
    "id": "MVM",
    "name": "Maple Valley Masters",
    "shortName": "Maple Valley",
    "code": "MVM",
    "color": "#2563eb",
    "accent": "#3b82f6",
    "homeLocationId": "ravensdale",
    "manager": "League Coordinator",
    "email": "mvm-softball@psssacoedleague.com",
    "description": "Maple Valley Masters playing out of Ravensdale Park."
  },
  {
    "id": "Seattle",
    "name": "Seattle Emeralds",
    "shortName": "Seattle",
    "code": "Seattle",
    "color": "#059669",
    "accent": "#10b981",
    "homeLocationId": "lower_woodland",
    "manager": "League Coordinator",
    "email": "seattle-softball@psssacoedleague.com",
    "description": "Seattle Senior Softball team hosting games at Lower Woodland Park."
  },
  {
    "id": "Sumner",
    "name": "Sumner Sounders",
    "shortName": "Sumner",
    "code": "Sumner",
    "color": "#d97706",
    "accent": "#f59e0b",
    "homeLocationId": "sumner_field",
    "manager": "League Coordinator",
    "email": "sumner-softball@psssacoedleague.com",
    "description": "Sumner Senior Softball team competing across South Sound."
  },
  {
    "id": "Tukwila",
    "name": "Tukwila Titans",
    "shortName": "Tukwila",
    "code": "Tukwila",
    "color": "#7c3aed",
    "accent": "#8b5cf6",
    "homeLocationId": "celebration",
    "specialHomeLocationId": "tukwila_cc",
    "specialHomeDates": [
      "2025-07-08",
      "2025-07-10"
    ],
    "manager": "League Coordinator",
    "email": "tukwila-softball@psssacoedleague.com",
    "description": "Tukwila Co-Ed Senior Softball team (Home games at Celebration Park, with select matches at Tukwila Community Center)."
  }
],
  locations: [
  {
    "id": "celebration",
    "name": "Celebration Park",
    "address": "1095 S 324th Street, Federal Way, WA 98003",
    "city": "Federal Way",
    "state": "WA",
    "zip": "98003",
    "primaryTeams": [
      "FW",
      "Tukwila"
    ],
    "notes": "Primary home complex for Federal Way. Primary home diamond for Tukwila except July 8 and July 10 games.",
    "mapQuery": "Celebration+Park+Federal+Way+WA",
    "lat": 47.3101,
    "lng": -122.3197,
    "amenities": [
      "Lighted Dirt/Turf Fields",
      "Restrooms",
      "Ample Parking",
      "Covered Dugouts",
      "Spectator Bleachers"
    ]
  },
  {
    "id": "lower_woodland",
    "name": "Lower Woodland Park",
    "address": "1000 N 50th Street, Seattle WA 98103",
    "city": "Seattle",
    "state": "WA",
    "zip": "98103",
    "primaryTeams": [
      "Seattle"
    ],
    "notes": "Historic Seattle sports fields situated adjacent to Green Lake and Woodland Park.",
    "mapQuery": "Lower+Woodland+Park+Seattle+WA",
    "lat": 47.6653,
    "lng": -122.3444,
    "amenities": [
      "Multiple Ballfields",
      "Restrooms",
      "Trail Access",
      "Parking Lots"
    ]
  },
  {
    "id": "ravensdale",
    "name": "Ravensdale Park",
    "address": "27200 SE Kent Kangley Rd, Ravensdale, WA 98051",
    "city": "Ravensdale",
    "state": "WA",
    "zip": "98051",
    "primaryTeams": [
      "MVM"
    ],
    "notes": "Scenic South King County complex serving as the home base for Maple Valley Masters.",
    "mapQuery": "Ravensdale+Park+Ravensdale+WA",
    "lat": 47.3552,
    "lng": -121.9961,
    "amenities": [
      "High Quality Turf Fields",
      "Restrooms",
      "Concession Area",
      "Spacious Parking"
    ]
  },
  {
    "id": "tukwila_cc",
    "name": "Tukwila Community Center",
    "address": "12424 42nd Ave S, Tukwila, WA 98168",
    "city": "Tukwila",
    "state": "WA",
    "zip": "98168",
    "primaryTeams": [
      "Tukwila (Special dates: 7/8 & 7/10)"
    ],
    "notes": "Hosts Tukwila home games specifically on Tuesday July 8 and Thursday July 10, 2025.",
    "mapQuery": "Tukwila+Community+Center+Tukwila+WA",
    "lat": 47.4925,
    "lng": -122.2801,
    "amenities": [
      "Community Center Amenities",
      "Restrooms",
      "Riverview Views",
      "Parking"
    ]
  },
  {
    "id": "sumner_field",
    "name": "Sumner Ballfields",
    "address": "Sumner, WA 98390",
    "city": "Sumner",
    "state": "WA",
    "zip": "98390",
    "primaryTeams": [
      "Sumner"
    ],
    "notes": "Sumner regional softball facilities for Sumner sounder home games.",
    "mapQuery": "Sumner+WA+Ballfields",
    "lat": 47.2032,
    "lng": -122.2415,
    "amenities": [
      "Maintained Dirt Infields",
      "Restrooms",
      "Parking"
    ]
  }
],
  schedule: {
  "season": "2025",
  "title": "Puget Sound Senior Softball Association 2025 Co-Ed Schedule",
  "dates": [
    {
      "date": "2025-05-06",
      "dayOfWeek": "Tuesday",
      "formattedDate": "May 06, 2025",
      "round": 1,
      "events": [],
      "byes": [],
      "type": "kickoff",
      "title": "2025 Season Kick-Off",
      "notes": "All teams participate in season opening kick-off activities."
    },
    {
      "date": "2025-05-08",
      "dayOfWeek": "Thursday",
      "formattedDate": "May 08, 2025",
      "round": 2,
      "events": [
        "m-2025-05-08-fw-tukwila",
        "m-2025-05-08-sumner-mvm"
      ],
      "byes": [
        "Seattle"
      ],
      "type": "regular",
      "title": "Regular Season Matchday 1",
      "notes": ""
    },
    {
      "date": "2025-05-13",
      "dayOfWeek": "Tuesday",
      "formattedDate": "May 13, 2025",
      "round": 3,
      "events": [
        "m-2025-05-13-fw-sumner",
        "m-2025-05-13-tukwila-seattle"
      ],
      "byes": [
        "MVM"
      ],
      "type": "regular",
      "title": "Regular Season Matchday 2",
      "notes": ""
    },
    {
      "date": "2025-05-15",
      "dayOfWeek": "Thursday",
      "formattedDate": "May 15, 2025",
      "round": 4,
      "events": [
        "m-2025-05-15-mvm-fw",
        "m-2025-05-15-sumner-seattle"
      ],
      "byes": [
        "Tukwila"
      ],
      "type": "regular",
      "title": "Regular Season Matchday 3",
      "notes": ""
    },
    {
      "date": "2025-05-20",
      "dayOfWeek": "Tuesday",
      "formattedDate": "May 20, 2025",
      "round": 5,
      "events": [
        "m-2025-05-20-seattle-fw",
        "m-2025-05-20-tukwila-mvm"
      ],
      "byes": [
        "Sumner"
      ],
      "type": "regular",
      "title": "Regular Season Matchday 4",
      "notes": ""
    },
    {
      "date": "2025-05-22",
      "dayOfWeek": "Thursday",
      "formattedDate": "May 22, 2025",
      "round": 6,
      "events": [
        "m-2025-05-22-seattle-mvm",
        "m-2025-05-22-tukwila-sumner"
      ],
      "byes": [
        "FW"
      ],
      "type": "regular",
      "title": "Regular Season Matchday 5",
      "notes": ""
    },
    {
      "date": "2025-05-27",
      "dayOfWeek": "Tuesday",
      "formattedDate": "May 27, 2025",
      "round": 7,
      "events": [],
      "byes": [],
      "type": "league_bye",
      "title": "Memorial Day Holiday Break (League-wide Bye)",
      "notes": "No games scheduled - Holiday observance."
    },
    {
      "date": "2025-05-29",
      "dayOfWeek": "Thursday",
      "formattedDate": "May 29, 2025",
      "round": 8,
      "events": [
        "m-2025-05-29-mvm-fw",
        "m-2025-05-29-seattle-sumner"
      ],
      "byes": [
        "Tukwila"
      ],
      "type": "regular",
      "title": "Regular Season Matchday 7",
      "notes": ""
    },
    {
      "date": "2025-06-03",
      "dayOfWeek": "Tuesday",
      "formattedDate": "June 03, 2025",
      "round": 9,
      "events": [
        "m-2025-06-03-sumner-mvm",
        "m-2025-06-03-tukwila-fw"
      ],
      "byes": [
        "Seattle"
      ],
      "type": "regular",
      "title": "Regular Season Matchday 8",
      "notes": ""
    },
    {
      "date": "2025-06-05",
      "dayOfWeek": "Thursday",
      "formattedDate": "June 05, 2025",
      "round": 10,
      "events": [
        "m-2025-06-05-mvm-seattle",
        "m-2025-06-05-sumner-tukwila"
      ],
      "byes": [
        "FW"
      ],
      "type": "regular",
      "title": "Regular Season Matchday 9",
      "notes": ""
    },
    {
      "date": "2025-06-10",
      "dayOfWeek": "Tuesday",
      "formattedDate": "June 10, 2025",
      "round": 11,
      "events": [
        "m-2025-06-10-seattle-tukwila",
        "m-2025-06-10-sumner-fw"
      ],
      "byes": [
        "MVM"
      ],
      "type": "regular",
      "title": "Regular Season Matchday 10",
      "notes": ""
    },
    {
      "date": "2025-06-12",
      "dayOfWeek": "Thursday",
      "formattedDate": "June 12, 2025",
      "round": 12,
      "events": [
        "m-2025-06-12-fw-seattle",
        "m-2025-06-12-mvm-tukwila"
      ],
      "byes": [
        "Sumner"
      ],
      "type": "regular",
      "title": "Regular Season Matchday 11",
      "notes": ""
    },
    {
      "date": "2025-06-17",
      "dayOfWeek": "Tuesday",
      "formattedDate": "June 17, 2025",
      "round": 13,
      "events": [
        "m-2025-06-17-fw-mvm",
        "m-2025-06-17-seattle-sumner"
      ],
      "byes": [
        "Tukwila"
      ],
      "type": "regular",
      "title": "Regular Season Matchday 12",
      "notes": ""
    },
    {
      "date": "2025-06-19",
      "dayOfWeek": "Thursday",
      "formattedDate": "June 19, 2025",
      "round": 14,
      "events": [
        "m-2025-06-19-fw-tukwila",
        "m-2025-06-19-mvm-sumner"
      ],
      "byes": [
        "Seattle"
      ],
      "type": "regular",
      "title": "Regular Season Matchday 13",
      "notes": ""
    },
    {
      "date": "2025-06-24",
      "dayOfWeek": "Tuesday",
      "formattedDate": "June 24, 2025",
      "round": 15,
      "events": [
        "m-2025-06-24-sumner-fw",
        "m-2025-06-24-tukwila-seattle"
      ],
      "byes": [
        "MVM"
      ],
      "type": "regular",
      "title": "Regular Season Matchday 14",
      "notes": ""
    },
    {
      "date": "2025-06-26",
      "dayOfWeek": "Thursday",
      "formattedDate": "June 26, 2025",
      "round": 16,
      "events": [
        "m-2025-06-26-seattle-mvm",
        "m-2025-06-26-tukwila-sumner"
      ],
      "byes": [
        "FW"
      ],
      "type": "regular",
      "title": "Regular Season Matchday 15",
      "notes": ""
    },
    {
      "date": "2025-07-01",
      "dayOfWeek": "Tuesday",
      "formattedDate": "July 01, 2025",
      "round": 17,
      "events": [
        "m-2025-07-01-fw-seattle",
        "m-2025-07-01-tukwila-mvm"
      ],
      "byes": [
        "Sumner"
      ],
      "type": "regular",
      "title": "Regular Season Matchday 16",
      "notes": ""
    },
    {
      "date": "2025-07-03",
      "dayOfWeek": "Thursday",
      "formattedDate": "July 03, 2025",
      "round": 18,
      "events": [
        "m-2025-07-03-mvm-sumner",
        "m-2025-07-03-tukwila-fw"
      ],
      "byes": [
        "Seattle"
      ],
      "type": "regular",
      "title": "Regular Season Matchday 17",
      "notes": ""
    },
    {
      "date": "2025-07-08",
      "dayOfWeek": "Tuesday",
      "formattedDate": "July 08, 2025",
      "round": 19,
      "events": [
        "m-2025-07-08-fw-sumner",
        "m-2025-07-08-seattle-tukwila"
      ],
      "byes": [
        "MVM"
      ],
      "type": "regular",
      "title": "Regular Season Matchday 18",
      "notes": ""
    },
    {
      "date": "2025-07-10",
      "dayOfWeek": "Thursday",
      "formattedDate": "July 10, 2025",
      "round": 20,
      "events": [
        "m-2025-07-10-mvm-tukwila",
        "m-2025-07-10-seattle-fw"
      ],
      "byes": [
        "Sumner"
      ],
      "type": "regular",
      "title": "Regular Season Matchday 19",
      "notes": ""
    },
    {
      "date": "2025-07-15",
      "dayOfWeek": "Tuesday",
      "formattedDate": "July 15, 2025",
      "round": 21,
      "events": [
        "m-2025-07-15-fw-mvm",
        "m-2025-07-15-sumner-seattle"
      ],
      "byes": [
        "Tukwila"
      ],
      "type": "regular",
      "title": "Regular Season Matchday 20",
      "notes": ""
    },
    {
      "date": "2025-07-17",
      "dayOfWeek": "Thursday",
      "formattedDate": "July 17, 2025",
      "round": 22,
      "events": [
        "m-2025-07-17-mvm-seattle",
        "m-2025-07-17-sumner-tukwila"
      ],
      "byes": [
        "FW"
      ],
      "type": "regular",
      "title": "Regular Season Matchday 21",
      "notes": ""
    },
    {
      "date": "2025-07-22",
      "dayOfWeek": "Tuesday",
      "formattedDate": "July 22, 2025",
      "round": 23,
      "events": [],
      "byes": [],
      "type": "jamboree",
      "title": "PSSSA Mid-Summer Jamboree (Day 1)",
      "notes": "League-wide tournament celebration games."
    },
    {
      "date": "2025-07-24",
      "dayOfWeek": "Thursday",
      "formattedDate": "July 24, 2025",
      "round": 24,
      "events": [],
      "byes": [],
      "type": "jamboree",
      "title": "PSSSA Mid-Summer Jamboree (Day 2)",
      "notes": "League-wide tournament celebration games."
    }
  ],
  "matches": [
    {
      "id": "m-2025-05-08-fw-tukwila",
      "matchNumber": 1,
      "date": "2025-05-08",
      "dayOfWeek": "Thursday",
      "formattedDate": "May 08, 2025",
      "time": "6:15 PM",
      "homeTeam": "FW",
      "awayTeam": "Tukwila",
      "locationId": "celebration",
      "locationName": "Celebration Park (Federal Way)",
      "locationNote": "",
      "homeScore": null,
      "awayScore": null,
      "status": "scheduled",
      "round": 2
    },
    {
      "id": "m-2025-05-08-sumner-mvm",
      "matchNumber": 2,
      "date": "2025-05-08",
      "dayOfWeek": "Thursday",
      "formattedDate": "May 08, 2025",
      "time": "6:15 PM",
      "homeTeam": "Sumner",
      "awayTeam": "MVM",
      "locationId": "sumner_field",
      "locationName": "Sumner Ballfields (Sumner)",
      "locationNote": "",
      "homeScore": null,
      "awayScore": null,
      "status": "scheduled",
      "round": 2
    },
    {
      "id": "m-2025-05-13-fw-sumner",
      "matchNumber": 3,
      "date": "2025-05-13",
      "dayOfWeek": "Tuesday",
      "formattedDate": "May 13, 2025",
      "time": "6:15 PM",
      "homeTeam": "FW",
      "awayTeam": "Sumner",
      "locationId": "celebration",
      "locationName": "Celebration Park (Federal Way)",
      "locationNote": "",
      "homeScore": null,
      "awayScore": null,
      "status": "scheduled",
      "round": 3
    },
    {
      "id": "m-2025-05-13-tukwila-seattle",
      "matchNumber": 4,
      "date": "2025-05-13",
      "dayOfWeek": "Tuesday",
      "formattedDate": "May 13, 2025",
      "time": "6:15 PM",
      "homeTeam": "Tukwila",
      "awayTeam": "Seattle",
      "locationId": "celebration",
      "locationName": "Celebration Park (Federal Way)",
      "locationNote": "Tukwila home game played at Celebration Park per league schedule.",
      "homeScore": null,
      "awayScore": null,
      "status": "scheduled",
      "round": 3
    },
    {
      "id": "m-2025-05-15-mvm-fw",
      "matchNumber": 5,
      "date": "2025-05-15",
      "dayOfWeek": "Thursday",
      "formattedDate": "May 15, 2025",
      "time": "6:15 PM",
      "homeTeam": "MVM",
      "awayTeam": "FW",
      "locationId": "ravensdale",
      "locationName": "Ravensdale Park (Maple Valley)",
      "locationNote": "",
      "homeScore": null,
      "awayScore": null,
      "status": "scheduled",
      "round": 4
    },
    {
      "id": "m-2025-05-15-sumner-seattle",
      "matchNumber": 6,
      "date": "2025-05-15",
      "dayOfWeek": "Thursday",
      "formattedDate": "May 15, 2025",
      "time": "6:15 PM",
      "homeTeam": "Sumner",
      "awayTeam": "Seattle",
      "locationId": "sumner_field",
      "locationName": "Sumner Ballfields (Sumner)",
      "locationNote": "",
      "homeScore": null,
      "awayScore": null,
      "status": "scheduled",
      "round": 4
    },
    {
      "id": "m-2025-05-20-seattle-fw",
      "matchNumber": 7,
      "date": "2025-05-20",
      "dayOfWeek": "Tuesday",
      "formattedDate": "May 20, 2025",
      "time": "6:15 PM",
      "homeTeam": "Seattle",
      "awayTeam": "FW",
      "locationId": "lower_woodland",
      "locationName": "Lower Woodland Park (Seattle)",
      "locationNote": "",
      "homeScore": null,
      "awayScore": null,
      "status": "scheduled",
      "round": 5
    },
    {
      "id": "m-2025-05-20-tukwila-mvm",
      "matchNumber": 8,
      "date": "2025-05-20",
      "dayOfWeek": "Tuesday",
      "formattedDate": "May 20, 2025",
      "time": "6:15 PM",
      "homeTeam": "Tukwila",
      "awayTeam": "MVM",
      "locationId": "celebration",
      "locationName": "Celebration Park (Federal Way)",
      "locationNote": "Tukwila home game played at Celebration Park per league schedule.",
      "homeScore": null,
      "awayScore": null,
      "status": "scheduled",
      "round": 5
    },
    {
      "id": "m-2025-05-22-seattle-mvm",
      "matchNumber": 9,
      "date": "2025-05-22",
      "dayOfWeek": "Thursday",
      "formattedDate": "May 22, 2025",
      "time": "6:15 PM",
      "homeTeam": "Seattle",
      "awayTeam": "MVM",
      "locationId": "lower_woodland",
      "locationName": "Lower Woodland Park (Seattle)",
      "locationNote": "",
      "homeScore": null,
      "awayScore": null,
      "status": "scheduled",
      "round": 6
    },
    {
      "id": "m-2025-05-22-tukwila-sumner",
      "matchNumber": 10,
      "date": "2025-05-22",
      "dayOfWeek": "Thursday",
      "formattedDate": "May 22, 2025",
      "time": "6:15 PM",
      "homeTeam": "Tukwila",
      "awayTeam": "Sumner",
      "locationId": "celebration",
      "locationName": "Celebration Park (Federal Way)",
      "locationNote": "Tukwila home game played at Celebration Park per league schedule.",
      "homeScore": null,
      "awayScore": null,
      "status": "scheduled",
      "round": 6
    },
    {
      "id": "m-2025-05-29-mvm-fw",
      "matchNumber": 11,
      "date": "2025-05-29",
      "dayOfWeek": "Thursday",
      "formattedDate": "May 29, 2025",
      "time": "6:15 PM",
      "homeTeam": "MVM",
      "awayTeam": "FW",
      "locationId": "ravensdale",
      "locationName": "Ravensdale Park (Maple Valley)",
      "locationNote": "",
      "homeScore": null,
      "awayScore": null,
      "status": "scheduled",
      "round": 8
    },
    {
      "id": "m-2025-05-29-seattle-sumner",
      "matchNumber": 12,
      "date": "2025-05-29",
      "dayOfWeek": "Thursday",
      "formattedDate": "May 29, 2025",
      "time": "6:15 PM",
      "homeTeam": "Seattle",
      "awayTeam": "Sumner",
      "locationId": "lower_woodland",
      "locationName": "Lower Woodland Park (Seattle)",
      "locationNote": "",
      "homeScore": null,
      "awayScore": null,
      "status": "scheduled",
      "round": 8
    },
    {
      "id": "m-2025-06-03-sumner-mvm",
      "matchNumber": 13,
      "date": "2025-06-03",
      "dayOfWeek": "Tuesday",
      "formattedDate": "June 03, 2025",
      "time": "6:15 PM",
      "homeTeam": "Sumner",
      "awayTeam": "MVM",
      "locationId": "sumner_field",
      "locationName": "Sumner Ballfields (Sumner)",
      "locationNote": "",
      "homeScore": null,
      "awayScore": null,
      "status": "scheduled",
      "round": 9
    },
    {
      "id": "m-2025-06-03-tukwila-fw",
      "matchNumber": 14,
      "date": "2025-06-03",
      "dayOfWeek": "Tuesday",
      "formattedDate": "June 03, 2025",
      "time": "6:15 PM",
      "homeTeam": "Tukwila",
      "awayTeam": "FW",
      "locationId": "celebration",
      "locationName": "Celebration Park (Federal Way)",
      "locationNote": "Tukwila home game played at Celebration Park per league schedule.",
      "homeScore": null,
      "awayScore": null,
      "status": "scheduled",
      "round": 9
    },
    {
      "id": "m-2025-06-05-mvm-seattle",
      "matchNumber": 15,
      "date": "2025-06-05",
      "dayOfWeek": "Thursday",
      "formattedDate": "June 05, 2025",
      "time": "6:15 PM",
      "homeTeam": "MVM",
      "awayTeam": "Seattle",
      "locationId": "ravensdale",
      "locationName": "Ravensdale Park (Maple Valley)",
      "locationNote": "",
      "homeScore": null,
      "awayScore": null,
      "status": "scheduled",
      "round": 10
    },
    {
      "id": "m-2025-06-05-sumner-tukwila",
      "matchNumber": 16,
      "date": "2025-06-05",
      "dayOfWeek": "Thursday",
      "formattedDate": "June 05, 2025",
      "time": "6:15 PM",
      "homeTeam": "Sumner",
      "awayTeam": "Tukwila",
      "locationId": "sumner_field",
      "locationName": "Sumner Ballfields (Sumner)",
      "locationNote": "",
      "homeScore": null,
      "awayScore": null,
      "status": "scheduled",
      "round": 10
    },
    {
      "id": "m-2025-06-10-seattle-tukwila",
      "matchNumber": 17,
      "date": "2025-06-10",
      "dayOfWeek": "Tuesday",
      "formattedDate": "June 10, 2025",
      "time": "6:15 PM",
      "homeTeam": "Seattle",
      "awayTeam": "Tukwila",
      "locationId": "lower_woodland",
      "locationName": "Lower Woodland Park (Seattle)",
      "locationNote": "",
      "homeScore": null,
      "awayScore": null,
      "status": "scheduled",
      "round": 11
    },
    {
      "id": "m-2025-06-10-sumner-fw",
      "matchNumber": 18,
      "date": "2025-06-10",
      "dayOfWeek": "Tuesday",
      "formattedDate": "June 10, 2025",
      "time": "6:15 PM",
      "homeTeam": "Sumner",
      "awayTeam": "FW",
      "locationId": "sumner_field",
      "locationName": "Sumner Ballfields (Sumner)",
      "locationNote": "",
      "homeScore": null,
      "awayScore": null,
      "status": "scheduled",
      "round": 11
    },
    {
      "id": "m-2025-06-12-fw-seattle",
      "matchNumber": 19,
      "date": "2025-06-12",
      "dayOfWeek": "Thursday",
      "formattedDate": "June 12, 2025",
      "time": "6:15 PM",
      "homeTeam": "FW",
      "awayTeam": "Seattle",
      "locationId": "celebration",
      "locationName": "Celebration Park (Federal Way)",
      "locationNote": "",
      "homeScore": null,
      "awayScore": null,
      "status": "scheduled",
      "round": 12
    },
    {
      "id": "m-2025-06-12-mvm-tukwila",
      "matchNumber": 20,
      "date": "2025-06-12",
      "dayOfWeek": "Thursday",
      "formattedDate": "June 12, 2025",
      "time": "6:15 PM",
      "homeTeam": "MVM",
      "awayTeam": "Tukwila",
      "locationId": "ravensdale",
      "locationName": "Ravensdale Park (Maple Valley)",
      "locationNote": "",
      "homeScore": null,
      "awayScore": null,
      "status": "scheduled",
      "round": 12
    },
    {
      "id": "m-2025-06-17-fw-mvm",
      "matchNumber": 21,
      "date": "2025-06-17",
      "dayOfWeek": "Tuesday",
      "formattedDate": "June 17, 2025",
      "time": "6:15 PM",
      "homeTeam": "FW",
      "awayTeam": "MVM",
      "locationId": "celebration",
      "locationName": "Celebration Park (Federal Way)",
      "locationNote": "",
      "homeScore": null,
      "awayScore": null,
      "status": "scheduled",
      "round": 13
    },
    {
      "id": "m-2025-06-17-seattle-sumner",
      "matchNumber": 22,
      "date": "2025-06-17",
      "dayOfWeek": "Tuesday",
      "formattedDate": "June 17, 2025",
      "time": "6:15 PM",
      "homeTeam": "Seattle",
      "awayTeam": "Sumner",
      "locationId": "lower_woodland",
      "locationName": "Lower Woodland Park (Seattle)",
      "locationNote": "",
      "homeScore": null,
      "awayScore": null,
      "status": "scheduled",
      "round": 13
    },
    {
      "id": "m-2025-06-19-fw-tukwila",
      "matchNumber": 23,
      "date": "2025-06-19",
      "dayOfWeek": "Thursday",
      "formattedDate": "June 19, 2025",
      "time": "6:15 PM",
      "homeTeam": "FW",
      "awayTeam": "Tukwila",
      "locationId": "celebration",
      "locationName": "Celebration Park (Federal Way)",
      "locationNote": "",
      "homeScore": null,
      "awayScore": null,
      "status": "scheduled",
      "round": 14
    },
    {
      "id": "m-2025-06-19-mvm-sumner",
      "matchNumber": 24,
      "date": "2025-06-19",
      "dayOfWeek": "Thursday",
      "formattedDate": "June 19, 2025",
      "time": "6:15 PM",
      "homeTeam": "MVM",
      "awayTeam": "Sumner",
      "locationId": "ravensdale",
      "locationName": "Ravensdale Park (Maple Valley)",
      "locationNote": "",
      "homeScore": null,
      "awayScore": null,
      "status": "scheduled",
      "round": 14
    },
    {
      "id": "m-2025-06-24-sumner-fw",
      "matchNumber": 25,
      "date": "2025-06-24",
      "dayOfWeek": "Tuesday",
      "formattedDate": "June 24, 2025",
      "time": "6:15 PM",
      "homeTeam": "Sumner",
      "awayTeam": "FW",
      "locationId": "sumner_field",
      "locationName": "Sumner Ballfields (Sumner)",
      "locationNote": "",
      "homeScore": null,
      "awayScore": null,
      "status": "scheduled",
      "round": 15
    },
    {
      "id": "m-2025-06-24-tukwila-seattle",
      "matchNumber": 26,
      "date": "2025-06-24",
      "dayOfWeek": "Tuesday",
      "formattedDate": "June 24, 2025",
      "time": "6:15 PM",
      "homeTeam": "Tukwila",
      "awayTeam": "Seattle",
      "locationId": "celebration",
      "locationName": "Celebration Park (Federal Way)",
      "locationNote": "Tukwila home game played at Celebration Park per league schedule.",
      "homeScore": null,
      "awayScore": null,
      "status": "scheduled",
      "round": 15
    },
    {
      "id": "m-2025-06-26-seattle-mvm",
      "matchNumber": 27,
      "date": "2025-06-26",
      "dayOfWeek": "Thursday",
      "formattedDate": "June 26, 2025",
      "time": "6:15 PM",
      "homeTeam": "Seattle",
      "awayTeam": "MVM",
      "locationId": "lower_woodland",
      "locationName": "Lower Woodland Park (Seattle)",
      "locationNote": "",
      "homeScore": null,
      "awayScore": null,
      "status": "scheduled",
      "round": 16
    },
    {
      "id": "m-2025-06-26-tukwila-sumner",
      "matchNumber": 28,
      "date": "2025-06-26",
      "dayOfWeek": "Thursday",
      "formattedDate": "June 26, 2025",
      "time": "6:15 PM",
      "homeTeam": "Tukwila",
      "awayTeam": "Sumner",
      "locationId": "celebration",
      "locationName": "Celebration Park (Federal Way)",
      "locationNote": "Tukwila home game played at Celebration Park per league schedule.",
      "homeScore": null,
      "awayScore": null,
      "status": "scheduled",
      "round": 16
    },
    {
      "id": "m-2025-07-01-fw-seattle",
      "matchNumber": 29,
      "date": "2025-07-01",
      "dayOfWeek": "Tuesday",
      "formattedDate": "July 01, 2025",
      "time": "6:15 PM",
      "homeTeam": "FW",
      "awayTeam": "Seattle",
      "locationId": "celebration",
      "locationName": "Celebration Park (Federal Way)",
      "locationNote": "",
      "homeScore": null,
      "awayScore": null,
      "status": "scheduled",
      "round": 17
    },
    {
      "id": "m-2025-07-01-tukwila-mvm",
      "matchNumber": 30,
      "date": "2025-07-01",
      "dayOfWeek": "Tuesday",
      "formattedDate": "July 01, 2025",
      "time": "6:15 PM",
      "homeTeam": "Tukwila",
      "awayTeam": "MVM",
      "locationId": "celebration",
      "locationName": "Celebration Park (Federal Way)",
      "locationNote": "Tukwila home game played at Celebration Park per league schedule.",
      "homeScore": null,
      "awayScore": null,
      "status": "scheduled",
      "round": 17
    },
    {
      "id": "m-2025-07-03-mvm-sumner",
      "matchNumber": 31,
      "date": "2025-07-03",
      "dayOfWeek": "Thursday",
      "formattedDate": "July 03, 2025",
      "time": "6:15 PM",
      "homeTeam": "MVM",
      "awayTeam": "Sumner",
      "locationId": "ravensdale",
      "locationName": "Ravensdale Park (Maple Valley)",
      "locationNote": "",
      "homeScore": null,
      "awayScore": null,
      "status": "scheduled",
      "round": 18
    },
    {
      "id": "m-2025-07-03-tukwila-fw",
      "matchNumber": 32,
      "date": "2025-07-03",
      "dayOfWeek": "Thursday",
      "formattedDate": "July 03, 2025",
      "time": "6:15 PM",
      "homeTeam": "Tukwila",
      "awayTeam": "FW",
      "locationId": "celebration",
      "locationName": "Celebration Park (Federal Way)",
      "locationNote": "Tukwila home game played at Celebration Park per league schedule.",
      "homeScore": null,
      "awayScore": null,
      "status": "scheduled",
      "round": 18
    },
    {
      "id": "m-2025-07-08-fw-sumner",
      "matchNumber": 33,
      "date": "2025-07-08",
      "dayOfWeek": "Tuesday",
      "formattedDate": "July 08, 2025",
      "time": "6:15 PM",
      "homeTeam": "FW",
      "awayTeam": "Sumner",
      "locationId": "celebration",
      "locationName": "Celebration Park (Federal Way)",
      "locationNote": "",
      "homeScore": null,
      "awayScore": null,
      "status": "scheduled",
      "round": 19
    },
    {
      "id": "m-2025-07-08-seattle-tukwila",
      "matchNumber": 34,
      "date": "2025-07-08",
      "dayOfWeek": "Tuesday",
      "formattedDate": "July 08, 2025",
      "time": "6:15 PM",
      "homeTeam": "Seattle",
      "awayTeam": "Tukwila",
      "locationId": "lower_woodland",
      "locationName": "Lower Woodland Park (Seattle)",
      "locationNote": "",
      "homeScore": null,
      "awayScore": null,
      "status": "scheduled",
      "round": 19
    },
    {
      "id": "m-2025-07-10-mvm-tukwila",
      "matchNumber": 35,
      "date": "2025-07-10",
      "dayOfWeek": "Thursday",
      "formattedDate": "July 10, 2025",
      "time": "6:15 PM",
      "homeTeam": "MVM",
      "awayTeam": "Tukwila",
      "locationId": "ravensdale",
      "locationName": "Ravensdale Park (Maple Valley)",
      "locationNote": "",
      "homeScore": null,
      "awayScore": null,
      "status": "scheduled",
      "round": 20
    },
    {
      "id": "m-2025-07-10-seattle-fw",
      "matchNumber": 36,
      "date": "2025-07-10",
      "dayOfWeek": "Thursday",
      "formattedDate": "July 10, 2025",
      "time": "6:15 PM",
      "homeTeam": "Seattle",
      "awayTeam": "FW",
      "locationId": "lower_woodland",
      "locationName": "Lower Woodland Park (Seattle)",
      "locationNote": "",
      "homeScore": null,
      "awayScore": null,
      "status": "scheduled",
      "round": 20
    },
    {
      "id": "m-2025-07-15-fw-mvm",
      "matchNumber": 37,
      "date": "2025-07-15",
      "dayOfWeek": "Tuesday",
      "formattedDate": "July 15, 2025",
      "time": "6:15 PM",
      "homeTeam": "FW",
      "awayTeam": "MVM",
      "locationId": "celebration",
      "locationName": "Celebration Park (Federal Way)",
      "locationNote": "",
      "homeScore": null,
      "awayScore": null,
      "status": "scheduled",
      "round": 21
    },
    {
      "id": "m-2025-07-15-sumner-seattle",
      "matchNumber": 38,
      "date": "2025-07-15",
      "dayOfWeek": "Tuesday",
      "formattedDate": "July 15, 2025",
      "time": "6:15 PM",
      "homeTeam": "Sumner",
      "awayTeam": "Seattle",
      "locationId": "sumner_field",
      "locationName": "Sumner Ballfields (Sumner)",
      "locationNote": "",
      "homeScore": null,
      "awayScore": null,
      "status": "scheduled",
      "round": 21
    },
    {
      "id": "m-2025-07-17-mvm-seattle",
      "matchNumber": 39,
      "date": "2025-07-17",
      "dayOfWeek": "Thursday",
      "formattedDate": "July 17, 2025",
      "time": "6:15 PM",
      "homeTeam": "MVM",
      "awayTeam": "Seattle",
      "locationId": "ravensdale",
      "locationName": "Ravensdale Park (Maple Valley)",
      "locationNote": "",
      "homeScore": null,
      "awayScore": null,
      "status": "scheduled",
      "round": 22
    },
    {
      "id": "m-2025-07-17-sumner-tukwila",
      "matchNumber": 40,
      "date": "2025-07-17",
      "dayOfWeek": "Thursday",
      "formattedDate": "July 17, 2025",
      "time": "6:15 PM",
      "homeTeam": "Sumner",
      "awayTeam": "Tukwila",
      "locationId": "sumner_field",
      "locationName": "Sumner Ballfields (Sumner)",
      "locationNote": "",
      "homeScore": null,
      "awayScore": null,
      "status": "scheduled",
      "round": 22
    }
  ],
  "totalMatches": 40
},
  rules: {
  "leagueName": "Puget Sound Senior Softball Association (PSSSA)",
  "established": "Co-Ed Senior Softball",
  "eligibility": {
    "ageRequirement": "Open to senior players (Men 50+ / Women 45+ or general senior co-ed guidelines)",
    "coedBalance": "Equal participation and sportsmanship encouraged across all skill levels"
  },
  "safetyRules": [
    {
      "title": "Commitment Line & Scoring Plate",
      "description": "A commitment line is drawn 30 feet from home plate on the 3rd base line. Once a runner touches or crosses this line, they must continue toward the scoring plate. Runners do NOT touch the strike mat/home plate to prevent collisions with the catcher."
    },
    {
      "title": "Safety Double First Base",
      "description": "First base consists of a double base (white inside, orange outside). Batters running through first base must touch the outside orange base, avoiding collision with the defensive player on the white base."
    },
    {
      "title": "No Sliding Requirement",
      "description": "Sliding into home plate is strictly prohibited for player safety. Runners score by crossing the separate scoring line/plate."
    },
    {
      "title": "Senior Softball Approved Bats",
      "description": "Only approved SSUSA (Senior Softball-USA) / USA Softball stamped bats adhering to league compression and safety standards are permitted."
    }
  ],
  "gameRules": [
    {
      "category": "Game Duration",
      "rules": [
        "Games are scheduled for 7 innings or a 65-minute time limit (no new inning starts after 60 minutes).",
        "In case of tie games at the end of time/innings, one extra inning utilizing international tie-breaker rules may be played if daylight and field scheduling permit."
      ]
    },
    {
      "category": "Batting & Pitching",
      "rules": [
        "Pitching arc must be between 6 and 12 feet from the release point.",
        "Pitchers are protected with an optional/recommended protective screen.",
        "Count starts at 1 ball, 1 strike with one courtesy foul ball allowed after reaching 2 strikes.",
        "Maximum 5 runs per inning limit for innings 1-6, open inning in the 7th."
      ]
    },
    {
      "category": "Co-Ed Lineup & Field Placement",
      "rules": [
        "Teams field 10 or 11 defensive players (including rover/short fielder).",
        "Batting orders should balance co-ed participants or alternate as required by game agreements.",
        "Unlimited courtesy runners allowed per inning according to senior softball courtesy runner rules."
      ]
    },
    {
      "category": "Inclement Weather & Rainouts",
      "rules": [
        "Field status updates are communicated by 4:00 PM on game days.",
        "If rain or unplayable conditions occur after start, 4 complete innings (3.5 if home team leads) constitutes an official game.",
        "Make-up games are coordinated between team managers and league commissioners."
      ]
    }
  ],
  "faqs": [
    {
      "question": "How can I join a PSSSA team as a free agent or new player?",
      "answer": "You can submit the Free Agent / Player Interest form on this website! Our league coordinators will connect you with teams that have roster openings matching your preferences."
    },
    {
      "question": "What equipment do I need to bring?",
      "answer": "Players should bring their own glove and rubber/turf cleats (metal cleats are prohibited). Teams provide game balls, and senior-approved bats are available or player-provided."
    },
    {
      "question": "What are the home field locations for each team?",
      "answer": "Federal Way plays at Celebration Park; Maple Valley Masters plays at Ravensdale Park; Seattle plays at Lower Woodland Park; Sumner plays at Sumner Ballfields; Tukwila plays primarily at Celebration Park with special July dates at Tukwila Community Center."
    },
    {
      "question": "When are games played?",
      "answer": "Regular season games are played on Tuesday and Thursday evenings from early May through late July, starting at 6:15 PM."
    }
  ]
}
};
