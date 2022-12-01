import type { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';

import { TStopPointPairInformation } from '@app-types/stop-point';
import getStopPointPairBySmsCode from '@framework/tfl/api/getStopPointPairBySmsCode';

interface ISmsCodeProps {
  smsCode: string;
  stopPointPairInformation: TStopPointPairInformation;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { smsCode } = params || {};

  if (!smsCode) {
    return {
      notFound: true,
    };
  }

  const sanitisedSmsCode: string = Array.isArray(smsCode)
    ? smsCode[0]
    : smsCode;
  const stopPointPairInformation = await getStopPointPairBySmsCode(
    sanitisedSmsCode,
  );

  return {
    props: {
      smsCode,
      stopPointPairInformation,
    },
  };
};

const SmsCode: NextPage<ISmsCodeProps> = ({
  smsCode,
  stopPointPairInformation,
}): JSX.Element => {
  const { commonName, statusCode, stops } = stopPointPairInformation;

  if (statusCode !== 200) {
    return (
      <>
        <h1>No results for &quot;{smsCode}&quot;</h1>
      </>
    );
  }

  return (
    <>
      <h1>
        We found the following information for &quot;{smsCode}&quot; (
        {commonName})
      </h1>

      <p>Please select the correct stop:</p>

      <ul>
        {stops?.map(({ id, lines, stopLetter, towards }) => (
          <li key={id}>
            <Link href={`/stop/${id}`}>
              <h2>Stop {stopLetter}</h2>
              {!!towards && <p>Towards {towards}</p>}
              <p>Lines: {lines.map((line) => line).join(', ')} </p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SmsCode;
