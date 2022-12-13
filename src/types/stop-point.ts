import { Duration } from 'date-fns';

import { TLineGroup } from './tfl';

export type TStopPoint = {
  statusCode: number;
  commonName?: string;
  id?: string;
  lineGroup?: TLineGroup[];
  message?: string;
  smsCode?: string;
  stopLetter?: string;
};

export type TPrediction = {
  destinationName: string;
  expectedArrival: Duration;
  lineId: string;
  lineName: string;
  towards: string;
  vehicleId: string;
};

export type TStopData = {
  id: string;
  lines: string[];
  stopLetter: string;
  towards?: string;
};

export type TStopPointPairInformation = TStopPoint & {
  stops?: TStopData[];
};

export type TStopPointWithPredictions = TStopPoint & {
  arrivalPredictions: TPrediction[];
};
