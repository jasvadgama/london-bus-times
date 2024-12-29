import { Duration, intervalToDuration } from 'date-fns';

import { TPrediction, TStopPointWithPredictions } from '@app-types/stop-point';
import { TPredictionRaw } from '@app-types/tfl';
import getArrivalPredictionsForStopPoint from '@framework/tfl/api/getArrivalPredictionsForStopPoint';
import getStopPoint from '@framework/tfl/api/getStopPoint';

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

const getArrivalPredictionsByStopPointSmsCode = async (
  smsCode: string | string[] | undefined,
): Promise<TStopPointWithPredictions> => {
  try {
    if (!smsCode) {
      return {
        statusCode: 400,
        message: 'No SMS code provided',
      };
    }

    const sanitisedSmsCode: string = Array.isArray(smsCode)
      ? smsCode[0]
      : smsCode;
    const stopPoint = await getStopPoint(sanitisedSmsCode);

    if (stopPoint.statusCode >= 400) {
      throw new Error('404');
    }

    const stopPointPredictions = await getArrivalPredictionsForStopPoint(
      stopPoint.id || '',
      stopPoint.lines?.map(({ name }) => name) || [],
    );
    const arrivalPredictions = formatPredictions(stopPointPredictions);

    return {
      ...stopPoint,
      arrivalPredictions,
    };
  } catch (e: unknown) {
    console.log({ e });

    switch (true) {
      case e === '400':
        return {
          statusCode: 400,
          message:
            'The SMS code is invalid. Please check the code and try again.',
        };
      case e === '404':
        return {
          statusCode: 404,
          message:
            "The stop for the provided SMS code can't be found. Please check the code and try again.",
        };
      default:
        return {
          statusCode: 500,
          message:
            'There was a problem with the request. Please try again later.',
        };
    }
  }
};

export default getArrivalPredictionsByStopPointSmsCode;
