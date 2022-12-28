import { TStopPoint } from '@app-types/stop-point';
import { TStopPointSearchResults } from '@app-types/tfl';

const cleanStopInformation = (matches: TStopPointSearchResults['matches']) => {
  return matches.map(
    ({ id, lines = [], name, stopLetter = '', towards = '' }) => ({
      id,
      lines: lines.map(({ name }) => ({ name })),
      name,
      stopLetter,
      towards,
    }),
  )?.[0];
};

const getStopPoint = async (rawSmsCode: string): Promise<TStopPoint> => {
  try {
    const smsCode = parseInt(rawSmsCode, 10);

    if (isNaN(smsCode)) {
      throw new Error('400');
    }

    const res = await fetch(
      `https://api.tfl.gov.uk/StopPoint/Search/${smsCode}?modes=bus`,
      {
        headers: {
          Authorization: process.env.TFL_API_KEY || '',
          'Content-Type': 'application/json',
        },
      },
    );
    const resJson: TStopPointSearchResults = await res.json();
    const { httpStatusCode, matches } = resJson;

    if (httpStatusCode && httpStatusCode >= 400) {
      throw new Error('400');
    }

    if (matches.length < 1) {
      throw new Error('404');
    }

    return {
      statusCode: 200,
      message: 'ok',
      ...cleanStopInformation(matches),
    };
  } catch (e: any) {
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

export default getStopPoint;
