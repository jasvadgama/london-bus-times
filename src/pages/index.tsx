import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>London Bus Times</title>
      </Head>

      <h1>Home</h1>

      <p>
        Find out when the next bus is arriving if there isn&apos;t a departure
        board.
      </p>

      <form action="/sms-code" method="GET">
        <div className="form-row">
          <label>
            <span>Stop SMS code</span>
            <input
              id="smsCode"
              name="smsCode"
              placeholder="12345"
              required
              type="text"
            />
          </label>
        </div>

        <div className="form-row form-row--actions">
          <button type="submit">Find stop</button>
        </div>
      </form>
    </>
  );
};

export default Home;
