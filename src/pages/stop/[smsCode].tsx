import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import useSWR from 'swr';

import { TStopPointWithPredictions } from '@app-types/stop-point';
import DepartureBoard from '@components/common/DepartureBoard';
import SearchForm from '@components/common/SearchForm';
import Button from '@components/ui/Button';
import getArrivalPredictionsByStopPointSmsCode from '@framework/tfl/utils/getArrivalPredictionsByStopPointSmsCode';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

interface IStopProps {
  smsCode: string;
  stopPointPredictions: TStopPointWithPredictions;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { smsCode } = params || {};

  const stopPointPredictions = await getArrivalPredictionsByStopPointSmsCode(
    smsCode,
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
  const hasError = stopPointPredictions.statusCode >= 400;
  const [lastUpdated, setLastpdated] = useState<number>(Date.now());
  const { data } = useSWR(`/api/get-stop-by-sms-code/${smsCode}`, fetcher, {
    fallbackData: stopPointPredictions,
    onSuccess: () => setLastpdated(Date.now()),
    refreshInterval: hasError ? 0 : 30000,
    revalidateIfStale: !hasError,
    revalidateOnFocus: !hasError,
    revalidateOnMount: false,
    revalidateOnReconnect: !hasError,
  });
  const { arrivalPredictions, name, statusCode, stopLetter } = data;

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
      <DepartureBoard
        arrivalPredictions={arrivalPredictions}
        lastUpdated={lastUpdated}
      />

      <p>
        <Button Component={Link} href="/">
          Search again
        </Button>
      </p>
    </>
  );
};

export default Stop;
