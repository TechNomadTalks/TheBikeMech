export interface BikeEvent {
  id: string;
  name: string;
  date: string;
  endDate?: string;
  location: string;
  type: "race" | "ride" | "event";
  description: string;
  website: string;
  entryFee?: string;
  prizeMoney?: string;
  distance?: string;
  categories?: string;
}

export const events: BikeEvent[] = [
  {
    id: "sani2c-2026",
    name: "Sani2c",
    date: "2026-05-08",
    endDate: "2026-05-10",
    location: "Drakensberg to Coast",
    type: "race",
    description: "The ultimate 3-day mountain bike stage race from the Drakensberg to the South Coast sea.",
    website: "https://sani2c.co.za",
    entryFee: "R2,200 - R2,800",
    distance: "270km",
    categories: "Solo, Duo, Team of 3",
  },
  {
    id: "go2berg-2026",
    name: "Go2Berg",
    date: "2026-02-27",
    endDate: "2026-03-01",
    location: "Drakensberg",
    type: "race",
    description: "3-day mountain bike stage race in the Drakensberg mountains.",
    website: "https://go2berg.co.za",
    entryFee: "R1,800 - R2,200",
    distance: "180km",
    categories: "Solo, Duo",
  },
  {
    id: "berg-n-bush-2026",
    name: "Berg n Bush",
    date: "2026-10-08",
    endDate: "2026-10-11",
    location: "Drakensberg",
    type: "race",
    description: "4-day mountain bike adventure through the Drakensberg.",
    website: "https://bergnebush.co.za",
    entryFee: "R2,400 - R3,000",
    distance: "240km",
    categories: "Solo, Duo, Team",
  },
  {
    id: "coastal-krash-2026",
    name: "Coastal Krash",
    date: "2026-03-14",
    location: "South Coast",
    type: "ride",
    description: "Annual mountain bike ride along the beautiful South Coast trails.",
    website: "https://thebikemech.co.za",
    entryFee: "R200",
    distance: "35km / 55km",
    categories: "All Levels",
  },
  {
    id: "sani-brews-2026",
    name: "Sani Brews Ride",
    date: "2026-06-20",
    location: "Sanihawk",
    type: "ride",
    description: "Social ride ending at Sanihawk brewery with craft beer tastings.",
    website: "https://thebikemech.co.za",
    entryFee: "R150",
    distance: "25km",
    categories: "Social / Beginner",
  },
  {
    id: "winter-ride-series-2026",
    name: "Winter Ride Series",
    date: "2026-06-01",
    endDate: "2026-08-31",
    location: "Various",
    type: "ride",
    description: "Weekly group rides throughout winter. All skill levels welcome.",
    website: "https://thebikemech.co.za",
    entryFee: "Free",
    distance: "20-40km",
    categories: "All Levels",
  },
  {
    id: "xcm-champs-2026",
    name: "KZN XCM Championships",
    date: "2026-07-12",
    location: "South Coast",
    type: "race",
    description: "KwaZulu-Natal Cross Country Marathon Championships.",
    website: "https://cyclingkwazulunatal.co.za",
    entryFee: "R400",
    distance: "80km",
    categories: "Elite, Age Groups",
  },
  {
    id: "summer-solstice-2026",
    name: "Summer Solstice Ride",
    date: "2026-12-21",
    location: "Umtentweni",
    type: "ride",
    description: "Celebrate the longest day of the year with an evening sunset ride.",
    website: "https://thebikemech.co.za",
    entryFee: "R100",
    distance: "15km",
    categories: "Family Friendly",
  },
];

export function getUpcomingEvents(limit: number = 4): BikeEvent[] {
  const today = new Date();
  return events
    .filter(event => new Date(event.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, limit);
}

export function getCurrentEvent(): BikeEvent | null {
  const today = new Date();
  return events.find(event => {
    const start = new Date(event.date);
    const end = event.endDate ? new Date(event.endDate) : start;
    return today >= start && today <= end;
  }) || null;
}

export function getEventStatus(event: BikeEvent): "upcoming" | "current" | "past" {
  const today = new Date();
  const start = new Date(event.date);
  const end = event.endDate ? new Date(event.endDate) : start;
  
  if (today < start) return "upcoming";
  if (today >= start && today <= end) return "current";
  return "past";
}
