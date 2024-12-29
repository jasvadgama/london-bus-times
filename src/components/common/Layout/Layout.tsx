import Head from 'next/head';
import { FC, ReactNode } from 'react';

import styles from './Layout.module.scss';

interface ILayout {
  children: ReactNode;
}

const Layout: FC<ILayout> = ({ children }) => {
  return (
    <>
      <Head>
        <title>London Bus Times</title>
      </Head>

      <main className={styles.main}>{children}</main>
    </>
  );
};

export default Layout;
