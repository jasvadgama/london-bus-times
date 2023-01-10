import type { NextApiRequest, NextApiResponse } from 'next';

import getArrivalPredictionsByStopPointSmsCode from '@framework/tfl/utils/getArrivalPredictionsByStopPointSmsCode';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { smsCode } = req.query;

  const stopPointPredictions = await getArrivalPredictionsByStopPointSmsCode(
    smsCode,
  );

  res.status(200).json(stopPointPredictions);
}
