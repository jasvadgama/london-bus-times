import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';

import { TStopPointWithPredictions } from '@app-types/stop-point';
import DepartureBoard from '@components/common/DepartureBoard';
import SearchForm from '@components/common/SearchForm';
import Button from '@components/ui/Button';
import getArrivalPredictionsByStopPointSmsCode from '@framework/tfl/utils/getArrivalPredictionsByStopPointSmsCode';

interface IStopProps {
  smsCode: string;
  stopPointPredictions: TStopPointWithPredictions;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { smsCode } = params || {};

  if (!smsCode) {
    return {
      notFound: true,
    };
  }

  const sanitisedStop: string = Array.isArray(smsCode) ? smsCode[0] : smsCode;
  const stopPointPredictions = await getArrivalPredictionsByStopPointSmsCode(
    sanitisedStop,
  );

  return {
    props: {
      smsCode,
      stopPointPredictions,
    },
  };
};

const Stop: NextPage<IStopProps> = ({
  smsCode,
  stopPointPredictions,
}): JSX.Element => {
  const { arrivalPredictions, name, statusCode, stopLetter } =
    stopPointPredictions;

  if (statusCode >= 400) {
    return (
      <>
        <h1>No stops found</h1>

        <p>We couldn&apos;t find a stop with the SMS code {smsCode}.</p>

        <p>Please check the code and try searching again.</p>

        <SearchForm initialValue={smsCode} />
      </>
    );
  }

  return (
    <>
      <h1>
        {name} ({stopLetter})
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
