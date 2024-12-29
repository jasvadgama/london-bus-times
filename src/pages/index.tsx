import type { NextPage } from 'next';
import Head from 'next/head';

import SearchForm from '@components/common/SearchForm';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>London Bus Times</title>
      </Head>

      <h1>London Bus Times</h1>

      <p>
        Find out when the next bus is arriving if there isn&apos;t a departure
        board.
      </p>

      <SearchForm />
    </>
  );
};

export default Home;
