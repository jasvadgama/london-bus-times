export type TAdditionalProperty = {
  key: string;
  value: string;
};

export type TLine = {
  name: string;
};

export type TLineGroup = {
  lineIdentifier: string[];
  naptanIdReference: string;
};

export type TPredictionRaw = {
  destinationName: string;
  expectedArrival: string;
  lineId: string;
  lineName: string;
  towards: string;
  vehicleId: string;
};

export type TStopPointPairChild = {
  additionalProperties: TAdditionalProperty[];
  commonName: string;
  id: string;
  lines: TLine[];
  stopLetter: string;
};

export type TStopPointPair = {
  children: TStopPointPairChild[];
  commonName: string;
  httpStatusCode?: number;
  id: string;
  lineGroup: TLineGroup[];
  smsCode: string;
};
