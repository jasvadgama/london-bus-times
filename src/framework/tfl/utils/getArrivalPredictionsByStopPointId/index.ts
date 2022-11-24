import { Duration, intervalToDuration } from 'date-fns';

import { TPrediction, TStopPointWithPredictions } from '@app-types/stop-point';
import { TLineGroup, TPredictionRaw } from '@app-types/tfl';
import getArrivalPredictionsForStopPoint from '@framework/tfl/api/getArrivalPredictionsForStopPoint';
import getStopPointById from '@framework/tfl/api/getStopPointById';

function getLineGroupById(
  lineGroups: TLineGroup[],
  stopPointId: string,
): TLineGroup {
  return (
    lineGroups.find(
      ({ naptanIdReference }) => stopPointId === naptanIdReference,
    ) || {
      naptanIdReference: stopPointId,
      lineIdentifier: [],
    }
  );
}

function formatArrivalTime(arrivalTime: string): Duration {
  const now = Date.now();
  const interval = intervalToDuration({
    start: now,
    end: new Date(arrivalTime),
  });

  return interval;
}

function formatPredictions(predictionsRaw: TPredictionRaw[]): TPrediction[] {
  const predictions = [...predictionsRaw]
    .sort((a, b) => (a.expectedArrival < b.expectedArrival ? 1 : -1))
    .reduce((acc: TPrediction[], curr: TPredictionRaw) => {
      const {
        destinationName,
        expectedArrival,
        lineId,
        lineName,
        towards,
        vehicleId,
      } = curr;

      return [
        {
          destinationName,
          expectedArrival: formatArrivalTime(expectedArrival),
          lineId,
          lineName,
          towards,
          vehicleId,
        },
        ...acc,
      ];
    }, [])
    .slice(0, 10);

  return predictions;
}

const getArrivalPredictionsByStopPointId = async (
  stopPointId: string,
): Promise<TStopPointWithPredictions> => {
  // TODO: add error handling

  const {
    commonName,
    lineGroup = [],
    smsCode,
    stopLetter,
  } = await getStopPointById(stopPointId);
  const stopPointLineGroup = getLineGroupById(lineGroup, stopPointId);
  const stopPointPredictions = await getArrivalPredictionsForStopPoint(
    stopPointId,
    stopPointLineGroup.lineIdentifier,
  );
  const arrivalPredictions = formatPredictions(stopPointPredictions);

  return {
    statusCode: 200,
    arrivalPredictions,
    commonName,
    smsCode,
    stopLetter,
  };
};

export default getArrivalPredictionsByStopPointId;
