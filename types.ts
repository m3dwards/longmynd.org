export interface site {
  name: string;
  date: Date;
  mainImage: string;
  poiImage: string;
  status: string;
  sensitive: string;
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
