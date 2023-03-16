export interface site {
  name: string;
  published: boolean;
  date: Date;
  mainImage: string;
  poiImage: string;
  status: string;
  sensitive: boolean;
  fee: string;
  hgRating: string;
  pgRating: string;
  windDirection: Array<{ from: string; to: string }>;
  location: { what3words: string; latlong: string; physicalMaps: string };
  sensitivities: Array<{ sensitivity: string }>;
  accessAndParking: string;
  launchesAndLanding: string;
  flying: string;
  weatherStations: Array<{ station: string }>;
  webcams: string;
  localAttractions: string;
  siteRecords: Array<{ record: string }>;
}

export interface additionalSite {
  siteName: string;
  clubName: string;
  from: string;
  to: string;
  link: string;
}

export interface basicPage {
  id: string;
  date: Date;
  title: string;
  contentHtml: string;
}
