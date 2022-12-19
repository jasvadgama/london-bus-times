import type { GetServerSideProps, NextPage } from 'next';

import { TStopPointPairInformation } from '@app-types/stop-point';
import ResultList from '@components/common/ResultList';
import getStopPointPairBySmsCode from '@framework/tfl/api/getStopPointPairBySmsCode';

interface ISmsCodeProps {
  searchTerm: string;
  stopPointPairInformation: TStopPointPairInformation;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { searchTerm } = params || {};

  if (!searchTerm) {
    return {
      notFound: true,
    };
  }

  const sanitisedSearchTerm: string = Array.isArray(searchTerm)
    ? searchTerm[0].trim()
    : searchTerm.trim();
  const smsCodeRegex = /\d{5}/gi;
  const isSmsCode =
    sanitisedSearchTerm.length === 5 && smsCodeRegex.test(sanitisedSearchTerm);
  let stopPointPairInformation;

  if (!!isSmsCode) {
    stopPointPairInformation = await getStopPointPairBySmsCode(
      sanitisedSearchTerm,
    );
  } else {
  }

  return {
    props: {
      searchTerm: sanitisedSearchTerm,
      stopPointPairInformation,
    },
  };
};

const SmsCode: NextPage<ISmsCodeProps> = ({
  searchTerm,
  stopPointPairInformation,
}): JSX.Element => {
  const { commonName, statusCode, stops } = stopPointPairInformation || {};

  if (statusCode !== 200) {
    return <h1>No results for &quot;{searchTerm}&quot;</h1>;
  }

  return (
    <>
      <h1>
        We found the following information for &quot;{searchTerm}&quot; (
        {commonName})
      </h1>

      <p>Please select the correct stop:</p>

      <ResultList results={stops} />
    </>
  );
};

export default SmsCode;
