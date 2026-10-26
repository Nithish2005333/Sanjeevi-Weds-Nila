export interface CelebrationEvent {
  id: "wedding" | "reception";
  heading: string;
  date: string;
  venue: string;
  address: string;
  directionsLabel: string;
  welcomeMessage: string;
  mapQuery: string;
  accentColor: string;
  hoverColor: string;
}

export const WEDDING_EVENT: CelebrationEvent = {
  id: "wedding",
  heading: "WEDDING",
  date: "Friday, 20 November 2026",
  venue: "Arulmigu Sri Varadharaja Perumal Temple",
  address: "Sengal Malai, Karur, Punjai Thottakurichi, Tamil Nadu 639113",
  directionsLabel: "Get Direction",
  welcomeMessage: "Your presence and blessings will make our special day complete.",
  mapQuery: "Arulmigu Sri Varadharaja Perumal Temple, Sengal Malai, Punjai Thottakurichi, Karur, Tamil Nadu 639113",
  accentColor: "#B75231",
  hoverColor: "#9E4225",
};

export const RECEPTION_EVENT: CelebrationEvent = {
  id: "reception",
  heading: "RECEPTION",
  date: "Sunday, 22 November 2026",
  venue: "Malaiamman Marriage Hall",
  address: "Pugalur Main Road, Punjai Thottakurichi, Thalavapalayam, Karur, Tamil Nadu 639113",
  directionsLabel: "Get Direction",
  welcomeMessage: "Your presence means everything. Celebrate this beautiful beginning with us.",
  mapQuery: "Malaiamman Marriage Hall, Pugalur Main Road, Punjai Thottakurichi, Thalavapalayam, Karur, Tamil Nadu 639113",
  accentColor: "#49633D",
  hoverColor: "#394F30",
};

export const buildDirectionsUrl = (query: string): string => {
  const url = new URL("https://www.google.com/maps/dir/");
  url.searchParams.set("api", "1");
  url.searchParams.set("destination", query);
  return url.toString();
};

export const buildEmbedMapUrl = (apiKey: string, query: string): string => {
  const url = new URL("https://www.google.com/maps/embed/v1/place");
  url.searchParams.set("key", apiKey);
  url.searchParams.set("q", query);
  url.searchParams.set("zoom", "15");
  return url.toString();
};
