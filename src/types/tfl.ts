export type TLine = {
  name: string;
};

export type TPredictionRaw = {
  destinationName: string;
  expectedArrival: string;
  lineId: string;
  lineName: string;
  towards: string;
  vehicleId: string;
};

export type TStopPointChild = {
  name?: string;
  id: string;
  lines?: TLine[];
  stopLetter?: string;
  towards?: string;
};

export type TStopPointSearchResults = {
  httpStatusCode?: number;
  matches: TStopPointChild[];
  name: string;
  total?: number;
};
