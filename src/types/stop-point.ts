import { Duration } from 'date-fns';

import { TErrorResponse } from './errors';
import { TLine } from './tfl';

export type TStopPoint = TErrorResponse & {
  id?: string;
  lines?: TLine[];
  name?: string;
  smsCode?: string;
  stopLetter?: string;
  towards?: string;
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
  lines: TLine[];
  name: string;
  stopLetter: string;
  towards?: string;
};

export type TStopPointWithPredictions = TStopPoint & {
  arrivalPredictions?: TPrediction[];
};
