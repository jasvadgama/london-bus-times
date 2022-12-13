import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Button from '@components/ui/Button';
import FormRow from '@components/ui/FormRow';
import Input from '@components/ui/Input';

const Home: NextPage = (): JSX.Element => {
  const router = useRouter();
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      smsCode: { value: string };
    };
    const smsCode = target.smsCode.value;

    router.push(`/sms-code/${smsCode}`);
  };

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

      <form action="/sms-code" method="GET" onSubmit={handleSubmit}>
        <FormRow>
          <Input
            autoComplete="off"
            id="smsCode"
            name="smsCode"
            required
            type="text"
          >
            Stop SMS code
          </Input>
        </FormRow>

        <FormRow isActionRow>
          <Button level="primary" loadingCopy="Searching" type="submit">
            Find stop
          </Button>
        </FormRow>
      </form>
    </>
  );
};

export default Home;
