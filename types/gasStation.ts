export interface ApiGasStationData {
  attributes: {
    objectid: number;
    adresse: string;
  };
  geometry: {
    x: number;
    y: number;
  };
}

export interface GasStationData {
  objectid: number;
  street: string;
  zipCode: string;
  district: string;
  x: number;
  y: number;
}
