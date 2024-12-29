const getArrivalPredictionsForStopPoint = async (
  stopPointId: string,
  lines: string[],
) => {
  try {
    if (!stopPointId || !lines || lines.length < 1) {
      throw new Error('400');
    }

    const res = await fetch(
      `https://api.tfl.gov.uk/Line/${lines.join(',')}/Arrivals/${stopPointId}`,
      {
        headers: {
          Authorization: process.env.TFL_API_KEY || '',
          'Content-Type': 'application/json',
        },
      },
    );
    const resJson = await res.json();
    const { httpStatusCode } = resJson;

    if (httpStatusCode && httpStatusCode >= 400) {
      throw new Error('400');
    }

    return resJson;
  } catch (e: unknown) {
    console.log({ e });

    switch (true) {
      case e === '400':
        return {
          statusCode: 400,
          message: "We can't find arrival predictions for the requested stop.",
        };
      case e === '404':
        return {
          statusCode: 404,
          message: "We can't find arrival predictions for the requested stop.",
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

export default getArrivalPredictionsForStopPoint;
