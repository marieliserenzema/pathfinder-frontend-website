export type LatLng = {
  latitude: number;
  longitude: number;
};

export type Alert = {
  _id: string;
  userId: string;
  description: string;
  hikeId: string;
  coordinate: LatLng;
  photo: string;
}
