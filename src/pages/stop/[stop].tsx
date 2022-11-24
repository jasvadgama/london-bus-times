import { Duration } from 'date-fns';
import { GetServerSideProps, NextPage } from 'next';
import { FC } from 'react';

import { TStopPointWithPredictions } from '@app-types/stop-point';
import getArrivalPredictionsByStopPointId from '@framework/tfl/utils/getArrivalPredictionsByStopPointId';

interface IStopProps {
  stop: string;
  stopPointPredictions: TStopPointWithPredictions;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { stop } = params || {};

  if (!stop) {
    return {
      notFound: true,
    };
  }

  const sanitisedStop: string = Array.isArray(stop) ? stop[0] : stop;
  const stopPointPredictions = await getArrivalPredictionsByStopPointId(
    sanitisedStop,
  );

  return {
    props: {
      stop,
      stopPointPredictions,
    },
  };
};

const EstimatedArrivalTime: FC<{ expectedArrival: Duration }> = ({
  expectedArrival,
}): JSX.Element => {
  const { minutes } = expectedArrival;

  if (minutes === 0) {
    return <>Due</>;
  }

  if (minutes === 1) {
    return <>1 min</>;
  }

  return <>{minutes} mins</>;
};

const Stop: NextPage<IStopProps> = ({
  stop,
  stopPointPredictions,
}): JSX.Element => {
  const { arrivalPredictions, commonName, stopLetter } = stopPointPredictions;

  return (
    <>
      <h1>
        Stop information for {commonName} ({stopLetter})
      </h1>

      <ul>
        {arrivalPredictions.map(
          ({ destinationName, expectedArrival, lineId, lineName }, index) => (
            <li key={`${lineId}_${index}`}>
              {lineName} to {destinationName} -{' '}
              <EstimatedArrivalTime expectedArrival={expectedArrival} />
            </li>
          ),
        )}
      </ul>
    </>
  );
};

export default Stop;
