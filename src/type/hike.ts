export type Geometry = {
  type: string;
  coordinates: [number, number][];
};

export type Property = {
  description: string;
  distance: string;
  from: string;
  name: string;
  operator: string;
  'osmc-symbol': string;
  symbol: string;
  to: string;
  website: string;
};

export type Hike = {
  _id: string;
  geometry: Geometry;
  hike_id: string;
  properties: Property;
  type: string;
  bbox: [number, number, number, number];
  stars: number;
  starIndexes: number;
}
