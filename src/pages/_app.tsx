import type { AppProps } from 'next/app';

import Layout from '@components/common/Layout';
import '@styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout {...pageProps}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
