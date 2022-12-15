import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';

import { TStopPointWithPredictions } from '@app-types/stop-point';
import DepartureBoard from '@components/common/DepartureBoard';
import Button from '@components/ui/Button';
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

const Stop: NextPage<IStopProps> = ({
  // stop,
  stopPointPredictions,
}): JSX.Element => {
  const { arrivalPredictions, commonName, stopLetter } = stopPointPredictions;

  return (
    <>
      <h1>
        {commonName} ({stopLetter})
      </h1>

      <h2>Departure board</h2>
      <DepartureBoard arrivalPredictions={arrivalPredictions} />

      <p>
        <Button Component={Link} href="/">
          Search again
        </Button>
      </p>
    </>
  );
};

export default Stop;
