import { TStopPointPairInformation } from '@app-types/stop-point';
import { TStopPointPair } from '@app-types/tfl';

const TOWARDS = 'Towards';

const getStopPointPairBySmsCode = async (
  rawSmsCode: string,
): Promise<TStopPointPairInformation> => {
  try {
    const smsCode = parseInt(rawSmsCode, 10);

    if (isNaN(smsCode)) {
      throw new Error('400');
    }

    const res = await fetch(`https://api.tfl.gov.uk/StopPoint/Sms/${smsCode}`, {
      headers: {
        Authorization: process.env.TFL_API_KEY || '',
        'Content-Type': 'application/json',
      },
    });
    const resJson: TStopPointPair = await res.json();
    const { children, commonName, httpStatusCode, id } = resJson;

    if (httpStatusCode && httpStatusCode >= 400) {
      throw new Error('400');
    }

    return {
      statusCode: 200,
      commonName,
      id,
      stops: children.map(
        ({ additionalProperties, commonName, id, lines, stopLetter }) => ({
          commonName,
          id,
          lines: lines.map(({ name }) => name),
          stopLetter,
          towards: additionalProperties.find(({ key }) => key === TOWARDS)
            ?.value,
        }),
      ),
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

export default getStopPointPairBySmsCode;
