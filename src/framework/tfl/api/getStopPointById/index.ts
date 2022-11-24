import { TStopPoint } from '@app-types/stop-point';
import { TStopPointPair, TStopPointPairChild } from '@app-types/tfl';

function getStopLetterFromChildren(
  children: TStopPointPairChild[],
  stopPointId: string,
): string {
  return children.find(({ id }) => id === stopPointId)?.stopLetter || '';
}

const getStopPointById = async (stopPointId: string): Promise<TStopPoint> => {
  try {
    if (!stopPointId) {
      throw new Error('400');
    }

    const res = await fetch(`https://api.tfl.gov.uk/StopPoint/${stopPointId}`, {
      headers: {
        Authorization: process.env.TFL_API_KEY || '',
        'Content-Type': 'application/json',
      },
    });
    const resJson = await res.json();
    const {
      children,
      commonName,
      httpStatusCode,
      lineGroup,
      smsCode,
    }: TStopPointPair = resJson;

    if (httpStatusCode && httpStatusCode >= 400) {
      throw new Error('400');
    }

    return {
      statusCode: 200,
      commonName,
      lineGroup,
      smsCode,
      stopLetter: getStopLetterFromChildren(children, stopPointId),
    };
  } catch (e: any) {
    console.log({ e });

    switch (true) {
      case e === '400':
        return {
          statusCode: 400,
          message: "We can't find the requested stop.",
        };
      case e === '404':
        return {
          statusCode: 404,
          message: "We can't find the requested stop.",
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

export default getStopPointById;
